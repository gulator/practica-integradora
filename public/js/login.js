// const enviar = document.getElementById('enviarLogin')
console.log('listening')
// enviar.addEventListener('click',login)
const usuario = document.getElementById('email').value;
const contra = document.getElementById('password').value;

function login() {
    
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const datos = { email, password };
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
            
        })
        .then((res) =>  {
            
            window.location.href = '/api/users/private';
        })
        .catch((err) => {
            console.error('Error:', err)
            alert(err)
        })
}