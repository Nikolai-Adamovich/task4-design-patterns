'use strict';
import '../scss/style.scss';

import '@babel/polyfill';
import 'whatwg-fetch';
import drawNewsList from './draw-news-list.js';
import drawError from './draw-error.js';
import {setMainParameters, setPaginationParameters} from './set-parameters';
import Pagination from './pagination.js';
import {mainParameters, paginationParameters} from './url-parameters';

const {categories, countries} = require('./json/menu.json');

const fetchNews = async () => {
  document.querySelector('.show-news-button__wrapper').style.display = 'none';

  const paginationRoot = document.querySelector('.pagination');
  try {
    const { default: getNews } = await import(
      /* webpackChunkName: 'get-news.js' */
      /* webpackMode: 'lazy' */
      './get-news.js'
    );
    const data = await getNews();
  
    if (data.status === 'ok') {
      if (data.totalResults > 0) {
        drawNewsList(data.articles);
        window.scrollTo(0, 0);

        const pageSize = paginationParameters.get('pageSize');
        
        if (data.totalResults > pageSize) {
          new Pagination(paginationRoot, data.totalResults, pageSize, paginationParameters.get('page') || 1);
        } else {
          paginationRoot.classList.toggle('pagination--visible', false);
        }
      } else {
        drawError(`Sorry. We can't find anything. Try to change your search options.`);
        paginationRoot.classList.toggle('pagination--visible', false);
      }
    } else {
      drawError(data.message);
      paginationRoot.classList.toggle('pagination--visible', false);
    }
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('load', () => {
  /* Draw menu Categories & Counties from json (translated by custom loader) */
  const categoriesWrapper = document.querySelector('#categories-wrapper');
  for (const {
    id,
    attributes,
    value,
    text
  } of categories) {
    categoriesWrapper.insertAdjacentHTML('beforeend',
      `<input type="radio" name="category" value="${value}" id="${id}" ${attributes}>
      <label class="nav__radio-label" for="${id}">${text}</label>`
    );
  }
  
  const countriesWrapper = document.querySelector('#countries-wrapper');
  for (const {
    id,
    attributes,
    value,
    text
  } of countries) {
    countriesWrapper.insertAdjacentHTML('beforeend',
      `<input type="radio" name="country" value="${value}" id="${id}" ${attributes}>
      <label class="nav__radio-label" for="${id}">${text}</label>`
    );
  }

  /* Load news only when press button */
  const showNewsButton = document.querySelector('.show-news-button');

  showNewsButton.addEventListener('click', () => fetchNews());
    
  /* Minimize header height when scroll down */
  const html = document.querySelector('html');
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--small', html.scrollTop > 0);
  });
  
  /* Toggle navigation menu */
  const navButton = document.querySelector('.nav__button');
  const navMenu = document.querySelector('.nav__menu');
  
  navButton.addEventListener('click', () => {
    navMenu.classList.toggle('nav__menu--visible');
  });
  
  /* Clear search parameters and send default request */
  const clearBtn = document.querySelector('#clear');
  const searchTextInput = document.querySelector('.nav__search');
  
  clearBtn.addEventListener('click', () => {
    const categoryDefaultInput = document.querySelector('#category-all');
    const countryDefaultInput = document.querySelector('#country-all');

    searchTextInput.value = '';
    categoryDefaultInput.checked = true;
    countryDefaultInput.checked = true;
    navMenu.classList.toggle('nav__menu--visible', false);
    setMainParameters({
      category: '',
      country: '',
      q: ''
    });
    setPaginationParameters({
      pageSize: 20,
      page: 1
    });
    fetchNews();
  });
  
  /* Apply search parameters and send new request */
  const applyBtn = document.querySelector('#apply');
  
  applyBtn.addEventListener('click', () => {
    let categoryCheckedValue = document.querySelector('input[name="category"]:checked').value;
    let countryCheckedValue = document.querySelector('input[name="country"]:checked').value;
    const searchTextInputValue = searchTextInput.value.trim();
    
    if (searchTextInputValue) {
      /* Search text can't be sent with other parameters using 'everything' endpoint */
      categoryDefaultInput.checked = true;
      countryDefaultInput.checked = true;
      categoryCheckedValue = '';
      countryCheckedValue = '';
    }
    
    setMainParameters({
      category: categoryCheckedValue,
      country: countryCheckedValue,
      q: searchTextInputValue
    });
    navMenu.classList.toggle('nav__menu--visible', false);
    fetchNews();
  });
  
  /* Pagination click */
  const paginationRoot = document.querySelector('.pagination');
  
  paginationRoot.addEventListener('click', (e) => {
    const target = e.target;
    
    if (target.tagName === 'LI') {
      let value = parseInt(target.innerText);
      
      if (target.innerText === '\u00ab') {
        value = paginationParameters.get('page') - 1;
      } else if (target.innerText === '\u00bb') {
        value = paginationParameters.get('page') + 1;
      }
      
      if (value && value !== paginationParameters.get('page')) {
        setPaginationParameters({
          pageSize: 20,
          page: value
        });
        fetchNews();
      }
    }
  });
});