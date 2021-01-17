//Lógica de Dropdown
$("#users, #comments, #projects, #neighborhood, #contacts").click((event) => {
  const id = `#${event.target.id}Section`;
  $("#sections").removeClass("d-none");
  $("#sections section").hide();
  $(id).show();
});

// Scripts para CRUDS
const db = firebase.firestore();
let editStatus = false;
let id = "";
//////////////Scripts Usuarios/////////////////
////////////////////////////////////////
////////////  Para Usuarios  ////////////
// nombre formulario : usuarioFormulario

const usuarioFormulario = document.getElementById("usuarioFormulario");
//const usuariosContainer = document.getElementById("usuariosContainer");
const usuariosFilas = document.getElementById("usuarioFilas");

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
    usuariosFilas.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const usuario = doc.data();

      usuariosFilas.innerHTML += `
      <tr>
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.rut}</td>
      <td>${usuario.password}</td>
      <td>${usuario.direccion}</td>
      <td>${usuario.email}</td>
      <td>${usuario.telefono}</td>
      <td>${usuario.barrio}</td>       


        <td> <button class="btn btn-danger btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-warning btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button></td>
        </tr>  
      
      `;
      // para borrar
      const btnsDelete = usuariosFilas.querySelectorAll(".btn-delete");
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
      const btnsEdit = usuariosFilas.querySelectorAll(".btn-edit");
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

//////////////Fin Scripts Usuarios/////////////////

//////////////Scripts Comentarios/////////////////

//////////////Fin Scripts Comentarios/////////////////

//////////////Scripts Proyectos/////////////////

//////////////Fin Scripts Proyectos/////////////////

//////////////Scripts Barrio/////////////////

//////////////Barrio Scripts Barrio/////////////////

//////////////Scripts Contactos/////////////////

//////////////Fin Scripts Contactos/////////////////
