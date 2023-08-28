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
        console.log(data)
  })
});
