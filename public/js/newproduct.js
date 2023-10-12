const btnProduct = document.getElementById("prod-create");

btnProduct.addEventListener("click", () => {
  const title = document.getElementById("fieldtitle").value;
  const brand = document.getElementById("fieldbrand").value;
  const price = document.getElementById("fieldprice").value;
  const color = document.getElementById("fieldcolor").value;
  const code = document.getElementById("fieldcode").value;
  const stock = document.getElementById("fieldstock").value;
  const owner = document.getElementById("fieldowner").value;
  let data = {
    title,
    brand,
    price: parseInt(price),
    color,
    code,
    stock: parseInt(stock),
    owner,
  };
  fetch('/api/products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
      .then((res)=>res.json())
      .then((data)=>{
        if (data.status === 201) {
          Toastify({
            text: `El producto ${data.value.title} ha sido creado`,
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
        } else if (data.status === 400) {
          Toastify({
            text: `${data.value.error}`,
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
        setTimeout(() => {
          location.reload(true);
        }, 3000)
  })
});
