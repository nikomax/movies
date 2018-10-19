<template>
  <div class="item-page film content">
    <div class="container">
      <div class="film__row">
        <div class="film__col">
          <div class="film__poster-container">
            <div class="film__poster">
              <img :src="`https://image.tmdb.org/t/p/w500/${data.poster_path}`" :alt="data.title">
              <span class="film__favorite" v-if="isFavorite">favorite</span>
            </div>
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
          <div class="film__btn">
            <button @click="addToFavoriteList()" v-if="!isFavorite">
              add to favorite
            </button>
            <button class="remove" @click="removeFromFavoriteList()" v-else>
              remove from favorite
            </button>
          </div>
        </div>
      </div>
      <div class="similar-films">
        <div class="similar-films__title">Similar films</div>
        <div class="similar-films__items">
          <carousel :perPage="5">
            <slide
              v-for="film in similarMovies"
              :key="film.id">
              <div class="similar-films__item">
                <Item
                  :image="film.poster_path"
                  :title="film.title"
                  :id="film.id"
                />
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Item from './Item'
import { Carousel, Slide } from 'vue-carousel'
import { favoriteList, apiKey } from '../store/store'

export default {
  name: 'ItemPage',
  components: {
    Item,
    Carousel,
    Slide
  },
  data () {
    return {
      data: {},
      similarMovies: [],
      isFavorite: false
    }
  },
  props: {
    itemId: String
  },
  methods: {
    addToFavoriteList () {
      favoriteList.addFilm(this.data)
      this.isFavorite = favoriteList.list.some(film => film.id === this.data.id)
    },
    removeFromFavoriteList () {
      favoriteList.removeFilm(+this.itemId)
      this.isFavorite = favoriteList.list.some(film => film.id === this.data.id)
    },
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
          self.isFavorite = favoriteList.list.some(film => film.id === self.data.id)
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
    margin-bottom: 50px
  &__col
    width: 50%
  &__favorite
    position: absolute
    top: 10px
    right: 0
    background-color: #0874ff
    color: white
    padding: 5px
  &__poster-container
    margin-right: 50px
  &__poster
    position: relative
    max-width: 400px
    margin: 0 auto
    img
      width: 100%
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
  &__btn
    margin-top: 20px
    button
      transition: 0.3s
      font-size: 10px
      text-transform: uppercase
      padding: 10px
      background-color: transparent
      cursor: pointer
      border: 2px solid #0874ff
      border-radius: 3px
      font-weight: bold
      color: #0874ff
      &:hover
        background-color: #0874ff
        color: #fff
      &.remove
        border-color: #ff4f51
        color: #ff4f51
        &:hover
          background-color: #ff4f51
          color: #fff

.similar-films
  &__title
    font-size: 20px
  &__item
    padding: 10px
    width: 150px
    img
      width: 100%
</style>
