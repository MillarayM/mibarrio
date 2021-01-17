const contactoFormulario = document.getElementById("contactoFormulario");
//const contactosContainer = document.getElementById("contactosContainer");
const contactosFilas = document.getElementById("contactoFilas");

/// crear
const guardarContacto = (nombre, fecha, detalle, email, estado) =>
  db.collection("contactos").doc().set({
    nombre,
    fecha,
    detalle,
    email,
    estado,
  });

// leer
const getContactos = () => db.collection("contactos").get();
const onGetContactos = (callback) =>
  db.collection("contactos").onSnapshot(callback);

// delete
const deleteContacto = (id) => db.collection("contactos").doc(id).delete();

// editar
const getContacto = (id) => db.collection("contactos").doc(id).get();
const updateContacto = (id, updatedContacto) =>
  db.collection("contactos").doc(id).update(updatedContacto);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetContactos((querySnapshot) => {
    contactosFilas.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const contacto = doc.data();
      contactosFilas.innerHTML += `<tr>
      <td>${contacto.nombre}</td>
      <td>${contacto.fecha}</td>
      <td>${contacto.email}</td>
      <td>${contacto.estado}</td>
      <td>${contacto.detalle}</td>   
      <td> <button class="btn btn-danger btn-delete" data-id="${doc.id}">
      🗑 Delete
    </button>
    <button class="btn btn-warning btn-edit" data-id="${doc.id}">
      🖉 Edit
    </button></td>
      </tr>
      `;
      // para borrar
      const btnsDelete = contactosFilas.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteContacto(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = contactosFilas.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getContacto(e.target.dataset.id);
            const contacto = doc.data();
            contactoFormulario["contactoNombre"].value = contacto.nombre;
            contactoFormulario["contactoFecha"].value = contacto.fecha;
            contactoFormulario["contactoDetalle"].value = contacto.detalle;
            contactoFormulario["contactoEmail"].value = contacto.email;
            contactoFormulario["contactoEstado"].value = contacto.estado;
            editStatus = true;
            id = doc.id;
            contactoFormulario["btnContactoFormulario"].innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
      // fin editar
    });
  });
});

// para crear registros
contactoFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const contactoNombre = contactoFormulario["contactoNombre"];
  const contactoFecha = contactoFormulario["contactoFecha"];
  const contactoDetalle = contactoFormulario["contactoDetalle"];
  const contactoEmail = contactoFormulario["contactoEmail"];
  const contactoEstado = contactoFormulario["contactoEstado"];
  try {
    if (!editStatus) {
      await guardarContacto(
        contactoNombre.value,
        contactoFecha.value,
        contactoDetalle.value,
        contactoEmail.value,
        contactoEstado.value
      );
    } else {
      await updateContacto(id, {
        nombre: contactoNombre.value,
        fecha: contactoFecha.value,
        detalle: contactoDetalle.value,
        email: contactoEmail.value,
        estado: contactoEstado.value,
      });

      editStatus = false;
      id = "";
      contactoFormulario["btnContactoFormulario"].innerText = "Guardar";
    }

    contactoFormulario.reset();
    contactoNombre.focus();
  } catch (error) {
    console.log(error);
  }
});
