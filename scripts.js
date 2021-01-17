//Lógica de Dropdown
$("#users, #comments, #projects, #neighborhood, #contacts").click((event) => {
  const id = `#${event.target.id}Section`;
  $("#sections").removeClass("d-none");
  $("#sections section").hide();
  $(id).show();
});

// Scripts para CRUDS
const db = firebase.firestore();
let editStatus = false;
let id = "";
//////////////Scripts Usuarios/////////////////
////////////////////////////////////////
////////////  Para Usuarios  ////////////
// nombre formulario : usuarioFormulario

const usuarioFormulario = document.getElementById("usuarioFormulario");
//const usuariosContainer = document.getElementById("usuariosContainer");
const usuariosFilas = document.getElementById("usuarioFilas");

/// crear
const guardarUsuario = (
  nombre,
  apellido,
  rut,
  password,
  direccion,
  email,
  telefono,
  barrio
) =>
  db.collection("usuarios").doc().set({
    nombre,
    apellido,
    rut,
    password,
    direccion,
    email,
    telefono,
    barrio,
  });

// leer
const getUsuarios = () => db.collection("usuarios").get();
const onGetUsuarios = (callback) =>
  db.collection("usuarios").onSnapshot(callback);

// delete
const deleteUsuario = (id) => db.collection("usuarios").doc(id).delete();

// editar
const getUsuario = (id) => db.collection("usuarios").doc(id).get();
const updateUsuario = (id, updatedUsuario) =>
  db.collection("usuarios").doc(id).update(updatedUsuario);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetUsuarios((querySnapshot) => {
    usuariosFilas.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const usuario = doc.data();

      usuariosFilas.innerHTML += `
      <tr>
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.rut}</td>
      <td>${usuario.password}</td>
      <td>${usuario.direccion}</td>
      <td>${usuario.email}</td>
      <td>${usuario.telefono}</td>
      <td>${usuario.barrio}</td>       


        <td> <button class="btn btn-danger btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-warning btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button></td>
        </tr>  
      
      `;
      // para borrar
      const btnsDelete = usuariosFilas.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteUsuario(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = usuariosFilas.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getUsuario(e.target.dataset.id);
            const usuario = doc.data();
            usuarioFormulario["usuarioNombre"].value = usuario.nombre;
            usuarioFormulario["usuarioApellido"].value = usuario.apellido;
            usuarioFormulario["usuarioRut"].value = usuario.rut;
            usuarioFormulario["usuarioPassword"].value = usuario.password;
            usuarioFormulario["usuarioDireccion"].value = usuario.direccion;
            usuarioFormulario["usuarioEmail"].value = usuario.email;
            usuarioFormulario["usuarioTelefono"].value = usuario.telefono;
            usuarioFormulario["usuarioBarrio"].value = usuario.barrio;

            editStatus = true;
            id = doc.id;
            usuarioFormulario["btnUsuarioFormulario"].innerText = "Update";
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
usuarioFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuarioNombre = usuarioFormulario["usuarioNombre"];
  const usuarioApellido = usuarioFormulario["usuarioApellido"];
  const usuarioRut = usuarioFormulario["usuarioRut"];
  const usuarioPassword = usuarioFormulario["usuarioPassword"];
  const usuarioDireccion = usuarioFormulario["usuarioDireccion"];
  const usuarioEmail = usuarioFormulario["usuarioEmail"];
  const usuarioTelefono = usuarioFormulario["usuarioTelefono"];
  const usuarioBarrio = usuarioFormulario["usuarioBarrio"];
  try {
    if (!editStatus) {
      await guardarUsuario(
        usuarioNombre.value,
        usuarioApellido.value,
        usuarioRut.value,
        usuarioPassword.value,
        usuarioDireccion.value,
        usuarioEmail.value,
        usuarioTelefono.value,
        usuarioBarrio.value
      );
    } else {
      await updateUsuario(id, {
        nombre: usuarioNombre.value,
        apellido: usuarioApellido.value,
        rut: usuarioRut.value,
        password: usuarioPassword.value,
        direccion: usuarioDireccion.value,
        email: usuarioEmail.value,
        telefono: usuarioTelefono.value,
        barrio: usuarioBarrio.value,
      });

      editStatus = false;
      id = "";
      usuarioFormulario["btnUsuarioFormulario"].innerText = "Guardar";
    }

    usuarioFormulario.reset();
    usuarioNombre.focus();
  } catch (error) {
    console.log(error);
  }
});

//////////////Fin Scripts Usuarios/////////////////

//////////////Scripts Comentarios/////////////////
////////////////////////////////////////
////////////  Para Comentarios  ////////////
// nombre formulario : comentarioFormulario

const comentarioFormulario = document.getElementById("comentarioFormulario");
// const comentariosContainer = document.getElementById("comentariosContainer");
const comentarioFilas = document.getElementById("comentarioFilas");

/// crear
const guardarComentario = (nombre, fecha, detalle, barrio) =>
  db.collection("comentarios").doc().set({
    nombre,
    fecha,
    detalle,
    barrio,
  });

// leer
const getComentarios = () => db.collection("comentarios").get();
const onGetComentarios = (callback) =>
  db.collection("comentarios").onSnapshot(callback);

// delete
const deleteComentario = (id) => db.collection("comentarios").doc(id).delete();

// editar
const getComentario = (id) => db.collection("comentarios").doc(id).get();
const updateComentario = (id, updatedComentario) =>
  db.collection("comentarios").doc(id).update(updatedComentario);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetComentarios((querySnapshot) => {
    comentarioFilas.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const comentario = doc.data();
      // (usuario, fecha, comentarioUsuario, barrio)
      comentarioFilas.innerHTML += `
        <tr>
        <td> ${comentario.nombre}</td>
        <td> ${comentario.fecha}</td>
        <td> ${comentario.detalle}</td>
        <td> ${comentario.barrio}</td>
        <td>  <button class="btn btn-primary btn-delete" data-id="${doc.id}"> 🗑 Delete </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}"> 🖉 Edit </button> </td>        
        </tr>
      
      `;
      // para borrar
      const btnsDelete = comentarioFilas.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteComentario(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = comentarioFilas.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getComentario(e.target.dataset.id);
            const comentario = doc.data();
            comentarioFormulario["comentarioNombre"].value = comentario.nombre;
            comentarioFormulario["comentarioFecha"].value = comentario.fecha;
            comentarioFormulario["comentarioDetalle"].value =
              comentario.detalle;
            comentarioFormulario["comentarioBarrio"].value = comentario.barrio;
            editStatus = true;
            id = doc.id;
            comentarioFormulario["btnComentarioFormulario"].innerText =
              "Update";
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
comentarioFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const comentarioNombre = comentarioFormulario["comentarioNombre"];
  const comentarioFecha = comentarioFormulario["comentarioFecha"];
  const comentarioDetalle = comentarioFormulario["comentarioDetalle"];
  const comentarioBarrio = comentarioFormulario["comentarioBarrio"];
  try {
    if (!editStatus) {
      await guardarComentario(
        comentarioNombre.value,
        comentarioFecha.value,
        comentarioDetalle.value,
        comentarioBarrio.value
      );
    } else {
      await updateComentario(id, {
        nombre: comentarioNombre.value,
        fecha: comentarioFecha.value,
        detalle: comentarioDetalle.value,
        barrio: comentarioBarrio.value,
      });

      editStatus = false;
      id = "";
      comentarioFormulario["btnComentarioFormulario"].innerText = "Guardar";
    }

    comentarioFormulario.reset();
    comentarioNombre.focus();
  } catch (error) {
    console.log(error);
  }
});

//////////////Fin Scripts Comentarios/////////////////

//////////////Scripts Proyectos/////////////////

////////////////////////////////////////
////////////  Para Proyectos  ////////////
// nombre formulario : proyectoFormulario

const proyectoFormulario = document.getElementById("proyectoFormulario");
// const proyectosContainer = document.getElementById("proyectosContainer");
const proyectoFilas = document.getElementById("proyectoFilas");
const proyectoFilasFiltrado = document.getElementById("proyectoFilasFiltrado");

proyectoFilasFiltrado;

/// crear
const guardarProyecto = (nombre, barrio, descripcion, likes) =>
  db.collection("proyectos").doc().set({
    nombre,
    barrio,
    descripcion,
    likes,
  });

// leer
const getProyectos = () => db.collection("proyectos").get();
const onGetProyectos = (callback) =>
  db.collection("proyectos").onSnapshot(callback);

// delete
const deleteProyecto = (id) => db.collection("proyectos").doc(id).delete();

// editar
const getProyecto = (id) => db.collection("proyectos").doc(id).get();
const updateProyecto = (id, updatedProyecto) =>
  db.collection("proyectos").doc(id).update(updatedProyecto);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetProyectos((querySnapshot) => {
    proyectoFilas.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const proyecto = doc.data();

      proyectoFilas.innerHTML += `
        
      <tr>
      <td>${proyecto.nombre}</td>
      <td>${proyecto.barrio}</td>
      <td>${proyecto.descripcion}</td>
      <td>${proyecto.likes}</td>
    
      <td> <button class="btn btn-danger btn-delete" data-id="${doc.id}">
      🗑 Delete
    </button>
    <button class="btn btn-warning btn-edit" data-id="${doc.id}">
      🖉 Edit
    </button></td>
      </tr>
      
      `;
      // para borrar
      const btnsDelete = proyectoFilas.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteProyecto(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = proyectoFilas.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getProyecto(e.target.dataset.id);
            const proyecto = doc.data();
            proyectoFormulario["proyectoNombre"].value = proyecto.nombre;
            proyectoFormulario["proyectoBarrio"].value = proyecto.barrio;
            proyectoFormulario["proyectoDescripcion"].value =
              proyecto.descripcion;
            proyectoFormulario["proyectoLikes"].value = proyecto.likes;

            editStatus = true;
            id = doc.id;
            proyectoFormulario["btnProyectoFormulario"].innerText = "Update";
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
proyectoFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const proyectoNombre = proyectoFormulario["proyectoNombre"];
  const proyectoBarrio = proyectoFormulario["proyectoBarrio"];
  const proyectoDescripcion = proyectoFormulario["proyectoDescripcion"];
  const proyectoLikes = proyectoFormulario["proyectoLikes"];

  try {
    if (!editStatus) {
      await guardarProyecto(
        proyectoNombre.value,
        proyectoBarrio.value,
        proyectoDescripcion.value,
        proyectoLikes.value
      );
    } else {
      await updateProyecto(id, {
        nombre: proyectoNombre.value,
        barrio: proyectoBarrio.value,
        descripcion: proyectoDescripcion.value,
        likes: proyectoLikes.value,
      });

      editStatus = false;
      id = "";
      proyectoFormulario["btnProyectoFormulario"].innerText = "Guardar";
    }

    proyectoFormulario.reset();
    proyectoNombre.focus();
  } catch (error) {
    console.log(error);
  }
});

// muestra listado filtrados

// para crear registros
proyectoFormularioBusqueda.addEventListener("submit", async (e) => {
  e.preventDefault();
  const proyectoBusqueda = proyectoFormularioBusqueda["proyectoBusqueda"];
  try {
    await db
      .collection("proyectos")
      .where("barrio", "==", proyectoBusqueda.value)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const proyecto = doc.data();
          proyectoFilasFiltrado.innerHTML += `
          <tr>
      <td>${proyecto.nombre}</td>
      <td>${proyecto.barrio}</td>
      <td>${proyecto.descripcion}</td>
      <td>${proyecto.likes}</td>
      </tr>
        

  
  `;
        });
      });

    proyectoFormularioBusqueda.reset();
  } catch (error) {
    console.log(error);
  }
});

//////////////Fin Scripts Proyectos/////////////////

//////////////Scripts Barrio/////////////////

////////////////////////////////////////
////////////  Para barrios  ////////////
// nombre formulario : barrioFormulario

const barrioFormulario = document.getElementById("barrioFormulario");
// const barriosContainer = document.getElementById("barriosContainer");
const barrioFilas = document.getElementById("barrioFilas");

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
        barrioImagen.value
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

//////////////Barrio Scripts Barrio/////////////////

//////////////Scripts Contactos/////////////////

////////////////////////////////////////
////////////  Para Contacto ////////////
// nombre formulario : contactoFormulario

const contactoFormulario = document.getElementById("contactoFormulario");
//const contactosContainer = document.getElementById("contactosContainer");
const contactosFilas = document.getElementById("contactoFilas");

/// crear
const guardarContacto = (nombre, fecha, detalle, email, estado) =>
  db.collection("contactos").doc().set({
    nombre,
    fecha,
    detalle,
    email,
    estado,
  });

// leer
const getContactos = () => db.collection("contactos").get();
const onGetContactos = (callback) =>
  db.collection("contactos").onSnapshot(callback);

// delete
const deleteContacto = (id) => db.collection("contactos").doc(id).delete();

// editar
const getContacto = (id) => db.collection("contactos").doc(id).get();
const updateContacto = (id, updatedContacto) =>
  db.collection("contactos").doc(id).update(updatedContacto);

// para mostrar en pantalla
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetContactos((querySnapshot) => {
    contactosFilas.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const contacto = doc.data();
      contactosFilas.innerHTML += `<tr>
      <td>${contacto.nombre}</td>
      <td>${contacto.fecha}</td>
      <td>${contacto.email}</td>
      <td>${contacto.estado}</td>
      <td>${contacto.detalle}</td>   
      <td> <button class="btn btn-danger btn-delete" data-id="${doc.id}">
      🗑 Delete
    </button>
    <button class="btn btn-warning btn-edit" data-id="${doc.id}">
      🖉 Edit
    </button></td>
      </tr>
      `;
      // para borrar
      const btnsDelete = contactosFilas.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            await deleteContacto(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      // para editar
      const btnsEdit = contactosFilas.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getContacto(e.target.dataset.id);
            const contacto = doc.data();
            contactoFormulario["contactoNombre"].value = contacto.nombre;
            contactoFormulario["contactoFecha"].value = contacto.fecha;
            contactoFormulario["contactoDetalle"].value = contacto.detalle;
            contactoFormulario["contactoEmail"].value = contacto.email;
            contactoFormulario["contactoEstado"].value = contacto.estado;
            editStatus = true;
            id = doc.id;
            contactoFormulario["btnContactoFormulario"].innerText = "Update";
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
contactoFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const contactoNombre = contactoFormulario["contactoNombre"];
  const contactoFecha = contactoFormulario["contactoFecha"];
  const contactoDetalle = contactoFormulario["contactoDetalle"];
  const contactoEmail = contactoFormulario["contactoEmail"];
  const contactoEstado = contactoFormulario["contactoEstado"];
  try {
    if (!editStatus) {
      await guardarContacto(
        contactoNombre.value,
        contactoFecha.value,
        contactoDetalle.value,
        contactoEmail.value,
        contactoEstado.value
      );
    } else {
      await updateContacto(id, {
        nombre: contactoNombre.value,
        fecha: contactoFecha.value,
        detalle: contactoDetalle.value,
        email: contactoEmail.value,
        estado: contactoEstado.value,
      });

      editStatus = false;
      id = "";
      contactoFormulario["btnContactoFormulario"].innerText = "Guardar";
    }

    contactoFormulario.reset();
    contactoNombre.focus();
  } catch (error) {
    console.log(error);
  }
});

//////////////Fin Scripts Contactos/////////////////
