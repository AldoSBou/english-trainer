/* ===========================================================
   ingles3/unit5.js — Inglés 3 · Unit 5: And then… (Lost and found)
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Lesson 1 · Losing and finding things ---------- */
  const LOST = [
    ['appear', 'aparecer, empezar a verse', 'I was sitting in the living room when my kids appeared suddenly.', '¿Alguna vez apareció algo que dabas por perdido?'],
    ['disappear', 'desaparecer, volverse imposible de ver o encontrar', "Where's my phone? It was here a minute ago. It has disappeared.", '¿Qué cosa tuya desaparece siempre en casa?'],
    ['discover', 'descubrir, encontrar algo por primera vez', 'The scientist discovered some unusual plants in the ocean.', '¿Has descubierto alguna vez dinero en un bolsillo viejo?'],
    ['search for', 'buscar mirando con cuidado en un sitio', "I searched the house for my driver's license, but I couldn't find it.", '¿Dónde buscas primero cuando pierdes las llaves?'],
    ['get (something) back', 'recuperar algo que habías perdido', 'I dropped my wallet on the street and a young boy found it. I got it back!', '¿Recuperaste alguna vez algo perdido? Cuéntalo.'],
    ['locate', 'localizar, dar con la posición exacta de algo', "I'm trying to locate a package. The website says it was delivered.", '¿Usas alguna app para localizar tu móvil?'],
    ['return', 'devolver algo al sitio o a la persona de donde vino', 'I finished my assignment, so I returned the books to the library.', '¿Devuelves siempre lo que te prestan?'],
    ['leave (something) behind', 'olvidarse algo, dejarlo atrás al irte', "I can't find my cell phone! I think I left it behind on the bus.", '¿Qué te has olvidado alguna vez en un bus o taxi?'],
    ['drop', 'que se te caiga algo que llevabas', "I dropped my phone in the swimming pool and now it doesn't work.", '¿Se te ha caído alguna vez el móvil al agua?'],
    ['fall off', 'caerse de un sitio de repente', "Most of the apples have fallen off the trees. They're all over the ground.", '¿Se te ha caído algo del bolsillo sin darte cuenta?'],
  ];

  /* ---------- Lesson 2 · Needing and giving help ---------- */
  const HELP = [
    ['break down', 'averiarse (sobre todo un coche)', 'My car broke down on the highway and I couldn\'t drive it.', '¿Se te ha averiado alguna vez el coche lejos de casa?'],
    ['figure out', 'averiguar, dar con la solución de algo', "My car broke down and I couldn't figure out what to do.", '¿Cómo averiguas algo cuando no tienes internet?'],
    ['be in trouble', 'estar en apuros, tener un problema serio', 'A driver saw that I was in trouble and he stopped to help me.', '¿Cuándo fue la última vez que estuviste en apuros?'],
    ['feel sorry for (someone)', 'sentir pena o lástima por alguien', 'I think he felt sorry for me because it was so cold outside.', '¿Por quién sentiste pena esta semana?'],
    ['give (someone) a ride', 'llevar a alguien en coche', 'He couldn\'t fix the car, so he gave me a ride to a garage.', '¿A quién has llevado en coche últimamente?'],
    ['be grateful (to someone)', 'estar agradecido con alguien', 'I was so grateful to him for helping me.', '¿A quién le estás agradecido y aún no se lo has dicho?'],
    ['take care of (someone)', 'cuidar de alguien', 'I got sick recently, but my wife took care of me really well.', '¿Quién te cuida cuando estás enfermo?'],
    ['offer to (do something)', 'ofrecerse a hacer algo', 'In the end, a stranger offered to pay for me.', '¿Cuándo te ofreciste a ayudar a alguien?'],
    ['a stranger', 'un desconocido, alguien que no conoces', 'A stranger helped me when I lost my wallet.', '¿Aceptarías ayuda de un desconocido?'],
    ['contact', 'ponerse en contacto con alguien', "I tried to contact my roommate, but she wasn't answering her phone.", '¿Cómo contactas con tu familia: llamada, audio o mensaje?'],
  ];

  const ALL_VOCAB = [...LOST, ...HELP];

  /* ---------- Verbos irregulares de la unidad ---------- */
  const IRREG = [
    ['find', 'found'], ['take', 'took'], ['come', 'came'], ['go', 'went'], ['think', 'thought'],
    ['lose', 'lost'], ['break', 'broke'], ['leave', 'left'], ['fall', 'fell'], ['get', 'got'],
    ['give', 'gave'], ['speak', 'spoke'], ['meet', 'met'], ['feel', 'felt'],
  ];

  window.UNIT_DATA['ingles3/unit5'] = {
    source: 'WeTalk · Level 3 · Unit 5 · And then… (objetos perdidos, ayuda y sorpresas)',
    description: 'Perder y encontrar cosas, pedir y dar ayuda, contar una historia en pasado y reaccionar con sorpresa.',
    map: [
      ['Vocabulary', '10 verbos de <i>losing and finding things</i> (<i>appear, leave behind, fall off…</i>) y expresiones de <i>needing and giving help</i> (<i>break down, give someone a ride…</i>)', 'Flashcards con audio, emparejar, verbos frasales separables y situación → expresión'],
      ['Grammar', 'Simple past (formas y preguntas con <i>did</i>) · Past continuous + simple past con <i>when</i> / <i>while</i>', 'Tabla de reglas, irregulares, preguntas con <i>did</i> y el orden de la historia'],
      ['Listening', 'Diálogos sobre objetos perdidos y noticias sorprendentes', 'Dictado con voz sintética y diálogo con preguntas'],
      ['Speaking', 'Contar qué perdiste, pedir ayuda, dar y reaccionar a noticias', 'Retos con cronómetro y micrófono; entonación de sorpresa'],
      ['Reading', '"Lost and found": entrevista a Levi, de la oficina de objetos perdidos', 'Texto nuevo sobre el mismo tema + inferir significado'],
      ['Writing', 'Escribir una historia corta usando expresiones de storytelling', 'Corrige la frase, añade expresiones narrativas y checklist'],
      ['Social English', '<i>You\'ll never guess… / You\'re kidding! / Seriously?</i>', 'Frases por situación, ordenar diálogos y respuesta rápida'],
    ],
    weak: [
      '<b>Emparejar past continuous + simple past</b>: fallaste las cuatro frases de la historia de la tormenta. Escribiste <i>"I was talking to my neighbor <s>when the lights went off</s>"</i>, pero lo correcto era <i>when we <b>heard about the storm</b></i>.',
      '<i>"We were calling for help <s>when we heard about the storm</s>"</i> → <i>when the <b>lights went off</b></i>. Primero te enteras de la tormenta; la luz se va después y por eso pides ayuda.',
      '<i>"When we were sitting in the dark, <s>it arrived</s>"</i> → <i><b>firefighters arrived to help us</b></i>. <i>It</i> se refiere a la tormenta, que ya había llegado antes.',
      '<i>"While we were bringing the animals inside, <s>firefighters arrived to help us</s>"</i> → <i><b>it arrived</b></i> (la tormenta). Los bomberos llegan al final de la historia.',
      '<b>Conclusión</b>: la gramática estaba bien, pero no ordenaste la historia. Antes de elegir la cláusula, pregúntate <i>¿qué pasó primero?</i> y <i>¿qué acción larga se ve interrumpida?</i>',
    ],
    weakLink: 'Trabájalos en <b>Grammar › El orden de la historia</b> y en <b>Writing › Corrige la frase</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la expresión. Reverso: significado, ejemplo del curso y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...LOST.map(v => ({ cat: 'Losing and finding things', w: v[0], say: v[0].replace(/\(something\)/, 'something'), def: v[1], ex: v[2], ask: v[3] })),
            ...HELP.map(v => ({ cat: 'Needing and giving help', w: v[0], say: v[0].replace(/\((someone|something)\)/, '$1'), def: v[1], ex: v[2], ask: v[3] })),
          ] },

        { label: 'Expresión ↔ significado', type: 'match', eyebrow: 'Losing and finding things', title: 'Empareja la expresión con su significado', intro: 'Toca uno de la izquierda y luego su pareja de la derecha. Fíjate en las partículas: <i>for, back, behind, off, down, out</i>.',
          pairs: ALL_VOCAB.map(v => [v[0], v[1]]), round: 6 },

        { label: '¿Qué expresión es?', type: 'mcq', eyebrow: 'Situación → expresión', title: 'Lee la situación y elige la expresión correcta', pool: 8, items: [
          { q: 'You get on the train, and when you get off you realize your umbrella is still on the seat.', opts: ['leave something behind', 'fall off', 'return', 'locate'], a: 'leave something behind', why: '<b>leave (something) behind</b> = irte de un sitio sin llevarte algo. Ojo: con pronombre se separa → <i>I left <b>it</b> behind</i>.' },
          { q: 'Your keys were in your hand, and now they are on the floor.', opts: ['drop', 'disappear', 'discover', 'search for'], a: 'drop', why: '<b>drop</b> = que se te caiga algo que llevabas. <i>I dropped my phone.</i>' },
          { q: 'Your earring was on your ear this morning. At work, it is gone. Nobody pushed it.', opts: ['fall off', 'get something back', 'contact', 'return'], a: 'fall off', why: '<b>fall off</b> = caerse de un sitio de repente. <i>My earring fell off when I was at work.</i>' },
          { q: 'You look under the bed with a flashlight, then in every drawer, then in the car.', opts: ['search for', 'appear', 'take care of', 'break down'], a: 'search for', why: '<b>search for</b> = buscar mirando con cuidado. <i>I searched the house for my license.</i>' },
          { q: 'A young boy finds your wallet on the street and hands it to you.', opts: ['get something back', 'leave something behind', 'figure out', 'drop'], a: 'get something back', why: '<b>get (something) back</b> = recuperar algo perdido. <i>I got it back!</i>' },
          { q: 'The website says your package was delivered, so you call the company to find its exact position.', opts: ['locate', 'disappear', 'offer to', 'be grateful'], a: 'locate', why: '<b>locate</b> = dar con la posición exacta. Es otra forma de decir <i>find</i>.' },
          { q: 'You finished the books from the library, so you take them there again.', opts: ['return', 'get something back', 'discover', 'appear'], a: 'return', why: '<b>return</b> = devolver algo al sitio de donde vino. Con personas se usa <i>give it back</i>.' },
          { q: 'Your kids were hiding behind the curtain and suddenly you can see them.', opts: ['appear', 'disappear', 'fall off', 'locate'], a: 'appear', why: '<b>appear</b> = empezar a verse. Su opuesto es <b>disappear</b>.' },
          { q: 'Your phone was on the table one minute ago. Now it is impossible to find.', opts: ['disappear', 'appear', 'return', 'contact'], a: 'disappear', why: '<b>disappear</b> = volverse imposible de ver o encontrar.' },
          { q: 'A scientist finds a plant in the ocean that nobody had seen before.', opts: ['discover', 'search for', 'locate', 'get something back'], a: 'discover', why: '<b>discover</b> = encontrar algo por primera vez. <i>Locate</i> es encontrar algo que ya sabías que existía.' },
          { q: 'Your car stops on the highway and the engine will not start again.', opts: ['break down', 'fall off', 'drop', 'disappear'], a: 'break down', why: '<b>break down</b> = averiarse. Se usa sobre todo con coches y máquinas.' },
          { q: 'You are standing next to the car and you have no idea what to do next.', opts: ["can't figure out what to do", 'take care of somebody', 'be grateful', 'return'], a: "can't figure out what to do", why: '<b>figure out</b> = averiguar, dar con la solución. <i>I couldn\'t figure out what to do.</i>' },
          { q: 'A driver sees you alone on the highway at night with a broken car.', opts: ['He sees that you are in trouble', 'He drops you', 'He returns you', 'He locates you'], a: 'He sees that you are in trouble', why: '<b>be in trouble</b> = estar en apuros.' },
          { q: 'It was very cold and you looked cold and tired, so the driver stopped.', opts: ['He felt sorry for you', 'He was grateful to you', 'He left you behind', 'He searched for you'], a: 'He felt sorry for you', why: '<b>feel sorry for (someone)</b> = sentir pena por alguien. No confundir con <i>I\'m sorry</i> (disculpa).' },
          { q: 'The driver could not fix your car, so he took you to a garage in his own car.', opts: ['He gave you a ride', 'He took care of you', 'He returned you', 'He dropped you'], a: 'He gave you a ride', why: '<b>give (someone) a ride</b> = llevar a alguien en coche.' },
          { q: 'After all that help, you want to say a big thank you to the driver.', opts: ['I was so grateful to him', 'I felt sorry for him', 'I was in trouble', 'I contacted him'], a: 'I was so grateful to him', why: '<b>be grateful to (someone) for (doing) something</b>. Preposición: <i>to</i> la persona, <i>for</i> la acción.' },
          { q: 'You got sick and your wife made you soup, gave you medicine and stayed with you.', opts: ['She took care of you', 'She figured you out', 'She located you', 'She dropped you'], a: 'She took care of you', why: '<b>take care of (someone)</b> = cuidar de alguien.' },
          { q: 'A person you do not know says: "Don\'t worry, I\'ll pay for your lunch."', opts: ['A stranger offered to pay', 'A stranger returned the lunch', 'A stranger searched for the lunch', 'A stranger dropped the lunch'], a: 'A stranger offered to pay', why: '<b>a stranger</b> = un desconocido. <b>offer <i>to</i> + infinitivo</b>, nunca <i>offer paying</i>.' },
          { q: 'You call your roommate and send her an email, but she never answers.', opts: ['You tried to contact her', 'You located her', 'You returned her', 'You discovered her'], a: 'You tried to contact her', why: '<b>contact</b> = ponerse en contacto. Es transitivo: <i>contact her</i>, no <i>contact with her</i>.' },
        ] },

        { label: 'Verbos separables', type: 'mcq', eyebrow: 'Phrasal verbs', title: '¿Dónde va el objeto?', intro: 'Dos verbos de la unidad se pueden partir: <b>leave (something) behind</b> y <b>get (something) back</b>. Con un <b>pronombre</b> (it, them, her) la separación es <b>obligatoria</b>.', pool: 7, items: [
          { q: 'I think I ___ on the bus. (my phone)', opts: ['left my phone behind', 'left behind my phone', 'behind left my phone', 'left my phone back'], a: 'left my phone behind', why: 'Con un sustantivo valen las dos posiciones, pero <i>left my phone behind</i> es la más natural.' },
          { q: 'I think I ___ on the bus. (it)', opts: ['left it behind', 'left behind it', 'behind left it', 'left it off'], a: 'left it behind', why: 'Con pronombre la separación es obligatoria: <b>left <i>it</i> behind</b>. Nunca <i>left behind it</i>.' },
          { q: 'A boy found my wallet, so I ___ the same day.', opts: ['got it back', 'got back it', 'returned it back', 'got back'], a: 'got it back', why: '<b>get (something) back</b> con pronombre → <b>got <i>it</i> back</b>.' },
          { q: 'She lost her keys last month and she never ___.', opts: ['got them back', 'got back them', 'get them back', 'gets back them'], a: 'got them back', why: 'Pasado (<i>last month</i>) + pronombre entre medias: <b>got them back</b>.' },
          { q: 'I ___ the house ___ my driver\'s license.', opts: ['searched / for', 'searched for / —', 'searched / to', 'looked / for'], a: 'searched / for', why: '<b>search</b> + el sitio + <b>for</b> + lo que buscas: <i>I searched the house for my license.</i>' },
          { q: 'Most of the apples have ___ the trees.', opts: ['fallen off', 'fallen down', 'dropped off', 'fallen behind'], a: 'fallen off', why: '<b>fall off</b> (+ el sitio del que se cae). <i>Drop</i> lleva sujeto humano: tú dejas caer algo.' },
          { q: 'My car ___ on the highway yesterday.', opts: ['broke down', 'broke off', 'fell down', 'dropped down'], a: 'broke down', why: '<b>break down</b> = averiarse. Pasado irregular: <i>break → broke</i>.' },
          { q: "I couldn't ___ what to do.", opts: ['figure out', 'figure off', 'search out', 'locate out'], a: 'figure out', why: '<b>figure out</b> = averiguar. <i>What to do</i> va detrás.' },
          { q: 'He stopped and ___ to a garage.', opts: ['gave me a ride', 'gave a ride me', 'gave me a drive', 'made me a ride'], a: 'gave me a ride', why: '<b>give someone a ride</b>: la persona va justo detrás de <i>give</i>.' },
          { q: 'My wife ___ me really well when I was sick.', opts: ['took care of', 'took care', 'cared of', 'took care for'], a: 'took care of', why: '<b>take care <i>of</i> someone</b>. La preposición <i>of</i> no se cae nunca.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Simple past · Past continuous', title: 'Las dos piezas de una historia', html: `
          <p style="margin:8px 0 14px">Casi toda historia en inglés se cuenta con dos tiempos: el <b>past continuous</b> pone el <i>escenario</i> (una acción larga, en marcha) y el <b>simple past</b> trae el <i>suceso</i> que la interrumpe y hace avanzar la historia.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Uso</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>Simple past</b> (+)</td><td>acción terminada en un momento concreto</td><td>I <b>dropped</b> my phone in the pool yesterday.</td><td>yesterday, last week, in 2018</td></tr>
            <tr><td><b>Simple past</b> (−)</td><td><i>didn't</i> + verbo <b>base</b></td><td>He <b>didn't go</b> to Rio. He <b>went</b> to Buenos Aires.</td><td>tras <i>didn't</i>, el verbo NO lleva pasado</td></tr>
            <tr><td><b>Simple past</b> (?)</td><td><i>Did</i> + sujeto + verbo <b>base</b> + ?</td><td><b>Did</b> Jorge <b>become</b> an actor?</td><td>Yes, he <b>did</b>. / No, he <b>didn't</b>.</td></tr>
            <tr><td><b>Wh- question</b></td><td>palabra interrogativa + <i>did</i> + sujeto + base</td><td><b>Where did</b> Sarah <b>move</b> to?</td><td><i>How did you <b>lose</b> your purse?</i> (no <i>lost</i>)</td></tr>
            <tr><td><b>Past continuous</b></td><td>acción larga, en progreso, que sirve de fondo</td><td>I <b>was talking</b> to my neighbor…</td><td>was / were + -ing</td></tr>
            <tr><td><b>Los dos juntos</b></td><td>lo largo + lo que lo corta</td><td>I <b>was getting off</b> the bus <b>when</b> I <b>noticed</b> I didn't have my camera.</td><td>lo corto siempre en simple past</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:18px">when / while y la coma</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Conector</th><th>Va delante de…</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>when</b></td><td>normalmente el <b>simple past</b> (el suceso corto)</td><td>I was leaving the bank <b>when</b> I <b>discovered</b> a $50 bill.</td></tr>
            <tr><td><b>when</b> / <b>while</b></td><td>el <b>past continuous</b> (la acción larga)</td><td><b>While</b> we <b>were unpacking</b> our suitcases, somebody knocked on the door.</td></tr>
            <tr><td><b>coma (,)</b></td><td>solo si la frase <b>empieza</b> por when/while</td><td><b>When</b> we were sitting in the dark<b>,</b> firefighters arrived. / Firefighters arrived <b>when</b> we were sitting in the dark.</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>El orden da igual, el sentido no.</b> <i>While I was reading a text message, the bus drove past me</i> = <i>The bus drove past me while I was reading a text message</i>. Pero <s>While the bus drove past me, I was reading a text message</s> suena mal: lo que dura es <i>reading</i>, no <i>the bus drove</i>.</div>
          <div class="hint" style="margin-top:10px"><b>Tu error a vigilar:</b> en el ejercicio de la tormenta la gramática era correcta, pero las cuatro cláusulas estaban mal emparejadas. Antes de elegir, ordena la historia: <i>heard about the storm → lights went off → called for help → sat in the dark → firefighters arrived</i>.</div>` },

        { label: 'Irregulares', type: 'match', eyebrow: 'Simple past', title: 'Empareja el infinitivo con su pasado', intro: 'Los verbos de esta unidad. Repítelos en voz alta: la mayoría cambian la vocal.', pairs: IRREG, round: 7 },

        { label: 'Elige la forma', type: 'mcq', eyebrow: 'Simple past · frases nuevas', title: 'Elige la forma correcta', pool: 8, items: [
          { blank: 1, q: 'I ___ your keys yesterday. They were under the sofa.', opts: ['found', 'find', 'finded', 'was finding'], a: 'found', why: '<i>Yesterday</i> → simple past. <b>find → found</b> (irregular).' },
          { blank: 1, q: 'Someone ___ my wallet on the train last night.', opts: ['took', 'take', 'taked', 'was taking'], a: 'took', why: '<b>take → took</b>. Suceso puntual y terminado.' },
          { blank: 1, q: 'My husband ___ home early today because he felt sick.', opts: ['came', 'come', 'comed', 'was coming'], a: 'came', why: '<b>come → came</b>.' },
          { blank: 1, q: '___ you ___ to call me?', opts: ['Did / try', 'Did / tried', 'Do / tried', 'Does / try'], a: 'Did / try', why: 'Tras <b>did</b>, el verbo va en <b>base</b>: <i>Did you try…?</i>, nunca <i>Did you tried</i>.' },
          { blank: 1, q: '___ you break your phone yesterday?', opts: ['Did', 'Does', 'Do', 'Was'], a: 'Did', why: 'Pregunta en pasado → <b>Did</b>. <i>Does</i> es presente.' },
          { blank: 1, q: 'How did you ___ your purse?', opts: ['lose', 'lost', 'losed', 'losing'], a: 'lose', why: 'Palabra interrogativa + <b>did</b> + sujeto + <b>base</b>: <i>How did you lose…?</i>' },
          { blank: 1, q: 'A: Did Alan go to Rio?  B: No, he ___. He went to Buenos Aires.', opts: ["didn't", "doesn't", "wasn't", 'not did'], a: "didn't", why: 'Respuesta corta en pasado: <i>Yes, he did. / No, he <b>didn\'t</b>.</i>' },
          { blank: 1, q: 'He ___ the books to the library after he finished the assignment.', opts: ['returned', 'return', 'was returning', 'returns'], a: 'returned', why: 'Acción terminada → simple past regular <b>returned</b>.' },
          { blank: 1, q: 'She ___ me a ride to the garage because my car had broken down.', opts: ['gave', 'give', 'gived', 'was giving'], a: 'gave', why: '<b>give → gave</b>.' },
          { blank: 1, q: 'I ___ sorry for him when I saw him waiting in the rain.', opts: ['felt', 'feeled', 'feel', 'was feeling'], a: 'felt', why: '<b>feel → felt</b>. Reacción puntual → simple past.' },
          { blank: 1, q: 'We ___ over 300 customers last week at the station.', opts: ['spoke to', 'speaked to', 'was speaking to', 'speak to'], a: 'spoke to', why: '<b>speak → spoke</b>, y siempre <i>speak <b>to</b> somebody</i>.' },
          { blank: 1, q: 'I ___ him at the lost and found office in 2018.', opts: ['met', 'meeted', 'meet', 'was meeting'], a: 'met', why: '<b>meet → met</b>, con fecha concreta (<i>in 2018</i>).' },
          { blank: 1, q: 'She ___ about it, so she never told me.', opts: ["didn't think", "didn't thought", "don't thought", 'not thought'], a: "didn't think", why: 'Tras <b>didn\'t</b>, verbo en <b>base</b>: <i>didn\'t think</i>.' },
          { blank: 1, q: 'My earring ___ off when I was at work.', opts: ['fell', 'falled', 'fall', 'felt'], a: 'fell', why: '<b>fall → fell</b>. Cuidado: <i>felt</i> es el pasado de <b>feel</b>.' },
        ] },

        { label: 'Larga o corta', type: 'mcq', eyebrow: 'Past continuous vs simple past', title: '¿Qué acción es la larga y cuál la que interrumpe?', pool: 8, items: [
          { blank: 1, q: 'I ___ to my neighbor when we heard about the storm.', opts: ['was talking', 'talked', 'talk', 'have talked'], a: 'was talking', why: 'Hablar es la acción larga de fondo → past continuous. La noticia la interrumpe.' },
          { blank: 1, q: 'While we were bringing the animals inside, the storm ___.', opts: ['arrived', 'was arriving', 'arrives', 'has arrived'], a: 'arrived', why: 'El suceso que corta la acción larga va en <b>simple past</b>.' },
          { blank: 1, q: 'I was leaving the bank ___ I discovered a $50 bill on the ground.', opts: ['when', 'while', 'during', 'so'], a: 'when', why: '<b>when</b> introduce el simple past (el suceso corto). <i>While</i> se usa con la acción larga.' },
          { blank: 1, q: '___ I was giving her the money, a woman came up to the counter.', opts: ['While', 'When did', 'During', 'So'], a: 'While', why: '<b>While</b> + past continuous. Además, al empezar la frase lleva coma.' },
          { blank: 1, q: 'I ___ off the bus when I noticed I didn\'t have my camera.', opts: ['was getting', 'got', 'get', 'have got'], a: 'was getting', why: 'Bajar del bus es el proceso largo; <i>noticed</i> es el suceso.' },
          { blank: 1, q: 'Last week I ___ through some boxes when my coworker asked me how many phones we had.', opts: ['was looking', 'looked', 'look', 'have looked'], a: 'was looking', why: 'Acción en progreso interrumpida por la pregunta del compañero.' },
          { blank: 1, q: 'When we were sitting in the dark, firefighters ___ to help us.', opts: ['arrived', 'were arriving', 'arrive', 'had arrive'], a: 'arrived', why: 'La llegada es puntual → simple past. (Esta es la frase que fallaste en el curso.)' },
          { blank: 1, q: 'My car ___ on the highway and I couldn\'t figure out what to do.', opts: ['broke down', 'was breaking down', 'breaks down', 'has broken down'], a: 'broke down', why: 'Una avería es un suceso puntual, no una acción larga.' },
          { blank: 1, q: 'I was sitting in the living room ___ my kids appeared suddenly.', opts: ['when', 'while', 'during', 'and then while'], a: 'when', why: '<b>when</b> + simple past (<i>appeared</i>). <i>Suddenly</i> confirma que es el suceso corto.' },
          { blank: 1, q: 'While I ___ a text message, the bus drove past me.', opts: ['was reading', 'read', 'have read', 'reading'], a: 'was reading', why: 'Lo que dura es <i>reading</i>; el bus pasando es el suceso puntual.' },
          { q: 'Which sentence is correct?', opts: ['While I was reading a text message, the bus drove past me.', 'While the bus drove past me, I was reading a text message.', 'While I read a text message, the bus was driving past me.', 'When I was reading a text message, the bus was driving past me.'], a: 'While I was reading a text message, the bus drove past me.', why: '<i>While</i> va con la acción larga (<i>was reading</i>) y el suceso corto va en simple past.' },
          { q: 'Where is the comma correct?', opts: ['When we were sitting in the dark, firefighters arrived.', 'Firefighters arrived, when we were sitting in the dark.', 'When we were sitting in the dark firefighters arrived.', 'While, we were sitting in the dark firefighters arrived.'], a: 'When we were sitting in the dark, firefighters arrived.', why: 'Coma solo si la frase <b>empieza</b> por when/while, y va al final de esa primera cláusula.' },
          { blank: 1, q: 'She said she ___ for it on the ground outside the bank, but she couldn\'t find it.', opts: ['searched', 'was searching for', 'search', 'searches'], a: 'searched', why: '<i>Search <b>for</b></i> ya está en la frase: la forma que falta es el pasado simple <b>searched</b>.' },
          { blank: 1, q: 'I ___ lunch at a food truck when I realized I didn\'t have my wallet.', opts: ['was getting', 'got', 'get', 'have got'], a: 'was getting', why: 'Comprar el almuerzo es el proceso; darse cuenta es el suceso.' },
        ] },

        { label: 'El orden de la historia', type: 'mcq', eyebrow: 'Tu error del curso', title: 'Completa la historia de la tormenta', intro: 'Esta es la historia que fallaste en el curso. Ordénala mentalmente antes de responder: <i>oímos lo de la tormenta → se fue la luz → pedimos ayuda → nos quedamos a oscuras → llegaron los bomberos</i>.', items: [
          { blank: 1, q: 'I was talking to my neighbor ___.', opts: ['when we heard about the storm', 'when the lights went off', 'it arrived', 'firefighters arrived to help us'], a: 'when we heard about the storm', why: 'Es el principio de la historia: charlando tranquilamente, llega la noticia de la tormenta.' },
          { blank: 1, q: 'While we were bringing the animals inside, ___.', opts: ['it arrived', 'firefighters arrived to help us', 'when the lights went off', 'we were calling for help'], a: 'it arrived', why: '<i>It</i> = <i>the storm</i>. Mientras metemos los animales, la tormenta llega.' },
          { blank: 1, q: 'We were calling for help ___.', opts: ['when the lights went off', 'when we heard about the storm', 'it arrived', 'firefighters arrived to help us'], a: 'when the lights went off', why: 'Estamos pidiendo ayuda y en ese momento se va la luz.' },
          { blank: 1, q: 'When we were sitting in the dark, ___.', opts: ['firefighters arrived to help us', 'it arrived', 'when the lights went off', 'we heard about the storm'], a: 'firefighters arrived to help us', why: 'Final de la historia: a oscuras, llegan los bomberos. No puede ser <i>it arrived</i>: la tormenta ya había llegado.' },
          { q: '¿Qué pregunta te ayuda a elegir la cláusula correcta?', opts: ['¿Qué pasó antes y qué pasó después en la historia?', '¿Cuál de las dos frases es más larga?', '¿Cuál lleva coma?', '¿Cuál empieza por when?'], a: '¿Qué pasó antes y qué pasó después en la historia?', why: 'La gramática ya la dominas; lo que fallaba era la <b>secuencia lógica</b>.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>didn\'t</i>, <i>couldn\'t</i>, <i>I\'m</i>).',
          sentences: [
            "I can't find my cell phone. I think I left it behind on the bus.",
            'I dropped my wallet on the street and a young boy found it.',
            'My earring fell off when I was at work, and now I can\'t find it.',
            "I searched the house for my driver's license, but I couldn't find it.",
            'I was sitting in the living room when my kids appeared suddenly.',
            'My car broke down on the highway and I couldn\'t figure out what to do.',
            'A driver saw that I was in trouble and he stopped to help me.',
            'He gave me a ride to a garage and I was so grateful to him.',
            'I was leaving the bank when I discovered a fifty dollar bill on the ground.',
            'While we were unpacking our suitcases, somebody knocked on the door.',
            'Did you locate the headphones you lost last week?',
            "You're not going to believe this. She's studying here, too.",
          ] },

        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for gist', title: 'Escucha el diálogo y responde', intro: 'Un diálogo corto con varias voces. Escúchalo entero antes de responder.',
          lines: [
            ['Nadia', "You'll never guess what happened to me on Friday."],
            ['Tom', 'What? Tell me.'],
            ['Nadia', 'I was getting off the train at Central Station when I noticed my backpack was gone. My laptop was inside.'],
            ['Tom', "You're kidding! Did you go back for it?"],
            ['Nadia', "I searched the platform for twenty minutes, but it had disappeared. So I went to the lost and found office and gave them my contact information."],
            ['Tom', 'And did they locate it?'],
            ['Nadia', 'Three days later a stranger returned it to the office. Everything was still inside, even my headphones. I got it back on Monday.'],
            ['Tom', 'Seriously? That\'s incredible. You were very lucky.'],
            ['Nadia', "I know. I can't believe it. I'm so grateful to whoever found it."],
          ],
          questions: [
            { q: 'What was Nadia doing when she noticed the backpack was gone?', opts: ['She was getting off the train', 'She was buying a ticket', 'She was talking to a stranger', 'She was working on her laptop'], a: 'She was getting off the train', why: 'Past continuous (<i>was getting off</i>) = la acción larga; <i>noticed</i> es el suceso que la interrumpe.' },
            { q: 'What did Nadia do first after losing the backpack?', opts: ['She searched the platform', 'She called the police', 'She went home', 'She bought a new laptop'], a: 'She searched the platform', why: '"I searched the platform for twenty minutes."' },
            { q: 'How did she get the backpack back?', opts: ['A stranger returned it to the lost and found office', 'She located it with an app', 'A coworker found it on the train', 'The police discovered it in a park'], a: 'A stranger returned it to the lost and found office', why: '<b>return</b> = devolver algo al sitio de donde vino; ella luego <b>got it back</b>.' },
            { q: 'Which expression does Tom use to react with surprise?', opts: ["You're kidding!", 'Never mind.', 'That\'s a shame.', 'Take care of it.'], a: "You're kidding!", why: 'Reacciones de sorpresa: <i>You\'re kidding! / Seriously? / Are you serious? / Is that true?</i>' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Something you lost', task: 'Cuenta en 60 segundos algo que perdiste: qué era, qué estabas haciendo cuando pasó (past continuous), qué hiciste después (simple past) y si lo recuperaste.', model: 'Modelo: "Last year I lost my phone. I was getting off a bus when it fell off my lap. I searched the street for ten minutes, but it had disappeared. I never got it back."', tags: ['was', 'when', 'searched', 'lost', 'fell off', 'get it back', 'left it behind'] },
          { t: 'Help from a stranger', task: 'Describe una vez en la que alguien te ayudó o tú ayudaste a alguien. Usa al menos tres expresiones de <i>needing and giving help</i>.', model: 'Modelo: "My car broke down on the highway. I couldn\'t figure out what to do. A driver saw that I was in trouble and felt sorry for me. He gave me a ride to a garage. I was so grateful to him."', tags: ['broke down', 'figure out', 'in trouble', 'sorry for', 'a ride', 'grateful', 'stranger'] },
          { t: 'Give surprising news', task: 'Da una noticia sorprendente (real o inventada) usando <i>You\'ll never guess… / You\'re not going to believe this… / I had a real surprise…</i> y explica qué pasó.', model: 'Modelo: "You\'ll never guess who I saw this morning. I was getting on the bus when someone shouted my name. It was an old school friend. You\'re not going to believe this: she lives on my street now!"', tags: ["you'll never guess", 'believe this', 'real surprise', 'was', 'when', "can't believe it"] },
          { t: 'React with surprise', task: 'Escucha (o imagina) estas tres noticias y reacciona con una expresión distinta cada vez: "Luka\'s getting married." / "They found 173 phones last week." / "A passenger left a wild turkey on the train."', model: 'Modelo: "Seriously? — You\'re kidding! Is that true? — A turkey? A turkey! Are you serious?"', tags: ['seriously', 'kidding', 'is that true', 'are you serious', 'incredible'] },
          { t: 'A time you were grateful', task: 'Cuenta una historia de 60 segundos sobre una vez que estuviste agradecido. Empieza con una expresión de storytelling (<i>One afternoon… / When I was a child…</i>) y usa <i>then</i> y <i>a few minutes later</i>.', model: 'Modelo: "When I was a child, I got lost in a supermarket. One minute my mother was next to me, and then she disappeared. I was calling for her when a woman took care of me. A few minutes later my mother appeared. I was so grateful to that stranger."', tags: ['when i was', 'one', 'then', 'later', 'grateful', 'took care of', 'disappeared'] },
        ] },

        { label: 'Entonación de sorpresa', type: 'stress', eyebrow: 'Pronunciación', title: 'Showing surprise: la voz sube', intro: 'Al reaccionar con sorpresa, la entonación <b>sube</b> al final y la primera sílaba fuerte se alarga. Escucha y repite exagerando.',
          pairs: [
            ['SE-riously? ↗', 'Seriously?'],
            ["You're KID-ding!", "You're kidding!"],
            ['Are you SE-rious? ↗', 'Are you serious?'],
            ['Is THAT true? ↗', 'Is that true?'],
            ["I CAN'T believe it!", "I can't believe it!"],
            ["You'll NE-ver guess…", "You'll never guess what happened."],
            ["You're NOT going to be-LIEVE this…", "You're not going to believe this."],
            ["That's in-CRE-dible!", "That's incredible!"],
            ['Repetir para sorprenderse: Phones. PHONES, phones, phones!', 'Phones. Phones, phones, phones!'],
            ['A TUR-key? A TURKEY! ↗', 'A turkey? A turkey!'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Scanning · summarizing · inferring meaning', title: 'The busiest lost and found in the world', intro: 'Lee una vez rápido para la idea general (<i>scanning</i>). Luego responde. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Every big city has a lost and found office, but the one in Tokyo may be the busiest on the planet. More than three million items are <b>handed in</b> there every year. Police officers collect the things people leave behind on trains, in taxis and in parks, and they keep them for three months before deciding what to do with them.',
            'Most of the objects are completely ordinary. Umbrellas <b>pile up</b> by the thousand, and phones, keys and wallets arrive in boxes every single morning. But the staff also see stranger things. One officer remembers a box of live crabs, a small stone statue of a dog, and once a very tired parrot that somebody had left on a bench in a station.',
            'Getting your things back is simple, but you need patience. You go to the counter, describe what you lost, and say exactly when and where it disappeared. An officer searches the computer, and if the item is there you <b>claim</b> it with a signature and a document. Around two thirds of lost wallets go home with their owners, usually with the money still inside.',
            'Why do so many people return what they find? Children in Japan learn very early that taking a lost object to the police is the normal thing to do. There is also a legal <b>reward</b>: if you hand in money and nobody claims it in three months, it becomes yours. Honesty, it seems, pays.',
          ],
          main: [
            { q: 'Strange objects also arrive, like crabs and a parrot.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: tras los objetos corrientes, menciona los raros.' },
            { q: 'How the office works and what you have to do to get your things.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3 describe el mostrador, la descripción y la firma.' },
            { q: 'The size of the office and how long they keep things.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1: tres millones de objetos al año y tres meses de custodia.' },
            { q: 'A cultural and a legal reason for returning lost things.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: la educación desde niños y la recompensa legal.' },
          ],
          infer: [
            { q: '<b>handed in</b> (paragraph 1)', opts: ['given to the people in charge', 'thrown away', 'sold to a shop'], a: 'given to the people in charge', why: 'Si la policía los recoge y los guarda, es que alguien los <i>entrega</i>. <i>Hand in</i> = entregar.' },
            { q: '<b>pile up</b> (paragraph 2)', opts: ['form a big quantity, one on top of another', 'break easily', 'disappear quickly'], a: 'form a big quantity, one on top of another', why: '<i>By the thousand</i> indica cantidad enorme: se amontonan.' },
            { q: '<b>claim</b> (paragraph 3)', opts: ['say officially that something is yours and take it', 'complain about something', 'search for something'], a: 'say officially that something is yours and take it', why: 'Lo haces "with a signature and a document": es reclamar algo tuyo.' },
            { q: '<b>reward</b> (paragraph 4)', opts: ['something good you get for doing the right thing', 'a fine you have to pay', 'a police report'], a: 'something good you get for doing the right thing', why: 'Si nadie reclama el dinero, te lo quedas: es el premio por entregarlo.' },
          ],
          think: 'Si encontraras una cartera con 500 soles en la calle, ¿qué harías? Escribe dos frases en inglés empezando por <i>If I found a wallet, I would…</i> y <i>Once I found/lost…</i> usando el vocabulario de la unidad.' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Corrige la frase', type: 'fix', eyebrow: 'Error correction', title: 'Reescribe la frase corrigiendo el error', intro: 'Mezcla de los errores del curso y de los fallos típicos de este tema. Cada frase tiene 1-2 errores.', items: [
          { bad: 'I find your keys yesterday.', good: 'I found your keys yesterday.', why: '<i>Yesterday</i> exige <b>simple past</b>, y <b>find</b> es irregular: <b>found</b>.' },
          { bad: 'Someone take my wallet and my husband come home early.', good: 'Someone took my wallet and my husband came home early.', why: 'Dos irregulares del curso: <b>take → took</b>, <b>come → came</b>.' },
          { bad: 'Did you tried to call me?', good: 'Did you try to call me?', why: 'Tras <b>did</b> el verbo va en <b>forma base</b>. El pasado ya lo marca <i>did</i>.' },
          { bad: 'Does you break your phone yesterday? How did you lost your purse?', good: 'Did you break your phone yesterday? How did you lose your purse?', why: 'Pasado → <b>Did</b> (no <i>Does</i>), y siempre <b>did + base</b>: <i>lose</i>, no <i>lost</i>.' },
          { bad: 'I was leaving the bank while I discovered a $50 bill on the ground.', good: 'I was leaving the bank when I discovered a $50 bill on the ground.', why: '<b>when</b> introduce el suceso corto en simple past. <i>While</i> acompaña a la acción larga (<i>was leaving</i>).' },
          { bad: 'While I was reading a text message the bus drove past me.', good: 'While I was reading a text message, the bus drove past me.', why: 'Si la frase <b>empieza</b> por <i>when</i> o <i>while</i>, se pone <b>coma</b> al final de esa primera cláusula.' },
          { bad: 'My car was breaking down on the highway and I couldn\'t figured out what to do.', good: 'My car broke down on the highway and I couldn\'t figure out what to do.', why: 'Una avería es un suceso puntual → <b>simple past</b>. Y tras <b>couldn\'t</b>, verbo en base: <b>figure out</b>.' },
          { bad: 'I think I left behind it on the bus.', good: 'I think I left it behind on the bus.', why: 'Con <b>pronombre</b>, los phrasal verbs separables se parten obligatoriamente: <b>left <i>it</i> behind</b>.' },
          { bad: 'A stranger offered paying for me and I was very grateful him.', good: 'A stranger offered to pay for me and I was very grateful to him.', why: '<b>offer <i>to</i> + infinitivo</b> y <b>grateful <i>to</i> somebody</b>.' },
          { bad: 'My wife took care me really well when I was sick.', good: 'My wife took care of me really well when I was sick.', why: '<b>take care <i>of</i> someone</b>: la preposición <i>of</i> es obligatoria.' },
          { bad: 'When we were sitting in the dark, the storm arrived and then the lights went off.', good: 'When we were sitting in the dark, firefighters arrived to help us.', why: '<b>Tu error del curso</b>: la tormenta y el apagón ya habían ocurrido antes. A oscuras llegan los <i>firefighters</i>. Ordena la historia antes de elegir.' },
        ] },

        { label: 'Añade la expresión narrativa', type: 'soft', eyebrow: 'Storytelling expressions', title: 'Convierte los hechos en una historia', explain: 'Una historia no es una lista de hechos. Únelos con expresiones de tiempo: <b>When I was a child…</b>, <b>One afternoon / One morning…</b>, <b>Then…</b>, <b>A few minutes later…</b>, <b>In the end…</b>, <b>Suddenly…</b>. Reescribe cada par de hechos como <b>una sola frase o dos</b> con al menos una de esas expresiones.',
          missing: 'Falta una expresión de storytelling (<i>one afternoon, then, a few minutes later, in the end, when I was a child…</i>)',
          pattern: /\b(one (morning|afternoon|evening|day|night)|when i was|a few (minutes|hours|days|weeks) later|then|in the end|suddenly|later that (day|night|week)|last (week|year|night|month))\b/i,
          items: [
            { h: '"I was swimming in the lake." + "Dark clouds appeared."', a: 'One afternoon, I was swimming in the lake when dark clouds appeared.' },
            { h: '"The lights went off." + "Firefighters arrived to help us."', a: 'The lights went off, and a few minutes later firefighters arrived to help us.' },
            { h: '"I lost my wallet on the bus." + "A stranger returned it to the office."', a: 'Last week I lost my wallet on the bus, and in the end a stranger returned it to the office.' },
            { h: '"My car broke down." + "A driver stopped to help me."', a: 'One morning my car broke down on the highway, and then a driver stopped to help me.' },
            { h: '"I got sick." + "My wife took care of me."', a: 'Last month I got sick, and then my wife took care of me for a week.' },
          ] },

        { label: 'Escribe tu historia', type: 'comment', eyebrow: 'Writing task', title: 'A short story', intro: 'Como en el curso: escribe 70-130 palabras sobre <b>una vez que sentiste pena por alguien, estuviste en apuros, estuviste agradecido o te perdiste</b>. Responde: ¿qué pasó?, ¿dónde y cuándo?, ¿cómo te sentiste?, ¿alguien te ayudó? La checklist se marca sola.',
          placeholder: 'When I was a child, I got lost in a supermarket…', min: 70, max: 130, need: 4, checks: [
            { label: 'Empiezo con una expresión de storytelling (<i>When I was a child… / One afternoon… / Last week…</i>)', re: /\b(one (morning|afternoon|evening|day|night)|when i was|last (week|year|night|month)|a few years ago|once)\b/ },
            { label: 'Uso <b>past continuous</b> para la acción larga (<i>I was walking… / We were waiting…</i>)', re: /\b(was|were)\s+\w+ing\b/ },
            { label: 'Uso <b>when</b> o <b>while</b> para unir la acción larga con el suceso', re: /\b(when|while)\b/ },
            { label: 'Digo cómo me sentí (<i>I was scared / grateful / worried…</i>)', re: /\b(i (felt|was)\s+(so |really |very )?(scared|grateful|worried|nervous|embarrassed|relieved|upset|happy|sad|lucky)|i felt sorry)/ },
            { label: 'Uso al menos dos expresiones de la unidad (<i>lost, left behind, in trouble, gave me a ride, took care of…</i>)', words: ['lost', 'left it behind', 'left behind', 'fell off', 'dropped', 'searched for', 'disappeared', 'appeared', 'discovered', 'located', 'returned', 'got it back', 'broke down', 'figure out', 'figured out', 'in trouble', 'sorry for', 'a ride', 'grateful', 'took care of', 'stranger', 'contact'] },
            { label: 'Añado una expresión de secuencia en medio (<i>Then… / A few minutes later… / In the end…</i>)', re: /\b(then|a few (minutes|hours|days) later|in the end|later that (day|night)|suddenly|after that)\b/ },
          ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Dar y reaccionar a noticias sorprendentes', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Giving surprising news</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>You'll never guess…</li><li>You're not going to believe this…</li><li>I had a real surprise…</li><li>I can't believe it.</li></ul></div>
          <div><h3>Reacting to surprising news</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Is that true?</li><li>Are you serious?</li><li>You're kidding!</li><li>Seriously?</li><li>That's incredible!</li></ul></div>
          <div class="hint small"><b>Real-world strategy: repetir palabras para expresar sorpresa.</b><br>Repite la palabra clave del interlocutor, o repítela tú mismo para dar énfasis:<br>— <i>What do people lose most often?</i><br>— <i><b>Phones. Phones, phones, phones!</b></i><br>— <i>A wild turkey.</i> — <i><b>A turkey?</b> A <b>turkey</b>!</i><br><br>Funciona como el "¿cómo?" español, pero suena natural y gana tiempo para pensar.</div>
          <div class="hint small"><b>Ojo con el registro.</b> <i>You're kidding!</i> y <i>Seriously?</i> son informales, con amigos y compañeros. Con un cliente o alguien mayor usa <i>Really?</i>, <i>Is that true?</i> o <i>That's incredible.</i><br><br><b>Pronunciación:</b> la voz <b>sube</b> al final en las preguntas de sorpresa (<i>Seriously? ↗</i>) y se alarga la sílaba tónica (<i>You're KID-ding!</i>).</div></div>` },

        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          [
            "Allie: I had a real surprise this morning. I was getting on the bus, and someone shouted my name.",
            'Tonya: Who?',
            'Allie: An old school friend from Seoul. She didn\'t even know I was studying here.',
            "Tonya: You're kidding! What's she doing in Seattle?",
            "Allie: You're not going to believe this. She's studying here, too.",
            "Tonya: That's incredible!",
          ],
          [
            "Man: Luka's getting married!",
            'Woman: Seriously?',
            "Man: Yeah. He says the wedding's happening in two weeks.",
            "Woman: You're kidding! Is that true?",
            'Man: Yeah. He just emailed us an invitation. Look!',
          ],
          [
            "A: I had a real surprise yesterday.",
            'B: Really? What happened?',
            "A: You're not going to believe this, but I won that short story competition I entered.",
            'B: Seriously? That\'s amazing!',
            "A: I know. I can't believe it.",
          ],
          [
            'A: Oh, no. I can\'t find my phone. Maybe I left it behind at the gym.',
            'B: No way! You lost your phone again?',
            'A: I think so. I hope someone returns it to the front desk.',
            'B: You lose something every day! Did you locate the headphones you lost last week?',
            'A: No, I searched for them everywhere! I looked in every room.',
          ],
        ] },

        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', pool: 8, items: [
          { q: 'Quieres anunciar una noticia sorprendente y crear expectación antes de contarla.', opts: ["You'll never guess what happened.", 'Seriously?', "You're kidding!", 'Is that true?'], a: "You'll never guess what happened.", why: 'Las cuatro frases de <b>dar</b> noticias van antes de contar; las de reaccionar van después de oírla.' },
          { q: 'Tu amigo te dice que encontró 173 teléfonos en una semana. Reacciona con sorpresa.', opts: ['Are you serious?', "You'll never guess.", "You're not going to believe this.", 'I had a real surprise.'], a: 'Are you serious?', why: 'Reaccionar → <i>Are you serious? / Seriously? / You\'re kidding! / Is that true?</i>' },
          { q: 'Quieres subrayar lo increíble que es algo que TÚ acabas de descubrir.', opts: ["I can't believe it.", 'Is that true?', 'Seriously?', 'Are you serious?'], a: "I can't believe it.", why: '<i>I can\'t believe it</i> lo dices de algo propio; las preguntas se las haces al otro.' },
          { q: 'Empiezas a contar lo que te pasó en el bus esta mañana.', opts: ['I had a real surprise this morning.', "That's incredible!", 'Seriously?', "You're kidding!"], a: 'I had a real surprise this morning.', why: 'Introduce la historia y ya anuncia que es sorprendente.' },
          { q: 'Le vas a contar el detalle más fuerte de la historia, justo antes de soltarlo.', opts: ["You're not going to believe this.", 'Is that true?', "That's incredible!", 'Seriously?'], a: "You're not going to believe this.", why: 'Frase-puente antes del remate de la historia.' },
          { q: 'Tu jefe te cuenta una noticia rara. Quieres sonar sorprendido pero formal.', opts: ['Really? Is that true?', "You're kidding!", 'No way!', 'Seriously?'], a: 'Really? Is that true?', why: '<i>You\'re kidding! / No way! / Seriously?</i> son informales. Con un jefe o un cliente: <i>Really? / Is that true?</i>' },
          { q: 'Alguien te dice: "A passenger left a wild turkey on the train." Usa la estrategia de repetir palabras.', opts: ['A turkey? A turkey!', 'Yes, of course.', 'Never mind.', "I'm sorry to hear that."], a: 'A turkey? A turkey!', why: '<b>Repeating words</b>: repites la palabra clave para expresar sorpresa y ganar un segundo para pensar.' },
          { q: '"What do people lose most often?" — Quieres responder con énfasis.', opts: ['Phones. Phones, phones, phones!', 'Maybe phones, I think.', 'I can\'t believe it.', 'Are you serious?'], a: 'Phones. Phones, phones, phones!', why: 'La repetición marca énfasis, como en la entrevista de Levi en el reading del curso.' },
          { q: 'Tu amiga dice que se casa en dos semanas. Reaccionas con una sola palabra.', opts: ['Seriously?', "You'll never guess.", 'I had a real surprise.', 'Take care of it.'], a: 'Seriously?', why: '<i>Seriously?</i> con entonación ascendente es la reacción más corta y natural.' },
          { q: 'Alguien acaba de enseñarte la prueba de la noticia (una invitación, una foto).', opts: ["That's incredible!", "You'll never guess.", 'Is that true?', 'Are you serious?'], a: "That's incredible!", why: 'Ya no dudas de la noticia; ahora comentas lo asombrosa que es.' },
          { q: 'Perdiste el móvil otra vez y tu amigo no se lo cree.', opts: ['No way! You lost your phone again?', "You'll never guess.", 'I had a real surprise.', "That's incredible!"], a: 'No way! You lost your phone again?', why: '<i>No way!</i> es sorpresa informal con un punto de incredulidad o reproche.' },
          { q: '¿Cuál de estas NO sirve para reaccionar con sorpresa?', opts: ["You'll never guess…", "You're kidding!", 'Seriously?', 'Is that true?'], a: "You'll never guess…", why: '<i>You\'ll never guess…</i> se usa para <b>dar</b> la noticia, no para reaccionar a ella.' },
        ] },
      ] },
    ],
  };
})();
