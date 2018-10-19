
export const favoriteList = {
  list: [],
  addFilm (film) {
    this.list.push(film)
    localStorage.setItem('filmsList', JSON.stringify({
      list: this.list
    }))
  },
  removeFilm (filmId) {
    this.list = this.list.filter(item => {
      return filmId !== item.id
    })
    localStorage.setItem('filmsList', JSON.stringify({
      list: this.list
    }))
  }
}

let storedFilms = JSON.parse(localStorage.getItem('filmsList'))
if (storedFilms) {
  favoriteList.list = storedFilms.list
} else {
  localStorage.setItem('filmsList', JSON.stringify({
    list: this.list
  }))
}

export const apiKey = '5fc1fc09c4439e9e384f1dce452ba65c'
