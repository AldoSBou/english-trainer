/* ===========================================================
   ingles4/unit1.js — Inglés 4 · Unit 1: Accomplishments & qualities
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Vocabulario base ---------- */
  const ACC = [
    ['break a record', 'batir un récord', 'Usain Bolt broke the world record in Beijing.', '¿Conoces a alguien que haya batido un récord?'],
    ['face your fear', 'enfrentar tu miedo', 'I faced my fear of flying last year.', '¿Qué miedo te gustaría enfrentar?'],
    ['get a lot of likes', 'conseguir muchos likes', 'Her photo of the beach got a lot of likes.', '¿Qué publicación tuya ha tenido más likes?'],
    ['have a sense of humor', 'tener sentido del humor', 'My grandfather has a great sense of humor.', '¿Quién tiene mejor sentido del humor en tu familia?'],
    ['rise to a challenge', 'estar a la altura de un reto', 'The team rose to the challenge and finished on time.', '¿Cuándo estuviste a la altura de un reto difícil?'],
    ['run a business', 'dirigir un negocio', 'She runs a small bakery downtown.', '¿Te gustaría dirigir tu propio negocio?'],
    ['run a marathon', 'correr un maratón', "I've never run a marathon, but I'd like to.", '¿Has corrido alguna carrera larga?'],
    ['set a goal for yourself', 'ponerte una meta', 'I set a goal for myself: read one book a month.', '¿Qué meta te has puesto este año?'],
    ['take pride in something', 'sentirse orgulloso de algo', 'He takes pride in his work.', '¿De qué te sientes orgulloso?'],
    ['tell a joke', 'contar un chiste', 'Everybody laughed when Lydia told a joke.', '¿Eres bueno contando chistes?'],
    ['win a medal', 'ganar una medalla', 'She won a gold medal at the Olympics.', '¿Has ganado alguna medalla o premio?'],
    ['work with your hands', 'trabajar con las manos', 'My uncle is a carpenter. He works with his hands.', '¿Prefieres trabajar con las manos o con la cabeza?'],
  ];
  const QUAL = [
    ['ambitious', 'ambition', 'wanting to be successful or powerful', "Tina is really ambitious. She's working hard to get a better job."],
    ['confident', 'confidence', 'certain about your ability to do things well', 'I feel really confident about my job interview.'],
    ['creative', 'creativity', 'good at thinking of new ideas or using imagination', "Raul is a great artist. He's so creative."],
    ['curious', 'curiosity', 'wanting to know or learn about something', "I read an article about Antarctica and now I'm really curious about it."],
    ['enthusiastic', 'enthusiasm', 'very interested in something and wanting to be involved in it', "Mike is always so enthusiastic about what he's teaching."],
    ['experienced', 'experience', 'having skill and knowledge because you have done something many times', "He's been a nurse for more than 10 years, so he's very experienced."],
    ['independent', 'independence', 'not wanting or needing anyone else to help you', "I'm pretty independent. I enjoy traveling alone."],
    ['polite', 'politeness', 'behaving in a way that is not rude', 'The hotel staff were very polite and kind.'],
    ['qualified', 'qualification(s)', 'having the education, skills or experience you need', "Tell me why you're qualified for this position."],
    ['responsible', 'responsibility', 'able to make good decisions and be trusted', 'If you work with children, you have to be very responsible.'],
    ['successful', 'success', 'having achieved a lot through your work', 'My aunt is a successful artist.'],
    ['truthful', 'truthfulness', 'honest, not telling any lies', "I'm upset because you weren't truthful with me."],
  ];
  const VERBS = ['break', 'face', 'get', 'have', 'rise to', 'run', 'set', 'take', 'tell', 'win', 'work with'];
  const TENSES = ['simple present', 'simple past', 'present perfect', 'present continuous', 'past continuous', 'present perfect continuous'];

  const SIT = [
    ['She started her own company at 24 and wants to open five more offices by 30.', 'ambitious'],
    ['He never blames others; if something goes wrong, he says "that was my mistake".', 'responsible'],
    ['Before the exam he said: "Don\'t worry, I\'ve studied hard. I\'ll pass."', 'confident'],
    ['She always asks "why?" and reads about everything from volcanoes to jazz.', 'curious'],
    ['He turned old bicycle parts into a lamp for his living room.', 'creative'],
    ["She jumps up and down when the new project is announced. She can't wait to start.", 'enthusiastic'],
    ["He's been doing this job for 15 years. There is no problem he hasn't seen.", 'experienced'],
    ['She moved to another country alone at 19 and figured everything out herself.', 'independent'],
    ['He holds the door, says "please" and "thank you", and never interrupts.', 'polite'],
    ['She has a degree in nursing and two certificates for the position.', 'qualified'],
    ['Her paintings are in museums, and she makes a good living from her art.', 'successful'],
    ["Even when it's uncomfortable, he tells you exactly what happened.", 'truthful'],
  ];

  window.UNIT_DATA['ingles4/unit1'] = {
    source: 'Evolve · Unit 1 · Accomplishments & qualities',
    description: 'Logros y cualidades personales, tiempos simples vs continuos, verbos de estado, presentaciones y entrevistas de trabajo.',
    cando: [
      "Presentarme y presentar a alguien: <i>I don't think we've met</i> · <i>Let me introduce you to…</i> · <i>We go way back</i>",
      "Contar un logro con present perfect y distinguirlo del pasado simple (<i>I've run a marathon</i> / <i>I ran it in 2023</i>)",
      "Describir a una persona con cualidades y sus sustantivos (<i>ambitious / ambition</i>, <i>confident / confidence</i>)",
      "Hablar de lo que estoy haciendo estos días con present continuous y present perfect continuous, y usar <i>think / want / know</i> sin -ing",
      "Usar <i>meet</i> y <i>know</i> en el momento correcto, y decir <i>I don't have time</i> (nunca <i>I haven't time</i>)",
      "Escribir un comentario a un artículo suavizando con <i>a bit</i> / <i>a little</i>",
    ],
    map: [
      ['Vocabulary', '12 expresiones de logros (<i>break a record, rise to a challenge…</i>) y 12 pares adjetivo/sustantivo (<i>ambitious/ambition…</i>)', 'Flashcards con audio, emparejar, collocations, cualidades por situación'],
      ['Grammar', 'Simple vs continuous tenses; verbos de estado (<i>think, want, need, know</i>)', 'Detective de tiempos, elige la forma correcta, trampa de verbos de estado'],
      ['Listening', 'Diálogos de presentaciones', 'Dictado con voz sintética (velocidad ajustable) y diálogo con preguntas'],
      ['Speaking', 'True or false, describir personas, entrevista', 'Retos con cronómetro y reconocimiento de voz; sílaba tónica'],
      ['Reading', '"It isn\'t only what you say…" (lenguaje corporal)', 'Texto nuevo sobre el mismo tema + inferir significado'],
      ['Writing', 'Comentario a un artículo; suavizar con <i>a bit / a little</i>', 'Corrige tus propios errores, reescribe, checklist'],
      ['Social English', '<i>Have you met…? We go way back.</i>', 'Ordenar diálogos, responder a presentaciones'],
    ],
    weak: [
      '<b>Present perfect</b>: escribiste <i>"I was being to NYC twice"</i> → <i>I<b>\'ve been</b> to NYC twice</i>. Experiencia sin tiempo específico = present perfect.',
      '<b>have</b> como verbo principal: <i>"I haven\'t time"</i> → <i>I <b>don\'t have</b> time</i>.',
      '<b>Preposiciones</b>: <i>participate <b>in</b></i> (no <i>on</i>); <i>take pride <b>in</b></i>.',
      '<b>watch vs look at</b>: miras una medalla → <i>when I <b>look at</b> it</i>.',
    ],
    weakLink: 'Trabájalos en <b>Writing › Corrige tus frases</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...ACC.map(a => ({ cat: 'Describing accomplishments', w: a[0], def: a[1], ex: a[2], ask: a[3] })),
            ...QUAL.map(q => ({ cat: 'Describing key qualities', w: q[0] + ' / ' + q[1], say: q[0] + ', ' + q[1].replace('(s)', ''), def: q[2], ex: q[3], ask: '¿Quién de tu entorno es ' + q[0] + '? Dilo en voz alta.' })),
          ] },
        { label: 'Adjetivo ↔ Sustantivo', type: 'match', eyebrow: 'Word families', title: 'Empareja el adjetivo con su sustantivo', intro: 'Toca uno de la izquierda y luego su pareja de la derecha. Fíjate en los sufijos: <i>-ence, -ity, -ness, -ion</i>.', pairs: QUAL.map(q => [q[0], q[1]]), round: 6 },
        { label: 'Collocations', type: 'mcq', eyebrow: 'Describing accomplishments', title: 'Completa la collocation', intro: 'Estas expresiones van siempre con el mismo verbo. Aprende el verbo, no solo el sustantivo.',
          build: ({ pick, esc }) => pick(ACC, 6).map(a => { const verb = a[0].startsWith('rise to') ? 'rise to' : a[0].startsWith('work with') ? 'work with' : a[0].split(' ')[0]; const obj = a[0].slice(verb.length);
            return { q: `<span class="blank">?</span>${esc(obj)}`, opts: [verb, ...pick(VERBS.filter(x => x !== verb), 3)], a: verb, why: `<b>${a[0]}</b> — ${a[1]}. “${a[2]}”` }; }) },
        { label: '¿Qué cualidad es?', type: 'mcq', eyebrow: 'Describing key qualities', title: 'Lee la situación y elige la cualidad',
          build: ({ pick, esc }) => pick(SIT, 6).map(s => { const q = QUAL.find(x => x[0] === s[1]); return { q: esc(s[0]), opts: [s[1], ...pick(QUAL.map(x => x[0]).filter(x => x !== s[1]), 3)], a: s[1], why: `<b>${q[0]}</b> (adj.) / <b>${q[1]}</b> (n.) — ${q[2]}.` }; }) },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Simple vs continuous', title: 'La regla en una imagen mental', html: `
          <p style="margin:8px 0 14px">Los tiempos <b>simples</b> hablan de hechos: hábitos, acciones terminadas, experiencias. Los <b>continuos</b> hablan de acciones <b>en progreso</b>, como una foto de algo a medio hacer.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Tiempo</th><th>Cuándo</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>Simple present</b></td><td>hábitos, rutinas</td><td>I <b>get up</b> at eight every morning.</td><td>every day, usually, often</td></tr>
            <tr><td><b>Simple past</b></td><td>acción terminada en un momento concreto</td><td>I <b>went</b> to work early yesterday.</td><td>yesterday, last year, in 2016</td></tr>
            <tr><td><b>Present perfect</b></td><td>experiencia, sin decir cuándo</td><td>I<b>'ve been</b> to New York City twice.</td><td>ever, never, twice, already</td></tr>
            <tr><td><b>Present continuous</b></td><td>en progreso ahora / planes</td><td>I<b>'m reading</b> a great book right now.</td><td>right now, at the moment, lately</td></tr>
            <tr><td><b>Past continuous</b></td><td>en progreso en el pasado, interrumpida</td><td>I <b>was walking</b> down the street when it started to rain.</td><td>when + simple past</td></tr>
            <tr><td><b>Present perfect continuous</b></td><td>empezó en el pasado y sigue</td><td>I<b>'ve been taking</b> a cooking class for the last few months.</td><td>for, since, lately, recently</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Tu error a vigilar:</b> "I <s>was being</s> to NYC twice" → <b>I've been</b> to NYC twice. <i>Twice</i> (dos veces, sin fecha) pide present perfect.</div>
          <h3 style="margin-top:18px">Verbos de estado (stative verbs)</h3>
          <p style="margin-top:6px">Algunos verbos describen estados, no acciones, y <b>no</b> van en continuo: <b>think</b> (opinar), <b>want, need, know, like, believe, understand</b>. Compara: <i>I <b>think</b> she needs a break</i> (opinión) vs <i>I<b>'m thinking</b> of visiting my sister</i> (proceso mental en curso).</p>` },
        { label: 'Detective de tiempos', type: 'mcq', eyebrow: 'Tense detective', title: '¿Qué tiempo verbal es y por qué?', pool: 7,
          build: ({ pick }) => pick([
            ['I <b>usually get</b> a lot of likes when I post photos of my empanadas.', 'simple present', 'hábito → simple present. Pista: <i>usually</i>.'],
            ['She <b>won</b> a medal at the regional championship in 2019.', 'simple past', 'acción terminada con fecha (<i>in 2019</i>) → simple past.'],
            ["I<b>'ve never run</b> a marathon.", 'present perfect', 'experiencia en la vida, sin fecha (<i>never</i>) → present perfect.'],
            ["We<b>'re planning</b> to open a second shop next year.", 'present continuous', 'plan en marcha → present continuous.'],
            ['I <b>was telling</b> a joke when the boss walked in.', 'past continuous', 'acción en progreso interrumpida (<i>when… walked in</i>) → past continuous.'],
            ["He<b>'s been running</b> the family business for ten years.", 'present perfect continuous', 'empezó en el pasado y continúa (<i>for ten years</i>) → present perfect continuous.'],
            ['They <b>set</b> a goal for themselves last January.', 'simple past', '<i>last January</i> = momento concreto → simple past.'],
            ["I<b>'ve been reading</b> a lot about job interviews lately.", 'present perfect continuous', 'actividad reciente que sigue (<i>lately</i>) → present perfect continuous.'],
            ['<b>Have</b> you ever <b>broken</b> a record?', 'present perfect', '<i>ever</i> pregunta por experiencia → present perfect.'],
            ["She <b>works</b> with her hands all day; she's a potter.", 'simple present', 'hecho general → simple present.'],
            ["Sorry, I <b>wasn't listening</b>. Can you repeat that?", 'past continuous', 'acción en progreso en un momento del pasado → past continuous.'],
            ["I<b>'m facing</b> my fear of public speaking this week.", 'present continuous', 'en progreso ahora (<i>this week</i>) → present continuous.'],
          ], 7).map(d => ({ q: d[0], opts: [d[1], ...pick(TENSES.filter(t => t !== d[1]), 3)], a: d[1], why: d[2] })) },
        { label: 'Elige la forma', type: 'mcq', eyebrow: 'Como en el curso, con frases nuevas', title: 'Elige la forma correcta', pool: 7, items: [
          { blank: 1, q: 'I ___ to Cusco three times. I love it there.', opts: ["'ve been", 'was being', 'went', "'m going"], a: "'ve been", why: 'Experiencia repetida sin fecha (<i>three times</i>) → present perfect. <b>Tu error del curso:</b> <i>was being</i> no existe con este sentido.' },
          { blank: 1, q: "She ___ English for six months, and she's improving fast.", opts: ["'s been studying", 'studies', 'studied', 'was studying'], a: "'s been studying", why: 'Empezó hace seis meses y continúa → present perfect continuous.' },
          { blank: 1, q: 'I ___ for the bus when I saw my old teacher.', opts: ['was waiting', 'waited', 'have waited', "'m waiting"], a: 'was waiting', why: 'Acción en progreso interrumpida (<i>when I saw</i>) → past continuous.' },
          { blank: 1, q: 'My brother ___ a small business. He sells car parts.', opts: ['runs', 'is running', 'ran', 'has run'], a: 'runs', why: 'Hecho permanente / trabajo habitual → simple present.' },
          { blank: 1, q: 'We ___ the record last Saturday!', opts: ['broke', 'have broken', 'were breaking', 'break'], a: 'broke', why: '<i>Last Saturday</i> = fecha concreta → simple past.' },
          { blank: 1, q: "Don't call me now, I ___ a cooking class.", opts: ["'m taking", 'take', "'ve taken", 'took'], a: "'m taking", why: 'Justo ahora, en progreso → present continuous.' },
          { blank: 1, q: '___ you ever ___ a medal?', opts: ['Have / won', 'Did / win', 'Were / winning', 'Do / win'], a: 'Have / won', why: '<i>Ever</i> + experiencia → present perfect.' },
          { blank: 1, q: 'I ___ up at six every day, even on weekends.', opts: ['get', 'am getting', 'have got', 'got'], a: 'get', why: 'Hábito (<i>every day</i>) → simple present.' },
          { blank: 1, q: "She ___ me a joke yesterday and I couldn't stop laughing.", opts: ['told', 'has told', 'was telling', 'tells'], a: 'told', why: '<i>Yesterday</i> → simple past.' },
          { blank: 1, q: 'They ___ to a challenge every time the company changes.', opts: ['rise', 'are rising', 'rose', 'have been rising'], a: 'rise', why: '<i>Every time</i> = hábito → simple present.' },
        ] },
        { label: 'Verbos de estado', type: 'mcq', eyebrow: 'Trampa de verbos de estado', title: '¿Simple o continuo?', pool: 7, items: [
          { blank: 1, q: 'I ___ she needs a break.', opts: ['think', "'m thinking"], a: 'think', why: 'Opinión → <b>think</b> es de estado aquí. No va en continuo.' },
          { blank: 1, q: 'I ___ of visiting my sister next month.', opts: ["'m thinking", 'think'], a: "'m thinking", why: '<i>Think of / about</i> = proceso mental en curso → sí puede ir en continuo.' },
          { blank: 1, q: 'She ___ really hard at the moment.', opts: ["'s working", 'works'], a: "'s working", why: '<i>Work</i> es acción; <i>at the moment</i> → continuo.' },
          { blank: 1, q: 'I ___ to take her out for dinner.', opts: ['want', 'am wanting'], a: 'want', why: '<b>want</b> es verbo de estado: nunca en continuo.' },
          { blank: 1, q: 'Do you two ___ each other?', opts: ['know', 'knowing'], a: 'know', why: '<b>know</b> es de estado. Además, es una relación continua, no un evento.' },
          { blank: 1, q: 'I ___ what you mean now.', opts: ['understand', 'am understanding'], a: 'understand', why: '<b>understand</b> es de estado.' },
          { blank: 1, q: 'We ___ Pedro this morning at the meeting.', opts: ['met', 'were knowing'], a: 'met', why: 'Conocer a alguien por primera vez = <b>meet</b>, evento terminado → simple past.' },
          { blank: 1, q: 'I ___ this song! Turn it up.', opts: ['love', 'am loving'], a: 'love', why: '<b>love/like</b> son de estado en inglés estándar.' },
          { blank: 1, q: 'She ___ a great sense of humor.', opts: ['has', 'is having'], a: 'has', why: '<b>have</b> = poseer → estado. (<i>Is having lunch</i> sí es acción, pero no aquí.)' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>we\'ve</i>, <i>I\'m</i>).',
          sentences: ["I don't think we've met before.", 'Have you met Pedro?', 'We go way back. We used to live in Denver.', "I've been taking a cooking class for the last few months.", 'I was walking down the street when it started to rain.', "She's working really hard at the moment.", 'You have to show confidence to do well in an interview.', 'Let me introduce you to some people.', "I've never run a marathon, but I'd like to.", 'He takes pride in his work.', 'Is this your first day?', "Nice to see you again. It's been a long time."] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for gist', title: 'Escucha el diálogo y responde', intro: 'Un diálogo corto con varias voces. Escúchalo entero antes de responder.',
          lines: [['Petra', "Hey, Ji-su. I'm Petra. Do you know Axel?"], ['Ji-su', "No, I don't. Hi, Axel. Nice to meet you both."], ['Axel', 'Hi, Ji-su. Great to meet you, too. Are you new here?'], ['Ji-su', "Yes, I just started on Monday. I've been working in marketing for five years, but this is my first job in a big company."], ['Petra', 'Hey, have you met Emma?'], ['Axel', 'Emma, of course. We go way back. We were students together in Denver.']],
          questions: [
            { q: 'Who has NOT met Axel before?', opts: ['Ji-su', 'Petra', 'Emma'], a: 'Ji-su', why: 'Ji-su says "No, I don\'t. Hi, Axel. Nice to meet you."' },
            { q: 'How long has Ji-su been working in marketing?', opts: ['five years', 'since Monday', 'five months'], a: 'five years', why: '"I\'ve been working in marketing for five years" — present perfect continuous.' },
            { q: 'What does "We go way back" mean?', opts: ['They have known each other for a long time', 'They are going back to Denver', 'They met last week'], a: 'They have known each other for a long time', why: '<i>Way back</i> = muy atrás en el tiempo.' },
            { q: 'When did Ji-su start the job?', opts: ['on Monday', 'five years ago', 'today'], a: 'on Monday', why: '"I just started on Monday." Simple past + momento concreto.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'True or false?', task: 'Di tres frases sobre ti con estas estructuras y explica por qué: "I have never…", "I have been …-ing for…", "I would like to…". Usa expresiones de logros.', model: 'Modelo: "I\'ve never run a marathon because I don\'t have time to train, but I\'d like to run one someday. I\'ve been running a small business for two years and I take pride in it."', tags: ['never', 'been', 'would like', 'because', 'marathon', 'business', 'pride'] },
          { t: 'Describe someone you admire', task: 'Describe a una persona real con tres cualidades de la unidad (adjetivo + sustantivo) y un ejemplo de cada una.', model: 'Modelo: "My aunt is very ambitious. Her ambition is to open a second restaurant. She\'s also really responsible: she never blames anyone…"', tags: ['ambitious', 'confident', 'responsible', 'creative', 'experienced', 'because', 'always'] },
          { t: 'Job interview: tell me about yourself', task: 'Responde en 60 segundos: quién eres, tu experiencia (present perfect / present perfect continuous), qué haces ahora (present continuous) y una meta (would like to).', model: 'Modelo: "I\'m a software developer. I\'ve been working with Java for over eight years, and I\'ve led several projects. Right now I\'m studying for my degree, and I\'d like to run my own company one day."', tags: ['been working', 'experience', 'right now', 'would like', 'qualified', 'goal', 'led'] },
          { t: 'Introduce two people', task: 'Imagina que presentas a un compañero nuevo a un amigo. Haz las tres voces: presentas, uno responde que no se conocen, el otro dice que ya se conocían.', model: 'Modelo: "Have you met Carla? — I don\'t think we\'ve met. Hi, I\'m Luis. — Actually, we met yesterday at the café! Nice to see you again."', tags: ['have you met', 'nice to meet you', 'way back', 'first day', 'know each other', 'see you again'] },
          { t: 'Tell me about a time you failed', task: 'Cuenta un fallo real: situación (simple past), qué salió mal (past continuous + simple past), qué cambiaste desde entonces (present perfect continuous).', model: 'Modelo: "I was running a project and I underestimated the testing time. We delivered late. Since then, I\'ve been adding a buffer to every plan."', tags: ['was', 'underestimated', 'since then', 'been', 'learned', 'challenge', 'responsible'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación', title: 'Sílaba tónica: el sustantivo cambia', intro: 'En muchos pares el acento se mueve. Escucha y repite.',
          pairs: [['AM-bitious → am-BI-tion', 'ambitious, ambition'], ['CON-fident → CON-fidence', 'confident, confidence'], ['cre-A-tive → cre-a-TI-vity', 'creative, creativity'], ['CU-rious → cu-ri-O-sity', 'curious, curiosity'], ['en-thu-si-AS-tic → en-THU-si-asm', 'enthusiastic, enthusiasm'], ['ex-PE-rienced → ex-PE-rience', 'experienced, experience'], ['in-de-PEN-dent → in-de-PEN-dence', 'independent, independence'], ['QUA-lified → qua-li-fi-CA-tion', 'qualified, qualification'], ['re-SPON-sible → re-spon-si-BI-lity', 'responsible, responsibility'], ['suc-CESS-ful → suc-CESS', 'successful, success']] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'The interview question nobody prepares for', intro: 'Lee una vez para la idea general. Luego responde. Las palabras en amarillo se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Most people prepare for a job interview by memorizing answers. They can describe their qualifications, list their experience and explain why they are qualified for the position. But there is one question that <b>catches</b> almost everyone <b>off guard</b>: "Tell me about a time you failed."',
            'Recruiters don\'t ask this to be cruel. They ask it because a truthful answer shows two qualities at once. First, responsibility: can you say "that was my mistake" without blaming a colleague? Second, curiosity: did you actually learn something, or did you just feel bad for a week? An ambitious candidate who has never failed is either lying or has never set a real goal.',
            'The best answers follow a simple <b>pattern</b>. Describe the situation briefly, be honest about what went wrong, and spend most of your time on what you changed afterwards. "I was running a small project and I <b>underestimated</b> how long the testing would take. Since then, I\'ve been adding a buffer to every plan I make." Notice the tenses: past for the story, present perfect continuous for the habit that continues today.',
            'One warning: don\'t choose a "fake" failure like "I work too hard." Interviewers have heard it a thousand times, and it makes you sound a bit unrealistic. A real, small, well-explained mistake is far more <b>convincing</b> than a perfect story.',
          ],
          main: [
            { q: 'Answer honestly and focus on what you changed.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3 da el patrón: situación, error, y sobre todo lo que cambiaste.' },
            { q: 'Recruiters ask about failure to see two qualities.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: responsibility y curiosity.' },
            { q: 'Avoid fake failures like "I work too hard".', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4 es la advertencia.' },
            { q: 'One interview question surprises almost everyone.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1 introduce la pregunta "Tell me about a time you failed".' },
          ],
          infer: [
            { q: '<b>catches (someone) off guard</b> (paragraph 1)', opts: ['surprises someone who is not prepared', 'makes someone angry', 'helps someone relax'], a: 'surprises someone who is not prepared', why: 'La gente memoriza respuestas, pero esta pregunta no la esperan.' },
            { q: '<b>pattern</b> (paragraph 3)', opts: ['a way of doing something that is repeated', 'a type of mistake', 'a job interview'], a: 'a way of doing something that is repeated', why: '"Follow a simple pattern" → una estructura que se repite.' },
            { q: '<b>underestimated</b> (paragraph 3)', opts: ['thought something was smaller or easier than it really was', 'measured very carefully', 'forgot completely'], a: 'thought something was smaller or easier than it really was', why: 'Pensó que el testing tardaría menos de lo real. <i>Under-</i> = por debajo.' },
            { q: '<b>convincing</b> (paragraph 4)', opts: ['making you believe it is true', 'very long', 'funny'], a: 'making you believe it is true', why: 'Un error real "convence" más que una historia perfecta.' },
          ],
          think: '¿Estás de acuerdo con el artículo? Escribe dos frases empezando con <i>I think this is useful advice because…</i> o <i>I\'m not sure I agree that… because…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Corrige tus frases', type: 'fix', eyebrow: 'Error correction · tus frases reales', title: 'Reescribe la frase corrigiendo el error', intro: 'Estas frases son las que escribiste en el curso. Cada una tiene 1-2 errores. Corrígela y compara.', items: [
          { bad: "I've never run a marathon because I haven't time to prepare for it.", good: "I've never run a marathon because I don't have time to prepare for it.", why: '<b>have</b> como verbo principal ("tener") se niega con <b>don\'t have</b>. <i>Haven\'t</i> solo funciona como auxiliar (<i>I haven\'t run</i>).' },
          { bad: "I'd want to participate on each someday.", good: "I'd like to participate in one someday.", why: '<b>I\'d like to</b> es la forma natural para deseos. <b>participate in</b>, no <i>on</i>. <b>one</b> = un maratón cualquiera; <i>each</i> = cada uno.' },
          { bad: "I'd like to win a medal someday to put it on my wall to take pride when I watch it.", good: "I'd like to win a medal someday to put on my wall and take pride in it when I look at it.", why: '<b>take pride in</b> siempre lleva <i>in</i>. Miras una medalla → <b>look at</b> (<i>watch</i> es para cosas en movimiento).' },
          { bad: 'I was being to New York City twice.', good: "I've been to New York City twice.", why: 'Experiencia sin fecha → <b>present perfect</b>. <i>Was being</i> no expresa experiencia.' },
          { bad: "I've gotten a lot of likes on my last publication because I've been participating in a contest.", good: "I got a lot of likes on my last post because I've been participating in a contest.", why: '<i>My last post</i> es un momento concreto → <b>simple past</b>. En redes se dice <b>post</b>, no <i>publication</i>. El present perfect continuous sí está bien: sigue en marcha.' },
        ] },
        { label: 'Suavizar opiniones', type: 'soft', eyebrow: 'Softening · a bit / a little', title: 'Haz la crítica más suave', explain: 'En comentarios escritos, una opinión negativa directa suena agresiva. Añade <b>a bit</b> o <b>a little</b> antes del adjetivo, y opcionalmente <b>I\'m sorry, but I think…</b> delante.', missing: 'Falta <b>a bit</b> o <b>a little</b> antes del adjetivo', items: [
          { h: '"I think you\'re being unrealistic."', a: "I think you're being a bit unrealistic." },
          { h: '"Your plan is too expensive."', a: "I'm sorry, but I think your plan is a little too expensive." },
          { h: '"This advice is old-fashioned."', a: 'I think this advice is a bit old-fashioned.' },
          { h: '"The article is too general."', a: "I'm sorry, but the article is a little too general." },
        ] },
        { label: 'Escribe un comentario', type: 'comment', eyebrow: 'Writing task', title: 'Comenta el artículo de Reading', intro: 'Escribe 60-100 palabras. La checklist se marca sola al analizar el texto.', placeholder: 'I found this article useful because…', min: 60, max: 100, need: 4, checks: [
          { label: 'Digo si estoy de acuerdo o no en general (<i>I agree that… / I\'m not sure I agree…</i>)', re: /\b(i agree|i don't agree|i disagree|i'm not sure i agree|i think the article)/ },
          { label: 'Relaciono la información con mi experiencia (<i>In my experience… / When I…</i>)', re: /\b(in my experience|when i|i have had|i've had|i once|at my job|at work)/ },
          { label: 'Uso al menos una expresión de la unidad (<i>rise to a challenge, set a goal, confident, experience…</i>)', words: ['rise to', 'set a goal', 'break a record', 'face', 'take pride', 'sense of humor', 'run a business', 'win a medal', ...QUAL.flatMap(q => [q[0], q[1].replace('(s)', '')])] },
          { label: 'Suavizo una crítica con <i>a bit</i> / <i>a little</i>', re: /\b(a bit|a little)\b/ },
          { label: 'Uso present perfect para una experiencia sin fecha (<i>I\'ve had…, I\'ve never…</i>)', re: /\b(i've|i have|have never|has been|'ve been)\b/ },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Las frases, por situación', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Meeting someone for the first time</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I don't think we've met before.</li><li>You're new here, right?</li><li>Is this your first day?</li></ul></div>
          <div><h3>Introducing someone</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Do you know anyone here?</li><li>Let me introduce you to some people.</li><li>Have you met Pedro?</li><li>Do you two know each other?</li></ul></div>
          <div><h3>Responding to an introduction</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I'm not sure, but hi, I'm…</li><li>No, I haven't. / No, I don't. Hi, I'm…</li><li>Yeah, we go way back. How's it going?</li><li>Yes, we met this morning! Nice to see you again.</li></ul></div>
          <div class="hint small"><b>meet</b> = conocer por primera vez (<i>Nice to meet you</i>). <b>know</b> = relación que continúa (<i>Do you two know each other?</i>). En español ambos son "conocer": ahí está la trampa.<br><br><b>We go way back</b> = nos conocemos desde hace mucho. <i>Way back</i> = muy lejos (en tiempo o espacio).</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ["Liam: Hi, I'm Liam. I don't think we've met before.", "Clarissa: No, we haven't. Hi, I'm Clarissa.", "Liam: You're new here, right?", 'Clarissa: Yes, I just started on Monday.', 'Liam: Welcome! Let me introduce you to some people.'],
          ['Petra: Do you know anyone here?', "Ji-su: No, I don't. It's my first day.", 'Petra: Have you met Axel?', "Ji-su: No, I haven't. Hi, Axel. Nice to meet you.", 'Axel: Great to meet you, too.'],
          ['Ana: Hey, have you met Emma?', 'Axel: Emma, of course! We go way back.', "Emma: Yes! Hi, Axel. How's it going?", "Axel: Great. It's so nice to see you again.", 'Emma: It really has been a long time.'],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué respondes?', items: [
          { q: '"Have you met Sofía?" — Nunca la has visto.', opts: ["No, I haven't. Hi, I'm Aldo.", 'Yes, we go way back.', 'Yes, we met this morning!'], a: "No, I haven't. Hi, I'm Aldo.", why: 'La pregunta usa <i>have</i>, así que respondes con <i>haven\'t</i> y te presentas.' },
          { q: '"Do you know Marco?" — Son amigos desde el colegio.', opts: ["Yeah, we go way back. How's it going?", "No, I don't. Hi, I'm…", "I'm not sure, but hi."], a: "Yeah, we go way back. How's it going?", why: '<i>We go way back</i> = nos conocemos de hace mucho.' },
          { q: '"Do you two know each other?" — Crees que sí, pero no estás seguro.', opts: ["I'm not sure, but hi, I'm Aldo.", "No, we haven't.", 'Yes, I know.'], a: "I'm not sure, but hi, I'm Aldo.", why: 'Respuesta de duda + presentarte por si acaso.' },
          { q: '"Have you met Lucía?" — Os presentaron esta mañana.', opts: ['Yes, we met this morning! Nice to see you again.', 'Yes, we know this morning.', 'No, nice to meet you.'], a: 'Yes, we met this morning! Nice to see you again.', why: '<b>met</b> (simple past, evento concreto) y <b>see you again</b> porque ya no es la primera vez.' },
          { q: 'Es el primer día de un compañero nuevo y no conoce a nadie. ¿Qué le dices?', opts: ['Let me introduce you to some people.', 'Do you know me?', 'We go way back.'], a: 'Let me introduce you to some people.', why: 'Frase para presentar a alguien a un grupo.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Primer día en la nueva empresa', intro: 'Es tu primer día. Una compañera te aborda en la cocina de la oficina. Elige qué dices en cada turno, dilo en voz alta y mira adónde te lleva. Cuidado con <i>meet</i> (primera vez) y <i>know</i> (relación que continúa).', scenes: [
          { t: 'Primer día en la nueva empresa', you: 'Aldo, desarrollador nuevo', partner: 'Lucía', role: 'diseñadora, lleva tres años en la empresa', goal: 'Preséntate, responde bien a dos presentaciones y acaba conociendo a tres personas.', start: 'a', nodes: {
            a: { say: "Hi! I don't think we've met before. You're new here, right?", opts: [
              { t: "Yes, it's my first day. Hi, I'm Aldo.", ok: 2, why: "A <b>You're new here, right?</b> se responde confirmando y presentándote: <b>Yes, it's my first day. Hi, I'm…</b>", next: 'b' },
              { t: "Yes. I'm Aldo, the new developer. Nice to meet you.", ok: 1, why: "Correcta y amable. La respuesta más típica a <i>You're new here, right?</i> empieza por <b>Yes, it's my first day</b>.", next: 'b' },
              { t: "Yes, I know you. I'm Aldo.", ok: 0, why: "<b>know</b> es una relación que continúa; a alguien que acabas de ver por primera vez no lo <i>conoces</i>. Para una primera vez: <b>meet</b>.", next: 'a2' },
            ] },
            a2: { say: "You know me? Hmm, I don't think so… Anyway, I'm Lucía, from the design team.", opts: [
              { t: "Sorry, I'm not sure. Hi, I'm Aldo, the new developer.", ok: 2, why: "<b>I'm not sure, but hi, I'm…</b> es la fórmula para cuando no estás seguro de si os conocíais. Salva la situación con naturalidad.", next: 'b' },
              { t: "Nice to meet you, Lucía. I'm Aldo.", ok: 1, why: "Bien: <b>Nice to meet you</b> es lo correcto en una primera vez. Podías añadir una disculpa breve por la confusión.", next: 'b' },
              { t: "Yes, we go way back!", ok: 0, why: "<b>We go way back</b> = nos conocemos desde hace muchísimo. Es tu primer día: suena a broma rara.", next: 'b' },
            ] },
            b: { say: "Welcome, Aldo! So, do you know anyone here yet?", opts: [
              { t: "Not really. Only my manager, Carla.", ok: 2, why: "<b>Not really</b> suaviza el <i>no</i> y añades la excepción. Natural y breve.", next: 'c' },
              { t: "No, I don't. You're the first person I've talked to.", ok: 1, why: "Correcta (<i>No, I don't</i> responde a <i>Do you know…?</i>). Un poco más larga de lo habitual, pero suena bien.", next: 'c' },
              { t: "No, I don't meet anybody.", ok: 0, why: "Confusión doble: la pregunta es con <b>know</b>, y si hablas de <i>meet</i> sería <b>I haven't met anyone yet</b> (present perfect, no presente simple).", next: 'c' },
            ] },
            c: { say: "Let me introduce you to some people, then. Pedro! Have you met Aldo? He's our new developer.", opts: [
              { t: "No, I haven't. Hi, Pedro. Nice to meet you.", ok: 2, why: "A <b>Have you met…?</b> se responde <b>No, I haven't. Hi, I'm…</b> (o <i>Nice to meet you</i>). Perfecto.", next: 'd' },
              { t: "Hi, Pedro. I don't think we've met. I'm Aldo.", ok: 1, why: "Correcta. <b>I don't think we've met</b> suele decirlo quien inicia; como respuesta a <i>Have you met…?</i> es más directo <b>No, I haven't</b>.", next: 'd' },
              { t: "Yes, we met this morning! Nice to see you again.", ok: 0, why: "Esa es la respuesta para cuando <i>sí</i> os habíais visto ya. En esta historia es la primera vez que ves a Pedro.", next: 'd2' },
            ] },
            d2: { who: 'Pedro', say: "This morning? I was at the dentist all morning… but OK, nice to meet you too!", opts: [
              { t: "Oh, sorry, I'm mixing people up. Nice to meet you, Pedro.", ok: 2, why: "Reconoces el error con humor (<b>I'm mixing people up</b>) y vuelves a la fórmula correcta: <b>Nice to meet you</b>.", next: 'd' },
              { t: "Sorry! Too many new faces today.", ok: 1, why: "Bien, es una salida simpática. Añade <i>Nice to meet you</i> para cerrar la presentación.", next: 'd' },
              { t: "No, I'm sure. We go way back.", ok: 0, why: "Insistir en algo falso, y encima con <b>we go way back</b> (nos conocemos desde hace años), deja a Pedro descolocado.", next: 'd' },
            ] },
            d: { who: 'Pedro', say: "So, Aldo, what do you do? Tell me a bit about yourself.", opts: [
              { t: "I'm a developer. I've worked in banking for about six years, mostly on payment systems.", ok: 2, why: "Artículo (<b>a</b> developer) y <b>present perfect + for</b> para una experiencia que continúa. Breve y concreto: así se contesta <i>Tell me about yourself</i>.", next: 'e' },
              { t: "I'm a senior developer. Before this I worked at a bank.", ok: 1, why: "Correcta. Como dejaste el banco, <i>worked</i> (pasado) está bien. Un dato más (cuánto tiempo, en qué) la haría más interesante.", next: 'e' },
              { t: "I'm developer. I work in a bank since six years.", ok: 0, why: "Dos errores típicos: falta el artículo (<b>I'm a developer</b>) y <i>since + duración</i> no existe: <b>I've worked… for six years</b>.", next: 'e' },
            ] },
            e: { who: 'Pedro', say: "Nice! We need someone like that. Oh, do you two know each other? This is Marta, our project manager.", opts: [
              { t: "I'm not sure, but hi, I'm Aldo.", ok: 2, why: "La fórmula exacta de la unidad para <b>Do you two know each other?</b> cuando no estás seguro: <b>I'm not sure, but hi, I'm…</b>", next: 'win' },
              { t: "No, we don't. Hi, Marta. I'm Aldo.", ok: 1, why: "Correcta: <b>No, we don't</b> responde a <i>Do you know…?</i>. La versión de la unidad es <i>I'm not sure, but hi, I'm…</i>", next: 'win' },
              { t: "Yes, I know her since today.", ok: 0, why: "<i>Know since today</i> no funciona: o <b>we met this morning</b> (primera vez, pasado) o <b>I've known her for years</b>. Y aquí, además, no la conocías.", next: 'meh' },
            ] },
            win: { who: 'Marta', say: "Nice to meet you, Aldo. Welcome to the team. Come and find me if you need anything.", end: true, outcome: 'win', note: 'Te presentaste, respondiste a dos presentaciones y acabaste conociendo a Lucía, Pedro y Marta. Lo que fija esta escena: <b>meet</b> para la primera vez (<i>Nice to meet you</i>, <i>Have you met…?</i>) y <b>know</b> para la relación que continúa (<i>Do you two know each other?</i>).' },
            meh: { who: 'Marta', say: "Since today? Ha! Well, nice to meet you, Aldo.", end: true, outcome: 'meh', note: 'Llegaste al final, pero la última frase confundió a Marta. Recuerda: <b>I\'m not sure, but hi, I\'m…</b> cuando no sabes si os conocíais, y nunca <i>know since today</i>.' },
          } },
        ] },
      ] },
    ],
  };
})();
