'use strict'

// hello its me
document.addEventListener('DOMContentLoaded', () => {
  const advPlace = document.querySelector('.promo__adv')

  const advPictures = advPlace.querySelectorAll('img')

  const advTitle = advPlace.querySelector('.promo__adv-title')

  const mainFilmGenre = document.querySelector('.promo__genre')

  const mainFilmBg = document.querySelector('.promo__bg')

  const moviesList = document.querySelector('.promo__interactive-list')

  const formOnPage = document.querySelector('.add')

  const userInputFilm = formOnPage.querySelector('.adding__input')

  const checkBtn = formOnPage.querySelector('[type="checkbox"]')

  const movieDB = {
    movies: [
      { movieName: 'Логан', favorite: false },
      { movieName: 'Лига справедливости', favorite: true },
      { movieName: 'Ла-ла лэнд', favorite: false },
      { movieName: 'Одержимость', favorite: true },
      { movieName: 'Скотт Пилигрим против...', favorite: false },
    ],
  }

  const delAdvertising = (imgs, title) => {
    title.remove()
    imgs.forEach((img) => {
      img.remove()
    })
  }

  const doChangesOnPage = (genre, bg) => {
    genre.textContent = 'Драма'
    bg.style.background = 'url("img/bg.jpg") center top/cover no-repeat'
  }

  const sortArr = (arr) => {
    arr.sort((a, b) => (a.movieName > b.movieName ? 1 : -1))
  }

  function createMovieList(films, parent) {
    parent.innerHTML = ''
    sortArr(films)
    films.forEach((film, i) => {
      if (film.favorite === 'true' || film.favorite === true) {
        parent.innerHTML += `
        <li class="promo__interactive-item">
          <span></span>${i + 1}. ${film.movieName}
          <div class="delete"></div>
        </li>`
      } else if (film.favorite === 'false' || film.favorite === false) {
        parent.innerHTML += `
        <li class="promo__interactive-item">
          ${i + 1}. ${film.movieName}
          <div class="delete"></div>
        </li>`
      }
    })

    parent.querySelectorAll('.delete').forEach((delBtn, i) => {
      delBtn.addEventListener('click', () => {
        delBtn.parentElement.remove()
        films.splice(i, 1)
        createMovieList(films, parent)
      })
    })
  }

  formOnPage.addEventListener('submit', (event) => {
    event.preventDefault()
    let newFilm = userInputFilm.value
    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.slice(0, 21)}...`
      }
      movieDB.movies.push({
        movieName: `${newFilm[0].toUpperCase()}${newFilm
          .slice(1)
          .toLowerCase()}`,
        favorite: `${checkBtn.checked}`,
      })
      createMovieList(movieDB.movies, moviesList)
    }
    event.target.reset()
  })

  delAdvertising(advPictures, advTitle)
  doChangesOnPage(mainFilmGenre, mainFilmBg)
  createMovieList(movieDB.movies, moviesList)
})
