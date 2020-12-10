import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";

Vue.use(Router);

export default new Router({
    linkExactActiveClass: "active",
    mode: 'history',
    routes: [
        {
            path: '/user',
            component: () => import('@/layout/FullPage.vue'),
            children: [
                {
                    path: 'login',
                    name: 'user.login',
                    component: () => import('@/views/public/user/Login.vue')
                }
            ]
        }
    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    },
});
