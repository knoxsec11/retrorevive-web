let cart = [];
let total = 0;
// TU NÚMERO DE WHATSAPP
const BUSINESS_PHONE = "526675912648"; 

// 1. LÓGICA DE AGREGAR Y QUITAR CANTIDADES
function changeQty(containerId, productName, productPrice, delta) {
    let item = cart.find(i => i.name === productName);
    
    if (!item && delta > 0) {
        // Agrega el primer elemento
        item = { name: productName, price: productPrice, quantity: 1 };
        cart.push(item);
        showToast("✅ ¡Agregado!", "var(--neon-cyan)");
    } else if (item) {
        // Suma o resta
        item.quantity += delta;
        
        if (item.quantity <= 0) {
            // Si baja a 0, elimina el servicio
            cart = cart.filter(i => i.name !== productName);
            showToast("❌ Removido", "var(--neon-pink)");
            item = null;
        }
    }
    
    // Cambia el diseño del botón
    let container = document.getElementById(containerId);
    if (!item || item.quantity === 0) {
        container.innerHTML = `<button class="add-btn" onclick="changeQty('${containerId}', '${productName}', ${productPrice}, 1)">+ COTIZAR</button>`;
    } else {
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

// 2. ACTUALIZAR BARRA INFERIOR
function updateCartUI() {
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.getElementById('total-price').innerText = total.toFixed(2);
    document.getElementById('items-count').innerText = totalItems + (totalItems === 1 ? " SERVICIO" : " SERVICIOS");
    
    const cartBar = document.getElementById('cart-bar');
    if (cart.length > 0) {
        cartBar.classList.add('active');
    } else {
        cartBar.classList.remove('active');
    }
}

// 3. NOTIFICACIONES
function showToast(message, bgColor) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.background = bgColor;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

// 4. FUNCIONES DEL MODAL (FORMULARIO)
function openModal() {
    if (cart.length === 0) return;
    document.getElementById('checkout-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('checkout-modal').classList.remove('active');
}

// 5. PROCESAR PEDIDO, GENERAR FOLIO Y ABRIR WHATSAPP
function processOrder() {
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();

    if (!name || !phone) {
        showToast("⚠️ Llena todos los campos", "orange");
        return;
    }

    // Calcular Folio usando Memoria Local
    let currentFolio = localStorage.getItem('retrorevive_folio');
    
    if (!currentFolio) {
        currentFolio = 1;
    } else {
        currentFolio = parseInt(currentFolio) + 1;
    }

    localStorage.setItem('retrorevive_folio', currentFolio);
    let stringFolio = currentFolio.toString().padStart(5, '0');

    // Construir el Ticket
    let message = "🕹️ *SOLICITUD DE COTIZACIÓN*\n";
    message += `*FOLIO: #${stringFolio}*\n`;
    message += "---------------------------\n";
    message += `👤 Nombre: ${name}\n`;
    message += `📱 Teléfono: ${phone}\n`;
    message += "---------------------------\n";
    
    cart.forEach(item => {
        message += `▪ ${item.quantity}x ${item.name} ($${item.price * item.quantity})\n`;
    });
    
    message += "---------------------------\n";
    message += `*TOTAL ESTIMADO: $${total.toFixed(2)}*\n\n`;
    message += "_RetroRevive Culiacán_";

    // Enviar a WhatsApp
    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
    
    closeModal();
    window.open(whatsappUrl, '_blank');
}
