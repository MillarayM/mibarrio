const db = firebase.firestore();

const containerBarrios = document.getElementById("show-barrios");

const getTasks = () => db.collection("barrios").get();
const onGetTasks = (callback) => db.collection("barrios").onSnapshot(callback);

window.addEventListener("DOMContentLoaded", (e) => {
    console.log(containerBarrios)
	onGetTasks((querySnapshot) => {
		containerBarrios.innerHTML = "";
		querySnapshot.forEach((doc) => {
			const barrio = doc.data();
            containerBarrios.innerHTML += 
                `<div class="card card-body mt-2 px-1 col-4 border-primary">
                <h3 class="h5">${barrio.nombre}</h3>
                <p>${barrio.comuna}</p>
                </div>`;
		});
	});
});
