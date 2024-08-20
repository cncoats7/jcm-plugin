import { getAtomYaml } from './yaml';
import { Flashcard, FlashcardStatus } from './flashcard';
import { QuarkConstructorProps, Quark } from './quark';
import * as fs from 'fs';

interface AtomConstructorProps extends QuarkConstructorProps{
    topics?: string[];
    references?: string[];
    furtherDefinition?: string;
    interestingFacts?: string;
    keyConcepts?: string;
    metaphor?: string;
    furtherResearch?: string;
    imageRef?: string;
}

export class Atom extends Quark {
    topics: string[];
    references: string[];
    furtherDefinition: string;
    interestingFacts: string;
    keyConcepts: string;
    metaphor: string;
    furtherResearch: string;
    imageRef: string;

    constructor({
        topics = [],
        references = [],
        furtherDefinition = '',
        interestingFacts = '',
        keyConcepts = '',
        metaphor = '',
        furtherResearch = '',
        imageRef = '',
        ...quarkProps
    }: AtomConstructorProps) {
        super(quarkProps);
        this.topics = topics;
        this.references = references;
        this.furtherDefinition = furtherDefinition;
        this.interestingFacts = interestingFacts;
        this.keyConcepts = keyConcepts;
        this.furtherResearch = furtherResearch;
        this.metaphor = metaphor;
        this.imageRef = imageRef;
    }

    imageTag(): string {
        return this.imageRef ? `![${this.name}](${this.imageRef})` : '';
    }


    generateAtomContent(): string {
        const flashcardSection = this.basicFlashcard.generateFlashcardSection('basic');
        const reverseFlashcardSection = this.reverseFlashcard.generateFlashcardSection('reverse');
        let imageTag = this.imageTag()
        let content = `${this.frontmatter()}${this.definition}---\n${imageTag}\n${this.furtherDefinition}\n\n${this.interestingFacts}\n\n${this.keyConcepts}\n\n${this.metaphor}\n\n${this.furtherResearch}\n`;
        if (this.createFlashcard) {
            content = content + flashcardSection;
        }
        if (this.createReverseFlashcard) {
            content = content + '\n\n---\n\n' + reverseFlashcardSection;
        }

        return content;
    }
    extractImageUrl(content: string): string | null {
        const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/;
        const match = content.match(imageRegex);
        return match ? match[1] : null;
    }

/*     generateReverseFlashcardSection(): string {
        const rawDefinition = this.rawDefinition().trim()
        return `\n##### ${this.name}-Reverse #flashcard/reverse \nSTART\nBasic\n${rawDefinition}\nBack:\n${this.name}\n\nTARGET DECK: Brain::Atoms::Reverse`;
    } */

    isDirty(): boolean {
        let isDirty = false;
        // If the definition or name has changed, we need to update
        if ((this.createFlashcard || this.createReverseFlashcard) && (!this.flashcardInfo.includes(this.rawDefinition()) || (this.basicFlashcard.name != this.name))) {
            isDirty = true;
            console.log(`dirty check: ${this.flashcardInfo.includes(this.rawDefinition().trimStart().trimEnd())}`);
            console.log(this.flashcardInfo.indexOf(this.rawDefinition().trimStart().trimEnd()));
            console.log(this.flashcardInfo);
            console.log(this.rawDefinition().trimStart().trimEnd());
        }

        return isDirty;
    }

    frontmatter(): string {
        let topics = '';
        let references = '';
        if (this.topics.length > 0) {
            this.topics.forEach(element => { 
                if (element && element.includes('[[') && element.includes(']]')) {
                    if (element.includes('"')) {
                        element = `'${element}'`
                    }
                    else {
                        element = `"${element}"`
                    }
                }
            
                topics += `\n- ${element}`  
            });
        }
        if (this.references.length > 0) {
            this.references.forEach(element => { 
                if (element && element.includes('[[') && element.includes(']]')) {
                    if (element.includes('"')) {
                        element = `'${element}'`
                    }
                    else {
                        element = `"${element}"`
                    }
                }
                references += `\n- ${element}`
            });
        }


        return `---\nname: ${this.name}\ntype: ${this.type}\ntopics: ${topics}\nreferences: ${references}\ncreateFlashcard: ${this.createFlashcard}\ncreateReverseFlashcard: ${this.createReverseFlashcard}\n---`;
    }

    populateFromFile(fileName: string, fileContent: string): void {
        // Populate frontmatter properties
        const yamlData = getAtomYaml(fileContent);
        this.name = fileName.split('.')[0];
        this.type = (yamlData === null || yamlData === void 0 ? void 0 : yamlData.type) || '';
        this.topics = (yamlData === null || yamlData === void 0 ? void 0 : yamlData.topics) || [];
        this.references = (yamlData === null || yamlData === void 0 ? void 0 : yamlData.references) || [];
        this.createFlashcard = (yamlData === null || yamlData === void 0 ? void 0 : yamlData.createFlashcard) || false;
        this.createReverseFlashcard = (yamlData === null || yamlData === void 0 ? void 0 : yamlData.createReverseFlashcard) || false;
       
        // Populate main content sections
        const sections = fileContent.split("\n## ");
        this.definition = sections[0].split('---')[2] || '';
        this.furtherDefinition = `## ${this.removeSuccessiveNewlines(sections[1])}` || '';
        this.interestingFacts = `## ${this.removeSuccessiveNewlines(sections[2])}` || '';
        this.keyConcepts = `## ${this.removeSuccessiveNewlines(sections[3])}` || '';
        this.metaphor = `## ${this.removeSuccessiveNewlines(sections[4])}` || '';
        if (fileContent.includes('#flashcard')) {
            this.furtherResearch = `## ${this.removeSuccessiveNewlines(sections[5].split('######')[0])}` || '';
        }
        else {
            this.furtherResearch = `## ${sections[5]}` || '';
        }
        this.imageRef = this.extractImageUrl(fileContent) || '';
        
        // Populate flashcard sections
        const flashcardSection = sections[5];
        
        // Basic Flashcard
        this.flashcardInfo = flashcardSection.split('######')[1]
        if (this.flashcardInfo) {
            const flashcardDefinition = this.basicFlashcard.getFlashcardBack(this.flashcardInfo).replace(this.imageTag(), '').trim();
            if (flashcardDefinition == this.rawDefinition()) {
                this.basicFlashcard.status = FlashcardStatus.NO_CHANGE;
                this.basicFlashcard.populateFromExistingFlashcard('basic', this.name, this.flashcardInfo);
            }
            else {
                this.basicFlashcard.status = FlashcardStatus.CHANGE;
                this.basicFlashcard.populateNewFlashcard('basic', this.name, this.rawDefinition(), this.imageTag());
            }
            
        }
        else if (this.createFlashcard) {
            //console.log(`${this.name} does not have a basic flashcard`);
            this.basicFlashcard.populateNewFlashcard('basic', this.name, this.rawDefinition(), this.imageTag(), false);
        }

        // Reverse Flashcard
        this.reverseFlashcardInfo = flashcardSection.split('---')[2];
        if (this.reverseFlashcardInfo) {
            if (!this.basicFlashcard.isDirty()) {
                this.reverseFlashcard.populateFromExistingFlashcard('reverse', this.name, this.reverseFlashcardInfo);
            }
            else {
                this.reverseFlashcard.populateNewFlashcard('reverse', this.name, this.rawDefinition(), this.imageTag(), true);
            }
            this.reverseFlashcard.populateFromExistingFlashcard('reverse', this.name, this.reverseFlashcardInfo);
        }
        else if (this.createReverseFlashcard) {
            this.reverseFlashcard.populateNewFlashcard('reverse', this.name, this.rawDefinition(), this.imageTag(), false);
        }

    }


    writeToFile(filePath: string): void {
        // If we have new flashcards or changed Atom data, we need to write to file
        if (this.basicFlashcard.isDirty() || this.reverseFlashcard.isDirty()) {
            // write to file
            console.log(`Updated ${this.name} with new Atom content`);
            fs.writeFileSync(filePath, this.generateAtomContent());
        }
    }
}
