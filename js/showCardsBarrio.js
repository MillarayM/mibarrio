const db = firebase.firestore();

const containerBarrios = document.getElementById("show-barrios");

const getTasks = () => db.collection("barrios").get();
const onGetTasks = (callback) => db.collection("barrios").onSnapshot(callback);

window.addEventListener("DOMContentLoaded", (e) => {
	onGetTasks((querySnapshot) => {
		containerBarrios.innerHTML = "";
		querySnapshot.forEach((doc) => {
			const barrio = doc.data();
            containerBarrios.innerHTML += 
                `<div class="card card-body mt-2 px-1 col-4 border-primary">
                    <img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ03luuGw4KJi-L-9NoFeC3BWgS5LGnT4E6UA&usqp=CAU>
                    <h3 class="h5">${barrio.nombre}</h3>
                    <p>${barrio.comuna}</p>
                    <p>${barrio.region}</p>
                    <div class="text-center">
                        <button class="btn btn-success">Ver Barrio</button>
                        <button class="btn btn-info">Ver Proyectos</button>
                    </div>
                </div>`;
		});
	});
});

// buscador
const filtradorBarrios = document.getElementById("filtradorBarrios")

const filtrar = ()=>{
    const nombreBarrios = []
    let inputBarrioBuscador = filtradorBarrios.value
    onGetTasks((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            const barrio = doc.data()
            if(inputBarrioBuscador == barrio.nombre){
                containerBarrios.innerHTML = "";
                containerBarrios.innerHTML += 
                `<div class="card card-body mt-2 px-1 col-4 border-primary">
                    <img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ03luuGw4KJi-L-9NoFeC3BWgS5LGnT4E6UA&usqp=CAU>
                    <h3 class="h5">${barrio.nombre}</h3>
                    <p>${barrio.comuna}</p>
                    <p>${barrio.region}</p>
                    <div class="text-center">
                        <button class="btn btn-success">Ver Barrio</button>
                        <button class="btn btn-info">Ver Proyectos</button>
                    </div>
                </div>`;
            }
        })
    })
}

filtradorBarrios.addEventListener('input',async (e)=>{
    await filtrar()
})