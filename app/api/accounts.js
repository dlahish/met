import axios from 'axios'
import { AsyncStorage } from 'react-native'

const BASE_URI = `https://spendingapi2.herokuapp.com`

export function currentUser(token) {
  if (token === null) return {}
  return axios.get(`${BASE_URI}/getemail`, { headers: { authorization: token }})
}

export function signin (credentials) {
  const email = credentials.email, password = credentials.password
	return axios.post(`${BASE_URI}/signin`, { email, password })
}

export function signup(credentials) {
  const email = credentials.email, password = credentials.password
	return axios.post(`${BASE_URI}/signup`, { email, password })
}

export function setAuth (res) {
  if (res.data.message) {
    return { authError: res.data.message }
  } else {
    return { token: res.data.token }
    return res
  }
}
