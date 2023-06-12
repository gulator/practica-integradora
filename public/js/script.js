let carrito = document.getElementById("carrito");
carrito.addEventListener("click", () => {
  let cid = localStorage.getItem("idCarrito");
  if (cid) {
    fetch(`/api/carts/${cid}`)
      .then((res) => res.json())
      .then((productos) => {
        console.log(productos);
      });
    window.location.href = `/carts/${cid}`;
  } else {
    fetch("/api/carts", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((datos) => {
        localStorage.setItem("idCarrito", datos);
        console.log(datos);
        window.location.href = `/carts/${datos}`;
        // Handle the response data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors
      });
  }
});

let productos = document.getElementById("productos");
productos.addEventListener("click", () => {
  window.location.href = "/products/";
});

let agregar = document.querySelectorAll(".btn");
for (let n of agregar) {
  n.addEventListener("click", (e) => {
    e.preventDefault();
    let cid = localStorage.getItem("idCarrito");
    console.log(cid);
    let elemento = e.target;
    let idProducto = elemento.parentElement.children[0].children[5].innerText;
    let pid = idProducto.slice(4);
    console.log(pid);
    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    })
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos);
      });
  });
}

let borrar = document.querySelectorAll(".fa-rectangle-xmark");
for (let n of borrar) {
  n.addEventListener("click", (e) => {
    e.preventDefault();
    let cid = localStorage.getItem("idCarrito");
    let elemento = e.target;
    let pid = elemento.parentElement.parentElement.children[1].innerText;
    console.log(pid);
    // let pid = idProducto.slice(4)
    // console.log(pid)
    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "DELETE",
    });
    location.reload(true);
  });
}

let editarCantidad = document.querySelectorAll(".fa-arrows-rotate");
for (let n of editarCantidad) {
  n.addEventListener("click", (e) => {
    e.preventDefault();
    let cid = localStorage.getItem("idCarrito");
    let elemento = e.target;
    let pid = elemento.parentElement.parentElement.children[1].innerText;
    let quantity =
      elemento.parentElement.parentElement.children[3].children[0].value;
    console.log(quantity);
    // let pid = idProducto.slice(4)
    // console.log(pid)
    fetch(`/api/carts/${cid}/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity }),
    })
    .then(()=>{
        location.reload(true)
    })
    //   
  });
}

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
