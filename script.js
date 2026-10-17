let cart = JSON.parse(localStorage.getItem('retrorevive_cart')) || [];
let total = 0;
const BUSINESS_PHONE = "526675912648"; 
let viewHistory = ['consolas'];
let isAscending = true; 
let searchQuery = "";
let currentBrandFilter = "todas"; 

// 1. 120 FRASES ÉPICAS EN ESPAÑOL
const slogans = [
    "«Un hombre elige, un esclavo obedece.» - Andrew Ryan (BioShock)",
    "«La guerra... la guerra nunca cambia.» - Narrador (Fallout)",
    "«Nada es verdad, todo está permitido.» - Ezio Auditore (Assassin's Creed)",
    "«Es peligroso ir solo. Toma esto.» - Anciano (The Legend of Zelda)",
    "«¿Qué es un hombre? ¡Una miserable pequeña pila de secretos!» - Drácula (Castlevania: SotN)",
    "«Despiértame cuando me necesites.» - Jefe Maestro (Halo 3)",
    "«El tiempo pasa, la gente se mueve. Como la corriente de un río.» - Princesa Zelda (Ocarina of Time)",
    "«La esperanza es lo que nos hace fuertes.» - Aloy (Horizon Zero Dawn)",
    "«No podemos cambiar lo que hemos hecho, solo lo que haremos.» - Arthur Morgan (Red Dead Redemption 2)",
    "«Mantente alerta, confía en nadie y mantén tu arma a mano.» - Geralt de Rivia (The Witcher 3)",
    "«Las decisiones tienen consecuencias.» - Comandante Shepard (Mass Effect)",
    "«Sombra y luz son las dos caras de la misma moneda.» - Princesa Zelda (Twilight Princess)",
    "«Un héroe no necesita hablar, sus actos lo dicen todo.» - Maestro del Gremio (Fable)",
    "«A veces debes hacer lo correcto, aunque duela.» - Peter Parker (Marvel's Spider-Man)",
    "«La muerte no es el final, sino una transición.» - Portador de la Maldición (Dark Souls II)",
    "«Aquellos que no conocen la historia están condenados a repetirla.» - Capitán Price (Call of Duty)",
    "«En la oscuridad, el miedo es tu mayor enemigo.» - Solid Snake (Metal Gear Solid)",
    "«No soy un héroe. Nunca lo fui. Nunca lo seré.» - Solid Snake (Metal Gear Solid 4)",
    "«La venganza es un juego de tontos.» - Arthur Morgan (Red Dead Redemption 2)",
    "«No tengo honor, pero no perderé a mi familia.» - Jin Sakai (Ghost of Tsushima)",
    "«No te pido perdón. Solo que me entiendas.» - The Boss (Metal Gear Solid 3)",
    "«Un dios no siente dolor. Un dios no siente piedad.» - Kratos (God of War)",
    "«El ciclo termina aquí. Debemos ser mejores que esto.» - Kratos (God of War)",
    "«El cazador debe cazar.» - Eileen el Cuervo (Bloodborne)",
    "«Levántate, Sinluz.» - Melina (Elden Ring)",
    "«La vacilación es la derrota.» - Isshin Ashina (Sekiro: Shadows Die Twice)",
    "«Nadie es intocable.» - Agente 47 (Hitman)",
    "«Los héroes nunca mueren.» - Mercy (Overwatch)",
    "«¿Qué es mejor? ¿Nacer bueno o superar tu naturaleza malvada?» - Paarthurnax (Skyrim)",
    "«Snake? Snake?! SNAAAAAAKE!» - Coronel Campbell (Metal Gear Solid)",
    "«Detrás de ti, imbécil.» - Ganado (Resident Evil 4)",
    "«¡Do a barrel roll!» - Peppy Hare (Star Fox 64)",
    "«Fatality.» - Shao Kahn (Mortal Kombat)",
    "«It's super effective!» - Sistema (Pokémon)",
    "«Desearía tener más tiempo...» - Arthur Morgan (Red Dead Redemption 2)",
    "«Tengo un plan, Arthur.» - Dutch van der Linde (Red Dead Redemption 2)",
    "«¿Quieres pasar un mal rato?» - Sans (Undertale)",
    "«Mantente determinado.» - Frisk (Undertale)",
    "«Un hombre de verdad no odia, ama.» - Kratos (God of War Ragnarök)",
    "«El final no es más que un nuevo comienzo.» - Amaterasu (Okami)",
    "«Acepta tu destino.» - Ifrit (Final Fantasy)",
    "«La vida es cruel. Por eso la vida es hermosa.» - Oghren (Dragon Age: Origins)",
    "«El acero gana las batallas, el oro gana las guerras.» - Davion (Dota 2)",
    "«Eres un esclavo de la historia.» - Andrew Ryan (BioShock)",
    "«¡Protesto!» - Phoenix Wright (Ace Attorney)",
    "«Requiescat in pace.» - Ezio Auditore (Assassin's Creed)"
];

function setRandomSlogan() {
    const text = slogans[Math.floor(Math.random() * slogans.length)];
    document.getElementById('dynamic-slogan').innerText = text;
}

// 2. BASE DE DATOS DE CONSOLAS COMPLETAS (IDs desde 10001)
const consolasDB = [
    { id: 10001, name: "Magnavox Odyssey", year: 1972, price: 12000, inc: ["Consola Magnavox", "2 Mandos integrados", "Cable RF", "Baterías", "Overlays"] },
    { id: 10002, name: "Home Pong", year: 1975, price: 3500, inc: ["Consola Home Pong", "Cable RF", "Eliminador AC"] },
    { id: 10003, name: "Coleco Telstar", year: 1976, price: 2500, inc: ["Consola Coleco Telstar", "Cable RF coaxial", "Eliminador de pared"] },
    { id: 10004, name: "Fairchild Channel F", year: 1976, price: 4000, inc: ["Consola Channel F", "2 Joysticks", "Cable de antena", "Fuente"] },
    { id: 10005, name: "RCA Studio II", year: 1977, price: 3000, inc: ["Consola RCA", "Cable RF", "Adaptador AC"] },
    { id: 10006, name: "Atari 2600", year: 1977, price: 1500, inc: ["Consola Atari CX2600", "1 Joystick CX40", "Cable RF", "Eliminador 9V"] },
    { id: 10007, name: "Bally Astrocade", year: 1977, price: 5000, inc: ["Consola Bally", "Mando pistola", "Cable de video", "Fuente"] },
    { id: 10008, name: "APF-MP1000", year: 1978, price: 3500, inc: ["Consola APF", "2 Joysticks", "Cable de video", "Eliminador AC"] },
    { id: 10009, name: "Magnavox Odyssey²", year: 1978, price: 2500, inc: ["Consola Odyssey²", "2 Joysticks y Teclado", "Cable RF", "Fuente de poder"] },
    { id: 10010, name: "Philips Odyssey 2000", year: 1977, price: 3000, inc: ["Consola Philips", "Mandos giratorios", "Cable y eliminador"] },
    { id: 10011, name: "Intellivision", year: 1979, price: 2000, inc: ["Consola Intellivision", "Mandos con disco", "Cable de antena", "Corriente"] },
    { id: 10012, name: "Microvision", year: 1979, price: 3500, inc: ["Portátil Microvision", "Batería instalada", "Cartucho Blockbuster"] },
    { id: 10013, name: "Game & Watch", year: 1980, price: 2500, inc: ["Consola G&W", "Baterías LR44", "Tapa"] },
    { id: 10014, name: "Epoch Cassette Vision", year: 1981, price: 4000, inc: ["Consola Epoch", "Cable de video", "Adaptador AC"] },
    { id: 10015, name: "VTech CreatiVision", year: 1981, price: 3000, inc: ["Consola VTech", "Cable RF", "Fuente"] },
    { id: 10016, name: "Emerson Arcadia 2001", year: 1982, price: 2500, inc: ["Consola Emerson", "2 Mandos", "Cable de antena", "Eliminador 12V"] },
    { id: 10017, name: "Atari 5200", year: 1982, price: 3000, inc: ["Consola Atari 5200", "1 Mando analógico", "Caja Switch TV", "Fuente"] },
    { id: 10018, name: "ColecoVision", year: 1982, price: 2500, inc: ["Consola ColecoVision", "1 Mando arcade", "Cable RF", "Fuente original"] },
    { id: 10019, name: "Vectrex", year: 1982, price: 10000, inc: ["Consola Vectrex", "1 Control análogo", "Cable de corriente"] },
    { id: 10020, name: "Casio PV-1000", year: 1983, price: 5000, inc: ["Consola Casio", "1 Mando", "Cable de video", "Eliminador AC"] },
    { id: 10021, name: "Nintendo Famicom", year: 1983, price: 1800, inc: ["Consola Famicom", "2 Mandos integrados", "Cable RCA", "Adaptador"] },
    { id: 10022, name: "Sega SG-1000", year: 1983, price: 3000, inc: ["Consola SG-1000", "1 Joystick", "Cable a TV", "Adaptador AC"] },
    { id: 10023, name: "Tomy Tutor", year: 1983, price: 2500, inc: ["Consola Tomy", "Cable RF", "Eliminador"] },
    { id: 10024, name: "Casio PV-2000", year: 1983, price: 3000, inc: ["Consola Casio", "1 Gamepad", "Cable AV", "Fuente de poder"] },
    { id: 10025, name: "Nintendo NES", year: 1985, price: 1800, inc: ["Consola NES", "1 Control original", "Cable RCA", "Eliminador"] },
    { id: 10026, name: "Sega Mark III", year: 1985, price: 3500, inc: ["Consola Mark III", "1 Pad", "Cables AV y Fuente"] },
    { id: 10027, name: "Sega Master System", year: 1985, price: 2500, inc: ["Consola SMS", "1 Control Pad", "Cable AV RCA", "Eliminador"] },
    { id: 10028, name: "Atari 7800", year: 1984, price: 2000, inc: ["Consola 7800", "1 Joystick", "Cable RF", "Adaptador"] },
    { id: 10029, name: "Amstrad GX4000", year: 1990, price: 4500, inc: ["Consola GX4000", "1 Control", "Cable AV y Fuente"] },
    { id: 10030, name: "Atari Lynx", year: 1989, price: 3500, inc: ["Portátil Lynx", "Baterías AA", "Cargador AC"] },
    { id: 10031, name: "Game Boy Clásico", year: 1989, price: 1500, inc: ["Portátil Game Boy", "4 Baterías AA", "Tapa"] },
    { id: 10032, name: "TurboGrafx-16", year: 1987, price: 3000, inc: ["Consola TurboGrafx", "1 TurboPad", "Cable RF y Eliminador"] },
    { id: 10033, name: "Sega Genesis", year: 1988, price: 1500, inc: ["Consola Genesis", "1 Control 3 botones", "Cable AV", "Eliminador"] },
    { id: 10034, name: "Neo Geo AES", year: 1990, price: 18000, inc: ["Consola AES", "1 Arcade Stick", "Cable AV", "Fuente original"] },
    { id: 10035, name: "Super Nintendo (SNES)", year: 1990, price: 2200, inc: ["Consola SNES", "1 Control original", "Cable RCA", "Eliminador"] },
    { id: 10036, name: "Commodore CDTV", year: 1991, price: 8000, inc: ["Consola CDTV", "Mando a distancia", "Cable AV", "Cable Corriente"] },
    { id: 10037, name: "Philips CD-i", year: 1991, price: 5000, inc: ["Consola CD-i", "Control remoto", "Cable RCA", "Cable Corriente"] },
    { id: 10038, name: "Sega CD", year: 1991, price: 4500, inc: ["Sega CD Add-on", "Cable pasante", "Fuente de poder"] },
    { id: 10039, name: "Sega Pico", year: 1993, price: 1500, inc: ["Consola Pico", "Lápiz óptico", "Cable de video", "Eliminador"] },
    { id: 10040, name: "3DO Interactive", year: 1993, price: 4000, inc: ["Consola 3DO", "1 Control", "Cable AV", "Cable de poder"] },
    { id: 10041, name: "Atari Jaguar", year: 1993, price: 6000, inc: ["Consola Jaguar", "1 Control", "Cable RF", "Fuente"] },
    { id: 10042, name: "Amiga CD32", year: 1993, price: 7000, inc: ["Consola CD32", "1 Mando", "Cable AV", "Fuente"] },
    { id: 10043, name: "FM Towns Marty", year: 1993, price: 15000, inc: ["Consola FM Towns", "1 Control Pad", "Cable AV", "Corriente"] },
    { id: 10044, name: "Sega Saturn", year: 1994, price: 3500, inc: ["Consola Saturn", "1 Control", "Cable RCA", "Cable de poder"] },
    { id: 10045, name: "PlayStation (PS1)", year: 1994, price: 1200, inc: ["Consola PS1", "1 Control DualShock", "Cable AV", "Cable Corriente"] },
    { id: 10046, name: "Neo Geo CD", year: 1994, price: 8000, inc: ["Consola Neo Geo CD", "1 Pad", "Cable AV", "Fuente de poder"] },
    { id: 10047, name: "PC-FX", year: 1994, price: 6000, inc: ["Consola PC-FX", "1 Mando FX-PAD", "Cable AV", "Corriente"] },
    { id: 10048, name: "Sega 32X", year: 1994, price: 3500, inc: ["Módulo 32X", "Cable pasante", "Fuente propia"] },
    { id: 10049, name: "Virtual Boy", year: 1995, price: 8000, inc: ["Consola Virtual Boy", "Trípode", "Control", "Adaptador AC"] },
    { id: 10050, name: "Casio Loopy", year: 1995, price: 4000, inc: ["Consola Loopy", "1 Mando", "Cables AV y Fuente"] },
    { id: 10051, name: "Nintendo 64", year: 1996, price: 2500, inc: ["Consola N64", "1 Control original", "Cable RCA", "Fuente Nintendo"] },
    { id: 10052, name: "Game.com", year: 1997, price: 2000, inc: ["Portátil Game.com", "Stylus", "Baterías"] },
    { id: 10053, name: "Game Boy Light", year: 1998, price: 3500, inc: ["Consola GB Light", "Pilas instaladas", "Tapa"] },
    { id: 10054, name: "Sega Dreamcast", year: 1998, price: 3000, inc: ["Consola Dreamcast", "1 Control", "Cable RCA", "Corriente"] },
    { id: 10055, name: "Game Boy Color", year: 1998, price: 1800, inc: ["Consola GBC", "Baterías nuevas", "Tapa"] },
    { id: 10056, name: "Neo Geo Pocket", year: 1998, price: 2500, inc: ["Portátil NGP", "Pilas instaladas"] },
    { id: 10057, name: "WonderSwan", year: 1999, price: 2000, inc: ["Portátil WonderSwan", "Batería instalada"] },
    { id: 10058, name: "Neo Geo Pocket Color", year: 1999, price: 3000, inc: ["Portátil NGPC", "Pilas", "Tapa"] },
    { id: 10059, name: "PlayStation 2", year: 2000, price: 1500, inc: ["Consola PS2", "1 Control DualShock 2", "Cable AV", "Corriente"] },
    { id: 10060, name: "Nintendo GameCube", year: 2001, price: 2800, inc: ["Consola GameCube", "1 Control original", "Cable AV", "Fuente externa"] },
    { id: 10061, name: "Microsoft Xbox", year: 2001, price: 2000, inc: ["Consola Xbox", "1 Control", "Cable AV", "Cable de pared"] },
    { id: 10062, name: "Game Boy Advance", year: 2001, price: 1500, inc: ["Consola GBA", "Baterías", "Tapa"] },
    { id: 10063, name: "Pokémon mini", year: 2001, price: 2500, inc: ["Consola mini", "Pila nueva"] },
    { id: 10064, name: "Nokia N-Gage", year: 2003, price: 3000, inc: ["Teléfono N-Gage", "Batería", "Cargador"] },
    { id: 10065, name: "Game Boy Advance SP", year: 2003, price: 2000, inc: ["Consola GBA SP", "Batería", "Cargador original"] },
    { id: 10066, name: "Nintendo DS", year: 2004, price: 1000, inc: ["Consola NDS", "Stylus", "Cargador"] },
    { id: 10067, name: "PSP", year: 2004, price: 1500, inc: ["Consola PSP", "Batería", "Cargador 5V"] },
    { id: 10068, name: "Game Boy Micro", year: 2005, price: 3500, inc: ["Consola GB Micro", "Cargador Micro"] },
    { id: 10069, name: "Gizmondo", year: 2005, price: 5000, inc: ["Consola Gizmondo", "Batería", "Cargador"] },
    { id: 10070, name: "Xbox 360", year: 2005, price: 1800, inc: ["Consola 360", "1 Control inalámbrico", "Cable HDMI", "Fuente original"] },
    { id: 10071, name: "PlayStation 3", year: 2006, price: 2200, inc: ["Consola PS3", "1 Control DualShock 3", "Cables Carga y HDMI"] },
    { id: 10072, name: "Nintendo Wii", year: 2006, price: 1200, inc: ["Consola Wii", "Wiimote + Nunchuk", "Barra", "Cable AV y Fuente"] },
    { id: 10073, name: "Nintendo DSi", year: 2008, price: 1200, inc: ["Consola DSi", "Stylus", "Cargador"] },
    { id: 10074, name: "PSP Go", year: 2009, price: 2500, inc: ["Consola PSP Go", "Cable USB Propietario"] },
    { id: 10075, name: "Nintendo DSi XL", year: 2009, price: 1500, inc: ["Consola DSi XL", "Stylus", "Cargador"] },
    { id: 10076, name: "Nintendo 3DS", year: 2011, price: 2200, inc: ["Consola 3DS", "Stylus", "Cargador"] },
    { id: 10077, name: "PlayStation Vita", year: 2011, price: 3000, inc: ["Consola PS Vita", "Cable de carga", "Cargador"] },
    { id: 10078, name: "Nintendo 3DS XL", year: 2012, price: 2800, inc: ["Consola 3DS XL", "Stylus", "Cargador"] },
    { id: 10079, name: "Wii U", year: 2012, price: 3500, inc: ["Consola Wii U", "Wii U GamePad", "Cargadores HDMI"] },
    { id: 10080, name: "PlayStation TV", year: 2013, price: 2500, inc: ["Microconsola PS TV", "Cable HDMI", "Eliminador"] },
    { id: 10081, name: "PlayStation 4", year: 2013, price: 3500, inc: ["Consola PS4", "1 Control DualShock 4", "HDMI, Carga y Corriente"] },
    { id: 10082, name: "Xbox One", year: 2013, price: 2800, inc: ["Consola Xbox One", "1 Control", "Cable HDMI", "Fuente y Cable AC"] },
    { id: 10083, name: "Nintendo 2DS", year: 2013, price: 1500, inc: ["Consola 2DS", "Stylus", "Cargador"] },
    { id: 10084, name: "Ouya", year: 2013, price: 1200, inc: ["Consola Ouya", "1 Mando", "Cable HDMI", "Eliminador"] },
    { id: 10085, name: "PS Vita Slim", year: 2013, price: 2800, inc: ["Consola PS Vita Slim", "Cable Micro-USB", "Cargador"] },
    { id: 10086, name: "New Nintendo 3DS", year: 2014, price: 3500, inc: ["Consola New 3DS", "Stylus", "Cargador"] },
    { id: 10087, name: "New Nintendo 3DS XL", year: 2014, price: 4000, inc: ["Consola New 3DS XL", "Stylus", "Cargador"] },
    { id: 10088, name: "PlayStation 4 Slim", year: 2016, price: 4000, inc: ["Consola PS4 Slim", "1 Control", "HDMI, Carga y Corriente"] },
    { id: 10089, name: "PlayStation 4 Pro", year: 2016, price: 5000, inc: ["Consola PS4 Pro", "1 Control", "HDMI 4K", "Cable Corriente"] },
    { id: 10090, name: "Xbox One S", year: 2016, price: 3500, inc: ["Consola Xbox One S", "1 Control", "Cable HDMI", "Corriente"] },
    { id: 10091, name: "Nintendo Switch", year: 2017, price: 4500, inc: ["Tableta Switch", "2 Joy-Cons", "Dock", "Cargador", "HDMI"] },
    { id: 10092, name: "Xbox One X", year: 2017, price: 4500, inc: ["Consola Xbox One X", "1 Control", "HDMI 4K", "Corriente"] },
    { id: 10093, name: "Nintendo Switch Lite", year: 2019, price: 3000, inc: ["Consola Switch Lite", "Cargador USB-C"] },
    { id: 10094, name: "PlayStation 5", year: 2020, price: 8500, inc: ["Consola PS5", "1 Control DualSense", "Cable USB-C", "HDMI 2.1"] },
    { id: 10095, name: "Xbox Series X", year: 2020, price: 8000, inc: ["Consola Series X", "1 Control Series", "HDMI Ultra", "Poder"] },
    { id: 10096, name: "Xbox Series S", year: 2020, price: 4500, inc: ["Consola Series S", "1 Control", "Cable HDMI", "Poder"] },
    { id: 10097, name: "Nintendo Switch OLED", year: 2021, price: 6000, inc: ["Consola Switch OLED", "2 Joy-Cons", "Dock", "HDMI", "Cargador"] },
    { id: 10098, name: "Steam Deck", year: 2022, price: 7000, inc: ["Consola Steam Deck", "Funda", "Cargador rápido"] },
    { id: 10099, name: "ASUS ROG Ally", year: 2023, price: 9000, inc: ["Consola ROG Ally", "Cargador rápido Type-C"] },
    { id: 10100, name: "Lenovo Legion Go", year: 2023, price: 11000, inc: ["Consola Legion Go", "Mandos extraíbles", "Cargador"] },
    { id: 10101, name: "Steam Deck OLED", year: 2023, price: 10000, inc: ["Consola Steam Deck OLED", "Cargador rápido"] },
    { id: 10102, name: "PlayStation 5 Slim", year: 2023, price: 9000, inc: ["Consola PS5 Slim", "1 Control DualSense", "Cables y soportes"] },
    { id: 10103, name: "ASUS ROG Ally X", year: 2024, price: 15000, inc: ["Consola ROG Ally X", "Cargador rápido"] },
    { id: 10104, name: "PlayStation 5 Pro", year: 2024, price: 16000, inc: ["Consola PS5 Pro", "1 Control DualSense", "Cables alta velocidad"] },
    { id: 10105, name: "MSI Claw", year: 2024, price: 12000, inc: ["Consola MSI Claw", "Cargador rápido"] },
    { id: 10106, name: "Nintendo Switch 2", year: 2025, price: 9500, inc: ["Consola Switch 2", "Joy-Cons magnéticos", "Dock", "Cargador y HDMI"] }
];

// 3. LIBRERÍAS DE JUEGOS AMPLIADAS A 20 TÍTULOS ESTANDARTE POR FAMILIA
const libreriasReales = {
    ps5: [{n:"Marvel's Spider-Man 2",p:1200},{n:"Final Fantasy VII Rebirth",p:1400},{n:"Demon's Souls",p:900},{n:"Ratchet & Clank: Rift Apart",p:800},{n:"Stellar Blade",p:1300},{n:"Astro Bot",p:1200},{n:"Helldivers 2",p:800},{n:"Rise of the Ronin",p:1200},{n:"Horizon Forbidden West",p:900},{n:"God of War Ragnarök",p:1000},{n:"Gran Turismo 7",p:900},{n:"The Last of Us Part I",p:1000},{n:"Ghost of Tsushima Director's Cut",p:800},{n:"Returnal",p:700},{n:"Death Stranding 2",p:1400},{n:"Tekken 8",p:1200},{n:"Final Fantasy XVI",p:1100},{n:"Resident Evil 4 Remake",p:1000},{n:"Dead Space Remake",p:900},{n:"Dragon's Dogma 2",p:1300}],
    ps4: [{n:"God of War",p:350},{n:"The Last of Us Part II",p:500},{n:"Marvel's Spider-Man",p:400},{n:"Red Dead Redemption 2",p:450},{n:"Bloodborne",p:350},{n:"Uncharted 4: A Thief's End",p:300},{n:"Horizon Zero Dawn",p:300},{n:"Persona 5",p:350},{n:"The Witcher 3: Wild Hunt",p:400},{n:"Ghost of Tsushima",p:500},{n:"Grand Theft Auto V",p:350},{n:"Final Fantasy VII Remake",p:450},{n:"Sekiro: Shadows Die Twice",p:600},{n:"Resident Evil 2 Remake",p:450},{n:"NieR: Automata",p:400},{n:"Dark Souls III",p:400},{n:"Fallout 4",p:300},{n:"MGS V: The Phantom Pain",p:350},{n:"Crash Bandicoot N. Sane Trilogy",p:400},{n:"DOOM",p:300}],
    ps3: [{n:"The Last of Us",p:300},{n:"Uncharted 2: Among Thieves",p:250},{n:"Metal Gear Solid 4",p:250},{n:"God of War III",p:250},{n:"Demon's Souls",p:400},{n:"Infamous 2",p:250},{n:"LittleBigPlanet 2",p:250},{n:"Killzone 2",p:200},{n:"Resistance 3",p:250},{n:"Heavy Rain",p:250},{n:"Journey",p:400},{n:"Persona 5 (PS3)",p:450},{n:"Gran Turismo 5",p:200},{n:"MotorStorm",p:200},{n:"Batman: Arkham City",p:250},{n:"BioShock",p:250},{n:"Red Dead Redemption",p:300},{n:"Grand Theft Auto IV",p:300},{n:"Mass Effect 2",p:250},{n:"Fallout 3",p:250}],
    ps2: [{n:"GTA: San Andreas",p:300},{n:"Metal Gear Solid 3",p:400},{n:"Shadow of the Colossus",p:450},{n:"Silent Hill 2",p:2000},{n:"Resident Evil 4",p:350},{n:"God of War II",p:300},{n:"Final Fantasy X",p:250},{n:"Kingdom Hearts",p:300},{n:"Gran Turismo 4",p:200},{n:"Devil May Cry 3",p:300},{n:"Bully",p:350},{n:"Okami",p:400},{n:"Sly 2: Band of Thieves",p:350},{n:"Jak II",p:300},{n:"Need for Speed Underground 2",p:400},{n:"Tekken 5",p:350},{n:"Burnout 3: Takedown",p:350},{n:"Dragon Quest VIII",p:400},{n:"Final Fantasy XII",p:300},{n:"Ratchet & Clank: Up Your Arsenal",p:350}],
    ps1: [{n:"Metal Gear Solid",p:600},{n:"Final Fantasy VII",p:700},{n:"Castlevania: Symphony of the Night",p:2000},{n:"Resident Evil 2",p:650},{n:"Crash Bandicoot",p:500},{n:"Tekken 3",p:400},{n:"Silent Hill",p:2500},{n:"Gran Turismo 2",p:300},{n:"Spyro the Dragon",p:450},{n:"Tomb Raider",p:350},{n:"Tony Hawk's Pro Skater 2",p:300},{n:"Chrono Cross",p:600},{n:"Street Fighter Alpha 3",p:700},{n:"Suikoden II",p:3000},{n:"Twisted Metal 2",p:400},{n:"Dino Crisis",p:800},{n:"Parasite Eve",p:1000},{n:"Vagrant Story",p:1200},{n:"Xenogears",p:1500},{n:"Driver",p:300}],
    psp: [{n:"God of War: Ghost of Sparta",p:600},{n:"Metal Gear Solid: Peace Walker",p:500},{n:"GTA: Vice City Stories",p:400},{n:"Crisis Core: Final Fantasy VII",p:500},{n:"Persona 3 Portable",p:1200},{n:"Kingdom Hearts: Birth by Sleep",p:400},{n:"Monster Hunter Freedom Unite",p:300},{n:"Daxter",p:250},{n:"Patapon",p:300},{n:"LocoRoco",p:250},{n:"Dissidia 012 Final Fantasy",p:400},{n:"Tekken 6",p:350},{n:"Silent Hill: Origins",p:600},{n:"Castlevania: Dracula X Chronicles",p:800},{n:"Lumines",p:200}],
    psvita: [{n:"Persona 4 Golden",p:800},{n:"Uncharted: Golden Abyss",p:600},{n:"Gravity Rush",p:700},{n:"Killzone: Mercenary",p:600},{n:"Tearaway",p:500},{n:"Danganronpa: Trigger Happy Havoc",p:600},{n:"Final Fantasy X/X-2 HD Remaster",p:500},{n:"Soul Sacrifice Delta",p:700},{n:"Freedom Wars",p:400},{n:"Muramasa Rebirth",p:900},{n:"Ys VIII: Lacrimosa of DANA",p:1000},{n:"Dragon's Crown",p:600},{n:"LittleBigPlanet PS Vita",p:400},{n:"Wipeout 2048",p:500},{n:"Spelunky",p:400}],
    xbox_series: [{n:"Halo Infinite",p:800},{n:"Forza Horizon 5",p:900},{n:"Starfield",p:1000},{n:"Microsoft Flight Simulator",p:900},{n:"Senua's Saga: Hellblade II",p:900},{n:"Sea of Thieves",p:600},{n:"Gears 5",p:400},{n:"Hi-Fi Rush",p:500},{n:"Grounded",p:600},{n:"Diablo IV",p:1200},{n:"DOOM Eternal",p:500},{n:"Cyberpunk 2077 (Next Gen)",p:800},{n:"Hogwarts Legacy",p:1100},{n:"Ori and the Will of the Wisps",p:400},{n:"Halo Wars 2",p:500},{n:"Alan Wake 2",p:1000},{n:"Star Wars Jedi: Survivor",p:1000},{n:"Elden Ring",p:900},{n:"Forza Motorsport",p:900},{n:"Resident Evil 4 Remake",p:1000}],
    xbox_one: [{n:"Halo: The Master Chief Collection",p:400},{n:"Forza Horizon 4",p:500},{n:"Gears of War 4",p:300},{n:"Quantum Break",p:300},{n:"Sunset Overdrive",p:250},{n:"Halo 5: Guardians",p:250},{n:"Forza Motorsport 7",p:450},{n:"Ryse: Son of Rome",p:250},{n:"State of Decay 2",p:300},{n:"Killer Instinct",p:250},{n:"Rare Replay",p:300},{n:"Cuphead",p:350},{n:"Titanfall 2",p:250},{n:"Dead Rising 3",p:300},{n:"Ori and the Blind Forest",p:300}],
    xbox_360: [{n:"Halo 3",p:200},{n:"Gears of War 2",p:200},{n:"Mass Effect 2",p:250},{n:"Red Dead Redemption",p:300},{n:"The Elder Scrolls V: Skyrim",p:250},{n:"Bioshock",p:250},{n:"Grand Theft Auto IV",p:300},{n:"Fallout 3",p:250},{n:"Call of Duty: Modern Warfare 2",p:200},{n:"Left 4 Dead 2",p:350},{n:"Batman: Arkham City",p:250},{n:"Forza Horizon",p:350},{n:"Alan Wake",p:300},{n:"Dead Space",p:250},{n:"Fable II",p:200}],
    xbox_orig: [{n:"Halo: Combat Evolved",p:300},{n:"Halo 2",p:350},{n:"Fable",p:250},{n:"Star Wars: Knights of the Old Republic",p:400},{n:"Ninja Gaiden Black",p:350},{n:"Tom Clancy's Splinter Cell",p:200},{n:"Forza Motorsport",p:250},{n:"Project Gotham Racing 2",p:200},{n:"Jade Empire",p:300},{n:"Crimson Skies",p:250},{n:"The Chronicles of Riddick",p:300},{n:"Doom 3",p:250},{n:"Jet Set Radio Future",p:600},{n:"Shenmue II",p:400},{n:"Burnout 3: Takedown",p:300}],
    switch: [{n:"Zelda: Breath of the Wild",p:900},{n:"Super Mario Odyssey",p:900},{n:"Mario Kart 8 Deluxe",p:1000},{n:"Super Smash Bros. Ultimate",p:1100},{n:"Animal Crossing: New Horizons",p:900},{n:"Pokémon Legends: Arceus",p:800},{n:"Metroid Dread",p:750},{n:"Splatoon 3",p:900},{n:"Xenoblade Chronicles 3",p:800},{n:"Fire Emblem: Three Houses",p:850},{n:"Luigi's Mansion 3",p:800},{n:"Super Mario Bros. Wonder",p:1000},{n:"Monster Hunter Rise",p:600},{n:"Zelda: Tears of the Kingdom",p:1100},{n:"Super Mario 3D All-Stars",p:1500},{n:"Hollow Knight",p:300},{n:"Pikmin 4",p:900},{n:"Bayonetta 3",p:800},{n:"Hades",p:400},{n:"Xenoblade Chronicles 2",p:800}],
    wiiu: [{n:"Zelda: Breath of the Wild (Wii U)",p:800},{n:"Mario Kart 8",p:500},{n:"Super Mario 3D World",p:400},{n:"Super Smash Bros. for Wii U",p:500},{n:"Splatoon",p:300},{n:"Bayonetta 2",p:600},{n:"Donkey Kong Country: Tropical Freeze",p:400},{n:"Pikmin 3",p:400},{n:"Xenoblade Chronicles X",p:800},{n:"Zelda: The Wind Waker HD",p:700},{n:"Super Mario Maker",p:400},{n:"Captain Toad: Treasure Tracker",p:300},{n:"Yoshi's Woolly World",p:400},{n:"Paper Mario: Color Splash",p:600},{n:"Star Fox Zero",p:300}],
    wii: [{n:"Super Mario Galaxy",p:500},{n:"Super Smash Bros. Brawl",p:400},{n:"Mario Kart Wii",p:600},{n:"Zelda: Twilight Princess",p:500},{n:"Wii Sports Resort",p:400},{n:"Metroid Prime Trilogy",p:1500},{n:"Super Mario Galaxy 2",p:600},{n:"Donkey Kong Country Returns",p:400},{n:"Zelda: Skyward Sword",p:600},{n:"Xenoblade Chronicles",p:700},{n:"Resident Evil 4: Wii Edition",p:300},{n:"Punch-Out!!",p:500},{n:"Fire Emblem: Radiant Dawn",p:1800},{n:"Kirby's Return to Dream Land",p:500},{n:"Super Paper Mario",p:400}],
    gamecube: [{n:"Super Smash Bros. Melee",p:1200},{n:"Zelda: The Wind Waker",p:1000},{n:"Super Mario Sunshine",p:900},{n:"Mario Kart: Double Dash!!",p:1100},{n:"Luigi's Mansion",p:900},{n:"Metroid Prime",p:800},{n:"Resident Evil 4",p:500},{n:"Paper Mario: The Thousand-Year Door",p:1500},{n:"Pikmin 2",p:1200},{n:"F-Zero GX",p:1000},{n:"Star Fox Adventures",p:600},{n:"Animal Crossing",p:900},{n:"Fire Emblem: Path of Radiance",p:3500},{n:"Eternal Darkness",p:1200},{n:"Metal Gear Solid: The Twin Snakes",p:1500}],
    n64: [{n:"Super Mario 64",p:600},{n:"Zelda: Ocarina of Time",p:800},{n:"GoldenEye 007",p:500},{n:"Zelda: Majora's Mask",p:900},{n:"Mario Kart 64",p:700},{n:"Super Smash Bros.",p:800},{n:"Banjo-Kazooie",p:600},{n:"Paper Mario",p:1500},{n:"Star Fox 64",p:450},{n:"Donkey Kong 64",p:550},{n:"Perfect Dark",p:400},{n:"Diddy Kong Racing",p:450},{n:"Pokemon Stadium",p:500},{n:"Conker's Bad Fur Day",p:2500},{n:"Wave Race 64",p:300}],
    snes: [{n:"Super Mario World",p:400},{n:"Zelda: A Link to the Past",p:700},{n:"Super Metroid",p:1200},{n:"Chrono Trigger",p:3500},{n:"Donkey Kong Country",p:500},{n:"Street Fighter II",p:350},{n:"Final Fantasy III (VI)",p:1200},{n:"Super Mario Kart",p:600},{n:"EarthBound",p:5000},{n:"Secret of Mana",p:900},{n:"Mega Man X",p:600},{n:"Super Mario RPG",p:1500},{n:"Super Mario World 2: Yoshi's Island",p:600},{n:"Super Castlevania IV",p:1000},{n:"Star Fox",p:350}],
    nes: [{n:"Super Mario Bros.",p:300},{n:"Super Mario Bros. 3",p:450},{n:"The Legend of Zelda",p:600},{n:"Metroid",p:500},{n:"Mega Man 2",p:600},{n:"Castlevania",p:550},{n:"Contra",p:700},{n:"DuckTales",p:400},{n:"Mike Tyson's Punch-Out!!",p:500},{n:"Final Fantasy",p:600},{n:"Zelda II: The Adventure of Link",p:450},{n:"Excitebike",p:250},{n:"Double Dragon",p:350},{n:"Kid Icarus",p:450},{n:"Tetris",p:200}],
    n3ds: [{n:"Pokémon Omega Rubí/Alfa Zafiro",p:800},{n:"Zelda: Ocarina of Time 3D",p:600},{n:"Super Mario 3D Land",p:400},{n:"Fire Emblem Awakening",p:800},{n:"Animal Crossing: New Leaf",p:500},{n:"Mario Kart 7",p:400},{n:"Zelda: A Link Between Worlds",p:600},{n:"Pokémon Sol/Luna",p:500},{n:"Super Smash Bros. for 3DS",p:500},{n:"Luigi's Mansion: Dark Moon",p:400},{n:"Bravely Default",p:700},{n:"Kid Icarus: Uprising",p:900},{n:"Monster Hunter 4 Ultimate",p:500},{n:"Xenoblade Chronicles 3D",p:600},{n:"Metroid: Samus Returns",p:700}],
    nds: [{n:"Pokémon HeartGold/SoulSilver",p:2500},{n:"Mario Kart DS",p:500},{n:"New Super Mario Bros.",p:400},{n:"Zelda: Phantom Hourglass",p:600},{n:"Chrono Trigger DS",p:1500},{n:"Animal Crossing: Wild World",p:500},{n:"Castlevania: Dawn of Sorrow",p:1000},{n:"Pokémon Blanco/Negro",p:1500},{n:"Mario & Luigi: Bowser's Inside Story",p:600},{n:"Dragon Quest IX",p:800},{n:"Phoenix Wright: Ace Attorney",p:500},{n:"Professor Layton",p:500},{n:"GTA: Chinatown Wars",p:600},{n:"Metroid Prime Hunters",p:500},{n:"Advance Wars: Dual Strike",p:800}],
    gba: [{n:"Pokémon Esmeralda",p:1500},{n:"Zelda: The Minish Cap",p:1200},{n:"Metroid Fusion",p:1000},{n:"Castlevania: Aria of Sorrow",p:1800},{n:"Advance Wars",p:800},{n:"Fire Emblem",p:1200},{n:"Golden Sun",p:800},{n:"Mario & Luigi: Superstar Saga",p:700},{n:"Super Mario Advance 4",p:600},{n:"Final Fantasy Tactics Advance",p:800},{n:"WarioWare, Inc.",p:500},{n:"Mega Man Zero",p:600},{n:"Sonic Advance",p:400},{n:"Mother 3",p:1000},{n:"Kingdom Hearts: Chain of Memories",p:500}],
    gb: [{n:"Pokémon Rojo/Azul",p:800},{n:"Tetris",p:200},{n:"Zelda: Link's Awakening",p:600},{n:"Super Mario Land 2",p:400},{n:"Pokémon Amarillo",p:900},{n:"Donkey Kong",p:350},{n:"Wario Land",p:400},{n:"Metroid II",p:500},{n:"Kirby's Dream Land",p:300},{n:"Pokémon Oro/Plata",p:800},{n:"Super Mario Land",p:300},{n:"Castlevania II: Belmont's Revenge",p:800},{n:"Mega Man V",p:1500},{n:"Gargoyle's Quest",p:500},{n:"Final Fantasy Adventure",p:600}],
    pc: [{n:"Cyberpunk 2077",p:800},{n:"Elden Ring",p:900},{n:"Baldur's Gate 3",p:1000},{n:"The Witcher 3: Wild Hunt",p:400},{n:"Red Dead Redemption 2",p:600},{n:"Grand Theft Auto V",p:400},{n:"Stardew Valley",p:250},{n:"Hades",p:300},{n:"Vampire Survivors",p:100},{n:"Hollow Knight",p:250},{n:"Dave the Diver",p:300},{n:"Palworld",p:450},{n:"Persona 3 Reload",p:1000},{n:"Fallout 4",p:300},{n:"Left 4 Dead 2",p:150}],
    dreamcast: [{n:"Shenmue",p:700},{n:"Sonic Adventure",p:500},{n:"Crazy Taxi",p:400},{n:"Jet Set Radio",p:600},{n:"Soulcalibur",p:500},{n:"Phantasy Star Online",p:600},{n:"Resident Evil Code: Veronica",p:550},{n:"Skies of Arcadia",p:1200},{n:"Marvel vs. Capcom 2",p:1500},{n:"Power Stone 2",p:1000},{n:"Ikaruga",p:800},{n:"Virtua Tennis",p:300},{n:"Space Channel 5",p:400},{n:"Sonic Adventure 2",p:600},{n:"ChuChu Rocket!",p:250}],
    saturn: [{n:"Panzer Dragoon Saga",p:5000},{n:"NiGHTS into Dreams",p:600},{n:"Virtua Fighter 2",p:300},{n:"Sega Rally Championship",p:300},{n:"Shining Force III",p:1500},{n:"Guardian Heroes",p:1200},{n:"Radiant Silvergun",p:2500},{n:"Burning Rangers",p:1500},{n:"Daytona USA",p:300},{n:"X-Men vs. Street Fighter",p:800},{n:"Sonic Jam",p:700},{n:"Albert Odyssey",p:1000},{n:"Dragon Force",p:1200},{n:"Saturn Bomberman",p:1000},{n:"Astal",p:800}],
    genesis: [{n:"Sonic the Hedgehog 2",p:250},{n:"Streets of Rage 2",p:700},{n:"Gunstar Heroes",p:1500},{n:"Phantasy Star IV",p:1800},{n:"Shinobi III",p:600},{n:"Castlevania: Bloodlines",p:2000},{n:"Contra: Hard Corps",p:2200},{n:"Mortal Kombat II",p:350},{n:"Earthworm Jim",p:450},{n:"Comix Zone",p:600},{n:"Aladdin",p:300},{n:"Golden Axe",p:400},{n:"Vectorman",p:300},{n:"Beyond Oasis",p:800},{n:"Ristar",p:1000}],
    mastersystem: [{n:"Alex Kidd in Miracle World",p:300},{n:"Phantasy Star",p:800},{n:"Wonder Boy III: The Dragon's Trap",p:600},{n:"Sonic the Hedgehog",p:400},{n:"Fantasy Zone",p:350},{n:"OutRun",p:300},{n:"Space Harrier",p:300},{n:"Golden Axe Warrior",p:1500},{n:"Asterix",p:250},{n:"Castle of Illusion",p:400},{n:"Ninja Gaiden",p:500},{n:"R-Type",p:400},{n:"Shinobi",p:350},{n:"Psycho Fox",p:400},{n:"Mickey Mouse",p:300}],
    neogeo: [{n:"Metal Slug 3",p:3500},{n:"The King of Fighters '98",p:2000},{n:"Garou: Mark of the Wolves",p:4000},{n:"Samurai Shodown II",p:1500},{n:"Fatal Fury Special",p:1200},{n:"Sengoku 3",p:3000},{n:"The Last Blade 2",p:3500},{n:"Blazing Star",p:4000},{n:"Pulstar",p:4500},{n:"Neo Turf Masters",p:2500},{n:"Windjammers",p:3000},{n:"Real Bout Fatal Fury 2",p:2000},{n:"Shock Troopers",p:2500},{n:"Art of Fighting 3",p:1800},{n:"Twinkle Star Sprites",p:5000}],
    retro_arcade: [{n:"Pac-Man",p:200},{n:"Pitfall!",p:250},{n:"Space Invaders",p:200},{n:"Asteroids",p:150},{n:"Missile Command",p:150},{n:"Defender",p:150},{n:"Yars' Revenge",p:200},{n:"Frogger",p:200},{n:"Centipede",p:150},{n:"Adventure",p:300},{n:"River Raid",p:250},{n:"Kaboom!",p:200},{n:"Breakout",p:150},{n:"Combat",p:100},{n:"Pong",p:500}]
};

function getConsoleGames(consoleName) {
    let n = consoleName.toLowerCase();
    if (n.includes("playstation 5") || n.includes("ps5")) return libreriasReales.ps5;
    if (n.includes("playstation 4") || n.includes("ps4")) return libreriasReales.ps4;
    if (n.includes("playstation 3") || n.includes("ps3")) return libreriasReales.ps3;
    if (n.includes("playstation 2") || n.includes("ps2")) return libreriasReales.ps2;
    if (n.includes("playstation") || n.includes("ps1")) return libreriasReales.ps1;
    if (n.includes("vita") || n.includes("pstv")) return libreriasReales.psvita;
    if (n.includes("psp")) return libreriasReales.psp;
    if (n.includes("series x") || n.includes("series s")) return libreriasReales.xbox_series;
    if (n.includes("xbox one")) return libreriasReales.xbox_one;
    if (n.includes("xbox 360")) return libreriasReales.xbox_360;
    if (n.includes("xbox")) return libreriasReales.xbox_orig;
    if (n.includes("switch")) return libreriasReales.switch;
    if (n.includes("wii u")) return libreriasReales.wiiu;
    if (n.includes("wii")) return libreriasReales.wii;
    if (n.includes("gamecube")) return libreriasReales.gamecube;
    if (n.includes("nintendo 64") || n.includes("n64")) return libreriasReales.n64;
    if (n.includes("snes") || n.includes("super nintendo")) return libreriasReales.snes;
    if (n.includes("nes") || n.includes("famicom")) return libreriasReales.nes;
    if (n.includes("3ds") || n.includes("2ds")) return libreriasReales.n3ds;
    if (n.includes("ds")) return libreriasReales.nds;
    if (n.includes("advance") || n.includes("gba") || n.includes("micro")) return libreriasReales.gba;
    if (n.includes("game boy") || n.includes("color") || n.includes("light")) return libreriasReales.gb;
    if (n.includes("steam") || n.includes("rog ally") || n.includes("legion") || n.includes("claw")) return libreriasReales.pc;
    if (n.includes("dreamcast")) return libreriasReales.dreamcast;
    if (n.includes("saturn")) return libreriasReales.saturn;
    if (n.includes("genesis") || n.includes("sega cd") || n.includes("32x") || n.includes("mega drive")) return libreriasReales.genesis;
    if (n.includes("master system") || n.includes("mark iii") || n.includes("sg-1000")) return libreriasReales.mastersystem;
    if (n.includes("neo geo")) return libreriasReales.neogeo;
    
    return libreriasReales.retro_arcade;
}

// 4. LÓGICA DE ORDENAMIENTO, BÚSQUEDA Y FILTROS
function setBrandFilter(brand, btnElement) {
    currentBrandFilter = brand;
    document.querySelectorAll('.brand-badge').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');
    renderCurrentView();
}

function toggleSortOrder() {
    isAscending = !isAscending;
    document.getElementById('sort-arrow').innerText = isAscending ? "▲" : "▼";
    renderCurrentView();
}

function handleSearchInput() {
    searchQuery = document.getElementById('catalog-search').value.toLowerCase().trim();
    renderCurrentView();
}

function renderCurrentView() {
    const activeTab = viewHistory[viewHistory.length - 1];
    if (activeTab === 'consolas' || activeTab === 'consolas-view') {
        renderConsolas();
    } else if (activeTab === 'juegos') {
        renderJuegosConsolas();
    } else if (activeTab === 'juegos-detalle') {
        let titleText = document.getElementById('juegos-consola-titulo').innerText;
        let consoleName = titleText.replace("JUEGOS DESTACADOS: ", "");
        renderTopJuegosFiltered(consoleName);
    }
}

function getConsoleOnlyDiscount(price) {
    if (price >= 2000) return 600;
    if (price >= 1000) return 400;
    return 200;
}

// 5. INYECCIÓN Y RENDERIZADO DEL DOM
document.addEventListener('DOMContentLoaded', () => {
    setRandomSlogan();
    renderConsolas();
    renderJuegosConsolas();
    updateCartUI();
    resetIdleTimer();
});

function getImgSrc(id) {
    return `onerror="this.onerror=null; this.src='https://placehold.co/600x400/2d3748/cbd5e0?text=FOTO+PENDIENTE';" src="img/${id}.jpg"`;
}

function renderConsolas() {
    const container = document.getElementById('catalogo-consolas');
    
    let list = consolasDB.filter(c => {
        let nameLower = c.name.toLowerCase();
        let matchSearch = nameLower.includes(searchQuery) || c.year.toString().includes(searchQuery);
        let matchBrand = true;

        if (currentBrandFilter === 'nintendo') {
            matchBrand = /nintendo|game boy|wii|ds|switch|famicom|pokemon/i.test(nameLower);
        } else if (currentBrandFilter === 'playstation') {
            matchBrand = /playstation|ps1|ps2|ps3|ps4|ps5|psp|vita/i.test(nameLower);
        } else if (currentBrandFilter === 'sega') {
            matchBrand = /sega|dreamcast|saturn|genesis|master system/i.test(nameLower);
        } else if (currentBrandFilter === 'xbox') {
            matchBrand = /xbox/i.test(nameLower);
        }
        return matchSearch && matchBrand;
    });
    
    list.sort((a, b) => isAscending ? a.year - b.year : b.year - a.year);

    if (list.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a0aec0; padding: 2rem;">No se encontraron resultados.</p>`;
        return;
    }

    let html = '';
    list.forEach((c) => {
        let incItems = c.inc.map(item => `<li>${item}</li>`).join('');
        let discount = getConsoleOnlyDiscount(c.price);
        let soloName = c.name + " (Solo Consola)";

        html += `
        <div class="card">
            <img ${getImgSrc(c.id)} alt="${c.name}" class="static-image">
            <span class="badge-estado">Año ${c.year}</span>
            <h3>${c.name}</h3>
            <details>
                <summary>¿Qué incluye?</summary>
                <ul>${incItems}</ul>
            </details>
            <span class="price">$${c.price.toFixed(2)}</span>
            <div class="buy-options">
                <button class="add-btn" onclick="addSingleProductToCart('${c.name.replace(/'/g, "\\'")}', ${c.price})">+ COMPLETA</button>
                <button class="add-btn btn-outline" onclick="addSingleProductToCart('${soloName.replace(/'/g, "\\'")}', ${c.price - discount})">
                    <div>+ SÓLO CONSOLA</div>
                    <div style="font-size: 0.45rem; opacity: 0.8;">(-$${discount})</div>
                </button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

function renderJuegosConsolas() {
    const container = document.getElementById('catalogo-juegos-consolas');
    
    let list = consolasDB.filter(c => {
        let nameLower = c.name.toLowerCase();
        let matchSearch = nameLower.includes(searchQuery) || c.year.toString().includes(searchQuery);
        let matchBrand = true;
        if (currentBrandFilter === 'nintendo') matchBrand = /nintendo|game boy|wii|ds|switch|famicom|pokemon/i.test(nameLower);
        else if (currentBrandFilter === 'playstation') matchBrand = /playstation|ps1|ps2|ps3|ps4|ps5|psp|vita/i.test(nameLower);
        else if (currentBrandFilter === 'sega') matchBrand = /sega|dreamcast|saturn|genesis|master system/i.test(nameLower);
        else if (currentBrandFilter === 'xbox') matchBrand = /xbox/i.test(nameLower);
        return matchSearch && matchBrand;
    });
    
    list.sort((a, b) => isAscending ? a.year - b.year : b.year - a.year);

    if (list.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a0aec0; padding: 2rem;">No hay categorías con este filtro.</p>`;
        return;
    }

    let html = '';
    list.forEach((c) => {
        html += `
        <div class="card" style="cursor:pointer; padding-bottom: 25px;" onclick="openTopJuegos('${c.name.replace(/'/g, "\\'")}')">
            <img ${getImgSrc(c.id)} alt="${c.name}" class="static-image">
            <span class="badge-estado">${c.year}</span>
            <h3>${c.name}</h3>
            <p style="color: var(--accent-cyan); font-size: 0.8rem; margin-top: auto; font-weight: bold;">VER CATÁLOGO DE JUEGOS →</p>
        </div>`;
    });
    container.innerHTML = html;
}

function openTopJuegos(consoleName) {
    document.getElementById('juegos-consolas-list').style.display = 'none';
    document.getElementById('juegos-detalles-view').style.display = 'block';
    document.getElementById('juegos-consola-titulo').innerText = `JUEGOS DESTACADOS: ${consoleName.toUpperCase()}`;
    
    document.getElementById('back-bar').style.display = 'block';
    if (viewHistory[viewHistory.length - 1] !== 'juegos-detalle') {
        viewHistory.push('juegos-detalle');
    }
    renderTopJuegosFiltered(consoleName);
}

function renderTopJuegosFiltered(consoleName) {
    const listContainer = document.getElementById('lista-top-juegos');
    let games = getConsoleGames(consoleName);

    if (searchQuery) {
        games = games.filter(g => g.n.toLowerCase().includes(searchQuery));
    }

    if (games.length === 0) {
        listContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a0aec0; padding: 2rem;">No se encontraron títulos.</p>`;
        return;
    }

    let html = '';
    games.forEach((g, idx) => {
        let imgJuego = `https://placehold.co/600x400/2d3748/cbd5e0?text=JUEGO`;
        html += `
        <div class="card">
            <img src="${imgJuego}" alt="${g.n}" class="static-image">
            <h3 style="margin-top: 10px; margin-bottom: auto;">${g.n}</h3>
            <span class="price">$${g.p.toFixed(2)}</span>
            <div class="buy-options">
                <button class="add-btn" onclick="addSingleProductToCart('${g.n.replace(/'/g, "\\'")}', ${g.p})">+ AGREGAR</button>
            </div>
        </div>`;
    });
    listContainer.innerHTML = html;
}

// 6. NAVEGACIÓN
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

    document.getElementById('brand-filters-container').style.display = (sectionName === 'servicios') ? 'none' : 'flex';
    document.getElementById('back-bar').style.display = 'none';
    viewHistory = [sectionName];
    renderCurrentView();
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
    renderCurrentView();
}

function goHome() {
    showSection('consolas');
}

// 7. CARRITO Y CANTIDADES
function addSingleProductToCart(productName, productPrice) {
    let item = cart.find(i => i.name === productName);
    if (!item) {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    } else {
        item.quantity += 1;
    }
    localStorage.setItem('retrorevive_cart', JSON.stringify(cart));
    updateCartUI();
    showToast("✅ Agregado al carrito", "var(--accent-cyan)");
}

function changeQty(containerId, productName, productPrice, delta) {
    let item = cart.find(i => i.name === productName);
    
    if (!item && delta > 0) {
        item = { name: productName, price: productPrice, quantity: 1 };
        cart.push(item);
        showToast("✅ Agregado", "var(--accent-cyan)");
    } else if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== productName);
            showToast("❌ Removido", "var(--accent-pink)");
            item = null;
        }
    }
    
    let container = document.getElementById(containerId);
    if (container) {
        if (!item || item.quantity === 0) {
            container.innerHTML = `<button class="add-btn" onclick="changeQty('${containerId}', '${productName.replace(/'/g, "\\'")}', ${productPrice}, 1)">+ COTIZAR</button>`;
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
    if(document.getElementById('review-cart-modal').classList.contains('active')) {
        renderCartModalList(); 
    }
}

function removeItemCompleto(productName) {
    cart = cart.filter(i => i.name !== productName);
    localStorage.setItem('retrorevive_cart', JSON.stringify(cart));
    updateCartUI();
    renderCartModalList();
    showToast("❌ Removido", "var(--accent-pink)");
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
        closeCartModal(); 
    }
}

// 8. MODALES Y CONTACTO
function showToast(message, bgColor) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.background = bgColor;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

function openCartModal() {
    if (cart.length === 0) return;
    renderCartModalList();
    document.getElementById('review-cart-modal').classList.add('active');
}

function closeCartModal() {
    document.getElementById('review-cart-modal').classList.remove('active');
}

function renderCartModalList() {
    const list = document.getElementById('cart-items-list');
    let html = '';
    cart.forEach(item => {
        html += `
        <div class="cart-item-row">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.quantity}x ${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <button class="qty-btn" style="color:var(--accent-cyan); border:1px solid var(--accent-cyan); padding:2px 8px; border-radius:3px;" onclick="changeQty(null, '${item.name.replace(/'/g, "\\'")}', ${item.price}, -1)">-</button>
                <button class="qty-btn" style="color:var(--accent-cyan); border:1px solid var(--accent-cyan); padding:2px 8px; border-radius:3px;" onclick="changeQty(null, '${item.name.replace(/'/g, "\\'")}', ${item.price}, 1)">+</button>
                <button class="btn-remove-item" onclick="removeItemCompleto('${item.name.replace(/'/g, "\\'")}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
    });
    list.innerHTML = html;
}

function proceedToCheckout() {
    closeCartModal();
    document.getElementById('checkout-modal').classList.add('active');
}

function backToCartModal() {
    document.getElementById('checkout-modal').classList.remove('active');
    openCartModal();
}

// 9. ENVÍO DE PEDIDOS Y TRADE-IN A WHATSAPP
function processOrder() {
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();

    if (!name || !phone) { showToast("⚠️ Llena todos los campos", "orange"); return; }
    if (phone.length < 10) { showToast("⚠️ El teléfono debe tener 10 dígitos", "orange"); return; }

    let currentFolio = localStorage.getItem('retrorevive_folio') || 0;
    currentFolio = parseInt(currentFolio) + 1;
    localStorage.setItem('retrorevive_folio', currentFolio);
    let stringFolio = currentFolio.toString().padStart(5, '0');

    let message = "🕹️ *SOLICITUD DE PEDIDO RETROREVIVE*\n";
    message += `*FOLIO: #${stringFolio}*\n---------------------------\n`;
    message += `👤 Cliente: ${name}\n📱 Teléfono: ${phone}\n---------------------------\n`;
    
    cart.forEach(item => {
        message += `▪ ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    
    message += `---------------------------\n*TOTAL: $${total.toFixed(2)}*\n\n_RetroRevive Culiacán_`;

    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`, '_blank');
    document.getElementById('checkout-modal').classList.remove('active');
}

function sendTradeInMessage() {
    let message = "¡Hola RetroRevive! ♻️ Tengo unas consolas/placas descompuestas o viejas y me gustaría saber si las compran o las toman a cuenta. Son las siguientes: ";
    window.open(`https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
}

// 10. MODO ARCADE: INSERT COIN (Inactividad 2 minutos)
let idleTimer;
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(triggerInsertCoin, 120000); 
}

function triggerInsertCoin() {
    document.getElementById('insert-coin-overlay').classList.add('active');
    document.querySelector('.coin').classList.remove('inserted');
}

function insertCoinAction() {
    let coin = document.querySelector('.coin');
    coin.classList.add('inserted'); 
    
    let audio = new Audio('https://freesound.org/data/previews/276/276091_5123851-lq.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio bloqueado por navegador"));

    setTimeout(() => {
        document.getElementById('insert-coin-overlay').classList.remove('active');
        resetIdleTimer();
    }, 600); 
}

['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, () => {
        if (!document.getElementById('insert-coin-overlay').classList.contains('active')) {
            resetIdleTimer();
        }
    });
});
