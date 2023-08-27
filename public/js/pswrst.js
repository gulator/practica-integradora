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
  fetch("`../../../api/users/resetpsw")
    .then((res) => res.json())
    .then((data) => {});
});
