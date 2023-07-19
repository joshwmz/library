// Declare variables

const library = document.querySelector('.content');
const addButton = document.querySelector('.add');
const closeButton = document.querySelector('.close');
const formContainer = document.querySelector('.form-container');
const addBookForm = document.querySelector('.add-book-form');
const removes = document.getElementsByClassName('delete');
let myLibrary = [];



//  FEATURE: Toggle add-book-form

addButton.addEventListener('click', () => {
    formContainer.style.display = 'grid';  
});

closeButton.addEventListener('click', () => {
    formContainer.style.display = 'none';
});



//  FEATURE: Add books to library

    // sample of books

    // const hp = new Book('Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', '102', 'Completed')
    // const deepWork = new Book('Deep Work', 'Cal Newport', '28', 'In progress');
    // const dune = new Book('Dune', 'Frank Herbert', '35', 'In progress');

    // myLibrary.unshift(deepWork);
    // myLibrary.unshift(dune);
    // myLibrary.unshift(hp);

    // addBookToLibrary(myLibrary);

addBookForm.addEventListener('submit', (event) => {
    
    event.preventDefault();
    
    let title = addBookForm.elements["title"].value;
    let author = addBookForm.elements["author"].value;
    let pages = addBookForm.elements["pages"].value;
    let status = addBookForm.elements["status"].value;

    addBookForm.reset();
    formContainer.style.display = 'none';

    let newBook = new Book(title, author, pages, status);
    myLibrary.unshift(newBook);
    addBookToLibrary(myLibrary);

});



// FEATURE: Remove book from library (event delegation)

document.getElementById('content').addEventListener('click', (e) => {
    if (e.target.className == 'bin') {
        console.log(e.target.id);
        delete myLibrary[e.target.id];
        addBookToLibrary(myLibrary);
    }
});



// CSS edit: Remove bottom border of the last book if there are 8 or more books

if (library.childElementCount >= 8) {
    let lastBook = library.lastElementChild;
    lastBook.style.cssText = 'border-bottom: none; height: 96px';
}







// Functions

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(myLibrary) {

    library.innerHTML = "";

    for (myBook in myLibrary) {

        let bookIndex = myLibrary.indexOf(myLibrary[myBook]);
        let status = checkBookStatus(myLibrary[myBook].read);

        let book = `<div class="book" id="book-${bookIndex}">\
                            <div class="book-info">\
                            <div class="title">${myLibrary[myBook].title}</div>\
                            <div class="author">${myLibrary[myBook].author}</div>\
                        </div>\
                        <div class="right-content">\
                            <div class="book-status">\
                                <div class="pages">Page: ${myLibrary[myBook].pages}</div>\
                                <div class="read-status ${status}">${myLibrary[myBook].read}</div>\
                            </div>\
                            <button><img src="assets/trash-can-outline.svg" alt="delete book" class="bin" id="${bookIndex}"></button>\
                        </div>\
                    </div>`;
        
        library.innerHTML = library.innerHTML + book;
    } 
}

function checkBookStatus(read) {

    if (read == "Not started") {
        return "not-started";
    } else if (read == "In progress") {
        return "in-progress";
    } else if (read == "Completed") {
        return "completed";
    }

}