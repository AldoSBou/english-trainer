/* ===========================================================
   ingles3/unit7.js — Inglés 3 · Unit 7: Entertain us
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Lesson 1 · Music ---------- */
  /* [ palabra , significado ES , ejemplo EN , pregunta personal ES ] */
  const MUSIC = [
    ['classical (music)', 'música clásica: música seria como la de Mozart o Stravinsky', 'Sometimes I listen to classical music while I study. I find it relaxing.', '¿Escuchas música clásica para concentrarte?'],
    ['country (music)', 'música country, estilo popular del sur y el oeste de EE. UU.', 'My cousin in Nashville, Tennessee is a big fan of country music.', '¿Conoces algún cantante de country?'],
    ['EDM', 'música electrónica de baile, con ritmo fuerte, de clubes y festivales', 'My friends love EDM. They go to a dance club every weekend.', '¿Has ido alguna vez a un festival de EDM?'],
    ['folk (music)', 'música folclórica, escrita y tocada al estilo tradicional', 'There were some folk musicians playing in the park. They played traditional songs.', '¿Qué música folclórica se toca en tu región?'],
    ['heavy metal', 'heavy metal: rock muy alto y distorsionado con instrumentos eléctricos', "My roommate plays heavy metal all day. I hate it! It's so loud.", '¿Aguantas el heavy metal o te parece demasiado?'],
    ['hip-hop', 'hip-hop: música en la que las palabras se hablan en vez de cantarse', 'My favorite kind of music is hip-hop. It makes me want to dance.', '¿Qué artista de hip-hop escuchas?'],
    ['jazz', 'jazz: música con ritmo fuerte que a menudo se toca sin partitura', "We went to a live jazz show last weekend. It's amazing how they play without written music.", '¿Has visto jazz en directo?'],
    ['pop', 'pop: música moderna con ritmo fuerte, popular entre los jóvenes', 'My younger cousins always like the latest pop songs that you hear on the radio.', '¿Qué canción pop se te queda pegada últimamente?'],
    ['reggae', 'reggae: música popular de Jamaica con un ritmo muy marcado', 'We saw a lot of reggae performances when we were in Jamaica.', '¿Te relaja el reggae?'],
    ['rock', 'rock: música con ritmo fuerte, con guitarras eléctricas y batería', 'My friends and I want to start a rock band. I can play electric guitar.', '¿Qué banda de rock te marcó de adolescente?'],
  ];

  /* ---------- Lesson 2 · TV shows and movies ---------- */
  const SCREEN = [
    ['animated movie', 'película de animación (dibujos o modelos que parecen moverse)', 'I took my niece to see the new animated movie. We both loved it.', '¿Cuál es la película de animación que más te gusta?'],
    ['comedy', 'comedia: entretenimiento (película, obra…) que es divertido', 'My roommates and I like to watch comedies. We like movies that make us laugh.', '¿Qué comedia te ha hecho reír más?'],
    ['documentary', 'documental: da datos sobre una situación o personas reales', "My uncle is making a documentary about different parts of the world that many people don't know about.", '¿Sobre qué tema verías un documental?'],
    ['drama', 'drama: película o serie seria, con personajes realistas', 'My roommate was watching a TV drama all day yesterday. She loves them.', '¿Prefieres dramas realistas o historias de fantasía?'],
    ['game show', 'concurso de televisión en el que se juega para ganar premios', 'The Wheel of Fortune is an American game show where people try to guess a phrase.', '¿Qué concurso veías de pequeño?'],
    ['horror movie', 'película de terror: entretiene asustando o impresionando', 'My best friend and I love horror movies. We love movies that make us really scared.', '¿Te atreves con el terror o lo evitas?'],
    ['musical', 'musical: obra o película en la que parte de la historia se canta', "My son just got the lead part in his high school musical. I can't wait to see it.", '¿Has visto un musical en el teatro?'],
    ['reality show', 'reality: programa sobre gente corriente filmada en situaciones reales', "I'm watching a great new reality show. It follows three students who go to study abroad.", '¿Qué reality engancha más en tu país?'],
    ['romantic comedy', 'comedia romántica: película sobre el amor pensada para hacer reír', 'My husband and I love watching romantic comedies. He likes comedies and I like romance.', '¿Te gustan las comedias románticas?'],
    ['science fiction', 'ciencia ficción: historias sobre el futuro o sobre otras partes del universo', 'My boyfriend loves science fiction, especially anything about spaceships and life in the future.', '¿Qué historia de ciencia ficción te fascina?'],
    ['soap opera', 'telenovela: serie que continúa mucho tiempo sobre la vida de un grupo de personajes', 'My favorite soap opera is on tonight. One of the characters is going to find out the truth.', '¿Veías telenovelas en casa?'],
    ['talk show', 'programa de entrevistas donde se pregunta a la gente sobre su vida', 'I like to watch talk shows at night. I like it when the hosts interview celebrities.', '¿A quién te gustaría ver entrevistado?'],
    ['thriller', 'thriller: libro o película de intriga, a menudo sobre crímenes', 'He started watching a thriller about a detective that had to solve a huge crime.', '¿Qué thriller te mantuvo despierto hasta el final?'],
  ];

  /* ---------- Definiciones cortas para emparejar ---------- */
  const DEFS = [
    ['classical', 'serious music: Mozart, Stravinsky'],
    ['country', 'from the southern and western US'],
    ['EDM', 'electronic dance music for clubs'],
    ['folk', 'traditional style, passed down'],
    ['heavy metal', 'very loud, distorted rock'],
    ['hip-hop', 'the words are spoken, not sung'],
    ['jazz', 'strong beat, often without written music'],
    ['pop', 'modern, popular with young people'],
    ['reggae', 'from Jamaica, with a strong beat'],
    ['rock', 'electric guitars and drums'],
    ['animated movie', 'drawings and models seem to move'],
    ['comedy', 'entertainment that is funny'],
    ['documentary', 'facts about a real situation'],
    ['drama', 'serious, with realistic characters'],
    ['game show', 'people play games to win prizes'],
    ['horror movie', 'entertains by frightening you'],
    ['musical', 'part of the story is sung'],
    ['reality show', 'ordinary people in real situations'],
    ['romantic comedy', 'about love, and it makes you laugh'],
    ['science fiction', 'the future or other parts of the universe'],
    ['soap opera', 'continues for years, same characters'],
    ['talk show', 'hosts ask people about their lives'],
    ['thriller', 'exciting story, often about crime'],
  ];

  const ALL_WORDS = [...MUSIC.map(m => m[0].replace(' (music)', '')), ...SCREEN.map(s => s[0])];

  /* ---------- Situación → palabra ---------- */
  const SIT = [
    ['An orchestra plays a symphony by Mozart in a concert hall.', 'classical'],
    ['A singer in a cowboy hat plays guitar and sings about small towns in Tennessee.', 'country'],
    ['A DJ plays for thousands of people at a festival at three in the morning.', 'EDM'],
    ['Five neighbors play traditional songs they learned from their grandparents.', 'folk'],
    ['Two guitarists shake their long hair while the amplifiers shake the walls.', 'heavy metal'],
    ['The artist speaks the words fast over the beat instead of singing them.', 'hip-hop'],
    ['A trumpet player improvises for two minutes. Nobody is reading any music.', 'jazz'],
    ['The song is on the radio every hour and all the teenagers know the chorus.', 'pop'],
    ['A band from Kingston plays a slow, relaxed beat on the beach.', 'reggae'],
    ['Electric guitars, a bass and a loud drummer on a small stage.', 'rock'],
    ['A talking fish gets lost in the ocean and looks for his family. Everything is drawn.', 'animated movie'],
    ['A camera follows a scientist in Antarctica and explains how the ice is changing.', 'documentary'],
    ['Contestants spin a wheel and answer questions to win a car.', 'game show'],
    ['Two friends hide under a blanket because something is walking upstairs.', 'horror movie'],
    ['Six ordinary people share an apartment and the cameras film everything for a year.', 'reality show'],
    ['They meet in an airport, they argue, they fall in love and everybody laughs.', 'romantic comedy'],
    ['A crew travels between planets in the year 2380.', 'science fiction'],
    ['The same family has had problems on TV every afternoon since 2009.', 'soap opera'],
    ['The host sits on a sofa and asks a famous actor about his childhood.', 'talk show'],
    ['A detective has four days to find out who took the money.', 'thriller'],
    ['The actors stop talking and sing about their feelings, then dance.', 'musical'],
    ['A serious story about a family after an accident, with very realistic characters.', 'drama'],
  ];

  window.UNIT_DATA['ingles3/unit7'] = {
    source: 'WeTalk · Level 3 · Unit 7 · Entertain us (música, cine y televisión)',
    description: 'Tipos de música, cine y televisión; hábitos del pasado con used to y comparaciones con (not) as … as; rechazar invitaciones con educación y escribir una reseña de película.',
    map: [
      ['Vocabulary', '10 estilos de música (<i>classical, EDM, folk, heavy metal…</i>) y 13 tipos de programa y película (<i>documentary, soap opera, thriller…</i>)', 'Flashcards con audio, emparejar con la definición, identificar el género por la situación'],
      ['Grammar', '<i>used to / use to</i> (hábitos y estados del pasado) y comparaciones con <b>(not) as … as</b>', 'Tabla de formas, elegir la forma correcta, trampas <i>much/many</i> y <i>usually vs used to</i>'],
      ['Listening', 'Diálogos sobre gustos musicales y planes para salir', 'Dictado con voz sintética y diálogo con preguntas de comprensión'],
      ['Speaking', '<i>Musical changes</i>: describir cómo han cambiado tus gustos; <i>All of us… / Both of them…</i>', 'Retos con cronómetro y micrófono; pronunciación de la /m/ en <i>I\'m</i>'],
      ['Reading', 'Lesson 4 <i>Not just for kids</i>: leer para la idea general e identificar detalles', 'Texto nuevo sobre el mismo tema + ideas principales + inferir vocabulario'],
      ['Writing', 'Organizar ideas y escribir una reseña de película', 'Corrige errores típicos (y los tuyos), suaviza con <i>kind of / sort of</i>, checklist'],
      ['Social English', 'Rechazar una invitación y reaccionar a un rechazo', 'Frases por situación, ordenar diálogos, respuesta rápida'],
    ],
    weak: [
      '<b>as much / as many</b>: en <i>"Was there as ___ ___ as you wanted? (action)"</i> no completaste <i>as <b>much</b> action as</i>. <b>action</b> es incontable → <b>much</b>. Con contables (<i>scenes, songs, people</i>) → <b>many</b>.',
      '<b>No pierdas el segundo <i>as</i></b>: la estructura es <b>as</b> + adjetivo/adverbio/much/many + <b>as</b>. Si escribes solo <i>as exciting</i> o <i>as much action</i>, la comparación queda incompleta.',
    ],
    weakLink: 'Trabájalos en <b>Grammar › as … as</b> y en <b>Writing › Corrige la reseña</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...MUSIC.map(m => ({ cat: 'Music', w: m[0], say: m[0].replace(' (music)', ' music'), def: m[1], ex: m[2], ask: m[3] })),
            ...SCREEN.map(s => ({ cat: 'TV shows and movies', w: s[0], def: s[1], ex: s[2], ask: s[3] })),
          ] },
        { label: 'Palabra ↔ Definición', type: 'match', eyebrow: 'Music · TV shows and movies', title: 'Empareja el género con su definición', intro: 'Toca uno de la izquierda y luego su pareja de la derecha. Se mezclan estilos de música y tipos de programa.', pairs: DEFS, round: 6 },
        { label: '¿Qué género es?', type: 'mcq', eyebrow: 'Situación → palabra', title: 'Lee la escena y elige el género', pool: 8,
          build: ({ pick, esc }) => pick(SIT, 8).map(s => ({
            q: esc(s[0]),
            opts: [s[1], ...pick(ALL_WORDS.filter(w => w !== s[1]), 3)],
            a: s[1],
            why: '<b>' + s[1] + '</b> — ' + (DEFS.find(d => d[0] === s[1]) || ['', ''])[1] + '.',
          })) },
        { label: 'Completa la frase', type: 'mcq', eyebrow: 'Vocabulario en contexto', title: 'Elige la palabra que falta', pool: 7, items: [
          { blank: 1, q: "My grandmother has watched the same ___ every afternoon for fifteen years. She knows all the characters.", opts: ['soap opera', 'game show', 'documentary', 'musical'], a: 'soap opera', why: 'Una <b>soap opera</b> continúa durante años con el mismo grupo de personajes.' },
          { blank: 1, q: 'I fell asleep during that ___. Two hours of spaceships was too much for me.', opts: ['science fiction movie', 'talk show', 'reality show', 'comedy'], a: 'science fiction movie', why: '<b>Science fiction</b> = historias del futuro o del espacio.' },
          { blank: 1, q: "I can't watch ___ at night. I get scared and then I can't sleep.", opts: ['horror movies', 'romantic comedies', 'documentaries', 'musicals'], a: 'horror movies', why: 'Una <b>horror movie</b> entretiene asustando.' },
          { blank: 1, q: 'She learned everything about the Amazon from a ___ on TV.', opts: ['documentary', 'drama', 'soap opera', 'thriller'], a: 'documentary', why: 'Un <b>documentary</b> da datos sobre una situación real.' },
          { blank: 1, q: "In ___ the words are spoken over a beat, not sung.", opts: ['hip-hop', 'classical music', 'folk music', 'reggae'], a: 'hip-hop', why: 'Definición exacta de <b>hip-hop</b>.' },
          { blank: 1, q: 'My neighbor plays ___ at midnight. The whole building can hear the guitars.', opts: ['heavy metal', 'classical music', 'folk music', 'jazz'], a: 'heavy metal', why: '<b>Heavy metal</b> = rock muy alto y distorsionado.' },
          { blank: 1, q: "The musicians didn't use any written music. They just improvised. It was great ___.", opts: ['jazz', 'pop', 'EDM', 'country'], a: 'jazz', why: 'El <b>jazz</b> se toca a menudo sin partitura.' },
          { blank: 1, q: 'They stopped the scene, sang for three minutes and then danced. I love a good ___.', opts: ['musical', 'thriller', 'game show', 'documentary'], a: 'musical', why: 'En un <b>musical</b> parte de la historia se canta.' },
          { blank: 1, q: 'He plays songs his great-grandfather used to play. It is real ___ music.', opts: ['folk', 'pop', 'EDM', 'heavy metal'], a: 'folk', why: '<b>Folk</b> = tradicional, se pasa de generación en generación.' },
          { blank: 1, q: 'The detective has four days to find the money. Perfect ___.', opts: ['thriller', 'comedy', 'musical', 'reality show'], a: 'thriller', why: 'Un <b>thriller</b> es una historia de intriga, a menudo sobre crímenes.' },
          { blank: 1, q: 'We took the kids to an ___. It was about a fish who got lost.', opts: ['animated movie', 'animate movie', 'animation show', 'cartoon show'], a: 'animated movie', why: 'La colocación del curso es <b>animated movie</b>.' },
          { blank: 1, q: 'The host interviewed three actors on the sofa. It is my favorite ___.', opts: ['talk show', 'game show', 'reality show', 'soap opera'], a: 'talk show', why: 'En un <b>talk show</b> se pregunta a la gente sobre su vida.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas · used to', type: 'notes', eyebrow: 'Lesson 1 · Grammar', title: 'used to: lo que hacías o eras y ya no', html: `
          <p style="margin:8px 0 14px"><b>used to / use to</b> habla de <b>acciones repetidas</b> y <b>estados</b> del pasado: cosas que pasaban con frecuencia y ya no pasan, o que eran verdad y ya no lo son. El contraste "antes sí, ahora no" es la clave.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Cuándo</th><th>Ejemplo</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>used to</b> + infinitivo</td><td>afirmativa</td><td>I <b>used to</b> see friends most nights, but now I usually just watch TV.</td><td>siempre con <b>-d</b></td></tr>
            <tr><td><b>didn't use to</b></td><td>negativa</td><td>I <b>didn't use to</b> watch TV, but now I do.</td><td><i>did</i> ya lleva el pasado → <b>use</b>, sin <b>-d</b></td></tr>
            <tr><td><b>Did … use to …?</b></td><td>pregunta</td><td>What <b>did</b> you <b>use to</b> do in the evenings after work?</td><td>igual: <b>use to</b> tras <i>did</i></td></tr>
            <tr><td>Respuesta corta</td><td>sí / no</td><td>"Did you use to drink a lot of coffee?" — "Yes, I <b>did</b>." / "No, I <b>didn't</b>."</td><td>nunca <i>Yes, I used</i></td></tr>
            <tr><td>Estados pasados</td><td>algo que era verdad</td><td>I <b>used to love</b> coffee, but now I only like tea.</td><td>con <i>love, hate, have, be, like</i></td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Cuidado 1:</b> <i>used to</i> y <i>use to</i> suenan casi igual, pero <b>used to</b> solo va en afirmativa. Tras <b>did / didn't</b> siempre <b>use to</b>.<br><br>
          <b>Cuidado 2:</b> no mezcles <b>usually</b> y <b>used to</b> en la misma frase.<br>
          ✘ <i>I usually used to listen to hip-hop.</i><br>
          ✔ <i>I <b>usually listen</b> to hip-hop.</i> (hábito de ahora)<br>
          ✔ <i>I <b>used to listen</b> to heavy metal.</i> (hábito del pasado)</div>` },
        { label: 'Notas · as … as', type: 'notes', eyebrow: 'Lesson 2 · Grammar', title: '(not) as … as: dos cosas en la balanza', html: `
          <p style="margin:8px 0 14px"><b>as … as</b> dice que dos cosas son <b>iguales</b>. <b>not as … as</b> dice que la primera es <b>menos</b> que la segunda. Siempre hay <b>dos</b> <i>as</i>: uno delante y otro detrás.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Va con…</th><th>Estructura</th><th>Ejemplo</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>Adjetivos</b></td><td>as + adj + as</td><td>This game is <b>as exciting as</b> the last one.</td><td>nunca <i>as … than</i></td></tr>
            <tr><td><b>Adverbios</b></td><td>as + adv + as</td><td>We don't come here <b>as often as</b> you do.</td><td>often, well, fast, easily</td></tr>
            <tr><td><b>Nombres contables</b></td><td>as <b>many</b> + plural + as</td><td>You haven't been to <b>as many games as</b> I have.</td><td>games, songs, people, scenes</td></tr>
            <tr><td><b>Nombres incontables</b></td><td>as <b>much</b> + nombre + as</td><td>We'll have just <b>as much fun as</b> the people down there.</td><td>fun, action, money, time, music</td></tr>
            <tr><td><b>Negativa</b></td><td>not as … as</td><td>The upper levels are <b>not as cool as</b> the lower ones.</td><td>= son menos <i>cool</i></td></tr>
            <tr><td><b>Refuerzo</b></td><td>just as … as</td><td>We had <b>just as much</b> fun <b>as</b> they did.</td><td><i>just</i> = exactamente igual</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Tu error a vigilar:</b> <i>"Was there as ___ ___ as you wanted?"</i> con <i>action</i> → <b>as much action as</b>. <b>action</b> no se puede contar (no decimos <i>two actions</i> en este sentido), así que pide <b>much</b>, no <i>many</i>.<br><br>
          Truco rápido: ¿puedo poner un número delante? <i>three <b>songs</b></i> ✔ → <b>many</b>. <i>three <s>actions</s></i> ✘ → <b>much</b>.</div>` },
        { label: 'used to', type: 'mcq', eyebrow: 'Frases nuevas', title: 'Elige la forma correcta', pool: 7, items: [
          { blank: 1, q: 'When I was ten, I ___ watch cartoons every Saturday morning.', opts: ['used to', 'use to', 'am used to', 'was used'], a: 'used to', why: 'Afirmativa → <b>used to</b> con <i>-d</i>.' },
          { blank: 1, q: 'Did you ___ play an instrument at school?', opts: ['use to', 'used to', 'using to', 'uses to'], a: 'use to', why: 'Tras <b>did</b> el pasado ya está marcado → <b>use to</b>.' },
          { blank: 1, q: "I ___ like jazz, but now I listen to it every day.", opts: ["didn't use to", "didn't used to", "don't use to", "wasn't used to"], a: "didn't use to", why: 'Negativa → <b>didn\'t use to</b>, sin <i>-d</i>.' },
          { blank: 1, q: '___ you use to watch soap operas with your grandmother?', opts: ['Did', 'Do', 'Were', 'Have'], a: 'Did', why: 'La pregunta se forma con <b>did</b> + sujeto + <b>use to</b>.' },
          { blank: 1, q: '"Did you use to buy CDs?" — "Yes, I ___."', opts: ['did', 'used', 'was', 'do'], a: 'did', why: 'Respuesta corta con <b>did</b> / <b>didn\'t</b>, nunca <i>Yes, I used</i>.' },
          { blank: 1, q: 'My brother ___ love heavy metal, but now he only listens to classical music.', opts: ['used to', 'uses to', 'use to', 'is used to'], a: 'used to', why: 'Estado del pasado en afirmativa → <b>used to love</b>.' },
          { blank: 1, q: 'There ___ be a great music store on this corner. They closed it last year.', opts: ['used to', 'use to', 'uses to', 'is used to'], a: 'used to', why: '<b>There used to be</b> = antes había.' },
          { blank: 1, q: 'We ___ go to concerts a lot, but tickets are too expensive now.', opts: ['used to', 'use to', "didn't use to", 'are used to'], a: 'used to', why: 'Antes sí, ahora no → <b>used to</b>.' },
          { blank: 1, q: "She ___ watch reality shows, but now she can't stop.", opts: ["didn't use to", "didn't used to", "doesn't use to", 'used to not'], a: "didn't use to", why: 'Antes no, ahora sí → negativa <b>didn\'t use to</b>.' },
          { blank: 1, q: 'What ___ you use to do on Friday nights?', opts: ['did', 'do', 'were', 'have'], a: 'did', why: 'Pregunta con palabra interrogativa + <b>did</b> + sujeto + <b>use to</b>.' },
          { blank: 1, q: 'I ___ think documentaries were boring. Now I watch one a week.', opts: ['used to', 'use to', 'am used to', 'was using to'], a: 'used to', why: 'Opinión del pasado que ya no es verdad → <b>used to think</b>.' },
          { blank: 1, q: 'My parents ___ let me watch horror movies when I was a kid.', opts: ["didn't use to", "didn't used to", "don't use to", 'used not'], a: "didn't use to", why: 'Negativa en pasado → <b>didn\'t use to</b>.' },
        ] },
        { label: 'as … as', type: 'mcq', eyebrow: 'Comparaciones', title: 'Completa la comparación', pool: 7, items: [
          { blank: 1, q: 'This album is ___ the last one. I like both the same.', opts: ['as good as', 'as good than', 'so good as', 'as better as'], a: 'as good as', why: 'Dos cosas iguales → <b>as</b> + adjetivo + <b>as</b>. Nunca <i>than</i>.' },
          { blank: 1, q: "The sequel wasn't ___ the original.", opts: ['as exciting as', 'as exciting than', 'so exciting like', 'as much exciting as'], a: 'as exciting as', why: '<b>not as … as</b> = la segunda película era menos emocionante.' },
          { blank: 1, q: "I don't go to concerts ___ my sister does.", opts: ['as often as', 'as many as', 'as much as', 'as often than'], a: 'as often as', why: '<i>Often</i> es adverbio: <b>as often as</b>.' },
          { blank: 1, q: "There weren't as ___ people as we expected at the festival.", opts: ['many', 'much', 'more', 'lot of'], a: 'many', why: '<b>people</b> es contable → <b>as many … as</b>.' },
          { blank: 1, q: 'We had just as ___ fun as the people in the front row.', opts: ['much', 'many', 'more', 'lots'], a: 'much', why: '<b>fun</b> es incontable → <b>as much … as</b>.' },
          { blank: 1, q: 'Was there as ___ action as you wanted in the thriller?', opts: ['much', 'many', 'more', 'a lot'], a: 'much', why: '<b>Tu error real del curso:</b> <b>action</b> es incontable → <b>as much action as</b>.' },
          { blank: 1, q: "This documentary isn't as ___ as the book it's based on.", opts: ['interesting', 'more interesting', 'interestinger', 'so interesting'], a: 'interesting', why: 'Entre los dos <i>as</i> va el adjetivo en su forma base, sin comparativo.' },
          { blank: 1, q: "I haven't seen as ___ horror movies as you have.", opts: ['many', 'much', 'more', 'lot of'], a: 'many', why: '<b>movies</b> se pueden contar → <b>many</b>.' },
          { blank: 1, q: "Folk concerts don't cost as ___ money as pop concerts.", opts: ['much', 'many', 'more', 'lot'], a: 'much', why: '<b>money</b> es incontable → <b>much</b>.' },
          { blank: 1, q: 'She sings ___ her mother did at that age.', opts: ['as beautifully as', 'as beautiful as', 'so beautifully as', 'as beautifully than'], a: 'as beautifully as', why: 'Comparamos <i>cómo</i> canta → adverbio <b>beautifully</b>.' },
          { blank: 1, q: "My old TV wasn't ___ this one, but the picture was fine.", opts: ['as big as', 'as bigger as', 'so big than', 'as big than'], a: 'as big as', why: 'Negativa con adjetivo base: <b>not as big as</b>.' },
          { blank: 1, q: "There isn't as ___ information in the movie as in the documentary.", opts: ['much', 'many', 'more', 'lot of'], a: 'much', why: '<b>information</b> es incontable en inglés (nunca <i>informations</i>).' },
          { blank: 1, q: 'The new season has ___ episodes as the first one: ten each.', opts: ['as many', 'as much', 'so many', 'as more'], a: 'as many', why: '<b>episodes</b> contable → <b>as many episodes as</b>.' },
          { blank: 1, q: 'EDM festivals are ___ rock festivals in my city. Both sell out.', opts: ['as popular as', 'as popular than', 'so popular as', 'as more popular as'], a: 'as popular as', why: 'Igualdad con adjetivo → <b>as popular as</b>.' },
        ] },
        { label: 'Trampas', type: 'mcq', eyebrow: 'Errores típicos', title: 'Una está mal. ¿Cuál es la buena?', pool: 6, items: [
          { q: 'Hábito de <b>ahora</b>: escucho hip-hop casi todos los días.', opts: ['I usually listen to hip-hop.', 'I usually used to listen to hip-hop.', 'I used to usually listen to hip-hop.', 'I use to listen to hip-hop.'], a: 'I usually listen to hip-hop.', why: '<b>usually</b> y <b>used to</b> no van juntos. Hábito presente → present simple.' },
          { q: 'Hábito del <b>pasado</b> que ya no haces: escuchabas heavy metal.', opts: ['I used to listen to heavy metal.', 'I usually used to listen to heavy metal.', 'I use to listen to heavy metal.', 'I was used to listen heavy metal.'], a: 'I used to listen to heavy metal.', why: 'Afirmativa → <b>used to</b> + infinitivo.' },
          { q: '¿Tocabas la batería de pequeño?', opts: ['Did you use to play the drums?', 'Did you used to play the drums?', 'Used you to play the drums?', 'Do you use to play the drums?'], a: 'Did you use to play the drums?', why: 'Tras <b>did</b>, siempre <b>use to</b>.' },
          { q: 'La película no era tan larga como la serie.', opts: ["The movie wasn't as long as the series.", "The movie wasn't as long than the series.", "The movie wasn't so long as the series.", "The movie wasn't as longer as the series."], a: "The movie wasn't as long as the series.", why: 'Estructura fija: <b>as</b> + adjetivo base + <b>as</b>.' },
          { q: 'No había tanta acción como esperabas.', opts: ["There wasn't as much action as you expected.", "There wasn't as many action as you expected.", "There wasn't so much action than you expected.", "There wasn't as much action than you expected."], a: "There wasn't as much action as you expected.", why: '<b>action</b> incontable → <b>much</b>, y el segundo <b>as</b> no se cae.' },
          { q: 'No he visto tantos musicales como tú.', opts: ["I haven't seen as many musicals as you.", "I haven't seen as much musicals as you.", "I haven't seen so many musicals than you.", "I haven't seen as many musicals than you."], a: "I haven't seen as many musicals as you.", why: '<b>musicals</b> contable → <b>many</b> + segundo <b>as</b>.' },
          { q: 'Repaso: no tengo tiempo para ver la serie entera.', opts: ["I don't have time to watch the whole series.", "I haven't time to watch the whole series.", "I don't have times to watch the whole series.", "I am not have time to watch the whole series."], a: "I don't have time to watch the whole series.", why: 'Repaso: <b>have</b> como verbo principal se niega con <b>don\'t have</b>.' },
          { q: 'Repaso: la película me pareció aburrida.', opts: ['The movie was boring, so I was bored.', 'The movie was bored, so I was boring.', 'The movie was boring, so I was boring.', 'The movie was bored, so I was bored.'], a: 'The movie was boring, so I was bored.', why: 'Repaso de <i>-ed / -ing</i>: la cosa es <b>-ing</b>, la persona se siente <b>-ed</b>.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>didn\'t</i>, <i>I\'m</i>).',
          sentences: [
            'I used to love rock music when I was thirteen.',
            "I didn't use to like jazz, but now I listen to it every day.",
            'What did you use to do in the evenings after work?',
            'There used to be a great record store on this corner.',
            'This album is as good as the last one.',
            "The sequel wasn't as exciting as the original.",
            "There weren't as many people as we expected.",
            'Was there as much action as you wanted?',
            "I'd love to, but I can't make it on Friday.",
            "I'm sorry. Unfortunately, I'm going to be kind of busy all weekend.",
            'Let me know if you change your mind.',
            'That hotel is sort of expensive, but the concert is worth it.',
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for gist', title: 'Escucha el diálogo y responde', intro: 'Dos amigos hablan de cómo han cambiado sus gustos. Escúchalo entero antes de responder.',
          lines: [
            ['Nina', "So, what did you use to listen to when you were in high school?"],
            ['Marco', "Heavy metal, all day. My parents hated it. What about you?"],
            ['Nina', "I used to love pop. I still do, but I don't buy as many albums as I used to. I just stream everything."],
            ['Marco', "Same here. And honestly, metal isn't as exciting as it used to be for me. These days I listen to a lot of jazz."],
            ['Nina', "Jazz! Really? Hey, there's a live jazz show on Saturday. Would you like to come?"],
            ['Marco', "I'd love to, but I can't make it on Saturday. I'm going to my cousin's musical."],
            ['Nina', "Oh, that's too bad. Let me know if your plans change."],
          ],
          questions: [
            { q: 'What did Marco use to listen to in high school?', opts: ['heavy metal', 'jazz', 'pop', 'reggae'], a: 'heavy metal', why: '"Heavy metal, all day. My parents hated it."' },
            { q: 'What does Nina say about buying albums?', opts: ["She doesn't buy as many as she used to", 'She buys more than before', 'She never bought any', 'She only buys jazz albums'], a: "She doesn't buy as many as she used to", why: '"I don\'t buy as many albums as I used to. I just stream everything." <b>albums</b> es contable → <b>as many … as</b>.' },
            { q: 'Why does Marco refuse the invitation?', opts: ['He is going to a musical', 'He hates jazz', 'He is working on Saturday', 'He has no money'], a: 'He is going to a musical', why: '"I\'d love to, but I can\'t make it on Saturday. I\'m going to my cousin\'s musical."' },
            { q: 'How does Nina react to the refusal?', opts: ["Oh, that's too bad. Let me know if your plans change.", 'Maybe later.', 'But thanks for asking.', "I'd love to, but…"], a: "Oh, that's too bad. Let me know if your plans change.", why: 'Esas son las dos frases para <b>reaccionar a un rechazo</b>. Las otras las diría quien rechaza.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Lenguaje útil', type: 'notes', eyebrow: 'Useful language', title: 'Hablar del grupo: qué teníais en común', html: `
          <p style="margin:8px 0 12px">En la tarea <i>Musical changes</i> tienes que <b>informar a la clase</b> de lo que tu grupo tenía en común. Estas expresiones te ahorran la mitad del trabajo:</p>
          <div class="grid2" style="margin-top:12px">
            <div><h3>Todos o casi todos</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>All of us</b> used to listen to rock.</li><li><b>Most of us</b> still like pop music.</li><li><b>Both of them</b> used to play an instrument.</li></ul></div>
            <div><h3>Algunos o ninguno</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>Some of us</b> listen to classical music at work.</li><li><b>None of us</b> likes heavy metal now.</li><li><b>No one</b> in my group goes to festivals.</li><li><b>Nobody</b> used to like jazz as teenagers.</li></ul></div>
          </div>
          <div class="hint small" style="margin-top:12px"><b>Combínalo con la gramática de la unidad:</b> <i>All of us <b>used to</b> listen to rock, but now none of us buys <b>as many</b> albums <b>as</b> before.</i></div>` },
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Musical changes', task: 'Cuenta en 60 segundos cómo han cambiado tus gustos musicales: qué escuchabas a los 13 (used to), qué escuchas ahora y una comparación con as … as.', model: 'Modelo: "I used to love rock music. When I was thirteen, rock was all I listened to. Now I like hip-hop and jazz. Honestly, the new albums aren\'t as good as the old ones, but I don\'t buy as many albums as I used to anyway."', tags: ['used to', 'when i was', 'now', 'as good as', 'as many', 'favorite'] },
          { t: 'Report back to the class', task: 'Imagina que tu grupo ya ha hablado. Informa a la clase de lo que teníais en común usando All of us / Most of us / Some of us / None of us / Both of them.', model: 'Modelo: "All of us used to listen to rock as teenagers. Most of us still go to concerts, but none of us likes heavy metal now. Some of us listen to classical music while we work."', tags: ['all of us', 'most of us', 'some of us', 'none of us', 'nobody', 'used to'] },
          { t: 'The best entertainment', task: 'Compara dos series o películas que conozcas con (not) as … as: al menos un adjetivo, un adverbio y un nombre con much o many.', model: 'Modelo: "The second season isn\'t as good as the first. The story doesn\'t move as quickly, and there aren\'t as many characters. But there is just as much humor, so I still watch it."', tags: ['as good as', 'as quickly as', 'as many', 'as much', "isn't as", 'season'] },
          { t: 'Refusing an invitation', task: 'Un amigo te invita a un concierto de EDM el viernes. Recházalo con educación (dos frases distintas) y suaviza tu motivo con kind of / sort of.', model: 'Modelo: "I\'d love to, but I can\'t make it on Friday. I\'m sorry — unfortunately I\'m going to be kind of busy all weekend. Maybe later? But thanks for asking!"', tags: ["i'd love to", "can't make it", 'sorry', 'unfortunately', 'kind of', 'thanks for asking', 'maybe later'] },
          { t: 'Recommend a movie', task: 'Recomienda una película en 60 segundos: tipo de película, de qué va, una comparación con as … as y una crítica suavizada con sort of.', model: 'Modelo: "It\'s a science fiction thriller about a crew that gets lost near Jupiter. It\'s as exciting as the first movie, and the acting is great. The ending is sort of confusing, but I still recommend it."', tags: ['science fiction', 'thriller', 'about', 'as exciting as', 'sort of', 'recommend'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: "Saying /m/ in \"I'm\"", title: 'Cierra los labios en la /m/', intro: 'En <i>I\'m</i> la <b>/m/</b> se pronuncia cerrando los labios. Si no los cierras, suena <i>I</i> y se pierde el verbo. Escucha y repite.',
          pairs: [
            ["I'm sorry (cierra los labios: I-mm)", "I'm sorry, but I can't make it."],
            ["I'm going (no digas I going)", "I'm going to be kind of busy all weekend."],
            ["I'm watching", "I'm watching a great new reality show."],
            ["I'm not (la /m/ enlaza con not)", "I'm not as tired as I was yesterday."],
            ["I'm kind of tired", "I'm kind of tired right now."],
            ["I'm a big fan", "I'm a big fan of country music."],
            ["I'm afraid", "I'm afraid I already have other plans."],
            ["I'm sort of busy", "I'm sort of busy, but maybe later."],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for gist · supporting details', title: 'Cartoons grew up', intro: 'Lee una vez para la idea general (gist). Luego busca los detalles que apoyan cada idea. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            "When people hear the words <i>animated movie</i>, many still picture a room full of six-year-olds. Fifty years ago that picture was accurate. Cartoons used to be short, cheap and clearly <b>aimed at</b> children. They were shown on Saturday mornings, and most viewers stopped watching them before they finished school.",
            "That changed in the 1990s. Studios noticed that parents were sitting in the theater too, paying for two tickets instead of one. Writers began building jokes on two levels: obvious ones for the kids, and <b>subtle</b> ones that only the adults in the row behind would catch. Suddenly a movie could be as funny for a forty-year-old as it was for her son.",
            "Today some of the most serious stories on screen are animated. Japanese directors make animated dramas about war and memory. Studios in France and Chile make animated documentaries about real families. These films are not as loud as the old cartoons, and there isn't as much action, but there is far more emotion. Critics review them as seriously as any live-action drama, and they win the same prizes.",
            "So if you decided years ago that you had <b>outgrown</b> animation, it may be worth trying again. Start with something quiet rather than something colorful and fast. The <b>audience</b> for these movies is no longer just children — and, honestly, it never really was.",
          ],
          main: [
            { q: 'Animated movies now deal with serious subjects and win serious prizes.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: dramas sobre la guerra, documentales animados, críticas igual de serias.' },
            { q: 'In the past, cartoons were made only for young children.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1: <i>cartoons used to be short, cheap and clearly aimed at children</i>.' },
            { q: 'Writers started adding humor for the adults in the room.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: chistes en dos niveles porque los padres también pagaban entrada.' },
            { q: 'The writer advises adults to give animation another chance.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: <i>it may be worth trying again</i>.' },
            { q: 'Which detail supports the idea that studios changed for money reasons?', opts: ['Parents were paying for two tickets instead of one', 'Cartoons were shown on Saturday mornings', 'Japanese directors make dramas about war', 'Critics review animation seriously'], a: 'Parents were paying for two tickets instead of one', why: 'Es el detalle económico concreto del párrafo 2.' },
          ],
          infer: [
            { q: '<b>aimed at</b> (paragraph 1)', opts: ['made for a particular group of people', 'sold in a particular country', 'drawn by hand'], a: 'made for a particular group of people', why: '<i>Aimed at children</i> = pensadas para los niños.' },
            { q: '<b>subtle</b> (paragraph 2)', opts: ['not obvious; you have to notice it', 'very loud and clear', 'rude and offensive'], a: 'not obvious; you have to notice it', why: 'Se contrapone a <i>obvious ones for the kids</i>: solo los adultos las pillan.' },
            { q: '<b>outgrown</b> (paragraph 4)', opts: ['become too old to enjoy something', 'forgotten how to do something', 'grown to like something more'], a: 'become too old to enjoy something', why: '<i>Out-</i> + <i>grow</i>: has crecido y lo has dejado atrás, como la ropa pequeña.' },
            { q: '<b>audience</b> (paragraph 4)', opts: ['the people who watch or listen to something', 'the money a movie earns', 'the people who make a movie'], a: 'the people who watch or listen to something', why: 'El público. Aquí: ya no son solo niños.' },
          ],
          think: '¿Estás de acuerdo? Escribe dos frases usando la gramática de la unidad: <i>I used to think animated movies were…, but now…</i> y <i>For me, animation isn\'t as … as…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Cómo se organiza una reseña', type: 'notes', eyebrow: 'Writing skill · organizing ideas', title: 'Una reseña de película en cuatro bloques', html: `
          <div class="scroll-x"><table class="table"><thead><tr><th>Bloque</th><th>Qué va aquí</th><th>Frases útiles</th></tr></thead><tbody>
            <tr><td><b>1. Qué es</b></td><td>título, tipo de película, quién sale</td><td><i>It's a science fiction thriller about… / It stars…</i></td></tr>
            <tr><td><b>2. De qué va</b></td><td>la trama en 1-2 frases, <b>sin spoilers</b>, en present simple</td><td><i>The story takes place in… / A detective has four days to…</i></td></tr>
            <tr><td><b>3. Qué te pareció</b></td><td>lo bueno y lo malo, con comparaciones</td><td><i>It's as exciting as… / There isn't as much action as…</i></td></tr>
            <tr><td><b>4. Recomendación</b></td><td>a quién se la recomiendas</td><td><i>I'd recommend it if you like… / It's worth watching.</i></td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Suavizar la crítica:</b> una reseña demasiado directa suena agresiva. Usa <b>kind of</b> / <b>sort of</b> antes del adjetivo: <i>The ending is <b>sort of</b> confusing</i>, <i>The first half is <b>kind of</b> slow</i>. En pasado también sirve: <i>I was <b>kind of</b> disappointed</i>.</div>
          <div class="hint small" style="margin-top:10px">Ojo con los tiempos: la <b>trama</b> se cuenta en <b>present simple</b> (<i>a detective finds…</i>), pero <b>tu experiencia</b> va en pasado (<i>I watched it last night and I loved it</i>).</div>` },
        { label: 'Corrige la reseña', type: 'fix', eyebrow: 'Error correction', title: 'Reescribe la frase corrigiendo el error', intro: 'Errores típicos de esta unidad, incluido el que cometiste en el curso. Cada frase tiene uno o dos fallos.', items: [
          { bad: 'Was there as many action as you wanted?', good: 'Was there as much action as you wanted?', why: '<b>Tu error del curso.</b> <i>Action</i> es incontable (no decimos <i>two actions</i>), así que pide <b>much</b>, no <i>many</i>.' },
          { bad: "The thriller wasn't as exciting than the first one.", good: "The thriller wasn't as exciting as the first one.", why: 'La estructura es <b>as … as</b>. Con <i>than</i> se usa el comparativo (<i>more exciting than</i>), pero entonces desaparece el <i>as</i>.' },
          { bad: 'This movie doesn\'t have as much scenes as the book.', good: "This movie doesn't have as many scenes as the book.", why: '<b>scenes</b> se puede contar → <b>as many … as</b>.' },
          { bad: 'I usually used to watch cartoons on Saturday mornings.', good: 'I used to watch cartoons on Saturday mornings.', why: '<b>usually</b> y <b>used to</b> no van en la misma frase. O hábito presente con <i>usually</i>, o hábito pasado con <i>used to</i>.' },
          { bad: 'Did you used to like horror movies when you were a kid?', good: 'Did you use to like horror movies when you were a kid?', why: 'Tras <b>did</b> el pasado ya está marcado → <b>use to</b>, sin <i>-d</i>.' },
          { bad: "I didn't liked the ending. It was a little bit confused.", good: "I didn't like the ending. It was kind of confusing.", why: 'Tras <i>didn\'t</i>, infinitivo. Y el final <b>confuses</b> → adjetivo en <b>-ing</b>; <b>kind of</b> suaviza la crítica.' },
          { bad: "The story take place in 2380 and a crew get lost near Jupiter.", good: 'The story takes place in 2380 and a crew gets lost near Jupiter.', why: 'La trama se cuenta en <b>present simple</b> y en tercera persona lleva <b>-s</b>.' },
          { bad: "I'd love to but I haven't time on Friday. Thanks to ask.", good: "I'd love to, but I don't have time on Friday. But thanks for asking.", why: 'Repaso: <b>don\'t have time</b>. Y la frase fija es <b>thanks for asking</b> (<i>for</i> + <i>-ing</i>).' },
        ] },
        { label: 'Suaviza la crítica', type: 'soft', eyebrow: 'Real-world strategy · softening comments', title: 'Haz el comentario menos duro', explain: 'Una crítica directa suena brusca. Añade <b>kind of</b> o <b>sort of</b> delante del adjetivo (o del verbo de opinión) y la misma idea suena razonable.', pattern: /\b(kind of|sort of)\b/, missing: 'Falta <b>kind of</b> o <b>sort of</b> delante del adjetivo', items: [
          { h: '"The ending is confusing."', a: 'The ending is sort of confusing.' },
          { h: '"That hotel is expensive."', a: 'That hotel is kind of expensive.' },
          { h: '"I\'m tired right now."', a: "I'm kind of tired right now." },
          { h: '"The first half is slow."', a: 'The first half is sort of slow.' },
          { h: '"I was disappointed with the sequel."', a: 'I was kind of disappointed with the sequel.' },
          { h: '"This reality show is silly."', a: 'This reality show is sort of silly.' },
        ] },
        { label: 'Escribe tu reseña', type: 'comment', eyebrow: 'Writing task', title: 'Escribe una reseña de película o serie', intro: 'Escribe 70-120 palabras siguiendo los cuatro bloques. La checklist se marca sola al analizar el texto.', placeholder: "It's a science fiction thriller about…", min: 70, max: 120, need: 4, checks: [
          { label: 'Digo <b>qué tipo</b> de película o programa es (<i>thriller, documentary, romantic comedy…</i>)', words: ['thriller', 'documentary', 'comedy', 'drama', 'musical', 'soap opera', 'talk show', 'game show', 'reality show', 'science fiction', 'horror', 'animated'] },
          { label: 'Cuento la <b>trama</b> sin destriparla (<i>The story is about… / It takes place in…</i>)', re: /\b(it's about|is about|the story|it takes place|it follows|a (man|woman|detective|group|family|crew))\b/ },
          { label: 'Uso una comparación con <b>(not) as … as</b>', re: /\bas [a-z]+ as\b|\bas (much|many) [a-z]+ as\b/ },
          { label: 'Suavizo una crítica con <b>kind of</b> / <b>sort of</b>', re: /\b(kind of|sort of)\b/ },
          { label: 'Comparo con el pasado usando <b>used to</b>', re: /\bused to\b|\bdidn't use to\b/ },
          { label: 'Termino con una <b>recomendación</b> (<i>I\'d recommend it if… / It\'s worth watching</i>)', re: /\b(recommend|worth watching|you should watch|don't miss|give it a)\b/ },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Decir que no sin quedar mal', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Refusing an invitation</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I'd love to, but…</li><li>I'm sorry.</li><li>Unfortunately,…</li><li>Maybe later.</li><li>Maybe after that.</li><li>But thanks for asking.</li></ul></div>
          <div><h3>Reacting to a refusal</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Oh, that's too bad.</li><li>I understand.</li><li>Let me know if your plans change.</li><li>Let me know if you change your mind.</li></ul></div>
          <div><h3>Softening your comments</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I'm <b>kind of</b> tired right now.</li><li>That hotel is <b>sort of</b> expensive.</li><li>I'm <b>kind of</b> busy this weekend.</li></ul></div>
          <div class="hint small"><b>La receta completa:</b> agradecer + rechazar + motivo suavizado + puerta abierta.<br><i>"I'd <b>love to</b>, but I can't make it on Friday. <b>Unfortunately</b>, I'm going to be <b>kind of</b> busy all weekend. <b>Maybe later</b>? But <b>thanks for asking</b>."</i><br><br>Quien rechaza dice <i>I'd love to, but…</i>; quien invita responde <i>Oh, that's too bad.</i> No los mezcles.</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ["Cody: So, I was wondering, would you like to hear us play? We're having our first concert on Friday night.", "Mari: Um, I'd love to, but I can't make it on Friday. I have other plans.", 'Mari: But thanks for asking.', "Cody: Oh, that's too bad. Are you free on Saturday?", "Mari: I'm sorry. Unfortunately, I'm going to be kind of busy all weekend.", 'Cody: I understand. Well, let me know if your plans change.'],
          ['Nina: There is a live jazz show downtown on Saturday. Do you want to come?', "Marco: I'd love to, but I'm going to my cousin's musical.", 'Nina: Oh, that\'s too bad. It\'s going to be a great show.', 'Marco: Maybe after that? I should be free by ten.', "Nina: Perfect. Let me know if you change your mind about the first part."],
          ['Ana: Do you want to watch this documentary later?', "Luis: I'm sorry, but I'm sort of tired tonight.", 'Ana: I understand. It is kind of long anyway.', 'Luis: Maybe later this week?', 'Ana: Sure. Let me know when you are free.'],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', pool: 6, items: [
          { q: '"Would you like to come to our concert on Friday?" — No puedes, pero quieres ser amable.', opts: ["I'd love to, but I can't make it on Friday.", "Oh, that's too bad.", 'Let me know if you change your mind.', 'I understand.'], a: "I'd love to, but I can't make it on Friday.", why: '<b>I\'d love to, but…</b> es la fórmula para rechazar sin ofender. Las otras tres son del que invita.' },
          { q: 'Tu amigo acaba de decirte que no puede ir al cine contigo. ¿Qué respondes?', opts: ["Oh, that's too bad. Let me know if your plans change.", "I'd love to, but I'm busy.", 'Unfortunately, I have other plans.', 'But thanks for asking.'], a: "Oh, that's too bad. Let me know if your plans change.", why: 'Es una <b>reacción a un rechazo</b>: lamento + puerta abierta.' },
          { q: 'Quieres decir que estás cansado, pero sin sonar cortante.', opts: ["I'm kind of tired right now.", "I'm tired. No.", 'I am very tired, sorry for you.', 'Tired I am.'], a: "I'm kind of tired right now.", why: '<b>kind of</b> suaviza el comentario.' },
          { q: 'Rechazas el viernes pero te apuntas al sábado.', opts: ["I can't on Friday, but maybe after that?", "Oh, that's too bad.", 'I understand, thanks.', 'Let me know if you change your mind.'], a: "I can't on Friday, but maybe after that?", why: '<b>Maybe after that / maybe later</b> deja la puerta abierta.' },
          { q: 'Quieres añadir una disculpa formal antes de dar tu motivo.', opts: ["Unfortunately, I'm going to be busy all weekend.", 'Happily, I am busy all weekend.', "That's too bad for me.", 'I understand you.'], a: "Unfortunately, I'm going to be busy all weekend.", why: '<b>Unfortunately</b> introduce la mala noticia con educación.' },
          { q: 'Te acaban de invitar y quieres agradecerlo aunque digas que no.', opts: ['But thanks for asking.', 'But thanks to ask.', 'But thanks for ask.', 'But thank for asking.'], a: 'But thanks for asking.', why: 'Frase fija: <b>thanks for</b> + verbo en <b>-ing</b>.' },
          { q: 'Tu amiga dice que quizá cambie de opinión. ¿Cómo lo dejas abierto?', opts: ['Let me know if you change your mind.', 'Let me know if you change your mine.', 'Tell me when you changed your mind.', 'Let me know when your mind changes it.'], a: 'Let me know if you change your mind.', why: 'Frase fija: <b>change your mind</b> = cambiar de opinión.' },
          { q: 'Alguien rechaza tu plan con un buen motivo y quieres mostrar comprensión en dos palabras.', opts: ['I understand.', "I'd love to.", 'Unfortunately.', 'Maybe later.'], a: 'I understand.', why: 'Respuesta corta y empática del que invitaba.' },
        ] },
      ] },
    ],
  };
})();
