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

//-------

const contactoMensajeEnviado = (divContenedorMensaje, mensaje, color) => {
  const divMensaje = 
      `<div class="bg-${color} text-white col-12 pb-3 text-center" id="borrarMensaje">
          <h3>${mensaje}</h3>
      </div>`;
divContenedorMensaje.insertAdjacentHTML("beforeend", divMensaje);
setTimeout(() => {
  const idMensajeBorrar = document.getElementById("borrarMensaje");
  divContenedorMensaje.removeChild(idMensajeBorrar);
}, 5000);
};

//----------------------------------------------------

const sinLogin = document.querySelectorAll(".logged-out");
const conLogin = document.querySelectorAll(".logged-in");
const modalLoginMaqueta = document.getElementById("loginModal");
const containerAlert = document.getElementById("containerAlert");

const verificarLogin = (user) => {
if (user) {
  conLogin.forEach((link) => (link.style.display = "block"));
  sinLogin.forEach((link) => (link.style.display = "none"));
} else {
  conLogin.forEach((link) => (link.style.display = "none"));
  sinLogin.forEach((link) => (link.style.display = "block"));
}
};

// login usuario

const formularioLogin = document.querySelector("#formularioLogin");
formularioLogin.addEventListener("submit", (e) => {
e.preventDefault();

const datosEmail = document.querySelector("#loginEmail").value;
const datosPassword = document.querySelector("#loginPassword").value;
console.log(datosEmail, datosPassword);

auth
  .signInWithEmailAndPassword(datosEmail, datosPassword)
  .then((userCredential) => {
    formularioLogin.reset();
    window.location.reload();
  })
  .catch(() => {
    formularioLogin.reset();
    const containerErrorLogin = document.getElementById(
      "containerErrorLogin"
    );
    contactoMensajeEnviado(
      containerErrorLogin,
      "Contraseña o pass incorrecta, intente nuevamente",
      "danger"
    );
  });
});

// cierrre de sesion
const cerrarSesion = document.querySelector("#cerrarSesion");
cerrarSesion.addEventListener("click", (e) => {
e.preventDefault();

auth.signOut().then(() => {
  contactoMensajeEnviado(
    containerAlert,
    "Sesion cerrada correctamente",
    "success"
  );
});
});

// eventos
// listas de cosas que pueden hacer cuando estan logeados

// verificar persistencia del loginn ....
auth.onAuthStateChanged((user) => {
if (user) {
  contactoMensajeEnviado(containerAlert, "Sesión iniciada", "success");
  console.log("hay un usuario esta logeado"); //colocar mensaje html div bienvenida
} else {
  contactoMensajeEnviado(
    containerAlert,
    "Te invitamos a inscribirte a la página",
    "info"
  );
  console.log("no hay usuario logeado"); //mensaje te invitamos a que te unas a la página o algo así.
  //listadoComentariosHtml([])
  verificarLogin(user);
}
});