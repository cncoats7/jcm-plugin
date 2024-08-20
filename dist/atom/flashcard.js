export var FlashcardStatus;
(function (FlashcardStatus) {
    FlashcardStatus[FlashcardStatus["NEW"] = 0] = "NEW";
    FlashcardStatus[FlashcardStatus["CHANGE"] = 1] = "CHANGE";
    FlashcardStatus[FlashcardStatus["NO_CHANGE"] = 2] = "NO_CHANGE";
})(FlashcardStatus || (FlashcardStatus = {}));
export class Flashcard {
    constructor({ type = '', name = '', definition = '', imageTag = '', idTag = '', status = FlashcardStatus.NO_CHANGE }) {
        this.type = type;
        this.name = name;
        this.definition = definition;
        this.imageTag = imageTag;
        this.idTag = idTag;
        this.status = status;
    }
    populateNewFlashcard(type, name, definition, imageTag, isUpdate) {
        this.type = type;
        this.name = name;
        this.definition = definition;
        this.imageTag = imageTag || '';
        this.status = isUpdate ? FlashcardStatus.CHANGE : FlashcardStatus.NEW;
    }
    populateFromExistingFlashcard(type, name, flashcardSection) {
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
    generateFlashcardSection(type) {
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
    extractImageUrl(content) {
        const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/;
        const match = content.match(imageRegex);
        return match ? match[1] : null;
    }
    extractImageMarkdownTag(content) {
        const imageRegex = /!\[.*?\]\(https?:\/\/[^\s)]+\)/;
        const match = content.match(imageRegex) || '';
        return match ? match[0] : null;
    }
    getFlashcardFront(flashcardText) {
        const regex = /(?<=Basic\s)([\s\S]*?)(?=\s*Back:)/;
        const match = flashcardText.match(regex);
        return match ? match[0].trim() : '';
    }
    getFlashcardBack(flashcardText) {
        const regex = /(?<=Back:\s)([\s\S]*?)(?=\s*TARGET DECK: Brain::(Atoms|Protons)(::Reverse)?)/;
        const match = flashcardText.match(regex);
        return match ? match[0].trim() : '';
    }
    extractIdTag(content) {
        const idRegex = /<!--ID: \d{1,16}-->/;
        const match = content.match(idRegex);
        return match ? match[0] : null;
    }
    isDirty() {
        let isDirty = false;
        if (this.status == FlashcardStatus.NEW || this.status == FlashcardStatus.CHANGE) {
            isDirty = true;
        }
        return isDirty;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhc2hjYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2F0b20vZmxhc2hjYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdBLE1BQU0sQ0FBTixJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDdkIsbURBQUcsQ0FBQTtJQUNILHlEQUFNLENBQUE7SUFDTiwrREFBUyxDQUFBO0FBQ2IsQ0FBQyxFQUpXLGVBQWUsS0FBZixlQUFlLFFBSTFCO0FBRUQsTUFBTSxPQUFPLFNBQVM7SUFRbEIsWUFBWSxFQUNSLElBQUksR0FBRyxFQUFFLEVBQ1QsSUFBSSxHQUFHLEVBQUUsRUFDVCxVQUFVLEdBQUcsRUFBRSxFQUNmLFFBQVEsR0FBRyxFQUFFLEVBQ2IsS0FBSyxHQUFHLEVBQUUsRUFDVixNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFFVjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBRUQsb0JBQW9CLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxVQUFrQixFQUFFLFFBQWlCLEVBQUUsUUFBa0I7UUFDdEcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxl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LENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUdELFlBQVksQ0FBQyxPQUFlO1FBQ3hCLE1BQU0sT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxlQUFlLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUM3RSxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXRvbSB9IGZyb20gJy4vYXRvbSc7XG5cbmludGVyZmFjZSBGbGFzaGNhcmRDb25zdHJ1Y3RvclByb3BzIHtcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgZGVmaW5pdGlvbj86IHN0cmluZztcbiAgICBpbWFnZVRhZz86IHN0cmluZztcbiAgICBpZFRhZz86IHN0cmluZztcbiAgICBzdGF0dXM/OiBGbGFzaGNhcmRTdGF0dXNcbn1cblxuZXhwb3J0IGVudW0gRmxhc2hjYXJkU3RhdHVzIHtcbiAgICBORVcsXG4gICAgQ0hBTkdFLFxuICAgIE5PX0NIQU5HRVxufVxuXG5leHBvcnQgY2xhc3MgRmxhc2hjYXJkIHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlZmluaXRpb246IHN0cmluZztcbiAgICBpbWFnZVRhZzogc3RyaW5nO1xuICAgIGlkVGFnOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBGbGFzaGNhcmRTdGF0dXM7XG5cbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIHR5cGUgPSAnJyxcbiAgICAgICAgbmFtZSA9ICcnLFxuICAgICAgICBkZWZpbml0aW9uID0gJycsXG4gICAgICAgIGltYWdlVGFnID0gJycsXG4gICAgICAgIGlkVGFnID0gJycsXG4gICAgICAgIHN0YXR1cyA9IEZsYXNoY2FyZFN0YXR1cy5OT19DSEFOR0VcblxuICAgIH06IEZsYXNoY2FyZENvbnN0cnVjdG9yUHJvcHMpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcbiAgICAgICAgdGhpcy5pbWFnZVRhZyA9IGltYWdlVGFnO1xuICAgICAgICB0aGlzLmlkVGFnID0gaWRUYWc7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzXG4gICAgfVxuXG4gICAgcG9wdWxhdGVOZXdGbGFzaGNhcmQodHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlZmluaXRpb246IHN0cmluZywgaW1hZ2VUYWc/OiBzdHJpbmcsIGlzVXBkYXRlPzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmRlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuICAgICAgICB0aGlzLmltYWdlVGFnID0gaW1hZ2VUYWcgfHwgJyc7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gaXNVcGRhdGUgPyBGbGFzaGNhcmRTdGF0dXMuQ0hBTkdFIDogRmxhc2hjYXJkU3RhdHVzLk5FV1xuICAgIH1cbiAgICBwb3B1bGF0ZUZyb21FeGlzdGluZ0ZsYXNoY2FyZCh0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZmxhc2hjYXJkU2VjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaW1hZ2VUYWcgPSB0aGlzLmV4dHJhY3RJbWFnZU1hcmtkb3duVGFnKGZsYXNoY2FyZFNlY3Rpb24pIHx8ICcnO1xuICAgICAgICBpZiAodHlwZSA9PSAnYmFzaWMnKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmluaXRpb24gPSB0aGlzLmdldEZsYXNoY2FyZEJhY2soZmxhc2hjYXJkU2VjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAncmV2ZXJzZScpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5pdGlvbiA9IHRoaXMuZ2V0Rmxhc2hjYXJkRnJvbnQoZmxhc2hjYXJkU2VjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZFRhZyA9IHRoaXMuZXh0cmFjdElkVGFnKGZsYXNoY2FyZFNlY3Rpb24pIHx8ICcnO1xuICAgIH1cbiAgICBcbiAgICBnZW5lcmF0ZUZsYXNoY2FyZFNlY3Rpb24odHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaWRUYWcgPSB0aGlzLnN0YXR1cyA9PSBGbGFzaGNhcmRTdGF0dXMuTkVXID8gJycgOiAnXFxuJyArIHRoaXMuaWRUYWc7XG4gICAgICAgIGlmICh0eXBlID09ICdiYXNpYycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlZmluaXRpb24uaW5jbHVkZXMoJyhodHRwJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlVGFnID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYCMjIyMjIyAke3RoaXMubmFtZX0gI2ZsYXNoY2FyZCBcXG5TVEFSVFxcbkJhc2ljXFxuJHt0aGlzLm5hbWV9XFxuQmFjazpcXG4ke3RoaXMuZGVmaW5pdGlvbn1cXG4ke3RoaXMuaW1hZ2VUYWd9XFxuVEFSR0VUIERFQ0s6IEJyYWluOjpBdG9tcyR7aWRUYWd9XFxuRU5EYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgIyMjIyMjICR7dGhpcy5uYW1lfS1SZXZlcnNlICNmbGFzaGNhcmQvcmV2ZXJzZSBcXG5TVEFSVFxcbkJhc2ljXFxuJHt0aGlzLmRlZmluaXRpb259XFxuQmFjazpcXG4ke3RoaXMubmFtZX1cXG5UQVJHRVQgREVDSzogQnJhaW46OkF0b21zOjpSZXZlcnNlJHtpZFRhZ31cXG5FTkRgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXh0cmFjdEltYWdlVXJsKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBjb25zdCBpbWFnZVJlZ2V4ID0gLyFcXFsuKj9cXF1cXCgoaHR0cHM/OlxcL1xcL1teXFxzKV0rKVxcKS87XG4gICAgICAgIGNvbnN0IG1hdGNoID0gY29udGVudC5tYXRjaChpbWFnZVJlZ2V4KTtcblxuICAgICAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IG51bGw7XG4gICAgfVxuXG4gICAgZXh0cmFjdEltYWdlTWFya2Rvd25UYWcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGltYWdlUmVnZXggPSAvIVxcWy4qP1xcXVxcKGh0dHBzPzpcXC9cXC9bXlxccyldK1xcKS87XG4gICAgICAgIGNvbnN0IG1hdGNoID0gY29udGVudC5tYXRjaChpbWFnZVJlZ2V4KSB8fCAnJztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRGbGFzaGNhcmRGcm9udChmbGFzaGNhcmRUZXh0OiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmVnZXggPSAvKD88PUJhc2ljXFxzKShbXFxzXFxTXSo/KSg/PVxccypCYWNrOikvO1xuICAgICAgICBjb25zdCBtYXRjaCA9IGZsYXNoY2FyZFRleHQubWF0Y2gocmVnZXgpO1xuXG4gICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdLnRyaW0oKSA6ICcnO1xuICAgIH1cbiAgICBnZXRGbGFzaGNhcmRCYWNrKGZsYXNoY2FyZFRleHQ6IHN0cmluZykgOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByZWdleCA9IC8oPzw9QmFjazpcXHMpKFtcXHNcXFNdKj8pKD89XFxzKlRBUkdFVCBERUNLOiBCcmFpbjo6KEF0b21zfFByb3RvbnMpKDo6UmV2ZXJzZSk/KS87XG4gICAgICAgIGNvbnN0IG1hdGNoID0gZmxhc2hjYXJkVGV4dC5tYXRjaChyZWdleCk7XG4gICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdLnRyaW0oKSA6ICcnO1xuICAgIH1cblxuXG4gICAgZXh0cmFjdElkVGFnKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBjb25zdCBpZFJlZ2V4ID0gLzwhLS1JRDogXFxkezEsMTZ9LS0+LztcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBjb250ZW50Lm1hdGNoKGlkUmVnZXgpO1xuICAgICAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6IG51bGw7XG4gICAgfVxuXG4gICAgaXNEaXJ0eSgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGlzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IEZsYXNoY2FyZFN0YXR1cy5ORVcgfHwgdGhpcy5zdGF0dXMgPT0gRmxhc2hjYXJkU3RhdHVzLkNIQU5HRSkge1xuICAgICAgICAgICAgaXNEaXJ0eSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzRGlydHk7XG4gICAgfVxufSJdfQ==