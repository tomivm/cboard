import axios from 'axios';

//GET https://photoslibrary.googleapis.com/v1/albums/{albumId}
export function getAlbums(token) {
  const urlQuery = 'https://photoslibrary.googleapis.com/v1/albums';
  return axios
    .get(urlQuery, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw new Error(err.message);
    });
}

export function getAlbumContent(params) {
  const urlQuery =
    'https://content-photoslibrary.googleapis.com/v1/mediaItems:search';
  const body = {};

  if (params.id) body.albumId = params.id;

  if (params.filters) {
    const filtersObject = {
      contentFilter: {
        includedContentCategories: [params.filters]
      }
    };
    body.filters = filtersObject;
  }

  if (params.nextPage) body.pageToken = params.nextPage;
  return axios
    .post(urlQuery, body, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${params.token}`
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw new Error(err.message);
    });
}