let cart = JSON.parse(localStorage.getItem('retrorevive_cart')) || [];
let total = 0;
const BUSINESS_PHONE = "526675912648"; 
let viewHistory = ['consolas'];
let isAscending = true; // true = Más antiguo a más nuevo (▲), false = Más nuevo a más antiguo (▼)
let searchQuery = "";
let currentBrandFilter = "todas"; // Filtro de marca actual

// 1. LAS 100 FRASES ÉPICAS EN ESPAÑOL
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
    "«La locura es hacer exactamente lo mismo una y otra vez esperando que algo cambie.» - Vaas (Far Cry 3)",
    "«El mundo no necesita héroes, necesita profesionales.» - Geralt de Rivia (The Witcher 3)",
    "«El verdadero coraje es saber cuándo perdonar.» - Ellie (The Last of Us Part II)",
    "«Sobrevivir es vencer.» - Lara Croft (Tomb Raider)",
    "«¡Alabado sea el sol!» - Solaire de Astora (Dark Souls)",
    "«La oscuridad no puede derrotar a la luz.» - Sora (Kingdom Hearts)",
    "«Toda leyenda tiene un comienzo.» - Narrador (Fable)",
    "«¡No estáis preparados!» - Illidan Tempestira (World of Warcraft)",
    "«Un rey debe reinar, pero un héroe debe proteger.» - Rey (Dragon Quest)",
    "«La lealtad no es una palabra, es un estilo de vida.» - John Marston (Red Dead Redemption)",
    "«Nuestra sangre nos define, pero nuestras acciones nos moldean.» - Alucard (Castlevania)",
    "«Tus pecados te perseguirán hasta el fin del mundo.» - Pyramid Head (Silent Hill 2)",
    "«Me pregunto... ¿Habrás sobrevivido?» - Albert Wesker (Resident Evil 5)",
    "«La familia lo es todo.» - Dominic Santiago (Gears of War)",
    "«Los Spartans nunca mueren, solo desaparecen en combate.» - Comando UNSC (Halo)",
    "«El mundo podría necesitar más héroes.» - Tracer (Overwatch)",
    "«Incluso en el infierno, los demonios lloran.» - Dante (Devil May Cry)",
    "«No hay luz sin oscuridad.» - Xehanort (Kingdom Hearts)",
    "«Morir es fácil. Sobrevivir es lo difícil.» - Joel (The Last of Us)",
    "«Encuentra algo por lo que luchar.» - Cloud Strife (Final Fantasy VII)",
    "«Este es mi mundo, y en mi mundo, yo soy dios.» - Sephiroth (Final Fantasy VII)",
    "«El coraje es la magia que convierte los sueños en realidad.» - Richter (Tales of Symphonia)",
    "«Soy la tormenta que se acerca.» - Vergil (Devil May Cry 5)",
    "«Mantén la cabeza fría, o perderás la cabeza.» - Capitán Price (Call of Duty)",
    "«Para sobrevivir, tienes que pelear.» - Ellie (The Last of Us)",
    "«Mantenemos la línea.» - Capitán Kirrahe (Mass Effect)",
    "«Siempre hay un faro. Siempre hay un hombre. Siempre hay una ciudad.» - Elizabeth (BioShock Infinite)",
    "«Cada vida tiene un propósito.» - Connor (Detroit: Become Human)",
    "«Confía en tu instinto.» - Peppy Hare (Star Fox 64)",
    "«Lucharé hasta el final.» - Ryu (Street Fighter)",
    "«Nuestra venganza será nuestra salvación.» - Kerrigan (StarCraft)",
    "«Las sombras son mis aliadas.» - Sam Fisher (Splinter Cell)",
    "«El final no es más que un nuevo comienzo.» - Amaterasu (Okami)",
    "«La vida es una aventura, disfrútala.» - Nathan Drake (Uncharted)",
    "«El acero gana las batallas, el oro gana las guerras.» - Davion (Dota 2)",
    "«El pasado es un rompecabezas, como un espejo roto.» - Max Payne (Max Payne)",
    "«Atrévete a soñar en un mundo lleno de pesadillas.» - Mensajero (Bloodborne)",
    "«Nadie puede ocultarse de mis ojos.» - Widowmaker (Overwatch)",
    "«Es hora de despertar.» - G-Man (Half-Life 2)",
    "«Un buen soldado obedece órdenes. Un gran soldado sabe cuándo ignorarlas.» - Comandante Shepard (Mass Effect)",
    "«La perfección es una ilusión.» - Zenyatta (Overwatch)",
    "«Incluso un alma perdida puede encontrar su camino.» - Guardiana del Fuego (Dark Souls)",
    "«Acepta tu destino.» - Ifrit (Final Fantasy)",
    "«No me arrepiento de nada.» - Postal Dude (Postal)",
    "«Un verdadero guerrero no tiene espada, su mente es el arma.» - Monje (Diablo)",
    "«El deber lo es todo.» - Soldado 76 (Overwatch)",
    "«El dolor es temporal, la victoria es eterna.» - Sargento Johnson (Halo)",
    "«Todo aquello que no te mata, te hace más fuerte.» - Albert Wesker (Resident Evil)",
    "«El coraje no es la ausencia de miedo, es el miedo enfrentado.» - Zavala (Destiny)",
    "«Una mente fuerte es el arma más letal.» - Jett (Valorant)",
    "«Si nuestras vidas ya están escritas, tomaría una pluma para reescribirlas.» - Alan Wake (Alan Wake)",
    "«Enemigo abatido.» - Francotirador (Battlefield)",
    "«La mente es un lugar peligroso.» - Senua (Hellblade)",
    "«No hay futuro, solo el presente.» - Lightning (Final Fantasy XIII)",
    "«La máquina es fuerte, pero la carne es terca.» - Mechanicus (Warhammer 40k)",
    "«He dudado, y la duda es la muerte.» - Sekiro (Sekiro)",
    "«Si hay algo que he aprendido, es que creamos nuestro propio futuro.» - Master Chief (Halo 4)",
    "«Lucho por los que no pueden luchar por sí mismos.» - Diana (League of Legends)",
    "«El tiempo no perdona.» - Ekko (League of Legends)",
    "«Nadie muere virgen, la vida nos jode a todos.» - Cyberpunk 2077 (Johnny Silverhand)",
    "«A veces, perder es el camino a la victoria.» - Sam Porter Bridges (Death Stranding)",
    "«Tus acciones decidirán el destino del mundo.» - Narrador (Fable)",
    "«No dejes que tu corazón se llene de odio.» - Bayek (Assassin's Creed Origins)",
    "«El mayor enemigo es el que se esconde dentro.» - Revan (Star Wars: KOTOR)",
    "«Somos ladrones en un mundo que no nos quiere.» - Arthur Morgan (Red Dead Redemption 2)",
    "«La justicia no es ciega, tú lo eres.» - Illidan Tempestira (World of Warcraft)",
    "«Yo soy la luz en la oscuridad.» - Jin Sakai (Ghost of Tsushima)",
    "«La verdad no importa. Lo que importa es lo que crees.» - Cole Phelps (L.A. Noire)",
    "«Un héroe nunca se rinde.» - Link (The Legend of Zelda)",
    "«He venido a recuperar lo que es mío.» - Corvo Attano (Dishonored)",
    "«No somos herramientas del gobierno o de nadie más.» - Big Boss (Metal Gear Solid)",
    "«Mi espada está a tu servicio.» - Garen (League of Legends)",
    "«El miedo es el asesino de la mente.» - Psycho Mantis (Metal Gear Solid)",
    "«Tu princesa está en otro castillo.» - Toad (Super Mario Bros.)"
];

function setRandomSlogan() {
    const text = slogans[Math.floor(Math.random() * slogans.length)];
    document.getElementById('dynamic-slogan').innerText = text;
}

// 2. BASE DE DATOS DE CONSOLAS COMPLETAS (106 Consolas)
const consolasDB = [
    { name: "Magnavox Odyssey", year: 1972, price: 12000, img: "img/magnavox_odyssey.jpg", inc: ["Consola Magnavox Odyssey", "2 Mandos integrados", "Cable RF para TV moderna", "Baterías", "Overlays"] },
    { name: "Home Pong", year: 1975, price: 3500, img: "img/home_pong.jpg", inc: ["Consola Home Pong", "Cable RF", "Eliminador AC"] },
    { name: "Coleco Telstar", year: 1976, price: 2500, img: "img/coleco_telstar.jpg", inc: ["Consola Coleco Telstar", "Cable RF coaxial", "Eliminador de pared"] },
    { name: "Fairchild Channel F", year: 1976, price: 4000, img: "img/fairchild.jpg", inc: ["Consola Channel F", "2 Joysticks", "Cable de antena", "Fuente"] },
    { name: "RCA Studio II", year: 1977, price: 3000, img: "img/rca_studio.jpg", inc: ["Consola RCA", "Cable RF", "Adaptador AC"] },
    { name: "Atari 2600", year: 1977, price: 1500, img: "img/atari_2600.jpg", inc: ["Consola Atari CX2600", "1 Joystick CX40", "Cable RF", "Eliminador 9V"] },
    { name: "Bally Astrocade", year: 1977, price: 5000, img: "img/bally.jpg", inc: ["Consola Bally Astrocade", "Mando pistola", "Cable de video", "Fuente"] },
    { name: "APF-MP1000", year: 1978, price: 3500, img: "img/apf.jpg", inc: ["Consola APF", "2 Joysticks", "Cable de video", "Eliminador AC"] },
    { name: "Magnavox Odyssey²", year: 1978, price: 2500, img: "img/odyssey2.jpg", inc: ["Consola Odyssey²", "2 Joysticks y Teclado", "Cable RF", "Fuente de poder"] },
    { name: "Philips Odyssey 2000", year: 1977, price: 3000, img: "img/philips.jpg", inc: ["Consola Philips", "Mandos giratorios", "Cable y eliminador"] },
    { name: "Intellivision", year: 1979, price: 2000, img: "img/intellivision.jpg", inc: ["Consola Intellivision", "Mandos con disco", "Cable de antena", "Corriente"] },
    { name: "Microvision", year: 1979, price: 3500, img: "img/microvision.jpg", inc: ["Portátil Microvision", "Batería instalada", "Cartucho Blockbuster"] },
    { name: "Game & Watch", year: 1980, price: 2500, img: "img/game_watch.jpg", inc: ["Consola G&W", "Baterías LR44", "Tapa"] },
    { name: "Epoch Cassette Vision", year: 1981, price: 4000, img: "img/epoch.jpg", inc: ["Consola Epoch", "Cable de video", "Adaptador AC"] },
    { name: "VTech CreatiVision", year: 1981, price: 3000, img: "img/vtech.jpg", inc: ["Consola VTech", "Cable RF", "Fuente"] },
    { name: "Emerson Arcadia 2001", year: 1982, price: 2500, img: "img/emerson.jpg", inc: ["Consola Emerson", "2 Mandos", "Cable de antena", "Eliminador 12V"] },
    { name: "Atari 5200", year: 1982, price: 3000, img: "img/atari_5200.jpg", inc: ["Consola Atari 5200", "1 Mando analógico", "Caja Switch TV/Juego", "Fuente"] },
    { name: "ColecoVision", year: 1982, price: 2500, img: "img/colecovision.jpg", inc: ["Consola ColecoVision", "1 Mando arcade", "Cable RF", "Fuente original"] },
    { name: "Vectrex", year: 1982, price: 10000, img: "img/vectrex.jpg", inc: ["Consola Vectrex", "1 Control análogo", "Cable de corriente directo"] },
    { name: "Casio PV-1000", year: 1983, price: 5000, img: "img/casio_pv.jpg", inc: ["Consola Casio", "1 Mando", "Cable de video", "Eliminador AC"] },
    { name: "Nintendo Famicom", year: 1983, price: 1800, img: "img/famicom.jpg", inc: ["Consola Famicom Japonesa", "2 Mandos integrados", "Cable RCA", "Adaptador"] },
    { name: "Sega SG-1000", year: 1983, price: 3000, img: "img/sg1000.jpg", inc: ["Consola SG-1000", "1 Joystick", "Cable a TV", "Adaptador AC"] },
    { name: "Tomy Tutor", year: 1983, price: 2500, img: "img/tomy_tutor.jpg", inc: ["Consola Tomy", "Cable RF", "Eliminador"] },
    { name: "Casio PV-2000", year: 1983, price: 3000, img: "img/casio_pv2000.jpg", inc: ["Consola Casio", "1 Gamepad", "Cable AV", "Fuente de poder"] },
    { name: "Nintendo NES", year: 1985, price: 1800, img: "img/nes.jpg", inc: ["Consola NES", "1 Control original", "Cable RCA", "Eliminador"] },
    { name: "Sega Mark III", year: 1985, price: 3500, img: "img/mark3.jpg", inc: ["Consola Mark III", "1 Pad", "Cables AV y Fuente"] },
    { name: "Sega Master System", year: 1985, price: 2500, img: "img/master_system.jpg", inc: ["Consola SMS", "1 Control Pad", "Cable AV RCA", "Eliminador"] },
    { name: "Atari 7800", year: 1984, price: 2000, img: "img/atari_7800.jpg", inc: ["Consola 7800", "1 Joystick", "Cable RF", "Adaptador"] },
    { name: "Amstrad GX4000", year: 1990, price: 4500, img: "img/amstrad.jpg", inc: ["Consola GX4000", "1 Control", "Cable AV y Fuente"] },
    { name: "Atari Lynx", year: 1989, price: 3500, img: "img/lynx.jpg", inc: ["Portátil Lynx", "Baterías AA", "Cargador AC"] },
    { name: "Game Boy Clásico", year: 1989, price: 1500, img: "img/gameboy.jpg", inc: ["Portátil Game Boy", "4 Baterías AA", "Tapa"] },
    { name: "TurboGrafx-16", year: 1987, price: 3000, img: "img/turbografx.jpg", inc: ["Consola TurboGrafx", "1 TurboPad", "Cable RF y Eliminador"] },
    { name: "Sega Genesis", year: 1988, price: 1500, img: "img/genesis.jpg", inc: ["Consola Genesis", "1 Control 3 botones", "Cable AV", "Eliminador de pared"] },
    { name: "Neo Geo AES", year: 1990, price: 18000, img: "img/neogeo.jpg", inc: ["Consola AES", "1 Arcade Stick", "Cable AV", "Fuente original"] },
    { name: "Super Nintendo (SNES)", year: 1990, price: 2200, img: "img/snes.jpg", inc: ["Consola SNES", "1 Control original", "Cable RCA", "Eliminador"] },
    { name: "Commodore CDTV", year: 1991, price: 8000, img: "img/cdtv.jpg", inc: ["Consola CDTV", "Mando a distancia", "Cable AV", "Cable Corriente"] },
    { name: "Philips CD-i", year: 1991, price: 5000, img: "img/cdi.jpg", inc: ["Consola CD-i", "Control remoto", "Cable RCA", "Cable Corriente"] },
    { name: "Sega CD", year: 1991, price: 4500, img: "img/segacd.jpg", inc: ["Sega CD", "Cable pasante", "Fuente de poder"] },
    { name: "Sega Pico", year: 1993, price: 1500, img: "img/pico.jpg", inc: ["Consola Pico", "Lápiz óptico", "Cable de video", "Eliminador"] },
    { name: "3DO Interactive", year: 1993, price: 4000, img: "img/3do.jpg", inc: ["Consola 3DO", "1 Control", "Cable AV", "Cable de poder"] },
    { name: "Atari Jaguar", year: 1993, price: 6000, img: "img/jaguar.jpg", inc: ["Consola Jaguar", "1 Control", "Cable RF", "Fuente"] },
    { name: "Amiga CD32", year: 1993, price: 7000, img: "img/amigacd32.jpg", inc: ["Consola CD32", "1 Mando", "Cable AV", "Fuente"] },
    { name: "FM Towns Marty", year: 1993, price: 15000, img: "img/fmtowns.jpg", inc: ["Consola FM Towns", "1 Control Pad", "Cable AV", "Corriente"] },
    { name: "Sega Saturn", year: 1994, price: 3500, img: "img/saturn.jpg", inc: ["Consola Saturn", "1 Control", "Cable RCA", "Cable de poder"] },
    { name: "PlayStation (PS1)", year: 1994, price: 1200, img: "img/ps1.jpg", inc: ["Consola PS1", "1 Control DualShock", "Cable AV", "Cable Corriente"] },
    { name: "Neo Geo CD", year: 1994, price: 8000, img: "img/neogeocd.jpg", inc: ["Consola Neo Geo CD", "1 Pad", "Cable AV", "Fuente de poder"] },
    { name: "PC-FX", year: 1994, price: 6000, img: "img/pcfx.jpg", inc: ["Consola PC-FX", "1 Mando FX-PAD", "Cable AV", "Corriente"] },
    { name: "Sega 32X", year: 1994, price: 3500, img: "img/sega32x.jpg", inc: ["Módulo 32X", "Cable pasante", "Fuente propia"] },
    { name: "Virtual Boy", year: 1995, price: 8000, img: "img/virtualboy.jpg", inc: ["Consola Virtual Boy", "Trípode", "Control", "Adaptador AC"] },
    { name: "Casio Loopy", year: 1995, price: 4000, img: "img/loopy.jpg", inc: ["Consola Loopy", "1 Mando", "Cables AV y Fuente"] },
    { name: "Nintendo 64", year: 1996, price: 2500, img: "img/n64.jpg", inc: ["Consola N64", "1 Control original", "Cable RCA", "Fuente Nintendo"] },
    { name: "Game.com", year: 1997, price: 2000, img: "img/gamecom.jpg", inc: ["Portátil Game.com", "Stylus", "Baterías"] },
    { name: "Game Boy Light", year: 1998, price: 3500, img: "img/gblight.jpg", inc: ["Consola GB Light", "Pilas instaladas", "Tapa"] },
    { name: "Sega Dreamcast", year: 1998, price: 3000, img: "img/dreamcast.jpg", inc: ["Consola Dreamcast", "1 Control", "Cable RCA", "Corriente"] },
    { name: "Game Boy Color", year: 1998, price: 1800, img: "img/gbc.jpg", inc: ["Consola GBC", "Baterías nuevas", "Tapa"] },
    { name: "Neo Geo Pocket", year: 1998, price: 2500, img: "img/ngp.jpg", inc: ["Portátil NGP", "Pilas instaladas"] },
    { name: "WonderSwan", year: 1999, price: 2000, img: "img/wonderswan.jpg", inc: ["Portátil WonderSwan", "Batería instalada"] },
    { name: "Neo Geo Pocket Color", year: 1999, price: 3000, img: "img/ngpc.jpg", inc: ["Portátil NGPC", "Pilas", "Tapa"] },
    { name: "PlayStation 2", year: 2000, price: 1500, img: "img/ps2.jpg", inc: ["Consola PS2", "1 Control DualShock 2", "Cable AV", "Corriente o Eliminador"] },
    { name: "Nintendo GameCube", year: 2001, price: 2800, img: "img/gamecube.jpg", inc: ["Consola GameCube", "1 Control original", "Cable AV", "Fuente externa"] },
    { name: "Microsoft Xbox", year: 2001, price: 2000, img: "img/xbox.jpg", inc: ["Consola Xbox", "1 Control", "Cable AV", "Cable de pared"] },
    { name: "Game Boy Advance", year: 2001, price: 1500, img: "img/gba.jpg", inc: ["Consola GBA", "Baterías", "Tapa"] },
    { name: "Pokémon mini", year: 2001, price: 2500, img: "img/pokemonmini.jpg", inc: ["Consola mini", "Pila nueva"] },
    { name: "Nokia N-Gage", year: 2003, price: 3000, img: "img/ngage.jpg", inc: ["Teléfono N-Gage", "Batería", "Cargador"] },
    { name: "Game Boy Advance SP", year: 2003, price: 2000, img: "img/gbasp.jpg", inc: ["Consola GBA SP", "Batería", "Cargador original"] },
    { name: "Nintendo DS", year: 2004, price: 1000, img: "img/nds.jpg", inc: ["Consola NDS", "Stylus", "Cargador"] },
    { name: "PSP", year: 2004, price: 1500, img: "img/psp.jpg", inc: ["Consola PSP", "Batería", "Cargador 5V"] },
    { name: "Game Boy Micro", year: 2005, price: 3500, img: "img/gbmicro.jpg", inc: ["Consola GB Micro", "Cargador Micro"] },
    { name: "Gizmondo", year: 2005, price: 5000, img: "img/gizmondo.jpg", inc: ["Consola Gizmondo", "Batería", "Cargador"] },
    { name: "Xbox 360", year: 2005, price: 1800, img: "img/xbox360.jpg", inc: ["Consola 360", "1 Control inalámbrico", "Cable HD/HDMI", "Fuente original"] },
    { name: "PlayStation 3", year: 2006, price: 2200, img: "img/ps3.jpg", inc: ["Consola PS3", "1 Control DualShock 3", "Cable carga, HDMI y Corriente"] },
    { name: "Nintendo Wii", year: 2006, price: 1200, img: "img/wii.jpg", inc: ["Consola Wii", "Wiimote + Nunchuk", "Barra", "Cable AV y Fuente"] },
    { name: "Nintendo DSi", year: 2008, price: 1200, img: "img/dsi.jpg", inc: ["Consola DSi", "Stylus", "Cargador"] },
    { name: "PSP Go", year: 2009, price: 2500, img: "img/pspgo.jpg", inc: ["Consola PSP Go", "Cable USB/Carga propietario"] },
    { name: "Nintendo DSi XL", year: 2009, price: 1500, img: "img/dsixl.jpg", inc: ["Consola DSi XL", "Stylus", "Cargador"] },
    { name: "Nintendo 3DS", year: 2011, price: 2200, img: "img/3ds.jpg", inc: ["Consola 3DS", "Stylus", "Cargador"] },
    { name: "PlayStation Vita", year: 2011, price: 3000, img: "img/psvita.jpg", inc: ["Consola PS Vita", "Cable de carga", "Cargador"] },
    { name: "Nintendo 3DS XL", year: 2012, price: 2800, img: "img/3dsxl.jpg", inc: ["Consola 3DS XL", "Stylus", "Cargador"] },
    { name: "Wii U", year: 2012, price: 3500, img: "img/wiiu.jpg", inc: ["Consola Wii U", "Wii U GamePad", "Cargador Gamepad", "HDMI y Fuente"] },
    { name: "PlayStation TV", year: 2013, price: 2500, img: "img/pstv.jpg", inc: ["Microconsola PS TV", "Cable HDMI", "Eliminador"] },
    { name: "PlayStation 4", year: 2013, price: 3500, img: "img/ps4.jpg", inc: ["Consola PS4", "1 Control DualShock 4", "HDMI, Carga y Corriente"] },
    { name: "Xbox One", year: 2013, price: 2800, img: "img/xboxone.jpg", inc: ["Consola Xbox One", "1 Control", "Cable HDMI", "Fuente y Cable AC"] },
    { name: "Nintendo 2DS", year: 2013, price: 1500, img: "img/2ds.jpg", inc: ["Consola 2DS", "Stylus", "Cargador"] },
    { name: "Ouya", year: 2013, price: 1200, img: "img/ouya.jpg", inc: ["Consola Ouya", "1 Mando original", "Cable HDMI", "Eliminador"] },
    { name: "PS Vita Slim", year: 2013, price: 2800, img: "img/psvitaslim.jpg", inc: ["Consola PS Vita Slim", "Cable Micro-USB", "Cargador"] },
    { name: "New Nintendo 3DS", year: 2014, price: 3500, img: "img/new3ds.jpg", inc: ["Consola New 3DS", "Stylus", "Cargador"] },
    { name: "New Nintendo 3DS XL", year: 2014, price: 4000, img: "img/new3dsxl.jpg", inc: ["Consola New 3DS XL", "Stylus", "Cargador"] },
    { name: "PlayStation 4 Slim", year: 2016, price: 4000, img: "img/ps4slim.jpg", inc: ["Consola PS4 Slim", "1 Control", "HDMI, Carga y Corriente"] },
    { name: "PlayStation 4 Pro", year: 2016, price: 5000, img: "img/ps4pro.jpg", inc: ["Consola PS4 Pro", "1 Control", "HDMI 4K", "Cable Corriente"] },
    { name: "Xbox One S", year: 2016, price: 3500, img: "img/xboxones.jpg", inc: ["Consola Xbox One S", "1 Control", "Cable HDMI", "Corriente"] },
    { name: "Nintendo Switch", year: 2017, price: 4500, img: "img/switch.jpg", inc: ["Tableta Switch", "2 Joy-Cons", "Dock", "Cargador", "HDMI"] },
    { name: "Xbox One X", year: 2017, price: 4500, img: "img/xboxonex.jpg", inc: ["Consola Xbox One X", "1 Control", "HDMI 4K", "Corriente"] },
    { name: "Nintendo Switch Lite", year: 2019, price: 3000, img: "img/switchlite.jpg", inc: ["Consola Switch Lite", "Cargador oficial USB-C"] },
    { name: "PlayStation 5", year: 2020, price: 8500, img: "img/ps5.jpg", inc: ["Consola PS5", "1 Control DualSense", "Cable USB-C", "HDMI 2.1", "Corriente"] },
    { name: "Xbox Series X", year: 2020, price: 8000, img: "img/xboxseriesx.jpg", inc: ["Consola Series X", "1 Control Series", "HDMI Ultra", "Poder"] },
    { name: "Xbox Series S", year: 2020, price: 4500, img: "img/xboxseriess.jpg", inc: ["Consola Series S", "1 Control", "Cable HDMI", "Poder"] },
    { name: "Nintendo Switch OLED", year: 2021, price: 6000, img: "img/switcholed.jpg", inc: ["Consola Switch OLED", "2 Joy-Cons", "Dock", "HDMI", "Cargador"] },
    { name: "Steam Deck", year: 2022, price: 7000, img: "img/steamdeck.jpg", inc: ["Consola Steam Deck", "Funda", "Cargador rápido"] },
    { name: "ASUS ROG Ally", year: 2023, price: 9000, img: "img/rogally.jpg", inc: ["Consola ROG Ally", "Cargador rápido Type-C"] },
    { name: "Lenovo Legion Go", year: 2023, price: 11000, img: "img/legiongo.jpg", inc: ["Consola Legion Go", "Mandos extraíbles", "Cargador"] },
    { name: "Steam Deck OLED", year: 2023, price: 10000, img: "img/steamdeckoled.jpg", inc: ["Consola Steam Deck OLED", "Cargador rápido"] },
    { name: "PlayStation 5 Slim", year: 2023, price: 9000, img: "img/ps5slim.jpg", inc: ["Consola PS5 Slim", "1 Control DualSense", "Cables y soportes"] },
    { name: "ASUS ROG Ally X", year: 2024, price: 15000, img: "img/rogallyx.jpg", inc: ["Consola ROG Ally X", "Cargador rápido"] },
    { name: "PlayStation 5 Pro", year: 2024, price: 16000, img: "img/ps5pro.jpg", inc: ["Consola PS5 Pro", "1 Control DualSense", "Cables de alta velocidad"] },
    { name: "MSI Claw", year: 2024, price: 12000, img: "img/msiclaw.jpg", inc: ["Consola MSI Claw", "Cargador rápido"] },
    { name: "Nintendo Switch 2", year: 2025, price: 9500, img: "img/switch2.jpg", inc: ["Consola Switch 2", "Joy-Cons magnéticos", "Dock", "Cargador y HDMI"] }
];

// 3. LIBRERÍAS DE JUEGOS REALES POR FAMILIA
const libreriasReales = {
    ps5: [{n:"Marvel's Spider-Man 2",p:1200},{n:"Final Fantasy XVI",p:1100},{n:"Demon's Souls",p:900},{n:"Ratchet & Clank: Rift Apart",p:800},{n:"Stellar Blade",p:1300},{n:"Astro Bot",p:1200},{n:"Helldivers 2",p:800},{n:"Rise of the Ronin",p:1200},{n:"Horizon Forbidden West",p:900},{n:"God of War Ragnarök",p:1000},{n:"Gran Turismo 7",p:900},{n:"The Last of Us Part I",p:1000},{n:"Ghost of Tsushima Director's Cut",p:800},{n:"Returnal",p:700},{n:"Death Stranding 2",p:1400}],
    ps4: [{n:"God of War",p:350},{n:"The Last of Us Part II",p:500},{n:"Marvel's Spider-Man",p:400},{n:"Red Dead Redemption 2",p:450},{n:"Bloodborne",p:350},{n:"Uncharted 4: A Thief's End",p:300},{n:"Horizon Zero Dawn",p:300},{n:"Persona 5",p:350},{n:"The Witcher 3: Wild Hunt",p:400},{n:"Ghost of Tsushima",p:500},{n:"Grand Theft Auto V",p:350},{n:"Final Fantasy VII Remake",p:450},{n:"God of War Ragnarök (PS4)",p:800},{n:"Sekiro: Shadows Die Twice",p:600},{n:"Resident Evil 2 Remake",p:450}],
    ps3: [{n:"The Last of Us",p:300},{n:"Uncharted 2: Among Thieves",p:250},{n:"Metal Gear Solid 4",p:250},{n:"God of War III",p:250},{n:"Demon's Souls",p:400},{n:"Infamous 2",p:250},{n:"LittleBigPlanet 2",p:250},{n:"Killzone 2",p:200},{n:"Resistance 3",p:250},{n:"Heavy Rain",p:250},{n:"Journey",p:400},{n:"Persona 5 (PS3)",p:450},{n:"Ratchet & Clank Future",p:350},{n:"Gran Turismo 5",p:200},{n:"MotorStorm",p:200}],
    ps2: [{n:"GTA: San Andreas",p:300},{n:"Metal Gear Solid 3",p:400},{n:"Shadow of the Colossus",p:450},{n:"Silent Hill 2",p:2000},{n:"Resident Evil 4",p:350},{n:"God of War II",p:300},{n:"Final Fantasy X",p:250},{n:"Kingdom Hearts",p:300},{n:"Gran Turismo 4",p:200},{n:"Devil May Cry 3",p:300},{n:"Bully",p:350},{n:"Okami",p:400},{n:"Ratchet & Clank: Up Your Arsenal",p:350},{n:"Sly 2: Band of Thieves",p:350},{n:"Jak II",p:300}],
    ps1: [{n:"Metal Gear Solid",p:600},{n:"Final Fantasy VII",p:700},{n:"Castlevania: Symphony of the Night",p:2000},{n:"Resident Evil 2",p:650},{n:"Crash Bandicoot",p:500},{n:"Tekken 3",p:400},{n:"Silent Hill",p:2500},{n:"Gran Turismo 2",p:300},{n:"Spyro the Dragon",p:450},{n:"Tomb Raider",p:350},{n:"Tony Hawk's Pro Skater 2",p:300},{n:"Chrono Cross",p:600},{n:"Street Fighter Alpha 3",p:700},{n:"Suikoden II",p:3000},{n:"Twisted Metal 2",p:400}],
    psp: [{n:"God of War: Ghost of Sparta",p:600},{n:"Metal Gear Solid: Peace Walker",p:500},{n:"GTA: Vice City Stories",p:400},{n:"Crisis Core: Final Fantasy VII",p:500},{n:"Persona 3 Portable",p:1200},{n:"Kingdom Hearts: Birth by Sleep",p:400},{n:"Monster Hunter Freedom Unite",p:300},{n:"Daxter",p:250},{n:"Patapon",p:300},{n:"LocoRoco",p:250},{n:"Dissidia 012 Final Fantasy",p:400},{n:"Tekken 6",p:350},{n:"Silent Hill: Origins",p:600},{n:"Castlevania: Dracula X Chronicles",p:800},{n:"Lumines",p:200}],
    psvita: [{n:"Persona 4 Golden",p:800},{n:"Uncharted: Golden Abyss",p:600},{n:"Gravity Rush",p:700},{n:"Killzone: Mercenary",p:600},{n:"Tearaway",p:500},{n:"Danganronpa: Trigger Happy Havoc",p:600},{n:"Final Fantasy X/X-2 HD Remaster",p:500},{n:"Soul Sacrifice Delta",p:700},{n:"Freedom Wars",p:400},{n:"Muramasa Rebirth",p:900},{n:"Ys VIII: Lacrimosa of DANA",p:1000},{n:"Dragon's Crown",p:600},{n:"LittleBigPlanet PS Vita",p:400},{n:"Wipeout 2048",p:500},{n:"Spelunky",p:400}],
    xbox_series: [{n:"Halo Infinite",p:800},{n:"Forza Horizon 5",p:900},{n:"Starfield",p:1000},{n:"Microsoft Flight Simulator",p:900},{n:"Senua's Saga: Hellblade II",p:900},{n:"Sea of Thieves",p:600},{n:"Gears 5",p:400},{n:"Hi-Fi Rush",p:500},{n:"Grounded",p:600},{n:"Diablo IV",p:1200},{n:"DOOM Eternal",p:500},{n:"Cyberpunk 2077 (Next Gen)",p:800},{n:"Resident Evil 4 Remake",p:1000},{n:"Hogwarts Legacy",p:1100},{n:"Ori and the Will of the Wisps",p:400}],
    xbox_one: [{n:"Halo: The Master Chief Collection",p:400},{n:"Forza Horizon 4",p:500},{n:"Gears of War 4",p:300},{n:"Quantum Break",p:300},{n:"Sunset Overdrive",p:250},{n:"Halo 5: Guardians",p:250},{n:"Forza Motorsport 7",p:450},{n:"Ryse: Son of Rome",p:250},{n:"State of Decay 2",p:300},{n:"Killer Instinct",p:250},{n:"Rare Replay",p:300},{n:"Cuphead",p:350},{n:"Titanfall 2",p:250},{n:"Dead Rising 3",p:300},{n:"Ori and the Blind Forest",p:300}],
    xbox_360: [{n:"Halo 3",p:200},{n:"Gears of War 2",p:200},{n:"Mass Effect 2",p:250},{n:"Red Dead Redemption",p:300},{n:"The Elder Scrolls V: Skyrim",p:250},{n:"Bioshock",p:250},{n:"Grand Theft Auto IV",p:300},{n:"Fallout 3",p:250},{n:"Call of Duty: Modern Warfare 2",p:200},{n:"Left 4 Dead 2",p:350},{n:"Batman: Arkham City",p:250},{n:"Forza Horizon",p:350},{n:"Alan Wake",p:300},{n:"Dead Space",p:250},{n:"Fable II",p:200}],
    xbox_orig: [{n:"Halo: Combat Evolved",p:300},{n:"Halo 2",p:350},{n:"Fable",p:250},{n:"Star Wars: Knights of the Old Republic",p:400},{n:"Ninja Gaiden Black",p:350},{n:"Tom Clancy's Splinter Cell",p:200},{n:"Forza Motorsport",p:250},{n:"Project Gotham Racing 2",p:200},{n:"Jade Empire",p:300},{n:"Crimson Skies",p:250},{n:"The Chronicles of Riddick",p:300},{n:"Doom 3",p:250},{n:"Jet Set Radio Future",p:600},{n:"Shenmue II",p:400},{n:"Burnout 3: Takedown",p:300}],
    switch: [{n:"Zelda: Breath of the Wild",p:900},{n:"Super Mario Odyssey",p:900},{n:"Mario Kart 8 Deluxe",p:1000},{n:"Super Smash Bros. Ultimate",p:1100},{n:"Animal Crossing: New Horizons",p:900},{n:"Pokémon Legends: Arceus",p:800},{n:"Metroid Dread",p:750},{n:"Splatoon 3",p:900},{n:"Xenoblade Chronicles 3",p:800},{n:"Fire Emblem: Three Houses",p:850},{n:"Luigi's Mansion 3",p:800},{n:"Super Mario Bros. Wonder",p:1000},{n:"Monster Hunter Rise",p:600},{n:"Zelda: Tears of the Kingdom",p:1100},{n:"Mario Kart 9 (Switch 2)",p:1500}],
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

function getTop15Games(consoleName) {
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

// 4. LÓGICA DE ORDENAMIENTO, BÚSQUEDA Y FILTROS POR MARCA
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
        let consoleName = titleText.replace("TOP 15 JUEGOS: ", "");
        renderTopJuegosFiltered(consoleName);
    }
}

// Cálculo del descuento de "Solo Consola" basado en el precio
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

function getImgSrc(imgName) {
    return `onerror="this.onerror=null; this.src='https://placehold.co/600x400/2d3748/cbd5e0?text=FOTO+PENDIENTE';" src="${imgName}"`;
}

function renderConsolas() {
    const container = document.getElementById('catalogo-consolas');
    
    // Filtrar la base de datos
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
    
    // Ordenar
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

        // Se agregan dos botones limpios: Uno de paquete y uno de solo máquina
        html += `
        <div class="card">
            <img ${getImgSrc(c.img)} alt="${c.name}" class="static-image">
            <span class="badge-estado">Año ${c.year}</span>
            <h3>${c.name}</h3>
            <details>
                <summary>¿Qué incluye?</summary>
                <ul>${incItems}</ul>
            </details>
            <span class="price">$${c.price.toFixed(2)}</span>
            <div class="buy-options">
                <button class="add-btn" onclick="addSingleProductToCart('${c.name.replace(/'/g, "\\'")}', ${c.price})">+ COMPLETA</button>
                <button class="add-btn btn-outline" onclick="addSingleProductToCart('${soloName.replace(/'/g, "\\'")}', ${c.price - discount})">+ SÓLO CONSOLA (-$${discount})</button>
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
            <img ${getImgSrc(c.img)} alt="${c.name}" class="static-image">
            <span class="badge-estado">${c.year}</span>
            <h3>${c.name}</h3>
            <p style="color: var(--accent-cyan); font-size: 0.8rem; margin-top: auto; font-weight: bold;">VER TOP 15 JUEGOS →</p>
        </div>`;
    });
    container.innerHTML = html;
}

function openTopJuegos(consoleName) {
    document.getElementById('juegos-consolas-list').style.display = 'none';
    document.getElementById('juegos-detalles-view').style.display = 'block';
    document.getElementById('juegos-consola-titulo').innerText = `TOP 15 JUEGOS: ${consoleName.toUpperCase()}`;
    
    document.getElementById('back-bar').style.display = 'block';
    if (viewHistory[viewHistory.length - 1] !== 'juegos-detalle') {
        viewHistory.push('juegos-detalle');
    }

    renderTopJuegosFiltered(consoleName);
}

function renderTopJuegosFiltered(consoleName) {
    const listContainer = document.getElementById('lista-top-juegos');
    let games = getTop15Games(consoleName);

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

    // Mostrar barra de filtros si no es servicios
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

// 7. CARRITO Y CANTIDADES (Adaptado a botones limpios)
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
    
    // Si la función fue llamada desde el Modal o Servicios, actualizamos visualmente
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
    idleTimer = setTimeout(triggerInsertCoin, 120000); // 120000ms = 2 Minutos
}

function triggerInsertCoin() {
    document.getElementById('insert-coin-overlay').classList.add('active');
    document.querySelector('.coin').classList.remove('inserted');
}

function insertCoinAction() {
    let coin = document.querySelector('.coin');
    coin.classList.add('inserted'); // Ejecuta animación de caer
    
    // Reproducir un sonido de moneda opcional
    let audio = new Audio('https://freesound.org/data/previews/276/276091_5123851-lq.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio bloqueado por navegador"));

    setTimeout(() => {
        document.getElementById('insert-coin-overlay').classList.remove('active');
        resetIdleTimer();
    }, 600); // Espera a que termine la animación
}

// Escuchamos eventos globales para reiniciar el temporizador si el usuario está activo
['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, () => {
        if (!document.getElementById('insert-coin-overlay').classList.contains('active')) {
            resetIdleTimer();
        }
    });
});
