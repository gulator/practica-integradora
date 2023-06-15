let vaciarCarrito = document.querySelector(".del-carrito");

vaciarCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  let cid = localStorage.getItem("idCarrito");
  // let elemento = e.target
  // let pid = elemento.parentElement.parentElement.children[1].innerText
  // let quantity = elemento.parentElement.parentElement.children[3].children[0].value
  // console.log(quantity)
  // let pid = idProducto.slice(4)
  // console.log(pid)
  fetch(`/api/carts/${cid}`, {
    method: "DELETE",
    // headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({quantity: quantity})
  })
  .then(()=>{
    location.reload(true)
  })
  //   location.reload(true)
});