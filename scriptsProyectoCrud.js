const db = firebase.firestore();
////////////////////////////////////////
////////////  Para Proyectos  ////////////
// nombre formulario : proyectoFormulario

const proyectoFormulario = document.getElementById("proyectoFormulario");
const proyectosContainer = document.getElementById("proyectosContainer");

let editStatus = false;
let id = "";

/// crear
const guardarProyecto = (
  nombre,
  barrio,
  fechaInicio,
  fechaFin,
  descripcion,
  likes
) =>
  db.collection("proyectos").doc().set({
    nombre,
    barrio,
    fechaInicio,
    fechaFin,
    descripcion,
    likes,
  });

// leer
const getProyectos = () => db.collection("proyectos").get();
const onGetProyectos = (callback) =>
  db.collection("proyectos").onSnapshot(callback);

// delete
const deleteProyecto = (id) => db.collection("proyectos").doc(id).delete();

// editar
const getProyecto = (id) => db.collection("proyectos").doc(id).get();
const updateProyecto = (id, updatedProyecto) =>
  db.collection("proyectos").doc(id).update(updatedProyecto);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetProyectos((querySnapshot) => {
    proyectosContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const proyecto = doc.data();

      proyectosContainer.innerHTML += `
        
        <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${proyecto.nombre}</h3>
        <p>${proyecto.barrio}</p>
        <p>${proyecto.fechaInicio}</p>
        <p>${proyecto.fechaFin}</p>
        <p>${proyecto.descripcion}</p>
        <p>${proyecto.likes}</p>

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
      const btnsDelete = proyectosContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteProyecto(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = proyectosContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getProyecto(e.target.dataset.id);
            const proyecto = doc.data();
            proyectoFormulario["proyectoNombre"].value = proyecto.nombre;
            proyectoFormulario["proyectoBarrio"].value = proyecto.barrio;
            proyectoFormulario["proyectoFechaInicio"].value =
              proyecto.fechaInicio;
            proyectoFormulario["proyectoFechaFin"].value = proyecto.fechaFin;
            proyectoFormulario["proyectoDescripcion"].value =
              proyecto.descripcion;
            proyectoFormulario["proyectoLikes"].value = proyecto.likes;

            editStatus = true;
            id = doc.id;
            proyectoFormulario["btnProyectoFormulario"].innerText = "Update";
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
proyectoFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const proyectoNombre = proyectoFormulario["proyectoNombre"];
  const proyectoBarrio = proyectoFormulario["proyectoBarrio"];
  const proyectoFechaInicio = proyectoFormulario["proyectoFechaInicio"];
  const proyectoFechaFin = proyectoFormulario["proyectoFechaFin"];
  const proyectoDescripcion = proyectoFormulario["proyectoDescripcion"];
  const proyectoLikes = proyectoFormulario["proyectoLikes"];

  try {
    if (!editStatus) {
      await guardarProyecto(
        proyectoNombre.value,
        proyectoBarrio.value,
        proyectoFechaInicio.value,
        proyectoFechaFin.value,
        proyectoDescripcion.value,
        proyectoLikes.value
      );
    } else {
      await updateProyecto(id, {
        nombre: proyectoNombre.value,
        barrio: proyectoBarrio.value,
        fechaInicio: proyectoFechaInicio.value,
        fechaFin: proyectoFechaFin.value,
        descripcion: proyectoDescripcion.value,
        likes: proyectoLikes.value,
      });

      editStatus = false;
      id = "";
      proyectoFormulario["btnProyectoFormulario"].innerText = "Guardar";
    }

    proyectoFormulario.reset();
    proyectoNombre.focus();
  } catch (error) {
    console.log(error);
  }
});

// muestra listado filtrados

// para crear registros
proyectoFormularioBusqueda.addEventListener("submit", async (e) => {
  e.preventDefault();
  const proyectoBusqueda = proyectoFormularioBusqueda["proyectoBusqueda"];
  try {
    await db
      .collection("proyectos")
      .where("barrio", "==", proyectoBusqueda.value)
      .get()
      .then(function (querySnapshot) {    
        querySnapshot.forEach(function (doc) {
          const proyecto = doc.data();
          proyectosContainerFiltrados.innerHTML += `
        
    <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${proyecto.nombre}</h3>
    <p>${proyecto.barrio}</p>
    <p>${proyecto.fechaInicio}</p>
    <p>${proyecto.fechaFin}</p>
    <p>${proyecto.descripcion}</p>
    <p>${proyecto.likes}</p>  
  </div>
  
  `;
        });
      });

    proyectoFormularioBusqueda.reset();
  } catch (error) {
    console.log(error);
  }
});
