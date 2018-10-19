<template>
  <div class="genre-page content">
    <div class="container">
      <div class="films">
        <div
          class="films__item"
          v-for="film in films"
          :key="film.id">
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
  name: 'GenrePage',
  components: {Item, Paginate},
  data () {
    return {
      films: [],
      page: 1,
      pages: 0
    }
  },
  props: {
    genreId: String
  },
  methods: {
    loadPage (page) {
      const self = this
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=${this.genreId}`)
        .then(function (response) {
          self.films = response.data.results
        })
        .catch(function (error) {
          console.log(error)
        })
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    const self = this
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${this.page}&with_genres=${this.genreId}`)
      .then(function (response) {
        self.films = response.data.results
        self.pages = response.data.total_pages
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>

</style>
