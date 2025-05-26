const jsonData = [
  {
    id: "proce1",
    title: "Web Development",
    image: "img/node-js.jpeg",
    progress: 80,
    topics: [
      { title: "HTML Fundamentals", desc: "Basic structure, elements, and semantic markup", progress: 100 },
      { title: "CSS Styling", desc: "Selectors, properties, layouts, and responsive design", progress: 85 },
      { title: "JavaScript Basics", desc: "Variables, functions, DOM manipulation", progress: 75 },
      { title: "Frontend Frameworks", desc: "Introduction to modern frameworks and libraries", progress: 60 }
    ]
  },
  {
    id: "proce2",
    title: "Data Science",
    image: "img/ventana2.jpeg",
    progress: 60,
    topics: [
      { title: "Python Programming", desc: "Basic syntax, data structures, and functions", progress: 90 },
      { title: "Data Analysis", desc: "Working with pandas and numpy", progress: 70 },
      { title: "Machine Learning", desc: "Basic algorithms and model training", progress: 45 },
      { title: "Data Visualization", desc: "Creating charts and interactive visualizations", progress: 35 }
    ]
  },
  {
    id: "proce3",
    title: "Mobile Development",
    image: "img/ventana3.jpeg",
    progress: 45,
    topics: [
      { title: "Mobile UI Design", desc: "Principles of mobile interface design", progress: 80 },
      { title: "React Native Basics", desc: "Components, navigation, and state management", progress: 55 },
      { title: "Native APIs", desc: "Camera, location, and device features", progress: 30 },
      { title: "App Publishing", desc: "Preparing and deploying to app stores", progress: 15 }
    ]
  },
  {
    id: "proce4",
    title: "Cloud Computing",
    image: "img/ventana4.jpeg",
    progress: 30,
    topics: [
      { title: "Cloud Fundamentals", desc: "Basic concepts and service models", progress: 100 },
      { title: "AWS Services", desc: "EC2, S3, and core AWS services", progress: 40 },
      { title: "Cloud Security", desc: "Security best practices and implementation", progress: 25 },
      { title: "Serverless Computing", desc: "Lambda functions and serverless architecture", progress: 15 }
    ]
  }
];

document.querySelectorAll('.proce1, .proce2, .proce3, .proce4, .proce5, .proce6').forEach(card => {
  card.addEventListener('click', () => {
    const courseId = card.classList[0]; // e.g., 'proce1'
    const course = jsonData.find(c => c.id === courseId);
    if (course) showPopup(course);
  });
});

function showPopup(course) {
  document.getElementById('popup-title').innerText = course.title;
  document.getElementById('popup-image').style.backgroundImage = `url('${course.image}')`;
  document.getElementById('popup-progress-text').innerText = `${course.progress}% Complete`;
  document.querySelector('#popup-progress-bar::before')?.remove(); // remove old inline style
  document.querySelector('#popup-progress-bar').style.setProperty('--progress', `${course.progress}%`);
  document.querySelector('#popup-progress-bar').style.position = "relative";
  document.querySelector('#popup-progress-bar').innerHTML = `<div style="width: ${course.progress}%; background: limegreen; height: 100%; border-radius: 4px;"></div>`;

  const content = course.topics.map(topic => `
    <div class="topic-block">
      <div class="topic-title">${topic.title}</div>
      <div class="topic-desc">${topic.desc}</div>
      <div class="topic-progress" style="position: relative;">
        <div style="width: ${topic.progress}%; background: dodgerblue; height: 100%; border-radius: 3px;"></div>
      </div>
      <div style="font-size: 0.85em; color: #666; margin-top: 3px;">${topic.progress}% Complete</div>
    </div>
  `).join("");

  document.getElementById('popup-content').innerHTML = content;
  document.getElementById('popup-card').style.display = 'block';
}

document.getElementById('popup-close').addEventListener('click', () => {
  document.getElementById('popup-card').style.display = 'none';
});
