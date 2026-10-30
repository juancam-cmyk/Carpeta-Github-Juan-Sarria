// --- CASO DE PRUEBA 1: Compra de Abonos (Con descuento) ---
const producto1 = "Abono Sur 2026";
const precioAbono = 350000; // const porque el precio base no cambia
let cantidad1 = 3;          // let porque la cantidad podría variar
const esSocioDIM = true; 

// --- CASO DE PRUEBA 2: Compra de Tienda (Sin descuento) ---
const producto2 = "Camiseta Oficial DIM";
const precioCamiseta = 250000;
let cantidad2 = 1;
const esSocioDIM2 = false;

// Llamada a la función ANTES de declararla (Demostrando el HOISTING del PDF)
console.log("🔴CALCULADORA DIM🔵");
mostrarResumen(producto1, precioAbono, cantidad1, esSocioDIM);
mostrarResumen(producto2, precioCamiseta, cantidad2, esSocioDIM2);


// Función con variables locales (Scope de función)
function calcularTotal(precio, cantidad, esSocio) {
    const IVA = 0.19; // Scope de función: Esta variable solo existe aquí dentro
    let total = precio * cantidad; // Operador aritmético de multiplicación (*)

    // Condicional lógico (if) y operador lógico (|| que significa "Ó")
    // Aplica descuento del 10% si se compran 3 o más artículos, Ó si es socio
    if (cantidad >= 3 || esSocio === true) { 
        // Scope de bloque: "descuento" solo existe dentro de estas llaves { }
        let descuento = total * 0.10; 
        total = total - descuento; // Operadores de asignación y resta (-)
    }

    // Se calcula el precio final sumándole el IVA (+)
    return total * (1 + IVA); 
}


function mostrarResumen(nombreProducto, precio, cantidad, esSocio) {
    // Operador lógico (&& que significa "Y") y operadores de comparación (>)
    const compraValida = (precio > 0 && cantidad > 0); 
    
    // Operador Ternario (condición ? si_es_verdadero : si_es_falso)
    const mensaje = compraValida 
        ? "> " + nombreProducto + ": $" + calcularTotal(precio, cantidad, esSocio)
        : "> Error: Stock agotado o valores inválidos";
        
    console.log(mensaje);
}