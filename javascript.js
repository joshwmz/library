const library = document.querySelector('.content');

// remove bottom border of the last book if there are 8 or more books
let numb = library.childElementCount;

if (numb >= 8) {
    let lastBook = library.lastElementChild;
    lastBook.style.cssText = 'border-bottom: none; height: 96px';
}

// library JS
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    // this.info = function() {
    //     // some information on the book
    // }
}

function addBookToLibrary() {
    
}