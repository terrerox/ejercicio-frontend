import { httpClient } from '../config'
const userService = {}

const OK_STATUS_CODE = 200

userService.login = (loginCredentials) => {
  return httpClient.post('/auth', loginCredentials)
    .then(response => {
      const { token } = response.data

      if (token) {
        localStorage.setItem('user-token', JSON.stringify(token))
      }
      return response
    })
}

userService.register = (registerCredentials) => {
  return httpClient.post('/users', registerCredentials)
    .then(response => {
      if(response.status !== OK_STATUS_CODE) return response

      const { token } = response.data.session

      if (token) {
        localStorage.setItem('user-token', JSON.stringify(token))
      }
      return response
    })
}

userService.getAll = () => {
    return httpClient.get('/users')
      .then(response => response.data)
}

userService.logout = () => {
  localStorage.removeItem('user-token')
}

export default userService