//hasta aqui funciona

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

const plantillaBarrios = (barrio,doc) =>
	(`<div class="card card-body mt-2 px-1 col-4 border-primary">
        <img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ03luuGw4KJi-L-9NoFeC3BWgS5LGnT4E6UA&usqp=CAU>
        <h3 class="h5">${barrio.nombre}</h3>
        <p>${barrio.comuna}</p>
        <p>${barrio.region}</p>
        <div class="text-center">
            <button class="btn btn-success btn-get-barrios" data-id=${doc.id} data-bs-toggle="modal" data-bs-target="#exampleModal" onclick=mostrarBarrios(1,'${barrio.nombre}')>Ver Barrio</button>
            <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick=mostrarBarrios(2)>Ver Proyectos</button>
        </div>
    </div>`)

//carga de cards de barrios
window.addEventListener("DOMContentLoaded", (e) => {
	onGetTasks((querySnapshot) => {
		containerBarrios.innerHTML = "";
		querySnapshot.forEach((doc) => {
			const barrio = doc.data();
			containerBarrios.innerHTML += plantillaBarrios(barrio,doc);
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

//const seccionModal = document.getElementById("section-modales");
const divInfoBarrios = document.getElementById("infoBarrios")
const divInfoProyectos = document.getElementById('infoProyectos')

const mostrarBarrios = (idModal,idDoc)=>{
    let consultaBarrios = db.collection('barrios')
    const a = idDoc
    console.log(a)
    divInfoProyectos.innerHTML = ''
    divInfoBarrios.innerHTML = ''
    idModal == 1 ? 
    divInfoBarrios.insertAdjacentHTML('beforeend',
    `<div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Barrios</h5>
    </div>
    <div class="modal-body">
        ...
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick= deleteBarrio("infoBarrios")>Cerrar</button>
    </div>`) 
: 
    divInfoProyectos.insertAdjacentHTML('beforeend',
    `<div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Proyectos</h5>
    </div>
    <div class="modal-body">
    ...
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick= deleteBarrio("infoProyectos")>Cerrar</button>
    </div>`)
}

const deleteBarrio = (divs)=>{
    let a = document.getElementById(divs)
    while (a.firstChild) {
        a.removeChild(a.firstChild);
    }
}

// const botonesBarrioModal = document.querySelectorAll('.btn-get-barrios')
// botonesBarrioModal.forEach((btn)=>{
//     btn.addEventListener("click",async (e)=>{
//         console.log(e.target.dataset.id);
//     })
// })