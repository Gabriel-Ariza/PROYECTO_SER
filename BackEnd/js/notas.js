
const btn_cerrar_sesion = document.getElementById("salir_cuenta");
const nombre_user = document.getElementById("nombre_usuario");


btn_cerrar_sesion.addEventListener("click", () => {
    alert("working")

    nombre_user.innerHTML = "patroclo";
});