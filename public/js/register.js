
function register() {
    
	const first_name = document.getElementById('first_name').value;
	const last_name = document.getElementById('last_name').value;
	const email = document.getElementById('email').value;
	const age = document.getElementById('age').value;
	const password = document.getElementById('password').value;
	const datos = { first_name, last_name, email, age, password };
        
    fetch('/api/users', {
        method: 'POST',
        headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify()
      })
      .then((res) => res.json())
      .then((data)=> {
        console.log(data)
          window.location.href = 'http://localhost:8080/';
      })

        // window.location.href = '/current';
      
      .catch((err) => {
        console.error('Error:', err)
        alert(err)
      });
}