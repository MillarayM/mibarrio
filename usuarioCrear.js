const db = firebase.firestore();
////////////////////////////////////////
////////////  Para Crear Usuarios  ////////////
// nombre formulario : usuarioFormulario

const usuarioFormulario = document.getElementById("usuarioFormulario");
const usuariosContainer = document.getElementById("usuariosContainer");

/// crear
const crearUsuario = (nombre, apellido, rut, password, direccion, email, telefono, barrio) =>
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
        await crearUsuario(
        usuarioNombre.value,
        usuarioApellido.value,
        usuarioRut.value,
        usuarioPassword.value,
        usuarioDireccion.value,
        usuarioEmail.value,
        usuarioTelefono.value,
        usuarioBarrio.value,
      );


      auth
      .createUserWithEmailAndPassword(usuarioEmail.value, usuarioPassword.value)
      .then(userCredential => {
           console.log('funciona ingreso de usuario')
         
      })



    alert('Bienvenido a mi barrio')

    usuarioFormulario.reset();
    usuarioNombre.focus();
  } catch (error) {
    console.log(error);
  }
});

