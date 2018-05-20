import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const URL_ROOT = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=amansor788';

export function fetchPosts(){

  const request = axios.get(`${URL_ROOT}/posts${API_KEY}`);
  return{
    type: FETCH_POSTS,
    payload: request
  };
}