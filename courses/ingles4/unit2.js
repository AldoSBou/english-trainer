/* ===========================================================
   ingles4/unit2.js — Inglés 4 · Unit 2: Trends & food
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Vocabulario base ---------- */
  const CATS = ['popular ahora', 'en subida', 'en bajada', 'cosa del pasado', 'moda pasajera'];
  // [expresión, significado (es), ejemplo del curso, pregunta personal, categoría]
  const TRENDS = [
    ['be a fad', 'ser una moda pasajera (popular por poco tiempo)', 'Fidget spinners were a fad with young people. They became popular in 2017 and much less popular a year later.', '¿Qué moda pasajera recuerdas de tu infancia?', 'moda pasajera'],
    ['be a thing of the past', 'ser cosa del pasado (ya no existe o no se hace)', 'Video rental stores are a thing of the past. They used to be common until streaming became popular.', '¿Qué cosa de tu juventud es hoy "cosa del pasado"?', 'cosa del pasado'],
    ['be all the rage', 'ser furor, estar de moda total', 'When iPhones first came out in 2007, they were all the rage.', '¿Qué es furor ahora mismo entre tus amigos?', 'popular ahora'],
    ['be fashionable', 'estar de moda en un momento determinado', 'Skinny jeans were fashionable in the mid-2000s.', '¿Qué ropa era "fashionable" cuando ibas al colegio?', 'popular ahora'],
    ['be old-fashioned', 'ser anticuado, pasado de moda', 'My parents are old-fashioned about communication. They like to send letters and cards.', '¿En qué eres un poco anticuado tú?', 'cosa del pasado'],
    ['be on the way out', 'estar pasando de moda, en retirada', 'Traditional telephones ("landlines") are on the way out.', '¿Qué aparato de tu casa está "on the way out"?', 'en bajada'],
    ['be the latest thing', 'ser lo último, la novedad', 'A new kind of plant-based burger is the latest thing.', '¿Cuál es "lo último" en tu rubro de trabajo?', 'popular ahora'],
    ['be the next big thing', 'ser la próxima gran tendencia', 'I think 3D printers are going to be the next big thing.', '¿Qué crees que será "the next big thing" en tecnología?', 'en subida'],
    ['be trendy', 'estar de moda ahora mismo', 'Podcasts are very trendy now. It seems like everyone is creating their own podcast.', '¿Sigues alguna cosa "trendy" o prefieres lo clásico?', 'popular ahora'],
    ['come back in style', 'volver a estar de moda', 'Round glasses are coming back in style. They were popular in the \'60s.', '¿Qué te gustaría que volviera a ponerse de moda?', 'en subida'],
    ['gain interest', 'despertar / ganar interés', 'People are gaining interest in community gardening.', '¿En qué tema estás ganando interés últimamente?', 'en subida'],
    ['gain popularity', 'ganar popularidad', 'Steel and paper straws are gaining popularity as people try to reduce plastic.', '¿Qué comida está ganando popularidad en tu ciudad?', 'en subida'],
    ['go out of style', 'pasar de moda', 'Fast food restaurants are going out of style as people prefer healthier food.', '¿Qué crees que pasará de moda pronto?', 'en bajada'],
    ['lose interest', 'perder el interés', 'The action was so slow that after a while I lost interest and started texting.', '¿Con qué serie o hobby perdiste el interés?', 'en bajada'],
    ['lose popularity', 'perder popularidad', 'Printed newspapers are losing popularity as more people read the news online.', '¿Qué red social está perdiendo popularidad?', 'en bajada'],
    ['be trending', 'ser tendencia (en redes sociales)', 'Blackpink just released a new music video, so that group is trending big right now.', '¿Qué es tendencia hoy en tu feed?', 'popular ahora'],
  ];
  // [palabra, significado (es), ejemplo, pregunta]
  const FOODS = [
    ['cabbage', 'col, repollo (verdura redonda de hojas gruesas)', 'I got some cabbage for soup.', '¿Comes col? ¿En qué plato?'],
    ['eggplant', 'berenjena (ovalada, morada, blanca por dentro)', "I'm going to cut up the eggplant and roast it with olive oil.", '¿Te gusta la berenjena?'],
    ['garlic', 'ajo', "Do we have garlic? I need some for the pasta sauce I'm making.", '¿Cuántos dientes de ajo le pones a un guiso?'],
    ['ginger', 'jengibre, kion (raíz de sabor fuerte)', 'The ginger will add a nice spicy flavor to the curry.', '¿Usas kion en tu cocina?'],
    ['mint', 'menta, hierbabuena', 'I love the fresh smell of mint. I like to put it in my tea.', '¿Menta en el té o en el postre?'],
    ['pineapple', 'piña', "I'll cut up the pineapple for dessert.", '¿Piña en la pizza: sí o no?'],
    ['shrimp', 'camarón, langostino', 'These shrimp were caught fresh in the local bay.', '¿Cómo prefieres los langostinos?'],
    ['tuna', 'atún', 'Good quality tuna is best eaten raw. It\'s my favorite fish for sashimi.', '¿Atún fresco o en lata?'],
    ['zucchini', 'calabacín, zapallito italiano', "I picked some zucchini from the garden. Let's cook some for dinner tonight.", '¿Cómo cocinas el zapallito?'],
  ];
  const COOK = [
    ['barbecue', 'hacer a la parrilla (al aire libre, sobre fuego)', 'In the spring, we love to barbecue meat and vegetables.', '¿Cuándo fue tu última parrillada?'],
    ['boil', 'hervir', 'Boil the pasta for about 10 minutes, until it is soft.', '¿Qué hierves más a menudo: pasta, papas o arroz?'],
    ['chop', 'picar, cortar en trozos pequeños', 'Can you chop the onions? My eyes always burn when I chop them.', '¿Te lloran los ojos al picar cebolla?'],
    ['fry', 'freír', 'I love eggs for breakfast. I fry them in a pan with butter.', '¿Fríes las empanadas o las horneas?'],
    ['rinse', 'enjuagar (con agua limpia)', "It's important to rinse your vegetables before you eat them.", '¿Enjuagas el arroz antes de cocinarlo?'],
    ['stir', 'remover, revolver (con una cuchara)', "You need to stir the rice frequently so it doesn't stick to the pot.", '¿Qué plato hay que remover sin parar?'],
  ];
  const TREND_WORDS = TRENDS.map(t => t[0].replace(/^be /, ''));

  window.UNIT_DATA['ingles4/unit2'] = {
    source: 'Evolve · Unit 2 · Trends & food',
    description: 'Tendencias que van y vienen, comida y formas de cocinar, condicionales reales y time clauses, ofrecer comida y escribir un informe formal.',
    map: [
      ['Vocabulary', '15 expresiones de tendencias (<i>be all the rage, be on the way out, come back in style…</i>), 9 alimentos, 6 verbos de cocina e Insider English <i>be trending</i>', 'Flashcards con audio, emparejar, tendencias en contexto, ¿sube o baja?, comida y cocina'],
      ['Grammar', 'Condicionales reales (<i>if</i> + simple present → <i>will / going to / might</i>, imperativo o verdad general) y time clauses con <i>after, until, when, as soon as, before, once</i>', 'Elige la forma, ¿para qué se usa?, time clauses (tu punto débil), repaso Unit 1'],
      ['Listening', 'Ejemplos de tendencias y diálogos sobre comida', 'Dictado con voz sintética y diálogo en un food court con preguntas'],
      ['Speaking', 'Describing trends, agree / disagree, food advice, predicciones', 'Retos con cronómetro y micrófono; pronunciación de alimentos'],
      ['Reading', 'Tendencias gastronómicas', 'Texto nuevo sobre por qué la comida pasa de moda + inferir significado'],
      ['Writing', 'Informe de resultados de una encuesta; voz pasiva para un tono formal', 'Corrige frases, pasa a pasiva, mini-informe con checklist'],
      ['Social English', 'Ofrecer comida: <i>Can I offer you…? I\'d better not. Coming right up!</i>', 'Frases por situación, ordenar diálogos, respuesta rápida'],
    ],
    weak: [
      '<b>Time clauses</b>: en las notas marcaste que la cláusula con <i>after / until / when</i> lleva <s>future tense</s> y la principal <s>simple present</s>. Es justo al revés: <i>When I <b>get</b> home, I<b>\'ll</b> cook</i> → <b>simple present</b> después de <i>when / after / until / as soon as / once</i>, y el <b>futuro</b> en la cláusula principal. La misma regla vale para <i>if</i>.',
    ],
    weakLink: 'Trabájalo en <b>Grammar › Time clauses</b> y <b>Writing › Corrige las frases</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la expresión. Reverso: significado, ejemplo del curso y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...TRENDS.map(t => ({ cat: 'Describing trends', w: t[0], def: t[1], ex: t[2], ask: t[3] })),
            ...FOODS.map(f => ({ cat: 'Food items', w: f[0], def: f[1], ex: f[2], ask: f[3] })),
            ...COOK.map(c => ({ cat: 'Ways to prepare food', w: c[0], def: c[1], ex: c[2], ask: c[3] })),
          ] },
        { label: 'Tendencias ↔ significado', type: 'match', eyebrow: 'Describing trends', title: 'Empareja la expresión con su significado', intro: 'Toca una expresión y luego su significado. Fíjate en los verbos: <i>be, come back, gain, lose, go out</i>.', pairs: TRENDS.map(t => [t[0], t[1].split(' (')[0]]), round: 6 },
        { label: 'Comida ↔ significado', type: 'match', eyebrow: 'Food & cooking', title: 'Empareja la palabra con su significado', intro: 'Alimentos y verbos de cocina mezclados.', pairs: [...FOODS, ...COOK].map(x => [x[0], x[1].split(' (')[0]]), round: 6 },
        { label: 'Tendencias en contexto', type: 'mcq', eyebrow: 'Describing trends', title: 'Lee la situación y elige la expresión', intro: 'Todas las frases son nuevas. Piensa si la cosa sube, baja, vuelve o ya desapareció.', pool: 7, items: [
          { blank: 1, q: "Everybody in my office is drinking oat milk. It's ___ right now.", opts: ['all the rage', 'a thing of the past', 'on the way out', 'old-fashioned'], a: 'all the rage', why: '<b>Be all the rage</b> = ser furor, muy popular ahora.' },
          { blank: 1, q: "Nobody sends postcards anymore. They're ___.", opts: ['a thing of the past', 'the latest thing', 'all the rage', 'gaining interest'], a: 'a thing of the past', why: '<b>Be a thing of the past</b> = ya no se hace, cosa del pasado.' },
          { blank: 1, q: "Vinyl records were popular in the '70s, and now they're ___.", opts: ['coming back in style', 'going out of style', 'a thing of the past', 'losing interest'], a: 'coming back in style', why: 'Fueron populares, dejaron de serlo y <b>vuelven</b> → <b>come back in style</b>.' },
          { blank: 1, q: 'Cassette tapes were popular for a few years and then disappeared. They were ___.', opts: ['a fad', 'the next big thing', 'fashionable forever', 'trending now'], a: 'a fad', why: '<b>Be a fad</b> = moda pasajera, popular por poco tiempo.' },
          { blank: 1, q: "My grandmother still writes checks at the supermarket. She's a bit ___.", opts: ['old-fashioned', 'trendy', 'all the rage', 'the latest thing'], a: 'old-fashioned', why: '<b>Old-fashioned</b> = anticuado. Ojo: <i>old-fashioned</i>, no <i>old-fashion</i>.' },
          { blank: 1, q: "Fewer and fewer people buy DVDs. They're ___.", opts: ['on the way out', 'the next big thing', 'all the rage', 'coming back in style'], a: 'on the way out', why: '<b>Be on the way out</b> = está desapareciendo poco a poco.' },
          { blank: 1, q: "Have you seen this app? It just came out and everyone's talking about it. It's ___.", opts: ['the latest thing', 'a thing of the past', 'old-fashioned', 'on the way out'], a: 'the latest thing', why: '<b>Be the latest thing</b> = lo último, la novedad de ahora.' },
          { blank: 1, q: 'Experts say lab-grown meat will be ___ in ten years.', opts: ['the next big thing', 'a thing of the past', 'old-fashioned', 'on the way out'], a: 'the next big thing', why: '<b>Be the next big thing</b> = tendencia futura. Pista: <i>will be… in ten years</i>.' },
          { blank: 1, q: 'Since the documentary came out, people ___ in urban gardening.', opts: ['are gaining interest', 'are losing interest', 'are going out of style', 'are a fad'], a: 'are gaining interest', why: '<b>Gain interest in</b> something = interesarse cada vez más.' },
          { blank: 1, q: 'The series was great at first, but after season three I ___.', opts: ['lost interest', 'gained interest', 'was all the rage', 'came back in style'], a: 'lost interest', why: '<b>Lose interest</b> = perder el interés. Simple past: <i>lost</i>.' },
          { blank: 1, q: 'Cash ___ because everyone pays with their phone now.', opts: ['is losing popularity', 'is gaining popularity', 'is the latest thing', 'is all the rage'], a: 'is losing popularity', why: 'Cada vez menos gente lo usa → <b>lose popularity</b>.' },
          { blank: 1, q: 'Bicycles ___ as more cities build bike lanes.', opts: ['are gaining popularity', 'are losing popularity', 'are a thing of the past', 'are old-fashioned'], a: 'are gaining popularity', why: 'Más ciclovías → más gente en bici → <b>gain popularity</b>.' },
          { blank: 1, q: 'Huge phones ___; people want smaller ones again.', opts: ['are going out of style', 'are coming back in style', 'are the latest thing', 'are gaining interest'], a: 'are going out of style', why: '<b>Go out of style</b> = pasar de moda.' },
          { blank: 1, q: 'That hashtag ___ on social media right now; millions of people are using it.', opts: ['is trending', 'is a thing of the past', 'is on the way out', 'is old-fashioned'], a: 'is trending', why: 'Insider English: <b>be trending</b> = ser tendencia en redes.' },
          { blank: 1, q: 'Wide-leg jeans are ___ this season; every shop sells them.', opts: ['fashionable', 'a thing of the past', 'on the way out', 'losing popularity'], a: 'fashionable', why: '<b>Be fashionable</b> = estar de moda en un momento concreto (<i>this season</i>).' },
        ] },
        { label: '¿Sube, baja o vuelve?', type: 'mcq', eyebrow: 'Describing trends', title: 'Clasifica la expresión', intro: 'Mira la expresión y su ejemplo. ¿Describe algo popular ahora, en subida, en bajada, cosa del pasado o una moda pasajera?', pool: 7,
          build: ({ pick, esc }) => pick(TRENDS, 7).map(t => ({ q: `<b>${esc(t[0])}</b><br><span class="small muted">“${esc(t[2])}”</span>`, opts: [t[4], ...pick(CATS.filter(c => c !== t[4]), 3)], a: t[4], why: `<b>${esc(t[0])}</b> — ${t[1]} → <b>${t[4]}</b>.` })) },
        { label: 'Comida y cocina', type: 'mcq', eyebrow: 'Food & ways to prepare food', title: 'Elige la palabra correcta', pool: 7, items: [
          { blank: 1, q: 'Add some ___ to your tea if you want a fresh, cool flavor.', opts: ['mint', 'garlic', 'tuna', 'cabbage'], a: 'mint', why: '<b>Mint</b> = menta. Hojas que dan sabor fresco a bebidas y comidas.' },
          { q: 'This purple vegetable is white inside. Roast it with olive oil.', opts: ['eggplant', 'zucchini', 'pineapple', 'ginger'], a: 'eggplant', why: '<b>Eggplant</b> = berenjena (ovalada, morada, blanca por dentro).' },
          { q: "It's a large sea fish, often eaten raw in sushi.", opts: ['tuna', 'shrimp', 'cabbage', 'mint'], a: 'tuna', why: '<b>Tuna</b> = atún. Ojo: no lleva -s en plural (<i>two tuna steaks</i>).' },
          { q: "They're small, pink, curved and have a shell.", opts: ['shrimp', 'tuna', 'garlic', 'zucchini'], a: 'shrimp', why: '<b>Shrimp</b> = camarón/langostino. Plural normalmente igual: <i>these shrimp</i>.' },
          { q: 'A yellow fruit with thick skin and sharp leaves on top.', opts: ['pineapple', 'eggplant', 'cabbage', 'ginger'], a: 'pineapple', why: '<b>Pineapple</b> = piña.' },
          { q: 'A pale brown root with a spicy taste, common in curries.', opts: ['ginger', 'garlic', 'mint', 'zucchini'], a: 'ginger', why: '<b>Ginger</b> = jengibre / kion.' },
          { q: 'A round vegetable made of many thick leaves, great for soup.', opts: ['cabbage', 'pineapple', 'eggplant', 'shrimp'], a: 'cabbage', why: '<b>Cabbage</b> = col, repollo.' },
          { q: "It's like a small onion with a very strong smell.", opts: ['garlic', 'ginger', 'mint', 'tuna'], a: 'garlic', why: '<b>Garlic</b> = ajo. Incontable: <i>some garlic, a clove of garlic</i>.' },
          { q: 'A long green vegetable, white inside.', opts: ['zucchini', 'eggplant', 'cabbage', 'ginger'], a: 'zucchini', why: '<b>Zucchini</b> = calabacín / zapallito italiano.' },
          { blank: 1, q: '___ the eggs in butter for two minutes.', opts: ['Fry', 'Boil', 'Rinse', 'Chop'], a: 'Fry', why: '<b>Fry</b> = freír en aceite o mantequilla.' },
          { blank: 1, q: '___ the onions into small pieces before you cook them.', opts: ['Chop', 'Stir', 'Boil', 'Barbecue'], a: 'Chop', why: '<b>Chop</b> = picar, cortar en trozos pequeños.' },
          { blank: 1, q: '___ the rice for 15 minutes in hot water.', opts: ['Boil', 'Fry', 'Rinse', 'Chop'], a: 'Boil', why: '<b>Boil</b> = hervir.' },
          { blank: 1, q: '___ the tomatoes under the tap to remove the dirt.', opts: ['Rinse', 'Fry', 'Stir', 'Boil'], a: 'Rinse', why: '<b>Rinse</b> = enjuagar con agua limpia.' },
          { blank: 1, q: "___ the sauce so it doesn't stick to the pan.", opts: ['Stir', 'Chop', 'Rinse', 'Barbecue'], a: 'Stir', why: '<b>Stir</b> = remover con una cuchara.' },
          { blank: 1, q: 'On Sundays we ___ meat and vegetables outside over a fire.', opts: ['barbecue', 'boil', 'rinse', 'chop'], a: 'barbecue', why: '<b>Barbecue</b> es verbo y sustantivo: <i>we barbecue on a barbecue</i>.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Real conditionals · time clauses', title: 'Una regla para todo: presente en la condición', html: `
          <p style="margin:8px 0 14px">Los <b>condicionales reales</b> hablan de situaciones posibles o habituales. La cláusula con <b>if</b> va siempre en <b>simple present</b>; lo que cambia es la cláusula principal.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Uso</th><th>Forma</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>Planes y predicciones</b></td><td>if + simple present, <b>will / be going to / might</b> + verbo</td><td>If you <b>finish</b> your paper this afternoon, I<b>'ll buy</b> us dinner this evening.</td><td>resultado futuro; <i>might</i> = menos seguro</td></tr>
            <tr><td><b>Instrucciones y consejos</b></td><td>if + simple present, <b>imperativo</b></td><td>If you<b>'re</b> hot, <b>open</b> the window.</td><td>le dices a alguien qué hacer</td></tr>
            <tr><td><b>Verdades generales</b></td><td>if + simple present, <b>simple present</b></td><td>If I <b>have</b> an assignment, I always <b>do</b> it right away.</td><td>always, usually, every time</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Nunca</b> <i>will</i> ni <i>might</i> después de <i>if</i>: <s>If I won't eat</s> → If I <b>don't eat</b>, I'll be hungry. El orden de las cláusulas es libre: <i>Open the window if you're hot</i> (sin coma).</div>
          <h3 style="margin-top:18px">Time clauses: after, until, when (+ as soon as, before, once)</h3>
          <p style="margin-top:6px">Para una secuencia de eventos <b>en el futuro</b>, la cláusula de tiempo va en <b>simple present</b> y la principal en <b>futuro</b>: <i>I'll call you <b>when</b> I <b>get</b> home. Wait <b>until</b> the water <b>boils</b>. <b>As soon as</b> the shrimp <b>are</b> ready, we'll eat.</i></p>
          <div class="hint" style="margin-top:12px"><b>Tu error a vigilar:</b> en el curso marcaste "future tense in the time clause, simple present in the main clause". Es al revés: <s>When I'll finish</s> → <b>When I finish</b> work, I<b>'m going to</b> cook. Piensa en <i>when / after / until</i> como si fueran <i>if</i>: nunca llevan <i>will</i>.</div>
          <p class="small muted" style="margin-top:10px"><b>once</b> = una vez que; <b>as soon as</b> = en cuanto; <b>until</b> = hasta que (con verbo negativo en la principal: <i>Don't open the oven until it's ready</i>).</p>` },
        { label: 'Elige la forma', type: 'mcq', eyebrow: 'Real conditionals', title: 'Completa el condicional real', intro: 'Frases nuevas sobre comida y tendencias. Decide si es plan, consejo o verdad general.', pool: 7, items: [
          { blank: 1, q: "If it ___ tomorrow, we'll barbecue in the garden.", opts: ["doesn't rain", "won't rain", "isn't going to rain", "didn't rain"], a: "doesn't rain", why: 'Condición → <b>simple present</b>. Nunca <i>will</i> después de <i>if</i>.' },
          { blank: 1, q: "If you don't like ginger, ___ it out of the curry.", opts: ['leave', 'you will leaving', 'will leave', 'leaving'], a: 'leave', why: 'Consejo → <b>imperativo</b> en la cláusula principal.' },
          { blank: 1, q: 'If I have zucchini in the fridge, I usually ___ it and fry it with garlic.', opts: ['chop', 'will chop', 'am chopping', 'chopped'], a: 'chop', why: 'Verdad general (<i>usually</i>) → simple present en las dos cláusulas.' },
          { blank: 1, q: 'If the restaurant ___ too crowded, we might go somewhere else.', opts: ['is', 'will be', 'might be', 'was'], a: 'is', why: '<i>Might</i> va en la principal; la condición sigue en <b>simple present</b>.' },
          { blank: 1, q: 'Post that photo of the plant-based burger tonight. You ___ a lot of likes if you do.', opts: ["'ll get", 'might got', 'will to get', 'getting'], a: "'ll get", why: 'Predicción → <b>will</b> + verbo base en la principal. Repaso U1: <i>get a lot of likes</i>.' },
          { blank: 1, q: "If you ___ the rice, it won't stick to the pot.", opts: ['stir', 'will stir', 'stirring', 'are going to stir'], a: 'stir', why: 'Condición en presente; resultado con <i>won\'t</i>.' },
          { blank: 1, q: 'If the shrimp smell strange, ___ them.', opts: ["don't eat", "you won't eating", 'not eat', "doesn't eat"], a: "don't eat", why: 'Consejo negativo → imperativo negativo: <b>don\'t</b> + verbo.' },
          { blank: 1, q: 'Food trucks ___ popularity if the city keeps closing the streets on Sundays.', opts: ['might gain', 'might to gain', 'gaining', 'gain might'], a: 'might gain', why: '<b>might</b> + verbo base = predicción menos segura.' },
          { blank: 1, q: 'If I ___ hungry late at night, I always make a sandwich.', opts: ['get', 'will get', 'am getting', "'ll be getting"], a: 'get', why: '<i>Always</i> → verdad general → simple present.' },
          { blank: 1, q: "If she ___ the tuna raw, she'll love sashimi.", opts: ['tries', 'will try', 'tried', 'is going to try'], a: 'tries', why: 'Condición en simple present, tercera persona: <b>tries</b>.' },
          { blank: 1, q: 'We ___ a 20 percent tip if the service is good.', opts: ['leave', 'will leaving', 'are leave', 'left'], a: 'leave', why: 'Hábito / verdad general → simple present. Frase del curso, de speaking.' },
          { blank: 1, q: "If the pineapple ___ ripe, it's going to be very sweet.", opts: ['is', 'will be', 'be', 'might be'], a: 'is', why: '<i>Be going to</i> en la principal; condición en presente.' },
          { blank: 1, q: "Don't buy the eggplant if it ___ soft.", opts: ['feels', 'will feel', 'felt', 'is feel'], a: 'feels', why: 'La cláusula <i>if</i> puede ir al final, y sigue en simple present.' },
          { blank: 1, q: "If you ___ enough garlic, the sauce might taste a bit flat.", opts: ["don't add", "won't add", 'not add', "didn't add"], a: "don't add", why: 'Negativo en la condición: <b>don\'t</b> + verbo, nunca <i>won\'t</i>.' },
        ] },
        { label: '¿Para qué se usa?', type: 'mcq', eyebrow: 'Tres usos', title: 'Plan / predicción, instrucción o verdad general', intro: 'Fíjate en la cláusula principal: ¿<i>will / might / going to</i>, imperativo o simple present?', pool: 7,
          build: ({ pick }) => pick([
            ["If you finish early, I'll cook dinner.", 'plan o predicción', '<i>I\'ll cook</i> = resultado futuro.'],
            ['If the pan is too hot, turn down the heat.', 'instrucción o consejo', '<i>Turn down</i> es imperativo.'],
            ['If I eat ginger, my stomach feels better.', 'verdad general', 'Simple present en las dos cláusulas: pasa siempre.'],
            ['If you mix mint and pineapple, it tastes amazing.', 'verdad general', '<i>Tastes</i> = simple present → siempre es así.'],
            ["If the food court is trendy, it's going to be crowded on Saturday.", 'plan o predicción', '<i>Is going to be</i> = predicción.'],
            ["Don't add salt if the tuna is already seasoned.", 'instrucción o consejo', 'Imperativo negativo: <i>don\'t add</i>.'],
            ['If people stop buying newspapers, the price might go up.', 'plan o predicción', '<i>Might go up</i> = predicción poco segura.'],
            ['If cabbage is on sale, my mother always buys three.', 'verdad general', '<i>Always buys</i> → hábito.'],
            ['Rinse the shrimp if they smell of the sea.', 'instrucción o consejo', 'Empieza con imperativo: <i>Rinse</i>.'],
            ['If you have lots of old bananas, make a banana cake.', 'instrucción o consejo', 'Frase del curso: consejo con imperativo.'],
            ['If food trucks gain popularity, the restaurants will lose customers.', 'plan o predicción', '<i>Will lose</i> = predicción.'],
            ['If the water boils, it makes a lot of noise.', 'verdad general', 'Hecho físico → simple present.'],
          ], 7).map(d => ({ q: d[0], opts: ['plan o predicción', 'instrucción o consejo', 'verdad general'], a: d[1], why: d[2] })) },
        { label: 'Time clauses', type: 'mcq', eyebrow: 'after · until · when · as soon as · before · once', title: 'Presente en la cláusula de tiempo, futuro en la principal', intro: 'Este es tu punto débil de la unidad: la cláusula con <i>when / until / after</i> NUNCA lleva <i>will</i>.', pool: 7, items: [
          { blank: 1, q: "I'll text you as soon as I ___ to the market.", opts: ['get', 'will get', 'am going to get', 'got'], a: 'get', why: '<i>As soon as</i> + <b>simple present</b>; el futuro (<i>I\'ll text</i>) va en la principal.' },
          { blank: 1, q: 'When the water ___, add the pasta.', opts: ['boils', 'will boil', 'is going to boil', 'boiled'], a: 'boils', why: 'Time clause en presente + imperativo en la principal.' },
          { blank: 1, q: "We'll serve dinner after the guests ___.", opts: ['arrive', 'will arrive', 'are going to arrive', 'arrived'], a: 'arrive', why: '<i>After</i> + simple present aunque sea futuro.' },
          { blank: 1, q: "Don't open the oven until the cake ___ ready.", opts: ['is', 'will be', 'is going to be', 'was'], a: 'is', why: '<i>Until</i> + presente. Nada de <i>will</i>.' },
          { blank: 1, q: 'Once the onions ___ soft, stir in the garlic.', opts: ['are', 'will be', 'were', 'be'], a: 'are', why: '<b>Once</b> = una vez que → simple present.' },
          { blank: 1, q: "After I ___ the vegetables, I'm going to chop them.", opts: ['rinse', 'will rinse', 'rinsed', 'am going to rinse'], a: 'rinse', why: 'Presente en la cláusula de tiempo; <i>going to</i> en la principal.' },
          { blank: 1, q: 'She ___ a food truck when she saves enough money.', opts: ['is going to open', 'opens', 'opened', 'open'], a: 'is going to open', why: 'La <b>principal</b> lleva el futuro: <i>is going to open</i>. La time clause ya está en presente (<i>saves</i>).' },
          { blank: 1, q: 'Before the fast food place ___, we should try it one more time.', opts: ['closes', 'will close', 'is going to close', 'closed'], a: 'closes', why: '<i>Before</i> + simple present para un evento futuro.' },
          { blank: 1, q: 'I ___ you know as soon as the shrimp are ready.', opts: ["'ll let", 'will letting', 'letting', 'am going let'], a: "'ll let", why: 'Futuro en la principal: <b>I\'ll let you know</b>.' },
          { blank: 1, q: "Until plant-based burgers ___ cheaper, most people won't buy them.", opts: ['get', 'will get', 'are getting', 'got'], a: 'get', why: '<i>Until</i> + presente; <i>won\'t buy</i> en la principal.' },
          { blank: 1, q: 'When 3D printers ___ cheaper, everyone will have one.', opts: ['become', 'will become', 'are going to become', 'became'], a: 'become', why: 'Frase del vocabulario del curso: <i>when they <b>become</b> cheaper, everyone <b>will</b> have one</i>.' },
          { blank: 1, q: 'Wait ___ the oil is hot before you fry the eggs.', opts: ['until', 'when', 'after', 'once'], a: 'until', why: '<i>Wait <b>until</b></i> = espera hasta que.' },
          { blank: 1, q: '___ you finish chopping, put the knife away.', opts: ['As soon as', 'Until', 'Unless', 'By'], a: 'As soon as', why: '<b>As soon as</b> = en cuanto. <i>Until</i> no tiene sentido aquí.' },
          { blank: 1, q: "The trend won't come back in style ___ a celebrity wears it again.", opts: ['until', 'after', 'once', 'when'], a: 'until', why: 'Negativo en la principal + <b>until</b> = no pasará hasta que…' },
        ] },
        { label: 'Repaso Unit 1', type: 'mcq', eyebrow: 'Repaso espaciado · Unit 1', title: 'Tiempos, verbos de estado y cualidades', intro: 'Un repaso rápido de la unidad anterior con el vocabulario de esta.', items: [
          { blank: 1, q: 'I ___ this food court since it opened, and I still love it.', opts: ["'ve known", 'know', 'am knowing', 'knew'], a: "'ve known", why: '<i>Since it opened</i> + verbo de estado → <b>present perfect simple</b> (no continuo con <i>know</i>).' },
          { blank: 1, q: 'Right now she ___ a new recipe with eggplant.', opts: ['is trying', 'tries', 'has tried', 'try'], a: 'is trying', why: '<i>Right now</i> → present continuous.' },
          { blank: 1, q: '___ you ever ___ raw tuna?', opts: ['Have / eaten', 'Did / eat', 'Do / eat', 'Were / eating'], a: 'Have / eaten', why: '<i>Ever</i> + experiencia → present perfect.' },
          { blank: 1, q: "She set a goal for herself: to open a second food truck by next year. She's very ___.", opts: ['ambitious', 'polite', 'old-fashioned', 'curious'], a: 'ambitious', why: '<b>Ambitious / ambition</b>: quiere crecer y tener éxito. <i>Set a goal for yourself</i> es de la U1.' },
          { blank: 1, q: 'The team ___ to the challenge and cooked for 300 people last Saturday.', opts: ['rose', 'rise', 'has risen', 'was rising'], a: 'rose', why: '<i>Last Saturday</i> → simple past: <b>rise to a challenge → rose</b>.' },
          { blank: 1, q: "I ___ this ginger tea. It's delicious!", opts: ['love', 'am loving', 'have loved', 'loved'], a: 'love', why: '<b>Love</b> es verbo de estado: no va en continuo.' },
          { blank: 1, q: 'He ___ in his food. Every dish is perfect.', opts: ['takes pride', 'is taking pride', 'has pride on', 'take proud'], a: 'takes pride', why: '<b>Take pride in</b> (con <i>in</i>) y simple present para un hecho general.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>I\'ll</i>, <i>I\'d</i>).',
          sentences: ['Fidget spinners were a fad with young people.', 'Video rental stores are a thing of the past.', 'Podcasts are very trendy now.', 'Round glasses are coming back in style.', 'Printed newspapers are losing popularity.', "If you finish your paper this afternoon, I'll buy us dinner.", "If you're hot, open the window.", "I'll call you as soon as I get home.", 'Rinse the vegetables before you chop them.', 'Can I offer you another slice of pie?', "I'd better not. I've already had seconds.", "She's been running a food truck for two years."] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for details', title: 'Escucha el diálogo y responde', intro: 'Dos amigos hablan de un food court nuevo. Escúchalo entero antes de responder.',
          lines: [['Lucía', "Have you tried the new food court on 28th Street? It's all the rage right now."], ['Mateo', "Not yet. If I finish work early on Friday, I'll go with you."], ['Lucía', "Great. They have plant-based burgers. Everyone says they're the next big thing."], ['Mateo', "Hmm, I'm not sure. I think they're a fad. In two years nobody will remember them."], ['Lucía', "Maybe. But there's also a stand that sells grilled shrimp with pineapple. That's trending on my feed."], ['Mateo', "Now you're talking. Text me as soon as you get there, and I'll meet you at the entrance."], ['Lucía', "Perfect. And if it's too crowded, we'll just go to the old Mexican place."], ['Mateo', 'The one with the paper menus? That place is a thing of the past!']],
          questions: [
            { q: 'When will Mateo go to the food court with Lucía?', opts: ['If he finishes work early on Friday', 'On Saturday morning', 'As soon as he gets home today'], a: 'If he finishes work early on Friday', why: '"If I finish work early on Friday, I\'ll go with you." Condicional real.' },
            { q: 'What does Mateo think about plant-based burgers?', opts: ["They're a fad", "They're the next big thing", "They're coming back in style"], a: "They're a fad", why: '"I think they\'re a fad. In two years nobody will remember them."' },
            { q: 'What should Lucía do when she arrives?', opts: ['Text Mateo', 'Order the shrimp', 'Wait at the Mexican place'], a: 'Text Mateo', why: '"Text me as soon as you get there" — time clause con <i>as soon as</i>.' },
            { q: "What's the plan if the food court is too crowded?", opts: ['Go to the old Mexican place', 'Eat plant-based burgers', 'Come back on Saturday'], a: 'Go to the old Mexican place', why: '"If it\'s too crowded, we\'ll just go to the old Mexican place."' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Describing food trends', task: 'Completa en voz alta estas cinco frases con expresiones de tendencias, según tu opinión, y explica por qué: "Vegan food is…", "Eating meat is…", "Fast food is…", "Food trucks are…", "Cooking with local ingredients is…".', model: 'Modelo: "Vegan food is gaining popularity in Lima because there are more vegan restaurants every year. Fast food is on the way out: people prefer healthier options. Food trucks are all the rage…"', tags: ['gaining popularity', 'on the way out', 'all the rage', 'trendy', 'a fad', 'because', 'the next big thing'] },
          { t: 'Agree or disagree', task: 'Reacciona a tres afirmaciones: "Vegan food is gaining popularity everywhere", "Cooking at home is a thing of the past", "Food trucks are just a fad". Di si estás de acuerdo o no y da una razón.', model: 'Modelo: "I disagree. I think vegan food is trendy only in some communities. In my neighborhood, meat is still all the rage…"', tags: ['i agree', 'i disagree', 'i think', 'only in', 'still', 'because', 'trendy'] },
          { t: 'Food advice', task: 'Da tres consejos sobre comer fuera o cocinar usando condicionales reales: uno con imperativo, uno con will / going to y uno de verdad general (lo que tú haces siempre).', model: 'Modelo: "If you prefer trendy food places, you\'re going to love the Mercado 28 food court. If you have old bananas, make a banana cake. We leave a good tip if the service is good."', tags: ['if you', 'going to', "you'll", "don't", 'make', 'if the', 'always'] },
          { t: 'Three predictions', task: 'Haz tres predicciones sobre "the next big thing" en comida. Usa will / might / be going to y al menos una time clause (when, as soon as, once).', model: 'Modelo: "I think insect protein might be the next big thing. When it becomes cheaper, a lot of people will try it. As soon as a famous chef serves it, it\'ll be trending."', tags: ['next big thing', 'will', 'might', 'going to', 'when', 'as soon as', 'once'] },
          { t: 'How do you cook it?', task: 'Explica cómo preparas un plato sencillo (por ejemplo, un salteado de zapallito con ajo). Usa al menos cuatro verbos de cocina y conecta los pasos con first, after, until, once, as soon as.', model: 'Modelo: "First, rinse the zucchini and chop it into small pieces. Fry some garlic in olive oil until it smells good. Once the garlic is ready, add the zucchini and stir it for five minutes…"', tags: ['rinse', 'chop', 'fry', 'stir', 'boil', 'until', 'once', 'after'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación', title: 'Sílaba tónica de los alimentos', intro: 'Palabras que suelen salir mal por parecerse al español. Escucha y repite.',
          pairs: [['zuc-CHI-ni', 'zucchini'], ['EGG-plant', 'eggplant'], ['PINE-ap-ple', 'pineapple'], ['GAR-lic', 'garlic'], ['GIN-ger', 'ginger'], ['CAB-bage', 'cabbage'], ['shrimp (una sola sílaba)', 'shrimp'], ['TU-na', 'tuna'], ['BAR-be-cue', 'barbecue'], ['po-pu-LA-ri-ty', 'popularity'], ['FASH-ion-a-ble', 'fashionable'], ['old-FASH-ioned', 'old-fashioned']] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'Why does food go in and out of style?', intro: 'Lee una vez para la idea general. Luego responde. Las palabras en negrita se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Ten years ago, kale was all the rage. Every café had a kale salad and a kale smoothie, and magazines called it a superfood. Today you can still buy it, but the <b>craze</b> is over. Kale went from the next big thing to just another vegetable in less than a decade.',
            'Why does this happen? Food trends usually start with a small group: chefs, travelers or people who post pictures of their dinner. If a dish looks good on a screen, it gains popularity fast. Social media <b>speeds up</b> the whole cycle. A plant-based burger or a rainbow bagel can be trending on Monday and forgotten by Friday.',
            'Some trends, however, don\'t disappear. When a food is cheap, healthy and easy to cook, it often becomes a <b>staple</b>: something people eat every week without thinking about it. Rice, beans and garlic were never fashionable, but they have never gone out of style either. Other foods come back: old dishes like cabbage soup and grandmother\'s recipes are coming back in style in modern restaurants.',
            'So what will be the next big thing? Nobody knows for sure. But if you want to make a prediction, look for foods that solve a problem. "Ugly" vegetables, for example, are gaining interest because they reduce waste and cost less. As soon as a trend saves people money or time, it usually <b>sticks around</b> a lot longer than a pretty photo.',
          ],
          main: [
            { q: 'Social media makes food trends appear and disappear faster.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: "Social media speeds up the whole cycle."' },
            { q: 'Kale is an example of a trend that is over.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1 cuenta la historia del kale, de furor a verdura normal.' },
            { q: 'Trends that solve a problem last longer.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: "look for foods that solve a problem… it usually sticks around".' },
            { q: 'Cheap, healthy and easy foods never go out of style.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: rice, beans and garlic "have never gone out of style".' },
          ],
          infer: [
            { q: '<b>craze</b> (paragraph 1)', opts: ['a short period when something is extremely popular', 'a type of salad', 'a health problem'], a: 'a short period when something is extremely popular', why: 'El kale "was all the rage", y ahora el <i>craze</i> "is over" → la fiebre pasó. Sinónimo de <i>fad</i>.' },
            { q: '<b>speeds up</b> (paragraph 2)', opts: ['makes something happen faster', 'stops something completely', 'makes something more expensive'], a: 'makes something happen faster', why: 'Trending on Monday, forgotten by Friday → el ciclo va más <b>rápido</b>.' },
            { q: '<b>staple</b> (paragraph 3)', opts: ['a basic food that people eat regularly', 'a very expensive dish', 'a new restaurant'], a: 'a basic food that people eat regularly', why: 'El texto lo define: "something people eat every week without thinking about it".' },
            { q: '<b>sticks around</b> (paragraph 4)', opts: ['stays for a long time', 'becomes sticky', 'goes out of style quickly'], a: 'stays for a long time', why: 'Se compara con "a pretty photo" que desaparece rápido: la tendencia útil <b>se queda</b>.' },
          ],
          think: '¿Qué comida peruana crees que es un <i>staple</i> que nunca pasará de moda, y cuál es solo un <i>fad</i>? Escribe dos frases: <i>I think … will never go out of style because…</i> / <i>I think … is just a fad because…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Corrige las frases', type: 'fix', eyebrow: 'Error correction', title: 'Reescribe la frase corrigiendo el error', intro: 'Errores típicos de esta unidad (condicionales, time clauses, tendencias, pasiva) y un repaso de la Unit 1. Cada frase tiene 1-2 errores.', items: [
          { bad: 'If it will rain on Sunday, we will eat inside.', good: "If it rains on Sunday, we'll eat inside.", why: 'Nunca <i>will</i> después de <i>if</i>: la condición va en <b>simple present</b>.' },
          { bad: "I'll call you when I will arrive at the market.", good: "I'll call you when I arrive at the market.", why: '<b>Tu error del curso:</b> la time clause (<i>when</i>) va en presente; el futuro ya está en la principal (<i>I\'ll call</i>).' },
          { bad: "When I'll have time, I'm going to cook a curry with ginger.", good: "When I have time, I'm going to cook a curry with ginger.", why: '<i>When</i> + simple present. <i>Going to</i> se queda en la principal.' },
          { bad: 'Vegan food is gaining the popularity in Lima.', good: 'Vegan food is gaining popularity in Lima.', why: '<b>Gain popularity</b> va sin artículo, como <i>gain interest</i>.' },
          { bad: 'Fast food is going out of the style.', good: 'Fast food is going out of style.', why: 'La expresión fija es <b>go out of style</b>, sin <i>the</i>.' },
          { bad: 'These trends can also see in food sales.', good: 'These trends can also be seen in food sales.', why: 'Las tendencias no "ven": son vistas → pasiva <b>can be seen</b>. Es el ejemplo formal del curso.' },
          { bad: "If you are hungry, eating a snack before dinner.", good: "If you're hungry, eat a snack before dinner.", why: 'Consejo → <b>imperativo</b> (<i>eat</i>), no gerundio.' },
          { bad: "Don't fry the shrimp until the oil won't be hot.", good: "Don't fry the shrimp until the oil is hot.", why: '<i>Until</i> + simple present afirmativo. El negativo va en la principal (<i>don\'t fry</i>).' },
          { bad: "I'm knowing this restaurant since 2019 and I'm loving it.", good: "I've known this restaurant since 2019 and I love it.", why: 'Repaso U1: <b>know</b> y <b>love</b> son verbos de estado → nunca en continuo. <i>Since 2019</i> pide present perfect.' },
        ] },
        { label: 'Pásalo a pasiva', type: 'soft', eyebrow: 'Formal tone · passive voice', title: 'Haz la frase más formal para un informe', explain: 'En un informe con resultados de encuesta, la <b>voz pasiva</b> suena más formal y académica: <i>You can also see these trends</i> → <i>These trends <b>can also be seen</b></i>. Reescribe cada frase con <b>be + participio</b> (<i>is preferred, were chosen, can be seen</i>).', pattern: /\b(am|is|are|was|were|be|been|being)\s+(?:\w+\s+)?(seen|eaten|preferred|chosen|sold|made|found|bought|considered|cooked|served|reported|mentioned|ordered|used|liked|grown|prepared|selected|described|named|listed)\b/i, missing: 'Falta la pasiva: <b>be + participio</b> (<i>is preferred, can be seen, were chosen</i>)', items: [
          { h: '"You can also see these trends in food sales."', a: 'These trends can also be seen in food sales.' },
          { h: '"Most people prefer fresh ingredients."', a: 'Fresh ingredients are preferred by most people.' },
          { h: '"Young people chose food trucks as their favorite option."', a: 'Food trucks were chosen by young people as their favorite option.' },
          { h: '"People eat more vegan food in the north than in the south."', a: 'More vegan food is eaten in the north than in the south.' },
          { h: '"Supermarkets sell fewer printed cookbooks every year."', a: 'Fewer printed cookbooks are sold every year.' },
        ] },
        { label: 'Mini-informe', type: 'comment', eyebrow: 'Writing task · report', title: 'Presenta los resultados de una encuesta', intro: 'Imagina que preguntaste a 50 compañeros sobre tendencias de comida. Escribe un informe corto de 70-120 palabras con tono formal. La checklist se marca sola al analizar el texto.', placeholder: 'Fifty people were asked about their eating habits. The results show that…', min: 70, max: 120, need: 4, checks: [
          { label: 'Uso al menos una <b>pasiva</b> para sonar formal (<i>were asked, can be seen, is preferred</i>)', re: /\b(am|is|are|was|were|be|been)\s+(\w+\s+)?(\w+ed|seen|eaten|chosen|sold|made|found|bought|considered|preferred|served|reported|mentioned|asked|shown|given|known|grown)\b/ },
          { label: 'Uso una expresión de tendencias (<i>gaining popularity, on the way out, a thing of the past…</i>)', words: TREND_WORDS },
          { label: 'Incluyo un número o porcentaje (<i>70 percent, 35 out of 50, most of them</i>)', re: /(\d+\s*(%|percent|out of)|\b(half|most|a third|a quarter|two thirds|the majority)\b)/ },
          { label: 'Hago una predicción (<i>will, might, is going to</i>)', re: /\b(will|won't|might|is going to|are going to)\b/ },
          { label: 'Uso un condicional real o una time clause (<i>if, when, as soon as, until, once</i>)', re: /\b(if|when|as soon as|until|once|after)\b/ },
          { label: 'Menciono un alimento o forma de cocinar de la unidad', words: [...FOODS.map(f => f[0]), ...COOK.map(c => c[0])] },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language · offering food', title: 'Las frases, por situación', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Offering food or drink</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Can I offer you another slice of pie?</li><li>Would you like some more…?</li><li>Help yourself to the shrimp.</li><li>Are you sure? There's just a little left.</li></ul></div>
          <div><h3>Declining politely</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I'd better not. I've already had seconds!</li><li>No, thanks. I'm full.</li><li>I couldn't eat another bite.</li></ul></div>
          <div><h3>Accepting</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>OK, then. That'd be wonderful.</li><li>Yes, please. Just a little.</li><li>I'd love some.</li></ul></div>
          <div><h3>Responding as the host / server</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>You got it! I'll be right back with that.</li><li>Coming right up!</li><li>Here you go. Enjoy!</li></ul></div>
          <div class="hint small"><b>seconds</b> = una segunda ración (<i>I've already had seconds</i>). <b>I'd better not</b> = mejor no (rechazo suave). <b>Coming right up!</b> = ¡marchando! <b>You got it!</b> = ¡hecho! / ¡claro que sí!<br><br>Para pedir más: <i>Can I have some more coffee, too?</i> — con <b>some more</b>, no <i>more of</i>.</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ['Host: Would you like some more cabbage soup?', "Guest: I'd better not. I've already had two bowls!", "Host: Are you sure? There's just a little left.", "Guest: OK, then. That'd be wonderful.", "Host: You got it! I'll be right back with that."],
          ['Waiter: Can I offer you another slice of pineapple cake?', "Customer: No, thanks. I'm full.", 'Waiter: No problem. Anything else?', 'Customer: Can I have some more coffee, please?', 'Waiter: Coming right up!'],
          ['Ana: Help yourself to the grilled shrimp.', 'Luis: Thanks! They look amazing.', 'Ana: Do you want some rice with that?', 'Luis: Yes, please. Just a little.', 'Ana: Here you go. Enjoy!'],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', items: [
          { q: 'Te ofrecen más tarta, pero ya repetiste una vez.', opts: ["I'd better not. I've already had seconds!", 'Coming right up!', 'You got it!'], a: "I'd better not. I've already had seconds!", why: 'Rechazo suave + razón: <i>seconds</i> = segunda ración.' },
          { q: 'Eres el anfitrión y tu invitado acepta otra ración.', opts: ["You got it! I'll be right back with that.", "I'd better not.", "That'd be wonderful."], a: "You got it! I'll be right back with that.", why: 'Confirmas y vas a por ello.' },
          { q: 'Tu invitado dice "I\'d better not" y quieres insistir con suavidad.', opts: ["Are you sure? There's just a little left.", 'Coming right up!', "I'm full."], a: "Are you sure? There's just a little left.", why: 'Insistencia educada: queda poco, sin presionar.' },
          { q: 'Al final decides aceptar la última porción.', opts: ["OK, then. That'd be wonderful.", "I've already had seconds.", 'Help yourself.'], a: "OK, then. That'd be wonderful.", why: '<i>OK, then</i> marca que cambias de idea; <i>that\'d be wonderful</i> acepta.' },
          { q: 'Un cliente te pide más café y vas a traerlo.', opts: ['Coming right up!', "I'd better not.", "That'd be wonderful."], a: 'Coming right up!', why: '¡Marchando! Respuesta típica de camarero.' },
          { q: 'Quieres pedir más café de forma educada.', opts: ['Can I have some more coffee, too?', 'Give me coffee.', 'Coffee, coming right up!'], a: 'Can I have some more coffee, too?', why: '<i>Can I have some more…?</i> es la fórmula educada. La otra es una orden.' },
        ] },
      ] },
    ],
  };
})();
