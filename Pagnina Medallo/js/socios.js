// ==========================================
// TEMA DEL PDF: Funciones en JavaScript
// ==========================================

// Referencias al DOM
const btnProcesar = document.getElementById("btn-procesar");
const cajaResultado = document.getElementById("caja-resultado");

// 1. Declaración de Función Tradicional (Aprovechando el "Hoisting")
// Puede llamarse en cualquier parte del código.
function validarEdad(edadIngresada) {
    // Los parámetros entran (edadIngresada), el return devuelve
    return edadIngresada >= 18; 
}

// 2. Función Flecha (Arrow Function)
// Ideal para cálculos rápidos. No tiene hoisting, debe declararse antes de usarse.
const calcularPrecioAbono = (tribuna) => {
    if (tribuna === "norte") return 250000;
    if (tribuna === "sur") return 250000;
    if (tribuna === "oriental") return 450000;
    if (tribuna === "occidental") return 750000;
    
    return 0; // Valor por defecto
};

// 3. Combinar Funciones (Live Coding 02 del PDF)
// Una función que llama a otras funciones para hacer un proceso completo
function procesarInscripcion(nombre, edad, tribuna) {
    // Usamos la función de validación
    const esMayor = validarEdad(edad);

    if (!esMayor) {
        // El valor SALE por el return. Así sí se hace.
        return `Lo sentimos, ${nombre}. Debes ser mayor de 18 años para comprar un abono titular.`;
    }

    // Usamos la función de cálculo
    const precioFinal = calcularPrecioAbono(tribuna);
    
    return `¡Bienvenido ${nombre}! Tu abono para la tribuna ${tribuna.toUpperCase()} ha sido aprobado. Total a pagar: $${precioFinal.toLocaleString('es-CO')}`;
}

// ==========================================
// EVENTO DE INTERFAZ
// ==========================================
btnProcesar.addEventListener("click", () => {
    // Capturamos los datos
    const nombre = document.getElementById("input-nombre").value;
    const edad = parseInt(document.getElementById("input-edad").value);
    const tribuna = document.getElementById("select-tribuna").value;

    // Validación rápida de campos vacíos
    if (!nombre || isNaN(edad)) {
        mostrarResultado("Por favor, completa todos los campos correctamente.", "danger");
        return;
    }

    // Guardamos el resultado que devuelve la función en una variable (Buena práctica del PDF)
    const mensajeFinal = procesarInscripcion(nombre, edad, tribuna);

    // Definimos el color del mensaje dependiendo si fue aprobado o rechazado
    const colorAlerta = validarEdad(edad) ? "success" : "danger";
    
    // Mostramos en pantalla
    mostrarResultado(mensajeFinal, colorAlerta);
});

// Función de utilidad para mostrar el mensaje en la pantalla
function mostrarResultado(mensaje, tipoAlerta) {
    cajaResultado.textContent = mensaje;
    cajaResultado.className = `alert mt-4 d-block fw-bold text-center fs-5 shadow-sm alert-${tipoAlerta}`;
}