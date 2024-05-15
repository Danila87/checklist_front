import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../components/Forms/Auth.vue')
    },

    {
      path: '/registration',
      name: 'Register',
      component: () => import('../components/Forms/Registration.vue')
    },

    {
        path: '/',
        component: () => import('../layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'Main',
                component: () => import('../views/MainView.vue'),
            },
            {
                path: 'create_checklist',
                name: 'CreateCheckList',
                component: () => import('../views/CreateCheckList.vue'),
            },
            {
                path: 'operations',
                name: 'AllOperations',
                component: () => import('../views/Operations.vue')
            },
            {
                path: 'types_checklist',
                name: 'typesCheckList',
                component: () => import('../views/TypesCheckList.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router