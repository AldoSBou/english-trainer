/* ===========================================================
   ingles3/unit2.js — Inglés 3 · Unit 2: So much stuff
   Lesson 1 My garage · Lesson 2 So many features
   Lesson 3 Guess what! · Lesson 4 It's useless, right?
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Vocabulario 1: describing possessions ---------- */
  const POSS = [
    ['brand new', 'completamente nuevo, sin estrenar', 'He can try all the brand new smartphone models at work.', '¿Cuál fue la última cosa que compraste <i>brand new</i>?'],
    ['used', 'usado, de segunda mano', "They're not new; they're used!", '¿Compras cosas <i>used</i> o prefieres estrenar?'],
    ['outdated', 'anticuado, desfasado', 'Those plates look really old and outdated.', '¿Qué aparato tuyo está ya <i>outdated</i>?'],
    ['damaged', 'dañado, estropeado', "I sat on my sunglasses, and now they're damaged.", '¿Tienes algo <i>damaged</i> que aún guardas?'],
    ['useful', 'útil', 'That chair could be useful for your office.', '¿Cuál es el objeto más <i>useful</i> de tu casa?'],
    ['useless', 'inútil, que no sirve para nada', "It doesn't have one of its wheels. It's totally useless!", '¿Qué cosa <i>useless</i> no eres capaz de tirar?'],
    ['valuable', 'valioso, de mucho valor', "The necklace is quite valuable.", '¿Tienes algo <i>valuable</i> en casa?'],
    ['be worth', 'valer (una cantidad de dinero)', "It's worth hundreds of dollars, but the money doesn't matter to me.", '¿Cuánto crees que <i>is worth</i> tu teléfono ahora mismo?'],
    ['fancy', 'elegante, lujoso, con adornos', 'I have some fancy sunglasses in my junk drawer.', '¿Tienes ropa <i>fancy</i> o prefieres algo sencillo?'],
    ['plain', 'sencillo, liso, sin adornos', 'I wore a plain white dress, nothing fancy.', '¿Prefieres las cosas <i>plain</i> o <i>fancy</i>?'],
    ['special', 'especial, con valor sentimental', "Your grandpa spilled coffee on it, but it's still very special to me.", '¿Qué objeto es <i>special</i> para ti y por qué?'],
    ['one of a kind', 'único en su especie, irrepetible', "It's one of a kind because someone made it for my great-great-grandmother.", '¿Tienes algo <i>one of a kind</i>?'],
    ['in good condition', 'en buen estado', 'Are they in good condition?', '¿Está tu teléfono <i>in good condition</i>?'],
    ['remind someone of', 'recordarle algo a alguien (traer a la memoria)', 'It reminds me of my grandmother.', '¿Qué objeto te <i>reminds of</i> alguien especial?'],
    ['a collector', 'un coleccionista', 'A collector is a person who finds and keeps things that are interesting to them.', '¿Eres <i>a collector</i> de algo?'],
    ['junk drawer', 'cajón de los trastos', 'My fancy sunglasses are in my junk drawer.', '¿Qué hay en tu <i>junk drawer</i>?'],
  ];

  /* ---------- Vocabulario 2: tech features ---------- */
  const TECH = [
    ['delete', 'borrar, eliminar', "Why don't you delete some of the apps?", '¿Cuándo fue la última vez que hiciste <i>delete</i> de algo?'],
    ['device', 'dispositivo, aparato electrónico', 'A cell phone, a tablet, and a laptop are all examples of different electronic devices.', '¿Cuántos <i>devices</i> usas cada día?'],
    ['folder', 'carpeta (de archivos)', 'You have one folder for movies, one for music, and 20 for photos!', '¿Tienes tus archivos en <i>folders</i> o todo mezclado?'],
    ['home screen', 'pantalla de inicio', 'Mark deleted apps from his home screen.', '¿Qué apps tienes en tu <i>home screen</i>?'],
    ['model', 'modelo (versión de un producto)', 'When you buy a laptop, choose a model which has a lot of storage.', '¿Qué <i>model</i> de teléfono tienes?'],
    ['set up', 'configurar, dejar listo para usar', 'They are quick and easy to set up.', '¿Te resulta fácil <i>set up</i> un aparato nuevo?'],
    ['storage', 'almacenamiento, espacio para archivos', "I don't have enough storage on this laptop to save any more photos.", '¿Te falta <i>storage</i> en tu teléfono?'],
    ['sync', 'sincronizar (entre dispositivos)', 'You can easily sync your new laptop to your tablet or smartphone.', '¿Haces <i>sync</i> de tus fotos con la nube?'],
    ['try', 'probar algo, testearlo un rato', 'Can I try using your tablet in one of my classes?', '¿Te gusta <i>try</i> los aparatos antes de comprarlos?'],
    ['work', 'funcionar', "I did that, but it still doesn't work very well.", '¿Qué aparato de tu casa ya no <i>works</i> bien?'],
  ];

  const POSSW = ['brand new', 'used', 'outdated', 'damaged', 'useful', 'useless', 'valuable', 'fancy', 'plain', 'special', 'one of a kind', 'in good condition', 'a collector', 'junk drawer'];
  const TECHW = ['delete', 'device', 'folder', 'home screen', 'model', 'set up', 'storage', 'sync', 'try', 'work'];

  const SIT = [
    ['You bought it yesterday and nobody has ever used it.', 'brand new'],
    ['Somebody else owned this bike before you did.', 'used'],
    ['Your laptop still starts, but it is ten years old and looks old-fashioned.', 'outdated'],
    ['You sat on your sunglasses and now one arm is broken.', 'damaged'],
    ['This old box is perfect for keeping all your cables tidy.', 'useful'],
    ['The chair has lost one of its wheels and nobody can sit on it.', 'useless'],
    ['This ring belonged to your great-grandmother and costs thousands of dollars.', 'valuable'],
    ['It has gold decoration all over it and looks very expensive.', 'fancy'],
    ['A white T-shirt with no logo, no colors and no decoration.', 'plain'],
    ['Nobody else in the world has a necklace like this one.', 'one of a kind'],
    ['The watch is 40 years old, but everything still works perfectly.', 'in good condition'],
    ['It is not expensive, but your dad gave it to you before he moved away.', 'special'],
    ['A person who finds and keeps old maps because he loves them.', 'a collector'],
    ['The drawer in your kitchen full of keys, cables and old batteries.', 'junk drawer'],
  ];

  const TECHSIT = [
    ['You want to remove an app you never use from your phone.', 'delete'],
    ['A tablet, a laptop and a cell phone are all examples of this.', 'device'],
    ['You keep all your work documents together in this, so you find them fast.', 'folder'],
    ['The first screen you see when you turn on your phone.', 'home screen'],
    ['The store has the newest version of that cell phone.', 'model'],
    ['You just bought a laptop and you have to prepare it before using it.', 'set up'],
    ['Your phone says there is no space left for more photos.', 'storage'],
    ['You want the music on your tablet to also be on your phone.', 'sync'],
    ['You want to test a tablet in the store before you buy it.', 'try'],
    ['Your old phone is slow and the apps freeze: it does not do this well.', 'work'],
  ];

  window.UNIT_DATA['ingles3/unit2'] = {
    source: 'WeTalk · Level 3 · Unit 2 · So much stuff (posesiones y tecnología)',
    description: 'Describir lo que tienes y cuánto tiempo hace que lo tienes: adjetivos de posesiones, vocabulario tecnológico y present perfect con ever, never, for, since, already y yet.',
    map: [
      ['Vocabulary', '<b>Describing possessions</b> (<i>fancy, plain, damaged, outdated, useless, valuable, one of a kind…</i>) y <b>tech features</b> (<i>delete, device, folder, storage, sync, set up…</i>)', 'Flashcards con audio, emparejar con definición, objeto por situación, ¿nombre o verbo?'],
      ['Grammar', 'Present perfect con <i>ever, never, for, since</i> (Lesson 1) y con <i>already, yet</i> (Lesson 2)', 'Tabla resumen, elegir el marcador, posición de already/yet, forma y orden de palabras'],
      ['Listening', 'Podcast sobre un coleccionista; escuchar ejemplos y razones (<i>for example, like, such as, because, so</i>)', 'Dictado con voz sintética y diálogo con preguntas'],
      ['Speaking', 'Hablar de las cosas que tienes: cuánto tiempo, cómo las conseguiste, en qué estado están', 'Retos con cronómetro y micrófono; pronunciación /t/ y /w/'],
      ['Reading', 'Vídeo y podcast sobre colecciones y cosas que guardamos', 'Texto nuevo sobre por qué coleccionamos + inferir significado'],
      ['Writing', 'Escribir un anuncio online; usar <i>one</i> y <i>ones</i> para no repetir', 'Corrige tus errores, reescribe con one/ones, checklist del anuncio'],
      ['Social English', 'Introducir temas (<i>Guess what! You know…</i>), cambiar de tema (<i>By the way, Before I forget</i>), volver al tema (<i>Anyway</i>) y preguntas cortas de interés (<i>You are? He was?</i>)', 'Frases por situación, ordenar diálogos, respuesta rápida'],
    ],
    cando: [
      'Describir mis cosas con <i>brand new, used, outdated, damaged, useless, valuable, plain, fancy, one of a kind</i> y decir si están <i>in good condition</i>',
      'Hablar de mi tecnología con <i>device, model, storage, folder, home screen, set up, sync, delete</i> y distinguir <i>try</i> (probar) de <i>work</i> (funcionar)',
      'Decir cuánto tiempo hace que tengo algo con <i>for</i> y <i>since</i> (<i>I\'ve had this phone for two years / since 2024</i>)',
      'Preguntar por experiencias con <i>Have you ever…?</i> y responder con <i>never</i> o <i>haven\'t</i>, sin mezclarlos',
      'Contar qué ya hice y qué todavía no con <i>already</i> (antes del participio) y <i>yet</i> (al final)',
      'Introducir un tema (<i>Guess what!</i>, <i>You know…, right?</i>), cambiarlo (<i>By the way</i>, <i>Before I forget</i>), retomarlo (<i>Anyway</i>) y mostrar interés con preguntas cortas (<i>You are? He did?</i>)',
    ],
    weak: [
      '<b>ever vs never</b>: pusiste <i>"have"</i> donde iba <i>ever</i> y <i>ever</i> donde iba <i>never</i>. Regla corta: <b>ever</b> solo en preguntas (<i>Have you <b>ever</b>…?</i>), <b>never</b> solo en afirmativas con sentido negativo (<i>I\'ve <b>never</b>…</i>).',
      '<b>never vs haven\'t</b>: escribiste <i>"I\'ve haven\'t eaten Thai food"</i> → <i>I\'ve <b>never</b> eaten Thai food</i>. O bien <i>I <b>haven\'t</b> eaten</i>, o bien <i>I\'<b>ve never</b> eaten</i>, nunca los dos juntos.',
      '<b>have/has con "you"</b>: escribiste <i>"How long <s>has</s> you known Josh?"</i> → <i>How long <b>have</b> you known Josh?</i>. <i>has</i> solo con <i>he / she / it</i>.',
      '<b>try vs work</b>: escribiste <i>"Can I <s>work</s> using your tablet?"</i> → <i>Can I <b>try</b> using your tablet?</i>. <b>try</b> = probar algo un rato; <b>work</b> = funcionar (un aparato).',
    ],
    weakLink: 'Trabájalos en <b>Writing › Corrige tus frases</b> y en <b>Grammar › Forma y orden</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...POSS.map(p => ({ cat: 'Describing possessions', w: p[0], def: p[1], ex: p[2], ask: p[3] })),
            ...TECH.map(t => ({ cat: 'Tech features', w: t[0], def: t[1], ex: t[2], ask: t[3] })),
          ] },
        { label: 'Palabra ↔ definición', type: 'match', eyebrow: 'Vocabulary', title: 'Empareja la palabra con su definición', intro: 'Toca una palabra de la izquierda y luego su definición. Todas las definiciones están en inglés: intenta pensar en inglés, no traducir.',
          round: 6,
          pairs: [
            ['brand new', 'completely new, never used'],
            ['used', 'someone else owned it before you'],
            ['outdated', 'old-fashioned; a newer version exists'],
            ['damaged', 'broken or in bad condition'],
            ['useless', "it doesn't work, you can't use it"],
            ['valuable', 'worth a lot of money'],
            ['one of a kind', 'unique; there is nothing else like it'],
            ['plain', 'simple, with no decoration'],
            ['fancy', 'expensive-looking and decorated'],
            ['a collector', 'a person who finds and keeps interesting things'],
            ['storage', 'space on a device to keep your files'],
            ['sync', 'connect devices so they share the same files'],
            ['set up', 'prepare a new device so you can use it'],
            ['delete', 'remove a file or an app'],
            ['home screen', 'the first screen you see on your phone'],
            ['model', 'a particular version of a product'],
          ] },
        { label: '¿Qué palabra es?', type: 'mcq', eyebrow: 'Describing possessions', title: 'Lee la situación y elige la palabra', pool: 7,
          build: ({ pick, esc }) => pick(SIT, 7).map(s => {
            const card = POSS.find(p => p[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(POSSW.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + card[0] + '</b> — ' + card[1] + '. “' + card[2] + '”' };
          }) },
        { label: 'Tech features', type: 'mcq', eyebrow: 'Tech features', title: '¿Qué palabra tecnológica necesitas?', pool: 7,
          build: ({ pick, esc }) => pick(TECHSIT, 7).map(s => {
            const card = TECH.find(t => t[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(TECHW.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + card[0] + '</b> — ' + card[1] + '. “' + card[2] + '”' };
          }) },
        { label: '¿Nombre o verbo?', type: 'mcq', eyebrow: 'Word class', title: 'Decide si la palabra es nombre, verbo o ambos', intro: 'En el curso clasificaste estas palabras. Recuerda: solo <i>work</i> es las dos cosas.', pool: 6, items: [
          { q: '<b>work</b>', opts: ['both noun and verb', 'only a noun', 'only a verb'], a: 'both noun and verb', why: '<i>I have a lot of <b>work</b></i> (nombre) / <i>My phone doesn\'t <b>work</b></i> (verbo).' },
          { q: '<b>home screen</b>', opts: ['only a noun', 'only a verb', 'both noun and verb'], a: 'only a noun', why: 'Es un lugar de la pantalla: <i>apps on my <b>home screen</b></i>.' },
          { q: '<b>device</b>', opts: ['only a noun', 'only a verb', 'both noun and verb'], a: 'only a noun', why: 'Un aparato: <i>a tablet is a <b>device</b></i>.' },
          { q: '<b>model</b>', opts: ['only a noun', 'only a verb', 'both noun and verb'], a: 'only a noun', why: 'Aquí es la versión de un producto: <i>the latest <b>model</b></i>.' },
          { q: '<b>storage</b>', opts: ['only a noun', 'only a verb', 'both noun and verb'], a: 'only a noun', why: 'El verbo es <i>store</i>; el nombre es <b>storage</b>.' },
          { q: '<b>folder</b>', opts: ['only a noun', 'only a verb', 'both noun and verb'], a: 'only a noun', why: 'Una carpeta: <i>20 <b>folders</b> for photos</i>.' },
          { q: '<b>delete</b>', opts: ['only a verb', 'only a noun', 'both noun and verb'], a: 'only a verb', why: '<i>He <b>deleted</b> apps from his home screen.</i>' },
          { q: '<b>sync</b>', opts: ['only a verb', 'only a noun', 'both noun and verb'], a: 'only a verb', why: '<i>You could always <b>sync</b> it to your tablet.</i>' },
          { q: '<b>try</b>', opts: ['only a verb', 'only a noun', 'both noun and verb'], a: 'only a verb', why: '<i>Can I <b>try</b> using your tablet?</i> = probarlo un rato.' },
          { q: '<b>set up</b>', opts: ['only a verb', 'only a noun', 'both noun and verb'], a: 'only a verb', why: 'Verbo compuesto: <i>they are easy to <b>set up</b></i>.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Present perfect · los seis marcadores', title: 'ever · never · for · since · already · yet', html: `
          <p style="margin:8px 0 14px">El present perfect se forma siempre igual: <b>have / has + participio</b>. Lo que cambia es la palabrita que lo acompaña, y cada una tiene su sitio fijo en la frase.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Palabra</th><th>Tipo de frase</th><th>Para qué</th><th>Ejemplo del curso</th><th>Dónde va</th></tr></thead><tbody>
            <tr><td><b>ever</b></td><td>solo preguntas</td><td>preguntar por una experiencia en cualquier momento de la vida</td><td><b>Have</b> you <b>ever been</b> to a music festival?</td><td>entre el sujeto y el participio</td></tr>
            <tr><td><b>never</b></td><td>afirmativa con sentido negativo</td><td>decir que algo no ha pasado nunca</td><td>I<b>'ve never been</b> to a music festival.</td><td>entre <i>have</i> y el participio</td></tr>
            <tr><td><b>haven't / hasn't</b></td><td>negativa</td><td>lo mismo que <i>never</i>, pero con el auxiliar en negativo</td><td>I <b>haven't been</b> to a music festival.</td><td>—</td></tr>
            <tr><td><b>for</b></td><td>cualquiera</td><td><b>duración</b>: cuánto tiempo dura algo</td><td>I've kept it next to my bed <b>for</b> the last ten years.</td><td>al final, + periodo</td></tr>
            <tr><td><b>since</b></td><td>cualquiera</td><td><b>inicio</b>: el momento en que empezó</td><td>I've had this teddy bear <b>since</b> I was six years old.</td><td>al final, + punto en el tiempo</td></tr>
            <tr><td><b>already</b></td><td>solo afirmativas</td><td>algo que ya pasó, antes de lo esperado</td><td>We've <b>already</b> bought him a TV.</td><td><b>antes</b> del participio</td></tr>
            <tr><td><b>yet</b></td><td>preguntas y negativas</td><td>algo que todavía no ha pasado, pero se espera que pase</td><td>Have you bought any baby clothes <b>yet</b>?</td><td><b>al final</b> de la frase</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:18px">for vs since en dos segundos</h3>
          <p style="margin-top:6px">Si detrás puedes poner <i>ago</i>, es <b>for</b> (un periodo): <i>for two days, for ten years, for a long time</i>. Si es una fecha, una hora o un acontecimiento, es <b>since</b> (un punto): <i>since January, since 2010, since I was six, since college</i>.</p>
          <div class="hint" style="margin-top:14px"><b>Tus errores a vigilar:</b><br>
            · <i>ever</i> <b>solo</b> en preguntas: "I've <s>ever</s> visited Thailand" ❌ → <b>I've never visited Thailand</b> ✅<br>
            · nunca <i>have</i> + <i>haven't</i> juntos: "I've <s>haven't</s> eaten Thai food" ❌ → <b>I've never eaten</b> / <b>I haven't eaten</b> ✅<br>
            · con <i>you</i> el auxiliar es <b>have</b>: "How long <s>has</s> you known Josh?" ❌ → <b>How long have you known Josh?</b> ✅</div>
          <h3 style="margin-top:18px">Orden de palabras en preguntas</h3>
          <p style="margin-top:6px"><b>How long</b> + <b>have/has</b> + sujeto + participio: <i>How long <b>have you known</b> Josh?</i><br>
          <b>Have/Has</b> + sujeto + <b>ever</b> + participio: <i>Have you <b>ever</b> ridden a motorcycle?</i><br>
          <b>Have/Has</b> + sujeto + participio + … + <b>yet</b>: <i>Have you installed the car seat <b>yet</b>?</i></p>` },

        { label: 'ever · never · for · since', type: 'mcq', eyebrow: 'Lesson 1', title: 'Elige el marcador correcto', pool: 7, items: [
          { blank: 1, q: 'Have you ___ been to a flea market?', opts: ['ever', 'never', 'for', 'since'], a: 'ever', why: 'Es una pregunta sobre una experiencia → <b>ever</b>. Nunca <i>never</i> en preguntas de este tipo.' },
          { blank: 1, q: "I've ___ owned a brand new car in my life.", opts: ['never', 'ever', 'yet', 'since'], a: 'never', why: 'Afirmativa con sentido negativo → <b>never</b>. (<i>I haven\'t owned…</i> también valdría.)' },
          { blank: 1, q: "I've had this watch ___ my graduation.", opts: ['since', 'for', 'ever', 'already'], a: 'since', why: '<i>My graduation</i> es un punto concreto en el tiempo → <b>since</b>.' },
          { blank: 1, q: "We've lived in this apartment ___ eleven years.", opts: ['for', 'since', 'ever', 'yet'], a: 'for', why: '<i>Eleven years</i> es un periodo de duración → <b>for</b>.' },
          { blank: 1, q: "She hasn't used that laptop ___ last winter.", opts: ['since', 'for', 'never', 'already'], a: 'since', why: '<i>Last winter</i> = cuándo empezó a no usarlo → <b>since</b>.' },
          { blank: 1, q: "I haven't charged my tablet ___ two days.", opts: ['for', 'since', 'ever', 'yet'], a: 'for', why: '<i>Two days</i> = duración → <b>for</b>.' },
          { blank: 1, q: "He's collected old maps ___ he was a kid.", opts: ['since', 'for', 'ever', 'already'], a: 'since', why: 'Una frase entera con el momento de inicio (<i>he was a kid</i>) → <b>since</b>.' },
          { blank: 1, q: "I've wanted a new phone ___ ages.", opts: ['for', 'since', 'never', 'yet'], a: 'for', why: '<i>Ages</i> = un montón de tiempo, duración → <b>for</b>.' },
          { blank: 1, q: "I've ___ seen a collection that big.", opts: ['never', 'ever', 'yet', 'for'], a: 'never', why: 'Afirmativa con sentido negativo → <b>never</b>, entre <i>have</i> y el participio.' },
          { blank: 1, q: "They haven't spoken to each other ___ 2019.", opts: ['since', 'for', 'ever', 'already'], a: 'since', why: 'Un año es un punto en el tiempo → <b>since</b>.' },
          { blank: 1, q: 'My grandma has kept that plain white dress ___ fifty years.', opts: ['for', 'since', 'yet', 'ever'], a: 'for', why: '<i>Fifty years</i> = periodo → <b>for</b>.' },
          { blank: 1, q: 'Has your brother ___ fixed a watch?', opts: ['ever', 'never', 'yet', 'already'], a: 'ever', why: 'Pregunta de experiencia → <b>ever</b>, entre el sujeto y el participio.' },
          { blank: 1, q: "I've never ___ anything on that website.", opts: ['bought', 'buy', 'buying', 'buyed'], a: 'bought', why: 'Después de <i>have/never</i> va el <b>participio</b>: <i>buy → bought</i>.' },
          { blank: 1, q: "I haven't seen my brother ___ January. He lives 350 miles away.", opts: ['since', 'for', 'ever', 'yet'], a: 'since', why: 'Un mes concreto = punto de inicio → <b>since</b>. Frase del curso.' },
        ] },

        { label: 'already · yet', type: 'mcq', eyebrow: 'Lesson 2', title: '¿already o yet?', pool: 7, items: [
          { blank: 1, q: "I haven't set up my new phone ___. I plan to do it this evening.", opts: ['yet', 'already', 'ever', 'since'], a: 'yet', why: 'Negativa + algo que esperas hacer → <b>yet</b>, al final de la frase.' },
          { blank: 1, q: "We've ___ deleted all the old photos.", opts: ['already', 'yet', 'never', 'since'], a: 'already', why: 'Afirmativa, antes de lo esperado → <b>already</b>, delante del participio.' },
          { blank: 1, q: 'Have you synced your two devices ___?', opts: ['yet', 'already', 'ever', 'for'], a: 'yet', why: 'Pregunta sobre algo que esperas que pase → <b>yet</b>, al final.' },
          { blank: 1, q: "She's ___ sold three of her old cameras.", opts: ['already', 'yet', 'never', 'since'], a: 'already', why: 'Afirmativa → <b>already</b>.' },
          { blank: 1, q: "They haven't found the right one ___.", opts: ['yet', 'already', 'ever', 'for'], a: 'yet', why: 'Negativa → <b>yet</b>, al final.' },
          { blank: 1, q: "Don't buy it — I've ___ ordered one for you!", opts: ['already', 'yet', 'never', 'since'], a: 'already', why: 'Afirmativa, y antes de lo esperado → <b>already</b>.' },
          { blank: 1, q: 'Has the package arrived ___?', opts: ['yet', 'already', 'ever', 'for'], a: 'yet', why: 'Pregunta → <b>yet</b>.' },
          { blank: 1, q: "He's ___ tried every model in the store.", opts: ['already', 'yet', 'never', 'since'], a: 'already', why: 'Afirmativa → <b>already</b>, delante del participio <i>tried</i>.' },
          { blank: 1, q: "I haven't decided which one to buy ___.", opts: ['yet', 'already', 'ever', 'for'], a: 'yet', why: 'Negativa → <b>yet</b>, al final.' },
          { q: '¿Cuál tiene el orden correcto?', opts: ["They've already painted the bedroom.", 'They have painted already the bedroom.', 'They already have painted the bedroom.', 'They have yet painted the bedroom.'], a: "They've already painted the bedroom.", why: '<b>already</b> va entre el auxiliar y el participio: <i>have <b>already</b> painted</i>.' },
          { q: '¿Cuál tiene el orden correcto?', opts: ['Have you eaten breakfast yet?', 'Have you yet eaten breakfast?', 'Yet have you eaten breakfast?', 'Have already you eaten breakfast?'], a: 'Have you eaten breakfast yet?', why: '<b>yet</b> siempre al final de la pregunta.' },
          { q: '¿Cuál es correcta?', opts: ["I haven't completed it yet.", "I haven't completed it already.", "I've not completed it already.", "I haven't yet it completed."], a: "I haven't completed it yet.", why: 'En negativas se usa <b>yet</b>, nunca <i>already</i>, y va al final.' },
        ] },

        { label: 'Forma y orden', type: 'mcq', eyebrow: 'Tus errores del curso', title: 'Auxiliar, participio y orden de palabras', intro: 'Estos ítems atacan justo los fallos que cometiste en los ejercicios de la unidad.', pool: 7, items: [
          { blank: 1, q: 'Ellen, how long ___ you known Josh?', opts: ['have', 'has', 'are', 'do'], a: 'have', why: 'Con <i>you</i> el auxiliar es <b>have</b>. <i>Has</i> solo con <i>he / she / it</i>. <b>Este fue tu error en el curso.</b>' },
          { blank: 1, q: "I've ___ eaten Thai food. What do you recommend I order?", opts: ['never', "haven't", 'not ever', "don't"], a: 'never', why: 'Ya tienes <i>’ve</i>, así que el negativo lo pone <b>never</b>. <i>I’ve haven’t</i> es imposible. <b>Tu error del curso.</b>' },
          { q: '¿Cuál de estas frases es INCORRECTA?', opts: ["I've ever owned a laptop.", "I've never sold anything online.", "I haven't set it up yet.", 'Have you ever tried this model?'], a: "I've ever owned a laptop.", why: '<b>ever</b> no se usa en afirmativas. Lo correcto es <i>I’ve <b>never</b> owned a laptop</i>.' },
          { blank: 1, q: 'She ___ this phone for two years.', opts: ['has had', 'have had', 'has have', 'is having'], a: 'has had', why: '<i>She</i> → <b>has</b> + participio de <i>have</i>, que es <b>had</b>.' },
          { blank: 1, q: 'My parents ___ never used a tablet.', opts: ['have', 'has', 'are', 'did'], a: 'have', why: '<i>My parents</i> es plural → <b>have</b>.' },
          { blank: 1, q: '___ your sister ever collected anything?', opts: ['Has', 'Have', 'Did', 'Does'], a: 'Has', why: '<i>Your sister</i> = she → <b>Has</b>.' },
          { blank: 1, q: "I ___ my brother since January.", opts: ["haven't seen", "haven't saw", "didn't see", 'am not seeing'], a: "haven't seen", why: 'Con <i>since</i> se usa present perfect: <b>haven’t + participio</b> (<i>see → seen</i>).' },
          { blank: 1, q: "He ___ here for about ten years.", opts: ["'s been", "'s being", 'is been', 'have been'], a: "'s been", why: '<i>He has been</i> → <b>he’s been</b>.' },
          { q: '¿Cuál tiene el orden correcto?', opts: ['How long have you known Josh?', 'How long has you known Josh?', 'How long you have known Josh?', 'How long have you know Josh?'], a: 'How long have you known Josh?', why: '<b>How long + have + sujeto + participio</b>. <b>Tu error del curso.</b>' },
          { blank: 1, q: 'We ___ each other since college.', opts: ["haven't seen", "haven't saw", "don't have seen", "hasn't seen"], a: "haven't seen", why: '<i>We</i> → <b>haven’t</b>; participio de <i>see</i> = <b>seen</b>.' },
          { blank: 1, q: 'REPASO: I ___ a lot of likes on that post last week.', opts: ['got', 'have got', 'have been getting', 'was getting'], a: 'got', why: 'Repaso: <i>last week</i> es un momento terminado y concreto → <b>simple past</b>, no present perfect.' },
          { blank: 1, q: 'REPASO: ___ you ever broken a record?', opts: ['Have', 'Did', 'Were', 'Do'], a: 'Have', why: 'Repaso: <i>ever</i> + experiencia → present perfect con <b>Have</b>.' },
          { blank: 1, q: "REPASO: I ___ time to fix my sunglasses this week.", opts: ["don't have", "haven't", 'am not having', "hasn't"], a: "don't have", why: 'Repaso: <b>have</b> como verbo principal (tener) se niega con <b>don’t have</b>.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>I\'ve</i>, <i>haven\'t</i>).',
          sentences: [
            "I've had this teddy bear since I was six years old.",
            "I've kept it next to my bed for the last ten years.",
            'Have you ever been to a music festival?',
            "I've never eaten Thai food. What do you recommend?",
            "I haven't seen my brother since January.",
            'How long have you known Josh?',
            "I don't have enough storage on this laptop.",
            "Why don't you store your stuff on another device?",
            "I haven't set up my new phone yet.",
            "We've already bought him a TV.",
            "They're not new; they're used, and they look outdated.",
            "It's one of a kind, and it reminds me of my grandmother.",
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for examples and reasons', title: 'Escucha a dos amigos hablar de una colección', intro: 'Escúchalo entero antes de responder. Fíjate en las frases que introducen ejemplos (<i>like, such as, for example</i>) y razones (<i>because, so</i>).',
          lines: [
            ['Hana', "So, you know I'm interested in old cameras, right?"],
            ['Diego', 'You are? How many do you have now?'],
            ['Hana', "Twenty-six! And guess what — I've already bought two more online."],
            ['Diego', 'Cool. Are they in good condition?'],
            ['Hana', "I don't know. I haven't gotten them yet. Anyway, they looked good in the photos."],
            ['Diego', 'How long have you collected cameras?'],
            ['Hana', "Since I was fifteen. My dad gave me his old one, and it still works. It isn't valuable, but it's really special to me because it reminds me of him."],
            ['Diego', "By the way, have you been to the Sunday market? People sell used stuff there, like cameras, watches, all kinds of things."],
            ['Hana', "I haven't been there yet, but I'd love to. Let's go this weekend!"],
          ],
          questions: [
            { q: "Why doesn't Hana know the condition of the two new cameras?", opts: ["She hasn't received them yet.", 'They are damaged.', 'She has already sold them.'], a: "She hasn't received them yet.", why: '"I haven\'t gotten them <b>yet</b>." <i>Yet</i> = todavía no, pero lo espera.' },
            { q: 'How long has Hana collected cameras?', opts: ['Since she was fifteen.', 'For fifteen years.', 'Since last summer.'], a: 'Since she was fifteen.', why: '"<b>Since</b> I was fifteen" → un punto de inicio, no una duración.' },
            { q: "Why is her dad's camera special to her?", opts: ['It reminds her of her dad.', "It's worth a lot of money.", "It's brand new."], a: 'It reminds her of her dad.', why: '"It isn\'t valuable, but it\'s really special to me <b>because</b> it <b>reminds me of</b> him."' },
            { q: 'Which phrase does Diego use to change the subject?', opts: ['By the way', 'Anyway', 'Guess what'], a: 'By the way', why: '<b>By the way</b> = cambiar de tema. <i>Anyway</i> vuelve al tema y <i>Guess what</i> introduce una noticia.' },
            { q: 'When Diego says "You are?", what is he doing?', opts: ['Showing that he is interested.', 'Saying he disagrees.', "Saying he didn't hear."], a: 'Showing that he is interested.', why: 'Preguntas cortas con <i>be</i> o un auxiliar en el mismo tiempo = mostrar interés.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Things you own', task: 'Elige un tema (books, clothes, furniture, jewelry, technology, things you collect) y habla 60 segundos: cuánto tiempo hace que lo tienes, cómo lo conseguiste, cómo lo describirías, en qué estado está y por qué es importante para ti.', model: 'Modelo: "I\'ve had this guitar since I was seventeen. My uncle gave it to me, so it\'s really special. It isn\'t fancy — it\'s quite plain, actually — and it\'s a bit damaged, but it\'s still in good condition and I\'ve played it for almost twenty years."', tags: ['since', 'for', 'special', 'plain', 'damaged', 'in good condition', 'gave'] },
          { t: 'Have you ever…?', task: 'Hazte tres preguntas con <i>Have you ever…?</i> sobre cosas que tienes o has comprado, y respóndelas tú mismo: dos con <i>never</i> y una afirmativa.', model: 'Modelo: "Have I ever sold anything online? Yes, I\'ve sold two old phones. Have I ever bought something one of a kind? No, I\'ve never bought anything like that. Have I ever lost something valuable? No, I haven\'t."', tags: ['have you ever', 'never', "haven't", 'sold', 'bought', 'valuable', 'one of a kind'] },
          { t: 'My tech', task: 'Describe tu teléfono o tu laptop usando al menos cinco palabras de <i>tech features</i>: modelo, almacenamiento, cómo lo configuraste, qué sincronizas y qué borras.', model: 'Modelo: "My laptop is an old model, so it doesn\'t have much storage. I sync my photos with my phone, and every month I delete files I don\'t need. It was easy to set up, but some apps don\'t work very well now."', tags: ['model', 'storage', 'sync', 'delete', 'set up', 'device', 'work'] },
          { t: 'Sell it!', task: 'Vende en voz alta algo que ya no usas, como en un anuncio online: qué es, cuánto tiempo lo has tenido, en qué estado está, cuánto vale y por qué lo vendes. Usa <i>one</i> u <i>ones</i> para no repetir el objeto.', model: 'Modelo: "I\'m selling a desk lamp. I\'ve had it for three years and it\'s still in good condition — it\'s the small one with a black base. It\'s worth about thirty dollars, but I\'ll take twenty because I\'ve already bought a new one."', tags: ['for', 'in good condition', 'worth', 'already', 'one', 'selling', 'used'] },
          { t: 'Switch the topic', task: 'Haz tú las dos voces de una conversación de 60 segundos: empieza con un tema, introduce otro con <i>Guess what!</i> o <i>You know…</i>, cámbialo con <i>By the way</i> u <i>Oh, before I forget</i>, y vuelve al primero con <i>Anyway</i>. Usa también una pregunta corta de interés.', model: 'Modelo: "You know I collect old watches, right? — You do? — Yeah, and guess what! I just bought two more. By the way, have you heard that Tori is in town? — She is? — Anyway, the watches arrive on Saturday."', tags: ['you know', 'guess what', 'by the way', 'before i forget', 'anyway', 'you do', 'she is'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación · /t/ y /w/', title: 'La /t/ inicial y el sonido /w/', intro: 'En la unidad practicaste la /t/ al principio de palabra (sale con una pequeña explosión de aire) y el sonido /w/ (labios redondeados, nunca como una <i>v</i> española). Escucha y repite.',
          pairs: [
            ['/t/ inicial — try', 'try, tried, trying'],
            ['/t/ inicial — tablet', 'tablet, technology, too'],
            ['/t/ inicial — take', 'take, ten, today'],
            ['/t/ vs /d/', 'try, dry, ten, den'],
            ['/w/ — work', 'work, works, working'],
            ['/w/ — worth', 'worth, was, we'],
            ['/w/ — question words', 'why, what, when, where'],
            ['/w/ — one / ones', 'one, ones, won'],
            ['/w/ vs /v/', 'work, verb, west, vest'],
            ['-ed final /t/', 'worked, liked, helped'],
            ['-ed final /d/', 'tried, used, cleaned'],
            ['-ed final /ɪd/', 'deleted, needed, collected'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'Why do we keep so much stuff?', intro: 'Lee una vez para la idea general. Luego responde. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto, sin diccionario.',
          paragraphs: [
            'Almost everyone owns something they will never throw away. It might be a plain old T-shirt, a damaged watch, or a box of concert tickets at the back of a junk drawer. Most of these things are useless, many of them are outdated, and we keep them anyway. Why?',
            'Psychologists give three common reasons. The first one is memory: an object reminds us of a person or a place. A camera that hasn\'t worked for twenty years is not <b>worthless</b> to its owner, because it belonged to his father. The second one is the hunt. Serious collectors say the best part is not owning the object; it is looking for it. They spend years searching for one rare item, and the day they finally find it, they start looking for the next one.',
            'The third reason is more <b>practical</b>: money. Some collections really are valuable. A one-of-a-kind stamp can be worth more than a car. But experts warn that most collections never become an investment, and people who collect only for profit usually <b>give up</b> after a year or two, because the market is slow and the good pieces are expensive.',
            'There is also a fourth reason nobody likes to admit: we are simply bad at throwing things away. Ask yourself how many old phones, chargers and cables you have at home. Have you used any of them since you bought your new device? Most of us haven\'t, and most of us never will — but we keep them, just in case. Psychologists have a name for people who take this to the extreme: <b>hoarders</b>. The rest of us are just... collectors with a messy garage.',
          ],
          main: [
            { q: 'Almost everybody keeps things that are useless.', opts: ['1', '2', '3', '4'], a: '1', why: 'El párrafo 1 presenta el fenómeno: la camiseta, el reloj estropeado, el cajón de los trastos.' },
            { q: 'Objects can keep the memory of a person alive.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2, primera razón: <i>an object reminds us of a person or a place</i>.' },
            { q: 'Most collections never make you money.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: <i>most collections never become an investment</i>.' },
            { q: 'We keep old technology "just in case".', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: los teléfonos y cargadores viejos que no usamos desde hace años.' },
          ],
          infer: [
            { q: '<b>worthless</b> (paragraph 2)', opts: ['having no value at all', 'very expensive', 'broken but repairable'], a: 'having no value at all', why: '<i>Worth</i> = valor; <i>-less</i> = sin. Para su dueño la cámara sí tiene valor, aunque no funcione.' },
            { q: '<b>practical</b> (paragraph 3)', opts: ['connected with real, useful things rather than feelings', 'very complicated', 'related to art'], a: 'connected with real, useful things rather than feelings', why: 'Se opone a las dos razones emocionales anteriores: aquí la razón es el dinero.' },
            { q: '<b>give up</b> (paragraph 3)', opts: ['stop doing something', 'pay more money', 'ask for help'], a: 'stop doing something', why: 'Dejan de coleccionar tras uno o dos años porque el mercado es lento.' },
            { q: '<b>hoarders</b> (paragraph 4)', opts: ['people who keep far too many things and never throw anything away', 'people who sell old objects online', 'people who clean their house every week'], a: 'people who keep far too many things and never throw anything away', why: 'Es el caso extremo de "somos malos tirando cosas".' },
          ],
          think: '¿Cuál de las cuatro razones es la tuya? Escribe dos o tres frases empezando por <i>I keep things because…</i> y usa al menos un <i>for</i> o <i>since</i>: <i>I\'ve had… for / since…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Corrige tus frases', type: 'fix', eyebrow: 'Error correction · tus fallos reales', title: 'Reescribe la frase corrigiendo el error', intro: 'Las primeras son exactamente los fallos que cometiste en los ejercicios de la unidad. Las últimas son errores típicos de este tema.', items: [
          { bad: 'Ellen, how long has you known Josh?', good: 'Ellen, how long have you known Josh?', why: 'Con <i>you</i> el auxiliar es <b>have</b>; <i>has</i> solo va con <i>he / she / it</i>. Orden: <b>How long + have + sujeto + participio</b>.' },
          { bad: "I've haven't eaten Thai food. What do you recommend?", good: "I've never eaten Thai food. What do you recommend?", why: 'No puedes poner el auxiliar dos veces. O <b>I’ve never eaten</b> o <b>I haven’t eaten</b>, nunca las dos.' },
          { bad: "I've ever visited Thailand.", good: "I've never visited Thailand.", why: '<b>ever</b> solo en preguntas (<i>Have you ever…?</i>). En afirmativas con sentido negativo va <b>never</b>.' },
          { bad: 'Can I work using your tablet in one of my classes?', good: 'Can I try using your tablet in one of my classes?', why: '<b>try</b> = probar algo un rato. <b>work</b> = funcionar (lo hace el aparato, no tú).' },
          { bad: 'Have you never been to a music festival?', good: 'Have you ever been to a music festival?', why: 'Para preguntar por una experiencia: <b>Have you ever…?</b>' },
          { bad: 'I have this phone since two years.', good: "I've had this phone for two years.", why: 'Dos errores: present perfect (<b>I’ve had</b>, no <i>I have</i>) y <b>for</b> + periodo (<i>since</i> solo con un punto: <i>since 2023</i>).' },
          { bad: "I haven't set up my new laptop already.", good: "I haven't set up my new laptop yet.", why: 'En negativas se usa <b>yet</b>, al final. <i>Already</i> solo en afirmativas.' },
          { bad: "She has bought already a brand new model.", good: "She has already bought a brand new model.", why: '<b>already</b> va <b>antes</b> del participio: <i>has <b>already bought</b></i>.' },
          { bad: "It's very valuable because it remembers me of my grandmother.", good: "It's very special because it reminds me of my grandmother.", why: '<b>remind someone of</b> = recordarle algo a alguien. <i>Remember</i> lo hace la persona, no el objeto. Y si el valor es sentimental, mejor <b>special</b> que <i>valuable</i>.' },
          { bad: "This chair is not in a good condition, it's totally useless.", good: "This chair isn't in good condition; it's totally useless.", why: '<b>in good condition</b> va sin artículo. Y dos frases completas no se unen con una coma: usa punto y coma o <i>and</i>.' },
          { bad: "I'm selling my old laptop. The laptop is used but the laptop works well.", good: "I'm selling my old laptop. It's used, but it works well.", why: 'No repitas el sustantivo: usa <b>it</b>, o <b>one / ones</b> si hablas de otro ejemplar (<i>a faster one</i>).' },
        ] },
        { label: 'one / ones', type: 'soft', eyebrow: 'Writing skill · avoid repeating', title: 'Reescribe sin repetir el sustantivo',
          explain: 'En un anuncio o una descripción queda muy pesado repetir el mismo sustantivo. Usa <b>one</b> (singular) y <b>ones</b> (plural) a partir de la segunda vez que lo mencionas, cuando ya está claro de qué hablas: <i>"I\'m looking for a new bicycle. I want a fast, modern <b>one</b>."</i>',
          missing: 'Falta <b>one</b> u <b>ones</b> en tu frase',
          pattern: /\bones?\b/i,
          items: [
            { h: '"I\'m looking for a new bike. I want a fast, modern bike."', a: "I'm looking for a new bike. I want a fast, modern one." },
            { h: '"I have two laptops. The old laptop is really slow."', a: 'I have two laptops. The old one is really slow.' },
            { h: '"He keeps work documents in some folders and old photos in other folders."', a: 'He keeps work documents in some folders and old photos in other ones.' },
            { h: '"These cups are used. Do you have any brand new cups?"', a: 'These cups are used. Do you have any brand new ones?' },
            { h: '"My phone stopped working, so I bought a new phone."', a: 'My phone stopped working, so I bought a new one.' },
            { h: '"There are two chairs. I\'ll take the chair with the wheels."', a: "There are two chairs. I'll take the one with the wheels." },
          ] },
        { label: 'Escribe un anuncio', type: 'comment', eyebrow: 'Writing task', title: 'Escribe un anuncio online para vender algo tuyo', intro: 'Escribe 50-110 palabras vendiendo algo que ya no usas. La checklist se marca sola al analizar el texto.',
          placeholder: "For sale: a small desk lamp. I've had it for three years and it's still in good condition…",
          min: 50, max: 110, need: 4,
          checks: [
            { label: 'Describo el objeto con adjetivos de la unidad (<i>used, damaged, fancy, plain, valuable, in good condition…</i>)', words: ['brand new', 'used', 'outdated', 'damaged', 'useful', 'useless', 'valuable', 'worth', 'fancy', 'plain', 'special', 'one of a kind', 'good condition'] },
            { label: 'Digo cuánto tiempo lo he tenido con <i>for</i> o <i>since</i>', re: /\b(for|since)\b/ },
            { label: 'Uso el present perfect (<i>I\'ve had…, I haven\'t…, I\'ve already…</i>)', re: /\b(i've|i have|haven't|have never|'ve had|have had)\b/ },
            { label: 'Uso <i>one</i> u <i>ones</i> para no repetir el sustantivo', re: /\bones?\b/ },
            { label: 'Explico por qué lo vendo o por qué es especial (<i>because… / so…</i>)', re: /\b(because|so i|so that|reminds? me|that's why)\b/ },
            { label: 'Incluyo el precio o lo que vale (<i>it\'s worth… / I\'ll take…</i>)', re: /(\$|\bworth\b|\bdollars?\b|\bsoles?\b|\beuros?\b|\bprice\b)/ },
          ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language · Guess what!', title: 'Cambiar de tema sin que suene raro', html: `
          <p style="margin:8px 0 14px">En una conversación real no se habla de una sola cosa: se salta de un tema a otro. Estas son las señales que usan los nativos para avisar de que cambian de tema.</p>
          <div class="grid2" style="margin-top:12px">
            <div><h3>Introducing new topics</h3><ul class="small" style="padding-left:18px;margin:6px 0">
              <li><b>Guess what!</b> I just bought two more online.</li>
              <li><b>You know</b> I'm interested in old toys, right?</li>
            </ul></div>
            <div><h3>Changing the subject</h3><ul class="small" style="padding-left:18px;margin:6px 0">
              <li><b>By the way</b>, have you heard that Tori is in town?</li>
              <li>Oh, <b>before I forget</b>, I want to show you this photo.</li>
            </ul></div>
            <div><h3>Staying on track</h3><ul class="small" style="padding-left:18px;margin:6px 0">
              <li><b>Anyway</b>, they looked good in the photos.</li>
              <li><b>Now</b>, you're a big fan of auto racing. (para enfocar la atención en lo que viene)</li>
            </ul></div>
            <div class="hint small"><b>Guess what!</b> anuncia una noticia que el otro no espera.<br><br><b>You know…, right?</b> introduce algo que el otro ya sabía a medias.<br><br><b>By the way</b> y <b>before I forget</b> cambian de tema; <b>anyway</b> vuelve al tema de antes.</div>
          </div>
          <h3 style="margin-top:18px">Short questions to show interest</h3>
          <p style="margin-top:6px">Para demostrar que estás escuchando, repite el sujeto + <b>be</b> o el auxiliar (<b>do, have, did…</b>) <b>en el mismo tiempo verbal</b> que usó el otro, con entonación de pregunta:</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Te dicen…</th><th>Tú respondes…</th><th>Por qué</th></tr></thead><tbody>
            <tr><td>I<b>'m</b> interested in old watches.</td><td>You <b>are</b>?</td><td>presente de <i>be</i></td></tr>
            <tr><td>He <b>was</b> a watchmaker.</td><td>He <b>was</b>?</td><td>pasado de <i>be</i></td></tr>
            <tr><td>I <b>have</b> an old watch that doesn't work.</td><td>You <b>do</b>?</td><td><i>have</i> como verbo principal → auxiliar <b>do</b></td></tr>
            <tr><td>My sister just <b>won</b> 100 dollars.</td><td>She <b>did</b>?</td><td>simple past → auxiliar <b>did</b></td></tr>
            <tr><td>Simon<b>'s</b> in town.</td><td>He <b>is</b>?</td><td><i>is</i> contraído → <b>is</b></td></tr>
            <tr><td>I<b>'ve</b> already bought two more.</td><td>You <b>have</b>?</td><td>present perfect → <b>have</b></td></tr>
          </tbody></table></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ["Man: So, you know I'm interested in old toys, right?", 'Woman: Yeah, I guessed that! How many robots do you have now?', 'Man: Twenty-six! And guess what! I just bought two more online.', 'Woman: Cool! Are they in good condition?', "Man: I don't know. I haven't gotten them yet. Anyway, they looked good in the photos."],
          ['Yadira: What are you looking at, Luke?', "Luke: It's a website that sells old stuff. I'm interested in old watches.", "Yadira: You are? That's cool.", 'Luke: Yeah. My dad taught me how to fix them. He was a watchmaker.', "Yadira: He was? Interesting! I have an old watch that doesn't work.", 'Luke: You do? Well, give it to me. I can take a look at it.'],
          ['Woman: Hey, are you coming to the party on Saturday?', "Man: Of course, I can't wait.", "Woman: Cool. It's going to be great.", 'Woman: Oh, before I forget, can I get your notes from class yesterday?', 'Man: Sure, I said you could borrow them.'],
          ["A: OK, I'm going to work now. See you later!", "B: See you later. Oh, before I forget, we're ordering pizza for dinner tonight.", 'B: Can you text me your order?', 'A: Sure. Thanks.'],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices?', pool: 7, items: [
          { q: '"I\'m interested in old cameras." — Quieres mostrar interés.', opts: ['You are?', 'You do?', 'You have?', 'You were?'], a: 'You are?', why: 'El otro usó <i>I’m</i> (presente de <i>be</i>) → <b>You are?</b>' },
          { q: '"I have three old laptops at home." — Quieres mostrar interés.', opts: ['You do?', 'You are?', 'You have?', 'You did?'], a: 'You do?', why: '<i>Have</i> como verbo principal necesita el auxiliar <b>do</b>.' },
          { q: '"My brother won a medal last year." — Quieres mostrar interés.', opts: ['He did?', 'He does?', 'He is?', 'He has?'], a: 'He did?', why: 'Simple past (<i>won</i>) → auxiliar <b>did</b>.' },
          { q: '"Simon\'s in town." — Quieres mostrar interés.', opts: ['He is?', 'He does?', 'He was?', 'He has?'], a: 'He is?', why: '<i>Simon’s</i> = <i>Simon is</i> → <b>He is?</b>' },
          { q: '"I\'ve already sold my old phone." — Quieres mostrar interés.', opts: ['You have?', 'You did?', 'You are?', 'You do?'], a: 'You have?', why: 'Present perfect (<i>I’ve sold</i>) → <b>You have?</b>' },
          { q: '"He was a watchmaker." — Quieres mostrar interés.', opts: ['He was?', 'He did?', 'He is?', 'He has?'], a: 'He was?', why: 'Pasado de <i>be</i> → se repite <b>was</b>.' },
          { q: 'Tienes una noticia que tu amigo no espera. ¿Cómo la introduces?', opts: ['Guess what!', 'Anyway,', 'By the way,', 'You know?'], a: 'Guess what!', why: '<b>Guess what!</b> anuncia una noticia sorprendente.' },
          { q: 'Llevas cinco minutos hablando de coches y quieres hablar de otra cosa.', opts: ['By the way, have you heard about Tori?', 'Anyway, cars are great.', "Guess what! I'm still talking about cars.", 'You know cars, right?'], a: 'By the way, have you heard about Tori?', why: '<b>By the way</b> = cambiar de tema.' },
          { q: 'Te has ido por las ramas y quieres volver al tema original.', opts: ['Anyway, they looked good in the photos.', 'By the way, my sister called.', 'Guess what! I bought two more.', 'Before I forget, take my notes.'], a: 'Anyway, they looked good in the photos.', why: '<b>Anyway</b> retoma lo que estabas contando.' },
          { q: 'Te vas, pero tienes que decirle algo urgente antes de olvidarlo.', opts: ['Oh, before I forget, can I get your notes?', 'Anyway, see you later.', 'You know, I like pizza.', 'Guess what! Bye.'], a: 'Oh, before I forget, can I get your notes?', why: '<b>Before I forget</b> introduce algo que no quieres que se te olvide.' },
          { q: 'Quieres introducir algo que tu amigo ya sabe a medias.', opts: ["You know I'm interested in old toys, right?", 'Anyway, old toys.', 'By the way, old toys.', 'He was?'], a: "You know I'm interested in old toys, right?", why: '<b>You know…, right?</b> presenta un tema que el otro ya conocía en parte.' },
        ] },

        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'En la cafetería del banco: una noticia, un desvío y una petición', intro: 'Café de media mañana con Renato, un compañero de tu equipo. Tienes una noticia (por fin vendiste tu laptop vieja), él tiene otra, y antes de volver a tu escritorio necesitas pedirle algo. Introduce temas, muestra interés con preguntas cortas, vuelve al hilo con <i>Anyway</i> y no te olvides de tu petición.', scenes: [
          { t: 'En la cafetería', you: 'Aldo, desarrollador del equipo de pagos', partner: 'Renato', role: 'compañero de equipo, también desarrollador', goal: 'Cuenta tu noticia con Guess what!, reacciona a la suya con una pregunta corta, retoma tu tema con Anyway y pide un favor con Before I forget.', start: 'a', nodes: {
            a: { say: "Hey, Aldo. You look happy today. What's going on?", opts: [
              { t: "Guess what! I've finally sold my old laptop. A guy from Surco picked it up last night.", ok: 2, why: "<b>Guess what!</b> es la señal de la unidad para una noticia que el otro no espera. Y <b>I've finally sold</b> (present perfect, sin fecha) presenta el resultado, no el momento.", next: 'b' },
              { t: "You know I wanted to sell my old laptop, right? Well, I sold it yesterday.", ok: 1, why: "Correcta: <b>You know…, right?</b> presenta un tema que el otro ya conocía a medias, y con <i>yesterday</i> el simple past es el tiempo justo. <b>Guess what!</b> le daría más fuerza a la noticia.", next: 'b' },
              { t: "You know? I have sold my old laptop yesterday.", ok: 0, why: "Dos calcos: <i>¿Sabes?</i> no es <i>You know?</i> a secas (la fórmula es <b>You know…, right?</b>), y con <i>yesterday</i> (momento terminado) va el simple past: <b>I sold</b>.", next: 'a2' },
            ] },
            a2: { say: "Oh… OK. The old gray one?", opts: [
              { t: "Yeah, that one. I've had it since 2017, so it was pretty outdated, but it was still in good condition.", ok: 2, why: "Recuperas la conversación con datos: <b>since</b> + punto de inicio, y dos adjetivos de la unidad, <b>outdated</b> e <b>in good condition</b> (sin artículo).", next: 'b' },
              { t: "Yes, that one. It was very old, but it still worked well.", ok: 1, why: "Correcta y natural. <b>Work</b> = funcionar, bien usado. Con <i>since</i> o <i>for</i> le contarías cuánto tiempo la tuviste.", next: 'b' },
              { t: "Yes, that one. It was in a good condition but very outdated for me.", ok: 0, why: "<b>In good condition</b> va sin artículo: <i>in <s>a</s> good condition</i>. Es un calco de “en buen estado” con un artículo que en inglés no existe.", next: 'b' },
            ] },
            b: { say: "Nice! How much did you get for it? Those old models aren't worth much these days.", opts: [
              { t: "Not a lot, it was worth about 600 soles. But I've already bought a new one for the food business, so the money helped.", ok: 2, why: "<b>Be worth</b> + cantidad, <b>already</b> delante del participio (<i>I've <b>already</b> bought</i>) y <b>one</b> para no repetir <i>laptop</i>: tres puntos de la unidad en una frase.", next: 'c' },
              { t: "About 600 soles. I bought a new laptop for the food business with that money.", ok: 1, why: "Correcta. Con <b>a new one</b> evitarías repetir <i>laptop</i>, y <b>I've already bought</b> dejaría claro que está hecho antes de lo esperado.", next: 'c' },
              { t: "Nothing much. I have already buy another laptop for the food business.", ok: 0, why: "Después de <i>have already</i> va el <b>participio</b>: <i>I've already <b>bought</b></i>, nunca el infinitivo.", next: 'c' },
            ] },
            c: { say: "For the food business? I didn't know you were still doing that. How long have you had it now?", opts: [
              { t: "We've had it for almost two years. My wife runs it, and I take care of the orders app and the weekend deliveries.", ok: 2, why: "A <i>How long have you had…?</i> se responde con present perfect + <b>for</b> + periodo: <b>We've had it for almost two years</b>.", next: 'd' },
              { t: "Since 2024. My wife runs it and I help out on weekends.", ok: 1, why: "Correcta: <b>since</b> + punto de inicio. Una respuesta algo corta; la frase completa sería <i>We've had it since 2024</i>.", next: 'd' },
              { t: "We have it since two years. My wife is who runs it.", ok: 0, why: "Calco doble: <i>lo tenemos desde hace dos años</i> → <b>We've had it for two years</b> (present perfect + <i>for</i> con un periodo). Y <i>my wife is who runs it</i> → <b>my wife runs it</b>.", next: 'd' },
            ] },
            d: { say: "That's great. By the way, I'm going to the Java conference in Bogotá next month. The bank's paying for it.", opts: [
              { t: "You are? That's awesome! Have you ever been to Bogotá?", ok: 2, why: "Renato dijo <i>I'm going</i> (presente de <i>be</i>) → pregunta corta de interés <b>You are?</b>. Y <b>Have you ever been…?</b> es la pregunta de experiencia de la unidad.", next: 'e' },
              { t: "Really? Nice. Is it your first time in Colombia?", ok: 1, why: "Correcta y natural. La unidad propone mostrar interés repitiendo el auxiliar del otro: <b>You are?</b>", next: 'e' },
              { t: "You do? Did you ever go to Bogotá?", ok: 0, why: "El auxiliar tiene que ser el mismo que usó él: <i>I'm going</i> → <b>You are?</b>, no <i>You do?</i>. Y para una experiencia en la vida: <b>Have you ever been…?</b>", next: 'd2' },
            ] },
            d2: { say: "Do I what? Ha. Yes, I'm going. And no, I've never been to Bogotá.", opts: [
              { t: "Sorry, I meant: you are? That's great news. I've never been there either.", ok: 2, why: "Reparas la pregunta corta con el auxiliar correcto, <b>You are?</b>, y usas <b>never</b> entre <i>have</i> y el participio.", next: 'e' },
              { t: "Sorry. That's great news. I haven't been there either.", ok: 1, why: "Correcta: <b>I haven't been</b> es la otra forma de decir <i>I've never been</i>. Te faltó mostrar interés con la pregunta corta.", next: 'e' },
              { t: "OK. Anyway, my laptop…", ok: 0, why: "<b>Anyway</b> sirve para volver a tu tema, pero usarlo justo cuando él acaba de darte una noticia suena a que no te importa. Primero reacciona, luego retoma.", next: 'meh' },
            ] },
            e: { say: "No, never. It's my first time. I've already booked the flight, but I haven't found a hotel yet.", opts: [
              { t: "You have? Then you're almost ready. My cousin lives there, so I can ask her about hotels if you want.", ok: 2, why: "<i>I've already booked</i> (present perfect) → pregunta corta <b>You have?</b>. Después, <b>so</b> para dar la razón de tu oferta.", next: 'f' },
              { t: "Nice. I can ask my cousin, she lives in Bogotá.", ok: 1, why: "Correcta y amable. Con <b>You have?</b> habrías mostrado interés antes de ofrecer ayuda.", next: 'f' },
              { t: "You did? Just search on Booking, is easy.", ok: 0, why: "Él usó present perfect (<i>I've booked</i>) → <b>You have?</b>, no <i>You did?</i>. Y en inglés el sujeto no se omite: <b>it's easy</b>.", next: 'f' },
            ] },
            f: { say: "That would be great, thanks! Send me her number.", opts: [
              { t: "Sure, I'll text it to you after lunch. Anyway, about the new laptop: I haven't set it up yet, and I need to sync it with the orders app this weekend.", ok: 2, why: "<b>Anyway</b> es la señal de la unidad para volver al tema de antes. Además: <b>yet</b> al final de la negativa y los verbos <b>set up</b> y <b>sync</b>.", next: 'g' },
              { t: "Sure. So, about the laptop: it's still in the box. I'm going to set it up this weekend.", ok: 1, why: "Correcta: <i>So, about…</i> también retoma el tema. <b>Anyway</b> es la fórmula que practicaste en la unidad, y <b>set it up</b> está perfecto.", next: 'g' },
              { t: "Sure. Anyway, I haven't set up it already.", ok: 0, why: "Dos fallos: con pronombre, el phrasal verb se separa (<b>set it up</b>), y en negativas va <b>yet</b> al final, no <i>already</i>.", next: 'g' },
            ] },
            g: { say: "This weekend? Good luck with that. Well, I should get back. The sprint review is at three.", opts: [
              { t: "Me too. Oh, before I forget, can I try your tablet in the demo tomorrow? Mine doesn't have enough storage for the new build.", ok: 2, why: "<b>Oh, before I forget</b> introduce lo que no quieres que se te olvide justo antes de despedirte. <b>Try</b> = probar un rato (no <i>work</i>) y <b>storage</b>, de la unidad.", next: 'win' },
              { t: "OK. One more thing: could I borrow your tablet for the demo tomorrow? Mine is almost full.", ok: 1, why: "Correcta y natural. La fórmula de la unidad para colar algo antes de irte es <b>Oh, before I forget</b>.", next: 'win' },
              { t: "OK. Before I forget, can I work with your tablet tomorrow? Mine doesn't work the storage.", ok: 0, why: "Confundiste <b>try</b> (probar algo un rato) con <b>work</b> (funcionar, lo hace el aparato): tu error del curso. Y <i>no tiene almacenamiento</i> = <b>it doesn't have enough storage</b>.", next: 'g2' },
            ] },
            g2: { say: "Work with my tablet? Like… use it for the whole day? What's wrong with yours?", opts: [
              { t: "Sorry, I mean try it, just for the demo. Mine is an old model and it doesn't have enough storage for the new build.", ok: 2, why: "Aclaras con el verbo correcto, <b>try</b>, y explicas la razón con <b>model</b> y <b>storage</b>. Pedir algo concreto y acotado hace fácil decir que sí.", next: 'win' },
              { t: "I mean, can I use it for the demo? Mine is full.", ok: 1, why: "Correcta y clara. <b>Use</b> funciona; <b>try</b> era la palabra de la unidad para probar un dispositivo.", next: 'win' },
              { t: "Nothing, is fine, forget it.", ok: 0, why: "Falta el sujeto (<b>it's fine</b>) y te rindes con la petición: mañana seguirás sin tablet. Reformular (<i>I mean…</i>) cuesta dos segundos.", next: 'fail' },
            ] },
            win: { say: "Sure, no problem. I'll bring it tomorrow. See you at the review!", end: true, outcome: 'win', note: 'Lanzaste la noticia con <b>Guess what!</b>, contaste cuánto tiempo con <b>for / since</b>, mostraste interés con preguntas cortas (<b>You are? You have?</b>), volviste a tu tema con <b>Anyway</b> y pediste el favor con <b>Oh, before I forget</b>. Fíjate en la lógica de la pregunta corta: mismo auxiliar y mismo tiempo que usó el otro.' },
            meh: { say: "Right. Well, I'd better get back to my desk.", end: true, outcome: 'meh', note: 'La noticia y los datos salieron bien, pero cortaste la suya con <b>Anyway</b> antes de reaccionar. El orden natural es: pregunta corta de interés (<b>You are?</b>), un comentario, y solo después <b>Anyway</b> para retomar lo tuyo.' },
            fail: { say: "OK… see you at the review, then.", end: true, outcome: 'fail', note: 'Te quedaste sin tablet para la demo por no aclarar la petición. <b>Try</b> = probar algo un rato; <b>work</b> = funcionar (lo hace el aparato). Y si algo sale mal, repara con <i>Sorry, I mean…</i> en vez de retirarte con <i>forget it</i>.' },
          } },
        ] },
      ] },
    ],
  };
})();
