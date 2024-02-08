import { BookType } from "./BookTypes";

export class Book {
  bookId: any;
  name: string;
  totalPage: number;
  readPage: number;
  startDate: Date;
  endDate: Date;
  author: string;
  bookType: BookType;

  constructor(
    name: string,
    totalpage: number,
    startdate: Date,
    booktype: BookType,
    enddate: Date,
    readpage: number,
    author: string
  ) {
    this.name = name;
    this.totalPage = totalpage;
    this.readPage = readpage;
    this.startDate = startdate;
    this.endDate = enddate;
    this.author = author;
    this.bookType = booktype;
  }
}
