<template>
  <div class="main">
    <div class="films">
      <div class="films__item" v-for="film in data.results" :key="film.id">
        <Item :image="film.poster_path" :title="film.title" :id="film.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Item from './Item'

export default {
  name: 'Hello',
  components: {Item},
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    const self = this
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=5fc1fc09c4439e9e384f1dce452ba65c&language=en-US&page=1')
      .then(function (response) {
        console.log(response.data)
        self.data = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style lang="sass">
.films
  display: flex
  flex-wrap: wrap
  &__item
    width: 25%
</style>
