<template>
  <div class="main content">
    <div class="container">
      <div class="films">
        <div class="films__item" v-for="film in data.results" :key="film.id">
          <Item
            :image="film.poster_path"
            :title="film.title"
            :id="film.id"
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

const apiKey = '5fc1fc09c4439e9e384f1dce452ba65c'

export default {
  name: 'Hello',
  components: {Item, Paginate},
  data () {
    return {
      data: {},
      page: 1,
      pages: 0
    }
  },
  methods: {
    loadPage (page) {
      const self = this
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`)
        .then(function (response) {
          self.data = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    const self = this
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.page}`)
      .then(function (response) {
        self.data = response.data
        self.pages = response.data.total_pages
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style lang="sass">

</style>
