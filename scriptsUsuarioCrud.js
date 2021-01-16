const db = firebase.firestore();
////////////////////////////////////////
////////////  Para Usuarios  ////////////
// nombre formulario : usuarioFormulario

const usuarioFormulario = document.getElementById("usuarioFormulario");
const usuariosContainer = document.getElementById("usuariosContainer");

let editStatus = false;
let id = "";

/// crear
const guardarUsuario = (nombre, apellido, rut, password, direccion, email, telefono, barrio) =>
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
        usuarioBarrio.value,
      );
    } else {
      await updateUsuario(id, {
        nombre: usuarioNombre.value,
        apellido: usuarioApellido.value,
        apellido: usuarioRut.value,
        apellido: usuarioPassword.value,
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
