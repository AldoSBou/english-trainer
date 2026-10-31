/* ===========================================================
   ingles3/unit1.js — Inglés 3 · Unit 1: Getting to know people
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Vocabulario base ---------- */
  /* [palabra, significado ES, ejemplo EN, pregunta personal ES] */
  const PERS = [
    ['brave', 'valiente', 'She was brave enough to speak in front of 500 people.', '¿Cuándo has sido valiente?'],
    ['cheerful', 'alegre, de buen humor', 'My neighbor is so cheerful. He says hello to everyone.', '¿Quién es la persona más alegre que conoces?'],
    ['easygoing', 'tranquilo, relajado, fácil de llevar', "My boss is easygoing. He never gets angry about small things.", '¿Eres una persona relajada o te estresas fácilmente?'],
    ['generous', 'generoso', 'She is very generous with her time and always helps new students.', '¿Con qué eres generoso: tu tiempo o tu dinero?'],
    ['helpful', 'servicial, que echa una mano', 'Thanks for the directions. You have been really helpful.', '¿Cuándo fue la última vez que alguien te ayudó?'],
    ['honest', 'honesto, sincero', "I'll be honest with you: the plan needs more work.", '¿Prefieres una respuesta sincera o una amable?'],
    ['intelligent', 'inteligente', 'He is intelligent, but he never shows off.', '¿Qué tipo de inteligencia admiras más?'],
    ['nervous', 'nervioso', 'I always get nervous before a job interview.', '¿Qué te pone nervioso?'],
    ['reliable', 'fiable, de confianza', 'Ana is reliable. If she says she will do it, she does it.', '¿Quién es la persona más fiable de tu equipo?'],
    ['selfish', 'egoísta', "Don't be selfish. Share the cake with your sister.", '¿Es a veces necesario ser un poco egoísta?'],
    ['serious', 'serio, formal', 'He looks serious, but he tells great jokes.', '¿La gente te ve serio o divertido?'],
    ['sociable', 'sociable', 'She is very sociable. She knows everyone in the building.', '¿Te gustan las fiestas con gente nueva?'],
  ];
  const INFO = [
    ['be born', 'nacer', 'I was born in Lima in 1990.', '¿Dónde naciste?'],
    ['be into', 'ser aficionado a, gustarle mucho', 'What kinds of sports are you into?', '¿En qué estás muy metido ahora mismo?'],
    ['be married', 'estar casado/a', "I'm married to Hiro. He's my husband.", '¿Cuánta gente de tu familia está casada?'],
    ['be raised', 'criarse, ser criado', 'I was born in the U.S., but I was raised in Japan.', '¿Te criaste en la misma ciudad en la que naciste?'],
    ['be single', 'estar soltero/a', "My brother is single. He isn't married.", '¿Conoces a alguien que esté feliz estando soltero?'],
    ['celebrate', 'celebrar', 'Last year we celebrated our tenth wedding anniversary.', '¿Qué celebras cada año sin falta?'],
    ['live alone', 'vivir solo/a', 'Now I live alone in a small apartment near the park.', '¿Has vivido solo alguna vez?'],
    ['live with family', 'vivir con la familia', 'I live with my husband and my son Yuto.', '¿Con quién vives ahora?'],
    ['retire', 'jubilarse', 'My dad is going to retire this year.', '¿A qué edad te gustaría jubilarte?'],
  ];

  const ADJ = PERS.map(p => p[0]);

  /* Comportamiento típico → adjetivo (para match y mcq contextual) */
  const BEHAVIOR = [
    ['brave', 'faces danger without running away'],
    ['cheerful', 'smiles a lot and is in a good mood'],
    ['easygoing', "doesn't get stressed about small things"],
    ['generous', 'gives time and money to other people'],
    ['helpful', 'always offers to do things for you'],
    ['honest', 'never tells lies, even when it is hard'],
    ['intelligent', 'learns and understands things quickly'],
    ['nervous', "worries a lot and can't relax"],
    ['reliable', 'always does what he or she promises'],
    ['selfish', 'thinks only about himself or herself'],
    ['serious', "doesn't joke much and is quite formal"],
    ['sociable', 'loves being with other people'],
  ];

  const SIT = [
    ['She jumped into the river to help a child who had fallen in.', 'brave'],
    ['He sings in the kitchen every morning and greets the whole office with a smile.', 'cheerful'],
    ['Their flight was cancelled and he just said: "No problem, we can fly tomorrow."', 'easygoing'],
    ['She paid for everybody\'s dinner and refused to take any money back.', 'generous'],
    ['He carried my boxes up three floors without me asking.', 'helpful'],
    ['The customer asked if the phone was new. He said: "No, it was repaired last month."', 'honest'],
    ['He learned Portuguese in five months and now he reads novels in it.', 'intelligent'],
    ['Her hands were shaking before the presentation and she kept checking her notes.', 'nervous'],
    ['If she says the report will be ready on Friday, it is ready on Friday.', 'reliable'],
    ['There was one slice of pizza left and he took it without asking anyone.', 'selfish'],
    ['He wears a suit to every meeting and never makes small talk.', 'serious'],
    ['She arrived alone at the party and left with six new phone numbers.', 'sociable'],
  ];

  window.UNIT_DATA['ingles3/unit1'] = {
    source: 'WeTalk · Level 3 · Unit 1 · Getting to know people',
    description: 'Describir la personalidad y dar información personal, preguntas de información (which/whose/how…) y preguntas indirectas para sonar más educado.',
    map: [
      ['Vocabulary', '12 adjetivos de personalidad (<i>brave, easygoing, reliable…</i>) y 9 expresiones de información personal (<i>be born, be raised, be into, retire…</i>)', 'Flashcards con audio, emparejar comportamiento ↔ adjetivo, situación → cualidad, huecos con <i>be born/raised/into…</i>'],
      ['Grammar', 'Information questions (<i>which, whose, how, where, when, why, what</i>) e indirect questions (<i>Can you tell me…? / I wonder if…</i>)', 'Elige la palabra interrogativa, convierte directa → indirecta, caza el error de orden'],
      ['Listening', 'Conversaciones para conocerse (Nina y Mia, Amber y Jared)', 'Dictado con voz sintética y diálogo nuevo con preguntas'],
      ['Speaking', 'Presentarse, preguntar con educación, hablar de tu vida', 'Retos con cronómetro y micrófono; acento en la información nueva'],
      ['Reading', 'Refuerzo del tema de la unidad', 'Texto original sobre conocer gente nueva + inferir significado por contexto'],
      ['Writing', 'Review your writing skills: perfil personal', 'Corrige tus propios errores, reescribe en forma indirecta, checklist'],
      ['Social English', 'Lesson 3 "Nice talking to you": presentaciones, cómo conoces a alguien, cerrar una conversación, <i>hold on a sec</i>', 'Ordenar diálogos y responder rápido'],
    ],
    cando: [
      "Presentarme y presentar a alguien (<i>Hello, I'm Aldo</i> · <i>This is Nina, Jodi's coworker</i>) y decir cómo conozco a una persona (<i>How do you know Jodi? — I work with her</i>)",
      "Describir la personalidad de alguien con los adjetivos de la unidad (<i>reliable, easygoing, generous, honest, selfish…</i>) y dar un ejemplo concreto",
      "Dar información personal con <i>be born / be raised / be married to / be single / be into / live alone / retire</i>",
      "Elegir la palabra interrogativa correcta: <i>which</i> (grupo cerrado), <i>whose</i> (posesión), <i>how</i> (manera), <i>where / when / why / what</i>",
      "Hacer preguntas indirectas para sonar más educado (<i>Can you tell me where you were raised?</i> · <i>I wonder if…</i>) con orden de afirmativa, sin <i>do/does/did</i> y con <i>if</i> en las de sí/no",
      "Reaccionar a <i>I've heard a lot about you</i> (<i>Good things, I hope!</i>), interrumpir con <i>Hold on a sec</i> y cerrar una conversación (<i>I should let you go. It was nice to meet you</i>)",
    ],
    weak: [
      '<b>Orden de palabras</b>: escribiste <i>"I want to find out how expensive <s>is</s>…"</i> → <i>how expensive <b>it is</b></i>. En una pregunta indirecta el orden es de <b>frase afirmativa</b>: sujeto + verbo.',
      '<b>Orden de palabras</b>: <i>"I\'d like to know who <s>are those people</s>."</i> → <i>who <b>those people are</b></i>.',
      '<b>be raised</b>: <i>"Can you tell me where you <s>are</s> raised?"</i> → <i>where you <b>were</b> raised</i>. Criarse es algo del pasado: pasado de <i>be</i>.',
      '<b>Tercera persona</b>: <i>"Do you have any idea when your teacher <s>want</s> to retire?"</i> → <i><b>wants</b></i>. Al quitar el <i>does</i>, la <b>-s</b> vuelve al verbo.',
      '<b>Dos frases en una</b>: <i>"I wonder if he is a good friend <s>I\'d like to meet him</s>."</i> → <i>I wonder if he is a good friend. <b>I\'d like to meet him.</b></i>',
    ],
    weakLink: 'Trabájalos en <b>Writing › Corrige tus frases</b> y en <b>Grammar › Caza el error</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...PERS.map(p => ({ cat: 'Describing personality', w: p[0], def: p[1], ex: p[2], ask: p[3] })),
            ...INFO.map(p => ({ cat: 'Giving personal information', w: p[0], def: p[1], ex: p[2], ask: p[3] })),
          ] },
        { label: 'Comportamiento ↔ adjetivo', type: 'match', eyebrow: 'Describing personality', title: 'Empareja la conducta con el adjetivo', intro: 'Toca una descripción de la izquierda y luego el adjetivo que le corresponde.', pairs: BEHAVIOR.map(b => [b[1], b[0]]), round: 6 },
        { label: '¿Qué persona es?', type: 'mcq', eyebrow: 'Describing personality', title: 'Lee la situación y elige el adjetivo', pool: 7,
          build: ({ pick, esc }) => pick(SIT, 7).map(s => {
            const b = BEHAVIOR.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(ADJ.filter(x => x !== s[1]), 3)], a: s[1], why: `<b>${b[0]}</b> = ${b[1]}. (${PERS.find(p => p[0] === b[0])[1]})` };
          }) },
        { label: 'Información personal', type: 'mcq', eyebrow: 'Giving personal information', title: 'Completa con la expresión correcta', pool: 7, items: [
          { blank: 1, q: 'I ___ in Arequipa, but my family moved to Lima when I was two.', opts: ['was born', 'am born', 'was raised', 'born'], a: 'was born', why: '<b>be born</b> siempre en pasado y en pasiva: <i>I was born</i>. Nunca <i>I born</i>.' },
          { blank: 1, q: 'I was born in Chicago, but I ___ in a small town in Ohio.', opts: ['was raised', 'raised', 'am raised', 'have raised'], a: 'was raised', why: '<b>be raised</b> = criarse. También en pasado y en pasiva. <b>Tu error del curso:</b> <i>where you <s>are</s> raised</i> → <i>were</i>.' },
          { blank: 1, q: 'What kinds of music are you ___?', opts: ['into', 'in', 'on', 'for'], a: 'into', why: '<b>be into something</b> = gustarte mucho algo. La preposición es <i>into</i>, sin excepción.' },
          { blank: 1, q: 'He ___ to Laura. They have been together for twelve years.', opts: ["'s married", "'s marry", 'marries', "'s single"], a: "'s married", why: '<b>be married to somebody</b>. Ojo: <i>to</i>, no <i>with</i>.' },
          { blank: 1, q: "My sister isn't married. She ___.", opts: ["'s single", 'is alone', "'s lonely", 'single'], a: "'s single", why: '<b>be single</b> = estar soltero. <i>Alone</i> es "sin compañía en este momento", no el estado civil.' },
          { blank: 1, q: 'Last Saturday we ___ my grandmother\'s eightieth birthday.', opts: ['celebrated', 'celebrate', 'are celebrating', 'celebration'], a: 'celebrated', why: '<b>celebrate</b> es verbo; <i>last Saturday</i> pide pasado simple.' },
          { blank: 1, q: 'I moved out at 22, so I have ___ for six years now.', opts: ['lived alone', 'live alone', 'lived only', 'been alone'], a: 'lived alone', why: '<b>live alone</b> = vivir solo (sin nadie más en casa).' },
          { blank: 1, q: 'I still ___: my parents, my brother and me.', opts: ['live with family', 'live in family', 'am living family', 'live alone'], a: 'live with family', why: '<b>live with family</b> = vivir con la familia. La preposición es <i>with</i>.' },
          { blank: 1, q: 'My dad is 64. He is going to ___ next year.', opts: ['retire', 'retired', 'be retire', 'retirement'], a: 'retire', why: '<b>retire</b> = jubilarse. Tras <i>going to</i> va el infinitivo sin <i>to</i>.' },
          { blank: 1, q: 'A: Where were you ___? B: In São Paulo, but I grew up in Rio.', opts: ['born', 'borned', 'birth', 'raised'], a: 'born', why: 'El participio de <i>be born</i> es <b>born</b>, no <i>borned</i>.' },
          { blank: 1, q: "I'm really ___ photography. I take my camera everywhere.", opts: ['into', 'interest in', 'like', 'fan'], a: 'into', why: '<i>I\'m really into…</i> es la forma coloquial de decir que algo te apasiona.' },
          { blank: 1, q: 'They ___ their first anniversary with dinner at the beach.', opts: ['celebrated', 'were celebrate', 'celebrating', 'celebration'], a: 'celebrated', why: 'Acción terminada en el pasado → pasado simple de <b>celebrate</b>.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Information questions & indirect questions', title: 'Preguntar bien y preguntar con educación', html: `
          <p style="margin:8px 0 14px">Esta unidad tiene dos bloques: elegir la <b>palabra interrogativa</b> correcta y convertir una pregunta directa en una <b>pregunta indirecta</b> (más educada).</p>
          <h3>1 · Information questions</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th>Palabra</th><th>Para qué sirve</th><th>Ejemplo</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>which</b></td><td>elegir dentro de un grupo concreto</td><td><b>Which</b> car is yours?</td><td>hay opciones a la vista</td></tr>
            <tr><td><b>whose</b></td><td>de quién es algo</td><td><b>Whose</b> class are you in?</td><td>= posesión</td></tr>
            <tr><td><b>how</b></td><td>la manera de hacer algo</td><td><b>How</b> do you spell your name?</td><td>+ long, old, much…</td></tr>
            <tr><td><b>where</b></td><td>lugares</td><td><b>Where</b> were you raised?</td><td>respuesta = un sitio</td></tr>
            <tr><td><b>when</b></td><td>momentos</td><td><b>When</b> does your teacher retire?</td><td>respuesta = una fecha/hora</td></tr>
            <tr><td><b>why</b></td><td>razones</td><td><b>Why</b> are you learning Spanish?</td><td>respuesta = because…</td></tr>
            <tr><td><b>what</b></td><td>pregunta general, sin grupo cerrado</td><td><b>What</b> time do you want to go?</td><td>opciones infinitas</td></tr>
            <tr><td><b>who / who's</b></td><td>personas</td><td><b>Who's</b> your math teacher this year?</td><td><i>who's</i> = who is</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:12px"><b>which vs what:</b> <i>Which car is yours?</i> (están los dos coches delante, grupo cerrado) · <i>What car do you want to buy?</i> (cualquier coche del mundo).</div>

          <h3 style="margin-top:22px">2 · Indirect questions</h3>
          <p style="margin-top:6px">Sirven para sonar más educado. Pones un <b>arranque</b> delante y la pregunta de dentro pasa a <b>orden de frase afirmativa</b>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Directa</th><th>Indirecta</th><th>Qué cambia</th></tr></thead><tbody>
            <tr><td>Where <b>were you</b> raised?</td><td>Can you tell me where <b>you were</b> raised<b>?</b></td><td>sujeto antes del verbo</td></tr>
            <tr><td>Where <b>does she work</b>?</td><td>Do you know where <b>she works</b><b>?</b></td><td>fuera <i>does</i>, la <b>-s</b> vuelve al verbo</td></tr>
            <tr><td>What <b>did you eat</b>?</td><td>I want to know what <b>you ate</b><b>.</b></td><td>fuera <i>did</i>, el verbo va en pasado</td></tr>
            <tr><td><b>Is</b> the restaurant good?</td><td>We want to know <b>if</b> the restaurant <b>is</b> good<b>.</b></td><td>yes/no → <b>if</b></td></tr>
            <tr><td><b>Are</b> your friends into sports?</td><td>I wonder <b>if</b> your friends <b>are</b> into sports<b>.</b></td><td>yes/no → <b>if</b></td></tr>
          </tbody></table></div>
          <h3 style="margin-top:18px">Arranques que puedes usar</h3>
          <div class="grid2" style="margin-top:8px">
            <div><p class="small" style="margin:0 0 4px"><b>Terminan en <u>?</u></b> (son preguntas)</p><ul class="small" style="padding-left:18px;margin:4px 0"><li>Do you know…?</li><li>Can you tell me…?</li><li>Do you have any idea…?</li></ul></div>
            <div><p class="small" style="margin:0 0 4px"><b>Terminan en <u>.</u></b> (son afirmaciones)</p><ul class="small" style="padding-left:18px;margin:4px 0"><li>We'd all like to know…</li><li>I want to hear…</li><li>We want to find out if…</li><li>I wonder if…</li><li>I'd like to know…</li></ul></div>
          </div>
          <div class="hint" style="margin-top:14px"><b>Las tres reglas de oro:</b><br>1) Orden de frase afirmativa: <i>Do you know where <b>it is</b>?</i><br>2) Nada de <b>do / does / did</b> en la segunda parte: <i>Do you know where <s>does</s> she <b>works</b>?</i><br>3) En preguntas de sí/no, usa <b>if</b>: <i>Can you tell me <b>if</b> it was expensive?</i></div>
          <div class="hint" style="margin-top:10px"><b>Tus errores a vigilar:</b> <i>how expensive <b>it is</b></i> (no <i>is</i> suelto) · <i>who <b>those people are</b></i> (no <i>who are those people</i>) · <i>where you <b>were</b> raised</i> · <i>when your teacher <b>wants</b> to retire</i>.</div>` },

        { label: 'Palabra interrogativa', type: 'mcq', eyebrow: 'Information questions', title: 'Elige la palabra correcta', pool: 7, items: [
          { blank: 1, q: "___ jacket is this? Somebody left it on the chair.", opts: ['Whose', "Who's", 'Which', 'What'], a: 'Whose', why: 'Preguntas de quién es la chaqueta → <b>whose</b> (posesión). <i>Who\'s</i> = who is.' },
          { blank: 1, q: "___ your new roommate? I haven't met him yet.", opts: ["Who's", 'Whose', 'Which', 'How'], a: "Who's", why: '<b>Who\'s</b> = <i>who is</i>. Preguntas por la persona, no por la posesión.' },
          { blank: 1, q: 'There are three buses to the center. ___ one goes to the museum?', opts: ['Which', 'What', 'Whose', 'Why'], a: 'Which', why: 'Grupo cerrado y conocido (tres autobuses) → <b>which</b>.' },
          { blank: 1, q: '___ kind of music do you listen to when you work?', opts: ['What', 'Which', 'Whose', 'When'], a: 'What', why: 'Las opciones son infinitas → <b>what</b>.' },
          { blank: 1, q: '___ do you pronounce your last name?', opts: ['How', 'What', 'Which', 'Why'], a: 'How', why: '<b>How</b> pregunta por la manera de hacer algo.' },
          { blank: 1, q: '___ were you raised? In the same city where you were born?', opts: ['Where', 'When', 'Which', 'How'], a: 'Where', why: 'La respuesta es un lugar → <b>where</b>.' },
          { blank: 1, q: '___ is your dad going to retire? In June or in December?', opts: ['When', 'Where', 'Whose', 'What'], a: 'When', why: 'La respuesta es un momento → <b>when</b>.' },
          { blank: 1, q: '___ are you learning Portuguese? Is it for work?', opts: ['Why', 'How', 'Which', 'Whose'], a: 'Why', why: '<b>Why</b> pide una razón. La respuesta empieza por <i>because…</i>' },
          { blank: 1, q: '___ long have you lived alone?', opts: ['How', 'What', 'When', 'Which'], a: 'How', why: '<b>How</b> + adjetivo/adverbio: <i>how long, how old, how much</i>.' },
          { blank: 1, q: '___ turn is it to buy the coffee today?', opts: ['Whose', "Who's", 'Which', 'When'], a: 'Whose', why: '<b>Whose turn</b> = de quién es el turno → posesión.' },
          { blank: 1, q: "I'm in the parking lot. ___ car is yours, the red one or the gray one?", opts: ['Which', 'What', 'Whose', 'How'], a: 'Which', why: 'Te dan dos opciones concretas → <b>which</b>.' },
          { blank: 1, q: '___ time do you want to meet at the pool?', opts: ['What', 'Which', 'Whose', 'Why'], a: 'What', why: '<i>What time</i> es la fórmula fija para preguntar la hora.' },
          { blank: 1, q: '___ do you spell "easygoing"?', opts: ['How', 'What', 'Which', 'Whose'], a: 'How', why: 'Deletrear es una manera de hacer algo → <b>how do you spell…?</b>' },
        ] },

        { label: 'Directa → indirecta', type: 'mcq', eyebrow: 'Indirect questions', title: 'Elige la continuación correcta', intro: 'Recuerda: orden de frase afirmativa, sin <i>do/does/did</i>, y <b>if</b> si la pregunta es de sí/no.', pool: 8, items: [
          { blank: 1, q: 'Where does she work? → Do you know ___?', opts: ['where she works', 'where does she work', 'where she work', 'where works she'], a: 'where she works', why: 'Fuera el <i>does</i>; la <b>-s</b> vuelve al verbo: <i>she works</i>.' },
          { blank: 1, q: 'Where were you raised? → Can you tell me ___?', opts: ['where you were raised', 'where were you raised', 'where you are raised', 'where you raised'], a: 'where you were raised', why: 'Sujeto (<i>you</i>) antes del verbo (<i>were</i>). <b>Tu error real del curso:</b> pusiste <i>are</i> en lugar de <i>were</i>.' },
          { blank: 1, q: 'When does your teacher want to retire? → Do you have any idea ___?', opts: ['when your teacher wants to retire', 'when your teacher want to retire', 'when does your teacher want to retire', 'when wants your teacher to retire'], a: 'when your teacher wants to retire', why: 'Al quitar <i>does</i>, la <b>-s</b> de tercera persona vuelve al verbo: <b>wants</b>. <b>Tu error real del curso.</b>' },
          { blank: 1, q: 'How expensive is it to fly to Mexico in June? → I want to find out ___.', opts: ['how expensive it is to fly to Mexico in June', 'how expensive is to fly to Mexico in June', 'how expensive is it to fly to Mexico in June', 'how is expensive to fly to Mexico in June'], a: 'how expensive it is to fly to Mexico in June', why: 'No puedes borrar el sujeto: <b>it is</b>. <b>Tu error real del curso.</b>' },
          { blank: 1, q: 'Who are those people? → I\'d like to know ___.', opts: ['who those people are', 'who are those people', 'who those people is', 'who is those people'], a: 'who those people are', why: 'Sujeto (<i>those people</i>) + verbo (<i>are</i>). <b>Tu error real del curso.</b>' },
          { blank: 1, q: 'Are your friends into sports? → I wonder ___.', opts: ['if your friends are into sports', 'if are your friends into sports', 'that your friends are into sports', 'are your friends into sports'], a: 'if your friends are into sports', why: 'Pregunta de sí/no → <b>if</b> + orden de afirmativa.' },
          { blank: 1, q: 'Were your brothers and sisters born in this city? → I\'d like to know ___.', opts: ['if your brothers and sisters were born in this city', 'if were your brothers and sisters born in this city', 'that your brothers were born in this city', 'were your brothers born in this city'], a: 'if your brothers and sisters were born in this city', why: 'Sí/no → <b>if</b>. El sujeto va antes de <i>were</i>.' },
          { blank: 1, q: 'Is your brother single? → Can you tell me ___?', opts: ['if your brother is single', 'is your brother single', 'if is your brother single', 'that your brother is single'], a: 'if your brother is single', why: 'Sí/no → <b>if</b> + <i>your brother is</i>.' },
          { blank: 1, q: 'Is your dad going to retire this year? → Do you know ___?', opts: ['if your dad is going to retire this year', 'if is your dad going to retire this year', 'that your dad is going to retire', 'is your dad going to retire this year'], a: 'if your dad is going to retire this year', why: 'Sí/no → <b>if</b>; sujeto (<i>your dad</i>) antes de <i>is</i>.' },
          { blank: 1, q: 'What did you eat at the party? → I want to know ___.', opts: ['what you ate at the party', 'what did you eat at the party', 'what you did eat at the party', 'what ate you at the party'], a: 'what you ate at the party', why: 'Fuera el <i>did</i>; el verbo se pone en pasado: <b>ate</b>.' },
          { blank: 1, q: 'Why are you learning Spanish? → I\'d like to know ___.', opts: ['why you are learning Spanish', 'why are you learning Spanish', 'why you learning Spanish', 'why do you learning Spanish'], a: 'why you are learning Spanish', why: 'Sujeto (<i>you</i>) antes del auxiliar (<i>are</i>).' },
          { blank: 1, q: 'How long will it take to get in? → Do you have any idea ___?', opts: ['how long it will take to get in', 'how long will it take to get in', 'how long it takes will to get in', 'how long will take it to get in'], a: 'how long it will take to get in', why: 'Sujeto (<i>it</i>) antes de <i>will</i>.' },
          { blank: 1, q: 'What sports is he into? → I\'d like to know ___.', opts: ['what sports he is into', 'what sports is he into', 'what sports he into', 'what sports does he into'], a: 'what sports he is into', why: 'Sujeto (<i>he</i>) antes de <i>is</i>. La preposición <i>into</i> se queda al final.' },
          { blank: 1, q: 'Was it expensive? → Can you tell me ___?', opts: ['if it was expensive', 'was it expensive', 'if was it expensive', 'that it was expensive'], a: 'if it was expensive', why: 'Sí/no → <b>if</b> + <i>it was</i>.' },
          { blank: 1, q: 'Where is the meeting room? → Do you know ___?', opts: ['where the meeting room is', 'where is the meeting room', 'where the meeting room be', 'where is it the meeting room'], a: 'where the meeting room is', why: 'Sujeto (<i>the meeting room</i>) antes del verbo <i>is</i>.' },
        ] },

        { label: 'Caza el error', type: 'mcq', eyebrow: 'Error hunting', title: '¿Cuál de las dos es correcta?', intro: 'Una está bien y la otra tiene un error de los que tú cometes. Elige la buena.', pool: 7, items: [
          { q: 'Preguntar educadamente dónde se crió alguien:', opts: ['Can you tell me where you were raised?', 'Can you tell me where you are raised?'], a: 'Can you tell me where you were raised?', why: '<b>be raised</b> mira al pasado: <i>were raised</i>.' },
          { q: 'Preguntar educadamente cuándo se jubila el profesor:', opts: ['Do you have any idea when your teacher wants to retire?', 'Do you have any idea when your teacher want to retire?'], a: 'Do you have any idea when your teacher wants to retire?', why: 'Tercera persona del singular → <b>wants</b>.' },
          { q: 'Decir que quieres saber lo cara que es una cosa:', opts: ['I want to find out how expensive it is.', 'I want to find out how expensive is.'], a: 'I want to find out how expensive it is.', why: 'La frase necesita sujeto: <b>it is</b>.' },
          { q: 'Preguntar quiénes son esas personas, de forma indirecta:', opts: ["I'd like to know who those people are.", "I'd like to know who are those people."], a: "I'd like to know who those people are.", why: 'Orden de afirmativa: sujeto + verbo.' },
          { q: 'Preguntar dónde trabaja ella, de forma indirecta:', opts: ['Do you know where she works?', 'Do you know where does she work?'], a: 'Do you know where she works?', why: 'Nada de <i>does</i> en la segunda parte.' },
          { q: 'Pregunta indirecta de sí/no sobre un restaurante:', opts: ['We want to know if the restaurant is good.', 'We want to know is the restaurant good.'], a: 'We want to know if the restaurant is good.', why: 'Sí/no → <b>if</b>.' },
          { q: 'Preguntar la hora de llegada de forma educada:', opts: ['Do you know what time the train arrives?', 'Do you know what time does the train arrive?'], a: 'Do you know what time the train arrives?', why: 'Fuera <i>does</i>; la <b>-s</b> vuelve a <i>arrive</i>.' },
          { q: 'Dos ideas distintas sobre un amigo:', opts: ["I wonder if he is a good friend. I'd like to meet him.", "I wonder if he is a good friend I'd like to meet him."], a: "I wonder if he is a good friend. I'd like to meet him.", why: 'Son dos frases: hacen falta punto y mayúscula. <b>Tu error real del curso.</b>' },
          { q: 'Decir dónde naciste:', opts: ['I was born in Lima.', 'I born in Lima.'], a: 'I was born in Lima.', why: '<b>be born</b> lleva siempre el verbo <i>be</i>.' },
          { q: 'Preguntar de quién es el coche:', opts: ['Whose car is that?', "Who's car is that?"], a: 'Whose car is that?', why: '<b>Whose</b> = posesión; <i>who\'s</i> = who is.' },
          { q: 'Preguntar cuál de los dos coches es el suyo:', opts: ['Which car is yours, the red one or the white one?', 'What car is yours, the red one or the white one?'], a: 'Which car is yours, the red one or the white one?', why: 'Grupo cerrado de dos opciones → <b>which</b>.' },
          { q: 'Preguntar indirectamente si algo fue caro:', opts: ['Can you tell me if it was expensive?', 'Can you tell me was it expensive?'], a: 'Can you tell me if it was expensive?', why: 'Sí/no → <b>if</b> + <i>it was</i>.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>I\'m</i>, <i>he\'s</i>).',
          sentences: [
            'I was born in the U.S., but I was raised in Japan.',
            'Can you tell me where you were born and raised?',
            'Do you know if your dad is going to retire this year?',
            "I'd like to know what sports or hobbies he's into.",
            'I wonder if Eva was raised in Brazil.',
            'Do you have any idea how long it will take to get in?',
            "I'm married to Hiro. He's my husband.",
            'Last year we celebrated our tenth wedding anniversary.',
            'Now I live alone, and I also watch tennis and basketball.',
            'Which car is yours? It is a white Jeep.',
            'It was really nice talking to you.',
            "Sorry, I have to go now. I should let you go.",
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for gist', title: 'Escucha el diálogo y responde', intro: 'Dos personas que se acaban de conocer en una fiesta. Escúchalo entero antes de responder.',
          lines: [
            ['Dana', "Hi, I'm Dana. I don't think we've met. How do you know Marcos?"],
            ['Ravi', "Hello! I'm Ravi. I work with him. And you?"],
            ['Dana', "I'm his cousin. Can you tell me where you're from? Your accent is lovely."],
            ['Ravi', 'I was born in Mumbai, but I was raised in Manchester. My parents moved when I was four.'],
            ['Dana', "Nice. And do you live here now? I mean, do you live alone or with family?"],
            ['Ravi', "I live with my sister. She's still single, and honestly she's much more sociable than I am."],
            ['Dana', "I'd like to know what you do for fun. Are you into sports?"],
            ['Ravi', "Not really. I'm into cooking. Oh, hold on a sec, that's my phone. Sorry, I have to go now. It was nice talking to you!"],
          ],
          questions: [
            { q: 'How does Ravi know Marcos?', opts: ['They work together', 'They are cousins', 'They were at school together'], a: 'They work together', why: 'Ravi dice "I work with him". Dana es la prima ("I\'m his cousin").' },
            { q: 'Where was Ravi raised?', opts: ['In Manchester', 'In Mumbai', 'In London'], a: 'In Manchester', why: '"I was born in Mumbai, but I was raised in Manchester." <b>born</b> = dónde naciste; <b>raised</b> = dónde creciste.' },
            { q: 'Which sentence about Ravi\'s sister is true?', opts: ["She's single and very sociable", "She's married and serious", 'She lives alone'], a: "She's single and very sociable", why: '"She\'s still single, and honestly she\'s much more sociable than I am."' },
            { q: 'What does "hold on a sec" mean here?', opts: ['Wait a moment', 'Hold my phone', 'Come with me'], a: 'Wait a moment', why: 'Expresión informal para pedir a alguien que espere un momento. <i>Sec</i> = <i>second</i>.' },
            { q: 'How does Ravi end the conversation?', opts: ['Sorry, I have to go now. It was nice talking to you!', 'See you never.', 'I should let you go, I work with him.'], a: 'Sorry, I have to go now. It was nice talking to you!', why: 'Dos fórmulas de la unidad para cerrar una conversación con educación.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Introduce yourself', task: 'Preséntate en 60 segundos: nombre, dónde naciste, dónde te criaste, con quién vives y a qué estás enganchado ahora (<i>be into</i>).', model: 'Modelo: "Hello, I\'m Aldo. I was born in Lima and I was raised there too. I live with my family. I\'m really into technology and I\'m into running on weekends."', tags: ['born', 'raised', 'live with', 'into', 'hello'] },
          { t: 'Describe a person you know', task: 'Describe a alguien real con tres adjetivos de personalidad y un ejemplo concreto de cada uno.', model: 'Modelo: "My friend Marco is very reliable. If he says he will come, he comes. He is also easygoing: he never gets stressed. And he is generous with his time."', tags: ['reliable', 'easygoing', 'generous', 'honest', 'sociable', 'brave', 'because'] },
          { t: 'Ask politely', task: 'Haz cinco preguntas indirectas a un compañero nuevo usando cinco arranques distintos: <i>Do you know…? / Can you tell me…? / Do you have any idea…? / I wonder if… / I\'d like to know…</i>', model: 'Modelo: "Can you tell me where you were raised? I\'d like to know what music you are into. I wonder if your family lives here too."', tags: ['can you tell me', 'do you know', 'i wonder if', "i'd like to know", 'do you have any idea'] },
          { t: 'Which, whose or how?', task: 'Mira a tu alrededor y haz seis preguntas directas: dos con <i>which</i>, dos con <i>whose</i> y dos con <i>how</i>.', model: 'Modelo: "Which chair is yours? Whose phone is on the table? How do you spell your last name? How long have you lived here?"', tags: ['which', 'whose', 'how', 'yours', 'spell', 'how long'] },
          { t: 'Meeting someone you\'ve heard about', task: 'Te presentan a alguien de quien ya te habían hablado. Haz las dos voces: saluda, di que has oído hablar de él/ella, pregunta cómo conoce a tu amigo, y cierra la conversación con educación.', model: 'Modelo: "I\'ve heard a lot about you! — Good things, I hope! — How do you know Jodi? — I\'m her sister. — Well, I should let you go. It was nice talking to you."', tags: ['heard a lot about you', 'good things', 'how do you know', 'let you go', 'nice talking to you'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Stressing new information', title: 'La información nueva se pronuncia más fuerte', intro: 'En inglés la palabra que aporta información <b>nueva</b> se dice más alta y más larga. Escucha y repite marcando la sílaba en mayúsculas.',
          pairs: [
            ['I was born in LIMA, but I was raised in AREQUIPA.', 'I was born in Lima, but I was raised in Arequipa.'],
            ['I don\'t live with my family. I live ALONE.', "I don't live with my family. I live alone."],
            ['A: Whose car is that? B: It\'s MINE.', "Whose car is that? It's mine."],
            ['A: Which one is yours? B: The WHITE one.', 'Which one is yours? The white one.'],
            ['She isn\'t married. She\'s SINGLE.', "She isn't married. She's single."],
            ['I\'m not into football. I\'m into COOKING.', "I'm not into football. I'm into cooking."],
            ['It was nice TALKING to you.', 'It was nice talking to you.'],
            ['I\'ve heard a LOT about you.', "I've heard a lot about you."],
            ['My dad retires in JUNE, not in December.', 'My dad retires in June, not in December.'],
            ['He\'s not selfish. He\'s very GENEROUS.', "He's not selfish. He's very generous."],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'The first five minutes', intro: 'Texto de refuerzo sobre el tema de la unidad. Lee una vez para la idea general y luego responde. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Nobody really enjoys walking into a room full of strangers. You hold your glass with both hands, you smile at the wall, and you wait for somebody else to <b>strike up</b> a conversation. The good news is that the first five minutes follow a pattern, and a pattern can be learned.',
            'Start with how you know the host. "How do you know Jodi?" is the safest question in the world, because everybody in the room has an answer: I work with her, I\'m her sister, we were at school together. After that, move to where the person is from. Notice that "Where were you born?" and "Where were you raised?" are different questions, and the second one usually gets the better story.',
            'Then choose your questions carefully. Direct questions about money, age or marital status can sound <b>nosy</b>, especially in English. The same information sounds much softer inside an indirect question: instead of "Do you live alone?", try "Can you tell me a bit about where you live?" People answer what they want to answer, and nobody feels pushed.',
            'Finally, learn to leave. Many learners feel the silence become <b>awkward</b> and simply escape without a word, which makes them <b>come across</b> as cold. Three short sentences solve it: "Sorry, I have to go now." "I should let you go." "It was nice talking to you." Say one of them, smile, and walk away. That is all the room expects.',
          ],
          main: [
            { q: 'Indirect questions make personal topics feel softer.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: las preguntas directas sobre dinero, edad o estado civil suenan entrometidas; la forma indirecta las suaviza.' },
            { q: 'Asking how someone knows the host always works.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: "How do you know Jodi?" es la pregunta más segura porque todos tienen respuesta.' },
            { q: 'Leaving a conversation politely needs only three sentences.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4 da las tres fórmulas para cerrar.' },
            { q: 'Meeting strangers is uncomfortable, but it follows a pattern.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1 presenta la idea: los primeros cinco minutos siguen un patrón que se puede aprender.' },
          ],
          infer: [
            { q: '<b>strike up</b> a conversation (paragraph 1)', opts: ['start a conversation', 'end a conversation', 'interrupt a conversation'], a: 'start a conversation', why: 'Esperas a que <i>otro</i> empiece a hablar: <b>strike up</b> = iniciar.' },
            { q: '<b>nosy</b> (paragraph 3)', opts: ['too interested in other people\'s private life', 'very friendly and warm', 'boring and slow'], a: 'too interested in other people\'s private life', why: 'Se dice de preguntas sobre dinero, edad o estado civil: entrometido.' },
            { q: '<b>awkward</b> (paragraph 4)', opts: ['uncomfortable and difficult', 'loud and noisy', 'funny and relaxed'], a: 'uncomfortable and difficult', why: 'El silencio se vuelve incómodo y la gente huye.' },
            { q: '<b>come across as</b> (paragraph 4)', opts: ['give people a certain impression', 'meet somebody by chance', 'cross the room'], a: 'give people a certain impression', why: 'Irse sin decir nada hace que <i>parezcas</i> frío: dar una impresión.' },
          ],
          think: '¿Qué pregunta te resulta más fácil de responder cuando conoces a alguien: <i>Where were you born?</i> o <i>Where were you raised?</i> Escribe dos frases empezando por <i>For me, the easier question is… because…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Corrige tus frases', type: 'fix', eyebrow: 'Error correction · tus frases reales', title: 'Reescribe la frase corrigiendo el error', intro: 'Estas son las frases que fallaste en el curso (y un par de trampas clásicas). Cada una tiene un error. Corrígela y compara.', items: [
          { bad: 'I want to find out how expensive is to go to Mexico in June.', good: 'I want to find out how expensive it is to go to Mexico in June.', why: 'En una pregunta indirecta el orden es de frase afirmativa y <b>el sujeto no se borra</b>: <i>how expensive <b>it is</b></i>.' },
          { bad: "I'd like to know who are those people.", good: "I'd like to know who those people are.", why: 'Sujeto (<i>those people</i>) antes del verbo (<i>are</i>). Nada de orden de pregunta dentro de una pregunta indirecta.' },
          { bad: 'Can you tell me where you are raised?', good: 'Can you tell me where you were raised?', why: '<b>be raised</b> = criarse, algo que ya ocurrió → pasado de <i>be</i>: <b>were</b>.' },
          { bad: 'Do you have any idea when your teacher want to retire?', good: 'Do you have any idea when your teacher wants to retire?', why: 'Al quitar el <i>does</i> de la pregunta directa, la <b>-s</b> de tercera persona vuelve al verbo: <b>wants</b>.' },
          { bad: 'Do you know where does she work?', good: 'Do you know where she works?', why: 'En la segunda parte de una pregunta indirecta <b>no se usa do/does/did</b>.' },
          { bad: "I wonder if he is a good friend I'd like to meet him.", good: "I wonder if he is a good friend. I'd like to meet him.", why: 'Son dos ideas independientes: hacen falta un punto y una mayúscula. También valdría <i>…a good friend, and I\'d like to meet him.</i>' },
          { bad: 'I born in Lima but I raised in Arequipa.', good: 'I was born in Lima, but I was raised in Arequipa.', why: '<b>be born</b> y <b>be raised</b> llevan siempre el verbo <i>be</i>: <i>was born / was raised</i>.' },
          { bad: "What kinds of sports are you in?", good: 'What kinds of sports are you into?', why: 'La expresión es <b>be into something</b>, con <i>into</i>.' },
        ] },
        { label: 'Hazla más educada', type: 'soft', eyebrow: 'Softening · indirect questions', title: 'Convierte la pregunta directa en indirecta', explain: 'Una pregunta directa sobre la vida privada puede sonar brusca. Empieza con <b>Do you know…? / Can you tell me…? / Do you have any idea…? / I wonder if… / I\'d like to know…</b> y usa orden de frase afirmativa (sin <i>do/does/did</i>).', missing: 'Falta un arranque educado al principio, o has dejado un <b>do/does/did</b> dentro', pattern: /^\s*(do you know|can you tell me|do you have any idea|i'd like to know|i would like to know|i wonder|we want to find out|we want to know|i want to know|i want to hear|we'd all like to know)\b(?!.*\b(do|does|did)\s+(you|he|she|it|they|we|i|your|his|her|their|the)\b)/,
          items: [
            { h: '"Where were you raised?"', a: 'Can you tell me where you were raised?' },
            { h: '"Where does she work?"', a: 'Do you know where she works?' },
            { h: '"Is your brother single?"', a: 'Can you tell me if your brother is single?' },
            { h: '"When is your dad going to retire?"', a: "I'd like to know when your dad is going to retire." },
            { h: '"Are your friends into sports?"', a: 'I wonder if your friends are into sports.' },
            { h: '"How expensive is the hotel?"', a: 'I want to know how expensive the hotel is.' },
            { h: '"Who are those people?"', a: "I'd like to know who those people are." },
            { h: '"What did you eat at the party?"', a: 'I want to know what you ate at the party.' },
          ] },
        { label: 'Escribe tu perfil', type: 'comment', eyebrow: 'Writing task', title: 'Preséntate por escrito', intro: 'Escribe 60-100 palabras presentándote a un grupo nuevo: de dónde eres, con quién vives, cómo eres y qué te gusta. Termina con una pregunta indirecta para el lector. La checklist se marca sola al analizar el texto.', placeholder: "Hello, I'm… I was born in… but I was raised in…", min: 60, max: 100, need: 4, checks: [
          { label: 'Digo dónde nací y/o dónde me crié (<i>I was born in… / I was raised in…</i>)', re: /\b(was born|were born|was raised|were raised|born in|raised in)\b/ },
          { label: 'Digo con quién vivo o mi estado civil (<i>I live alone / I live with… / I\'m single / I\'m married</i>)', re: /\b(live alone|live with|i'm single|i am single|i'm married|i am married|lives with)\b/ },
          { label: 'Uso al menos dos adjetivos de personalidad de la unidad', words: ADJ },
          { label: 'Digo algo que me apasiona con <i>be into</i>', re: /\b(i'm into|i am into|i'm really into|into)\b/ },
          { label: 'Termino con una pregunta indirecta (<i>I\'d like to know… / Can you tell me… / I wonder if…</i>)', re: /\b(i'd like to know|i would like to know|can you tell me|do you know|i wonder if|do you have any idea)\b/ },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Lesson 3 · Nice talking to you', title: 'Las frases, por situación', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Introductions</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Hello, I'm Nina.</li><li>I'm Mia, Jodi's sister.</li><li>This is Nina, Jodi's coworker.</li></ul></div>
          <div><h3>Saying how you know someone</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>How do you know Jodi?</li><li>I work with him / her.</li><li>I'm her sister / friend / husband.</li></ul></div>
          <div><h3>Ending a conversation</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Sorry, I have to go now.</li><li>It was nice to meet you.</li><li>I should let you go.</li><li>It was nice talking to you.</li></ul></div>
          <div><h3>Meeting someone you've heard about</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I've heard good things about you. — Oh, that's nice.</li><li>I've heard a lot about you. — Good things, I hope!</li></ul></div>
          <div class="hint small"><b>Hold on a sec</b> = espera un momento (informal). <i>Sec</i> es la abreviatura de <i>second</i>. Sirve para interrumpir tu propia frase sin sonar brusco: <i>"Oh! Hold on a sec. There's Rafe."</i></div>
          <div class="hint small"><b>meet</b> vs <b>talk</b> al despedirte: si era la primera vez, <i>It was nice <b>to meet</b> you</i>. Si ya os conocíais, <i>It was nice <b>talking to</b> you</i>. Fíjate en la forma: <i>to meet</i> (infinitivo) pero <i>talking</i> (-ing).</div>
        </div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ["Nina: Hello, I'm Nina.", "Mia: I'm Mia, Jodi's sister. How do you know Jodi?", 'Nina: I work with her. We share an office.', "Mia: Oh, nice! I've heard a lot about you.", 'Nina: Good things, I hope!'],
          ["Mia: Well, I should let you go. It was really nice to meet you, Nina.", 'Nina: Thanks. It was nice talking to you.', "Mia: Oh! Hold on a sec. There's Rafe.", 'Mia: This is Rafe, my husband. And this is Nina, Jodi\'s coworker.', 'Rafe: Hi, Nina. Nice to meet you.'],
          ['Dana: Hi, I\'m Dana. How do you know Marcos?', 'Ravi: I work with him. And you?', "Dana: I'm his cousin. Can you tell me where you're from?", 'Ravi: I was born in Mumbai, but I was raised in Manchester.', "Dana: Lovely. Sorry, I have to go now. It was nice talking to you!"],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices en cada situación?', pool: 7, items: [
          { q: '"How do you know Jodi?" — Es tu compañera de trabajo.', opts: ['I work with her.', 'I know her.', 'She is nice.'], a: 'I work with her.', why: 'La pregunta pide la <b>relación</b>: <i>I work with her / I\'m her sister / We were at school together</i>.' },
          { q: '"I\'ve heard a lot about you." — Respondes con humor.', opts: ['Good things, I hope!', 'Yes, you have.', 'I heard you too.'], a: 'Good things, I hope!', why: 'Respuesta estándar y simpática de la unidad.' },
          { q: '"I\'ve heard good things about you." — Respondes con modestia.', opts: ["Oh, that's nice.", 'Of course you have.', 'Who told you that?'], a: "Oh, that's nice.", why: 'Reacción breve y educada. Las otras dos suenan arrogantes o desconfiadas.' },
          { q: 'Quieres cerrar la conversación porque el otro parece ocupado.', opts: ['I should let you go.', 'Go away now.', 'Are you busy or what?'], a: 'I should let you go.', why: '<b>I should let you go</b> = "no te entretengo más". Muy educado.' },
          { q: 'Te despides de alguien a quien acabas de conocer.', opts: ['It was nice to meet you.', 'It was nice talking to you again.', 'We go way back.'], a: 'It was nice to meet you.', why: 'Primera vez → <b>to meet</b>. Si ya os conocíais, <i>nice talking to you</i>.' },
          { q: 'Te despides de alguien con quien ya habías coincidido antes.', opts: ['It was nice talking to you.', 'Nice to meet you for the first time.', 'How do you know me?'], a: 'It was nice talking to you.', why: 'Ya os conocíais, así que no hay "meet": <b>nice talking to you</b>.' },
          { q: 'Estás hablando y de repente ves a tu marido. Interrumpes un segundo.', opts: ["Hold on a sec. There's Rafe.", 'Stop talking, please.', 'One moment, I let you go.'], a: "Hold on a sec. There's Rafe.", why: '<b>Hold on a sec</b> = espera un momento (informal).' },
          { q: 'Presentas a tu hermana Mia a un grupo.', opts: ["This is Mia, my sister.", 'Here you have Mia.', 'Mia is presented.'], a: 'This is Mia, my sister.', why: 'Fórmula de presentación: <b>This is + nombre + relación</b>.' },
          { q: 'Tienes que irte porque llegas tarde.', opts: ['Sorry, I have to go now.', 'I am going out.', 'Let you go, sorry.'], a: 'Sorry, I have to go now.', why: 'Fórmula fija para marcharte con educación.' },
          { q: 'Te presentas a alguien en una fiesta por primera vez.', opts: ["Hello, I'm Aldo.", 'Hello, my name is being Aldo.', 'Hello, do you know me?'], a: "Hello, I'm Aldo.", why: 'Presentación simple y natural: <i>Hello, I\'m…</i>' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Almuerzo de bienvenida en el banco', intro: 'El banco recibe al equipo de Toronto con un almuerzo y Rodrigo, tu jefe, ha hablado de ti. Una desarrolladora se te acerca. Preséntate, di cómo conoces a Rodrigo, reacciona a <i>I\'ve heard a lot about you</i>, pregunta con educación (preguntas indirectas) y cierra la conversación sin sonar brusco. Ojo: es la primera vez que la ves.', scenes: [
          { t: 'En el almuerzo', you: 'Aldo, desarrollador senior del banco', partner: 'Emma', role: 'desarrolladora del equipo de Toronto; trabaja con Rodrigo en remoto', goal: 'Preséntate, descubre cómo conoce a Rodrigo, responde con gracia a lo que ha oído de ti, pregunta por su vida con preguntas indirectas y despídete con la fórmula correcta para una primera vez.', start: 'a', nodes: {
            a: { say: "Hi! I don't think we've met. I'm Emma, from the Toronto team.", opts: [
              { t: "Hello, I'm Aldo. I'm one of the senior developers here. How do you know Rodrigo?", ok: 2, why: "Presentación de la unidad (<b>Hello, I'm…</b>) y la pregunta más segura para arrancar: <b>How do you know Rodrigo?</b>", next: 'b' },
              { t: "Hi, Aldo. Nice to meet you.", ok: 1, why: "Correcta y amable, pero deja que ella haga todo el trabajo. Añade <b>How do you know…?</b> para abrir la conversación.", next: 'b' },
              { t: "Hello, I am Aldo. I have 38 years and I work here.", ok: 0, why: "Calco de <i>tengo 38 años</i>: en inglés la edad va con <i>be</i> (<b>I'm 38</b>). Además, la edad no se suelta al presentarse.", next: 'a2' },
            ] },
            a2: { say: "Thirty-eight years? Oh, you mean you're 38! Sorry, my Spanish is terrible.", opts: [
              { t: "Ha, yes, I'm 38. That was my Spanish talking. So, how do you know Rodrigo?", ok: 2, why: "Te ríes del fallo, lo corriges (<b>I'm 38</b>) y recuperas el guion con <b>How do you know Rodrigo?</b>", next: 'b' },
              { t: "Yes, I'm 38. Sorry about that.", ok: 1, why: "Correcta. Falta devolver la pelota con una pregunta para que la conversación siga.", next: 'b' },
              { t: "No problem. And you? Which is your age?", ok: 0, why: "Dos problemas: preguntar la edad a alguien recién conocido suena <i>nosy</i>, y <i>which</i> es para un grupo cerrado; la forma sería <b>How old are you?</b>", next: 'b' },
            ] },
            b: { say: "I work with him on the payments project, remotely. Actually, I've heard a lot about you!", opts: [
              { t: "Good things, I hope!", ok: 2, why: "La respuesta de la unidad a <b>I've heard a lot about you</b>: <b>Good things, I hope!</b> Simpática y sin arrogancia.", next: 'c' },
              { t: "Oh, really? That's nice to hear.", ok: 1, why: "Correcta y modesta, parecida a <i>Oh, that's nice</i>. La fórmula con humor queda más natural aquí.", next: 'c' },
              { t: "Yes, I know. Everybody knows me here.", ok: 0, why: "Suena arrogante. A un cumplido se responde con humor o modestia, no confirmándolo.", next: 'b2' },
            ] },
            b2: { say: "Ha… OK. Well, Rodrigo did say you were the honest type.", opts: [
              { t: "Sorry, that came out wrong. Good things, I hope!", ok: 2, why: "Reparas el tono y usas la fórmula de la unidad: <b>Good things, I hope!</b>", next: 'c' },
              { t: "Sorry, bad joke. I'm always a bit nervous at these events.", ok: 1, why: "Correcta y humana: usas <b>nervous</b> del vocabulario para explicarte. Funciona.", next: 'c' },
              { t: "I don't joke. I am a serious person.", ok: 0, why: "Insistir en el tono seco después de un aviso cierra la conversación. <b>Serious</b> está bien como adjetivo, pero no como excusa.", next: 'fail' },
            ] },
            c: { say: "He said you built half the payments system. And that you run a food business with your wife?", opts: [
              { t: "That's right! My wife and I have a small food business on weekends. I'm really into cooking. And you? Can you tell me where you were raised?", ok: 2, why: "Das información personal con <b>be into</b> y preguntas con educación usando la pregunta indirecta de la unidad: <b>Can you tell me where you were raised?</b>", next: 'd' },
              { t: "Yes, with my wife. Where are you from?", ok: 1, why: "Correcta. La pregunta directa está bien, pero la indirecta (<i>Can you tell me…?</i>) suena más suave con alguien nuevo.", next: 'd' },
              { t: "Yes. Are you married? Do you live alone?", ok: 0, why: "Vocabulario correcto, pregunta equivocada: estado civil y con quién vive son temas <i>nosy</i> en inglés. Y menos a bocajarro.", next: 'c2' },
            ] },
            c2: { say: "Wow, straight to the personal questions!", opts: [
              { t: "Sorry, that was too direct. I'd just like to know a bit more about you. Where were you raised?", ok: 2, why: "Te disculpas, usas un arranque suave (<b>I'd like to know…</b>) y cambias a un tema seguro: <b>Where were you raised?</b>", next: 'd' },
              { t: "Sorry, I was just trying to make conversation.", ok: 1, why: "Correcta como disculpa, pero no propones otro tema; ella tiene que rescatar la charla.", next: 'd' },
              { t: "Why? Is a secret?", ok: 0, why: "Falta el sujeto (<b>Is it a secret?</b>) y el tono es de reproche. Después de un aviso así, toca disculparse.", next: 'fail' },
            ] },
            d: { say: "I was born in Lima, actually! But I was raised in Toronto. My parents moved when I was three.", opts: [
              { t: "No way! I was born and raised in Lima. Which neighborhood did your family live in?", ok: 2, why: "<b>I was born and raised in</b> con el verbo <i>be</i> en su sitio, y <b>which</b> porque preguntas dentro de un grupo concreto: los barrios de Lima.", next: 'e' },
              { t: "Really? So you're Peruvian too. Do you still have family here?", ok: 1, why: "Correcta y natural. Se pierde la ocasión de contar lo tuyo (<i>I was born in Lima too</i>).", next: 'e' },
              { t: "No way! I born in Lima too. Where you live now?", ok: 0, why: "Dos errores típicos: <b>I was born</b> (siempre con <i>be</i>) y la pregunta sin auxiliar: <b>Where do you live now?</b>", next: 'e' },
            ] },
            e: { say: "Miraflores, I think. Hey, is that your phone? It's been buzzing for a while.", opts: [
              { t: "Oh! Hold on a sec. It's my wife, about a big order for Saturday. Sorry about that.", ok: 2, why: "<b>Hold on a sec</b> es la expresión informal de la unidad para pedir un momento sin sonar brusco. Luego te disculpas y explicas.", next: 'f' },
              { t: "Sorry, one moment, please.", ok: 1, why: "Correcta y educada, algo más formal. En una charla relajada <i>Hold on a sec</i> suena más natural.", next: 'f' },
              { t: "Wait me a second.", ok: 0, why: "Calco de <i>espérame</i>: <i>wait</i> no lleva objeto directo. Sería <b>Wait a second</b> o <b>Hold on a sec</b>.", next: 'f' },
            ] },
            f: { say: "Everything OK?", opts: [
              { t: "Yes, all good. Listen, I'd like to know if you have time this week. I could show you the payments system.", ok: 2, why: "Pregunta indirecta de sí/no con <b>if</b> y orden de afirmativa: <b>I'd like to know if you have time</b>. Educado y útil.", next: 'g' },
              { t: "Yes, all good. Do you have time this week to see the system?", ok: 1, why: "Correcta. La pregunta directa funciona entre colegas; la indirecta suena un punto más cuidada.", next: 'g' },
              { t: "Yes. I want to know do you have time this week?", ok: 0, why: "Dentro de una pregunta indirecta no va <i>do</i>: <b>I want to know if you have time</b>. Y las de sí/no necesitan <b>if</b>.", next: 'g' },
            ] },
            g: { say: "I'd love that. Oh, Rodrigo is waving at me. I think the meeting is starting.", opts: [
              { t: "I should let you go. It was nice to meet you, Emma.", ok: 2, why: "Cierre perfecto de la unidad: <b>I should let you go</b> + <b>It was nice to meet you</b>, porque es la primera vez que la ves.", next: 'win' },
              { t: "Sorry, I have to go too. See you in the meeting!", ok: 1, why: "Correcta: <b>Sorry, I have to go</b> es otra fórmula de la unidad. Falta el toque de <i>nice to meet you</i>.", next: 'win' },
              { t: "It was nice talking to you again.", ok: 0, why: "<b>It was nice talking to you</b> es para alguien que ya conocías, y <i>again</i> lo empeora: acabas de conocerla. Primera vez → <b>nice to meet you</b>.", next: 'meh' },
            ] },
            win: { say: "It was nice to meet you too, Aldo. See you in there!", end: true, outcome: 'win', note: 'Te presentaste (<b>Hello, I\'m Aldo</b>), preguntaste <b>How do you know Rodrigo?</b>, respondiste <b>Good things, I hope!</b>, preguntaste con educación (<b>Can you tell me where you were raised?</b>, <b>I\'d like to know if…</b>) y cerraste con <b>I should let you go. It was nice to meet you</b>. Recuerda: primera vez → <i>to meet</i>; si ya os conocíais → <i>talking to you</i>.' },
            meh: { say: "Again? Ha, I think this is the first time we've met! But yes, nice to meet you, Aldo.", end: true, outcome: 'meh', note: 'Todo bien hasta la despedida: a alguien que acabas de conocer se le dice <b>It was nice to meet you</b>. <i>It was nice talking to you</i> es para gente que ya conocías. Fíjate también en la forma: <i>to meet</i> pero <i>talking</i>.' },
            fail: { say: "Right… Well, I should let you go. Enjoy the lunch.", end: true, outcome: 'fail', note: 'Emma usa <b>I should let you go</b> para escapar: el tono cerró la puerta. Con alguien nuevo, a un cumplido se responde <b>Good things, I hope!</b>, los temas personales se suavizan con preguntas indirectas (<b>Can you tell me…?</b>, <b>I\'d like to know…</b>) y, si metes la pata, te disculpas en vez de insistir.' },
          } },
        ] },
      ] },
    ],
  };
})();
