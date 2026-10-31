/* ===========================================================
   practico/hotel.js — Inglés práctico · Hotel y transporte en la ciudad
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos usados: notes, flashcards, match, mcq, dictation, dialog,
   speaking, stress, reading, fix, soft, comment, order, roleplay
   =========================================================== */
(() => {
  /* ---------- Vocabulario por momento: [palabra, def ES, ejemplo, pregunta, say?] ---------- */
  const BOOK = [
    ['book a room', 'reservar una habitación (v.); también make a reservation', "I'd like to book a double room for three nights, from the 12th to the 15th.", '¿Reservas por teléfono, por chat o por la web del hotel?'],
    ['double room / twin room', 'habitación doble con una cama grande / con dos camas separadas', "Is that a double or a twin room? We'd prefer one king bed, please.", '¿Qué pides cuando viajas con tu esposa? ¿Y con un colega?'],
    ['rate', 'tarifa (n.): el precio por noche', "What's the nightly rate for a double in October?", '¿Qué tarifa te parece razonable por noche en una conferencia?'],
    ['breakfast included', 'desayuno incluido (en el precio)', 'Does the rate include breakfast, or is it extra?', '¿Pagas más por el desayuno incluido o prefieres salir a desayunar?'],
    ['free cancellation', 'cancelación gratuita (hasta cierta fecha)', 'Is there free cancellation up to 24 hours before arrival?', '¿Hasta cuándo sueles poder cancelar sin pagar?'],
    ['non-refundable', 'no reembolsable (adj.): si cancelas, no te devuelven el dinero', "The non-refundable rate is cheaper, but you can't change the dates.", '¿Alguna vez elegiste tarifa no reembolsable y te arrepentiste?'],
    ['availability', 'disponibilidad (n.)', 'Do you have any availability for the weekend of the 20th?', '¿Cómo preguntas si hay sitio sin decir "disponibility"?', 'availability'],
  ];
  const CHECKIN = [
    ['check in / check out', 'registrarse al llegar / dejar el hotel al irse (v.); check-in y check-out como sustantivos', 'Check-in is from 3 p.m. and check-out is at noon.', '¿A qué hora sueles llegar a un hotel?'],
    ['front desk', 'recepción (n.); también reception', 'If you need anything, just call the front desk and dial zero.', '¿Qué fue lo último que pediste en recepción?'],
    ['a reservation under the name of', 'una reserva a nombre de (nunca "in name of")', 'Good evening. I have a reservation under the name of Pérez, for two nights.', '¿A nombre de quién reservas cuando viajas por trabajo?'],
    ['deposit', 'depósito, garantía (n.): dinero que retienen por si hay gastos extra', "We'll put a hold of 100 dollars on your card as a deposit.", '¿Te han retenido un depósito alguna vez? ¿Cuánto?', 'deposit'],
    ['key card', 'tarjeta llave (n.)', 'Here are your key cards. The elevator only works with the card.', '¿Has perdido alguna vez la tarjeta de la habitación?'],
    ['Wi-Fi password', 'contraseña del wifi (n.): "wai-fai", no "wifi"', "What's the Wi-Fi password? Is it the same in the whole hotel?", '¿Qué es lo primero que pides al llegar: el wifi o el agua?', 'Wi-Fi password'],
  ];
  const PROBLEM = [
    ['air conditioning', 'aire acondicionado (n.); en la calle, the AC', "The air conditioning isn't working; the room is really hot.", '¿Duermes con aire acondicionado o con la ventana abierta?'],
    ['hot water', 'agua caliente (n.)', "There's no hot water in the shower, only cold.", '¿Qué dices a las 11 de la noche sin agua caliente?'],
    ['noisy', 'ruidoso/a (adj.); noise (n.)', 'The room is really noisy; it faces the main street.', '¿Qué te molesta más en un hotel: el ruido o el calor?'],
    ['towels', 'toallas (n.)', 'Could you send up some extra towels, please?', '¿Cuántas toallas necesitan ustedes dos?', 'towels'],
    ['switch rooms', 'cambiar de habitación (v.); también change rooms', 'Would it be possible to switch rooms? Something quieter, please.', '¿Por qué pedirías cambiar de habitación?'],
    ['send someone up', 'mandar a alguien a la habitación (v.)', 'Could you send someone up to have a look at the heater?', '¿Qué cosas haría que llamaras a recepción para que suban?'],
    ['out of order', 'fuera de servicio, averiado (adj.)', 'The elevator is out of order, so we had to take the stairs.', '¿Qué aparato encuentras siempre "out of order"?'],
  ];
  const SERVICE = [
    ['late check-out', 'salida tardía (n.): dejar la habitación después de la hora', "Could we have a late check-out? Our flight isn't until 9 p.m.", '¿Cuántas horas de late check-out te salvarían el último día?'],
    ['store our luggage', 'guardar el equipaje (v.); también keep our bags', 'Could you store our luggage until this evening?', '¿Qué haces con las maletas entre el check-out y el vuelo?', 'store our luggage'],
    ['laundry service', 'servicio de lavandería (n.)', 'Do you have a laundry service? I need this shirt by tomorrow morning.', '¿Llevas ropa para toda la semana o usas la lavandería?', 'laundry service'],
    ['room service', 'servicio a la habitación (n.)', 'Room service is available until 11 p.m.', '¿Cuándo fue la última vez que pediste room service?'],
    ['wake-up call', 'llamada despertador (n.)', 'Could I get a wake-up call at 5:30, please?', '¿Confías en el despertador del móvil o pides wake-up call?'],
    ['recommend', 'recomendar (v.): recommend something / recommend a place to eat', 'Could you recommend a good place for seafood near here?', '¿Qué restaurante de Lima le recomendarías a un turista?'],
    ['within walking distance', 'a poca distancia a pie (adv.)', 'Is the conference center within walking distance?', '¿Qué hay a poca distancia a pie de tu casa?'],
  ];
  const CHECKOUT = [
    ['bill', 'cuenta (n.): lo que tienes que pagar; invoice = factura con datos fiscales', "Could I have the bill, please? And I'd like an invoice with my company's details.", '¿Pides factura a nombre de tu empresa o pagas tú?'],
    ['charge', 'cargo (n.) / cobrar (v.)', "There's a charge here I don't recognize. What is this 40-dollar item?", '¿Has encontrado alguna vez un cargo raro en la cuenta del hotel?'],
    ['minibar', 'minibar (n.)', "We didn't use the minibar, so this charge must be a mistake.", '¿Tocas el minibar o es demasiado caro?'],
    ['receipt', 'recibo, comprobante (n.): la p no suena', 'Could you email me the receipt? I need it for my expenses.', '¿Guardas los recibos en papel o en foto?', 'receipt'],
    ['itemized bill', 'cuenta detallada, línea por línea (n.)', 'Could I see an itemized bill before I pay?', '¿Revisas la cuenta línea por línea o pagas sin mirar?'],
  ];
  const CITY = [
    ['one-way ticket / return ticket', 'billete de ida / de ida y vuelta (n.); en EE. UU. round-trip', 'A one-way ticket to the airport, please.', '¿Compras ida y vuelta o decides sobre la marcha?'],
    ['fare', 'tarifa de transporte (n.): taxi, bus, metro', 'How much is the fare to downtown?', '¿Cuánto es la tarifa del metro en Lima?'],
    ['rush hour', 'hora punta (n.)', "Avoid the metro at rush hour; it's packed.", '¿A qué hora es la hora punta en tu ciudad?'],
    ['meter', 'taxímetro (n.)', 'Could you turn on the meter, please?', '¿En Lima los taxis usan taxímetro?'],
    ['pick-up point', 'punto de recogida (n.): donde te espera el conductor de la app', 'The app says the pick-up point is across the street, by the pharmacy.', '¿Dónde te recogen las apps cuando sales del aeropuerto?'],
    ['change lines', 'hacer transbordo (v.); también transfer', 'Take the blue line and change at Central Station.', '¿Cuántos transbordos haces para ir al trabajo?'],
    ['block', 'cuadra, manzana (n.)', "It's two blocks down, on the corner.", '¿A cuántas cuadras está tu metro más cercano?'],
    ['across from', 'frente a, al otro lado de la calle (prep.); también opposite', 'The hotel is across from the park, next to a pharmacy.', '¿Qué hay frente a tu oficina?'],
    ['go past', 'pasar de largo, seguir más allá de (v.)', 'Go past the bank and turn left at the traffic lights.', '¿Qué edificio pasas cada día de camino al trabajo?'],
    ['get off / get on', 'bajarse / subirse (de un bus, metro, tren) (v.); de un coche: get out / get in', 'Get off at the third stop and walk straight ahead.', '¿En qué parada te bajas para ir al centro?'],
    ['rent a car', 'alquilar un coche (v.); rental car = coche de alquiler', "We'd like to rent a car for the weekend. Automatic, if possible.", '¿Has alquilado un coche en el extranjero? ¿Automático o manual?'],
    ['insurance', 'seguro (n.); full insurance = a todo riesgo', 'Does the price include full insurance?', '¿Pagas el seguro completo o te arriesgas?', 'insurance'],
    ['drop off', 'devolver (un coche) / dejar (a un pasajero) (v.)', 'Can I drop the car off at the airport instead of here?', '¿Dónde te gusta que te dejen: en la puerta o en la esquina?'],
  ];
  const ALL = [...BOOK, ...CHECKIN, ...PROBLEM, ...SERVICE, ...CHECKOUT, ...CITY];
  const card = (cat, t) => { const c = { cat, w: t[0], def: t[1], ex: t[2], ask: t[3] }; if (t[4]) c.say = t[4]; return c; };

  window.UNIT_DATA['practico/hotel'] = {
    source: 'Inglés práctico · Hotel y transporte',
    description: 'De la reserva al taxi: reservar, hacer el check-in, quejarte sin sonar brusco (<i>I\'m afraid there\'s no hot water</i>), pedir servicios, discutir un cargo en la factura y moverte por la ciudad en taxi, app, metro o coche de alquiler.',
    cando: [
      'Reservar una habitación por teléfono o chat diciendo fechas, tipo de habitación y condiciones (<i>I\'d like to book a double room… Is breakfast included? Is there free cancellation?</i>)',
      'Hacer el check-in y entender lo del depósito, la hora de salida y el wifi (<i>I have a reservation under the name of…</i>)',
      'Quejarme de un problema en la habitación sin sonar brusco (<i>I\'m afraid there\'s no hot water. Could you send someone up?</i>)',
      'Pedir servicios: late check-out, guardar el equipaje, lavandería y una recomendación (<i>Would it be possible to…?</i>)',
      'Revisar la factura, discutir un cargo que no reconozco y pedir el recibo o la factura para la empresa',
      'Moverme por la ciudad: taxi o app con <i>How much is it to…?</i>, metro con transbordos, pedir y entender direcciones y comparar opciones (<i>faster / cheaper than</i>)',
    ],
    map: [
      ['Reservar', 'Fechas, tipo de habitación, desayuno, cancelación: <i>I\'d like to book… from the 12th to the 15th · Does the rate include breakfast? · Is there free cancellation?</i>', 'Flashcards, colocaciones, reto de reserva por teléfono, ordena el diálogo'],
      ['Check-in', '<i>I have a reservation under the name of… · Could I see your passport? · a hold on your card · What time is check-out? · the Wi-Fi password</i>', 'Dictado, corrige <i>in name of</i>, role-play con una reserva que no aparece'],
      ['Problemas en la habitación', 'Quejarse con cortesía: <i>I\'m afraid there\'s a problem with… · There\'s no hot water · Could you send someone up? · Would it be possible to switch rooms?</i>', 'Gramática de peticiones, <i>there is/are</i> + cuantificadores, reescribe con educación, role-play a las 11 de la noche'],
      ['Servicios', '<i>late check-out · store our luggage · laundry service · Could you recommend…? · within walking distance</i>', 'Flashcards, ¿qué dices?, reto de speaking'],
      ['Check-out y factura', '<i>Could I have the bill? · There\'s a charge I don\'t recognize · an invoice with my company\'s details · Could you email me the receipt?</i>', 'Diálogo con preguntas, lectura con letra pequeña y reseña, queja formal con checklist'],
      ['Moverse por la ciudad', 'Taxi y apps (<i>How much is it to…? · Could you turn on the meter?</i>), metro y bus (<i>change lines, get off at</i>), direcciones (<i>go past, across from, on the corner</i>), coche de alquiler, comparativos', 'Imperativos y preposiciones, <i>faster / cheaper than</i>, habla conectada, role-play en taxi'],
    ],

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Agrupadas por momento: reservar, check-in, problemas, servicios, check-out y moverse por la ciudad. Anverso: la expresión. Reverso: significado, una frase real y una pregunta para ti. Pulsa 🔊 para oír la pronunciación (ojo con <i>receipt</i>, <i>availability</i>, <i>towels</i>).',
          cards: [
            ...BOOK.map(t => card('Reservar', t)),
            ...CHECKIN.map(t => card('Check-in', t)),
            ...PROBLEM.map(t => card('Problemas en la habitación', t)),
            ...SERVICE.map(t => card('Servicios', t)),
            ...CHECKOUT.map(t => card('Check-out y factura', t)),
            ...CITY.map(t => card('Moverse por la ciudad', t)),
          ] },
        { label: 'Expresión ↔ Significado', type: 'match', eyebrow: 'Hotel y ciudad', title: 'Empareja la expresión con su significado', intro: 'Toca una expresión de la izquierda y luego su definición (en inglés sencillo) a la derecha.',
          pairs: [
            ['front desk', 'the place where you check in and ask for help'],
            ['deposit', 'money the hotel holds in case of extra costs'],
            ['non-refundable', 'you do not get your money back if you cancel'],
            ['late check-out', 'leaving the room after the normal time'],
            ['itemized bill', 'a bill that shows every cost line by line'],
            ['receipt', 'a paper or email that proves you paid'],
            ['out of order', 'not working (a machine, an elevator)'],
            ['key card', 'the card that opens your room door'],
            ['rush hour', 'the time of day when traffic is heaviest'],
            ['fare', 'the price of a bus, taxi or train ride'],
            ['meter', 'the device in a taxi that shows the price'],
            ['change lines', 'move from one metro line to another'],
            ['across from', 'on the other side of the street'],
            ['within walking distance', 'near enough to walk there'],
          ], round: 7 },
        { label: 'Colocaciones', type: 'mcq', eyebrow: 'Palabras que van juntas', title: 'Completa la colocación', intro: 'En hoteles y transporte las palabras van en pareja: <i>front desk</i>, <i>room service</i>, <i>one-way ticket</i>, <i>rush hour</i>… Elige la que completa la frase.', items: [
          { blank: 1, q: "You can ___ from 3 p.m.; the room won't be ready before that.", opts: ['check in', 'check out', 'check on', 'check up'], a: 'check in', why: '<b>check in</b> = registrarse al llegar. <i>Check out</i> es al irte; <i>check on</i> = ir a ver cómo está alguien.' },
          { blank: 1, q: 'If you need extra pillows, just call the ___ desk.', opts: ['front', 'main', 'first', 'top'], a: 'front', why: '<b>front desk</b> = recepción. También <i>reception</i>.' },
          { blank: 1, q: "___ service is available until 11 p.m. if you don't feel like going out.", opts: ['Room', 'Home', 'Table', 'Bed'], a: 'Room', why: '<b>room service</b> = servicio a la habitación.' },
          { blank: 1, q: "A ___ ticket to the airport, please. I'm not coming back this way.", opts: ['one-way', 'one-direction', 'only-go', 'round'], a: 'one-way', why: '<b>one-way ticket</b> = solo ida (UK: <i>single</i>). Ida y vuelta: <i>return</i> / <i>round-trip</i>.' },
          { blank: 1, q: "Avoid the metro at ___ hour; it's completely packed.", opts: ['rush', 'fast', 'crowd', 'traffic'], a: 'rush', why: '<b>rush hour</b> = hora punta. <i>Packed</i> = lleno hasta arriba.' },
          { blank: 1, q: 'Could I get a ___ call at 5:30? My flight is at 8.', opts: ['wake-up', 'get-up', 'morning', 'alarm'], a: 'wake-up', why: '<b>wake-up call</b> = llamada despertador. Phrasal verb <i>wake up</i> con guion cuando es sustantivo.' },
          { blank: 1, q: "Our flight isn't until 9 p.m., so we asked for a ___ check-out.", opts: ['late', 'long', 'slow', 'later'], a: 'late', why: '<b>late check-out</b> = salida tardía. No <s>later check-out</s>.' },
          { blank: 1, q: 'Could you ___ the meter, please?', opts: ['turn on', 'put on', 'open', 'switch'], a: 'turn on', why: '<b>turn on / switch on the meter</b> = encender el taxímetro. <i>Open</i> es calco de "abrir"; <i>put on</i> es para ropa.' },
          { blank: 1, q: '___ at the third stop and the museum is right there.', opts: ['Get off', 'Get down', 'Go down', 'Get out'], a: 'Get off', why: 'De un bus, metro o tren te bajas con <b>get off</b>. <i>Get out</i> es de un coche o taxi.' },
          { blank: 1, q: 'I have a reservation ___ the name of Pérez.', opts: ['under', 'in', 'on', 'by'], a: 'under', why: '<b>under the name of</b>. El calco <s>in name of</s> es el error número uno en recepción.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'La gramática que la situación exige', title: 'Pedir, quejarte, describir el problema, dar direcciones y comparar', html: `
          <h3>1 · Peticiones y quejas corteses</h3>
          <p style="margin:8px 0 14px">En un hotel la educación se mide por la <b>forma</b> de pedir. Cuanto más molesta sea la petición o más tarde sea, más larga la fórmula. El imperativo (<i>Fix the shower</i>) suena a orden, aunque añadas <i>please</i>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Para…</th><th>Fórmula</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td>pedir algo normal</td><td><b>Could you</b> + verbo…?<br><b>Could I have / get</b>…?</td><td><b>Could you</b> send someone up to look at the AC?<br><b>Could I have</b> the bill, please?</td></tr>
            <tr><td>pedir algo que molesta</td><td><b>Would you mind</b> + <b>-ing</b>…?<br><b>Would it be possible to</b> + verbo…?</td><td><b>Would you mind</b> keep<b>ing</b> our bags until six?<br><b>Would it be possible to</b> switch rooms?</td></tr>
            <tr><td>pedir un favor difícil</td><td><b>Is there any chance</b> (that) + sujeto + verbo…?<br><b>Do you think you could</b>…?</td><td><b>Is there any chance</b> we could have a late check-out?<br><b>Do you think you could</b> call the room next door?</td></tr>
            <tr><td>abrir una queja</td><td><b>I'm afraid</b> + problema<br><b>I'm sorry, but</b> + problema</td><td><b>I'm afraid</b> there's no hot water.<br><b>I'm sorry, but</b> this charge isn't ours.</td></tr>
            <tr><td>responder a <i>Would you mind…?</i></td><td><b>No, not at all</b> = sí, lo hago<br><b>I'm afraid I can't</b> = no</td><td>“Would you mind moving the car?” “<b>No, not at all.</b>”</td></tr>
          </tbody></table></div>
          <div class="hint small" style="margin-top:12px"><b>Trampas:</b> <s>Would you mind to keep</s> → <b>keeping</b> · <s>Is possible to…?</s> → <b>Is it possible to…?</b> · <s>Can you explain me</s> → <b>explain to me</b> / <b>tell me</b> · <s>I want a room</s> → <b>I'd like a room</b> (en recepción <i>want</i> suena exigente).</div>

          <h3 style="margin-top:22px">2 · Describir el problema: <i>there is / there are</i> + cuantificadores</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Patrón</th><th>Ejemplo</th><th>Ojo</th></tr></thead><tbody>
            <tr><td><b>There's no</b> + incontable / singular</td><td>There's <b>no</b> hot water. There's <b>no</b> towel in the bathroom.</td><td>= <i>There isn't any</i>. Nunca <s>no there is</s> ni <s>there is not nothing</s>.</td></tr>
            <tr><td><b>There aren't any</b> + plural</td><td>There <b>aren't any</b> towels. There <b>are no</b> hangers.</td><td>Plural → <b>are</b>.</td></tr>
            <tr><td><b>too much</b> + incontable / <b>too many</b> + plural</td><td>There's <b>too much</b> noise. There are <b>too many</b> people at the pool.</td><td><i>Noise, light, traffic</i> son incontables.</td></tr>
            <tr><td><b>not enough</b> + sustantivo</td><td>There isn't <b>enough</b> hot water for two showers.</td><td><i>Enough</i> va antes del sustantivo y después del adjetivo: <i>not hot enough</i>.</td></tr>
            <tr><td><b>something wrong with</b> / <b>a problem with</b></td><td>There's <b>something wrong with</b> the AC. There's <b>a problem with</b> the key card.</td><td>Cuando no sabes qué pasa exactamente.</td></tr>
            <tr><td><b>doesn't work / isn't working</b></td><td>The safe <b>doesn't work</b>. The elevator <b>isn't working</b> today.</td><td>Sujeto singular → <b>doesn't</b>, nunca <s>the room don't</s>.</td></tr>
          </tbody></table></div>

          <h3 style="margin-top:22px">3 · Direcciones: imperativos y preposiciones de lugar</h3>
          <div class="grid2" style="margin-top:8px">
            <div><h4 style="margin:0 0 6px">Imperativos (sin sujeto, sin <i>to</i>)</h4><ul class="small" style="padding-left:18px;margin:0"><li><b>Go straight ahead</b> for two blocks.</li><li><b>Turn left / right</b> at the traffic lights. (nunca <s>turn in the left</s>)</li><li><b>Take</b> the second street on the right.</li><li><b>Go past</b> the bank / <b>Go along</b> this street / <b>Go across</b> the square.</li><li><b>Cross</b> the road and <b>keep going</b> until you see the station.</li><li><b>Take</b> the blue line, <b>change at</b> Central and <b>get off at</b> Harbor Street.</li></ul></div>
            <div><h4 style="margin:0 0 6px">Dónde está</h4><ul class="small" style="padding-left:18px;margin:0"><li><b>across from / opposite</b> the park (frente a)</li><li><b>next to</b> the pharmacy (al lado de)</li><li><b>on the corner (of)</b> Main and 5th (en la esquina)</li><li><b>between</b> the bank and the cafe</li><li><b>on your left / right</b> (a tu izquierda)</li><li><b>at the end of</b> the street · <b>two blocks away</b></li><li><b>in front of</b> = delante, no enfrente (eso es <i>across from</i>)</li></ul></div>
          </div>

          <h3 style="margin-top:22px">4 · Elegir transporte: comparativos</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td>adjetivo corto + <b>-er than</b></td><td>The metro is <b>faster than</b> a taxi at rush hour. The bus is <b>cheaper</b>, but <b>slower</b>.</td></tr>
            <tr><td><b>more</b> + adjetivo largo + <b>than</b></td><td>A ride-hailing app is <b>more convenient than</b> looking for a cab. Renting a car is <b>more expensive than</b> it looks.</td></tr>
            <tr><td><b>as</b> + adjetivo + <b>as</b> / <b>not as … as</b></td><td>The train is <b>as fast as</b> a taxi and half the price. Buses aren't <b>as reliable as</b> the metro.</td></tr>
            <tr><td><b>much / a lot / a bit</b> + comparativo</td><td>It's <b>much quicker</b> to walk. The airport train is <b>a bit more expensive</b>, but <b>far more comfortable</b>.</td></tr>
            <tr><td>irregulares</td><td><b>better / worse / further</b>: Walking is <b>better than</b> waiting. The hotel is <b>further</b> from the center than we thought.</td></tr>
          </tbody></table></div>
          <div class="hint small" style="margin-top:12px"><b>Trampas:</b> <s>more fast</s> → <b>faster</b> · <s>faster that</s> → <b>faster than</b> · <s>so fast as</s> → <b>as fast as</b> · <s>How much cost the taxi?</s> → <b>How much is the taxi?</b> / <b>How much does the taxi cost?</b> · <s>the metro is more near</s> → <b>nearer / closer</b>.</div>` },
        { label: 'Elige la forma', type: 'mcq', eyebrow: 'Peticiones · there is/are · direcciones · comparativos', title: 'Completa con la forma correcta', intro: 'Las cuatro piezas de la unidad mezcladas. Fíjate en lo que va después del hueco.', items: [
          { blank: 1, q: '___ send someone up to look at the air conditioning?', opts: ['Could you', 'Can you to', 'You could', 'Do you'], a: 'Could you', why: 'Petición cortés: <b>Could you</b> + verbo base. <i>Can you to</i> no existe.' },
          { blank: 1, q: "I'm afraid ___ a problem with the shower: the water goes cold after a minute.", opts: ["there's", 'there are', 'it has', 'is'], a: "there's", why: 'Describes que existe un problema → <b>there is / there\'s</b>. <i>It has</i> es calco de "tiene".' },
          { blank: 1, q: 'There ___ any towels in the bathroom.', opts: ["aren't", "isn't", 'not', 'no are'], a: "aren't", why: '<i>Towels</i> es plural → <b>there aren\'t any</b> (o <i>there are no towels</i>).' },
          { blank: 1, q: "There's ___ noise from the street; we couldn't sleep.", opts: ['too much', 'too many', 'a lot', 'very'], a: 'too much', why: '<i>Noise</i> es incontable → <b>too much</b>. <i>Too many</i> va con plurales.' },
          { blank: 1, q: 'Would you mind ___ us to a quieter room?', opts: ['moving', 'to move', 'move', 'if move'], a: 'moving', why: '<b>Would you mind + -ing</b>. Nunca infinitivo con <i>to</i>.' },
          { blank: 1, q: 'Go ___ the bank and turn left; the station is on the corner.', opts: ['past', 'pass', 'through', 'beside'], a: 'past', why: '<b>Go past</b> = pasar de largo. <i>Pass</i> es el verbo, no la preposición; <i>through</i> sería atravesar el banco.' },
          { blank: 1, q: 'The pharmacy is ___ the hotel, on the other side of the street.', opts: ['across from', 'in front', 'next', 'behind of'], a: 'across from', why: '<b>across from / opposite</b> = frente a (al otro lado). <i>In front of</i> = delante; y <i>next</i> necesita <i>to</i>.' },
          { blank: 1, q: 'The metro is ___ than a taxi at rush hour.', opts: ['much faster', 'more fast', 'faster that', 'the fastest'], a: 'much faster', why: 'Adjetivo corto → <b>faster</b>; <i>much</i> lo intensifica; y siempre <b>than</b>.' },
          { blank: 1, q: "Taking the bus is cheaper, but it's not ___ the train.", opts: ['as fast as', 'so fast than', 'faster as', 'as fast than'], a: 'as fast as', why: 'Igualdad (negada): <b>not as + adjetivo + as</b>.' },
          { blank: 1, q: 'Would it be possible ___ our luggage until six?', opts: ['to store', 'store', 'storing', 'that you store'], a: 'to store', why: '<b>Would it be possible to</b> + verbo. Compara con <i>Would you mind stor<b>ing</b></i>.' },
        ] },
        { label: 'Corrige las frases', type: 'fix', eyebrow: 'Errores típicos de hispanohablante', title: 'Reescribe la frase corrigiendo el error', intro: 'Calcos del español que se oyen en cualquier recepción. Cambia solo lo necesario y compara con la solución.', items: [
          { bad: 'I have a reservation in name of Pérez.', good: 'I have a reservation under the name of Pérez.', why: 'En inglés la reserva está <b>under</b> the name of… (o simplemente <i>under Pérez</i>).' },
          { bad: "The room don't have hot water.", good: "The room doesn't have hot water.", why: 'Sujeto singular (<i>the room</i>) → <b>doesn\'t</b>. Más natural aún: <i>There\'s no hot water in the room</i>.' },
          { bad: 'How much cost the taxi to the airport?', good: 'How much is the taxi to the airport?', why: 'Pregunta por el precio: <b>How much is…?</b> También vale <i>How much does the taxi cost?</i> (con <i>does</i>), pero nunca <s>how much cost</s>.' },
          { bad: 'Turn in the left at the second street.', good: 'Turn left at the second street.', why: '<b>Turn left / right</b>, sin preposición ni artículo. <i>On the left</i> es para decir dónde está algo.' },
          { bad: 'Can you send someone for repair the air conditioning?', good: 'Can you send someone to repair the air conditioning?', why: 'Finalidad: <b>to</b> + verbo (<i>to repair, to fix, to have a look</i>). <s>for repair</s> es calco de "para reparar".' },
          { bad: "There is a charge on my bill that I don't recognize it.", good: "There is a charge on my bill that I don't recognize.", why: 'Con <i>that</i> como relativo, el objeto no se repite: <s>recognize it</s>. Igual que <i>the room that we booked</i>, no <s>booked it</s>.' },
          { bad: 'Can you explain me how the metro works?', good: 'Can you explain to me how the metro works?', why: '<b>explain something to someone</b>. O cambia el verbo: <i>Can you tell me how the metro works?</i>' },
          { bad: 'Is possible to have a late check-out?', good: 'Is it possible to have a late check-out?', why: 'En inglés siempre hay sujeto: <b>Is it possible…?</b> Más cortés todavía: <i>Would it be possible…?</i>' },
        ] },
        { label: 'Pídelo con educación', type: 'soft', eyebrow: 'De la orden a la petición', title: 'Reescribe la frase como la dirías en recepción o en el taxi', explain: 'Estas frases son correctas pero suenan a orden. Reescríbelas con una fórmula de la unidad: <b>Could you…?</b> · <b>Would you mind + -ing…?</b> · <b>Would it be possible to…?</b> · <b>Is there any chance…?</b> · <b>Do you think you could…?</b> · y para abrir una queja, <b>I\'m afraid…</b>', missing: 'Falta una fórmula cortés: <i>Could you… · Would you mind… · Would it be possible… · Is there any chance… · Do you think you could… · I\'m afraid…</i>', pattern: /\b(could you|would you mind|i['’]m afraid|would it be possible|is there any chance|do you think you could)\b/, items: [
          { h: '"Give me another room." (abre con <i>I\'m afraid…</i> y pide con <i>Would it be possible…?</i>)', a: "I'm afraid the room is very noisy. Would it be possible to switch to a quieter one?" },
          { h: '"Send someone to fix the AC." (pide con <i>Could you…?</i>)', a: 'Could you send someone up to fix the air conditioning, please?' },
          { h: '"Keep my bags until six." (pide con <i>Would you mind + -ing…?</i>)', a: 'Would you mind keeping our bags until six? Our flight is in the evening.' },
          { h: '"This charge is wrong. Remove it." (abre con <i>I\'m afraid…</i> y pide con <i>Could you…?</i>)', a: "I'm afraid there's a charge here I don't recognize. Could you check it, please?" },
          { h: '"Take the main road, not your shortcut." (al conductor, con <i>Would you mind…?</i>)', a: "Would you mind taking the main road? I'm following the route on my phone." },
          { h: '"I want a late check-out tomorrow." (con <i>Is there any chance…?</i>)', a: 'Is there any chance we could have a late check-out tomorrow?' },
        ] },
        { label: 'Repaso: de la reserva al taxi', type: 'mcq', eyebrow: 'Mezcla de momentos', title: 'Dos momentos en una frase', intro: 'Cada situación junta dos momentos de la unidad (reserva + problema, check-out + transporte…). Elige la frase correcta y natural.', items: [
          { q: 'Reservaste tarifa no reembolsable y, al llegar, la habitación tiene la ducha rota. Quieres cambiar de habitación, no de hotel.', opts: ["I know the rate is non-refundable, but I'm afraid the shower doesn't work. Would it be possible to switch rooms?", "The rate is non-refundable, so give me other room with shower.", "I want my money back because the shower don't work."], a: "I know the rate is non-refundable, but I'm afraid the shower doesn't work. Would it be possible to switch rooms?", why: 'Reconoces la condición, abres con <b>I\'m afraid</b> y pides con <b>Would it be possible to…?</b>. Las otras exigen o piden algo que la tarifa no permite.' },
          { q: 'En el check-out pides la factura y, de paso, la mejor forma de llegar al aeropuerto a las cinco de la tarde.', opts: ["Could I have an invoice with my company's details? And what's the quickest way to the airport at five?", "Give me the factura of my company. How I go to the airport at five?", "I need the ticket for my company. Which is more fast to the airport?"], a: "Could I have an invoice with my company's details? And what's the quickest way to the airport at five?", why: '<b>invoice</b> (no <i>factura</i> ni <i>ticket</i>) y <b>the quickest way</b>. <s>more fast</s> no existe.' },
          { q: 'Dejaste las maletas en consigna y ahora, en el taxi, quieres que el conductor pase primero por el hotel a recogerlas.', opts: ['Would you mind stopping at the hotel first? We left our luggage at the front desk.', 'First the hotel, stop. My luggages are in the reception.', "Pass for the hotel before, I have the bags there."], a: 'Would you mind stopping at the hotel first? We left our luggage at the front desk.', why: '<b>Would you mind + -ing</b> para una petición que cambia la ruta. <i>Luggage</i> es incontable (<s>luggages</s>) y <s>pass for</s> es calco.' },
          { q: 'Te quejas del ruido por teléfono y, como te cambian de piso, preguntas si el wifi es el mismo.', opts: ["There's too much noise from the street. If we move to the fifth floor, is the Wi-Fi password the same?", "It has too many noise. In the fifth floor the password of the wifi is equal?", "The noise is too much high. Fifth floor have wifi?"], a: "There's too much noise from the street. If we move to the fifth floor, is the Wi-Fi password the same?", why: '<b>There\'s too much noise</b> (incontable) y <b>the Wi-Fi password</b>. <s>It has</s>, <s>too many noise</s> y <s>password of the wifi</s> son calcos.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Frases de recepción, de un taxista y de una app de transporte. Repite las veces que quieras y baja la velocidad. Ojo con las contracciones (<i>there\'s, isn\'t, we\'ll</i>) y con las horas.',
          sentences: ['Check-in is from three p.m., and check-out is at noon.', 'Could I see your passport and the card you booked with?', "We'll put a hold of one hundred dollars on your card as a deposit.", "I'm afraid there's no hot water in the shower.", 'Could you send someone up to look at the air conditioning?', "There's a charge on the bill that I don't recognize.", 'Could you turn on the meter, please?', 'Go past the bank and turn left at the lights. The station is on the corner.', 'Your driver is arriving in three minutes in a gray Toyota.', 'Take the blue line and change at Central Station.'] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening · check-out', title: 'Escucha el check-out y responde', intro: 'Aldo deja el hotel con su esposa. Hay un cargo raro, maletas que guardar y un aeropuerto al que llegar. Escúchalo entero antes de responder.',
          lines: [['Recepcionista', 'Good morning. Checking out?'], ['Aldo', "Yes, room 412. Could I have the bill, please? And I'll need an invoice with my company's details."], ['Recepcionista', "Of course. Here's your itemized bill: two nights, breakfast included, and one minibar charge of eighteen dollars."], ['Aldo', "I'm afraid we didn't use the minibar. Could you check that charge, please?"], ['Recepcionista', "Let me see… You're right, it belongs to room 421. I'm so sorry, I'll remove it right away."], ['Aldo', "Thank you. Also, would it be possible to store our luggage until four? Our flight isn't until nine."], ['Recepcionista', 'No problem at all. Just leave the bags with the bellboy and keep this ticket.'], ['Aldo', 'Great. One more thing: what is the best way to get to the airport at that hour?'], ['Recepcionista', "At four it's rush hour, so a taxi could take over an hour. The airport train leaves from Central Station every fifteen minutes and takes twenty-five."], ['Aldo', 'Perfect. And how do we get to Central Station from here?'], ['Recepcionista', "Go out, turn right, and walk two blocks. It's across from the big pharmacy; you can't miss it."], ['Aldo', "That's really helpful, thanks. Could you email me the receipt as well?"], ['Recepcionista', "Sure, I'll send it to the address on your booking. We hope to see you again, Mr. Pérez."]],
          questions: [
            { q: 'What does Aldo ask for besides the bill?', opts: ["An invoice with his company's details", 'A discount for the noise', 'A taxi to the airport'], a: "An invoice with his company's details", why: '"I\'ll need an <b>invoice</b> with my company\'s details." Factura para la empresa.' },
            { q: 'Why does the receptionist remove the minibar charge?', opts: ['It belongs to another room', 'Aldo complains very loudly', 'The minibar was out of order'], a: 'It belongs to another room', why: '"It belongs to room 421." Un error de habitación, no una negociación.' },
            { q: 'Why does she recommend the train instead of a taxi?', opts: ['A taxi could take over an hour at rush hour', 'The train is free for hotel guests', 'There are no taxis at four'], a: 'A taxi could take over an hour at rush hour', why: '"At four it\'s <b>rush hour</b>, so a taxi could take over an hour."' },
            { q: 'Where is Central Station?', opts: ['Two blocks to the right, across from a pharmacy', 'Two blocks to the left, next to a bank', 'Behind the hotel, past the park'], a: 'Two blocks to the right, across from a pharmacy', why: '"Turn right, walk two blocks. It\'s <b>across from</b> the big pharmacy."' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Booking by phone', task: 'Llama a un hotel para reservar: saluda, di las fechas y cuántas noches, el tipo de habitación (doble, cama grande, tranquila), pregunta si el desayuno está incluido y si hay cancelación gratuita, y pide el número de confirmación. Usa I\'d like to book, from the… to the…, Does the rate include…?, Is there free cancellation?', model: "Good morning. I'd like to book a double room for three nights, from the twelfth to the fifteenth of November, for two adults. We'd prefer a room with one king bed, and if possible something quiet, at the back. Could you tell me the nightly rate? And does that rate include breakfast? One more thing: is there free cancellation? My conference dates might change. Perfect. Could you put it under the name of Aldo Pérez and send the confirmation number to my email? Thank you very much.", tags: ["i'd like to book", 'double room', 'from the', 'nightly rate', 'include breakfast', 'free cancellation', 'under the name of', 'confirmation number'] },
          { t: "Something's wrong with the room", task: 'Son las once de la noche. Llama a recepción: identifícate con el número de habitación, describe dos problemas (sin agua caliente y ruido, o aire acondicionado y toallas) con I\'m afraid… y there\'s no… / too much…, y pide una solución con Could you…? o Would it be possible…?', model: "Hi, this is Aldo in room 412. I'm sorry to call so late, but I'm afraid there's a problem with the room. There's no hot water in the shower, only cold, and there's too much noise coming from the room next door. We have an early start tomorrow. Could you send someone up to look at the water? And if that's not possible tonight, would it be possible to switch to a quieter room? Thank you, I really appreciate it.", tags: ["i'm afraid", "there's no", 'too much noise', 'could you send someone', 'would it be possible', 'switch', 'room 412'] },
          { t: "A charge I don't recognize", task: 'Estás en el check-out. Pide la cuenta detallada, señala un cargo que no reconoces (minibar, lavandería, una llamada), explica por qué no es tuyo sin acusar a nadie, pide que lo quiten y pide la factura con los datos de tu empresa y el recibo por correo.', model: "Good morning, we're checking out of room 412. Could I see an itemized bill, please? Thanks. I'm afraid there's a charge here I don't recognize: forty dollars for laundry. We didn't use the laundry service, so I think it might be a mistake. Could you check it and remove it, please? Thank you. And I'll need an invoice with my company's details for my expenses. Could you email me the receipt as well? That's great, thanks for your help.", tags: ['itemized bill', 'charge', "don't recognize", 'mistake', 'remove', 'invoice', "company's details", 'receipt'] },
          { t: 'Getting around the city', task: 'Explica a tu esposa (o a un colega) cómo llegar del hotel al centro de convenciones y por qué eliges ese transporte: compara taxi, app, metro y a pie (faster, cheaper, more convenient, as … as), y da las direcciones con imperativos (go past, turn left, across from, get off at).', model: "OK, so there are three ways to get to the convention center. A taxi is the most comfortable, but at rush hour it's slower than the metro and much more expensive. The app is a bit cheaper than a taxi, but not as reliable in the morning. So let's take the metro: go out of the hotel, turn right, go past the pharmacy and the station is across from the park. Take the blue line, change at Central and get off at Harbor Street. From there it's two blocks; it's within walking distance. It's faster and it costs two dollars.", tags: ['faster than', 'cheaper', 'more expensive', 'as reliable as', 'go past', 'turn right', 'across from', 'get off at', 'change at'] },
        ] },
        { label: 'Habla conectada', type: 'stress', eyebrow: 'Pronunciación · habla conectada en recepción y en el taxi', title: '"Could you" suena "cud-yu" y la p de receipt no existe', intro: 'En las peticiones las palabras se pegan: <i>could you</i> → "cud-yu / cud-ʒu", <i>would you mind</i> → "wud-ʒu-MIND", <i>is it</i> → "i-zit". Y cuidado con <i>receipt</i> (la p muda) y con la sílaba fuerte de <i>reservation</i>. Escucha y repite imitando el ritmo.',
          pairs: [['Could you → "cud-yu"', 'Could you send someone up, please?'], ['Would you mind → "wud-ʒu-MIND"', 'Would you mind keeping our bags until six?'], ["I'm afraid there's → \"aim-a-FREID-therz\"", "I'm afraid there's a problem with the shower."], ['Is it possible → "i-zit-POS-sibl"', 'Is it possible to have a late check-out?'], ['How much is it → "hau-MUCH-i-zit"', 'How much is it to the airport?'], ['Turn on the → "tur-NON-the"', 'Could you turn on the meter, please?'], ['re-CEIPT: la p no suena', 'Could you email me the receipt?'], ['reser-VA-tion · confir-MA-tion', 'I have a reservation; here is the confirmation number.'], ['Across from → "a-CROSS-from"', 'The station is across from the pharmacy, on the corner.'], ['Frase completa', 'Go past the bank, turn left at the lights, and the metro is on your right.']] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading · letra pequeña y reseña', title: 'Hotel Mirador: the confirmation email and a guest review', intro: 'Primero el correo de confirmación con su letra pequeña; después, la reseña de una huésped de Lima. Lee una vez para la idea general y otra para los detalles de dinero. Las palabras en amarillo se preguntan después: dedúcelas por el contexto.',
          paragraphs: [
            'Thank you for booking with Hotel Mirador. Your reservation (confirmation number MR-48213) is for a double room with city view, from Friday 7 to Sunday 9 November. Check-in is from 3 p.m. and check-out is at 12 noon. Breakfast is included. Please note that this is a <b>non-refundable</b> rate: the full amount has been charged to your card and the dates cannot be changed.',
            'On arrival, a hold of 100 dollars will be placed on your card to cover <b>incidentals</b> such as the minibar, room service or laundry. This amount is released within five working days of check-out. Late check-out is subject to availability and costs 25 dollars per hour after noon. Luggage storage is free of charge on the day of departure.',
            'Review by Carla M., Lima. Three stars. The location is excellent: the metro is right across from the hotel and the old town is within walking distance. The room was clean and the bed very comfortable. However, our room faced the main street and the noise at night was <b>unbearable</b>, even with the windows closed. When we asked to switch rooms, the night receptionist said nothing was available until the next day.',
            "At check-out we also found a 40-dollar laundry charge on the bill. We hadn't used the service, and the manager removed it immediately and <b>apologized</b>, which we appreciated. My advice: ask for a room at the back when you book, read the fine print about the deposit, and check your bill line by line before you pay.",
          ],
          main: [
            { q: 'The guest cannot get her money back if she cancels the booking.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1: <i>this is a non-refundable rate: the full amount has been charged… and the dates cannot be changed</i>.' },
            { q: 'The hotel keeps some money temporarily to cover extra services.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: <i>a hold of 100 dollars will be placed on your card to cover incidentals… released within five working days</i>.' },
            { q: 'The staff fixed a mistake on the bill without arguing.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: <i>the manager removed it immediately and apologized</i>.' },
          ],
          infer: [
            { q: '<b>non-refundable</b> (paragraph 1)', opts: ['you do not get your money back if you cancel', 'you pay when you arrive', 'the price can go up'], a: 'you do not get your money back if you cancel', why: 'La frase lo explica: <i>the full amount has been charged… the dates cannot be changed</i>. <i>Refund</i> = devolución.' },
            { q: '<b>incidentals</b> (paragraph 2)', opts: ['small extra costs during your stay', 'accidents in the room', 'taxes included in the rate'], a: 'small extra costs during your stay', why: 'Los ejemplos van justo después: <i>such as the minibar, room service or laundry</i>.' },
            { q: '<b>unbearable</b> (paragraph 3)', opts: ['impossible to tolerate', 'a little annoying', 'surprisingly quiet'], a: 'impossible to tolerate', why: '<i>Bear</i> = soportar; <i>un-… -able</i> = que no se puede soportar. Por eso pidieron cambiar de habitación.' },
            { q: '<b>apologized</b> (paragraph 4)', opts: ['said sorry', 'asked for proof', 'charged again'], a: 'said sorry', why: 'El gerente quitó el cargo <i>and apologized, which we appreciated</i>: pidió perdón.' },
          ],
          think: '¿Qué dos cosas harías distinto de Carla cuando reserves tu próximo hotel de conferencia? Escribe tres frases en inglés empezando con <i>When I book, I always…</i>, <i>If the room is noisy, I\'ll…</i> y <i>Before I pay the bill, I…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Escribe tu texto', type: 'comment', eyebrow: 'Writing task', title: 'Queja formal al hotel por un cargo (o una reseña equilibrada)', intro: 'Elige: (A) un correo formal al hotel reclamando un cargo que no reconoces o un problema que no resolvieron, o (B) una reseña equilibrada (lo bueno, el problema, cómo lo resolvieron, tu consejo). Escribe 90-140 palabras. La checklist se marca sola al analizar el texto.', placeholder: 'Dear Sir or Madam, I stayed at your hotel from … to … (room 412, booking MR-…). I\'m afraid … / The location was excellent, but …', min: 90, max: 140, need: 4, checks: [
          { label: 'Abro como un correo o reseña real (<i>Dear Sir or Madam / Dear Manager / To whom it may concern</i>, o título de reseña con estrellas)', re: /\b(dear (sir|madam|sir or madam|mr|ms|mrs|hotel|manager|reception|front desk|team)|to whom it may concern|hello|good (morning|afternoon|evening)|\d (stars?|out of))\b/ },
          { label: 'Doy los datos de la estancia (habitación, fechas, número de reserva o nombre)', re: /\b(room \d+|confirmation (number|code)|booking (number|reference|confirmation)|reservation (number|under)|under the name of|from (the )?\w+ to|\d+ nights?|checked (in|out) on|last (week|weekend|month))\b/ },
          { label: 'Planteo el problema con cortesía (<i>I\'m afraid… / Unfortunately… / I was surprised to find… / a charge I don\'t recognize</i>)', re: /\b(i['’]m afraid|unfortunately|i was (surprised|disappointed) to|there (was|is|were) (a|an|no|too much|not enough)|i don['’]t recognize|didn['’]t (use|order|recognize)|wasn['’]t working|didn['’]t work|was (very |really |extremely )?(noisy|dirty|cold|hot|stuffy))\b/ },
          { label: 'Pido algo concreto (<i>Could you refund… / I would appreciate it if… / Would it be possible to…</i>)', re: /\b(could you|would you mind|i would (like|appreciate)|i['’]d (like|appreciate)|would it be possible|please (refund|remove|send|check|confirm)|i (am|['’]m) requesting|kindly|i expect)\b/ },
          { label: 'Uso al menos dos palabras de la unidad (<i>charge, bill, invoice, receipt, deposit, refund, minibar, front desk, late check-out, hot water, air conditioning…</i>)', re: /\b(charged?|bill|invoice|receipt|deposit|refund|minibar|laundry|front desk|reception|check-?out|check-?in|hot water|air conditioning|towels?|noise|noisy|key card|rate|non-refundable)\b.*\b(charged?|bill|invoice|receipt|deposit|refund|minibar|laundry|front desk|reception|check-?out|check-?in|hot water|air conditioning|towels?|noise|noisy|key card|rate|non-refundable)\b/ },
          { label: 'Cierro como corresponde (<i>I look forward to hearing from you / Thank you for your attention / Kind regards / My advice: …</i>)', re: /\b(i look forward to (hearing|your reply|your response)|thank you (in advance|for your (time|attention|help|understanding))|kind regards|best regards|yours (sincerely|faithfully)|sincerely|regards|my advice|i('d| would) (still )?(recommend|stay))\b/ },
        ] },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ['Receptionist: Hotel Mirador, good afternoon. How can I help you?', "Aldo: Hi, I'd like to book a double room for two nights, the 7th and 8th of November.", 'Receptionist: Let me check… Yes, we have a double with city view at 120 dollars a night, breakfast included.', 'Aldo: Sounds good. Is there free cancellation?', "Receptionist: Up to 48 hours before arrival, yes. After that, the first night is charged.", "Aldo: Perfect. Could you put it under the name of Aldo Pérez and email me the confirmation number?"],
          ['Aldo: Excuse me, how do I get to Central Station from here?', "Passer-by: Sure. Go straight ahead for two blocks and turn left at the traffic lights.", "Aldo: Left at the lights. And then?", "Passer-by: Go past the bank and you'll see the station on your right, across from a big pharmacy.", "Aldo: Great, is it within walking distance or should I take a bus?", "Passer-by: It's ten minutes on foot. The bus would take longer at this hour."],
          ["Agent: Good morning. Do you have a reservation for a rental car?", "Aldo: Yes, under Pérez. A compact automatic for three days.", "Agent: Here it is. Would you like full insurance? It's 15 dollars a day extra.", "Aldo: Yes, please. And can I drop the car off at the airport instead of here?", "Agent: You can, for a 20-dollar fee. Please bring it back with a full tank."],
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language · por momento', title: 'Lo que vas a decir, momento a momento', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Reservar</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I'd like to book</b> a double room <b>for</b> three nights, <b>from</b> the 12th <b>to</b> the 15th.</li><li><b>Do you have any availability</b> for the weekend of the 20th?</li><li><b>Does the rate include</b> breakfast?</li><li><b>Is there free cancellation?</b> / <b>Is the rate refundable?</b></li><li><b>Could you put it under the name of</b> Pérez?</li><li><b>Could you send me the confirmation</b> by email?</li></ul></div>
          <div><h3>Check-in</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I have a reservation under the name of</b> Pérez.</li><li><b>Here's my passport</b> and the card I booked with.</li><li><b>Is the deposit a hold or a charge?</b> When is it released?</li><li><b>What time is check-out?</b> / <b>Is a late check-out possible?</b></li><li><b>What's the Wi-Fi password?</b></li><li><b>Could we have a room at the back</b>, away from the street?</li></ul></div>
          <div><h3>Problemas en la habitación</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>Hi, this is</b> Aldo <b>in room</b> 412.</li><li><b>I'm afraid there's a problem with</b> the shower / the AC.</li><li><b>There's no hot water.</b> / <b>There's too much noise</b> from next door.</li><li><b>The air conditioning isn't working.</b> / <b>The safe doesn't work.</b></li><li><b>Could you send someone up</b> to have a look?</li><li><b>Would it be possible to switch rooms?</b></li><li><b>Could you send up some extra towels</b>, please?</li></ul></div>
          <div><h3>Servicios</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>Is there any chance we could have a late check-out?</b></li><li><b>Could you store our luggage until</b> six?</li><li><b>Do you have a laundry service?</b> I need this by tomorrow.</li><li><b>Could you recommend</b> a good place for dinner near here?</li><li><b>Is it within walking distance</b> or should we take a taxi?</li><li><b>Could I get a wake-up call at</b> 5:30?</li></ul></div>
          <div><h3>Check-out y factura</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>We're checking out. Could I have the bill</b>, please?</li><li><b>Could I see an itemized bill?</b></li><li><b>I'm afraid there's a charge here I don't recognize.</b></li><li><b>We didn't use the minibar</b>, so I think it's a mistake.</li><li><b>Could you remove it</b>, please?</li><li><b>I need an invoice with my company's details.</b></li><li><b>Could you email me the receipt?</b></li></ul></div>
          <div><h3>Moverse por la ciudad</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>How much is it to</b> the airport, roughly?</li><li><b>Could you turn on the meter</b>, please?</li><li><b>I'd rather take the main road</b>; I'm following the route on my phone.</li><li><b>Can I pay by card</b> or through the app?</li><li><b>Excuse me, how do I get to</b> Central Station?</li><li><b>Which line do I take?</b> / <b>Where do I change?</b> / <b>Which stop do I get off at?</b></li><li><b>Is this the right platform for</b> the airport train?</li><li><b>I'd like to rent a compact car for three days.</b> Does it include full insurance?</li></ul></div>
          <div class="hint small"><b>Registro:</b> en recepción, <b>I'd like</b> y no <s>I want</s>; para quejarte, abre con <b>I'm afraid</b> y describe el problema, no a la persona (<i>the shower doesn't work</i>, no <i>you gave me a broken room</i>). Con el taxista puedes ser más directo pero igual de educado: <b>Could you…, please?</b> Y recuerda: <i>factura</i> = <b>invoice</b>, <i>recibo</i> = <b>receipt</b>, <i>molestia</i> = <b>inconvenience</b> (nunca <s>molestation</s>).</div></div>` },
        { label: '¿Qué dices?', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices en cada situación?', items: [
          { q: 'Llamas para reservar y quieres saber si el precio incluye el desayuno.', opts: ['Does the rate include breakfast?', 'Is the breakfast free of pay?', 'Breakfast is inside the price?'], a: 'Does the rate include breakfast?', why: '<b>Does the rate include…?</b> Pregunta con <i>does</i>; <s>free of pay</s> e <s>inside the price</s> son calcos.' },
          { q: 'Llegas a recepción con tu esposa después de un vuelo largo.', opts: ['Good evening. I have a reservation under the name of Pérez.', 'Good evening. I have a reservation in name of Pérez.', 'Good evening. I am Pérez, give me my room.'], a: 'Good evening. I have a reservation under the name of Pérez.', why: '<b>under the name of</b>. La tercera es una orden.' },
          { q: 'Quieres saber la hora de salida.', opts: ['What time is check-out?', 'At what hour I must leave?', 'When finish the room?'], a: 'What time is check-out?', why: '<b>What time is check-out?</b> Corto y exacto.' },
          { q: 'Son las once de la noche y no hay agua caliente.', opts: ["I'm afraid there's no hot water in the room. Could you send someone up?", 'The water is not hot. Fix it.', "Excuse me, the hot water doesn't exist."], a: "I'm afraid there's no hot water in the room. Could you send someone up?", why: 'Abres con <b>I\'m afraid</b>, describes con <b>there\'s no</b> y pides con <b>Could you…?</b>' },
          { q: 'Quieres cambiar de habitación por el ruido.', opts: ['Would it be possible to switch to a quieter room?', 'Change me the room, it has noise.', 'I want other room because the noise.'], a: 'Would it be possible to switch to a quieter room?', why: '<b>Would it be possible to switch rooms?</b> <s>Change me</s> y <s>other room</s> (sin <i>an</i>) son calcos.' },
          { q: 'Quieres dejar el equipaje después del check-out.', opts: ['Could you store our luggage until six?', 'Can you save our luggages until six?', 'Keep the bags, we return at six.'], a: 'Could you store our luggage until six?', why: '<b>store / keep our luggage</b>. <i>Luggage</i> no tiene plural y <i>save</i> es "ahorrar" o "salvar".' },
          { q: 'En la factura hay un cargo que no reconoces.', opts: ["There's a charge here I don't recognize. Could you check it, please?", 'This charge is false. Remove.', "I don't know this charge, is not mine, I don't pay."], a: "There's a charge here I don't recognize. Could you check it, please?", why: 'Describes y pides comprobar. Nadie se enfada y el cargo desaparece igual.' },
          { q: 'Necesitas el comprobante para tu empresa.', opts: ["Could I have an invoice with my company's details?", 'Give me the factura for my company.', 'I need the ticket with the name of my company, please.'], a: "Could I have an invoice with my company's details?", why: 'Factura = <b>invoice</b>. <i>Ticket</i> en inglés es entrada o billete, no comprobante.' },
          { q: 'Subes a un taxi sin app y no quieres sorpresas con el precio.', opts: ['How much is it to the airport, roughly? And could you turn on the meter?', 'How much cost the airport?', 'Turn the meter. Airport.'], a: 'How much is it to the airport, roughly? And could you turn on the meter?', why: '<b>How much is it to…?</b> + <b>Could you turn on the meter?</b> <s>How much cost</s> no existe.' },
          { q: 'El conductor dice que solo acepta efectivo y tú no llevas.', opts: ["I'm afraid I only have a card. Can I pay through the app?", "I don't have cash. Is your problem.", 'No cash. Card or nothing.'], a: "I'm afraid I only have a card. Can I pay through the app?", why: '<b>I\'m afraid</b> + hecho + alternativa. Propones una solución en lugar de pelear.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Del check-in al taxi: tres conversaciones', intro: 'Tres escenas de un mismo viaje: una reserva que no aparece, una noche sin agua caliente y un taxi con ideas propias. Elige tu réplica, mira por qué, dila en voz alta y sigue por la rama que elegiste. Cortesía firme: ni órdenes ni disculpas por existir.', scenes: [
          { t: 'Check-in: la reserva no aparece', you: 'Aldo, llegando al hotel con su esposa tras un vuelo largo', partner: 'Recepcionista', role: 'amable, pero el sistema no ayuda', goal: 'Di a nombre de quién está la reserva (<b>under the name of</b>), muestra la confirmación sin perder la calma, pide que la cambien a hoy (<b>Would it be possible…?</b>), acepta el depósito y pregunta por la hora de salida y el wifi.', start: 'a', nodes: {
            a: { say: 'Good evening, welcome to the Mirador. How can I help you?', opts: [
              { t: 'Good evening. I have a reservation under the name of Pérez, for two nights.', ok: 2, why: 'La fórmula exacta: <b>I have a reservation under the name of…</b> + cuántas noches. Clara y completa.', next: 'b' },
              { t: 'Hi. We have a booking. Pérez.', ok: 1, why: 'Se entiende y es correcto, pero suena telegráfico. En recepción conviene la frase completa: <b>under the name of Pérez</b>.', next: 'b' },
              { t: 'Good evening. I have a reservation in name of Pérez.', ok: 0, why: 'Calco del español. En inglés la reserva está <b>under</b> the name of…', next: 'a2' },
            ] },
            a2: { say: 'Sorry, under what name?', opts: [
              { t: 'Under the name of Pérez. P-E-R-E-Z.', ok: 2, why: 'Corriges con la preposición correcta y deletreas: <b>under the name of</b>. Deletrear ahorra minutos en cualquier recepción.', next: 'b' },
              { t: 'Pérez. Aldo Pérez.', ok: 1, why: 'Correcto y suficiente. Deletrearlo habría evitado la siguiente pregunta.', next: 'b' },
              { t: 'In the name Pérez, I said.', ok: 0, why: 'Repites el calco y añades <i>I said</i>, que suena impaciente. <b>Under the name of Pérez</b>, con calma.', next: 'b' },
            ] },
            b: { say: "Let me check... I'm sorry, I can't find anything under that name. Do you have a confirmation number?", opts: [
              { t: "Yes, here it is on my phone. It was booked through your website, and I'm afraid I've already been charged for the first night.", ok: 2, why: 'Das el dato que piden y añades el contexto útil (<b>booked through your website</b>, <b>I\'ve already been charged</b>) con <b>I\'m afraid</b>, sin acusar.', next: 'c' },
              { t: "Yes, one moment. Here's the confirmation email.", ok: 1, why: 'Correcto y práctico. Mencionar que ya pagaste la primera noche habría reforzado tu posición.', next: 'c' },
              { t: "That's impossible. I paid! Check again.", ok: 0, why: 'Imperativo seco (<i>Check again</i>) y tono de confrontación. La recepcionista necesita un dato, no una orden.', next: 'b2' },
            ] },
            b2: { say: 'I understand, sir, but I need something to search with. Could you show me the confirmation?', opts: [
              { t: "Sorry, it's been a long flight. Here's the confirmation email with the number.", ok: 2, why: 'Reparas el tono (<b>Sorry, it\'s been a long flight</b>) y das lo que piden. Una disculpa breve lo arregla todo.', next: 'c' },
              { t: 'OK. Here is the email.', ok: 1, why: 'Correcto, aunque seco. Un <i>sorry</i> no habría costado nada.', next: 'c' },
              { t: 'This is a bad hotel. I want to speak with your boss, now.', ok: 0, why: 'Insultar el hotel y exigir al jefe antes de enseñar la reserva cierra la conversación. Primero el dato, luego, si hace falta, <i>Could I speak to the manager?</i>', next: 'fail' },
            ] },
            c: { say: 'Thank you. Ah, I see the problem: the booking was made for next month, the 12th of November.', opts: [
              { t: 'I see. That must be a mistake on the website; I selected October. Would it be possible to change it to tonight at the same rate?', ok: 2, why: 'Explicas sin culpar a nadie (<b>That must be a mistake</b>) y pides con la fórmula fuerte: <b>Would it be possible to…?</b> + <b>at the same rate</b>.', next: 'd' },
              { t: 'Oh no. Can you change it to today, please?', ok: 1, why: 'Correcta y educada. <i>Could you</i> o <i>Would it be possible</i> suenan algo más cuidadosas, y pedir <b>the same rate</b> te protege.', next: 'd' },
              { t: 'No, is for today. You have the mistake.', ok: 0, why: 'Falta el sujeto (<b>It\'s</b> for today) y <i>You have the mistake</i> acusa directamente. Mejor: <b>That must be a mistake</b>.', next: 'c2' },
            ] },
            c2: { say: "I'm only reading what the system says, sir. Let's see what we can do.", opts: [
              { t: "You're right, sorry. Is there any chance you could move the booking to tonight?", ok: 2, why: 'Reconoces, te disculpas y pides con <b>Is there any chance you could…?</b>: la fórmula para favores grandes.', next: 'd' },
              { t: 'OK. Do you have a room for tonight?', ok: 1, why: 'Correcta y directa. No pide trasladar la reserva, así que podrías acabar pagando dos veces.', next: 'd' },
              { t: 'Just give me a room.', ok: 0, why: 'Orden pura. Después de un roce, insistir en el tono brusco es la forma segura de quedarte sin habitación.', next: 'fail' },
            ] },
            d: { say: "I can do that. I have a double room available, but it's on the second floor, facing the street. Or a quieter one at the back for 20 dollars more.", opts: [
              { t: "We'd rather have the quieter one, please. Could you tell me what the total would be with breakfast?", ok: 2, why: '<b>We\'d rather</b> + opción y una pregunta concreta sobre el total. Eliges y controlas el dinero.', next: 'e' },
              { t: 'The quiet one, please.', ok: 1, why: 'Correcta. Preguntar el total con desayuno antes de aceptar es lo que hace un viajero experimentado.', next: 'e' },
              { t: 'The cheaper. Is the breakfast include?', ok: 0, why: 'Falta el sustantivo (<b>the cheaper one</b>) y el participio: <b>Is breakfast included?</b>', next: 'e' },
            ] },
            e: { say: "Of course. Breakfast is included, and I'll need a card for a 100-dollar deposit. It's just a hold; it's released after check-out.", opts: [
              { t: "No problem, here's my card. And what time is check-out? We have a late flight on Sunday.", ok: 2, why: 'Aceptas el depósito con naturalidad y aprovechas para preguntar <b>What time is check-out?</b> con tu motivo: preparas el late check-out.', next: 'f' },
              { t: "OK. Here's my card. When is the check-out?", ok: 1, why: 'Correcta. Lo más natural es <b>What time is check-out?</b>, sin artículo.', next: 'f' },
              { t: 'Why you need deposit? I already pay.', ok: 0, why: 'Faltan el auxiliar (<b>Why do you need</b>), el artículo (<b>a deposit</b>) y el tiempo (<b>I\'ve already paid</b>). Y el depósito es normal: es una retención, no un cobro.', next: 'e2' },
            ] },
            e2: { say: "It's standard, sir. Nothing is charged unless there's damage or extra charges.", opts: [
              { t: "I understand, thanks for explaining. Here's my card. What time is check-out, by the way?", ok: 2, why: 'Aceptas la explicación, agradeces y sigues con tu pregunta: <b>What time is check-out, by the way?</b>', next: 'f' },
              { t: 'OK, fine. Here. What time is check-out?', ok: 1, why: 'Correcta aunque algo seca. Funciona.', next: 'f' },
              { t: 'Hmm. OK. Here.', ok: 0, why: 'Entregas la tarjeta a regañadientes y no preguntas nada. Te vas a enterar de la hora de salida cuando llamen a la puerta.', next: 'f' },
            ] },
            f: { say: 'Check-out is at noon, but I can note a late check-out at two for you. Here are your key cards. Room 412, the elevator is on your left.', opts: [
              { t: "That's great, thank you so much. One last thing: could I get the Wi-Fi password?", ok: 2, why: 'Agradeces el gesto y cierras con la última pregunta útil: <b>Could I get the Wi-Fi password?</b>', next: 'win' },
              { t: 'Thanks a lot. Good night.', ok: 1, why: 'Correcta y amable. El wifi lo vas a tener que preguntar desde la habitación.', next: 'win' },
              { t: 'Thanks. What is the password of the wifi?', ok: 0, why: 'Se entiende, pero <s>password of the wifi</s> es calco: en inglés es <b>the Wi-Fi password</b> (y se pronuncia "wai-fai").', next: 'meh' },
            ] },
            win: { say: "The Wi-Fi password is on the key card sleeve. Enjoy your stay, Mr. Pérez.", end: true, outcome: 'win', note: 'Reserva encontrada, habitación tranquila y late check-out conseguido. Las claves: <b>under the name of</b>, enseñar la confirmación sin dramas, <b>Would it be possible to change it to tonight at the same rate?</b>, aceptar el depósito como lo que es (una retención) y cerrar con <b>What time is check-out?</b> y <b>the Wi-Fi password</b>.' },
            meh: { say: 'Sure, it is Mirador2026. Enjoy your stay.', end: true, outcome: 'meh', note: 'Todo resuelto, con algún calco por el camino. Repasa: <b>under the name of</b>, <b>Is breakfast included?</b>, <b>Why do you need a deposit?</b> y <b>the Wi-Fi password</b> (no <i>password of the wifi</i>).' },
            fail: { say: "I'm sorry, sir, but my manager isn't here tonight, and I can't help you if you speak to me like that. Please take a seat.", end: true, outcome: 'fail', note: 'Exigir sin dar datos y hablar del jefe antes de enseñar la confirmación te dejó sentado en el lobby. Primero el dato (<b>Here\'s the confirmation number</b>), luego la petición cortés (<b>Would it be possible to…?</b>) y, solo si no funciona, <i>Could I speak to the manager, please?</i>' },
          } },
          { t: 'Las once de la noche: ruido y sin agua caliente', you: 'Aldo, desde el teléfono de la habitación 412', partner: 'Recepcionista de noche', role: 'Marco, solo en recepción y sin técnico hasta mañana', goal: 'Identifícate con la habitación, describe los dos problemas con <b>I\'m afraid there\'s…</b>, pide una solución realista (<b>Would it be possible to switch rooms?</b>), que llamen a los vecinos (<b>Would you mind…?</b>) y algo a cambio de la molestia.', start: 'a', nodes: {
            a: { say: 'Front desk, this is Marco. How can I help you?', opts: [
              { t: "Hi, this is Aldo in room 412. I'm afraid there's a problem with the room: there's no hot water, and there's a lot of noise coming from the room next door.", ok: 2, why: 'Te identificas (<b>this is Aldo in room 412</b>), abres con <b>I\'m afraid there\'s a problem</b> y describes los dos problemas con <b>there\'s no…</b> y <b>there\'s a lot of noise</b>.', next: 'b' },
              { t: 'Hello, room 412. The shower has no hot water and the neighbors are very noisy.', ok: 1, why: 'Correcta y clara. <b>I\'m afraid</b> al principio suaviza la queja y deja mejor dispuesto a quien te escucha.', next: 'b' },
              { t: "Hello. The room don't have hot water and have too much noise.", ok: 0, why: 'Sin número de habitación, y la gramática falla: <b>the room doesn\'t have</b> o, mejor, <b>there\'s no hot water</b> y <b>there\'s too much noise</b>.', next: 'a2' },
            ] },
            a2: { say: "Sorry, I didn't quite catch that. Which room are you in and what's the problem?", opts: [
              { t: "Room 412. There's no hot water, and the room next door is really noisy.", ok: 2, why: 'Habitación primero y dos frases limpias: <b>There\'s no hot water</b>, <b>the room next door is really noisy</b>.', next: 'b' },
              { t: '412. No hot water, and noise next door.', ok: 1, why: 'Telegráfico pero correcto; por teléfono se entiende. Una frase completa suena menos enfadada.', next: 'b' },
              { t: '412! Hot water no! Noise yes!', ok: 0, why: 'Palabras sueltas y signos de exclamación. Se entiende, pero suena a grito. <b>There\'s no hot water</b> cuesta lo mismo.', next: 'b' },
            ] },
            b: { say: "I'm sorry to hear that. Let me see... the maintenance person has left for the night, but I can send someone in the morning.", opts: [
              { t: "I understand, but it's 11 p.m. and we need a shower tonight. Would it be possible to switch rooms?", ok: 2, why: 'Aceptas la realidad (<b>I understand, but…</b>), explicas la urgencia y propones la solución con <b>Would it be possible to switch rooms?</b>', next: 'c' },
              { t: 'Hmm, we need a shower now. Can you give us another room?', ok: 1, why: 'Correcta y clara. <b>Could you</b> o <b>Would it be possible</b> suenan un punto más corteses, que a las once de la noche ayuda.', next: 'c' },
              { t: 'In the morning? No way. Send someone now or I call the police.', ok: 0, why: 'Amenaza desproporcionada e imperativo. Marco no tiene técnico; lo que sí tiene son otras habitaciones. Pídele eso.', next: 'b2' },
            ] },
            b2: { say: "Sir, please calm down. There's no one to send right now.", opts: [
              { t: "Sorry, I'm just tired. Is there any chance of moving to another room tonight?", ok: 2, why: 'Disculpa breve, explicación humana y petición con <b>Is there any chance of + -ing?</b>. Rescatas la conversación.', next: 'c' },
              { t: 'OK. Then change us to another room.', ok: 1, why: 'Correcta y realista, pero sigue siendo una orden. Con <b>Could you move us to…?</b> habría sonado mejor.', next: 'c' },
              { t: 'You are useless. I will write a terrible review.', ok: 0, why: 'Insulto más amenaza. Marco tiene la llave de la otra habitación y acabas de perder cualquier motivo para que te la dé.', next: 'fail' },
            ] },
            c: { say: "I do have a room on the fifth floor, at the back. It's a bit smaller, though.", opts: [
              { t: "That's fine, as long as it's quiet and the water works. Could someone help us with the bags?", ok: 2, why: 'Aceptas con condición (<b>as long as it\'s quiet</b>) y pides ayuda con <b>Could someone help us with…?</b>', next: 'd' },
              { t: "OK, we'll take it. Is it quiet?", ok: 1, why: 'Correcta. Preguntas lo importante; podrías pedir también ayuda con las maletas.', next: 'd' },
              { t: 'Smaller? No. I want a bigger room, free, for the molestation.', ok: 0, why: '<s>Molestation</s> es un falso amigo muy grave (abuso): la molestia es <b>the inconvenience</b>. Y exigir una habitación mayor gratis a medianoche no es realista.', next: 'c2' },
            ] },
            c2: { say: "Excuse me? I think you mean the inconvenience. I'm afraid I don't have a bigger room tonight.", opts: [
              { t: "Sorry, yes, the inconvenience. The smaller room is fine, as long as it's quiet.", ok: 2, why: 'Corriges la palabra (<b>the inconvenience</b>) y aceptas con condición. Elegante salida.', next: 'd' },
              { t: 'OK, the smaller room then.', ok: 1, why: 'Correcta. Aceptas sin complicar más.', next: 'd' },
              { t: 'Whatever. Give me the room.', ok: 0, why: '<i>Whatever</i> es despectivo y <i>Give me</i> una orden. Te darán la habitación, pero nada más.', next: 'd' },
            ] },
            d: { say: "Of course. I'll bring the new key cards up myself in five minutes. And about the noise: I'll call the room next door.", opts: [
              { t: 'Thank you, I really appreciate it. Would you mind asking them to keep it down? We have an early start.', ok: 2, why: 'Agradeces y pides lo del ruido con <b>Would you mind asking them to keep it down?</b> + motivo. <i>Keep it down</i> = bajar el volumen.', next: 'e' },
              { t: 'Thanks. Yes, please tell them to be quiet.', ok: 1, why: 'Correcta y clara. <b>Would you mind asking…?</b> suena menos a orden a terceros.', next: 'e' },
              { t: 'Tell them to shut up. We have an early start.', ok: 0, why: '<i>Shut up</i> es grosero incluso cuando se lo dices a otro para que lo repita. <b>Ask them to keep it down</b>.', next: 'e' },
            ] },
            e: { say: "I'll do that. Is there anything else I can do for you tonight?", opts: [
              { t: 'Actually, yes. Could you send up a couple of extra towels, and could we have a late check-out tomorrow to make up for it?', ok: 2, why: 'Aprovechas la oferta: <b>Could you send up extra towels</b> y <b>could we have a late check-out to make up for it?</b> Pides una compensación razonable.', next: 'win' },
              { t: 'Some extra towels would be great. Thanks.', ok: 1, why: 'Correcta y amable. Era el momento de pedir también el late check-out.', next: 'win' },
              { t: 'Yes. I want a discount of 50 percent.', ok: 0, why: 'Un recepcionista de noche no puede autorizar descuentos, y <i>I want</i> no ayuda. Pide algo que sí pueda dar: toallas, late check-out, una nota para el gerente.', next: 'meh' },
            ] },
            win: { say: "Absolutely. Towels, late check-out at 1 p.m., and I'll make a note for the manager. Again, I'm very sorry about this.", end: true, outcome: 'win', note: 'Habitación nueva, vecinos avisados, toallas y late check-out. Las claves: <b>this is Aldo in room 412</b>, <b>I\'m afraid there\'s no hot water</b>, <b>Would it be possible to switch rooms?</b>, <b>Would you mind asking them to keep it down?</b> y pedir compensación realista (<b>to make up for it</b>).' },
            meh: { say: "I can't authorize a discount myself, but I'll leave a note for the manager. The towels are on their way.", end: true, outcome: 'meh', note: 'Resuelto lo principal. Para la próxima: pide lo que la persona al teléfono puede dar (<b>extra towels</b>, <b>a late check-out</b>) y deja el descuento para el gerente por la mañana, con <i>I\'d like to speak to the manager about last night</i>.' },
            fail: { say: "I'm going to end this call now, sir. You can speak to the manager in the morning.", end: true, outcome: 'fail', note: 'Amenazas e insultos a la única persona que podía cambiarte de habitación. La receta: <b>I\'m afraid there\'s…</b>, <b>I understand, but…</b> y <b>Would it be possible to…?</b>. Firme, no agresivo.' },
          } },
          { t: 'Taxi: otra ruta y solo efectivo', you: 'Aldo, saliendo del hotel hacia el centro de convenciones a las 8:30', partner: 'Conductor', role: 'taxista de app, simpático y con ideas propias', goal: 'Di adónde vas y pide el taxímetro o el precio de la app, rechaza el atajo con educación (<b>I\'d rather…</b>), charla un poco y resuelve el pago con tarjeta o app sin discutir; pide el recibo para tu empresa.', start: 'a', nodes: {
            a: { say: 'Morning! Where to?', opts: [
              { t: 'Good morning. To the convention center on Harbor Street, please. How long will it take at this hour?', ok: 2, why: 'Destino con la calle, <i>please</i>, y una pregunta inteligente: <b>How long will it take at this hour?</b> Marcas que conoces la ciudad.', next: 'b' },
              { t: 'The convention center, please.', ok: 1, why: 'Correcta. Añadir la calle evita confusiones en ciudades con más de un centro de convenciones.', next: 'b' },
              { t: 'Good morning. How much cost to go to the convention center?', ok: 0, why: '<s>How much cost</s> no existe: <b>How much is it to the convention center?</b> o <b>How much does it cost?</b>', next: 'a2' },
            ] },
            a2: { say: 'Depends on the traffic, my friend. Around thirty, thirty-five.', opts: [
              { t: "Could you turn on the meter, please? I'd rather pay what it shows.", ok: 2, why: 'Petición clara y educada: <b>Could you turn on the meter?</b> + <b>I\'d rather pay what it shows</b>. Sin acusar de nada.', next: 'b' },
              { t: "Thirty-five? That's a lot. Can we use the meter?", ok: 1, why: 'Correcta. Mostrar sorpresa está bien; <b>Could you turn on the meter?</b> es la frase estándar.', next: 'b' },
              { t: 'OK, thirty-five, fine.', ok: 0, why: 'Aceptas un precio cerrado sin referencia. Correcto gramaticalmente, pero acabas de pagar el doble. Pide el taxímetro o mira la app.', next: 'b' },
            ] },
            b: { say: "Sure. Listen, the main road is packed at rush hour. I know a shortcut through the old town; it's a little longer but faster.", opts: [
              { t: "I'd rather stick to the main road, please, and I'm following the route on my phone. The app says fifteen minutes.", ok: 2, why: '<b>I\'d rather stick to the main road</b> + un dato objetivo (<b>the app says fifteen minutes</b>). Rechazas el desvío sin acusar.', next: 'c' },
              { t: 'Hmm, OK, but please keep the meter on.', ok: 1, why: 'Aceptas el atajo pero proteges el precio. Válido; <b>I\'d rather take the main road</b> te habría dado más control.', next: 'c' },
              { t: 'No! You want to rob me. Go by the main road.', ok: 0, why: 'Acusación directa (<i>rob</i>) y orden. Aunque sospeches, se dice <b>I\'d rather take the main road</b>; el resultado es el mismo y nadie se ofende.', next: 'b2' },
            ] },
            b2: { say: "Hey, hey, I'm just trying to help. No need for that.", opts: [
              { t: "Sorry, that came out wrong. I'd just prefer the main road; I'm following the route on my phone.", ok: 2, why: 'Reparas (<b>that came out wrong</b>) y mantienes tu decisión con <b>I\'d just prefer…</b>. Firme y educado.', next: 'c' },
              { t: 'OK, sorry. Main road, please.', ok: 1, why: 'Correcta y breve. Arreglas el roce.', next: 'c' },
              { t: "I don't trust taxi drivers. Drive.", ok: 0, why: 'Generalizar y ordenar <i>Drive</i> a quien conduce. Después de una acusación, insistir es la salida segura del coche.', next: 'fail' },
            ] },
            c: { say: 'All right, main road it is. So, in town for the conference? Are you from Brazil?', opts: [
              { t: "Peru, actually, from Lima. Yes, I'm speaking at the conference tomorrow. Is the area around the center safe to walk at night?", ok: 2, why: 'Corriges con <b>actually</b>, charlas y aprovechas para una pregunta útil: <b>Is the area safe to walk at night?</b>', next: 'd' },
              { t: 'No, from Peru. Yes, for a conference.', ok: 1, why: 'Correcta. Un poco de charla (<i>small talk</i>) suele mejorar el viaje y la información que te dan.', next: 'd' },
              { t: 'I am from Peru. I am engineer of software.', ok: 0, why: 'Falta el artículo y el orden: <b>I\'m a software engineer</b>. <i>Engineer of software</i> es calco.', next: 'd' },
            ] },
            d: { say: "Pretty safe, yes. Here we are. That's twenty-two fifty. Cash only, though, the card machine is broken.", opts: [
              { t: "I'm afraid I only have a card. The app said card payment was accepted. Could you try the machine, or should I pay through the app?", ok: 2, why: '<b>I\'m afraid I only have a card</b> + el dato (<b>the app said card payment was accepted</b>) + dos soluciones. Resuelves sin pelear.', next: 'e' },
              { t: "I don't have cash. Can I pay with the app?", ok: 1, why: 'Correcta y práctica. <b>I\'m afraid</b> y mencionar lo que decía la app te dan más fuerza.', next: 'e' },
              { t: "Cash only? Then I don't pay nothing.", ok: 0, why: 'Doble negación (<s>don\'t pay nothing</s>) y amenaza de no pagar. En inglés: <b>I don\'t have any cash</b>, y propón una alternativa.', next: 'd2' },
            ] },
            d2: { say: 'Come on, man, I did my job. You have to pay somehow.', opts: [
              { t: "Of course I'll pay. I just don't carry cash. Let me pay through the app, and I'll add a tip.", ok: 2, why: 'Tranquilizas (<b>Of course I\'ll pay</b>), explicas y ofreces una salida con propina. Todo el mundo gana.', next: 'e' },
              { t: "OK. I'll pay with the app.", ok: 1, why: 'Correcta y suficiente.', next: 'e' },
              { t: 'Take me to a cash machine then, and wait with the meter off.', ok: 0, why: 'Gramaticalmente bien, pero es una orden que alarga el viaje para todos cuando la app ya resolvía el pago.', next: 'meh' },
            ] },
            e: { say: 'Oh, OK, the app works. Fine, pay there. Need a receipt?', opts: [
              { t: "Yes, please. Could you send it to my email through the app? I need it for my company's expenses.", ok: 2, why: 'Pides el recibo como lo pide un viajero de trabajo: <b>Could you send it to my email?</b> + <b>for my company\'s expenses</b>.', next: 'win' },
              { t: 'Yes, please. For my work.', ok: 1, why: 'Correcta. <i>For my expenses</i> es la expresión exacta de los viajes de empresa.', next: 'win' },
              { t: 'Yes, give me a factura.', ok: 0, why: '<i>Factura</i> no existe en inglés: <b>receipt</b> (recibo) o <b>invoice</b> (factura con datos fiscales). Y <i>give me</i> otra vez es una orden.', next: 'meh' },
            ] },
            win: { say: 'Done, receipt sent. Enjoy the conference, my friend!', end: true, outcome: 'win', note: 'Ruta tuya, precio justo, pago resuelto y recibo en el correo. Las claves: <b>How much is it to…?</b>, <b>Could you turn on the meter?</b>, <b>I\'d rather stick to the main road</b>, <b>I\'m afraid I only have a card</b> y <b>Could you send the receipt to my email?</b>' },
            meh: { say: "All right, all right. There's a cash machine on the corner; I'll wait. No receipt, though.", end: true, outcome: 'meh', note: 'Llegaste, pero perdiste tiempo o el recibo. Recuerda: ante <i>cash only</i>, <b>I\'m afraid I only have a card; can I pay through the app?</b>; y el comprobante es <b>a receipt</b>, nunca <i>factura</i>.' },
            fail: { say: 'You know what? Get out. Find another cab.', end: true, outcome: 'fail', note: 'Acusar al conductor (<i>rob, I don\'t trust</i>) y darle órdenes te dejó en la acera. Para rechazar un atajo basta con <b>I\'d rather take the main road, please; I\'m following the route on my phone</b>.' },
          } },
        ] },
      ] },
    ],
  };
})();
