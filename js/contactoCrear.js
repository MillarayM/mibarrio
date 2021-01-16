//const db = firebase.firestore();
////////////////////////////////////////
////////////  Para Crear Contactos  ////////////
// nombre formulario : contactoFormulario

const contactoFormulario = document.getElementById("contactoFormulario");
const contactosContainer = document.getElementById("contactosContainer");

/// crear
/// crear
const guardarContacto = (nombre, fecha, detalle, email,estado) =>
  db.collection("contactos").doc().set({
    nombre,
    fecha,
    detalle,
    email,
    estado,
  });

// para crear registros
contactoFormulario.addEventListener("submit", async (e) => {
    e.preventDefault();
 
    const contactoNombre = contactoFormulario["contactoNombre"];
    const contactoFecha = new Date()
    const contactoDetalle = contactoFormulario["contactoDetalle"];
    const contactoEmail = contactoFormulario["contactoEmail"];
    const contactoEstado = "Pendiente";

  try {
    await guardarContacto(
        contactoNombre.value,
        contactoFecha,
        contactoDetalle.value,
        contactoEmail.value,
        contactoEstado,
      );
    alert('Tu consulta ha sido recibida gracias por escribir')

    contactoFormulario.reset();
    contactoNombre.focus();
  } catch (error) {
    console.log(error);
  }
});
