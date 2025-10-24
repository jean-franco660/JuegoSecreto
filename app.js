let numeroSecreto;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(selector, texto) {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.innerHTML = texto;
    }
}

function verificarIntento() {
    const numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (isNaN(numeroDeUsuario)) {
        asignarTextoElemento('#mensaje', '⚠️ Ingresa un número válido.');
        return;
    }

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('#mensaje', `🎉 ¡Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('#mensaje', 'El número secreto es menor ⬇️');
        } else {
            asignarTextoElemento('#mensaje', 'El número secreto es mayor ⬆️');
        }
        intentos++;
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('#mensaje', '🎯 Ya se sortearon todos los números posibles');
        return null;
    }

    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));

    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', '🎮 Juego del número secreto!');
    asignarTextoElemento('#mensaje', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// ✅ Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos desde JS
    document.querySelector('#formJuego').addEventListener('submit', (e) => {
        e.preventDefault(); // evita que recargue la página
        verificarIntento();
    });
    document.querySelector('#reiniciar').addEventListener('click', reiniciarJuego);

    // Iniciar juego al cargar
    condicionesIniciales();
});