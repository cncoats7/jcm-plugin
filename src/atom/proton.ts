import { Flashcard, FlashcardStatus } from './flashcard';
import { QuarkConstructorProps, Quark } from './quark';
import { getAtomYaml, getProtonYaml } from './yaml';
import * as fs from 'fs';

interface ProtonConstructorProps extends QuarkConstructorProps{
    examples?: string
}

export class Proton extends Quark {
    examples: string;

    constructor({
        examples = '',
        ...quarkProps
    }: ProtonConstructorProps) {
        super(quarkProps);
        this.examples = examples;
    }
    imageTag(): string {
        return '';
    }

    generateProtonContent(): string {
        const flashcardSection = this.basicFlashcard.generateFlashcardSection('basic');
        const reverseFlashcardSection = this.reverseFlashcard.generateFlashcardSection('reverse');
        let imageTag = this.imageTag()
        let content = `${this.frontmatter()}${this.definition}---\n${this.examples}\n\n`;
        if (this.createFlashcard) {
            content = content + flashcardSection;
        }
        if (this.createReverseFlashcard) {
            content = content + '\n\n---\n\n' + reverseFlashcardSection;
        }

        return content;
    }

    frontmatter(): string {
        return `---\nname: ${this.name}\ntype: ${this.type}\ncreateFlashcard: ${this.createFlashcard}\ncreateReverseFlashcard: ${this.createReverseFlashcard}\n---`;
    }

    generateReverseFlashcardSection(): string {
        return `\n\n${this.reverseFlashcard.generateFlashcardSection('reverse')}`
    }

    populateFromFile(fileName: string, fileContent: string): void {
        const yamlData = getProtonYaml(fileContent);
        this.name = fileName.split('.')[0];
        this.type = yamlData?.type || '';

        this.createFlashcard = yamlData?.createFlashcard || false;
        this.createReverseFlashcard = yamlData?.createReverseFlashcard || false;

        const sections = fileContent.split("\n## ");
        this.definition = sections[0].split('---')[2] || '';
        if (fileContent.includes('#flashcard')) {
            this.examples = `## ${this.removeSuccessiveNewlines(sections[1].split('######')[0])}` || '';    
        }
        else {
            this.examples = `## ${sections[1]}` || '';
        }
        
        const flashcardSection = sections[1]
        
       // Basic Flashcard
        this.flashcardInfo = flashcardSection.split('######')[1]
        if (this.flashcardInfo) {
            const flashcardDefinition = this.getDefinitionFromFlashcardContent(this.basicFlashcard.getFlashcardBack(this.flashcardInfo)).trim();
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
            this.basicFlashcard.status = FlashcardStatus.NEW
            this.basicFlashcard.populateNewFlashcard('basic', this.name, this.rawDefinition(), this.imageTag(), false);
        }

        // Reverse Flashcard
        this.reverseFlashcardInfo = flashcardSection.split('---')[2];
        if (this.reverseFlashcardInfo) {
            if (!this.basicFlashcard.isDirty()) {
                this.reverseFlashcard.status = FlashcardStatus.NO_CHANGE;
                this.reverseFlashcard.populateFromExistingFlashcard('reverse', this.name, this.reverseFlashcardInfo);
            }
            else {
                this.reverseFlashcard.status = FlashcardStatus.CHANGE;
                this.reverseFlashcard.populateNewFlashcard('reverse', this.name, this.rawDefinition(), this.imageTag(), true);
            }
            this.reverseFlashcard.populateFromExistingFlashcard('reverse', this.name, this.reverseFlashcardInfo);
        }
        else if (this.createReverseFlashcard) {
            this.reverseFlashcard.status = FlashcardStatus.NEW
            this.reverseFlashcard.populateNewFlashcard('reverse', this.name, this.rawDefinition(), this.imageTag(), false);
        }
    }

    writeToFile(filePath: string): void {
        // If we have new flashcards or changed Atom data, we need to write to file
        if (this.basicFlashcard.isDirty() || this.reverseFlashcard.isDirty()) {
            // write to file
            console.log(`Updated ${this.name} with new Atom content`);
            const protonContent = this.generateProtonContent();
            fs.writeFileSync(filePath, protonContent);
        }
    }

    getDefinitionFromFlashcardContent(flashcardContent: string): string {
        return flashcardContent.split('##')[0] || '';
    }
}
