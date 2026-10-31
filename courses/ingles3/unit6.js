/* ===========================================================
   ingles3/unit6.js — Inglés 3 · Unit 6: Impact (problemas urbanos)
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Lesson 1 · Urban problems ---------- */
  const URBAN = [
    ['air', 'el aire, la mezcla de gases que respiramos', 'It feels good to be outside and breathe the fresh air.', '¿Dónde respiras el aire más limpio de tu ciudad?'],
    ['concrete', 'el concreto, el hormigón (el material gris de los edificios)', 'Melinda noticed all the big concrete buildings downtown.', '¿Hay demasiado concreto y poco verde en tu barrio?'],
    ['graffiti', 'grafitis, pintadas en paredes y lugares públicos', "There's a lot of graffiti on the buildings downtown. Some people don't like it, but others do.", '¿Para ti el grafiti es arte o es un problema?'],
    ['land', 'terreno, un área de suelo', 'A: What are they going to build on this land? B: I think some new apartment buildings.', '¿Qué construirías en un terreno vacío cerca de tu casa?'],
    ['noise', 'ruido, un sonido normalmente alto y molesto', "I work in construction. There's always a lot of noise, but today it was really bad.", '¿Qué ruido te molesta más donde vives?'],
    ['pollution', 'contaminación, el daño al agua o al aire por sustancias dañinas', 'Cars and factories cause air pollution, which is bad for our health.', '¿La contaminación es un problema serio en tu ciudad?'],
    ['smoke', 'humo, el gas gris o negro que sale cuando algo se quema', 'Factories that make plastic produce a lot of smoke, which causes pollution.', '¿Has visto humo de fábricas cerca de donde vives?'],
    ['space', 'espacio, un área libre que la gente puede usar', "We don't have a lot of space in our apartment, so we try not to have a lot of things.", '¿Tienes suficiente espacio en tu casa?'],
    ['traffic', 'el tráfico, los coches y camiones que circulan por una vía', 'I work downtown. I have to drive through a lot of traffic to get to work.', '¿Cuánto tardas en llegar al trabajo con tráfico?'],
    ['traffic jam', 'un atasco, una fila de coches que avanza muy lento o no avanza', 'There was a really bad traffic jam on the highway today. It took me almost two hours to get home!', '¿Cuál fue el peor atasco en el que has estado?'],
    ['trash', 'basura, cosas que tiras porque no las quieres', "There's too much trash in this city. It looks terrible. We need to clean up the streets.", '¿Se recoge bien la basura en tu barrio?'],
  ];

  /* ---------- Lesson 2 · Adverbs of manner ---------- */
  const ADV = [
    ['angrily', 'angry', 'de forma enfadada, con enojo', 'My clients complained angrily about the price.', '¿Cuándo fue la última vez que alguien te habló angrily?'],
    ['beautifully', 'beautiful', 'de forma bonita, preciosa', 'My cousin is a great artist. She paints beautifully.', '¿Quién que conoces canta o pinta beautifully?'],
    ['calmly', 'calm', 'de forma tranquila y relajada', "He was reading it through very calmly. He doesn't seem worried at all.", '¿Reaccionas calmly cuando hay una emergencia?'],
    ['clearly', 'clear', 'de forma clara, fácil de entender, ver u oír', 'Our manager is excellent. She explains everything so clearly that everyone understands.', '¿Quién te explica las cosas más clearly?'],
    ['completely', 'complete', 'completamente, del todo', "The street festival was completely full of people. We couldn't walk around easily.", '¿Qué lugar de tu ciudad está completely lleno los fines de semana?'],
    ['correctly', 'correct', 'correctamente, sin errores', 'I got a perfect score on the test! I answered everything correctly.', '¿Sueles contestar todo correctly en los exámenes?'],
    ['dangerously', 'dangerous', 'de forma peligrosa, insegura', "I don't want to ride with Jen. She drives too dangerously. She's always on her phone.", '¿Conoces a alguien que conduzca dangerously?'],
    ['loudly', 'loud', 'de forma ruidosa, en voz alta', "My little sister plays her trumpet so loudly! I can't think.", '¿Tus vecinos ponen música loudly?'],
    ['politely', 'polite', 'de forma educada, sin ser grosero', "Even though the guest was being rude, the receptionist politely explained the hotel's policies.", '¿Puedes quejarte politely de un ruido?'],
    ['quietly', 'quiet', 'en voz baja, haciendo poco o ningún ruido', 'She asked me quietly if she could see my notes.', '¿Dónde tienes que hablar quietly?'],
    ['safely', 'safe', 'de forma segura, sin peligro', 'She always rides her bike safely. She wears a helmet and stays on the bike path.', '¿Qué haces para llegar safely a casa de noche?'],
  ];

  /* ---------- Lesson 4 · Palabras del vídeo ---------- */
  const VIDEO = [
    ['escape', 'escapar, huir de un sitio', 'On weekends we escape the city and go to the mountains.', '¿A dónde escapas cuando la ciudad te cansa?'],
    ['fresh air', 'aire fresco, aire limpio', 'I opened the window to get some fresh air.', '¿Dónde encuentras fresh air cerca de ti?'],
    ['lungs', 'los pulmones', 'Air pollution is very bad for your lungs.', '¿Sabías que a los parques les llaman "the lungs of the city"?'],
    ['shade', 'la sombra (de un árbol o un edificio)', 'We sat in the shade under a big tree because it was so hot.', '¿Hay árboles que den shade en tu calle?'],
    ['stressful', 'estresante', 'Driving in the city during rush hour is really stressful.', '¿Qué parte de tu día es más stressful?'],
    ['urban planner', 'urbanista, quien diseña cómo crece una ciudad', 'An urban planner decided to build a park instead of a parking lot.', '¿Qué le pedirías a un urban planner de tu ciudad?'],
  ];

  const URBAN_W = URBAN.map(u => u[0]);
  const ADV_W = ADV.map(a => a[0]);

  /* ---------- Situación → palabra ---------- */
  const SIT = [
    ['You can hear the neighbors’ party through the wall and you can’t sleep.', 'noise'],
    ['Nothing is moving on the highway. You have been in the same place for 20 minutes.', 'traffic jam'],
    ['Somebody painted their name in big colored letters on the wall of the school.', 'graffiti'],
    ['There are plastic bottles and old bags all over the sidewalk.', 'trash'],
    ['A gray cloud is coming out of the factory chimney.', 'smoke'],
    ['The sky over the city is brown and it is hard to breathe.', 'pollution'],
    ['There is an empty piece of ground next to the school. Nothing is built on it.', 'land'],
    ['Your apartment is so small that there is nowhere to put a second table.', 'space'],
    ['Thousands of cars are using the road to get downtown this morning.', 'traffic'],
    ['You go to the mountains at the weekend just to breathe something clean.', 'air'],
    ['The new building is gray and gets very hot in summer because of the material.', 'concrete'],
  ];

  const ADV_SIT = [
    ['She shouted at the waiter and threw the menu on the table.', 'angrily'],
    ['Nobody was hurt. Everybody got out of the building with no problem.', 'safely'],
    ['He drives 120 km/h and looks at his phone at the same time.', 'dangerously'],
    ['Please, we are in a library. Other people are studying.', 'quietly'],
    ['The teacher explained it three times and now everyone understands.', 'clearly'],
    ['He always says "please", "thank you" and "excuse me".', 'politely'],
    ['She got 20 out of 20 on the test. No mistakes at all.', 'correctly'],
    ['The concert hall was full. There was not one empty seat.', 'completely'],
    ['There was a fire, but the doctor did not panic. She kept her voice low and normal.', 'calmly'],
    ['My neighbor plays the drums at midnight and the whole building can hear it.', 'loudly'],
    ['Her paintings are in a museum. Everyone stops to look at them.', 'beautifully'],
  ];

  const COUNT_ONLY = ['so many', 'so few', 'several', 'a few', 'very few'];
  const NONCOUNT_ONLY = ['so much', 'so little', 'a little', 'very little'];
  const BOTH = ['almost all of', 'almost none', 'almost no', 'a lot of'];
  const CATS = ['solo con count nouns', 'solo con non-count nouns', 'con los dos'];

  window.UNIT_DATA['ingles3/unit6'] = {
    source: 'WeTalk · Level 3 · Unit 6 · Impact (problemas urbanos y soluciones)',
    description: 'Problemas de la ciudad y adverbios de modo, cuantificadores con nombres contables e incontables, condicionales reales de presente y futuro, y cómo expresar preocupación y alivio.',
    map: [
      ['Vocabulary', 'Urban problems (<i>traffic jam, pollution, trash, graffiti…</i>) y adverbs of manner (<i>calmly, loudly, safely…</i>)', 'Flashcards con audio, emparejar adjetivo↔adverbio, elegir la palabra por la situación'],
      ['Grammar', 'Quantifiers con count / non-count nouns; present and future real conditionals', 'Tabla de cuantificadores, clasificar, elegir la forma, condicionales nuevos'],
      ['Listening', 'Listening for gist and specific information; weak words', 'Dictado con voz sintética y diálogo con preguntas'],
      ['Speaking', 'Hablar de problemas urbanos y proponer soluciones', 'Retos con cronómetro y micrófono; vocales débiles al final de palabra'],
      ['Reading', 'Vídeo sobre soluciones a los problemas de la ciudad (<i>urban planner, lungs, shade…</i>)', 'Texto nuevo sobre el mismo tema + inferir significado'],
      ['Writing', 'Escribir un comentario sobre un pódcast usando preguntas para argumentar', 'Corrige tus propios errores y checklist de comentario'],
      ['Social English', '<i>Are you all right? / What a relief!</i> y <i>though</i> para contrastar', 'Ordenar diálogos, reescribir con <i>though</i>, respuesta rápida'],
    ],
    cando: [
      "Describir los problemas de mi ciudad: <i>traffic jam, pollution, noise, trash, graffiti, concrete</i>",
      "Decir cómo hace alguien algo con adverbios de modo: <i>calmly, safely, politely, loudly, dangerously</i>",
      "Elegir el cuantificador según el nombre: <i>so much traffic</i>, <i>very few parks</i>, <i>almost no space</i> (nunca <i>several traffic</i>)",
      "Hablar de hechos y hábitos con el present real conditional (<i>When it rains here, the traffic gets terrible</i>)",
      "Proponer una solución y su resultado con el future real conditional (<i>If the city builds more bike lanes, there will be less pollution</i>) sin poner <i>will</i> después de <i>if</i>",
      "Expresar preocupación y alivio (<i>Are you all right? Is everyone OK? What a relief! I'm glad to hear that</i>) y añadir un contraste con <i>, though</i> al final",
    ],
    weak: [
      '<b>Cuantificadores</b>: marcaste <i>several</i> como válido con <b>non-count nouns</b>. <i>A few, several</i> y <i>so many</i> solo van con <b>count nouns</b> (<i>several cars</i>, pero <i>so much traffic</i>).',
      '<b>Adverbio equivocado</b>: escribiste <i>"The firefighters helped the family get out of the house <s>quitly</s>"</i>. Si <i>nobody was hurt</i>, el adverbio es <b>safely</b>, no <i>quietly</i>.',
      '<b>Ortografía</b>: <i>quitly</i> no existe → <b>quietly</b> (de <i>quiet</i> + <i>-ly</i>, la <b>e</b> se queda).',
      '<b>though</b>: respondiste <i>"I was OK."</i> cuando hacía falta el contraste → <i>"I was OK<b>, though</b>."</i> Va al final de la frase, después de coma.',
    ],
    weakLink: 'Trabájalos en <b>Grammar › Count o non-count</b>, <b>Writing › Corrige tus frases</b> y <b>Social English › Añade "though"</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...URBAN.map(u => ({ cat: 'Urban problems', w: u[0], def: u[1], ex: u[2], ask: u[3] })),
            ...ADV.map(a => ({ cat: 'Adverbs of manner', w: a[0], say: a[1] + ', ' + a[0], def: a[2] + ' (de <i>' + a[1] + '</i>)', ex: a[3], ask: a[4] })),
            ...VIDEO.map(v => ({ cat: 'Talking about solutions', w: v[0], def: v[1], ex: v[2], ask: v[3] })),
          ] },
        { label: 'Problema ↔ significado', type: 'match', eyebrow: 'Urban problems', title: 'Empareja la palabra con su significado', intro: 'Toca una palabra de la izquierda y luego su significado de la derecha.',
          pairs: URBAN.map(u => [u[0], u[1]]), round: 6 },
        { label: 'Adjetivo ↔ Adverbio', type: 'match', eyebrow: 'Adverbs of manner', title: 'Del adjetivo al adverbio', intro: 'Casi todos añaden <b>-ly</b>. Ojo: <i>quiet → quietly</i> (la <b>e</b> no se cae) y <i>angry → angrily</i> (la <b>y</b> pasa a <b>i</b>).',
          pairs: ADV.map(a => [a[1], a[0]]), round: 6 },
        { label: '¿Qué problema es?', type: 'mcq', eyebrow: 'Situación → palabra', title: 'Lee la situación y elige la palabra', pool: 7,
          build: ({ pick, esc }) => pick(SIT, 7).map(s => { const u = URBAN.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(URBAN_W.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + u[0] + '</b> — ' + u[1] + '. “' + u[2] + '”' }; }) },
        { label: '¿Cómo lo hace?', type: 'mcq', eyebrow: 'Situación → adverbio', title: 'Elige el adverbio de modo', pool: 7,
          build: ({ pick, esc }) => pick(ADV_SIT, 7).map(s => { const a = ADV.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(ADV_W.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + a[0] + '</b> — ' + a[2] + '. “' + a[3] + '”' }; }) },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Cuantificadores', type: 'notes', eyebrow: 'Quantifiers', title: 'Count o non-count: esa es la pregunta', html: `
          <p style="margin:8px 0 14px">Los <b>count nouns</b> se pueden contar: <i>a car / three cars</i>, <i>a person / some people</i>. Los <b>non-count nouns</b> no: <i>air, information, music, traffic, pollution, noise, trash, space</i>. No existe <i>two informations</i> ni <i>three traffics</i>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Grupo</th><th>Cuantificadores</th><th>Ejemplo</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>Solo count</b></td><td>so many · so few · several · a few · very few</td><td>There were <b>very few</b> tickets left.</td><td>detrás va un <b>plural</b>: cars, people, flights</td></tr>
            <tr><td><b>Solo non-count</b></td><td>so much · so little · a little · very little</td><td>I have <b>very little</b> free time.</td><td>detrás va un <b>singular incontable</b>: time, traffic, noise</td></tr>
            <tr><td><b>Los dos</b></td><td>almost all of · almost none · almost no · a lot of</td><td>There is <b>almost no</b> noise. / There are <b>almost no</b> people.</td><td>valen siempre: si dudas, usa estos</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Tu error a vigilar:</b> marcaste <i>several</i> como válido con non-count. <b>Several</b> solo cuenta cosas: <i>several cars</i> ✔, <i>several traffic</i> ✘ → <b>so much traffic</b>.</div>
          <div class="hint" style="margin-top:10px"><b>La pareja fácil:</b> <i>few</i> ↔ <i>little</i>. <b>Few</b> es para lo que se cuenta (<i>a few people</i>) y <b>little</b> para lo que no (<i>a little money</i>). Y <b>almost none</b> va solo, sin nombre detrás: <i>There was a lot of space, but now there's almost none.</i></div>` },
        { label: 'Count o non-count', type: 'mcq', eyebrow: 'Clasifica', title: '¿Con qué nombres se usa?', pool: 7,
          build: ({ pick }) => pick([
            ...COUNT_ONLY.map(q => [q, CATS[0]]),
            ...NONCOUNT_ONLY.map(q => [q, CATS[1]]),
            ...BOTH.map(q => [q, CATS[2]]),
          ], 7).map(d => ({ q: '<b>' + d[0] + '</b>', opts: [d[1], ...CATS.filter(c => c !== d[1])], a: d[1],
            why: d[1] === CATS[0] ? 'Cuenta unidades: <i>' + d[0] + ' cars / people / flights</i>. Nunca con <i>traffic, noise, air</i>.'
               : d[1] === CATS[1] ? 'Va con lo que no se cuenta: <i>' + d[0] + ' traffic / noise / time / money</i>.'
               : 'Este vale para los dos: <i>' + d[0] + ' the cars</i> y <i>' + d[0] + ' the pollution</i>.' })) },
        { label: 'Elige el cuantificador', type: 'mcq', eyebrow: 'Con frases nuevas', title: 'Completa con el cuantificador correcto', pool: 8, items: [
          { blank: 1, q: 'There is ___ traffic on this road in the morning. It takes me an hour to go two kilometers.', opts: ['so much', 'so many', 'several', 'a few'], a: 'so much', why: '<b>traffic</b> es non-count → <i>so much</i>. <i>So many</i> y <i>several</i> solo con plurales.' },
          { blank: 1, q: 'There were ___ people at the meeting, maybe four or five.', opts: ['several', 'so much', 'a little', 'very little'], a: 'several', why: '<b>people</b> es count → <i>several</i>. <b>Tu error del curso:</b> <i>several</i> nunca va con non-count.' },
          { blank: 1, q: 'We have ___ space in this apartment, so we cannot buy a big sofa.', opts: ['very little', 'very few', 'several', 'so many'], a: 'very little', why: '<b>space</b> es non-count → <i>very little</i>. Con plurales sería <i>very few</i>.' },
          { blank: 1, q: 'There is ___ trash in the park after the festival. The city will need two days to clean it.', opts: ['a lot of', 'so many', 'a few', 'very few'], a: 'a lot of', why: '<b>a lot of</b> vale para los dos, y <b>trash</b> es non-count.' },
          { blank: 1, q: 'Almost ___ people take the bus here because there are only two a day.', opts: ['no', 'none', 'little', 'few'], a: 'no', why: '<b>almost no</b> va <b>delante de un nombre</b>; <i>almost none</i> va solo, sin nombre.' },
          { blank: 1, q: 'There used to be a lot of green space downtown, but now there is almost ___.', opts: ['none', 'no', 'few', 'little'], a: 'none', why: 'Aquí no hay nombre detrás → <b>almost none</b>.' },
          { blank: 1, q: 'I have ___ money left this month, but enough for a coffee.', opts: ['a little', 'a few', 'several', 'so many'], a: 'a little', why: '<b>money</b> es non-count → <i>a little</i> (un poco, pero algo hay).' },
          { blank: 1, q: 'Only ___ buildings in this street have gardens.', opts: ['a few', 'a little', 'so much', 'very little'], a: 'a few', why: '<b>buildings</b> es plural contable → <i>a few</i>.' },
          { blank: 1, q: '___ the city is covered in concrete. There is almost nothing green.', opts: ['Almost all of', 'Several', 'A few', 'So many'], a: 'Almost all of', why: '<b>almost all of</b> vale con count y non-count; aquí <i>the city</i> es singular.' },
          { blank: 1, q: 'There was ___ noise from the audience during the movie.', opts: ['almost no', 'almost none', 'very few', 'several'], a: 'almost no', why: '<b>noise</b> es non-count y lleva nombre detrás → <i>almost no noise</i>.' },
          { blank: 1, q: 'There are ___ flights under $700, so the trip will be expensive.', opts: ['very few', 'very little', 'so much', 'a little'], a: 'very few', why: '<b>flights</b> es plural contable → <i>very few</i>.' },
          { blank: 1, q: 'I had ___ fun at your party! Thanks for inviting me.', opts: ['so much', 'so many', 'several', 'very few'], a: 'so much', why: '<b>fun</b> es non-count → <i>so much fun</i>.' },
          { blank: 1, q: 'She has ___ time off work this year, so she cannot travel far.', opts: ['so little', 'so few', 'a few', 'several'], a: 'so little', why: '<b>time</b> es non-count → <i>so little time</i>.' },
          { blank: 1, q: 'I met ___ people at the party who want to study in Boston, just like me!', opts: ['a few', 'a little', 'so much', 'very little'], a: 'a few', why: '<b>people</b> es contable → <i>a few people</i>.' },
        ] },
        { label: 'Condicionales', type: 'notes', eyebrow: 'Present and future real conditionals', title: 'Si pasa esto, pasa aquello', html: `
          <p style="margin:8px 0 14px">Un <b>real conditional</b> habla de cosas que de verdad pueden pasar. El truco está en que la parte del <b>if nunca lleva <i>will</i></b>.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Tipo</th><th>Forma</th><th>Uso</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>Present real</b></td><td><i>If</i> + simple present, simple present</td><td>hechos, verdades generales, hábitos</td><td>If there<b>'s</b> a storm, flights <b>don't take</b> off.</td></tr>
            <tr><td><b>Present real (= when)</b></td><td><i>When</i> + simple present, simple present</td><td>igual que arriba: con hechos, <i>if</i> = <i>when</i></td><td>Plants <b>die when</b> they <b>don't have</b> water.</td></tr>
            <tr><td><b>Future real</b></td><td><i>If</i> + simple present, <b>will / won't</b> + verbo</td><td>resultado de una posibilidad real en el futuro</td><td>If your bags <b>are</b> too heavy, you<b>'ll have</b> to pay more.</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Las dos reglas de oro:</b><br>1. En la cláusula con <i>if</i> va <b>simple present</b>, aunque hables del futuro: <i>If it <s>will rain</s> rains tomorrow…</i><br>2. La cláusula <i>if</i> puede ir delante o detrás y el significado no cambia. Si va <b>delante</b>, lleva <b>coma</b>:<br><i>We'll get stuck in traffic <b>if we don't leave soon</b>.</i> = <i><b>If we don't leave soon,</b> we'll get stuck in traffic.</i></div>` },
        { label: 'Forma condicional', type: 'mcq', eyebrow: 'Con frases nuevas', title: 'Completa el condicional', pool: 8, items: [
          { blank: 1, q: 'If the city ___ more bike lanes, there will be less pollution.', opts: ['builds', 'will build', 'built', 'is building'], a: 'builds', why: 'Después de <b>if</b> va <b>simple present</b>, nunca <i>will</i>.' },
          { blank: 1, q: 'If we plant more trees, the streets ___ cooler in summer.', opts: ['will be', 'are being', 'were', 'would been'], a: 'will be', why: 'Resultado futuro real → <b>will</b> + verbo base.' },
          { blank: 1, q: 'If there ___ a storm, flights don’t take off.', opts: ['is', 'will be', 'was', 'would be'], a: 'is', why: 'Hecho general → <b>present real conditional</b>: simple present en las dos partes.' },
          { blank: 1, q: 'We ___ stuck in traffic if we don’t leave soon.', opts: ["'ll get", 'get', 'got', 'are getting'], a: "'ll get", why: 'Posibilidad futura concreta → <b>will</b> en la cláusula principal.' },
          { blank: 1, q: 'If I take out some clothes, my bag ___ lighter.', opts: ['will be', 'is being', 'was', 'would be'], a: 'will be', why: 'Condición futura real → <i>will be</i>.' },
          { blank: 1, q: 'Plants die ___ they don’t have water.', opts: ['when', 'will', 'so', 'because of'], a: 'when', why: 'Con hechos generales, <b>when</b> e <b>if</b> significan lo mismo.' },
          { blank: 1, q: 'If people ___ their trash in the street, the city will be dirty.', opts: ['throw', 'will throw', 'threw', 'are throwing'], a: 'throw', why: 'Cláusula <i>if</i> → simple present.' },
          { blank: 1, q: 'If we don’t leave right now, we ___ our flight.', opts: ["'ll miss", 'miss', 'missed', 'are missing'], a: "'ll miss", why: 'Consecuencia futura → <b>will</b> + base.' },
          { blank: 1, q: 'If the buses ___ free, more people will use them.', opts: ['are', 'will be', 'were', 'would be'], a: 'are', why: 'Después de <b>if</b>, simple present. (<i>Were</i> sería un condicional irreal, otra historia.)' },
          { blank: 1, q: 'When it rains here, the traffic ___ terrible.', opts: ['gets', 'will get', 'got', 'would get'], a: 'gets', why: 'Hecho que se repite → present real: simple present en las dos partes.' },
          { blank: 1, q: 'If the factory closes, there ___ so much smoke.', opts: ["won't be", "isn't", "wasn't", 'will be'], a: "won't be", why: 'Resultado futuro negativo → <b>won’t</b> + verbo base.' },
          { blank: 1, q: 'You’ll sleep better ___ you close the window at night.', opts: ['if', 'will', 'so that', 'though'], a: 'if', why: 'La cláusula condicional puede ir <b>detrás</b>; entonces no lleva coma.' },
          { blank: 1, q: 'If we recycle more, there ___ less trash in the street.', opts: ['will be', 'is', 'was', 'would be'], a: 'will be', why: 'Solución + resultado futuro → <i>will be</i>.' },
          { blank: 1, q: 'If the government builds a new subway line, people ___ drive so much.', opts: ["won't", "don't", "didn't", 'will'], a: "won't", why: 'Resultado futuro en negativo → <b>won’t</b> + base.' },
        ] },
        { label: 'Caza el error', type: 'mcq', eyebrow: 'Trampas típicas', title: '¿Cuál es correcta?', pool: 6, items: [
          { q: 'Hablas de mañana: la posibilidad de lluvia.', opts: ["If it rains tomorrow, I won't go.", "If it will rain tomorrow, I won't go.", 'If it rains tomorrow, I don’t go.'], a: "If it rains tomorrow, I won't go.", why: '<b>if + simple present</b>, y <b>will/won’t</b> en la principal.' },
          { q: 'Un hecho general sobre el agua.', opts: ['Water boils if you heat it to 100 °C.', 'Water will boil if you will heat it to 100 °C.', 'Water boiled if you heat it.'], a: 'Water boils if you heat it to 100 °C.', why: 'Verdad general → <b>present real conditional</b> en las dos partes.' },
          { q: 'La cláusula <i>if</i> va delante.', opts: ['If we leave now, we will be on time.', 'If we leave now we will be on time,', 'We will be on time, if we leave now.'], a: 'If we leave now, we will be on time.', why: 'Coma solo cuando la cláusula <i>if</i> va <b>primero</b>.' },
          { q: 'Cantidad de tráfico.', opts: ['There is too much traffic downtown.', 'There are too many traffic downtown.', 'There are several traffic downtown.'], a: 'There is too much traffic downtown.', why: '<b>traffic</b> es non-count: <i>is</i> + <i>too much</i>.' },
          { q: 'Cantidad de basura.', opts: ['There was a lot of trash in the street.', 'There were a lot of trashes in the street.', 'There were several trash in the street.'], a: 'There was a lot of trash in the street.', why: '<b>trash</b> no tiene plural ni se cuenta.' },
          { q: 'Cómo conduce ella.', opts: ['She drives very dangerously.', 'She drives very dangerous.', 'She drives very danger.'], a: 'She drives very dangerously.', why: 'Modifica al <b>verbo</b> <i>drives</i> → hace falta un <b>adverbio</b>.' },
          { q: 'Repaso Unit 5: contar una historia.', opts: ['I was walking home when I found a wallet.', 'I walked home when I was finding a wallet.', 'I was walking home when I was finding a wallet.'], a: 'I was walking home when I found a wallet.', why: 'Past continuous para el fondo, simple past para la interrupción.' },
          { q: 'Repaso Unit 4: un plan ya decidido.', opts: ["I'm going to move downtown next month.", 'I will move downtown next month, I decided it last week.', 'I move downtown next month.'], a: "I'm going to move downtown next month.", why: '<b>be going to</b> para decisiones ya tomadas; <i>will</i> para decisiones del momento.' },
          { q: 'Repaso Unit 2: cuánto hace que vives ahí.', opts: ["I've lived in this city since 2019.", 'I live in this city since 2019.', "I'm living in this city for 2019."], a: "I've lived in this city since 2019.", why: 'Present perfect + <b>since</b> + punto de partida.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Fíjate en las <b>weak words</b>: <i>of, a, to, there</i> casi no se oyen, pero hay que escribirlas.',
          sentences: [
            'There was a really bad traffic jam on the highway today.',
            "There's too much trash in this city. We need to clean up the streets.",
            'Cars and factories cause air pollution, which is bad for our health.',
            "If we don't leave soon, we'll get stuck in traffic.",
            'If the city builds more bike lanes, there will be less pollution.',
            'There are very few flights under seven hundred dollars.',
            'I have so little free time that I never go downtown.',
            'She always rides her bike safely and wears a helmet.',
            'Please speak quietly in the library.',
            'The firefighters helped the family get out of the house safely.',
            'Are you all right? I was really worried.',
            "I'm so relieved. What a relief!",
            'It was pretty scary, though.',
            "I was walking home when I found a wallet on the sidewalk.",
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for gist and specific information', title: 'Escucha el diálogo y responde', intro: 'Escúchalo entero una vez para la idea general. Luego vuelve a escucharlo buscando los datos concretos.',
          lines: [
            ['Neil', "I'm so annoyed! We drove to the airport, but I missed my flight because there was a traffic jam on the highway."],
            ['Ali', 'That’s terrible! Which highway was it? I heard there was an accident on Highway 30.'],
            ['Neil', 'Yes, Highway 30. At first we were moving really slowly, but then we stopped moving for forty minutes.'],
            ['Ali', 'Are you all right? I was really worried when you didn’t answer your phone.'],
            ['Neil', 'I’m fine. My phone battery died. Nobody was hurt in the accident, though.'],
            ['Ali', 'What a relief! So what will you do now?'],
            ['Neil', 'If I get a seat on the ten o’clock flight, I’ll still arrive tonight. If not, I’ll have to wait until tomorrow.'],
            ['Ali', 'I’m glad to hear it wasn’t worse. Next time take the train — if you take the train, you won’t need to worry about traffic.'],
          ],
          questions: [
            { q: 'Why did Neil miss his flight?', opts: ['There was a traffic jam after an accident', 'His car broke down', 'He woke up late'], a: 'There was a traffic jam after an accident', why: '"I missed my flight because there was a traffic jam on the highway" + el accidente en la Highway 30.' },
            { q: 'How long did they stop moving?', opts: ['forty minutes', 'four minutes', 'two hours'], a: 'forty minutes', why: '"then we stopped moving for forty minutes".' },
            { q: 'Why didn’t Neil answer the phone?', opts: ['His phone battery died', 'He was hurt in the accident', 'He was on the plane'], a: 'His phone battery died', why: '"I’m fine. My phone battery died."' },
            { q: 'What does Ali suggest at the end?', opts: ['Taking the train next time', 'Driving earlier next time', 'Flying from another airport'], a: 'Taking the train next time', why: '"if you take the train, you won’t need to worry about traffic" — future real conditional.' },
            { q: 'Which phrase does Ali use to express relief?', opts: ['What a relief!', 'Are you all right?', 'That’s terrible!'], a: 'What a relief!', why: '<i>What a relief!</i> expresa alivio; <i>Are you all right?</i> expresa preocupación.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'The worst problem in my city', task: 'Habla 60 segundos del peor problema de tu ciudad. Usa al menos tres palabras de <i>urban problems</i> y dos cuantificadores (<i>so much, a lot of, very few…</i>).', model: 'Modelo: "The worst problem in Lima is traffic. There is so much traffic in the morning that I spend almost two hours in the car. There is also a lot of noise and very few parks, so there is almost no space to walk."', tags: ['traffic', 'pollution', 'noise', 'so much', 'a lot of', 'very few', 'space'] },
          { t: 'Problem → solution → result', task: 'Elige un problema (traffic, noise at night, trash in the street) y di la solución y el resultado con un <b>future real conditional</b>. Haz tres frases con <i>If…, …will…</i>', model: 'Modelo: "If the city makes the center car-free, we won’t have so many traffic jams. If buses run all night, there will be less noise from cars. If there are more trash cans, people won’t throw their trash in the street."', tags: ['if', 'will', "won't", 'traffic jams', 'noise', 'trash', 'less'] },
          { t: 'How do people do it?', task: 'Describe a tres personas que conoces usando adverbios de modo: cómo hablan, conducen o trabajan. Usa al menos cuatro adverbios distintos.', model: 'Modelo: "My brother drives quite dangerously — he’s always on his phone. My boss explains everything clearly and always answers politely. My neighbor plays music really loudly at night, but he apologized calmly when I asked him to stop."', tags: ['dangerously', 'clearly', 'politely', 'loudly', 'calmly', 'safely', 'quietly'] },
          { t: 'Facts about your city', task: 'Di cuatro hechos generales de tu ciudad con <b>present real conditionals</b>. Recuerda que puedes cambiar <i>if</i> por <i>when</i>.', model: 'Modelo: "When it rains here, the traffic gets terrible. If you take the bus at eight, you never find a seat. When there is a festival, the streets are completely full. If you want fresh air, you have to leave the city."', tags: ['when', 'if', 'rains', 'traffic', 'completely', 'fresh air', 'gets'] },
          { t: 'Are you all right?', task: 'Imagina que un amigo llega muy tarde y no contestaba el teléfono. Haz las dos voces: expresa preocupación, escucha la explicación y expresa alivio. Termina una frase con <i>though</i>.', model: 'Modelo: "— Are you all right? I was really worried! — I’m fine, sorry. There was a huge traffic jam. It was pretty stressful, though. — What a relief! I’m so glad to hear that."', tags: ['are you all right', 'worried', 'relief', 'glad to hear', 'though', 'traffic jam'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Unstressed vowels at the end of a word', title: 'El final de la palabra se dice flojito', intro: 'En inglés la última sílaba suele ser <b>débil</b>: la vocal se convierte en una /ə/ muy corta. No la estires. Escucha y repite marcando solo la sílaba en MAYÚSCULAS.',
          pairs: [
            ['po-LLU-tion (el final suena /ʃən/, casi sin vocal)', 'pollution'],
            ['TRA-ffic (el "-ic" final es débil, no "TRA-FIC")', 'traffic'],
            ['CON-crete (fuerte al principio)', 'concrete'],
            ['gra-FFI-ti (fuerte en el medio)', 'graffiti'],
            ['DAN-ger-ous-ly (una sola sílaba fuerte, tres débiles)', 'dangerously'],
            ['com-PLETE-ly', 'completely'],
            ['co-RRECT-ly', 'correctly'],
            ['BEAU-ti-ful-ly', 'beautifully'],
            ['QUI-et-ly (dos sílabas en "quiet": QUI-et)', 'quietly'],
            ['re-LIEF', 'relief'],
            ['con-DI-tion-al', 'conditional'],
            ['UR-ban PLA-nner', 'urban planner'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'The city that planted its own lungs', intro: 'Lee una vez para la idea general. Luego responde. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Twenty years ago, the center of Vitoria was a gray square of concrete. There was so much traffic that the air smelled of smoke, and the noise from the main avenue never stopped. Almost no families walked downtown after work. Most people spent the weekend trying to <b>escape</b> to the mountains, because the city itself was too <b>stressful</b> to enjoy.',
            'Then an urban planner called Marta Ruiz asked a simple question: what if the empty land around the city became a forest? The idea was cheap compared with a new highway, and it used space that nobody wanted. If a city has trees, she argued, it has a filter.',
            'Today a green ring of more than a hundred thousand trees surrounds the city. On a hot afternoon the difference is easy to feel: under the trees there is <b>shade</b>, and the temperature is four degrees lower than on the avenue. Doctors say air pollution is now far below the European limit, which is good news for everybody’s <b>lungs</b>.',
            'The traffic did not disappear by magic. The city closed several streets to cars, doubled the number of buses and built bike lanes. There were a lot of angry drivers at first, and very few people believed it would work. Ten years later, almost none of them want to go back. "If you give people a good alternative," Ruiz says, "they will use it."',
          ],
          main: [
            { q: 'What the city looked and felt like before the change.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1: concreto, tráfico, humo, ruido y gente que se iba los fines de semana.' },
            { q: 'Where the idea came from and why it was cheap.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: Marta Ruiz, el terreno vacío y la comparación con una autopista.' },
            { q: 'The measurable results of the green ring today.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: cien mil árboles, cuatro grados menos y contaminación por debajo del límite.' },
            { q: 'What happened with cars, and how people reacted.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: calles cerradas, más buses, conductores enfadados y el cambio de opinión.' },
          ],
          infer: [
            { q: '<b>escape</b> (paragraph 1)', opts: ['to get away from a place you do not want to be in', 'to arrive somewhere early', 'to build something new'], a: 'to get away from a place you do not want to be in', why: 'Se iban a la montaña porque la ciudad era demasiado estresante → escapar de ella.' },
            { q: '<b>stressful</b> (paragraph 1)', opts: ['making you feel worried and tired', 'very cheap', 'very quiet'], a: 'making you feel worried and tired', why: 'Con humo, ruido y tráfico, la ciudad no era agradable: era estresante.' },
            { q: '<b>shade</b> (paragraph 3)', opts: ['a cooler place out of the sun', 'a kind of tree', 'a type of street'], a: 'a cooler place out of the sun', why: 'Debajo de los árboles y con cuatro grados menos → sombra.' },
            { q: '<b>lungs</b> (paragraph 3)', opts: ['the parts of your body you breathe with', 'your legs', 'your eyes'], a: 'the parts of your body you breathe with', why: 'Si baja la contaminación del aire, lo que mejora son los pulmones.' },
          ],
          think: '¿Funcionaría algo así en tu ciudad? Escribe dos frases con condicionales: <i>If my city planted more trees, …</i> y <i>If they closed the center to cars, …</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Corrige tus frases', type: 'fix', eyebrow: 'Error correction · tus errores reales', title: 'Reescribe la frase corrigiendo el error', intro: 'Las tres primeras vienen de lo que marcaste o escribiste en el curso. Las demás son trampas típicas de esta unidad.', items: [
          { bad: 'The firefighters helped the family get out of the house quitly. Nobody was hurt.', good: 'The firefighters helped the family get out of the house safely. Nobody was hurt.', why: 'Dos cosas: <b>quitly</b> no existe (sería <i>quietly</i>, de <i>quiet</i> + <i>-ly</i>), y aquí el adverbio correcto es <b>safely</b>, porque <i>nobody was hurt</i> habla de seguridad, no de silencio.' },
          { bad: 'You can use several quantifiers with non-count nouns, for example several traffic.', good: 'You cannot use several with non-count nouns. You say so much traffic.', why: '<b>Several, a few</b> y <b>so many</b> solo van con <b>count nouns</b>. Con <i>traffic, noise, trash, air</i> usa <b>so much / a lot of / very little</b>.' },
          { bad: 'A: Two people had to go to the hospital. B: I was OK.', good: 'A: Two people had to go to the hospital. B: I was OK, though.', why: 'Hace falta el contraste: los demás no estuvieron bien, tú sí. <b>though</b> va al <b>final</b> de la frase, después de una <b>coma</b>.' },
          { bad: 'There are too much traffic in my city and too many pollution.', good: 'There is too much traffic in my city and too much pollution.', why: '<b>traffic</b> y <b>pollution</b> son non-count: verbo en <b>singular</b> (<i>is</i>) y <b>too much</b>, no <i>too many</i>.' },
          { bad: "If it will rain tomorrow, I won't go downtown.", good: "If it rains tomorrow, I won't go downtown.", why: 'Después de <b>if</b> va <b>simple present</b>, aunque hables del futuro. El <i>will</i> solo aparece en la otra parte.' },
          { bad: 'There were a lot of trashes in the street after the festival.', good: 'There was a lot of trash in the street after the festival.', why: '<b>trash</b> no tiene plural ni se cuenta → <i>was</i> + <i>a lot of trash</i>.' },
          { bad: 'My neighbor plays music very loud at night and he drives dangerous.', good: 'My neighbor plays music very loudly at night and he drives dangerously.', why: 'Describen <b>cómo</b> se hace la acción (<i>plays, drives</i>), así que hacen falta <b>adverbios</b>: <i>-ly</i>.' },
          { bad: 'I have a few money, so I will take the bus.', good: 'I have a little money, so I will take the bus.', why: '<b>money</b> es non-count → <b>a little</b>. <i>A few</i> es para plurales: <i>a few coins</i>.' },
        ] },
        { label: 'Escribe tu comentario', type: 'comment', eyebrow: 'Writing task · comentario a un pódcast', title: 'Comenta el pódcast sobre problemas urbanos', intro: 'Escribe 70-110 palabras comentando el tema del Reading, como si comentaras un pódcast. <b>Usa preguntas para argumentar</b> (<i>But what about…? Why don’t we…?</i>): es la técnica de escritura de la unidad. La checklist se marca sola al analizar el texto.',
          placeholder: 'I listened to this podcast about traffic in big cities and…', min: 70, max: 110, need: 4, checks: [
            { label: 'Uso al menos una <b>pregunta</b> para hacer un punto (<i>But what about…? Why don’t we…? Isn’t it better to…?</i>)', re: /\?/ },
            { label: 'Nombro al menos dos <b>urban problems</b> (<i>traffic, pollution, noise, trash…</i>)', words: URBAN_W },
            { label: 'Uso un <b>cuantificador</b> de la unidad (<i>so much, a lot of, very few, almost no…</i>)', words: [...COUNT_ONLY, ...NONCOUNT_ONLY, ...BOTH] },
            { label: 'Propongo una solución con un <b>conditional</b> (<i>If… , … will…</i>)', re: /\bif\b[\s\S]*\b(will|won't|wo n't)\b|\b(will|won't)\b[\s\S]*\bif\b/ },
            { label: 'Uso un <b>adverbio de modo</b> (<i>safely, quietly, clearly…</i>)', words: ADV_W },
            { label: 'Cierro con un contraste usando <i>though</i> o comparto mi experiencia (<i>In my city…</i>)', re: /,\s*though\b|\bin my city\b|\bwhere i live\b|\bin my neighborhood\b/ },
          ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Preocupación, alivio y el contraste con <i>though</i>', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Expressing concern</h3><p class="small muted" style="margin:4px 0">Muestras que estás preocupado por alguien.</p><ul class="small" style="padding-left:18px;margin:6px 0"><li>Are you <b>all right</b>?</li><li>I was really <b>worried</b>.</li><li>Is / Was <b>everyone</b> OK?</li><li>Is <b>anything</b> wrong?</li></ul></div>
          <div><h3>Expressing relief</h3><p class="small muted" style="margin:4px 0">Muestras que te alegra que algo malo acabara bien.</p><ul class="small" style="padding-left:18px;margin:6px 0"><li>I’m so <b>relieved</b>.</li><li>I’m <b>glad</b> to hear that.</li><li>What a <b>relief</b>!</li><li>That’s <b>such</b> a relief.</li></ul></div>
          <div><h3>Real-world strategy: <i>though</i></h3><p class="small" style="margin:6px 0"><b>though</b> introduce una idea que <b>contrasta</b> con algo que ya se dijo. Va al <b>final</b> de la frase, después de una <b>coma</b>.</p><ul class="small" style="padding-left:18px;margin:6px 0"><li>A: Did you miss the bus? B: No, I didn’t. I was late for work<b>, though</b>.</li><li>A: Did you finish the report? B: Yes, I finished it last night. It wasn’t very good<b>, though</b>.</li><li>A: Did any trees come down in the storm? B: No. It was pretty scary<b>, though</b>.</li></ul></div>
          <div class="hint small"><b>Ojo con la posición.</b> En español dirías "aunque…" al principio; en inglés hablado <b>though</b> se pone al final: <i>I was OK, though.</i> Si lo pones delante (<i>Though I was OK…</i>) suena formal y cambia la construcción.<br><br><b>relief</b> (sustantivo) vs <b>relieved</b> (adjetivo): <i>What a <b>relief</b>!</i> pero <i>I’m so <b>relieved</b>.</i></div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ['Rita: Are you all right? Lee saw you at the hospital today. I was really worried.', 'Tom: Thanks, but I’m fine. I was just visiting my sister.', 'Rita: That’s a relief! But is anything wrong? I hope your sister is OK.', 'Tom: Well, she was really sick. She’s feeling a lot better now, though.', 'Rita: I’m glad to hear that.'],
          ['Ali: Did you go to the street festival last night?', 'Neil: Yes, but it was completely crowded and some people fell down.', 'Ali: Was everyone OK? I heard two people had to go to the hospital.', 'Neil: They did. I was OK, though.', 'Ali: What a relief! I was really worried when I saw the news.'],
          ['Sam: You’re very late. Is anything wrong?', 'Dana: There was a huge traffic jam on Highway 30. Nobody was hurt, though.', 'Sam: I’m so relieved. Why didn’t you call me?', 'Dana: My phone battery died. If I leave earlier tomorrow, I won’t get stuck again.', 'Sam: Good idea. Take the train — it’s much less stressful.'],
        ] },
        { label: 'Añade "though"', type: 'soft', eyebrow: 'Real-world strategy', title: 'Reescribe con el contraste', explain: 'Añade la idea que <b>contrasta</b> usando <b>though</b> al final de la frase, después de una coma. Escribe la respuesta completa de B.',
          pattern: /,\s*though\s*[.!?]?\s*$/, missing: 'Falta <b>, though</b> al final de la frase (con coma delante)', items: [
            { h: 'A: Did you miss the bus?  B: No, I didn’t. (late for work)', a: 'No, I didn’t. I was late for work, though.' },
            { h: 'A: Did you finish the report?  B: Yes, I finished it last night. (not very good)', a: 'Yes, I finished it last night. It wasn’t very good, though.' },
            { h: 'A: Was everyone OK after the accident?  B: Yes, nobody was hurt. (pretty scary)', a: 'Yes, nobody was hurt. It was pretty scary, though.' },
            { h: 'A: Do you like your new neighborhood?  B: Yes, I love it. (a lot of noise at night)', a: 'Yes, I love it. There’s a lot of noise at night, though.' },
            { h: 'A: Did the new bike lanes help?  B: Yes, there’s less traffic now. (very few people use them)', a: 'Yes, there’s less traffic now. Very few people use them, though.' },
          ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', pool: 7, items: [
          { q: 'Tu amigo llega tarde y no contestaba el teléfono. Acaba de aparecer.', opts: ['Are you all right? I was really worried.', 'What a relief!', 'Is anything wrong with the traffic?'], a: 'Are you all right? I was really worried.', why: 'Primero expresas <b>preocupación</b>; el alivio viene después de oír que está bien.' },
          { q: 'Te acaba de decir que no le pasó nada.', opts: ['What a relief!', 'Are you all right?', 'Was everyone OK?'], a: 'What a relief!', why: '<i>What a relief!</i> = ¡qué alivio! Es la reacción de <b>alivio</b>.' },
          { q: 'Hubo un accidente en la calle y quieres saber si hay heridos.', opts: ['Was everyone OK?', 'I’m so relieved.', 'That’s such a relief.'], a: 'Was everyone OK?', why: 'Pregunta de <b>preocupación</b> sobre un grupo de gente.' },
          { q: 'Tu compañero tiene mala cara desde esta mañana.', opts: ['Is anything wrong?', 'I’m glad to hear that.', 'What a relief!'], a: 'Is anything wrong?', why: 'Pregunta abierta para mostrar <b>preocupación</b>.' },
          { q: 'Te cuentan que la hermana de tu amigo ya está mejor.', opts: ['I’m glad to hear that.', 'Is anything wrong?', 'Are you all right?'], a: 'I’m glad to hear that.', why: 'Reacción de <b>alivio</b> ante una buena noticia.' },
          { q: 'Elige la frase gramaticalmente correcta.', opts: ['I’m so relieved.', 'I’m so relief.', 'What a relieved!'], a: 'I’m so relieved.', why: '<b>relieved</b> es el adjetivo (<i>I’m relieved</i>); <b>relief</b> el sustantivo (<i>What a relief!</i>).' },
          { q: '"Did you like the concert?" Te gustó, pero había muchísimo ruido. Contrasta con <i>though</i>.', opts: ['Yes, a lot. It was very loud, though.', 'Yes, a lot. Though it was very loud.', 'Yes, a lot, though it was very loud very much.'], a: 'Yes, a lot. It was very loud, though.', why: 'En conversación, <b>though</b> va al <b>final</b>, tras coma.' },
          { q: '"Was the trip OK?" Sí, pero perdiste el vuelo de vuelta.', opts: ['Yes, it was great. I missed my flight home, though.', 'Yes, it was great, though I missing my flight home.', 'Yes, though it was great. I missed my flight home.'], a: 'Yes, it was great. I missed my flight home, though.', why: 'El contraste (perder el vuelo) va al final con <b>, though</b>.' },
          { q: 'Repaso Unit 5: alguien te cuenta algo increíble y quieres reaccionar con sorpresa.', opts: ['You’re kidding! What happened next?', 'What a relief!', 'Is anything wrong?'], a: 'You’re kidding! What happened next?', why: 'Reacción de <b>sorpresa</b> de la Unit 5, distinta de la preocupación y del alivio.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Tu compañero llega dos horas tarde al despliegue', intro: 'Rodrigo, el desarrollador junior de tu equipo en el banco, tenía que estar a las ocho para el despliegue y aparece a las diez, pálido y sin haber contestado el teléfono. Expresa preocupación, escucha qué pasó, expresa alivio y explícaselo a tu jefa con un contraste con <i>though</i>. Si empiezas regañando, la escena se tuerce.', scenes: [
          { t: 'Llegó tarde al despliegue', you: 'Aldo, desarrollador senior del equipo', partner: 'Rodrigo', role: 'tu compañero junior, que llega dos horas tarde; después entra Patricia, tu jefa', goal: 'Pregunta si está bien antes de hablar de trabajo, reacciona con alivio, cuéntaselo a tu jefa con <i>though</i> y reorganiza la mañana con un condicional real.', start: 'a', nodes: {
            a: { say: "Hey… sorry, sorry. I know, I'm two hours late.", opts: [
              { t: "Are you all right? I was really worried. You didn't answer your phone.", ok: 2, why: "Primero la persona, luego el trabajo: <b>Are you all right?</b> + <b>I was really worried</b> son las dos frases de preocupación de la unidad.", next: 'b' },
              { t: "Is anything wrong? We tried to call you a few times.", ok: 1, why: "Correcta: <b>Is anything wrong?</b> también expresa preocupación. Algo más fría que preguntar directamente si está bien.", next: 'b' },
              { t: "Where were you? The release started at eight!", ok: 0, why: "Llega pálido y tú empiezas por el reproche. En inglés suena aún más duro que en español. Pregunta antes: <b>Are you all right?</b>", next: 'a2' },
            ] },
            a2: { say: "I know, I know. There was an accident on the Vía Expresa, right in front of me. I couldn't call anyone.", opts: [
              { t: "Sorry, I didn't mean to shout. Are you all right? Was everyone OK?", ok: 2, why: "Reparas el tono y preguntas por él y por los demás: <b>Are you all right?</b> y <b>Was everyone OK?</b>", next: 'b' },
              { t: "An accident? Are you OK?", ok: 1, why: "Correcta y natural. <b>Are you all right?</b> es la forma de la unidad, pero <i>Are you OK?</i> funciona igual.", next: 'b' },
              { t: "I don't care. You should leave earlier. We lost two hours.", ok: 0, why: "Segundo golpe seguido a alguien que acaba de ver un accidente. Ninguna frase de la unidad sirve aquí porque has decidido no usarlas.", next: 'fail' },
            ] },
            b: { say: "I'm fine, really. A truck hit a car right in front of my bike. Nobody hit me, but we didn't move for an hour and a half. And then my phone died.", opts: [
              { t: "What a relief! Was everyone OK?", ok: 2, why: "Alivio por él (<b>What a relief!</b>) y preocupación por los demás (<b>Was everyone OK?</b>). Justo el orden natural.", next: 'c' },
              { t: "I'm so relieved. Did anyone get hurt?", ok: 1, why: "Correcta: <b>I'm so relieved</b> es la otra fórmula de alivio. <i>Did anyone get hurt?</i> es más directo que <i>Was everyone OK?</i>", next: 'c' },
              { t: "What a relieved! So you are OK.", ok: 0, why: "Mezcla típica: <b>relief</b> es el sustantivo (<i>What a relief!</i>) y <b>relieved</b> el adjetivo (<i>I'm so relieved</i>).", next: 'b2' },
            ] },
            b2: { say: "A… relieved? Anyway. Yes, I'm OK. Just a bit shaky.", opts: [
              { t: "Sorry, I mean: what a relief. Was everyone OK?", ok: 2, why: "Te corriges sin drama y sigues con la pregunta por los demás: <b>What a relief. Was everyone OK?</b>", next: 'c' },
              { t: "I mean I'm relieved. Was anyone hurt?", ok: 1, why: "Correcta: <b>I'm relieved</b> con el adjetivo en su sitio.", next: 'c' },
              { t: "Yes, yes. Now sit down, we have so many work.", ok: 0, why: "Vuelves al trabajo sin cerrar el susto, y además <b>work</b> es non-count: <b>so much work</b>, nunca <i>so many work</i>.", next: 'c' },
            ] },
            c: { say: "I think two people went to the hospital, but they were talking and walking. It was pretty scary, though.", opts: [
              { t: "I'm glad to hear that. Take a minute. If you need to go home, we'll manage.", ok: 2, why: "<b>I'm glad to hear that</b> para la buena noticia, y un <b>future real conditional</b> bien formado: <i>If you need…, we'll manage</i>.", next: 'd' },
              { t: "I'm glad to hear that. Do you want a coffee before we start?", ok: 1, why: "Correcta y amable: <b>I'm glad to hear that</b> + una oferta concreta.", next: 'd' },
              { t: "If you will need to go home, I will manage.", ok: 0, why: "Después de <b>if</b> va <b>simple present</b>, aunque hables del futuro: <i>If you <b>need</b> to go home, we'll manage</i>. Y falta reaccionar a la noticia.", next: 'd' },
            ] },
            d: { who: 'Patricia', say: "Aldo, is everything OK in here? Rodrigo, you look pale.", opts: [
              { t: "He's fine. There was an accident on the Vía Expresa and he got stuck for almost two hours. It was pretty scary, though.", ok: 2, why: "Cuentas lo esencial y cierras con el contraste de la unidad: <b>It was pretty scary, though</b>, con <i>though</i> al <b>final</b> y después de coma.", next: 'e' },
              { t: "He's OK. He was stuck in a traffic jam after an accident, but he wasn't hurt.", ok: 1, why: "Correcta y clara, con <i>but</i>. La unidad te pide practicar el contraste con <b>, though</b> al final.", next: 'e' },
              { t: "He's fine, though he was in an accident.", ok: 0, why: "Dos problemas: <i>though</i> delante suena formal y cambia la construcción, y <b>he was in an accident</b> significa que él chocó. Patricia se asusta.", next: 'd2' },
            ] },
            d2: { who: 'Patricia', say: "In an accident?! Do we need to call anyone? Is he hurt?", opts: [
              { t: "No, sorry, I explained that badly. He wasn't hurt. He was stuck behind the accident for two hours, though.", ok: 2, why: "Reparas el malentendido y usas <b>though</b> donde va: al final, para contrastar <i>no le pasó nada</i> con <i>perdió dos horas</i>.", next: 'e' },
              { t: "No, no. The accident was in front of him, not with him. He's OK.", ok: 1, why: "Correcta y tranquilizadora. Sin el contraste con <i>though</i>, pero resuelve.", next: 'e' },
              { t: "Calm down, Patricia. Is not a big deal.", ok: 0, why: "<i>Calm down</i> a tu jefa suena a orden, y falta el sujeto: <b>It's not a big deal</b>. Segunda réplica torpe seguida: ella corta la conversación.", next: 'fail' },
            ] },
            e: { who: 'Patricia', say: "That's such a relief. OK… what about the release? We're two hours behind.", opts: [
              { t: "If we start now, we'll finish before lunch. Rodrigo, are you OK to continue?", ok: 2, why: "Plan con <b>future real conditional</b>: <i>If we start now, we'll finish…</i> (present en el <i>if</i>, <i>will</i> en el resultado). Y sigues cuidando a Rodrigo.", next: 'f' },
              { t: "We can still do it today if we start right now.", ok: 1, why: "Correcta: la cláusula <i>if</i> va detrás y sin coma. Funciona.", next: 'f' },
              { t: "If we will start now, we finish before lunch.", ok: 0, why: "Al revés: <i>will</i> nunca va en la cláusula con <b>if</b>, y el resultado futuro sí lo lleva: <b>If we start now, we'll finish</b>.", next: 'f' },
            ] },
            f: { who: 'Rodrigo', say: "Yes, let's do it. And sorry again, Aldo. Next time I'll take the train.", opts: [
              { t: "Good idea. If you take the train, you won't need to worry about traffic. And charge your phone!", ok: 2, why: "La frase del diálogo de la unidad: <b>If you take the train, you won't need to worry about traffic</b>. Cierras con humor y sin reproche.", next: 'win' },
              { t: "Don't worry about it. Just text me if something happens, OK?", ok: 1, why: "Correcta y cercana. <i>Text me if something happens</i> es un condicional real con la cláusula <i>if</i> detrás.", next: 'win' },
              { t: "Yes, you must take the train. The traffic are so many in the morning.", ok: 0, why: "<i>Must</i> suena a orden, y <b>traffic</b> es non-count: <b>There is so much traffic</b>, nunca <i>the traffic are so many</i>.", next: 'meh' },
            ] },
            win: { who: 'Rodrigo', say: "Deal. Thanks for asking if I was OK before asking about the release. I noticed.", end: true, outcome: 'win', note: 'Preguntaste antes de reprochar (<b>Are you all right? I was really worried</b>), reaccionaste con <b>What a relief!</b> e <b>I\'m glad to hear that</b>, contaste el contraste con <b>It was pretty scary, though</b> y reorganizaste la mañana con un <b>future real conditional</b> bien formado.' },
            meh: { who: 'Rodrigo', say: "The traffic… are? OK, boss. Let's go.", end: true, outcome: 'meh', note: 'La parte humana salió perfecta; la última frase no. <b>traffic</b> no se cuenta: <i>there is so much traffic</i>, nunca <i>the traffic are so many</i>. Y para aconsejar, mejor un condicional que un <i>must</i>: <b>If you take the train, you won\'t need to worry about traffic</b>.' },
            fail: { say: "You know what? I'm going home. Tell Patricia whatever you want.", end: true, outcome: 'fail', note: 'Dos réplicas duras seguidas y la conversación se rompe. Cuando alguien llega mal, el orden es: preocupación (<b>Are you all right? Is anything wrong?</b>) → escuchar → alivio (<b>What a relief! I\'m glad to hear that</b>) → y solo después el trabajo. El reproche, si hace falta, va al final y en condicional: <i>If you leave earlier, you won\'t get stuck</i>.' },
          } },
        ] },
      ] },
    ],
  };
})();
