let btn = document.getElementById("psw-reset");
btn.addEventListener("click", () => {
  Toastify({
    text: "Mail enviado para reseteo",
    duration: 4000,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
      color: 'black',
      fontWeight: 'bold',
      borderRadius: "8px"
    },
  }).showToast();
  fetch("../../../api/users/resetpsw")
    .then((res) => res.json())
    .then((data) => {});
});

let role = document.getElementById("change-role");
let text = document.getElementById("userID").innerText;
const userID = text.split(": ")[1]
role.addEventListener("click", () => {
  fetch(`../../../api/users/premium/${userID}`,{
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    }
  })
    .then((res) => res.json())
    .then((data) => {
        if(data.status === 200){
            Toastify({
                text: `${data.result.message}`,
                duration: 3000,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: "8px"
                },
              }).showToast();
              window.location.href = '/api/users/logout';
        }else if(data.status === 400){
            Toastify({
                text: `${data.result.message}`,
                duration: 3000,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(147deg, #ff1b53 0%, #860000 74%)",
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: "8px"
                },
              }).showToast();
        }else if(data.status === 409){
          Toastify({
              text: `${data.message}`,
              duration: 5000,
              gravity: "bottom",
              position: "center",
              stopOnFocus: true,
              style: {
                background: "linear-gradient(147deg, #ff1b53 0%, #860000 74%)",
                color: 'black',
                fontWeight: 'bold',
                borderRadius: "8px"
              },
            }).showToast();
      }else{
            console.log(data)
        }
    });
});

let documentos = document.getElementById("documents");
documentos.addEventListener("click", () => {
  window.location.href = '/documents';
});
