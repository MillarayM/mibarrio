const db = firebase.firestore();
////////////////////////////////////////
////////////  Para Proyectos  ////////////
// nombre formulario : proyectoFormulario

const proyectoFormulario = document.getElementById("proyectoFormulario");
const proyectoFilas = document.getElementById("proyectoFilas");

/// crear
const guardarProyecto = (nombre, barrio, descripcion, likes) =>
  db.collection("proyectos").doc().set({
    nombre,
    barrio,
    descripcion,
    likes,
  });

// para crear registros
proyectoFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const proyectoNombre = proyectoFormulario["proyectoNombre"];
  const proyectoBarrio = proyectoFormulario["proyectoBarrio"];
  const proyectoDescripcion = proyectoFormulario["proyectoDescripcion"];
  const proyectoLikes = 0;

  try {
    await guardarProyecto(
      proyectoNombre.value,
      proyectoBarrio.value,
      proyectoDescripcion.value,
      proyectoLikes
    );
    alert('Bienvenido a mi barrio')
    proyectoFormulario.reset();
    proyectoNombre.focus();
  } catch (error) {
    console.log(error);
  }
});
