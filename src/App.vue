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
  display: flex
  flex-direction: column
  min-height: 100vh
  justify-content: space-between
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  color: #2c3e50

a
  color: inherit

body
  margin: 0
  padding: 0

.content
  flex-grow: 1
  padding-bottom: 60px

.container
  max-width: 1080px
  margin: 0 auto
  padding: 0 40px

.films
  display: flex
  flex-wrap: wrap
  margin-bottom: 30px
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

.star
  position: relative
  display: inline-block
  width: 0
  height: 0
  margin-left: .9em
  margin-right: .9em
  margin-bottom: .8em
  border-right:  .3em solid transparent
  border-bottom: .7em  solid #FC0
  border-left:   .3em solid transparent
  /* Controlls the size of the stars. */
  font-size: 10px
  &:before, &:after
    content: ''
    display: block
    width: 0
    height: 0
    position: absolute
    top: .6em
    left: -1em
    border-right:  1em solid transparent
    border-bottom: .7em  solid #FC0
    border-left:   1em solid transparent
    transform: rotate(-35deg)
  &:after
    transform: rotate(35deg)

</style>
