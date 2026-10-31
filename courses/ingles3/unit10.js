/* ===========================================================
   ingles3/unit10.js — Inglés 3 · Unit 10: Materials & production
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Vocabulario base ---------- */

  /* Adjetivos para describir materiales */
  const ADJ = [
    ['artificial', 'artificial, hecho por personas (no natural)', 'I bought some artificial flowers for the dining room. They look nice, and we won\'t have to water them.', '¿Tienes algo artificial en casa que parezca natural?'],
    ['fragile', 'frágil, que se rompe o se daña con facilidad', 'I am sending my mom a vase for her birthday. It is very fragile, so I have to wrap it carefully.', '¿Cuál es el objeto más frágil que tienes?'],
    ['hard', 'duro, difícil de doblar, cortar o romper', 'Some materials, like steel or diamond, are very hard.', '¿Qué material duro usarías para hacer una mesa?'],
    ['heavy', 'pesado, que pesa mucho', 'This sofa is really heavy. Even with two people carrying it, it still weighed a lot.', '¿Qué es lo más pesado que has tenido que cargar?'],
    ['light', 'ligero, que no pesa', 'The boxes were really light, so I was able to carry them all up the stairs.', '¿Prefieres una mochila ligera o una grande?'],
    ['natural', 'natural, que existe por la naturaleza y no lo hicieron las personas', 'We visited some natural hot springs in Japan.', '¿Prefieres la ropa de fibras naturales o artificiales?'],
    ['soft', 'suave, blando, fácil de apretar', 'I love the feeling of soft towels fresh from the laundry.', '¿Qué cosa suave te gusta tocar?'],
    ['strong', 'resistente, fuerte: no se rompe fácilmente y aguanta peso', 'Brick is a popular material for houses because it is very strong.', '¿Qué material te parece el más resistente?'],
    ['warm', 'cálido, que abriga (temperatura entre fría y caliente)', 'After we finished the hike, we had a hot drink and lit a fire to keep warm.', '¿Qué ropa te pones para estar warm en invierno?'],
    ['waterproof', 'impermeable, que no deja pasar el agua', 'These boots are waterproof. I can wear them in the rain and my feet won\'t get wet.', '¿Tienes algo waterproof? ¿Para qué lo usas?'],
  ];

  /* Materiales (sustantivos) */
  const MAT = [
    ['cotton', 'algodón', 'I prefer to wear cotton T-shirts. They feel nice and soft.', '¿Qué prenda de cotton usas más?'],
    ['glass', 'vidrio, cristal', 'My uncle works in a factory that makes glass bottles.', '¿Qué cosas de glass tienes en la cocina?'],
    ['leather', 'cuero, piel', 'I like wearing leather boots. They\'re comfortable and they last a long time.', '¿Tienes algo de leather? ¿Cuántos años tiene?'],
    ['metal', 'metal', 'I work in a metal works factory. We make steel pipes and steel beams for buildings.', '¿Qué objetos de metal usas cada día?'],
    ['plastic', 'plástico', 'Plastic should be recycled when possible. It\'s not good for the environment.', '¿Cómo podrías usar menos plastic esta semana?'],
    ['polyester', 'poliéster', 'Many clothes that look like cotton are actually polyester, which can be made from plastic.', '¿Miras la etiqueta de la ropa antes de comprarla?'],
    ['stone', 'piedra', 'Stone walls are very strong and have a beautiful look.', '¿Hay edificios de stone en tu ciudad?'],
    ['wood', 'madera', 'My father makes beautiful wood furniture. He gets the wood from a nearby forest.', '¿Qué mueble de wood te gusta más de tu casa?'],
    ['wool', 'lana', 'I love to wear a wool hat and scarf in the winter. They keep me warm.', '¿Usarías wool en Lima? ¿Por qué?'],
  ];

  /* Verbos de producción y distribución */
  const PROD = [
    ['catch', 'pescar / atrapar un animal que intenta escapar', 'All of the fish at this restaurant were caught by local fishermen.', '¿Has pescado algo alguna vez?'],
    ['deliver', 'entregar (cartas, paquetes, mercancía) a una persona o lugar', 'Did you get your package? Yes, someone delivered it this morning.', '¿Cuántas cosas te han delivered este mes?'],
    ['design', 'diseñar: dibujar o planificar algo antes de hacerlo', 'Our company designs clothes. Our designs are sent to a factory that makes the clothes.', '¿Qué te gustaría design?'],
    ['export', 'exportar: enviar productos a otro país para venderlos allí', 'The US exports many products such as food, machines, and automobile parts.', '¿Qué exporta tu país?'],
    ['freeze', 'congelar: ponerse duro y sólido por el frío', 'You can freeze fresh fish so you can keep it for many months.', '¿Qué tienes congelado ahora mismo?'],
    ['grow', 'cultivar / crecer (una planta desde la semilla)', 'We grew these carrots in our garden. We planted them about three months ago.', '¿Has cultivado alguna planta en casa?'],
    ['import', 'importar: traer algo de otro país para venderlo aquí', 'All of the coffee for our coffee shop is imported from overseas.', '¿Qué productos importados compras a menudo?'],
    ['manufacture', 'fabricar, normalmente en grandes cantidades y en una fábrica', 'My car was manufactured in the US. But some of the parts were made in other countries.', '¿Dónde se fabricó tu teléfono?'],
    ['pick', 'recoger fruta, flores o verduras del árbol o de la tierra', 'The tomatoes in the garden are ready. Let\'s go pick them.', '¿Has recogido fruta directamente del árbol?'],
    ['produce', 'producir: hacer o cultivar algo', 'All the fruit and vegetables that we sell are produced right here on the farm.', '¿Qué produce la región donde vives?'],
    ['ship', 'enviar algo de un lugar a otro (dentro del país o al extranjero)', 'The books are being shipped from China. They will be here in two weeks.', '¿Cuál es el envío que más has esperado?'],
    ['store', 'almacenar: guardar algo en un sitio seguro hasta que se necesite', 'I rented a locker to store my furniture until I return.', '¿Dónde guardas las cosas que no usas?'],
    ['transport', 'transportar: mover mercancía o personas de un lugar a otro', 'Many bananas are grown in Central America and are transported by truck to North America.', '¿Cómo se transporta la comida hasta tu supermercado?'],
  ];

  /* Palabras del vídeo "tricks of the ad world" */
  const AD = [
    ['accept', 'aceptar a alguien en un grupo; pensar que algo es bueno', 'They believe that if they have these things, people will accept them.', '¿Alguna vez compraste algo para encajar en un grupo?'],
    ['brand', 'marca: un producto hecho por una empresa concreta', 'Some people want sneakers that are a specific brand.', '¿Tienes una marca favorita? ¿Por qué?'],
    ['product', 'producto: algo que se hace para venderse', 'Cell phones are the product this company sells best.', '¿Qué producto has comprado más veces?'],
    ['social', 'social: relacionado con las actividades con otras personas', 'People are generally social, so they want to be around people.', '¿Eres una persona social o prefieres estar solo?'],
    ['specific', 'específico, concreto: relacionado con una cosa y no con otras', 'She only wants that specific model, not a similar one.', '¿Eres muy specific cuando compras algo?'],
    ['trick', 'engañar: hacer que alguien crea algo que no es verdad', 'I think they try to trick us with dishonest ads.', '¿Recuerdas un anuncio que te engañó?'],
    ['trust', 'confiar: creer que alguien es bueno y honesto', 'I don\'t really trust these companies.', '¿En qué empresa confías de verdad?'],
  ];

  const ADJ_W = ADJ.map(a => a[0]);
  const MAT_W = MAT.map(m => m[0]);
  const PROD_W = PROD.map(p => p[0]);

  /* Situación → adjetivo */
  const ADJ_SIT = [
    ['Please be careful with that vase. It will break easily.', 'fragile'],
    ['These flowers are made of silk. That\'s why I can\'t smell them.', 'artificial'],
    ['The seats in the waiting room were uncomfortable and not easy to press.', 'hard'],
    ['I need to move some stones in my yard, but I can\'t lift them alone.', 'heavy'],
    ['People wear these clothes in places with very hot summers.', 'light'],
    ['We have several big windows, so there\'s a lot of this light in the house.', 'natural'],
    ['I love the feeling of these towels fresh from the laundry.', 'soft'],
    ['Brick is popular for houses because it can support a roof for many years.', 'strong'],
    ['It\'s very cold outside. I need a sweater like this one.', 'warm'],
    ['Put these boots on if you want to go outside in the rain.', 'waterproof'],
    ['This jacket is perfect for a hike: you almost don\'t feel it in your bag.', 'light'],
    ['The hot springs in Japan weren\'t built by anyone. They were already there.', 'natural'],
    ['Wrap the glasses well, please. They break if you drop them.', 'fragile'],
    ['Diamond is the material we use to cut other materials.', 'hard'],
  ];

  /* Situación → material */
  const MAT_SIT = [
    ['My grandmother knits hats and scarves with it. It comes from sheep.', 'wool'],
    ['Windows and bottles are made of it, and it breaks easily.', 'glass'],
    ['Boots, belts and bags are made of it. It comes from animals.', 'leather'],
    ['Tables, chairs and doors are often made of it. It comes from trees.', 'wood'],
    ['T-shirts are often made of it. It comes from a plant.', 'cotton'],
    ['Bottles and grocery bags are made of it, and it should be recycled.', 'plastic'],
    ['Many sports shirts are made of it. It looks like cotton, but it\'s artificial.', 'polyester'],
    ['Keys, pipes and steel beams are made of it. It\'s usually hard and shiny.', 'metal'],
    ['Old walls and monuments are made of it. It comes from the ground.', 'stone'],
  ];

  /* Situación → verbo de producción */
  const PROD_SIT = [
    ['A farmer plants seeds and waits three months for the carrots.', 'grow'],
    ['The tomatoes are ready, so we take them off the plant.', 'pick'],
    ['Fishermen go out to sea and bring back fresh fish.', 'catch'],
    ['A factory makes ten thousand cars every month.', 'manufacture'],
    ['A company sends its coffee to Japan to sell it there.', 'export'],
    ['A coffee shop buys beans from Colombia and brings them into the country.', 'import'],
    ['The mail carrier brings your package to your door.', 'deliver'],
    ['We put the fish in the freezer so it lasts for months.', 'freeze'],
    ['We rent a locker and keep our furniture there until we come back.', 'store'],
    ['A truck moves the bananas from the farm to the port.', 'transport'],
    ['The boxes leave China by boat and arrive here in two weeks.', 'ship'],
    ['Our team draws and plans the clothes before the factory makes them.', 'design'],
    ['This farm makes all the fruit and vegetables it sells.', 'produce'],
  ];

  window.UNIT_DATA['ingles3/unit10'] = {
    source: 'WeTalk · Level 3 · Unit 10 · Materials & production',
    description: 'De qué están hechas las cosas y cómo se producen: adjetivos de materiales, nombres de materiales, verbos de producción y distribución, el pasivo simple (presente y pasado) y cómo cuestionar o aprobar las decisiones de otros.',
    map: [
      ['Vocabulary', '10 adjetivos de materiales (<i>artificial, fragile, waterproof…</i>), 9 materiales (<i>cotton, leather, polyester…</i>), 13 verbos de producción (<i>manufacture, export, ship…</i>) y las palabras del vídeo de publicidad', 'Flashcards con audio, emparejar verbo ↔ definición y material ↔ objeto, adjetivo y verbo por situación'],
      ['Grammar', 'Simple present passive y simple past passive: <i>be</i> + participio, <i>by</i> + agente, negativas, preguntas y respuestas cortas', 'Notas con tabla, activa → pasiva, elige la forma de <i>be</i>, trampas típicas'],
      ['Listening', 'El vídeo del puente y la conversación sobre publicidad', 'Dictado con voz sintética y diálogo con preguntas'],
      ['Speaking', 'Describir objetos y materiales, contar cómo se hace un producto', 'Retos con cronómetro y micrófono; sílaba tónica de los verbos largos'],
      ['Reading', 'Cómo se producen y distribuyen las cosas', 'Texto nuevo sobre el viaje de unos jeans + inferir significado'],
      ['Writing', 'Conectores de contraste: <i>but, though, however, although</i>', 'Corrige errores, reescribe con contraste, checklist'],
      ['Social English', '<i>Are you sure you want to…? / That\'s what I would do. / On second thought…</i>', 'Frases por situación, ordenar diálogos, respuesta rápida'],
    ],
    cando: [
      "Describir de qué está hecho un objeto y qué cualidades tiene (<i>It's made of glass, so it's fragile but eco-friendly</i>)",
      "Explicar cómo se produce y distribuye un producto con el pasivo de presente (<i>Coffee is grown in the mountains, then it's stored and exported</i>)",
      "Contar la historia de un objeto con el pasivo de pasado y <i>by</i> + agente (<i>The bridge was bought in 1968 and taken apart by workers</i>)",
      "Formar palabras con sustantivo + <i>-friendly</i> y distinguir <i>made of / out of / from</i> (<i>a budget-friendly car, polyester is made from plastic</i>)",
      "Mostrar contraste al escribir con <i>but, though, however, although</i> en el registro adecuado (<i>However, it isn't eco-friendly.</i>)",
      "Cuestionar una decisión con tacto, aprobarla y cambiar de opinión (<i>Are you sure you want to…? / That's what I would do. / On second thought, …</i>)",
    ],
    weak: [
      '<b>Pronombre sujeto</b>: escribiste <i>"Him represents dedication and hard work"</i> → <i><b>He</b> represents dedication and hard work</i>. Detrás del verbo va <i>him</i>; delante, como sujeto, siempre <b>he</b>.',
      '<b>set vs set up</b>: <i>"If you set up realistic goals today…"</i> → <i>If you <b>set</b> realistic goals today…</i>. <b>set up</b> = montar/instalar (una empresa, un equipo); con <i>goals</i> se dice solo <b>set</b>.',
      '<b>Pasivo</b>: después de <i>be</i> nunca va el infinitivo. <i>"The bridge was <s>buy</s> in 1968"</i> → <i>was <b>bought</b></i>. Aprende el participio, no solo el pasado.',
    ],
    weakLink: 'Trabájalos en <b>Writing › Corrige las frases</b> y en <b>Grammar › Trampas del pasivo</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...ADJ.map(a => ({ cat: 'Describing materials (adj.)', w: a[0], def: a[1], ex: a[2], ask: a[3] })),
            ...MAT.map(m => ({ cat: 'Materials (n.)', w: m[0], def: m[1], ex: m[2], ask: m[3] })),
            ...PROD.map(p => ({ cat: 'Production & distribution (v.)', w: p[0], def: p[1], ex: p[2], ask: p[3] })),
            ...AD.map(a => ({ cat: 'Advertising', w: a[0], def: a[1], ex: a[2], ask: a[3] })),
          ] },

        { label: 'Verbo ↔ definición', type: 'match', eyebrow: 'Production & distribution', title: 'Empareja el verbo con su significado', intro: 'Toca uno de la izquierda y luego su pareja de la derecha. Son los verbos que más aparecen en pasivo.',
          pairs: PROD.map(p => [p[0], p[1]]), round: 6 },

        { label: 'Material ↔ objeto', type: 'match', eyebrow: 'Materials', title: '¿De qué está hecho normalmente?', intro: 'Empareja cada material con un objeto típico. Recuerda: <i>made <b>of</b> wood</i> / <i>made <b>out of</b> wood</i>.',
          pairs: [['cotton', 'a white T-shirt'], ['glass', 'a window'], ['leather', 'a belt'], ['metal', 'a key'], ['plastic', 'a grocery bag'], ['polyester', 'a sports shirt'], ['stone', 'an old monument'], ['wood', 'a kitchen table'], ['wool', 'a winter scarf']], round: 6 },

        { label: '¿Qué adjetivo es?', type: 'mcq', eyebrow: 'Describing materials', title: 'Lee la situación y elige el adjetivo', pool: 7,
          build: ({ pick, esc }) => pick(ADJ_SIT, 7).map(s => {
            const a = ADJ.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(ADJ_W.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + a[0] + '</b> — ' + a[1] + '. “' + a[2] + '”' };
          }) },

        { label: '¿Qué material es?', type: 'mcq', eyebrow: 'Materials', title: 'Adivina el material por la descripción', pool: 6,
          build: ({ pick, esc }) => pick(MAT_SIT, 6).map(s => {
            const m = MAT.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(MAT_W.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + m[0] + '</b> — ' + m[1] + '. “' + m[2] + '”' };
          }) },

        { label: '¿Qué verbo es?', type: 'mcq', eyebrow: 'Production & distribution', title: 'Elige el verbo que describe la acción', pool: 7,
          build: ({ pick, esc }) => pick(PROD_SIT, 7).map(s => {
            const p = PROD.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(PROD_W.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + p[0] + '</b> — ' + p[1] + '.' };
          }) },

        { label: 'Notas: -friendly', type: 'notes', eyebrow: 'Word building', title: 'El sufijo <i>-friendly</i> y la familia de <i>made</i>', html: `
          <p style="margin:8px 0 14px">Con un sustantivo + <b>-friendly</b> dices que algo <b>no es dañino</b> para eso, o que es <b>apropiado</b> para ese grupo de personas.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Expresión</th><th>Significado</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>eco-friendly</b> / <b>environmentally friendly</b></td><td>respetuoso con el medio ambiente</td><td>We always try to buy eco-friendly clothes because we care about our planet.</td></tr>
            <tr><td><b>earth-friendly</b></td><td>que no daña el planeta</td><td>This bag is made of earth-friendly materials.</td></tr>
            <tr><td><b>budget-friendly</b></td><td>barato, que cabe en tu presupuesto</td><td>Let's buy this budget-friendly car. We can afford it.</td></tr>
            <tr><td><b>family-friendly</b></td><td>apropiado para familias con niños</td><td>Bill and Maria took the kids to a family-friendly restaurant.</td></tr>
            <tr><td><b>customer-friendly</b></td><td>fácil y agradable para el cliente</td><td>Their return policy is very customer-friendly.</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:18px">made of / made out of / made from</h3>
          <ul class="small" style="padding-left:18px;margin:6px 0">
            <li><b>A table is made of wood.</b> → el material se sigue viendo.</li>
            <li><b>We make tables out of wood.</b> → misma idea, con el verbo <i>make</i> delante.</li>
            <li><b>Polyester can be made from plastic.</b> → el material original cambia y ya no se reconoce.</li>
          </ul>
          <div class="hint" style="margin-top:12px"><b>Ojo:</b> <i>a wood table</i> y <i>a table made of wood</i> son correctas; <i>a table made <s>by</s> wood</i> no. <b>by</b> se usa para <b>quien hace</b> la acción (<i>made by a carpenter</i>), no para el material.</div>` },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'The passive', title: 'El pasivo en una imagen mental', html: `
          <p style="margin:8px 0 14px">En la voz <b>activa</b> te importa <b>quién hace</b> la acción. En la voz <b>pasiva</b> te importa <b>qué le pasa</b> a la cosa. Por eso el pasivo es el tiempo natural para hablar de productos, fábricas y procesos: nadie necesita saber el nombre del obrero.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Estructura</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>Simple present passive</b> (afirmativa)</td><td>am / is / are + participio</td><td>This museum <b>is visited</b> by thousands of people every year.</td><td>proceso habitual, hecho general</td></tr>
            <tr><td><b>Simple present passive</b> (negativa)</td><td>isn't / aren't + participio</td><td>This type of art <b>isn't understood</b>.</td><td><i>be</i> lleva la negación, no el verbo</td></tr>
            <tr><td><b>Simple present passive</b> (pregunta)</td><td>Am / Is / Are + sujeto + participio</td><td><b>Am</b> I <b>allowed</b> to take photos?</td><td>respuestas cortas: <i>Yes, you are. / No, you're not.</i></td></tr>
            <tr><td><b>Simple past passive</b> (afirmativa)</td><td>was / were + participio</td><td>First, the bridge <b>was taken</b> apart very carefully.</td><td>fecha o momento concreto</td></tr>
            <tr><td><b>Simple past passive</b> (negativa)</td><td>wasn't / weren't + participio</td><td>The stones <b>weren't damaged</b>.</td><td></td></tr>
            <tr><td><b>Simple past passive</b> (pregunta)</td><td>Was / Were + sujeto + participio</td><td>How <b>were</b> the stones <b>transported</b>? <b>Were</b> they <b>sent</b> by sea?</td><td><i>Yes, they were.</i></td></tr>
            <tr><td><b>by</b> + agente</td><td>… + by + quien hace la acción</td><td>All of the fish <b>were caught by local fishermen</b>.</td><td>solo si es información útil</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:18px">Cómo convertir activa → pasiva (3 pasos)</h3>
          <p style="margin-top:6px">Activa: <i><b>Many people</b> (sujeto) <b>visit</b> (verbo) <b>the museum</b> (objeto).</i></p>
          <ol class="small" style="padding-left:18px;margin:6px 0">
            <li>Mueve el <b>objeto</b> al principio: <i>The museum…</i></li>
            <li>Pon <b>be</b> en el tiempo del verbo original y de acuerdo con el nuevo sujeto: <i>The museum <b>is</b>…</i></li>
            <li>Añade el <b>participio</b> y, si hace falta, <b>by</b> + el sujeto original: <i>The museum <b>is visited by many people</b>.</i></li>
          </ol>
          <div class="hint" style="margin-top:14px"><b>Error del curso:</b> después de <i>be</i> <u>nunca</u> va el infinitivo.<br>❌ <i>The bridge was <s>buy</s> in 1968.</i> → ✅ <i>The bridge <b>was bought</b> in 1968.</i><br>Repasa participios irregulares: <i>buy→bought, catch→caught, grow→grown, freeze→frozen, make→made, take→taken, send→sent, build→built</i>.</div>
          <div class="hint" style="margin-top:10px"><b>Concordancia:</b> el verbo <i>be</i> concuerda con el <b>nuevo</b> sujeto, igual que en activa. <i>The stone <b>was</b> cut</i> / <i>The stones <b>were</b> cut</i>.</div>` },

        { label: 'Activa → pasiva', type: 'mcq', eyebrow: 'Transform', title: 'Elige la versión pasiva correcta', pool: 7, items: [
          { q: 'Active: <i>Local fishermen catch all the fish here.</i>', opts: ['All the fish are caught by local fishermen.', 'All the fish is catch by local fishermen.', 'All the fish were caught by local fishermen.', 'All the fish catches by local fishermen.'], a: 'All the fish are caught by local fishermen.', why: 'Presente simple → <b>are</b> (<i>fish</i> aquí es plural) + participio <b>caught</b>.' },
          { q: 'Active: <i>A factory in Japan manufactures these cameras.</i>', opts: ['These cameras are manufactured in a factory in Japan.', 'These cameras is manufactured in a factory in Japan.', 'These cameras manufacture in a factory in Japan.', 'These cameras were manufacturing in Japan.'], a: 'These cameras are manufactured in a factory in Japan.', why: 'Sujeto plural (<i>cameras</i>) → <b>are</b> + <b>manufactured</b>.' },
          { q: 'Active: <i>They built this bridge in 1968.</i>', opts: ['This bridge was built in 1968.', 'This bridge is built in 1968.', 'This bridge was build in 1968.', 'This bridge were built in 1968.'], a: 'This bridge was built in 1968.', why: 'Pasado + sujeto singular → <b>was</b> + participio <b>built</b>. Después de <i>be</i> nunca va el infinitivo <i>build</i>.' },
          { q: 'Active: <i>Farmers grow bananas in Central America.</i>', opts: ['Bananas are grown in Central America.', 'Bananas are grow in Central America.', 'Bananas is grown in Central America.', 'Bananas were grow in Central America.'], a: 'Bananas are grown in Central America.', why: 'Participio de <i>grow</i> = <b>grown</b>. Sujeto plural → <b>are</b>.' },
          { q: 'Active: <i>Somebody delivered the package this morning.</i>', opts: ['The package was delivered this morning.', 'The package is delivered this morning.', 'The package were delivered this morning.', 'The package was deliver this morning.'], a: 'The package was delivered this morning.', why: '<i>This morning</i> ya pasó → <b>was delivered</b>. Cuando el agente es <i>somebody</i>, no hace falta <i>by</i>.' },
          { q: 'Active: <i>Our company designs the shoes in Lima.</i>', opts: ['The shoes are designed in Lima.', 'The shoes is designed in Lima.', 'The shoes are design in Lima.', 'The shoes designed in Lima.'], a: 'The shoes are designed in Lima.', why: 'Hecho habitual + sujeto plural → <b>are designed</b>.' },
          { q: 'Active: <i>Thousands of tourists visit this temple every year.</i>', opts: ['This temple is visited by thousands of tourists every year.', 'This temple are visited by thousands of tourists.', 'This temple is visit by thousands of tourists.', 'This temple visited by thousands of tourists.'], a: 'This temple is visited by thousands of tourists every year.', why: 'El nuevo sujeto es <i>this temple</i> (singular) → <b>is</b>, aunque el agente sea plural.' },
          { q: 'Active: <i>They sent the stones by sea.</i>', opts: ['The stones were sent by sea.', 'The stones was sent by sea.', 'The stones were send by sea.', 'The stones are sent by sea.'], a: 'The stones were sent by sea.', why: 'Pasado + sujeto plural → <b>were</b> + participio <b>sent</b>.' },
          { q: 'Active: <i>We store the furniture in a locker.</i>', opts: ['The furniture is stored in a locker.', 'The furniture are stored in a locker.', 'The furniture is store in a locker.', 'The furniture stores in a locker.'], a: 'The furniture is stored in a locker.', why: '<i>Furniture</i> es incontable y va en singular → <b>is stored</b>.' },
          { q: 'Active: <i>A carpenter made this table out of wood.</i>', opts: ['This table was made by a carpenter.', 'This table was made by wood.', 'This table is made by a carpenter.', 'This table was make by a carpenter.'], a: 'This table was made by a carpenter.', why: '<b>by</b> = quien hace la acción. Para el material se usa <b>of / out of</b>: <i>made of wood</i>.' },
          { q: 'Active: <i>They export coffee to Japan.</i>', opts: ['Coffee is exported to Japan.', 'Coffee are exported to Japan.', 'Coffee is export to Japan.', 'Coffee exported to Japan.'], a: 'Coffee is exported to Japan.', why: '<i>Coffee</i> es incontable → <b>is exported</b>.' },
          { q: 'Active: <i>Workers picked the tomatoes yesterday.</i>', opts: ['The tomatoes were picked yesterday.', 'The tomatoes are picked yesterday.', 'The tomatoes was picked yesterday.', 'The tomatoes were pick yesterday.'], a: 'The tomatoes were picked yesterday.', why: '<i>Yesterday</i> → pasado; sujeto plural → <b>were picked</b>.' },
          { q: 'Active: <i>Someone froze the fish last week.</i>', opts: ['The fish was frozen last week.', 'The fish was freezed last week.', 'The fish is frozen last week.', 'The fish were froze last week.'], a: 'The fish was frozen last week.', why: 'Participio irregular: <i>freeze → froze → <b>frozen</b></i>.' },
          { q: 'Active: <i>The company ships the books from China.</i>', opts: ['The books are shipped from China.', 'The books is shipped from China.', 'The books are ship from China.', 'The books shipped from China.'], a: 'The books are shipped from China.', why: 'Sujeto plural + presente → <b>are shipped</b>.' },
        ] },

        { label: 'Elige la forma', type: 'mcq', eyebrow: 'Present & past passive', title: 'Completa con la forma correcta', pool: 7, items: [
          { blank: 1, q: 'These T-shirts ___ of 100% cotton.', opts: ['are made', 'is made', 'are make', 'made'], a: 'are made', why: 'Sujeto plural + hecho general → <b>are made</b>. Para el material: <i>made <b>of</b></i>.' },
          { blank: 1, q: 'The old monument ___ of stone in 1890.', opts: ['was built', 'were built', 'was build', 'is built'], a: 'was built', why: 'Fecha concreta + sujeto singular → <b>was built</b>. Nunca <i>was build</i>.' },
          { blank: 1, q: 'All our coffee ___ from Colombia every month.', opts: ['is imported', 'are imported', 'is import', 'was imported'], a: 'is imported', why: '<i>Every month</i> = rutina → presente; <i>coffee</i> es incontable → <b>is</b>.' },
          { blank: 1, q: 'The packages ___ yesterday afternoon.', opts: ['were delivered', 'was delivered', 'are delivered', 'were deliver'], a: 'were delivered', why: '<i>Yesterday</i> → pasado; sujeto plural → <b>were delivered</b>.' },
          { blank: 1, q: 'These boots ___ waterproof, so your feet stay dry.', opts: ['are', 'are been', 'is', 'were being'], a: 'are', why: 'Cuidado: aquí <i>waterproof</i> es un adjetivo, no un participio. No hay pasivo, solo <b>be</b> + adjetivo.' },
          { blank: 1, q: '___ these carrots grown on your farm?', opts: ['Are', 'Is', 'Do', 'Does'], a: 'Are', why: 'La pregunta pasiva empieza con <b>be</b>: <i>Are these carrots grown…?</i>' },
          { blank: 1, q: 'The vase ___ during the trip. It arrived in perfect condition.', opts: ["wasn't damaged", "didn't damaged", "isn't damaged", "weren't damaged"], a: "wasn't damaged", why: 'La negación va en <b>be</b>: <i>wasn\'t damaged</i>. Singular + pasado.' },
          { blank: 1, q: 'Most plastic bottles ___ in this country, but very few ___ .', opts: ['are used / are recycled', 'is used / is recycled', 'are use / are recycle', 'were used / are recycling'], a: 'are used / are recycled', why: 'Dos pasivos en presente con sujeto plural.' },
          { blank: 1, q: 'My car ___ in Mexico, but some of the parts ___ in Japan.', opts: ['was manufactured / were made', 'was manufactured / was made', 'were manufactured / were made', 'was manufacture / were make'], a: 'was manufactured / were made', why: '<i>My car</i> singular → <b>was</b>; <i>some of the parts</i> plural → <b>were</b>.' },
          { blank: 1, q: 'The fish ___ so it can be kept for months.', opts: ['is frozen', 'is freeze', 'are frozen', 'freezes'], a: 'is frozen', why: 'Participio <b>frozen</b>; <i>the fish</i> aquí funciona como singular.' },
          { blank: 1, q: '"Am I allowed to take photos?" — "No, you ___ ."', opts: ["aren't", "don't", "amn't", "isn't"], a: "aren't", why: 'Respuesta corta con el mismo <i>be</i>: <i>No, you\'re not / No, you aren\'t.</i>' },
          { blank: 1, q: 'How ___ the stones ___ from California?', opts: ['were / transported', 'was / transported', 'did / transported', 'were / transport'], a: 'were / transported', why: 'Pregunta pasiva en pasado con sujeto plural: <b>were</b> + <b>transported</b>.' },
          { blank: 1, q: 'This type of art ___ by most people.', opts: ["isn't understood", "doesn't understood", "isn't understand", "aren't understood"], a: "isn't understood", why: 'Negativa presente, sujeto singular: <b>isn\'t understood</b>.' },
          { blank: 1, q: 'The reconstruction ___ in 1971.', opts: ['was completed', 'were completed', 'is completed', 'was complete'], a: 'was completed', why: 'Fecha pasada + sujeto singular → <b>was completed</b>.' },
        ] },

        { label: 'Trampas del pasivo', type: 'mcq', eyebrow: 'Trampas típicas', title: '¿Cuál es la frase correcta?', pool: 7, items: [
          { q: '¿Cuál es correcta?', opts: ['The bridge was bought in 1968.', 'The bridge was buy in 1968.'], a: 'The bridge was bought in 1968.', why: 'Después de <i>be</i> va el <b>participio</b>, nunca el infinitivo. <i>buy → bought</i>.' },
          { q: '¿Cuál es correcta?', opts: ['This table is made of wood.', 'This table is made by wood.'], a: 'This table is made of wood.', why: '<b>of / out of</b> = material. <b>by</b> = persona o empresa que lo hace.' },
          { q: '¿Cuál es correcta?', opts: ['All the stones were numbered.', 'All the stones was numbered.'], a: 'All the stones were numbered.', why: '<i>Be</i> concuerda con el nuevo sujeto: <i>stones</i> es plural → <b>were</b>.' },
          { q: '¿Cuál es correcta?', opts: ['The fish were caught by local fishermen.', 'The fish were catched by local fishermen.'], a: 'The fish were caught by local fishermen.', why: 'Participio irregular: <i>catch → caught</i>. <i>Catched</i> no existe.' },
          { q: '¿Cuál es correcta?', opts: ["These shirts aren't made in Peru.", "These shirts don't made in Peru."], a: "These shirts aren't made in Peru.", why: 'En pasivo la negación va siempre en <b>be</b>, nunca con <i>do / does</i>.' },
          { q: '¿Cuál es correcta?', opts: ['Are these bottles recycled here?', 'Do these bottles recycled here?'], a: 'Are these bottles recycled here?', why: 'La pregunta pasiva empieza con <b>be</b>: <i>Are … recycled?</i>' },
          { q: '¿Cuál es correcta?', opts: ['The carrots were grown in our garden.', 'The carrots were grew in our garden.'], a: 'The carrots were grown in our garden.', why: '<i>grow → grew → <b>grown</b></i>. El participio es <b>grown</b>.' },
          { q: '¿Cuál es correcta?', opts: ['He represents dedication and hard work.', 'Him represents dedication and hard work.'], a: 'He represents dedication and hard work.', why: '<b>Tu error real:</b> como sujeto va <b>he</b>. <i>Him</i> solo va detrás del verbo o de una preposición (<i>I admire him</i>).' },
          { q: '¿Cuál es correcta?', opts: ['If you set realistic goals today, you will achieve them.', 'If you set up realistic goals today, you will achieve them.'], a: 'If you set realistic goals today, you will achieve them.', why: '<b>Tu error real:</b> <i>set a goal</i> va sin <i>up</i>. <b>set up</b> = montar una empresa, instalar un equipo.' },
          { q: 'Repaso · <i>Unit 2</i>: ¿Cuál es correcta?', opts: ["I've had this wool coat since 2019.", 'I have this wool coat since 2019.'], a: "I've had this wool coat since 2019.", why: 'Con <i>since / for</i> y algo que sigue siendo verdad → present perfect.' },
          { q: 'Repaso · <i>Unit 3</i>: ¿Cuál es correcta?', opts: ['Glass is recycled in most cities.', 'The glass is recycled in most cities.'], a: 'Glass is recycled in most cities.', why: 'Materiales y sustancias en sentido general van <b>sin artículo</b>.' },
          { q: 'Repaso · <i>Unit 5</i>: ¿Cuál es correcta?', opts: ['While I was wrapping the vase, it fell and broke.', 'While I wrapped the vase, it was falling and broke.'], a: 'While I was wrapping the vase, it fell and broke.', why: 'Acción larga de fondo → past continuous; acción corta que la interrumpe → simple past.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Fíjate en <i>is / are / was / were</i>: en el pasivo se oyen muy flojo.',
          sentences: [
            'This museum is visited by thousands of people every year.',
            'The bridge was bought in 1968 and taken apart very carefully.',
            'All of the fish at this restaurant were caught by local fishermen.',
            'My car was manufactured in the US, but some of the parts were made in other countries.',
            'The books are being shipped from China. They will be here in two weeks.',
            'All of the coffee for our coffee shop is imported from overseas.',
            'Many bananas are grown in Central America and are transported by truck.',
            'These boots are waterproof, so my feet will not get wet.',
            'The stones were numbered, and they were not damaged.',
            'How were the stones transported? Were they sent by sea?',
            'Many clothes that look like cotton are actually polyester.',
            'On second thought, maybe you are right about the blue one.',
          ] },

        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for gist', title: 'Escucha la conversación y responde', intro: 'Dos amigos hablan de una chaqueta y de cómo se fabrica. Escúchalo entero antes de responder.',
          lines: [
            ['Nadia', "I love your jacket. Is it leather?"],
            ['Bruno', "No, it's artificial. It looks like leather, but it's made from recycled plastic bottles."],
            ['Nadia', "Really? Where is it manufactured?"],
            ['Bruno', "It's designed in Portugal and the bottles are collected there, but the jackets are sewn in Vietnam and then shipped to Europe."],
            ['Nadia', "That's a long trip for one jacket. Are you sure it's eco-friendly?"],
            ['Bruno', "Hmm. Now that I think about it, maybe not. But it was budget-friendly, at least."],
            ['Nadia', "That's what I would do too. I bought a wool coat last winter and it was much more expensive."],
          ],
          questions: [
            { q: 'What is the jacket made of?', opts: ['recycled plastic', 'real leather', 'wool', 'cotton'], a: 'recycled plastic', why: 'Bruno: "it\'s made from recycled plastic bottles". Es artificial, no leather.' },
            { q: 'Where are the jackets sewn?', opts: ['in Vietnam', 'in Portugal', 'in Europe', 'in China'], a: 'in Vietnam', why: '"the jackets are sewn in Vietnam" — pasivo presente para describir el proceso.' },
            { q: 'Why does Nadia doubt the jacket is eco-friendly?', opts: ['because it travels a very long way', 'because it is made of leather', 'because it was very cheap', 'because it is not waterproof'], a: 'because it travels a very long way', why: '"That\'s a long trip for one jacket."' },
            { q: 'What does "Now that I think about it" show?', opts: ['that Bruno is changing his mind', 'that Bruno disagrees strongly', 'that Bruno did not hear her', 'that Bruno is asking a question'], a: 'that Bruno is changing his mind', why: 'Es una expresión para <b>cambiar de opinión</b>, como <i>On second thought…</i>' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'What are you wearing today?', task: 'Describe la ropa que llevas puesta: de qué está hecha, qué cualidades tiene y si sabes dónde se fabricó. Usa al menos tres adjetivos de la unidad y un pasivo.', model: 'Modelo: "I\'m wearing a cotton shirt and leather shoes. The shirt is very light and soft, which is perfect for Lima. I think it was manufactured in Peru, but the shoes were probably made in Brazil."', tags: ['made of', 'cotton', 'leather', 'light', 'soft', 'was made', 'manufactured'] },
          { t: 'How is it produced?', task: 'Elige un producto (café, chocolate, pescado, un teléfono) y explica en 60 segundos cómo llega hasta ti. Usa cuatro verbos de producción en pasivo.', model: 'Modelo: "Coffee is grown in the mountains. The beans are picked by hand, then they are dried and stored in big bags. After that, they are transported to the port and exported to other countries."', tags: ['grown', 'picked', 'stored', 'transported', 'exported', 'is', 'are'] },
          { t: 'The object on your desk', task: 'Coge un objeto que tengas cerca y descríbelo: material, tres cualidades, para qué sirve y si es eco-friendly o no.', model: 'Modelo: "This is my water bottle. It\'s made of metal, so it\'s strong and it isn\'t fragile. It\'s a bit heavy, but it\'s eco-friendly because I don\'t buy plastic bottles anymore."', tags: ['made of', 'strong', 'fragile', 'heavy', 'eco-friendly', 'because'] },
          { t: 'Natural or artificial?', task: 'Di si prefieres materiales naturales o artificiales y por qué. Da dos ejemplos concretos y una desventaja de cada opción.', model: 'Modelo: "I prefer natural materials like wool and wood because they last longer. However, they are usually more expensive. Polyester is cheap and light, though it isn\'t very warm."', tags: ['natural', 'artificial', 'wool', 'polyester', 'however', 'though', 'because'] },
          { t: 'Change your mind', task: 'Un amigo quiere comprar algo caro que no necesita. Cuestiona su decisión, escucha su respuesta y luego cambia de opinión tú mismo. Haz las dos voces.', model: 'Modelo: "Are you sure you want to get that? Do you really need a second phone? — Well, the camera is much better. — Hmm, now that I think about it, that\'s a good idea. That\'s what I would do too."', tags: ['are you sure', 'do you really need', 'now that i think about it', 'on second thought', "that's a good idea", 'what i would do'] },
        ] },

        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación', title: 'Sílaba tónica: verbos largos y participios', intro: 'En los verbos de producción el acento no siempre está donde crees. Escucha y repite.',
          pairs: [
            ['ar-ti-FI-cial', 'artificial'],
            ['FRA-gile', 'fragile'],
            ['WA-ter-proof', 'waterproof'],
            ['PO-ly-es-ter', 'polyester'],
            ['ma-nu-FAC-ture', 'manufacture'],
            ['TRANS-port (n.) → trans-PORT (v.)', 'transport, transport'],
            ['EX-port (n.) → ex-PORT (v.)', 'export, export'],
            ['IM-port (n.) → im-PORT (v.)', 'import, import'],
            ['de-LI-ver', 'deliver'],
            ['pro-DUCE (v.) → PRO-duce (n.)', 'produce, produce'],
            ['was BOUGHT, were CAUGHT, was GROWN', 'was bought, were caught, was grown'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'The long journey of a pair of jeans', intro: 'Lee una vez para la idea general. Luego responde. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Look at the label inside your jeans. It probably names one country, but a single pair of jeans is usually made in five or six. The cotton is grown in one place, the cloth is <b>dyed</b> in another, and the pieces are sewn together somewhere else. By the time the jeans reach your closet, they have travelled further than most tourists ever will.',
            'The story starts on a farm. Cotton is grown in warm, dry countries such as India, Peru and the United States. When the plants are ready, the cotton is <b>harvested</b> — today this is normally done by machines — and it is then sent to a mill, where it is turned into thread and finally into cloth.',
            'Next comes the colour. The cloth is dyed blue, cut into pieces and sewn together by workers in a clothing factory. Metal buttons are added and every pair is checked by hand. Good jeans are <b>durable</b>: they are designed to be worn for years, not months, which is why your grandfather\'s pair may still be in a drawer somewhere.',
            'Finally, the finished jeans are packed into boxes and shipped across the ocean. They are stored in a huge <b>warehouse</b> near a port, and from there they are transported by truck to shops or delivered straight to your door. All of this explains why cheap jeans are never really cheap: somebody, somewhere, pays for the journey.',
          ],
          main: [
            { q: 'The cotton is planted, harvested and turned into cloth.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: la granja, la cosecha y el paso a hilo y tela.' },
            { q: 'The jeans are stored and then moved to the shops or to your home.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: warehouse, trucks, delivery.' },
            { q: 'One pair of jeans is produced in several different countries.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1 presenta la idea general del viaje.' },
            { q: 'The cloth gets its colour and is sewn into jeans.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: dyed, cut, sewn, buttons, checked.' },
          ],
          infer: [
            { q: '<b>dyed</b> (paragraph 1 & 3)', opts: ['given a colour', 'cut into small pieces', 'washed with hot water'], a: 'given a colour', why: '"The cloth is dyed blue" → se le da color. Se pronuncia igual que <i>died</i>, pero no tiene nada que ver.' },
            { q: '<b>harvested</b> (paragraph 2)', opts: ['collected when it is ready', 'planted in the ground', 'sold to another country'], a: 'collected when it is ready', why: 'Es sinónimo de <i>picked</i> cuando hablamos de un cultivo entero: "when the plants are ready".' },
            { q: '<b>durable</b> (paragraph 3)', opts: ['able to last a long time without breaking', 'very expensive', 'easy to wash'], a: 'able to last a long time without breaking', why: '"designed to be worn for years, not months" → resistente en el tiempo. Familia de <i>strong</i>, opuesto de <i>fragile</i>.' },
            { q: '<b>warehouse</b> (paragraph 4)', opts: ['a big building where goods are stored', 'a shop that sells clothes', 'a ship that crosses the ocean'], a: 'a big building where goods are stored', why: 'Está "near a port" y las cosas <i>are stored</i> allí → almacén.' },
          ],
          think: '¿Cambiarías de marca si supieras cuánto viaja tu ropa? Escribe dos frases usando <i>However,…</i> y <i>…, though.</i> Por ejemplo: <i>I would like to buy local clothes. However, they are more expensive.</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Notas: contraste', type: 'notes', eyebrow: 'Linking words', title: 'Cómo mostrar contraste (formal e informal)', html: `
          <div class="scroll-x"><table class="table"><thead><tr><th>Palabra</th><th>Registro</th><th>Posición</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>but</b></td><td>informal</td><td>en medio; <b>nunca</b> al empezar la frase</td><td>Polyester is cheap, <b>but</b> it isn't very warm.</td></tr>
            <tr><td><b>though</b></td><td>informal</td><td>en medio o al <b>final</b>; nunca al empezar</td><td>It isn't very warm, <b>though</b>.</td></tr>
            <tr><td><b>however</b></td><td>formal</td><td>al empezar la frase, con <b>coma</b> detrás</td><td>The jacket is cheap. <b>However,</b> it isn't eco-friendly.</td></tr>
            <tr><td><b>although</b></td><td>formal</td><td>al empezar la frase o en medio, une dos oraciones</td><td><b>Although</b> it is artificial, it looks like leather.</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Las tres reglas del curso:</b><br>1. No empieces una frase con <b>but</b> ni con <b>though</b>.<br>2. Usa <b>however</b> y <b>although</b> en escritura más formal.<br>3. No olvides la <b>coma</b> después de <i>however</i>.</div>` },

        { label: 'Corrige las frases', type: 'fix', eyebrow: 'Error correction', title: 'Reescribe la frase corrigiendo el error', intro: 'Las dos primeras son frases que escribiste tú. El resto son los errores más típicos del pasivo y del contraste.', items: [
          { bad: 'Him represents dedication and hard work.', good: 'He represents dedication and hard work.', why: 'Como <b>sujeto</b> se usa <b>he</b>; <i>him</i> solo va detrás del verbo o de una preposición (<i>I admire him / for him</i>).' },
          { bad: 'If you set up realistic goals today, you will celebrate tomorrow.', good: 'If you set realistic goals today, you will celebrate tomorrow.', why: '<b>set a goal</b> va sin <i>up</i>. <b>set up</b> = montar o instalar algo (<i>set up a company, set up the printer</i>).' },
          { bad: 'The bridge was buy in 1968.', good: 'The bridge was bought in 1968.', why: 'Después de <i>be</i> va el <b>participio</b>, nunca el infinitivo. <i>buy → bought</i>.' },
          { bad: 'These bottles are make of glass.', good: 'These bottles are made of glass.', why: 'Participio <b>made</b>; y para el material se usa <b>of</b>, no <i>by</i>.' },
          { bad: 'All the stones was numbered before the trip.', good: 'All the stones were numbered before the trip.', why: '<i>Be</i> concuerda con el sujeto: <i>stones</i> es plural → <b>were</b>.' },
          { bad: 'The fish were catched by local fishermen.', good: 'The fish were caught by local fishermen.', why: 'Participio irregular: <i>catch → caught</i>. <i>Catched</i> no existe.' },
          { bad: "These shirts don't made in Peru.", good: "These shirts aren't made in Peru.", why: 'En pasivo la negación va en <b>be</b> (<i>aren\'t</i>), nunca con <i>don\'t</i>.' },
          { bad: 'This table is made by wood by my father.', good: 'This table is made of wood by my father.', why: '<b>of / out of</b> para el material, <b>by</b> solo para la persona que lo hace.' },
          { bad: 'But the jacket is cheap, it is not eco-friendly.', good: 'Although the jacket is cheap, it is not eco-friendly.', why: 'No se empieza una frase con <b>but</b>. Para empezar, usa <b>Although</b> (o <i>However,</i> en frase aparte).' },
          { bad: 'The coffee is very good. However it is expensive.', good: 'The coffee is very good. However, it is expensive.', why: 'Falta la <b>coma</b> después de <i>however</i>.' },
        ] },

        { label: 'Reescribe con contraste', type: 'soft', eyebrow: 'Linking words', title: 'Añade contraste a la frase', explain: 'Une o completa cada idea usando <b>however</b>, <b>although</b> o <b>though</b>. Recuerda: <i>However,</i> lleva coma y va al principio de la segunda frase; <i>although</i> une dos oraciones; <i>though</i> va al final.', missing: 'Falta un conector de contraste: <b>however</b>, <b>although</b> o <b>though</b>',
          items: [
            { h: '"Wool is very warm. It is expensive."', a: 'Wool is very warm. However, it is expensive.' },
            { h: '"The bottle is made of plastic. It is strong."', a: 'Although the bottle is made of plastic, it is strong.' },
            { h: '"These boots are waterproof. They aren\'t very light."', a: "These boots are waterproof. They aren't very light, though." },
            { h: '"The jacket was budget-friendly. It travelled halfway around the world."', a: 'Although the jacket was budget-friendly, it travelled halfway around the world.' },
            { h: '"Polyester looks like cotton. It is completely artificial."', a: 'Polyester looks like cotton. However, it is completely artificial.' },
          ] },

        { label: 'Escribe la descripción', type: 'comment', eyebrow: 'Writing task', title: 'Describe un producto de tu país', intro: 'Escribe 70-110 palabras explicando cómo se produce algo típico de donde vives (café, algodón pima, pescado, cerámica…). La checklist se marca sola al analizar el texto.', placeholder: 'Pima cotton is grown in the north of Peru…', min: 70, max: 110, need: 4,
          checks: [
            { label: 'Digo de qué está hecho o de dónde viene (<i>is made of… / comes from… / is grown in…</i>)', words: ['made of', 'made out of', 'made from', 'made into', 'comes from', 'come from', 'grown in', 'produced in', 'caught in', 'found in'] },
            { label: 'Uso al menos dos verbos de producción en pasivo (<i>is grown, are shipped…</i>)', re: /\b(is|are|was|were)\s+\w*(grown|picked|caught|produced|manufactured|designed|exported|imported|shipped|stored|transported|delivered|frozen|made)\b/ },
            { label: 'Uso un adjetivo de material (<i>soft, strong, light, natural…</i>)', words: ['artificial', 'fragile', 'hard', 'heavy', 'light', 'natural', 'soft', 'strong', 'warm', 'waterproof', 'eco-friendly', 'budget-friendly'] },
            { label: 'Nombro un material concreto (<i>cotton, wood, wool…</i>)', words: ['cotton', 'glass', 'leather', 'metal', 'plastic', 'polyester', 'stone', 'wood', 'wool'] },
            { label: 'Muestro contraste con <i>however</i>, <i>although</i> o <i>though</i>', re: /\b(however|although|though)\b/ },
          ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Las frases, por situación', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Questioning someone's choices</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Are you sure you want to…?</li><li>Do you really need…?</li><li>Why would you want to…?</li></ul></div>
          <div><h3>Approving of someone's choices</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>That's a good idea.</li><li>That's what I would do.</li><li>I think you made the right decision.</li><li>I think you made the right choice.</li></ul></div>
          <div><h3>Changing your mind</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>On second thought, …</li><li>Now that I think about it, …</li><li>OK, you convinced me.</li></ul></div>
          <div class="hint small"><b>Cuidado con el tono.</b> <i>Why would you want to…?</i> suena bastante crítico: úsalo solo con gente de confianza. <i>Are you sure you want to…?</i> es la versión neutra.<br><br><b>On second thought</b> y <b>Now that I think about it</b> significan lo mismo: "pensándolo bien". Van al <b>principio</b> de la frase y llevan coma.<br><br><b>That's what I would do</b> = "yo haría lo mismo" (aprobación), no una crítica.</div></div>` },

        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ["Tara: I think I'm going to get her the purple sweater.", 'Darcy: Are you sure you want to get the purple one? Her favorite color is blue.', "Tara: On second thought, maybe you're right.", 'Tara: And the blue one would look nice with her new coat.', "Darcy: That's what I would do."],
          ['Ryan: I want to buy a sofa bed for the living room.', 'Andrea: Do you really need one? How often do people stay with you?', 'Ryan: Well, not very often, actually. You know, I could get an air mattress.', "Andrea: Now that's a good idea. It's a lot cheaper.", "Ryan: OK, you convinced me. I'll get an air mattress."],
          ['Marta: I found a leather jacket for two hundred dollars.', 'Luis: Why would you want to spend that much? Yours is almost new.', 'Marta: True. Now that I think about it, I need new boots more than a jacket.', 'Luis: I think you made the right decision.', 'Marta: And the boots are waterproof, so I can use them all winter.'],
        ] },

        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices en esta situación?', pool: 7, items: [
          { q: 'Tu amigo quiere comprar un tercer teléfono. Quieres cuestionarlo con suavidad.', opts: ['Are you sure you want to do that?', "That's a good idea.", "That's what I would do.", 'I think you made the right decision.'], a: 'Are you sure you want to do that?', why: 'Es la forma <b>neutra</b> de cuestionar una decisión, sin sonar agresivo.' },
          { q: 'Tu hermana decide llevar el abrigo de lana porque va a hacer frío. Estás de acuerdo.', opts: ["That's what I would do.", 'Do you really need it?', 'Why would you want to do that?', 'Are you sure you want to?'], a: "That's what I would do.", why: 'Aprobar = "yo haría lo mismo".' },
          { q: 'Ibas a comprar el sofá caro, pero ahora ves uno mejor y más barato.', opts: ['On second thought, I\'ll take the cheaper one.', 'Do you really need that?', 'I think you made the right decision.', 'Why would you want to?'], a: 'On second thought, I\'ll take the cheaper one.', why: '<b>On second thought</b> = pensándolo bien: sirve para anunciar que cambias de opinión.' },
          { q: 'Tu compañero dejó su trabajo para montar su propio negocio y le salió bien.', opts: ['I think you made the right decision.', 'Are you sure you want to do that?', 'Do you really need that?', 'On second thought, no.'], a: 'I think you made the right decision.', why: 'Aprobación clara de una decisión ya tomada.' },
          { q: 'Un amigo quiere pedir comida a domicilio otra vez esta semana. Quieres sugerir cocinar.', opts: ['Do you really need to order again?', "That's a good idea.", 'I think you made the right choice.', "That's what I would do."], a: 'Do you really need to order again?', why: '<b>Do you really need…?</b> cuestiona la necesidad de algo.' },
          { q: 'Tu amiga dice que va a reciclar todas las botellas de plástico de la oficina.', opts: ["That's a good idea.", 'Why would you want to do that?', 'Are you sure you want to?', 'On second thought, no.'], a: "That's a good idea.", why: 'Aprobación simple y natural.' },
          { q: 'Estabas convencido de ir al restaurante italiano, pero recuerdas que a tu pareja le encanta el mexicano.', opts: ['Now that I think about it, let\'s go to the Mexican one.', 'Do you really need to?', "That's what I would do.", 'Why would you want to?'], a: 'Now that I think about it, let\'s go to the Mexican one.', why: '<b>Now that I think about it</b> = ahora que lo pienso. Igual que <i>On second thought</i>.' },
          { q: 'Tu amigo te ha convencido de cambiar de opinión. ¿Cómo lo admites?', opts: ['OK, you convinced me.', 'Are you sure you want to?', 'Do you really need it?', 'Why would you want to?'], a: 'OK, you convinced me.', why: 'Frase del diálogo del curso para aceptar el argumento del otro.' },
          { q: '¿Cuál de estas suena MÁS crítica y directa?', opts: ['Why would you want to do that?', 'Are you sure you want to do that?', "That's a good idea.", 'On second thought, …'], a: 'Why would you want to do that?', why: '<i>Why would you want to…?</i> casi implica que la idea es mala. Úsala solo con mucha confianza.' },
          { q: 'Tu colega compró el mismo modelo de coche que tú y te pregunta qué te parece.', opts: ['I think you made the right choice.', 'Do you really need a car?', 'Are you sure you want to?', 'Why would you want that?'], a: 'I think you made the right choice.', why: 'Es exactamente la frase del diálogo del curso: <i>It\'s great. I think you made the right choice.</i>' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Frascos de vidrio y un horno importado', intro: 'Tu esposa quiere cambiar todos los envases del negocio de comida a frascos de vidrio y, de paso, comprar un horno italiano de cuatro mil dólares. Cuestiona las decisiones con tacto, deja que te convenza cuando tenga razón, aprueba lo que sea sensato y cambia de opinión sin perder el buen tono. Si suenas crítico o seco, la conversación se acaba.', scenes: [
          { t: 'Decisiones del negocio', you: 'Aldo, socio del negocio de comida', partner: 'Tu esposa', role: 'tu esposa y socia; llega con dos decisiones tomadas y ganas de ejecutarlas mañana', goal: 'Cuestiona sin criticar, acepta el argumento bueno, frena el gasto grande con suavidad y aprueba la decisión final con las frases de la unidad.', start: 'a', nodes: {
            a: { say: "OK, I've decided. We're switching all our containers to glass jars. I'm ordering three hundred tomorrow.", opts: [
              { t: "Are you sure you want to order that many? Glass is fragile, and we deliver by motorbike.", ok: 2, why: "<b>Are you sure you want to…?</b> es la forma neutra de cuestionar una decisión, y das un motivo concreto con vocabulario de la unidad (<b>fragile</b>).", next: 'b' },
              { t: "Hmm, do you really need three hundred? Maybe start with fifty.", ok: 1, why: "Correcta: <b>Do you really need…?</b> cuestiona la necesidad y propones una alternativa. Un poco más directa que <i>Are you sure…?</i>, pero entre pareja funciona.", next: 'b' },
              { t: "Why would you want to do that? That's a terrible idea.", ok: 0, why: "<b>Why would you want to…?</b> ya suena crítico; rematado con <i>terrible idea</i> es un ataque, no una pregunta. La unidad avisa: esa fórmula solo con mucha confianza y nunca con un juicio detrás.", next: 'a2' },
            ] },
            a2: { say: "Wow. Thanks for the support, Aldo.", opts: [
              { t: "Sorry, that came out wrong. Are you sure you want to switch everything at once? Glass breaks easily.", ok: 2, why: "Reparas el tono y reformulas con la fórmula neutra de la unidad: <b>Are you sure you want to…?</b> + motivo.", next: 'b' },
              { t: "Sorry. I just mean, do you really need to change all of them now?", ok: 1, why: "Correcta: te disculpas y pasas a <b>Do you really need…?</b>, que cuestiona la necesidad sin juzgar la idea.", next: 'b' },
              { t: "I am only saying the true.", ok: 0, why: "Calco de “solo digo la verdad”: en inglés es <i>the truth</i>, y además insistes en el tono. Con <i>I'm only saying…</i> no arreglas nada; hace falta una disculpa.", next: 'fail' },
            ] },
            b: { say: "Well, plastic isn't eco-friendly, and customers notice. Glass looks much better in photos.", opts: [
              { t: "That's true. Now that I think about it, the glass jars would look great on Instagram. But how are they delivered?", ok: 2, why: "Cedes en lo que tiene razón con <b>Now that I think about it, …</b> (= ahora que lo pienso) y sigues con una pregunta en pasivo: <b>How are they delivered?</b>", next: 'c' },
              { t: "OK, that's a good point. But glass is heavy, and our delivery bags aren't made for it.", ok: 1, why: "Correcta y razonable: reconoces el argumento y objetas con vocabulario de la unidad (<b>heavy</b>, <b>aren't made for</b>).", next: 'c' },
              { t: "Plastic is more cheap and it don't break.", ok: 0, why: "Dos errores: <i>cheap</i> es corto → <b>cheaper</b>; y con <i>it</i> → <b>doesn't</b>. Además ignoras su argumento en vez de responderlo.", next: 'c' },
            ] },
            c: { say: "The jars are made in Lima, so they can be delivered in two days. And they're cheaper than I thought: they're actually budget-friendly.", opts: [
              { t: "OK, you convinced me. Let's order a hundred and see how it goes.", ok: 2, why: "<b>OK, you convinced me</b> es la frase de la unidad para aceptar el argumento del otro, y propones empezar pequeño. Fíjate en su pasivo: <i>are made in Lima</i>, <i>can be delivered</i>.", next: 'd' },
              { t: "Fine, that's a good idea. But let's start with a hundred.", ok: 1, why: "Correcta: <b>That's a good idea</b> aprueba, aunque <i>fine</i> suena algo resignado. <i>OK, you convinced me</i> es más generoso.", next: 'd' },
              { t: "OK, OK. Do what you want.", ok: 0, why: "“Haz lo que quieras” no es aprobar: es cerrar la discusión de mala gana. Si te ha convencido, dilo: <b>OK, you convinced me</b>.", next: 'c2' },
            ] },
            c2: { say: "Do what I want? Aldo, this is our business, not mine.", opts: [
              { t: "You're right, sorry. On second thought, I think glass is the right choice. Let's order a hundred to start.", ok: 2, why: "Te disculpas y anuncias el cambio de opinión con <b>On second thought, …</b> (= pensándolo bien), con una propuesta concreta.", next: 'd' },
              { t: "Sorry. I agree with you. Let's try the glass jars.", ok: 1, why: "Correcta y clara. <i>On second thought</i> habría marcado mejor que cambiaste de opinión de verdad.", next: 'd' },
              { t: "I said OK already.", ok: 0, why: "Insistir en el tono seco después de un aviso es la forma segura de que la conversación termine mal.", next: 'fail' },
            ] },
            d: { say: "Great. Oh, and one more thing: I want to buy that Italian oven we saw. It's imported, so it's about four thousand dollars.", opts: [
              { t: "Do you really need a new oven right now? Ours was bought last year and it works fine.", ok: 2, why: "<b>Do you really need…?</b> cuestiona la necesidad de un gasto grande, y el argumento va en pasivo de pasado: <b>was bought last year</b>.", next: 'e' },
              { t: "Are you sure you want to spend that much this month? We just paid for the jars.", ok: 1, why: "Correcta: <b>Are you sure you want to…?</b> + un motivo de dinero. Igual de válida; aquí la necesidad es el punto más fuerte.", next: 'e' },
              { t: "No. We don't have money.", ok: 0, why: "Un <i>no</i> seco corta la conversación y suena a orden. La unidad te da preguntas para cuestionar sin imponer. Y en inglés sería <i>we don't have <b>the</b> money</i>.", next: 'd2' },
            ] },
            d2: { say: "That's not an answer. Why not?", opts: [
              { t: "Sorry. What I mean is: do you really need it now? Our oven was manufactured last year and it still works perfectly.", ok: 2, why: "Reformulas con <b>Do you really need…?</b> y usas el pasivo de pasado con un verbo de la unidad: <b>was manufactured</b>.", next: 'e' },
              { t: "I mean, are you sure? It's a lot of money for an oven.", ok: 1, why: "Correcta: <b>Are you sure?</b> a secas suaviza el <i>no</i> anterior. Un argumento más concreto ayudaría.", next: 'e' },
              { t: "Because I say it.", ok: 0, why: "Calco de “porque lo digo yo”: en inglés es <i>because I say so</i>, y en cualquier idioma es la peor respuesta posible a tu socia.", next: 'fail' },
            ] },
            e: { say: "Hmm. The Italian one is made of steel, and it's supposed to last twenty years. But you're right, ours is fine. On second thought, maybe I should wait until the jars pay for themselves.", opts: [
              { t: "I think you made the right decision. If the jars sell well, we can get it in December.", ok: 2, why: "Aprobación de la unidad: <b>I think you made the right decision</b>. Ella cambió de opinión con <i>On second thought</i>; tú lo reconoces y le das un horizonte.", next: 'f' },
              { t: "That's what I would do. Let's wait a few months.", ok: 1, why: "Correcta: <b>That's what I would do</b> = yo haría lo mismo. Natural y breve.", next: 'f' },
              { t: "Yes, you see? I have the reason.", ok: 0, why: "Calco de “tengo razón”: en inglés es <b>I'm right</b>. Y regodearse cuando el otro cede es justo lo contrario de aprobar su decisión.", next: 'e2' },
            ] },
            e2: { say: "You have the reason? Please don't gloat, Aldo.", opts: [
              { t: "Sorry! I mean, I think you made the right choice. We'll buy it when the business is ready.", ok: 2, why: "Corriges y apruebas con la fórmula de la unidad: <b>I think you made the right choice</b>.", next: 'f' },
              { t: "Sorry, you're right. Good decision.", ok: 1, why: "Correcta y breve. <i>I think you made the right decision</i> suena más completo.", next: 'f' },
              { t: "Whatever. Buy it if you want.", ok: 0, why: "<i>Whatever</i> es desdén puro. Después de pedirte que no te regodees, esto cierra la conversación.", next: 'fail' },
            ] },
            f: { say: "Deal. So, a hundred glass jars. Can you place the order tonight? The website is in English.", opts: [
              { t: "Sure. Now that I think about it, let's ask if the jars are shipped in boxes. We don't want them to arrive broken.", ok: 2, why: "Aceptas y añades una idea con <b>Now that I think about it, …</b>, en pasivo: <b>are shipped</b>. Cierras el tema del vidrio <i>fragile</i> con el que empezaste.", next: 'win' },
              { t: "Of course. I'll order them tonight and ask about the delivery.", ok: 1, why: "Correcta: <b>I'll</b> para una decisión que tomas en el momento, y te ocupas del envío.", next: 'win' },
              { t: "Yes. I order it tonight.", ok: 0, why: "Decisión espontánea → <b>I'll order them tonight</b>, no presente simple. Y los frascos son plural: <i>them</i>.", next: 'meh' },
            ] },
            win: { say: "Perfect. Glass jars this month, oven in December. See? We make a good team.", end: true, outcome: 'win', note: "Cuestionaste con tacto (<b>Are you sure you want to…?</b>, <b>Do you really need…?</b>), cediste cuando tocaba (<b>OK, you convinced me</b>, <b>Now that I think about it, …</b>) y aprobaste la decisión final (<b>I think you made the right decision</b>). De fondo, el pasivo de la unidad: <i>are made in Lima</i>, <i>was bought last year</i>, <i>are shipped in boxes</i>." },
            meh: { say: "OK, thanks. Let's see how they arrive.", end: true, outcome: 'meh', note: "Negociaste bien de principio a fin, pero la última frase falló: para una decisión que tomas en el momento se usa <b>I'll order them tonight</b>, no <i>I order it</i>. Ella no dijo nada; un nativo lo nota." },
            fail: { say: "You know what? Forget it. I'll decide on my own.", end: true, outcome: 'fail', note: "El tono lo decidió todo. Para cuestionar sin herir, la unidad te da <b>Are you sure you want to…?</b> (neutra) y <b>Do you really need…?</b>; <b>Why would you want to…?</b> solo con mucha confianza y nunca con un juicio detrás. Y si te convence, dilo: <b>OK, you convinced me</b> / <b>On second thought, …</b>" },
          } },
        ] },
      ] },
    ],
  };
})();
