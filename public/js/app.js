//FetchAPI is a browser based API and is not part of JS
//Not accessible in nodeJS.

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    //to prevent from reloading the page when we click on button.
    e.preventDefault()

    const location = search.value

    //fetch data from the url and then process.
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})