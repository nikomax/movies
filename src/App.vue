<template>
  <div id="app">
    <Header/>
    <router-view :key="$route.fullPath"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {Footer, Header}
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  color: #2c3e50

a
  color: inherit

.container
  max-width: 1280px
  margin: 0 auto
  padding: 0 40px

.films
  display: flex
  flex-wrap: wrap
  &__item
    width: 25%
    padding: 10px
    box-sizing: border-box

.pagination
  display: flex
  list-style: none
  justify-content: center
  &__item
    a
      padding: 5px 10px
      border-radius: 3px
      border: 1px solid rgba(0, 0, 0, 0.2)
      margin: 0 5px
      &:hover
        box-shadow: 0 2px 2px 1px rgba(0,0,0,0.2)
    &.active
      a
        background-color: #0874ff
        color: #fff
</style>
