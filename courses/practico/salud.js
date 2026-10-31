/* ===========================================================
   practico/salud.js — Inglés práctico · Compras, farmacia y salud en el extranjero
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos usados: notes, flashcards, match, mcq, dictation, dialog,
   speaking, stress, reading, fix, soft, comment, order, roleplay
   =========================================================== */
(() => {
  /* ---------- Vocabulario por momento: [palabra, def ES, ejemplo, pregunta para ti] ---------- */
  const SHOP = [
    ['size · Do you have this in a medium?', 'talla; la pregunta clave para pedir otra', "Do you have this in a medium? This one's a bit tight.", '¿Qué talla usas en ropa y en zapatos (en números de EE. UU. o Europa)?'],
    ['try on', 'probarse (ropa, zapatos): try it on / try on the jacket', 'Can I try these on? The fitting rooms are at the back.', '¿Te pruebas la ropa antes de comprar o compras a ojo?'],
    ['fitting room', 'probador', 'The fitting rooms are next to the shoes; you can take four items in.', '¿Cuántas prendas dejan llevar al probador en tu tienda habitual?'],
    ['receipt', 'recibo, comprobante de compra (no "ticket")', 'Could I have a receipt, please? I might need to return it.', '¿Guardas los recibos o los tiras al salir?'],
    ['refund', 'reembolso; devolución del dinero', "I'd like a refund, please. Here's my receipt.", '¿Cuándo fue la última vez que pediste un reembolso?'],
    ['exchange', 'cambiar un producto por otro (talla, color, modelo)', 'Can I exchange this for a larger size?', '¿Prefieres cambiar o que te devuelvan el dinero?'],
    ['store credit', 'vale o saldo para gastar en la misma tienda', 'Without a receipt we can only offer store credit.', '¿Aceptarías store credit en una tienda a la que no vas a volver?'],
    ['return policy', 'política de devoluciones (plazo y condiciones)', "What's your return policy on sale items?", '¿Conoces la política de devoluciones de donde compras ropa?'],
    ['faulty', 'defectuoso, que no funciona bien', 'The zipper is faulty; it broke the first time I used it.', '¿Qué fue lo último faulty que compraste?'],
    ['warranty', 'garantía (de un producto)', 'It comes with a two-year warranty, but you need the receipt.', '¿Has usado alguna vez la garantía de un aparato?'],
    ['on sale · 30% off', 'en oferta · con 30 % de descuento', 'Is this on sale? The tag says thirty percent off.', '¿Compras más cuando hay rebajas?'],
    ["I'm just looking, thanks.", 'solo estoy mirando, gracias (para que no te atiendan)', "Can I help you? — I'm just looking, thanks.", '¿Te incomoda que te atiendan apenas entras a una tienda?'],
    ['pay in cash / by card', 'pagar en efectivo / con tarjeta', 'Are you paying in cash or by card? — By card, please.', '¿Pagas casi todo con tarjeta cuando viajas?'],
    ['tight / loose', 'apretado / holgado (ropa)', 'These jeans are too tight around the waist. Do you have a looser fit?', '¿Prefieres la ropa ajustada o holgada?'],
    ['fit / suit', 'quedar bien de talla / sentar bien de estilo', "It fits, but the color doesn't really suit me.", '¿Qué color te sienta mejor según tu esposa?'],
  ];
  const TECH = [
    ['SIM card · prepaid', 'tarjeta SIM · prepago', 'I need a prepaid SIM card that works in my unlocked phone.', '¿Compras SIM local o usas roaming cuando viajas?'],
    ['data plan', 'plan de datos', "What's your cheapest data plan for two weeks?", '¿Cuántos gigas gastas en un viaje de dos semanas?'],
    ['top up', 'recargar (saldo o datos)', 'Can I top up online, or do I need to come back to the shop?', '¿Alguna vez te quedaste sin datos en el extranjero?'],
    ['coverage', 'cobertura (de señal)', 'Is there good coverage in the mountains, or just in the city?', '¿Dónde has tenido peor cobertura?'],
    ['unlocked', 'liberado (teléfono que acepta cualquier operador)', "My phone's unlocked, so any SIM should work.", '¿Tu teléfono está liberado?'],
    ['charger / adapter', 'cargador / adaptador de enchufe', 'I left my charger at the hotel. Do you sell adapters for UK plugs?', '¿Qué cargador o adaptador llevas siempre en la maleta?'],
  ];
  const PHARM = [
    ["pharmacy / drugstore / chemist's", 'farmacia (US: pharmacy, drugstore · UK: chemist\'s)', "Is there a pharmacy near here that's open late?", '¿Cómo pedirías una farmacia de turno en inglés?'],
    ['over the counter', 'sin receta (medicamento de venta libre)', 'Can I get this over the counter, or do I need a prescription?', '¿Qué medicinas compras sin receta en Lima?'],
    ['prescription', 'receta médica', 'The doctor gave me a prescription for antibiotics.', '¿Llevas tus recetas o fotos de ellas cuando viajas?'],
    ['painkiller', 'analgésico', 'Do you have anything stronger than regular painkillers?', '¿Qué analgésico sueles tomar?'],
    ['dose / dosage', 'dosis / posología', "What's the right dose for an adult?", '¿Lees la dosis en el prospecto o preguntas en la farmacia?'],
    ['tablet / pill', 'pastilla, comprimido', 'Take one tablet every eight hours with food.', '¿Te cuesta tragar pastillas grandes?'],
    ['cough · cough syrup', 'tos · jarabe para la tos', "I've had a dry cough for three days. Do you have a syrup for it?", '¿Prefieres jarabe o pastillas para la tos?'],
    ['sore throat', 'dolor de garganta', "I've got a sore throat, and it hurts to swallow.", '¿Qué tomas en casa para la garganta?'],
    ['fever / temperature', 'fiebre (have a fever · run a temperature)', "She's had a fever since last night, around thirty-eight five.", '¿Llevas termómetro cuando viajas?'],
    ['allergic to', 'alérgico/a a (allergic TO, nunca "of")', "I'm allergic to penicillin. Does this contain any?", '¿Eres alérgico a algún medicamento o alimento?'],
    ['side effects', 'efectos secundarios', 'Does this have any side effects? I need to drive this afternoon.', '¿Has tenido efectos secundarios con algún medicamento?'],
    ['upset stomach', 'malestar estomacal, estómago revuelto', "I've had an upset stomach since the seafood yesterday.", '¿Qué comida te ha caído mal en un viaje?'],
    ['ointment / cream', 'pomada / crema', 'Is there an ointment for insect bites?', '¿Qué pomada llevas en el botiquín de viaje?'],
    ['plaster / band-aid', 'curita (UK plaster · US band-aid)', "Do you have plasters? I've got a blister from walking.", '¿Cuántos kilómetros caminas al día cuando viajas?'],
    ['drowsy', 'somnoliento, adormilado (efecto de algunos medicamentos)', 'This syrup may make you drowsy, so don\'t drive after taking it.', '¿Qué medicamento te da sueño?'],
  ];
  const MED = [
    ['emergency room (ER) / A&E', 'urgencias (US: ER · UK: A&E, accident and emergency)', 'Where is the nearest emergency room? My wife is in a lot of pain.', '¿Has estado en urgencias fuera del Perú?'],
    ['symptoms', 'síntomas', 'What are your symptoms, and when did they start?', '¿Describes bien tus síntomas o dices "me siento mal"?'],
    ['It hurts. · ache · pain', 'duele · dolor sordo y continuo (headache, backache) · dolor en general', "My back hurts. It's a dull ache, not a sharp pain.", '¿Dónde te duele cuando pasas muchas horas frente a la computadora?'],
    ['sharp / dull pain', 'dolor agudo, punzante / sordo', "It's a sharp pain here, on the lower right side.", '¿Sabrías decir en inglés el dolor de una contractura?'],
    ['dizzy / nauseous', 'mareado / con náuseas', 'I feel dizzy when I stand up, and a bit nauseous.', '¿Te mareas en los buses de montaña?'],
    ['fill out a form', 'llenar un formulario (UK también fill in)', 'Please fill out this form and sign at the bottom.', '¿Qué datos crees que pide un formulario de urgencias?'],
    ['travel insurance · policy number', 'seguro de viaje · número de póliza', "Do you have travel insurance? We'll need the policy number.", '¿Dónde guardas el número de póliza cuando viajas?'],
    ['medical report', 'informe médico', 'I need a medical report and an itemized bill for my insurance.', '¿Qué documento te pediría tu seguro para reembolsarte?'],
    ['itemized bill', 'factura detallada (cada servicio con su precio)', 'Could I have an itemized bill, not just the total?', '¿Revisas las facturas línea por línea?'],
    ['X-ray / scan', 'radiografía / escáner, ecografía', 'The doctor wants an X-ray to rule out a fracture.', '¿Te han hecho alguna radiografía?'],
    ['prescribe', 'recetar', 'The doctor prescribed antibiotics for five days.', '¿Terminas siempre los antibióticos que te recetan?'],
    ['appointment · walk-in clinic', 'cita médica · consultorio sin cita', "We don't have an appointment. Is this a walk-in clinic?", '¿Prefieres cita o ir sin cita?'],
  ];
  const EMERG = [
    ['call an ambulance', 'llamar una ambulancia', "Call an ambulance! She's not breathing properly.", '¿Sabes el número de emergencias de los países que visitas?'],
    ['emergency number', 'número de emergencias (112 en la UE, 911 en EE. UU., 999 en el Reino Unido)', 'In Europe the emergency number is one one two.', '¿Lo tienes guardado en el teléfono?'],
    ['unconscious', 'inconsciente', "He fell down the stairs and now he's unconscious.", '¿Qué dirías primero al llamar: dónde estás o qué pasó?'],
    ['bleeding', 'sangrando', 'Her hand is bleeding badly; we need help right now.', '¿Llevas algo para cortar una hemorragia pequeña?'],
    ['faint / pass out', 'desmayarse', 'My wife fainted in the street and hit her head.', '¿Te has desmayado alguna vez?'],
  ];
  const ALL = [...SHOP, ...TECH, ...PHARM, ...MED, ...EMERG];
  /* texto que dice la voz cuando la tarjeta tiene notación (·, /, siglas) o se pronuncia distinto de como se escribe */
  const SAY = {
    'size · Do you have this in a medium?': 'size. Do you have this in a medium?', 'receipt': 'receipt', 'on sale · 30% off': 'on sale, thirty percent off',
    'SIM card · prepaid': 'SIM card, prepaid', "pharmacy / drugstore / chemist's": "pharmacy, drugstore, chemist's", 'cough · cough syrup': 'cough, cough syrup',
    'fever / temperature': 'fever, temperature', 'plaster / band-aid': 'plaster, band-aid', 'emergency room (ER) / A&E': 'emergency room, E R, A and E',
    'It hurts. · ache · pain': 'It hurts. Ache. Pain.', 'X-ray / scan': 'X-ray, scan', 'appointment · walk-in clinic': 'appointment, walk-in clinic',
    'travel insurance · policy number': 'travel insurance, policy number', 'fill out a form': 'fill out a form', 'faint / pass out': 'faint, pass out',
  };
  const card = (cat, t) => ({ cat, w: t[0], def: t[1], ex: t[2], ask: t[3], say: SAY[t[0]] || t[0] });

  window.UNIT_DATA['practico/salud'] = {
    source: 'Inglés práctico · Compras, farmacia y salud',
    description: 'Lo que necesitas decir cuando algo sale mal lejos de casa: pedir una talla y devolver sin recibo, comprar una SIM, explicar síntomas en la farmacia o en urgencias (<i>I\'ve had… since</i>, <i>it hurts</i>), entender la dosis, llenar el formulario, activar el seguro y pedir ayuda.',
    cando: [
      'Pedir una talla o un color distinto, probarme algo y pagar: <i>Do you have this in a medium? Can I try it on? By card, please</i>',
      'Devolver o cambiar un producto defectuoso, con o sin recibo, y entender <i>refund, exchange, store credit, warranty</i>',
      'Comprar una SIM o un plan de datos para dos personas y preguntar por cobertura, roaming y recargas',
      'Describir síntomas en una farmacia, pedir algo <i>over the counter</i>, avisar de una alergia y entender la dosis (<i>twice a day, every eight hours</i>)',
      'Explicar a un médico dónde me duele y desde cuándo (<i>I\'ve had a sharp pain since…</i>), llenar el formulario y pedir informe y factura para el seguro',
      'Pedir ayuda en una emergencia: llamar, decir qué pasó y dónde estamos, y responder a las preguntas del operador',
    ],
    map: [
      ['En la tienda', 'Pedir talla y color, probarte, preguntar precio y descuento, pagar, decir que solo miras', 'Flashcards, colocaciones (<i>try on, pay by card</i>), comparativos para pedir otra cosa, respuesta rápida'],
      ['Devoluciones y garantía', 'Devolver o cambiar algo defectuoso, con y sin recibo; reembolso, vale de tienda, garantía', 'Diálogo ordenado, reto de speaking, role-play de la chaqueta sin recibo, reclamo por escrito'],
      ['Electrónica y SIM', 'Plan de datos para dos semanas, teléfono liberado, cobertura, recarga, adaptador', 'Flashcards, dictado, reto de speaking, diálogo ordenado'],
      ['Farmacia', 'Síntomas comunes, pedir algo sin receta, alergias a medicamentos, dosis y efectos secundarios', 'Diálogo con farmacéutica, frecuencia (<i>twice a day, every eight hours</i>), role-play con fiebre y alergia a la penicilina'],
      ['Consulta y urgencias', 'Describir dolor y desde cuándo, formulario, seguro de viaje, pagar y pedir informe', 'Present perfect con <i>since / for</i>, <i>hurt / ache / pain</i>, lectura del seguro, role-play en urgencias con tu esposa'],
      ['Emergencias', 'Llamar, decir qué pasó, dar la dirección, pedir ayuda a alguien cerca', 'Reto de speaking al teléfono, frases clave, pronunciación de habla conectada'],
    ],

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra o expresión. Reverso: significado, una frase real de tienda, farmacia u hospital y una pregunta para ti. Pulsa 🔊 para oír la pronunciación; ojo con <i>receipt</i> (la p no suena), <i>cough</i> ("cof") y <i>ache</i> ("eik").',
          cards: [
            ...SHOP.map(t => card('Compras', t)),
            ...TECH.map(t => card('Electrónica y SIM', t)),
            ...PHARM.map(t => card('Farmacia', t)),
            ...MED.map(t => card('Consulta y urgencias', t)),
            ...EMERG.map(t => card('Emergencias', t)),
          ] },
        { label: 'Palabra ↔ Definición', type: 'match', eyebrow: 'Compras, farmacia y salud', title: 'Empareja la palabra con su definición', intro: 'Toca una palabra de la izquierda y luego su definición (en inglés) a la derecha. Hay términos de tienda y de salud mezclados a propósito.',
          pairs: [
            ['receipt', 'the piece of paper that proves you paid'],
            ['refund', 'getting your money back'],
            ['store credit', 'money you can only spend in the same shop'],
            ['warranty', 'a promise to repair or replace a product for a period of time'],
            ['faulty', 'not working as it should'],
            ['fitting room', 'the place where you try clothes on'],
            ['top up', 'add money or data to a prepaid SIM'],
            ['over the counter', 'sold without a prescription'],
            ['prescription', 'a paper from a doctor that lets you buy a medicine'],
            ['dose', 'the amount of medicine you take at one time'],
            ['side effects', 'unwanted effects a medicine can have'],
            ['drowsy', 'sleepy because of a medicine'],
            ['itemized bill', 'a bill that shows the price of each service'],
            ['policy number', 'the number that identifies your insurance contract'],
            ['unconscious', 'not awake and not responding'],
          ], round: 6 },
        { label: 'Colocaciones', type: 'mcq', eyebrow: 'Collocations', title: 'Completa con la palabra que va con la otra', intro: 'Las palabras van en pareja: <i>try <b>on</b>, pay <b>in</b> cash, <b>store</b> credit, <b>over</b> the counter, a <b>sore</b> throat, <b>fill out</b> a form</i>. Elige la que completa la frase.', items: [
          { blank: 1, q: 'Can I ___ these jeans on before I buy them?', opts: ['try', 'prove', 'test', 'put'], a: 'try', why: '<b>try on</b> = probarse. <i>Prove</i> es demostrar y <i>test</i> es probar que algo funciona.' },
          { blank: 1, q: 'Are you paying ___ cash or by card?', opts: ['in', 'with', 'on', 'at'], a: 'in', why: '<b>pay in cash</b> pero <b>pay by card</b>. Dos preposiciones distintas.' },
          { blank: 1, q: 'Without a receipt we can only offer you ___ credit.', opts: ['store', 'shop money', 'ticket', 'cash'], a: 'store', why: '<b>store credit</b> = vale para gastar en la misma tienda.' },
          { blank: 1, q: "You can buy this ___ the counter; you don't need a prescription.", opts: ['over', 'under', 'on', 'at'], a: 'over', why: '<b>over the counter</b> = sin receta. Se abrevia OTC.' },
          { blank: 1, q: "I've got a ___ throat, and it hurts to swallow.", opts: ['sore', 'hurt', 'painful', 'sick'], a: 'sore', why: '<b>a sore throat</b>: la colocación fija. También <i>sore eyes, sore feet</i>.' },
          { blank: 1, q: 'Please ___ out this form and sign at the bottom.', opts: ['fill', 'fulfill', 'write', 'complete'], a: 'fill', why: '<b>fill out</b> (US) / <b>fill in</b> (UK) a form. <i>Complete a form</i> existe, pero sin <i>out</i>.' },
          { blank: 1, q: "I'd like a full ___, please. The zipper broke on the first day.", opts: ['refund', 'return', 'reimburse', 'devolution'], a: 'refund', why: '<b>a refund</b> = el dinero de vuelta. <i>Return</i> es devolver el producto; <i>devolution</i> es un falso amigo (descentralización política).' },
          { blank: 1, q: 'Does this medicine have any side ___?', opts: ['effects', 'affects', 'defects', 'results'], a: 'effects', why: '<b>side effects</b>. <i>Affect</i> es verbo (afectar).' },
          { blank: 1, q: "I'm ___ to penicillin, so please check the ingredients.", opts: ['allergic', 'allergy', 'alergic', 'allergenic'], a: 'allergic', why: '<b>allergic to</b> (adjetivo). <i>Allergy</i> es el sustantivo: <i>I have an allergy to penicillin</i>.' },
          { blank: 1, q: 'Take one tablet every eight hours ___ food.', opts: ['with', 'for', 'by', 'in'], a: 'with', why: '<b>with food</b> / <b>after meals</b> / <b>on an empty stomach</b>: las tres fórmulas de las dosis.' },
          { blank: 1, q: 'It comes ___ a two-year warranty.', opts: ['with', 'of', 'by', 'in'], a: 'with', why: '<b>come with a warranty</b>. Y mientras dura: <i>it\'s still <b>under</b> warranty</i>.' },
          { blank: 1, q: "What's your cheapest ___ plan for two weeks?", opts: ['data', 'wifi', 'web', 'net'], a: 'data', why: '<b>data plan</b> = plan de datos. <i>Wifi</i> es otra cosa: la red del hotel.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'La gramática que exige la situación', title: 'Síntomas, dolor, dosis, peticiones y comparativos', html: `
          <h3>1 · Desde cuándo: present perfect + <i>since / for</i> · qué pasó: past simple</h3>
          <p style="margin:8px 0 14px">Un médico o farmacéutico siempre pregunta <b>How long…?</b> Si el síntoma <b>sigue</b>, usa present perfect: <b>I've had</b> + síntoma + <b>since</b> (momento) / <b>for</b> (duración). Lo que ya terminó o pasó en un momento concreto va en past simple.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Quieres decir</th><th>Forma</th><th>Ejemplo</th><th>Error típico</th></tr></thead><tbody>
            <tr><td>Síntoma que sigue, desde un momento</td><td><b>I've had</b> … <b>since</b> Monday / yesterday / 3 p.m.</td><td>I<b>'ve had</b> a headache <b>since</b> Monday.</td><td><s>I have a headache since Monday.</s></td></tr>
            <tr><td>Síntoma que sigue, cuánto tiempo</td><td><b>I've had</b> … <b>for</b> three days / a week</td><td>She<b>'s had</b> a fever <b>for</b> two days.</td><td><s>for Monday</s>, <s>since three days</s></td></tr>
            <tr><td>Pregunta del médico</td><td><b>How long have you had</b> …?</td><td><b>How long have you had</b> the rash?</td><td><s>How long do you have…?</s></td></tr>
            <tr><td>Algo que pasó (y terminó)</td><td>past simple</td><td>I <b>twisted</b> my ankle <b>yesterday</b>. She <b>fainted</b> an hour ago.</td><td><s>I have twisted my ankle yesterday.</s></td></tr>
          </tbody></table></div>
          <h3 style="margin-top:22px">2 · Dónde duele: <i>hurt · ache · pain · sore</i></h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Palabra</th><th>Cómo se usa</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>hurt</b> (verbo)</td><td>la parte del cuerpo es el sujeto: <i>My back hurts</i>. Sin <s>me</s>.</td><td>My knee <b>hurts</b> when I walk. It <b>hurts</b> to swallow.</td></tr>
            <tr><td><b>ache</b> (sustantivo / verbo)</td><td>dolor sordo y continuo; forma compuestos: <i>headache, stomachache, backache, toothache, earache</i></td><td>I<b>'ve had</b> a <b>stomachache</b> since lunch.</td></tr>
            <tr><td><b>pain</b> (sustantivo)</td><td><i>a sharp / dull / constant pain</i> + <b>in</b> + parte</td><td>She has a <b>sharp pain in</b> her lower right side.</td></tr>
            <tr><td><b>sore</b> (adjetivo)</td><td>irritado, dolorido: <i>a sore throat, sore eyes, sore feet</i></td><td>I have a <b>sore throat</b>.</td></tr>
          </tbody></table></div>
          <div class="hint small" style="margin-top:12px"><b>Falsos amigos de hospital:</b> <i>constipated</i> = estreñido (resfriado es <b>I have a cold</b> / <b>I'm congested</b>) · <i>embarrassed</i> = avergonzada (embarazada es <b>pregnant</b>) · <i>intoxicated</i> = borracho (intoxicación alimentaria es <b>food poisoning</b>) · <i>injury</i> = lesión (no injuria) · <i>sane</i> = cuerdo (sano es <b>healthy</b>).</div>
          <h3 style="margin-top:22px">3 · La dosis: frecuencia y cantidad</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Frecuencia</th><th>Cantidad y límites</th><th>Cuándo</th></tr></thead><tbody>
            <tr><td><b>once / twice / three times a day</b><br><b>every</b> eight hours (no <s>each</s>)<br><b>every other day</b> = un día sí, uno no</td><td><b>one tablet</b>, <b>two drops</b>, <b>5 ml</b> (five mils)<br><b>no more than</b> four a day<br><b>a maximum of</b> 3 grams in 24 hours</td><td><b>with food · after meals · on an empty stomach</b><br><b>before bed · as needed</b> (cuando lo necesites)<br><b>for</b> five days · <b>until</b> it's finished</td></tr>
          </tbody></table></div>
          <p class="small" style="margin:8px 0 0">Pregunta siempre: <b>How often should I take it?</b> · <b>How many can I take a day?</b> · <b>Can I take it with…?</b></p>
          <h3 style="margin-top:22px">4 · Pedir con educación: peticiones y preguntas indirectas</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Para…</th><th>Fórmula</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td>pedir un producto o una talla</td><td><b>Do you have</b> … <b>in</b> a medium / in black? · <b>I'm looking for</b> …</td><td><b>Do you have</b> this <b>in</b> a 42?</td></tr>
            <tr><td>pedir algo o una acción</td><td><b>Could I have</b> …? · <b>Could you</b> …? · <b>I'd like to</b> …, please</td><td><b>I'd like to</b> return this, please. <b>Could I have</b> a receipt?</td></tr>
            <tr><td>preguntar sin sonar brusco</td><td><b>Could you tell me if / where / how</b> + sujeto + verbo (sin invertir)</td><td><b>Could you tell me if this comes</b> in a larger size? (<s>if does this come</s>)<br><b>Do you know where the pharmacy is</b>? (<s>where is the pharmacy</s>)</td></tr>
            <tr><td>una petición más grande</td><td><b>Would it be possible to</b> …?</td><td><b>Would it be possible to</b> get a medical report today?</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:22px">5 · Pedir otra cosa: comparativos</h3>
          <p style="margin:8px 0 0">Adjetivo corto + <b>-er</b>: <i>a <b>bigger</b> / <b>smaller</b> size, something <b>cheaper</b>, anything <b>stronger</b>, a <b>looser</b> fit</i>. Largo: <b>more</b> + adjetivo: <i>something <b>more comfortable</b></i>. Irregulares: <i><b>better</b>, <b>worse</b></i> (<i>The pain is getting <b>worse</b></i>). Nunca <s>more big</s>, <s>more cheap</s>, <s>more better</s>. Y para lo mismo en otro color: <i>the <b>same one</b> in black</i>.</p>` },
        { label: 'Elige la forma', type: 'mcq', eyebrow: 'Grammar in context', title: 'Completa la frase', intro: 'Tiempo verbal para síntomas, <i>hurt</i> sin <i>me</i>, frecuencia de la dosis, preguntas indirectas y comparativos. Mezclamos tienda, farmacia y consulta.', items: [
          { blank: 1, q: 'I ___ a headache since Monday.', opts: ['have had', 'have', 'had', 'am having'], a: 'have had', why: 'Síntoma que sigue + <b>since</b> → present perfect: <b>I\'ve had</b>.' },
          { blank: 1, q: 'My wife ___ sick on the plane yesterday, but she is fine now.', opts: ['felt', 'has felt', 'feels', 'is feeling'], a: 'felt', why: '<i>Yesterday</i> + ya terminó → past simple: <b>felt</b>.' },
          { blank: 1, q: "I've had this cough ___ about a week.", opts: ['for', 'since', 'during', 'from'], a: 'for', why: 'Duración (<i>a week</i>) → <b>for</b>. <i>Since</i> va con un momento: <i>since last Tuesday</i>.' },
          { blank: 1, q: 'My stomach ___. Can I see a doctor today?', opts: ['hurts', 'hurts me', 'is hurting me', 'pains'], a: 'hurts', why: 'La parte del cuerpo es el sujeto: <b>My stomach hurts</b>. Sin <i>me</i>; es el calco de "me duele".' },
          { blank: 1, q: 'Take one tablet ___ eight hours, with food.', opts: ['every', 'each', 'all', 'any'], a: 'every', why: 'Frecuencia → <b>every eight hours</b>. <i>Each</i> no se usa con intervalos de tiempo.' },
          { blank: 1, q: 'How ___ should I take it? — Twice a day, after meals.', opts: ['often', 'many', 'long', 'much'], a: 'often', why: 'La respuesta es una frecuencia (<i>twice a day</i>) → <b>How often</b>. <i>How long</i> pregunta cuánto tiempo.' },
          { blank: 1, q: 'Could you tell me if this ___ in a larger size?', opts: ['comes', 'does come', 'come', 'is come'], a: 'comes', why: 'Pregunta indirecta: después de <i>if</i>, orden normal sin <i>do / does</i>: <b>if this comes</b>.' },
          { blank: 1, q: 'Do you know ___ the pharmacy is still open?', opts: ['if', 'that', 'what', 'does'], a: 'if', why: 'Pregunta de sí / no dentro de otra → <b>if</b> (o <i>whether</i>) + sujeto + verbo.' },
          { blank: 1, q: "Do you have anything ___ for the pain? This isn't working.", opts: ['stronger', 'more strong', 'strongest', 'most strong'], a: 'stronger', why: 'Adjetivo corto → <b>-er</b>: <b>stronger</b>. Nunca <s>more strong</s>.' },
          { blank: 1, q: 'This jacket is too small. Do you have it in a ___ size?', opts: ['bigger', 'more big', 'biggest', 'big'], a: 'bigger', why: 'Comparas con la que tienes → <b>a bigger size</b>.' },
          { blank: 1, q: "Is there anything ___? That's a bit over my budget.", opts: ['cheaper', 'more cheap', 'cheapest', 'cheap'], a: 'cheaper', why: '<b>cheaper</b>. Para pedir una opción más barata sin decir que es caro: <i>Is there anything cheaper?</i>' },
          { blank: 1, q: 'How long ___ the rash?', opts: ['have you had', 'do you have', 'are you having', 'did you have'], a: 'have you had', why: 'La pregunta estándar del médico: <b>How long have you had</b> + síntoma.' },
        ] },
        { label: 'Corrige las frases', type: 'fix', eyebrow: 'Error correction · errores típicos de hispanohablante', title: 'Reescribe la frase corrigiendo el error', intro: 'Calcos del español que se oyen en tiendas y farmacias. Corrige y compara con la solución (la comparación ignora mayúsculas y puntuación).', items: [
          { bad: 'I have a headache since yesterday.', good: "I've had a headache since yesterday.", why: 'Síntoma que sigue + <i>since</i> → present perfect: <b>I\'ve had</b>. También vale <i>I have had</i>.' },
          { bad: "I'm constipated. I think I have a cold.", good: "I'm congested. I think I have a cold.", why: '<b>constipated</b> = estreñido. Para la nariz tapada: <b>congested</b> / <i>I have a stuffy nose</i>.' },
          { bad: 'My stomach hurts me a lot.', good: 'My stomach hurts a lot.', why: '<b>hurt</b> lleva la parte del cuerpo como sujeto y no lleva <i>me</i>.' },
          { bad: 'Do you have this in a size more big?', good: 'Do you have this in a bigger size?', why: 'Comparativo corto: <b>bigger</b>, y va antes del sustantivo.' },
          { bad: 'Can I prove this jacket on?', good: 'Can I try this jacket on?', why: 'Probarse ropa = <b>try on</b>. <i>Prove</i> es demostrar. También <i>try on this jacket</i>.' },
          { bad: 'I want to return this.', good: "I'd like to return this, please.", why: '<i>I want</i> a secas suena exigente. En una tienda: <b>I\'d like to…, please</b>.' },
          { bad: "I don't have the ticket, but I paid by card.", good: "I don't have the receipt, but I paid by card.", why: 'El comprobante de compra es el <b>receipt</b>. <i>Ticket</i> es una entrada o un boleto.' },
          { bad: 'Take one pill each eight hours.', good: 'Take one pill every eight hours.', why: 'Intervalos de tiempo → <b>every</b>: <i>every eight hours, every day</i>.' },
          { bad: "I'm allergic of penicillin.", good: "I'm allergic to penicillin.", why: '<b>allergic to</b>. Calco de "alérgico a" con la preposición equivocada.' },
          { bad: 'Can you tell me where is the emergency room?', good: 'Can you tell me where the emergency room is?', why: 'Pregunta indirecta: <i>where</i> + <b>sujeto + verbo</b>, sin invertir.' },
        ] },
        { label: 'Pide con educación', type: 'soft', eyebrow: 'Polite requests · escritura', title: 'Reescribe la petición de forma educada', explain: 'Lo directo ("Give me a bigger size") suena a orden. Reescribe cada frase con una fórmula: <b>Do you have…?</b> · <b>Could I have…?</b> · <b>Could you…?</b> · <b>I\'d like…</b> · <b>Could you tell me if / where…?</b> · <b>Do you know if…?</b> · <b>Would it be possible to…?</b>', missing: 'Falta una fórmula educada: <i>Do you have… · Could I / you… · I\'d like… · Could you tell me… · Do you know if… · Would it be possible…</i>', pattern: /\b(do you have|could i|could you|i['’]d like|i would like|would it be possible|do you know (if|whether|where|how|when)|could you tell me)\b/, items: [
          { h: '"Give me a bigger size." (en una tienda, con <i>Do you have…?</i>)', a: 'Do you have this in a bigger size, please?' },
          { h: '"Where is the pharmacy?" (a un desconocido, con <i>Could you tell me…?</i>)', a: 'Could you tell me where the nearest pharmacy is?' },
          { h: '"I want my money back." (devolviendo algo, con <i>I\'d like…</i>)', a: "I'd like a refund, please. Here's my receipt." },
          { h: '"Is this clinic open on Sundays?" (por teléfono, con <i>Do you know if…?</i>)', a: 'Do you know if the clinic is open on Sundays?' },
          { h: '"Write me a medical report." (al médico, con <i>Could I have…?</i>)', a: 'Could I have a medical report for my insurance, please?' },
          { h: '"Change this for a medium." (sin recibo, con <i>Would it be possible…?</i>)', a: 'Would it be possible to exchange this for a medium?' },
          { h: '"Call a doctor now." (urgente pero educado, con <i>Could you…?</i>)', a: 'Could you call a doctor, please? My wife feels very dizzy.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Frases reales de dependientes, farmacéuticos y recepción de una clínica. Baja la velocidad si hace falta. Ojo con las contracciones (<i>can\'t, we\'ll, won\'t</i>) y con <i>receipt</i>.',
          sentences: ['Do you need a bag, or are you fine without one?', "I'm afraid we can't give refunds on sale items, only exchanges.", 'Without a receipt, the best I can do is store credit.', 'Take one tablet every eight hours with food, and no more than three a day.', 'Are you allergic to any medication?', 'This one is available over the counter, but it may make you drowsy.', 'Have you had these symptoms for more than three days?', 'Please fill out this form and have a seat; the doctor will call you.', "Do you have travel insurance? We'll need the policy number.", 'Can you tell me exactly where it hurts and when it started?', 'The data plan includes ten gigabytes and lasts thirty days.', "Keep the receipt; the warranty won't be valid without it."] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening · en la farmacia', title: 'Escucha el diálogo y responde', intro: 'Aldo entra en una farmacia en el extranjero con dolor de garganta. Escucha la conversación entera antes de responder.',
          lines: [['Pharmacist', 'Hi there, how can I help you?'], ['Aldo', "Hi. I've had a sore throat and a dry cough since Tuesday, and last night I had a bit of a fever."], ['Pharmacist', 'I see. Any other symptoms? Headache, body aches?'], ['Aldo', "A headache, yes. Nothing serious, but I'm traveling, and I'd like something to get through the week."], ['Pharmacist', 'Are you allergic to any medication, or taking anything at the moment?'], ['Aldo', "I'm allergic to penicillin. Nothing else."], ['Pharmacist', "That's fine, none of this contains penicillin. I'd suggest paracetamol for the fever and the headache, and these lozenges for the throat. For the cough, a syrup at night."], ['Aldo', 'How often should I take the paracetamol?'], ['Pharmacist', "One tablet every six hours, no more than four a day. The syrup may make you drowsy, so don't drive after taking it."], ['Aldo', "OK. And if the fever doesn't go away?"], ['Pharmacist', "If it lasts more than three days or goes above thirty-nine, see a doctor. There's a walk-in clinic two blocks from here."], ['Aldo', 'Perfect, thanks. Can I pay by card?'], ['Pharmacist', "Of course. That's fourteen sixty altogether. Do you want the receipt in the bag?"], ['Aldo', 'Yes, please. I might need it for my insurance.']],
          questions: [
            { q: 'How long has Aldo had the sore throat?', opts: ['Since Tuesday', 'Since last night', 'For three weeks'], a: 'Since Tuesday', why: '"I\'ve had a sore throat and a dry cough <b>since Tuesday</b>." La fiebre fue anoche.' },
            { q: 'Why does the pharmacist ask about allergies?', opts: ['To make sure the medicine is safe for him', 'Because he needs a prescription', 'Because the syrup contains penicillin'], a: 'To make sure the medicine is safe for him', why: 'Pregunta antes de recomendar y después confirma: "none of this contains penicillin".' },
            { q: "What shouldn't Aldo do after taking the syrup?", opts: ['Drive', 'Eat', 'Take paracetamol'], a: 'Drive', why: '"The syrup may make you <b>drowsy</b>, so don\'t drive after taking it."' },
            { q: 'When should Aldo see a doctor?', opts: ['If the fever lasts more than three days or goes above 39', 'If the cough gets worse at night', 'If the lozenges run out'], a: 'If the fever lasts more than three days or goes above 39', why: '"If it lasts more than three days or goes above thirty-nine, see a doctor."' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Describing symptoms to a doctor', task: 'Estás en una consulta en el extranjero. Explica qué te duele, dónde, desde cuándo (I\'ve had… since / for), cómo es el dolor (sharp / dull), qué has tomado, tus alergias y qué necesitas (informe para el seguro).', model: "Good morning, doctor. I've had a pain in my lower back since Tuesday, so about four days now. It's a dull ache most of the time, but it gets sharp when I bend down or get out of the car. I haven't had a fever, and I've only taken paracetamol, which helps a little. I'm allergic to ibuprofen, so I'd rather avoid that. We're traveling for another week, and I'd like to know if I need any tests or just rest. Could you also give me a short medical report for my insurance?", tags: ["i've had", 'since', 'for', 'dull ache', 'sharp', 'allergic to', 'medical report', 'insurance'] },
          { t: 'Returning something faulty', task: 'Devuelve unos audífonos que dejaron de funcionar. Di cuándo los compraste, qué falla, que tienes el recibo y cómo pagaste; pide reembolso en vez de cambio y pregunta cuánto tarda.', model: "Hi, I'd like to return these headphones, please. I bought them here last Saturday, and yesterday the left side stopped working. I haven't dropped them or got them wet; they just stopped. I have the receipt here, and I paid by card. If possible, I'd prefer a refund rather than an exchange, because we're flying home on Thursday and I won't have time to come back if the new pair has the same problem. Could you tell me how long the refund takes to appear on my card?", tags: ["i'd like to return", 'receipt', 'paid by card', 'refund', 'exchange', 'stopped working', 'could you tell me'] },
          { t: 'A data plan for two weeks', task: 'En una tienda de telefonía: pide el plan de datos prepago más barato para dos teléfonos liberados durante dos semanas. Pregunta por gigas, roaming en otro país, cómo recargar y si necesitan pasaporte.', model: "Hello. We're here for two weeks, and we need data for two phones. Both are unlocked. What's your cheapest prepaid plan with at least ten gigabytes? We'll mostly use maps and messaging, and some video calls to Peru. Does the plan include roaming in other EU countries? We're going to Portugal for three days. Also, if we run out of data, can I top up online, or do I need to come back to the shop? And do you need our passports to activate the SIMs?", tags: ['prepaid', 'unlocked', 'data', 'gigabytes', 'roaming', 'top up', 'passports', 'cheapest'] },
          { t: 'Calling for help', task: 'Llamas al número de emergencias: tu esposa se desmayó y se golpeó la cabeza. Di qué pasó, cómo está (respira, está pálida), la dirección exacta con una referencia, su edad y alergias, y pregunta qué hacer mientras llega la ambulancia.', model: "Hello, I need an ambulance, please. My wife has fainted and she isn't responding properly. She's breathing, but she's very pale, and she hit her head when she fell. We're at 24 Rose Street, apartment 3B, near the central market; the building has a green door. She's thirty-eight, and she's allergic to ibuprofen. No, this hasn't happened before. Yes, I'll stay on the line. Could you tell me what I should do while we wait? Should I move her?", tags: ['ambulance', 'fainted', 'breathing', 'hit her head', 'street', 'allergic', 'stay on the line', 'should i'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación · habla conectada', title: 'Lo que oyes no es lo que está escrito', intro: 'En una tienda o en urgencias nadie separa las palabras. Fíjate en los enlaces (<i>try it on</i> → "trai-i-TON"), en las consonantes que caen (<i>recei<s>p</s>t</i>) y en las sílabas fuertes en MAYÚSCULAS. Escucha y repite imitando el ritmo, no letra por letra.',
          pairs: [['Can I try it on? → "kə-nai-TRAI-i-TON"', 'Can I try it on?'], ['Do you have it in a medium? → "d\'ya HAV-i-din-a MEE-dium"', 'Do you have it in a medium?'], ['Could I have a receipt? → "kʊ-dai HAV-a ri-SEET" (la p no suena)', 'Could I have a receipt, please?'], ["I've had it since Monday → \"aiv-HA-dit sins\"", "I've had it since Monday."], ['It hurts when I swallow → "it-HƏRTS we-nai SWA-lou"', 'It hurts when I swallow.'], ['I\'m allergic to penicillin → "ai-ma-LƏR-yik tə pe-ni-SI-lin"', "I'm allergic to penicillin."], ['every eight hours → "EV-ri EI-TAU-ərz"', 'Take one tablet every eight hours.'], ["What's your return policy? → \"wəts-yər ri-TƏRN PO-li-si\"", "What's your return policy?"], ['Does it come with a warranty? → "də-zit KƏM-wi-tha WO-rən-ti"', 'Does it come with a warranty?'], ['cough · ache · headache → "kof" · "eik" · "HE-deik"', 'cough, ache, headache'], ['Call an ambulance! → "KO-la-NAM-byə-ləns"', 'Call an ambulance! She has fainted.']] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for detail · inferring meaning', title: 'Your claim: what we need from you', intro: 'Un correo del seguro de viaje después de una visita a urgencias. Lee una vez para entender los pasos y otra fijándote en las palabras en amarillo: intenta deducirlas por el contexto antes de responder.',
          paragraphs: [
            "Dear Mr Suárez, Thank you for contacting Atlas Travel Cover about your visit to St Mary's Hospital on 14 March. We are sorry to hear that your wife was <b>unwell</b> during your trip, and we hope she is feeling better. This email explains how to submit your claim and what happens next.",
            "To process the claim, we need three documents: the medical report from the hospital, which should include the diagnosis and the treatment given; an <b>itemized</b> bill showing the cost of each service, not just the total; and proof of payment, such as a card statement or a receipt. Photos of these documents are fine as long as every line is readable. Please also include your policy number in the subject line of your reply.",
            "Your policy covers emergency treatment up to 50,000 euros, including consultations, tests and medication prescribed by a doctor. It does not cover treatment for conditions that existed before the trip, unless they were declared when you bought the policy. A <b>deductible</b> of 75 euros applies to each claim, which means that we will <b>reimburse</b> the total cost minus that amount.",
            "Once we receive the documents, a claims adviser will review them within ten working days. If something is missing, we will contact you by email rather than by phone. Payments are made by bank transfer, so please confirm the account details you would like us to use. If you need further treatment while you are still abroad, call our 24-hour line before visiting a clinic; in many cities we can arrange direct payment to the hospital so that you do not have to pay in advance. Kind regards, The Claims Team, Atlas Travel Cover",
          ],
          main: [
            { q: 'This paragraph lists the documents the insurer needs.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: <i>we need three documents: the medical report… an itemized bill… and proof of payment</i>.' },
            { q: 'This paragraph explains the limits of the policy and what you pay yourself.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: <i>covers… up to 50,000 euros… does not cover… A deductible of 75 euros</i>.' },
            { q: 'This paragraph says how long the review takes and how the money is paid.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: <i>within ten working days… Payments are made by bank transfer</i>.' },
          ],
          infer: [
            { q: '<b>unwell</b> (paragraph 1)', opts: ['sick', 'lost', 'late'], a: 'sick', why: 'Fue al hospital y esperan que <i>she is feeling better</i>: estaba enferma. Es la forma suave de <i>ill</i>.' },
            { q: '<b>itemized</b> (paragraph 2)', opts: ['showing each item and its price separately', 'translated into English', 'signed by the doctor'], a: 'showing each item and its price separately', why: 'El texto lo explica: <i>showing the cost of each service, not just the total</i>.' },
            { q: '<b>deductible</b> (paragraph 3)', opts: ['the part of the cost you pay yourself', 'a discount on next year\'s policy', 'the maximum the insurer pays'], a: 'the part of the cost you pay yourself', why: '<i>we will reimburse the total cost <b>minus</b> that amount</i>: los 75 euros los pones tú. En UK se llama <i>excess</i>.' },
            { q: '<b>reimburse</b> (paragraph 3)', opts: ['pay back money that someone has spent', 'send a bill', 'cancel a policy'], a: 'pay back money that someone has spent', why: 'Tú pagaste en el hospital y el seguro te devuelve el dinero: <b>reimburse</b> = reembolsar.' },
          ],
          think: '¿Qué tres documentos pedirías en recepción antes de salir del hospital? Escribe en inglés la frase exacta que le dirías a la recepcionista (empieza por <i>Before we leave, could I have…</i>) y la primera línea del correo que enviarías al seguro con el número de póliza.' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ['Assistant: Hi, how can I help?', 'Aldo: Hi. I bought these headphones on Saturday, and the left side stopped working yesterday.', "Assistant: I'm sorry about that. Do you have the receipt?", 'Aldo: Yes, here it is. I paid by card.', 'Assistant: Great. Would you like an exchange or a refund?', "Aldo: A refund, please. We're flying home tomorrow.", "Assistant: No problem. It'll go back to the same card in three to five days."],
          ['Clerk: Hello, what can I do for you?', "Aldo: Hi. I'm looking for a prepaid SIM with data for two weeks, for two phones.", 'Clerk: Sure. The fifteen-day plan has twenty gigabytes each and unlimited calls.', "Aldo: Does it work in Portugal as well? We're going there next week.", "Clerk: Yes, roaming is included in the EU. I'll need your passports.", 'Aldo: Here you are. Could you set them up for us?', "Clerk: Of course. Give me five minutes and you'll be online."],
          ['Receptionist: Good morning. Do you have an appointment?', "Aldo: No, we don't. My wife has had a very bad stomachache since last night.", 'Receptionist: OK. Is she able to fill out this form, or would you like to do it for her?', "Aldo: I'll do it. Do you need our travel insurance details?", 'Receptionist: Yes, the policy number and a photo ID, please.', "Aldo: Here's her passport and the insurance card. How long is the wait?", "Receptionist: About forty minutes. Take a seat and we'll call her name."],
        ] },
        { label: 'Escribe tu reclamo', type: 'comment', eyebrow: 'Writing task', title: 'Reclamo a una tienda online o solicitud al seguro de viaje', intro: 'Elige: (A) un correo a una tienda online por un producto defectuoso o equivocado, o (B) la solicitud de reembolso a tu seguro de viaje tras una visita médica. Incluye fecha, importe, qué pasó, qué documentos adjuntas y qué pides. 90-140 palabras. La checklist se marca sola al analizar el texto.', placeholder: 'Dear Customer Service, / Dear Claims Team, I am writing about order number … / policy number … On 14 March I … The total was 89 euros … I have attached the receipt and … I would like a full refund / I would appreciate … Kind regards, Aldo', min: 90, max: 140, need: 5, checks: [
          { label: 'Abro como un correo formal (<i>Dear Customer Service / Dear Claims Team / To whom it may concern</i>)', re: /\b(dear (sir|madam|sir or madam|customer (service|care|support)|claims? team|support team|\w+ team|mr|ms|mrs|dr)|to whom it may concern)\b/ },
          { label: 'Digo cuándo pasó: una fecha o un día concreto', re: /\b(january|february|march|april|may|june|july|august|september|october|november|december|monday|tuesday|wednesday|thursday|friday|saturday|sunday|yesterday|last (week|month|night))\b|\b\d{1,2}\/\d{1,2}(\/\d{2,4})?\b/ },
          { label: 'Menciono el importe con moneda (<i>89 euros, $120, 45 pounds</i>)', re: /(€|\$|£)\s?\d|\b\d[\d.,]*\s?(euros?|dollars?|pounds?|soles|usd|eur|gbp)\b/ },
          { label: 'Nombro los documentos que adjunto o tengo (<i>receipt, medical report, itemized bill, policy number, order number, proof of payment</i>)', re: /\b(receipt|invoice|itemized bill|medical report|policy number|order number|proof of payment|card statement|attached|attachment|attach|enclosed)\b/ },
          { label: 'Explico el problema con vocabulario de la unidad (<i>faulty, stopped working, wrong size, refund, exchange, reimburse, claim, cover</i>)', re: /\b(faulty|defective|damaged|broken|doesn['’]t work|stopped working|wrong (size|item|color|colour)|never arrived|refund|exchange|replacement|reimburse|reimbursement|claim|cover|covered|treatment|emergency)\b/ },
          { label: 'Pido lo que quiero con educación (<i>I would like… / Could you… / I would appreciate… / Would it be possible…</i>)', re: /\b(i would like|i['’]d like|could you|would you|i would appreciate|i['’]d appreciate|would it be possible|please (let me know|confirm|send|process|advise))\b/ },
          { label: 'Cierro como un correo real (<i>Kind regards / I look forward to hearing from you / Thank you in advance</i>)', re: /\b(kind regards|best regards|regards|yours sincerely|yours faithfully|sincerely|thank you in advance|thanks in advance|i look forward to (hearing|your reply|your response))\b/ },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Las frases que salvan el momento', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>En la tienda</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I'm just looking, thanks.</b></li><li><b>Do you have this in</b> a medium / a 42 / black?</li><li><b>Can I try it on?</b> / Where are the fitting rooms?</li><li>It's a bit <b>tight</b>. Do you have <b>a bigger size</b>?</li><li><b>Is this on sale?</b> / Is there <b>anything cheaper</b>?</li><li><b>I'll take it.</b> / I'll leave it, thanks.</li><li><b>By card, please.</b> / Do you take cards?</li><li><b>Could I have a receipt?</b></li></ul></div>
          <div><h3>Devoluciones y garantía</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I'd like to return this, please.</b> It's <b>faulty</b>: the seam came apart.</li><li><b>Can I exchange it for</b> a larger size?</li><li><b>I don't have the receipt, but I paid by card.</b> Could you check?</li><li><b>I'd prefer a refund</b>, if that's possible.</li><li><b>What's your return policy?</b> / Is it still <b>under warranty</b>?</li><li>Respuestas que oirás: <i>store credit only · within 30 days · back to the same card · we can't refund sale items</i></li></ul></div>
          <div><h3>Electrónica y SIM</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I'm looking for a prepaid SIM with data for two weeks.</b></li><li><b>Is my phone compatible?</b> It's unlocked.</li><li><b>Does it include roaming in</b> Portugal?</li><li><b>How do I top up?</b> / Does it come with a warranty?</li></ul></div>
          <div><h3>En la farmacia</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I've had</b> a sore throat <b>since</b> Tuesday.</li><li><b>Do you have anything for</b> a cough / an upset stomach?</li><li><b>Can I get it over the counter?</b></li><li><b>I'm allergic to</b> penicillin.</li><li><b>How often should I take it?</b> / How many a day?</li><li><b>Does it have any side effects?</b> / Will it make me drowsy?</li><li><b>Is there a doctor I can see today?</b></li></ul></div>
          <div><h3>Consulta y urgencias</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>My wife has had a sharp pain in</b> her lower right side <b>since</b> three o'clock.</li><li><b>It hurts when</b> she moves. / She feels <b>dizzy</b>.</li><li><b>We have travel insurance.</b> Here's the policy number.</li><li><b>Could you help me fill out this form?</b></li><li><b>Is it serious?</b> / Will she need surgery?</li><li><b>Could we have a medical report and an itemized bill?</b> Our insurer needs them.</li><li><b>Can I pay by card, or will you bill the insurance directly?</b></li></ul></div>
          <div><h3>Emergencias</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I need an ambulance.</b> / Call an ambulance, please!</li><li><b>My wife has fainted</b> and she isn't responding.</li><li><b>We're at</b> 24 Rose Street, <b>near</b> the central market.</li><li><b>She's breathing, but</b> she's very pale.</li><li><b>Can somebody help me, please?</b> / Is there a doctor here?</li></ul></div>
          <div class="hint small"><b>Registro:</b> en una tienda, <i>I want</i> suena exigente: <b>I'd like…, please</b>. · Al que te atiende, <b>Excuse me</b> para llamar su atención y <b>Sorry?</b> si no entendiste. · <i>Ticket</i> es una entrada o un boleto: el comprobante es <b>receipt</b>. · En urgencias, primero <b>qué pasó</b> y <b>dónde</b>, después los detalles; el operador te hará las preguntas.</div></div>` },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', items: [
          { q: 'Entras en una tienda y la dependienta se acerca, pero tú solo quieres mirar.', opts: ["I'm just looking, thanks.", "No, I don't need you.", "I'm only watching."], a: "I'm just looking, thanks.", why: '<b>I\'m just looking, thanks</b>. <i>Watch</i> es mirar algo que se mueve (una película, un partido).' },
          { q: 'Quieres probarte unos pantalones.', opts: ['Can I try these on?', 'Can I prove these?', 'Where can I test this?'], a: 'Can I try these on?', why: 'Probarse ropa = <b>try on</b>. <i>Prove</i> es demostrar; <i>test</i> es comprobar que funciona.' },
          { q: 'La camisa te queda chica.', opts: ['Do you have this in a larger size?', 'Do you have this more big?', 'This is small for me, give me other.'], a: 'Do you have this in a larger size?', why: '<b>Do you have this in a larger / bigger size?</b> Comparativo corto con -er y sin órdenes.' },
          { q: 'Acabas de pagar y quieres el comprobante.', opts: ['Could I have the receipt, please?', 'Give me the ticket.', 'I need the bill of this.'], a: 'Could I have the receipt, please?', why: 'El comprobante es el <b>receipt</b>; <i>ticket</i> es una entrada. Y se pide con <b>Could I have…?</b>' },
          { q: 'Quieres devolver algo, no tienes el recibo, pero pagaste con tarjeta.', opts: ["I don't have the receipt, but I paid by card. Could you check?", 'I lost the ticket, but you must return the money.', 'No receipt. Refund.'], a: "I don't have the receipt, but I paid by card. Could you check?", why: 'Das la información útil (pagaste con tarjeta) y pides, no exiges.' },
          { q: 'En la farmacia quieres algo sin receta para el estómago.', opts: ['Do you have anything over the counter for an upset stomach?', 'Give me a medicine for the stomach without recipe.', 'I need pills, no prescription.'], a: 'Do you have anything over the counter for an upset stomach?', why: '<b>over the counter</b> = sin receta. <i>Recipe</i> es una receta de cocina.' },
          { q: 'Quieres saber cada cuánto se toma el jarabe.', opts: ['How often should I take it?', 'How many times I take?', 'Each how many hours?'], a: 'How often should I take it?', why: 'Frecuencia → <b>How often…?</b> La respuesta será <i>twice a day</i> o <i>every eight hours</i>.' },
          { q: 'El médico pregunta qué te pasa. Te duele la espalda baja desde el lunes.', opts: ["I've had a pain in my lower back since Monday.", 'I have pain in the back since Monday.', 'My back hurts me from Monday.'], a: "I've had a pain in my lower back since Monday.", why: 'Síntoma que sigue → <b>I\'ve had… since</b>. Y <i>hurt</i> nunca lleva <i>me</i>.' },
          { q: 'Llamas a emergencias: tu esposa se desmayó.', opts: ["I need an ambulance. My wife has fainted and she isn't responding. We're at 24 Rose Street.", 'Ambulance, please, my wife is falling.', 'Help, my wife, come fast.'], a: "I need an ambulance. My wife has fainted and she isn't responding. We're at 24 Rose Street.", why: 'Qué necesitas, qué pasó y dónde, en tres frases cortas. <i>Is falling</i> sería que se está cayendo ahora.' },
          { q: 'En la tienda de telefonía quieres datos para dos semanas.', opts: ["I'd like a prepaid SIM with data for two weeks, please.", 'I want a chip with internet for fifteen days.', 'Give me a SIM, the cheap one.'], a: "I'd like a prepaid SIM with data for two weeks, please.", why: '<b>I\'d like… please</b> + <b>prepaid SIM with data</b>. <i>Chip</i> no se usa en inglés para la SIM.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Tienda, farmacia y urgencias', intro: 'Tres situaciones en un viaje con tu esposa. En cada turno eliges tu réplica: una es la más natural, otra es correcta pero mejorable y otra es un calco del español o un error de registro. La conversación sigue por la rama que elijas; algunos tropiezos se pueden reparar, otros no.', scenes: [
          { t: 'La chaqueta sin recibo', you: 'Aldo, cliente', partner: 'Dependienta', role: 'atiende el mostrador de devoluciones; amable mientras tú lo seas', goal: 'Devuelve una chaqueta con una costura rota (<b>the seam came apart</b>) sin recibo: explica el problema, da la información útil (<b>I paid by card</b>), pide <b>a refund</b> con educación y cierra bien.', start: 'a', nodes: {
            a: { say: 'Hi there! Can I help you with anything?', opts: [
              { t: "Hi. I'd like to return this jacket, please. The seam under the arm came apart the second time I wore it.", ok: 2, why: '<b>I\'d like to return this, please</b> + el problema concreto (<b>the seam came apart</b>) y cuándo pasó. Le das todo lo que necesita en una frase.', next: 'b' },
              { t: 'Hello. I have a problem with this jacket. Can I return it?', ok: 1, why: 'Correcta y educada. Falta decir cuál es el problema: te lo va a preguntar igual.', next: 'b' },
              { t: 'I want to return this. It is broken.', ok: 0, why: '<i>I want</i> sin <i>please</i> suena a exigencia, y la ropa no se "rompe" (<i>broken</i>): una costura <b>comes apart</b>, una cremallera <b>is faulty</b>.', next: 'a2' },
            ] },
            a2: { say: "Oh. OK… Let's have a look. What's the problem exactly?", opts: [
              { t: "Sorry, let me start again. The seam here came apart, and I'd like to return it, please.", ok: 2, why: 'Reparas el tono (<b>let me start again</b>) y describes el fallo con la palabra exacta: <b>the seam came apart</b>.', next: 'b' },
              { t: 'The seam is open, here. Can you change it?', ok: 1, why: 'Se entiende. Mejor <b>exchange</b> que <i>change</i> para cambiar un producto, y <b>came apart</b> que <i>is open</i>.', next: 'b' },
              { t: 'You see it. Is broken. I want my money.', ok: 0, why: 'Sin sujeto (<s>Is broken</s> → <b>It\'s</b>), sin <i>please</i> y exigiendo el dinero. La conversación no va a ir bien.', next: 'fail' },
            ] },
            b: { say: "I see, yes, that shouldn't happen. Do you have the receipt?", opts: [
              { t: "I'm afraid I don't, but I paid by card on Saturday, so it should be on your system.", ok: 2, why: '<b>I\'m afraid I don\'t</b> suaviza el no, y <b>I paid by card</b> es justo la información que le permite buscar la compra.', next: 'c' },
              { t: 'No, I lost it. I bought it last Saturday.', ok: 1, why: 'Correcta. Añadir que pagaste con tarjeta le ahorra un paso y mejora tus opciones de reembolso.', next: 'c' },
              { t: "No, I don't have the ticket. I threw it.", ok: 0, why: 'El comprobante es el <b>receipt</b> (<i>ticket</i> es una entrada), y tirar algo a la basura es <b>throw it away</b>.', next: 'b2' },
            ] },
            b2: { say: "The ticket? Oh, you mean the receipt. Without it, I'm afraid I can only offer store credit.", opts: [
              { t: 'Yes, sorry, the receipt. Would it be possible to check the purchase with my card? I paid by card on Saturday.', ok: 2, why: 'Aceptas la corrección y propones una salida con <b>Would it be possible to…?</b> + el dato clave.', next: 'c' },
              { t: 'Store credit is OK, but could you check with my card first?', ok: 1, why: 'Correcta y flexible. Aceptar el vale de entrada te quita margen; pide primero que busquen la compra.', next: 'c' },
              { t: 'No. Is defective, the law says you must refund.', ok: 0, why: 'Amenazar con la ley en la segunda frase, sin sujeto y sin <i>please</i>, cierra la puerta. Primero pide que busquen la compra.', next: 'fail' },
            ] },
            c: { say: "Let me check… Yes, here it is: Saturday, eighty-nine euros. Would you like an exchange or a refund?", opts: [
              { t: "A refund, please, if that's possible. We're flying home on Thursday, so I'd rather not risk another one.", ok: 2, why: '<b>A refund, please</b> + un motivo razonable (<b>we\'re flying home</b>) + <b>I\'d rather not</b>. Natural y convincente.', next: 'd' },
              { t: 'A refund, please.', ok: 1, why: 'Correcta y suficiente. Un motivo breve ayuda cuando la tienda prefiere los cambios.', next: 'd' },
              { t: "Give me the money back. I don't want other.", ok: 0, why: 'Imperativo seco. Y "no quiero otra" es <b>I don\'t want another one</b>, no <s>other</s>.', next: 'c2' },
            ] },
            c2: { say: "I can do a refund, sir, but there's no need for that tone.", opts: [
              { t: "You're right, I'm sorry. A refund would be great, thank you.", ok: 2, why: 'Reconoces el tono y lo arreglas en una frase: <b>You\'re right, I\'m sorry</b>.', next: 'd' },
              { t: 'Sorry. A refund, please.', ok: 1, why: 'Correcta y breve. Funciona.', next: 'd' },
              { t: 'I am not angry, I speak like this.', ok: 0, why: 'Justificarte en vez de disculparte. Te devuelven el dinero, pero el momento queda incómodo.', next: 'meh' },
            ] },
            d: { say: "No problem. It'll go back to the same card in three to five working days. Anything else?", opts: [
              { t: "That's great, thank you. Could I have a confirmation receipt, just in case?", ok: 2, why: 'Agradeces y pides el comprobante del reembolso con <b>Could I have…?</b>: si no aparece en la tarjeta, lo vas a necesitar.', next: 'win' },
              { t: "No, that's all. Thanks a lot.", ok: 1, why: 'Correcta. Pedir el comprobante del reembolso es la costumbre de viajero con experiencia.', next: 'win' },
              { t: 'Three to five days? No, I need it now, in cash.', ok: 0, why: 'Si pagaste con tarjeta, el reembolso vuelve a la tarjeta: es la norma, no una excusa. Pedir efectivo no suele ser posible.', next: 'meh' },
            ] },
            win: { say: 'Of course, here you go. Sorry again for the trouble, and have a safe flight!', end: true, outcome: 'win', note: 'Explicaste el fallo con la palabra exacta (<b>the seam came apart</b>), diste la información útil (<b>I paid by card</b>), pediste <b>a refund, please</b> con un motivo y cerraste pidiendo el comprobante. Así se devuelve sin recibo.' },
            meh: { say: "Right. Well, the refund is processed; you'll see it on your statement.", end: true, outcome: 'meh', note: 'Conseguiste el reembolso, pero con fricción. Recuerda: <b>I\'d like…, please</b> en vez de <i>I want</i> / <i>Give me</i>, y si pagaste con tarjeta el dinero vuelve a la tarjeta en unos días.' },
            fail: { say: "Sir, I'm trying to help you. If you keep talking to me like that, I'll have to call my manager.", end: true, outcome: 'fail', note: 'Sin <i>please</i>, sin sujeto y exigiendo, la dependienta deja de buscar soluciones. Empieza con <b>I\'d like to return this, please</b>, describe el fallo y ofrece el dato de la tarjeta: <b>I paid by card on Saturday</b>.' },
          } },
          { t: 'En la farmacia con fiebre', you: 'Aldo, con dolor de garganta y fiebre', partner: 'Farmacéutica', role: 'quiere ayudarte, pero necesita síntomas claros y tus alergias', goal: 'Describe los síntomas con <b>I\'ve had… since</b>, avisa de tu alergia a la penicilina (<b>I\'m allergic to…</b>), acepta algo <b>over the counter</b> y pregunta por la dosis.', start: 'a', nodes: {
            a: { say: 'Good afternoon. What can I do for you?', opts: [
              { t: "Hi. I've had a sore throat since yesterday, and this morning I had a fever, thirty-eight five.", ok: 2, why: 'Síntoma + desde cuándo con <b>I\'ve had… since</b>, y el dato de la fiebre. Exactamente lo que necesita.', next: 'b' },
              { t: 'Hello. I have a sore throat and a fever. Can you give me something?', ok: 1, why: 'Correcta. Falta el desde cuándo: te lo va a preguntar.', next: 'b' },
              { t: 'Hello. I am constipated and my throat hurts me.', ok: 0, why: '<b>constipated</b> = estreñido, no resfriado (<b>congested</b> / <b>I have a cold</b>). Y <i>hurt</i> no lleva <i>me</i>: <b>my throat hurts</b>.', next: 'a2' },
            ] },
            a2: { say: 'Constipated? OK… So, is it your stomach or your throat?', opts: [
              { t: "Sorry, wrong word! I mean I'm congested, and my throat hurts. I've also had a fever since this morning.", ok: 2, why: 'Corriges con humor (<b>wrong word!</b>), usas la palabra correcta (<b>congested</b>) y añades la fiebre con <b>I\'ve had… since</b>.', next: 'b' },
              { t: 'No, no, my throat. It hurts, and I have a fever.', ok: 1, why: 'Aclara el malentendido. Falta el desde cuándo.', next: 'b' },
              { t: "Constipated, like a cold. You don't understand?", ok: 0, why: 'Insistes en la palabra equivocada y culpas a la farmacéutica. Ella acabará adivinando, pero no por ti.', next: 'b' },
            ] },
            b: { say: 'Right. Any other symptoms? And are you allergic to anything?', opts: [
              { t: "A headache and a bit of a cough. And yes, I'm allergic to penicillin, so please check that.", ok: 2, why: 'Respondes a las dos preguntas y la alergia va con la preposición correcta: <b>allergic to</b>.', next: 'c' },
              { t: "I'm allergic to penicillin. No other symptoms, just tired.", ok: 1, why: 'Correcta. <i>Just tired</i> también es un síntoma útil; bien dicho.', next: 'c' },
              { t: 'I have allergy of penicillin. Give me antibiotics.', ok: 0, why: '<s>allergy of</s> → <b>allergic to</b> / <b>an allergy to</b>. Y los antibióticos no se venden sin receta: pedirlos así cierra opciones.', next: 'b2' },
            ] },
            b2: { say: "I can't sell antibiotics without a prescription, and with a penicillin allergy you need to be careful. Let's start with something for the fever.", opts: [
              { t: 'Of course, sorry. Something over the counter for the fever and the throat would be great.', ok: 2, why: 'Aceptas y usas la expresión clave: <b>something over the counter</b>.', next: 'c' },
              { t: 'OK. What do you recommend?', ok: 1, why: 'Correcta y abierta. Buena pregunta en cualquier farmacia.', next: 'c' },
              { t: 'In my country the pharmacy gives antibiotics without problem.', ok: 0, why: 'Puede ser verdad, pero no cambia la norma de aquí y suena a queja. Mejor <b>What do you recommend?</b>', next: 'c' },
            ] },
            c: { say: "I'd suggest paracetamol for the fever, one tablet every six hours, and these lozenges for the throat. None of them contain penicillin.", opts: [
              { t: 'Perfect. How many can I take a day, and should I take them with food?', ok: 2, why: 'Las dos preguntas de la dosis: <b>How many a day?</b> y <b>with food?</b> Así entiendes el prospecto antes de leerlo.', next: 'd' },
              { t: 'OK, thank you. How often did you say?', ok: 1, why: 'Correcta: pedir que repita la frecuencia con <b>How often did you say?</b> es mejor que asentir sin entender.', next: 'd' },
              { t: 'Paracetamol is very weak. Do you have something more strong, like injection?', ok: 0, why: '<s>more strong</s> → <b>stronger</b>, y <b>an injection</b>. Además, pedir algo "más fuerte" sin ver a un médico no suele funcionar.', next: 'c2' },
            ] },
            c2: { say: 'Paracetamol is the right first step. If the fever lasts more than three days, you should see a doctor.', opts: [
              { t: "Understood. I'll take the paracetamol and the lozenges, then. Is there a clinic nearby, just in case?", ok: 2, why: 'Aceptas el consejo y preguntas por la clínica por si acaso (<b>just in case</b>). Es lo que haría un viajero con experiencia.', next: 'd' },
              { t: 'OK, the paracetamol then.', ok: 1, why: 'Correcta. Preguntar por la clínica te ahorra buscarla con fiebre.', next: 'd' },
              { t: "No. If you don't have something strong, I go to another pharmacy.", ok: 0, why: 'Amenaza vacía (todas te dirán lo mismo) y <s>I go</s> → <b>I\'ll go</b>. Te vas sin nada.', next: 'fail' },
            ] },
            d: { say: "No more than four tablets in twenty-four hours, with or without food. If it isn't better by Friday, see a doctor. Anything else?", opts: [
              { t: "That's all, thank you. Could I have the receipt? I might need it for my insurance.", ok: 2, why: 'Cierras pidiendo el <b>receipt</b> para el seguro con <b>Could I have…?</b> El seguro de viaje suele reembolsar también la farmacia.', next: 'win' },
              { t: "No, that's everything. Thanks a lot.", ok: 1, why: 'Correcta. Pedir el recibo para el seguro es el detalle que te falta.', next: 'win' },
              { t: 'Yes, I want the ticket for the insurance.', ok: 0, why: '<i>Ticket</i> otra vez: es <b>receipt</b>. Y <i>I want</i> → <b>Could I have…?</b> Te entiende, pero suena seco.', next: 'meh' },
            ] },
            win: { say: 'Of course. Here you are, and feel better soon!', end: true, outcome: 'win', note: 'Describiste los síntomas con <b>I\'ve had… since</b>, avisaste de la alergia con <b>allergic to</b>, aceptaste algo <b>over the counter</b> y preguntaste <b>how many a day</b> y <b>with food</b>. Y te llevaste el recibo para el seguro.' },
            meh: { say: 'The receipt, you mean. Here you go. Get well soon.', end: true, outcome: 'meh', note: 'Saliste con la medicina correcta, pero con tropiezos de vocabulario. Fija estas tres: <b>receipt</b> (no <i>ticket</i>), <b>congested</b> (no <i>constipated</i>) y <b>allergic to</b>.' },
            fail: { say: "I'm sorry you feel that way. The clinic is two blocks down if you'd like to see a doctor.", end: true, outcome: 'fail', note: 'Pedir algo "más fuerte" sin médico y amenazar con irte no funciona en ninguna farmacia. Acepta lo <b>over the counter</b>, pregunta la dosis y pide la clínica <b>just in case</b>.' },
          } },
          { t: 'Urgencias con tu esposa', you: 'Aldo, acompañando a su esposa', partner: 'Recepcionista', role: 'registra pacientes en urgencias; después, la doctora de guardia', goal: 'Explica qué le pasa a tu esposa y desde cuándo (<b>She\'s had a sharp pain… since…</b>), llena el formulario, da los datos del seguro y pide informe y factura detallada para el seguro.', start: 'a', nodes: {
            a: { say: 'Good evening. Is this an emergency?', opts: [
              { t: 'Yes. My wife has had a very sharp pain in her lower right side since this afternoon, and now she has a fever.', ok: 2, why: 'Tipo de dolor (<b>sharp</b>), dónde (<b>lower right side</b>) y desde cuándo (<b>has had… since</b>): la recepcionista ya sabe cómo priorizarla.', next: 'b' },
              { t: 'Yes. My wife has a strong pain in her stomach and a fever.', ok: 1, why: 'Correcta y clara. Para el dolor, mejor <b>sharp</b> que <i>strong</i>; y falta desde cuándo.', next: 'b' },
              { t: 'My wife has pain in the stomach since this afternoon. She needs doctor now.', ok: 0, why: '<s>has pain… since</s> → <b>has had a pain… since</b>; <s>needs doctor</s> → <b>needs a doctor</b>. Y el tono de orden no acelera nada.', next: 'a2' },
            ] },
            a2: { say: 'OK, stay calm. Where exactly is the pain, and when did it start?', opts: [
              { t: "Lower right side. It started around three, and it's got worse. She also has a fever.", ok: 2, why: 'Respondes a las dos preguntas con precisión y añades que empeora: <b>it\'s got worse</b>.', next: 'b' },
              { t: "Here, on the right. Since three o'clock.", ok: 1, why: 'Correcta y breve. Decir que empeora y que hay fiebre ayuda al triaje.', next: 'b' },
              { t: "I don't know, she has pain. You are the doctor.", ok: 0, why: 'La recepcionista no es médica y necesita esos datos para pasarlos al triaje. Responder así bloquea el proceso.', next: 'fail' },
            ] },
            b: { say: "I'll let the triage nurse know. Meanwhile, could you fill out this form? Name, date of birth, allergies, and your insurance details.", opts: [
              { t: "Of course. We have travel insurance; here's the card with the policy number. Do you need her passport too?", ok: 2, why: 'Aceptas el formulario, adelantas el <b>policy number</b> y preguntas por el pasaporte: te ahorras dos vueltas al mostrador.', next: 'c' },
              { t: 'Yes. Here is our insurance paper and the passport.', ok: 1, why: 'Correcta. Mejor <b>insurance card</b> o <b>policy</b> que <i>paper</i>.', next: 'c' },
              { t: 'Form now? She is in pain! Fill it you.', ok: 0, why: 'Entendible, pero el formulario es lo que permite tratarla. Y <s>fill it you</s> no existe: <b>could you fill it out for me?</b>', next: 'b2' },
            ] },
            b2: { say: 'I understand, sir. The nurse is already on her way. The form takes two minutes, and we need it to treat her.', opts: [
              { t: "Sorry, I'm just worried. Give me the form; I'll do it while you see her.", ok: 2, why: 'Te disculpas explicando por qué (<b>I\'m just worried</b>) y colaboras. Todo el mundo lo entiende.', next: 'c' },
              { t: 'OK, OK. Give me the form.', ok: 1, why: 'Colaboras, aunque seco. Un <i>sorry</i> habría bastado para arreglar el tono.', next: 'c' },
              { t: 'I will not fill anything until a doctor comes.', ok: 0, why: 'Bloquear el registro retrasa justo lo que quieres. En urgencias, el formulario y la atención van en paralelo.', next: 'fail' },
            ] },
            c: { say: "Thank you. Allergies? Any medication she's taking?", opts: [
              { t: "She's allergic to ibuprofen. She isn't taking anything; she just took one paracetamol an hour ago.", ok: 2, why: '<b>allergic to</b>, y el dato clave de qué tomó y cuándo (<b>one paracetamol an hour ago</b>): el médico lo necesita para dosificar.', next: 'd' },
              { t: 'Allergic to ibuprofen. No medication.', ok: 1, why: 'Correcta y telegráfica, que en urgencias funciona. Añade lo que tomó hoy si tomó algo.', next: 'd' },
              { t: "She is alergic of the ibuprofen and she don't take nothing.", ok: 0, why: 'Tres calcos: <s>alergic of</s> → <b>allergic to</b>; sin artículo con medicamentos; y <s>don\'t take nothing</s> → <b>doesn\'t take anything</b>.', next: 'd' },
            ] },
            d: { who: 'Doctora', say: "Hello, I'm Dr. Okafor. I've seen your wife; it looks like appendicitis, and we'd like to do a scan and some blood tests now.", opts: [
              { t: 'Thank you, doctor. Please go ahead. Could you tell me how long the tests will take, and whether she will need surgery?', ok: 2, why: 'Das el consentimiento (<b>please go ahead</b>) y preguntas con una pregunta indirecta bien formada: <b>Could you tell me how long… and whether…</b>', next: 'e' },
              { t: 'OK, doctor. Do it, please. Is it serious?', ok: 1, why: 'Correcta. <b>Is it serious?</b> es la pregunta natural; <i>Do it</i> suena algo brusco aunque lleve <i>please</i>.', next: 'e' },
              { t: 'Appendicitis? Is impossible, she only ate seafood.', ok: 0, why: '<s>Is impossible</s> → <b>That\'s impossible</b>, y discutir el diagnóstico retrasa las pruebas. Pregunta, no niegues.', next: 'd2' },
            ] },
            d2: { who: 'Doctora', say: "I understand it's a shock, but the symptoms are quite clear, and we need to move fast. Do we have your consent for the tests?", opts: [
              { t: "Yes, of course. Sorry, I'm just scared. Please do whatever she needs.", ok: 2, why: 'Consentimiento claro + explicación honesta (<b>I\'m just scared</b>). La doctora lo agradece y sigue.', next: 'e' },
              { t: 'Yes, yes. Do the tests.', ok: 1, why: 'Correcta. Falta un <i>please</i>, pero en este momento nadie se lo toma a mal.', next: 'e' },
              { t: 'First I call my insurance to ask if they pay.', ok: 0, why: 'Las pruebas urgentes no esperan al seguro; la llamada la haces después desde la sala de espera. Y <s>I call</s> → <b>I\'ll call</b>.', next: 'meh' },
            ] },
            e: { who: 'Doctora', say: "The scan takes about twenty minutes. If it's confirmed, she'll have surgery tonight; it's routine. The receptionist will help you with the insurance paperwork.", opts: [
              { t: 'Thank you. One more thing: could we get a medical report and an itemized bill afterwards? Our insurer needs both.', ok: 2, why: 'Pides los dos documentos que el seguro exige con sus nombres: <b>medical report</b> e <b>itemized bill</b>. Es lo que convierte una noche mala en un reembolso.', next: 'win' },
              { t: 'Thank you very much, doctor. Can I stay with her?', ok: 1, why: 'Natural y humana. Los documentos para el seguro los puedes pedir después en recepción.', next: 'win' },
              { t: 'OK. How much costs the operation? We pay cash?', ok: 0, why: '<s>How much costs</s> → <b>How much does the operation cost?</b>; <s>We pay cash?</s> → <b>Do we pay in cash?</b> Y eso se pregunta en recepción, que suele cobrar directamente al seguro.', next: 'meh' },
            ] },
            win: { who: 'Doctora', say: "Absolutely, we'll prepare both. Now go and be with her; a nurse will come and get you.", end: true, outcome: 'win', note: 'Describiste el dolor (<b>a sharp pain in her lower right side since…</b>), llenaste el formulario con el <b>policy number</b>, diste alergias y medicación, consentiste las pruebas y pediste <b>a medical report and an itemized bill</b>. Tu seguro te lo va a agradecer.' },
            meh: { who: 'Doctora', say: 'Talk to reception about costs and insurance; they handle direct payments with most insurers. Your wife is in good hands.', end: true, outcome: 'meh', note: 'Tu esposa está atendida, pero mezclaste el momento del seguro con el de las pruebas. En urgencias: primero consentir el tratamiento, después el papeleo; y los documentos clave son el <b>medical report</b> y la <b>itemized bill</b>.' },
            fail: { say: "Sir, the nurse will see her now, but I can't register her without this information. Please take a breath, and let's start again.", end: true, outcome: 'fail', note: 'El miedo se entiende, pero bloquear a la recepcionista retrasa la atención. Da los datos que pide (<b>where exactly</b>, <b>since when</b>, alergias, <b>policy number</b>) y guarda la energía para las preguntas a la doctora.' },
          } },
        ] },
      ] },
    ],
  };
})();
