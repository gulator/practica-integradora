document.addEventListener("DOMContentLoaded", () => {
if (token) {
    validateToken(token);
}
})

function validateToken (token){
    fetch(`../api/users/validatetoken/${token}`)
    .then((res)=>res.json())
    .then((data)=>{
        if (data.status === 200){
            
        }else if (data.status === 401){
            window.location.href = 'http://localhost:8080/resetpassword';
        }else{
            window.location.href = 'http://localhost:8080/login';
        }

    })
}
let btn = document.getElementById('psw-reset')
btn.addEventListener('click',()=>{

    const pswOne = document.getElementById('pswOne').value;
	const pswTwo = document.getElementById('pswTwo').value;
    if (pswOne !== pswTwo){
        Toastify({
            text: "Passwords don't match",
            duration: 4000,
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(147deg, #ff1b53 0%, #860000 74%)",
              color: 'white',
              fontWeight: 'bold',
              borderRadius: "8px"
            },
          }).showToast();
    }
    else{
    fetch('/api/users/changepsw', {
        method: 'PUT',
        headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify({pass: pswOne})
      })
      .then((res)=>res.json())
      .then((data)=>{
        if (data.status === 200){
            Toastify({
                text: `${data.message}`,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
                  color: 'black',
                  fontWeight: 'white',
                  borderRadius: "8px"
                },
              }).showToast();
              setTimeout(function() {
                window.location.href = 'http://localhost:8080/userinfo';
            }, 3000);
        }else if (data.status === 400){
            Toastify({
                text: `${data.message}`,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(147deg, #ff1b53 0%, #860000 74%)",
                  color: 'black',
                  fontWeight: 'white',
                  borderRadius: "8px"
                },
              }).showToast();
        }else{
            Toastify({
                text: data,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(132deg, #ff1b53 0%, #860000 74%)",
                  color: 'black',
                  fontWeight: 'white',
                  borderRadius: "8px"
                },
              }).showToast();
        }
      })

    }
})