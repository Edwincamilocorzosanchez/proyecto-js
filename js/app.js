fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const courses = data.cards; // Aquí seleccionas solo 'tarjetas'

    const container = document.getElementById('courses-container');

    courses.forEach(course => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <div class="frente-tarjeta">
          <div class="trasera-tarjeta">
            <div class="tarjeta-etiquetas">
              <span class="etiqueta level">${course.tag}</span>
              <span class="etiqueta duration">${course.tag_2}</span>
            </div>
            <img src="${course.image}" alt="${course.title}" />
            <div class="title">${course.title}</div>
            <div class="description">${course.description}</div>
            <div class="card-buttons">
              <button class="enroll-btn">Enroll Now</button>
              <button class="info-btn">More Info</button>
            </div>
          </div>
          <div class="detras-tarjeta">
            <h3>Prerequisites</h3>
            <p>${course.prerequisites}</p>
            <h3>What You'll Learn</h3>
            <p>${course.whatYouWillLearn}</p>
            <h3>Course Structure</h3>
            <p>${course.structure}</p>
            <button class="close-btn">Close</button>
          </div>
        </div>
      `;

      container.appendChild(card);

      const infoBtn = card.querySelector('.info-btn');
      const closeBtn = card.querySelector('.close-btn');

      infoBtn.addEventListener('click', () => {
        card.classList.add('flipped');
      });

      closeBtn.addEventListener('click', () => {
        card.classList.remove('flipped');
      });
    });
  });


fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const courses = data.tarjetas; // Aquí seleccionas solo 'tarjetas'

    const container = document.getElementById('courses-containe');

    courses.forEach(course => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <div class="frente-tarjeta">
          <div class="trasera-tarjeta">
            <div class="tarjeta-etiquetas">
              <span class="etiqueta level">${course.tag}</span>
              <span class="etiqueta duration">${course.tag_2}</span>
            </div>
            <img src="${course.image}" alt="${course.title}" />
            <div class="title">${course.title}</div>
            <div class="description">${course.description}</div>
            <div class="card-buttons">
              <button class="enroll-btn">Enroll Now</button>
              <button class="info-btn">More Info</button>
            </div>
          </div>
          <div class="detras-tarjeta">
            <h3>Prerequisites</h3>
            <p>${course.prerequisites}</p>
            <h3>What You'll Learn</h3>
            <p>${course.whatYouWillLearn}</p>
            <h3>Course Structure</h3>
            <p>${course.structure}</p>
            <button class="close-btn">Close</button>
          </div>
        </div>
      `;

      container.appendChild(card);

      const infoBtn = card.querySelector('.info-btn');
      const closeBtn = card.querySelector('.close-btn');

      infoBtn.addEventListener('click', () => {
        card.classList.add('flipped');
      });

      closeBtn.addEventListener('click', () => {
        card.classList.remove('flipped');
      });
    });
  });
