
export const WORD_CATEGORIES = {
  RANDOM: "Martín Cirio, Riquelme, Messi, El peronísmo, Nico Occhiato, OLGA, Luzu TV, Dillom, Mate, Choripán, Obelisco, Carlos Gardel, Susana Giménez, Ricardo Fort, El Diego, Bizarrap",
  Cine: "Relatos Salvajes, Casados con Hijos, Spider Man, Los Simpson, The Office, Grey's Anatomy, Gossip Girl, South Park, Volver al Futuro, Batman, Notting Hill, Toy Story, Shrek, Frozen, Avengers, Breaking Bad, Los Simuladores, Friends, Harry Potter, 10 Things I Hate about You, Clueless, Star Wars",
  Animales: "Perro, Gato, Puma, Vaca, Caballo, León, Elefante, Delfín, Águila, Tiburón, Mono, Carpincho, Pingüino, Oso, Lobo, Pulpo, Ornitorrinco, Ñandú, Pez globo, Cabra",
  Morfi: "Dulce de leche, Milanesa napolitana, Fernet, Blue Label, Facturas, Pizza, Tomate, Asado, Salame, Panchos, Mate, Polenta, Flan, Pan, Rabas, Sushi, Chipá, Hamburguesa, Ribs",
  Lugares: "Bariloche, Estados Unidos, Palermo, Recoleta, UADE, Inglaterra, FADU, Córdoba, China, Brasil, España, Mar del Plata, Pinamar, Alemania, Caballito, Moscú, Puerto Madero",
  Deportes: "Fútbol, Truco, Pato, Automovilismo, Tenis, Rugby, Básquet, Polo, Boxeo, Scaloneta, La Bombonera, El Monumental",
  Famosos: "Mirtha Legrand, Moria Casán, Charly García, Soda Stereo, Spinetta, Lali Espósito, Tini, Duki, Nicki Nicole, Bizarrap",
  Objetos: "Sifón, Pava eléctrica, Bombilla, Termo, Repasador, Birome, Escarapela, Bandera"
};

export const WORD_HINTS: Record<string, string> = {
  // Cine y Series
  "Relatos Salvajes": "CUENTOS", "Casados con Hijos": "BOLUDOOO", "Spider Man": "RESPONSABILIDAD", 
  "Los Simpson": "DONAS", "The Office": "PAPEL", "Grey's Anatomy": "PORNO", "Gossip Girl": "CHISME", 
  "South Park": "CARTMAN", "Volver al Futuro": "AUTAZO", "Batman": "TRAUMA", "Notting Hill": "LIBROS", 
  "Toy Story": "PLÁSTICO", "Shrek": "CEBOLLAS", "Frozen": "HIELO", "Avengers": "MULTIVERSO", 
  "Breaking Bad": "QUÍMICA", "Los Simuladores": "PEPITAS", "Friends": "SITCOM", "Harry Potter": "CICATRIZ", 
  "10 Things I Hate about You": "ENEMIES TO LOVERS", "Clueless": "AMARILLO", "Star Wars": "FUERZA",

  // Animales
  "Perro": "AMIGO FIEL", "Gato": "MACRI", "Puma": "ROPA", "Vaca": "LA SERENÍSIMA", "Caballo": "CUADRÚPEDO", 
  "León": "PRESIDENTE", "Elefante": "SAVANAH", "Delfín": "AZUL", "Águila": "ESTADOS UNIDOS", "Tiburón": "SANGRE", 
  "Mono": "UN AMIGO TUYO", "Carpincho": "NORDELTA", "Pingüino": "ANTÁRTICA", "Oso": "PELUDO", "Lobo": "AULLIDO", 
  "Pulpo": "OCHO", "Ornitorrinco": "PERRY", "Ñandú": "CAGÓN", "Pez globo": "VENENOSO", "Cabra": "MESSI",

  // Morfi
  "Dulce de leche": "CHOCOTORTA", "Milanesa napolitana": "UN MANJAR", "Fernet": "PREVIA", 
  "Blue Label": "UN ELIXIR", "Facturas": "HARINA", "Pizza": "ITALIA", "Tomate": "FRUTA O VERDURA", 
  "Asado": "DOMINGO", "Salame": "FÁLICO", "Panchos": "BAJÓN", "Mate": "RITUAL", 
  "Polenta": "POBREZA DIGNA", "Flan": "MIXTO", "Pan": "TOSTADAS", "Rabas": "COSTA", 
  "Sushi": "CHETO", "Chipá": "PARGUAY", "Hamburguesa": "MCDONALD'S", "Ribs": "KANSAS",

  // Lugares
  "Bariloche": "CERRO", "Estados Unidos": "TIROTEO", "Palermo": "CAFÉ DE ESPECIALIDAD", "Recoleta": "CHETO", 
  "UADE": "LA SABE", "Inglaterra": "EL QUE NO SALTA", "FADU": "PORRO", "Córdoba": "FERNET", 
  "China": "VIRUS", "Brasil": "PECHOFRÍO", "España": "JAMÓN", "Mar del Plata": "FELIZ", 
  "Pinamar": "LUZU TV", "Alemania": "CERVEZA", "Caballito": "PARQUE", "Moscú": "JODA", 
  "Puerto Madero": "RASCACIELOS",

  // Random/Cultura
  "Martín Cirio": "La Faraona", "Riquelme": "El último 10", "Messi": "El capitán", "El peronísmo": "Movimiento de masas", 
  "Nico Occhiato": "Capitán de Luzu", "OLGA": "El canal de la competencia", "Luzu TV": "Pioneros del streaming", 
  "Dillom": "Post Mortem", "Choripán": "Clásico de cancha", "Obelisco": "Punto de encuentro", 
  "Carlos Gardel": "Cada día canta mejor", "Susana Giménez": "¡Hola Susana!", "Ricardo Fort": "¡Maiameee!", 
  "El Diego": "D10S", "Bizarrap": "Session en el cuarto",
  
  // Deportes
  "Fútbol": "Pasión de multitudes", "Truco": "Quiero vale cuatro", "Pato": "Deporte nacional", "Automovilismo": "Turismo Carretera", 
  "Tenis": "Legión Argentina", "Rugby": "Los Pumas", "Básquet": "Generación Dorada", "Polo": "Abierto de Palermo", 
  "Boxeo": "Noche de Luna Park", "Scaloneta": "Tres estrellas", "La Bombonera": "Late, no tiembla", "El Monumental": "La casa de la selección"
};

export const GENERIC_HINTS = [
  "Es un concepto muy nuestro",
  "Se ve seguido en la tele o redes",
  "Es algo que genera debate",
  "Forma parte del día a día",
  "Es un clásico rioplatense",
  "Tiene que ver con la identidad",
  "Muchos lo aman, otros lo odian",
  "Es un ícono cultural"
];

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 20;
export const MIN_WORDS = 3;
