/* ===========================================================
   practico/aeropuerto.js — Inglés práctico · Aeropuerto y vuelo
   Situación real, no tema de curso: check-in → seguridad → migración
   → puerta de embarque → a bordo → conexión perdida y maleta extraviada.
   Estructura: sections[] → activities[] → { type, ...datos }
   =========================================================== */
(() => {
  /* ---------- Vocabulario por momento ----------
     [momento, palabra, def ES, def EN corta, ejemplo real, pregunta para ti, say (texto para la voz, opcional)] */
  const V = [
    /* Check-in */
    ['Check-in', 'boarding pass', 'tarjeta de embarque (n.): el documento, impreso o en el móvil, que te deja subir al avión', 'the document that lets you board the plane', 'Could you print my boarding pass, please? My phone battery is almost dead.', '¿Prefieres la tarjeta de embarque en el móvil o impresa?'],
    ['Check-in', 'check-in counter', 'mostrador de check-in (n.): donde entregas documentos y facturas maletas', 'the desk where you show documents and check bags', 'The check-in counter for the Miami flight is in Terminal 2, row D.', '¿Haces el check-in online o en el mostrador?'],
    ['Check-in', 'checked bag', 'maleta facturada (n.): la que viaja en la bodega del avión', 'a bag that travels in the hold of the plane', 'I have one checked bag and one carry-on.', '¿Cuántas maletas facturas cuando viajas con tu esposa?'],
    ['Check-in', 'carry-on', 'equipaje de mano (n.): la maleta pequeña que subes contigo a la cabina', 'the small bag you take into the cabin', 'Your carry-on has to fit in the sizer next to the gate.', '¿Qué llevas siempre en el equipaje de mano?'],
    ['Check-in', 'personal item', 'artículo personal (n.): mochila pequeña o bolso que va bajo el asiento, aparte del carry-on', 'a small bag that goes under the seat in front of you', 'A laptop bag counts as your personal item, so you can bring it as well as the carry-on.', '¿Tu mochila de la laptop cabe bajo el asiento?'],
    ['Check-in', 'baggage allowance', 'franquicia de equipaje (n.): el peso y número de maletas que incluye tu tarifa', 'the weight and number of bags your ticket includes', 'What is the baggage allowance on this fare? Is it one bag of twenty-three kilos?', '¿Sabes la franquicia de tu próximo vuelo?'],
    ['Check-in', 'overweight', 'con sobrepeso (adj.): una maleta que pasa del límite de kilos', 'heavier than the limit', 'Your bag is three kilos overweight, I am afraid.', '¿Alguna vez te pasaste de peso? ¿Qué sacaste de la maleta?'],
    ['Check-in', 'excess baggage fee', 'cargo por exceso de equipaje (n.): lo que pagas por el sobrepeso o por una maleta extra', 'the money you pay for extra or heavy bags', 'The excess baggage fee is seventy-five dollars per piece.', '¿Cuánto pagaste la última vez por exceso de equipaje?'],
    ['Check-in', 'aisle seat', 'asiento de pasillo (n.); la "s" de aisle no suena: "ail"', 'a seat next to the aisle', 'Could I have an aisle seat, please? I like to stretch my legs.', '¿Pasillo o ventana? ¿Y tu esposa?', 'aisle seat'],
    ['Check-in', 'window seat / middle seat', 'asiento de ventana / del medio (n.)', 'a seat by the window / the seat between two others', 'There are no window seats left, only middle seats in row 30.', '¿Qué haces si solo quedan asientos del medio?'],
    ['Check-in', 'ESTA', 'autorización electrónica de viaje para entrar a EE. UU. sin visa (n.); no es una visa', 'the online travel authorization for the US', 'You need an approved ESTA before you can even check in for a flight to the United States.', '¿Tu ESTA sigue vigente? Dura dos años.', 'E S T A'],
    ['Check-in', 'valid passport', 'pasaporte vigente (n.): que no ha vencido; muchos países piden seis meses de validez', 'a passport that has not expired', 'Your passport must be valid for at least six months after your return date.', '¿Cuándo vence tu pasaporte?'],
    ['Check-in', 'bag drop', 'entrega de equipaje (n.): el mostrador donde dejas la maleta si ya hiciste el check-in online', 'the desk where you leave checked bags after online check-in', 'If you already have your boarding pass, go straight to bag drop.', '¿Has usado un mostrador de bag drop automático?'],
    ['Check-in', 'frequent flyer number', 'número de viajero frecuente (n.)', 'your loyalty program number', 'Could you add my frequent flyer number to the booking? I forgot to do it online.', '¿Acumulas millas? ¿En qué programa?'],
    /* Control de seguridad */
    ['Seguridad', 'go through security', 'pasar el control de seguridad (v. phrase)', 'pass the security checkpoint', 'Allow at least forty minutes to go through security at this airport.', '¿Cuánto tiempo calculas para pasar seguridad en Lima?'],
    ['Seguridad', 'tray', 'bandeja (n.): donde pones laptop, líquidos y objetos para el escáner', 'the plastic box for your things at security', 'Put your laptop in a separate tray, please.', '¿Cuántas bandejas sueles usar?'],
    ['Seguridad', 'liquids', 'líquidos (n.): envases de máximo 100 ml en una bolsa transparente', 'drinks, creams and gels, max 100 ml each', 'All liquids go in one clear plastic bag, and each container has to be under one hundred milliliters.', '¿Qué líquidos llevas en el equipaje de mano?'],
    ['Seguridad', 'empty your pockets', 'vaciar los bolsillos (v. phrase)', 'take everything out of your pockets', 'Empty your pockets, please: keys, coins, phone, everything.', '¿Qué llevas en los bolsillos cuando viajas?'],
    ['Seguridad', 'take off your belt', 'quitarse el cinturón (v. phrase); también shoes, jacket, watch', 'remove your belt', 'You can keep your shoes on, but take off your belt and your jacket.', '¿Qué te quitas siempre antes del escáner?'],
    ['Seguridad', 'pat-down', 'cacheo, registro manual (n.)', 'a physical search by an officer', 'The scanner beeped, so I got a quick pat-down.', '¿Te han hecho un cacheo alguna vez? ¿Por qué pitó?'],
    ['Seguridad', 'confiscate', 'decomisar, quitar (v.)', 'take something away officially', 'They confiscated my wife\'s perfume because the bottle was too big.', '¿Qué te han decomisado en un aeropuerto?'],
    /* Migración y aduana */
    ['Migración y aduana', 'passport control', 'control de migración (n.); en EE. UU. también immigration o CBP', 'the immigration desk after landing', 'After landing, follow the signs to passport control and have your documents ready.', '¿Te pone nervioso migración? ¿Por qué?'],
    ['Migración y aduana', 'purpose of your visit', 'motivo del viaje (n.): la primera pregunta del oficial', 'the reason you are traveling', 'What is the purpose of your visit? I am attending a tech conference in Austin.', '¿Cuál suele ser el motivo de tus viajes?'],
    ['Migración y aduana', 'business or pleasure', 'negocios o placer (expr.): forma típica de preguntar el motivo', 'the typical way to ask why you travel', 'Business or pleasure? A bit of both: a conference first, then a few days off with my wife.', '¿Tu próximo viaje es business, pleasure o los dos?'],
    ['Migración y aduana', 'How long are you staying?', '¿Cuánto tiempo se queda? (pregunta); se responde con la duración exacta', 'the question about the length of your stay', 'How long are you staying? Ten days. We fly back to Lima on the twenty-second.', '¿Cuántos días dura tu viaje típico?'],
    ['Migración y aduana', 'declare', 'declarar (v.): avisar a aduana de comida, plantas, dinero o compras', 'tell customs about goods you are bringing in', 'Do you have anything to declare? No, nothing to declare.', '¿Has tenido que declarar algo alguna vez?'],
    ['Migración y aduana', 'customs form', 'formulario de aduana (n.); también customs declaration', 'the form where you list what you bring', 'Fill in the customs form before landing; you will need the address of your hotel.', '¿Llenas el formulario en el avión o en la app?'],
    ['Migración y aduana', 'return ticket', 'pasaje de vuelta (n.); el oficial puede pedirlo', 'the ticket for your flight back', 'The officer asked to see my return ticket and the hotel reservation.', '¿Llevas el pasaje de vuelta a mano al pasar migración?'],
    ['Migración y aduana', 'duty-free', 'libre de impuestos (adj./n.): la tienda después de seguridad', 'tax-free shop in the airport', 'We bought two bottles of pisco at the duty-free shop as gifts.', '¿Qué compras en el duty-free?'],
    /* Puerta de embarque */
    ['Puerta de embarque', 'gate', 'puerta de embarque (n.); no door', 'where you board the plane', 'Attention, passengers: flight 2460 to Miami now departs from gate B12.', '¿Llegas a la puerta temprano o justo a tiempo?'],
    ['Puerta de embarque', 'boarding group', 'grupo de embarque (n.): el número que te dice cuándo subes', 'the number that tells you when to board', 'We are in boarding group four, so let us wait until they call us.', '¿En qué grupo sueles embarcar?'],
    ['Puerta de embarque', 'delayed', 'retrasado (adj.): the flight is delayed, nunca "is delay"', 'later than scheduled', 'Our flight is delayed by two hours because of fog in Lima.', '¿Cuál fue tu peor retraso?'],
    ['Puerta de embarque', 'overbooked', 'sobrevendido (adj.): hay más pasajeros que asientos', 'more passengers than seats', 'The flight is overbooked, so they are asking for volunteers to take a later flight.', '¿Cederías tu asiento por un voucher? ¿De cuánto?'],
    ['Puerta de embarque', 'voucher', 'vale, cupón (n.): compensación en forma de crédito o comida', 'a coupon you can use instead of money', 'They offered a four-hundred-dollar voucher and a hotel room for the night.', '¿Preferirías un voucher o dinero?'],
    ['Puerta de embarque', 'final call', 'última llamada (n.); también last call', 'the last announcement before the gate closes', 'This is the final call for passenger Suárez travelling to Bogotá.', '¿Alguna vez te han llamado por el altavoz?'],
    ['Puerta de embarque', 'layover', 'escala (n.): el tiempo entre dos vuelos; también connection', 'the time between two connecting flights', 'We have a three-hour layover in Panama, enough for lunch.', '¿Escala corta y arriesgada o larga y aburrida?'],
    ['Puerta de embarque', 'standby list', 'lista de espera (n.): para subir si queda un asiento libre', 'the waiting list for a free seat', 'They put us on the standby list for the earlier flight.', '¿Has volado en standby?'],
    /* A bordo */
    ['A bordo', 'overhead bin', 'compartimento superior (n.): donde va el carry-on', 'the storage above the seats', 'The overhead bins are full; you will have to gate-check that bag.', '¿Guardas la maleta arriba o bajo el asiento?'],
    ['A bordo', 'fasten your seatbelt', 'abrocharse el cinturón (v. phrase)', 'put on your seatbelt', 'Please fasten your seatbelt and return your seat to the upright position.', '¿Te quitas el cinturón en cuanto se apaga la señal?'],
    ['A bordo', 'tray table', 'mesita plegable (n.)', 'the small folding table on the seat in front', 'Fold up your tray table for landing, please.', '¿Trabajas en la mesita durante el vuelo?'],
    ['A bordo', 'flight attendant', 'auxiliar de vuelo (n.); en conjunto, cabin crew', 'a member of the cabin crew', 'The flight attendant brought me an extra blanket without my asking.', '¿Pides cosas a los auxiliares o te da vergüenza?'],
    ['A bordo', 'swap seats', 'cambiar de asiento con alguien (v. phrase)', 'exchange seats with another passenger', 'Would you mind swapping seats so I can sit with my wife?', '¿Has pedido cambiar de asiento? ¿Cómo lo dijiste?'],
    ['A bordo', 'turbulence', 'turbulencia (n., incontable)', 'rough air that shakes the plane', 'We hit some turbulence over the Andes and the service was suspended.', '¿Te asusta la turbulencia?'],
    /* Conexión y equipaje perdido */
    ['Conexión y equipaje', 'miss a connection', 'perder una conexión (v. phrase): miss, nunca lose', 'arrive too late for your next flight', 'We missed our connection because the first flight landed late.', '¿Has perdido una conexión? ¿Qué pasó?'],
    ['Conexión y equipaje', 'rebook', 'reprogramar, reubicar en otro vuelo (v.)', 'put you on a different flight', 'Could you rebook us on the next available flight to Madrid?', '¿Quién te reprogramó la última vez: la aerolínea o tú en la app?'],
    ['Conexión y equipaje', 'baggage claim', 'recojo de equipaje (n.): la zona de las cintas', 'the area where you collect your bags', 'Baggage claim is downstairs, after passport control.', '¿Cuánto esperas normalmente en baggage claim?'],
    ['Conexión y equipaje', 'carousel', 'cinta de equipaje (n.); también belt', 'the moving belt that brings the bags', 'Our bags never came out on carousel six.', '¿Pones algo de color en la maleta para reconocerla en la cinta?'],
    ['Conexión y equipaje', 'baggage tag', 'etiqueta de equipaje (n.): el talón con código de barras que te dan al facturar', 'the sticker with a barcode they give you at check-in', 'Here is the baggage tag they gave me in Lima; the number ends in 213.', '¿Guardas los talones hasta recoger la maleta?'],
    ['Conexión y equipaje', 'file a claim', 'presentar un reclamo (v. phrase); el informe se llama PIR', 'make an official report about a problem', 'File a claim at the baggage service office before you leave the airport.', '¿Has presentado un reclamo por equipaje?'],
    ['Conexión y equipaje', 'hard-shell suitcase', 'maleta rígida (n.); la de tela es soft-sided', 'a suitcase with a rigid case', 'It is a medium grey hard-shell suitcase with four wheels and a yellow strap.', 'Describe tu maleta en una frase.'],
    ['Conexión y equipaje', 'deliver (the bag) to the hotel', 'entregar la maleta en el hotel (v. phrase)', 'bring the bag to where you are staying', 'They will deliver the bag to our hotel within forty-eight hours.', '¿Te han entregado una maleta en el hotel? ¿Cuánto tardó?'],
  ];
  const cardOf = t => { const c = { cat: t[0], w: t[1], def: t[2], ex: t[4], ask: t[5] }; if (t[6]) c.say = t[6]; return c; };

  window.UNIT_DATA['practico/aeropuerto'] = {
    source: 'Inglés práctico · Aeropuerto y vuelo',
    description: 'Del mostrador de check-in a la cinta de equipaje: documentos, sobrepeso, seguridad, migración en EE. UU., anuncios de la puerta, peticiones a bordo y qué decir cuando pierdes la conexión o la maleta no aparece (<i>Could I… / Would it be possible to… / Could you tell me where…</i>).',
    cando: [
      'Hacer el check-in: entregar documentos, pedir asiento (<i>Could I have an aisle seat?</i>) y resolver un sobrepeso de equipaje sin pagar de más',
      'Pasar el control de seguridad entendiendo las órdenes (<i>laptop out, liquids in a clear bag, empty your pockets</i>)',
      'Responder a migración con calma y datos concretos: motivo, duración, alojamiento y trabajo (<i>I\'m attending a conference… We\'re staying for ten days</i>)',
      'Entender los anuncios de la puerta: retraso, cambio de puerta, grupo de embarque, <i>final call</i> y overbooking',
      'Pedir cosas a bordo y negociar un cambio de asiento con <i>Would you mind…?</i> / <i>Would it be possible to…?</i>',
      'Resolver una conexión perdida o una maleta extraviada: reprogramar, describir la maleta y pedir la entrega al hotel',
    ],
    map: [
      ['Check-in', 'Pasaporte, ESTA, asiento, maleta facturada y de mano, sobrepeso y <i>excess baggage fee</i>', 'Flashcards, colocaciones, role-play con sobrepeso'],
      ['Seguridad', 'Órdenes rápidas: <i>laptop out, liquids in the tray, empty your pockets, take off your belt</i>', 'Dictado y diálogo para ordenar'],
      ['Migración y aduana', 'Las cinco preguntas del oficial: motivo, duración, alojamiento, trabajo, qué declaras; <i>going to</i> y presente continuo para planes', 'Reto de speaking cronometrado y role-play con un oficial seco'],
      ['Puerta de embarque', 'Grupo de embarque, retraso, cambio de puerta, <i>final call</i>, overbooking y voucher', 'Dictado de anuncios reales y diálogo con preguntas'],
      ['A bordo', 'Pedir algo, cambiar de asiento, formulario de aduana: <i>Could I have… / Would you mind swapping…?</i>', 'Peticiones corteses, preguntas indirectas, corrige errores típicos'],
      ['Conexión y equipaje perdido', 'Reprogramar, describir la maleta, dar la dirección del hotel, pedir referencia y gastos', 'Lectura (correo de la aerolínea), reclamo escrito con checklist, role-play'],
    ],

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio · por momento del viaje', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, una frase que oirás o dirás de verdad y una pregunta para ti. Van en el orden del viaje: check-in → seguridad → migración → puerta → a bordo → conexión y equipaje. Pulsa 🔊 para la pronunciación.',
          cards: V.map(cardOf) },
        { label: 'Palabra ↔ Definición', type: 'match', eyebrow: 'Definiciones en inglés', title: 'Empareja la palabra con su definición', intro: 'Toca una palabra de la izquierda y su definición (en inglés) a la derecha. Hay términos de todos los momentos mezclados.',
          pairs: ['boarding pass', 'carry-on', 'baggage allowance', 'excess baggage fee', 'aisle seat', 'tray', 'declare', 'layover', 'gate', 'overbooked', 'voucher', 'overhead bin', 'carousel', 'baggage tag', 'file a claim', 'rebook'].map(k => { const t = V.find(x => x[1] === k); return [t[1], t[3]]; }), round: 8 },
        { label: 'Colocaciones', type: 'mcq', eyebrow: 'En contexto', title: 'Completa con la palabra que va con la frase', intro: 'Las palabras del aeropuerto vienen en pares fijos: <i>boarding</i> pass, <i>carry-on</i> bag, <i>overhead</i> bin, <i>excess baggage</i> fee. Elige la que encaja.', pool: 10, items: [
          { blank: 1, q: 'Please have your ___ pass and passport ready when you reach the gate.', opts: ['boarding', 'embarking', 'flight', 'entrance'], a: 'boarding', why: '<b>boarding pass</b> = tarjeta de embarque. <i>Embark</i> existe, pero no se usa para esto.' },
          { blank: 1, q: 'Your ___ bag must fit in the overhead bin or under the seat in front of you.', opts: ['carry-on', 'carrying', 'hand', 'take-on'], a: 'carry-on', why: '<b>carry-on</b> (US) = equipaje de mano. En UK dirían <i>hand luggage</i>; <i>hand bag</i> es un bolso de mujer.' },
          { blank: 1, q: 'The ___ bins are full, so we will have to gate-check your suitcase.', opts: ['overhead', 'upper', 'above', 'overtop'], a: 'overhead', why: '<b>overhead bin</b> = compartimento superior. <i>Gate-check</i> = te la facturan en la misma puerta.' },
          { blank: 1, q: 'We have a four-hour ___ in Panama City, so we can have lunch there.', opts: ['layover', 'layout', 'leftover', 'delay'], a: 'layover', why: '<b>layover</b> = escala. <i>Delay</i> es retraso, algo que no planeas.' },
          { blank: 1, q: 'Your bag is three kilos ___; the fee is seventy-five dollars.', opts: ['overweight', 'overweighted', 'too heavy weight', 'over the top'], a: 'overweight', why: '<b>overweight</b> es adjetivo y no cambia: <i>three kilos overweight</i>.' },
          { blank: 1, q: 'Do you have anything to ___? Any food, plants or cash over ten thousand dollars?', opts: ['declare', 'declarate', 'denounce', 'announce'], a: 'declare', why: '<b>declare</b> = declarar en aduana. <i>Declarate</i> no existe; <i>denounce</i> es denunciar a alguien.' },
          { blank: 1, q: 'Bags from flight 2460 will arrive on ___ six in about fifteen minutes.', opts: ['carousel', 'caroussel', 'tape', 'roundabout'], a: 'carousel', why: '<b>carousel</b> (una sola s, se pronuncia "ca-ru-SEL") = cinta de equipaje. También <i>belt</i>.' },
          { blank: 1, q: 'The flight is ___ by ninety minutes because of fog in Lima.', opts: ['delayed', 'delay', 'retarded', 'late for'], a: 'delayed', why: '<b>is delayed</b> (participio). <s>is delay</s> es el error típico; <i>retarded</i> es ofensivo en inglés moderno.' },
          { blank: 1, q: 'Please ___ your seatbelt and stow your tray table for take-off.', opts: ['fasten', 'tie', 'close', 'hold'], a: 'fasten', why: '<b>fasten your seatbelt</b>; la t no suena: "FAS-en".' },
          { blank: 1, q: 'If the flight is overbooked, volunteers usually get a travel ___ worth several hundred dollars.', opts: ['voucher', 'coupon ticket', 'bonus', 'check'], a: 'voucher', why: '<b>voucher</b> = vale/cupón. Pregunta siempre si vale para cualquier aerolínea y hasta cuándo.' },
          { blank: 1, q: 'If you already have your boarding pass, go straight to ___ and skip the line.', opts: ['bag drop', 'bag leave', 'baggage claim', 'drop-in'], a: 'bag drop', why: '<b>bag drop</b> = dejar la maleta facturada. <i>Baggage claim</i> es al revés: donde la recoges al llegar.' },
          { blank: 1, q: 'Could you add my ___ flyer number to the booking, please?', opts: ['frequent', 'frequently', 'regular', 'usual'], a: 'frequent', why: '<b>frequent flyer</b> = viajero frecuente. Adjetivo, no adverbio.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'La gramática que la situación exige', title: 'Pedir, preguntar y contar tus planes sin sonar brusco', html: `
          <h3>1 · Peticiones corteses: de lo directo a lo diplomático</h3>
          <p style="margin:8px 0 14px">En un aeropuerto pides cosas todo el tiempo: un asiento, que pesen la maleta otra vez, un vaso de agua, otro vuelo. <i>I want…</i> y <i>Give me…</i> son correctos, pero suenan a orden. Sube un escalón según lo que pides:</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Fórmula</th><th>Cuándo</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>Could I have</b> + cosa?</td><td>algo sencillo y habitual</td><td><b>Could I have</b> an aisle seat, please? · <b>Could I have</b> a glass of water?</td></tr>
            <tr><td><b>I'd like (to)</b> + …</td><td>decir lo que quieres hacer, formal y neutro</td><td><b>I'd like to</b> check in for the Miami flight. · <b>I'd like</b> a window seat, please.</td></tr>
            <tr><td><b>Could you</b> + verbo?</td><td>pedir que la otra persona haga algo</td><td><b>Could you</b> weigh it again, please? · <b>Could you</b> rebook us on the next flight?</td></tr>
            <tr><td><b>Would it be possible to</b> + verbo?</td><td>algo que quizá no puedan hacer; deja salida</td><td><b>Would it be possible to</b> change my seat? · <b>Would it be possible to</b> get a hotel voucher?</td></tr>
            <tr><td><b>Would you mind</b> + -ing?</td><td>pedir un favor a un desconocido (a bordo)</td><td><b>Would you mind swapping</b> seats so I can sit with my wife?</td></tr>
          </tbody></table></div>
          <div class="hint small" style="margin-top:12px"><b>Trampas:</b> <s>Can I to have</s> → <b>Can I have</b> · <s>I would like change</s> → <b>I'd like to change</b> · <s>Would you mind to move</s> → <b>Would you mind moving</b> · a <i>Would you mind…?</i> se responde <b>No, not at all</b> para decir que sí.</div>

          <h3 style="margin-top:22px">2 · Preguntas indirectas: cuando preguntas a alguien que trabaja</h3>
          <p style="margin:8px 0 14px">A un agente o a un desconocido suena mejor <i>Could you tell me…?</i> que la pregunta directa. Ojo: después de la fórmula, <b>el orden es el de una afirmación</b> (sujeto + verbo) y desaparece <i>do/does/did</i>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Directa</th><th>Indirecta</th></tr></thead><tbody>
            <tr><td>Where <b>is</b> the gate?</td><td>Could you tell me where the gate <b>is</b>?</td></tr>
            <tr><td>What time <b>does</b> boarding <b>start</b>?</td><td>Do you know what time boarding <b>starts</b>?</td></tr>
            <tr><td><b>Is</b> the flight on time?</td><td>Do you know <b>if</b> the flight <b>is</b> on time?</td></tr>
            <tr><td>How long <b>is</b> the delay?</td><td>Could you tell me how long the delay <b>is</b>?</td></tr>
            <tr><td>Where <b>can</b> I file a claim?</td><td>Could you tell me where I <b>can</b> file a claim?</td></tr>
          </tbody></table></div>
          <div class="hint small" style="margin-top:12px">Sin <i>if</i> no hay pregunta indirecta de sí/no: <s>Do you know is the flight on time?</s> → <b>Do you know if…</b>. Y nada de inversión: <s>Could you tell me where is the gate?</s></div>

          <h3 style="margin-top:22px">3 · Planes ante migración: <i>going to</i> y presente continuo</h3>
          <p style="margin:8px 0 14px">El oficial quiere planes concretos. El presente simple (<s>I go to stay</s>, <s>I visit New York</s>) suena a rutina y a inglés roto. Usa:</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Para</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>am / is / are going to</b> + verbo</td><td>intención o plan</td><td>I<b>'m going to</b> attend a conference in Austin. · We<b>'re going to</b> stay with friends for two nights.</td></tr>
            <tr><td><b>am / is / are</b> + verbo -ing</td><td>plan ya organizado (fechas, reservas)</td><td>We<b>'re staying</b> at the Hilton. · We<b>'re flying</b> back on the fourteenth. · I<b>'m attending</b> a conference.</td></tr>
            <tr><td><b>for</b> + duración · <b>until</b> + fecha</td><td>cuánto tiempo</td><td>We're staying <b>for</b> ten days. · <b>Until</b> the twenty-second.</td></tr>
          </tbody></table></div>

          <h3 style="margin-top:22px">4 · How long · How much · How many</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Pregunta</th><th>Pregunta por</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>How long…?</b></td><td>tiempo (duración), <b>nunca</b> <s>how much time</s></td><td><b>How long</b> is the layover? · <b>How long</b> are you staying?</td></tr>
            <tr><td><b>How much…?</b></td><td>dinero e incontables (<i>luggage, baggage, time, water</i>)</td><td><b>How much</b> is the excess baggage fee? · <b>How much</b> luggage can I bring?</td></tr>
            <tr><td><b>How many…?</b></td><td>contables en plural</td><td><b>How many</b> bags are you checking? · <b>How many</b> days are you staying?</td></tr>
          </tbody></table></div>
          <div class="hint small" style="margin-top:12px"><b>luggage</b> y <b>baggage</b> son incontables: <s>two luggages</s> → <b>two bags</b> / <b>two pieces of luggage</b>. Y <b>miss</b> un vuelo, nunca <s>lose</s>: <i>We <b>missed</b> our connection</i>.</div>` },
        { label: 'Elige la forma', type: 'mcq', eyebrow: 'Peticiones, preguntas indirectas, planes', title: 'Completa la frase', intro: 'Todo son frases que dirás en el aeropuerto. Fíjate en el orden de las palabras después de <i>Could you tell me…</i> y en <i>to</i> / <i>-ing</i> después de cada fórmula.', pool: 10, items: [
          { blank: 1, q: '___ have an aisle seat, please?', opts: ['Could I', 'Can I to', 'I could', 'Could me'], a: 'Could I', why: '<b>Could I have…?</b> Sin <i>to</i> y con el sujeto después del modal.' },
          { blank: 1, q: 'Excuse me, could you tell me where ___?', opts: ['gate B7 is', 'is gate B7', 'is it gate B7', 'gate B7 it is'], a: 'gate B7 is', why: 'Pregunta indirecta: después de <i>where</i>, orden de afirmación: <b>gate B7 is</b>.' },
          { blank: 1, q: 'Officer: Purpose of your visit? You: I\'m ___ a software conference in Austin.', opts: ['going to attend', 'go to attend', 'going attend', 'will attending'], a: 'going to attend', why: 'Plan → <b>be going to</b> + verbo base. <s>I go to attend</s> es el calco de "voy a asistir".' },
          { blank: 1, q: 'How ___ are you staying in the United States?', opts: ['long', 'much time', 'many time', 'long time'], a: 'long', why: 'Duración → <b>How long</b>. <s>How much time</s> es el calco más frecuente de "cuánto tiempo".' },
          { blank: 1, q: 'How ___ bags are you checking today?', opts: ['many', 'much', 'long', 'often'], a: 'many', why: '<i>bags</i> es contable plural → <b>How many</b>. Con <i>luggage</i> sería <i>How much</i>.' },
          { blank: 1, q: 'Would it be possible ___ my seat? I\'d like to sit with my wife.', opts: ['to change', 'change', 'changing', 'that I change'], a: 'to change', why: '<b>Would it be possible to</b> + verbo base.' },
          { blank: 1, q: 'Do you know ___ the flight is still on time?', opts: ['if', 'that', 'what', 'does'], a: 'if', why: 'Pregunta indirecta de sí/no → <b>if</b> (o <i>whether</i>). Y sin inversión: <i>the flight is</i>.' },
          { blank: 1, q: 'I\'d like ___ my flight to Thursday, please.', opts: ['to change', 'change', 'changing', 'that change'], a: 'to change', why: '<b>I\'d like to</b> + verbo base. <s>I would like change</s> se oye mucho; falta el <i>to</i>.' },
          { blank: 1, q: 'We ___ back to Lima on the eighteenth; the tickets are already booked.', opts: ['are flying', 'fly going', 'going fly', 'are going fly'], a: 'are flying', why: 'Plan organizado con fecha → presente continuo: <b>We\'re flying back</b>.' },
          { blank: 1, q: 'How ___ is the excess baggage fee?', opts: ['much', 'many', 'long', 'often'], a: 'much', why: 'Precio → <b>How much</b>.' },
          { blank: 1, q: 'Would you mind ___ seats so my wife and I can sit together?', opts: ['swapping', 'to swap', 'swap', 'if swap'], a: 'swapping', why: '<b>Would you mind</b> + <b>-ing</b>. Nunca <s>mind to swap</s>.' },
          { blank: 1, q: 'We missed our connection. Could you tell me where ___ to get rebooked?', opts: ['we have to go', 'do we have to go', 'have we to go', 'we must to go'], a: 'we have to go', why: 'Dos momentos en una frase: conexión perdida + pregunta indirecta. Orden de afirmación: <b>where we have to go</b>.' },
          { blank: 1, q: 'Officer: Where are you staying? You: The first four nights we ___ at the conference hotel, then at an Airbnb.', opts: ["'re staying", 'stay', 'will to stay', 'are stay'], a: "'re staying", why: 'Reserva hecha → presente continuo: <b>we\'re staying</b>. <s>we are stay</s> mezcla las dos formas.' },
          { blank: 1, q: 'Could you tell me how long ___? We have a tight connection.', opts: ['the delay is', 'is the delay', 'is it the delay', 'does the delay'], a: 'the delay is', why: 'Después de <i>how long</i>, sujeto + verbo: <b>the delay is</b>.' },
        ] },
        { label: 'Corrige las frases', type: 'fix', eyebrow: 'Errores típicos de hispanohablante en el aeropuerto', title: 'Reescribe la frase corrigiendo el error', intro: 'Cada frase tiene un error que se oye a diario en Jorge Chávez. Corrígelo y compara con la solución canónica; en la explicación están las alternativas válidas.', items: [
          { bad: 'I have two baggages and one hand bag.', good: 'I have two bags and one carry-on.', why: '<b>baggage / luggage</b> son incontables: <i>two bags</i> o <i>two pieces of luggage</i>. <i>Hand bag</i> es un bolso; equipaje de mano = <b>carry-on</b> (o <i>hand luggage</i>).' },
          { bad: 'The flight is delay two hours.', good: 'The flight is delayed by two hours.', why: 'Participio: <b>is delayed</b>. La cantidad de retraso va con <b>by</b> (también vale <i>two hours late</i>).' },
          { bad: 'I go to stay in a hotel in Austin for ten days.', good: "I'm going to stay in a hotel in Austin for ten days.", why: 'Plan → <b>I\'m going to stay</b> (o <i>I\'m staying</i>). <s>I go to</s> es presente simple y suena a rutina.' },
          { bad: 'How much time is the layover?', good: 'How long is the layover?', why: 'Duración → <b>How long</b>. <i>How much time</i> se entiende, pero no es lo que dice un nativo.' },
          { bad: 'Can you tell me where is the gate B7?', good: 'Can you tell me where gate B7 is?', why: 'Pregunta indirecta: sin inversión (<b>gate B7 is</b>) y sin artículo delante de un nombre de puerta.' },
          { bad: 'We lost our connection because the first flight arrived late.', good: 'We missed our connection because the first flight arrived late.', why: 'Un vuelo o una conexión se <b>miss</b>, no se pierde (<i>lose</i>). <i>Lose</i> es para objetos: <i>I lost my passport</i>.' },
          { bad: 'I want a seat in the window, please.', good: "I'd like a window seat, please.", why: '<b>window seat</b> (sustantivo compuesto) y <b>I\'d like</b> en vez de <i>I want</i>, que suena a orden. <i>Could I have a window seat?</i> también vale.' },
          { bad: 'My luggage didn\'t arrive. Where I can make the claim?', good: "My luggage didn't arrive. Where can I file a claim?", why: 'Pregunta directa → inversión: <b>Where can I</b>. Y el reclamo se <b>files</b> (o <i>make a claim</i>, pero <i>file</i> es lo que dice el letrero).' },
        ] },
        { label: 'Dilo con educación', type: 'soft', eyebrow: 'Peticiones corteses · escritura', title: 'Reescribe la petición brusca de forma cortés', explain: 'Cada frase es correcta pero suena a orden. Reescríbela con una fórmula de la unidad: <b>Could I have…?</b> · <b>Could you…?</b> · <b>I\'d like to…</b> · <b>Would it be possible to…?</b> · <b>Would you mind + -ing?</b> · <b>Could you tell me / Do you know + pregunta indirecta</b>.', missing: 'Falta una fórmula cortés: <i>Could I / Could you / I\'d like / Would it be possible / Would you mind / Could you tell me / Do you know if…</i>', pattern: /\b(could (i|you|we)|i['’]d like|would it be possible|would you mind|do you know (where|if|whether|what|how|which)|could you tell me)\b/, items: [
          { h: '"Give me a window seat." (en el mostrador, con <i>Could I have…?</i>)', a: 'Could I have a window seat, please?' },
          { h: '"Where is the baggage claim?" (a un empleado, pregunta indirecta)', a: 'Could you tell me where the baggage claim is?' },
          { h: '"I want to change my flight to Thursday." (con <i>I\'d like to…</i>)', a: "I'd like to change my flight to Thursday, please." },
          { h: '"Change my seat. I want to sit with my wife." (a la aerolínea, con <i>Would it be possible to…?</i>)', a: 'Would it be possible to change my seat so I can sit with my wife?' },
          { h: '"Move your bag, I need space in the bin." (a otro pasajero, con <i>Would you mind…?</i>)', a: 'Would you mind moving your bag a little? I need some space in the bin.' },
          { h: '"Is the flight on time?" (a un agente de la puerta, con <i>Do you know if…?</i>)', a: 'Do you know if the flight is on time?' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation · anuncios y agentes', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Frases que se oyen de verdad por el altavoz y en los mostradores. Los anuncios van rápido y con eco: baja la velocidad al principio y súbela después. Ojo con los números de vuelo y de puerta.',
          sentences: [
            'Passengers on flight 2460 to Miami, boarding will begin shortly at gate B7.',
            'This is the final call for passenger Suárez travelling to Bogotá. Please proceed immediately to gate 14.',
            'Please place your laptop in a separate tray and remove any liquids from your bag.',
            'Could you put your bag on the scale, please? It is two kilos over the limit.',
            'Your flight has been delayed by approximately ninety minutes due to weather conditions in Miami.',
            'We are looking for volunteers to take a later flight in exchange for a travel voucher.',
            'Please fasten your seatbelt and return your tray table to its upright position.',
            'The gate for flight 1178 to Austin has changed from D4 to D21.',
            'Do you have anything to declare? Any food, plants or more than ten thousand dollars in cash?',
            'Baggage from flight 2460 will arrive on carousel 6 in about fifteen minutes.',
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening · overbooking en la puerta', title: 'Escucha el diálogo y responde', intro: 'Aldo y su esposa esperan en la puerta D21 y llega un mensaje: el vuelo a Austin está sobrevendido. Escucha la negociación entera antes de responder.',
          lines: [
            ['Agent', 'Good morning. This is the desk for flight 1178 to Austin. How can I help?'],
            ['Aldo', 'Good morning. I just got a text saying the flight is overbooked. Does that affect us? We\'re in boarding group five.'],
            ['Agent', 'It might. We\'re two seats over, so we\'re asking for volunteers first. Would you and your wife consider taking the four thirty flight this afternoon?'],
            ['Aldo', 'What would we get in exchange? I\'m giving a talk at nine tomorrow, so I need to arrive today.'],
            ['Agent', 'The four thirty lands at ten to seven this evening. Each of you would get a five-hundred-dollar voucher, plus meal vouchers for the wait.'],
            ['Aldo', 'Is the voucher valid for any airline, or just yours?'],
            ['Agent', 'Only our flights and our partners, and it\'s valid for one year.'],
            ['Aldo', 'Could you tell me if the four thirty is confirmed? I can\'t risk being bumped twice.'],
            ['Agent', 'Yes, I can confirm both seats right now, together, in row twelve. And I\'ll upgrade you to extra legroom.'],
            ['Aldo', 'OK, let me check with my wife… She says yes. Could we have all that in writing, please?'],
            ['Agent', 'Of course. Here are your new boarding passes and the vouchers. Thank you for volunteering; you\'ve made someone very happy.'],
            ['Aldo', 'No problem. By the way, where can we use the meal vouchers?'],
            ['Agent', 'Any restaurant in Terminal D. Enjoy your lunch.'],
          ],
          questions: [
            { q: 'Why does the agent need volunteers?', opts: ['The flight has two more passengers than seats', 'The flight is delayed by two hours', 'The plane is too heavy to take off'], a: 'The flight has two more passengers than seats', why: '"We\'re two seats over" = hay dos pasajeros más que asientos: <b>overbooked</b>.' },
            { q: 'What is Aldo\'s main concern about taking the later flight?', opts: ['He has to give a talk the next morning', 'He does not like flying in the afternoon', 'His wife wants to stay in Miami'], a: 'He has to give a talk the next morning', why: '"I\'m giving a talk at nine tomorrow, so I need to arrive today."' },
            { q: 'What does the voucher allow?', opts: ['Flights with this airline and its partners for one year', 'Any airline in the world for one year', 'Only hotels and restaurants'], a: 'Flights with this airline and its partners for one year', why: '"Only our flights and our partners, and it\'s valid for one year."' },
            { q: 'Which phrase does Aldo use to make sure he will not be bumped again?', opts: ['Could you tell me if the four thirty is confirmed?', 'What would we get in exchange?', 'Where can we use the meal vouchers?'], a: 'Could you tell me if the four thirty is confirmed?', why: 'Pregunta indirecta con <b>Could you tell me if…</b> para pedir confirmación antes de aceptar.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'At passport control', task: 'Eres tú frente al oficial de migración en Miami. Responde seguido a sus cinco preguntas: motivo del viaje, cuánto tiempo, dónde te alojas, a qué te dedicas y qué traes. Respuestas concretas, con going to / presente continuo y sin dudar.', model: "Good afternoon. I'm here for a software conference in Austin; I'm giving a talk on Thursday. After that, my wife and I are going to spend four days in New York on vacation. We're staying for eleven days in total and we're flying back to Lima on the twenty-second; here's our return ticket. In Austin we're staying at the Hilton Downtown, the conference hotel, and in New York at an Airbnb in Brooklyn. The addresses are on the form. I'm a senior software developer at a bank in Lima. We're not bringing any food or plants, just a few bags of roasted coffee as gifts, and about six hundred dollars in cash.", tags: ['conference', 'going to', 'staying', 'flying back', 'return ticket', 'hotel', 'developer', 'declare'] },
          { t: 'The bag that never came out', task: 'Estás en la oficina de equipaje. Explica qué pasó (vuelo, cinta, cuánto esperaste), describe tu maleta con detalle (tamaño, color, tipo, ruedas, señas) y di dónde y hasta cuándo quieren que la entreguen. Pide un número de referencia.', model: "Hi, I'd like to report a missing bag. We arrived on flight 2460 from Lima about an hour ago, and we waited at carousel six until it stopped, but one of our two bags didn't come out. Here's the baggage tag. It's a medium-sized dark blue hard-shell suitcase with four wheels, a yellow strap around it and a name tag with my wife's name, Carla Rojas. Inside there are mostly clothes and a laptop charger. We're staying at the Hotel Atlántico, Gran Vía 38, until the twentieth, so could you deliver it there? And could I have a reference number and a phone number to track it, please?", tags: ['missing bag', 'carousel', 'baggage tag', 'hard-shell', 'wheels', 'strap', 'deliver', 'reference number'] },
          { t: 'Three polite requests on board', task: 'A bordo necesitas tres cosas: cambiar de asiento para sentarte con tu esposa (a un pasajero), un vaso de agua y una manta (a la auxiliar) y saber si llegarán a tiempo a la conexión (a la tripulación). Usa Would you mind…, Could I have…, Do you know if….', model: "First, to the passenger in 14B: 'Excuse me, sorry to bother you. Would you mind swapping seats with me so I can sit next to my wife? I'm in 22C, an aisle seat two rows back.' If he says 'No, not at all', that's a yes. Then, to the flight attendant: 'Could I have a glass of water and a blanket, please? It's a bit cold back here.' And near the end of the flight: 'Excuse me, do you know if we're going to land on time? We have a connection to Austin at eleven twenty and I'm a little worried about making it.' Always finish with 'Thank you so much, I really appreciate it.'", tags: ['would you mind', 'swapping seats', 'could i have', 'do you know if', 'connection', 'appreciate', 'excuse me'] },
          { t: 'The travel day that went wrong', task: 'Cuenta un día de viaje que salió mal (real o inventado) mezclando varios momentos: sobrepeso en el check-in, retraso, conexión perdida, maleta que no apareció. En pasado, con las palabras de la unidad y lo que dijiste en cada mostrador.', model: "Last year we flew to a conference in Madrid and everything went wrong. At check-in my bag was four kilos overweight, so I moved my shoes and a jacket into my carry-on instead of paying the fee. Then the flight was delayed by two hours because of fog, and we missed our connection in Bogotá. I went to the transfer desk and said, 'Could you rebook us on the next available flight?' They put us on a flight the next morning and gave us a hotel voucher. When we finally landed, my wife's suitcase didn't come out on the carousel, so we filed a claim, described it and gave them the hotel address. It was delivered two days later. Now we always pack a change of clothes in the carry-on.", tags: ['overweight', 'delayed', 'missed our connection', 'rebook', 'voucher', 'carousel', 'filed a claim', 'delivered'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Habla conectada · las fórmulas que más repetirás', title: '"Could I have…" suena "cud-ai-HAV"', intro: 'En el aeropuerto hablas rápido y con ruido. Las fórmulas corteses se funden: <i>could I</i> → "cud-ai", <i>would it be</i> → "wud-it-bi", <i>do you</i> → "dyu". La sílaba fuerte (MAYÚSCULAS) cae en la palabra de contenido, no en la fórmula. Escucha, repite y compara.',
          pairs: [
            ['Could I have… → "cud-ai-HAV"', 'Could I have a window seat, please?'],
            ['Would it be possible to… → "wud-it-bi-POS-ib-l-tu"', 'Would it be possible to change my seat?'],
            ['Could you tell me where… → "cud-yu-TEL-mi-WER"', 'Could you tell me where the baggage claim is?'],
            ["I'd like to… → \"aid-LAIK-tu\" (la d de I'd se oye)", "I'd like to check in for the flight to Miami."],
            ['Do you have anything to declare? → "dyu-hav-EN-i-zing-tu-di-CLER"', 'Do you have anything to declare?'],
            ['How long are you staying? → "hau-LONG-ar-yu-STEI-ing"', 'How long are you staying?'],
            ['What is the purpose of your visit? → "wots-the-PUR-pus-ov-yor-VI-zit"', 'What is the purpose of your visit?'],
            ['Compuestos: fuerza en la primera palabra → BOARding pass · CARRY-on · OVERhead bin · BAGgage claim', 'boarding pass, carry-on, overhead bin, baggage claim'],
            ['aisle: la s no suena → "ail"', 'An aisle seat, please. Not the middle seat.'],
            ['Frase completa', 'Excuse me, would you mind swapping seats so I can sit next to my wife?'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading · un correo real de la aerolínea', title: 'Changes to your itinerary LIM – MIA – AUS', intro: 'La aerolínea te escribe dos semanas antes del viaje: cambio de horario, nueva conexión y política de equipaje. Lee una vez para saber qué cambió y otra para los detalles (horas, kilos, plazos). Las palabras en amarillo se preguntan después: dedúcelas por el contexto.',
          paragraphs: [
            'Dear Mr Suárez, We are writing to inform you of a schedule change affecting booking reference 7KQ2LM. Your flight LA 2460 from Lima to Miami on 12 November will now depart at 01:55 instead of 00:40. As a result, your original connection to Austin is no longer <b>feasible</b>, and we have rebooked you and Mrs Rojas on flight AA 1178, departing Miami at 11:20 and arriving in Austin at 13:45.',
            'Your new <b>layover</b> in Miami is four hours and ten minutes. Because both flights are on the same ticket, your checked bags will be tagged through to your final destination. However, under US regulations all passengers must collect their bags at the first point of entry, clear customs, and drop them off again at the transfer belt. Please allow at least ninety minutes for this process.',
            'Baggage policy for your fare: each passenger may check one bag of up to 23 kg and bring one carry-on (up to 10 kg, 55 x 35 x 25 cm) plus one personal item. Bags over the weight limit are subject to an excess baggage fee of USD 75 per piece. Please note that power banks and e-cigarettes are <b>prohibited</b> in checked luggage and must travel in your carry-on. Liquids in hand luggage remain limited to containers of 100 ml.',
            'If the new schedule does not suit you, you are <b>entitled</b> to a free change to another date within fourteen days of your original flight, or to a full refund. To request either option, reply to this email or call our contact center quoting your booking reference. We apologize for any inconvenience this may cause and look forward to welcoming you on board.',
          ],
          main: [
            { q: 'The first flight leaves later than planned, so the passengers were moved to a different connecting flight.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1: <i>will now depart at 01:55 instead of 00:40… we have rebooked you… on flight AA 1178</i>.' },
            { q: 'Even though the bags are tagged to Austin, the passengers have to pick them up in Miami and hand them in again.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: <i>all passengers must collect their bags at the first point of entry, clear customs, and drop them off again</i>.' },
            { q: 'Some items are not allowed in the checked bag and must go in the cabin.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: <i>power banks and e-cigarettes are prohibited in checked luggage and must travel in your carry-on</i>.' },
          ],
          infer: [
            { q: '<b>feasible</b> (paragraph 1)', opts: ['possible to do', 'very expensive', 'comfortable'], a: 'possible to do', why: 'Si el primer vuelo sale más tarde, la conexión original ya no es <i>posible</i>; por eso los reubican.' },
            { q: '<b>layover</b> (paragraph 2)', opts: ['the waiting time between two connecting flights', 'the time the plane spends in the air', 'a hotel night paid by the airline'], a: 'the waiting time between two connecting flights', why: '<i>four hours and ten minutes</i> entre la llegada a Miami y la salida a Austin: la escala.' },
            { q: '<b>prohibited</b> (paragraph 3)', opts: ['not allowed', 'recommended', 'free of charge'], a: 'not allowed', why: 'Va seguido de <i>and must travel in your carry-on</i>: no se permiten en la maleta facturada.' },
            { q: '<b>entitled</b> (paragraph 4)', opts: ['having the right to receive something', 'obliged to pay for something', 'invited to a special event'], a: 'having the right to receive something', why: '<i>You are entitled to a free change… or a full refund</i>: tienes derecho a ello sin pagar.' },
          ],
          think: 'Con una escala de cuatro horas en Miami y noventa minutos para recoger maletas y pasar aduana, ¿cuánto margen real te queda? Escribe tres frases: qué vas a hacer con el tiempo (<i>We\'re going to…</i>), qué cambiarías de la maleta por la política de equipaje (<i>I\'d move… to my carry-on</i>) y qué le pedirías a la aerolínea con <i>Would it be possible to…?</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Reclamo por equipaje', type: 'comment', eyebrow: 'Writing task · reclamo formal', title: 'Escribe el reclamo por la maleta que no llegó', intro: 'Tu maleta no salió en la cinta y ya presentaste el PIR en el aeropuerto. Han pasado 48 horas y nada. Escribe el correo a la aerolínea (100-150 palabras): identifica vuelo y referencia, describe la maleta, pide la entrega en el hotel, menciona gastos y cierra formal. La checklist se marca sola.', placeholder: 'Dear Baggage Services, I am writing about a bag that did not arrive on flight … My booking reference is … The suitcase is a … Could you …', min: 100, max: 150, need: 5, checks: [
            { label: 'Abro formalmente (<i>Dear Sir or Madam / Dear Baggage Services / To whom it may concern</i>)', re: /\b(dear (sir|madam|sirs|customer|baggage|team|[a-z]+ (team|services|department))|to whom it may concern)\b/ },
            { label: 'Identifico el vuelo y una referencia (<i>flight LA 2460, booking reference, tag number, PIR</i>)', re: /\b(flight (number )?[a-z]{1,3}\s?\d{2,4}|booking (reference|code|number)|reference number|tag number|pir|file reference|claim number)\b/ },
            { label: 'Describo la maleta con al menos dos detalles (<i>color, size, hard-shell, wheels, strap, name tag…</i>)', re: /\b(hard-?shell|soft-?sided|suitcase|black|blue|navy|grey|gray|red|green|silver|medium|large|small|wheels|strap|ribbon|sticker|handle|name tag|brand)\b[\s\S]*\b(hard-?shell|soft-?sided|suitcase|black|blue|navy|grey|gray|red|green|silver|medium|large|small|wheels|strap|ribbon|sticker|handle|name tag|brand)\b/ },
            { label: 'Pido algo concreto con una fórmula cortés (<i>Could you… / I would like… / Would it be possible to… / I would appreciate…</i>)', re: /\b(could you|i would like|i'd like|would it be possible|i would appreciate|i would be grateful|please (deliver|send|let me know|confirm|contact))\b/ },
            { label: 'Digo dónde y cómo entregarla o contactarme (<i>deliver to the hotel, address, room, phone, WhatsApp</i>)', re: /\b(deliver(ed|y)?|address|hotel|room \d+|phone|whatsapp|reach me|contact me|until the)\b/ },
            { label: 'Menciono gastos, compensación o un plazo (<i>reimburse, receipts, essentials, within 24 hours, as soon as possible</i>)', re: /\b(reimburse(d|ment)?|compensat(e|ion)|receipts?|essentials|toiletries|within \d+ (hours|days)|as soon as possible|by (monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow)|no later than)\b/ },
            { label: 'Cierro formal (<i>Kind regards / Sincerely / Thank you in advance / I look forward to…</i>)', re: /\b(kind regards|best regards|regards|sincerely|yours faithfully|yours sincerely|thank you (in advance|for your (help|attention|time))|i look forward to)\b/ },
          ] },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Tres momentos', title: 'Toca las líneas en el orden correcto', intro: 'Seguridad, a bordo y la puerta con retraso. Piensa en quién pregunta y quién responde.', dialogs: [
          ['Officer: Next. Laptops and tablets out, liquids in the tray, please.', 'Aldo: Sure. Do I need to take my shoes off?', 'Officer: No, shoes can stay on. Belt off, please, and empty your pockets.', 'Aldo: Done. Can I keep my watch on?', 'Officer: Yes, that is fine. Step through… OK, you are good. Collect your things.', 'Aldo: Thanks. Which way to gate B7?'],
          ['Aldo: Excuse me, sorry to bother you. Would you mind swapping seats so I can sit next to my wife?', 'Passenger: Where is your seat?', 'Aldo: 22C, the aisle seat two rows back.', 'Passenger: An aisle seat? Sure, no problem.', 'Aldo: Thank you so much, I really appreciate it.', 'Passenger: Don\'t mention it. Enjoy the flight.'],
          ['Aldo: Excuse me, the screen says delayed. Do you know how long the delay is?', 'Agent: About ninety minutes. The aircraft is arriving late from Bogotá.', 'Aldo: We have a connection in Miami at eleven twenty. Are we going to make it?', 'Agent: It will be tight. Let me check… yes, I can protect you on the one fifteen just in case.', 'Aldo: That would be great, thank you. Could you tell me if our bags will be transferred automatically?', 'Agent: Yes, they are tagged through to Austin. I will print the new boarding passes now.'],
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language · por momento', title: 'Lo que vas a decir, en orden', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Check-in</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I'd like to check in for</b> the flight to Miami, please.</li><li><b>Here's</b> my passport <b>and</b> my booking reference.</li><li>I have <b>one bag to check</b> and <b>one carry-on</b>.</li><li><b>Could I have an aisle seat</b>, please? / <b>Could we sit together?</b></li><li><b>How much is</b> the excess baggage fee?</li><li><b>Would it be possible to</b> move a few things into my carry-on?</li><li><b>Could you weigh it again</b>, please?</li><li><b>Is my bag checked through to</b> Austin?</li></ul></div>
          <div><h3>Seguridad</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><i>Laptop out, please.</i> → <b>Sure. Does the tablet go out too?</b></li><li><i>Any liquids?</i> → <b>Just this bag, all under a hundred milliliters.</b></li><li><b>Do I need to take my shoes off?</b></li><li><b>Can I keep my watch on?</b></li><li><i>Step through, please.</i> → <b>Sorry, did it beep?</b></li></ul></div>
          <div><h3>Migración y aduana</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><i>Purpose of your visit?</i> → <b>I'm attending a conference in Austin.</b> / <b>We're on vacation.</b></li><li><i>Business or pleasure?</i> → <b>Business first, then a few days off with my wife.</b></li><li><i>How long are you staying?</i> → <b>Ten days. We fly back on the twenty-second.</b></li><li><i>Where are you staying?</i> → <b>At the Hilton Downtown; the address is on the form.</b></li><li><i>What do you do?</i> → <b>I'm a software developer at a bank in Lima.</b></li><li><i>Anything to declare?</i> → <b>Nothing to declare.</b> / <b>Just some coffee as gifts.</b></li></ul></div>
          <div><h3>Puerta de embarque</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>Excuse me, is this the gate for</b> flight 1178 to Austin?</li><li><b>Could you tell me how long the delay is?</b></li><li><b>Do you know if</b> we're still boarding at ten forty?</li><li><b>Which group is boarding now?</b></li><li><i>Would you volunteer?</i> → <b>What would we get in exchange? Is the later flight confirmed?</b></li><li><b>Could we have that in writing</b>, please?</li></ul></div>
          <div><h3>A bordo</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>Could I have</b> a glass of water / a blanket / the customs form, please?</li><li><b>Would you mind swapping seats</b> so I can sit with my wife? I'm in 22C, an aisle seat.</li><li><b>Sorry to bother you, could I get past?</b></li><li><b>Do you know if we're going to land on time?</b> We have a tight connection.</li><li><b>Thank you so much, I really appreciate it.</b></li></ul></div>
          <div><h3>Conexión perdida y equipaje</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>We've just missed our connection.</b> Our flight from Lima landed late.</li><li><b>Could you rebook us on the next available flight?</b></li><li><b>Does the airline cover a hotel</b> and meals for tonight?</li><li><b>I'd like to report a missing bag.</b> Here's the tag.</li><li><b>It's a medium dark blue hard-shell suitcase</b> with four wheels and a yellow strap.</li><li><b>Could you deliver it to</b> the Hotel Atlántico, Gran Vía 38?</li><li><b>Could I have a reference number</b> and a phone number to track it?</li><li><b>Do you cover essentials</b> while we wait? I'll keep the receipts.</li></ul></div>
          <div class="hint small"><b>Registro:</b> con agentes y oficiales, <i>Good morning / Thank you, officer / Have a good day</i>; con pasajeros, <i>Excuse me, sorry to bother you</i>. Nunca <s>Give me…</s>, <s>I want…</s> ni bromas en migración. Si no entendiste: <b>Sorry, could you say that again?</b> o <b>Sorry, did you say gate B12?</b></div></div>` },
        { label: '¿Qué dices?', type: 'mcq', eyebrow: 'Respuesta rápida', title: 'Elige la frase más natural para la situación', intro: 'Diez situaciones de todos los momentos del viaje. Elige la opción que diría alguien con buen inglés y buen registro.', pool: 10, items: [
          { q: 'En el mostrador quieres un asiento de pasillo.', opts: ['Could I have an aisle seat, please?', 'Give me the corridor seat.', 'I want aisle.'], a: 'Could I have an aisle seat, please?', why: '<b>Could I have…?</b> + <b>aisle seat</b>. <i>Corridor</i> es el pasillo de un edificio.' },
          { q: 'La agente dice que tu maleta pesa 26 kilos y el límite es 23.', opts: ['Would it be possible to move a few things into my carry-on?', 'Come on, it is only three kilos. Can you pass it?', 'That is impossible. Your scale is wrong.'], a: 'Would it be possible to move a few things into my carry-on?', why: 'Propones una solución con <b>Would it be possible to…?</b>. Pedir que "la pasen" suena a favor indebido.' },
          { q: 'En seguridad el agente dice "Laptop out, please".', opts: ['Sure, here it is. Does the tablet go out too?', 'Why? It is a laptop, not a bomb.', 'No, it is new.'], a: 'Sure, here it is. Does the tablet go out too?', why: 'Obedeces y preguntas lo útil. Las bromas en seguridad salen caras.' },
          { q: 'El oficial de migración: "Purpose of your visit?"', opts: ["I'm attending a conference in Austin.", 'For know the country.', "I don't know, holidays and things."], a: "I'm attending a conference in Austin.", why: 'Concreto y en presente continuo. <s>For know</s> es un calco; <i>I don\'t know</i> es una señal de alarma para el oficial.' },
          { q: 'El oficial: "How long are you staying?"', opts: ['Ten days. We fly back on the twenty-second.', 'Ten days, more or less, we will see.', 'How much time can I stay?'], a: 'Ten days. We fly back on the twenty-second.', why: 'Duración exacta + fecha de vuelta. <i>More or less</i> suena vago; devolver la pregunta, peor.' },
          { q: 'Anunciaron un cambio de puerta y no lo entendiste.', opts: ['Excuse me, could you tell me which gate flight 1178 is leaving from now?', 'Where is the airplane?', 'Which door now?'], a: 'Excuse me, could you tell me which gate flight 1178 is leaving from now?', why: 'Pregunta indirecta con el número de vuelo. <b>Gate</b>, no <i>door</i>.' },
          { q: 'A bordo, quieres que un pasajero te cambie el asiento para sentarte con tu esposa.', opts: ["Would you mind swapping seats with me so I can sit with my wife? I'm in 14C, an aisle seat.", 'Change with me, my wife is there.', 'You, sit there please, this is for my wife.'], a: "Would you mind swapping seats with me so I can sit with my wife? I'm in 14C, an aisle seat.", why: '<b>Would you mind + -ing</b> + motivo + qué asiento le ofreces (si es pasillo, dilo: vende).' },
          { q: 'Quieres agua y la auxiliar pasa a tu lado.', opts: ['Excuse me, could I have a glass of water, please?', 'Water.', 'Give me water, please.'], a: 'Excuse me, could I have a glass of water, please?', why: '<i>Give me… please</i> sigue siendo una orden aunque lleve <i>please</i>.' },
          { q: 'Tu primer vuelo llegó tarde y perdiste la conexión. Llegas al mostrador de tránsito.', opts: ['We missed our connection. Could you rebook us on the next available flight?', 'We lost the flight. What do we do now?', 'Your plane was late and now my flight is gone.'], a: 'We missed our connection. Could you rebook us on the next available flight?', why: '<b>missed</b> (no <i>lost</i>) y pides lo concreto: <b>rebook us</b>.' },
          { q: 'Tu maleta no salió en la cinta.', opts: ["I'd like to report a missing bag. Here's the baggage tag.", 'My luggage is lost. You lost it.', 'Where is my maleta?'], a: "I'd like to report a missing bag. Here's the baggage tag.", why: 'Vas al grano con la etiqueta en la mano. Acusar no acelera nada.' },
          { q: 'Te preguntan si cedes tu asiento porque el vuelo está sobrevendido.', opts: ['What would we get in exchange, and is the later flight confirmed?', 'No way, I have a ticket.', 'Yes, OK, whatever you want.'], a: 'What would we get in exchange, and is the later flight confirmed?', why: 'Negocias antes de decidir: compensación y confirmación. Las otras dos cierran o regalan la negociación.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Tres mostradores: check-in, migración y la maleta que no llegó', intro: 'Tres escenas con la gente real del aeropuerto. Elige tu réplica entre tres, mira por qué, dila en voz alta y la conversación sigue por donde elegiste. El tono importa tanto como la gramática: cortés con la agente, concreto con el oficial, calmado cuando todo sale mal.', scenes: [
          { t: 'Check-in con sobrepeso', you: 'Aldo, con su esposa, vuelo Lima – Miami – Austin', partner: 'Agente', role: 'agente de check-in, amable pero sin excepciones', goal: 'Entrega los documentos, resuelve el sobrepeso sin pagar de más (<b>Would it be possible to…?</b>), pide asiento con <b>Could I have…?</b> y confirma la puerta con una pregunta indirecta.', start: 'a', nodes: {
            a: { say: 'Good morning. Where are you flying to today?', opts: [
              { t: "Good morning. To Austin, via Miami. Here's my passport and the booking reference.", ok: 2, why: 'Saludas, das el destino final con la conexión (<b>Austin, via Miami</b>) y entregas documentos sin que te los pidan. Así va la maleta etiquetada hasta el final.', next: 'b' },
              { t: 'Miami. Here is my passport.', ok: 1, why: 'Correcto, pero el destino final es Austin: si solo dices Miami, la maleta puede quedarse allí.', next: 'b' },
              { t: 'Good morning. I fly to Austin for Miami.', ok: 0, why: '<s>I fly</s> suena a rutina y <s>for Miami</s> es calco de "por Miami". En inglés: <b>I\'m flying to Austin via Miami</b>.', next: 'a2' },
            ] },
            a2: { say: 'Sorry, so your final destination is Austin, connecting in Miami?', opts: [
              { t: "That's right: Austin, with a connection in Miami. Sorry, I meant via.", ok: 2, why: 'Confirmas con claridad (<b>That\'s right</b>) y te corriges sin drama. Eso es fluidez real.', next: 'b' },
              { t: 'Yes, Austin. Miami is the connection.', ok: 1, why: 'Claro y suficiente. Un <i>That\'s right</i> o <i>Exactly</i> al inicio suena más natural.', next: 'b' },
              { t: 'Yes, yes. For Miami.', ok: 0, why: 'Repites el error y la agente sigue sin saber si Miami es destino o escala. Di <b>via Miami</b> o <b>connecting in Miami</b>.', next: 'b' },
            ] },
            b: { say: 'Thank you. Do you have any bags to check today?', opts: [
              { t: 'Yes, one checked bag and this carry-on. Could you tell me what the weight allowance is?', ok: 2, why: 'Vocabulario exacto (<b>checked bag</b>, <b>carry-on</b>) y preguntas el límite con una pregunta indirecta antes de que pese.', next: 'c' },
              { t: 'Yes, one bag to check.', ok: 1, why: 'Correcto y claro. Preguntar la franquicia te habría preparado para lo que viene.', next: 'c' },
              { t: 'Yes, I have one baggage and one hand bag.', ok: 0, why: '<s>one baggage</s>: <i>baggage</i> es incontable, di <b>one bag</b>. Y <i>hand bag</i> es un bolso de mujer; equipaje de mano = <b>carry-on</b>.', next: 'c' },
            ] },
            c: { say: "Twenty-three kilos per bag. Please put it on the scale... That's twenty-six and a half. It's three and a half kilos overweight, I'm afraid.", opts: [
              { t: 'Oh. How much is the excess baggage fee? And would it be possible to move a few things into my carry-on?', ok: 2, why: 'Preguntas el precio (<b>How much is the fee?</b>) y propones la solución con <b>Would it be possible to…?</b>. Exactamente el registro que abre puertas.', next: 'd' },
              { t: 'How much do I have to pay?', ok: 1, why: 'Correcto, pero te resignas a pagar sin intentar la opción gratis: mover cosas al carry-on.', next: 'dpay' },
              { t: "Come on, it's only three kilos. Can you pass it?", ok: 0, why: 'Pedir que "la pase" suena a favor indebido y pone a la agente a la defensiva. Propón algo: <b>Would it be possible to repack?</b>', next: 'c2' },
            ] },
            c2: { say: "I'm sorry, sir, I can't make exceptions. You can pay the fee or repack your bag.", opts: [
              { t: "Fair enough. I'll move some things into my carry-on, if that's OK. Give me two minutes.", ok: 2, why: '<b>Fair enough</b> acepta sin perder la cara y eliges la opción gratis con un <i>if that\'s OK</i> que suaviza.', next: 'd' },
              { t: 'OK, I pay the fee. How much is it?', ok: 1, why: 'Resuelves, pero pagas setenta y cinco dólares que podías ahorrarte. Mejor <i>I\'ll pay</i> (decisión en el momento) que <i>I pay</i>.', next: 'dpay' },
              { t: "This is a robbery. Other airlines don't do this.", ok: 0, why: 'Insultar a la aerolínea delante de la agente no baja ningún precio y puede acabar con un supervisor. Las reglas no se negocian; el método sí.', next: 'fail' },
            ] },
            dpay: { say: "It's seventy-five dollars. Card or cash?", opts: [
              { t: 'Card, please. Actually, could I try moving a couple of things into my carry-on first?', ok: 2, why: 'Cambias de idea a tiempo y con educación (<b>Actually, could I…?</b>). La agente lo agradece más que tú.', next: 'd' },
              { t: 'Card, please.', ok: 1, why: 'Correcto. Pagas y sigues; era evitable.', next: 'e' },
              { t: 'With card. Can you give me factura?', ok: 0, why: '<b>By card</b> (no <i>with</i>) y el comprobante es <b>receipt</b>; <i>factura</i> no existe en inglés y <i>invoice</i> es otra cosa.', next: 'e' },
            ] },
            d: { say: 'Of course. The fee would be seventy-five dollars, so repacking is a good idea. Take your time.', opts: [
              { t: 'Thanks. Done; could you weigh it again, please?', ok: 2, why: '<b>Could you weigh it again, please?</b>: petición cortés con el verbo correcto (<i>weigh</i>, no <i>weight</i>).', next: 'e' },
              { t: 'OK, weigh it again.', ok: 1, why: 'El verbo es correcto, pero sin <i>could you</i> ni <i>please</i> suena a orden.', next: 'e' },
              { t: 'Thanks. Can you weight it again?', ok: 0, why: '<i>weight</i> es el sustantivo (peso); el verbo es <b>weigh</b>: <i>Could you weigh it again?</i>', next: 'e' },
            ] },
            e: { say: 'Twenty-two point eight. Perfect. Now, do you have a seat preference?', opts: [
              { t: "I'd like an aisle seat if there's one available, please. And could we sit together? My wife checked in online.", ok: 2, why: '<b>I\'d like… if there\'s one available</b> + <b>Could we sit together?</b>: pides dos cosas con el registro justo.', next: 'f' },
              { t: 'Aisle, please.', ok: 1, why: 'Se entiende y es educado. Te falta pedir sentarte con tu esposa.', next: 'f' },
              { t: 'I want a seat in the corridor.', ok: 0, why: '<i>I want</i> suena a orden y <i>corridor</i> es el pasillo de un edificio. En el avión: <b>aisle seat</b>.', next: 'f' },
            ] },
            f: { say: "Let me see... 14C and 14B, aisle and middle, together. Your bag is checked through to Austin. Anything else?", opts: [
              { t: "That's great, thank you. Just one more thing: could you tell me which gate we're boarding from?", ok: 2, why: 'Agradeces y cierras con una pregunta indirecta útil: <b>could you tell me which gate we\'re boarding from?</b>', next: 'g' },
              { t: "No, that's all. Thank you very much.", ok: 1, why: 'Cierre correcto y amable; la puerta la verás en la pantalla.', next: 'win' },
              { t: 'Yes. Where is the door for the airplane?', ok: 0, why: '<i>Door</i> es la puerta de una casa; aquí es <b>gate</b>. Y la pregunta directa suena algo seca: <b>Could you tell me which gate…?</b>', next: 'g' },
            ] },
            g: { say: 'Gate B7. Boarding starts at nine forty. Security is to your right. Have a good flight.', opts: [
              { t: 'Thank you very much. Have a good day.', ok: 2, why: 'Respondes al deseo con otro adecuado: ella no vuela, así que <b>Have a good day</b>.', next: 'win' },
              { t: 'Thanks. Bye.', ok: 1, why: 'Correcto e informal. Un <i>Have a good day</i> redondea.', next: 'win' },
              { t: 'Thank you. You too, have a good flight.', ok: 0, why: 'El clásico: <i>You too</i> a alguien que no viaja. Inofensivo, pero delata el piloto automático. <b>Have a good day</b>.', next: 'meh' },
            ] },
            win: { say: 'Thank you. Enjoy your trip!', end: true, outcome: 'win', note: 'Diste el destino final, resolviste el sobrepeso con <b>Would it be possible to move a few things into my carry-on?</b>, pediste asiento con <b>I\'d like / Could I have</b> y cerraste con una pregunta indirecta. Así se pasa un mostrador sin pagar de más.' },
            meh: { say: 'Ha, I wish! Enjoy your trip.', end: true, outcome: 'meh', note: 'Todo bien hasta el último segundo: <i>You too</i> solo funciona si la otra persona también viaja. Para despedirte de quien atiende: <b>Have a good day</b> / <b>Thanks for your help</b>.' },
            fail: { say: "Sir, I'm going to ask you to step aside. My supervisor will be with you shortly.", end: true, outcome: 'fail', note: 'Atacar a la agente nunca baja el precio. Las reglas no se negocian, el método sí: <b>Would it be possible to repack?</b> y, si no, <b>Fair enough, how much is the fee?</b>' },
          } },

          { t: 'Migración en EE. UU.', you: 'Aldo, recién aterrizado en Miami con su esposa', partner: 'Oficial', role: 'oficial de CBP, seco y sin tiempo que perder', goal: 'Responde a las cinco preguntas con datos concretos y cortos (<b>I\'m attending… We\'re staying for… at the…</b>), sin vaguedades, sin bromas y con <b>officer</b> al final.', start: 'a', nodes: {
            a: { say: 'Next. Passport and customs form.', opts: [
              { t: "Good afternoon. Here's my passport and the form.", ok: 2, why: 'Saludo breve + documentos. <b>Here\'s</b> (no <i>here you have</i>). Nada más: el oficial pregunta, tú respondes.', next: 'b' },
              { t: 'Here.', ok: 1, why: 'Correcto, pero seco. Un <i>Good afternoon</i> no cuesta nada y marca el tono.', next: 'b' },
              { t: 'Here you have, sir. I am Aldo Suárez, from Peru, I come for a conference.', ok: 0, why: '<s>Here you have</s> es calco de "aquí tiene" (<b>Here you go</b> / <b>Here\'s…</b>). Y dar información que nadie pidió suena nervioso.', next: 'b' },
            ] },
            b: { say: "What's the purpose of your trip?", opts: [
              { t: "I'm attending a software conference in Austin, and then my wife and I are going to spend a few days in New York.", ok: 2, why: 'Presente continuo para el plan cerrado (<b>I\'m attending</b>) y <b>going to</b> para la intención. Concreto, en una frase.', next: 'c' },
              { t: 'Business. A conference in Austin.', ok: 1, why: 'Correcto y muy típico. Si también hay vacaciones, dilo ahora; descubrirlo después genera preguntas.', next: 'c' },
              { t: 'I come for a conference and for to know New York.', ok: 0, why: '<s>for to</s> no existe y <s>to know</s> no es visitar. <b>I\'m here for a conference, and then we\'re visiting New York</b>.', next: 'b2' },
            ] },
            b2: { say: 'Say that again?', opts: [
              { t: "Sorry. I'm here for a conference in Austin, and after that we're visiting New York for a few days.", ok: 2, why: 'Reformulas con calma y sin repetir el error: <b>I\'m here for… we\'re visiting…</b>', next: 'c' },
              { t: 'A conference. And tourism in New York.', ok: 1, why: 'Se entiende. Mejor con verbo: <i>and then some sightseeing in New York</i>.', next: 'c' },
              { t: 'Conference. Vacations. Austin, New York.', ok: 0, why: 'Telegráfico y sin verbos: al oficial le suena evasivo. Una frase completa tranquiliza: <b>I\'m attending a conference in Austin</b>.', next: 'c' },
            ] },
            c: { say: 'How long are you staying?', opts: [
              { t: "Twelve days. We're flying back to Lima on the fourteenth; here's our return ticket.", ok: 2, why: 'Número exacto + fecha + prueba. <b>We\'re flying back</b> es el presente continuo de plan.', next: 'd' },
              { t: 'Twelve days.', ok: 1, why: 'Correcto y suficiente. La fecha de vuelta a mano ahorra la siguiente pregunta.', next: 'd' },
              { t: "I'm going to stay twelve days more or less, maybe fifteen, it depends.", ok: 0, why: '<i>More or less, maybe, it depends</i>: tres señales de alarma seguidas. Ante migración, la duración es un número y una fecha.', next: 'c2' },
            ] },
            c2: { say: 'Depends on what? Do you have a return ticket?', opts: [
              { t: "Yes, sorry, I wasn't clear. We leave on the fourteenth. Here's the return ticket.", ok: 2, why: 'Reconoces la confusión (<b>I wasn\'t clear</b>) y das el dato con prueba. El oficial baja la guardia.', next: 'd' },
              { t: 'Yes. The fourteenth.', ok: 1, why: 'Correcto. Mostrar el pasaje sin que lo pida habría cerrado el tema del todo.', next: 'd' },
              { t: "I don't have it printed. My wife has the information.", ok: 0, why: 'Sin dato ni documento tras una respuesta vaga, el oficial te manda a inspección secundaria. Lleva el pasaje de vuelta en el móvil, siempre.', next: 'fail' },
            ] },
            d: { say: 'Where are you staying?', opts: [
              { t: 'The first four nights at the Hilton Downtown Austin, the conference hotel, and then at an Airbnb in Brooklyn. The addresses are on the form.', ok: 2, why: 'Lugares concretos y remites al formulario. <b>At the</b> + hotel.', next: 'e' },
              { t: 'At the Hilton in Austin, and then in New York.', ok: 1, why: 'Correcto. Para Nueva York falta el tipo de alojamiento; si pregunta, ten la dirección lista.', next: 'e' },
              { t: 'In a hotel.', ok: 0, why: 'Demasiado vago: el oficial va a preguntar cuál, y parecerá que lo ocultabas. Di el nombre: <b>At the Hilton Downtown Austin</b>.', next: 'e' },
            ] },
            e: { say: 'What do you do for a living?', opts: [
              { t: "I'm a senior software developer. I work for a bank in Lima.", ok: 2, why: 'Profesión con artículo (<b>a</b> developer) y empleador. Dos frases cortas.', next: 'f' },
              { t: "I'm a developer.", ok: 1, why: 'Correcto y suficiente.', next: 'f' },
              { t: "I'm engineer of systems in Lima.", ok: 0, why: 'Falta el artículo (<b>an engineer</b>) y <i>engineer of systems</i> es calco: <b>a systems engineer</b> o <b>a software developer</b>.', next: 'f' },
            ] },
            f: { say: 'Are you bringing any food, plants, or more than ten thousand dollars in cash?', opts: [
              { t: 'Nothing to declare, officer. Just a few bags of roasted coffee as gifts, if that counts.', ok: 2, why: 'Respuesta clara + mencionas el café por si acaso (<b>if that counts</b>). La honestidad proactiva es lo que buscan.', next: 'g' },
              { t: 'No, nothing.', ok: 1, why: 'Correcto si de verdad no llevas nada. Si llevas café o chocolates, dilo: casi siempre pasan, pero ocultarlo es el problema.', next: 'g' },
              { t: 'No, no. Only my sandwich from the plane, is not important.', ok: 0, why: 'Un sándwich es comida y tú decides que "no es importante": mala combinación. Además falta el sujeto: <b>it\'s not important</b>.', next: 'f2' },
            ] },
            f2: { say: "Food is food, sir. What's in the sandwich?", opts: [
              { t: "Sorry, you're right. It's ham and cheese, from the plane. I can throw it away.", ok: 2, why: 'Reconoces (<b>you\'re right</b>), respondes a la pregunta y ofreces la solución. Tema cerrado.', next: 'g' },
              { t: 'Ham and cheese.', ok: 1, why: 'Respondes lo que preguntó; correcto. Ofrecer tirarlo habría acelerado.', next: 'g' },
              { t: "It's just a sandwich, relax.", ok: 0, why: 'Decirle <i>relax</i> a un oficial de CBP es la forma más rápida de pasar dos horas en secundaria.', next: 'fail' },
            ] },
            g: { say: 'Look at the camera. Left hand on the scanner... right hand... OK. Enjoy your stay.', opts: [
              { t: 'Thank you, officer. Have a good day.', ok: 2, why: '<b>Thank you, officer</b>: el tratamiento correcto y una despedida neutra.', next: 'win' },
              { t: 'Thanks.', ok: 1, why: 'Correcto y breve.', next: 'win' },
              { t: 'Thank you. Finally! That was a long line.', ok: 0, why: 'Comentar la espera suena a queja justo cuando ya habías pasado. Con un oficial: menos es más.', next: 'meh' },
            ] },
            win: { say: 'Welcome to the United States.', end: true, outcome: 'win', note: 'Respuestas cortas y concretas: <b>I\'m attending a conference</b>, <b>We\'re staying for twelve days</b>, <b>at the Hilton Downtown</b>, <b>I\'m a software developer</b>, <b>nothing to declare</b>. Sin vaguedades, sin bromas, con <b>officer</b>. Así se pasa migración en noventa segundos.' },
            meh: { say: "Mm-hm. Next!", end: true, outcome: 'meh', note: 'Pasaste, pero el comentario final sobró. Ante un oficial, la conversación termina en <b>Thank you, officer</b>. Las quejas, para el café de después.' },
            fail: { say: 'Step aside, sir. Secondary inspection, through that door.', end: true, outcome: 'fail', note: 'Vaguedad, falta de documentos o un <i>relax</i> al oficial: cualquiera de los tres te manda a secundaria. Lleva pasaje de vuelta y reserva en el móvil, responde con números y fechas, y nunca minimices lo que traes.' },
          } },

          { t: 'Conexión perdida y maleta que no aparece', you: 'Aldo, en el aeropuerto de Bogotá a las once de la noche', partner: 'Agente', role: 'agente del mostrador de tránsito; después, agente de la oficina de equipaje', goal: 'Explica qué pasó con <b>missed</b>, pide con <b>Could you rebook us…?</b>, consigue hotel y comida, y en la oficina de equipaje describe la maleta y da la dirección completa del hotel. Calma: el enfado no reprograma vuelos.', start: 'a', nodes: {
            a: { say: 'Next, please. How can I help you?', opts: [
              { t: "Hi. We've just missed our connection to Madrid; our flight from Lima landed an hour and a half late. Could you rebook us on the next available flight?", ok: 2, why: 'Qué pasó (<b>missed our connection</b>), por qué (el retraso fue de la aerolínea) y qué pides (<b>Could you rebook us…?</b>). Tres cosas en una frase.', next: 'b' },
              { t: 'We missed our flight to Madrid. What can we do?', ok: 1, why: 'Correcto (<b>missed</b>). Decir que el primer vuelo llegó tarde te da derecho a hotel y comida: menciónalo.', next: 'b' },
              { t: 'We lost our flight to Madrid because the other flight was delay.', ok: 0, why: 'Un vuelo se <b>miss</b>, no se <i>lose</i>; y <b>was delayed</b>, con participio. La agente entiende, pero la frase chirría.', next: 'b' },
            ] },
            b: { say: "I see. The next flight to Madrid is tomorrow at ten fifteen. I can put you both on it.", opts: [
              { t: "Thank you. Since the delay was the airline's fault, would it be possible to get a hotel room and meal vouchers for tonight?", ok: 2, why: 'Aceptas, das el argumento (<b>the airline\'s fault</b>) y pides con <b>Would it be possible to…?</b>. Firme y cortés.', next: 'c' },
              { t: 'OK. And the hotel? We have to sleep somewhere.', ok: 1, why: 'Se entiende y funciona, pero suena a exigencia. <i>Does the airline cover a hotel for tonight?</i> es más limpio.', next: 'c' },
              { t: 'Tomorrow?! No, no, no. You have to put us on another airline tonight.', ok: 0, why: 'Gritar un <i>you have to</i> no crea asientos. Primero pregunta si hay opción esta noche; si no, negocia el hotel.', next: 'b2' },
            ] },
            b2: { say: "Sir, I'm trying to help you. There are no seats tonight on any carrier.", opts: [
              { t: "I'm sorry, it's been a long day. Tomorrow at ten fifteen is fine. Could you tell me if the airline covers a hotel for tonight?", ok: 2, why: 'Te disculpas (<b>it\'s been a long day</b>), aceptas y vuelves al tono cortés con una pregunta indirecta. Recuperas a la agente.', next: 'c' },
              { t: 'OK, tomorrow. Do you pay the hotel?', ok: 1, why: 'Vuelves al carril. <b>Do you cover the hotel?</b> o <b>Does the airline pay for a hotel?</b> sonarían más naturales.', next: 'c' },
              { t: 'This is your problem, not mine. I want to speak to your manager.', ok: 0, why: 'La agente es tu única aliada a las once de la noche. Escalar sin motivo te deja sin hotel y con el mismo vuelo de mañana.', next: 'fail' },
            ] },
            c: { say: "Yes. Here are your new boarding passes, a hotel voucher for the Airport Inn and two meal vouchers. The shuttle leaves from door four.", opts: [
              { t: "That's great, thank you. One more thing: our checked bags were tagged through to Madrid. Do they stay here tonight, or do we pick them up?", ok: 2, why: 'Agradeces y anticipas el siguiente problema con vocabulario exacto (<b>tagged through</b>, <b>pick them up</b>).', next: 'd' },
              { t: 'Thanks. And our bags?', ok: 1, why: 'Correcto y corto; la agente entiende. Una pregunta completa evita malentendidos.', next: 'd' },
              { t: 'Thanks. And our baggages? They are two.', ok: 0, why: '<s>baggages</s> no existe: <b>our bags</b> o <b>our two bags</b>. <i>They are two</i> es calco de "son dos".', next: 'd' },
            ] },
            d: { say: "They should be at baggage claim, carousel nine. If they're not there, go to the baggage service office right next to it.", opts: [
              { t: "Got it. Thanks for your help.", ok: 2, why: '<b>Got it</b> confirma que entendiste y <b>Thanks for your help</b> cierra bien con quien te ayudó.', next: 'e' },
              { t: 'OK.', ok: 1, why: 'Correcto, algo seco después de que te resolviera la noche.', next: 'e' },
              { t: 'Hopefully. Last time your airline lost my bag.', ok: 0, why: 'El comentario no aporta y suena a reproche a quien acaba de ayudarte. Guarda la energía para la oficina de equipaje.', next: 'e' },
            ] },
            e: { who: 'Agente de equipaje', say: 'Baggage services, good evening. Baggage tag number?', opts: [
              { t: 'Good evening. Here are the two tags. We waited at carousel nine until it stopped, and only one of our bags came out.', ok: 2, why: 'Saludas, entregas los talones y resumes el problema con precisión (<b>only one of our bags came out</b>).', next: 'f' },
              { t: "Here. One bag didn't arrive.", ok: 1, why: 'Correcto y directo. Decir en qué cinta esperaste ayuda al agente.', next: 'f' },
              { t: 'Good evening. My suitcase is not appeared. The number is this.', ok: 0, why: '<s>is not appeared</s>: en inglés <b>hasn\'t arrived</b> o <b>didn\'t come out</b>. Y <i>Here\'s the tag number</i>.', next: 'f' },
            ] },
            f: { say: "Let me check... The bag is still in Lima. It'll be on tomorrow's flight. Can you describe it?", opts: [
              { t: "It's a medium-sized dark blue hard-shell suitcase, four wheels, with a yellow strap around it and a name tag with my wife's name, Carla Rojas.", ok: 2, why: 'Tamaño, color, tipo (<b>hard-shell</b>), ruedas, seña particular y nombre en la etiqueta. Con esto la encuentran.', next: 'g' },
              { t: "It's blue, medium, with wheels.", ok: 1, why: 'Correcto, pero hay cien maletas azules medianas con ruedas. Añade una seña: <i>a yellow strap</i>, <i>a sticker</i>.', next: 'g' },
              { t: 'Is blue, more or less big, nothing special.', ok: 0, why: 'Falta el sujeto (<b>It\'s blue</b>) y <i>nothing special</i> es justo lo contrario de lo que necesitan. Describe algo único.', next: 'g' },
            ] },
            g: { say: 'Thank you. Where should we deliver it? Your hotel in Madrid?', opts: [
              { t: "Yes, please. We're at the Hotel Atlántico, Gran Vía 38, until the twentieth. Could I have a reference number and a phone number to track it?", ok: 2, why: 'Dirección completa, hasta cuándo, y pides lo que te protegerá: <b>a reference number</b>.', next: 'h' },
              { t: 'Yes, to the Hotel Atlántico in Madrid.', ok: 1, why: 'Correcto, pero sin calle ni fecha límite; el agente te lo va a pedir.', next: 'g2' },
              { t: "Yes. The hotel is on Gran Vía, I don't know the number, send it there.", ok: 0, why: 'Sin dirección completa no hay entrega. Búscala en la reserva antes de llegar al mostrador. Y <i>send it there</i> suena a orden.', next: 'g2' },
            ] },
            g2: { say: "I need the full address, sir, or we can't deliver it.", opts: [
              { t: 'Of course, sorry. Let me check the booking... Hotel Atlántico, Gran Vía 38, 28013 Madrid. Until the twentieth.', ok: 2, why: 'Buscas el dato sin discutir (<b>Let me check the booking</b>) y lo das completo con fecha límite.', next: 'h' },
              { t: 'Hotel Atlántico, Gran Vía 38, Madrid.', ok: 1, why: 'Suficiente para entregar. Añadir hasta cuándo te quedas evita que llegue cuando ya te fuiste.', next: 'h' },
              { t: 'Just put Hotel Atlántico, Madrid. The taxi drivers all know it.', ok: 0, why: 'El sistema necesita una dirección, no la fama del hotel. Sin ella, la maleta puede quedarse en el almacén.', next: 'meh' },
            ] },
            h: { say: "Here's your reference: PIR number BOG-48213. You can track it online. Anything else?", opts: [
              { t: 'Yes, one last question: does the airline cover essentials like toiletries and a change of clothes while we wait?', ok: 2, why: 'La pregunta que casi nadie hace y que vale dinero: <b>Does the airline cover essentials?</b> Guarda los recibos.', next: 'win' },
              { t: "No, that's all. Thank you very much.", ok: 1, why: 'Cierre correcto. Preguntar por los gastos de primera necesidad te habría ahorrado la compra del cepillo de dientes.', next: 'win' },
              { t: 'Yes. I want compensation now, in cash, for the damage.', ok: 0, why: 'La compensación por retraso se reclama después con recibos, no en efectivo en el mostrador. <b>Do you reimburse essentials?</b> es la pregunta real.', next: 'meh' },
            ] },
            win: { say: 'Yes, up to a hundred dollars a day with receipts. Good night, and sorry again for the trouble.', end: true, outcome: 'win', note: 'Dijiste <b>We missed our connection</b>, pediste con <b>Could you rebook us…?</b> y <b>Would it be possible to get a hotel…?</b>, describiste la maleta con señas únicas y diste la dirección completa con fecha límite. Y preguntaste por los <b>essentials</b>: eso es viajar con oficio.' },
            meh: { say: "I'll note that down. Keep your receipts and check the website for updates.", end: true, outcome: 'meh', note: 'Resolviste lo principal, pero quedó un cabo suelto: sin dirección completa la entrega se retrasa, y la compensación no se pide en efectivo en el mostrador. Lleva la reserva del hotel a mano y pregunta <b>Do you cover essentials while we wait?</b>' },
            fail: { say: "The supervisor has left for the night, sir. Your flight is tomorrow at ten fifteen. Next, please.", end: true, outcome: 'fail', note: 'Escalar sin motivo te dejó sin hotel y con el mismo vuelo. Cuando algo sale mal: respira, di <b>it\'s been a long day</b>, acepta la opción real y negocia lo demás con <b>Would it be possible to…?</b>' },
          } },
        ] },
      ] },
    ],
  };
})();
