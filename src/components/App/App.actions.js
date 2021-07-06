import {
  FINISH_FIRST_VISIT,
  UPDATE_DISPLAY_SETTINGS,
  UPDATE_NAVIGATION_SETTINGS,
  UPDATE_USER_DATA,
  LOG_IN_GOOGLE_PHOTOS,
  LOG_OUT_GOOGLE_PHOTOS,
  DISABLE_TOUR
} from './App.constants';

import {
  getAuthtoken,
  refreshAuthToken
} from '../Board/GooglePhotosSearch/googlePhotosSearch.auth';

export function updateDisplaySettings(payload = {}) {
  return {
    type: UPDATE_DISPLAY_SETTINGS,
    payload
  };
}

export function updateNavigationSettings(payload = {}) {
  return {
    type: UPDATE_NAVIGATION_SETTINGS,
    payload
  };
}

export function finishFirstVisit() {
  return {
    type: FINISH_FIRST_VISIT
  };
}

export function disableTour(payload = {}) {
  return {
    type: DISABLE_TOUR,
    payload
  };
}

export function updateUserData(userData) {
  return {
    type: UPDATE_USER_DATA,
    userData
  };
}

export function logInGooglePhotosAuth({ googlePhotosCode, refreshToken }) {
  return dispatch =>
    new Promise(resolve => {
      if (googlePhotosCode) {
        getAuthtoken(googlePhotosCode)
          .then(googlePhotosAuth => {
            dispatch({
              type: LOG_IN_GOOGLE_PHOTOS,
              googlePhotosAuth: googlePhotosAuth.tokens
            });
            resolve();
          })
          .catch(error => {
            throw error;
          });
      } else if (refreshToken) {
        refreshAuthToken(refreshToken)
          .then(googlePhotosAuth => {
            dispatch({
              type: LOG_IN_GOOGLE_PHOTOS,
              googlePhotosAuth: googlePhotosAuth
            });
            resolve();
          })
          .catch(error => {
            throw error;
          });
      }
    });
}

export function logOutGooglePhotos() {
  return {
    type: LOG_OUT_GOOGLE_PHOTOS
  };
}
