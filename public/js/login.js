
function login() {
    
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const datos = { email, password };
        
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(datos)
      })
      .then((res) => {window.location.href = '/products';})
            
      .catch((err) => {
        console.error('Error:', err)
        alert(err)
      });
}