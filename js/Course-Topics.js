// ===============================
// Datos de los temas del curso
// ===============================
const topicsData = [
  {
    title: "Introduction to the Course",
    time: "10 min",
    video: "https://www.youtube.com/embed/3JluqTojuME",
    description: "Overview of what you will learn in this course and how to get the most out of it.",
    resources: [
      { text: "📄 Course Syllabus", link: "#" },
      { text: "🛠️ Setup Instructions", link: "#" }
    ]
  },
  {
    title: "Getting Started with Tools",
    time: "15 min",
    video: "https://www.youtube.com/embed/3JluqTojuME",
    description: "Learn about the essential tools and software you'll need for this course.",
    resources: [
      { text: "📝 Tools Checklist", link: "#" },
      { text: "🛠️ Installation Guide", link: "#" }
    ]
  },
  {
    title: "Core Concepts",
    time: "20 min",
    video: "https://www.youtube.com/embed/3JluqTojuME",
    description: "Deep dive into the core concepts that are fundamental for this course.",
    resources: [
      { text: "📄 Concept Map", link: "#" },
      { text: "📝 Practice Exercises", link: "#" }
    ]
  },
  {
    title: "Advanced Techniques",
    time: "25 min",
    video: "https://www.youtube.com/embed/3JluqTojuME",
    description: "Explore advanced techniques and best practices.",
    resources: [
      { text: "📝 Advanced Guide", link: "#" },
      { text: "📄 Code Examples", link: "#" }
    ]
  }
];

// ===============================
// Elementos del DOM
// ===============================
const topicList = document.getElementById('topic-list');
const topics = Array.from(topicList.children);
const progressSpan = document.getElementById('progress');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const completeBtn = document.getElementById('complete-btn');
const videoDiv = document.querySelector('.video');
const mainTitle = document.querySelector('.content h1');
const mainDesc = document.querySelector('.content p');
const resourcesSection = document.querySelector('.resources ul');

// ===============================
// Estado: temas completados y tema activo
// ===============================
let completed = JSON.parse(localStorage.getItem('completedTopics')) || [];
let activeIndex = topics.findIndex(li => li.classList.contains('active'));
if (activeIndex === -1) activeIndex = 0;

// ===============================
// Actualiza la barra lateral (sidebar)
// ===============================
function updateSidebar() {
  topics.forEach((li, idx) => {
    li.classList.toggle('active', idx === activeIndex); // Marca el tema activo
    li.classList.toggle('completed', completed.includes(idx)); // Marca como completado si corresponde
    // Muestra el número solo si no está completado, si está completado lo deja vacío (el chulo lo pone el CSS)
    const checkmark = li.querySelector('.checkmark');
    checkmark.textContent = completed.includes(idx) ? "" : (idx + 1);
  });
  // Actualiza el progreso (ej: 2/4 completed)
  progressSpan.textContent = `${completed.length}/${topics.length} completed`;
}

// ===============================
// Actualiza el contenido principal (video, título, descripción, recursos)
// ===============================
function updateMainContent() {
  const topic = topicsData[activeIndex];
  videoDiv.innerHTML = `<iframe width="100%" height="315" src="${topic.video}" frameborder="0" allowfullscreen></iframe>`;
  mainTitle.textContent = topic.title;
  mainDesc.textContent = topic.description;
  resourcesSection.innerHTML = topic.resources.map(r => `<li><a href="${r.link}">${r.text}</a></li>`).join('');
}

// ===============================
// Actualiza los botones de navegación y el de completar
// ===============================
function updateNavButtons() {
  prevBtn && (prevBtn.disabled = activeIndex === 0);
  nextBtn && (nextBtn.disabled = activeIndex === topics.length - 1);

  // Si el tema está completado, el botón se pone verde y dice "Completed"
  if (completed.includes(activeIndex)) {
    completeBtn.innerHTML = `<span class="circle-check">&#10003;</span> Completed`;
    completeBtn.classList.add('completed-btn');
    completeBtn.disabled = false; // Permite quitar el completado
  } else {
    completeBtn.innerHTML = `Mark as Complete`;
    completeBtn.classList.remove('completed-btn');
    completeBtn.disabled = false;
  }
}

// ===============================
// Actualiza toda la UI
// ===============================
function updateUI() {
  updateSidebar();
  updateMainContent();
  updateNavButtons();
}

// ===============================
// Eventos: cambiar de tema al hacer clic en la lista
// ===============================
topics.forEach((li, idx) => {
  li.addEventListener('click', () => {
    activeIndex = idx;
    updateUI();
  });
});

// ===============================
// Evento: marcar o quitar como completado (toggle)
// ===============================
completeBtn.addEventListener('click', () => {
  const idx = completed.indexOf(activeIndex);
  if (idx === -1) {
    // Si no está completado, lo marca como completado
    completed.push(activeIndex);
  } else {
    // Si ya está completado, lo desmarca
    completed.splice(idx, 1);
  }
  localStorage.setItem('completedTopics', JSON.stringify(completed)); // Guarda en localStorage
  updateUI();
});

// ===============================
// Eventos: navegación entre temas
// ===============================
prevBtn && prevBtn.addEventListener('click', () => {
  if (activeIndex > 0) {
    activeIndex--;
    updateUI();
  }
});

nextBtn && nextBtn.addEventListener('click', () => {
  if (activeIndex < topics.length - 1) {
    activeIndex++;
    updateUI();
  }
});

// ===============================
// Inicializa la UI al cargar la página
// ===============================
updateUI();

