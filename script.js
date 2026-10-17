let cart = [];
let total = 0;
const BUSINESS_PHONE = "526675912648"; 

function toggleService(btnElement, productName, productPrice) {
    // Buscamos si el servicio ya está en el carrito
    let existingItemIndex = cart.findIndex(item => item.name === productName);
    
    if (existingItemIndex !== -1) {
        // SI YA ESTÁ: Lo eliminamos del carrito (Deseleccionar)
        cart.splice(existingItemIndex, 1);
        
        // Regresamos el botón a su estado original
        btnElement.innerHTML = "+ COTIZAR";
        btnElement.style.cssText = ""; // Limpia los colores forzados
        
        showToast("❌ Servicio removido", "var(--neon-pink)");
    } else {
        // SI NO ESTÁ: Lo agregamos al carrito
        cart.push({ name: productName, price: productPrice, quantity: 1 });
        
        // Cambiamos el diseño del botón para mostrar que ya está seleccionado
        btnElement.innerHTML = "✔️ SELECCIONADO";
        btnElement.style.background = "var(--neon-pink)";
        btnElement.style.color = "#111";
        btnElement.style.boxShadow = "0 0 15px var(--neon-pink)";
        
        showToast("✅ ¡Servicio agregado!", "var(--neon-cyan)");
    }
    
    updateCartUI();
}

function updateCartUI() {
    // Sumamos el total
    total = cart.reduce((sum, item) => sum + item.price, 0);
    let totalItems = cart.length;
    
    document.getElementById('total-price').innerText = total.toFixed(2);
    document.getElementById('items-count').innerText = totalItems + (totalItems === 1 ? " SERVICIO" : " SERVICIOS");
    
    // Mostrar la barra si hay items, ocultarla si el carrito llega a 0
    const cartBar = document.getElementById('cart-bar');
    if (cart.length > 0) {
        cartBar.classList.add('active');
    } else {
        cartBar.classList.remove('active');
    }
}

function showToast(message, bgColor) {
    const toast = document.getElementById('toast');
    toast.innerText = message; // Actualiza el texto
    toast.style.background = bgColor; // Cambia el color dependiendo si agrega o quita
    toast.classList.add('show');
    
    // Ocultar la notificación después de 2 segundos
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

function sendOrder() {
    if (cart.length === 0) return;

    // Pedir datos al cliente
    let customerInfo = prompt("Por favor, ingresa tu Nombre y el Modelo de tu Consola (Ej. Juan - Nintendo 64):");
    if (!customerInfo) customerInfo = "Cotización General";

    // Construir el "Ticket"
    let message = "🕹️ *SOLICITUD DE COTIZACIÓN RETROREVIVE*\n";
    message += "👤 Cliente/Consola: " + customerInfo + "\n";
    message += "---------------------------\n";
    
    cart.forEach(item => {
        message += `▪ 1x ${item.name} ($${item.price})\n`;
    });
    
    message += "---------------------------\n";
    message += `*TOTAL ESTIMADO: $${total.toFixed(2)}*\n\n`;
    message += "_Nota: Los precios finales pueden variar tras una revisión física del equipo._";

    // Enviar a WhatsApp
    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}
