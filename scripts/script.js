document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Создание списка имен героев
  const heroesList = document.getElementById('heroes-list'),
        article = document.querySelector('.marvel-hero'),
        heroProfile = {
          'name' : 'Псевдоним героя',
          'realName' : 'настоящее имя героя',
          'species' : 'Расовая принадлежность',
          'citizenship' : 'Город проживания',
          'gender' : 'Пол',
          'birthDay' : 'Год рождения',
          'deathDay' : 'Год смерти',
          'status' : 'Статус',
          'actors' : 'Актер',
          'photo' : 'Фотография',
          'movies' : 'Список фильмов с участием'
        };

  
  const selectRequest = new XMLHttpRequest();
  selectRequest.open('GET', './scripts/dbHeroes.json');
  selectRequest.setRequestHeader('Content-type', 'application/json');
  selectRequest.send();

  selectRequest.addEventListener('readystatechange', () => {
    if (selectRequest.readyState === 4 && selectRequest.status === 200) {
        const heroesNames = JSON.parse(selectRequest.responseText);
        heroesNames.forEach(item => {
          let option = document.createElement('option');
          option.value = item.name;
          option.textContent= item.name;
          heroesList.appendChild(option);
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
              heroName = document.createElement('p'),
              heroSpecies = document.createElement('p'),
              herogender = document.createElement('p'),
              heroBirthDay = document.createElement('p');
              // heroDeathDay = document.createElement('p'),
              // heroStatus = document.createElement('p'),
              // heroMovies = document.createElement('p');

          heroes.forEach(item => {
            if (item.name === heroesList.value) {
              
              // Очистка карточки
              article.innerHTML = '';

              // Фотография
              heroPhoto.classList.add = 'hero-photo';
              heroPhoto.src = `./${item.photo}`;
              heroPhoto.style.cssText = 'width: 300px';

              // Псевдоним героя
              heroAlias.classList.add('hero-alias');
              heroAlias.textContent = item.name;



              // for (let key in item) {



              // };
              
              // Вставка содержимого
              article.appendChild(heroPhoto);
              article.appendChild(heroAlias);

            }

          });
      }
    });
  });
})