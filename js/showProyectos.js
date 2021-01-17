const db = firebase.firestore();

//div contenedores
const containerBarrios = document.getElementById("barriosCardsGeneral");
const containerBarriosFiltro = document.getElementById("barriosCardsFiltro");
const listaOpcionesBarrios = document.getElementById("datalistOptions");
const filtradorBarrios = document.getElementById("filtradorBarrios");

//funciones firebase
const getTasks = () => db.collection("proyectos").get();
const onGetTasks = (callback) => db.collection("proyectos").onSnapshot(callback);

//plantilla barrios

const plantillaBarrios = (
	barrio
) => `<div class="card card-body mt-2 mb-2 px-1 col-12 row d-flex flex-row border-primary">       
        <h3 class="h5 col">${barrio.nombre}</h3>
        <p class="col">${barrio.descripcion}</p>
        <p class="col">${barrio.barrio}</p>
        <div class="text-center col">
            <button class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick= "mostrarBarrios('${barrio.nombre}',1)">Comentar</button>
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
			const proyectos = doc.data();
			containerBarrios.innerHTML += plantillaBarrios(proyectos, doc);
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

//const seccionModal = document.getElementById("section-modales");
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
