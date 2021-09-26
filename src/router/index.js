import {createRouter, createWebHistory} from 'vue-router'

import Main from '../views/Main.vue'

const routes = [
    {
        path: '/RubyGarage-TodoApp/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/',
        redirect: '/RubyGarage-TodoApp/',
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
