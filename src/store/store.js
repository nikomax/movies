export const favoriteList = {
  list: [],
  addFilm (film) {
    this.list.push(film)
    // localStorage.setItem('auth', JSON.stringify({
    //   isAuthenticated: this.isAuthenticated
    // }));
  },
  removeFilm (filmId) {
    this.list = this.list.filter(item => {
      return filmId !== item.id
    })
  // localStorage.setItem('auth', JSON.stringify({
  //   isAuthenticated: this.isAuthenticated
  // }));
  }
}

export const apiKey = '5fc1fc09c4439e9e384f1dce452ba65c'
