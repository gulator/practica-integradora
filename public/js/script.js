let carrito = document.getElementById("carrito");
carrito.addEventListener("click", Carrito);

function Carrito() {
  let cid = localStorage.getItem("idCarrito");
  if (cid) {
    fetch(`/api/carts/${cid}`)
      .then((res) => res.json())
      .then((productos) => {
        // console.log(productos);
      });
    window.location.href = `/carts/${cid}`;
  } else {
    fetch("/api/carts", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((datos) => {
        localStorage.setItem("idCarrito", datos.payload);
        window.location.href = `/carts/${datos.payload}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function CheckCarrito() {
  let cid = localStorage.getItem("idCarrito");
  if (cid) {
    fetch(`/api/carts/${cid}`)
      .then((res) => res.json())
      .then((productos) => {});
  } else {
    fetch("/api/carts", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((datos) => {
        localStorage.setItem("idCarrito", datos.payload);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

let productos = document.getElementById("productos");
productos.addEventListener("click", () => {
  window.location.href = "/products/";
});

let agregar = document.querySelectorAll(".btn");
for (let n of agregar) {
  n.addEventListener("click", (e) => {
    e.preventDefault();

    let cid = localStorage.getItem("idCarrito");
    let elemento = e.target;
    let idProducto = elemento.parentElement.children[0].children[5].innerText;
    let pid = idProducto.slice(4);
    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    })
      .then((response) => response.json())
      .then((datos) => {
        if (datos.status === 200) {
          Toastify({
            text: `${datos.message}`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
              background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
              color: "black",
              fontWeight: "white",
              borderRadius: "8px",
            },
          }).showToast();
        } else if (datos.status === 400) {
          Toastify({
            text: `${datos.message}`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
              background: "linear-gradient(147deg, #ff1b53 0%, #860000 74%)",
              color: "white",
              fontWeight: "white",
              borderRadius: "8px",
            },
          }).showToast();
        }
      });
  });
}

let borrarProducto = document.querySelectorAll(".btn-borrar");
for (let n of borrarProducto) {
  n.addEventListener("click", (e) => {
    e.preventDefault();

    let elemento = e.target;
    let idProducto = elemento.parentElement.children[0].children[5].innerText;
    let pid = idProducto.slice(4);
    // console.log(pid);
    fetch(`/api/products/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((datos) => {});
  });
}

let borrar = document.querySelectorAll(".fa-rectangle-xmark");
for (let n of borrar) {
  n.addEventListener("click", (e) => {
    e.preventDefault();
    let cid = localStorage.getItem("idCarrito");
    let elemento = e.target;
    let pid = elemento.parentElement.parentElement.children[1].innerText;

    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "DELETE",
    }).then(() => {
      location.reload(true);
    });
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
    // let pid = idProducto.slice(4)
    // console.log(pid)
    fetch(`/api/carts/${cid}/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity }),
    }).then(() => {
      location.reload(true);
    });
    //
  });
}

fetch("/api/users/activecart")
  .then((res) => res.json())
  .then((data) => {
    const cid = data.activeCart;
    if (cid !== "none") {
      fetch(`/api/carts/${cid}`)
        .then((res) => res.json())
        .then((productos) => {
          localStorage.setItem("idCarrito", cid);
        });
    } else {
      fetch("/api/carts", {
        method: "POST",
      })
        .then((response) => response.json())
        .then((datos) => {
          localStorage.setItem("idCarrito", datos.payload);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

const vaciar = document.getElementById(".del-carrito");
vaciar.addEventListener("click", (e) => {
  e.preventDefault();
  let cid = localStorage.getItem("idCarrito");
  fetch(`/api/carts/${cid}`, {
    method: "DELETE",
  });
});

let link = "?";
let limit = "";
let brand = "";
let stock = "";
let sort = "";

let limitSelect = document.getElementById("limit-select");
limitSelect.addEventListener("change", () => {
  limit = `limit=${limitSelect.value}&`;
  links();
});

let brandSelect = document.getElementById("brand-select");
brandSelect.addEventListener("change", () => {
  if (brandSelect.value === "none") {
    brand = "";
    links();
  } else {
    brand = `brand=${brandSelect.value}&`;
    links();
  }
});

let stockSelect = document.getElementById("stock-select");
stockSelect.addEventListener("change", () => {
  if (stockSelect.value === "none") {
    stock = "";
    links();
  } else {
    stock = `stock=${stockSelect.value}&`;
    links();
  }
});

let sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", () => {
  if (sortSelect.value === "none") {
    sort = "";
    links();
  } else {
    sort = `sort=${sortSelect.value}&`;
    links();
  }
});

function links() {
  let page = document.getElementById("current-page").innerText;
  if (limit.length > 0) {
    link = link + limit;
  }
  if (brand.length > 0) {
    link = link + brand;
  }
  if (stock.length > 0) {
    link = link + stock;
  }
  if (sort.length > 0) {
    link = link + sort;
  }
  link = link + `page=${page}`;
}

let filtrar = document.getElementById("filters");
filtrar.addEventListener("click", () => {
  window.location.href = `/products/${link}`;
});
