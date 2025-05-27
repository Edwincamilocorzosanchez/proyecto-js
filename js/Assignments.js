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
        card.style.display = (filter === 'all' || card.getAttribute('data-status') === filter) ? '' : 'none';
      });
    });
  });

  // --- MODAL DINÁMICO ---
  let modal = document.getElementById('submission-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'submission-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal">
        <button class="modal-close" title="Close">&times;</button>
        <div class="modal-meta" style="margin-bottom:8px;">
          <span id="modal-course" class="card-subtitle"></span>
          <span id="modal-due" class="due-date"></span>
        </div>
        <h2 style="margin-bottom:0;" id="modal-title"></h2>
        <div id="modal-desc" style="margin-bottom:10px;color:#444;"></div>
        <div class="details" style="margin-bottom:18px;">
          <span id="modal-points"></span>
          <span id="modal-type"></span>
        </div>
        <form id="modal-form" class="modal-form" autocomplete="off">
          <label for="submission-notes" style="margin-bottom:4px;">Submission Notes <span style="color:#ef4444">*</span></label>
          <textarea id="submission-notes" placeholder="Describe your work and any important notes about your submission..." required style="margin-bottom:18px;"></textarea>
          <label style="margin-bottom:4px;">Attachments <span style="color:#888;font-size:0.95em;">(optional)</span></label>
          <div id="file-drop" class="file-drop" tabindex="0" style="margin-bottom:0;">
            <i class="fas fa-paperclip"></i>
            Drag and drop files here or<br>
            <button type="button" id="browse-btn" tabindex="0">Browse Files</button>
            <input type="file" id="file-input" multiple style="display:none;">
            <div style="font-size:0.95em;color:#888;margin-top:8px;">
              Supported files: PDF, DOC, DOCX, TXT, ZIP, RAR, 7Z, JPG, PNG
            </div>
          </div>
          <div id="file-list"></div>
          <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:28px;">
            <button type="button" class="submit-btn" style="background:#e5e7eb;color:#222;" id="cancel-btn">Cancel</button>
            <button type="submit" class="submit-btn" id="submit-btn" disabled>Submit Assignment</button>
          </div>
        </form>
        <div id="modal-warning" style="color:#efb400;font-size:1em;margin-top:10px;display:none;">
          <i class="fas fa-exclamation-triangle"></i> Please fill in all required fields before submitting.
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Referencias al DOM
  const modalClose = modal.querySelector('.modal-close');
  const modalForm = modal.querySelector('#modal-form');
  const modalTitle = modal.querySelector('#modal-title');
  const modalDesc = modal.querySelector('#modal-desc');
  const modalPoints = modal.querySelector('#modal-points');
  const modalType = modal.querySelector('#modal-type');
  const modalCourse = modal.querySelector('#modal-course');
  const modalDue = modal.querySelector('#modal-due');
  const cancelBtn = modal.querySelector('#cancel-btn');
  const submitBtn = modal.querySelector('#submit-btn');
  const notesInput = modal.querySelector('#submission-notes');
  const warningMsg = modal.querySelector('#modal-warning');
  const fileDrop = modal.querySelector('#file-drop');
  const fileInput = modal.querySelector('#file-input');
  const browseBtn = modal.querySelector('#browse-btn');
  const fileList = modal.querySelector('#file-list');
  let filesArr = [];
  let currentCard = null;

  // Abrir modal con datos de la tarjeta
  document.querySelectorAll('.card[data-status="pending"] .submit-btn, .card[data-status="overdue"] .submit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentCard = btn.closest('.card');
      modalTitle.textContent = currentCard.getAttribute('data-title') || '';
      modalDesc.textContent = currentCard.getAttribute('data-desc') || '';
      modalPoints.innerHTML = `<i class="fas fa-star"></i> Points: ${currentCard.getAttribute('data-points') || ''}`;
      modalType.innerHTML = `<i class="fas fa-file-alt"></i> Type: ${currentCard.getAttribute('data-type') || ''}`;
      modalCourse.textContent = currentCard.getAttribute('data-course') || '';
      modalDue.innerHTML = `<i class="fas fa-calendar-alt"></i> Due: ${currentCard.getAttribute('data-due') || ''}`;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      submitBtn.disabled = true;
      warningMsg.style.display = 'none';
      notesInput.value = '';
      fileList.innerHTML = '';
      filesArr = [];
    });
  });

  // Cerrar modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalForm.reset();
    fileList.innerHTML = '';
    filesArr = [];
    warningMsg.style.display = 'none';
    submitBtn.disabled = true;
  }
  modalClose.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Validar input de notas
  notesInput.addEventListener('input', () => {
    submitBtn.disabled = notesInput.value.trim() === '';
    if (!submitBtn.disabled) warningMsg.style.display = 'none';
  });

  // Archivos: Drag & Drop
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
      btn.onclick = () => {
        filesArr.splice(btn.getAttribute('data-idx'), 1);
        renderFileList();
      };
    });
  }

  // Envío del formulario
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (notesInput.value.trim() === '') {
      warningMsg.style.display = 'block';
      return;
    }
    // Aquí iría tu lógica real de envío a servidor
    alert('Assignment submitted!\n\nNotes: ' + notesInput.value +
      (filesArr.length ? `\nFiles: ${filesArr.map(f => f.name).join(', ')}` : ''));
    closeModal();
  });
});
