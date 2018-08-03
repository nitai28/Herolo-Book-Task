import Vue from "vue";
import Vuex from "vuex";
import bookService from "./services/book.service.js";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        books: [],
        currentBook: {},
    },
    mutations: {
        setBooks(state, {books}) {
            state.books = books;
        },
        setSelectedBook(state, {id}) {
            let book = state.books.find(book => book.id === id)
            state.currentBook = book;
        },
        deleteBook(state, {id}) {
            state.books = state.books.filter(book => book.id !== id);
        },
        addBook(state, {book}) {
            state.books = [book, ...state.books];
        },

        updateBook(state, {book}) {
            const bookIdx = state.books.findIndex(
                currBook => currBook.id === book.id
            );
            state.books.splice(bookIdx, 1, book);
        },


    },

    actions: {

        getBooks(store) {
            bookService.query()
                .then(books => {
                    store.commit({type: 'setBooks', books})
                })
        },

        deletedBook(store, {id}) {
            bookService.removeBook(id).then(() => {
                store.commit({type: "deleteBook", id});
            });
        },
        saveBook(store, {book}) {
            const isEdit = !!book.id;
            return bookService.saveBook(book).then(book => {
                if (isEdit) {
                    store.commit({type: "updateBook", book});
                }
                else {
                    store.commit({type: "addBook", book});
                }
                return book;
            });
        },


    },
    getters: {
        booksForDisplay(state) {
            return state.books;
        },

    }
});
