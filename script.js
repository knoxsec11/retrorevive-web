let cart = JSON.parse(localStorage.getItem('retrorevive_cart')) || [];
let total = 0;
const BUSINESS_PHONE = "526675912648"; 
let viewHistory = ['consolas'];

// GENERADOR DE IMÁGENES VECTORIALES SEGURAS
function getConsoleSVG(name) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 180" width="100%" height="100%">
        <rect width="300" height="180" rx="12" fill="#11161d" stroke="#66fcf1" stroke-width="2"/>
        <path d="M 40 130 L 260 130 L 240 60 L 60 60 Z" fill="#1f2833" stroke="#ff007f" stroke-width="1.5"/>
        <circle cx="90" cy="95" r="12" fill="#66fcf1"/>
        <circle cx="210" cy="95" r="10" fill="#ff007f"/>
        <circle cx="230" cy="110" r="10" fill="#ff007f"/>
        <text x="150" y="40" font-family="'Press Start 2P', monospace" font-size="10" fill="#66fcf1" text-anchor="middle">${name.substring(0, 18)}</text>
        <text x="150" y="155" font-family="'VT323', monospace" font-size="16" fill="#45a29e" text-anchor="middle">RETRO REVIVE CONSOLE</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// CONSOLAS ORDENADAS (DE MÁS VIEJA A MÁS NUEVA PARA EL MUSEO DE CONSOLAS)
const consolasDB = [
    { name: "Magnavox Odyssey", year: 1972, price: 12000, inc: ["Consola Magnavox Odyssey", "2 Mandos integrados", "6 Cartuchos de circuitos", "Set de Overlays de pantalla"] },
    { name: "Home Pong", year: 1975, price: 3500, inc: ["Consola Home Pong Original", "Controladores integrados", "Cable RF para TV"] },
    { name: "Coleco Telstar", year: 1976, price: 2500, inc: ["Consola Coleco Telstar", "Paddles integrados", "Eliminador de corriente"] },
    { name: "Fairchild Channel F", year: 1976, price: 4000, inc: ["Consola Channel F", "2 Joysticks con rotación 8 direcciones", "Cable de video"] },
    { name: "RCA Studio II", year: 1977, price: 3000, inc: ["Consola RCA Studio II", "Teclados numéricos en carcasa", "Cable de antena"] },
    { name: "Atari 2600", year: 1977, price: 1500, inc: ["Consola Atari 2600 CX2600", "1 Joystick CX40", "1 Juego Combat", "Adaptador AC"] },
    { name: "Bally Astrocade", year: 1977, price: 5000, desc: "Consola, mando pistola", inc: ["Consola Bally Astrocade", "2 Mandos tipo pistola", "Teclado numérico"] },
    { name: "APF-MP1000", year: 1978, price: 3500, inc: ["Consola APF-MP1000", "2 Joysticks integrados", "Cartucho Rocket Patrol"] },
    { name: "Magnavox Odyssey²", year: 1978, price: 2500, inc: ["Consola Odyssey²", "Teclado membrana", "2 Joysticks", "Juego K.C. Munchkin!"] },
    { name: "Philips Odyssey 2000", year: 1977, price: 3000, inc: ["Consola Odyssey 2000", "Mandos giratorios", "Caja de conexión RF"] },
    { name: "Intellivision", year: 1979, price: 2000, inc: ["Consola Intellivision Master Component", "2 Mandos pad con disco", "Cables de señal"] },
    { name: "Milton Bradley Microvision", year: 1979, price: 3500, inc: ["Portátil Microvision", "Cartucho Blockbuster", "Batería 9V instalada"] },
    { name: "Game & Watch", year: 1980, price: 2500, inc: ["Consola Portátil Game & Watch", "Baterías LR44 nuevas", "Tapa de batería original"] },
    { name: "Epoch Cassette Vision", year: 1981, price: 4000, inc: ["Consola Epoch Cassette Vision", "Mandos integrados", "Fuente de alimentación"] },
    { name: "VTech CreatiVision", year: 1981, price: 3000, inc: ["Consola/Computadora CreatiVision", "2 Joysticks/Teclado", "Cable de TV"] },
    { name: "Emerson Arcadia 2001", year: 1982, price: 2500, inc: ["Consola Arcadia 2001", "2 Mandos Intellivision-style", "Eliminador 12V"] },
    { name: "Atari 5200", year: 1982, price: 3000, inc: ["Consola Atari 5200 4-Port", "1 Mando analógico", "Caja automática TV/Game"] },
    { name: "ColecoVision", year: 1982, price: 2500, inc: ["Consola ColecoVision", "1 Controller con keypad", "Juego Donkey Kong", "Fuente original"] },
    { name: "Vectrex", year: 1982, price: 10000, inc: ["Consola Vectrex con Monitor Vectorial", "1 Control análogo", "Overlay de pantalla MineStorm"] },
    { name: "Casio PV-1000", year: 1983, price: 5000, inc: ["Consola Casio PV-1000", "1 Mando Joystick", "Cables de video"] },
    { name: "Famicom", year: 1983, price: 1800, inc: ["Consola Nintendo Famicom Japonesa", "2 Controles integrados (Control 2 con micrófono)", "Cable AV Mod"] },
    { name: "Sega SG-1000", year: 1983, price: 3000, inc: ["Consola Sega SG-1000", "1 Joystick SJ-200", "Cable de video"] },
    { name: "Tomy Tutor", year: 1983, price: 2500, inc: ["Consola Tomy Tutor", "Teclado mecánico", "Cable RF y Eliminador"] },
    { name: "Casio PV-2000", year: 1983, price: 3000, inc: ["Consola Casio PV-2000", "Teclado de hule", "1 Gamepad"] },
    { name: "Nintendo NES", year: 1985, price: 1800, inc: ["Consola NES Front Loader", "2 Controles rectangulares", "Cable AV", "Juego Super Mario Bros"] },
    { name: "Sega Mark III", year: 1985, price: 3500, inc: ["Consola Sega Mark III", "1 Pad de control", "Cables de conexión"] },
    { name: "Sega Master System", year: 1985, price: 2500, inc: ["Consola Master System", "1 Control Pad", "Pistola Light Phaser", "Cable AV"] },
    { name: "Atari 7800", year: 1984, price: 2000, inc: ["Consola Atari 7800 ProSystem", "1 Pro-Line Joystick", "Juego Pole Position II"] },
    { name: "Amstrad GX4000", year: 1990, price: 4500, inc: ["Consola Amstrad GX4000", "1 Control Pad", "Cartucho Burnin' Rubber"] },
    { name: "Atari Lynx", year: 1989, price: 3500, inc: ["Portátil Atari Lynx I", "Pantalla a color renovada", "Cargador de pared"] },
    { name: "Game Boy", year: 1989, price: 1500, inc: ["Consola Game Boy DMG-01", "Pantalla sin líneas de píxeles", "Tapa de pilas"] },
    { name: "TurboGrafx-16 / PC Engine", year: 1987, price: 3000, inc: ["Consola TurboGrafx-16", "1 TurboPad", "HuCard Keith Courage"] },
    { name: "Sega Genesis", year: 1988, price: 1500, inc: ["Consola Sega Genesis Model 1", "1 Control de 3 botones", "Cable AV", "Sonic The Hedgehog"] },
    { name: "Neo Geo AES", year: 1990, price: 18000, inc: ["Consola Neo Geo AES", "1 Arcade Stick Pro", "Cable AV estéreo", "Fuente de poder"] },
    { name: "Super Nintendo (SNES)", year: 1990, price: 2200, inc: ["Consola SNES", "2 Controles originales", "Cable AV", "Super Mario World"] },
    { name: "Commodore CDTV", year: 1991, price: 8000, inc: ["Consola CDTV", "Mando a distancia infrarrojo", "Teclado y ratón"] },
    { name: "Philips CD-i", year: 1991, price: 5000, inc: ["Consola Philips CD-i 220", "Control remoto interactivo", "DV Cartridge instalado"] },
    { name: "Sega CD", year: 1991, price: 4500, inc: ["Sega CD Model 2", "Placa de montaje a Genesis", "Cable de extensión de audio", "Juego Sol-Feace"] },
    { name: "Sega Pico", year: 1993, price: 1500, inc: ["Consola Sega Pico", "Lápiz óptico Magic Pen", "Storyware de prueba"] },
    { name: "3DO Interactive Multiplayer", year: 1993, price: 4000, inc: ["Consola Panasonic 3DO FZ-1", "1 Control original", "Cable AV"] },
    { name: "Atari Jaguar", year: 1993, price: 6000, inc: ["Consola Atari Jaguar 64-Bit", "1 Control con Keypad", "Juego Cybermorph"] },
    { name: "Amiga CD32", year: 1993, price: 7000, inc: ["Consola Amiga CD32", "1 Mando gamepad", "Cable de alimentación"] },
    { name: "FM Towns Marty", year: 1993, price: 15000, inc: ["Consola FM Towns Marty 32-bit", "1 Control Pad", "Disquetera 3.5 limpia"] },
    { name: "Sega Saturn", year: 1994, price: 3500, inc: ["Consola Sega Saturn Model 2", "1 Control ergonómico", "Cable AV", "Batería CR2032 nueva"] },
    { name: "PlayStation (PS1)", year: 1994, price: 1200, inc: ["Consola PS1 Gray Fat", "1 Control DualShock 1", "Memory Card 1MB", "Cable AV/Corriente"] },
    { name: "Neo Geo CD", year: 1994, price: 8000, inc: ["Consola Neo Geo CD Top-Loader", "1 Pad de control Neo Geo", "Cable RCA"] },
    { name: "PC-FX", year: 1994, price: 6000, inc: ["Consola NEC PC-FX", "1 FX-PAD", "Cable AV de 3 colores"] },
    { name: "Sega 32X", year: 1994, price: 3500, inc: ["Módulo Sega 32X", "Cable pasante a Genesis 1 y 2", "Espaciador de plástico", "Fuente propia"] },
    { name: "Virtual Boy", year: 1995, price: 8000, inc: ["Consola Virtual Boy", "Visor con goma limpia", "Trípode base", "Control con porta-pilas"] },
    { name: "Casio Loopy", year: 1995, price: 4000, inc: ["Consola Casio Loopy", "1 Mando original", "Cartucho de pegatinas de prueba"] },
    { name: "Nintendo 64", year: 1996, price: 2500, inc: ["Consola Nintendo 64 Charcoal", "1 Control con Joystick firme", "Jumper Pak", "Cable AV"] },
    { name: "Game.com", year: 1997, price: 2000, inc: ["Portátil Tiger Game.com", "Stylus táctil", "Juego Lights Out"] },
    { name: "Game Boy Light", year: 1998, price: 3500, inc: ["Consola Game Boy Light Japonesa", "Pantalla electroluminiscente limpia", "Tapa de pilas"] },
    { name: "Sega Dreamcast", year: 1998, price: 3000, inc: ["Consola Dreamcast White", "1 Control con pantalla VMU", "Cable AV", "Pila interna reemplazada"] },
    { name: "Game Boy Color", year: 1998, price: 1800, inc: ["Game Boy Color", "Carcasa limpia", "Altavoz reemplazado", "Tapa de baterías"] },
    { name: "Neo Geo Pocket", year: 1998, price: 2500, inc: ["Portátil Neo Geo Pocket Monocroma", "Stick con microswitches", "Batería de respaldo CR2032"] },
    { name: "WonderSwan", year: 1999, price: 2000, inc: ["Portátil Bandai WonderSwan", "Tapa de pilas", "Pantalla probada"] },
    { name: "Neo Geo Pocket Color", year: 1999, price: 3000, inc: ["Neo Geo Pocket Color", "Pantalla limpia", "Tapa de pilas original"] },
    { name: "PlayStation 2 (PS2)", year: 2000, price: 1500, inc: ["Consola PS2 Slim", "1 Control DualShock 2", "Memory Card 8MB", "Cable AV"] },
    { name: "Nintendo GameCube", year: 2001, price: 2800, inc: ["Consola GameCube Indigo/Negra", "1 Control original", "Memory Card 59", "Fuente de poder"] },
    { name: "Microsoft Xbox", year: 2001, price: 2000, inc: ["Consola Xbox Clásica HDD 80GB", "1 Control Controller S", "Capacitores de reloj removidos", "Cable AV"] },
    { name: "Game Boy Advance", year: 2001, price: 1500, inc: ["Consola Game Boy Advance", "Tapa de baterías", "Pantalla sin rayones"] },
    { name: "Pokémon mini", year: 2001, price: 2500, inc: ["Consola Pokémon mini", "1 Cartucho Pokémon Party Mini", "Batería AAA"] },
    { name: "Nokia N-Gage", year: 2003, price: 3000, inc: ["Teléfono-Consola N-Gage", "Batería BL-5C nueva", "Cargador de clavija"] },
    { name: "Game Boy Advance SP", year: 2003, price: 2000, inc: ["Consola GBA SP AGS-001", "Batería de litio nueva", "Cargador de pared"] },
    { name: "Nintendo DS", year: 2004, price: 1000, inc: ["Consola Nintendo DS Fat", "Stylus original", "Cargador", "Bisagra en excelente estado"] },
    { name: "PSP", year: 2004, price: 1500, inc: ["Consola Sony PSP-1000/2000", "Batería nueva 1200mAh", "Cargador de pared", "Memory Stick 8GB"] },
    { name: "Game Boy Micro", year: 2005, price: 3500, inc: ["Consola Game Boy Micro", "Carátula frontal limpia", "Cargador USB dedicado"] },
    { name: "Gizmondo", year: 2005, price: 5000, inc: ["Consola Gizmondo", "Batería funcional", "Cargador y funda"] },
    { name: "Xbox 360", year: 2005, price: 1800, inc: ["Consola Xbox 360 Slim", "1 Control inalámbrico", "Disco Duro 250GB", "Fuente de poder"] },
    { name: "PlayStation 3 (PS3)", year: 2006, price: 2200, inc: ["Consola PS3 Slim", "1 Control DualShock 3", "Cable de carga USB", "Cable HDMI"] },
    { name: "Nintendo Wii", year: 2006, price: 1200, inc: ["Consola Wii Retrocompatible con GameCube", "1 Wiimote con MotionPlus", "1 Nunchuk", "Barra de sensores"] },
    { name: "Nintendo DSi", year: 2008, price: 1200, inc: ["Consola Nintendo DSi", "Stylus", "Cargador", "Cámaras probadas"] },
    { name: "PSP Go", year: 2009, price: 2500, inc: ["Consola PSP Go Deslizable", "16GB Memoria interna", "Cable de datos y carga"] },
    { name: "Nintendo DSi XL", year: 2009, price: 1500, inc: ["Consola DSi XL", "Stylus grande estilo pluma", "Cargador de pared"] },
    { name: "Nintendo 3DS", year: 2011, price: 2200, inc: ["Consola Nintendo 3DS", "Stylus extensible", "Base de carga Cradle", "Cargador"] },
    { name: "PlayStation Vita", year: 2011, price: 3000, inc: ["Consola PS Vita PCH-1000 OLED", "Cable de carga propietario", "Memoria Sony 8GB"] },
    { name: "Nintendo 3DS XL", year: 2012, price: 2800, inc: ["Consola 3DS XL", "Stylus", "Tarjeta SD 4GB", "Cargador"] },
    { name: "Wii U", year: 2012, price: 3500, inc: ["Consola Wii U Deluxe 32GB", "Wii U GamePad con pantalla táctil", "Base cargadora GamePad", "Cables HDMI y corriente"] },
    { name: "PlayStation TV", year: 2013, price: 2500, inc: ["Microconsola PS TV", "1 Control DualShock 3", "Cable HDMI", "Eliminador de corriente"] },
    { name: "PlayStation 4", year: 2013, price: 3500, inc: ["Consola PS4 Fat 500GB", "1 Control DualShock 4", "Cable HDMI y de alimentación"] },
    { name: "Xbox One", year: 2013, price: 2800, inc: ["Consola Xbox One Fat 500GB", "1 Control Inalámbrico Xbox", "Fuente de poder externa"] },
    { name: "Nintendo 2DS", year: 2013, price: 1500, inc: ["Consola 2DS Estructura Fija", "Stylus", "Cargador original", "Tarjeta SD"] },
    { name: "Ouya", year: 2013, price: 1200, inc: ["Microconsola Ouya", "1 Control de aluminio", "Cable HDMI", "Eliminador"] },
    { name: "PS Vita Slim", year: 2013, price: 2800, inc: ["Consola PS Vita PCH-2000 Slim", "1GB Memoria interna", "Cargador Micro-USB"] },
    { name: "New Nintendo 3DS", year: 2014, price: 3500, inc: ["Consola New 3DS con C-Stick", "Cover Plates reemplazables", "Stylus", "Cargador"] },
    { name: "New Nintendo 3DS XL", year: 2014, price: 4000, inc: ["Consola New 3DS XL", "3D súper estable", "Stylus", "MicroSD 16GB", "Cargador"] },
    { name: "PlayStation 4 Slim", year: 2016, price: 4000, inc: ["Consola PS4 Slim 1TB", "1 Control DualShock 4 V2", "Cable HDMI y Corriente"] },
    { name: "PlayStation 4 Pro", year: 2016, price: 5000, inc: ["Consola PS4 Pro 1TB 4K", "1 Control DualShock 4 V2", "Cable HDMI de alta velocidad"] },
    { name: "Xbox One S", year: 2016, price: 3500, inc: ["Consola Xbox One S 1TB con lector 4K Blu-ray", "1 Control Xbox con Bluetooth", "Cable de corriente"] },
    { name: "Nintendo Switch", year: 2017, price: 4500, inc: ["Consola Nintendo Switch V2", "Joy-Con Izquierdo y Derecho", "Dock de TV", "Grip y Correas", "Cargador Type-C"] },
    { name: "Xbox One X", year: 2017, price: 4500, inc: ["Consola Xbox One X 1TB 4K Nativo", "1 Control Xbox One", "Cable HDMI 2.0"] },
    { name: "Nintendo Switch Lite", year: 2019, price: 3000, inc: ["Consola Nintendo Switch Lite", "Cargador original Nintendo Type-C", "Mica protectora instalada"] },
    { name: "PlayStation 5", year: 2020, price: 8500, inc: ["Consola PlayStation 5 Edición Disco/Digital", "1 Control Inalámbrico DualSense", "Base vertical/horizontal", "Cable HDMI 2.1"] },
    { name: "Xbox Series X", year: 2020, price: 8000, desc: "Consola 4K 120fps, 1 Mando", inc: ["Consola Xbox Series X 1TB NVMe", "1 Control Xbox Series Robot White/Carbon Black", "Cable Ultra High Speed HDMI"] },
    { name: "Xbox Series S", year: 2020, price: 4500, inc: ["Consola Xbox Series S 512GB Digital", "1 Control Xbox Series", "Cable HDMI 2.0 y corriente"] },
    { name: "Nintendo Switch OLED", year: 2021, price: 6000, inc: ["Consola Switch Pantalla OLED 7 pulgadas", "Joy-Cons White/Neon", "Dock con puerto LAN integrado", "Cargador Type-C"] },
    { name: "Steam Deck", year: 2022, price: 7000, inc: ["Consola PC Steam Deck LCD 256GB/512GB", "Funda de transporte original Valve", "Cargador 45W USB-C"] },
    { name: "ASUS ROG Ally", year: 2023, price: 9000, inc: ["Consola ASUS ROG Ally Z1 Extreme", "Cargador ROG 65W", "Soporte de escritorio"] },
    { name: "Lenovo Legion Go", year: 2023, price: 11000, inc: ["Consola Lenovo Legion Go Pantalla 8.8 144Hz", "Mandos Legion TrueStrike desmontables", "Estuche rígido original"] },
    { name: "Steam Deck OLED", year: 2023, price: 10000, inc: ["Consola Steam Deck Pantalla OLED 90Hz", "Estuche con forro extraíble", "Cargador USB-C de cable largo"] },
    { name: "PlayStation 5 Slim", year: 2023, price: 9000, inc: ["Consola PS5 Slim 1TB SSD", "1 Control DualSense", "2 Pies de soporte horizontal", "Cable HDMI 2.1"] },
    { name: "ASUS ROG Ally X", year: 2024, price: 15000, inc: ["Consola ASUS ROG Ally X 24GB RAM 80Wh", "Cargador de carga rápida 65W", "Caja original y accesorios"] },
    { name: "PlayStation 5 Pro", year: 2024, price: 16000, inc: ["Consola PS5 Pro con PSSR 2TB SSD", "1 Control DualSense", "Cables de alta velocidad"] },
    { name: "MSI Claw", year: 2024, price: 12000, inc: ["Consola MSI Claw A1M Intel Core Ultra", "Cargador rápido MSI Type-C"] },
    { name: "Nintendo Switch 2", year: 2025, price: 9500, inc: ["Consola Próxima Generación Nintendo Switch 2", "Joy-Cons Magnéticos", "Dock TV 4K", "Cargador Type-C"] }
];

// TOP 15 JUEGOS MÁS FAMOSOS GENERADOS DINÁMICAMENTE SEGÚN LA CONSOLA
function getTop15Games(consoleName) {
    const basePrices = [300, 450, 500, 600, 350, 400, 700, 800, 250, 900, 550, 650, 1000, 1200, 380];
    const gamesMap = {
        "Nintendo Switch": ["The Legend of Zelda: Breath of the Wild", "Super Mario Odyssey", "Mario Kart 8 Deluxe", "Super Smash Bros. Ultimate", "Animal Crossing: New Horizons", "Pokémon Legends: Arceus", "Metroid Dread", "Splatoon 3", "Xenoblade Chronicles 3", "Fire Emblem: Three Houses", "Luigi's Mansion 3", "Super Mario Bros. Wonder", "Monster Hunter Rise", "Persona 5 Royal", "Hollow Knight"],
        "PlayStation 4": ["God of War", "The Last of Us Part II", "Spider-Man", "Red Dead Redemption 2", "Bloodborne", "Uncharted 4: A Thief's End", "Horizon Zero Dawn", "Persona 5", "The Witcher 3: Wild Hunt", "Ghost of Tsushima", "Grand Theft Auto V", "Final Fantasy VII Remake", "God of War Ragnarök", "Sekiro: Shadows Die Twice", "Resident Evil 2 Remake"],
        "Nintendo 64": ["Super Mario 64", "The Legend of Zelda: Ocarina of Time", "GoldenEye 007", "The Legend of Zelda: Majora's Mask", "Mario Kart 64", "Super Smash Bros.", "Banjo-Kazooie", "Paper Mario", "Star Fox 64", "Donkey Kong 64", "Perfect Dark", "Diddy Kong Racing", "Pokemon Snap", "Conker's Bad Fur Day", "Wave Race 64"],
        "Super Nintendo (SNES)": ["Super Mario World", "The Legend of Zelda: A Link to the Past", "Super Metroid", "Chrono Trigger", "Donkey Kong Country", "Street Fighter II", "Final Fantasy VI", "Super Mario Kart", "EarthBound", "Secret of Mana", "Mega Man X", "Super Mario RPG", "Yoshi's Island", "Castlevania IV", "Star Fox"],
        "Nintendo NES": ["Super Mario Bros.", "Super Mario Bros. 3", "The Legend of Zelda", "Metroid", "Mega Man 2", "Castlevania", "Contra", "DuckTales", "Mike Tyson's Punch-Out!!", "Final Fantasy", "Zelda II: The Adventure of Link", "Excitebike", "Double Dragon", "Kid Icarus", "Tetris"]
    };

    let titleList = gamesMap[consoleName];
    if (!titleList) {
        titleList = [
            `${consoleName} Greatest Hits Vol. 1`, `${consoleName} Adventure Quest`, `${consoleName} Racing Championship`,
            `${consoleName} Combat Zone`, `${consoleName} RPG Chronicles`, `${consoleName} Arcade Classics`,
            `${consoleName} Extreme Sports`, `${consoleName} Mystery Legends`, `${consoleName} Super Heroes`,
            `${consoleName} Galactic Warfare`, `${consoleName} Final Showdown`, `${consoleName} Tactics Master`,
            `${consoleName} World Cup`, `${consoleName} Retro Remix`, `${consoleName} Ultimate Collection`
        ];
    }

    return titleList.map((title, i) => ({
        name: `${title} (${consoleName})`,
        price: basePrices[i % basePrices.length]
    }));
}

// CARGAR CONSOLAS
document.addEventListener('DOMContentLoaded', () => {
    renderConsolas();
    renderJuegosConsolas();
    updateCartUI();
});

function renderConsolas() {
    const container = document.getElementById('catalogo-consolas');
    let html = '';
    consolasDB.forEach((c, idx) => {
        let btnId = `btn-con-${idx}`;
        let svgImg = getConsoleSVG(c.name);
        let incItems = c.inc.map(item => `<li>${item}</li>`).join('');

        html += `
        <div class="card">
            <img src="${svgImg}" alt="${c.name}" class="animated-console">
            <span class="badge-estado">Año ${c.year}</span>
            <h3>${c.name}</h3>
            <details>
                <summary>¿Qué incluye?</summary>
                <ul>${incItems}</ul>
            </details>
            <span class="price">$${c.price.toFixed(2)}</span>
            <div id="${btnId}">
                <button class="add-btn" onclick="changeQty('${btnId}', '${c.name}', ${c.price}, 1)">+ AGREGAR</button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

// CARGAR CATÁLOGO DE VIDEOJUEGOS (DE MÁS NUEVA A MÁS VIEJA)
function renderJuegosConsolas() {
    const container = document.getElementById('catalogo-juegos-consolas');
    // Ordenar copia de base de datos de más nueva a más vieja
    let sorted = [...consolasDB].sort((a, b) => b.year - a.year);
    let html = '';

    sorted.forEach((c, idx) => {
        let svgImg = getConsoleSVG(c.name);
        html += `
        <div class="card" style="cursor:pointer;" onclick="openTopJuegos('${c.name.replace(/'/g, "\\'")}')">
            <img src="${svgImg}" alt="${c.name}" class="animated-console">
            <span class="badge-estado">${c.year}</span>
            <h3>${c.name}</h3>
            <p style="color: var(--neon-teal); font-size: 1rem;">Ver los 15 juegos más famosos →</p>
        </div>`;
    });
    container.innerHTML = html;
}

function openTopJuegos(consoleName) {
    document.getElementById('juegos-consolas-list').style.display = 'none';
    document.getElementById('juegos-detalles-view').style.display = 'block';
    document.getElementById('juegos-consola-titulo').innerText = `TOP 15 JUEGOS: ${consoleName.toUpperCase()}`;
    
    document.getElementById('back-bar').style.display = 'block';
    viewHistory.push('juegos-detalle');

    const listContainer = document.getElementById('lista-top-juegos');
    const games = getTop15Games(consoleName);
    let html = '';

    games.forEach((g, idx) => {
        let btnId = `btn-gme-${idx}`;
        let svgImg = getConsoleSVG(g.name);
        html += `
        <div class="card">
            <img src="${svgImg}" alt="${g.name}" class="animated-console">
            <h3>${g.name}</h3>
            <span class="price">$${g.price.toFixed(2)}</span>
            <div id="${btnId}">
                <button class="add-btn" onclick="changeQty('${btnId}', '${g.name.replace(/'/g, "\\'")}', ${g.price}, 1)">+ AGREGAR</button>
            </div>
        </div>`;
    });
    listContainer.innerHTML = html;
}

// NAVEGACIÓN Y HISTORIAL
function showSection(sectionName) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${sectionName}`).classList.add('active');

    document.getElementById('view-consolas').className = 'hidden-view';
    document.getElementById('view-juegos').className = 'hidden-view';
    document.getElementById('view-servicios').className = 'hidden-view';

    document.getElementById(`view-${sectionName}`).className = 'active-view';

    if (sectionName === 'juegos') {
        document.getElementById('juegos-consolas-list').style.display = 'block';
        document.getElementById('juegos-detalles-view').style.display = 'none';
    }

    document.getElementById('back-bar').style.display = 'none';
    viewHistory = [sectionName];
}

function goBack() {
    if (viewHistory.length > 1) {
        viewHistory.pop();
        let lastView = viewHistory[viewHistory.length - 1];
        if (lastView === 'juegos') {
            document.getElementById('juegos-consolas-list').style.display = 'block';
            document.getElementById('juegos-detalles-view').style.display = 'none';
            document.getElementById('back-bar').style.display = 'none';
        }
    } else {
        showSection('consolas');
    }
}

function goHome() {
    showSection('consolas');
}

// CARRITO DE COMPRAS Y PERSISTENCIA
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
    if (container) {
        if (!item || item.quantity === 0) {
            container.innerHTML = `<button class="add-btn" onclick="changeQty('${containerId}', '${productName.replace(/'/g, "\\'")}', ${productPrice}, 1)">+ AGREGAR</button>`;
        } else {
            container.innerHTML = `
                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQty('${containerId}', '${productName.replace(/'/g, "\\'")}', ${productPrice}, -1)">-</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQty('${containerId}', '${productName.replace(/'/g, "\\'")}', ${productPrice}, 1)">+</button>
                </div>
            `;
        }
    }
    
    localStorage.setItem('retrorevive_cart', JSON.stringify(cart));
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

    let currentFolio = localStorage.getItem('retrorevive_folio') || 0;
    currentFolio = parseInt(currentFolio) + 1;
    localStorage.setItem('retrorevive_folio', currentFolio);
    let stringFolio = currentFolio.toString().padStart(5, '0');

    let message = "🕹️ *SOLICITUD DE COTIZACIÓN RETROREVIVE*\n";
    message += `*FOLIO: #${stringFolio}*\n`;
    message += "---------------------------\n";
    message += `👤 Cliente: ${name}\n`;
    message += `📱 Teléfono: ${phone}\n`;
    message += "---------------------------\n";
    
    cart.forEach(item => {
        message += `▪ ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    
    message += "---------------------------\n";
    message += `*TOTAL ESTIMADO: $${total.toFixed(2)}*\n\n`;
    message += "_RetroRevive Culiacán_";

    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
    
    closeModal();
    window.open(whatsappUrl, '_blank');
}
