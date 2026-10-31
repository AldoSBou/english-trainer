/* ===========================================================
   ingles3/unit8.js — Inglés 3 · Unit 8: Getting there
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Lesson 1 · Describing experiences ---------- */
  const EXP = [
    ['achievement', 'logro (algo conseguido con esfuerzo)', 'Graduating from college was my greatest achievement.', '¿Cuál es tu mayor logro hasta ahora?'],
    ['challenge', 'reto, desafío (algo difícil que pone a prueba)', 'I ran 30 miles across a mountain trail. It was a real challenge.', '¿Qué reto te gustaría aceptar este año?'],
    ['change', 'cambio (una situación que se vuelve diferente)', 'Moving to Paris has been a big change for me.', '¿Qué cambio grande has vivido últimamente?'],
    ['chore', 'tarea doméstica (aburrida pero necesaria)', 'I have a lot of chores to do this weekend: laundry and dishes.', '¿Qué chore odias más?'],
    ['job', 'trabajo concreto, tarea que hay que hacer', "We're organizing our garage this weekend. It's going to be a big job.", '¿Qué "big job" tienes pendiente en casa?'],
    ['opportunity', 'oportunidad (ocasión que te permite hacer algo)', "My university has a program in London. It's a great opportunity.", '¿Qué oportunidad te gustaría que apareciera?'],
    ['process', 'proceso (serie de pasos para conseguir un resultado)', 'Replacing the CPU in my laptop was a complicated process.', '¿Qué proceso técnico te ha costado más aprender?'],
    ['project', 'proyecto (trabajo planificado con un objetivo)', 'We were given a school project last week: to make a robot.', '¿En qué proyecto estás trabajando ahora?'],
    ['success', 'éxito (conseguir el resultado que esperabas)', 'Our café opening was a big success! We had a lot of customers.', '¿Qué consideras un éxito en tu vida laboral?'],
  ];

  /* ---------- Lesson 2 · Describing progress ---------- */
  const PROG = [
    ['concentrate on', 'concentrarse en algo', 'I came to the library so that I can concentrate on studying.', '¿Dónde consigues concentrarte mejor?'],
    ['do your best', 'hacerlo lo mejor que puedas', "I'm doing my best, but the weather is terrible.", '¿En qué estás haciendo tu mejor esfuerzo ahora?'],
    ['get nowhere', 'no avanzar nada, no llegar a ningún sitio', "I'm trying to build this dresser but I'm getting nowhere.", '¿Con qué tarea sientes que no avanzas?'],
    ['have a chance', 'tener la oportunidad o el tiempo de hacer algo', "I haven't had a chance to finish the report yet.", '¿Has tenido ocasión de descansar esta semana?'],
    ['have problems with', 'tener problemas con algo', "I'm having problems with this website. It won't register me.", '¿Con qué aplicación tienes más problemas?'],
    ['have time', 'tener tiempo suficiente', 'We have lots of time to check in and go through security.', '¿Tienes tiempo para estudiar entre semana?'],
    ['have trouble with', 'tener dificultades con algo', "I'm having trouble with this jar. It won't open!", '¿Con qué parte del inglés tienes más dificultad?'],
    ['make good progress', 'avanzar bien, progresar', "We're making good progress on the house. It's almost finished.", '¿En qué estás progresando bien últimamente?'],
    ['save time', 'ahorrar tiempo', 'I ordered takeout for lunch to save time.', '¿Qué truco usas para ahorrar tiempo?'],
    ['spend time', 'dedicar tiempo a algo', "I've been spending a lot of time learning to play the guitar.", '¿A qué dedicas más tiempo fuera del trabajo?'],
    ['take it easy', 'tomárselo con calma, relajarse', 'Today I just want to take it easy and read a book.', '¿Cuándo fue la última vez que te lo tomaste con calma?'],
    ['waste time', 'perder el tiempo', 'We had the wrong address in the GPS, so we wasted a lot of time.', '¿Qué te hace perder más tiempo al día?'],
  ];

  const EXP_W = EXP.map(e => e[0]);
  const PROG_W = PROG.map(p => p[0]);

  /* Situación → palabra (experiences) */
  const SIT_EXP = [
    ['You finally passed the certification exam after two years of studying.', 'achievement'],
    ['Every Sunday you have to wash the dishes, do the laundry and tidy up.', 'chore'],
    ['Your company offers you six months in the Berlin office.', 'opportunity'],
    ['You moved from a small town to a huge city and everything is different.', 'change'],
    ['Your team is building a new payments app; it starts in March and ends in October.', 'project'],
    ['Getting a visa takes five steps: forms, photos, payment, interview and waiting.', 'process'],
    ['The restaurant was full every night in its first month.', 'success'],
    ['Nobody has ever swum that river before. It will test everything you know.', 'challenge'],
    ['You have to move all the furniture out of the apartment before Friday.', 'job'],
  ];

  /* Situación → expresión (progress) */
  const SIT_PROG = [
    ["I've called eleven electricians and nobody answers. Nothing is moving.", 'get nowhere'],
    ['The roof is finished and the windows are in. We started in May.', 'make good progress'],
    ['I closed the door and turned off my phone to finish the report.', 'concentrate on'],
    ["The meeting isn't until four, so there's no hurry.", 'have time'],
    ["I've been answering emails all day. I still haven't opened the file.", 'have a chance'],
    ["This printer won't connect to the network again.", 'have problems with'],
    ['I bought everything for the week in one trip instead of five.', 'save time'],
    ["I scrolled through videos for two hours and learned nothing.", 'waste time'],
    ["It's Sunday. No laptop, no chores, just the sofa and a book.", 'take it easy'],
    ["I'm not the fastest runner, but nobody trains harder than me.", 'do your best'],
    ["I've been practicing the guitar two hours a day for three months.", 'spend time'],
    ["My back hurts every time I try to lift that box.", 'have trouble with'],
  ];

  window.UNIT_DATA['ingles3/unit8'] = {
    source: 'WeTalk · Level 3 · Unit 8 · Getting there (experiencias y progreso)',
    description: 'Hablar de experiencias y de progreso: present perfect continuous, present perfect vs. continuous, ponerse al día con alguien y escribir un post con expresiones de tiempo.',
    map: [
      ['Vocabulary', '9 sustantivos de experiencias (<i>achievement, challenge, chore, opportunity…</i>) y 12 expresiones de progreso (<i>make good progress, get nowhere, take it easy…</i>)', 'Flashcards con audio, emparejar, situación → palabra, situación → expresión'],
      ['Grammar', 'Present perfect continuous (<i>have/has been + -ing</i>); present perfect vs. present perfect continuous; <i>lately, recently, only, also</i>', 'Notas con tabla, forma correcta, ¿resultado o proceso?, posición de adverbios'],
      ['Listening', 'Escuchar ejemplos y deducir significado; formas débiles de <i>didn\'t</i>', 'Dictado con voz sintética y diálogo de puesta al día con preguntas'],
      ['Speaking', 'Contar qué has estado haciendo, hablar de progreso y ponerse al día', 'Retos con cronómetro y micrófono; vocales /ɑ/ y /æ/'],
      ['Reading', 'Textos sobre hábitos, progreso y ahorrar tiempo', 'Texto nuevo de 230 palabras + ideas principales + inferir vocabulario'],
      ['Writing', 'Un post online; expresiones de tiempo (<i>up to now, so far, from now on…</i>)', 'Notas, elige la expresión, corrige tus errores reales y escribe tu post'],
      ['Social English', '<i>It\'s been a long time / What have you been up to? / That would be awful</i>', 'Frases por situación, ordenar diálogos, respuesta rápida'],
    ],
    cando: [
      "Contar qué he estado haciendo últimamente con el <i>present perfect continuous</i> (<i>I've been working on my thesis lately</i>)",
      "Distinguir <i>present perfect</i> y <i>present perfect continuous</i>: resultado o cantidad (<i>I've written three chapters</i>) frente a proceso (<i>I've been writing all week</i>), con <i>lately / recently</i> al final y <i>only / also</i> antes de <i>been</i>",
      "Hablar de experiencias con <i>achievement, challenge, change, chore, opportunity, process, project, success</i>",
      "Describir mi progreso con el verbo correcto: <i>make good progress, get nowhere, have trouble with, have a chance, do my best, take it easy, save / waste time</i>",
      "Ponerme al día con alguien: <i>It's been a long time</i>, <i>I haven't seen you since / for…</i>, <i>What have you been up to?</i>, <i>Not much / The same as usual</i>, y reaccionar con <i>That would be wonderful / awful</i>",
      "Escribir un post con expresiones de tiempo (<i>up to now, so far, from now on, right away, immediately</i>) sin confundir <i>from now on</i> con <i>up to now</i>",
    ],
    weak: [
      '<b>from now <s>up</s></b> → <b>from now on</b>. La expresión de futuro es <i>from now <b>on</b></i> ("de ahora en adelante"). <i>Up to now</i> existe, pero significa lo contrario: "hasta ahora".',
      '<b><s>inmediately</s></b> → <b>immediately</b>. Se escribe con <b>imm-</b>, no con <i>inm-</i> (interferencia del español <i>inmediatamente</i>).',
      'Ojo con confundir las dos familias: <i>up to now / so far</i> = hasta ahora (present perfect) · <i>from now on / in the future</i> = de ahora en adelante (futuro).',
    ],
    weakLink: 'Trabájalos en <b>Writing › Expresiones de tiempo</b> y <b>Writing › Corrige tus frases</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...EXP.map(e => ({ cat: 'Describing experiences', w: e[0], def: e[1], ex: e[2], ask: e[3] })),
            ...PROG.map(p => ({ cat: 'Describing progress', w: p[0], def: p[1], ex: p[2], ask: p[3] })),
          ] },
        { label: 'Progreso ↔ significado', type: 'match', eyebrow: 'Describing progress', title: 'Empareja la expresión con su significado', intro: 'Toca una expresión de la izquierda y luego su significado de la derecha. Fíjate en qué verbo lleva cada una: <i>have, make, take, do, get, save, spend, waste</i>.', round: 6,
          pairs: PROG.map(p => [p[0], p[1]]) },
        { label: '¿Qué palabra es?', type: 'mcq', eyebrow: 'Describing experiences', title: 'Lee la situación y elige el sustantivo', pool: 7,
          build: ({ pick, esc }) => pick(SIT_EXP, 7).map(s => { const e = EXP.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(EXP_W.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + e[0] + '</b> — ' + e[1] + '. “' + e[2] + '”' }; }) },
        { label: '¿Qué expresión es?', type: 'mcq', eyebrow: 'Describing progress', title: 'Lee la situación y elige la expresión', pool: 7,
          build: ({ pick, esc }) => pick(SIT_PROG, 7).map(s => { const p = PROG.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(PROG_W.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + p[0] + '</b> — ' + p[1] + '. “' + p[2] + '”' }; }) },
        { label: 'El verbo correcto', type: 'mcq', eyebrow: 'Collocations', title: 'Aprende el verbo, no solo el sustantivo', pool: 7, items: [
          { blank: 1, q: "We're ___ good progress on the new API. It's almost done.", opts: ['making', 'doing', 'taking', 'getting'], a: 'making', why: '<b>make good progress</b>. En inglés el progreso se "hace" con <i>make</i>, nunca con <i>do</i>.' },
          { blank: 1, q: "I'm ___ nowhere with this bug. I've tried everything.", opts: ['getting', 'making', 'having', 'doing'], a: 'getting', why: '<b>get nowhere</b> = no avanzar nada.' },
          { blank: 1, q: "Relax, we still ___ time. The train leaves at seven.", opts: ['have', 'make', 'take', 'do'], a: 'have', why: '<b>have time</b> = tener tiempo suficiente. (Y en negativo: <i>I <b>don\'t have</b> time</i>, no <i>I haven\'t time</i>.)' },
          { blank: 1, q: "I haven't ___ a chance to call her back yet.", opts: ['had', 'made', 'taken', 'got'], a: 'had', why: '<b>have a chance</b> = tener la ocasión. En present perfect: <i>haven\'t had a chance</i>.' },
          { blank: 1, q: "Just ___ it easy this weekend. You've been working too much.", opts: ['take', 'have', 'make', 'do'], a: 'take', why: '<b>take it easy</b> = tomárselo con calma.' },
          { blank: 1, q: "I'm ___ trouble with the new framework.", opts: ['having', 'making', 'taking', 'doing'], a: 'having', why: '<b>have trouble with</b> / <b>have problems with</b> = tener dificultades con.' },
          { blank: 1, q: "I can't hear you. I'm trying to ___ on this test.", opts: ['concentrate', 'consider', 'continue', 'consist'], a: 'concentrate', why: '<b>concentrate on</b> + sustantivo o <i>-ing</i>: <i>concentrate on studying</i>.' },
          { blank: 1, q: "I don't play perfectly, but I always ___ my best.", opts: ['do', 'make', 'take', 'have'], a: 'do', why: '<b>do your best</b>. Aquí sí es <i>do</i>: "hacer lo mejor que puedas".' },
          { blank: 1, q: "Cooking on Sunday for the whole week ___ a lot of time.", opts: ['saves', 'wins', 'makes', 'takes'], a: 'saves', why: '<b>save time</b> = ahorrar tiempo.' },
          { blank: 1, q: "Don't ___ time arguing about the color of the button.", opts: ['waste', 'lose', 'miss', 'spend'], a: 'waste', why: '<b>waste time</b> = perder el tiempo en algo inútil. <i>Lose time</i> no se usa así.' },
          { blank: 1, q: "I've been ___ two hours a day on this course.", opts: ['spending', 'passing', 'wasting', 'using'], a: 'spending', why: '<b>spend time</b> (neutro) = dedicar tiempo. <i>Waste</i> sería negativo.' },
          { blank: 1, q: 'Moving the whole garage in one afternoon is a big ___.', opts: ['job', 'chore', 'success', 'process'], a: 'job', why: '<b>job</b> = una tarea concreta que hay que hacer. <i>Chore</i> es una tarea rutinaria y aburrida.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Present perfect continuous', title: 'Empezó antes, sigue ahora', html: `
          <p style="margin:8px 0 14px">El <b>present perfect continuous</b> habla de acciones que <b>empezaron en el pasado y continúan</b> (o acaban de terminar y se nota el efecto). La forma nunca cambia: <b>have/has + been + verbo-ing</b>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Uso</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>have/has + been + -ing</b></td><td>afirmativa</td><td>I<b>'ve been</b> travel<b>ing</b> around Europe for several weeks.</td><td>for, since</td></tr>
            <tr><td><b>haven't/hasn't + been + -ing</b></td><td>negativa</td><td>He <b>hasn't been</b> sleep<b>ing</b> much.</td><td>much, at all</td></tr>
            <tr><td><b>Have/Has</b> + sujeto + <b>been</b> + -ing?</td><td>pregunta</td><td><b>Have</b> you <b>been</b> work<b>ing</b> long hours?</td><td>What have you been doing?</td></tr>
            <tr><td>Yes, I <b>have</b>. / No, she <b>hasn't</b>.</td><td>respuesta corta</td><td>— Has she been doing that alone? — No, she <b>hasn't</b>.</td><td>solo el auxiliar</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:18px">Dónde van los adverbios</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Adverbio</th><th>Posición</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>lately, recently</b></td><td>normalmente <b>al final</b></td><td>Have you been doing anything exciting <b>lately</b>?</td></tr>
            <tr><td><b>only, also</b></td><td><b>antes de <i>been</i></b></td><td>I've <b>only been</b> listening to folk music today.</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:18px">Present perfect <i>vs.</i> present perfect continuous</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th></th><th>Present perfect</th><th>Present perfect continuous</th></tr></thead><tbody>
            <tr><td><b>Mira…</b></td><td>el <b>resultado</b>, lo terminado</td><td>la <b>actividad</b>, el proceso, lo no terminado</td></tr>
            <tr><td><b>Ejemplo</b></td><td>I<b>'ve written</b> three chapters.</td><td>I<b>'ve been writing</b> a book.</td></tr>
            <tr><td><b>Cantidades</b></td><td>sí: <i>I've read <b>two</b> books.</i></td><td>no: <s>I've been reading two books.</s></td></tr>
            <tr><td><b>Duración</b></td><td>posible</td><td>preferida: <i>for two hours, all morning, since May</i></td></tr>
            <tr><td><b>Verbos de estado</b></td><td>sí: <i>I<b>'ve known</b> her for years.</i></td><td>no: <s>I've been knowing her.</s></td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Truco:</b> si puedes contar <i>cuántos</i> → present perfect. Si lo importante es <i>cuánto tiempo llevas</i> o por qué estás cansado/sucio/feliz ahora → present perfect continuous.</div>` },
        { label: 'Forma correcta', type: 'mcq', eyebrow: 'Present perfect continuous', title: 'Elige la forma correcta', pool: 7, items: [
          { blank: 1, q: "You look tired! — I am. I ___ late every night this week.", opts: ["'ve been working", "'m working", 'worked', "'ve worked"], a: "'ve been working", why: 'Empezó esta semana y sigue, y explica por qué está cansado → present perfect continuous.' },
          { blank: 1, q: '___ your sister been working with you at your new business?', opts: ['Has', 'Have', 'Is', 'Does'], a: 'Has', why: '<i>Your sister</i> = tercera persona → <b>Has</b> … been + -ing.' },
          { blank: 1, q: "No, she hasn't. She ___ volunteering at the community center.", opts: ["'s been", "'ve been", 'is been', 'has being'], a: "'s been", why: "<i>She's been</i> = <i>she has been</i> + verbo en -ing." },
          { blank: 1, q: 'What ___ you been doing recently?', opts: ['have', 'has', 'are', 'did'], a: 'have', why: 'Con <i>you</i> siempre <b>have</b>. Y <i>recently</i> va al final.' },
          { blank: 1, q: "My neighbors ___ any noise at all this month.", opts: ["haven't been making", "hasn't been making", "didn't make", "aren't making"], a: "haven't been making", why: 'Sujeto plural → <b>haven\'t been</b> + -ing. Periodo que sigue abierto (<i>this month</i>).' },
          { blank: 1, q: '— Have you been sleeping much? — No, I ___.', opts: ["haven't", "hasn't", "don't", "wasn't"], a: "haven't", why: 'Respuesta corta = solo el auxiliar de la pregunta: <i>Have you…? → No, I haven\'t.</i>' },
          { blank: 1, q: "She ___ been feeling that she needs a big change.", opts: ['recently has', 'has recently', 'has been recently', 'recently'], a: 'has recently', why: '<i>Recently</i> puede ir antes del participio o al final de la frase, pero nunca entre <i>been</i> y el verbo.' },
          { blank: 1, q: "I've ___ been listening to folk music today.", opts: ['only', 'only to', 'been only', 'today only'], a: 'only', why: '<b>only</b> y <b>also</b> van justo <b>antes de <i>been</i></b>.' },
          { blank: 1, q: 'They ___ on that project since January.', opts: ["'ve been working", 'work', 'are working', 'worked'], a: "'ve been working", why: '<i>Since January</i> → empezó en el pasado y continúa.' },
          { blank: 1, q: "Has he ___ getting many interviews?", opts: ['been', 'being', 'be', 'was'], a: 'been', why: 'La estructura es fija: <b>has + been + -ing</b>. <i>Being</i> aquí no existe.' },
          { blank: 1, q: "We started a big project last week, and I ___ really hard to finish it.", opts: ["'ve been working", 'work', 'was working', "'m work"], a: "'ve been working", why: 'Empezó la semana pasada y sigue en marcha → present perfect continuous.' },
          { blank: 1, q: "I ___ out at all lately. I've been too busy.", opts: ["haven't been going", "didn't go", "am not going", "hasn't been going"], a: "haven't been going", why: 'Negativa con <i>lately</i>: <b>haven\'t been</b> + going.' },
        ] },
        { label: '¿Resultado o proceso?', type: 'mcq', eyebrow: 'Present perfect vs. continuous', title: 'Elige entre las dos formas', pool: 7, items: [
          { blank: 1, q: "I ___ three emails this morning. They're all sent.", opts: ["'ve written", "'ve been writing"], a: "'ve written", why: 'Hay una <b>cantidad</b> (three) y están terminados → present perfect.' },
          { blank: 1, q: "I ___ emails all morning. My eyes hurt.", opts: ["'ve been writing", "'ve written"], a: "'ve been writing", why: 'Lo importante es la <b>actividad y su duración</b> (all morning), no cuántos → continuous.' },
          { blank: 1, q: "Sorry about the mess. I ___ the kitchen.", opts: ["'ve been painting", "'ve painted"], a: "'ve been painting", why: 'El efecto visible ahora (el desorden) de una actividad en curso → continuous.' },
          { blank: 1, q: "Look! I ___ the kitchen. Do you like the color?", opts: ["'ve painted", "'ve been painting"], a: "'ve painted", why: 'Está <b>terminado</b> y enseñas el resultado → present perfect.' },
          { blank: 1, q: "She ___ him since high school.", opts: ["'s known", "'s been knowing"], a: "'s known", why: '<b>know</b> es verbo de estado: nunca va en continuo.' },
          { blank: 1, q: "How many chapters ___ so far?", opts: ['have you read', 'have you been reading'], a: 'have you read', why: '<i>How many</i> pregunta por una cantidad terminada → present perfect.' },
          { blank: 1, q: "How long ___ that book?", opts: ['have you been reading', 'have you read'], a: 'have you been reading', why: '<i>How long</i> pregunta por la <b>duración de la actividad</b> → continuous.' },
          { blank: 1, q: "We ___ the house yet. There's still the roof.", opts: ["haven't finished", "haven't been finishing"], a: "haven't finished", why: '<i>Finish</i> marca un final: se usa en present perfect, no en continuo.' },
          { blank: 1, q: "He ___ for that company for ten years, and he's still there.", opts: ["'s been working", "'s worked"], a: "'s been working", why: 'Duración + sigue ahí. Ambas se oyen, pero el curso practica la continua con <i>for</i>.' },
          { blank: 1, q: "I ___ my keys. Have you seen them?", opts: ["'ve lost", "'ve been losing"], a: "'ve lost", why: 'Un acontecimiento puntual con resultado presente → present perfect.' },
          { blank: 1, q: "They ___ to fix the electricity all week, but nothing works.", opts: ["'ve been trying", "'ve tried"], a: "'ve been trying", why: '<i>All week</i> + esfuerzo repetido sin terminar → continuous.' },
          { blank: 1, q: "I ___ this laptop twice this year.", opts: ["'ve repaired", "'ve been repairing"], a: "'ve repaired", why: '<i>Twice</i> es una cantidad → present perfect.' },
        ] },
        { label: 'Repaso de tiempos', type: 'mcq', eyebrow: 'Repaso espaciado', title: 'Todos los tiempos juntos', pool: 6, items: [
          { blank: 1, q: "I ___ to New York City twice. I loved it.", opts: ["'ve been", 'was being', 'am being', "'ve been going"], a: "'ve been", why: 'Experiencia sin fecha → present perfect. Recuerda: <s>I was being to NYC</s>.' },
          { blank: 1, q: 'Sorry, I ___ time to finish it today.', opts: ["don't have", "haven't", "am not having", "don't having"], a: "don't have", why: '<b>have</b> como verbo principal se niega con <b>don\'t have</b>.' },
          { blank: 1, q: 'We opened the park to visitors ___.', opts: ['last week', 'since last week', 'for a week', 'up to now'], a: 'last week', why: 'Simple past con un momento concreto. <i>Since/for/up to now</i> piden present perfect.' },
          { blank: 1, q: 'I ___ a school project when the teacher came in.', opts: ['was doing', 'did', 'have done', 'have been doing'], a: 'was doing', why: 'Acción en progreso interrumpida en el pasado → past continuous.' },
          { blank: 1, q: 'She ___ the dishes every evening after dinner.', opts: ['does', 'is doing', 'has done', 'has been doing'], a: 'does', why: 'Hábito (<i>every evening</i>) → simple present.' },
          { blank: 1, q: 'He ___ to become a doctor. He started three years ago.', opts: ["'s been studying", 'studied', 'studies', 'was studying'], a: "'s been studying", why: 'Empezó hace tres años y sigue → present perfect continuous.' },
          { blank: 1, q: "I ___ of moving to another country. I haven't decided yet.", opts: ["'m thinking", 'think', "'ve thought", 'thought'], a: "'m thinking", why: '<i>Think of/about</i> = proceso mental en curso → sí admite continuo.' },
          { blank: 1, q: 'That ___ a great opportunity for you.', opts: ['would be', 'will been', 'would been', 'would being'], a: 'would be', why: '<b>That would be…</b> es la fórmula para comentar una noticia o sugerencia.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Fíjate en las contracciones (<i>I\'ve, hasn\'t, haven\'t</i>) y en <i>didn\'t</i>, que suele sonar débil, casi como "din\'".',
          sentences: [
            "I've been working late every night this week.",
            'Have you been doing anything exciting lately?',
            "She hasn't been getting many interviews.",
            'What have you been up to?',
            "We're making good progress on the house.",
            "I haven't had a chance to check my phone.",
            "I'm having trouble with my car, so I might be a little late.",
            'Up to now, the project has been a great success.',
            "I didn't have time to do the chores yesterday.",
            'From now on, I\'m going to do a little every day.',
            "It's been a long time. I haven't seen you since last spring.",
            "I've only been listening to folk music today.",
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for examples', title: 'Escucha la conversación y responde', intro: 'Dos amigos se ponen al día. Escúchala entera antes de responder. Presta atención a los <b>ejemplos</b> que da cada uno.',
          lines: [
            ['Marion', "Mateo! It's been a long time. I haven't seen you since Satomi's party."],
            ['Mateo', "I know! What have you been up to?"],
            ['Marion', "The same as usual, really. Work, kids, chores... Actually, no — I've been taking a pottery class on Saturdays. What's going on with your job?"],
            ['Mateo', "We started a big project last week, so I've been working really hard to finish it. I haven't had a chance to see anyone."],
            ['Marion', "Are you making good progress?"],
            ['Mateo', "Up to now, yes. But I'm having trouble with one part — the payment system. I keep calling the supplier and I'm getting nowhere."],
            ['Marion', "That would be awful if it delayed everything. Listen, my brother works with payment systems. I can give you his number."],
            ['Mateo', "That would be excellent. Thanks! From now on I'm going to ask for help sooner."],
          ],
          questions: [
            { q: 'How long has it been since they saw each other?', opts: ["Since Satomi's party", 'Since last week', 'Since Saturday'], a: "Since Satomi's party", why: '"I haven\'t seen you <b>since</b> Satomi\'s party." <i>Since</i> + un momento concreto.' },
            { q: 'What example does Marion give of something new in her life?', opts: ['A pottery class on Saturdays', 'A new job', 'A trip with the kids'], a: 'A pottery class on Saturdays', why: 'Primero dice "the same as usual" y luego se corrige: "I\'ve been taking a pottery class".' },
            { q: 'Why hasn\'t Mateo seen anyone?', opts: ["He's been working hard on a big project", 'He has been sick', 'He moved to another city'], a: "He's been working hard on a big project", why: '"I\'ve been working really hard... I haven\'t had a chance to see anyone."' },
            { q: 'What problem does Mateo have?', opts: ['The supplier of the payment system never helps him', 'His car does not start', 'His team is too small'], a: 'The supplier of the payment system never helps him', why: '"I keep calling the supplier and I\'m <b>getting nowhere</b>."' },
            { q: 'What does "That would be excellent" mean here?', opts: ['He is reacting positively to her offer', 'He is refusing politely', 'He is asking a question'], a: 'He is reacting positively to her offer', why: '<b>That would be + adjetivo</b> sirve para comentar una noticia o una sugerencia: <i>awful, terrible, wonderful, excellent</i>.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'What have you been doing lately?', task: 'Cuenta en 60 segundos tres cosas que has estado haciendo últimamente (trabajo, casa, hobby). Usa <i>I\'ve been …-ing</i> y coloca <i>lately</i> o <i>recently</i> al final.', model: 'Modelo: "I\'ve been working on a big project at work recently. I\'ve also been studying English three times a week, and I haven\'t been going out much lately because I don\'t have time."', tags: ['been', 'lately', 'recently', 'project', 'working', "haven't been"] },
          { t: 'Progress report', task: 'Describe algo que empezaste y no has terminado (un curso, una reforma, un proyecto). Di en qué progresas bien y con qué tienes problemas, usando al menos cuatro expresiones de progreso.', model: 'Modelo: "I\'ve been building a small app for my family. I\'m making good progress with the backend, but I\'m having trouble with the design. I haven\'t had a chance to test it, so up to now I\'m getting nowhere with that part. I\'m doing my best!"', tags: ['making good progress', 'having trouble', 'getting nowhere', 'doing my best', 'chance', 'been'] },
          { t: 'Your biggest achievement', task: 'Habla de un logro tuyo: qué fue, cuánto tiempo estuviste trabajando en ello y por qué fue un reto. Usa <i>achievement, challenge, process, success</i>.', model: 'Modelo: "My biggest achievement was getting my certification. I had been studying for almost two years. The process was long and the exam was a real challenge, but passing it was a big success for me."', tags: ['achievement', 'challenge', 'process', 'success', 'been', 'because'] },
          { t: 'Catching up', task: 'Imagina que te encuentras en la calle con alguien a quien no ves desde hace un año. Haz las dos voces: saludo, cuánto tiempo hace, preguntar por sus noticias y responder.', model: 'Modelo: "Wow, it\'s been a long time! I haven\'t seen you since last spring. — I know! What have you been up to? — Not much, the same as usual. What\'s going on with your job?"', tags: ["it's been a long time", "haven't seen you since", 'what have you been up to', 'the same as usual', 'not much', "what's going on with"] },
          { t: 'React to the news', task: 'Un amigo te cuenta cuatro noticias (dos buenas, dos malas). Invéntalas y reacciona a cada una con <i>That would be…</i> o <i>That\'d be…</i> + un adjetivo distinto.', model: 'Modelo: "My sister is thinking about getting married. — That\'d be wonderful! / They might cancel the project. — That would be terrible. / I could get the promotion. — That would be excellent!"', tags: ['that would be', "that'd be", 'wonderful', 'terrible', 'awful', 'excellent'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación · /ɑ/ vs. /æ/', title: 'Dos vocales que el español no distingue', intro: '<b>/ɑ/</b> es una "a" abierta y larga, con la boca muy abierta (<i>job, problem</i>). <b>/æ/</b> está entre la "a" y la "e" del español, con la boca ancha (<i>chance, have</i>). Escucha y repite cada par.',
          pairs: [
            ['cot /ɑ/ — cat /æ/', 'cot, cat'],
            ['lock /ɑ/ — lack /æ/', 'lock, lack'],
            ['top /ɑ/ — tap /æ/', 'top, tap'],
            ['sock /ɑ/ — sack /æ/', 'sock, sack'],
            ['hot /ɑ/ — hat /æ/', 'hot, hat'],
            ['odd /ɑ/ — add /æ/', 'odd, add'],
            ['stock /ɑ/ — stack /æ/', 'stock, stack'],
            ['job · problem · process /ɑ/', 'job, problem, process'],
            ['chance · challenge · have /æ/', 'chance, challenge, have'],
            ['I have a chance to solve the problem.', 'I have a chance to solve the problem.'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · guessing meaning from context', title: 'Why small steps beat big plans', intro: 'Lee una vez para la idea general. Luego responde. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Every January, millions of people decide to change their lives. They buy a guitar, download a language app, or promise to run ten kilometers every morning. Three weeks later, most of them have stopped. The problem is usually not laziness. The problem is that the first week feels <b>overwhelming</b>, and people who feel that way quit.',
            'Coaches who study habits suggest something that sounds almost silly: make the first version of your new activity ridiculously small. Five minutes of guitar. One page of a book. Running for three minutes, not thirty. It feels <b>trivial</b>, but that is exactly the point. A tiny task is impossible to avoid, so you actually do it — and doing it every day is what builds the habit.',
            'There is a second tip, and it saves even more time: <b>batch</b> your boring jobs. Instead of answering emails eleven times a day, answer them twice. Instead of doing the laundry on Monday, the dishes on Wednesday and the shopping on Friday, do all of your chores on one evening. Every time you stop one activity and start another, your brain needs a few minutes to concentrate again. Those minutes are the time most of us waste without noticing.',
            'None of this is magic. You will still have problems with difficult projects, and some weeks you will get nowhere. But if you have been doing a little every day for six months, you have made more progress than the person who had an enormous plan and <b>abandoned</b> it in week three. Up to now, nobody has found a faster way.',
          ],
          main: [
            { q: 'Doing several small tasks together saves time.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: agrupar (<i>batch</i>) las tareas aburridas y no cambiar de actividad todo el tiempo.' },
            { q: 'Most people give up because the beginning feels too big.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1: no es pereza, es que la primera semana resulta <i>overwhelming</i>.' },
            { q: 'Consistency beats an ambitious plan.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: seis meses haciendo poco cada día > un plan enorme abandonado.' },
            { q: 'Start with a version of the activity that is almost too easy.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: cinco minutos de guitarra, una página de un libro.' },
          ],
          infer: [
            { q: '<b>overwhelming</b> (paragraph 1)', opts: ['too big or too much to deal with', 'very cheap', 'easy and relaxing'], a: 'too big or too much to deal with', why: 'Si la primera semana fuera fácil no lo dejarían; por eso abandonan.' },
            { q: '<b>trivial</b> (paragraph 2)', opts: ['so small that it seems unimportant', 'extremely difficult', 'expensive'], a: 'so small that it seems unimportant', why: 'Habla de cinco minutos o una página: parece insignificante, y ahí está la gracia.' },
            { q: '<b>batch</b> (paragraph 3)', opts: ['do similar things together at one time', 'pay someone else to do them', 'forget about them'], a: 'do similar things together at one time', why: 'Los ejemplos son todos "todo junto en una vez" en lugar de repartido.' },
            { q: '<b>abandoned</b> (paragraph 4)', opts: ['stopped doing it completely', 'finished it early', 'shared it with others'], a: 'stopped doing it completely', why: 'Se opone a la persona que sigue haciendo un poco cada día durante seis meses.' },
          ],
          think: '¿Cuál de las dos ideas (empezar pequeño o agrupar tareas) te serviría más a ti? Escribe dos frases empezando con <i>I\'ve been trying to… so I think…</i> o <i>Up to now I\'ve been …-ing, but from now on…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Expresiones de tiempo', type: 'notes', eyebrow: 'Writing skill', title: 'Cuándo usar cada expresión de tiempo', html: `
          <div class="scroll-x"><table class="table"><thead><tr><th>Expresión</th><th>Significado</th><th>Va con…</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>up to now</b> · <b>so far</b></td><td>hasta ahora</td><td>present perfect / continuous</td><td>The project <b>up to now</b> has been a great success.</td></tr>
            <tr><td><b>before</b> · <b>in the past</b></td><td>antes, en el pasado</td><td>hábitos y experiencias pasadas</td><td><b>In the past</b>, you had some good opportunities.</td></tr>
            <tr><td><b>in the future</b> · <b>from now on</b></td><td>en el futuro, de ahora en adelante</td><td>planes</td><td><b>From now on</b>, I'm going to do the chores after work.</td></tr>
            <tr><td><b>right away</b> · <b>immediately</b></td><td>inmediatamente</td><td>pasado, presente y futuro</td><td>I called him <b>right away</b>. / Send it <b>immediately</b>.</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Tus dos errores del curso:</b><br>· <s>from now up</s> → <b>from now on</b>. <i>Up to now</i> significa lo contrario (hasta ahora).<br>· <s>inmediately</s> → <b>immediately</b>: <b>i-m-m</b>, no <i>inm-</i>.</div>
          <h3 style="margin-top:18px">Posición en la frase</h3>
          <p style="margin-top:6px">La expresión de tiempo puede ir al principio o al final, y eso cambia el <b>registro</b>:</p>
          <ul class="small" style="padding-left:18px;margin:6px 0">
            <li><b>Formal:</b> <i><b>From now on</b>, I'm going to try to study a little every day.</i> (al principio)</li>
            <li><b>Informal:</b> <i>I'm going to try to study a little every day <b>from now on</b>.</i> (al final)</li>
          </ul>
          <div class="hint small" style="margin-top:10px">El significado es el mismo. En un post online o un mensaje a un amigo, al final suena más natural.</div>` },
        { label: 'Elige la expresión', type: 'mcq', eyebrow: 'Time expressions', title: 'Completa con la expresión correcta', pool: 7, items: [
          { blank: 1, q: "___, I'm going to leave my phone in another room while I work.", opts: ['From now on', 'From now up', 'Up to now', 'In the past'], a: 'From now on', why: 'Plan de futuro → <b>from now on</b>. Cuidado: <s>from now up</s> no existe.' },
          { blank: 1, q: '___ the project has been a great success. We hope it continues.', opts: ['Up to now', 'From now on', 'In the future', 'Right away'], a: 'Up to now', why: '<b>Up to now</b> / <b>so far</b> = hasta ahora, y pide present perfect.' },
          { blank: 1, q: 'She answered my email ___, in less than two minutes.', opts: ['immediately', 'inmediately', 'up to now', 'in the past'], a: 'immediately', why: 'Se escribe con <b>imm-</b>: <i>immediately</i>. También vale <i>right away</i>.' },
          { blank: 1, q: '___, you had some very good opportunities in that company.', opts: ['In the past', 'So far', 'From now on', 'Right away'], a: 'In the past', why: 'Experiencias pasadas terminadas → <b>in the past</b> / <b>before</b>.' },
          { blank: 1, q: "I've written four chapters ___. Only two more to go.", opts: ['so far', 'in the future', 'from now on', 'before'], a: 'so far', why: '<b>So far</b> = hasta este momento, con un proceso que sigue.' },
          { blank: 1, q: 'If the alarm goes off, leave the building ___.', opts: ['right away', 'up to now', 'in the past', 'so far'], a: 'right away', why: '<b>Right away</b> = inmediatamente; sirve para pasado, presente y futuro.' },
          { blank: 1, q: '___ I want to travel more and work fewer weekends.', opts: ['In the future', 'Up to now', 'Before', 'So far'], a: 'In the future', why: 'Planes → <b>in the future</b> / <b>from now on</b>.' },
          { blank: 1, q: "I used to waste a lot of time on my phone ___.", opts: ['before', 'from now on', 'in the future', 'right away'], a: 'before', why: '<b>Before</b> se refiere a hábitos anteriores, como <i>in the past</i>.' },
          { q: '¿Cuál de estas frases suena más <b>informal</b>?', opts: ["I'm going to study a little every day from now on.", 'From now on, I am going to study a little every day.'], a: "I'm going to study a little every day from now on.", why: 'La expresión de tiempo <b>al final</b> es la opción informal; al principio es más formal.' },
          { q: '¿Cuál es correcta?', opts: ['From now on, I will call you immediately.', 'From now up, I will call you inmediately.'], a: 'From now on, I will call you immediately.', why: '<b>from now on</b> + <b>immediately</b> (con imm-). Tus dos errores del curso, juntos.' },
        ] },
        { label: 'Corrige tus frases', type: 'fix', eyebrow: 'Error correction · tus errores reales', title: 'Reescribe la frase corrigiendo el error', intro: 'Las dos primeras salen de tus respuestas marcadas en rojo en el curso. Las demás son errores típicos de esta unidad. Cada frase tiene uno o dos fallos.', items: [
          { bad: 'To talk about your future plans, use in the future or from now up.', good: 'To talk about your future plans, use in the future or from now on.', why: 'La expresión es <b>from now on</b> ("de ahora en adelante"). <i>Up to now</i> existe, pero significa "hasta ahora" y mira al pasado.' },
          { bad: 'You can use right away or inmediately with past, present, and future verbs.', good: 'You can use right away or immediately with past, present, and future verbs.', why: '<b>immediately</b> lleva <b>i-m-m</b>. El español <i>inmediatamente</i> te empuja a escribir <i>inm-</i>.' },
          { bad: "I've been writing three emails this morning.", good: "I've written three emails this morning.", why: 'Con una <b>cantidad</b> (three) se usa present perfect, no continuo. El continuo mira la actividad, no el número.' },
          { bad: 'She has been know him since high school.', good: "She has known him since high school.", why: 'Dos fallos: <i>know</i> es verbo de estado (no admite continuo) y, si hubiera continuo, sería <i>been knowing</i>. Lo correcto es <b>has known</b>.' },
          { bad: "I haven't time to do the chores, so I am getting nowhere with the house.", good: "I don't have time to do the chores, so I'm getting nowhere with the house.", why: '<b>have</b> como verbo principal se niega con <b>don\'t have</b>. (<i>Haven\'t</i> solo como auxiliar: <i>I haven\'t finished</i>.)' },
          { bad: 'Has your sister being working with you lately?', good: 'Has your sister been working with you lately?', why: 'La estructura es fija: <b>has + been + -ing</b>. <i>Being</i> no entra aquí.' },
          { bad: "I've been recently doing a lot of overtime.", good: "I've been doing a lot of overtime recently.", why: '<b>recently</b> y <b>lately</b> van normalmente <b>al final</b> de la frase; nunca entre <i>been</i> y el verbo.' },
          { bad: 'We are making a good progress with the new project.', good: 'We are making good progress with the new project.', why: '<b>progress</b> es incontable: sin <i>a</i>. Y siempre <b>make</b> progress, no <i>do</i>.' },
        ] },
        { label: 'Escribe tu post', type: 'comment', eyebrow: 'Writing task · an online post', title: 'Publica una actualización sobre lo que has estado haciendo', intro: 'Escribe 70-120 palabras, como el post "Here\'s an update!" del curso: qué has estado haciendo tú y tu gente, en qué progresas y qué vas a cambiar. La checklist se marca sola al analizar tu texto.', placeholder: "Hi everyone! Some of you have been asking what I've been up to. Here's an update...", min: 70, max: 120, need: 4, checks: [
          { label: 'Uso <b>present perfect continuous</b> afirmativo (<i>I\'ve been …-ing</i>)', re: /\b(i've been|i have been|we've been|we have been|he's been|she's been|they've been|has been|have been)\s+\w+ing/ },
          { label: 'Uso una forma <b>negativa</b> o una <b>pregunta</b> (<i>haven\'t been …-ing / Have you been…?</i>)', re: /\b(haven't been|hasn't been|have you been|has he been|has she been|have they been)/ },
          { label: 'Incluyo <i>lately</i> o <i>recently</i> (mejor al final de la frase)', re: /\b(lately|recently)\b/ },
          { label: 'Uso al menos una expresión de <b>progreso</b> de la unidad', re: /\b(concentrat(e|ing|ed) on|do(ing|es)? (my|your|his|her|their) best|did (my|your|his|her|their) best|get(ting|s)? nowhere|got nowhere|(have|has|had|having) (a chance|time|problems with|trouble with)|mak(e|ing|es) good progress|made good progress|sav(e|ing|es|ed) time|spend(ing|s)? time|spent time|tak(e|ing|es) it easy|took it easy|wast(e|ing|es|ed) time)\b/ },
          { label: 'Uso al menos un <b>sustantivo de experiencia</b> (<i>project, challenge, achievement…</i>)', re: /\b(achievements?|challenges?|changes?|chores?|jobs?|opportunit(y|ies)|process(es)?|projects?|success(es)?)\b/ },
          { label: 'Uso una <b>expresión de tiempo</b> (<i>up to now, so far, from now on, right away…</i>)', re: /\b(up to now|so far|in the past|from now on|in the future|right away|immediately|before)\b/ },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Ponerse al día, por situación', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Saying how long it's been</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>It's been a long time.</li><li>I haven't seen you since… <i>(last spring / last year)</i></li><li>I haven't seen you for… <i>(months / a long time)</i></li></ul></div>
          <div><h3>Asking about someone's news</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>What have you been up to?</li><li>What have you been doing?</li><li>How have you been?</li><li>What's going on with…? <i>(Peter / your mom / your job)</i></li></ul></div>
          <div><h3>Answering</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>The same as usual.</li><li>Not much.</li><li>I've been (really) busy.</li></ul></div>
          <div><h3>Commenting on news — <i>That would be…</i></h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>That would be <b>awful</b> / <b>terrible</b>. <i>(malas noticias)</i></li><li>That'd be <b>wonderful</b> / <b>excellent</b>. <i>(buenas noticias)</i></li></ul></div>
          <div class="hint small"><b>since vs. for</b>: <i>since</i> + un punto en el tiempo (<i>since March, since we met</i>); <i>for</i> + una duración (<i>for two months, for a long time</i>).<br><br><b>That would be…</b> (o <i>That'd be…</i>) comenta algo que <b>todavía no ha pasado</b>: reaccionas a una posibilidad o a una sugerencia, no a un hecho.</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ["José: Hey! I haven't seen you since Satomi's party!", "Ana: I know! It's been a long time.", 'José: What have you been up to?', 'Ana: The same as usual, really. Work, kids, chores...', "Ana: How about you? What's going on with your job?", "José: Not much. I started a new project last spring."],
          ['Marion: Hey, Mateo! What have you been doing recently?', "Mateo: Not much! We started a big project at work last week.", "Mateo: I've been working really hard to finish it. How about you?", "Marion: I've been really busy too. My sister has been staying with me.", "Marion: She's thinking about moving to Canada.", 'Mateo: That would be a big change for her!'],
          ["Dena: Hi, Tom. How have you been?", "Tom: Sorry I missed your call. I've been answering emails all day.", "Tom: I haven't had a chance to check my phone.", 'Dena: No problem. Are you still OK to meet at six?', "Tom: Yes, I'll do my best. I've been having trouble with my car.", "Dena: I'll come and get you. That'll save time.", 'Tom: Oh, that would be fantastic. Thanks!'],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', pool: 7, items: [
          { q: 'No ves a un amigo desde marzo. ¿Cómo lo dices?', opts: ["I haven't seen you since March.", "I haven't seen you for March.", "I don't see you since March.", 'I am not seeing you since March.'], a: "I haven't seen you since March.", why: '<b>since</b> + punto en el tiempo, y el verbo en present perfect: <i>haven\'t seen</i>.' },
          { q: 'No lo ves desde hace seis meses. ¿Cómo lo dices?', opts: ["I haven't seen you for six months.", "I haven't seen you since six months.", "I didn't see you for six months.", 'I am not seeing you for six months.'], a: "I haven't seen you for six months.", why: '<b>for</b> + duración. <i>Since six months</i> es el error clásico.' },
          { q: '"What have you been up to?" — No ha pasado nada especial.', opts: ['Not much, the same as usual.', "Yes, I have.", "I don't know him.", 'It has been a long time.'], a: 'Not much, the same as usual.', why: 'Las dos respuestas estándar cuando no hay novedades: <i>Not much</i> / <i>The same as usual</i>.' },
          { q: '"How have you been?" — Has tenido muchísimo trabajo.', opts: ["I've been really busy.", "I am really busy since.", "I was being busy.", 'I have really busy.'], a: "I've been really busy.", why: '<b>I\'ve been (really) busy</b> es la fórmula del curso.' },
          { q: 'Quieres preguntar por el trabajo de tu amigo.', opts: ["What's going on with your job?", "What's going in your job?", 'How is going your job?', 'What you have been doing your job?'], a: "What's going on with your job?", why: '<b>What\'s going on with…?</b> + persona o tema.' },
          { q: '"Lenny got another speeding ticket. His parents are thinking about taking away his car."', opts: ['That would be awful! He loves his car.', "That would be excellent!", "That has been a long time.", 'Not much.'], a: 'That would be awful! He loves his car.', why: 'Mala noticia posible → <b>That would be awful / terrible</b>.' },
          { q: '"My sister\'s thinking about getting married to Tom!"', opts: ["That'd be wonderful! He's such a sweet guy.", "That'd be terrible.", "I haven't seen you since.", "I've been really busy."], a: "That'd be wonderful! He's such a sweet guy.", why: 'Buena noticia posible → <b>That\'d be wonderful / excellent</b>.' },
          { q: '"It looks like my laptop\'s broken."', opts: ['I hope not! That would be terrible.', 'That would be excellent!', 'The same as usual.', "What's going on with?"], a: 'I hope not! That would be terrible.', why: 'Reaccionas a algo malo que quizá pase: <b>That would be terrible</b>.' },
          { q: 'Te ofrecen ir a recogerte en coche para ahorrar tiempo.', opts: ['Oh, that would be fantastic. Thanks!', 'That would be awful.', "I haven't had a chance.", 'The same as usual.'], a: 'Oh, that would be fantastic. Thanks!', why: '<b>That would be + adjetivo positivo</b> también sirve para aceptar una oferta con entusiasmo.' },
          { q: 'Acabas de encontrarte con alguien tras mucho tiempo. Primera frase.', opts: ["Wow! It's been a long time.", "Wow! It has a long time.", 'Wow! It is a long time ago.', 'Wow! Long time it has been.'], a: "Wow! It's been a long time.", why: '<b>It\'s been a long time</b> = <i>It has been</i>. Es la apertura típica.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Un café en Miraflores: ponerse al día', intro: 'Sales a comprar un café cerca del banco y te cruzas con Rocío, una excompañera de equipo a la que no ves desde la hackathon del año pasado. Dile cuánto tiempo ha pasado, cuenta qué has estado haciendo (tesis, negocio, trabajo), pregunta por sus noticias y reacciona a lo que te cuente. Si solo hablas de ti, la conversación se enfría.', scenes: [
          { t: 'Café en Miraflores', you: 'Aldo, en la cola del café', partner: 'Rocío', role: 'excompañera del banco; ahora trabaja en una startup', goal: 'Saluda con las fórmulas de la unidad, cuenta tu progreso con present perfect continuous, acepta su ayuda con <i>That would be…</i> y pregunta por sus noticias.', start: 'a', nodes: {
            a: { say: "Aldo? Aldo! Oh my gosh, is that you?", opts: [
              { t: "Rocío! Wow, it's been a long time! I haven't seen you since the hackathon last year.", ok: 2, why: "Las dos fórmulas de la unidad para decir cuánto tiempo ha pasado: <b>It's been a long time</b> y <b>I haven't seen you since</b> + un momento concreto.", next: 'b' },
              { t: "Hey, Rocío! It's been a long time. How have you been?", ok: 1, why: "Correcta: <b>It's been a long time</b> + <b>How have you been?</b> Natural, aunque no dices desde cuándo.", next: 'b' },
              { t: "Rocío! I don't see you since one year!", ok: 0, why: "Dos calcos del español: el verbo va en present perfect (<b>I haven't seen you</b>) y con una duración se usa <b>for</b>, no <i>since</i>: <i>for a year</i>.", next: 'a2' },
            ] },
            a2: { say: "Since… what? Oh, you mean since the hackathon? Yeah, about a year!", opts: [
              { t: "Right! I haven't seen you for a year. Time flies.", ok: 2, why: "Te corriges con la forma correcta: <b>I haven't seen you for</b> + duración (<i>for a year</i>).", next: 'b' },
              { t: "Yes, since the hackathon. It's been a long time.", ok: 1, why: "Correcta: <b>since</b> + momento concreto, y recuperas <b>It's been a long time</b>.", next: 'b' },
              { t: "Yes, it has one year.", ok: 0, why: "Calco de “hace un año”. En inglés: <b>It's been a year</b> o <i>a year ago</i>. Rocío lo deja pasar, pero suena raro.", next: 'b' },
            ] },
            b: { say: "I know! So, what have you been up to?", opts: [
              { t: "Not much, the same as usual. Well… I've been working on my thesis lately, and the food business keeps us busy.", ok: 2, why: "Respondes con las fórmulas de la unidad (<b>Not much</b>, <b>the same as usual</b>) y luego cuentas una actividad en curso con <b>I've been working on</b> + <i>lately</i> al final.", next: 'c' },
              { t: "I've been really busy. Work, the thesis, the business…", ok: 1, why: "Correcta: <b>I've been really busy</b> es otra respuesta del curso. Con un verbo en <i>-ing</i> darías más detalle.", next: 'c' },
              { t: "I've been work in my thesis lately.", ok: 0, why: "La forma es fija: <b>have been + -ing</b> (<i>working</i>). Y en inglés se trabaja <b>on</b> una tesis, no <i>in</i>.", next: 'c' },
            ] },
            c: { say: "A thesis! Are you making good progress?", opts: [
              { t: "Up to now, yes. I've written three chapters so far, but I haven't had a chance to work on it this month.", ok: 2, why: "Mezcla perfecta de la unidad: <b>up to now</b> / <b>so far</b>, present perfect simple con cantidad (<b>I've written three chapters</b>) y <b>I haven't had a chance to</b>.", next: 'd' },
              { t: "Yes, I'm making good progress, but it's a slow process.", ok: 1, why: "Correcta: <b>make good progress</b> y <b>process</b>, dos piezas de vocabulario de la unidad.", next: 'd' },
              { t: "I'm making a good progress, but I haven't time.", ok: 0, why: "<b>progress</b> es incontable: sin <i>a</i>. Y <i>have</i> como verbo principal se niega con <b>don't have</b>: <i>I don't have time</i>.", next: 'd' },
            ] },
            d: { say: "And the food business? Are you and your wife still doing that?", opts: [
              { t: "We are! We've been getting more orders recently, but I'm having trouble with our delivery app. I keep calling the developer and I'm getting nowhere.", ok: 2, why: "Present perfect continuous con <i>recently</i> al final y dos expresiones de progreso: <b>have trouble with</b> y <b>get nowhere</b>.", next: 'e' },
              { t: "Yes. It's been a big success, actually, but we've been having problems with the delivery app.", ok: 1, why: "Correcta: <b>success</b> y <b>have problems with</b> son de la unidad. Funciona bien.", next: 'e' },
              { t: "Yes, but I have problems with the app of delivery since two months.", ok: 0, why: "Con una duración va <b>for</b> (<i>for two months</i>) y el verbo en present perfect continuous: <b>I've been having problems with</b>. Además, <i>delivery app</i>, no <i>app of delivery</i>.", next: 'e' },
            ] },
            e: { say: "You know, my cousin builds delivery apps for small restaurants. I could put you in touch with her.", opts: [
              { t: "Really? That would be wonderful! It'd save us so much time.", ok: 2, why: "Reaccionas a una oferta que aún no ha pasado con <b>That would be wonderful</b>, y añades <b>save time</b>, de la unidad.", next: 'f' },
              { t: "That'd be great, thanks. Could you send me her number?", ok: 1, why: "Correcta: <b>That'd be</b> + adjetivo positivo. <i>Great</i> vale, aunque la unidad propone <i>wonderful / excellent</i>.", next: 'f' },
              { t: "That would be awful! Thanks.", ok: 0, why: "Cruzaste los adjetivos: <b>awful / terrible</b> son para malas noticias; para una oferta buena, <b>wonderful / excellent</b>.", next: 'e2' },
            ] },
            e2: { say: "Awful? Oh… OK. I thought it might help.", opts: [
              { t: "No, no, sorry, wrong word! I meant that would be wonderful. Please, send me her number.", ok: 2, why: "Reparas el malentendido (<b>wrong word</b>) y repites la fórmula correcta: <b>that would be wonderful</b>.", next: 'f' },
              { t: "Sorry, I meant it would be great. Yes, please.", ok: 1, why: "Correcta y breve. Aclaras y aceptas.", next: 'f' },
              { t: "No, is OK, don't worry.", ok: 0, why: "Falta el sujeto (<b>it's OK</b>) y, peor, rechazas la ayuda sin querer. Rocío se queda con el “awful” y la oferta se pierde.", next: 'fail' },
            ] },
            f: { say: "Done, I'll text you tonight. And what's going on with the bank? Still in the payments team?", opts: [
              { t: "Yes, and we're making good progress on a new project. What's going on with you? Are you still at the startup?", ok: 2, why: "Contestas y devuelves la pregunta con la fórmula de la unidad: <b>What's going on with…?</b> Una conversación de ponerse al día es de ida y vuelta.", next: 'g' },
              { t: "The same as usual, really. Lots of projects. How about you?", ok: 1, why: "Correcta: <b>The same as usual</b> + <i>How about you?</i> para devolver el turno.", next: 'g' },
              { t: "Yes. The same.", ok: 0, why: "Gramaticalmente pasa, pero es demasiado seco y no preguntas nada. Rocío lleva un rato interesándose por ti.", next: 'f2' },
            ] },
            f2: { say: "Oh. OK… Well, I should probably get going.", opts: [
              { t: "Wait, sorry, I've been talking about myself the whole time. What's going on with you? How's the startup?", ok: 2, why: "Salvas la conversación: reconoces el fallo con <b>I've been talking</b> y preguntas con <b>What's going on with you?</b>", next: 'g' },
              { t: "Sorry! And you? What have you been doing?", ok: 1, why: "Correcta: <b>What have you been doing?</b> es otra pregunta de la unidad para pedir noticias.", next: 'g' },
              { t: "OK, bye. See you.", ok: 0, why: "La dejas ir sin preguntarle nada. Una puesta al día en la que solo habla uno no es una puesta al día.", next: 'meh' },
            ] },
            g: { say: "Well… I've been thinking about moving to Madrid. There's a job offer.", opts: [
              { t: "Madrid? That'd be a big change! But what an opportunity. Let's not wait another year to catch up, OK?", ok: 2, why: "Comentas una posibilidad con <b>That'd be</b> + sustantivo de la unidad (<b>a big change</b>, <b>opportunity</b>) y cierras proponiendo seguir en contacto.", next: 'win' },
              { t: "Wow, that would be excellent! Congratulations.", ok: 1, why: "Correcta: <b>That would be excellent</b>. Ojo: aún lo está pensando, así que <i>congratulations</i> se adelanta un poco.", next: 'win' },
              { t: "Madrid! It will be a very big change.", ok: 0, why: "Todavía no ha decidido nada: para algo que <b>aún no ha pasado</b> se usa <b>That would be…</b>, no <i>will</i>. Con <i>will</i> suena a que ya se va.", next: 'meh' },
            ] },
            win: { say: "Deal! I'll text you my cousin's number tonight. So good to see you, Aldo!", end: true, outcome: 'win', note: 'Dijiste cuánto tiempo había pasado (<b>It\'s been a long time</b>, <b>I haven\'t seen you since…</b>), contaste tu progreso con <b>I\'ve been working on…</b>, <b>make good progress</b> y <b>have trouble with</b>, aceptaste la ayuda con <b>That would be wonderful</b> y devolviste la pregunta con <b>What\'s going on with you?</b>' },
            meh: { say: "Yeah… see you around, Aldo. Take care.", end: true, outcome: 'meh', note: 'Contaste bien lo tuyo, pero la conversación quedó coja: o no preguntaste por ella o reaccionaste a su noticia con <i>will</i>. Recuerda <b>What\'s going on with you?</b> y, para algo que aún no ha pasado, <b>That would be a big change</b>.' },
            fail: { say: "Oh. OK then. Well… good luck with the app, I guess.", end: true, outcome: 'fail', note: 'Perdiste el contacto de la prima por dos detalles: <b>awful</b> es para malas noticias (aquí tocaba <b>That would be wonderful / excellent</b>) y <i>is OK</i> sin sujeto sonó a rechazo. Para aceptar una oferta: <b>That would be wonderful. Thanks!</b>' },
          } },
        ] },
      ] },
    ],
  };
})();
