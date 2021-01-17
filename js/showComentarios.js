const db = firebase.firestore();

//div contenedores
const containerBarrios = document.getElementById("barriosCardsGeneral");
const containerBarriosFiltro = document.getElementById("barriosCardsFiltro");
const listaOpcionesBarrios = document.getElementById("datalistOptions");
const filtradorBarrios = document.getElementById("filtradorBarrios");

//funciones firebase
const getTasks = () => db.collection("comentarios").get();
const onGetTasks = (callback) => db.collection("comentarios").onSnapshot(callback);

//plantilla barrios

const plantillaBarrios = (
	barrio
) => `<div class="card card-body mt-2 px-1 col-12 row d-flex flex-row border-primary">       
        <h3 class="h5 col">${barrio.barrio}</h3>
        <p class="col">${barrio.nombre}</p>
        <p class="col">${barrio.detalle}</p>
    </div>`;

//carga de cards de barrios
window.addEventListener("DOMContentLoaded", (e) => {
	onGetTasks((querySnapshot) => {
		containerBarrios.innerHTML = "";
		querySnapshot.forEach((doc) => {
			const proyectos = doc.data();
			containerBarrios.innerHTML += plantillaBarrios(proyectos);
			listaOpcionesBarrios.insertAdjacentHTML(
				"beforeend",
				`<option value='${proyectos.nombre}'>${proyectos.nombre}</option>`
			);
		});
	});
});

//funcion para filtrar barrios
const filtrar = () => {
	let inputBarrioBuscador = filtradorBarrios.value;
	onGetTasks((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			const barrio = doc.data();
			if (inputBarrioBuscador == barrio.nombre) {
				//prender apagar contenedores
				containerBarrios.classList.replace("d-flex", "d-none");
				containerBarriosFiltro.classList.replace("d-none", "d-flex");

				containerBarriosFiltro.innerHTML = "";
				containerBarriosFiltro.innerHTML += plantillaBarrios(barrio);
			}
			if (!inputBarrioBuscador) {
				containerBarrios.classList.replace("d-none", "d-flex");
				containerBarriosFiltro.classList.replace("d-flex", "d-none");
			}
		});
	});
};

filtradorBarrios.addEventListener("input", async (e) => {
	await filtrar();
});


const deleteBarrio = (divs) => {
	let a = document.getElementById(divs);
	while (a.firstChild) {
		a.removeChild(a.firstChild);
	}
};

const contactoFormulario = document.getElementById("contactoFormulario");
const contactosContainer = document.getElementById("contactosContainer");


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
    //alert('Tu consulta ha sido recibida gracias por escribir')
    contactoMensajeEnviado()

    contactoFormulario.reset();
    contactoNombre.focus();
  } catch (error) {
    console.log(error);
  }
});


const contactoMensajeEnviado = ()=>{
    const divMensaje = 
        `<div class="bg-success col-12 pb-3 text-center" id="borrarMensaje">
            <h3>Mensaje enviado exitosamente</h3>
        </div>`
    contactoFormulario.insertAdjacentHTML('beforeend',divMensaje)
    setTimeout(() => {
        const idMensajeBorrar = document.getElementById('borrarMensaje')
        contactoFormulario.removeChild(idMensajeBorrar)
    }, 3000);
}