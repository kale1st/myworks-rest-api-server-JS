export class EditedWord {
    wordPairId: any;
    word: string;
    meaning: string;
    chapterId: any
    pirId: any;
    editorId: any

    constructor(word: string, meaning: string, chapterId: any, pirId: any, editorId: any) {
        this.word = word;
        this.meaning = meaning
        this.chapterId = chapterId
        this.pirId = pirId
        this.editorId = editorId
    }
}