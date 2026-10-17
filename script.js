let cart = JSON.parse(localStorage.getItem('retrorevive_cart')) || [];
let total = 0;
const BUSINESS_PHONE = "526675912648"; 
let viewHistory = ['consolas'];

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

// 2. BASE DE DATOS DE CONSOLAS COMPLETAS
const consolasDB = [
    { name: "Magnavox Odyssey", year: 1972, price: 12000, img: "img/magnavox_odyssey.jpg", inc: ["Consola Magnavox Odyssey", "2 Mandos integrados", "Cable RF con adaptador para TV moderna", "Baterías (Cargadas)", "Overlays de pantalla"] },
    { name: "Home Pong", year: 1975, price: 3500, img: "img/home_pong.jpg", inc: ["Consola Home Pong", "Cable RF con adaptador coaxial a TV", "Eliminador de corriente AC"] },
    { name: "Coleco Telstar", year: 1976, price: 2500, img: "img/coleco_telstar.jpg", inc: ["Consola Coleco Telstar", "Cable RF con adaptador coaxial", "Eliminador de corriente de pared"] },
    { name: "Fairchild Channel F", year: 1976, price: 4000, img: "img/fairchild.jpg", inc: ["Consola Channel F", "2 Joysticks", "Cable de antena con adaptador", "Fuente de alimentación"] },
    { name: "RCA Studio II", year: 1977, price: 3000, img: "img/rca_studio.jpg", inc: ["Consola RCA", "Cable RF a Coaxial (TV Moderna)", "Adaptador de corriente AC"] },
    { name: "Atari 2600", year: 1977, price: 1500, img: "img/atari_2600.jpg", inc: ["Consola Atari CX2600", "1 Joystick CX40", "Cable RF con adaptador a TV", "Eliminador de corriente de 9V"] },
    { name: "Bally Astrocade", year: 1977, price: 5000, img: "img/bally.jpg", inc: ["Consola Bally Astrocade", "Mando pistola", "Cable de video y adaptador TV", "Fuente de alimentación"] },
    { name: "APF-MP1000", year: 1978, price: 3500, img: "img/apf.jpg", inc: ["Consola APF", "2 Joysticks", "Cable de video con adaptador TV", "Eliminador AC"] },
    { name: "Magnavox Odyssey²", year: 1978, price: 2500, img: "img/odyssey2.jpg", inc: ["Consola Odyssey²", "2 Joysticks y Teclado", "Cable RF a Coaxial para TV", "Fuente de poder de pared"] },
    { name: "Philips Odyssey 2000", year: 1977, price: 3000, img: "img/philips.jpg", inc: ["Consola Philips", "Mandos giratorios", "Cable de señal y eliminador"] },
    { name: "Intellivision", year: 1979, price: 2000, img: "img/intellivision.jpg", inc: ["Consola Intellivision", "Mandos con disco", "Cable de antena + Adaptador Coaxial", "Cable de corriente"] },
    { name: "Microvision", year: 1979, price: 3500, img: "img/microvision.jpg", inc: ["Portátil Microvision", "Batería de 9V nueva instalada", "Cartucho Blockbuster"] },
    { name: "Game & Watch", year: 1980, price: 2500, img: "img/game_watch.jpg", inc: ["Consola G&W", "Baterías LR44 nuevas instaladas", "Tapa de baterías"] },
    { name: "Epoch Cassette Vision", year: 1981, price: 4000, img: "img/epoch.jpg", inc: ["Consola Epoch", "Cable de video", "Adaptador AC"] },
    { name: "VTech CreatiVision", year: 1981, price: 3000, img: "img/vtech.jpg", inc: ["Consola VTech", "Cable RF a TV", "Fuente de alimentación"] },
    { name: "Emerson Arcadia 2001", year: 1982, price: 2500, img: "img/emerson.jpg", inc: ["Consola Emerson", "2 Mandos", "Cable de antena a Coaxial", "Eliminador 12V"] },
    { name: "Atari 5200", year: 1982, price: 3000, img: "img/atari_5200.jpg", inc: ["Consola Atari 5200", "1 Mando analógico", "Caja Switch TV/Juego", "Fuente de alimentación"] },
    { name: "ColecoVision", year: 1982, price: 2500, img: "img/colecovision.jpg", inc: ["Consola ColecoVision", "1 Mando arcade", "Cable RF a Coaxial", "Fuente de poder original gruesa"] },
    { name: "Vectrex", year: 1982, price: 10000, img: "img/vectrex.jpg", inc: ["Consola Vectrex (Monitor integrado)", "1 Control análogo", "Cable de corriente directo"] },
    { name: "Casio PV-1000", year: 1983, price: 5000, img: "img/casio_pv.jpg", inc: ["Consola Casio", "1 Mando", "Cable de video", "Eliminador AC"] },
    { name: "Nintendo Famicom", year: 1983, price: 1800, img: "img/famicom.jpg", inc: ["Consola Famicom Japonesa", "2 Mandos integrados", "Cable de video RCA Modificado", "Adaptador de corriente"] },
    { name: "Sega SG-1000", year: 1983, price: 3000, img: "img/sg1000.jpg", inc: ["Consola SG-1000", "1 Joystick", "Cable a TV", "Adaptador AC"] },
    { name: "Tomy Tutor", year: 1983, price: 2500, img: "img/tomy_tutor.jpg", inc: ["Consola Tomy", "Cable RF y Adaptador", "Eliminador de corriente"] },
    { name: "Casio PV-2000", year: 1983, price: 3000, img: "img/casio_pv2000.jpg", inc: ["Consola Casio", "1 Gamepad", "Cable AV", "Fuente de poder"] },
    { name: "Nintendo NES", year: 1985, price: 1800, img: "img/nes.jpg", inc: ["Consola NES", "1 Control original", "Cable de video RCA (Amarillo/Rojo)", "Eliminador de corriente"] },
    { name: "Sega Mark III", year: 1985, price: 3500, img: "img/mark3.jpg", inc: ["Consola Mark III", "1 Pad de control", "Cables AV y Fuente AC"] },
    { name: "Sega Master System", year: 1985, price: 2500, img: "img/master_system.jpg", inc: ["Consola SMS", "1 Control Pad", "Cable AV RCA", "Eliminador de corriente"] },
    { name: "Atari 7800", year: 1984, price: 2000, img: "img/atari_7800.jpg", inc: ["Consola 7800", "1 Joystick", "Cable RF + Switch a Coaxial", "Adaptador de corriente"] },
    { name: "Amstrad GX4000", year: 1990, price: 4500, img: "img/amstrad.jpg", inc: ["Consola GX4000", "1 Control Pad", "Cable AV y Fuente de poder"] },
    { name: "Atari Lynx", year: 1989, price: 3500, img: "img/lynx.jpg", inc: ["Portátil Lynx", "Baterías AA nuevas", "Cargador de pared AC"] },
    { name: "Game Boy", year: 1989, price: 1500, img: "img/gameboy.jpg", inc: ["Portátil Game Boy", "4 Baterías AA instaladas", "Tapa de baterías"] },
    { name: "TurboGrafx-16", year: 1987, price: 3000, img: "img/turbografx.jpg", inc: ["Consola TurboGrafx", "1 TurboPad", "Cable RF y Eliminador AC"] },
    { name: "Sega Genesis", year: 1988, price: 1500, img: "img/genesis.jpg", inc: ["Consola Genesis", "1 Control 3 botones", "Cable AV", "Eliminador de corriente de pared"] },
    { name: "Neo Geo AES", year: 1990, price: 18000, img: "img/neogeo.jpg", inc: ["Consola AES", "1 Arcade Stick", "Cable estéreo AV", "Fuente de poder original"] },
    { name: "Super Nintendo (SNES)", year: 1990, price: 2200, img: "img/snes.jpg", inc: ["Consola SNES", "1 Control original", "Cable de video RCA", "Eliminador de corriente AC"] },
    { name: "Commodore CDTV", year: 1991, price: 8000, img: "img/cdtv.jpg", inc: ["Consola CDTV", "Mando a distancia", "Cable de video", "Cable de corriente"] },
    { name: "Philips CD-i", year: 1991, price: 5000, img: "img/cdi.jpg", inc: ["Consola CD-i", "Control remoto", "Cable AV RCA", "Cable de corriente AC"] },
    { name: "Sega CD", year: 1991, price: 4500, img: "img/segacd.jpg", inc: ["Sega CD Add-on", "Cable pasante", "Fuente de poder"] },
    { name: "Sega Pico", year: 1993, price: 1500, img: "img/pico.jpg", inc: ["Consola Pico", "Lápiz óptico", "Cable de video", "Eliminador AC"] },
    { name: "3DO Interactive", year: 1993, price: 4000, img: "img/3do.jpg", inc: ["Consola 3DO", "1 Control", "Cable AV RCA", "Cable de poder"] },
    { name: "Atari Jaguar", year: 1993, price: 6000, img: "img/jaguar.jpg", inc: ["Consola Jaguar", "1 Control", "Cable RF", "Fuente de alimentación"] },
    { name: "Amiga CD32", year: 1993, price: 7000, img: "img/amigacd32.jpg", inc: ["Consola CD32", "1 Mando", "Cable AV", "Fuente de poder"] },
    { name: "FM Towns Marty", year: 1993, price: 15000, img: "img/fmtowns.jpg", inc: ["Consola FM Towns", "1 Control Pad", "Cable AV", "Cable de corriente"] },
    { name: "Sega Saturn", year: 1994, price: 3500, img: "img/saturn.jpg", inc: ["Consola Saturn", "1 Control", "Cable de video RCA", "Cable de poder AC"] },
    { name: "PlayStation (PS1)", year: 1994, price: 1200, img: "img/ps1.jpg", inc: ["Consola PS1", "1 Control DualShock", "Cable AV", "Cable de corriente AC"] },
    { name: "Neo Geo CD", year: 1994, price: 8000, img: "img/neogeocd.jpg", inc: ["Consola Neo Geo CD", "1 Pad", "Cable AV RCA", "Fuente de poder"] },
    { name: "PC-FX", year: 1994, price: 6000, img: "img/pcfx.jpg", inc: ["Consola PC-FX", "1 Mando FX-PAD", "Cable AV RCA", "Cable de alimentación"] },
    { name: "Sega 32X", year: 1994, price: 3500, img: "img/sega32x.jpg", inc: ["Módulo 32X", "Cable pasante a Genesis", "Fuente de alimentación propia"] },
    { name: "Virtual Boy", year: 1995, price: 8000, img: "img/virtualboy.jpg", inc: ["Consola Virtual Boy", "Trípode base", "Control", "Adaptador AC"] },
    { name: "Casio Loopy", year: 1995, price: 4000, img: "img/loopy.jpg", inc: ["Consola Loopy", "1 Mando", "Cables AV y Fuente AC"] },
    { name: "Nintendo 64", year: 1996, price: 2500, img: "img/n64.jpg", inc: ["Consola N64", "1 Control original", "Cable AV RCA", "Fuente de poder Nintendo"] },
    { name: "Game.com", year: 1997, price: 2000, img: "img/gamecom.jpg", inc: ["Portátil Game.com", "Stylus", "Baterías instaladas"] },
    { name: "Game Boy Light", year: 1998, price: 3500, img: "img/gblight.jpg", inc: ["Consola GB Light", "Pilas instaladas", "Tapa de baterías"] },
    { name: "Sega Dreamcast", year: 1998, price: 3000, img: "img/dreamcast.jpg", inc: ["Consola Dreamcast", "1 Control", "Cable AV RCA", "Cable de corriente AC"] },
    { name: "Game Boy Color", year: 1998, price: 1800, img: "img/gbc.jpg", inc: ["Consola GBC", "Baterías nuevas", "Tapa de baterías"] },
    { name: "Neo Geo Pocket", year: 1998, price: 2500, img: "img/ngp.jpg", inc: ["Portátil NGP", "Pilas principales y de respaldo"] },
    { name: "WonderSwan", year: 1999, price: 2000, img: "img/wonderswan.jpg", inc: ["Portátil WonderSwan", "Batería instalada"] },
    { name: "Neo Geo Pocket Color", year: 1999, price: 3000, img: "img/ngpc.jpg", inc: ["Portátil NGPC", "Pilas instaladas", "Tapa original"] },
    { name: "PlayStation 2", year: 2000, price: 1500, img: "img/ps2.jpg", inc: ["Consola PS2", "1 Control DualShock 2", "Cable AV RCA", "Cable de poder o Eliminador"] },
    { name: "Nintendo GameCube", year: 2001, price: 2800, img: "img/gamecube.jpg", inc: ["Consola GameCube", "1 Control original", "Cable AV Nintendo", "Fuente de poder externa"] },
    { name: "Microsoft Xbox", year: 2001, price: 2000, img: "img/xbox.jpg", inc: ["Consola Xbox", "1 Control", "Cable AV", "Cable de poder de pared"] },
    { name: "Game Boy Advance", year: 2001, price: 1500, img: "img/gba.jpg", inc: ["Consola GBA", "Baterías", "Tapa de pilas"] },
    { name: "Pokémon mini", year: 2001, price: 2500, img: "img/pokemonmini.jpg", inc: ["Consola mini", "Pila nueva"] },
    { name: "Nokia N-Gage", year: 2003, price: 3000, img: "img/ngage.jpg", inc: ["Teléfono N-Gage", "Batería", "Cargador de clavija"] },
    { name: "Game Boy Advance SP", year: 2003, price: 2000, img: "img/gbasp.jpg", inc: ["Consola GBA SP", "Batería", "Cargador de pared original"] },
    { name: "Nintendo DS", year: 2004, price: 1000, img: "img/nds.jpg", inc: ["Consola NDS", "Stylus", "Cargador de pared"] },
    { name: "PSP", year: 2004, price: 1500, img: "img/psp.jpg", inc: ["Consola PSP", "Batería", "Cargador de pared 5V"] },
    { name: "Game Boy Micro", year: 2005, price: 3500, img: "img/gbmicro.jpg", inc: ["Consola GB Micro", "Cargador de pared Micro"] },
    { name: "Gizmondo", year: 2005, price: 5000, img: "img/gizmondo.jpg", inc: ["Consola Gizmondo", "Batería", "Cargador de pared"] },
    { name: "Xbox 360", year: 2005, price: 1800, img: "img/xbox360.jpg", inc: ["Consola 360", "1 Control inalámbrico", "Cable HD/HDMI", "Fuente de poder original"] },
    { name: "PlayStation 3", year: 2006, price: 2200, img: "img/ps3.jpg", inc: ["Consola PS3", "1 Control DualShock 3", "Cable de carga, HDMI y Corriente"] },
    { name: "Nintendo Wii", year: 2006, price: 1200, img: "img/wii.jpg", inc: ["Consola Wii", "Wiimote + Nunchuk", "Barra de sensores", "Cable AV y Fuente de poder Wii"] },
    { name: "Nintendo DSi", year: 2008, price: 1200, img: "img/dsi.jpg", inc: ["Consola DSi", "Stylus", "Cargador de pared"] },
    { name: "PSP Go", year: 2009, price: 2500, img: "img/pspgo.jpg", inc: ["Consola PSP Go", "Cable USB/Carga propietario"] },
    { name: "Nintendo DSi XL", year: 2009, price: 1500, img: "img/dsixl.jpg", inc: ["Consola DSi XL", "Stylus", "Cargador de pared"] },
    { name: "Nintendo 3DS", year: 2011, price: 2200, img: "img/3ds.jpg", inc: ["Consola 3DS", "Stylus", "Cargador de pared"] },
    { name: "PlayStation Vita", year: 2011, price: 3000, img: "img/psvita.jpg", inc: ["Consola PS Vita", "Cable de carga", "Cargador de pared"] },
    { name: "Nintendo 3DS XL", year: 2012, price: 2800, img: "img/3dsxl.jpg", inc: ["Consola 3DS XL", "Stylus", "Cargador de pared"] },
    { name: "Wii U", year: 2012, price: 3500, img: "img/wiiu.jpg", inc: ["Consola Wii U", "Wii U GamePad", "Cargador del Gamepad", "Cable HDMI y Fuente consola"] },
    { name: "PlayStation TV", year: 2013, price: 2500, img: "img/pstv.jpg", inc: ["Microconsola PS TV", "Cable HDMI", "Eliminador de corriente"] },
    { name: "PlayStation 4", year: 2013, price: 3500, img: "img/ps4.jpg", inc: ["Consola PS4", "1 Control DualShock 4", "Cable HDMI, Carga y Corriente"] },
    { name: "Xbox One", year: 2013, price: 2800, img: "img/xboxone.jpg", inc: ["Consola Xbox One", "1 Control", "Cable HDMI", "Fuente de poder externa y Cable AC"] },
    { name: "Nintendo 2DS", year: 2013, price: 1500, img: "img/2ds.jpg", inc: ["Consola 2DS", "Stylus", "Cargador de pared"] },
    { name: "Ouya", year: 2013, price: 1200, img: "img/ouya.jpg", inc: ["Consola Ouya", "1 Mando original", "Cable HDMI", "Eliminador"] },
    { name: "PS Vita Slim", year: 2013, price: 2800, img: "img/psvitaslim.jpg", inc: ["Consola PS Vita Slim", "Cable Micro-USB", "Cargador de pared"] },
    { name: "New Nintendo 3DS", year: 2014, price: 3500, img: "img/new3ds.jpg", inc: ["Consola New 3DS", "Stylus", "Cargador de pared"] },
    { name: "New Nintendo 3DS XL", year: 2014, price: 4000, img: "img/new3dsxl.jpg", inc: ["Consola New 3DS XL", "Stylus", "Cargador de pared"] },
    { name: "PlayStation 4 Slim", year: 2016, price: 4000, img: "img/ps4slim.jpg", inc: ["Consola PS4 Slim", "1 Control DualShock 4", "Cable HDMI, Carga y Corriente"] },
    { name: "PlayStation 4 Pro", year: 2016, price: 5000, img: "img/ps4pro.jpg", inc: ["Consola PS4 Pro", "1 Control", "Cable HDMI alta velocidad", "Cable grueso de corriente"] },
    { name: "Xbox One S", year: 2016, price: 3500, img: "img/xboxones.jpg", inc: ["Consola Xbox One S", "1 Control", "Cable HDMI", "Cable de corriente"] },
    { name: "Nintendo Switch", year: 2017, price: 4500, img: "img/switch.jpg", inc: ["Tableta Switch", "2 Joy-Cons", "Dock de TV", "Cargador USB-C", "Cable HDMI"] },
    { name: "Xbox One X", year: 2017, price: 4500, img: "img/xboxonex.jpg", inc: ["Consola Xbox One X", "1 Control", "Cable HDMI 4K", "Cable de corriente"] },
    { name: "Nintendo Switch Lite", year: 2019, price: 3000, img: "img/switchlite.jpg", inc: ["Consola Switch Lite", "Cargador oficial USB-C"] },
    { name: "PlayStation 5", year: 2020, price: 8500, img: "img/ps5.jpg", inc: ["Consola PS5", "1 Control DualSense", "Cable USB-C", "Cable HDMI 2.1", "Cable de corriente"] },
    { name: "Xbox Series X", year: 2020, price: 8000, img: "img/xboxseriesx.jpg", inc: ["Consola Series X", "1 Control Series", "Cable HDMI Ultra High Speed", "Cable de poder"] },
    { name: "Xbox Series S", year: 2020, price: 4500, img: "img/xboxseriess.jpg", inc: ["Consola Series S", "1 Control", "Cable HDMI", "Cable de poder"] },
    { name: "Nintendo Switch OLED", year: 2021, price: 6000, img: "img/switcholed.jpg", inc: ["Consola Switch OLED", "2 Joy-Cons", "Dock con LAN", "Cable HDMI", "Cargador USB-C"] },
    { name: "Steam Deck", year: 2022, price: 7000, img: "img/steamdeck.jpg", inc: ["Consola Steam Deck", "Funda", "Cargador rápido USB-C"] },
    { name: "ASUS ROG Ally", year: 2023, price: 9000, img: "img/rogally.jpg", inc: ["Consola ROG Ally", "Cargador rápido Type-C"] },
    { name: "Lenovo Legion Go", year: 2023, price: 11000, img: "img/legiongo.jpg", inc: ["Consola Legion Go", "Mandos extraíbles", "Cargador de pared"] },
    { name: "Steam Deck OLED", year: 2023, price: 10000, img: "img/steamdeckoled.jpg", inc: ["Consola Steam Deck OLED", "Cargador rápido oficial"] },
    { name: "PlayStation 5 Slim", year: 2023, price: 9000, img: "img/ps5slim.jpg", inc: ["Consola PS5 Slim", "1 Control DualSense", "Cables y soportes plásticos"] },
    { name: "ASUS ROG Ally X", year: 2024, price: 15000, img: "img/rogallyx.jpg", inc: ["Consola ROG Ally X", "Cargador rápido"] },
    { name: "PlayStation 5 Pro", year: 2024, price: 16000, img: "img/ps5pro.jpg", inc: ["Consola PS5 Pro", "1 Control DualSense", "Cables de alta velocidad"] },
    { name: "MSI Claw", year: 2024, price: 12000, img: "img/msiclaw.jpg", inc: ["Consola MSI Claw", "Cargador rápido"] },
    { name: "Nintendo Switch 2", year: 2025, price: 9500, img: "img/switch2.jpg", inc: ["Consola Switch 2", "Joy-Cons magnéticos", "Dock", "Cargador y HDMI"] }
];

// 3. JUEGOS REALES POR CONSOLA (SIN PARÉNTESIS)
const juegosBaseReales = {
    "Nintendo Switch": [{n:"The Legend of Zelda: Breath of the Wild",p:900},{n:"Super Mario Odyssey",p:900},{n:"Mario Kart 8 Deluxe",p:1000},{n:"Super Smash Bros. Ultimate",p:1100},{n:"Animal Crossing: New Horizons",p:900},{n:"Pokémon Legends: Arceus",p:800},{n:"Metroid Dread",p:750},{n:"Splatoon 3",p:900},{n:"Xenoblade Chronicles 3",p:800},{n:"Fire Emblem: Three Houses",p:850},{n:"Luigi's Mansion 3",p:800},{n:"Super Mario Bros. Wonder",p:1000},{n:"Monster Hunter Rise",p:600},{n:"Persona 5 Royal",p:700},{n:"The Legend of Zelda: Tears of the Kingdom",p:1100}],
    "PlayStation 4": [{n:"God of War",p:350},{n:"The Last of Us Part II",p:500},{n:"Marvel's Spider-Man",p:400},{n:"Red Dead Redemption 2",p:450},{n:"Bloodborne",p:350},{n:"Uncharted 4: A Thief's End",p:300},{n:"Horizon Zero Dawn",p:300},{n:"Persona 5",p:350},{n:"The Witcher 3: Wild Hunt",p:400},{n:"Ghost of Tsushima",p:500},{n:"Grand Theft Auto V",p:350},{n:"Final Fantasy VII Remake",p:450},{n:"God of War Ragnarök",p:800},{n:"Sekiro: Shadows Die Twice",p:600},{n:"Resident Evil 2 Remake",p:450}],
    "Xbox One": [{n:"Halo: The Master Chief Collection",p:400},{n:"Forza Horizon 4",p:500},{n:"Gears 5",p:350},{n:"Sea of Thieves",p:400},{n:"Ori and the Will of the Wisps",p:300},{n:"Sunset Overdrive",p:250},{n:"Halo 5: Guardians",p:250},{n:"Quantum Break",p:300},{n:"Forza Motorsport 7",p:450},{n:"Gears of War 4",p:300},{n:"Ryse: Son of Rome",p:250},{n:"State of Decay 2",p:300},{n:"Killer Instinct",p:250},{n:"Rare Replay",p:300},{n:"Cuphead",p:350}],
    "Nintendo 64": [{n:"Super Mario 64",p:600},{n:"The Legend of Zelda: Ocarina of Time",p:800},{n:"GoldenEye 007",p:500},{n:"The Legend of Zelda: Majora's Mask",p:900},{n:"Mario Kart 64",p:700},{n:"Super Smash Bros.",p:800},{n:"Banjo-Kazooie",p:600},{n:"Paper Mario",p:1500},{n:"Star Fox 64",p:450},{n:"Donkey Kong 64",p:550},{n:"Perfect Dark",p:400},{n:"Diddy Kong Racing",p:450},{n:"Pokemon Stadium",p:500},{n:"Conker's Bad Fur Day",p:2500},{n:"Wave Race 64",p:300}],
    "Super Nintendo (SNES)": [{n:"Super Mario World",p:400},{n:"The Legend of Zelda: A Link to the Past",p:700},{n:"Super Metroid",p:1200},{n:"Chrono Trigger",p:3500},{n:"Donkey Kong Country",p:500},{n:"Street Fighter II",p:350},{n:"Final Fantasy III (VI)",p:1200},{n:"Super Mario Kart",p:600},{n:"EarthBound",p:5000},{n:"Secret of Mana",p:900},{n:"Mega Man X",p:600},{n:"Super Mario RPG",p:1500},{n:"Super Mario World 2: Yoshi's Island",p:600},{n:"Super Castlevania IV",p:1000},{n:"Star Fox",p:350}],
    "Nintendo NES": [{n:"Super Mario Bros.",p:300},{n:"Super Mario Bros. 3",p:450},{n:"The Legend of Zelda",p:600},{n:"Metroid",p:500},{n:"Mega Man 2",p:600},{n:"Castlevania",p:550},{n:"Contra",p:700},{n:"DuckTales",p:400},{n:"Mike Tyson's Punch-Out!!",p:500},{n:"Final Fantasy",p:600},{n:"Zelda II: The Adventure of Link",p:450},{n:"Excitebike",p:250},{n:"Double Dragon",p:350},{n:"Kid Icarus",p:450},{n:"Tetris",p:200}],
    "PlayStation (PS1)": [{n:"Metal Gear Solid",p:600},{n:"Final Fantasy VII",p:700},{n:"Castlevania: Symphony of the Night",p:2000},{n:"Resident Evil 2",p:650},{n:"Crash Bandicoot",p:500},{n:"Tekken 3",p:400},{n:"Silent Hill",p:2500},{n:"Gran Turismo 2",p:300},{n:"Spyro the Dragon",p:450},{n:"Tomb Raider",p:350},{n:"Tony Hawk's Pro Skater 2",p:300},{n:"Chrono Cross",p:600},{n:"Street Fighter Alpha 3",p:700},{n:"Suikoden II",p:3000},{n:"Twisted Metal 2",p:400}],
    "PlayStation 2 (PS2)": [{n:"Grand Theft Auto: San Andreas",p:300},{n:"Metal Gear Solid 3: Snake Eater",p:400},{n:"Shadow of the Colossus",p:450},{n:"Silent Hill 2",p:2000},{n:"Resident Evil 4",p:350},{n:"God of War II",p:300},{n:"Final Fantasy X",p:250},{n:"Kingdom Hearts",p:300},{n:"Gran Turismo 4",p:200},{n:"Devil May Cry 3",p:300},{n:"Bully",p:350},{n:"Okami",p:400},{n:"Ratchet & Clank: Up Your Arsenal",p:350},{n:"Sly 2: Band of Thieves",p:350},{n:"Jak II",p:300}],
    "Sega Genesis": [{n:"Sonic the Hedgehog 2",p:250},{n:"Streets of Rage 2",p:700},{n:"Gunstar Heroes",p:1500},{n:"Phantasy Star IV",p:1800},{n:"Shinobi III",p:600},{n:"Castlevania: Bloodlines",p:2000},{n:"Contra: Hard Corps",p:2200},{n:"Mortal Kombat II",p:350},{n:"Earthworm Jim",p:450},{n:"Comix Zone",p:600},{n:"Aladdin",p:300},{n:"Golden Axe",p:400},{n:"Vectorman",p:300},{n:"Beyond Oasis",p:800},{n:"Ristar",p:1000}],
    "Xbox 360": [{n:"Halo 3",p:200},{n:"Gears of War 2",p:200},{n:"Mass Effect 2",p:250},{n:"Red Dead Redemption",p:300},{n:"The Elder Scrolls V: Skyrim",p:250},{n:"Bioshock",p:250},{n:"Grand Theft Auto IV",p:300},{n:"Fallout 3",p:250},{n:"Call of Duty: Modern Warfare 2",p:200},{n:"Left 4 Dead 2",p:350},{n:"Batman: Arkham City",p:250},{n:"Forza Horizon",p:350},{n:"Alan Wake",p:300},{n:"Dead Space",p:250},{n:"Fable II",p:200}],
    "PlayStation 3 (PS3)": [{n:"The Last of Us",p:300},{n:"Uncharted 2: Among Thieves",p:250},{n:"Metal Gear Solid 4: Guns of the Patriots",p:250},{n:"God of War III",p:250},{n:"Demon's Souls",p:400},{n:"Infamous 2",p:250},{n:"LittleBigPlanet 2",p:250},{n:"Killzone 2",p:200},{n:"Resistance 3",p:250},{n:"Heavy Rain",p:250},{n:"Journey",p:400},{n:"Persona 5",p:450},{n:"Ratchet & Clank Future: A Crack in Time",p:350},{n:"Gran Turismo 5",p:200},{n:"MotorStorm",p:200}]
};

function getTop15Games(consoleName) {
    if (juegosBaseReales[consoleName]) return juegosBaseReales[consoleName];
    
    const preciosBase = [450, 350, 600, 250, 800, 500, 300, 700, 900, 400, 200, 1000, 350, 550, 650];
    const titulosFalsos = ["Greatest Hits Vol. 1", "Adventure Quest", "Racing Championship", "Combat Zone", "RPG Chronicles", "Arcade Classics", "Extreme Sports", "Mystery Legends", "Super Heroes", "Galactic Warfare", "Final Showdown", "Tactics Master", "World Cup", "Retro Remix", "Ultimate Collection"];

    return titulosFalsos.map((titulo, i) => ({ n: titulo, p: preciosBase[i] }));
}

// 4. INYECCIÓN DEL DOM
document.addEventListener('DOMContentLoaded', () => {
    setRandomSlogan();
    renderConsolas();
    renderJuegosConsolas();
    updateCartUI();
});

function getImgSrc(imgName) {
    return `onerror="this.onerror=null; this.src='https://placehold.co/600x400/2d3748/cbd5e0?text=FOTO+PENDIENTE';" src="${imgName}"`;
}

function renderConsolas() {
    const container = document.getElementById('catalogo-consolas');
    let html = '';
    consolasDB.forEach((c, idx) => {
        let btnId = `btn-con-${idx}`;
        let incItems = c.inc.map(item => `<li>${item}</li>`).join('');

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
            <div id="${btnId}">
                <button class="add-btn" onclick="changeQty('${btnId}', '${c.name.replace(/'/g, "\\'")}', ${c.price}, 1)">+ AGREGAR</button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

function renderJuegosConsolas() {
    const container = document.getElementById('catalogo-juegos-consolas');
    let sorted = [...consolasDB].sort((a, b) => b.year - a.year);
    let html = '';

    sorted.forEach((c) => {
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
    viewHistory.push('juegos-detalle');

    const listContainer = document.getElementById('lista-top-juegos');
    const games = getTop15Games(consoleName);
    let html = '';

    games.forEach((g, idx) => {
        let btnId = `btn-gme-${consoleName.replace(/[^a-zA-Z0-9]/g, '')}-${idx}`;
        let imgJuego = `https://placehold.co/600x400/2d3748/cbd5e0?text=JUEGO`;
        html += `
        <div class="card">
            <img src="${imgJuego}" alt="${g.n}" class="static-image">
            <h3 style="margin-top: 10px; margin-bottom: auto;">${g.n}</h3>
            <span class="price">$${g.p.toFixed(2)}</span>
            <div id="${btnId}">
                <button class="add-btn" onclick="changeQty('${btnId}', '${g.n.replace(/'/g, "\\'")}', ${g.p}, 1)">+ AGREGAR</button>
            </div>
        </div>`;
    });
    listContainer.innerHTML = html;
}

// 5. NAVEGACIÓN
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

// 6. CARRITO Y CANTIDADES
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
    renderCartModalList(); 
}

function removeItemCompleto(productName) {
    cart = cart.filter(i => i.name !== productName);
    localStorage.setItem('retrorevive_cart', JSON.stringify(cart));
    updateCartUI();
    renderCartModalList();
    showToast("❌ Removido", "var(--accent-pink)");
    
    showSection(viewHistory[viewHistory.length - 1]);
    if(viewHistory[viewHistory.length - 1] === 'consolas') renderConsolas();
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

// 7. MODALES Y CONTACTO
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
            <button class="btn-remove-item" onclick="removeItemCompleto('${item.name.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-trash-can"></i>
            </button>
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

// 8. ENVÍO DE PEDIDO A WHATSAPP
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

    let message = "🕹️ *SOLICITUD DE PEDIDO RETROREVIVE*\n";
    message += `*FOLIO: #${stringFolio}*\n`;
    message += "---------------------------\n";
    message += `👤 Cliente: ${name}\n`;
    message += `📱 Teléfono: ${phone}\n`;
    message += "---------------------------\n";
    
    cart.forEach(item => {
        message += `▪ ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    
    message += "---------------------------\n";
    message += `*TOTAL: $${total.toFixed(2)}*\n\n`;
    message += "_RetroRevive Culiacán_";

    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
    
    document.getElementById('checkout-modal').classList.remove('active');
    window.open(whatsappUrl, '_blank');
}
