const db = firebase.firestore();

//div contenedores
const containerBarrios = document.getElementById("barriosCardsGeneral");
const containerBarriosFiltro = document.getElementById("barriosCardsFiltro");
const listaOpcionesBarrios = document.getElementById("datalistOptions");
const filtradorBarrios = document.getElementById("filtradorBarrios");

//funciones firebase
const getTasks = () => db.collection("barrios").get();
const onGetTasks = (callback) => db.collection("barrios").onSnapshot(callback);

//plantilla barrios

const plantillaBarrios = (
	barrio
) => `<div class="card card-body col-4 border-primary">            
        <img src=${barrio.imagen} class="card-img-top" width="100%" height="50%">      
        <h3 class="h5">${barrio.nombre}</h3>
        <p>${barrio.comuna}</p>
        <p>${barrio.region}</p>
        <div class="text-center">
            <button class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick= "mostrarBarrios('${barrio.nombre}',1)">Ver Barrio</button>
            <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="mostrarBarrios('${barrio.nombre}',2)">Ver Proyectos</button>
        </div>
    </div>`;
const plantillaProyectos = ()=>{
    return `<div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Listado Proyectos</h5>
</div>
<div class="modal-body">
    <table class="table" >
    <thead>
    <tr>
        <th scope="col">Nombre proyecto</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Fecha inicio</th>
        <th scope="col">Fecha Fin</th>
    </tr>
    </thead>
    <tbody id= "tablaProyectos">                  
    </tbody>
</table>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick= deleteBarrio("infoBarrios")>Cerrar</button>
</div>`
}

//carga de cards de barrios
window.addEventListener("DOMContentLoaded", (e) => {
	onGetTasks((querySnapshot) => {
		containerBarrios.innerHTML = "";
		querySnapshot.forEach((doc) => {
			const barrio = doc.data();
			containerBarrios.insertAdjacentHTML("beforeend",plantillaBarrios(barrio));
			listaOpcionesBarrios.insertAdjacentHTML(
				"beforeend",
				`<option value='${barrio.nombre}'>${barrio.nombre}</option>`
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

const divInfoBarrios = document.getElementById("infoBarrios");
const divInfoProyectos = document.getElementById("infoProyectos");

const mostrarBarrios = async (idDoc, id) => {    
	try {
		if (id == 1) {
			await db
				.collection("barrios")
				.where("nombre", "==", idDoc)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach(function (doc) {
                        const resultado = doc.data();
						divInfoBarrios.innerHTML = "";
						divInfoBarrios.insertAdjacentHTML(
							"beforeend",
							`<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${resultado.nombre}</h5>
                    </div>
                    <div class="modal-body">
                        <div>Lugar: ${resultado.nombre}</div>
                        <div>Ubicacion: ${resultado.ubicacion}</div>
                        <div>Comuna: ${resultado.comuna}</div>
                        <div>Region: ${resultado.region}</div>
                        <div>Historial: ${resultado.historial}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick= deleteBarrio("infoBarrios")>Cerrar</button>
                    </div>`
						);
					});
				});
		}
		if (id == 2) {
            const plantilla = plantillaProyectos()
            divInfoProyectos.innerHTML = "";
            divInfoProyectos.insertAdjacentHTML("beforeend",plantilla)
            const tabla = document.getElementById("tablaProyectos")
			await db
				.collection("proyectos")
				.where("barrio", "==", idDoc)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach(function (doc) {
                        const res = doc.data();
                        console.log(res)
						//divInfoProyectos.innerHTML = "";
						tabla.insertAdjacentHTML(
							"beforeend",
              `<tr>
                  <td>${res.nombre}</td>
                  <td>${res.descripcion}</td>
                  <td>${res.fechaInicio}</td>
                  <td>${res.fechaFin}</td>                        
              </tr>`
						);
					});
                })
		}
	} catch (error) {
		console.log("hubo un error", error);
	}
};

const deleteBarrio = (divs) => {
	let a = document.getElementById(divs);
	while (a.firstChild) {
		a.removeChild(a.firstChild);
	}
};

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