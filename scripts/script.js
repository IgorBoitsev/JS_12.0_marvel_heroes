document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const heroesList = document.getElementById('heroes-list');
  
  // heroesList.addEventListener('change', () => {
  //   const request = new XMLHttpRequest();
  //   request.open('GET', './scripts/dbHeroes.json');
  //   request.setRequestHeader('Content-type', 'application/json');
  //   request.send();
  //   const data = request.responseText;
  //   console.log('data: ' + data);
    
  // });

  const request = new XMLHttpRequest();
  request.open('GET', './scripts/dbHeroes.json');
  request.setRequestHeader('Content-type', 'application/json');
  request.send();
  const data = request.response;
  console.log('data: ' + data);
})
