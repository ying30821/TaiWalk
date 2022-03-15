import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/scenicSpot',
    name: 'ScenicSpot',
    component: () => import('../views/ScenicSpot.vue'),
  },
  {
    path: '/scenicSpot/:spotId',
    component: () => import('../views/ScenicSpotDetail.vue'),
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('../views/Activity.vue'),
  },
  {
    path: '/activity/:activityId',
    component: () => import('../views/ActivityDetail.vue'),
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    component: () => import('../views/Restaurant.vue'),
  },
  {
    path: '/restaurant/:restaurantId',
    component: () => import('../views/RestaurantDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,

  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
