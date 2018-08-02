// import utilService from './util.service.js';
import storageService from './storage.service.js'

const KEY = 'booksAppKey';


function loadDB() {
    if (!localStorage[KEY]) {
        fetch(`./booksDB.json`).then(function (response) {
            response.json().then(books => {
                localStorage[KEY] = JSON.stringify(books)
            })

        })
    }
    return storageService.load(KEY)
}

// function loadDB() {
//     return fetch(`./booksDB.json`).then(function (response) {
//
//         return response.json();
//     });
// }

function getEmptyObj() {
    return {
        id: '',
        authorName: '',
        publishedDate: '',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Naaria3.jpg',
        bookTitle: '',
        description: ''
    }

}


function getById(bookId) {
    let books = this.$store.getters.booksForDisplay;
    console.log(books())
    return this.$store.state.books.filter(book => book.id === bookId);

}

function removeBook(bookId) {
    console.log(3)
    return storageService.load(KEY).then(books => {
        books = books.filter(book => book.id !== bookId);
        return storageService.store(KEY, books);
    });
}


function saveBook(book) {
    return new Promise((resolve, reject) => {
        storageService.load(KEY)
            .then(books => {
                if (book.id) {
                    var bookIdx = books.findIndex(currBook => currBook.id === book.id)
                    books.splice(bookIdx, 1, book);
                } else {
                    book.id = Date.now();
                    books.push(book);
                }
                storageService.store(KEY, books);
                resolve(book)
            });
    });


}

export default {
    loadDB,
    getById,
    saveBook,
    removeBook,
    getEmptyObj
}
