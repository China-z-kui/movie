import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/home',
    name: 'routeName',
    component: () => import('../views/HomeView.vue'),
    children:[
      {
        path: 'actor-list',
        name: 'routeName',
        component: () => import('../views/actor/ActorList.vue'),
      },
      {
        path: 'actor-add',
        name: 'routeName',
        component: () => import('../views/actor/ActorAdd.vue'),
      },
      {
        path: 'director-list',
        name: 'routeName',
        component: () => import('../views/director/DirectorList.vue'),
      },
      {
        path: 'director-add',
        name: 'routeName',
        component: () => import('../views/director/DirectorAdd.vue'),
      },
      {
        path: 'movie-list',
        name: 'routeName',
        component: () => import('../views/movie/MovieList.vue'),
      },
      {
        path: 'movie-add',
        name: 'routeName',
        component: () => import('../views/movie/MovieAdd.vue'),
      },
       {
        path: 'movie-update/:id',
        name: 'routeName',
        component: () => import('../views/movie/MovieUpdate.vue'),
      },
      {
        path: 'thumb-list/:movie_id',
        name: 'routeName',
        component: () => import('../views/thumb/ThumbList.vue'),
      },
      {
        path: 'cinema-add',
        name: 'routeName',
        component: () => import('../views/cinema/CinemaAdd.vue'),
      },
      {
        path: 'cinema-list',
        name: 'routeName',
        component: () => import('../views/cinema/CinemaList.vue'),
      },
      {
        path: 'cinema-update/:id',
        name: 'routeName',
        component: () => import('../views/cinema/CinemaUpdate.vue'),
      },
      {
        path: 'cinema-room-list/:id',
        name: 'routeName',
        component: () => import('../views/cinema/CinemaRoomList.vue'),
      },
      {
        path: 'cinema-room-seat-template/:id',
        name: 'routeName',
        component: () => import('../views/cinema/CinemaRoomSeatTemplate.vue'),
      }, 
      {
        path: '/home/showingon-plan/:id',
        name: 'routeName',
        component: () => import('../views/showingon-plan/ShowingonPlanAdd.vue'),
      },
      {
        path: '/home/showingon-plan/list/:id',
        name: 'routeName',
        component: () => import('../views/showingon-plan/ShowingonPlanList.vue'),
      },
      
    ],
   
  },
   {
        path: '/user/login',
        name: 'routeName',
        component: () => import('../views/user/Login.vue'),
      },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
