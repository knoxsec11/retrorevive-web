let cart = [];
let total = 0;
const BUSINESS_PHONE = "526675912648"; 

function changeQty(containerId, productName, productPrice, delta) {
    // Buscamos si el artículo ya está en el carrito
    let item = cart.find(i => i.name === productName);
    
    if (!item && delta > 0) {
        // Si no está, lo creamos con cantidad 1
        item = { name: productName, price: productPrice, quantity: 1 };
        cart.push(item);
        showToast("✅ ¡Agregado!", "var(--neon-cyan)");
    } else if (item) {
        // Si ya está, le sumamos o restamos
        item.quantity += delta;
        
        if (item.quantity <= 0) {
            // Si llega a 0, lo eliminamos del carrito (deseleccionar)
            cart = cart.filter(i => i.name !== productName);
            showToast("❌ Removido", "var(--neon-pink)");
            item = null;
        }
    }
    
    // Cambiamos el diseño del botón según la cantidad
    let container = document.getElementById(containerId);
    if (!item || item.quantity === 0) {
        // Si no hay, mostramos el botón normal
        container.innerHTML = `<button class="add-btn" onclick="changeQty('${containerId}', '${productName}', ${productPrice}, 1)">+ COTIZAR</button>`;
    } else {
        // Si hay 1 o más, mostramos los controles [-] [1] [+]
        container.innerHTML = `
            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQty('${containerId}', '${productName}', ${productPrice}, -1)">-</button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" onclick="changeQty('${containerId}', '${productName}', ${productPrice}, 1)">+</button>
            </div>
        `;
    }
    
    updateCartUI();
}

function updateCartUI() {
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Suma todas las cantidades
    
    document.getElementById('total-price').innerText = total.toFixed(2);
    document.getElementById('items-count').innerText = totalItems + (totalItems === 1 ? " SERVICIO" : " SERVICIOS");
    
    const cartBar = document.getElementById('cart-bar');
    if (cart.length > 0) {
        cartBar.classList.add('active');
    } else {
        cartBar.classList.remove('active');
    }
}

function showToast(message, bgColor) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.background = bgColor;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

function sendOrder() {
    if (cart.length === 0) return;

    let customerInfo = prompt("Por favor, ingresa tu Nombre y el Modelo de tu Consola (Ej. Juan - Nintendo 64):");
    if (!customerInfo) customerInfo = "Cotización General";

    let message = "🕹️ *SOLICITUD DE COTIZACIÓN RETROREVIVE*\n";
    message += "👤 Cliente/Consola: " + customerInfo + "\n";
    message += "---------------------------\n";
    
    // Ahora multiplica el precio por la cantidad solicitada
    cart.forEach(item => {
        message += `▪ ${item.quantity}x ${item.name} ($${item.price * item.quantity})\n`;
    });
    
    message += "---------------------------\n";
    message += `*TOTAL ESTIMADO: $${total.toFixed(2)}*\n\n`;
    message += "_Nota: Los precios finales pueden variar tras una revisión física del equipo._";

    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}
