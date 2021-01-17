//Lógica de Dropdown
$("#users, #comments, #projects, #neighborhood, #contacts").click((event) => {
  const id = `#${event.target.id}Section`;
  $("#sections").removeClass("d-none");
  $("#sections section").hide();
  $(id).show();
});

// Scripts BarrioCRUD
const db = firebase.firestore();
////////////////////////////////////////
////////////  Para barrios  ////////////
// nombre formulario : barrioFormulario

const barrioFormulario = document.getElementById("barrioFormulario");
const barriosContainer = document.getElementById("barriosContainer");

let editStatus = false;
let id = "";

/// crear
const guardarBarrio = (nombre, ubicacion, region, comuna, historial) =>
  db.collection("barrios").doc().set({
    nombre,
    ubicacion,
    region,
    comuna,
    historial,
  });

// leer
const getBarrios = () => db.collection("barrios").get();
const onGetBarrios = (callback) =>
  db.collection("barrios").onSnapshot(callback);

// delete
const deleteBarrio = (id) => db.collection("barrios").doc(id).delete();

// editar
const getBarrio = (id) => db.collection("barrios").doc(id).get();
const updateBarrio = (id, updatedBarrio) =>
  db.collection("barrios").doc(id).update(updatedBarrio);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetBarrios((querySnapshot) => {
    barriosContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const barrio = doc.data();

      barriosContainer.innerHTML += `
        
        <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${barrio.nombre}</h3>
        <p>${barrio.ubicacion}</p>
        <p>${barrio.region}</p>
        <p>${barrio.comuna}</p>
        <p>${barrio.historial}</p>
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
      const btnsDelete = barriosContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteBarrio(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = barriosContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getBarrio(e.target.dataset.id);
            const barrio = doc.data();
            barrioFormulario["barrioNombre"].value = barrio.nombre;
            barrioFormulario["barrioUbicacion"].value = barrio.ubicacion;
            barrioFormulario["barrioRegion"].value = barrio.region;
            barrioFormulario["barrioComuna"].value = barrio.comuna;
            barrioFormulario["barrioHistorial"].value = barrio.historial;

            editStatus = true;
            id = doc.id;
            barrioFormulario["btnBarrioFormulario"].innerText = "Update";
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
barrioFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  // nombre, ubicacion, region, comuna, historial
  const barrioNombre = barrioFormulario["barrioNombre"];
  const barrioUbicacion = barrioFormulario["barrioUbicacion"];
  const barrioRegion = barrioFormulario["barrioRegion"];
  const barrioComuna = barrioFormulario["barrioComuna"];
  const barrioHistorial = barrioFormulario["barrioHistorial"];
  try {
    if (!editStatus) {
      await guardarBarrio(
        barrioNombre.value,
        barrioUbicacion.value,
        barrioRegion.value,
        barrioComuna.value,
        barrioHistorial.value
      );
    } else {
      await updateBarrio(id, {
        nombre: barrioNombre.value,
        ubicacion: barrioUbicacion.value,
        region: barrioRegion.value,
        comuna: barrioComuna.value,
        historial: barrioHistorial.value,
      });

      editStatus = false;
      id = "";
      barrioFormulario["btnBarrioFormulario"].innerText = "Guardar";
    }

    barrioFormulario.reset();
    barrioNombre.focus();
  } catch (error) {
    console.log(error);
  }
});
