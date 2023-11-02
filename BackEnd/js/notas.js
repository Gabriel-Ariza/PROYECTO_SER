
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

        let modal = document.getElementById('modal');
        let cerrar_modal = document.getElementById('boton_x');
        modal.style.display = 'flex';
    
        cerrar_modal.addEventListener('click', ()=> {
            modal.style.display = 'none';
            descripcionNotaInput.value = '';
        })
    });

    document.getElementById('guardarNota').addEventListener('click', function () {
        const descripcionNota = descripcionNotaInput.value;
    
        if (descripcionNota.trim() !== '') {
            const nuevaNota = document.createElement('div');
            nuevaNota.classList.add('nota');
    
            const tamanio = generarTamanioAleatorio();
            nuevaNota.style.gridRow = `span ${tamanio.rowSpan}`;
            nuevaNota.style.gridColumn = `span ${tamanio.columnSpan}`;
    
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


            const notas = contenedorNotas.querySelectorAll('.nota');
            const numNotas = notas.length;
    
            if (numNotas % 3 === 0) {
                notas.forEach(nota => {
                    nota.style.gridColumn = `span ${3 + Math.floor(Math.random() * 4)}`; // Asignar tamaño entre 3 y 6
                });
            } else {
                for (let i = 0; i < numNotas - 1; i++) {
                    notas[i].style.gridColumn = `span ${3 + Math.floor(Math.random() * 4)}`; // Asignar tamaño entre 3 y 6
                }
            }
    

    
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
            modal.style.display = 'none';
        }
    });


    function getRandomColor() {
        const colores = ['#FFC3A0', '#B8F2E6', '#FFCB77', '#dfff77', '#ff9277', '#77cbff', '#ff77d2', '#ffd277'];

        if (!getRandomColor.counter) {
            getRandomColor.counter = 0;
        }
    
        if (getRandomColor.counter < colores.length) {
            return colores[getRandomColor.counter++];

        } else {
/*             const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            return randomColor; */
            let min = 150;
            let max = 250;
        
            const red = Math.floor(Math.random() * (max - min + 1)) + min;
            const green = Math.floor(Math.random() * (max - min + 1)) + min;
            const blue = Math.floor(Math.random() * (max - min + 1)) + min;
            return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
        }
    }
    function generarTamanioAleatorio() {
        const minRowSpan = 4;
        const maxRowSpan = 6;
        const minColumnSpan = 3;
        const maxColumnSpan = 6;
    
        const rowSpan = Math.floor(Math.random() * (maxRowSpan - minRowSpan + 1)) + minRowSpan;
        const columnSpan = Math.floor(Math.random() * (maxColumnSpan - minColumnSpan + 1)) + minColumnSpan;
    
        return { rowSpan, columnSpan };
    }
});