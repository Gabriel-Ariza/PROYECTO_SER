const monster = document.getElementById('monster');
const inputUsuario = document.getElementById('input-usuario');
const inputClave = document.getElementById('input-clave');
const body = document.querySelector('body');
const anchoMitad = window.innerWidth / 2;
const altoMitad = window.innerHeight / 2;
let seguirPunteroMouse = true;

body.addEventListener('mousemove', (m) => {
    if (seguirPunteroMouse) {
        if (m.clientX < anchoMitad && m.clientY < altoMitad) {
            monster.src = "img/idle/2.png";
        } else if (m.clientX < anchoMitad && m.clientY > altoMitad) {
            monster.src = "img/idle/3.png";
        } else if (m.clientX > anchoMitad && m.clientY < altoMitad) {
            monster.src = "img/idle/5.png";
        } else {
            monster.src = "img/idle/4.png";
        }
    }
})

inputUsuario.addEventListener('focus',()=>{
    seguirPunteroMouse = false;
})

inputUsuario.addEventListener('blur',()=>{
    seguirPunteroMouse = true;
})

inputUsuario.addEventListener('keyup',()=>{
    let usuario = inputUsuario.value.length;
    if(usuario >= 0 && usuario<=5){
        monster.src = 'img/read/1.png';
    }else if(usuario >= 6 && usuario<=14){
        monster.src = 'img/read/2.png';
    }else if(usuario >= 15 && usuario<=20){
        monster.src = 'img/read/3.png';
    }else{
        monster.src = 'img/read/4.png';
    }
})

inputClave.addEventListener('focus',()=>{
    seguirPunteroMouse = false;
    let cont = 1;
    const cubrirOjo = setInterval(() => {
        monster.src = 'img/cover/'+cont+'.png';
        if(cont < 8){
            cont++;
        }else{
            clearInterval(cubrirOjo);
        }
    }, 60);
})

inputClave.addEventListener('blur',()=>{
    seguirPunteroMouse = true;
    let cont = 7;
    const descubrirOjo = setInterval(() => {
        monster.src = 'img/cover/'+cont+'.png';
        if(cont > 1){
            cont--;
        }else{
            clearInterval(descubrirOjo);
        }
    }, 60);
})


/* =========================  REGISTER ========================= */

const btn_login = document.getElementById('cambiar_a_register');
const btn_register = document.getElementById('cambiar_a_login');

const contenido_register = document.getElementById('div_registrarse');
const contenido_login = document.getElementById('div_login');


btn_login.addEventListener('click', (event) => {
    event.preventDefault();

    contenido_login.style.display = 'none';
    contenido_register.style.display = 'grid';    
    alert("cambiando a registrarse")

    const loginForm = document.getElementById('form_login');
    loginForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        const username = document.getElementById('input-usuario').value
        const password = document.getElementById('input-clave').value
        const Users = JSON.parse(localStorage.getItem('users')) || []
        const validUser = Users.find(user => user.name === username && user.password === password)
    
        if(!validUser){
            return alert('Usuario y/o contraseña incorrectos!')
        }
    
        alert(`Bienvenido ${validUser.name}`)
        localStorage.setItem('login_success', JSON.stringify(validUser))
        console.log(localStorage.getItem('login_success'))
        window.location.href = 'index.html'
    
    });
});



btn_register.addEventListener('click', (event) => {
    event.preventDefault();
    contenido_register.style.display = 'none';  
    contenido_login.style.display = 'grid';  
    alert("cambiando a inicio sesion")

    const signupForm = document.getElementById('form_register');

    signupForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        const name = document.getElementById('usuario_registro').value
        const email = document.getElementById('correo_registro').value
        const password = document.getElementById('contraseña_registro').value

        const Users = JSON.parse(localStorage.getItem('users')) || []
        const isUserRegistered = Users.find(user => user.email === email)
        if(isUserRegistered){
            return alert('El usuario ya esta registado!')
        }

        Users.push({name: name, email: email, password: password})
        localStorage.setItem('users', JSON.stringify(Users))
        alert('Registro Exitoso!')
        contenido_register.style.display = 'none';  
        contenido_login.style.display = 'grid';

    });
});

/* =========================  CONFIG PARTICLES ========================= */

particlesJS(
    {
        "particles": {
            "number": {
            "value": 232,
            "density": {
                "enable": true,
                "value_area": 472.6270185112248
            }
            },
            "color": {
            "value": "#ffffff"
            },
            "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
            },
            "opacity": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1.2,
                "opacity_min": 0,
                "sync": false
            }
            },
            "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 0.3,
                "sync": false
            }
            },
            "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
            },
            "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 600
            }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
            },
            "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                "opacity": 1
                }
            },
            "bubble": {
                "distance": 250,
                "size": 0,
                "duration": 2,
                "opacity": 0,
                "speed": 3
            },
            "repulse": {
                "distance": 90,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 10
            },
            "remove": {
                "particles_nb": 2
            }
            }
        },
        "retina_detect": true
        }
);