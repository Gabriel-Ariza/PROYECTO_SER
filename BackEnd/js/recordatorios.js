document.addEventListener('DOMContentLoaded', function () {
    const abrirModalBtn = document.getElementById('abrirModal');
    const modal = document.getElementById('modal');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    const tareaInput = document.getElementById('tareaInput');
    const fechaInput = document.getElementById('fechaInput'); 
    const agregarBtn = document.getElementById('agregar');
    const tablaTareas = document.querySelector('.recordatorios tbody');
    const campoTarea = document.querySelector('.campo-tarea');
    const tareasBtn = document.getElementById('tareas');

    // Función para verificar tareas vencidas y mostrar alerta
    function verificarTareasVencidas() {
        const filas = document.querySelectorAll('.recordatorios tbody tr');
        const fechaHoy = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual

        filas.forEach(function (fila) {
            const fechaLimite = fila.querySelector('input[type="date"]').value;
            if (fechaLimite && fechaHoy === fechaLimite) {
                alert('Hoy se vence esta tarea: ' + fila.querySelector('td:first-child').textContent);
            }
        });
    }

    abrirModalBtn.addEventListener('click', function () {
        modal.style.display = 'block';
        tareaInput.focus();
    });

    cerrarModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    agregarBtn.addEventListener('click', function () {
        const tareaTexto = tareaInput.value.trim();
        const fechaLimite = fechaInput.value; // Obtiene la fecha límite

        if (tareaTexto !== '') {
            const nuevaFila = document.createElement('tr');

            const columnaTarea = document.createElement('td');
            columnaTarea.textContent = tareaTexto;

            const columnaCompletado = document.createElement('td');
            const completadoCheckbox = document.createElement('input');
            completadoCheckbox.type = 'checkbox';
            columnaCompletado.appendChild(completadoCheckbox);

            const columnaFechaLimite = document.createElement('td');
            const fechaLimiteText = document.createElement('span');
            fechaLimiteText.textContent = fechaLimite; // Muestra la fecha límite
            columnaFechaLimite.appendChild(fechaLimiteText);

            const columnaEliminar = document.createElement('td');
            const eliminarBtn = document.createElement('button');
            eliminarBtn.classList.add('eliminar-tarea');
            eliminarBtn.textContent = 'Eliminar';
            columnaEliminar.appendChild(eliminarBtn);

            nuevaFila.appendChild(columnaTarea);
            nuevaFila.appendChild(columnaCompletado);
            nuevaFila.appendChild(columnaFechaLimite);
            nuevaFila.appendChild(columnaEliminar);

            tablaTareas.appendChild(nuevaFila);

            tareaInput.value = '';
            fechaInput.value = ''; // Limpia el campo de fecha límite
            modal.style.display = 'none';

            if (tablaTareas.childElementCount === 1) {
                campoTarea.style.display = 'none';
            } else {
                campoTarea.style.display = 'block';
            }

            verificarTareasVencidas(); // Verifica las tareas vencidas al agregar
        }
    });

    tablaTareas.addEventListener('change', function (event) {
        if (event.target.type === 'checkbox') {
            const fila = event.target.closest('tr');

            if (fila) {
                if (event.target.checked) {
                    const eliminarBtn = fila.querySelector('.eliminar-tarea');
                    eliminarBtn.style.display = 'none';
                    fila.style.textDecoration = 'line-through';
                } else {
                    const eliminarBtn = fila.querySelector('.eliminar-tarea');
                    eliminarBtn.style.display = 'block';
                    fila.style.textDecoration = 'none';
                }
            }
        }
    });

    tareasBtn.addEventListener('click', function () {
        const tareasCompletadas = document.querySelectorAll('.recordatorios tbody tr input[type="checkbox"]:checked');

        if (tareasCompletadas.length > 0) {
            if (confirm('¿Estás seguro de eliminar todas las tareas completadas?')) {
                tareasCompletadas.forEach(function (checkbox) {
                    const fila = checkbox.closest('tr');
                    tablaTareas.removeChild(fila);
                });
            }
        }
    });

    tablaTareas.addEventListener('click', function (event) {
        if (event.target.classList.contains('eliminar-tarea')) {
            if (confirm('¿Estás seguro de eliminar esta tarea?')) {
                const fila = event.target.closest('tr');
                tablaTareas.removeChild(fila);
            }
        }
    });

    verificarTareasVencidas(); // Verifica las tareas vencidas al cargar la página
});
