// import request from '../utils/request';
import axios from 'axios';


export function signin(email, password) {
  return axios.post('api/signin', {
    email,
    password,
  });
}
