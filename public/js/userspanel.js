fetch("../api/users")
  .then((res) => res.json())
  .then((data) => {
    if (data.users) {
      const tabla = document.getElementById("tbody");
      data.users.forEach((element) => {
        const row = document.createElement("tr");
        let rol = "user";
        if (element.role === rol) {
          rol = "premium";
        } else if (element.role === "admin") {
          rol = "-";
        }
        row.innerHTML = `<td>${element.first_name} ${element.last_name}</td>
            <td>${element.email}</td>
            <td>${element.role}</td>
            <td class="hidden">${element._id}</td>
            <td class="change-role" ><a href="#"> Cambiar a ${rol}</a></td>
            <td class="del-user"><i class="fa-solid fa-rectangle-xmark"></i></td>
            `;
        tabla.append(row);
      });

      let borrar = document.querySelectorAll(".fa-rectangle-xmark");
      for (let n of borrar) {
        n.addEventListener("click", (e) => {
          e.preventDefault();
          let elemento = e.target;
          let uid =
            elemento.parentElement.parentElement.children[3].textContent;
          fetch(`/api/users/${uid}`, {
            method: "DELETE",
          }).then(() => {
            location.reload(true);
          });
        });
      }

      let rolechange = document.querySelectorAll(".change-role");
      for (let n of rolechange) {
        n.addEventListener("click", (e) => {
          e.preventDefault();
          let elemento = e.target;
          let uid =
            elemento.parentElement.parentElement.children[3].textContent;
          let role =
            elemento.parentElement.parentElement.children[2].textContent;

          fetch(`/api/users/role/${uid}/${role}`, {
            method: "PUT",
          })
            .then((res) => res.json())
            .then((data) => {
              location.reload(true);
            });
        });
      }

      let deleteInactive = document.getElementById("inactivos");

      deleteInactive.addEventListener("click", (e) => {
        e.preventDefault();

        fetch(`/api/users/`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            Toastify({
                text: `Se borraron ${data.usersInactive} usuario/s inactivo/s`,
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
              setTimeout(()=> location.reload(true), 3001)
            // location.reload(true);
          });
      });
    } else if (data.status === "Auth Error") {
      alert(`${data.error}`);
    } else if (data.status === 500) {
      alert("Error 500");
    } else {
      alert("otro error");
    }
  });
