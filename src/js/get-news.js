import '../scss/components/_news.scss';
import {mainParameters, paginationParameters} from './url-parameters';
import fetchFactory from './fetch-factory';

const fetchGet = fetchFactory('get');
// post works, but it's not allowed to use on https://newsapi.org
const fetchPost = fetchFactory('post');

let baseUrl;
const apiKey = 'd72c9d0925a44fb8a00c4f2ed855167c';

const createQueryParams = () => {
  baseUrl = 'https://newsapi.org/v2/';
  let parameterIndex = 0;
  const queryParams = new URLSearchParams();

  // Add user search query if it is specified otherwise add
  if (/[а-яё\w\d]{3,}/i.test(mainParameters.get('q'))) {
    baseUrl += 'everything';
  } else {
    baseUrl += 'top-headlines';
  }
  
  for (let parameter of mainParameters) {
    if (parameter[1]) {
      queryParams.set(parameter[0], parameter[1]);
      parameterIndex++;
    }
  }

  // Fallback in case if none of the required parameters are specified
  if (parameterIndex === 0) {
    queryParams.set('language', 'en');
  }

  // Pagination parameters
  for (let parameter of paginationParameters) {
    if (parameter[1]) {
      queryParams.set(parameter[0], parameter[1]);
    }
  }

  queryParams.set('apiKey', apiKey);

  return queryParams;
};

const getNews = async () => {
  const queryParams = createQueryParams();
  return await fetchGet(baseUrl, queryParams);
};

export default getNews;