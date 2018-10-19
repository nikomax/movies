<template>
  <div class="content">
    <div class="container">
      <div class="films" v-if="films.length">
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
      <div v-else>There is no favorite films...</div>
    </div>
  </div>
</template>

<script>
import Item from './Item'
import { favoriteList } from '../store/store'

export default {
  name: 'FavoriteList',
  components: {Item},
  data () {
    return {
      films: favoriteList.list
    }
  }
}
</script>

<style scoped>

</style>
