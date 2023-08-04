// Declare variables

const library = document.getElementById('content');
const addButton = document.querySelector('.add');
const closeAddPopUp = document.querySelector('.close-form');
const formContainer = document.querySelector('.form-container');
const addBookForm = document.querySelector('.add-book-form');
const removes = document.getElementsByClassName('delete');
const deleteContainer = document.querySelector('.delete-container');
const deleteThis = document.querySelector('.delete-this');
const deleteConfirm = document.getElementById('delete-confirm');
const deleteCancel = document.getElementById('delete-cancel');
const closeDeletePopUp = document.querySelector('.close-delete');
let myLibrary = [];
const bookStatus = [['not-started', 'in-progress', 'completed'],['Not started', 'In progress', 'Completed']];


// ADDITION: Book class

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//  FEATURE: Toggle add-book-form

addButton.addEventListener('click', () => {
    formContainer.style.display = 'grid';
    addBookForm.elements["title"].focus();
});

closeAddPopUp.addEventListener('click', () => {
    formContainer.style.display = 'none';
});



//  FEATURE: Add books to library (with classes!)

    // sample of books

    const hp = new Book('Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', '352', 'Completed')
    const deepWork = new Book('Deep Work', 'Cal Newport', '305', 'In progress');
    const dune = new Book('Dune', 'Frank Herbert', '608', 'Not started');

    myLibrary.unshift(deepWork);
    myLibrary.unshift(dune);
    myLibrary.unshift(hp);

    addBookToLibrary(myLibrary);

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



// Library event delegation

library.addEventListener('click', (e) => {

    // FEATURE: Remove book from library
    
    if (e.target.className == 'bin') {
        
        let bookIndex = e.target.id;
        deleteThis.innerHTML = myLibrary[bookIndex].title;
        deleteContainer.style.display = 'grid';

        deleteConfirm.addEventListener('click', () => {
            deleteContainer.style.display = 'none';
            delete myLibrary[e.target.id];
            addBookToLibrary(myLibrary);
        });

        deleteCancel.addEventListener('click', () => {
            deleteContainer.style.display = 'none';
        })

        closeDeletePopUp.addEventListener('click', () => {
            deleteContainer.style.display = 'none';
        })

    }

    // FEATURE: Edit book status

    if (e.target.classList.contains('read-status')) {
        
        let status = e.target.className.replace('read-status ', '');
        let statusIndex = bookStatus[0].indexOf(status);

        if (statusIndex == '2') {
            e.target.setAttribute('class', `read-status ${bookStatus[0][0]}`);
            e.target.innerHTML = `${bookStatus[1][0]}`
        } else {
            e.target.setAttribute('class', `read-status ${bookStatus[0][statusIndex + 1]}`);
            e.target.innerHTML = `${bookStatus[1][statusIndex + 1]}`
        }
        
    }
    
});



// CSS edit: Remove bottom border of the last book if there are 8 or more books

if (library.childElementCount >= 8) {
    let lastBook = library.lastElementChild;
    lastBook.style.cssText = 'border-bottom: none; height: 96px';
}







// Functions

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
                                <div class="pages">Pages: ${myLibrary[myBook].pages}</div>\
                                <button class="read-status ${status}">${myLibrary[myBook].read}</button>\
                            </div>\
                            <button class="bin-button"><img src="assets/trash-can-outline.svg" alt="delete book" class="bin" id="${bookIndex}"></button>\
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