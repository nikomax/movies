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
    id: Number
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
  &__poster
    overflow: hidden
    position: relative
    width: 100%
    padding-top: 150%
    margin-bottom: 15px
    img
      position: absolute
      top: 0
      left: 0
      height: 100%
      width: 100%
      object-fit: cover
</style>
