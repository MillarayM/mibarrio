const db = firebase.firestore();
////////////////////////////////////////
////////////  Para barrios  ////////////
// nombre formulario : barrioFormulario

const barrioFormulario = document.getElementById("barrioFormulario");
 // const barriosContainer = document.getElementById("barriosContainer");
const barrioFilas = document.getElementById("barrioFilas");

let editStatus = false;
let id = "";

/// crear
const guardarBarrio = (nombre, ubicacion, region, comuna, historial, imagen) =>
  db.collection("barrios").doc().set({
    nombre,
    ubicacion,
    region,
    comuna,
    historial,
    imagen,
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
    barrioFilas.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const barrio = doc.data();

      barrioFilas.innerHTML += `
        <tr>
        <td> ${barrio.nombre}</td>
        <td> ${barrio.ubicacion}</td>
        <td> ${barrio.region}</td>
        <td> ${barrio.comuna}</td>
        <td> ${barrio.historial}</td>
        <td> <img src="${barrio.imagen}" alt="barrop" width="300" height="300"></td>
        <td> <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button></td>      
        
        </tr>  
      
      `;
      // para borrar
      const btnsDelete = barrioFilas.querySelectorAll(".btn-delete");
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
      const btnsEdit = barrioFilas.querySelectorAll(".btn-edit");
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
            barrioFormulario["barrioImagen"].value = barrio.imagen;

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
  const barrioImagen = barrioFormulario["barrioImagen"];
  
  try {
    if (!editStatus) {
      await guardarBarrio(
        barrioNombre.value,
        barrioUbicacion.value,
        barrioRegion.value,
        barrioComuna.value,
        barrioHistorial.value,
        barrioImagen.value,
      );
    } else {
      await updateBarrio(id, {
        nombre: barrioNombre.value,
        ubicacion: barrioUbicacion.value,
        region: barrioRegion.value,
        comuna: barrioComuna.value,
        historial: barrioHistorial.value,
        imagen: barrioImagen.value,
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
