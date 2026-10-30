// ================================================================
// 1. CALCULADORA DE COMPRAS (DOM + LÓGICA DE NEGOCIO)
// ================================================================
function calcularTotal(precio, cantidad, esSocio) {
    const IVA = 0.19;
    let total = precio * cantidad;

    if (cantidad >= 3 || esSocio === true) {
        let descuento = total * 0.10;
        total = total - descuento;
    }

    return total * (1 + IVA);
}

function ejecutarCalculadora() {
    const inputPrecio = document.getElementById('precioInput');
    const inputCantidad = document.getElementById('cantidadInput');
    const checkSocio = document.getElementById('socioCheck');
    const divResultado = document.getElementById('resultadoCalculadora');

    // Si no estamos en la página de la calculadora, no hace nada
    if (!inputPrecio || !inputCantidad || !divResultado) return;

    const precio = Number(inputPrecio.value);
    const cantidad = Number(inputCantidad.value);
    const esSocio = checkSocio.checked;

    if (precio > 0 && cantidad > 0) {
        const totalFinal = calcularTotal(precio, cantidad, esSocio);
        divResultado.innerHTML = `<strong>Total a pagar:</strong> $${totalFinal.toLocaleString('es-CO')} (IVA incluido)`;
        divResultado.className = "alert alert-success mt-4 mb-0 text-center fw-bold";
    } else {
        divResultado.innerHTML = "⚠️ Por favor, ingresa un precio y cantidad válidos.";
        divResultado.className = "alert alert-danger mt-4 mb-0 text-center";
    }
}

// ================================================================
// 2. SIMULADOR DE CAMPAÑA
// ================================================================
function simularCampana() {
    const divCampana = document.getElementById('resultadoCampana');
    if (!divCampana) return;

    const metaVentas = 5000000;
    let totalAcumulado = 0;
    let ventaDiariaPromedio = 1200000;
    let resumenText = "";

    for (let dia = 1; dia <= 5; dia++) {
        totalAcumulado += ventaDiariaPromedio;
        resumenText += `Día ${dia}: Ventas $${ventaDiariaPromedio.toLocaleString('es-CO')} | Acumulado: $${totalAcumulado.toLocaleString('es-CO')}\n`;
    }

    if (totalAcumulado > metaVentas) {
        resumenText += `\nSTATUS: ¡ÉXITO! Superamos la meta por $${(totalAcumulado - metaVentas).toLocaleString('es-CO')}. 🔴🔵`;
    } else if (totalAcumulado === metaVentas) {
        resumenText += "\nSTATUS: Se alcanzó exactamente la meta proyectada.";
    } else {
        let faltante = metaVentas - totalAcumulado;
        resumenText += `\nSTATUS: No se alcanzó la meta. Faltaron $${faltante.toLocaleString('es-CO')}.`;
    }

    divCampana.textContent = resumenText;
    divCampana.className = "alert alert-primary text-preline mb-4";
}


let boletasDisponibles = localStorage.getItem('boletasGuardadas') !== null 
    ? Number(localStorage.getItem('boletasGuardadas')) 
    : 4;

let boletasVendidas = 4 - boletasDisponibles;


function actualizarEstadoInicial() {
    const spanDisponibles = document.getElementById('boletasDisponibles');
    const divMensaje = document.getElementById('resultadoBoletas');
    const btnVender = document.getElementById('btnVender');

    if (!spanDisponibles || !divMensaje || !btnVender) return;

    spanDisponibles.textContent = boletasDisponibles;

    if (boletasDisponibles === 0) {
        divMensaje.innerHTML = "🚫 ¡BOLETERÍA VIP TOTALMENTE AGOTADA PARA EL CLÁSICO!";
        divMensaje.className = "mt-3 text-center fw-bold text-danger";
        btnVender.disabled = true;
    } else if (boletasVendidas > 0) {
        divMensaje.innerHTML = `✅ Boletas compradas previamente: ${boletasVendidas}`;
        divMensaje.className = "mt-3 text-center fw-bold text-success";
    }
}

// Función que se ejecuta al darle clic al botón "Vender 1 Boleta VIP"
function venderBoleta() {
    const spanDisponibles = document.getElementById('boletasDisponibles');
    const divMensaje = document.getElementById('resultadoBoletas');
    const btnVender = document.getElementById('btnVender');

    if (boletasDisponibles > 0) {
        boletasVendidas++;
        boletasDisponibles--;

        // Guarda el nuevo número en la memoria del navegador
        localStorage.setItem('boletasGuardadas', boletasDisponibles);

        spanDisponibles.textContent = boletasDisponibles;
        divMensaje.innerHTML = `✅ Boleta procesada. Total vendidas: ${boletasVendidas}`;
        divMensaje.className = "mt-3 text-center fw-bold text-success";
    }

    if (boletasDisponibles === 0) {
        divMensaje.innerHTML = "🚫 ¡BOLETERÍA VIP TOTALMENTE AGOTADA PARA EL CLÁSICO!";
        divMensaje.className = "mt-3 text-center fw-bold text-danger";
        btnVender.disabled = true;
    }
}

// Ejecutamos la revisión del estado de las boletas al iniciar
actualizarEstadoInicial();