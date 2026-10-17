let cart = [];
let total = 0;
const BUSINESS_PHONE = "526675912648"; 

// LA BASE DE DATOS DE 106 CONSOLAS
const consolasDB = [
    { name: "Magnavox Odyssey", year: 1972, price: 12000, desc: "Consola, manuales y overlays" },
    { name: "Home Pong", year: 1975, price: 3500, desc: "Consola integrada, cables" },
    { name: "Coleco Telstar", year: 1976, price: 2500, desc: "Consola Pong, eliminador" },
    { name: "Fairchild Channel F", year: 1976, price: 4000, desc: "Consola, 1 control" },
    { name: "RCA Studio II", year: 1977, price: 3000, desc: "Consola con mandos integrados" },
    { name: "Atari 2600", year: 1977, price: 1500, desc: "Consola, 1 Joystick, Cables" },
    { name: "Bally Astrocade", year: 1977, price: 5000, desc: "Consola, mando pistola" },
    { name: "APF-MP1000", year: 1978, price: 3500, desc: "Consola, mandos" },
    { name: "Magnavox Odyssey²", year: 1978, price: 2500, desc: "Consola con teclado, mandos" },
    { name: "Philips Odyssey 2000", year: 1977, price: 3000, desc: "Consola Pong" },
    { name: "Intellivision", year: 1979, price: 2000, desc: "Consola, mandos con disco" },
    { name: "Microvision", year: 1979, price: 3500, desc: "Consola portátil, cartucho base" },
    { name: "Game & Watch", year: 1980, price: 2500, desc: "Portátil original, baterías" },
    { name: "Epoch Cassette Vision", year: 1981, price: 4000, desc: "Consola, mandos integrados" },
    { name: "VTech CreatiVision", year: 1981, price: 3000, desc: "Consola híbrida teclado" },
    { name: "Emerson Arcadia 2001", year: 1982, price: 2500, desc: "Consola, mandos" },
    { name: "Atari 5200", year: 1982, price: 3000, desc: "Consola, 1 control análogo" },
    { name: "ColecoVision", year: 1982, price: 2500, desc: "Consola, 1 mando arcade" },
    { name: "Vectrex", year: 1982, price: 10000, desc: "Consola con monitor, 1 control" },
    { name: "Casio PV-1000", year: 1983, price: 5000, desc: "Consola rara, 1 mando" },
    { name: "Nintendo Famicom", year: 1983, price: 1800, desc: "Consola japonesa, 2 mandos" },
    { name: "Sega SG-1000", year: 1983, price: 3000, desc: "Consola, mando" },
    { name: "Tomy Tutor", year: 1983, price: 2500, desc: "Consola teclado" },
    { name: "Casio PV-2000", year: 1983, price: 3000, desc: "Consola teclado" },
    { name: "Nintendo NES", year: 1985, price: 1800, desc: "Consola, 1 control, cable AV" },
    { name: "Sega Mark III", year: 1985, price: 3500, desc: "Consola, 1 mando" },
    { name: "Sega Master System", year: 1985, price: 2500, desc: "Consola, 1 control" },
    { name: "Atari 7800", year: 1984, price: 2000, desc: "Consola, 1 Joystick" },
    { name: "Amstrad GX4000", year: 1990, price: 4500, desc: "Consola, 1 mando" },
    { name: "Atari Lynx", year: 1989, price: 3500, desc: "Portátil, cargador" },
    { name: "Game Boy Clásico", year: 1989, price: 1500, desc: "Portátil, pantalla sin líneas" },
    { name: "TurboGrafx-16 / PC Engine", year: 1987, price: 3000, desc: "Consola, 1 mando" },
    { name: "Sega Genesis / Mega Drive", year: 1988, price: 1500, desc: "Consola, 1 control 3 botones" },
    { name: "Neo Geo AES", year: 1990, price: 18000, desc: "Consola Premium, Mando Arcade" },
    { name: "Super Nintendo (SNES)", year: 1990, price: 2200, desc: "Consola, 1 control, cables" },
    { name: "Commodore CDTV", year: 1991, price: 8000, desc: "Reproductor interactivo" },
    { name: "Philips CD-i", year: 1991, price: 5000, desc: "Consola multimedia, mando" },
    { name: "Sega CD", year: 1991, price: 4500, desc: "Add-on de disco, cables" },
    { name: "Sega Pico", year: 1993, price: 1500, desc: "Consola educativa, lápiz" },
    { name: "3DO Interactive", year: 1993, price: 4000, desc: "Consola, 1 control" },
    { name: "Atari Jaguar", year: 1993, price: 6000, desc: "Consola, 1 control" },
    { name: "Amiga CD32", year: 1993, price: 7000, desc: "Consola 32 bits, mando" },
    { name: "FM Towns Marty", year: 1993, price: 15000, desc: "Consola japonesa rara" },
    { name: "Sega Saturn", year: 1994, price: 3500, desc: "Consola, 1 control" },
    { name: "Sony PlayStation (PS1)", year: 1994, price: 1200, desc: "Consola Fat, 1 control DualShock" },
    { name: "Neo Geo CD", year: 1994, price: 8000, desc: "Consola, 1 mando CD" },
    { name: "PC-FX", year: 1994, price: 6000, desc: "Consola japonesa, 1 mando" },
    { name: "Sega 32X", year: 1994, price: 3500, desc: "Add-on expansor, cables enlace" },
    { name: "Virtual Boy", year: 1995, price: 8000, desc: "Gafas 3D, Mando, Trípode" },
    { name: "Casio Loopy", year: 1995, price: 4000, desc: "Consola con impresora" },
    { name: "Nintendo 64", year: 1996, price: 2500, desc: "Consola, 1 control rígido" },
    { name: "Game.com", year: 1997, price: 2000, desc: "Portátil con stylus" },
    { name: "Game Boy Light", year: 1998, price: 3500, desc: "Portátil japonesa retroiluminada" },
    { name: "Sega Dreamcast", year: 1998, price: 3000, desc: "Consola, 1 control, VMU" },
    { name: "Game Boy Color", year: 1998, price: 1800, desc: "Portátil restaurada" },
    { name: "Neo Geo Pocket", year: 1998, price: 2500, desc: "Portátil monocromática" },
    { name: "WonderSwan", year: 1999, price: 2000, desc: "Portátil japonesa" },
    { name: "Neo Geo Pocket Color", year: 1999, price: 3000, desc: "Portátil a color" },
    { name: "PlayStation 2 (PS2)", year: 2000, price: 1500, desc: "Consola, 1 control, Memory Card" },
    { name: "Nintendo GameCube", year: 2001, price: 2800, desc: "Consola, 1 control, memoria" },
    { name: "Microsoft Xbox", year: 2001, price: 2000, desc: "Consola HDD, 1 mando" },
    { name: "Game Boy Advance", year: 2001, price: 1500, desc: "Portátil original" },
    { name: "Pokémon mini", year: 2001, price: 2500, desc: "Micro consola portátil" },
    { name: "Nokia N-Gage", year: 2003, price: 3000, desc: "Teléfono consola híbrido" },
    { name: "Game Boy Advance SP", year: 2003, price: 2000, desc: "Portátil iluminada, cargador" },
    { name: "Nintendo DS", year: 2004, price: 1000, desc: "Consola Fat, Stylus, Cargador" },
    { name: "PlayStation Portable (PSP)", year: 2004, price: 1500, desc: "Consola, Cargador, Batería nueva" },
    { name: "Game Boy Micro", year: 2005, price: 3500, desc: "Portátil metálica, cargador" },
    { name: "Gizmondo", year: 2005, price: 5000, desc: "Portátil rara, cargador" },
    { name: "Xbox 360", year: 2005, price: 1800, desc: "Consola Slim, 1 Mando Inalámbrico" },
    { name: "PlayStation 3 (PS3)", year: 2006, price: 2200, desc: "Consola, 1 Mando DualShock 3" },
    { name: "Nintendo Wii", year: 2006, price: 1200, desc: "Consola, Wiimote, Nunchuk, Barra" },
    { name: "Nintendo DSi", year: 2008, price: 1200, desc: "Portátil con cámara, cargador" },
    { name: "PSP Go", year: 2009, price: 2500, desc: "Portátil deslizable, cable" },
    { name: "Nintendo DSi XL", year: 2009, price: 1500, desc: "Portátil pantallas grandes" },
    { name: "Nintendo 3DS", year: 2011, price: 2200, desc: "Consola 3D, Stylus, Cargador" },
    { name: "PlayStation Vita", year: 2011, price: 3000, desc: "Consola OLED, Cargador" },
    { name: "Nintendo 3DS XL", year: 2012, price: 2800, desc: "Pantallas grandes, Stylus" },
    { name: "Wii U", year: 2012, price: 3500, desc: "Consola, GamePad con pantalla" },
    { name: "PlayStation TV", year: 2013, price: 2500, desc: "Microconsola Vita de sobremesa" },
    { name: "PlayStation 4", year: 2013, price: 3500, desc: "Consola Fat, 1 Control DualShock 4" },
    { name: "Xbox One", year: 2013, price: 2800, desc: "Consola Fat, 1 Mando, Fuente" },
    { name: "Nintendo 2DS", year: 2013, price: 1500, desc: "Consola plana, Cargador" },
    { name: "Ouya", year: 2013, price: 1200, desc: "Consola Android, 1 mando" },
    { name: "PS Vita Slim", year: 2013, price: 2800, desc: "Consola LCD, cable micro-USB" },
    { name: "New Nintendo 3DS", year: 2014, price: 3500, desc: "C-Stick integrado, cover plates" },
    { name: "New Nintendo 3DS XL", year: 2014, price: 4000, desc: "Pantallas grandes, 3D mejorado" },
    { name: "PlayStation 4 Slim", year: 2016, price: 4000, desc: "Consola Slim, 1 Mando DualShock 4" },
    { name: "PlayStation 4 Pro", year: 2016, price: 5000, desc: "Consola 4K, 1 Mando DualShock 4" },
    { name: "Xbox One S", year: 2016, price: 3500, desc: "Consola Slim 4K HDR, 1 Mando" },
    { name: "Nintendo Switch", year: 2017, price: 4500, desc: "Tableta, Joy-Cons, Dock, Cables" },
    { name: "Xbox One X", year: 2017, price: 4500, desc: "Consola 4K Nativa, 1 Mando" },
    { name: "Nintendo Switch Lite", year: 2019, price: 3000, desc: "Consola 100% Portátil, Cargador" },
    { name: "PlayStation 5", year: 2020, price: 8500, desc: "Consola Disco/Digital, 1 DualSense" },
    { name: "Xbox Series X", year: 2020, price: 8000, desc: "Consola 4K 120fps, 1 Mando" },
    { name: "Xbox Series S", year: 2020, price: 4500, desc: "Consola Digital, 1 Mando" },
    { name: "Nintendo Switch OLED", year: 2021, price: 6000, desc: "Pantalla OLED, Dock con LAN" },
    { name: "Steam Deck", year: 2022, price: 7000, desc: "PC Portátil, Estuche, Cargador" },
    { name: "ASUS ROG Ally", year: 2023, price: 9000, desc: "PC Windows 11 Portátil" },
    { name: "Lenovo Legion Go", year: 2023, price: 11000, desc: "Pantalla 8.8, mandos extraíbles" },
    { name: "Steam Deck OLED", year: 2023, price: 10000, desc: "Pantalla OLED, Estuche" },
    { name: "PlayStation 5 Slim", year: 2023, price: 9000, desc: "Consola rediseñada, 1 DualSense" },
    { name: "ASUS ROG Ally X", year: 2024, price: 15000, desc: "Batería mejorada, 24GB RAM" },
    { name: "PlayStation 5 Pro", year: 2024, price: 16000, desc: "Consola Alta Gama (Estimado)" },
    { name: "MSI Claw", year: 2024, price: 12000, desc: "PC Portátil Intel Core Ultra" },
    { name: "Nintendo Switch 2", year: 2025, price: 9500, desc: "Próxima generación (Estimado)" }
];

// INYECCIÓN DINÁMICA DEL CATÁLOGO DE 106 CONSOLAS
document.addEventListener('DOMContentLoaded', () => {
    const catalogoContainer = document.getElementById('catalogo-consolas');
    let htmlContent = '';

    consolasDB.forEach((consola, index) => {
        let btnId = `btn-c${index}`;
        // Generador de imagen con nombre exacto anti-enlaces-rotos
        let imgSrc = `https://placehold.co/600x400/1f2833/66fcf1?text=${encodeURIComponent(consola.name)}`;

        htmlContent += `
        <div class="card product-card">
            <img src="${imgSrc}" alt="${consola.name}" class="animated-console">
            <span class="badge-estado">Reacondicionada ${consola.year}</span>
            <h3>${consola.name}</h3>
            <details>
                <summary>¿Qué incluye?</summary>
                <ul>
                    <li>${consola.desc}</li>
                    <li>Limpieza técnica</li>
                    <li>Fotos a detalle por WhatsApp</li>
                </ul>
            </details>
            <span class="price">$${consola.price.toFixed(2)}</span>
            <div id="${btnId}">
                <button class="add-btn" onclick="changeQty('${btnId}', '${consola.name}', ${consola.price}, 1)">+ AGREGAR</button>
            </div>
        </div>`;
    });

    catalogoContainer.innerHTML = htmlContent;
});

// LÓGICA DE AGREGAR Y QUITAR CANTIDADES
function changeQty(containerId, productName, productPrice, delta) {
    let item = cart.find(i => i.name === productName);
    
    if (!item && delta > 0) {
        item = { name: productName, price: productPrice, quantity: 1 };
        cart.push(item);
        showToast("✅ ¡Agregado!", "var(--neon-cyan)");
    } else if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== productName);
            showToast("❌ Removido", "var(--neon-pink)");
            item = null;
        }
    }
    
    let container = document.getElementById(containerId);
    if (!item || item.quantity === 0) {
        container.innerHTML = `<button class="add-btn" onclick="changeQty('${containerId}', '${productName}', ${productPrice}, 1)">+ AGREGAR</button>`;
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

function updateCartUI() {
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.getElementById('total-price').innerText = total.toFixed(2);
    document.getElementById('items-count').innerText = totalItems + (totalItems === 1 ? " ARTÍCULO" : " ARTÍCULOS");
    
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

function openModal() {
    if (cart.length === 0) return;
    document.getElementById('checkout-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('checkout-modal').classList.remove('active');
}

function processOrder() {
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();

    if (!name || !phone) {
        showToast("⚠️ Llena todos los campos", "orange");
        return;
    }
    if (phone.length < 10) {
        showToast("⚠️ El teléfono debe tener 10 dígitos", "orange");
        return;
    }

    let currentFolio = localStorage.getItem('retrorevive_folio');
    if (!currentFolio) {
        currentFolio = 1;
    } else {
        currentFolio = parseInt(currentFolio) + 1;
    }

    localStorage.setItem('retrorevive_folio', currentFolio);
    let stringFolio = currentFolio.toString().padStart(5, '0');

    let message = "🕹️ *NUEVA SOLICITUD RETROREVIVE*\n";
    message += `*FOLIO: #${stringFolio}*\n`;
    message += "---------------------------\n";
    message += `👤 Cliente: ${name}\n`;
    message += `📱 Teléfono: ${phone}\n`;
    message += "---------------------------\n";
    
    cart.forEach(item => {
        message += `▪ ${item.quantity}x ${item.name} ($${item.price * item.quantity})\n`;
    });
    
    message += "---------------------------\n";
    message += `*TOTAL ESTIMADO: $${total.toFixed(2)}*\n\n`;
    message += "_RetroRevive Culiacán_";

    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
    
    closeModal();
    window.open(whatsappUrl, '_blank');
}
