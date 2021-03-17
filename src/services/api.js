import { apiUrl, defaultQueryParams } from '../helpers/config';

function setupRequestOptions(data) {
  const body = new FormData();

  for ( let el in data ) {
    body.append(el, data[el]);
  }

  const headers = new Headers();
  headers.append('Mime-Type', 'multipart/form-data');
  const options = {
    method: data ? 'POST' : 'GET',
    headers,
  };
  if (data) options.body = body;
  return options;
}

function buildQuery(object) {
  let str = '';
  for (let param in object) {
    if (object[param])
      str += `${param}=${object[param]}&`
  }
  return str.substring(0, str.length - 1)
}

export const httpGet = (url, queryParams = false) => {

  const query = '/?' + buildQuery(defaultQueryParams) + (queryParams ? ('&' + buildQuery(queryParams)) : '');

  return fetch(`${apiUrl}${url}${query}` , setupRequestOptions()).then(res => res.json()).then(handleRequest);
};

export const httpPost = (url, data = {}, isLocal = true) => {
  return fetch( `${apiUrl}${url}/?${buildQuery(defaultQueryParams)}` , setupRequestOptions(data)).then(res => {return res.json()}).then(handleRequest);
};

function handleRequest(data) {

  if (data?.status !== 'ok' && data?.message?.token) {
    window.location.href = '/login'
  }
  return data;
}