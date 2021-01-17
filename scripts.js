//Lógica de Botones
$("#users, #comments, #projects, #neighborhood, #contacts").click((event) => {
  const id = `#${event.target.id}Section`;
  $("#sections").removeClass("d-none");
  $("#sections section").hide();
  $(id).show();
});
