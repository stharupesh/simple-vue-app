import Vue from "vue";
import Router from "vue-router";
import VueRouteMiddleware from 'vue-route-middleware';
import AuthMiddleware from '@/middlewares/auth';

Vue.use(Router);

const router = new Router({
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
        },
        {
            path: '/car',
            component: () => import('@/layout/Main.vue'),
            children: [
                {
                    path: 'in-stock',
                    name: 'car.in-stock',
                    component: () => import('@/views/car/CarsInStock.vue'),
                    meta: {
                        middleware: [AuthMiddleware]
                    }
                }
            ]
        },
    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    },
});

router.beforeEach(VueRouteMiddleware());

export default router