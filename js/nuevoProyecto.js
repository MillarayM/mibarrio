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

///agregado Pablo
const listaOpcionesBarrios = document.getElementById("datalistOptions");

const getTasks = () => db.collection("barrios").get();
const onGetTasks = (callback) => db.collection("barrios").onSnapshot(callback);

window.addEventListener("DOMContentLoaded", (e) => {
onGetTasks((querySnapshot) => {
  listaOpcionesBarrios.innerHTML = ""
  querySnapshot.forEach((doc) => {
    const proyectos = doc.data();
    listaOpcionesBarrios.insertAdjacentHTML(
      "beforeend",
      `<option value='${proyectos.nombre}'>${proyectos.nombre}</option>`
    );
  });
});
});
