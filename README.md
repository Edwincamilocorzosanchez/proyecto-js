# 🎓 Plataforma de Cursos Interactiva

Una plataforma educativa web desarrollada con *HTML, **CSS* y *JavaScript*, que permite explorar cursos, navegar por temas, gestionar perfiles y visualizar asignaciones de manera dinámica y atractiva.

---

## 🌟 Características Principales

- 🔍 *Exploración de Cursos*: Lista visual e interactiva de cursos disponibles.  
- 🧭 *Panel de Navegación Central*: Acceso rápido a todas las secciones desde un único lugar.  
- 📚 *Navegación Temática*: Visualización estructurada por temas dentro de cada curso.  
- 📝 *Gestión de Asignaciones*: Muestra de tareas o trabajos asociados a cada curso.  
- 👤 *Perfil de Usuario*: Información y personalización básica del usuario.  
- 🔄 *Datos Dinámicos*: Cargados desde un archivo courses.json.  

---

## 📁 Estructura del Proyecto

proyecto-js-main-develop/
│
├── .vscode/ # Configuración para Visual Studio Code
│ ├── launch.json # Configura el entorno de depuración
│ └── settings.json # Preferencias específicas del espacio de trabajo
│
├── css/ # Estilos CSS personalizados
│ ├── Assignments.css # Estilos para la vista de asignaciones
│ ├── Course-Topics.css # Estilos para los temas del curso
│ ├── course.css # Estilos generales de cursos
│ ├── panel.css # Estilos del panel principal
│ ├── perfil.css # Estilos del perfil de usuario
│ ├── proceso.css # Estilos de procesos u operaciones
│ └── style.css # Estilos globales compartidos
│
├── data/
│ └── courses.json # Archivo JSON que contiene la información dinámica de los cursos
│
├── img/ # Recursos gráficos usados en la interfaz
│ ├── *.jpeg / *.png # Imágenes de cursos, profesores, interfaz, etc.
│
├── js/ # Scripts JavaScript
│ ├── Assignments.js # Lógica para mostrar asignaciones
│ ├── Course-Topics.js # Lógica para cargar temas de un curso
│ ├── app.js # Script general para inicialización
│ ├── course.js # Funcionalidad de vista individual de curso
│ ├── navegador.js # Script para la navegación entre vistas
│ ├── perfil.js # Lógica de perfil del usuario
│ └── proceso.js # Procesos específicos (transiciones, validaciones, etc.)
│
├── Assignments.html # Página de asignaciones
├── Course-Topics.html # Página con temas detallados del curso
├── course.html # Vista individual de un curso
├── cursos.html # Página principal de cursos
├── navegador.html # Contenedor de navegación principal
├── panel.html # Panel de control principal
├── perfil.html # Vista del perfil de usuario
├── proceso.html # Página para flujos de trabajo o estados de proceso


Copiar
Editar

---

## 🚀 Tecnologías Utilizadas

- *HTML5*: Estructura semántica de la interfaz  
- *CSS3*: Estilos visuales y animaciones  
- *JavaScript (ES6+)*: Lógica interactiva y manipulación del DOM  
- *JSON*: Fuente de datos local para cursos  

---

## ▶ Vista Previa

> (Puedes agregar capturas de pantalla del proyecto aquí)  
> Ejemplo:  
> ![Vista previa de la plataforma](img/preview.png)

---

## 🛠 Instrucciones de Uso

1. *Clona el repositorio:*
   ```bash
   git clone https://github.com/tu-usuario/proyecto-js-develop.git

2. Entra al enlace de netlify
    https://lms-portal-js.netlify.app/