import { BookType } from "./BookTypes";

export class Book {
    name: string;
    totalPage: string;
    readPage: string;
    startDate: Date;
    endDate: Date;
    author: string;
    bookType: BookType;

    constructor(name: string, totalpage: string, startdate: Date, booktype: BookType, enddate?: Date, readpage?: string, author?: string) {
        this.name = name
        this.totalPage = totalpage
        this.readPage = readpage
        this.startDate = startdate
        this.endDate = enddate
        this.author = author
        this.bookType = booktype
    }
};