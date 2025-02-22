import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DetailsView from "@/views/DetailsView.vue";
import PeopleView from "@/views/PeopleView.vue";
import PeopleDetail from "@/views/PeopleDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/anime/:id",
      name: "Anime Detail",
      component: DetailsView,
      props: true,
    },
    {
      path: "/people",
      name: "People Search",
      component: PeopleView,
    },
    {
      path: "/people/:id",
      name: "People Detail",
      component: PeopleDetail,
      // props: true,
    },
  ],
});

export default router;
