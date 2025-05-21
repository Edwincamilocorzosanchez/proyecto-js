fetch('courses.json')
  .then(response => response.json())
  .then(courses => {
    const container = document.getElementById('courses-container');

    courses.forEach(course => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <div class="card-tags">
                <span class="tag level">Beginner</span>
                <span class="tag duration">8 weeks</span>
            </div>
            <img src="${course.image}" alt="${course.title}" />
            <div class="title">${course.title}</div>
            <div class="description">${course.description}</div>
            <div class="card-buttons">
              <button class="enroll-btn">Enroll Now</button>
              <button class="info-btn">More Info</button>
            </div>
          </div>
          <div class="card-back">
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

      const inner = card.querySelector('.card-inner');
      card.querySelector('.info-btn').addEventListener('click', () => {
        card.classList.add('flipped');
      });
      card.querySelector('.close-btn').addEventListener('click', () => {
        card.classList.remove('flipped');
      });
    });
  });

