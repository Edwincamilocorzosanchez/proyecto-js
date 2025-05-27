// Mostrar y ocultar panel admin
document.getElementById("admin-btn").addEventListener("click", () => {
  document.getElementById("admin-panel").classList.remove("hidden");
});

function cerrarAdminPanel() {
  document.getElementById("admin-panel").classList.add("hidden");
}

// Guardar curso en localStorage
function guardarCurso(curso) {
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  cursos.push(curso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
}


// Guardar profesor en localStorage
function guardarProfesor(profesor) {
  const profesores = JSON.parse(localStorage.getItem("profesores")) || [];
  profesores.push(profesor);
  localStorage.setItem("profesores", JSON.stringify(profesores));
}

// Eventos de botones
document.getElementById("agregar-curso-btn").addEventListener("click", () => {
  const curso = {
    title: document.getElementById("titulo-curso").value,
    description: document.getElementById("descripcion-curso").value,
    category: document.getElementById("categoria-curso").value,
  };
  guardarCurso(curso);
  alert("Curso guardado.");
});

document.getElementById("agregar-profesor-btn").addEventListener("click", () => {
  const profesor = {
    nombre: document.getElementById("nombre-profesor").value,
    especialidad: document.getElementById("especialidad-profesor").value,
  };
  guardarProfesor(profesor);
  alert("Profesor guardado.");
});
function cargarCursos() {
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  cursos.forEach(curso => {
    console.log("Curso cargado:", curso.title);
    // Aquí puedes generar las tarjetas con JS dinámicamente
  });
}
window.addEventListener("DOMContentLoaded", cargarCursos);
