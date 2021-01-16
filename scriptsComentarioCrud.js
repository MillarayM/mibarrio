const db = firebase.firestore();
////////////////////////////////////////
////////////  Para Comentarios  ////////////
// nombre formulario : comentarioFormulario

const comentarioFormulario = document.getElementById("comentarioFormulario");
const comentariosContainer = document.getElementById("comentariosContainer");

let editStatus = false;
let id = "";

/// crear
const guardarComentario = (nombre, fecha, detalle, barrio) =>
  db.collection("comentarios").doc().set({
    nombre,
    fecha,
    detalle,
    barrio,
  });

// leer
const getComentarios = () => db.collection("comentarios").get();
const onGetComentarios = (callback) =>
  db.collection("comentarios").onSnapshot(callback);

// delete
const deleteComentario = (id) => db.collection("comentarios").doc(id).delete();

// editar
const getComentario = (id) => db.collection("comentarios").doc(id).get();
const updateComentario = (id, updatedComentario) =>
  db.collection("comentarios").doc(id).update(updatedComentario);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetComentarios((querySnapshot) => {
    comentariosContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const comentario = doc.data();
     // (usuario, fecha, comentarioUsuario, barrio)
      comentariosContainer.innerHTML += `
        
        <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${comentario.nombre}</h3>
        <p>${comentario.fecha}</p>
        <p>${comentario.detalle}</p>
        <p>${comentario.barrio}</p>
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
      const btnsDelete = comentariosContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteComentario(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );



      // para editar
      const btnsEdit = comentariosContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getComentario(e.target.dataset.id);
            const comentario = doc.data();
            comentarioFormulario["comentarioNombre"].value = comentario.nombre;
            comentarioFormulario["comentarioFecha"].value = comentario.fecha;
            comentarioFormulario["comentarioDetalle"].value = comentario.detalle;
            comentarioFormulario["comentarioBarrio"].value = comentario.barrio;
            editStatus = true;
            id = doc.id;
            comentarioFormulario["btnComentarioFormulario"].innerText = "Update";
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
comentarioFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();
 
  const comentarioNombre = comentarioFormulario["comentarioNombre"];
  const comentarioFecha = comentarioFormulario["comentarioFecha"];
  const comentarioDetalle = comentarioFormulario["comentarioDetalle"];
  const comentarioBarrio = comentarioFormulario["comentarioBarrio"];
  try {
    if (!editStatus) {
      await guardarComentario(
        comentarioNombre.value,
        comentarioFecha.value,
        comentarioDetalle.value,
        comentarioBarrio.value,
      );
    } else {
      await updateComentario(id, {
        nombre: comentarioNombre.value,
        fecha: comentarioFecha.value,
        detalle: comentarioDetalle.value,
        barrio: comentarioBarrio.value,
      });

      editStatus = false;
      id = "";
      comentarioFormulario["btnComentarioFormulario"].innerText = "Guardar";
    }

    comentarioFormulario.reset();
    comentarioNombre.focus();
  } catch (error) {
    console.log(error);
  }
});
