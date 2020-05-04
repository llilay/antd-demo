import Vue from 'vue';
import Router from 'vue-router';
import { getCookie } from "../assets/js/cookie"
// import clientRouter from "./router/client"
// import extendRouter from "./router/extend"
// import productRouter from "./router/product"
// import visitRouter from "./router/visit"
// import orderRouter from "./router/order"
// import systemRouter from "./router/system";
// import todoRouter from "./router/todo";
// import statisticsRouter from "./router/statistics";

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('../views/main'),
            beforeEnter: (to, from, next) => {
                getCookie("token") ? next() : next("login");
            },
            children: [
                {
                    path: "/",
                    name: "index",
                    component: () => import('../views/index/index'),
                    meta: {
                        title: "首页"
                    }
                },
                // ...clientRouter,
                // ...productRouter,
                // ...visitRouter,
                // ...orderRouter,
                // ...extendRouter,
                // ...systemRouter,
                // ...todoRouter,
                // ...statisticsRouter,
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login'),
            beforeEnter: (to, from, next) => {
                getCookie("token") ? next("/") : next();
            },
        },
        {
            path: '*',
            name: 'notFound',
            component: () => import('../views/404'),
        }
    ],
});

export default router;
