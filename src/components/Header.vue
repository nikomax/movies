<template>
    <header class="header">
      <div class="container">
        <div class="header__inner">
          <div class="header__logo">
            <router-link :to="{ path: '/' }" class="logo">logo</router-link>
          </div>
          <div class="header__search">
            <div class="search">
              <input class="search__input" type="text" @input="search" :value="searchString">
              <div class="search__results" v-if="searchMovies.length">
                <div class="search__item" v-for="film in searchMovies" :key="film.id">
                  <Item :image="film.poster_path" :title="film.title" :id="film.id" @click.native="clearSearch()"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
import axios from 'axios'
import Item from './Item'

const apiKey = '5fc1fc09c4439e9e384f1dce452ba65c'

export default {
  name: 'Header',
  components: {
    Item
  },
  data () {
    return {
      searchString: '',
      searchMovies: []
    }
  },
  methods: {
    search (e) {
      const self = this
      this.searchMovies = []
      this.searchString = e.target.value
      if (this.searchString) {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.searchString}&page=1&include_adult=false`)
          .then(function (response) {
            self.searchMovies = response.data.results
            console.log(self.searchMovies)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    clearSearch () {
      this.searchMovies = []
      this.searchString = ''
    }
  }
}
</script>

<style lang="sass">
.header
  z-index: 1
  position: relative
  padding: 30px 0
  &__inner
    display: flex
    align-items: center
    justify-content: space-between

.logo
  font-size: 24px
  text-decoration: none

.search
  position: relative
  width: 400px
  &__input
    box-sizing: border-box
    width: 100%
    font-size: 16px
    padding: 10px
    border-radius: 3px
    border: 1px solid rgba(0, 0, 0, 0.1)
  &__results
    position: absolute
    top: 100%
    width: 100%
    left: 0
    max-height: 300px
    overflow: auto
    background-color: #fff
    padding: 15px 0
    box-sizing: border-box
    border: 1px solid rgba(0, 0, 0, 0.2)
    border-radius: 0 0 5px 5px
  &__item
    padding: 5px 10px
    &:hover
      background-color: #0874ff
      color: #fff
    .item
      display: flex
      align-items: center
      &__poster
        width: 50px
        padding-top: 20%
        margin-right: 10px
        margin-bottom: 0
        img
          width: 100%
</style>
