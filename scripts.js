//Lógica de Dropdown
$("#users, #comments, #projects, #neighborhood, #contacts").click((event) => {
  const id = `#${event.target.id}Section`;
  $("#sections").removeClass("d-none");
  $("#sections section").hide();
  $(id).show();
});

//////////////////Scripts BarrioCRUD////////////////////////
const db = firebase.firestore();
////////////////////////////////////////
////////////  Para barrios  ////////////
// nombre formulario : barrioFormulario

const barrioFormulario = document.getElementById("barrioFormulario");
const barriosContainer = document.getElementById("barriosContainer");
const usuarioFormulario = document.getElementById("usuarioFormulario");
const usuariosContainer = document.getElementById("usuariosContainer");
const contactoFormulario = document.getElementById("contactoFormulario");
//const contactosContainer = document.getElementById("contactosContainer");
const contactosFilas = document.getElementById("contactoFilas");

let editStatus = false;
let id = "";

/// crear
const guardarBarrio = (nombre, ubicacion, region, comuna, historial) =>
  db.collection("barrios").doc().set({
    nombre,
    ubicacion,
    region,
    comuna,
    historial,
  });

// leer
const getBarrios = () => db.collection("barrios").get();
const onGetBarrios = (callback) =>
  db.collection("barrios").onSnapshot(callback);

// delete
const deleteBarrio = (id) => db.collection("barrios").doc(id).delete();

// editar
const getBarrio = (id) => db.collection("barrios").doc(id).get();
const updateBarrio = (id, updatedBarrio) =>
  db.collection("barrios").doc(id).update(updatedBarrio);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetBarrios((querySnapshot) => {
    barriosContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const barrio = doc.data();

      barriosContainer.innerHTML += `
        
        <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${barrio.nombre}</h3>
        <p>${barrio.ubicacion}</p>
        <p>${barrio.region}</p>
        <p>${barrio.comuna}</p>
        <p>${barrio.historial}</p>
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
      const btnsDelete = barriosContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteBarrio(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = barriosContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getBarrio(e.target.dataset.id);
            const barrio = doc.data();
            barrioFormulario["barrioNombre"].value = barrio.nombre;
            barrioFormulario["barrioUbicacion"].value = barrio.ubicacion;
            barrioFormulario["barrioRegion"].value = barrio.region;
            barrioFormulario["barrioComuna"].value = barrio.comuna;
            barrioFormulario["barrioHistorial"].value = barrio.historial;

            editStatus = true;
            id = doc.id;
            barrioFormulario["btnBarrioFormulario"].innerText = "Update";
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
barrioFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  // nombre, ubicacion, region, comuna, historial
  const barrioNombre = barrioFormulario["barrioNombre"];
  const barrioUbicacion = barrioFormulario["barrioUbicacion"];
  const barrioRegion = barrioFormulario["barrioRegion"];
  const barrioComuna = barrioFormulario["barrioComuna"];
  const barrioHistorial = barrioFormulario["barrioHistorial"];
  try {
    if (!editStatus) {
      await guardarBarrio(
        barrioNombre.value,
        barrioUbicacion.value,
        barrioRegion.value,
        barrioComuna.value,
        barrioHistorial.value
      );
    } else {
      await updateBarrio(id, {
        nombre: barrioNombre.value,
        ubicacion: barrioUbicacion.value,
        region: barrioRegion.value,
        comuna: barrioComuna.value,
        historial: barrioHistorial.value,
      });

      editStatus = false;
      id = "";
      barrioFormulario["btnBarrioFormulario"].innerText = "Guardar";
    }

    barrioFormulario.reset();
    barrioNombre.focus();
  } catch (error) {
    console.log(error);
  }
});

//////////////////Scripts BarrioCRUD////////////////////////
/// crear
const guardarUsuario = (
  nombre,
  apellido,
  rut,
  password,
  direccion,
  email,
  telefono,
  barrio
) =>
  db.collection("usuarios").doc().set({
    nombre,
    apellido,
    rut,
    password,
    direccion,
    email,
    telefono,
    barrio,
  });

// leer
const getUsuarios = () => db.collection("usuarios").get();
const onGetUsuarios = (callback) =>
  db.collection("usuarios").onSnapshot(callback);

// delete
const deleteUsuario = (id) => db.collection("usuarios").doc(id).delete();

// editar
const getUsuario = (id) => db.collection("usuarios").doc(id).get();
const updateUsuario = (id, updatedUsuario) =>
  db.collection("usuarios").doc(id).update(updatedUsuario);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetUsuarios((querySnapshot) => {
    usuariosContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const usuario = doc.data();

      usuariosContainer.innerHTML += `
        
        <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${usuario.nombre}</h3>
        <p>${usuario.apellido}</p>
        <p>${usuario.rut}</p>
        <p>${usuario.password}</p>
        <p>${usuario.direccion}</p>
        <p>${usuario.email}</p>
        <p>${usuario.telefono}</p>
        <p>${usuario.barrio}</p>
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
      const btnsDelete = usuariosContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteUsuario(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = usuariosContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getUsuario(e.target.dataset.id);
            const usuario = doc.data();
            usuarioFormulario["usuarioNombre"].value = usuario.nombre;
            usuarioFormulario["usuarioApellido"].value = usuario.apellido;
            usuarioFormulario["usuarioRut"].value = usuario.rut;
            usuarioFormulario["usuarioPassword"].value = usuario.password;
            usuarioFormulario["usuarioDireccion"].value = usuario.direccion;
            usuarioFormulario["usuarioEmail"].value = usuario.email;
            usuarioFormulario["usuarioTelefono"].value = usuario.telefono;
            usuarioFormulario["usuarioBarrio"].value = usuario.barrio;

            editStatus = true;
            id = doc.id;
            usuarioFormulario["btnUsuarioFormulario"].innerText = "Update";
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
usuarioFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuarioNombre = usuarioFormulario["usuarioNombre"];
  const usuarioApellido = usuarioFormulario["usuarioApellido"];
  const usuarioRut = usuarioFormulario["usuarioRut"];
  const usuarioPassword = usuarioFormulario["usuarioPassword"];
  const usuarioDireccion = usuarioFormulario["usuarioDireccion"];
  const usuarioEmail = usuarioFormulario["usuarioEmail"];
  const usuarioTelefono = usuarioFormulario["usuarioTelefono"];
  const usuarioBarrio = usuarioFormulario["usuarioBarrio"];
  try {
    if (!editStatus) {
      await guardarUsuario(
        usuarioNombre.value,
        usuarioApellido.value,
        usuarioRut.value,
        usuarioPassword.value,
        usuarioDireccion.value,
        usuarioEmail.value,
        usuarioTelefono.value,
        usuarioBarrio.value
      );
    } else {
      await updateUsuario(id, {
        nombre: usuarioNombre.value,
        apellido: usuarioApellido.value,
        rut: usuarioRut.value,
        password: usuarioPassword.value,
        direccion: usuarioDireccion.value,
        email: usuarioEmail.value,
        telefono: usuarioTelefono.value,
        barrio: usuarioBarrio.value,
      });

      editStatus = false;
      id = "";
      usuarioFormulario["btnUsuarioFormulario"].innerText = "Guardar";
    }

    usuarioFormulario.reset();
    usuarioNombre.focus();
  } catch (error) {
    console.log(error);
  }
});

//////////////////Scripts BarrioCRUD////////////////////////
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
