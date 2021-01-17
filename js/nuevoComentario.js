
const db = firebase.firestore();
////////////////////////////////////////
////////////  Para Comentarios  ////////////
// nombre formulario : comentarioFormulario

const comentarioFormulario = document.getElementById("comentarioFormulario");


// crear
const guardarComentario = (nombre, fecha, detalle, barrio) =>
  db.collection("comentarios").doc().set({
    nombre,
    fecha,
    detalle,
    barrio,
  });

  // para crear registros
comentarioFormulario.addEventListener("submit", async (e) => {
    e.preventDefault();
   
    const comentarioNombre = comentarioFormulario["comentarioNombre"];
    const comentarioFecha = comentarioFormulario["comentarioFecha"];
    const comentarioDetalle = comentarioFormulario["comentarioDetalle"];
    const comentarioBarrio = comentarioFormulario["comentarioBarrio"];
    try {
     
        await guardarComentario(
          comentarioNombre.value,
          comentarioFecha.value,
          comentarioDetalle.value,
          comentarioBarrio.value,
        );
      
        alert('Gracias por tus comentarios')
      comentarioFormulario.reset();
      comentarioNombre.focus();
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