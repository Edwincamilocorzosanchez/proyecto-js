// Función para cancelar cambios
document.querySelector('.boton-cancel').addEventListener('click', function () {
    alert("Changes canceled.");
  });
  
  // Función para guardar cambios
  document.querySelector('.boton-save').addEventListener('click', function () {
    // Simulación de guardado de datos
    const personalInfo = document.querySelectorAll('.card:first-of-type .field input');
    const academicInfo = document.querySelectorAll('.card:nth-of-type(2) .field input');
    const preferences = document.querySelectorAll('.preferences input[type="checkbox"]');
  
    // Recopilar datos
    const data = {
        fullName: personalInfo[0].value,
        email: personalInfo[1].value,
        phone: personalInfo[2].value,
        location: personalInfo[3].value,
        studentId: academicInfo[0].value,
        program: academicInfo[1].value,
        startDate: academicInfo[2].value,
        expectedGraduation: academicInfo[3].value,
        emailNotifications: preferences[0].checked,
        publicProfile: preferences[1].checked,
        showProgress: preferences[2].checked,
    };
  
    // Mostrar confirmación
    alert("Changes saved successfully!");
    console.log("Saved Data:", data);
  });