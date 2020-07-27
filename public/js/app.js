// this client-side js will use the fetch api, which is only accessible on the front end, as it is browser-based
// it is an asynchronous operation. Callback syntax is different from node.js, using the .then() function
// promises and async await are other things we'll be looking at

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  // stop browser from auto refreshing
    const location = encodeURI(search.value)
    const searchUrl = 'http://localhost:3000/weather?address=' + location

    console.log(searchUrl)
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    fetch(searchUrl).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})