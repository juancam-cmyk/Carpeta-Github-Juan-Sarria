// 1. Tres arrays del mismo tamaño, con nombres en plural y const.
const productosBase = ["Camiseta Local", "Pantaloneta", "Chaqueta DIM", "Gorra Oficial", "Bufanda"];
const preciosBase = [250000, 120000, 300000, 80000, 50000];
// Pon aquí los nombres reales de tus imágenes
const imagenesBase = ["../img/camisa.jpg.", "../img/pantaloneta.jpg", "../img/chaqueta.jpg", "../img/gorra.jpg", "../img/bufanda.jpg"]; 

// Arrays de trabajo (usamos let para poder filtrarlos y modificarlos en la interfaz)
let productos = [...productosBase];
let precios = [...preciosBase];
let imagenes = [...imagenesBase];

// Referencias al DOM
const lista = document.getElementById("lista");
const mensajeConsola = document.getElementById("mensaje-consola");

// 2. Pintar la lista con forEach en un <ul> (Añadimos arrayImg)
function renderizarInventario(arrayProd, arrayPrec, arrayImg, textoMensaje = "") {
    lista.innerHTML = ""; // Limpiar lista actual
    
    arrayProd.forEach((p, i) => {
        // Crear elemento li (Casillero)
        const li = document.createElement("li");
        li.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        
        // Interfaz del casillero (Ya con el src= arreglado)
        li.innerHTML = `
            <div class="casillero card h-100 bg-dark border-secondary text-center shadow-lg">
                <div class="espacio-imagen p-2">
                    <img src="${arrayImg[i]}" alt="${p}" class="img-fluid rounded">
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-light fw-bold text-uppercase">${p}</h5>
                    <p class="card-text text-danger fs-4 fw-bold mb-0">$${arrayPrec[i].toLocaleString('es-CO')}</p>
                </div>
            </div>
        `;
        lista.appendChild(li);
    });

    if (textoMensaje) {
        mensajeConsola.textContent = "> " + textoMensaje;
    }
}

// Pintar inventario inicial al cargar la página
renderizarInventario(productos, precios, imagenes, "Inventario inicial cargado.");

// --- EVENTOS DE LOS BOTONES (Cumpliendo requisitos del PDF) ---

// 3. Usar PUSH
document.getElementById("btn-agregar").addEventListener("click", () => {
    productos.push("Medias DIM");
    precios.push(35000);
    imagenes.push("../img/medias.jpg"); // Agregamos la imagen del nuevo producto
    renderizarInventario(productos, precios, imagenes, "Se agregó 'Medias DIM' con push().");
});

// 4. Usar POP
document.getElementById("btn-quitar").addEventListener("click", () => {
    if (productos.length > 0) {
        const eliminado = productos.pop();
        precios.pop();
        imagenes.pop(); // Quitamos también su imagen
        renderizarInventario(productos, precios, imagenes, `Se eliminó '${eliminado}' con pop().`);
    }
});

// 5. Usar FILTER 
document.getElementById("btn-filtrar").addEventListener("click", () => {
    // Obtenemos los índices de los precios menores a 100.000
    const indicesBaratos = [];
    const baratos = precios.filter((p, index) => {
        if (p <= 100000) {
            indicesBaratos.push(index);
            return true;
        }
        return false;
    });

    // Filtramos los productos y las imágenes usando esos mismos índices
    const productosBaratos = indicesBaratos.map(index => productos[index]);
    const imagenesBaratas = indicesBaratos.map(index => imagenes[index]);
    
    renderizarInventario(productosBaratos, baratos, imagenesBaratas, "Mostrando productos económicos (<= 100000) usando filter().");
});

// 6. Usar MAP (Transformar un dato)
document.getElementById("btn-iva").addEventListener("click", () => {
    // Agregamos el 19% de IVA y redondeamos
    const conIva = precios.map(p => Math.round(p * 1.19));
    
    // Cambiamos el nombre para que el usuario sepa que tiene IVA
    const productosIva = productos.map(p => p + " (+IVA)");

    // Las imágenes no cambian, pasamos el array original
    renderizarInventario(productosIva, conIva, imagenes, "Precios recalculados con 19% de IVA usando map().");
});

// 7. Usar INCLUDES
document.getElementById("btn-buscar").addEventListener("click", () => {
    const hayCamiseta = productos.includes("Camiseta Local");
    mensajeConsola.textContent = `> ¿El inventario incluye 'Camiseta Local'? Respuesta: ${hayCamiseta} (usando includes())`;
});

// Botón de utilidad para reiniciar
document.getElementById("btn-restaurar").addEventListener("click", () => {
    productos = [...productosBase];
    precios = [...preciosBase];
    imagenes = [...imagenesBase];
    renderizarInventario(productos, precios, imagenes, "Inventario restaurado a su estado original.");
});