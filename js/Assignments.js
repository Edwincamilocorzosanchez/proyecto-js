document.addEventListener('DOMContentLoaded', () => {
  // Filtros de estado
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-status') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal de entrega
  const modal = document.getElementById('submission-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalForm = document.getElementById('modal-form');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPoints = document.getElementById('modal-points');
  const modalType = document.getElementById('modal-type');
  const modalCourse = document.getElementById('modal-course');
  const modalDue = document.getElementById('modal-due');
  let currentCard = null;

  // Abrir modal y rellenar datos de la card
  document.querySelectorAll('.card[data-status="pending"] .submit-btn, .card[data-status="overdue"] .submit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentCard = btn.closest('.card');
      modalTitle.textContent = currentCard.getAttribute('data-title');
      modalDesc.textContent = currentCard.getAttribute('data-desc');
      modalPoints.innerHTML = `<i class="fas fa-star"></i> Points: ${currentCard.getAttribute('data-points')}`;
      modalType.innerHTML = `<i class="fas fa-file-alt"></i> Type: ${currentCard.getAttribute('data-type')}`;
      modalCourse.textContent = currentCard.getAttribute('data-course');
      modalDue.innerHTML = `<i class="fas fa-calendar-alt"></i> Due: ${currentCard.getAttribute('data-due')}`;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalForm.reset();
    fileList.innerHTML = '';
    filesArr = [];
  }

  // Drag & Drop archivos
  const fileDrop = document.getElementById('file-drop');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-btn');
  const fileList = document.getElementById('file-list');
  let filesArr = [];

  browseBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    addFiles(e.target.files);
    fileInput.value = '';
  });

  fileDrop.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDrop.classList.add('dragover');
  });
  fileDrop.addEventListener('dragleave', () => fileDrop.classList.remove('dragover'));
  fileDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDrop.classList.remove('dragover');
    addFiles(e.dataTransfer.files);
  });

  function addFiles(fileListInput) {
    for (let file of fileListInput) {
      if (!filesArr.some(f => f.name === file.name && f.size === file.size)) {
        filesArr.push(file);
      }
    }
    renderFileList();
  }

  function renderFileList() {
    fileList.innerHTML = '';
    filesArr.forEach((file, idx) => {
      const div = document.createElement('div');
      div.className = 'file-item';
      div.innerHTML = `<i class="fas fa-file"></i> ${file.name} <button class="file-remove" title="Remove" data-idx="${idx}">&times;</button>`;
      fileList.appendChild(div);
    });
    fileList.querySelectorAll('.file-remove').forEach(btn => {
      btn.onclick = (e) => {
        filesArr.splice(btn.getAttribute('data-idx'), 1);
        renderFileList();
      };
    });
  }

  // Envío del formulario
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Assignment submitted!\n\nNotes: ' + document.getElementById('submission-notes').value + (filesArr.length ? `\nFiles: ${filesArr.map(f=>f.name).join(', ')}` : ''));
    closeModal();
  });
});