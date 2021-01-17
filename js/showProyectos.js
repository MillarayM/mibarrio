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
) => `<div class="card card-body mt-2 px-1 col-12 row d-flex flex-row border-primary">       
        <h3 class="h5 col">${barrio.nombre}</h3>
        <p class="col">${barrio.descripcion}</p>
        <p class="col">${barrio.barrio}</p>
    </div>`;

//carga de cards de Proyectos
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
/// crear
const guardarContacto = (nombre, fecha, detalle, email, estado) =>
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
	const contactoFecha = new Date();
	const contactoDetalle = contactoFormulario["contactoDetalle"];
	const contactoEmail = contactoFormulario["contactoEmail"];
	const contactoEstado = "Pendiente";

	try {
		await guardarContacto(
			contactoNombre.value,
			contactoFecha,
			contactoDetalle.value,
			contactoEmail.value,
			contactoEstado
		);
		contactoMensajeEnviado(
			contactoFormulario,
			"Mensaje enviado exitosamente",
			'success'
		);

		contactoFormulario.reset();
		contactoNombre.focus();
	} catch (error) {
		console.log(error);
	}
});

const contactoMensajeEnviado = (divContenedorMensaje, mensaje, color) => {
    const divMensaje = 
        `<div class="bg-${color} text-white col-12 pb-3 text-center" id="borrarMensaje">
            <h3>${mensaje}</h3>
        </div>`;
	divContenedorMensaje.insertAdjacentHTML("beforeend", divMensaje);
	setTimeout(() => {
		const idMensajeBorrar = document.getElementById("borrarMensaje");
		divContenedorMensaje.removeChild(idMensajeBorrar);
	}, 5000);
};

//----------------------------------------------------

const sinLogin = document.querySelectorAll(".logged-out");
const conLogin = document.querySelectorAll(".logged-in");
const modalLoginMaqueta = document.getElementById("loginModal");
const containerAlert = document.getElementById("containerAlert");

const verificarLogin = (user) => {
	if (user) {
		conLogin.forEach((link) => (link.style.display = "block"));
		sinLogin.forEach((link) => (link.style.display = "none"));
	} else {
		conLogin.forEach((link) => (link.style.display = "none"));
		sinLogin.forEach((link) => (link.style.display = "block"));
	}
};

// login usuario

const formularioLogin = document.querySelector("#formularioLogin");
formularioLogin.addEventListener("submit", (e) => {
	e.preventDefault();

	const datosEmail = document.querySelector("#loginEmail").value;
	const datosPassword = document.querySelector("#loginPassword").value;
	console.log(datosEmail, datosPassword);

	auth
		.signInWithEmailAndPassword(datosEmail, datosPassword)
		.then((userCredential) => {
			formularioLogin.reset();
			window.location.reload();
		})
		.catch(() => {
			formularioLogin.reset();
			const containerErrorLogin = document.getElementById(
				"containerErrorLogin"
			);
			contactoMensajeEnviado(
				containerErrorLogin,
				"Contraseña o pass incorrecta, intente nuevamente",
				"danger"
			);
		});
});

// cierrre de sesion
const cerrarSesion = document.querySelector("#cerrarSesion");
cerrarSesion.addEventListener("click", (e) => {
	e.preventDefault();

	auth.signOut().then(() => {
		contactoMensajeEnviado(
			containerAlert,
			"Sesion cerrada correctamente",
			"success"
		);
	});
});

// eventos
// listas de cosas que pueden hacer cuando estan logeados

// verificar persistencia del loginn ....
auth.onAuthStateChanged((user) => {
	if (user) {
		contactoMensajeEnviado(containerAlert, "Sesión iniciada", "success");
		console.log("hay un usuario esta logeado"); //colocar mensaje html div bienvenida
	} else {
		contactoMensajeEnviado(
			containerAlert,
			"Te invitamos a inscribirte a la página",
			"info"
		);
		console.log("no hay usuario logeado"); //mensaje te invitamos a que te unas a la página o algo así.
		//listadoComentariosHtml([])
		verificarLogin(user);
	}
});