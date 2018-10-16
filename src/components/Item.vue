<template>
  <a href="javascript:void(0)" class="item">
    <div class="item__poster">
      <img :src="`https://image.tmdb.org/t/p/w500/${image}`" :alt="title">
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
    id: String
  }
}
</script>

<style scoped>

</style>
