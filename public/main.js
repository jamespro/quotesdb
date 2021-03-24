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
    .then(res=> {
        if (res.ok) return res.json()
    })
    .then(response =>{
        console.log(response)
    })
})