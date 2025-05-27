fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('categories-container');

    data.categories.forEach(category => {
      // Crear sección de categoría
      const section = document.createElement('section');
      section.classList.add('category');

      const title = document.createElement('h3');
      title.textContent = category.name;
      section.appendChild(title);

      const cardGrid = document.createElement('div');
      cardGrid.classList.add('card-grid');

      // Agregar tarjetas de cursos
      category.courses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
       
          <div class="frente-tarjeta">
            <div class="trasera-tarjeta">
              <div class="imagen-con-etiquetas">
                <img src="${course.image}" alt="${course.title}" />
                <span class="etiqueta level">${course.tag}</span>
                <span class="etiqueta duration">${course.tag_2}</span>
              </div>
              <div class="title">${course.title}</div>
              <div class="description">${course.description}</div>
              <div class="card-buttons">
                <button class="enroll-btn" data-course='${JSON.stringify(course).replace(/'/g, "&apos;")}'>Enroll Now</button>
                <button class="info-btn">More Info</button>
              </div>
            </div>
            <div class="detras-tarjeta">
              <div class="detras-tarjeta-content">
                <h3>Prerequisites</h3>
                <p>${course.prerequisites}</p>
                <h3>What You'll Learn</h3>
                <p>${course.whatYouWillLearn}</p>
                <h3>Course Structure</h3>
                <p>${course.structure}</p>
              </div>
              <button class="close-btn">Close</button>
            </div>
          </div>
        `;




       setTimeout(() => {
          const infoBtn = card.querySelector('.info-btn');
          const closeBtn = card.querySelector('.close-btn');
          const enrollBtn = card.querySelector('.enroll-btn');
        enrollBtn?.addEventListener('click', () => {
          const courseData = JSON.parse(enrollBtn.getAttribute('data-course').replace(/&apos;/g, "'"));
          localStorage.setItem('selectedCourse', JSON.stringify(courseData));
          window.location.href = 'course.html';
        });



          infoBtn?.addEventListener('click', () => {
            card.classList.add('flipped');
          });

          closeBtn?.addEventListener('click', () => {
            card.classList.remove('flipped');
          });
        }, 0);

        cardGrid.appendChild(card);
      });

      section.appendChild(cardGrid);
      container.appendChild(section);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
  function mostrarCursosAgregados(contenedor) {
  const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
  if (cursos.length === 0) return;

  const section = document.createElement('section');
  section.classList.add('category');

  const title = document.createElement('h3');
  title.textContent = 'Cursos Agregados';
  section.appendChild(title);

  const cardGrid = document.createElement('div');
  cardGrid.classList.add('card-grid');

  cursos.forEach(curso => {
    const card = crearTarjetaCurso(curso);
    cardGrid.appendChild(card);
  });

  section.appendChild(cardGrid);
  contenedor.appendChild(section);
}
function crearTarjetaCurso(course) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="frente-tarjeta">
      <div class="trasera-tarjeta">
        <div class="imagen-con-etiquetas">
          <img src="${course.image || 'https://via.placeholder.com/300x150'}" alt="${course.title}" />
          <span class="etiqueta level">${course.tag || course.category || ''}</span>
        </div>
        <div class="title">${course.title}</div>
        <div class="description">${course.description}</div>
        <div class="card-buttons">
          <button class="enroll-btn" data-course='${JSON.stringify(course).replace(/'/g, "&apos;")}'>Enroll Now</button>
          <button class="info-btn">More Info</button>
        </div>
      </div>
      <div class="detras-tarjeta">
        <div class="detras-tarjeta-content">
          <p>${course.prerequisites || 'Sin detalles adicionales'}</p>
        </div>
        <button class="close-btn">Close</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const infoBtn = card.querySelector('.info-btn');
    const closeBtn = card.querySelector('.close-btn');
    const enrollBtn = card.querySelector('.enroll-btn');

    infoBtn?.addEventListener('click', () => {
      card.classList.add('flipped');
    });

    closeBtn?.addEventListener('click', () => {
      card.classList.remove('flipped');
    });

    enrollBtn?.addEventListener('click', () => {
      const courseData = JSON.parse(enrollBtn.getAttribute('data-course').replace(/&apos;/g, "'"));
      localStorage.setItem('selectedCourse', JSON.stringify(courseData));
      window.location.href = 'course.html';
    });
  }, 0);

  return card;
}
