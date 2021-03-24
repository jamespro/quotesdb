const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    //Send PUT Request here
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Victor Hugo',
            quote: 'There is nothing like a dream to create the future.'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
    })
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#deleteMessage')

deleteButton.addEventListener('click',_ => {
    fetch('/quotes',{
        method:'delete',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Victor Hugo'
        })
    })
    .then(res=>{
        if (res.ok) return res.json()
    })
    .then(response => {
       if (response === 'No quote to delete') {
           messageDiv.textContent = 'No fancy quote to delete'
       } else {
        window.location.reload(true)
       }
    })
    .catch(error=>console.error(error))
})
