<template>
  <a href="javascript:void(0)" class="item" @click="openItemPage(id)">
    <div class="item__poster">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${image}`"
        :alt="title"
        v-if="image"
      >
      <img
        src="/static/no-image.jpg"
        :alt="title"
        v-if="!image"
      >
      <span class="item__favorite" v-if="isFavorite"><i class="star"></i></span>
    </div>
    <div class="item__title">
      {{title}}
    </div>
  </a>
</template>

<script>
export default {
  name: 'Item',
  props: {
    image: String,
    title: String,
    id: Number,
    isFavorite: Boolean
  },
  methods: {
    openItemPage (id) {
      this.$router.push({
        name: 'movies',
        params: {
          itemId: `${id}`
        }
      })
    }
  }
}
</script>

<style lang="sass">
.item
  text-decoration: none
  &:hover
    .item__title
      color: #0874ff
    .item__poster
      img
        transform: scale(1.1)
  &__title
    transition: 0.3s
  &__favorite
    position: absolute
    top: 10px
    right: 0
    background-color: #0874ff
    color: white
    padding: 5px
  &__poster
    overflow: hidden
    position: relative
    width: 100%
    padding-top: 150%
    margin-bottom: 15px
    img
      transition: 0.3s
      position: absolute
      top: 0
      left: 0
      height: 100%
      width: 100%
      object-fit: cover
</style>
