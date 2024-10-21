document.addEventListener('DOMContentLoaded', function() {
  cargarTareas();

  document.getElementById('nuevaTarea').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      agregarTarea();
    }
  });
});

function crearElementoTarea(texto, fecha) {
  const contenedor = document.createElement('div');
  contenedor.className = 'contenedores';
  
  const contentText = document.createElement('span');
  contentText.textContent = texto;

  const fechaText = document.createElement('span');
  fechaText.className = 'fecha';
  fechaText.textContent = ` (${fecha})`;

  const editar = document.createElement('button');
  editar.className = 'editar';
  editar.textContent = 'Editar';
  editar.addEventListener('click', () => iniciarEdicion(contenedor, contentText));

  const borrar = document.createElement('button');
  borrar.className = 'borrar';
  borrar.textContent = 'Borrar';
  borrar.addEventListener('click', () => borrarTarea(contenedor, texto));

  contenedor.appendChild(contentText);
  contenedor.appendChild(fechaText);
  contenedor.appendChild(editar);
  contenedor.appendChild(borrar);

  return contenedor;
}

function agregarTarea() {
  const texto = document.getElementById('nuevaTarea').value.trim();
  if (texto === "") {
    alert('Ingresa una tarea');
    return;
  }

  if (tareaExiste(texto)) {
    alert('La tarea ya existe');
    return;
  }

  const fecha = new Date().toLocaleDateString();
  const contenedor = crearElementoTarea(texto, fecha);
  document.getElementById('contenedorPrincipal').appendChild(contenedor);
  guardarTarea(texto, fecha);

  document.getElementById('nuevaTarea').value = '';
}

function iniciarEdicion(elemento, contenido) {
  if (elemento.querySelector('.editar-tarea')) return;

  const editarInput = document.createElement('input');
  editarInput.className = 'editar-tarea';
  editarInput.type = 'text';
  editarInput.value = contenido.textContent;

  const botonGuardar = document.createElement('button');
  botonGuardar.textContent = 'Guardar';
  botonGuardar.className = 'boton-guardar';
  botonGuardar.addEventListener('click', () => guardarCambios(elemento, contenido, editarInput));

  const botonCancelar = document.createElement('button');
  botonCancelar.textContent = 'Cancelar';
  botonCancelar.className = 'boton-cancelar';
  botonCancelar.addEventListener('click', () => cancelarEdicion(elemento, contenido, editarInput, botonGuardar, botonCancelar));

  contenido.style.display = 'none';
  elemento.appendChild(editarInput);
  elemento.appendChild(botonGuardar);
  elemento.appendChild(botonCancelar);

  editarInput.focus();

  editarInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      guardarCambios(elemento, contenido, editarInput);
    }
  });
}

function guardarCambios(elemento, contenido, editarInput) {
  const nuevoTexto = editarInput.value.trim();

  if (nuevoTexto === '') {
    alert('Por favor, ingresa un texto válido.');
    return;
  }

  const fecha = new Date().toLocaleDateString();
  contenido.textContent = nuevoTexto;
  elemento.querySelector('.fecha').textContent = ` (${fecha})`;

  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas = tareas.map(tarea => tarea.texto === contenido.textContent ? { texto: nuevoTexto, fecha: fecha } : tarea);
  localStorage.setItem('tareas', JSON.stringify(tareas));

  elemento.removeChild(editarInput);
  elemento.removeChild(elemento.querySelector('.boton-guardar'));
  elemento.removeChild(elemento.querySelector('.boton-cancelar'));

  contenido.style.display = '';
}

function cancelarEdicion(elemento, contenido, editarInput, botonGuardar, botonCancelar) {
  // Revertir el contenido a su estado original
  editarInput.remove();
  botonGuardar.remove();
  botonCancelar.remove();
  contenido.style.display = '';
}

function borrarTarea(elemento, texto) {
  elemento.remove();

  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas = tareas.filter(tarea => tarea.texto !== texto);
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function tareaExiste(texto) {
  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  return tareas.some(tarea => tarea.texto === texto);
}

function guardarTarea(texto, fecha) {
  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.push({ texto, fecha });
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.forEach(tarea => {
    const contenedor = crearElementoTarea(tarea.texto, tarea.fecha);
    document.getElementById('contenedorPrincipal').appendChild(contenedor);
  });
}
