const socket = io()

let user;
const inputMsj = document.getElementById('msj')

Swal.fire({
    title: "Bienvenido",
    input: 'text',
    text: 'Identificate para participar del chat',
    icon: 'success',
    inputValidator: (value)=>{
        return !value && 'Tenes que identificarte. NN aca no'
    },
    allowOutsideClick: false
})
.then ((res) => {
    user = res.value
})

inputMsj.addEventListener ('keyup', e => {
    if (e.key === 'Enter'){
        let message = inputMsj.value
        if (message.trim().length > 0 ){
            socket.emit('message', {user, message})
            inputMsj.value = ""
        }
    }
})

function render(data){
    const html = data
        .map ((elem, index) => {
            return`<p><strong>${elem.user}:</strong> <em>${elem.message}</em></p>`
        })
        .join(' ')
    document.getElementById('history').innerHTML = html
}

socket.on('messages', (datos)=>{
    render(datos)
})