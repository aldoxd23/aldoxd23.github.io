document.getElementById('tarea-form').addEventListener('submit', function(event) {
    event.preventDefault();  
    const taskInput = document.getElementById('tarea-input');
    const taskText = taskInput.value.trim(); 

    if (taskText) {
        const taskList = document.getElementById('tarea-list');
        const listItem = document.createElement('li');

        // Crear el texto de la tarea
        const taskTextNode = document.createElement('span');
        taskTextNode.textContent = taskText;
        listItem.appendChild(taskTextNode);

        // Obtener la fecha actual
        const dateNode = document.createElement('span');
        const currentDate = new Date().toLocaleString(); // Formato de fecha y hora
        dateNode.textContent = currentDate;
        dateNode.style.fontSize = '12px'; // Tamaño de fuente más pequeño
        dateNode.style.color = '#777'; // Color gris para la fecha
        dateNode.style.marginLeft = '10px'; // Espaciado
        listItem.appendChild(dateNode);

        // Botón de Editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = taskTextNode.textContent;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.onclick = function() {
                const newTaskText = inputField.value.trim();
                if (newTaskText) {
                    taskTextNode.textContent = newTaskText; 
                } else {
                    alert("Por favor, ingresa un texto válido.");
                }
                listItem.removeChild(inputField);
                listItem.removeChild(saveButton);
                listItem.appendChild(editButton); // Reagregar el botón de editar
            };

            listItem.removeChild(editButton); // Eliminar el botón de editar
            listItem.appendChild(inputField);
            listItem.appendChild(saveButton);
        };

        // Botón de Eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        taskInput.value = ''; 
    } else {
        alert("Por favor, ingresa una tarea válida."); 
    }
});
