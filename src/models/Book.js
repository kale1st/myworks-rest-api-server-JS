class Book {
    constructor(name, totalPageCount, bookId, readPageCount) {
        this.name = name;
        this.totalPageCount = totalPageCount;
        this.bookId = bookId;
        this.readPageCount = readPageCount;
    }
}

module.exports = Book;