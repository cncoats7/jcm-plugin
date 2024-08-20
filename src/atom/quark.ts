import { Flashcard } from './flashcard';
export interface QuarkConstructorProps {
    name?: string;
    type?: string;
    createFlashcard?: boolean;
    createReverseFlashcard?: boolean;
    definition?: string;
    flashcardInfo?: string;
    reverseFlashcardInfo?: string;
    basicFlashcard?: Flashcard;
    reverseFlashcard?: Flashcard;
}

export class Quark {
    name: string;
    type: string;
    createFlashcard: boolean;
    createReverseFlashcard: boolean;
    definition: string;
    flashcardInfo: string;
    reverseFlashcardInfo: string;
    basicFlashcard: Flashcard;
    reverseFlashcard: Flashcard;

    constructor({
        name = '',
        type = '',
        createFlashcard = false,
        createReverseFlashcard = false,
        definition = '',
        flashcardInfo = '',
        reverseFlashcardInfo = '',
        basicFlashcard = new Flashcard({}),
        reverseFlashcard = new Flashcard({}),
    }: QuarkConstructorProps) {
        this.name = name;
        this.type = type;
        this.createFlashcard = createFlashcard;
        this.createReverseFlashcard = createReverseFlashcard;
        this.definition = definition;
        this.flashcardInfo = flashcardInfo;
        this.reverseFlashcardInfo = reverseFlashcardInfo;
        this.basicFlashcard = basicFlashcard;
        this.reverseFlashcard = reverseFlashcard;
    }

    rawDefinition(): string {
        let rawDefinition = this.definition.replace('[!definition]', '').replace('>[!definition] ', '');
        let definitionLines = rawDefinition.split('\n');
        let rawDefinitionLines: string[] = [];
        definitionLines.forEach(element => {
            if (element[0] === '>') {
                rawDefinitionLines.push(element.slice(1));
            } else {
                rawDefinitionLines.push(element);
            }
        });

        rawDefinition = rawDefinitionLines.join('\n').trim();

        return rawDefinition;
    }

    generateReverseFlashcardSection(): string {
        const rawDefinition = this.rawDefinition().trim()
        return `\n##### ${this.name}-Reverse #flashcard/reverse \nSTART\nBasic\n${rawDefinition}\nBack:\n${this.name}\n\nTARGET DECK: Brain::Atoms::Reverse`;
    }

    removeSuccessiveNewlines(content: string): string {
        return content.replace(/\n{2,}/g, '\n');
    }

    
    // Additional shared methods can be added here
}