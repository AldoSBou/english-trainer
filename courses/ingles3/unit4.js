/* ===========================================================
   ingles3/unit4.js — Inglés 3 · Unit 4: How surprising!
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Lesson 1 · Describing opinions and reactions (-ed / -ing) ---------- */
  /* [ -ed , -ing , def -ed (ES) , def -ing (ES) , ejemplo ] */
  const REACT = [
    ['amused', 'amusing', 'divertido (te hace gracia algo)', 'gracioso, divertido (hace reír)', 'Paula was amused when I told her the story about the dog. It was the most amusing story of the week.'],
    ['annoyed', 'annoying', 'molesto, algo enfadado', 'molesto, pesado (te hace enfadar)', 'I was so annoyed because the traffic made me late. It’s so annoying when things make you late.'],
    ['disappointed', 'disappointing', 'decepcionado', 'decepcionante', 'We lost the game. I’m so disappointed. The result was really disappointing.'],
    ['embarrassed', 'embarrassing', 'avergonzado', 'vergonzoso, embarazoso', 'I dropped my glass in the restaurant and everybody looked over. I was so embarrassed.'],
    ['fascinated', 'fascinating', 'fascinado, muy interesado', 'fascinante, muy interesante', 'I’m really fascinated by this book about Antarctica. The wildlife looks fascinating.'],
    ['frightened', 'frightening', 'asustado, con miedo', 'aterrador, que da miedo', 'The movie was good, but it was scary. We were both frightened.'],
    ['interested', 'interesting', 'interesado (cómo te sientes)', 'interesante (cómo es la cosa)', 'I’m very interested in my work because my work is really interesting.'],
    ['shocked', 'shocking', 'conmocionado, impactado', 'impactante, indignante', 'We were shocked when we saw the email from our boss about the job cuts.'],
    ['surprised', 'surprising', 'sorprendido', 'sorprendente, inesperado', 'Claire was surprised and happy when she learned that she won the writing contest.'],
  ];

  /* ---------- Lesson 2 · Making decisions and plans ---------- */
  /* [ verbo , pasado simple , significado ES , sinónimo EN , ejemplo ] */
  const PLANV = [
    ['arrange', 'arranged', 'organizar, planear algo con alguien', 'make plans', 'I’m arranging our holiday for August.'],
    ['check', 'checked', 'comprobar, verificar', 'make sure of something', 'Can you check what time the bus leaves tomorrow?'],
    ['deal with', 'dealt with', 'ocuparse de, resolver', 'take care of a problem', 'Not yet. I’m going to deal with that this evening.'],
    ['forget', 'forgot', 'olvidar', 'not remember', 'Oh, no! I totally forgot to tell Stefan about our plans.'],
    ['get in touch with', 'got in touch with', 'ponerse en contacto con', 'contact', 'Can you get in touch with your brother, please?'],
    ['let (someone) know', 'let (someone) know', 'avisar a alguien, hacerle saber', 'tell someone', 'We’ll let you know tomorrow evening.'],
    ['look into', 'looked into', 'investigar, informarse sobre', 'search for information about', 'He’s looking into a good hotel for the trip.'],
    ['meet up', 'met up', 'quedar, reunirse', 'get together', 'I’m meeting up with my cousin on Saturday.'],
    ['remind', 'reminded', 'recordar a alguien algo', 'make someone remember', 'Hey, that reminds me — did you book a table for tonight?'],
    ['think about', 'thought about', 'pensarse algo, considerarlo', 'consider', 'Hmm, I don’t know. Let me think about it.'],
  ];

  /* ---------- Lesson 4 · Community & volunteering ---------- */
  const COMM = [
    ['volunteer', 'ser voluntario / voluntario', 'Do you want to volunteer in this community? You don’t get paid, but it’s a great experience.', '¿Has sido voluntario alguna vez? ¿En qué?'],
    ['career', 'carrera profesional', 'You can learn many skills that will help you in a future career.', '¿Qué habilidad te ayudaría más en tu carrera?'],
    ['soup kitchen', 'comedor social', 'At the soup kitchen, you can serve hot meals to people who need them.', '¿Hay un comedor social cerca de tu casa?'],
    ['food bank', 'banco de alimentos', 'You can organize boxed and canned foods at the food bank.', '¿Has donado comida alguna vez?'],
    ['community center', 'centro comunitario / centro cívico', 'The community center needs people to organize basketball games and help with English classes.', '¿Qué actividades hay en el centro cívico de tu barrio?'],
    ['homeless people', 'personas sin hogar', 'You can volunteer at a food bank or soup kitchen that helps homeless people.', '¿Cómo ayuda tu ciudad a las personas sin hogar?'],
    ['serve food', 'servir comida', 'You can help serve food on Saturday mornings.', '¿Te gustaría servir comida en un evento comunitario?'],
    ['spend time listening', 'dedicar tiempo a escuchar', 'Sometimes you can just spend time listening to people.', '¿A quién deberías dedicarle más tiempo?'],
    ['community event', 'evento comunitario', 'Every July, my city has an arts festival. Artists come from all over the country.', '¿Qué eventos comunitarios tiene tu ciudad?'],
    ['nature walk', 'paseo por la naturaleza (guiado)', 'My town hosts nature walks once a month, and a guide teaches us about the plants.', '¿Irías a un paseo guiado por la naturaleza?'],
    ['community garden', 'huerto comunitario', 'The old park now has a small community garden.', '¿Te gustaría cuidar un huerto comunitario?'],
    ['clean up', 'limpiar (una zona), recoger la basura', 'A few of us are cleaning up the river path on Saturday.', '¿Qué lugar de tu ciudad necesita una limpieza?'],
    ['trash', 'basura', 'I love going to parks and gardens, but there is always a lot of trash.', '¿Dónde hay más basura en tu barrio?'],
    ['10K race', 'carrera de 10 km', 'The 25th Annual Cross-city 10K Race is on May 27. Run, watch, or volunteer!', '¿Correrías, mirarías o serías voluntario en una 10K?'],
  ];

  /* situación → adjetivo de reacción */
  const SIT = [
    ['You forgot your colleague’s name in front of the whole team.', 'embarrassed'],
    ['Your favorite team lost the final after playing really badly.', 'disappointed'],
    ['Your neighbor plays loud music every night until two a.m.', 'annoyed'],
    ['You read that a company fired 400 people by email with no warning.', 'shocked'],
    ['Your friend appears at your door with a cake and you had no idea.', 'surprised'],
    ['You are watching a horror movie alone at midnight.', 'frightened'],
    ['You spent four hours reading about volcanoes and forgot to eat.', 'fascinated'],
    ['Your grandfather tells a story and you cannot stop smiling.', 'amused'],
    ['You want to know everything about how the community garden started.', 'interested'],
  ];
  const ADJ_ED = REACT.map(r => r[0]);
  const ADJ_ING = REACT.map(r => r[1]);
  const PLAN_WORDS = PLANV.map(p => p[0]);

  window.UNIT_DATA['ingles3/unit4'] = {
    source: 'WeTalk · Level 3 · Unit 4 · How surprising! (reacciones, planes y futuro)',
    description: 'Adjetivos de reacción en -ed/-ing, verbos para tomar decisiones y hacer planes, futuro con will y be going to, present continuous para planes, y lenguaje para tranquilizar a alguien.',
    map: [
      ['Vocabulary', '9 pares de adjetivos <i>-ed / -ing</i> (<i>surprised/surprising…</i>), 10 verbos de decisiones y planes (<i>arrange, deal with, look into…</i>) y vocabulario de comunidad y voluntariado', 'Flashcards con audio, emparejar verbo y sinónimo, situación → adjetivo, <i>-ed</i> vs <i>-ing</i>, pasados irregulares'],
      ['Grammar', '<i>be going to</i> y <i>will</i> para predicciones; <i>will</i> para decisiones espontáneas; present continuous para planes acordados', 'Notas con tabla, predicción con o sin evidencia, decisión vs plan, futuro mixto'],
      ['Listening', 'Conversaciones sobre planes, un examen de conducir y una cena', 'Dictado con voz sintética (velocidad ajustable) y diálogo con preguntas'],
      ['Speaking', 'My secret spot, A new community event, hacer planes', 'Retos con cronómetro y reconocimiento de voz; /p/ inicial y /n/ enlazada'],
      ['Reading', '"A 10K race" y eventos de la comunidad', 'Texto nuevo sobre el mismo tema + inferir significado por contexto'],
      ['Writing', 'Email de invitación con conectores de orden (<i>to start, then, after that, finally</i>)', 'Corrige tus propios errores + escribe la invitación con checklist'],
      ['Social English', 'Ofrecer y responder a <i>reassurance</i>; <i>at least</i> para ver el lado bueno', 'Ordenar diálogos, respuesta rápida, reescribir con <i>at least</i>'],
    ],
    weak: [
      '<b>Pasado simple regular</b>: escribiste <i>check</i> como pasado de <i>check</i> → <i>check<b>ed</b></i>. Solo <i>forget/let/think</i> son irregulares (<i>forgot, let, thought</i>).',
      '<b>that reminds me</b>: escribiste <i>"that remind me"</i> → <i>that <b>reminds</b> me</i> (tercera persona con <i>-s</i>).',
      '<b>think about</b>: escribiste <i>"Let me think it"</i> → <i>Let me <b>think about</b> it</i>. La preposición forma parte del verbo.',
      '<b>let someone know</b>: escribiste <i>"We’ll let you think tomorrow"</i> → <i>We’ll let you <b>know</b> tomorrow</i>.',
      '<b>Preposición + -ing</b>: <i>"What do you think about <s>make</s> an event"</i> → <i>about <b>making</b> an event</i>.',
      '<b>Léxico inventado / calcos</b>: <i>convocated</i> → <i><b>get people together</b> / invite people</i>; <i>brush the beach</i> → <i><b>clean up</b> the beach</i>; <i>social network</i> → <i><b>social media</b></i>.',
      '<b>Sujeto obligatorio</b>: <i>"because represents the union"</i> → <i>because <b>it</b> represents…</i>; y tras preposición, <i>between my wife and <b>me</b></i> (no <i>I</i>).',
      '<b>for + periodo</b>: <i>"I’ve kept it for 3 years go"</i> → <i>for <b>three years</b></i> (<i>ago</i> solo con pasado simple: <i>three years ago</i>).',
    ],
    weakLink: 'Trabájalos en <b>Writing › Corrige tus frases</b> y en <b>Vocabulary › Pasado simple</b>.',

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...REACT.map(r => ({ cat: 'Opinions and reactions (-ed / -ing)', w: r[0] + ' / ' + r[1], say: r[0] + ', ' + r[1], def: '-ed: ' + r[2] + '  ·  -ing: ' + r[3], ex: r[4], ask: '¿Cuándo fue la última vez que te sentiste ' + r[0] + '? Dilo en voz alta.' })),
            ...PLANV.map(p => ({ cat: 'Making decisions and plans', w: p[0], say: p[0] + '. ' + p[1], def: p[2] + ' (= ' + p[3] + ') · pasado: ' + p[1], ex: p[4], ask: '¿Qué tienes que ' + p[2].split(',')[0] + ' esta semana?' })),
            ...COMM.map(c => ({ cat: 'Community & volunteering', w: c[0], def: c[1], ex: c[2], ask: c[3] })),
          ] },
        { label: 'Verbo ↔ sinónimo', type: 'match', eyebrow: 'Making decisions and plans', title: 'Empareja el verbo con su significado en inglés', intro: 'Toca uno de la izquierda y luego su pareja de la derecha. Fíjate en las preposiciones: forman parte del verbo.', pairs: PLANV.map(p => [p[0], p[3]]), round: 6 },
        { label: '¿Cómo te sientes?', type: 'mcq', eyebrow: 'Situación → reacción', title: 'Lee la situación y elige el adjetivo', intro: 'Todas las situaciones describen a una persona: por eso la respuesta va en <b>-ed</b>.', pool: 7,
          build: ({ pick, esc }) => pick(SIT, 7).map(s => { const r = REACT.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(ADJ_ED.filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + r[0] + '</b> = ' + r[2] + '. La cosa que lo provoca sería <b>' + r[1] + '</b> (' + r[3] + ').' }; }) },
        { label: '-ed o -ing', type: 'mcq', eyebrow: 'La trampa clásica', title: 'Elige la terminación correcta', intro: '<b>-ed</b> = cómo se siente una <b>persona</b>. <b>-ing</b> = cómo es la <b>cosa</b> que provoca ese sentimiento.', pool: 8, items: [
          { blank: 1, q: 'The documentary about the ocean was absolutely ___.', opts: ['fascinating', 'fascinated'], a: 'fascinating', why: 'El documental es la <b>cosa</b> que provoca el sentimiento → <b>-ing</b>.' },
          { blank: 1, q: 'I was ___ by the documentary. I watched it twice.', opts: ['fascinated', 'fascinating'], a: 'fascinated', why: '<i>I</i> es una persona que siente algo → <b>-ed</b>.' },
          { blank: 1, q: 'Our meal was really ___. The restaurant looked so much better outside.', opts: ['disappointing', 'disappointed'], a: 'disappointing', why: 'La comida provoca la decepción → <b>-ing</b>.' },
          { blank: 1, q: 'Joe didn’t get the job. He felt very ___.', opts: ['disappointed', 'disappointing'], a: 'disappointed', why: '<i>He felt…</i> → sentimiento de una persona → <b>-ed</b>.' },
          { blank: 1, q: 'I forgot my lines in the middle of the presentation. It was so ___!', opts: ['embarrassing', 'embarrassed'], a: 'embarrassing', why: '<i>It</i> = la situación → <b>-ing</b>.' },
          { blank: 1, q: 'Everybody turned and stared, and I was really ___.', opts: ['embarrassed', 'embarrassing'], a: 'embarrassed', why: '<i>I</i> → persona → <b>-ed</b>.' },
          { blank: 1, q: 'That noise every night is so ___. I can’t sleep.', opts: ['annoying', 'annoyed'], a: 'annoying', why: 'El ruido causa el enfado → <b>-ing</b>.' },
          { blank: 1, q: 'She looked ___ when the bus left without her.', opts: ['annoyed', 'annoying'], a: 'annoyed', why: '<i>She</i> siente el enfado → <b>-ed</b>.' },
          { blank: 1, q: 'The news about the job cuts was ___.', opts: ['shocking', 'shocked'], a: 'shocking', why: '<i>The news</i> = la cosa → <b>-ing</b>. (<i>shocking</i> = upsetting.)' },
          { blank: 1, q: 'We were all ___ when we read the email.', opts: ['shocked', 'shocking'], a: 'shocked', why: '<i>We</i> = personas → <b>-ed</b>.' },
          { blank: 1, q: 'Paula laughed a lot. She thought the story was ___.', opts: ['amusing', 'amused'], a: 'amusing', why: 'La historia hace reír → <b>-ing</b>.' },
          { blank: 1, q: 'My grandfather tells jokes and everyone looks ___.', opts: ['amused', 'amusing'], a: 'amused', why: 'Las personas muestran que algo les hace gracia → <b>-ed</b>.' },
          { blank: 1, q: 'The end of the movie was really ___. I couldn’t watch.', opts: ['frightening', 'frightened'], a: 'frightening', why: 'La película da miedo → <b>-ing</b>.' },
          { blank: 1, q: 'We were both ___ and we held hands the whole time.', opts: ['frightened', 'frightening'], a: 'frightened', why: '<i>We</i> = personas con miedo → <b>-ed</b>.' },
          { blank: 1, q: 'I’m very ___ in the volunteer program at the community center.', opts: ['interested', 'interesting'], a: 'interested', why: '<b>be interested in</b> + cosa. La persona está interesada → <b>-ed</b>.' },
          { blank: 1, q: 'The volunteer program sounds really ___.', opts: ['interesting', 'interested'], a: 'interesting', why: 'El programa es la cosa interesante → <b>-ing</b>.' },
          { blank: 1, q: 'Claire was ___ and happy when she learned she won the contest.', opts: ['surprised', 'surprising'], a: 'surprised', why: '<i>Claire</i> = persona → <b>-ed</b>.' },
          { blank: 1, q: 'It’s ___ how many people came to the cleanup.', opts: ['surprising', 'surprised'], a: 'surprising', why: '<i>It</i> = el hecho → <b>-ing</b>.' },
        ] },
        { label: 'Pasado simple', type: 'mcq', eyebrow: 'Tu error del curso', title: '¿Cuál es el pasado simple?', intro: 'Casi todos estos verbos son regulares (+<b>-ed</b>). Solo <i>forget, let</i> y <i>think</i> son irregulares. En el curso escribiste <i>check</i> como pasado de <i>check</i>: aquí lo arreglamos.', pool: 8,
          build: ({ pick, esc }) => pick(PLANV, 8).map(p => ({ q: 'simple past of <b>' + esc(p[0]) + '</b>', opts: [p[1], ...pick(PLANV.map(x => x[1]).filter(x => x !== p[1]), 3)], a: p[1], why: '<b>' + p[0] + ' → ' + p[1] + '</b>. Ejemplo: “' + p[4] + '”' })) },
        { label: 'Di lo mismo', type: 'mcq', eyebrow: 'Sinónimos en contexto', title: '¿Qué verbo puedes usar en su lugar?', intro: 'Sustituye la palabra en negrita por un verbo de la unidad.', pool: 7, items: [
          { q: 'Can you <b>contact</b> your brother, please?', opts: ['get in touch with', 'look into', 'deal with', 'meet up'], a: 'get in touch with', why: '<b>get in touch with</b> = contact.' },
          { q: 'I want to <b>tell her</b> I’ll be late.', opts: ['let her know', 'remind her', 'check her', 'arrange her'], a: 'let her know', why: '<b>let (someone) know</b> = tell someone.' },
          { q: 'I’m <b>planning</b> our holiday.', opts: ['arranging', 'checking', 'forgetting', 'dealing with'], a: 'arranging', why: '<b>arrange</b> = make plans.' },
          { q: 'He’s <b>searching online</b> for a good hotel.', opts: ['looking into', 'meeting up', 'letting know', 'reminding'], a: 'looking into', why: '<b>look into</b> = search for information about something.' },
          { q: 'I <b>didn’t remember</b> my keys this morning.', opts: ['forgot', 'reminded', 'checked', 'thought about'], a: 'forgot', why: '<b>forget</b> = not remember. Pasado irregular: <b>forgot</b>.' },
          { q: 'I’ll <b>take care of</b> the tickets this evening.', opts: ['deal with', 'look into', 'meet up with', 'let know'], a: 'deal with', why: '<b>deal with</b> = take care of a problem or a task.' },
          { q: 'Let’s <b>get together</b> on Saturday afternoon.', opts: ['meet up', 'check', 'arrange', 'remind'], a: 'meet up', why: '<b>meet up</b> = get together.' },
          { q: 'Can you <b>make sure of</b> the departure time?', opts: ['check', 'think about', 'deal with', 'forget'], a: 'check', why: '<b>check</b> = make sure of something.' },
          { q: 'I need to <b>consider</b> it before I answer.', opts: ['think about', 'look into', 'remind', 'arrange'], a: 'think about', why: '<b>think about</b> = consider. ¡No olvides <i>about</i>!' },
          { q: 'Hey, that <b>makes me remember</b> — did you book a table?', opts: ['reminds me', 'remembers me', 'lets me know', 'checks me'], a: 'reminds me', why: '<b>that reminds me</b> es una expresión fija, con <i>-s</i> de tercera persona.' },
          { q: 'Somebody should <b>organize</b> a cleanup for the park.', opts: ['arrange', 'forget', 'check', 'remind'], a: 'arrange', why: '<b>arrange an event</b> = organizarlo con otras personas.' },
          { q: 'I’ll <b>find out more about</b> the volunteer program.', opts: ['look into', 'deal with', 'meet up with', 'let know'], a: 'look into', why: '<b>look into</b> = investigar, informarse.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Futuro: will · be going to · present continuous', title: 'Tres futuros, tres momentos de decisión', html: `
          <p style="margin:8px 0 14px">En inglés el futuro no se elige por <i>cuándo</i> pasa, sino por <b>cuándo se decidió</b> y por <b>si tienes pruebas</b>. Esa es toda la unidad.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Cuándo se usa</th><th>Ejemplo</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>will / won’t</b><br><span class="small muted">predicción</span></td><td>predicción basada en tu <b>opinión</b>, sin pruebas delante</td><td>It <b>’ll</b> be a beautiful day. We <b>won’t</b> need a tent.</td><td>I think, I don’t think, probably, maybe</td></tr>
            <tr><td><b>be going to</b><br><span class="small muted">predicción</span></td><td>predicción con <b>evidencia</b>: ves o sabes algo <b>ahora</b></td><td>The trail is long and hard. This <b>is going to</b> be a difficult hike.</td><td>look at…, the sky is black, it says here…</td></tr>
            <tr><td><b>will</b><br><span class="small muted">decisión espontánea</span></td><td>decisión que tomas <b>en el momento de hablar</b></td><td>You just missed a call from Bryn. — I<b>’ll</b> call her now.</td><td>reaccionas a algo que acabas de oír</td></tr>
            <tr><td><b>won’t</b></td><td>negarte a algo en el momento</td><td>I <b>won’t</b> have another coffee, thanks.</td><td>respuesta inmediata</td></tr>
            <tr><td><b>present continuous</b><br><span class="small muted">plan</span></td><td>plan <b>ya acordado</b> antes de hablar (hay hora, sitio o gente)</td><td>She<b>’s driving</b> to the store this afternoon. I<b>’m meeting</b> up with my cousin.</td><td>at 2 p.m., on Saturday, with…</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>La pregunta que lo resuelve todo:</b> ¿lo acabo de decidir <i>ahora mismo</i>? → <b>will</b>. ¿Ya estaba organizado? → <b>present continuous</b>. ¿Estoy adivinando el futuro? → <b>will</b> (opinión) o <b>be going to</b> (con pruebas).</div>
          <h3 style="margin-top:18px">I think / I don’t think</h3>
          <p style="margin-top:6px">Para dar tu opinión sobre el futuro se antepone <b>I think</b> o <b>I don’t think</b>: <i><b>I think</b> we’ll get hungry. Let’s take some snacks.</i> · <i><b>I don’t think</b> this hike is going to be fun. The weather is terrible.</i><br>Ojo: en inglés la negación va en <i>think</i>, no en la predicción (<i>I don’t think it will rain</i>, no <i>I think it won’t rain</i>).</p>
          <div class="hint small" style="margin-top:12px"><b>Forma:</b> <i>be going to</i> cambia con el sujeto (<i>I’m going to, he’s going to, we’re going to</i>), pero <i>will</i> es igual para todos y siempre va con infinitivo sin <i>to</i>: <i>she will come</i>, nunca <i>she wills</i> ni <i>she will to come</i>.</div>` },
        { label: 'Predicciones', type: 'mcq', eyebrow: 'will vs be going to', title: '¿Opinión o evidencia?', intro: 'Si la frase te da una <b>prueba visible</b> (algo que se ve o se sabe ahora), usa <b>be going to</b>. Si es solo tu opinión, usa <b>will</b>.', pool: 8, items: [
          { blank: 1, q: 'Look at those black clouds! It ___ rain.', opts: ['is going to', 'will', 'is raining', 'rains'], a: 'is going to', why: 'Las nubes son la <b>evidencia</b> que ves ahora → <b>be going to</b>.' },
          { blank: 1, q: 'I think the community garden ___ be a big success.', opts: ['will', 'is going to be', 'is', 'was'], a: 'will', why: 'Es tu <b>opinión</b> sobre el futuro, sin pruebas → <i>I think</i> + <b>will</b>.' },
          { blank: 1, q: 'The trail is twelve kilometers and it’s very steep. This ___ be a hard hike.', opts: ['is going to', 'won’t', 'isn’t', 'will not'], a: 'is going to', why: 'La descripción del sendero es la evidencia → <b>be going to</b>.' },
          { blank: 1, q: 'Don’t worry, you ___ need a jacket. It’s going to be warm all day.', opts: ['won’t', 'aren’t going to need', 'don’t', 'didn’t'], a: 'won’t', why: 'Predicción negativa basada en tu opinión → <b>won’t</b> + infinitivo.' },
          { blank: 1, q: 'I ___ think the race is going to be canceled. The weather is fine.', opts: ['don’t', 'am not', 'won’t', 'didn’t'], a: 'don’t', why: 'La negación va en <b>I don’t think</b>, no en la predicción.' },
          { blank: 1, q: 'Only six people have signed up. The turnout ___ be small.', opts: ['is going to', 'will be going', 'would', 'has'], a: 'is going to', why: 'El número de inscritos es evidencia que ya conoces → <b>be going to</b>.' },
          { blank: 1, q: 'I think you ___ love the arts festival in July.', opts: ['will', 'are going to loving', 'would', 'have'], a: 'will', why: 'Opinión personal → <i>I think</i> + <b>will</b> + infinitivo.' },
          { blank: 1, q: 'The soup kitchen has no volunteers for Sunday. It ___ be a difficult day.', opts: ['is going to', 'will be going to', 'is', 'goes to'], a: 'is going to', why: 'Sabes el dato ahora → evidencia → <b>be going to</b>.' },
          { blank: 1, q: '"Do you think the bus ___ be late?" "Probably not."', opts: ['will', 'is going', 'does', 'would'], a: 'will', why: 'Pregunta de opinión sobre el futuro → <b>will</b>.' },
          { blank: 1, q: 'He’s been running every morning for six months. He ___ finish the 10K easily.', opts: ['is going to', 'will be going to', 'would', 'is'], a: 'is going to', why: 'Su entrenamiento es la evidencia → <b>be going to</b>.' },
          { blank: 1, q: 'I don’t think it ___ a problem. There’s plenty of food.', opts: ['will be', 'won’t be', 'is going', 'will to be'], a: 'will be', why: 'La negación ya está en <i>I don’t think</i>; la predicción va en afirmativo.' },
          { blank: 1, q: 'Look, the room is completely full. We ___ find a seat.', opts: ['aren’t going to', 'won’t going to', 'don’t', 'are not going'], a: 'aren’t going to', why: 'Lo estás viendo ahora → evidencia → <b>be going to</b> en negativo.' },
        ] },
        { label: 'Decisión o plan', type: 'mcq', eyebrow: 'will vs present continuous', title: '¿Lo decides ahora o ya estaba organizado?', intro: 'Si reaccionas a algo que acabas de oír, es <b>will</b>. Si ya hay hora, sitio o gente acordada, es <b>present continuous</b>.', pool: 8, items: [
          { blank: 1, q: '"You just missed a call from Bryn." "Oh really? I ___ her now."', opts: ['’ll call', '’m calling', 'call', 'called'], a: '’ll call', why: 'Decides llamarla <b>en ese momento</b>, al oír la noticia → <b>will</b>.' },
          { blank: 1, q: '"Are you free at one?" "No, sorry, I ___ my cousin for lunch. We arranged it last week."', opts: ['’m meeting', '’ll meet', 'meet', 'will meeting'], a: '’m meeting', why: 'Plan acordado en el pasado → <b>present continuous</b>.' },
          { blank: 1, q: '"We don’t have any bread." "Don’t worry, I ___ some on my way home."', opts: ['’ll get', '’m getting', 'get', 'am going'], a: '’ll get', why: 'Decisión espontánea al enterarte → <b>will</b>.' },
          { blank: 1, q: 'I ___ to her office in an hour. Do you want to come?', opts: ['’m driving', '’ll drive', 'drive', 'will driving'], a: '’m driving', why: 'Ya lo tenías planeado (hay hora) → <b>present continuous</b>.' },
          { blank: 1, q: '"Would you like more coffee?" "I ___ another one, thanks. I have to drive."', opts: ['won’t have', '’m not having', 'don’t have', 'am not'], a: 'won’t have', why: 'Rechazo inmediato en el momento de hablar → <b>won’t</b>.' },
          { blank: 1, q: 'Chuck ___ a new trail on Saturday. Do you want to join him?', opts: ['is hiking', 'will hike', 'hikes', 'hiked'], a: 'is hiking', why: 'Plan ya organizado para el sábado → <b>present continuous</b>.' },
          { blank: 1, q: '"It’s dangerous to hike alone, Chuck." "OK, fine. I ___ with you."', opts: ['’ll come', '’m coming', 'come', 'came'], a: '’ll come', why: 'Decide venir justo ahora, reaccionando → <b>will</b>.' },
          { blank: 1, q: 'I asked Max, but he ___ a party for his kids that day.', opts: ['is organizing', 'will organize', 'organizes', 'organized'], a: 'is organizing', why: 'Plan ya acordado que le impide venir → <b>present continuous</b>.' },
          { blank: 1, q: '"You’re working later, aren’t you?" "Yes, but it’s OK. I ___ my boss know."', opts: ['’ll let', '’m letting', 'let', 'am going let'], a: '’ll let', why: 'Decisión tomada al hablar → <b>will</b> + <i>let someone know</i>.' },
          { blank: 1, q: '"What time ___ for Bogotá tomorrow?" "At six. I already have the ticket."', opts: ['are you flying', 'will you fly', 'do you fly', 'you fly'], a: 'are you flying', why: 'Billete comprado = plan acordado → <b>present continuous</b>.' },
          { blank: 1, q: '"Nobody has brought gloves." "Don’t worry about it. I ___ some for everybody."', opts: ['’ll bring', '’m bringing', 'bring', 'brought'], a: '’ll bring', why: 'Ofrecimiento espontáneo → <b>will</b>.' },
          { blank: 1, q: 'A few of us ___ up the river path at two on Saturday. Come if you can.', opts: ['are cleaning', 'will clean', 'clean', 'cleaned'], a: 'are cleaning', why: 'Hay hora y gente: plan organizado → <b>present continuous</b>.' },
        ] },
        { label: 'Futuro mixto', type: 'mcq', eyebrow: 'Todo junto', title: 'Elige la forma más natural', intro: 'Aquí se mezclan predicciones, decisiones y planes. Lee la frase anterior: te dice qué forma toca.', pool: 8, items: [
          { blank: 1, q: '"Oh no, I forgot to book a table!" "It’s fine, I ___ the restaurant right now."', opts: ['’ll call', '’m calling', 'call', 'called'], a: '’ll call', why: 'Reacción inmediata → <b>will</b>.' },
          { blank: 1, q: 'The forecast says thirty degrees. I think it ___ a perfect day for the race.', opts: ['will be', 'is being', 'was', 'will to be'], a: 'will be', why: '<i>I think</i> + <b>will</b> para la predicción/opinión.' },
          { blank: 1, q: '"What are you doing this weekend?" "I ___ at the food bank on Saturday morning."', opts: ['’m volunteering', '’ll volunteer', 'volunteer', 'volunteered'], a: '’m volunteering', why: 'Plan ya organizado → <b>present continuous</b>.' },
          { blank: 1, q: 'There are only two volunteers and forty boxes. This ___ take all afternoon.', opts: ['is going to', 'will going to', 'is', 'would'], a: 'is going to', why: 'Los números son evidencia → <b>be going to</b>.' },
          { blank: 1, q: 'I ___ think the community center is going to close. They just got new funding.', opts: ['don’t', 'won’t', 'am not', 'didn’t'], a: 'don’t', why: 'La negación va en <b>I don’t think</b>.' },
          { blank: 1, q: '"Can somebody deal with the tickets?" "Sure, I ___ it."', opts: ['’ll do', '’m doing', 'do', 'did'], a: '’ll do', why: 'Te ofreces en el momento → <b>will</b>.' },
          { blank: 1, q: 'We ___ up with Ana and Pablo at the entrance at seven. It’s all arranged.', opts: ['’re meeting', '’ll meet', 'meet', 'met'], a: '’re meeting', why: '<i>It’s all arranged</i> → plan → <b>present continuous</b>.' },
          { blank: 1, q: 'Don’t worry, it ___ be fine. These things happen sometimes.', opts: ['’ll', 'is going', 'was', 'would'], a: '’ll', why: 'Tranquilizar a alguien con una predicción optimista → <b>It’ll be fine</b>.' },
          { blank: 1, q: '"The bus leaves in five minutes and we’re ten minutes away." "We ___ miss it!"', opts: ['are going to', 'will going', 'do', 'would'], a: 'are going to', why: 'Evidencia clara ahora mismo → <b>be going to</b>.' },
          { blank: 1, q: 'I ___ you know as soon as I check the dates.', opts: ['’ll let', '’m letting', 'let', 'am let'], a: '’ll let', why: 'Promesa/decisión en el momento → <b>will</b> + <i>let you know</i>.' },
          { blank: 1, q: '"Are you taking the test again?" "Yes, I ___ it on the 14th. I already registered."', opts: ['’m taking', '’ll take', 'take', 'took'], a: '’m taking', why: 'Ya está registrado → plan → <b>present continuous</b>.' },
          { blank: 1, q: 'Look how many people are arriving. I think this ___ be the biggest cleanup yet.', opts: ['is going to', 'will going to', 'would', 'was'], a: 'is going to', why: 'Lo estás viendo → evidencia → <b>be going to</b> (aunque vaya tras <i>I think</i>).' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation · listening for details', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>I’ll</i>, <i>won’t</i>, <i>I’m</i>).',
          sentences: [
            "I was so annoyed because it made me late for an important meeting.",
            "We lost the game. I'm so disappointed. I thought we would win.",
            "That's shocking! He usually lets you leave early on Fridays.",
            "Oh really? It's probably about lunch. I'll call her now.",
            "Yes, I'm driving to her office in an hour. Do you want to come?",
            "I won't have another coffee, thanks.",
            "Oh, no! I totally forgot to tell Stefan about our plans.",
            "Can you check what time the bus leaves tomorrow?",
            "Not yet. I'm going to deal with that this evening.",
            "Hmm, I don't know. Let me think about it.",
            "We'll let you know tomorrow evening.",
            "There's no need to worry. You'll be fine.",
            "Don't worry about it. At least there's another one soon.",
            "I'm meeting up with my cousin on Saturday morning.",
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for details', title: 'Escucha el diálogo y responde', intro: 'Dos amigos hablan después de un examen de conducir. Escúchalo entero antes de responder.',
          lines: [
            ['Nadia', "I can't believe it. I failed my driving test again."],
            ['Tom', "Oh no. There's no need to worry. These things happen sometimes."],
            ['Nadia', "Thanks, but I feel so bad. It's the second time."],
            ['Tom', "At least you're getting a lot of practice. When are you taking it again?"],
            ['Nadia', "I'm not sure yet. I'll call the test center tomorrow and look into the dates."],
            ['Tom', "I'm driving to the center on Thursday anyway. I'll give you a ride if you want."],
            ['Nadia', "Really? I really appreciate it."],
            ['Tom', "It's no problem. I think you're going to pass next time. You're much better now."],
          ],
          questions: [
            { q: 'Why does Nadia feel bad?', opts: ['She failed the driving test for the second time.', 'She missed her driving lesson.', 'She lost her driving license.'], a: 'She failed the driving test for the second time.', why: '"I failed my driving test again… It’s the second time."' },
            { q: 'Which sentence does Tom use to point out the good side?', opts: ["At least you're getting a lot of practice.", "These things happen sometimes.", "It's no problem."], a: "At least you're getting a lot of practice.", why: '<b>At least</b> introduce el lado bueno de una situación mala.' },
            { q: '"I’ll call the test center tomorrow." ¿Qué expresa ese <i>will</i>?', opts: ['Una decisión que toma en ese momento', 'Un plan acordado hace días', 'Una predicción con evidencia'], a: 'Una decisión que toma en ese momento', why: 'Acaba de decir <i>I’m not sure yet</i>: lo decide al hablar → <b>will</b>.' },
            { q: 'Why does Tom say "I’m driving to the center on Thursday"?', opts: ['It is a plan he already had.', 'He decides it at that moment.', 'He is predicting the future.'], a: 'It is a plan he already had.', why: '<i>Anyway</i> indica que el plan ya existía → <b>present continuous</b>.' },
            { q: 'How does Nadia respond to Tom’s offer?', opts: ['I really appreciate it.', 'I hope so.', "Thanks, but I feel so bad."], a: 'I really appreciate it.', why: 'Es la respuesta estándar para agradecer ayuda o ánimo.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'My secret spot', task: 'Describe tu sitio secreto de la ciudad en 60 segundos: cómo lo encontraste, cuándo fuiste por última vez, qué haces allí y si es un sitio popular.', model: 'Modelo: "There’s this small park about twenty minutes from my house. I found it when I was walking home one evening. The best time to go is at sunset. It isn’t a popular spot, so it’s always quiet. I’m going there on Sunday with my wife."', tags: ['there’s this', 'found it', 'the best time', 'popular', 'quiet', 'i’m going', 'sunset'] },
          { t: 'A new community event', task: 'Propón un evento nuevo para tu barrio. Di quién iría, cómo ayudaría a la comunidad y qué vas a hacer tú para organizarlo. Usa <i>What if we organized…?</i> y al menos dos verbos de planes.', model: 'Modelo: "What if we organized a monthly cleanup in the park? A lot of families would come. I’ll get in touch with the community center and look into the rules. I think it’s going to help because there is always a lot of trash."', tags: ['what if we', 'get in touch with', 'look into', 'arrange', 'community', 'trash', 'going to'] },
          { t: 'Predictions for the weekend', task: 'Haz cuatro predicciones sobre tu fin de semana: dos con <i>will / won’t</i> (opinión) y dos con <i>be going to</i> (porque tienes pruebas). Explica la prueba en cada caso.', model: 'Modelo: "I think it’ll be a quiet weekend. I don’t think I’ll go out much. The forecast says heavy rain, so it’s going to be a good weekend for movies. My phone says the game is sold out, so we aren’t going to get tickets."', tags: ['i think', 'i don’t think', 'will', 'won’t', 'going to', 'because', 'says'] },
          { t: 'Sudden decisions', task: 'Un compañero te cuenta cinco problemas. Responde a cada uno con una decisión espontánea usando <i>I’ll…</i>: no hay entradas, se ha olvidado la comida, nadie ha reservado mesa, el tren se ha cancelado, falta un voluntario.', model: 'Modelo: "No tickets? Don’t worry, I’ll check the website. You forgot the food? OK, I’ll deal with that. Nobody booked a table? I’ll get in touch with the restaurant now. The train is cancelled? I’ll drive you. No volunteer? I’ll do it."', tags: ['i’ll check', 'i’ll deal with', 'i’ll get in touch', 'don’t worry', 'i’ll do it', 'now'] },
          { t: 'Reassure a friend', task: 'Tu amigo ha suspendido el examen de conducir y llega tarde a una entrevista. Tranquilízalo con tres expresiones distintas y señala el lado bueno con <i>at least</i>. Luego cambia de papel y responde al ánimo.', model: 'Modelo: "There’s no need to worry. These things happen sometimes. You’ll be fine next time. At least you know the route now. — Thanks, but I feel so bad. — Don’t worry about it, it’s no problem. — I really appreciate it."', tags: ['no need to worry', 'you’ll be fine', 'at least', 'don’t worry about it', 'appreciate it', 'i hope so'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación', title: '/p/ inicial con soplo y /n/ enlazada', intro: 'Arriba: la <b>/p/</b> al principio de palabra se pronuncia con un pequeño soplo de aire (pon la mano delante de la boca). Abajo: una <b>/n/</b> final suena como <b>/m/</b> cuando la siguiente palabra empieza por /p/ o /b/, y sigue sonando /n/ delante de /t/ o /d/.',
          pairs: [
            ['/p/ con soplo · park', 'park'], ['/p/ con soplo · plan', 'plan'], ['/p/ con soplo · people', 'people'], ['/p/ con soplo · practice', 'practice'], ['/p/ con soplo · possible', 'possible'], ['/p/ con soplo · problem', 'problem'],
            ['/n/ + /p/ → /m/ · in public', 'in public'], ['/n/ + /p/ → /m/ · green park', 'green park'], ['/n/ + /p/ → /m/ · one problem', 'one problem'],
            ['/n/ + /b/ → /m/ · in bed', 'in bed'], ['/n/ + /b/ → /m/ · open book', 'open book'], ['/n/ + /b/ → /m/ · ten bags', 'ten bags'],
            ['/n/ + /t/ → /n/ · in ten minutes', 'in ten minutes'], ['/n/ + /d/ → /n/ · in December', 'in December'], ['/n/ + /d/ → /n/ · one day', 'one day'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'The Saturday that changed her street', intro: 'Lee una vez para la idea general. Luego responde. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Two years ago, Mara was annoyed every single morning. The small park between her building and the bus stop was full of <b>litter</b>, and the benches were broken. "Somebody will deal with it," she thought for months. Then one Sunday she understood something disappointing: "somebody" was not coming.',
            'She didn’t organize anything complicated. She checked the city website, looked into the rules for public spaces, and got in touch with three neighbors she had never really spoken to. They arranged a two-hour cleanup for the following Saturday and used the building chat group to <b>spread the word</b>. Two days before, Mara was frightened. Only six people had answered.',
            'The <b>turnout</b> surprised everybody. Forty-one people arrived with gloves and bags, including a group of teenagers who had never met their older neighbors before. They filled twenty-six bags in ninety minutes. After that, somebody brought coffee, somebody else brought a speaker, and the cleanup slowly turned into a street party.',
            'Today that park has a small community garden, and the cleanup happens every three months. Mara says the most <b>rewarding</b> part isn’t the vegetables or the new benches. It’s that people say hello now. "I thought I was going to fix a park," she says, laughing. "I didn’t think I was going to meet my own street."',
          ],
          main: [
            { q: 'Far more people came than she expected.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: 41 personas frente a las 6 que habían contestado.' },
            { q: 'A public space was dirty and nobody took responsibility for it.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1 describe el parque lleno de basura y el "somebody will deal with it".' },
            { q: 'She made a few simple, practical arrangements before the event.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: checked, looked into, got in touch with, arranged, spread the word.' },
            { q: 'The best result was social, not physical.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: lo más gratificante es que ahora la gente se saluda.' },
          ],
          infer: [
            { q: '<b>litter</b> (paragraph 1)', opts: ['trash left on the ground in a public place', 'old furniture for sale', 'a group of young animals'], a: 'trash left on the ground in a public place', why: 'El parque está lleno de ello y por eso lo limpian: es basura tirada.' },
            { q: '<b>spread the word</b> (paragraph 2)', opts: ['tell a lot of people about something', 'write an official letter', 'change your opinion'], a: 'tell a lot of people about something', why: 'Usan el grupo de chat del edificio para que se entere mucha gente.' },
            { q: '<b>turnout</b> (paragraph 3)', opts: ['the number of people who come to an event', 'the weather on the day', 'the amount of money collected'], a: 'the number of people who come to an event', why: 'Sorprendió a todos porque llegaron 41 personas.' },
            { q: '<b>rewarding</b> (paragraph 4)', opts: ['giving you a good feeling because it is worth doing', 'very expensive', 'extremely easy'], a: 'giving you a good feeling because it is worth doing', why: 'Habla de lo que más le compensa de todo el proyecto.' },
          ],
          think: '¿Qué evento organizarías tú en tu barrio y por qué? Escribe dos frases: una con <i>I think it’s going to…</i> (con tu evidencia) y otra con <i>I’ll…</i> (qué harás tú primero).' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Conectores de orden', type: 'notes', eyebrow: 'Writing skill · linking words', title: 'Ordenar un plan por escrito', html: `
          <p style="margin:8px 0 14px">En un email de invitación, el lector necesita saber <b>qué pasa primero</b> y <b>qué pasa después</b>. Estos conectores lo dejan claro sin repetir horas todo el rato.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Conector</th><th>Para qué</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>To start</b> / First</td><td>lo primero que pasa</td><td><b>To start</b>, we’re meeting at the community center at nine.</td></tr>
            <tr><td><b>At the same time</b></td><td>dos cosas a la vez</td><td><b>At the same time</b>, another group is cleaning the river path.</td></tr>
            <tr><td><b>After that</b> / Then / Next</td><td>lo que pasa a continuación</td><td><b>After that</b>, we’ll have coffee in the garden.</td></tr>
            <tr><td><b>Finally</b></td><td>lo último</td><td><b>Finally</b>, we’re taking the bags to the recycling point.</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>Combínalos con los tres futuros:</b> el programa ya cerrado va en <b>present continuous</b> (<i>we’re meeting at nine</i>), lo que decides mientras escribes va con <b>will</b> (<i>I’ll bring the gloves</i>), y las predicciones con <b>be going to</b> si tienes pruebas (<i>it’s going to be hot, so bring water</i>).</div>
          <div class="hint small" style="margin-top:12px"><b>Cierre típico de una invitación:</b> <i>Let me know if you can come.</i> · <i>Can you let the others know?</i> · <i>Get in touch if you have any questions.</i> · <i>I’ll send the exact address on Friday.</i></div>` },
        { label: 'Corrige tus frases', type: 'fix', eyebrow: 'Error correction · tus frases reales', title: 'Reescribe la frase corrigiendo el error', intro: 'Estas frases salen de tus ejercicios y textos del curso. Cada una tiene 1-2 errores. Corrígela y compara.', items: [
          { bad: 'I check the train times yesterday, but the website was wrong.', good: 'I checked the train times yesterday, but the website was wrong.', why: '<b>check</b> es regular: el pasado simple es <b>checked</b>. En el curso lo escribiste igual que el infinitivo. Irregulares de esta lista: <i>forget → forgot, let → let, think → thought, deal with → dealt with, get → got, meet up → met up</i>.' },
          { bad: 'Hey, that remind me — did you book a table for tonight?', good: 'Hey, that reminds me — did you book a table for tonight?', why: '<b>that reminds me</b> es una expresión fija. <i>That</i> es tercera persona del singular → verbo con <b>-s</b>.' },
          { bad: 'Hmm, I don’t know. Let me think it.', good: 'Hmm, I don’t know. Let me think about it.', why: 'El verbo es <b>think about</b>: la preposición forma parte del significado "considerarlo". <i>Think it</i> no existe con ese sentido.' },
          { bad: 'We’ll let you think tomorrow evening.', good: 'We’ll let you know tomorrow evening.', why: 'La expresión es <b>let (someone) know</b> = avisar. <i>Let you think</i> sería "dejarte pensar".' },
          { bad: 'What do you think about make an event on social network to convocated people to brush the beach?', good: 'What do you think about making an event on social media to get people together to clean up the beach?', why: 'Tras preposición (<i>about</i>) va <b>-ing</b>. <i>Convocate</i> no existe en inglés: <b>get people together</b> / <b>invite people</b>. <i>Brush</i> es cepillar; limpiar una zona es <b>clean up</b>. Y se dice <b>social media</b>, no <i>social network</i>.' },
          { bad: 'Sometimes I’ve not gone to the beach for the same reason.', good: "Sometimes I haven't been to the beach for the same reason.", why: 'La negación natural del present perfect es <b>haven’t</b>, no <i>’ve not</i>. Y para "haber estado en un sitio" se usa <b>been</b>, no <i>gone</i> (<i>gone</i> = se fue y sigue allí).' },
          { bad: 'It’s a very special item because represents the union between my wife and I.', good: 'It’s a very special item because it represents the union between my wife and me.', why: 'En inglés el <b>sujeto es obligatorio</b>: <i>because <b>it</b> represents</i>. Y tras una preposición (<i>between</i>) va el pronombre objeto: <b>me</b>, no <i>I</i>.' },
          { bad: 'I’ve kept it for 3 years go.', good: "I've kept it for three years.", why: '<b>for</b> + periodo de tiempo (<i>for three years</i>). <b>ago</b> solo aparece con pasado simple y sin <i>for</i>: <i>I bought it three years ago</i>.' },
          { bad: 'I think the weather won’t be good tomorrow.', good: "I don't think the weather will be good tomorrow.", why: 'En inglés la negación se mueve al verbo principal: <b>I don’t think</b> + predicción en afirmativo.' },
          { bad: 'Look at those clouds. It will rain in five minutes.', good: "Look at those clouds. It's going to rain in five minutes.", why: 'Hay <b>evidencia</b> delante de ti (las nubes) → <b>be going to</b>, no <i>will</i>.' },
        ] },
        { label: 'Escribe la invitación', type: 'comment', eyebrow: 'Writing task', title: 'Email de invitación a un evento comunitario', intro: 'Escribe 70-130 palabras invitando a tus vecinos o compañeros a un evento (una limpieza, una carrera 10K, un huerto comunitario, un festival). Ordena el plan con conectores y usa los tres futuros. La checklist se marca sola al analizar el texto.', placeholder: 'Hi everyone,\n\nWe’re organizing a park cleanup on Saturday. To start, we’re meeting at…', min: 70, max: 130, need: 4, checks: [
          { label: 'Empiezo situando lo primero que pasa (<i>to start / first</i>)', re: /\b(to start|first,|first we|firstly)\b/ },
          { label: 'Uso al menos un conector de continuación (<i>then, after that, next, at the same time</i>)', words: ['after that', 'then', 'next,', 'next we', 'at the same time', 'meanwhile'] },
          { label: 'Cierro con <i>finally</i> o similar (<i>finally, in the end, to finish</i>)', words: ['finally', 'in the end', 'to finish', 'lastly'] },
          { label: 'Doy el programa acordado en present continuous (<i>we’re meeting…, I’m bringing…</i>)', re: /\b(i|we|they)['’](m|re)\s+\w+ing\b|\b(i|we|they)\s+(am|are)\s+\w+ing\b/ },
          { label: 'Tomo una decisión o hago una promesa con <i>will</i> (<i>I’ll bring…, I’ll let you know…</i>)', re: /\b(i|we|you|they|it)['’]ll\b|\b(i|we)\s+will\b|\bwon['’]t\b/ },
          { label: 'Hago una predicción con <i>going to</i> o <i>I think</i>', re: /\bgoing to\b|\bi\s+(don['’]t\s+)?think\b/ },
          { label: 'Uso un verbo de planes de la unidad (<i>arrange, check, get in touch, let me know, look into, meet up</i>)', words: ['arrange', 'check', 'deal with', 'get in touch', 'let me know', 'let us know', 'let you know', 'look into', 'meet up', 'remind'] },
          { label: 'Uso un adjetivo de reacción (<i>surprising, fascinating, amusing, disappointing…</i>)', words: ['surprising', 'surprised', 'fascinating', 'fascinated', 'amusing', 'amused', 'interesting', 'interested', 'disappointing', 'shocking', 'annoying', 'embarrassing', 'frightening'] },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language · reassurance', title: 'Las frases, por situación', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Offering reassurance</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>There’s no need to worry.</li><li>You’ll be fine.</li><li>It’ll be fine.</li><li>Don’t worry about it.</li><li>It’s no problem.</li><li>These things happen sometimes.</li></ul></div>
          <div><h3>Responding to reassurance</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I really appreciate it.</li><li>Thanks, but I feel so bad.</li><li>I hope so.</li></ul></div>
          <div><h3>Pointing out the good side</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>At least you’re not late.</li><li>At least you’re close to your work.</li><li>At least it’s an interesting city, and the pay is good.</li></ul></div>
          <div class="hint small"><b>Fíjate en la forma:</b> casi todas las frases de ánimo llevan <b>will</b> (<i>You’ll be fine</i>, <i>It’ll be fine</i>): es una predicción optimista, no un plan.<br><br><b>At least</b> va al principio de la frase que señala el lado bueno y no lleva coma después: <i>At least there’s another train soon.</i><br><br><b>It’s no problem</b> (no hay problema) ≠ <i>There’s no need to worry</i> (no hace falta preocuparse): el primero quita importancia a una molestia que te han causado.</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ['Liam: I just got an email. They want me to move to Denver for the job.', 'Ava: Really? That’s surprising. How do you feel about it?', 'Liam: Honestly, I’m a bit frightened. I don’t know anyone there.', 'Ava: There’s no need to worry. You’ll be fine.', 'Liam: I hope so.', 'Ava: At least it’s an interesting city, and the pay is good.', 'Liam: Yeah, that’s true. Thanks, Ava.'],
          ['Diego: Are you flying to Bogotá tomorrow morning?', 'Lucía: Yes. I’m taking a taxi to the airport at six.', 'Diego: You don’t need to do that. I’ll give you a ride.', 'Lucía: That’s really kind, but you start work at seven, don’t you?', 'Diego: I do, but it’s no problem. I’ll let my manager know.'],
          ['Nina: Hey, are you doing anything on Saturday?', 'Omar: I’m meeting up with my cousin in the morning, but I’m free after that.', 'Nina: Great. A few of us are cleaning up the river path at two.', 'Omar: That sounds good. I’ll come. Should I bring gloves?', 'Nina: Don’t worry about it. I’ll bring some for everybody.'],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué respondes?', pool: 7, items: [
          { q: '"I failed my driving test again." — Quieres tranquilizarle.', opts: ['There’s no need to worry. These things happen sometimes.', 'That’s shocking. You’ll never pass.', 'I really appreciate it.'], a: 'There’s no need to worry. These things happen sometimes.', why: 'Dos fórmulas de <i>reassurance</i> juntas: quitar hierro y normalizar.' },
          { q: '"Don’t worry, I’ll drive you to the airport." — Le agradeces el favor.', opts: ['I really appreciate it.', 'I hope so.', 'It’s no problem.'], a: 'I really appreciate it.', why: 'Es la respuesta para agradecer ayuda concreta. <i>It’s no problem</i> lo diría quien ofrece el favor.' },
          { q: '"Sorry, I spilled coffee on your desk." — No te importa.', opts: ['Don’t worry about it. It’s no problem.', 'I hope so.', 'At least you’re not late.'], a: 'Don’t worry about it. It’s no problem.', why: 'Quitas importancia a una molestia que te han causado.' },
          { q: '"We just missed our train!" — Señala el lado bueno.', opts: ['Don’t worry about it. At least there’s another one soon.', 'That’s terrible. You’ll be late for the concert.', 'Thanks, but I feel so bad.'], a: 'Don’t worry about it. At least there’s another one soon.', why: 'Solo la primera ofrece <i>reassurance</i>: la segunda empeora la situación.' },
          { q: '"My new apartment is really small." — Señala el lado bueno.', opts: ['Yes, it is, but at least it’s near your office.', 'You’re right. I appreciate it.', 'I hope so.'], a: 'Yes, it is, but at least it’s near your office.', why: '<b>At least</b> + la ventaja que compensa el problema.' },
          { q: '"You’ll be fine at the interview tomorrow." — No estás muy convencido.', opts: ['I hope so.', 'It’s no problem.', 'These things happen sometimes.'], a: 'I hope so.', why: '<i>I hope so</i> acepta el ánimo sin sonar totalmente seguro.' },
          { q: '"I’m so sorry, I forgot to book the table." — Te sientes mal y lo dices.', opts: ['Thanks, but I feel so bad.', 'At least you’re not late.', 'There’s no need to worry.'], a: 'Thanks, but I feel so bad.', why: 'Es la respuesta de quien cometió el error tras recibir ánimo.' },
          { q: 'Tu amiga está nerviosa por su primer día de voluntariado. ¿Qué predicción de ánimo le haces?', opts: ['It’ll be fine. You’ll be great.', 'It is fine. You are great.', 'It’s going fine.'], a: 'It’ll be fine. You’ll be great.', why: 'El ánimo sobre el futuro se hace con <b>will</b>: <i>It’ll be fine</i>.' },
          { q: '"The community center canceled the English classes." — Señala algo positivo.', opts: ['At least the basketball games are still on.', 'That’s going to be terrible.', 'I really appreciate it.'], a: 'At least the basketball games are still on.', why: '<b>At least</b> introduce lo que sí sigue funcionando.' },
          { q: '"Thanks for helping me move all these boxes." — Le quitas importancia.', opts: ['It’s no problem.', 'I hope so.', 'Thanks, but I feel so bad.'], a: 'It’s no problem.', why: 'Respuesta típica para restar importancia a un favor que has hecho tú.' },
        ] },
        { label: 'Usa "at least"', type: 'soft', eyebrow: 'Real-world strategy · at least', title: 'Señala el lado bueno de la situación', pattern: /\bat least\b/, missing: 'Falta <b>at least</b> en tu frase', explain: 'Cuando alguien te cuenta un problema, la estrategia más natural en inglés es reconocerlo y a continuación señalar lo bueno con <b>At least…</b>. Escribe una respuesta completa que contenga esa expresión.', items: [
          { h: '"We just missed our train!"', a: 'That’s annoying, but at least there’s another one in twenty minutes.' },
          { h: '"My new apartment is really small."', a: 'Yes, it is, but at least it’s near your office.' },
          { h: '"It rained the whole weekend and the race was canceled."', a: 'That’s disappointing, but at least you don’t have to train this week.' },
          { h: '"Only eight people came to the cleanup."', a: 'Don’t worry about it. At least eight people care about the park.' },
          { h: '"I failed my driving test again."', a: 'These things happen sometimes. At least you know the route now.' },
          { h: '"They moved me to the Denver office for a year."', a: 'It’ll be fine. At least it’s an interesting city, and the pay is good.' },
        ] },
      ] },
    ],
  };
})();
