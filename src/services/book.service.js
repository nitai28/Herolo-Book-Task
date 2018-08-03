import storageService from './storage.service.js'
import axios from 'axios';

const KEY = 'booksAppKey';


function loadDB() {
    if (!localStorage[KEY]) {
        console.log('1');
         fetch(`./booksDB.json`).then(function (response) {
            response.json().then(books => {
                localStorage[KEY] = JSON.stringify(books)
            })

        })
    }
    return storageService.load(KEY)
}
function query() {
    return axios.get('booksDb.json')
        .then(res => {
            localStorage[KEY] = JSON.stringify(res.data)
            return res.data;
        });

}

function getEmptyObj() {
    return {
        id: '',
        authorName: '',
        publishedDate: '',
        imgSrc: '',
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
    getEmptyObj,
    query
}
