import bookService from "./services/book.service.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        books: [],
        currentBook: {}
    },
    mutations: {
        changeFilter(state, {filter}) {
            state.filter = filter;
        },
        SearchBooks(state, {searchBy}) {
            state.searchBy = searchBy.toLowerCase();
        },
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
        loadBooks(store) {
            bookService.loadDB().then(books => {
                store.commit({type: "setBooks", books});
            });
        },

        deleteBook(store, {id}) {
            bookService.deleteBook(id).then(() => {
                store.commit({type: "deleteBook", id});
                // store.commit({type: "updateActions", name: "deleteBook"});
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
                    store.commit({type: "updateActions", name: "addBook"});
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
