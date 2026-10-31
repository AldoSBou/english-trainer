/* ===========================================================
   ingles3/unit3.js — Inglés 3 · Unit 3: Getting around & travel advice
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Vocabulario: viajes y transporte público ---------- */
  const TRAVEL = [
    ['arrival', 'la llegada', 'The arrival time is 6:45 p.m., so we have time for dinner.', '¿A qué hora suele ser tu llegada a casa?'],
    ['book', 'reservar (billetes, mesa, hotel)', "I'd like to book a table for four people at eight o'clock.", '¿Reservas tus viajes con mucha antelación?'],
    ['departure', 'la salida', 'Check the departure board: our train leaves from platform 3.', '¿Llegas pronto a las salidas o siempre justo?'],
    ['direct', 'directo, sin transbordos', 'Is it a direct route, or do I need to change trains?', '¿Prefieres un vuelo directo aunque sea más caro?'],
    ['fare', 'la tarifa, el precio del billete', 'I looked at flying direct, but the fare was too expensive.', '¿Cuánto cuesta la tarifa de un bus en tu ciudad?'],
    ['lines', 'las líneas (de metro, bus o tren)', 'You have to change lines at the central station.', '¿Cuántas líneas de metro o bus usas cada semana?'],
    ['reservation', 'la reserva', "Speaker B is making a reservation at a restaurant.", '¿Has perdido alguna vez una reserva?'],
    ['route', 'la ruta, el recorrido', 'I think that the route is direct, so you won\'t need to change trains.', '¿Cuál es tu ruta habitual al trabajo?'],
    ['schedule', 'el horario', 'You need to look at a schedule before you go to the terminal.', '¿Dónde consultas los horarios de transporte?'],
    ['terminal', 'la terminal', 'Remember, you need to arrive at the terminal two hours before the flight leaves.', '¿Cuál es la terminal más grande que has visto?'],
  ];

  /* ---------- Vocabulario: lugares de la ciudad ---------- */
  const PLACES = [
    ['a walk-in clinic', 'una clínica sin cita previa', 'He went to a walk-in clinic first, but they sent him to the hospital.', '¿Hay una clínica sin cita cerca de tu casa?'],
    ['an embassy', 'una embajada', 'His girlfriend called the U.S. embassy, and they helped our family.', '¿Sabes dónde está la embajada de tu país en el extranjero?'],
    ['a fire station', 'una estación de bomberos', 'He works at the fire station in the city center.', '¿Has visto alguna vez un camión de bomberos en acción?'],
    ['the city center', 'el centro de la ciudad', 'The fire station is in the city center.', '¿Vives cerca o lejos del centro?'],
    ['a highway', 'una autopista', 'We even walked on the highway because there were no cars!', '¿Te gusta conducir por autopista?'],
    ['a parking lot', 'un estacionamiento', 'I saw a food market in a parking lot near the city center.', '¿Es fácil aparcar en tu barrio?'],
    ['a sidewalk', 'una acera, una vereda', 'People walked and biked everywhere, not just on the sidewalks.', '¿Son anchas las aceras de tu ciudad?'],
    ['a bridge', 'un puente', 'Because there were no cars, the bridges were empty.', '¿Cuál es el puente más bonito que conoces?'],
  ];

  /* ---------- Vocabulario: describir una ciudad ---------- */
  const CITY = [
    ['a streetcar', 'un tranvía', 'The streetcars in Lisbon are really convenient.', '¿Hay tranvías en tu ciudad?'],
    ['trendy', 'de moda, moderno', 'There are so many trendy neighborhoods to explore.', '¿Cuál es el barrio más de moda donde vives?'],
    ['architecture', 'la arquitectura', 'The architecture is just amazing: beautiful historic buildings everywhere.', '¿Qué edificio te parece más impresionante?'],
    ['a vendor', 'un vendedor (de puesto o mercado)', 'There are lots of markets with vendors selling traditional souvenirs.', '¿Regateas el precio con los vendedores?'],
    ['a boardwalk', 'un paseo marítimo (de madera)', 'My favorite thing was to take a walk on the boardwalk by the ocean.', '¿Has paseado por algún paseo marítimo?'],
    ['a neighborhood', 'un barrio', 'You can get off on whatever streets interest you and explore the neighborhood.', '¿Cómo describirías tu barrio?'],
    ['convenient', 'práctico, cómodo (de usar)', 'The subway is convenient because it stops near my office.', '¿Qué transporte te resulta más práctico?'],
    ['a souvenir', 'un recuerdo, un souvenir', 'I bought a few traditional souvenirs at the market.', '¿Qué souvenir traes siempre de un viaje?'],
  ];

  /* ---------- Vocabulario: dentro de un edificio (directions) ---------- */
  const BUILDING = [
    ['the lobby', 'el vestíbulo, la recepción', 'Excuse me. How do I get to the lobby?', '¿Cómo es el vestíbulo de tu oficina?'],
    ['a hallway', 'un pasillo', "Go down that hallway, and they're on your right.", '¿Cuántos pasillos hay que cruzar hasta tu escritorio?'],
    ['the elevator', 'el ascensor', 'Which way is the elevator?', '¿Ascensor o escaleras?'],
    ['the stairs', 'las escaleras', 'Do you know where the stairs are?', '¿Subes andando o esperas el ascensor?'],
    ['the cafeteria', 'el comedor, la cafetería', 'Do you know which floor the cafeteria is on?', '¿Comes en la cafetería del trabajo?'],
    ['the staff room', 'la sala de personal', 'Can you tell me how to get to the staff room?', '¿Hay una sala de descanso donde trabajas?'],
    ['a meeting room', 'una sala de reuniones', 'Do you know how to get to meeting room C?', '¿Cuántas reuniones tienes a la semana?'],
  ];

  /* situación → palabra (vocabulario contextual) */
  const SIT = [
    ['You call a restaurant and ask for a table for four at eight o\'clock.', 'reservation'],
    ['This train goes from A to B with no changes at all.', 'direct'],
    ['The paper (or app) that tells you when every bus leaves.', 'schedule'],
    ['The money you pay to travel one trip on the bus or subway.', 'fare'],
    ['You do this online, two months before your flight, to get a cheaper seat.', 'book'],
    ['The big building at the airport where you check in and wait.', 'terminal'],
    ['The board says your plane lands at 6:45 p.m. That is the…', 'arrival'],
    ['The board says your plane leaves at 3:10 p.m. That is the…', 'departure'],
    ['The subway has five of these, and they have different colors on the map.', 'lines'],
    ['The exact way the bus goes, street by street, from start to finish.', 'route'],
    ['You are sick in another country and you need a doctor today, without an appointment.', 'a walk-in clinic'],
    ['You lost your passport abroad and you need help from your government.', 'an embassy'],
    ['A wide, fast road for cars, with no traffic lights.', 'a highway'],
    ['You leave your car here while you go shopping.', 'a parking lot'],
    ['The part of the street where you walk, not where the cars go.', 'a sidewalk'],
    ['An old electric vehicle on rails that goes through the city streets.', 'a streetcar'],
    ['The style of the buildings: old, modern, beautiful…', 'architecture'],
    ['A wooden path by the ocean where people walk and eat ice cream.', 'a boardwalk'],
    ['This café just opened and everybody wants to go there. It is very…', 'trendy'],
    ['The first room you enter in a hotel or office building.', 'the lobby'],
    ['You are on floor 1 and the meeting is on floor 9. You take this.', 'the elevator'],
  ];
  const SITWORDS = [...new Set(SIT.map(s => s[1]))];

  /* ---------- Gramática ---------- */
  const ART = ['a', 'an', 'the', 'no article'];
  const MOD = ['should', "shouldn't", 'could', "couldn't", 'would', "wouldn't"];

  window.UNIT_DATA['ingles3/unit3'] = {
    source: 'WeTalk · Level 3 · Unit 3 · Getting around: travel, city places & giving advice',
    description: 'Viajes y transporte público, lugares de la ciudad, artículos (a/an, the, sin artículo), modales para dar consejo (should, could, would) y cómo pedir y dar direcciones.',
    map: [
      ['Vocabulary', 'Transporte público (<i>arrival, book, departure, direct, fare, lines, reservation, route, schedule, terminal</i>), lugares de la ciudad (<i>clinic, embassy, highway, parking lot…</i>) y describir una ciudad (<i>streetcars, trendy, architecture, vendors, boardwalk</i>)', 'Flashcards con audio, emparejar y situación → palabra'],
      ['Grammar', 'Artículos <i>a / an / the</i> y cuándo NO usar artículo; modales de consejo <i>should, shouldn\'t, could, would, wouldn\'t</i>', 'Notas con tablas, elige el artículo, elige el modal y monta la pregunta'],
      ['Listening', 'Diálogos de viajes y reservas', 'Dictado con voz sintética (velocidad ajustable) y diálogo con preguntas'],
      ['Speaking', 'Grabarte dando consejos de viaje a un amigo (cómo llegar a un sitio)', 'Retos con cronómetro y reconocimiento de voz; sílaba tónica'],
      ['Reading', 'Descripción de una ciudad y su transporte (Lisboa)', 'Texto nuevo sobre el mismo tema + inferir significado'],
      ['Writing', 'Solicitud para ser voluntario en un festival', 'Corrige errores típicos de artículos y modales, checklist de escritura'],
      ['Social English', 'Pedir y dar direcciones dentro de un edificio (<i>How do I get to…? It\'s on the left.</i>)', 'Ordenar diálogos, preguntas indirectas y respuesta rápida'],
    ],
    cando: [
      "Hablar de transporte público y viajes con el vocabulario de la unidad: <i>fare, schedule, route, direct, terminal, departure, arrival, book</i>",
      "Nombrar lugares de la ciudad y describir una ciudad que me encantó: <i>trendy neighborhoods, amazing architecture, streetcars, vendors, boardwalk</i>",
      "Elegir bien entre <i>a / an</i>, <i>the</i> y sin artículo: primera mención, lo ya conocido, profesiones (<i>He's a firefighter</i>), generalizaciones y países",
      "Dar consejos con la fuerza justa (<i>You should…</i>, <i>You could…</i>, <i>I'd…</i>, <i>I wouldn't…</i>) y preguntar sin <i>do</i>: <i>Should I…? Could I…?</i>",
      "Pedir direcciones dentro de un edificio con educación: <i>Can you tell me how to get to…?</i>, <i>Do you know where the stairs are?</i>, <i>Which way is…?</i>",
      "Dar direcciones paso a paso: <i>Go down that hallway</i>, <i>Go through the lobby</i>, <i>Turn right</i>, <i>It's on your left</i>",
    ],

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...TRAVEL.map(t => ({ cat: 'Public transportation', w: t[0], def: t[1], ex: t[2], ask: t[3] })),
            ...PLACES.map(p => ({ cat: 'Places in a city', w: p[0], say: p[0].replace(/^(a |an |the )/, ''), def: p[1], ex: p[2], ask: p[3] })),
            ...CITY.map(c => ({ cat: 'Describing a city', w: c[0], say: c[0].replace(/^(a |an |the )/, ''), def: c[1], ex: c[2], ask: c[3] })),
            ...BUILDING.map(b => ({ cat: 'Inside a building', w: b[0], say: b[0].replace(/^(a |an |the )/, ''), def: b[1], ex: b[2], ask: b[3] })),
          ] },
        { label: 'Palabra ↔ Significado', type: 'match', eyebrow: 'Public transportation', title: 'Empareja la palabra con su significado', intro: 'Toca una palabra de la izquierda y luego su significado de la derecha. Son las diez palabras clave de la unidad.', pairs: TRAVEL.map(t => [t[0], t[1]]), round: 6 },
        { label: 'Lugares de la ciudad', type: 'match', eyebrow: 'Places in a city', title: 'Empareja el lugar con su traducción', intro: 'Fíjate en el artículo que lleva cada uno: te servirá para la sección de gramática.', pairs: [...PLACES, ...CITY].map(p => [p[0], p[1]]), round: 6 },
        { label: '¿Qué palabra es?', type: 'mcq', eyebrow: 'Situación → palabra', title: 'Lee la situación y elige la palabra correcta', intro: 'No traduzcas: imagina la escena y elige.', pool: 8,
          build: ({ pick, esc }) => pick(SIT, 8).map(s => ({ q: esc(s[0]), opts: [s[1], ...pick(SITWORDS.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + s[1] + '</b> — ' + ([...TRAVEL, ...PLACES, ...CITY, ...BUILDING].find(v => v[0] === s[1]) || [null, '?'])[1] + '.' })) },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas · Artículos', type: 'notes', eyebrow: 'Articles', title: 'a / an · the · sin artículo', html: `
          <p style="margin:8px 0 14px">Pregúntate dos cosas: <b>¿el oyente ya sabe de cuál hablo?</b> y <b>¿es singular contable?</b> Con esas dos respuestas eliges siempre bien.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Cuándo</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>a / an</b></td><td>lo mencionas por <b>primera vez</b></td><td>It's <b>an</b> invitation from Triple Dipper Sports.</td><td>el oyente aún no sabe cuál</td></tr>
            <tr><td><b>the</b></td><td>mencionas <b>lo mismo otra vez</b></td><td>What's <b>the</b> invitation for?</td><td>ya salió en la conversación</td></tr>
            <tr><td><b>a / an</b></td><td>algo <b>no definido</b>, uno entre muchos</td><td>That's <b>a</b> triathlon, right? · Look, there's <b>an</b> airplane.</td><td>uno cualquiera, normal</td></tr>
            <tr><td><b>the</b></td><td>está <b>claro cuál</b> es, o el otro ya lo conoce</td><td>It's <b>the</b> famous one, in Hawai'i. · Your phone is in <b>the</b> kitchen.</td><td>solo hay uno posible</td></tr>
            <tr><td><b>a / an</b></td><td><b>profesiones</b></td><td>My brother is <b>a</b> firefighter.</td><td>en español no lleva artículo: ojo</td></tr>
            <tr><td><b>sin artículo</b></td><td>plurales e incontables <b>en general</b></td><td>I want to watch Hawaiian sunsets. · We enjoy listening to music.</td><td>hablas de la categoría entera</td></tr>
            <tr><td><b>sin artículo</b></td><td>la mayoría de <b>países, ciudades, continentes</b>, y nombres de parques y calles</td><td>He lives in Peru. · We walked along Fifth Avenue.</td><td>nombres propios de lugar</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>an</b> antes de <b>sonido</b> vocálico: <i>an embassy, an airplane, an hour</i> (la <i>h</i> es muda) — pero <i>a university</i> (suena <i>yu-</i>).</div>
          <div class="hint" style="margin-top:10px"><b>Trampa para hispanohablantes:</b> en español decimos <i>«Me gusta la música»</i> y <i>«Mi hermano es bombero»</i>. En inglés es justo al revés: <i>I like <s>the</s> music</i> → <b>I like music</b>, y <i>He is <s>—</s> firefighter</i> → <b>He is a firefighter</b>.</div>` },
        { label: 'Elige el artículo', type: 'mcq', eyebrow: 'Articles', title: 'Completa con a, an, the o sin artículo', intro: 'Frases nuevas, misma regla. Lee la frase entera antes de decidir.', pool: 8, items: [
          { blank: 1, q: 'We stayed in ___ small hotel near the train station.', opts: ART, a: 'a', why: 'Primera mención, singular contable, no sabemos cuál → <b>a</b>.' },
          { blank: 1, q: 'The hotel was cheap, but ___ rooms were tiny.', opts: ART, a: 'the', why: 'Ya hablamos de ese hotel, así que sabemos de qué habitaciones hablamos → <b>the</b>.' },
          { blank: 1, q: 'My cousin is ___ engineer at the airport.', opts: ART, a: 'an', why: 'Profesión → a/an. <i>Engineer</i> empieza por sonido vocálico → <b>an</b>.' },
          { blank: 1, q: 'I love ___ trains. They are more comfortable than buses.', opts: ART, a: 'no article', why: 'Plural en sentido general (los trenes en general) → <b>sin artículo</b>.' },
          { blank: 1, q: 'Excuse me, do you know where ___ elevator is?', opts: ART, a: 'the', why: 'En este edificio solo hay uno y el otro sabe cuál es → <b>the</b>.' },
          { blank: 1, q: 'She has lived in ___ Portugal for six years.', opts: ART, a: 'no article', why: 'La mayoría de países van <b>sin artículo</b>.' },
          { blank: 1, q: 'We walked along ___ Fifth Avenue for almost an hour.', opts: ART, a: 'no article', why: 'Nombres de calles y parques → <b>sin artículo</b>.' },
          { blank: 1, q: 'There was ___ accident on the highway this morning.', opts: ART, a: 'an', why: 'Primera mención + sonido vocálico → <b>an</b>.' },
          { blank: 1, q: "Look, there's ___ streetcar coming. Let's run!", opts: ART, a: 'a', why: 'Un tranvía cualquiera, uno de muchos → <b>a</b>.' },
          { blank: 1, q: 'Your ticket is on ___ table in the kitchen.', opts: ART, a: 'the', why: 'Está claro de qué mesa hablamos (la de nuestra cocina) → <b>the</b>.' },
          { blank: 1, q: "He's ___ firefighter, and he loves his job.", opts: ART, a: 'a', why: 'Profesión → <b>a</b>. En español no lleva artículo, en inglés sí.' },
          { blank: 1, q: 'We enjoy listening to ___ music while we travel.', opts: ART, a: 'no article', why: 'Incontable en sentido general → <b>sin artículo</b>.' },
          { blank: 1, q: 'Is this ___ direct route, or do I have to change lines?', opts: ART, a: 'a', why: 'Una ruta entre varias posibles, primera mención → <b>a</b>.' },
          { blank: 1, q: 'They closed ___ bridges downtown because of the marathon.', opts: ART, a: 'the', why: 'Los puentes concretos del centro, que los dos conocemos → <b>the</b>.' },
          { blank: 1, q: "I'd like to book ___ table for four people, please.", opts: ART, a: 'a', why: 'Primera mención de una mesa cualquiera → <b>a</b>.' },
          { blank: 1, q: 'Could you check ___ schedule for the 6 o\'clock train?', opts: ART, a: 'the', why: 'El horario concreto de esa línea, ya identificado → <b>the</b>.' },
          { blank: 1, q: 'His girlfriend called ___ U.S. embassy, and they helped a lot.', opts: ART, a: 'the', why: 'Solo hay una embajada de EE. UU. en ese país → <b>the</b>.' },
          { blank: 1, q: 'I saw a food market in ___ parking lot near the city center.', opts: ART, a: 'a', why: 'Un estacionamiento cualquiera, primera mención → <b>a</b>.' },
        ] },
        { label: 'Notas · Modales de consejo', type: 'notes', eyebrow: 'Modals for advice', title: 'should · could · would', html: `
          <p style="margin:8px 0 14px">Los tres dan consejo, pero con <b>fuerza distinta</b>. Todos van seguidos del <b>verbo en infinitivo sin <i>to</i></b>: <i>You should <s>to</s> book</i> → <b>You should book</b>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Uso</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>should</b></td><td>es <b>buena idea</b> (consejo directo)</td><td>You <b>should</b> hang the painting over there.</td><td>"deberías"</td></tr>
            <tr><td><b>shouldn't</b></td><td>es <b>mala idea</b></td><td>You <b>shouldn't</b> leave it in the closet.</td><td>"no deberías"</td></tr>
            <tr><td><b>could</b></td><td>es <b>posible</b>, una opción entre varias</td><td>We <b>could</b> hang the painting here.</td><td>"podríamos"; más suave</td></tr>
            <tr><td><b>would</b> (I'd)</td><td><b>en mi opinión</b>, yo lo haría así</td><td>I <b>would</b> put it here. · <b>I'd</b> put the painting in the hallway.</td><td>casi siempre con <i>I</i></td></tr>
            <tr><td><b>wouldn't</b></td><td>yo <b>no</b> lo haría: no lo hagas</td><td>I <b>wouldn't</b> use a hammer on that wall.</td><td>"yo que tú, no…"</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:18px">Preguntas</h3>
          <p style="margin-top:6px"><b>Yes / no:</b> modal + sujeto + verbo. <i><b>Should</b> I hang the painting near my bed?</i> → <i>Yes, you <b>should</b>. / No, you <b>shouldn't</b>.</i> · <i><b>Could</b> it go there, on the wall?</i> → <i>Yes, it <b>could</b>. / No, it <b>couldn't</b>.</i> · <i><b>Would</b> you hang this painting in the kitchen?</i> → <i>Yes, I <b>would</b>. / No, I <b>wouldn't</b>.</i></p>
          <p style="margin-top:8px"><b>Con partícula interrogativa:</b> what / where / why / how + modal + sujeto + verbo. <i><b>Where should</b> I put this painting?</i> · <i><b>How could</b> I hang this painting up?</i> · <i><b>What would</b> you do?</i></p>
          <div class="hint" style="margin-top:14px"><b>Nunca</b> uses <i>do/does</i> con un modal: <i><s>Do I could</s> walk to the station?</i> → <b>Could I walk to the station?</b> Y la negación se forma con <b>n't</b>: <i><s>I don't would</s></i> → <b>I wouldn't</b>.</div>` },
        { label: 'Elige el modal', type: 'mcq', eyebrow: 'Modals for advice', title: '¿should, could o would?', intro: 'Fíjate en la respuesta o en el contexto: casi siempre te dicen cuál toca.', pool: 8, items: [
          { blank: 1, q: 'In my opinion it\'s the best option. I ___ book the tickets online.', opts: MOD, a: 'would', why: '<i>In my opinion</i> + <i>I</i> → <b>I would</b> = yo lo haría así.' },
          { blank: 1, q: 'You ___ leave your bag on the seat. Someone could take it.', opts: MOD, a: "shouldn't", why: 'Es mala idea y se lo dices directamente → <b>shouldn\'t</b>.' },
          { blank: 1, q: "It's possible: we ___ take the 7:15 train if we hurry.", opts: MOD, a: 'could', why: '<i>It\'s possible</i> → <b>could</b> presenta una opción posible.' },
          { blank: 1, q: 'You ___ check the schedule before you go. It changes on Sundays.', opts: MOD, a: 'should', why: 'Consejo directo y claramente buena idea → <b>should</b>.' },
          { blank: 1, q: '"___ I walk to the station from here, do you think?" "Yes, you could."', opts: MOD, a: 'could', why: 'La respuesta <i>Yes, you could</i> te da la pista: preguntas si es <b>posible</b>.' },
          { blank: 1, q: '"Should I book in advance?" "Yes, you ___."', opts: MOD, a: 'should', why: 'La respuesta corta repite el modal de la pregunta: <b>should</b>.' },
          { blank: 1, q: '"Would you take the highway?" "No, I ___. There\'s too much traffic."', opts: MOD, a: "wouldn't", why: 'Respuesta corta negativa a <i>would</i> → <b>wouldn\'t</b>.' },
          { blank: 1, q: 'I ___ use that app. It shows the wrong departure times.', opts: MOD, a: "wouldn't", why: '"Yo que tú, no lo haría" → <b>I wouldn\'t</b>.' },
          { blank: 1, q: 'We ___ walk to the boardwalk after dinner, if you feel like it.', opts: MOD, a: 'could', why: 'Sugerencia suave, una posibilidad → <b>could</b>.' },
          { blank: 1, q: '"Could it be cheaper to fly?" "No, it ___. The fare is over $300."', opts: MOD, a: "couldn't", why: 'Respuesta corta negativa a <i>could</i> → <b>couldn\'t</b>.' },
          { blank: 1, q: "You ___ carry all that cash on the streetcar. It isn't safe.", opts: MOD, a: "shouldn't", why: 'Advertencia directa → <b>shouldn\'t</b>.' },
          { blank: 1, q: '"What ___ you do if the bus is late?" "I\'d get a taxi."', opts: MOD, a: 'would', why: 'La respuesta <i>I\'d</i> (= I would) confirma el modal: <b>would</b>.' },
          { blank: 1, q: 'I ___ recommend that hotel. It was noisy and the rooms were dirty.', opts: MOD, a: "wouldn't", why: 'Opinión negativa personal → <b>I wouldn\'t</b>.' },
          { blank: 1, q: 'A direct route ___ save us an hour, but the fare is higher.', opts: MOD, a: 'could', why: 'Posibilidad, no certeza → <b>could</b>.' },
          { blank: 1, q: 'Tourists ___ try the streetcar at least once. It\'s the best way to see the city.', opts: MOD, a: 'should', why: 'Recomendación general clara → <b>should</b>.' },
        ] },
        { label: 'Monta la pregunta', type: 'mcq', eyebrow: 'Word order', title: 'Elige la pregunta bien construida', intro: 'Con modales nunca se usa <i>do/does</i> y el verbo va en infinitivo sin <i>to</i>.', pool: 7, items: [
          { q: 'Pregunta a un amigo si es <b>posible</b> ir andando a la estación desde aquí.', opts: ['Could I walk to the station from here?', 'Do I could walk to the station from here?', 'Could I to walk to the station from here?', 'I could walk to the station from here?'], a: 'Could I walk to the station from here?', why: 'Modal + sujeto + verbo base. Sin <i>do</i> y sin <i>to</i>.' },
          { q: 'Pregunta <b>dónde</b> debes dejar la maleta.', opts: ['Where should I leave my suitcase?', 'Where I should leave my suitcase?', 'Where do I should leave my suitcase?', 'Where should I to leave my suitcase?'], a: 'Where should I leave my suitcase?', why: 'Partícula + modal + sujeto + verbo base.' },
          { q: 'Pregunta a tu amigo <b>qué haría él</b> en tu lugar.', opts: ['What would you do?', 'What do you would?', 'What would you to do?', 'What you would do?'], a: 'What would you do?', why: '<i>What would you do?</i> es la pregunta estándar para pedir consejo.' },
          { q: 'Pregunta si <b>deberías</b> reservar los billetes con antelación.', opts: ['Should I book the tickets in advance?', 'Should I to book the tickets in advance?', 'Do I should book the tickets in advance?', 'I should book the tickets in advance?'], a: 'Should I book the tickets in advance?', why: 'Yes/no question: modal delante del sujeto, verbo base detrás.' },
          { q: 'Pregunta <b>cómo</b> puedes llegar al aeropuerto.', opts: ['How could I get to the airport?', 'How I could get to the airport?', 'How could I getting to the airport?', 'How do I could get to the airport?'], a: 'How could I get to the airport?', why: '<i>How + could + I + get</i>. El verbo siempre en forma base.' },
          { q: 'Responde <b>que sí</b> a "Would you take the train?"', opts: ['Yes, I would.', 'Yes, I do.', 'Yes, I would take.', 'Yes, I am.'], a: 'Yes, I would.', why: 'La respuesta corta repite el modal, sin el verbo principal.' },
          { q: 'Responde <b>que no</b> a "Should I change lines here?"', opts: ["No, you shouldn't.", "No, you don't should.", 'No, you should not to.', "No, I wouldn't."], a: "No, you shouldn't.", why: 'La negación del modal se hace con <b>n\'t</b>, no con <i>don\'t</i>.' },
          { q: 'Pregunta a un amigo <b>si él</b> cogería un taxi desde la terminal.', opts: ['Would you take a taxi from the terminal?', 'Do you would take a taxi from the terminal?', 'Would you taking a taxi from the terminal?', 'You would take a taxi from the terminal?'], a: 'Would you take a taxi from the terminal?', why: 'Modal + sujeto + verbo base para pedir la opinión del otro.' },
          { q: 'Pregunta <b>por qué</b> no deberíais ir por la autopista.', opts: ["Why shouldn't we take the highway?", "Why we shouldn't take the highway?", "Why don't we should take the highway?", "Why shouldn't we to take the highway?"], a: "Why shouldn't we take the highway?", why: 'Partícula + modal negativo + sujeto + verbo base.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>I\'d</i>, <i>won\'t</i>, <i>it\'s</i>).',
          sentences: [
            'You need to look at a schedule.',
            "I think that the route is direct, so you won't need to change trains.",
            'Remember, you need to arrive at the terminal two hours before the flight leaves.',
            "I'd like to book a table for four people at eight o'clock this evening.",
            'I looked at flying direct, but the fare was too expensive.',
            "I've already booked tickets for the bus and the train.",
            'Could I walk to the station from here, do you think?',
            'Yes, you could. But it would be faster to get a taxi.',
            'Excuse me. How do I get to the lobby?',
            "Go down that hallway, and they're on your right.",
            'The streetcars are really convenient, and there are so many trendy neighborhoods.',
            'My brother is a firefighter. He works at the fire station in the city center.',
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for detail', title: 'Escucha el diálogo y responde', intro: 'Dos amigos hablan de cómo llegar al aeropuerto. Escúchalo entero antes de responder.',
          lines: [
            ['Dani', "Hey, Molly. My flight leaves at seven tomorrow morning. How should I get to the airport?"],
            ['Molly', "Well, you could take the airport bus, but it isn't direct — you have to change lines at the main terminal."],
            ['Dani', 'Hmm. And the train?'],
            ['Molly', "The train is direct and the fare is only eight dollars. I'd take the train, honestly."],
            ['Dani', 'Do I need to book a ticket before I go?'],
            ['Molly', "You should. It's cheaper online. And check the schedule tonight — the first departure is at four fifty."],
            ['Dani', "Four fifty? Perfect. Should I take a taxi instead?"],
            ['Molly', "I wouldn't. At that time the highway is fine, but a taxi costs about sixty dollars."],
          ],
          questions: [
            { q: 'Why does Molly NOT recommend the airport bus?', opts: ["It isn't direct", 'It is too expensive', 'It leaves too early'], a: "It isn't direct", why: 'Dice: "it isn\'t direct — you have to change lines at the main terminal".' },
            { q: 'What does Molly advise about the ticket?', opts: ['He should book it online, because it is cheaper', 'He should buy it at the station', 'He should not book it at all'], a: 'He should book it online, because it is cheaper', why: '"You should. It\'s cheaper online." <b>Should</b> = consejo directo.' },
            { q: 'What time is the first departure?', opts: ['4:50', '7:00', '8:00'], a: '4:50', why: '"The first departure is at four fifty."' },
            { q: 'What does "I wouldn\'t" mean here?', opts: ['Molly thinks taking a taxi is a bad idea', 'Molly cannot drive a taxi', 'Molly has never taken a taxi'], a: 'Molly thinks taking a taxi is a bad idea', why: '<b>I wouldn\'t</b> = yo no lo haría, es decir, no te lo aconsejo.' },
            { q: 'How much is the train fare?', opts: ['eight dollars', 'sixty dollars', 'fifty dollars'], a: 'eight dollars', why: '"The train is direct and the fare is only eight dollars."' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', intro: 'La tarea del curso: grábate dando consejos de viaje a un amigo. Usa modales (<i>should, could, would, wouldn\'t</i>) y vocabulario de transporte.', challenges: [
          { t: 'How do I get to the nearest airport?', task: 'Un amigo está en tu casa y quiere ir al aeropuerto más cercano. Explícale la ruta: ¿es directa o hay que cambiar de línea?, ¿cuánto dura?, ¿es cara la tarifa? Usa al menos tres modales de consejo.', model: "Modelo: \"You could take the airport bus, but it isn't direct — you have to change lines downtown. I'd take the train: it's direct and the fare is only eight soles. You should check the schedule tonight, because the first departure is at four fifty.\"", tags: ['should', 'could', "i'd", 'direct', 'fare', 'schedule', 'change lines', 'departure'] },
          { t: 'Booking and getting to a good restaurant', task: 'Recomienda un restaurante a un amigo: cómo llegar, si hace falta reservar y qué transporte le conviene. Incluye al menos un consejo negativo (<i>I wouldn\'t… / You shouldn\'t…</i>).', model: "Modelo: \"You should book a table — it's very popular on Fridays, and they only keep your reservation for fifteen minutes. It's in a trendy neighborhood near the boardwalk. You could walk from the city center in twenty minutes, but I wouldn't drive: there's no parking lot nearby.\"", tags: ['book', 'reservation', 'should', "wouldn't", 'parking lot', 'neighborhood', 'walk'] },
          { t: 'The nearest train station', task: 'Explica cómo llegar a la estación de tren más cercana desde donde estás. Da dos opciones posibles y di cuál prefieres tú y por qué.', model: "Modelo: \"Could you walk? Yes, you could — it's about fifteen minutes down that avenue. But I'd take the streetcar: it stops right outside the station and it's really convenient. You shouldn't take a taxi at six o'clock; the traffic is terrible.\"", tags: ['could', "i'd", 'streetcar', 'convenient', "shouldn't", 'station', 'about'] },
          { t: 'Describe a city you loved', task: 'Describe una ciudad que te encantó: su transporte, sus barrios, su arquitectura y sus mercados. Usa al menos cinco palabras de la unidad.', model: "Modelo: \"I just loved exploring the city. The streetcars are really convenient — you can get off on whatever street interests you. There are so many trendy neighborhoods, and the architecture is amazing: there are historic buildings everywhere. There are markets with vendors selling souvenirs, and I loved walking on the boardwalk.\"", tags: ['streetcars', 'convenient', 'trendy', 'neighborhoods', 'architecture', 'vendors', 'boardwalk', 'historic'] },
          { t: 'Directions inside a building', task: 'Alguien acaba de llegar a tu oficina y no encuentra la sala de reuniones. Dale las indicaciones paso a paso desde el vestíbulo.', model: "Modelo: \"Sure. Go through the lobby and turn right. Go down that hallway, and the elevator is on the left. Take it to the fourth floor. Meeting room C is the second door on the right, opposite the cafeteria.\"", tags: ['go down', 'go through', 'turn right', 'on the left', 'lobby', 'hallway', 'elevator', 'floor'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación', title: 'Sílaba tónica de las palabras de la unidad', intro: 'La sílaba en mayúsculas es la fuerte. Escucha y repite.',
          pairs: [
            ['a-RRI-val', 'arrival'], ['de-PAR-ture', 'departure'], ['re-ser-VA-tion', 'reservation'],
            ['SCHE-dule', 'schedule'], ['TER-mi-nal', 'terminal'], ['di-RECT', 'direct'],
            ['AR-chi-tec-ture', 'architecture'], ['con-VE-nient', 'convenient'], ['EM-bas-sy', 'embassy'],
            ['ca-fe-TE-ri-a', 'cafeteria'], ['E-le-va-tor', 'elevator'], ['NEIGH-bor-hood', 'neighborhood'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'Three days without a car', intro: 'Lee una vez para la idea general. Luego responde. Las palabras en amarillo se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'When I told my friends I was visiting Lisbon without renting a car, they looked worried. "How will you get around?" they asked. Three days later I had the answer: better, cheaper and slower, which turned out to be exactly what I wanted.',
            'My first stop was the ticket office at the terminal, where I bought a travel <b>pass</b> for twenty-four hours. It cost less than two taxi rides and it worked on every line: buses, the subway and the old yellow streetcars. The vendor explained the schedule, drew my route on a paper map and told me which stop to use for the historic neighborhoods. Nobody was in a hurry.',
            'The streetcars are not fast. In fact, at <b>rush hour</b> they are so full that you cannot see out of the window, and the driver rings the bell every thirty seconds. But you can get off wherever the architecture looks interesting, walk for ten minutes, and get on the next one. My only real problem was that I had to <b>transfer</b> twice to reach the boardwalk, and each change cost me fifteen minutes.',
            'Was it <b>worth it</b>? Absolutely. I saw markets, bridges and sidewalks full of people instead of a parking lot. If you are planning a city trip, I would leave the car at home. You should check the schedule the night before, buy a pass, and then simply get lost on purpose.',
          ],
          main: [
            { q: 'The writer explains how he bought a travel pass and what it included.', opts: ['1', '2', '3', '4'], a: '2', why: 'El párrafo 2 cuenta la compra del pase y qué líneas cubría.' },
            { q: 'The writer gives his final opinion and advice to other travelers.', opts: ['1', '2', '3', '4'], a: '4', why: 'El párrafo 4 cierra con <i>I would leave the car at home</i> y <i>You should check the schedule</i>.' },
            { q: "The writer's friends were surprised by his decision.", opts: ['1', '2', '3', '4'], a: '1', why: 'El párrafo 1 presenta la reacción de los amigos: "How will you get around?".' },
            { q: 'The writer describes the good and bad points of the streetcars.', opts: ['1', '2', '3', '4'], a: '3', why: 'El párrafo 3 compara lo lentos y llenos que van con la libertad de bajarse donde quieras.' },
          ],
          infer: [
            { q: '<b>pass</b> (paragraph 2)', opts: ['a ticket you can use many times for a period of time', 'a map of the city', 'the money you pay for one single trip'], a: 'a ticket you can use many times for a period of time', why: 'Costó menos que dos taxis y servía <i>for twenty-four hours</i> en todas las líneas.' },
            { q: '<b>rush hour</b> (paragraph 3)', opts: ['the time of day when a lot of people travel to or from work', 'the fastest service of the day', 'the last streetcar at night'], a: 'the time of day when a lot of people travel to or from work', why: 'Es cuando van tan llenos que no se ve por la ventana.' },
            { q: '<b>transfer</b> (paragraph 3)', opts: ['change from one line or vehicle to another', 'buy a second ticket', 'wait at the terminal'], a: 'change from one line or vehicle to another', why: 'Cada cambio le costaba quince minutos: es el <i>change lines</i> del vocabulario.' },
            { q: '<b>worth it</b> (paragraph 4)', opts: ['good enough to justify the time or money you spent', 'very expensive', 'difficult to organize'], a: 'good enough to justify the time or money you spent', why: 'Responde <i>Absolutely</i> y enumera lo que ganó: mercados, puentes, gente.' },
          ],
          think: '¿Viajarías por tu ciudad sin coche durante tres días? Escribe dos frases usando <i>I would… because…</i> y <i>I wouldn\'t… because…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Corrige la frase', type: 'fix', eyebrow: 'Error correction', title: 'Reescribe la frase corrigiendo el error', intro: 'Errores típicos de esta unidad: artículos y modales. Cada frase tiene uno o dos. Corrígela y compara.', items: [
          { bad: 'I am very interested in the world culture and I have organized two events.', good: 'I am very interested in world culture and I have organized two events.', why: '<b>Sin artículo</b> con incontables en sentido general: <i>world culture, music, traffic</i>.' },
          { bad: 'My brother is firefighter and he works in city center.', good: 'My brother is a firefighter and he works in the city center.', why: 'Profesión → <b>a</b> firefighter. Lugar conocido por los dos → <b>the</b> city center.' },
          { bad: 'You should to book the tickets before you travel.', good: 'You should book the tickets before you travel.', why: 'Los modales van con el <b>verbo base sin <i>to</i></b>: <i>should book</i>.' },
          { bad: "I don't would use that route; there is too much traffic.", good: "I wouldn't use that route; there is too much traffic.", why: 'La negación del modal se hace con <b>n\'t</b>, nunca con <i>don\'t</i>: <b>wouldn\'t</b>.' },
          { bad: 'Do you know how do I get to the lobby?', good: 'Do you know how to get to the lobby?', why: 'En una pregunta <b>indirecta</b> no hay inversión ni auxiliar: <i>how to get</i> o <i>how I get</i>.' },
          { bad: 'I would to travel by train because the fare is cheaper.', good: 'I would travel by train because the fare is cheaper.', why: '<b>would + verbo base</b>. Solo lleva <i>to</i> en <i>would <b>like</b> to</i>.' },
          { bad: "I've never work at a big festival before, but I'm excited to try.", good: "I've never worked at a big festival before, but I'm excited to try.", why: '<b>Present perfect</b> = have/has + <b>participio</b>: <i>worked</i>.' },
          { bad: 'The fare was too much expensive, so I booked the bus.', good: 'The fare was too expensive, so I booked the bus.', why: '<b>too + adjetivo</b>. <i>Too much</i> solo acompaña a sustantivos incontables (<i>too much traffic</i>).' },
          { bad: 'I have lived here all my life, so I know well the transportation system.', good: 'I have lived here all my life, so I know the transportation system well.', why: 'En inglés el adverbio no se mete entre el verbo y su objeto: va <b>al final</b>.' },
          { bad: 'Could you to tell me which way is the elevator?', good: 'Could you tell me which way the elevator is?', why: 'Modal sin <i>to</i> + pregunta indirecta con el orden de una afirmación: <i>which way the elevator <b>is</b></i>.' },
        ] },
        { label: 'Escribe tu solicitud', type: 'comment', eyebrow: 'Writing task', title: 'Solicita ser voluntario en un festival internacional', intro: 'Como la tarea del curso: explica por qué quieres ser voluntario, qué experiencia tienes y por qué conoces bien el transporte de tu ciudad. Escribe 70-120 palabras. La checklist se marca sola al analizar el texto.', placeholder: 'I would like to volunteer at the festival because…', min: 70, max: 120, need: 4, checks: [
          { label: 'Digo por qué quiero ser voluntario (<i>I would like to… / I\'m interested in…</i>)', re: /\b(i would like to|i'd like to|i am interested in|i'm interested in|i want to volunteer)/i },
          { label: 'Hablo de mi experiencia con <b>present perfect</b> (<i>I have organized… / I\'ve never…</i>)', re: /\b(i have |i've |have organized|have worked|have lived|have never)/i },
          { label: 'Uso al menos un modal de consejo o de opinión (<i>would, could, should, wouldn\'t</i>)', words: ['would', 'could', 'should', "wouldn't", "shouldn't", "i'd "] },
          { label: 'Menciono el transporte con vocabulario de la unidad (<i>route, schedule, lines, fare…</i>)', words: ['route', 'schedule', 'line', 'fare', 'terminal', 'departure', 'arrival', 'direct', 'streetcar', 'subway', 'transportation', 'station'] },
          { label: 'Cuido los artículos: <i>a/an</i> con profesiones y <b>sin artículo</b> en generalizaciones', re: /\b(i am a |i'm a |as a |a volunteer|an? (student|engineer|developer|teacher|guide))/i },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Pedir y dar direcciones', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Asking for directions</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Can you tell me how to get to the staff room?</li><li>How do I get to the cafeteria?</li><li>Which way is the lobby?</li><li>Do you know where the stairs are?</li><li>Do you know which floor the cafeteria is on?</li><li>Do you know how to get to meeting room C?</li></ul></div>
          <div><h3>Giving directions</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>It's on the left. / It's on your right.</li><li>Go down that hallway.</li><li>Go through the lobby. / Walk through the lobby.</li><li>Turn right. / Turn left.</li><li>Take the elevator to the fourth floor.</li></ul></div>
          <div class="hint small"><b>Directa vs indirecta.</b> <i>How do I get to the lobby?</i> lleva inversión (<i>do I</i>) porque es una pregunta directa. Pero si empiezas con <i>Can you tell me…</i> o <i>Do you know…</i>, la segunda parte ya <b>no</b> se invierte: <i>Can you tell me <b>how to get</b> to the lobby?</i> · <i>Do you know <b>where the stairs are</b>?</i> (no <i><s>where are the stairs</s></i>).</div>
          <div class="hint small"><b>Phrasal verbs de movimiento:</b> <b>go down</b> (recorrer un pasillo), <b>go through</b> / <b>walk through</b> (atravesar un espacio), <b>get to</b> (llegar a), <b>get off</b> (bajarse de un transporte).</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ['Ana: Excuse me. How do I get to the lobby?', 'Ben: Go down that hallway and turn right.', 'Ana: And the elevator? Which way is it?', "Ben: It's on the left, just before the stairs.", 'Ana: Great, thank you so much.'],
          ['Sam: Can you tell me how to get to the staff room?', "Nina: Sure. Walk through the lobby, and it's on your right.", 'Sam: Do you know which floor the cafeteria is on?', "Nina: The fourth. You could take the elevator, but I'd use the stairs.", "Sam: Good idea. I've been sitting all morning."],
          ['Ana: Could I walk to the station from here, do you think?', 'Molly: Yes, you could. But it would be faster to get a taxi.', 'Ana: Is the route direct?', "Molly: Not really. You'd have to change lines at the terminal.", "Ana: Then I'd better check the schedule first."],
        ] },
        { label: 'Hazlo indirecto', type: 'soft', eyebrow: 'Preguntas indirectas', title: 'Reescribe la pregunta de forma más educada', explain: 'A un desconocido, una pregunta directa puede sonar seca. Empieza con <b>Can you tell me…</b> o <b>Do you know…</b> y recuerda: después ya <b>no</b> se invierte el verbo.', pattern: /\b(can you tell me|could you tell me|do you know)\b/i, missing: 'Falta empezar con <b>Can you tell me…</b> o <b>Do you know…</b>', items: [
          { h: '"How do I get to the lobby?"', a: 'Can you tell me how to get to the lobby?' },
          { h: '"Where are the stairs?"', a: 'Do you know where the stairs are?' },
          { h: '"Which floor is the cafeteria on?"', a: 'Do you know which floor the cafeteria is on?' },
          { h: '"What time does the train leave?"', a: 'Can you tell me what time the train leaves?' },
          { h: '"How much is the fare to the airport?"', a: 'Do you know how much the fare to the airport is?' },
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices o qué respondes?', pool: 7, items: [
          { q: 'Estás en el vestíbulo y no sabes dónde está el ascensor. ¿Qué preguntas?', opts: ['Which way is the elevator?', 'Where is elevator?', 'Which way the elevator?', 'How is the elevator?'], a: 'Which way is the elevator?', why: '<b>Which way is…?</b> es la fórmula del curso para preguntar por la dirección de un sitio.' },
          { q: '"Do you know where the stairs are?" — Están justo detrás de ti, al otro lado del pasillo.', opts: ['Sure. Go down that hallway, and they\'re on your right.', 'Sure. Go down that hallway, and it\'s on your right.', 'Yes, I know the stairs.', 'Sure. The stairs is on the right.'], a: 'Sure. Go down that hallway, and they\'re on your right.', why: '<i>Stairs</i> es plural → <b>they\'re</b>, no <i>it\'s</i>.' },
          { q: 'Quieres preguntar de forma educada cómo llegar a la sala de personal.', opts: ['Can you tell me how to get to the staff room?', 'Can you tell me how do I get to the staff room?', 'Can you tell me how get to the staff room?', 'You tell me the staff room?'], a: 'Can you tell me how to get to the staff room?', why: 'Pregunta indirecta: <b>how to get</b>, sin <i>do I</i>.' },
          { q: 'Un compañero pregunta "Should I take the elevator?" y tú crees que sí.', opts: ['Yes, you should.', 'Yes, you do.', 'Yes, you should to.', 'Yes, I would you.'], a: 'Yes, you should.', why: 'La respuesta corta repite el modal de la pregunta.' },
          { q: 'Explicas que hay que atravesar el vestíbulo y luego girar a la derecha.', opts: ['Go through the lobby, then turn right.', 'Go down the lobby, then turn the right.', 'Go through the lobby, then turn on right.', 'Pass the lobby, then turn to right.'], a: 'Go through the lobby, then turn right.', why: '<b>go through</b> = atravesar un espacio; <b>turn right</b> sin preposición.' },
          { q: 'Un amigo pregunta "Would you take the highway?" y tú crees que es mala idea.', opts: ["No, I wouldn't. There's too much traffic.", "No, I don't. There's too much traffic.", "No, I shouldn't. There's too much traffic.", "No, I couldn't. There's too much traffic."], a: "No, I wouldn't. There's too much traffic.", why: 'La respuesta corta a <i>would</i> es <b>wouldn\'t</b>.' },
          { q: 'Llamas a un restaurante para reservar mesa para cuatro.', opts: ["Hi, I'd like to book a table for four people, please.", "Hi, I'd like book a table for four people, please.", "Hi, I want that you book a table for four.", "Hi, I'd like to reserve a table of four people, please."], a: "Hi, I'd like to book a table for four people, please.", why: '<b>I\'d like to book</b> es la fórmula del curso. <i>Book</i> = reservar.' },
          { q: 'Preguntas si hay que cambiar de línea o si el trayecto es directo.', opts: ['Is it a direct route, or do I need to change lines?', 'Is it direct route, or do I need change the lines?', 'It is a direct route, or I need to change lines?', 'Is it the direct route, or do I need to change a lines?'], a: 'Is it a direct route, or do I need to change lines?', why: '<b>a</b> direct route (primera mención) y <b>change lines</b> sin artículo.' },
          { q: 'Alguien pregunta "Could I walk to the station from here?" y sí es posible, pero hay algo más rápido.', opts: ['Yes, you could. But it would be faster to get a taxi.', 'Yes, you can could. But it would faster to get a taxi.', 'Yes, you could to. But it would be more fast to get a taxi.', 'Yes, you would. But it could be faster to get a taxi.'], a: 'Yes, you could. But it would be faster to get a taxi.', why: 'Respuesta corta con <b>could</b> + opinión con <b>would</b>.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Primer día en la nueva sede: direcciones y consejos de viaje', intro: 'El banco acaba de mudarse a una sede nueva en San Isidro y tienes una reunión en la sala C. Primero pide direcciones en recepción con educación (<i>Can you tell me how to get to…?</i>, <i>Which way is…?</i>); después, Diego, un colega de Arequipa, te pide consejo para llegar al aeropuerto. Aconséjalo con <i>should</i>, <i>could</i> y <i>I wouldn\'t</i>, y cuida los artículos.', scenes: [
          { t: 'Nueva sede', you: 'Aldo, recién llegado al edificio', partner: 'Rosa', role: 'recepcionista del vestíbulo; después, Diego, colega de la sucursal de Arequipa', goal: 'Llega a la sala de reuniones C preguntando con las fórmulas de la unidad y luego da a Diego consejos claros y realistas para llegar al aeropuerto.', start: 'a', nodes: {
            a: { say: "Good morning, welcome to the new building. Can I help you?", opts: [
              { t: "Good morning. Can you tell me how to get to meeting room C?", ok: 2, why: "La fórmula educada de la unidad: <b>Can you tell me how to get to…?</b> Pregunta indirecta, sin inversión (<i>how to get</i>, no <i>how do I get</i>).", next: 'b' },
              { t: "Hi. How do I get to meeting room C?", ok: 1, why: "Correcta: <b>How do I get to…?</b> es la pregunta directa del curso. Con una desconocida, la versión indirecta suena algo más suave.", next: 'b' },
              { t: "Hi. Can you tell me where is meeting room C?", ok: 0, why: "Después de <b>Can you tell me…</b> ya no se invierte: <b>where meeting room C is</b>. Es el error más típico de hispanohablante en preguntas indirectas.", next: 'a2' },
            ] },
            a2: { say: "Sorry, say that again? It's a bit noisy in here this morning.", opts: [
              { t: "Sure. Do you know where meeting room C is?", ok: 2, why: "Reformulas bien: <b>Do you know where … is?</b>, con el verbo al final, como en <i>Do you know where the stairs are?</i>", next: 'b' },
              { t: "Which way is meeting room C?", ok: 1, why: "Correcta: <b>Which way is…?</b> es otra fórmula del curso. Un <i>Sure</i> o <i>Sorry</i> delante la haría más natural tras repetir.", next: 'b' },
              { t: "Where is the meeting room C? I have meeting at nine.", ok: 0, why: "Dos fallos de artículo: <i>meeting room C</i> es un nombre propio y va <b>sin artículo</b>; en cambio <b>I have a meeting</b> lo necesita (singular contable, primera mención).", next: 'b' },
            ] },
            b: { say: "Of course. Meeting room C is on the fourth floor. Take the elevator, go down the hallway, and it's on your left.", opts: [
              { t: "Thanks. And which way is the elevator?", ok: 2, why: "<b>Which way is the elevator?</b>: la pregunta exacta de la unidad para orientarte. <i>The</i> porque en este vestíbulo está claro cuál es.", next: 'c' },
              { t: "Great, thanks. Where is the elevator?", ok: 1, why: "Correcta y clara. <b>Which way is…?</b> o <b>Do you know where the elevator is?</b> suenan un punto más amables.", next: 'c' },
              { t: "Thanks. Where is elevator?", ok: 0, why: "Falta el artículo: <b>the elevator</b>. En inglés los singulares contables casi nunca van solos, aunque en español digas «¿dónde está el ascensor?» sin pensar.", next: 'c' },
            ] },
            c: { say: "Go through the lobby, and it's on the left. Oh, but it's out of service this morning, I'm afraid. Do you know where the stairs are?", opts: [
              { t: "No, I don't. Can you tell me where they are?", ok: 2, why: "Respuesta corta + pregunta indirecta sin inversión: <b>Can you tell me where they are?</b> Y <i>stairs</i> es plural → <b>they</b>, no <i>it</i>.", next: 'd' },
              { t: "No. Could I walk up to the fourth floor, do you think?", ok: 1, why: "Correcta: pregunta con modal sin <i>do</i> (<b>Could I…?</b>) y el <b>do you think</b> del curso. Pero no le has preguntado dónde están las escaleras.", next: 'd' },
              { t: "No. Do you know where are the stairs?", ok: 0, why: "Tras <b>Do you know…</b> el verbo va al final: <b>where the stairs are</b>. Fíjate en que Rosa acaba de decirlo bien.", next: 'd' },
            ] },
            d: { say: "Right behind you, next to the coffee machine. It's four floors, though. You could wait ten minutes for the technician.", opts: [
              { t: "I think I should take the stairs. I don't want to be late for my first meeting here.", ok: 2, why: "<b>I should take</b>: modal + infinitivo sin <i>to</i>, y das el motivo. Natural y decidido.", next: 'e' },
              { t: "I'll take the stairs, thanks.", ok: 1, why: "Correcta y breve. La unidad te pide practicar los modales: <i>I should take the stairs</i> aprovecha mejor el momento.", next: 'e' },
              { t: "I should to take the stairs, I think.", ok: 0, why: "Nunca <i>should to</i>: detrás de un modal va el <b>infinitivo sin <i>to</i></b>: <b>I should take the stairs</b>.", next: 'e' },
            ] },
            e: { who: 'Diego', say: "Aldo! You made it. Hey, you know Lima. My flight is at six. How do I get to the airport from here? A taxi at five?", opts: [
              { t: "I wouldn't take a taxi at five. There's too much traffic. You should take the airport bus.", ok: 2, why: "Consejo negativo + positivo con la fuerza justa: <b>I wouldn't…</b> (yo que tú, no) y <b>You should…</b> (es buena idea). Y <i>there's too much traffic</i>, sin artículo: incontable en general.", next: 'f' },
              { t: "You could take a taxi, but it would be faster to take the airport bus.", ok: 1, why: "Correcta: <b>You could…</b> presenta la opción y <b>it would be faster to…</b> da tu opinión, como Molly en el diálogo del curso.", next: 'f' },
              { t: "Don't take taxi. Take the bus.", ok: 0, why: "Falta el artículo (<b>a taxi</b>) y dos imperativos seguidos suenan a orden, no a consejo. Usa los modales: <b>I wouldn't take a taxi; you should take the bus</b>.", next: 'e2' },
            ] },
            e2: { say: "The bus? With two suitcases? I don't know, man…", opts: [
              { t: "Fair enough. Then I'd book a taxi for three thirty. You shouldn't leave at five: the traffic is terrible.", ok: 2, why: "Reconduces con <b>I'd…</b> (yo lo haría así) y <b>You shouldn't…</b> (mala idea), con motivo. Consejo útil y bien formulado.", next: 'f' },
              { t: "OK, then you should book a taxi, but leave early.", ok: 1, why: "Correcta: <b>You should book…</b>. Algo más concreto (una hora) ayudaría más a Diego.", next: 'f' },
              { t: "Yes, you should to take a taxi at five.", ok: 0, why: "<i>Should to</i> no existe (<b>should take</b>) y, encima, el consejo es malo: a las cinco la Javier Prado es un estacionamiento.", next: 'fail' },
            ] },
            f: { say: "OK. Is it a direct route, or do I need to change?", opts: [
              { t: "It's a direct route, no changes. The fare is about twenty-five soles, and you can check the schedule on the app.", ok: 2, why: "Tres palabras clave de la unidad en una respuesta natural: <b>a direct route</b>, <b>the fare</b>, <b>the schedule</b>. Y <i>a direct route</i> con artículo: primera mención.", next: 'g' },
              { t: "It's direct. You don't need to change.", ok: 1, why: "Correcta y clara. Añadir la tarifa o el horario sería lo que un amigo espera de alguien que conoce la ciudad.", next: 'g' },
              { t: "Is direct. You no need to change.", ok: 0, why: "Falta el sujeto (<b>It's direct</b>) y la negación con <i>no</i> es calco: <b>You don't need to change</b>.", next: 'g' },
            ] },
            g: { say: "Perfect. Should I book a seat in advance?", opts: [
              { t: "Yes, you should. The three thirty departure fills up fast.", ok: 2, why: "Respuesta corta que repite el modal: <b>Yes, you should</b>. Y <i>departure</i>, otra palabra de la unidad.", next: 'h' },
              { t: "I would. It's safer.", ok: 1, why: "Correcta y natural: <b>I would</b> da tu opinión. La respuesta corta del curso a <i>Should I…?</i> es <b>Yes, you should</b>.", next: 'h' },
              { t: "Yes, you do.", ok: 0, why: "La pregunta lleva <i>should</i>, así que la respuesta corta también: <b>Yes, you should</b>. Nunca mezcles <i>do</i> con un modal.", next: 'h' },
            ] },
            h: { say: "Thanks. By the way, which way is the elevator? I've got two suitcases.", opts: [
              { t: "Go down that hallway, and it's on your right. But it's out of service this morning, so we should take the stairs. I'll take one suitcase.", ok: 2, why: "Direcciones de manual: <b>Go down that hallway</b> + <b>it's on your right</b>, más un consejo con <b>should</b> y una mano con la maleta.", next: 'win' },
              { t: "It's on the right, at the end of the hallway. But it isn't working today.", ok: 1, why: "Correcta: <b>It's on the right</b>. Con el phrasal verb <b>go down</b> la indicación queda más completa.", next: 'win' },
              { t: "Go down the hallway and is on the right. But today no works.", ok: 0, why: "En inglés el sujeto no se omite: <b>it's on the right</b>, <b>it isn't working today</b>. Y la negación va con el auxiliar, no con <i>no</i>.", next: 'meh' },
            ] },
            win: { say: "You're a lifesaver: seat booked, plenty of time, and the stairs it is. Let's go!", end: true, outcome: 'win', note: 'Pediste direcciones con las fórmulas de la unidad (<b>Can you tell me how to get to…?</b>, <b>Which way is…?</b>, <b>Do you know where … are?</b>), aconsejaste con la fuerza justa (<b>I wouldn\'t…</b>, <b>You should…</b>, <b>Yes, you should</b>) y usaste el vocabulario de transporte (<b>direct route, fare, schedule, departure</b>).' },
            meh: { say: "Hmm… on the right. OK, I'll find it. Thanks, Aldo.", end: true, outcome: 'meh', note: 'Buen consejo de viaje de principio a fin, pero la última indicación se entendió a medias: en inglés nunca se omite el sujeto (<b>it\'s on the right</b>, <b>it isn\'t working</b>) y la negación va con el auxiliar, no con <i>no</i>.' },
            fail: { say: "Five o'clock taxi it is. …Aldo? It's ten past six and I'm still on Javier Prado. I missed my flight.", end: true, outcome: 'fail', note: 'Un consejo mal construido (<i>should to</i>) y mal pensado (taxi a las cinco) tiene consecuencias. La unidad te da los grados: <b>You could…</b> (es posible) → <b>You should…</b> (buena idea) → <b>I\'d…</b> (yo lo haría así) → <b>I wouldn\'t… / You shouldn\'t…</b> (no lo hagas). Y siempre modal + infinitivo sin <i>to</i>.' },
          } },
        ] },
      ] },
    ],
  };
})();
