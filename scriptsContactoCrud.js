const db = firebase.firestore();
////////////////////////////////////////
////////////  Para Contacto ////////////
// nombre formulario : contactoFormulario

const contactoFormulario = document.getElementById("contactoFormulario");
const contactosContainer = document.getElementById("contactosContainer");

let editStatus = false;
let id = "";

/// crear
const guardarContacto = (nombre, fecha, detalle, email) =>
  db.collection("contactos").doc().set({
    nombre,
    fecha,
    detalle,
    email,
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
    contactosContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const contacto = doc.data();
   
      contactosContainer.innerHTML += `
        
        <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${contacto.nombre}</h3>
        <p>${contacto.fecha}</p>
        <p>${contacto.detalle}</p>
        <p>${contacto.email}</p>
         <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            🖉 Edit
          </button>
        </div>
      </div>
      
      `;
      // para borrar
      const btnsDelete = contactosContainer.querySelectorAll(".btn-delete");
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
      const btnsEdit = contactosContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getContacto(e.target.dataset.id);
            const contacto = doc.data();
            contactoFormulario["contactoNombre"].value = contacto.nombre;
            contactoFormulario["contactoFecha"].value = contacto.fecha;
            contactoFormulario["contactoDetalle"].value = contacto.detalle;
            contactoFormulario["contactoEmail"].value = contacto.email;
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
  try {
    if (!editStatus) {
      await guardarContacto(
        contactoNombre.value,
        contactoFecha.value,
        contactoDetalle.value,
        contactoEmail.value,
      );
    } else {
      await updateContacto(id, {
        nombre: contactoNombre.value,
        fecha: contactoFecha.value,
        detalle: contactoDetalle.value,
        email: contactoEmail.value,
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