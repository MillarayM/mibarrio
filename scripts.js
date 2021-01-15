const db = firebase.firestore();
////////////////////////////////////////
////////////  Para barrios  ////////////
// nombre formulario : barrioFormulario 

const barrioFormulario = document.getElementById("barrioFormulario");

/// crear
const guardarBarrio = (nombre, ubicacion, region, comuna, historial) =>
  db.collection("barrios").doc().set({
    nombre,
    ubicacion,
    region,
    comuna,
    historial,
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

  await guardarBarrio(
    barrioNombre.value,
    barrioUbicacion.value,
    barrioRegion.value,
    barrioComuna.value,
    barrioHistorial.value
  );

  barrioFormulario.reset();
  barrioNombre.focus();
});
