"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(name, totalpage, startdate, booktype, enddate, readpage, author) {
        this.name = name;
        this.totalPage = totalpage;
        this.readPage = readpage;
        this.startDate = startdate;
        this.endDate = enddate;
        this.author = author;
        this.bookType = booktype;
    }
}
exports.Book = Book;
