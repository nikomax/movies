import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import ItemPage from '@/components/ItemPage'
import GenrePage from '@/components/GenrePage'
import FavoriteList from '@/components/FavoriteList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: FavoriteList
    },
    {
      name: 'movies',
      path: '/movies/:itemId',
      component: ItemPage,
      props: true
    },
    {
      name: 'genre',
      path: '/genre/:genreId',
      component: GenrePage,
      props: true
    }
  ]
})
