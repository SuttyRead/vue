import Vue from 'vue'
import Router from 'vue-router'
import MainPage from "../components/MainPage";
import LoginPage from "../components/LoginPage";
import RegistrationPage from "../components/RegistrationPage";
import EditPage from "../components/EditPage";
import AdminPage from "../components/AdminPage";
import UserPage from "../components/UserPage";
import AddPage from "../components/AddPage";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            name: 'main',
            component: MainPage
        },

        {
            path: '/admin',
            name: 'admin',
            component: AdminPage,
            beforeEnter: (to, from, next) => {
                if (!sessionStorage.getItem('token')) {
                    next('/login');
                    return;
                }
                if (sessionStorage.getItem('role') === 'USER') {
                    next('/user');
                    return;
                }
                next();
            }
        },

        {
            path: '/user',
            name: 'user',
            component: UserPage,
            beforeEnter: (to, from, next) => {
                if (!sessionStorage.getItem('token')) {
                    next('/login');
                    return;
                }
                if (sessionStorage.getItem('role') === 'ADMIN') {
                    next('/admin');
                    return;
                }
                next();
            }
        },

        {
            path: '/login',
            name: 'login',
            component: LoginPage,
            beforeEnter: (to, from, next) => {
                if (sessionStorage.getItem('token')) {
                    next('/admin');
                    return;
                }
                next();
            }
        },

        {
            path: '/registration',
            name: 'registration',
            component: RegistrationPage,
            beforeEnter: (to, from, next) => {
                if (sessionStorage.getItem('token')) {
                    next('/admin');
                    return;
                }
                next();
            }
        },

        {
            path: '/edit/:id',
            name: 'edit',
            component: EditPage,
            beforeEnter: (to, from, next) => {
                if (!sessionStorage.getItem('token')) {
                    next('/login');
                    return;
                }
                if (sessionStorage.getItem('role') === 'ADMIN') {
                    next();
                } else {
                    next('/user');
                }
            }
        },

        {
            path: '/add',
            name: 'add',
            component: AddPage,
            beforeEnter: (to, from, next) => {
                if (!sessionStorage.getItem('token')) {
                    next('/login');
                    return;
                }
                if (sessionStorage.getItem('role') === 'ADMIN') {
                    next();
                } else {
                    next('/user');
                }
            }
        }

    ],
    mode: 'history'
})