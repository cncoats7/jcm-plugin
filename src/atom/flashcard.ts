import { Atom } from './atom';

interface FlashcardConstructorProps {
    type?: string;
    name?: string;
    definition?: string;
    imageTag?: string;
    idTag?: string;
    status?: FlashcardStatus
}

export enum FlashcardStatus {
    NEW,
    CHANGE,
    NO_CHANGE
}

export class Flashcard {
    type: string;
    name: string;
    definition: string;
    imageTag: string;
    idTag: string;
    status: FlashcardStatus;

    constructor({
        type = '',
        name = '',
        definition = '',
        imageTag = '',
        idTag = '',
        status = FlashcardStatus.NO_CHANGE

    }: FlashcardConstructorProps) {
        this.type = type;
        this.name = name;
        this.definition = definition;
        this.imageTag = imageTag;
        this.idTag = idTag;
        this.status = status
    }

    populateNewFlashcard(type: string, name: string, definition: string, imageTag?: string, isUpdate?: boolean): void {
        this.type = type;
        this.name = name;
        this.definition = definition;
        this.imageTag = imageTag || '';
        this.status = isUpdate ? FlashcardStatus.CHANGE : FlashcardStatus.NEW
    }
    populateFromExistingFlashcard(type: string, name: string, flashcardSection: string) {
        this.type = type;
        this.name = name;
        this.imageTag = this.extractImageMarkdownTag(flashcardSection) || '';
        if (type == 'basic') {
            this.definition = this.getFlashcardBack(flashcardSection);
        }
        else if (type == 'reverse') {
            this.definition = this.getFlashcardFront(flashcardSection);
        }
        this.idTag = this.extractIdTag(flashcardSection) || '';
    }
    
    generateFlashcardSection(type: string): string {
        const idTag = this.status == FlashcardStatus.NEW ? '' : '\n' + this.idTag;
        if (type == 'basic') {
            if (this.definition.includes('(http')) {
                this.imageTag = '';
            }
            return `###### ${this.name} #flashcard \nSTART\nBasic\n${this.name}\nBack:\n${this.definition}\n${this.imageTag}\nTARGET DECK: Brain::Atoms${idTag}\nEND`;
        }
        else {
            return `###### ${this.name}-Reverse #flashcard/reverse \nSTART\nBasic\n${this.definition}\nBack:\n${this.name}\nTARGET DECK: Brain::Atoms::Reverse${idTag}\nEND`;
        }
    }

    extractImageUrl(content: string): string | null {
        const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/;
        const match = content.match(imageRegex);

        return match ? match[1] : null;
    }

    extractImageMarkdownTag(content: string): string | null {
        const imageRegex = /!\[.*?\]\(https?:\/\/[^\s)]+\)/;
        const match = content.match(imageRegex) || '';
        
        return match ? match[0] : null;
    }

    getFlashcardFront(flashcardText: string) : string {
        const regex = /(?<=Basic\s)([\s\S]*?)(?=\s*Back:)/;
        const match = flashcardText.match(regex);

        return match ? match[0].trim() : '';
    }
    getFlashcardBack(flashcardText: string) : string {
        const regex = /(?<=Back:\s)([\s\S]*?)(?=\s*TARGET DECK: Brain::(Atoms|Protons)(::Reverse)?)/;
        const match = flashcardText.match(regex);
        return match ? match[0].trim() : '';
    }


    extractIdTag(content: string): string | null {
        const idRegex = /<!--ID: \d{1,16}-->/;
        const match = content.match(idRegex);
        return match ? match[0] : null;
    }

    isDirty(): boolean {
        let isDirty = false;
        if (this.status == FlashcardStatus.NEW || this.status == FlashcardStatus.CHANGE) {
            isDirty = true;
        }
        return isDirty;
    }
}