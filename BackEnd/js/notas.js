
const btn_cerrar_sesion = document.getElementById("salir_cuenta");
const nombre_user = document.getElementById("nombre_usuario");


btn_cerrar_sesion.addEventListener("click", () => {
    alert("working")

    nombre_user.innerHTML = "patroclo";
});


document.addEventListener('DOMContentLoaded', function () {
    const contenedorNotas = document.querySelector('.contenedor_notas');
    const crearNotaBtn = document.getElementById('crearNota');
    const descripcionNotaInput = document.getElementById('descripcionNota');

    crearNotaBtn.addEventListener('click', function () {
        document.querySelector('.nota-nueva').style.display = 'block';
    });

    document.getElementById('guardarNota').addEventListener('click', function () {
        const descripcionNota = descripcionNotaInput.value;

        if (descripcionNota.trim() !== '') {
            const nuevaNota = document.createElement('div');

            // Clase aleatoria para el tamaño de la nota
            const tamanioNotas = ['nota-pequena', 'nota-mediana', 'nota-grande'];
            const randomTamanio = tamanioNotas[Math.floor(Math.random() * tamanioNotas.length)];
            nuevaNota.className = 'nota ' + randomTamanio;

            const randomColor = getRandomColor();
            nuevaNota.style.backgroundColor = randomColor;

            nuevaNota.innerHTML = `
                <div class="contenido_nota">
                    <p class="text">${descripcionNota}</p>
                    <div class="opt">
                        <i class="fa-solid fa-trash eliminar_nota"></i>
                        <i class="fa-solid fa-pencil editar_nota"></i>
                    </div>
                </div>
            `;

            contenedorNotas.appendChild(nuevaNota);

            descripcionNotaInput.value = '';
            document.querySelector('.nota-nueva').style.display = 'none';

            const eliminarNotaBtn = nuevaNota.querySelector('.eliminar_nota');
            eliminarNotaBtn.addEventListener('click', function () {
                contenedorNotas.removeChild(nuevaNota);
            });

            const editarNotaBtn = nuevaNota.querySelector('.editar_nota');
            editarNotaBtn.addEventListener('click', function () {
                const nuevoDescripcion = prompt('Editar la descripción:', descripcionNota);
                if (nuevoDescripcion !== null) {
                    descripcionNota = nuevoDescripcion;
                    nuevaNota.querySelector('.text').textContent = descripcionNota;
                }
            });
        }
    });

    function getRandomColor() {
/*         const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color; */
        const colores = ['#FFC3A0','#B8F2E6','#FFCB77','#dfff77','#ff9277','#77cbff','#ff77d2','#ffd277']
    }
});