import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

const URL_ROOT = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=amansor788';

export function fetchPosts(){
  const request = axios.get(`${URL_ROOT}/posts${API_KEY}`);
  
  return{
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback){
  const request = axios.post(`${URL_ROOT}/posts${API_KEY}`, values)
    .then(() => callback());
  
  return{
    type: CREATE_POST,
    payload: request
  };
  
}

export function fetchPost(idPost){
  const request = axios.get(`${URL_ROOT}/posts/${idPost}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(idPost, callback){
  const request = axios.delete(`${URL_ROOT}/posts/${idPost}${API_KEY}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: idPost
  };
}