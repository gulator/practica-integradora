function loadCart() {
  let cartString = localStorage.getItem("idCarrito");
  if (cartString) {
    let cid = cartString;
    fetch(`/api/carts/${cid}`)
      .then((res) => res.json())
      .then((productos) => {
        let prod = document.getElementById("tbody");
        let elemento = document.createElement("tr");
        productos.forEach((product) => {
          elemento.innerHTML = `
                <th scope="row">${product.code}</th>
                <td>${product.title}</td>
                <td>${product.quantity}</td>
                <td>$${product.price}</td>`;
          prod.append(elemento);
        });
      });
  } else {
    fetch("/api/carts", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("idCarrito", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  cartString = localStorage.getItem("idCarrito");
  let data = JSON.parse(cartString);
  // console.log(data)
  let cid = data.cid;
  fetch(`/api/carts/${cid}`)
    .then((res) => res.json())
    .then((productos) => {
      let prod = document.getElementById("tbody");
      let elemento = document.createElement("tr");
      productos.forEach((product) => {
        elemento.innerHTML = `
                <th scope="row">${product.code}</th>
                <td>${product.title}</td>
                <td>${product.quantity}</td>
                <td>$${product.price}</td>`;
        prod.append(elemento);
      });
    });
}
loadCart();
