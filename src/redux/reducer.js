import { getSendingProps } from '../Helpers/SendingProps';

const SET_SEARCH_PHRASE = 'SET_SEARCH_PHRASE';
const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_USER_ID = 'SET_USER_ID';

const SET_USER_NAME = 'SET_USER_NAME';
const SET_MOVIEID = 'SET_MOVIEID';

const SET_IS_LOGGED = 'SET_IS_LOGGED';
const API_URL_FIRST_PART = 'http://localhost:8080/users/authorize?userName=' ;
const API_URL_SECOND_PART = '&password=';

export function login(login, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    dispatch(setUserName(login));
    dispatch(setUserId(null));

    callLoginApi(login, password, userID => {
      dispatch(setLoginPending(false));
      if (userID != null) {
        dispatch(setUserId(userID));
        dispatch(setLoginSuccess(true));
        dispatch(setIsLogged(true));
      } else {
        dispatch(setLoginError(new Error('Invalid login or password')));
      }
    });
  }
}

export function deleteUser() {
  return dispatch => {
    dispatch(setUserId(null));
    dispatch(setUserName(null));
    dispatch(setUserId(null));
    dispatch(setIsLogged(false));
  }
}

export function pushSearchPhrase(phrase) {
  return dispatch => {
    dispatch(setSearchPhrase(phrase))
  }
}

export function setupMovieId(movieid) {
  return dispatch => {
    dispatch(setMovieId(movieid));
  }
}

function setMovieId(movieid) {
  return {
    type: SET_MOVIEID,
    movieid
  }
}

function setSearchPhrase(phrase) {
  return {
    type: SET_SEARCH_PHRASE,
    phrase
  }
}

function setUserId(userID) {
    return {
      type: SET_USER_ID,
      userID
    }
}

function setIsLogged(isLogged) {
  return {
    type: SET_IS_LOGGED,
    isLogged
  }
}

function setUserName(userName) {
  return {
    type: SET_USER_NAME,
    userName
  }
}

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

function callLoginApi(login, password, callback) {
    const URL = `${API_URL_FIRST_PART}${login}${API_URL_SECOND_PART}${password}`;

    setTimeout(() => {
        fetch(URL, getSendingProps)
        .then(res => res.json())
        .then(json => {
            if (json.Response === "200") {
                return callback(json.Id);
            } else {
                return callback(null);
            }
        });

  }, 200);
}

export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  userName: null,
  isLogged: false,
  userID: null,

  phrase: null,
  movieid: null,

}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    case SET_USER_NAME:
      return Object.assign({}, state, {
        userName: action.userName
    });

    case SET_USER_ID:
      return Object.assign({}, state, {
        userID: action.userID
    });

    case SET_IS_LOGGED:
      return Object.assign({}, state, {
        isLogged: action.isLogged
    });

    case SET_SEARCH_PHRASE:
      return Object.assign({}, state, {
        phrase: action.phrase
    });

    case SET_MOVIEID:
      return Object.assign({}, state, {
        movieid: action.movieid
    });

    default:
      return state;
  }
}