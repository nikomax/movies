<template>
  <div class="item-page film">
    <div class="container">
      <div class="film__row">
        <div class="film__col">
          <div class="film__poster">
            <img :src="`https://image.tmdb.org/t/p/w500/${data.poster_path}`" :alt="data.title">
          </div>
        </div>
        <div class="film__col">
          <div class="film__info">
            <div class="film__info-item"><b>Title:</b> {{data.title}}</div>
            <div class="film__info-item"><b>Date:</b> {{data.release_date}}</div>
            <div class="film__info-item"><b>Rate:</b> {{data.vote_average}}</div>
            <div class="film__info-item"><b>Genres:</b>
              <a class="film__genre" href="javascript:void(0)"
                 v-for="genre in data.genres"
                 :key="genre.id"
                 @click="openGenreList(genre.id)"
              >
                {{genre.name}}
              </a>
            </div>
            <div class="film__info-item"><b>Budget:</b> {{data.budget}}$</div>
            <div class="film__info-item"><b>Language:</b> {{data.original_language}}</div>
            <div class="film__info-item"><b>Overview:</b> {{data.overview}}</div>
          </div>
        </div>
      </div>
      <div class="similar-films">
        <div class="similar-films__title">Similar films</div>
        <div class="similar-films__items">
          <div class="similar-films__item" v-for="film in similarMovies" :key="film.id">
            <Item :image="film.poster_path" :title="film.title" :id="film.id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Item from './Item'

const apiKey = '5fc1fc09c4439e9e384f1dce452ba65c'

export default {
  name: 'ItemPage',
  components: {
    Item
  },
  data () {
    return {
      data: {},
      similarMovies: []
    }
  },
  props: {
    itemId: String
  },
  methods: {
    openGenreList (id) {
      this.$router.push({
        name: 'genre',
        params: {
          genreId: `${id}`
        }
      })
    },
    createPage () {
      const self = this
      axios.get(`https://api.themoviedb.org/3/movie/${self.itemId}?api_key=${apiKey}`)
        .then(function (response) {
          self.data = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      axios.get(`https://api.themoviedb.org/3/movie/${self.itemId}/similar?api_key=${apiKey}&page=1`)
        .then(function (response) {
          self.similarMovies = response.data.results
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
.film
  &__row
    display: flex
  &__col
    width: 50%
  &__genre
    position: relative
    &:hover
      text-decoration: none
      transition: 0.3s
      color: #0874ff
    &:not(:last-child)
      padding-right: 5px
      margin-right: 5px
      &:after
        content: ''
        position: absolute
        right: 0
        top: 0
        height: 100%
        width: 1px
        background-color: #989588

.similar-films
  &__title
    font-size: 20px
  &__items
    display: flex
    flex-wrap: wrap
  &__item
    padding: 10px
    width: 150px
    img
      width: 100%
</style>
