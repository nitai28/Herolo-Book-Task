import Vue from "vue";
import Router from "vue-router";
import Home from "./views/book-app.vue";
import Books from "../src/components/book-list";
// import BooksId from "../src/components/book-details";


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },

        {
            path: "/books",
            name: "books",
            component: Books
        },
        // {
        //     path: "/books/:id",
        //     name: "bookid",
        //     component: BooksId
        // },


    ]
});