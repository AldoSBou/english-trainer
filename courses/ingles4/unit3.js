/* ===========================================================
   ingles4/unit3.js — Inglés 4 · Unit 3: What's it worth?
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Vocabulario base ---------- */
  /* Lesson 1 · Talking about time and money: [palabra, def ES, def EN corta, ejemplo, pregunta] */
  const TIME = [
    ['balance', 'equilibrio (n.) / equilibrar (v.): dar la importancia justa a cada cosa', 'give the correct amount of importance to each thing', 'Having a good work-life balance is important to me.', '¿Tienes un buen equilibrio entre trabajo y vida personal?'],
    ['be worth it', 'valer la pena (a pesar del esfuerzo)', 'be useful or enjoyable despite needing a lot of effort', 'The hike was really long and difficult, but it was worth it.', '¿Qué cosa difícil hiciste que valió la pena?'],
    ['boost', 'aumentar, impulsar, mejorar algo', 'increase or improve something', 'My coworkers celebrated my work. It really boosted my confidence.', '¿Qué cosa te sube la energía o la confianza?'],
    ["can't afford", 'no poder permitirse (no tener dinero suficiente para)', 'not have enough money to buy something', "I'll just have a small coffee. I can't afford a large one.", '¿Qué te gustaría comprar pero no puedes permitirte ahora?'],
    ['cost of living', 'costo de vida', 'the amount of money a person needs to live', 'The cost of living around here is too high.', '¿Cómo es el costo de vida en tu ciudad comparado con hace 5 años?'],
    ['lifestyle', 'estilo de vida (lo que una persona suele hacer)', "someone's way of living", 'I prefer the city lifestyle: good public transportation and lots of cafés.', '¿Cómo describirías tu estilo de vida en tres palabras?'],
    ['quality of life', 'calidad de vida (satisfacción y comodidad)', 'the level of satisfaction and comfort a person enjoys', 'My parents moved to the country. Their quality of life is much better.', '¿Qué mejoraría más tu calidad de vida?'],
    ['standard of living', 'nivel de vida (cuánto dinero y comodidad tiene alguien)', 'how much money and comfort someone has', 'They have a high standard of living. They live very comfortably.', '¿Ha subido o bajado el nivel de vida de tu familia?'],
    ['take a salary cut', 'aceptar una reducción de sueldo', 'get less money for your work than you did before', 'I had to take a salary cut, but it was a good decision. I am much happier.', '¿Aceptarías cobrar menos por un trabajo que te gusta más?'],
    ['time well spent', 'tiempo bien invertido', 'a good use of time', 'Getting together with my extended family is always time well spent.', '¿Qué actividad de tu semana es "tiempo bien invertido"?'],
    ['trade', 'intercambiar (v.) / comercio (n.)', 'exchange one thing for another', 'You can bring in your used clothes and trade them for something in the store.', '¿Cambiarías tu vida en la ciudad por una en el campo?'],
    ['value', 'valorar (v.) / valor, importancia (n.)', 'consider something important', 'I value having some time to myself.', '¿Qué valoras más: el tiempo o el dinero?'],
  ];
  /* Lesson 2 · Talking about prices and value: [frase, def ES, ejemplo, pregunta] */
  const PRICE = [
    ['charge for', 'cobrar por (una actividad o servicio)', 'How much do you charge for an extra shot of espresso?', '¿Cuánto cobras por tus empanadas? Dilo en inglés.'],
    ['come up with', 'ocurrírsele (un plan, una idea, una solución)', 'I came up with an idea for an app. Let me know what you think.', '¿Qué idea de negocio se te ha ocurrido últimamente?'],
    ['depend on', 'depender de', 'Should we eat in the park? Hmm, that depends on the weather.', '¿De qué depende tu plan del fin de semana?'],
    ['have an effect on', 'tener un efecto en, influir en', 'The weather really has an effect on my mood.', '¿Qué cosa tiene un efecto en tu estado de ánimo?'],
    ['invest in', 'invertir en (dinero o esfuerzo)', "I'm going to invest in some new running shoes.", '¿En qué te gustaría invertir este año?'],
    ['make the most of', 'aprovechar al máximo (porque no durará)', "I'll be in Budapest for three days, and I'd like to make the most of my time there.", '¿Cómo aprovechas al máximo tu tiempo libre?'],
    ['pay a fair price for', 'pagar un precio justo por', 'I bought a used bicycle. I think I paid a fair price for it.', '¿Cuándo pagaste un precio justo por algo de segunda mano?'],
    ['play an important role in', 'jugar un papel importante en', 'Music has always played an important role in my life.', '¿Qué juega un papel importante en tu vida?'],
    ['rely on', 'confiar en, contar con (algo o alguien)', 'I like taking the train because I can rely on it. It always arrives at the same time.', '¿En quién confías cuando tienes un problema?'],
    ['suggest a price for', 'sugerir un precio por', 'Some museums in New York City suggest a price for entry, but you can pay what you want.', '¿Sugerirías un precio o lo fijarías en tu negocio?'],
    ['take advantage of', 'aprovechar (lo bueno de una situación)', "While we're here, we should take advantage of the pool and gym.", '¿De qué oferta o situación te aprovechaste hace poco?'],
    ['treat yourself to', 'darse un gusto, permitirse algo especial', 'While walking around Rome, I treated myself to some delicious gelato.', '¿Con qué te das un gusto cuando terminas algo difícil?'],
  ];
  /* Video lesson · Public infrastructure */
  const INFRA = [
    ['infrastructure', 'infraestructura: sistemas y servicios básicos de un país', 'The video is about aging infrastructure in the U.S.', '¿Qué infraestructura de tu ciudad necesita reparación urgente?'],
    ['power supply / power cut', 'suministro eléctrico / corte de luz', 'A power cut left the whole neighborhood without electricity.', '¿Cuándo fue el último corte de luz en tu zona?'],
    ['sewer system', 'sistema de alcantarillado', 'The sewer system takes away rainwater and wastewater.', '¿Funciona bien el alcantarillado cuando llueve en tu barrio?'],
    ['mass transit', 'transporte público masivo (buses, metro, trenes)', 'Mass transit includes buses, subways and commuter railways.', '¿Usas el transporte masivo o prefieres tu propio vehículo?'],
    ['electrical grid', 'red eléctrica', 'The electrical grid moves electricity from producers to consumers.', '¿Es fiable la red eléctrica donde vives?'],
    ['broadband coverage', 'cobertura de banda ancha (internet)', 'Broadband coverage in rural areas is still poor.', '¿Tienes buena cobertura de internet en casa?'],
    ['corrode', 'corroer, dañar lentamente', 'Old water pipes corrode and can release lead.', '¿Has visto tuberías corroídas en algún edificio?'],
    ['toxic / urgently', 'tóxico / urgentemente', 'Lead is toxic, so the pipes need to be replaced urgently.', '¿Qué problema de tu ciudad hay que resolver urgentemente?'],
  ];
  const PREPS = ['for', 'with', 'on', 'in', 'of', 'to', 'at', 'about'];
  const MODS = ['way', 'a whole lot', 'much', 'a little', 'a bit', 'nearly', 'almost', 'nowhere near', 'by far'];

  /* situación → palabra (Lesson 1) */
  /* [frase con hueco, respuesta, entrada de TIME] */
  const SIT = [
    ['We moved to a smaller town because the ___ in the capital was too high for us.', 'cost of living', 'cost of living'],
    ['She works from home now, so she has a much better ___ between work and family.', 'balance', 'balance'],
    ["I'd love a new laptop, but I ___ one right now. Maybe next year.", "can't afford", "can't afford"],
    ['The course was hard and expensive, but it ___: I got a promotion.', 'was worth it', 'be worth it'],
    ['Learning to cook was ___. Now I save money every single week.', 'time well spent', 'time well spent'],
    ['He ___ to move closer to his parents. He earns less, but he is happier.', 'took a salary cut', 'take a salary cut'],
    ['A good night\'s sleep really ___ my energy the next day.', 'boosts', 'boost'],
    ["I wouldn't ___ my quiet neighborhood for a downtown apartment.", 'trade', 'trade'],
    ['My grandparents ___ family dinners more than anything else.', 'value', 'value'],
    ['Clean air, a short commute and good friends improve your ___.', 'quality of life', 'quality of life'],
    ['Countries with a high ___ usually have good salaries and comfortable housing.', 'standard of living', 'standard of living'],
    ['Since I started cycling to work, my ___ is a lot healthier.', 'lifestyle', 'lifestyle'],
  ];
  const SITW = SIT.map(s => s[1]);

  window.UNIT_DATA['ingles4/unit3'] = {
    source: "Evolve · Unit 3 · What's it worth?",
    description: 'Tiempo, dinero y valor: too / enough, cómo modificar comparaciones, pedir disculpas y explicar qué pasó, y escribir una reseña de producto.',
    cando: [
      "Decir que algo es demasiado o insuficiente con <i>too</i> y <i>(not) enough</i> en el orden correcto",
      "Comparar matizando: <i>a bit / way / a whole lot</i> + comparativo, <i>nearly / nowhere near as… as</i>, <i>by far</i>",
      "Hablar de dinero y valor: <i>be worth it</i>, <i>can't afford</i>, <i>cost of living</i>, <i>standard of living</i>, <i>rely on</i>",
      "Disculparme y dar una explicación: <i>I can't tell you how sorry I am</i>",
      "Escribir una reseña de producto con pros, contras y recomendación",
    ],
    map: [
      ['Vocabulary', '12 expresiones de tiempo y dinero (<i>cost of living, be worth it, take a salary cut…</i>), 12 frases verbales de precios y valor (<i>charge for, rely on, treat yourself to…</i>) y léxico del vídeo de infraestructura', 'Flashcards con audio, emparejar con definiciones, situación → palabra, preposiciones y verbos de las collocations'],
      ['Grammar', '<b>too</b> y <b>enough</b> (posición con adjetivo / sustantivo, + infinitivo); modificar comparaciones: <i>a bit, way, a whole lot, nearly, nowhere near, by far</i>', 'Elige la forma correcta, gradúa la comparación según la diferencia, repaso de la Unit 1'],
      ['Listening', 'Diálogo de la bici robada (Justin y Kathy), Natalie sobre reparar o comprar', 'Dictado con voz sintética y un diálogo nuevo con preguntas'],
      ['Speaking', 'Calidad de vida, comparar productos y servicios, disculparse, reseña oral; /s/ inicial', 'Retos con cronómetro y reconocimiento de voz; pronunciación de <i>s</i> + consonante'],
      ['Reading', '"Buyer beware!" — leer con detalle', 'Texto nuevo sobre cómo leer reseñas + inferir significado'],
      ['Writing', 'Reseña corta de un producto: sentimientos, características, recomendación', 'Corrige tus errores reales, gradúa comparaciones, escribe tu reseña con checklist'],
      ['Social English', '<i>I\'m so sorry · I can\'t tell you how sorry I am · You\'ll never guess what I did · It\'s not the end of the world · Don\'t beat yourself up</i>', 'Ordenar diálogos, responder a una disculpa'],
    ],
    weak: [
      '<b>Collocations</b>: elegiste <i>"a high <s>quality of life</s>"</i> → <i>a high <b>standard of living</b></i>. Se dice <b>high standard of living</b> pero <b>good quality of life</b>.',
      '<b>have an effect on</b>: escribiste <i>"The moon <s>made</s> an effect on ocean tides"</i> → <i>The moon <b>has</b> an effect on</i>. El verbo es <b>have</b>, no <i>make</i>.',
      '<b>Orden de palabras</b>: <i>"I can\'t tell you how <s>I am sorry</s>"</i> → <i>I can\'t tell you how <b>sorry I am</b></i>. Tras <i>how</i> + adjetivo, el sujeto y el verbo van después.',
      '<b>tell vs believe</b>: confundiste <i>I can\'t <b>tell</b> you how sorry I am</i> (disculpa) con <i>I can\'t <b>believe</b> I didn\'t lock it</i> (explicar qué pasó).',
    ],
    weakLink: 'Trabájalos en <b>Writing › Corrige tus frases</b> y en <b>Social English</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la expresión. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...TIME.map(t => ({ cat: 'Talking about time and money', w: t[0], def: t[1], ex: t[3], ask: t[4] })),
            ...PRICE.map(p => ({ cat: 'Talking about prices and value', w: p[0], def: p[1], ex: p[2], ask: p[3] })),
            ...INFRA.map(i => ({ cat: 'Public infrastructure (video)', w: i[0], say: i[0].replace(' / ', ', '), def: i[1], ex: i[2], ask: i[3] })),
          ] },
        { label: 'Expresión ↔ Definición', type: 'match', eyebrow: 'Time and money', title: 'Empareja la expresión con su definición', intro: 'Toca una expresión de la izquierda y luego su definición (en inglés, como en el curso) a la derecha.',
          pairs: [
            ...TIME.map(t => [t[0], t[2]]),
            ['charge for', 'ask someone to pay an amount for a service'],
            ['come up with', 'think of a plan, an idea or a solution'],
            ['rely on', 'trust someone or something'],
            ['make the most of', 'make good use of something that may not last'],
            ['take advantage of', 'use the good things in a situation'],
            ['treat yourself to', 'do or buy something special for yourself'],
          ], round: 6 },
        { label: '¿Qué expresión es?', type: 'mcq', eyebrow: 'Time and money · en contexto', title: 'Lee la situación y elige la expresión', pool: 7,
          build: ({ pick, esc }) => pick(SIT, 7).map(s => { const t = TIME.find(x => x[0] === s[2]); return { q: esc(s[0]).replace('___', '<span class="blank">?</span>'), opts: [s[1], ...pick(SITW.filter(x => x !== s[1]), 3)], a: s[1], why: `<b>${t[0]}</b> — ${t[1]}. “${t[3]}”` }; }) },
        { label: 'La preposición', type: 'mcq', eyebrow: 'Prices and value', title: 'Completa la frase verbal con su preposición', intro: 'Estas frases van SIEMPRE con la misma preposición. Apréndela como parte de la expresión.', pool: 7,
          build: ({ pick, esc }) => pick(PRICE, 7).map(p => { const parts = p[0].split(' '); const prep = parts.pop(); const stem = parts.join(' ');
            return { q: `${esc(stem)} <span class="blank">?</span> … <span class="small muted">(${esc(p[1])})</span>`, opts: [prep, ...pick(PREPS.filter(x => x !== prep), 3)], a: prep, why: `<b>${p[0]}</b> — ${p[1]}. “${p[2]}”` }; }) },
        { label: 'El verbo correcto', type: 'mcq', eyebrow: 'Collocations · tu error del curso', title: 'Elige el verbo de la collocation', intro: 'En el curso escribiste <i>"the moon <s>made</s> an effect on"</i>. El verbo fijo es <b>have</b>. Aquí practicas todos los verbos fijos de la unidad.', pool: 7, items: [
          { blank: 1, q: 'The weather really ___ an effect on my mood.', opts: ['has', 'makes', 'does', 'takes'], a: 'has', why: '<b>have an effect on</b>. Nunca <i>make an effect</i>. (Tu error del curso.)' },
          { blank: 1, q: 'Traffic noise ___ a big effect on how well I sleep.', opts: ['has', 'makes', 'gives', 'puts'], a: 'has', why: 'Otra vez <b>have an effect on</b>: <i>has a big effect on</i>.' },
          { blank: 1, q: 'You should ___ the most of your time in Lima.', opts: ['make', 'do', 'take', 'have'], a: 'make', why: '<b>make the most of</b> = aprovechar al máximo.' },
          { blank: 1, q: "Let's ___ advantage of the free trial before it ends.", opts: ['take', 'make', 'get', 'do'], a: 'take', why: '<b>take advantage of</b>. Con <i>advantage</i> el verbo es <i>take</i>.' },
          { blank: 1, q: 'I ___ up with a cheaper way to ship the car parts.', opts: ['came', 'thought', 'got', 'made'], a: 'came', why: '<b>come up with</b> = ocurrírsele una idea. Pasado: <i>came up with</i>.' },
          { blank: 1, q: 'The gallery ___ a price for the tickets, but you can pay less.', opts: ['suggests', 'tells', 'says', 'puts'], a: 'suggests', why: '<b>suggest a price for</b> = sugerir un precio.' },
          { blank: 1, q: 'Go on, ___ yourself to a dessert. You deserve it.', opts: ['treat', 'give', 'take', 'buy'], a: 'treat', why: '<b>treat yourself to</b> = darte un gusto.' },
          { blank: 1, q: 'Exercise ___ an important role in a healthy lifestyle.', opts: ['plays', 'does', 'makes', 'takes'], a: 'plays', why: '<b>play an important role in</b>. En español "jugar un papel", igual.' },
          { blank: 1, q: 'I think we ___ a fair price for the used car.', opts: ['paid', 'spent', 'charged', 'cost'], a: 'paid', why: '<b>pay a fair price for</b>. <i>Charge</i> es lo que hace el vendedor, no el comprador.' },
          { blank: 1, q: 'How much do they ___ for delivery?', opts: ['charge', 'pay', 'cost', 'spend'], a: 'charge', why: '<b>charge for</b> = cobrar por. El que cobra es el negocio.' },
          { blank: 1, q: "You can ___ on Ana. She's never late.", opts: ['rely', 'trust', 'believe', 'confide'], a: 'rely', why: '<b>rely on</b> = contar con. <i>Trust</i> no lleva <i>on</i>: <i>trust Ana</i>.' },
          { blank: 1, q: "I'd rather ___ in good shoes than buy cheap ones every year.", opts: ['invest', 'spend', 'pay', 'put'], a: 'invest', why: '<b>invest in</b> = invertir en. <i>Spend</i> va con <i>on</i>.' },
          { blank: 1, q: 'He had to ___ a salary cut when he changed careers.', opts: ['take', 'do', 'make', 'get'], a: 'take', why: '<b>take a salary cut</b> = aceptar una rebaja de sueldo.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'too / enough · modifying comparisons', title: 'Las dos reglas de la unidad', html: `
          <h3>1 · too y enough</h3>
          <p style="margin:8px 0 14px"><b>too</b> y <b>not enough</b> dicen que algo es <b>inaceptable</b>. <b>not too</b> y <b>enough</b> dicen que algo es <b>aceptable</b>. La trampa está en la posición de <b>enough</b>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Uso</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>too</b> + adjetivo</td><td>demasiado (mal)</td><td>It was <b>too empty</b> to live in.</td><td>too much + no contable · too many + contable</td></tr>
            <tr><td>adjetivo + <b>enough</b></td><td>suficientemente</td><td>It wasn't <b>comfortable enough</b> for us.</td><td>DESPUÉS del adjetivo: <s>enough comfortable</s></td></tr>
            <tr><td><b>enough</b> + sustantivo</td><td>suficiente(s)</td><td>Are there <b>enough chairs</b> for everyone?</td><td>ANTES del sustantivo: <s>chairs enough</s></td></tr>
            <tr><td>enough + no contable</td><td>suficiente</td><td>There's <b>enough space</b> for a bigger couch.</td><td>a veces <i>time enough</i>, pero lo normal es <i>enough time</i></td></tr>
            <tr><td>too / enough + <b>to</b> + verbo</td><td>para hacer algo</td><td>There weren't enough things <b>to look</b> at.</td><td>infinitivo detrás</td></tr>
            <tr><td><b>not too</b> + adjetivo</td><td>no demasiado (bien)</td><td>The new windows <b>aren't too bad</b>.</td><td>tono positivo</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Regla de oro:</b> <i>enough</i> va <b>después</b> de un adjetivo pero <b>antes</b> de un sustantivo. "The house was <b>nice enough</b> to live in, but there weren't <b>enough windows</b>."</div>
          <h3 style="margin-top:22px">2 · Modificar comparaciones</h3>
          <p style="margin:8px 0 14px">No es lo mismo "un poco mejor" que "muchísimo mejor". El modificador dice el <b>tamaño de la diferencia</b>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Estructura</th><th>Diferencia pequeña</th><th>Diferencia grande</th></tr></thead><tbody>
            <tr><td><b>comparativo</b> (-er / more)</td><td><b>a little</b> / <b>a bit</b> freer</td><td><b>way</b> / <b>a whole lot</b> / <b>much</b> closer</td></tr>
            <tr><td><b>as … as</b></td><td><b>nearly</b> / <b>almost</b> as expensive as</td><td><b>nowhere near</b> as expensive as</td></tr>
            <tr><td><b>superlativo</b></td><td>—</td><td><b>by far</b> the best option</td></tr>
          </tbody></table></div>
          <p class="small" style="margin-top:12px">Ejemplos del curso: "People might feel <b>a little freer</b> at the beach." · "The mountains are <b>way closer</b> than the beach." · "Driving is <b>nowhere near as expensive as</b> flying." · "It is <b>by far the best</b> option."</p>
          <div class="hint small" style="margin-top:12px"><b>Ojo:</b> <i>not nearly as good as</i> = mucho peor (diferencia grande). <i>Nearly as good as</i> (sin <i>not</i>) = casi igual de bueno.</div>` },
        { label: 'too o enough', type: 'mcq', eyebrow: 'too / enough', title: 'Elige la forma correcta', intro: 'Fíjate en la posición de <i>enough</i> y en <i>too much / too many</i>.', pool: 7, items: [
          { blank: 1, q: 'The soup is ___ to eat. Wait a minute.', opts: ['too hot', 'hot enough', 'enough hot', 'too much hot'], a: 'too hot', why: '<b>too</b> + adjetivo = demasiado. <i>Too much</i> solo con sustantivos.' },
          { blank: 1, q: "This apartment isn't ___ for four people.", opts: ['big enough', 'enough big', 'too big', 'too much big'], a: 'big enough', why: '<b>enough</b> va DESPUÉS del adjetivo. <i>Too big</i> significaría lo contrario.' },
          { blank: 1, q: 'Are there ___ for everyone at the party?', opts: ['enough chairs', 'chairs enough', 'too chairs', 'enough of chairs'], a: 'enough chairs', why: '<b>enough</b> va ANTES del sustantivo contable.' },
          { blank: 1, q: "There's ___ noise here. I can't concentrate.", opts: ['too much', 'too many', 'enough', 'too'], a: 'too much', why: '<i>Noise</i> es no contable → <b>too much</b>.' },
          { blank: 1, q: "There aren't ___ for the whole team.", opts: ['enough laptops', 'laptops enough', 'too laptops', 'enough laptop'], a: 'enough laptops', why: '<b>enough</b> + sustantivo contable en plural.' },
          { blank: 1, q: "He's ___ to drive. He's only fifteen.", opts: ['too young', 'young enough', 'enough young', 'too much young'], a: 'too young', why: '<b>too</b> + adjetivo + <b>to</b> + verbo: demasiado joven para conducir.' },
          { blank: 1, q: 'The café is ___ from here to walk.', opts: ['not too far', 'too far not', 'enough far', 'not enough far'], a: 'not too far', why: '<b>not too</b> + adjetivo = aceptable: no está demasiado lejos.' },
          { blank: 1, q: 'She speaks ___ to get the job.', opts: ['clearly enough', 'enough clearly', 'too clearly', 'clear enough'], a: 'clearly enough', why: 'Con adverbios también: adverbio + <b>enough</b>. <i>Speak clearly</i>, no <i>speak clear</i>.' },
          { blank: 1, q: "There were ___ people at the concert. We couldn't move.", opts: ['too many', 'too much', 'enough', 'many enough'], a: 'too many', why: '<i>People</i> es contable → <b>too many</b>.' },
          { blank: 1, q: "I'm ___ to cook tonight. Let's order pizza.", opts: ['too tired', 'tired enough', 'enough tired', 'too much tired'], a: 'too tired', why: '<b>too</b> + adjetivo + infinitivo.' },
          { blank: 1, q: "The room isn't ___ in. It's freezing.", opts: ['warm enough to sleep', 'enough warm to sleep', 'too warm to sleep', 'warm enough sleeping'], a: 'warm enough to sleep', why: 'adjetivo + <b>enough</b> + <b>to</b> + verbo.' },
          { blank: 1, q: "Ana doesn't have ___ for the position yet.", opts: ['enough experience', 'experience enough', 'too experience', 'enough experienced'], a: 'enough experience', why: '<b>enough</b> + sustantivo. Como en el curso: <i>Jorge doesn\'t have enough experience for the job</i>.' },
          { blank: 1, q: 'The new windows ___. I actually like them.', opts: ["aren't too bad", "aren't enough bad", 'are too not bad', 'are bad not enough'], a: "aren't too bad", why: '<b>not too bad</b> = bastante bien. Frase del curso.' },
          { blank: 1, q: 'This coffee is ___ for me. It needs more sugar.', opts: ['not sweet enough', 'not enough sweet', 'too sweet not', 'enough not sweet'], a: 'not sweet enough', why: '<b>not</b> + adjetivo + <b>enough</b>: no suficientemente dulce.' },
        ] },
        { label: 'Gradúa la comparación', type: 'mcq', eyebrow: 'Modifying comparisons', title: '¿Diferencia pequeña o grande?', intro: 'Lee la pista entre paréntesis y elige el modificador que encaja con la estructura (comparativo, <i>as … as</i> o superlativo).', pool: 7, items: [
          { blank: 1, q: 'My new phone is ___ faster than the old one. (big difference)', opts: ['way', 'a little', 'nearly', 'by far'], a: 'way', why: 'Comparativo + diferencia grande → <b>way / a whole lot / much</b>. <i>By far</i> es solo para superlativos.' },
          { blank: 1, q: 'The café on the corner is ___ more expensive than the one near work. (small difference)', opts: ['a bit', 'way', 'a whole lot', 'by far'], a: 'a bit', why: 'Comparativo + diferencia pequeña → <b>a bit / a little</b>.' },
          { blank: 1, q: 'Taking the bus is ___ as fast as the metro. (small difference)', opts: ['nearly', 'nowhere near', 'way', 'a bit'], a: 'nearly', why: '<i>as … as</i> + diferencia pequeña → <b>nearly / almost</b>.' },
          { blank: 1, q: 'Cooking at home is ___ as expensive as eating out. (big difference)', opts: ['nowhere near', 'nearly', 'almost', 'a little'], a: 'nowhere near', why: '<i>as … as</i> + diferencia grande → <b>nowhere near</b>.' },
          { blank: 1, q: "This is ___ the best empanada I've ever had.", opts: ['by far', 'way', 'much', 'nearly'], a: 'by far', why: 'Superlativo → <b>by far</b>.' },
          { blank: 1, q: 'The hotel was ___ better than we expected. (big difference)', opts: ['a whole lot', 'a bit', 'almost', 'nearly'], a: 'a whole lot', why: 'Comparativo + diferencia grande → <b>a whole lot</b>.' },
          { blank: 1, q: 'Her laptop is ___ lighter than mine, maybe 100 grams.', opts: ['a little', 'way', 'nowhere near', 'by far'], a: 'a little', why: '100 gramos = diferencia pequeña → <b>a little</b>.' },
          { blank: 1, q: 'The second-hand bike costs ___ as much as a new one, so I bought the new one.', opts: ['almost', 'nowhere near', 'way', 'by far'], a: 'almost', why: 'Casi lo mismo → <b>almost as much as</b>. Por eso compró la nueva.' },
          { blank: 1, q: 'Renting is ___ cheaper than buying in this city.', opts: ['much', 'by far', 'nearly', 'almost'], a: 'much', why: 'Comparativo → <b>much cheaper</b>. <i>Nearly / almost</i> van con <i>as … as</i>.' },
          { blank: 1, q: 'That sweater was ___ my worst purchase ever.', opts: ['by far', 'way', 'much', 'a little'], a: 'by far', why: 'Superlativo (<i>worst</i>) → <b>by far</b>. Frase típica de reseña.' },
          { blank: 1, q: 'The bus is not ___ as comfortable as the train.', opts: ['nearly', 'way', 'much', 'by far'], a: 'nearly', why: '<b>not nearly as … as</b> = mucho menos. Como en el curso: <i>Gina\'s pizza is not nearly as good as Arturo\'s</i>.' },
          { blank: 1, q: "The copy is ___ as good as the original. Don't waste your money.", opts: ['nowhere near', 'nearly', 'a bit', 'much'], a: 'nowhere near', why: '<b>nowhere near as good as</b> = ni de lejos tan bueno.' },
          { q: '"The mountains are <b>way closer</b> than the beach." → La diferencia es…', opts: ['grande', 'pequeña', 'casi nula'], a: 'grande', why: '<b>way</b> = diferencia grande.' },
          { q: '"The ski resort would be <b>nearly as expensive as</b> the beach." → El precio es…', opts: ['casi igual', 'muy diferente', 'mucho más alto'], a: 'casi igual', why: '<b>nearly as … as</b> = casi igual.' },
        ] },
        { label: 'Repaso Unit 1', type: 'mcq', eyebrow: 'Repaso espaciado', title: 'Unit 1 + Unit 3 en la misma frase', intro: 'Tiempos verbales, verbos de estado y vocabulario de logros y cualidades, mezclados con <i>enough</i> y comparaciones.', items: [
          { blank: 1, q: "I ___ to Arequipa twice; it's by far my favorite city.", opts: ["'ve been", 'was being', 'went', "'m going"], a: "'ve been", why: 'Experiencia sin fecha (<i>twice</i>) → present perfect. Tu error de la Unit 1: <s>was being</s>.' },
          { blank: 1, q: 'She ___ enough experience to rise to a challenge like this.', opts: ['has', 'is having', 'have', 'is have'], a: 'has', why: '<b>have</b> = poseer → verbo de estado, nunca en continuo. <i>Enough</i> + sustantivo.' },
          { blank: 1, q: "He ___ a business for ten years, and he's still enthusiastic about it.", opts: ["'s been running", 'runs', 'is running', 'ran'], a: "'s been running", why: 'Empezó hace 10 años y sigue (<i>for ten years</i>) → present perfect continuous.' },
          { blank: 1, q: "I ___ she's confident enough to run the meeting alone.", opts: ['think', 'am thinking', 'thinks', 'thought'], a: 'think', why: 'Opinión → <b>think</b> es de estado. Además, <i>confident enough</i>: adjetivo + enough.' },
          { blank: 1, q: 'Setting a ___ for yourself is the first step to boosting your confidence.', opts: ['goal', 'record', 'medal', 'pride'], a: 'goal', why: '<b>set a goal for yourself</b> (Unit 1) + <b>boost</b> (Unit 3).' },
          { blank: 1, q: 'Her ___ is to open a second café. It would be way bigger than the first one.', opts: ['ambition', 'ambitious', 'ambitiously', 'ambient'], a: 'ambition', why: 'Sustantivo: <b>ambition</b>. <i>Ambitious</i> es el adjetivo.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>can\'t</i>, <i>it\'s</i>).',
          sentences: ["I can't tell you how sorry I am!", "Don't beat yourself up about it.", "It's not the end of the world.", "It wasn't comfortable enough for us.", 'There was too much furniture in the room.', 'The mountains are way closer than the beach.', 'Driving is nowhere near as expensive as flying.', "It's by far the best option.", 'How much do you charge for an extra shot of espresso?', 'We should take advantage of the pool and the gym.', 'The cost of living around here is too high.', 'I had to take a salary cut, but it was worth it.'] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for detail', title: 'Escucha el diálogo y responde', intro: 'Marco pidió prestados unos auriculares. Escúchalo entero antes de responder.',
          lines: [['Lucía', "Hey, Marco. You look worried. What's up?"], ['Marco', "I'm really sorry, Lucía. You'll never guess what I did. Remember the headphones you lent me?"], ['Lucía', "Yeah. Don't tell me you lost them."], ['Marco', "Not lost, exactly. I left them on the bus. I can't believe I didn't check my bag!"], ['Lucía', "Oh, Marco. It's OK, it's not the end of the world. They weren't that expensive."], ['Marco', "I'll buy you a new pair. What do they charge for that model now?"], ['Lucía', 'About sixty dollars. But honestly, the newer model is nowhere near as expensive as it was last year. Maybe fifty.'], ['Marco', "Then I'll get you the newer one. It's the least I can do."], ['Lucía', "Don't beat yourself up about it. Just pay a fair price and don't buy the cheapest ones. They're a complete waste of money."]],
          questions: [
            { q: 'What happened to the headphones?', opts: ['Marco left them on the bus', 'Somebody stole them', 'Marco broke them'], a: 'Marco left them on the bus', why: '"I left them on the bus. I can\'t believe I didn\'t check my bag!"' },
            { q: 'When Lucía says "it\'s not the end of the world", she means…', opts: ["the situation isn't good, but it isn't terrible", 'she is very angry', 'the headphones were very expensive'], a: "the situation isn't good, but it isn't terrible", why: 'Es una frase para que el otro no se sienta mal: no es grave.' },
            { q: 'How does the price of the newer model compare with last year?', opts: ['It is much cheaper now', 'It is almost the same', 'It is a bit more expensive'], a: 'It is much cheaper now', why: '"<b>Nowhere near as expensive as</b> it was last year" = diferencia grande, mucho más barato.' },
            { q: "What is Lucía's advice?", opts: ["Don't buy the cheapest headphones", 'Buy the most expensive model', "Don't buy anything"], a: "Don't buy the cheapest headphones", why: '"Don\'t buy the cheapest ones. They\'re a complete waste of money."' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Quality of life', task: 'Tarea final de la Lesson 1: habla 60 segundos sobre tu calidad de vida. ¿Qué valoras más, tiempo o dinero? ¿Qué contribuye positiva y negativamente (trabajo, horario, familia, lugar donde vives)? ¿Qué quieres cambiar o ya has cambiado?', model: 'Modelo: "At this point in my life, I value time more than money. Running my own business has boosted my quality of life, but the cost of living in Lima keeps going up. I\'ve already changed my schedule to have a better work-life balance, and I\'d like to invest in a small car."', tags: ['value', 'quality of life', 'balance', 'boost', 'cost of living', 'lifestyle', 'worth it'] },
          { t: 'Compare two options', task: 'Compara dos productos o servicios que conoces bien (dos cafés, dos apps de delivery, dos proveedores). Usa al menos tres modificadores: a bit, way, a whole lot, nearly as, nowhere near as, by far.', model: 'Modelo: "The café near my office charges a bit more for a latte, but the coffee is way better. The chain across the street is nowhere near as good, and the service is a whole lot slower. Honestly, the small café is by far the best option."', tags: ['way', 'a bit', 'nowhere near', 'by far', 'a whole lot', 'nearly as', 'charge for'] },
          { t: 'I did the dumbest thing', task: 'Pide perdón a un amigo por algo que hiciste (perdiste algo prestado, llegaste tarde, rompiste algo). Usa una frase para disculparte, una para explicar qué pasó y ofrece una solución.', model: 'Modelo: "I\'m so sorry. You\'ll never guess what I did: I left your charger at the café. I can\'t believe I forgot it! I can\'t tell you how sorry I am. I\'ll buy you a new one today."', tags: ['sorry', 'never guess', 'dumbest thing', "can't believe", 'how sorry i am', "i'll", 'new one'] },
          { t: 'Respond to an apology', task: 'Haz las dos voces: alguien se disculpa por derramar café en tu sofá y tú respondes para que no se sienta mal. Usa dos de las tres frases de la unidad.', model: 'Modelo: "I\'m really sorry, I spilled coffee on your sofa. — Don\'t worry, it\'s really no big deal. I can wash the cover. It\'s not the end of the world. Don\'t beat yourself up about it."', tags: ['sorry', 'no big deal', 'end of the world', 'beat yourself up', "don't worry", 'spilled'] },
          { t: 'A one-minute review', task: 'Haz una reseña oral de algo que compraste hace poco: cómo te sentiste (pleased / disappointed), una característica buena y una mala con too / enough, y una recomendación.', model: 'Modelo: "I was really pleased with these headphones. I love the fact that they\'re light, but the battery isn\'t good enough for a long trip. Still, great value for the money. I highly recommend them."', tags: ['pleased', 'disappointed', 'enough', 'too', 'value for the money', 'recommend', 'i like the fact'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación · /s/ inicial', title: 'La s al principio de palabra: sin "e" delante', intro: 'En español no existe <i>s</i> + consonante al inicio, así que tendemos a decir "e-store", "e-sorry". Escucha y repite sin la vocal de apoyo: empieza con el siseo /s/.',
          pairs: [['sorry (no "e-sorry")', 'sorry'], ['so sorry', "I'm so sorry"], ['store (no "e-store")', 'store'], ['stole', 'somebody stole it'], ['spilled', 'I spilled coffee'], ['screen', 'the screen is cracked'], ['small', 'a small coffee'], ['standard of living', 'standard of living'], ['spend', 'time well spent'], ['sale', 'a big sale'], ['salary cut', 'take a salary cut'], ['Frase completa', "I'm so sorry, I spilled coffee on your sofa. It's a small stain."]] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for detail · inferring meaning', title: 'Buyer beware: how to read a product review', intro: 'Lee una vez para la idea general y otra fijándote en los detalles. Las palabras en amarillo se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Before we buy anything online, most of us <b>scroll</b> through the reviews. Five stars, one star, "great value for the money", "my worst purchase ever". But reviews are only useful if you know how to read them, and a surprising number of shoppers don\'t.',
            'First, ignore the stars and read the details. A one-star review that says "the delivery was late" tells you nothing about the product. A four-star review that explains exactly why the reviewer was disappointed – "the battery lasts nowhere near as long as the ad promises" – is far more <b>reliable</b>. Reviews with specific complaints are usually written by real customers who actually used the thing.',
            'Second, be careful with extremes. If every review says "by far the best thing I\'ve ever bought", somebody may be paying for them. Genuine reviewers <b>weigh</b> the good against the bad: "I love the fact that it\'s light, but it isn\'t strong enough to carry a laptop." That kind of balance is a good sign.',
            'Finally, remember that price plays an important role in how people judge things. A twenty-dollar pair of headphones that sounds fine gets great reviews; a two-hundred-dollar pair that sounds fine gets <b>complaints</b>. Ask yourself whether the reviewer paid a fair price and whether their expectations match yours. A little skepticism is time well spent. It\'s a lot cheaper than a complete waste of money.',
          ],
          main: [
            { q: 'Reviews with specific details are more trustworthy than the star rating.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: ignora las estrellas y lee los detalles.' },
            { q: 'Too many perfect reviews can be a warning sign.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: cuidado con los extremos; alguien puede estar pagando por ellas.' },
            { q: 'The price changes how people judge a product.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: <i>price plays an important role</i>.' },
            { q: 'Most people read reviews, but many don\'t read them well.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1 introduce el problema.' },
          ],
          infer: [
            { q: '<b>scroll</b> (paragraph 1)', opts: ['move through text on a screen', 'print something', 'buy something quickly'], a: 'move through text on a screen', why: 'Se hace <i>through the reviews</i> antes de comprar online: desplazarse por la pantalla.' },
            { q: '<b>reliable</b> (paragraph 2)', opts: ['can be trusted', 'very long', 'written by the company'], a: 'can be trusted', why: 'Se opone a la reseña que "no dice nada del producto". Misma familia que <b>rely on</b>.' },
            { q: '<b>weigh</b> (paragraph 3)', opts: ['compare and consider carefully', 'measure in kilograms', 'ignore completely'], a: 'compare and consider carefully', why: '<i>Weigh the good against the bad</i> = sopesar lo bueno y lo malo.' },
            { q: '<b>complaints</b> (paragraph 4)', opts: ['statements that something is wrong', 'compliments', 'discounts'], a: 'statements that something is wrong', why: 'Contraste con <i>great reviews</i>: los auriculares caros reciben quejas.' },
          ],
          think: '¿Lees reseñas antes de comprar? ¿Confías más en las de 5 estrellas o en las de 3-4 con explicación? Escribe dos frases empezando con <i>I usually…</i> y <i>I think reviews are (not) reliable enough because…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Frases para reseñas', type: 'notes', eyebrow: 'Writing skill · expressing opinions about product features', title: 'Las frases de una reseña corta', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Describing your feelings</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I was really <b>pleased</b> / very <b>disappointed</b> with this product.</li><li>Great <b>value for the money</b>!</li><li>It's a complete <b>waste of money</b>!</li><li>By far my <b>worst purchase</b> ever!</li></ul></div>
          <div><h3>Positive / negative features</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I like the fact that…</li><li>I love the…</li><li>Then suddenly it…</li><li>It isn't … enough / It's too …</li></ul></div>
          <div><h3>Giving a recommendation</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I <b>highly recommend</b> them.</li><li>I'll definitely go there again!</li><li>I wouldn't recommend it to anyone.</li><li>Do not buy it!</li></ul></div>
          <div class="hint small"><b>Estructura del curso:</b> 1) cómo te sentiste, 2) una o dos características concretas (con <i>too / enough</i> o una comparación modificada), 3) recomendación clara al final. Ejemplo: "At first, I was <b>really</b> pleased with it… After washing it, however, the sweater <b>suddenly</b> looked terrible… It was a <b>complete</b> waste of money."</div></div>` },
        { label: 'Corrige tus frases', type: 'fix', eyebrow: 'Error correction · tus frases reales', title: 'Reescribe la frase corrigiendo el error', intro: 'Las cuatro primeras son errores que cometiste en el curso. Las demás son errores típicos de la unidad. Corrígelas y compara.', items: [
          { bad: "My parents don't have a high quality of life, but they're happy.", good: "My parents don't have a high standard of living, but they're happy.", why: 'Collocation: <b>high standard of living</b> (dinero y comodidad). Con <i>quality of life</i> se dice <b>good</b>, no <i>high</i>. Y el contexto ("pero son felices") habla de dinero.' },
          { bad: 'The moon made an effect on ocean tides.', good: 'The moon has an effect on ocean tides.', why: 'El verbo fijo es <b>have an effect on</b>. <i>Make</i> no funciona con <i>effect</i>.' },
          { bad: "I can't tell you how I am sorry.", good: "I can't tell you how sorry I am.", why: 'Después de <b>how</b> va el adjetivo y luego sujeto + verbo: <i>how <b>sorry I am</b></i>, <i>how <b>expensive it is</b></i>.' },
          { bad: "I can't tell I didn't lock it!", good: "I can't believe I didn't lock it!", why: '<b>I can\'t believe</b> + lo que pasó = explicar lo que hiciste. <b>I can\'t tell you</b> + how sorry I am = disculparse. En el curso las intercambiaste.' },
          { bad: "The apartment wasn't enough comfortable for us.", good: "The apartment wasn't comfortable enough for us.", why: '<b>enough</b> va DESPUÉS del adjetivo.' },
          { bad: 'Are there chairs enough for everyone?', good: 'Are there enough chairs for everyone?', why: '<b>enough</b> va ANTES del sustantivo.' },
          { bad: 'The coffee here is very more expensive than at home.', good: 'The coffee here is much more expensive than at home.', why: 'Los comparativos se modifican con <b>much / way / a whole lot</b> (diferencia grande) o <b>a bit / a little</b>, nunca con <i>very</i>.' },
          { bad: 'It is the by far best option.', good: 'It is by far the best option.', why: '<b>by far</b> va delante de <i>the</i> + superlativo.' },
        ] },
        { label: 'Gradúa la comparación', type: 'soft', eyebrow: 'Modifying comparisons · escritura', title: 'Añade un modificador que diga el tamaño de la diferencia', explain: 'En una reseña, "it\'s better" dice poco. Reescribe cada frase añadiendo un modificador según la pista: <b>a bit / a little</b> (pequeña), <b>way / a whole lot / much</b> (grande), <b>nearly / almost</b> (casi igual), <b>nowhere near</b> (ni de lejos), <b>by far</b> (superlativo).', missing: 'Falta un modificador: <i>a bit, a little, way, a whole lot, much, nearly, almost, nowhere near</i> o <i>by far</i>', pattern: /\b(way|a whole lot|much|a little|a bit|nearly|almost|nowhere near|by far)\b/, items: [
          { h: '"The new phone is better than the old one." (diferencia grande)', a: 'The new phone is way better than the old one.' },
          { h: '"This blender is more expensive than the other model." (diferencia pequeña)', a: 'This blender is a bit more expensive than the other model.' },
          { h: '"The copy is as good as the original." (ni de lejos)', a: 'The copy is nowhere near as good as the original.' },
          { h: '"The cheaper headphones sound as good as the expensive ones." (casi igual)', a: 'The cheaper headphones sound nearly as good as the expensive ones.' },
          { h: '"It is the best coffee maker I have ever owned." (superlativo)', a: 'It is by far the best coffee maker I have ever owned.' },
          { h: '"The battery lasts longer than my old laptop\'s." (diferencia grande)', a: 'The battery lasts a whole lot longer than my old laptop\'s.' },
        ] },
        { label: 'Escribe tu reseña', type: 'comment', eyebrow: 'Writing task', title: 'Escribe una reseña corta de un producto o servicio', intro: 'Piensa en algo que compraste hace poco (o un proveedor de tu negocio). Escribe 60-100 palabras. La checklist se marca sola al analizar el texto.', placeholder: 'I bought this … last month. At first, I was really pleased with it…', min: 60, max: 100, need: 4, checks: [
          { label: 'Digo cómo me sentí (<i>pleased / disappointed with, value for the money, waste of money, worst purchase</i>)', re: /\b(pleased with|disappointed with|value for (the|your) money|waste of money|worst purchase|best purchase)\b/ },
          { label: 'Describo una característica concreta (<i>I like the fact that… / I love the… / Then suddenly…</i>)', re: /\b(i like the fact|i love the|then suddenly|the problem is|the only problem)\b/ },
          { label: 'Uso <b>too</b> o <b>enough</b> con un adjetivo o sustantivo', re: /\b(too (much|many|[a-z]+)|[a-z]+ enough|enough [a-z]+)\b/ },
          { label: 'Modifico una comparación (<i>a bit, way, much, nearly as, nowhere near as, by far</i>)', re: /\b(a bit|a little|way|a whole lot|much|nearly as|almost as|nowhere near|by far)\b/ },
          { label: 'Termino con una recomendación (<i>I highly recommend… / Do not buy it! / I\'ll definitely… again</i>)', re: /\b(highly recommend|wouldn't recommend|would not recommend|do not buy|don't buy|definitely (go|buy|order|use|shop) .*again|recommend (it|them|this))\b/ },
          { label: 'Uso al menos una expresión de la unidad (<i>can\'t afford, charge for, pay a fair price for, rely on, invest in…</i>)', words: ['afford', 'charge', 'fair price', 'rely on', 'invest in', 'worth it', 'take advantage', 'treat yourself', 'make the most', 'depend on', 'cost of living', 'quality of life', 'boost', 'trade', 'value'] },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language · Lesson 3', title: 'Disculparse, explicar qué pasó y responder', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Apologizing</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I'm so / really sorry.</li><li>I can't tell you how sorry I am!</li><li>I am so, so sorry.</li></ul></div>
          <div><h3>Explaining what happened</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>You'll never guess what I did.</li><li>I just did the dumbest thing.</li><li>I can't believe I (didn't lock it)!</li></ul></div>
          <div><h3>Responding to an apology</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>It's not the end of the world.</li><li>It's really no big deal.</li><li>Don't beat yourself up about it.</li><li>Don't worry. It's OK.</li></ul></div>
          <div class="hint small"><b>Tus dos confusiones del curso:</b><br>1) <b>I can't tell you how sorry I am</b>: orden <i>how + adjetivo + sujeto + verbo</i>, no <s>how I am sorry</s>.<br>2) <b>tell</b> va con <i>you how sorry I am</i> (disculpa); <b>believe</b> va con lo que hiciste: <i>I can't believe I forgot it</i>.<br><br><b>(no) big deal</b> = (no) tiene importancia. <b>beat yourself up</b> = culparte demasiado.</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ["Diego: I'm really sorry, but I just did the dumbest thing.", 'Paula: What? What did you do?', 'Diego: You lent me your umbrella, remember? I left it on the bus.', "Paula: Oh, Diego, it's really no big deal. It was an old one.", "Diego: I can't tell you how sorry I am. I'll get you a new one today."],
          ["Sara: You'll never guess what I did.", 'Tom: Tell me. Is it bad?', "Sara: I spilled juice on your laptop. I can't believe I did that!", "Tom: Is it working? … Then it's not the end of the world.", "Sara: I'm so, so sorry. Let me pay for the cleaning."],
          ["Andrés: Oh, I'm so sorry! I didn't see your phone there. Is it OK?", "Clara: Yes, it's working. But the screen is cracked.", "Andrés: I can't believe I knocked it on the ground! I'll pay for the repair.", "Clara: It was already cracked, actually. I'm getting a new phone this weekend anyway.", "Andrés: Really? Well, I still feel terrible about it.", "Clara: Don't beat yourself up about it. It's really no big deal."],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', items: [
          { q: 'Rompiste la taza favorita de un compañero. Te disculpas con la frase más fuerte.', opts: ["I can't tell you how sorry I am!", "I can't believe you how sorry I am!", "I can't tell you how I am sorry!"], a: "I can't tell you how sorry I am!", why: '<b>tell you how sorry I am</b>: verbo <i>tell</i> + orden <i>how sorry I am</i>. Las otras dos son tus errores del curso.' },
          { q: 'Quieres empezar a contar algo tonto que hiciste.', opts: ["You'll never guess what I did.", "It's really no big deal.", "Don't beat yourself up about it."], a: "You'll never guess what I did.", why: 'Frase para <b>explicar qué pasó</b>. Las otras dos son respuestas a una disculpa.' },
          { q: 'Alguien te pide perdón por llegar 5 minutos tarde. No te importa.', opts: ["It's really no big deal.", "I just did the dumbest thing.", "I'm so sorry."], a: "It's really no big deal.", why: '<b>no big deal</b> = no tiene importancia.' },
          { q: 'Tu amigo sigue culpándose por un error pequeño.', opts: ["Don't beat yourself up about it.", "You'll never guess what I did.", "I can't believe I did that."], a: "Don't beat yourself up about it.", why: '<b>beat yourself up</b> = castigarte / culparte demasiado.' },
          { q: 'Explicas que dejaste la bici sin candado.', opts: ["I can't believe I didn't lock it!", "I can't tell I didn't lock it!", "I can't tell you I didn't lock it!"], a: "I can't believe I didn't lock it!", why: '<b>I can\'t believe</b> + lo que pasó. Tu error del curso fue usar <i>tell</i> aquí.' },
          { q: 'Alguien perdió tu libro prestado y está muy agobiado. La pérdida no es grave.', opts: ["It's not the end of the world.", "It's the end of the world.", "That's a big deal."], a: "It's not the end of the world.", why: '<b>not the end of the world</b> = no es bueno, pero tampoco horrible.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Perdiste la llave del coche prestado', intro: 'Tu amigo Javier te prestó su coche para el fin de semana y perdiste la llave en la playa. Discúlpate, explica qué pasó y acepta su reacción sin empeorar las cosas. Una mala réplica puede estropear la amistad.', scenes: [
          { t: 'Perdiste la llave del coche prestado', you: 'Aldo, que pidió el coche prestado', partner: 'Javier', role: 'tu amigo, dueño del coche', goal: 'Discúlpate bien, explica lo que pasó, asume la responsabilidad y acepta la respuesta de Javier.', start: 'a', nodes: {
            a: { say: "Hey! How was the trip? Everything OK with the car?", opts: [
              { t: "The trip was great… but you'll never guess what I did.", ok: 2, why: "<b>You'll never guess what I did</b> es la frase de la unidad para anunciar que la pifiaste. Prepara al otro para la noticia.", next: 'b' },
              { t: "Fine, thanks. Listen, I have to tell you something.", ok: 1, why: "Correcta y clara. Menos idiomática que <i>You'll never guess what I did</i>, pero funciona.", next: 'b' },
              { t: "Yes, OK. But I did the most dumb thing.", ok: 0, why: "Superlativo de un adjetivo corto: <b>the dumbest thing</b>, no <i>the most dumb</i>.", next: 'b' },
            ] },
            b: { say: "Uh-oh. What happened?", opts: [
              { t: "I just did the dumbest thing. I lost the car key at the beach.", ok: 2, why: "<b>I just did the dumbest thing</b> + el hecho en pasado simple. Directo y honesto.", next: 'c' },
              { t: "I can't believe I did this: I lost the key at the beach.", ok: 1, why: "Correcta: <b>I can't believe I + pasado</b> va con lo que hiciste. Suena bien.", next: 'c' },
              { t: "I can't believe I'm lost the key.", ok: 0, why: "<i>I'm lost</i> = estoy perdido. Lo que quieres es <b>I lost</b> (pasado) o <b>I've lost</b> the key.", next: 'c' },
            ] },
            c: { say: "The key? Seriously, Aldo?", opts: [
              { t: "I'm so, so sorry. I can't tell you how sorry I am.", ok: 2, why: "Las dos fórmulas fuertes de disculpa de la unidad. Fíjate en el orden: <b>how sorry I am</b> (how + adjetivo + sujeto + verbo).", next: 'd' },
              { t: "I'm really sorry, Javier. I feel terrible.", ok: 1, why: "Correcta y sincera. <i>I'm really sorry</i> es un poco más suave que <i>I can't tell you how sorry I am</i>.", next: 'd' },
              { t: "I can't tell you how I am sorry.", ok: 0, why: "Tu error del curso: después de <i>how</i> va el adjetivo y luego sujeto y verbo: <b>how sorry I am</b>.", next: 'c2' },
            ] },
            c2: { say: "You can't tell me how…? OK, OK. Just tell me exactly what happened.", opts: [
              { t: "Sorry, I mean: I can't tell you how sorry I am. It fell out of my pocket in the sand.", ok: 2, why: "Te corriges con la fórmula bien ordenada y explicas qué pasó con un pasado simple claro.", next: 'd' },
              { t: "It fell out of my pocket while we were playing volleyball.", ok: 1, why: "Buena explicación (pasado simple + pasado continuo). Faltó repetir la disculpa bien dicha.", next: 'd' },
              { t: "I don't know. Is not my fault, the sand.", ok: 0, why: "Echar la culpa a la arena, y sin sujeto (<b>It's</b> not my fault). Asume la responsabilidad: es tu disculpa.", next: 'd2' },
            ] },
            d2: { say: "Not your fault? Come on. Well, I have a spare key, but that one had the remote.", opts: [
              { t: "You're right, it was my fault. I'll pay for a new one, of course.", ok: 2, why: "Rectificas, asumes y ofreces una solución. Es lo que repara la situación.", next: 'e' },
              { t: "Sorry, I didn't mean that. I'll pay for the replacement.", ok: 1, why: "Bien: te desdices y ofreces pagar. Un poco menos claro que admitir <i>it was my fault</i>.", next: 'e' },
              { t: "OK, so no problem then.", ok: 0, why: "Minimizas un daño que causaste tú. <b>No big deal</b> o <b>no problem</b> lo dice quien perdona, no quien perdió la llave.", next: 'fail' },
            ] },
            d: { say: "OK… Well, it's not the end of the world. I have a spare one.", opts: [
              { t: "Thanks for being so cool about it. I'll pay for a new key, of course.", ok: 2, why: "Agradeces la reacción y ofreces una solución concreta. Así se cierra bien una disculpa.", next: 'e' },
              { t: "Thank you. Still, I'll pay for a replacement.", ok: 1, why: "Correcta. <b>Still</b> (aun así) introduce bien la oferta de pagar.", next: 'e' },
              { t: "Yes, it's no big deal.", ok: 0, why: "<b>It's no big deal</b> es la respuesta de quien perdona (Javier). Dicha por ti suena a que le restas importancia a su llave.", next: 'd3' },
            ] },
            d3: { say: "No big deal? It's a 300-dollar key with a remote, Aldo.", opts: [
              { t: "You're right, sorry. I'll pay for it, of course.", ok: 2, why: "Reconoces el error de tono enseguida y ofreces pagar. La conversación se recupera.", next: 'e' },
              { t: "Sorry, that came out wrong. I'll cover the cost.", ok: 1, why: "Bien: <b>that came out wrong</b> = no quise decir eso. <i>Cover the cost</i> es correcto.", next: 'e' },
              { t: "300 dollars? For a key? That's too much.", ok: 0, why: "Discutir el precio de lo que perdiste tú rompe la disculpa por completo.", next: 'fail' },
            ] },
            e: { say: "Deal. Don't beat yourself up about it. It happens. Did you at least have fun?", opts: [
              { t: "Thanks, man. Yes, it was a great weekend, apart from the key!", ok: 2, why: "Aceptas el consuelo (<b>Don't beat yourself up</b> = no te castigues) y cambias de tema con humor. Perfecto.", next: 'win' },
              { t: "I did. And next time I'll keep the key in the car bag.", ok: 1, why: "Correcta; además propones una medida. Un <i>thanks</i> al principio la haría más cálida.", next: 'win' },
              { t: "I don't beat myself. Yes, was fun.", ok: 0, why: "<b>Beat yourself up</b> es la expresión completa (culparte demasiado); <i>beat myself</i> suena a golpearte. Y <b>it was fun</b>: el sujeto no se omite.", next: 'win' },
            ] },
            win: { say: "Good. Next time, keep it in the bag. See you Friday?", end: true, outcome: 'win', note: 'Anunciaste la noticia (<b>You\'ll never guess what I did</b>), te disculpaste con el orden correcto (<b>I can\'t tell you how sorry I am</b>), asumiste la responsabilidad y aceptaste el consuelo. Recuerda: <i>no big deal</i> y <i>don\'t beat yourself up</i> los dice quien perdona.' },
            fail: { say: "Wow. OK. Let's talk about this another day.", end: true, outcome: 'fail', note: 'Discutir el costo o decir que no es grave cuando el daño es tuyo rompe la disculpa. La secuencia que funciona: disculpa fuerte → qué pasó → <b>it was my fault</b> → una solución concreta.' },
          } },
        ] },
      ] },
    ],
  };
})();
