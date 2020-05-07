document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Создание списка имен героев
  const heroesList = document.getElementById('heroes-list'),
        films = document.getElementById('films'),
        article = document.querySelector('.marvel-hero'),
        heroesListInMovie = document.querySelector('.heroes-list-in-movie'),
        heroProfile = {
          'name' : 'Псевдоним героя',
          'realName' : 'Настоящее имя героя',
          'species' : 'Расовая принадлежность',
          'citizenship' : 'Национальность',
          'gender' : 'Пол',
          'birthDay' : 'Год рождения',
          'deathDay' : 'Год смерти',
          'status' : 'Статус',
          'actors' : 'Актер',
          'photo' : 'Фотография',
          'movies' : 'Список фильмов с участием'
        },
        marvelMovies = new Set();
  let heroesNames = '';

  const selectRequest = new XMLHttpRequest();
  selectRequest.open('GET', './scripts/dbHeroes.json');
  selectRequest.setRequestHeader('Content-type', 'application/json');
  selectRequest.send();

  selectRequest.addEventListener('readystatechange', () => {
    if (selectRequest.readyState === 4 && selectRequest.status === 200) {
        heroesNames = JSON.parse(selectRequest.responseText);
        
        heroesNames.forEach(item => {
          // Составление списка героев
          let option = document.createElement('option');
          option.value = item.name;
          option.textContent= item.name;
          heroesList.appendChild(option);
          // Составление списка фильмов
          for (let key in item.movies) {
            marvelMovies.add(item.movies[key]);
          }
        });

        marvelMovies.forEach(item => {
          // Заполнение селекта со списком фильмов
          let option = document.createElement('option');
          option.value = item;
          option.textContent= item;
          films.appendChild(option);
        });
    }
  });

  // Вывод карточки героя
  heroesList.addEventListener('change', () => {

    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', './scripts/dbHeroes.json');
    articleRequest.setRequestHeader('Content-type', 'application/json');
    articleRequest.send();
  
    articleRequest.addEventListener('readystatechange', () => {

      if (articleRequest.readyState === 4 && articleRequest.status === 200) {

          const heroes = JSON.parse(articleRequest.responseText);
          let heroPhoto = document.createElement('img'),
              heroAlias = document.createElement('h2'),
              preHeroMovieText = document.createElement('p'),
              heroMovies = document.createElement('ul');

          heroes.forEach(item => {
            if (item.name === heroesList.value) {
              
              // Очистка карточки
              article.innerHTML = '';

              // Фотография
              heroPhoto.classList.add('hero-photo');
              heroPhoto.src = `./${item.photo}`;

              // Псевдоним героя
              heroAlias.classList.add('hero-alias');
              heroAlias.textContent = item.name;

              // Вставка фотографии и псевдонима
              article.appendChild(heroPhoto);
              article.appendChild(heroAlias);

              // Вставка остального содержимого
              for (let key in item) {

                if (key !== 'name' && key !== 'photo' && key !== 'movies') {
                  let p = document.createElement('p');
                  p.classList.add(key.toLowerCase());
                  p.textContent = `${heroProfile[key]} : ${item[key]}`;
                  article.appendChild(p);
                }
              };

              // Вставка списка фильмов
              item['movies'].forEach((film) => {
                let li = document.createElement('li');
                li.textContent = film;
                heroMovies.appendChild(li);
              });
              preHeroMovieText.textContent = 'Фильмы с участием этого героя:';
              article.appendChild(preHeroMovieText);
              article.appendChild(heroMovies);
            }
          });
      }
    });
  });

  // Вывод героев конкретного фильма
  films.addEventListener('change', () => {
    console.log(heroesListInMovie);
    
    heroesListInMovie.innerHTML = '';
    heroesNames.forEach(item => {
      if (!item.movies)
        return;

      if (item.movies.includes(films.value)) {

        let heroPhoto = document.createElement('img'),
            heroAlias = document.createElement('h2'),
            article = document.createElement('article');
        
        // Фотография героя
        heroPhoto.classList.add('hero-photo');
        heroPhoto.src = `./${item.photo}`;

        // Псевдоним героя
        heroAlias.classList.add('hero-alias');
        heroAlias.textContent = item.name;

        // Вставка фотографии и псевдонима
        article.appendChild(heroPhoto);
        article.appendChild(heroAlias);

        heroesListInMovie.appendChild(article);
      }
    });
  });
})