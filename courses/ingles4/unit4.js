/* ===========================================================
   ingles4/unit4.js — Inglés 4 · Unit 4: Famous faces
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Vocabulario base ---------- */
  /* Lesson 1 · Talking about advertising: [palabra, def ES, def EN corta, ejemplo, pregunta] */
  const ADV = [
    ['ad / advertisement', 'anuncio (n.): imagen, video corto, canción… que intenta persuadir a la gente de comprar algo', 'a picture, short film or song that tries to persuade people to buy something', 'Times Square in New York City is full of large ads for a variety of things, like electronics, jewelry, food, and TV shows.', '¿Qué anuncio recuerdas de tu infancia?'],
    ['advertise', 'anunciar, hacer publicidad (v.): informar sobre un producto o servicio (en TV, internet, prensa) para que la gente lo compre', 'inform people about a product or service so that they will buy it', 'My cousin is a fashion designer with her own online store. She advertises her clothes by posting videos online.', '¿Cómo anuncias tus empanadas: redes, boca a boca, volantes?'],
    ['brand', 'marca (n.): producto hecho por una empresa concreta', 'a product that is made by a particular company', "There are so many different brands of laptops – Apple, Chromebook, Dell. What's the difference?", '¿Eres fiel a alguna marca? ¿Cuál y por qué?'],
    ['commercial', 'anuncio de radio o televisión (n.)', 'an advertisement on the radio or television', "I love watching sports, but I hate sitting through all the TV commercials. They're too long, and I usually don't care about the things they're advertising.", '¿Ves los comerciales o cambias de canal?'],
    ['fashion statement', 'declaración de estilo (n.): ropa o algo que posees y usas para llamar la atención y mostrar qué tipo de persona eres', 'clothes or something you own that you use to attract attention and show what type of person you are', 'Alyssa dyed her hair blue right before graduation. I think she was making a fashion statement. She wanted to look different and adventurous.', '¿Has hecho alguna vez una "fashion statement"? ¿Cuál?'],
    ['logo', 'logotipo (n.): diseño o símbolo que usa una empresa para anunciar sus productos', 'a design or symbol used by a company to advertise its products', 'We have a new logo for our web design company. What do you think? — I like it. It makes the company look modern and professional.', '¿Qué logo reconocerías sin leer el nombre de la marca?'],
    ['merchandise', 'mercancía, artículos (n.): productos que se comercian o venden en tiendas', 'products that are traded or sold in stores', "Our store's merchandise changes with each season. For the fall, we have some new styles of jeans and sweaters.", '¿Qué mercancía vende la tienda de repuestos? Descríbela en inglés.'],
    ['merchandising', 'merchandising (n.): venta de productos relacionados con equipos deportivos, películas, series o famosos', 'the selling of products related to sports teams, movies, TV programs and famous people', "Many colleges make a good profit from merchandising. They sell a variety of clothing with the colors and logos of the school's sports teams.", '¿Has comprado merchandising de un equipo o una película?'],
    ['product', 'producto (n.): algo que se fabrica o cultiva para venderse', 'something that is made or grown to be sold', 'I like our local grocery store. They have a good variety of products and the prices are good.', '¿Cuál es el producto estrella de tu negocio?'],
    ['slogan', 'eslogan (n.): frase corta y fácil de recordar que se usa para que la gente se fije en algo', 'a short phrase that is easy to remember, used to make people notice something', 'Many companies use slogans in their ads. The slogans help customers notice and remember the products.', '¿Qué eslogan inventarías para Empanadas Consentida?'],
    ['sponsor', 'patrocinador (n.) / patrocinar (v.): dar dinero para apoyar una actividad, evento u organización, a veces como forma de publicidad', 'a person or company that gives money to support an event or activity; give that money (v.)', 'The football game is sponsored by a lot of companies, including an airline and a travel agency.', '¿Patrocinarías un evento de tu barrio con tu negocio? ¿Cuál?'],
    ['status symbol', 'símbolo de estatus (n.): algo que posees y que muestra que tienes una posición alta en la sociedad', 'something someone owns that shows they have a high position in society', "My cousin bought an expensive sports car. I think it's a status symbol for him. He wants other people to know that he has a lot of money.", '¿Cuál es el símbolo de estatus más común en Lima?'],
  ];
  /* Lesson 2 · Talking about people in the media (errata del PDF corregida: model ↔ movie producer) */
  const MEDIA = [
    ['audience', 'público (n.): la gente que se sienta a ver una función en un teatro, un cine, etc.', 'the people who watch a performance at a theater, a movie, etc.', 'We saw a great play at the theater. There was a big audience, and the people loved the show. Everyone was laughing and clapping.', '¿Te pone nervioso hablar delante de un público?'],
    ['celebrity', 'famoso/a, celebridad (n.)', 'a famous person', 'My friend is a reporter. She often goes to red-carpet events to speak to celebrities, such as famous actors and singers.', '¿A qué celebridad te gustaría conocer?'],
    ['comedian', 'comediante, humorista (n.): entretiene a la gente contando chistes', 'someone who entertains people by telling jokes', 'The comedian we saw tonight was pretty good. He told a lot of jokes about living in New York City.', '¿Quién es tu comediante favorito?'],
    ['designer', 'diseñador/a (n.): dibuja y planifica cómo se va a hacer algo', 'someone who draws and plans how something will be made', 'My friend Lara is a well-known fashion designer. Her clothes are sold in stores across the country.', '¿Trabajas con algún diseñador en tus proyectos?'],
    ['DJ', 'DJ (n.): abreviatura de "disk jockey"; pone música en la radio, en discotecas o en fiestas', 'someone who plays music on the radio or at dance clubs and parties', "I went to a dance club with my friends last night. The DJ was really good. He played everyone's favorite dance songs.", '¿Qué canción le pedirías a un DJ en una fiesta?'],
    ['entertainer', 'artista, animador/a (n.): su trabajo es cantar, contar chistes, etc. para que el público lo pase bien', 'someone whose job is to sing, tell jokes, etc. so that an audience has an enjoyable time', 'My friend Sharon is a great entertainer. She sings and tells jokes at a local bar. The audience loves her.', '¿Conoces a alguien que sea un "entertainer" nato?'],
    ['filmmaker', 'cineasta (n.): hace películas para el cine o la televisión', 'someone who makes films for movies or television', "My cousin Paul is a filmmaker. He's currently in Canada filming a movie.", '¿Qué cineasta peruano o latino conoces?'],
    ['hero', 'héroe (n.): hace algo valiente o bueno por lo que la gente lo respeta o admira', 'someone who does something brave or good that people admire them for', 'Firefighters are true heroes. They risk their own lives to save others from fires.', '¿Quién es un héroe para ti y por qué?'],
    ['icon', 'icono (n.): persona o cosa famosa porque representa una idea o un estilo de vida', 'a person or thing that is famous because it represents a particular idea or way of life', 'That tennis player has really become an icon. Lots of people admire her and want to know more about her life.', '¿Qué persona es un icono en Perú?'],
    ['model', 'modelo (n.): su trabajo es llevar ropa de moda, salir en fotos, etc. para anunciar cosas', 'someone whose job is to wear fashionable clothes and be in photographs to advertise things', 'My friend Katrina is a model. She has been in some magazines advertising clothes.', '¿Crees que un modelo famoso vende realmente más ropa?'],
    ['movie producer', 'productor/a de cine (n.): controla cómo se hace una película (elige al equipo, gestiona el presupuesto)', 'someone who controls how a movie is made: chooses the people and manages the budget', 'Movie producers are often responsible for choosing the people involved with a movie and managing the budget.', '¿Preferirías ser productor o director de una película?'],
    ['performer', 'artista, intérprete (n.): alguien que entretiene a la gente actuando en directo (canta, baila, toca…)', 'someone who entertains people on stage', 'We went to see a great rock band yesterday. The lead singer is a great performer. He sings, dances, and plays guitar. He has a lot of energy and gets everyone excited!', '¿Qué "performer" te ha impresionado en directo?'],
  ];
  const ALL = [...ADV, ...MEDIA];
  const findW = k => ALL.find(x => x[0] === k);

  /* situación → palabra: [frase con hueco, respuesta, clave en ADV/MEDIA, palabras que NO sirven como distractor] */
  const SIT = [
    ['Every time I watch a match on TV, the same ___ for a soda comes on during the break.', 'commercial', 'commercial', ['ad']],
    ['The company printed its new ___ on every bag, cup and T-shirt so people would recognize it.', 'logo', 'logo', ['slogan']],
    ['"Just do it" is probably the most famous ___ in the world.', 'slogan', 'slogan', []],
    ["A local bank decided to ___ the marathon, so its name was on all the runners' shirts.", 'sponsor', 'sponsor', ['advertise']],
    ["He bought a gold watch he never wears. For him, it's a ___, not a tool.", 'status symbol', 'status symbol', ['fashion statement']],
    ['She wore a bright green suit to the office party. It was a real ___.', 'fashion statement', 'fashion statement', ['status symbol']],
    ['The football club makes millions from ___: shirts, mugs, posters, even bedsheets.', 'merchandising', 'merchandising', ['merchandise']],
    ["We need to ___ the new empanada flavor. Nobody knows it exists yet!", 'advertise', 'advertise', ['sponsor']],
    ['Which ___ of running shoes do you prefer: Nike, Adidas or a cheaper one?', 'brand', 'brand', []],
    ['The store received new ___ this morning: winter coats and boots.', 'merchandise', 'merchandise', ['merchandising', 'product']],
    ['The pop-up ___ on the website was so annoying that I closed the page.', 'ad', 'ad / advertisement', ['commercial']],
    ['This cream is our best-selling ___. We sell 200 units a week.', 'product', 'product', ['brand']],
    ['The ___ laughed at every joke and gave the comedian a standing ovation.', 'audience', 'audience', []],
    ['She started as a ___, posing for clothing catalogs, and later became an actress.', 'model', 'model', []],
    ['The ___ chose the director, hired the actors and controlled the budget.', 'movie producer', 'movie producer', ['filmmaker']],
    ["He plays music at weddings and clubs every weekend. He's a great ___.", 'DJ', 'DJ', []],
    ['The nurse who saved three children from the fire was called a ___ by the newspapers.', 'hero', 'hero', ['icon']],
    ['Frida Kahlo is more than a painter; she has become a cultural ___.', 'icon', 'icon', ['hero', 'celebrity']],
    ['The ___ told jokes about traffic in Lima and everybody laughed.', 'comedian', 'comedian', []],
    ['My sister is a graphic ___. She plans how the app will look before we build it.', 'designer', 'designer', []],
    ['He is a ___ – his last documentary was shown at three festivals.', 'filmmaker', 'filmmaker', ['movie producer']],
    ['Photographers wait outside the hotel because a ___ is staying there.', 'celebrity', 'celebrity', ['icon', 'model']],
  ];
  const SITW = SIT.map(s => s[1]);

  /* ¿se puede omitir el pronombre? — opciones fijas */
  const OM = ['Sí: es objeto (le sigue sujeto + verbo)', 'No: es sujeto (le sigue un verbo)', 'No: es where (lugar)'];
  const OMIT = [
    ['The comedian <b>who</b> performed last night was great.', 1, '<i>who</i> + <b>performed</b> (verbo) → sujeto. No se omite.'],
    ['The ad <b>that</b> we saw yesterday was funny.', 0, '<i>that</i> + <b>we saw</b> (sujeto + verbo) → objeto. "The ad we saw yesterday…"'],
    ['Here are the photos <b>which</b> the model sent.', 0, '<i>which</i> + <b>the model sent</b> → objeto. "The photos the model sent."'],
    ['I know a DJ <b>who</b> plays only 80s music.', 1, '<i>who</i> + <b>plays</b> → sujeto.'],
    ['The slogan <b>that</b> the agency wrote is too long.', 0, '<i>that</i> + <b>the agency wrote</b> → objeto. "The slogan the agency wrote."'],
    ['This is the club <b>where</b> we met.', 2, '<i>where</i> = lugar (<i>in which</i>). Aquí no se quita.'],
    ['The products <b>which</b> sell best are the cheapest.', 1, '<i>which</i> + <b>sell</b> → sujeto.'],
    ['The celebrity <b>who</b> I saw at the airport was very short.', 0, '<i>who</i> + <b>I saw</b> → objeto. "The celebrity I saw at the airport."'],
    ['The sponsor <b>that</b> pays the most gets the biggest logo.', 1, '<i>that</i> + <b>pays</b> → sujeto.'],
    ['The movie <b>which</b> the producer chose was a hit.', 0, '<i>which</i> + <b>the producer chose</b> → objeto.'],
    ['She is the designer <b>who</b> everybody wants to work with.', 0, '<i>who</i> + <b>everybody wants</b> → objeto. "The designer everybody wants to work with."'],
    ['The brand <b>that</b> my parents trust is 100 years old.', 0, '<i>that</i> + <b>my parents trust</b> → objeto.'],
    ["That's the studio <b>where</b> they record the show.", 2, '<i>where</i> + sujeto + verbo, pero es un lugar: no se omite.'],
    ['People <b>who</b> buy status symbols want attention.', 1, '<i>who</i> + <b>buy</b> → sujeto.'],
    ['The hero <b>that</b> the newspapers described is a nurse.', 0, '<i>that</i> + <b>the newspapers described</b> → objeto.'],
    ['The commercial <b>which</b> made me cry was about a dog.', 1, '<i>which</i> + <b>made</b> → sujeto.'],
    ['Merchandise <b>that</b> fans buy online is often fake.', 0, '<i>that</i> + <b>fans buy</b> → objeto. "Merchandise fans buy online…"'],
    ['The audience <b>that</b> attended the premiere loved it.', 1, '<i>that</i> + <b>attended</b> → sujeto.'],
  ];

  window.UNIT_DATA['ingles4/unit4'] = {
    source: 'Evolve · Unit 4 · Famous faces',
    description: 'Publicidad y gente de los medios: especular con must / might / can\'t, oraciones de relativo de sujeto y objeto, y cómo intercambiar y defender opiniones con énfasis.',
    cando: [
      "Especular sobre una foto o una situación con <i>must / might / may / could / can't</i> (y nunca <i>can</i>)",
      "Describir personas y cosas con relative clauses (<i>the designer who…</i>, <i>the ad that…</i>) y omitir el pronombre cuando se puede",
      "Hablar de publicidad y marcas: <i>brand, commercial, slogan, sponsor, status symbol, fashion statement</i>",
      "Nombrar a la gente de los medios: <i>celebrity, comedian, filmmaker, performer, audience</i>",
      "Dar y discutir opiniones con énfasis: <i>As I see it…</i> · <i>That's a good point, but…</i> · <i>I couldn't disagree more</i>",
    ],
    map: [
      ['Vocabulary', '12 palabras de publicidad (<i>ad, brand, commercial, logo, slogan, sponsor, status symbol…</i>) y 12 de gente de los medios (<i>celebrity, comedian, icon, model, movie producer, performer…</i>)', 'Flashcards con audio, emparejar con definiciones, situación → palabra, ¿sustantivo o verbo?'],
      ['Grammar', 'Modales de especulación (<b>must</b> · <b>might / may / could</b> · <b>can\'t / must not</b>; nunca <i>can</i>); oraciones de relativo de sujeto y objeto con <b>who / which / that / where</b>, y cuándo se omite el pronombre', 'Elige el modal según la certeza, elige el pronombre, ¿se puede omitir?, repaso de las Units 1-3'],
      ['Listening', 'Especulación sobre fotos, conversaciones sobre famosos y anuncios', 'Dictado con voz sintética y un diálogo nuevo sobre un comercial con preguntas'],
      ['Speaking', 'Especular sobre una imagen, describir a un icono, opinar sobre publicidad; contracciones y sílaba tónica', 'Retos con cronómetro y reconocimiento de voz; <i>must be, can\'t be</i>, ADvertise / adverTISEment, coMEdian…'],
      ['Reading', 'Marcas, logos y famosos', 'Texto nuevo: por qué las marcas pagan a celebridades + inferir significado'],
      ['Writing', 'Texto de opinión: opinión → razón → ejemplo → concesión → cierre', 'Corrige errores típicos (<i>can</i> para especular, <i>which</i> con personas, <i>what</i> como relativo), reescribe con frases de opinión, escribe tu opinión con checklist'],
      ['Social English', '<i>As I see it · I find it… · It\'s not so much that… · But the thing is · Now, just a second · That\'s a good point, but · I couldn\'t disagree more · You have it all wrong</i>', 'Ordenar diálogos, respuesta rápida'],
    ],

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo del curso y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...ADV.map(t => ({ cat: 'Talking about advertising', w: t[0], say: t[0].replace(' / ', ', '), def: t[1], ex: t[3], ask: t[4] })),
            ...MEDIA.map(m => ({ cat: 'Talking about people in the media', w: m[0], say: m[0] === 'DJ' ? 'D J' : m[0], def: m[1], ex: m[3], ask: m[4] })),
          ] },
        { label: 'Palabra ↔ Definición', type: 'match', eyebrow: 'Advertising · People in the media', title: 'Empareja la palabra con su definición', intro: 'Toca una palabra de la izquierda y luego su definición (en inglés, como en el curso) a la derecha.',
          pairs: [
            ...ADV.map(t => [t[0], t[2]]),
            ...MEDIA.filter(m => m[0] !== 'performer').map(m => [m[0], m[2]]),
          ], round: 6 },
        { label: '¿Qué palabra es?', type: 'mcq', eyebrow: 'En contexto', title: 'Lee la situación y elige la palabra', intro: 'Publicidad y gente de los medios mezcladas. Fíjate en las pistas de la frase.', pool: 8,
          build: ({ pick, esc }) => pick(SIT, 8).map(s => { const t = findW(s[2]); const bad = SITW.filter(x => x !== s[1] && !s[3].includes(x)); return { q: esc(s[0]).replace('___', '<span class="blank">?</span>'), opts: [s[1], ...pick(bad, 3)], a: s[1], why: `<b>${t[0]}</b> — ${t[1]}. “${t[3]}”` }; }) },
        { label: '¿Sustantivo o verbo?', type: 'mcq', eyebrow: 'Word families', title: 'Elige la forma correcta', intro: '<b>advertise</b> (v.) / <b>advertisement</b> (n.), <b>sponsor</b> (n. y v.), <b>merchandise</b> (n., los productos) / <b>merchandising</b> (n., la actividad de venderlos) y <b>brand</b> (n. y v.).', pool: 8, items: [
          { blank: 1, q: 'We need to ___ our new flavor on Instagram.', opts: ['advertise', 'advertisement', 'advertising', 'ads'], a: 'advertise', why: 'Detrás de <i>need to</i> va un verbo: <b>advertise</b>.' },
          { blank: 1, q: 'That ___ for the perfume was shot in Paris.', opts: ['advertisement', 'advertise', 'advertised', 'advertises'], a: 'advertisement', why: 'Detrás de <i>that</i> y delante de <i>for</i> va un sustantivo: <b>advertisement</b> (o <i>ad</i>).' },
          { blank: 1, q: 'A local airline ___ the tournament last year.', opts: ['sponsored', 'sponsorship', 'sponsor', 'sponsors'], a: 'sponsored', why: 'Verbo en pasado (<i>last year</i>): <b>sponsored</b>.' },
          { blank: 1, q: 'Coca-Cola was the main ___ of the World Cup.', opts: ['sponsor', 'sponsored', 'sponsoring', 'sponsors'], a: 'sponsor', why: '<i>the main</i> + sustantivo singular: <b>sponsor</b> = patrocinador.' },
          { blank: 1, q: 'The shop sells ___ for the local football team: scarves, hats, shirts.', opts: ['merchandise', 'merchandising', 'merchant', 'merchandises'], a: 'merchandise', why: '<b>merchandise</b> = los productos en sí (no contable, sin -s). <i>Merchandising</i> es la actividad.' },
          { blank: 1, q: 'For Disney, ___ – selling toys, clothes and games related to its films – is a huge business.', opts: ['merchandising', 'merchandise', 'a merchandise', 'merchandised'], a: 'merchandising', why: '<b>merchandising</b> = la venta de productos relacionados con películas, equipos, etc.' },
          { blank: 1, q: 'Which ___ of phone do you have?', opts: ['brand', 'branded', 'branding', 'brands'], a: 'brand', why: '<i>Which</i> + sustantivo singular: <b>brand</b>.' },
          { blank: 1, q: 'Last year the company ___ its new line of shoes "Urban Feet".', opts: ['branded', 'brand', 'brands', 'branding'], a: 'branded', why: '<b>brand</b> también es verbo: ponerle marca/nombre a algo. Pasado: <i>branded</i>.' },
          { q: '"They <b>advertise</b> on TV and online." → <i>advertise</i> es…', opts: ['verbo', 'sustantivo'], a: 'verbo', why: '<i>They advertise</i>: sujeto + verbo.' },
          { q: '"I saw an <b>advertisement</b> for your empanadas." → <i>advertisement</i> es…', opts: ['sustantivo', 'verbo'], a: 'sustantivo', why: '<i>an advertisement</i>: artículo + sustantivo.' },
          { q: '"The event has three <b>sponsors</b>." → <i>sponsors</i> es…', opts: ['sustantivo', 'verbo'], a: 'sustantivo', why: '<i>three sponsors</i>: número + sustantivo plural.' },
          { q: '"Who <b>sponsors</b> the team?" → <i>sponsors</i> es…', opts: ['verbo', 'sustantivo'], a: 'verbo', why: '<i>Who sponsors</i>: pregunta con verbo en 3.ª persona.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Modals of speculation · Relative clauses', title: 'Las dos reglas de la unidad', html: `
          <h3>1 · Modales de especulación</h3>
          <p style="margin:8px 0 14px">Especular = decir lo que <b>crees</b> que es verdad sin saberlo seguro. El modal dice <b>cuán seguro estás</b>. Estructura: modal + <b>be</b> (o verbo base).</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Grado de certeza</th><th>Modal</th><th>Ejemplo del curso</th><th>Trampa</th></tr></thead><tbody>
            <tr><td><b>Seguro de que es verdad</b> (hay pruebas)</td><td><b>must</b></td><td>It <b>must be</b> very expensive.<br>The people who do it <b>must be</b> very fit.</td><td>NUNCA <i>can</i> para especular: <s>It can be expensive</s>. Tampoco <s>must to be</s>.</td></tr>
            <tr><td><b>No estás seguro</b> (posible)</td><td><b>might</b> / <b>may</b> / <b>could</b></td><td>That <b>might be</b> worth a lot of money.<br>It <b>could be</b> dangerous.<br>It <b>may be</b> too difficult for me.</td><td><i>could</i> aquí NO es pasado. <i>may be</i> (dos palabras) ≠ <i>maybe</i> (adverbio).</td></tr>
            <tr><td><b>Seguro de que NO es verdad</b></td><td><b>can't</b> / <b>must not</b></td><td>It <b>can't be</b> that dangerous. So many people do it.<br>They <b>must not be</b> very good, they're always losing!</td><td><s>can't to be</s>. El opuesto de <i>must be</i> es <b>can't be</b>, no <i>mustn't</i> (prohibición).</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Regla de oro:</b> pruebas claras → <b>must</b> / <b>can't</b>; solo una posibilidad → <b>might / may / could</b>. <i>Can</i> sirve para habilidad y permiso, no para adivinar.</div>
          <h3 style="margin-top:22px">2 · Oraciones de relativo: sujeto y objeto</h3>
          <p style="margin:8px 0 14px">Dan información extra sobre personas, cosas o lugares. Empiezan con <b>who</b> (personas), <b>which</b> (cosas), <b>that</b> (personas y cosas) o <b>where</b> (lugares).</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Tipo</th><th>Qué va después del pronombre</th><th>Ejemplo del curso</th><th>¿Se puede omitir?</th></tr></thead><tbody>
            <tr><td><b>Sujeto</b></td><td>un <b>verbo</b> (el pronombre ES el sujeto)</td><td>There is a millionaire <b>who travels</b> all over the world.<br>He is getting into a car <b>which will take</b> him to the airport.</td><td><b>NO.</b> <s>There is a millionaire travels</s>. Y no repitas el sujeto: <s>who he travels</s>.</td></tr>
            <tr><td><b>Objeto</b></td><td>un <b>sustantivo o pronombre</b> + verbo</td><td>There was a mechanical problem <b>which no one noticed</b>.<br>They have all the facts <b>(that) you need</b>.</td><td><b>SÍ.</b> "They have all the facts you need."</td></tr>
            <tr><td><b>where</b> (lugar)</td><td>sujeto + verbo</td><td>The club <b>where we met</b> closed last year.</td><td>No lo quites. <i>where</i> = <i>in which</i>; no uses <i>which</i> sin preposición: <s>the club which we met</s>.</td></tr>
          </tbody></table></div>
          <div class="hint small" style="margin-top:12px"><b>Trampas típicas:</b> <s>the man which</s> → <b>who</b> · <s>the book what I read</s> → <b>that / which / –</b> (<i>what</i> nunca es relativo) · <s>the people who they work</s> → <b>who work</b>.</div>` },
        { label: 'must, might o can\'t', type: 'mcq', eyebrow: 'Modals of speculation', title: 'Elige el modal según la certeza', intro: 'Lee la pista entre paréntesis: <i>sure</i> (seguro de que sí), <i>not sure</i> (posible), <i>sure it\'s not true</i> (seguro de que no). Ojo con <i>can</i>.', pool: 8, items: [
          { blank: 1, q: 'She has three houses and a yacht. She ___ be very rich. (sure)', opts: ['must', "can't", 'might', 'can'], a: 'must', why: 'Pruebas claras → <b>must</b>. <i>Can</i> nunca especula.' },
          { blank: 1, q: 'The lights are off. They ___ be at home. (sure it\'s not true)', opts: ["can't", 'must', 'may', 'could'], a: "can't", why: 'Seguro de que NO → <b>can\'t</b>.' },
          { blank: 1, q: "I don't know who that actor is. He ___ be new. (not sure)", opts: ['might', 'must', "can't", 'can'], a: 'might', why: 'Solo una posibilidad → <b>might / may / could</b>.' },
          { blank: 1, q: 'That ad cost millions. The company ___ be making a lot of money. (sure)', opts: ['must', 'can', 'might', "can't"], a: 'must', why: 'Deducción con pruebas → <b>must</b> + be + -ing.' },
          { blank: 1, q: "He's a comedian, but nobody laughs. He ___ be very funny. (sure it's not true)", opts: ['must not', 'must', 'might', 'can'], a: 'must not', why: 'Seguro de que NO → <b>must not</b> o <i>can\'t</i>. Frase del curso: "They must not be very good, they\'re always losing!"' },
          { blank: 1, q: "This bag has a designer logo, but it only costs $10. It ___ be real. (sure it's not true)", opts: ["can't", 'must', 'could', 'can'], a: "can't", why: '$10 con logo de diseñador → <b>can\'t be</b> real.' },
          { blank: 1, q: 'The DJ has 2 million followers. He ___ be popular. (sure)', opts: ['must', 'can', 'might', "can't"], a: 'must', why: '2 millones de seguidores son pruebas → <b>must</b>.' },
          { blank: 1, q: "I'm not sure, but that ___ be the model from the perfume commercial. (not sure)", opts: ['could', 'must', "can't", 'can'], a: 'could', why: '<i>I\'m not sure</i> → <b>could / might / may</b>.' },
          { blank: 1, q: "The tickets are still available. The show ___ be very popular. (sure it's not true)", opts: ["can't", 'must', 'may', 'can'], a: "can't", why: 'Si hay entradas, seguro que no es popular → <b>can\'t</b>.' },
          { blank: 1, q: 'She wears a different brand every day. She ___ be sponsored by several companies. (not sure)', opts: ['may', 'must', "can't", 'can'], a: 'may', why: 'Posibilidad → <b>may</b>.' },
          { blank: 1, q: 'The audience is standing and clapping. They ___ love the performer. (sure)', opts: ['must', 'might', "can't", 'can'], a: 'must', why: 'Pruebas claras → <b>must</b> + verbo base (<i>love</i>).' },
          { blank: 1, q: 'It ___ be expensive – look at that price tag! (sure)', opts: ['must', 'can', 'might', "can't"], a: 'must', why: 'Error típico: <s>It can be expensive</s>. Para especular con seguridad: <b>must</b>.' },
          { blank: 1, q: '"Is that Shakira in the café?" "It ___ be. She\'s on tour in Europe." (sure it\'s not true)', opts: ["can't", 'must', 'might', 'can'], a: "can't", why: 'Está de gira en Europa → <b>can\'t be</b>.' },
          { blank: 1, q: 'The slogan is in Portuguese. The ad ___ be for the Brazilian market. (not sure)', opts: ['might', 'must', "can't", 'can'], a: 'might', why: 'Es una hipótesis → <b>might</b>.' },
          { blank: 1, q: 'He never watches TV, so he ___ know that commercial. (sure it\'s not true)', opts: ["can't", 'must', 'may', 'can'], a: "can't", why: 'Nunca ve TV → <b>can\'t know</b>.' },
          { blank: 1, q: "They've been filming all day. The actors ___ be exhausted. (sure)", opts: ['must', 'can', 'could', "can't"], a: 'must', why: 'Todo el día grabando → <b>must be</b> exhausted.' },
          { blank: 1, q: 'That watch ___ very expensive. It has diamonds.', opts: ['must be', 'must to be', 'must is', 'must being'], a: 'must be', why: 'Modal + verbo base: <b>must be</b>. Nunca <s>must to be</s>.' },
          { blank: 1, q: 'That ___ true. I saw it with my own eyes!', opts: ["can't be", "can't to be", "can't is", "doesn't can be"], a: "can't be", why: '<b>can\'t be</b>. Nunca <s>can\'t to be</s>.' },
        ] },
        { label: 'who, which, that o where', type: 'mcq', eyebrow: 'Relative pronouns', title: 'Elige el pronombre relativo', intro: '<b>who</b> = personas · <b>which</b> = cosas · <b>that</b> = ambos · <b>where</b> = lugares. <i>What</i> nunca.', pool: 8, items: [
          { blank: 1, q: 'The comedian ___ performed last night was hilarious.', opts: ['who', 'which', 'where', 'what'], a: 'who', why: 'Persona → <b>who</b> (o <i>that</i>).' },
          { blank: 1, q: 'This is the logo ___ our designer created.', opts: ['which', 'who', 'where', 'what'], a: 'which', why: 'Cosa → <b>which</b> (o <i>that</i>). Es de objeto: podría omitirse.' },
          { blank: 1, q: "That's the studio ___ they film the show.", opts: ['where', 'which', 'who', 'what'], a: 'where', why: 'Lugar + sujeto + verbo → <b>where</b>.' },
          { blank: 1, q: 'The slogan ___ they chose is easy to remember.', opts: ['that', 'who', 'where', 'what'], a: 'that', why: 'Cosa → <b>that</b> (o <i>which</i>). <i>What</i> no es relativo.' },
          { blank: 1, q: "She's the model ___ appears in the perfume ad.", opts: ['who', 'which', 'where', 'what'], a: 'who', why: 'Persona → <b>who</b>.' },
          { blank: 1, q: "I don't like commercials ___ interrupt the movie every ten minutes.", opts: ['that', 'who', 'where', 'what'], a: 'that', why: 'Cosa → <b>that</b> / <i>which</i>.' },
          { blank: 1, q: 'The city ___ the film was made is in Colombia.', opts: ['where', 'which', 'who', 'what'], a: 'where', why: 'Lugar → <b>where</b>. <s>The city which the film was made</s> necesitaría <i>in</i>.' },
          { blank: 1, q: 'The airline ___ sponsored the concert is famous for its ads.', opts: ['which', 'who', 'where', 'what'], a: 'which', why: 'Una empresa es una cosa → <b>which</b> / <i>that</i>.' },
          { blank: 1, q: 'The company ___ my brother works for makes sports shoes.', opts: ['which', 'who', 'where', 'what'], a: 'which', why: 'Cosa, de objeto → <b>which</b> / <i>that</i> / –.' },
          { blank: 1, q: 'The store ___ I bought this T-shirt sells a lot of merchandise.', opts: ['where', 'which', 'who', 'that'], a: 'where', why: 'Lugar + <i>I bought</i> → <b>where</b>. Con <i>which</i> haría falta <i>in</i>.' },
          { blank: 1, q: 'Do you know the DJ ___ is playing tonight?', opts: ['who', 'which', 'where', 'what'], a: 'who', why: 'Persona → <b>who</b>.' },
          { blank: 1, q: 'The products ___ they advertise on TV are usually expensive.', opts: ['that', 'who', 'where', 'what'], a: 'that', why: 'Cosa → <b>that</b> / <i>which</i>.' },
          { blank: 1, q: 'The hero ___ saved the children is only 19.', opts: ['who', 'which', 'where', 'what'], a: 'who', why: 'Persona → <b>who</b>. <s>The hero which</s>.' },
          { blank: 1, q: 'The ad ___ made me laugh was for a bank.', opts: ['which', 'who', 'where', 'what'], a: 'which', why: 'Cosa → <b>which</b> / <i>that</i>.' },
          { blank: 1, q: 'The theater ___ we saw the play has 2,000 seats.', opts: ['where', 'which', 'who', 'what'], a: 'where', why: 'Lugar → <b>where</b>.' },
          { blank: 1, q: 'The people ___ work in advertising are very creative.', opts: ['who', 'which', 'where', 'what'], a: 'who', why: 'Personas → <b>who</b>. Y sin repetir el sujeto: <s>who they work</s>.' },
          { blank: 1, q: 'A status symbol is something ___ shows you have money.', opts: ['that', 'who', 'where', 'what'], a: 'that', why: '<i>something</i> → <b>that</b> / <i>which</i>.' },
          { blank: 1, q: 'The book ___ I read was about famous icons.', opts: ['that', 'what', 'who', 'where'], a: 'that', why: 'Error típico: <s>the book what I read</s>. <b>that / which</b> o nada.' },
          { blank: 1, q: 'The man ___ lives next door is a movie producer.', opts: ['who', 'which', 'what', 'where'], a: 'who', why: 'Error típico: <s>the man which</s>. Persona → <b>who</b>.' },
        ] },
        { label: '¿Se puede omitir?', type: 'mcq', eyebrow: 'Subject vs object relative clauses', title: '¿Se puede quitar el pronombre en negrita?', intro: 'Mira lo que viene <b>justo después</b> del pronombre: si es un verbo, es sujeto (no se omite); si es un sustantivo o pronombre, es objeto (se puede omitir).', pool: 8,
          items: OMIT.map(o => ({ q: o[0], opts: OM, a: OM[o[1]], why: o[2] })) },
        { label: 'Repaso Units 1-3', type: 'mcq', eyebrow: 'Repaso espaciado', title: 'Units 1-3 con vocabulario de la Unit 4', intro: 'Simple vs continuous, present perfect, condicionales reales y time clauses, <i>too / enough</i> y comparaciones modificadas.', items: [
          { blank: 1, q: "Right now the model ___ for a new campaign, so she can't answer the phone.", opts: ['is posing', 'poses', 'posed', 'has posed'], a: 'is posing', why: '<i>Right now</i> → present continuous (Unit 1).' },
          { blank: 1, q: 'I ___ this brand since I was a teenager.', opts: ["'ve trusted", 'trust', 'am trusting', 'trusted'], a: "'ve trusted", why: '<i>since</i> + momento pasado hasta hoy → present perfect (Unit 1).' },
          { blank: 1, q: 'If the commercial ___ popular, the company will make a second one.', opts: ['is', 'will be', 'would be', 'is going to be'], a: 'is', why: 'Condicional real: <i>if</i> + presente → <i>will</i> (Unit 2).' },
          { blank: 1, q: "We'll launch the new slogan as soon as the designer ___ the logo.", opts: ['finishes', 'will finish', 'finished', 'is going to finish'], a: 'finishes', why: 'Time clause con <i>as soon as</i>: presente en la subordinada (Unit 2). Tu error de la Unit 2.' },
          { blank: 1, q: 'The ad is ___ long. Nobody watches it to the end.', opts: ['too', 'enough', 'too much', 'too many'], a: 'too', why: '<b>too</b> + adjetivo (Unit 3). <i>Too much</i> solo con sustantivos.' },
          { blank: 1, q: "This celebrity isn't famous ___ to sell a perfume.", opts: ['enough', 'too', 'very', 'much'], a: 'enough', why: 'adjetivo + <b>enough</b> + <i>to</i> (Unit 3).' },
          { blank: 1, q: 'A TV commercial is ___ more expensive than an Instagram post. (big difference)', opts: ['way', 'a bit', 'nearly', 'by far'], a: 'way', why: 'Comparativo + diferencia grande → <b>way / much / a whole lot</b> (Unit 3).' },
          { blank: 1, q: 'Merchandising is ___ the biggest source of income for the club.', opts: ['by far', 'way', 'nearly', 'a bit'], a: 'by far', why: 'Superlativo → <b>by far</b> (Unit 3).' },
          { blank: 1, q: 'She ___ she wants to be a filmmaker one day.', opts: ['thinks', 'is thinking', 'think', 'thinking'], a: 'thinks', why: 'Opinión → <i>think</i> es verbo de estado, no continuo (Unit 1).' },
          { blank: 1, q: 'The DJ ___ a record for the longest live set: 40 hours.', opts: ['broke', 'made', 'did', 'won'], a: 'broke', why: '<b>break a record</b> (Unit 1).' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>can\'t</i>, <i>couldn\'t</i>, <i>it\'s</i>).',
          sentences: ['It must be very expensive.', "It can't be that dangerous. So many people do it.", 'That might be worth a lot of money.', "They must not be very good; they're always losing!", 'There is a millionaire who travels all over the world to collect art.', 'They have all the facts you need to solve the problem.', 'There was a mechanical problem which no one noticed.', 'As I see it, most commercials are a waste of time.', 'I find it really boring.', "That's a good point, but the thing is, ads pay for free content.", "I couldn't disagree more.", "It's not so much that I'm not interested, it's just that I don't have time."] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for opinions', title: 'Escucha el diálogo y responde', intro: 'Sofía y Bruno hablan de un comercial de gaseosa con un futbolista famoso. Escúchalo entero antes de responder.',
          lines: [['Bruno', "Have you seen the new soda commercial with that footballer? It's everywhere."], ['Sofía', 'The one where he scores a goal and then drinks the soda? I find it really boring. Same idea as always.'], ['Bruno', "Now, just a second. As I see it, it's clever. Everybody knows him, so everybody remembers the brand."], ['Sofía', "That's a good point, but the thing is, he doesn't even drink soda. He's an athlete! The company must be paying him millions to pretend."], ['Bruno', "That's true, but that's what sponsors do. They don't sell the drink; they sell the celebrity. And it can't be that powerful. It's just a thirty-second ad."], ['Sofía', "I couldn't disagree more. Ads which use icons are the most powerful ones. The kids who watch it think the soda makes you a hero."], ['Bruno', "OK, OK. You might be right about the kids. But I still think it's a good commercial. Coffee?"]],
          questions: [
            { q: 'What does Sofía think of the commercial?', opts: ['It is boring and unoriginal', 'It is clever and funny', 'It is too short'], a: 'It is boring and unoriginal', why: '"I find it really boring. Same idea as always."' },
            { q: 'Why does Bruno think the ad is clever?', opts: ['Everybody knows the footballer, so they remember the brand', 'The footballer really drinks the soda', 'It is only thirty seconds long'], a: 'Everybody knows the footballer, so they remember the brand', why: '"Everybody knows him, so everybody remembers the brand."' },
            { q: 'When Sofía says "The company <b>must be</b> paying him millions", she is…', opts: ['quite sure it is true', 'not sure at all', 'sure it is not true'], a: 'quite sure it is true', why: '<b>must</b> = especulación con seguridad: hay pruebas (es un famoso en un comercial).' },
            { q: 'Which sentence shows the strongest disagreement?', opts: ["I couldn't disagree more.", "That's a good point, but…", 'You might be right.'], a: "I couldn't disagree more.", why: '<b>I couldn\'t disagree more</b> = énfasis máximo. <i>That\'s a good point, but…</i> es suave; <i>You might be right</i> es casi aceptar.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'A mysterious ad', task: 'Imagina una foto de un anuncio sin texto: una persona muy elegante, una carretera, un logo pequeño en la esquina. Especula 60 segundos: ¿qué anuncia?, ¿quién es la persona?, ¿cuánto costó? Usa must, might / could / may y can\'t.', model: "This is a strange photo. It might be an ad for a new car, because there's a road and a dark shape in the corner. The person in the middle must be a model – nobody looks that perfect at seven in the morning. It can't be a real photo of a family, because everybody is looking at the camera and smiling. The logo in the corner could be a sports brand. There's no slogan, so the company may want us to guess. Honestly, it must be expensive to produce something like this. I think it's for a car or maybe a watch.", tags: ['must be', 'might be', 'could be', "can't be", 'may', 'logo', 'model', 'brand'] },
          { t: 'My icon', task: 'Describe a un famoso o icono que admiras sin decir su nombre al principio. Usa al menos cuatro oraciones de relativo (who / which / that / where) y una palabra de la Lesson 2 (icon, hero, celebrity, performer…).', model: "The person who I admire most is a Peruvian chef who opened restaurants all over the world. He's an icon that represents modern Peru. He's someone who took traditional food, which many people ignored, and made it famous. The restaurant where he started is still in Lima. The thing that I respect most is that he uses his fame to help young cooks who don't have money for school. He's not a celebrity who only appears in commercials; he's a hero for a lot of people in my country.", tags: ['who', 'which', 'that', 'where', 'icon', 'hero', 'celebrity', 'admire'] },
          { t: 'Ads on social media', task: 'Da tu opinión sobre la publicidad en redes sociales (como usuario y como dueño de un negocio). Usa As I see it, I find it…, It\'s not so much that… it\'s just that…, I really think…', model: "As I see it, advertising on social media is both useful and annoying. It's not so much that I hate ads, it's just that there are too many of them. On the other hand, I run a small food business, and the ads that I post online are the cheapest way to reach customers. A short video with a good slogan can bring twenty new orders. I really think the problem isn't advertising; it's ads which pretend to be normal posts. Companies should be honest about what they are selling.", tags: ['as i see it', 'i find it', 'not so much that', "it's just that", 'i really think', 'advertising', 'slogan', 'ads'] },
          { t: 'Are status symbols worth it?', task: 'Debate: "Los símbolos de estatus valen la pena". Toma una postura, da una razón y un ejemplo, concede un punto (That\'s a good point, but…) y cierra. Usa status symbol, brand, logo, fashion statement.', model: "Some people think status symbols are worth the money, but I couldn't disagree more. A designer bag that costs two thousand dollars can't be twenty times better than a normal one. People who buy it aren't paying for quality; they're paying for a logo. That's a good point if you want attention, but the thing is, attention doesn't last. The friends who really matter don't care about your watch. I find it really sad when someone spends a whole salary on a fashion statement. Buy what you like, not what impresses others.", tags: ['status symbol', 'logo', 'brand', 'fashion statement', "couldn't disagree more", 'good point, but', 'the thing is', "can't be"] },
          { t: 'Defend your opinion', task: 'Tu amigo dice que "las celebridades venden cualquier producto y todos caemos". No estás de acuerdo. Defiende tu opinión con énfasis: You have it all wrong, That\'s not true at all, Now, just a second, y una concesión.', model: "You have it all wrong. Celebrities don't sell products; good products sell themselves. Look, I really think a commercial with a famous DJ might get attention for a week, but if the product is bad, people stop buying it. It's not true at all that we're all controlled by ads. We compare prices, we read reviews, we ask friends. Now, just a second, I'm not saying advertising doesn't work. It's not so much that it doesn't matter, it's just that it matters less than you think. In the end, quality wins.", tags: ['you have it all wrong', 'not true at all', 'just a second', 'i really think', 'not so much that', 'celebrities', 'commercial', 'might'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación · contracciones y sílaba tónica', title: 'must be, can\'t be y la sílaba fuerte del vocabulario', intro: 'Primero las contracciones de los modales: la <i>t</i> de <i>must</i> y <i>can\'t</i> casi desaparece delante de <i>be</i>. Después, la sílaba tónica de las palabras de la unidad (en MAYÚSCULAS). Escucha y repite.',
          pairs: [['must be → "mus-be"', 'It must be very expensive.'], ["can't be → \"can-be\" (vocal larga)", "It can't be that dangerous."], ["must've (= must have) · pasado", "It must've been expensive."], ['might be', 'That might be worth a lot of money.'], ['ADvertise (sílaba 1)', 'advertise'], ['adverTISEment (US) · adVERtisement (UK)', 'advertisement'], ['coMEdian', 'comedian'], ['ceLEbrity', 'celebrity'], ['MERchandise', 'merchandise'], ['deSIGNer', 'designer'], ['enterTAINer', 'entertainer'], ['proDUcer', 'producer'], ['AUdience', 'audience'], ['SLOgan', 'slogan'], ['Frase completa', 'The comedian who we saw last night must be a celebrity by now.']] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'Why brands pay for famous faces', intro: 'Lee una vez para la idea general y otra fijándote en los detalles. Las palabras en amarillo se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            "Why does a soda company pay a footballer millions of dollars to hold a can for ten seconds? He isn't a scientist, and he probably doesn't even drink it. The answer is simple: people don't buy products; they buy feelings. And nothing sells a feeling faster than a face we already love.",
            "Psychologists call it transfer. When a celebrity <b>endorses</b> a brand, the qualities we connect with that person – energy, success, style – move to the product. The audience doesn't think about it; it just happens. A watch which a movie star wears must be a good watch, we tell ourselves. It can't be ordinary.",
            "Logos work in the same way, but even faster. A logo is a promise that you can <b>recognize</b> in half a second, from across the street, without reading a word. That's why companies protect their logos so carefully, and why fake merchandise is such a big business. The people who buy a fake bag aren't buying leather; they're buying the symbol.",
            "Of course, the strategy can <b>backfire</b>. If the celebrity who advertises your sports drink gets caught eating junk food, the brand looks silly. And a logo that everybody sees everywhere might become boring. Still, for most companies, the celebrity's <b>fee</b> is money well spent. As long as we keep trusting faces more than facts, the famous will keep smiling at us from billboards.",
          ],
          main: [
            { q: 'Celebrities transfer their qualities to the products they advertise.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: <i>Psychologists call it transfer</i>.' },
            { q: 'Logos communicate a message instantly, even without words.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: <i>a promise that you can recognize in half a second… without reading a word</i>.' },
            { q: 'Using celebrities has risks for the brand.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: <i>the strategy can backfire</i>.' },
            { q: 'People buy emotions, not products.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1: <i>people don\'t buy products; they buy feelings</i>.' },
          ],
          infer: [
            { q: '<b>endorses</b> (paragraph 2)', opts: ['publicly supports or recommends', 'buys for the first time', 'criticizes in public'], a: 'publicly supports or recommends', why: 'El famoso apoya la marca y sus cualidades "se mueven" al producto.' },
            { q: '<b>recognize</b> (paragraph 3)', opts: ['know what something is because you have seen it before', 'design something new', 'pay for something'], a: 'know what something is because you have seen it before', why: '<i>In half a second, from across the street, without reading a word</i>: lo reconoces al instante.' },
            { q: '<b>backfire</b> (paragraph 4)', opts: ['have the opposite effect to the one you wanted', 'become very successful', 'cost more money'], a: 'have the opposite effect to the one you wanted', why: 'El ejemplo: el famoso come comida basura y la marca queda en ridículo.' },
            { q: '<b>fee</b> (paragraph 4)', opts: ['money paid for a service', 'a type of contract', 'a free product'], a: 'money paid for a service', why: '<i>The celebrity\'s fee is money well spent</i>: lo que cobra el famoso.' },
          ],
          think: '¿Compras alguna marca por su logo o por quién la anuncia? ¿Funcionaría un famoso anunciando tus empanadas? Escribe dos frases empezando con <i>As I see it, brands that use celebrities…</i> y <i>The people who buy fake merchandise must…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Cómo escribir una opinión', type: 'notes', eyebrow: 'Writing skill · giving your opinion', title: 'Cinco pasos para un texto de opinión', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>1 · Opinión</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>As I see it</b>, celebrity ads are a waste of money.</li><li><b>I really think</b> that…</li><li><b>I find</b> them really boring.</li></ul></div>
          <div><h3>2 · Razón</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>The companies <b>that</b> use famous faces pay millions…</li><li>…and the customer <b>who</b> pays for it is you.</li></ul></div>
          <div><h3>3 · Ejemplo + especulación</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>For example, the footballer in the soda ad <b>must</b> earn more than the whole factory.</li><li>He <b>can't</b> even like the product.</li></ul></div>
          <div><h3>4 · Concesión</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>That's true, but</b>… / <b>That's a good point, but</b>…</li><li><b>It's not so much that</b> ads are bad, <b>it's just that</b>…</li><li><b>But the thing is</b>, …</li></ul></div>
          <div><h3>5 · Cierre</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>In the end, … / All in all, …</li><li>Honestly, <b>I couldn't disagree more</b> with people who say…</li></ul></div>
          <div class="hint small"><b>Ojo:</b> <i>I agree</i>, nunca <s>I am agree</s>. <i>I find <b>it</b> boring</i> (objeto antes del adjetivo). <i>In my opinion</i> ya es opinión: no lo juntes con <i>I think</i>.</div></div>` },
        { label: 'Corrige las frases', type: 'fix', eyebrow: 'Error correction · errores típicos de la unidad', title: 'Reescribe la frase corrigiendo el error', intro: 'Errores frecuentes al especular, usar relativos y dar opiniones. Corrígelos y compara con la solución.', items: [
          { bad: 'It can be very expensive – look at the price!', good: 'It must be very expensive – look at the price!', why: '<b>can</b> no se usa para especular. Con pruebas claras → <b>must</b>.' },
          { bad: 'The man which lives next door is a DJ.', good: 'The man who lives next door is a DJ.', why: 'Personas → <b>who</b> (o <i>that</i>). <i>Which</i> es para cosas.' },
          { bad: 'The book what I read was about famous logos.', good: 'The book that I read was about famous logos.', why: '<i>what</i> nunca es pronombre relativo. Objeto → <b>that / which</b> o nada: <i>The book I read</i>.' },
          { bad: 'I am agree with you.', good: 'I agree with you.', why: '<b>agree</b> es un verbo: <i>I agree</i>, <i>I don\'t agree</i>. Sin <i>am</i>.' },
          { bad: 'The people who they work in advertising are creative.', good: 'The people who work in advertising are creative.', why: 'En una relativa de sujeto, <b>who</b> YA es el sujeto. No repitas <i>they</i>.' },
          { bad: 'It must to be a fake bag.', good: 'It must be a fake bag.', why: 'Modal + verbo base, sin <i>to</i>: <b>must be</b>.' },
          { bad: "That can't to be true.", good: "That can't be true.", why: 'Igual: <b>can\'t be</b>, nunca <s>can\'t to be</s>.' },
          { bad: 'She is a model who she appears in a lot of commercials.', good: 'She is a model who appears in a lot of commercials.', why: 'Sujeto repetido: <s>who she appears</s> → <b>who appears</b>.' },
          { bad: 'This is the store which I bought my jacket.', good: 'This is the store where I bought my jacket.', why: 'Lugar + sujeto + verbo → <b>where</b>. Con <i>which</i> haría falta <i>in which</i> / <i>which I bought my jacket in</i>.' },
          { bad: 'I find really boring the commercials.', good: 'I find the commercials really boring.', why: 'Orden: <b>find</b> + objeto + adjetivo: <i>I find <b>it / them / the commercials</b> really boring</i>.' },
          { bad: 'He might is the new movie producer.', good: 'He might be the new movie producer.', why: 'Después de un modal va el verbo base: <b>might be</b>.' },
        ] },
        { label: 'Frases de opinión', type: 'soft', eyebrow: 'Exchanging and discussing opinions · escritura', title: 'Reescribe la idea con una frase de la unidad', explain: 'Una opinión "seca" suena brusca o floja. Reescribe cada idea usando la frase funcional que indica la pista: <b>As I see it</b>, <b>I really think</b>, <b>I find it…</b>, <b>It\'s not so much that… it\'s just that…</b>, <b>That\'s a good point, but</b>, <b>That\'s true, but</b>, <b>But the thing is</b>, <b>Now, just a second</b>, <b>I couldn\'t disagree more</b>, <b>That\'s not true at all</b>, <b>You have it all wrong</b>.', missing: 'Falta una frase de la unidad: <i>As I see it · I really think · I find it · It\'s not so much that · That\'s a good point, but · That\'s true, but · But the thing is · Now, just a second · I couldn\'t disagree more · That\'s not true at all · You have it all wrong</i>', pattern: /\b(as i see it|i really think|i find \w+|it's not so much that|that's a good point, but|that's true, but|but the thing is|the thing is|now, just a second|i couldn't disagree more|that's not true at all|you have it all wrong)\b/, items: [
          { h: '"Commercials are boring." (da tu opinión personal con <i>I find…</i>)', a: 'I find commercials really boring.' },
          { h: '"Status symbols are a waste of money." (empieza con <i>As I see it</i>)', a: 'As I see it, status symbols are a waste of money.' },
          { h: '"Celebrities sell products." (opinión con fuerza: <i>I really think</i>)', a: 'I really think celebrities sell products.' },
          { h: '"I don\'t hate ads. There are too many." (une las dos ideas con <i>It\'s not so much that… it\'s just that…</i>)', a: "It's not so much that I hate ads, it's just that there are too many." },
          { h: '"Yes, logos are important. Quality is more important." (concede y contraataca: <i>That\'s a good point, but</i>)', a: "That's a good point, but quality is more important than logos." },
          { h: '"Sponsors pay for free content. They also control it." (concede: <i>That\'s true, but</i>)', a: "That's true, but sponsors also control the content." },
          { h: '"Ads are annoying. Without them, we would pay for everything." (introduce el problema real: <i>But the thing is</i>)', a: 'But the thing is, without ads we would pay for everything.' },
          { h: '"No. Merchandising is a great business." (desacuerdo total y enfático)', a: "I couldn't disagree more. Merchandising is a great business." },
          { h: '"No, celebrities don\'t control what we buy." (niega con énfasis)', a: "That's not true at all. Celebrities don't control what we buy." },
          { h: '"No, that DJ is not famous for his music; he is famous for his clothes." (corrige con énfasis: <i>You have it all wrong</i>)', a: 'You have it all wrong. That DJ is famous for his clothes, not for his music.' },
        ] },
        { label: 'Escribe tu opinión', type: 'comment', eyebrow: 'Writing task', title: 'Escribe tu opinión sobre un anuncio o un famoso', intro: 'Elige un comercial que veas mucho o una celebridad que anuncia productos. Escribe 80-120 palabras: opinión → razón → ejemplo (con una especulación) → concesión → cierre. La checklist se marca sola al analizar el texto.', placeholder: 'As I see it, the new soda commercial with … is … The company that made it must …', min: 80, max: 120, need: 4, checks: [
          { label: 'Empiezo con una frase de opinión (<i>As I see it / I really think / I find it… / In my opinion</i>)', re: /\b(as i see it|i really think|in my opinion|i find (it|them|this|that|the|him|her))\b/ },
          { label: 'Especulo con un modal (<i>must / might / may / could / can\'t</i> + verbo)', re: /\b(must|might|may|could|can't|cannot|mustn't|must not) [a-z]+/ },
          { label: 'Uso una oración de relativo (<i>who / which / where / that</i>)', re: /\b(\w+ (who|which|where) \w+|(the|a|an) \w+ that (i|you|we|they|he|she|it|\w+s) \w+)\b/ },
          { label: 'Uso al menos dos palabras de la unidad (<i>commercial, brand, logo, slogan, sponsor, celebrity, icon, audience…</i>)', re: /\b(ad|ads|advertisement|advertise|commercial|brand|logo|slogan|sponsor|merchandise|merchandising|status symbol|fashion statement|product|celebrity|celebrities|icon|audience|model|producer|comedian|entertainer|performer|hero|designer|filmmaker|dj)\b.*\b(ad|ads|advertisement|advertise|commercial|brand|logo|slogan|sponsor|merchandise|merchandising|status symbol|fashion statement|product|celebrity|celebrities|icon|audience|model|producer|comedian|entertainer|performer|hero|designer|filmmaker|dj)\b/ },
          { label: 'Concedo un punto (<i>That\'s true, but / That\'s a good point, but / But the thing is / It\'s not so much that… / However / On the other hand</i>)', re: /\b(that's true, but|that's a good point, but|the thing is|it's not so much that|however|on the other hand|although|even though)\b/ },
          { label: 'Cierro con fuerza (<i>In the end / All in all / Honestly / I couldn\'t disagree more / That\'s not true at all</i>)', re: /\b(in the end|all in all|honestly|to sum up|overall|i couldn't disagree more|that's not true at all|you have it all wrong)\b/ },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language · Lesson 3', title: 'Intercambiar, discutir y enfatizar opiniones', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Exchanging opinions</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>As I see it,</b> …</li><li><b>I find it</b> (really boring).</li><li><b>It's not so much that</b> (I'm not interested), <b>it's just that</b> …</li><li><b>I really think</b> …</li></ul></div>
          <div><h3>Discussing opinions</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>But the thing is,</b> …</li><li><b>Now, just a second</b> …</li><li><b>That's a good point, but</b> …</li><li><b>That's true, but</b> …</li></ul></div>
          <div><h3>Making opinions more emphatic</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I couldn't disagree more.</b></li><li><b>That's not true at all.</b></li><li><b>You have it all wrong.</b></li></ul></div>
          <div class="hint small"><b>Matices:</b><br>· <i>That's a good point, but</i> / <i>That's true, but</i> = concedes algo antes de discrepar (suave, educado).<br>· <i>Now, just a second</i> = "un momento", interrumpes para corregir (más directo).<br>· <i>But the thing is</i> = "lo que pasa es que": introduces el problema real.<br>· <i>It's not so much that A, it's just that B</i> = "no es tanto A, es más bien B": matiza tu razón.<br>· Las tres enfáticas son fuertes: úsalas con amigos, no con tu jefe. <i>I couldn't disagree more</i> = "no podría estar más en desacuerdo" (el <i>couldn't</i> es lo que da el énfasis).</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ['Ana: Did you see the new perfume commercial with that actor? I find it really boring.', "Luis: Now, just a second. As I see it, it's one of the best ads of the year.", "Ana: That's a good point, but the thing is, he can't even like perfume. He's just there for the money.", "Luis: That's true, but that's what celebrities do. They sell the feeling, not the product.", "Ana: I couldn't disagree more. A good product doesn't need a famous face."],
          ["Marta: I really think status symbols are a waste of money.", "Pedro: You have it all wrong. A good watch which lasts thirty years is an investment.", "Marta: It's not so much that I'm against quality, it's just that people buy the logo, not the watch.", "Pedro: That's a good point, but some brands are expensive because they're well made.", 'Marta: Maybe. But the thing is, most people can\'t tell the difference.'],
          ["Diego: That comedian must be the most popular performer in the country right now.", "Carla: That's not true at all. He's famous online, but his shows never sell out.", "Diego: Now, just a second. The theater where I saw him was full.", "Carla: That's true, but it was a small theater. The audience might have been two hundred people.", "Diego: OK, but as I see it, two hundred people who pay to laugh is a big success.", "Carla: I find it hard to disagree with that!"],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', items: [
          { q: 'Quieres dar tu opinión sobre un anuncio de forma personal y clara.', opts: ['As I see it, the ad is too long.', 'Now, just a second, the ad is too long.', "That's true, but the ad is too long."], a: 'As I see it, the ad is too long.', why: '<b>As I see it</b> introduce tu punto de vista. Las otras dos responden a alguien.' },
          { q: 'Tu amigo dice algo con lo que estás totalmente en desacuerdo (y hay confianza).', opts: ["I couldn't disagree more.", "I couldn't agree more.", "That's a good point."], a: "I couldn't disagree more.", why: '<b>I couldn\'t disagree more</b> = desacuerdo máximo. <i>I couldn\'t agree more</i> es lo contrario: acuerdo total.' },
          { q: 'Reconoces que su argumento es bueno, pero vas a discrepar.', opts: ["That's a good point, but…", 'You have it all wrong.', 'I find it really boring.'], a: "That's a good point, but…", why: 'Concesión educada antes de discrepar.' },
          { q: 'Quieres interrumpir para corregir algo que acaba de decir.', opts: ['Now, just a second…', 'As I see it…', "It's not so much that…"], a: 'Now, just a second…', why: '<b>Now, just a second</b> = "un momento": interrumpes para corregir.' },
          { q: 'Explicas que no es que odies los comerciales, sino que hay demasiados.', opts: ["It's not so much that I hate commercials, it's just that there are too many.", "It's not so much that there are too many, it's just that I hate commercials.", 'I find commercials too many.'], a: "It's not so much that I hate commercials, it's just that there are too many.", why: 'Primero lo que NO es (<i>not so much that</i>), luego lo que SÍ es (<i>it\'s just that</i>).' },
          { q: 'Alguien dice que ese famoso es un héroe. Tú crees que está completamente equivocado.', opts: ['You have it all wrong.', "That's true, but…", 'I really think so.'], a: 'You have it all wrong.', why: '<b>You have it all wrong</b> = lo tienes todo mal entendido. Enfático.' },
          { q: 'Quieres introducir el problema real de la publicidad con famosos.', opts: ['But the thing is, the customer pays for it.', 'I find it, the customer pays for it.', 'Just a second the customer pays for it.'], a: 'But the thing is, the customer pays for it.', why: '<b>But the thing is</b> = lo que pasa es que… introduce el punto clave.' },
          { q: 'Dices que un anuncio te parece aburrido.', opts: ['I find it really boring.', 'I find really boring it.', 'I am boring with it.'], a: 'I find it really boring.', why: '<b>find + it + adjetivo</b>. <i>I am boring</i> significaría que TÚ eres aburrido.' },
          { q: 'Alguien dice que los logos no importan. Lo niegas con énfasis.', opts: ["That's not true at all.", "That's true, but…", 'As I see it.'], a: "That's not true at all.", why: '<b>not … at all</b> refuerza la negación: en absoluto.' },
          { q: 'Estás de acuerdo en parte, pero añades una objeción.', opts: ["That's true, but it costs millions.", "That's not true at all, but it costs millions.", "I couldn't disagree more, but it costs millions."], a: "That's true, but it costs millions.", why: '<b>That\'s true, but</b> = acuerdo parcial + objeción. Las otras dos se contradicen.' },
        ] },
      ] },
    ],
  };
})();
