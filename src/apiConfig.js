let apiUrl
const apiUrls = {
  production: 'https://krumbl.herokuapp.com',
  development: 'http://krumbl.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
