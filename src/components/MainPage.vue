<template>
  <div class="main content">
    <div class="container">
      <div class="films">
        <div class="films__item" v-for="(film, index) in data.results" :key="film.id">
          <Item
            :image="film.poster_path"
            :title="film.title"
            :id="film.id"
            :isFavorite="favoriteList[index]"
          />
        </div>
      </div>
      <paginate
        v-model="page"
        :page-count="pages"
        :page-range="3"
        :margin-pages="3"
        :click-handler="loadPage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'pagination__item'">
      </paginate>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Item from './Item'
import Paginate from 'vuejs-paginate'
import { favoriteList, apiKey } from '../store/store'

export default {
  name: 'Hello',
  components: {Item, Paginate},
  data () {
    return {
      data: {},
      page: 1,
      pages: 0,
      favoriteList: []
    }
  },
  methods: {
    loadPage (page) {
      const self = this
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`)
        .then(function (response) {
          self.data = response.data
          self.favoriteList = self.data.results.map(item => favoriteList.list.some(film => film.id === item.id))
        })
        .catch(function (error) {
          console.log(error)
        })
      window.scrollTo(0, 0)
    },
    createPage () {
      const self = this
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.page}`)
        .then(function (response) {
          self.data = response.data
          self.pages = response.data.total_pages
          self.favoriteList = self.data.results.map(item => favoriteList.list.some(film => film.id === item.id))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.createPage()
  }
}
</script>

<style lang="sass">

</style>
