document.addEventListener('DOMContentLoaded', () => {
  const courseData = JSON.parse(localStorage.getItem('selectedCourse'));
  if (!courseData) return;

  const container = document.getElementById('course-container');
  const renderStructureDetailed = (modules) => {
    if (!Array.isArray(modules)) return '';

    return modules.map(module => `
      <div class="module">
        <div class="module-header">
          <h3>${module.title}</h3>
          <button class="toggle-lessons">+</button>
        </div>
        ${module.lessons && module.lessons.length > 0 ? `
          <ul class="lessons hidden">
            ${module.lessons.map(lesson => `<li>${lesson}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
  };



  container.innerHTML = `
   <a href="cursos.html" class="back-button">← Back to Courses</a>
    <div class="course-header" style="background-image: url('${courseData.image}')">
      <div class="overlay">
        <h1>${courseData.title}</h1>
        <div class="tags">
          <span class="tag">📅 ${courseData.tag}</span>
          <span class="tag">📈 ${courseData.tag_2}</span>
          <span class="tag">👥 ${courseData.students}</span>
        </div>
        <p>${courseData.overview}</p>
        <div class="instructor">
          <img src="img/man-teacher.png" alt="Instructor" />

          <div>
            <strong>Course Instructor</strong><br />
            Dr. John Smith
          </div>
        </div>
      </div>
    </div>


    <div class="content">
          <div class="left-column">
            <div class="overview">
              <h2>Course Overview</h2>
              <p>${courseData.overview}</p>
            </div>
            <div class="prerequisites">
              <h2>Prerequisites</h2>
              <p>${courseData.prerequisites_list.map(item => `<div class="learn-item">${item}</div>`).join('')}</p>
            </div>
            <div class="what-you-learn">
              <h2>What You'll Learn</h2>
              ${courseData.whatYouWillLearn_list.map(item => `<div class="learn-item">${item}</div>`).join('')}
            </div>

            <div class="structure">
              <h2>Course Structure</h2>
              <p>${renderStructureDetailed(courseData.structure_detailed)}</p>
            </div>
          </div>

          <div class="price-box">
            <h2>$99.99</h2>
            <ul>
              <li>✅ Lifetime access</li>
              <li>✅ Certificate of completion</li>
              <li>✅ 30-day money-back guarantee</li>
              <li>✅ Direct instructor support</li>
            </ul>
            <button class="boton"><a href="Course-Topics.html" class="start">Start Learning</a></button>
          </div>
    </div>

  `;
  // Después de renderizar el contenido dinámico
  document.querySelectorAll('.toggle-lessons').forEach(button => {
    button.addEventListener('click', () => {
      const module = button.closest('.module');
      const lessonList = module.querySelector('.lessons');
    
      lessonList.classList.toggle('hidden');
    
      // Alternar entre + y −
      button.textContent = lessonList.classList.contains('hidden') ? '+' : '−';
    });
  });
  try {
  const raw = localStorage.getItem('selectedCourse');
  console.log('RAW JSON:', raw);
  const parsed = JSON.parse(raw);
  console.log('PARSED:', parsed);
} catch (e) {
  console.error('Error al parsear JSON:', e.message);
}


});
