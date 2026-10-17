let cart = [];
let total = 0;
const BUSINESS_PHONE = "526675912648"; 

function addToCart(productName, productPrice) {
    let existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    updateCartUI();
    showToast();
}

function updateCartUI() {
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.getElementById('total-price').innerText = total.toFixed(2);
    document.getElementById('items-count').innerText = totalItems + (totalItems === 1 ? " SERVICIO" : " SERVICIOS");
    
    // Mostrar la barra si hay items, ocultarla si está vacía
    const cartBar = document.getElementById('cart-bar');
    if (cart.length > 0) {
        cartBar.classList.add('active');
    } else {
        cartBar.classList.remove('active');
    }
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

function sendOrder() {
    if (cart.length === 0) return;

    // Pedir datos adaptados al nicho de consolas
    let customerInfo = prompt("Por favor, ingresa tu Nombre y el Modelo de tu Consola (Ej. Juan - Nintendo 64):");
    if (!customerInfo) customerInfo = "Cotización General";

    // Construir el "Ticket"
    let message = "🕹️ *SOLICITUD DE COTIZACIÓN RETROREVIVE*\n";
    message += "👤 Cliente/Consola: " + customerInfo + "\n";
    message += "---------------------------\n";
    
    cart.forEach(item => {
        message += `▪ ${item.quantity}x ${item.name} ($${item.price * item.quantity})\n`;
    });
    
    message += "---------------------------\n";
    message += `*TOTAL ESTIMADO: $${total.toFixed(2)}*\n\n`;
    message += "_Nota: Los precios finales pueden variar tras una revisión física del equipo._";

    // Enviar a WhatsApp
    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}
