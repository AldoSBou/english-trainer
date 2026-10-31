/* ===========================================================
   ingles3/unit9.js — Inglés 3 · Unit 9: Study and work
   Estructura: sections[] → activities[] → { type, ...datos }
   Tipos disponibles: notes, flashcards, match, mcq, dictation,
   dialog, speaking, stress, reading, fix, soft, comment, order
   =========================================================== */
(() => {
  /* ---------- Lesson 1 · College subjects ----------
     [palabra, definición ES, ejemplo EN, pregunta personal, definición corta EN] */
  const SUBJ = [
    ['architecture', 'arquitectura: el oficio o la actividad de diseñar edificios', "I'm studying architecture in college. I'd like to design green buildings that conserve energy.", '¿Qué edificio de tu ciudad te parece mejor diseñado?', 'designing buildings'],
    ['biology', 'biología: el estudio científico de los seres vivos (plantas, animales, el cuerpo humano)', "I'd like to study biology like my sister. She studies mice and other small mammals.", '¿Te gustaba la biología en el colegio? ¿Por qué?', 'living things: plants, animals, the human body'],
    ['business', 'empresariales: la compra y venta de bienes y servicios', 'I studied business in college, which helped me learn how businesses become successful.', '¿Te gustaría dirigir tu propio negocio algún día?', 'buying and selling goods and services'],
    ['chemistry', 'química: el estudio científico de las sustancias y de cómo reaccionan o se combinan', 'In chemistry you learn about elements. Hydrogen and helium are the most common elements in the universe.', '¿Recuerdas algún experimento de química del colegio?', 'substances and how they react or combine'],
    ['computer science', 'informática, ciencias de la computación', "I'm going to study computer science in college. I want to learn how to be a programmer for one of the big tech companies.", '¿Qué lenguaje de programación recomendarías a alguien que empieza?', 'computers and how they can be used'],
    ['economics', 'economía: el estudio del impacto del dinero en las personas, las empresas y los países', "I'm going to study economics. I want to learn about the stock market and things like that.", '¿Sigues las noticias de economía? ¿Por qué sí o por qué no?', 'the impact of money on people, companies and countries'],
    ['education', 'magisterio, pedagogía: el proceso de enseñar o aprender en una escuela', 'I studied education in college, and now I teach in an elementary school.', '¿Quién fue el mejor profesor que has tenido?', 'teaching or learning in a school'],
    ['engineering', 'ingeniería: diseñar, construir y reparar cosas como máquinas, puentes, carreteras y edificios', 'I studied engineering in college. I am currently working on a project to build a bridge in the city center.', '¿Qué obra de ingeniería te impresiona más?', 'designing, building and repairing machines, bridges and roads'],
    ['law', 'derecho: el sistema de normas oficiales de un país', "I'd like to study law so I can become a lawyer or a judge.", '¿Te habría gustado estudiar derecho? ¿Por qué?', 'the system of official rules in a country'],
    ['medicine', 'medicina: el estudio del tratamiento de enfermedades y lesiones', "I'm studying medicine so I can become a doctor and help sick people.", '¿Conoces a alguien que estudie medicina? ¿Cómo es su horario?', 'treatment for illness or injury'],
    ['physics', 'física: el estudio científico de las fuerzas naturales, como la energía, el calor y la luz', 'A basic law of physics is that every action has an equal and opposite reaction.', '¿Se te daba bien la física? Explica por qué.', 'natural forces such as energy, heat and light'],
    ['political science', 'ciencias políticas: el estudio de los políticos, el poder y el gobierno', "I'm studying political science because I'm interested in how political leaders make decisions.", '¿Te interesa la política? ¿Por qué?', 'politicians, power and government'],
  ];

  /* ---------- Lesson 1 bis · College life ---------- */
  const CAMPUS = [
    ['campus', 'campus: el terreno y los edificios de una universidad', 'The campus has three libraries and a sports center.', '¿Has visitado alguna vez un campus universitario grande?'],
    ['degree', 'título universitario, carrera', 'I have a Bachelor of Science degree in Computer Studies from New York University.', '¿Qué título tienes o te gustaría tener?'],
    ['internship', 'prácticas, pasantía', 'I did a six-month internship at a design studio before I graduated.', '¿Hiciste prácticas antes de tu primer trabajo?'],
    ['subject', 'asignatura, materia', 'My favorite subject in high school was chemistry.', '¿Cuál era tu asignatura favorita?'],
    ['full-time', 'a tiempo completo (40 horas o más a la semana)', 'After a couple of years I got a full-time contract.', '¿Trabajas a tiempo completo o a tiempo parcial?'],
    ['part-time', 'a tiempo parcial, media jornada', 'I worked part-time as a receptionist while I was studying.', '¿Has tenido alguna vez un trabajo a media jornada?'],
    ['construction', 'construcción', 'She manages the construction of hospitals all over the country.', '¿Te gustaría trabajar en el sector de la construcción?'],
    ['marine biology', 'biología marina', 'He studies coral reefs. Marine biology takes him to the ocean every summer.', '¿Qué animal marino te gustaría estudiar?'],
    ['mechanical engineering', 'ingeniería mecánica', 'Mechanical engineering is about machines, engines and how things move.', '¿Qué máquina te gustaría saber reparar?'],
  ];

  /* ---------- Lesson 2 · Employment ----------
     [palabra, definición ES, ejemplo EN, pregunta personal, definición corta EN] */
  const EMPLOY = [
    ['apply', 'solicitar algo oficialmente, normalmente por escrito (apply FOR a job)', 'I applied for a job at an architecture firm. I hope they call me for an interview!', '¿A cuántos puestos has solicitado este año?', 'to ask officially for something, often in writing'],
    ['career', 'carrera profesional: un trabajo que haces durante una etapa larga de tu vida', 'The university organized a job fair to help us decide what career we want after we graduate.', '¿Cómo describirías tu carrera profesional hasta ahora?', 'a job that you do for a long period of your life'],
    ['contract', 'contrato: acuerdo legal entre dos personas u organizaciones, sobre todo para trabajar por dinero', "I have a contract with a small tech company. I've agreed to finish their website by May 1st.", '¿Lees los contratos enteros antes de firmar?', 'a legal agreement about doing work for an amount of money'],
    ['employer', 'empleador: persona o empresa que paga a otras para que trabajen para ella', "It's always good to learn about your future employer before the job interview.", '¿Qué buscas en un buen empleador?', 'a person or company that pays people to work for them'],
    ['fire', 'despedir a alguien, normalmente porque ha hecho algo mal', "The manager fired Jason. He was always late, and he didn't do much work.", '¿Has visto despedir a alguien alguna vez? ¿Fue justo?', 'to remove someone from their job because they did something wrong'],
    ['hire', 'contratar, emplear a alguien o pagarle para que haga un trabajo', "I had a great interview with the manager, and he hired me right away!", '¿A quién contratarías para tu equipo ideal?', 'to employ someone or pay someone to do a job'],
    ['manage', 'gestionar, controlar u organizar a alguien o algo', "Every month I look at how much money I spent. It'll help me manage my finances.", '¿Gestionas un equipo? ¿Qué es lo más difícil?', 'to control or organize someone or something'],
    ['profession', 'profesión: un tipo de trabajo que necesita formación o estudios especiales', 'Teaching is an important profession. You must complete proper education and training to become a teacher.', '¿Qué profesión admiras más y por qué?', 'work that needs special training or education'],
    ['retirement', 'jubilación: dejar el trabajo y parar de trabajar, normalmente por edad', 'My parents saved enough money for retirement, so they were able to stop working at 65.', '¿A qué edad te gustaría jubilarte?', 'leaving your job and stopping work, usually because you are old'],
    ['salary', 'sueldo: cantidad fija que recibes de tu empleador, normalmente cada mes', "Your starting salary will be 45,000 dollars per year minus taxes. You'll be paid on the last day of every month.", '¿Es el sueldo lo más importante de un trabajo?', 'a fixed amount of money from your employer, usually every month'],
    ['wage', 'salario por horas o por días', 'I get paid an hourly wage at the factory. We record what time we start and finish work.', '¿Has cobrado alguna vez por horas?', 'money for a job, usually on an hourly or daily basis'],
    ['working hours', 'horario laboral, las horas que pasas en el trabajo', 'Not yet. My working hours are 9:30 to 5:30.', '¿Cuál sería tu horario laboral ideal?', 'the amount of time someone spends at work during a day'],
  ];

  /* ---------- Situación → palabra ---------- */
  const SIT_JOB = [
    ['Elizabeth signs a legal agreement to design a website for 500 dollars by May 1st.', 'contract'],
    ['Jason was always late and did very little work, so the manager told him to leave the company.', 'fire'],
    ['The interview went really well and the manager said: "Can you start on Monday?"', 'hire'],
    ['You send your résumé and a letter to a company because you want the job.', 'apply'],
    ['Aldo is 65 now and he has saved enough money to stop working for good.', 'retirement'],
    ['The factory pays Marcus 18 dollars for every hour he works.', 'wage'],
    ['The company pays Nina 45,000 dollars a year, on the last day of every month.', 'salary'],
    ['"Do you need to leave?" "Not yet. I start at 9:30 and I finish at 5:30."', 'working hours'],
    ['She controls the budget, organizes the schedule and leads a team of ten people.', 'manage'],
    ['Teaching, medicine and law all need years of study and special training.', 'profession'],
    ['This is the company that pays you every month and gives you your contract.', 'employer'],
    ['She has been a nurse for thirty years and has never wanted to do anything else.', 'career'],
  ];
  const SIT_SUBJ = [
    ['You want to design bridges, roads and machines.', 'engineering'],
    ['You want to become a lawyer or a judge.', 'law'],
    ['You want to learn about the stock market and how money moves.', 'economics'],
    ['You want to be a programmer for a big tech company.', 'computer science'],
    ['You want to study mice and other small mammals.', 'biology'],
    ['You want to be a doctor and help sick people.', 'medicine'],
    ['You want to teach in an elementary school.', 'education'],
    ['You want to learn about elements like hydrogen and helium.', 'chemistry'],
    ['You want to understand why every action has an equal and opposite reaction.', 'physics'],
    ['You want to know how political leaders make decisions.', 'political science'],
    ['You want to design green buildings that conserve energy.', 'architecture'],
    ['You want to learn how companies become successful.', 'business'],
  ];

  window.UNIT_DATA['ingles3/unit9'] = {
    source: 'WeTalk · Level 3 · Unit 9 · Study and work (asignaturas, empleo y modales de obligación y permiso)',
    description: 'Asignaturas y vida universitaria, vocabulario de empleo y los modales de necesidad, permiso y prohibición: have to, need to, must, can, may, could.',
    map: [
      ['Vocabulary', '12 asignaturas universitarias (<i>architecture, engineering, political science…</i>), vida de campus (<i>degree, internship, full-time…</i>) y 12 palabras de empleo (<i>apply, hire, wage, retirement…</i>)', 'Flashcards con audio, dos ejercicios de emparejar y situación → palabra'],
      ['Grammar', 'Necesidad con <i>have to / need to / must</i>; falta de necesidad con <i>don\'t have to / don\'t need to</i>; permiso con <i>can / may / could</i>; prohibición con <i>can\'t / must not</i>', 'Tabla de reglas, ¿necesario, opcional o prohibido?, pedir vs dar permiso y trampas de forma'],
      ['Listening', 'Diálogos sobre normas del trabajo y el primer día de prácticas', 'Dictado con voz sintética y diálogo con preguntas'],
      ['Speaking', 'Tu trabajo soñado de niño, normas de tu trabajo y entrevista', 'Retos con cronómetro y micrófono; sílaba tónica de las asignaturas'],
      ['Reading', 'Elegir carrera y primer empleo', 'Texto nuevo sobre el mismo tema + inferir significado'],
      ['Writing', 'Las cinco partes de un résumé (experiencia, estudios, habilidades, intereses)', 'Corrige la frase, pide permiso con el patrón correcto y checklist del résumé'],
      ['Social English', '<i>I think I can handle that / That concerns me a little / The thing is…</i>', 'Frases por situación, ordenar diálogos y respuesta rápida'],
    ],
    cando: [
      'Decir qué es obligatorio en mi trabajo con <i>have to</i>, <i>need to</i> y <i>must</i> (<i>You must bring your ID badge</i>)',
      'Distinguir lo que no hace falta (<i>don\'t have to</i>, <i>doesn\'t need to</i>) de lo que está prohibido (<i>can\'t</i>, <i>must not</i>)',
      'Pedir permiso con <i>Can / Could / May I…?</i> y darlo con <i>you can</i> o <i>you may</i>, nunca con <i>you could</i>',
      'Nombrar asignaturas universitarias (<i>architecture, engineering, political science…</i>) y hablar de mis estudios (<i>degree, campus, internship, full-time</i>)',
      'Hablar de empleo con <i>apply for, hire, fire, salary, wage, contract, working hours</i> y describir mi <i>career</i>',
      'Expresar confianza o dudas ante un reto (<i>I think I can handle that</i>, <i>That concerns me a little</i>) y dar mi razón real con <i>The thing is, …</i>',
    ],

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Anverso: la palabra. Reverso: significado, ejemplo del curso y una pregunta para ti. Pulsa 🔊 para oír la pronunciación.',
          cards: [
            ...SUBJ.map(s => ({ cat: 'College subjects', w: s[0], def: s[1], ex: s[2], ask: s[3] })),
            ...CAMPUS.map(c => ({ cat: 'College life', w: c[0], def: c[1], ex: c[2], ask: c[3] })),
            ...EMPLOY.map(e => ({ cat: 'Employment', w: e[0], def: e[1], ex: e[2], ask: e[3] })),
          ] },
        { label: 'Asignaturas', type: 'match', eyebrow: 'College subjects', title: 'Empareja la asignatura con lo que se estudia en ella', intro: 'Toca una asignatura de la izquierda y luego su definición de la derecha.', pairs: SUBJ.map(s => [s[0], s[4]]), round: 6 },
        { label: 'Empleo', type: 'match', eyebrow: 'Employment', title: 'Empareja la palabra con su definición', intro: 'Ojo con la pareja <i>salary</i> (fijo, mensual) y <i>wage</i> (por horas), y con <i>hire</i> (contratar) y <i>fire</i> (despedir).', pairs: EMPLOY.map(e => [e[0], e[4]]), round: 6 },
        { label: '¿Qué asignatura?', type: 'mcq', eyebrow: 'Situación → asignatura', title: 'Lee lo que quiere hacer esta persona y elige la asignatura', pool: 7,
          build: ({ pick, esc }) => SIT_SUBJ.map(s => {
            const w = SUBJ.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(SUBJ.map(x => x[0]).filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + w[0] + '</b> — ' + w[4] + '. ' + w[1] };
          }) },
        { label: '¿Qué palabra de empleo?', type: 'mcq', eyebrow: 'Situación → palabra', title: 'Lee la situación y elige la palabra correcta', pool: 7,
          build: ({ pick, esc }) => SIT_JOB.map(s => {
            const w = EMPLOY.find(x => x[0] === s[1]);
            return { q: esc(s[0]), opts: [s[1], ...pick(EMPLOY.map(x => x[0]).filter(x => x !== s[1]), 3)], a: s[1], why: '<b>' + w[0] + '</b> — ' + w[4] + '. ' + w[1] };
          }) },
        { label: 'Vida universitaria', type: 'mcq', eyebrow: 'College life', title: 'Completa con la palabra de campus', pool: 7, items: [
          { blank: 1, q: 'I studied part-time because I worked in the mornings, so it took me five years to finish my ___.', opts: ['degree', 'campus', 'wage', 'subject'], a: 'degree', why: '<b>degree</b> = el título universitario que consigues al terminar.' },
          { blank: 1, q: 'The university has three libraries, two cafés and a sports center on ___.', opts: ['campus', 'contract', 'internship', 'profession'], a: 'campus', why: '<b>campus</b> = el terreno y los edificios de la universidad.' },
          { blank: 1, q: 'I did a six-month ___ at a design studio. They did not pay much, but I learned a lot.', opts: ['internship', 'retirement', 'employer', 'degree'], a: 'internship', why: '<b>internship</b> = prácticas, normalmente cortas y para aprender.' },
          { blank: 1, q: 'My favorite ___ in high school was chemistry.', opts: ['subject', 'career', 'salary', 'campus'], a: 'subject', why: '<b>subject</b> = asignatura. No lo confundas con <i>profession</i> (profesión).' },
          { blank: 1, q: 'She works forty hours a week. She has a ___ contract.', opts: ['full-time', 'part-time', 'marine', 'mechanical'], a: 'full-time', why: '<b>full-time</b> = a tiempo completo; <b>part-time</b> = media jornada.' },
          { blank: 1, q: 'I worked ___ as a receptionist while I was studying, only three hours a day.', opts: ['part-time', 'full-time', 'construction', 'retirement'], a: 'part-time', why: '<b>part-time</b> = a tiempo parcial.' },
          { blank: 1, q: 'He studies coral reefs and whales. He is doing a degree in ___.', opts: ['marine biology', 'mechanical engineering', 'political science', 'economics'], a: 'marine biology', why: '<b>marine biology</b> = biología marina, la biología del mar.' },
          { blank: 1, q: 'She designs engines and studies how machines move. Her field is ___.', opts: ['mechanical engineering', 'marine biology', 'architecture', 'education'], a: 'mechanical engineering', why: '<b>mechanical engineering</b> = ingeniería mecánica.' },
          { blank: 1, q: 'After the design is finished, the ___ of the building takes about two years.', opts: ['construction', 'retirement', 'internship', 'wage'], a: 'construction', why: '<b>construction</b> = construcción, el proceso de levantar el edificio.' },
          { blank: 1, q: 'I ___ for three internships and one of them called me back.', opts: ['applied', 'hired', 'managed', 'fired'], a: 'applied', why: 'Se dice <b>apply for</b> a job / an internship. Nunca <i>apply to a job</i>.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'Necesidad · permiso · prohibición', title: 'Los cuatro cuadrantes de los modales', html: `
          <p style="margin:8px 0 14px">Todo este bloque se resume en cuatro preguntas: <b>¿es necesario?</b>, <b>¿no es necesario?</b>, <b>¿me dejas?</b> y <b>¿está prohibido?</b>. Cada una tiene su modal.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Forma</th><th>Uso</th><th>Ejemplo del curso</th><th>Pista</th></tr></thead><tbody>
            <tr><td><b>have to / has to</b></td><td>es necesario (lenguaje cotidiano)</td><td>He <b>has to</b> get dressed and comb his hair.</td><td>Preguntas con <b>do / does</b>: <i>Does he have to give a presentation?</i></td></tr>
            <tr><td><b>need to / needs to</b></td><td>es necesario (igual que <i>have to</i>)</td><td>He <b>needs to</b> be on time.</td><td><i>Does he need to take his laptop?</i></td></tr>
            <tr><td><b>must</b> + forma base</td><td>es necesario, en situaciones <b>formales</b>: normas escritas, carteles, contratos</td><td>Presenters <b>must arrive</b> 15 minutes early.<br>You <b>must bring</b> your ID badge to work.</td><td>Nunca <i>must to</i>, nunca <i>musts</i></td></tr>
            <tr><td><b>don't have to / doesn't need to</b></td><td><b>no</b> es necesario, pero puedes hacerlo si quieres</td><td>The cat <b>doesn't have to</b> brush its teeth.<br>The cat <b>doesn't need to</b> do anything.</td><td>Traduce como "no hace falta"</td></tr>
            <tr><td><b>can't / must not (mustn't)</b></td><td>está <b>prohibido</b>, no está permitido</td><td>You <b>can't</b> stand up when the bus is moving.<br>You <b>must not</b> stand up when the bus is moving.</td><td><i>must not</i> es más fuerte que <i>can't</i></td></tr>
            <tr><td><b>Can / May / Could I…?</b></td><td><b>pedir</b> permiso</td><td><b>Can I</b> open the window?<br><b>May I</b> open the window?<br><b>Could I</b> open the window?</td><td><i>May</i> es el más formal</td></tr>
            <tr><td><b>You can / You may…</b></td><td><b>dar</b> permiso</td><td>You <b>can</b> ask me questions at any time.<br>You <b>may</b> ask me questions at any time.</td><td>Solo estos dos</td></tr>
          </tbody></table></div>
          <div class="hint" style="margin-top:14px"><b>La trampa número uno:</b> <i>could</i> sirve para <b>pedir</b> permiso, pero <b>nunca</b> para darlo.<br>✔ <i>Could I email you?</i> · ✘ <i>Yes, you could email me.</i> → ✔ <i>Yes, you <b>can</b> email me.</i> / <i>Yes, you <b>may</b> email me.</i></div>
          <div class="hint" style="margin-top:12px"><b>La trampa número dos:</b> <b>must not</b> ≠ <b>don't have to</b>.<br><i>You <b>must not</b> use your phone in the cockpit</i> = está prohibido.<br><i>You <b>don't have to</b> wear a tie</i> = puedes ponértelo, pero no hace falta.</div>
          <h3 style="margin-top:18px">Preguntas y negativas</h3>
          <div class="scroll-x"><table class="table"><thead><tr><th></th><th>Afirmativa</th><th>Negativa</th><th>Pregunta</th></tr></thead><tbody>
            <tr><td><b>have to</b></td><td>She <b>has to</b> sign it.</td><td>She <b>doesn't have to</b> sign it.</td><td><b>Does</b> she <b>have to</b> sign it?</td></tr>
            <tr><td><b>need to</b></td><td>They <b>need to</b> apply.</td><td>They <b>don't need to</b> apply.</td><td><b>Do</b> they <b>need to</b> apply?</td></tr>
            <tr><td><b>must</b></td><td>You <b>must</b> arrive early.</td><td>You <b>must not</b> arrive late.</td><td>(poco usual: se prefiere <i>Do I have to…?</i>)</td></tr>
          </tbody></table></div>
          <p class="small" style="margin-top:10px">Fíjate en que después de <b>does</b> vuelve la forma base: <i>Does he <b>have</b> to…?</i>, nunca <i>Does he has to…?</i></p>` },

        { label: '¿Necesario, opcional o prohibido?', type: 'mcq', eyebrow: 'Necessity · no necessity · prohibition', title: 'Elige el modal que encaja con la situación', pool: 8, items: [
          { blank: 1, q: 'Presenters ___ arrive 15 minutes early. It is a rule of the conference.', opts: ['must', "don't have to", 'must not', 'could'], a: 'must', why: 'Norma formal y escrita → <b>must</b> + forma base.' },
          { blank: 1, q: "It's Saturday, so I ___ get up early. I can sleep until eleven if I want.", opts: ["don't have to", 'must not', 'have to', "can't"], a: "don't have to", why: 'No es necesario, pero sí está permitido → <b>don\'t have to</b>.' },
          { blank: 1, q: 'Pilots ___ use their personal cell phones in the cockpit. It is strictly forbidden.', opts: ['must not', "don't need to", "don't have to", 'need to'], a: 'must not', why: 'Prohibido → <b>must not</b> (o <b>can\'t</b>). <i>Don\'t have to</i> significaría que sí pueden.' },
          { blank: 1, q: 'She ___ take her laptop; the office gives a computer to everyone.', opts: ["doesn't need to", 'must not', 'needs to', "can't"], a: "doesn't need to", why: 'No hace falta, pero podría llevarlo → <b>doesn\'t need to</b>.' },
          { blank: 1, q: '___ he have to give a presentation tomorrow?', opts: ['Does', 'Do', 'Is', 'Has'], a: 'Does', why: 'Tercera persona en presente → <b>Does</b> + sujeto + <b>have to</b> + base.' },
          { blank: 1, q: 'To become a pilot you ___ study for many years and pass difficult exams.', opts: ['have to', "don't have to", 'must not', 'may'], a: 'have to', why: 'Es necesario, lenguaje cotidiano → <b>have to</b>.' },
          { blank: 1, q: 'You ___ stand up when the bus is moving.', opts: ["can't", "don't have to", 'need to', 'may'], a: "can't", why: 'Prohibición → <b>can\'t</b> (o el más fuerte <b>must not</b>).' },
          { blank: 1, q: 'My working hours are flexible, so I ___ be in the office at nine.', opts: ["don't need to", 'must not', "can't", 'need to'], a: "don't need to", why: 'Flexible = no hace falta, no está prohibido.' },
          { blank: 1, q: 'All employees ___ bring their ID badge to work.', opts: ['must', "don't have to", 'must not', 'could'], a: 'must', why: 'Norma de la empresa → <b>must</b>.' },
          { blank: 1, q: 'The cat ___ brush its teeth. Cats do not do that.', opts: ["doesn't have to", 'must not', 'has to', "can't"], a: "doesn't have to", why: 'No es necesario → <b>doesn\'t have to</b>.' },
          { blank: 1, q: 'Does she ___ sign the contract today?', opts: ['need to', 'needs to', 'needed to', 'to need'], a: 'need to', why: 'Después de <b>does</b> vuelve la forma base: <i>need to</i>.' },
          { blank: 1, q: 'He ___ be on time. The interview starts at 10:00 sharp.', opts: ['needs to', 'need to', "doesn't need to", 'needing to'], a: 'needs to', why: 'Sujeto en tercera persona en afirmativa → <b>needs to</b>.' },
          { blank: 1, q: 'Applicants ___ send their résumé before Friday, September 30.', opts: ['must', 'must to', 'musts', 'are must'], a: 'must', why: '<b>must</b> nunca lleva <i>to</i> ni <i>-s</i>.' },
          { blank: 1, q: 'We ___ pay for lunch here — the company pays for it.', opts: ["don't have to", 'must not', "can't", 'have to'], a: "don't have to", why: 'Puedes comer, simplemente no lo pagas tú → <b>don\'t have to</b>.' },
          { blank: 1, q: 'Pilots ___ drink alcohol before flying. It is against the law.', opts: ['must not', "don't have to", "don't need to", 'may'], a: 'must not', why: 'Contra la ley = prohibición → <b>must not</b>.' },
          { blank: 1, q: 'Interns ___ work on Saturdays, but they can if they want extra hours.', opts: ["don't have to", 'must not', "can't", 'must'], a: "don't have to", why: 'Está permitido pero no es obligatorio.' },
        ] },

        { label: 'Pedir vs dar permiso', type: 'mcq', eyebrow: 'Asking and giving permission', title: 'can, may, could: ¿quién pide y quién da?', pool: 7, items: [
          { blank: 1, q: "___ I open the window? It's really hot in here.", opts: ['Could', 'Must', 'Do', 'Am'], a: 'Could', why: 'Para <b>pedir</b> permiso: <i>Can I…? / May I…? / Could I…?</i>' },
          { q: '"Could I email you later?" — "Yes, you ___ email me any time."', opts: ['can', 'could', 'must', "don't have to"], a: 'can', why: '<b>could</b> sirve para pedir permiso, <b>nunca</b> para darlo. Se da con <b>can</b> o <b>may</b>.', blank: 1 },
          { q: '"May I ask a question?" — "Of course, you ___ ask me questions at any time."', opts: ['may', 'could', 'must', 'need to'], a: 'may', why: '<b>may</b> da permiso de forma algo formal. <i>Could</i> aquí sería incorrecto.', blank: 1 },
          { blank: 1, q: '___ I use your laptop for five minutes, please?', opts: ['Can', 'Have', 'Am', 'Will to'], a: 'Can', why: '<i>Can I…?</i> es la forma más habitual e informal de pedir permiso.' },
          { q: '¿Cuál de estas frases es INCORRECTA?', opts: ['Yes, you could open the window.', 'Could you open the window?', 'You can open the window.', 'May I open the window?'], a: 'Yes, you could open the window.', why: 'Es el error que avisa el curso: <b>could</b> no da permiso. Di <i>Yes, you <b>can</b> open the window.</i>' },
          { q: 'Quieres salir antes de la reunión. ¿Qué le dices a tu jefa?', opts: ['Could I leave a little early today?', 'You could leave early today.', 'I must leave early today.', 'Do I leave early?'], a: 'Could I leave a little early today?', why: 'Pides permiso sobre ti mismo: <b>Could I…?</b>' },
          { q: 'Tu empleada pregunta si puede teletrabajar el viernes y le dices que sí.', opts: ['Yes, you can work from home.', 'Yes, you could work from home.', 'Yes, you must work from home.', 'Yes, you have to work from home.'], a: 'Yes, you can work from home.', why: 'Dar permiso = <b>can</b> o <b>may</b>. <i>Must / have to</i> serían una orden, no un permiso.' },
          { q: '"Can I bring a friend to the office party?" — "Sure, you ___."', opts: ['can', 'could', 'must', 'need'], a: 'can', why: 'La respuesta corta repite el modal que da permiso: <b>can</b>.', blank: 1 },
          { blank: 1, q: '___ I take a photo of the model of the building?', opts: ['May', 'Have', 'Do', 'Will'], a: 'May', why: '<b>May I…?</b> es la forma más formal y educada de pedir permiso.' },
          { q: 'Elizabeth quiere ir al concierto y se lo pide a su padre. ¿Qué dice?', opts: ['Dad, could I go to the concert, please?', 'Dad, you could go to the concert.', 'Dad, I must go to the concert.', 'Dad, do I have to go to the concert?'], a: 'Dad, could I go to the concert, please?', why: 'Pide permiso con <b>Could I…?</b> + <i>please</i>.' },
          { q: 'La forma más formal y educada de pedir permiso es:', opts: ['May I…?', 'I want to…', 'I need…', 'Do I…?'], a: 'May I…?', why: 'Orden de formalidad: <i>Can I…?</i> < <i>Could I…?</i> < <i>May I…?</i>' },
          { blank: 1, q: '"___ I leave my bag here?" — "Yes, of course you can."', opts: ['Could', 'Should', 'Must', 'Would'], a: 'Could', why: '<b>Could I…?</b> pide permiso. La respuesta usa <b>can</b>.' },
        ] },

        { label: 'Trampas de forma', type: 'mcq', eyebrow: 'Form traps + repaso', title: 'Elige la frase o la forma correcta', pool: 8, items: [
          { q: '¿Cuál es correcta?', opts: ['He has to leave early.', 'He have to leave early.', 'He has to leaves early.', 'He has leave early.'], a: 'He has to leave early.', why: 'Tercera persona: <b>has to</b> + forma base del verbo.' },
          { q: '¿Cuál es correcta?', opts: ['You must bring your ID badge.', 'You must to bring your ID badge.', 'You must bringing your ID badge.', 'You musts bring your ID badge.'], a: 'You must bring your ID badge.', why: '<b>must</b> + forma base, sin <i>to</i> y sin <i>-s</i>.' },
          { blank: 1, q: '___ she have to work on Saturday?', opts: ['Does', 'Do', 'Has', 'Is'], a: 'Does', why: 'Pregunta con <i>have to</i> en tercera persona → <b>Does … have to</b>.' },
          { blank: 1, q: 'He ___ have to wear a suit at the office.', opts: ["doesn't", "don't", "isn't", "hasn't"], a: "doesn't", why: 'Negativa de <i>have to</i> en tercera persona → <b>doesn\'t have to</b>.' },
          { q: '"Do not drink alcohol before flying." Esto significa que los pilotos…', opts: ['must not drink alcohol before flying.', "don't have to drink alcohol before flying.", "don't need to drink alcohol before flying.", 'may drink alcohol before flying.'], a: 'must not drink alcohol before flying.', why: 'Prohibición, no falta de necesidad. <b>must not</b> = no está permitido.' },
          { q: '"Lunch is free for everyone." Esto significa que tú…', opts: ["don't have to pay for lunch.", 'must not pay for lunch.', "can't pay for lunch.", 'have to pay for lunch.'], a: "don't have to pay for lunch.", why: 'No hace falta pagar; no es que esté prohibido.' },
          { blank: 1, q: 'My working hours ___ 9:30 to 5:30.', opts: ['are', 'is', 'has', 'be'], a: 'are', why: '<b>working hours</b> es plural, así que lleva <b>are</b>.' },
          { blank: 1, q: 'I ___ a job at an architecture firm last week.', opts: ['applied for', 'applied to', 'applied', 'apply for'], a: 'applied for', why: 'Se dice <b>apply for</b> a job. Y <i>last week</i> pide simple past: <b>applied</b>.' },
          { blank: 1, q: 'Teaching is an important ___. You must complete proper training.', opts: ['profession', 'employer', 'wage', 'retirement'], a: 'profession', why: '<b>profession</b> = trabajo que exige formación especial.' },
          { blank: 1, q: 'He ___ to be on time for the interview.', opts: ['needs', 'need', 'needing', 'is need'], a: 'needs', why: 'Tercera persona afirmativa → <b>needs to</b>.' },
          { blank: 1, q: 'The manager ___ Jason because he was always late and did very little work.', opts: ['fired', 'hired', 'applied', 'retired'], a: 'fired', why: '<b>fire</b> = despedir; <b>hire</b> = contratar. Son casi contrarias y suenan parecido.' },
          { blank: 1, q: 'My car ___ down on the highway, so a stranger gave me a ride.', opts: ['broke', 'broken', 'breaks', 'was breaking'], a: 'broke', why: 'Repaso de la Unit 5: <i>break down</i> → simple past irregular <b>broke down</b>.' },
          { blank: 1, q: 'I ___ my phone behind on the bus yesterday.', opts: ['left', 'leaved', 'leave', 'was leaving'], a: 'left', why: 'Repaso de la Unit 5: <i>leave behind</i> → <b>left</b> (irregular) + <i>yesterday</i>.' },
          { blank: 1, q: 'I was talking to my neighbor when the lights ___ off.', opts: ['went', 'were going', 'go', 'have gone'], a: 'went', why: 'Repaso de la Unit 5: acción larga en past continuous + interrupción corta en simple past.' },
          { blank: 1, q: 'She ___ a small team of designers since January.', opts: ['has managed', 'manage', 'managing', 'was managing'], a: 'has managed', why: 'Repaso: <i>since January</i> (empezó y sigue) → present perfect.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Usa la voz del navegador. Repite las veces que quieras y baja la velocidad si hace falta. Las contracciones cuentan (<i>doesn\'t</i>, <i>can\'t</i>, <i>I\'m</i>).',
          sentences: [
            'He has to get dressed and comb his hair.',
            'Does he have to give a presentation?',
            'He needs to be on time.',
            'Presenters must arrive 15 minutes early.',
            'You must bring your ID badge to work.',
            "The cat doesn't have to brush its teeth.",
            'Could I open the window, please?',
            'You may ask me questions at any time.',
            "You can't stand up when the bus is moving.",
            'I applied for a job at an architecture firm.',
            'My working hours are 9:30 to 5:30.',
            "I'm going to study computer science in college.",
          ] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening for detail', title: 'El primer día de prácticas', intro: 'Escucha el diálogo entero antes de responder. Fíjate en qué es obligatorio, qué no hace falta y qué está prohibido.',
          lines: [
            ['Nadia', "Good morning! You must be Diego, the new intern. I'm Nadia, your manager."],
            ['Diego', 'Nice to meet you. Could I ask a few questions before we start?'],
            ['Nadia', 'Of course, you can ask me questions at any time. What do you need to know?'],
            ['Diego', 'What are my working hours?'],
            ['Nadia', "Nine to five. But you don't have to be here at nine every day. If you have a class on campus, just tell me the day before."],
            ['Diego', 'Great. Do I have to bring my own laptop?'],
            ['Nadia', "No, you don't need to. We'll give you one. But you must bring your ID badge — you can't enter the building without it."],
            ['Diego', 'Understood. And the contract? Do I have to sign something today?'],
            ['Nadia', 'Yes. Human Resources needs to see your ID and your degree certificate. After three months we can talk about a full-time contract and a real salary.'],
            ['Diego', 'That sounds good. I think I can handle that.'],
          ],
          questions: [
            { q: 'What is Diego at this company?', opts: ['He is the new intern.', 'He is the manager.', 'He works in Human Resources.'], a: 'He is the new intern.', why: 'Nadia dice: "You must be Diego, the new intern."' },
            { q: 'Which of these is NOT necessary?', opts: ['bringing his own laptop', 'bringing his ID badge', 'signing a contract'], a: 'bringing his own laptop', why: '"No, you <b>don\'t need to</b>. We\'ll give you one." → no hace falta.' },
            { q: 'Why must Diego bring his ID badge?', opts: ["He can't enter the building without it.", 'His manager wants a photo of him.', 'It shows his salary.'], a: "He can't enter the building without it.", why: '"You <b>must</b> bring your ID badge — you <b>can\'t</b> enter the building without it."' },
            { q: 'What can happen after three months?', opts: ['They can talk about a full-time contract.', 'He has to retire.', 'He must change his working hours.'], a: 'They can talk about a full-time contract.', why: '"After three months we can talk about a full-time contract and a real salary."' },
            { q: 'Which sentence shows that Diego feels confident?', opts: ['I think I can handle that.', 'That concerns me a little.', "I'm not sure I can handle that."], a: 'I think I can handle that.', why: '<i>I think I can handle that</i> = expresa confianza. Las otras dos expresan lo contrario.' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Your childhood dream job', task: 'Cuenta en 60 segundos cuál era tu trabajo soñado cuando eras niño y por qué (¿el sueldo, el horario, el sitio?). Termina diciendo si sigue siendo tu sueño hoy.', model: 'Modelo: "When I was about seven, my dream was to become a commercial airline pilot. I didn\'t care about the salary or the working hours at all — I loved the idea of having my office in the sky. Today I work in technology, because the working hours of a pilot are exhausting and you have to spend too much time away from your family."', tags: ['dream', 'salary', 'working hours', 'because', 'have to', 'when i was'] },
          { t: 'The rules of your job', task: 'Describe tres cosas que TIENES que hacer en tu trabajo, dos que NO hace falta hacer y dos que están PROHIBIDAS. Usa have to, don\'t have to y can\'t / must not.', model: 'Modelo: "I have to join a stand-up meeting every morning and I need to review my teammates\' code. I don\'t have to wear a suit, and I don\'t need to be in the office every day. But I can\'t share client data, and I must not deploy to production on a Friday."', tags: ['have to', "don't have to", "can't", 'must not', 'need to', 'every day'] },
          { t: 'Asking for permission', task: 'Pide permiso a tu jefe para tres cosas distintas usando Could I…?, May I…? y Can I…?. Después haz la voz del jefe dando permiso con can o may. Recuerda: nunca "you could".', model: 'Modelo: "Could I leave a little early on Thursday? — Yes, you can leave at four. / May I use the meeting room at noon? — Of course, you may use it any time."', tags: ['could i', 'may i', 'can i', 'you can', 'you may', 'please'] },
          { t: 'Talk about your studies', task: 'Habla de tus estudios: la asignatura, el título, el campus, si estudiaste full-time o part-time y si hiciste prácticas. Añade qué asignatura te habría gustado estudiar y por qué.', model: 'Modelo: "I studied computer science full-time and I have a degree from a university in Lima. The campus was small but it had a great library. I did a six-month internship at a software company. I\'d also like to study architecture, because I love how buildings are designed."', tags: ['degree', 'campus', 'internship', 'full-time', 'part-time', 'subject', 'studied', 'would like'] },
          { t: 'Job interview: why should we hire you?', task: 'Responde en 60 segundos: tu profesión, tu experiencia, qué gestionas ahora y por qué deberían contratarte. Termina con una frase de confianza de la unidad.', model: 'Modelo: "I\'m a software engineer. I applied for this job because I want to manage bigger projects. I\'ve been in this profession for ten years and right now I manage a team of five people. It won\'t be a problem — I think I can handle that."', tags: ['apply', 'profession', 'manage', 'hire', 'experience', 'i can handle', "won't be a problem"] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación', title: 'Sílaba tónica: asignaturas y trabajo', intro: 'La sílaba en MAYÚSCULAS es la fuerte. Escucha y repite en voz alta.',
          pairs: [
            ['AR-chi-tec-ture', 'architecture'],
            ['bi-O-lo-gy', 'biology'],
            ['CHEM-is-try', 'chemistry'],
            ['PHY-sics', 'physics'],
            ['e-co-NO-mics', 'economics'],
            ['en-gi-NEER-ing', 'engineering'],
            ['e-du-CA-tion', 'education'],
            ['ME-di-cine', 'medicine'],
            ['po-LI-ti-cal SCI-ence', 'political science'],
            ['pro-FES-sion', 'profession'],
            ['re-TIRE-ment', 'retirement'],
            ['em-PLOY-er', 'employer'],
            ['SA-la-ry', 'salary'],
            ['ca-REER', 'career'],
            ['CON-tract (n.)', 'contract'],
            ['IN-tern-ship', 'internship'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading for main ideas · inferring meaning', title: 'Choosing a major is not choosing a life', intro: 'Lee una vez para la idea general. Luego responde. Las palabras marcadas se preguntan después: intenta deducirlas por el contexto.',
          paragraphs: [
            'Every year, thousands of eighteen-year-olds sit down with a list of college subjects and try to choose one. Biology or chemistry? Law or political science? Economics or business? For many students the list feels <b>overwhelming</b>, because they believe that this single decision will control the next forty years of their lives.',
            'In reality, a degree is a starting point, not a contract. A friend of mine studied architecture for five years. Today she manages the construction of hospitals, and she says she uses her drawing classes less than her habit of solving problems with other people. Skills like that are <b>transferable</b>: you can carry them from one profession to a completely different one.',
            'So how do you <b>narrow down</b> the options? Talk to people who already do the job. Take a part-time job or an internship, even a boring one, because two months on a real campus or in a real office teach you things that no website can. Ask about working hours, about salaries and wages, and about what the worst day of the month looks like.',
            'And remember the two rules that matter. You don\'t have to know your final career at nineteen; almost nobody does. But you must keep learning after you graduate, because many of the jobs that will hire you in 2040 probably don\'t exist yet. A degree opens a door. What you do <b>afterwards</b> decides which room you end up in.',
          ],
          main: [
            { q: 'A degree is only a starting point: skills move from one job to another.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: la amiga arquitecta que hoy gestiona obras de hospitales.' },
            { q: 'Practical ways to reduce the list of options.', opts: ['1', '2', '3', '4'], a: '3', why: 'Párrafo 3: hablar con gente del sector, prácticas, trabajo a media jornada.' },
            { q: 'Young students feel that one choice will decide everything.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1 plantea el problema y la sensación de agobio.' },
            { q: 'You are not obliged to decide now, but you are obliged to keep learning.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4 contrapone <i>don\'t have to know</i> con <i>must keep learning</i>.' },
          ],
          infer: [
            { q: '<b>overwhelming</b> (paragraph 1)', opts: ['too big or difficult to deal with', 'very cheap', 'easy to remember'], a: 'too big or difficult to deal with', why: 'La lista les agobia porque creen que decide cuarenta años de su vida.' },
            { q: '<b>transferable</b> (paragraph 2)', opts: ['able to be moved from one situation to another', 'impossible to learn', 'paid by the hour'], a: 'able to be moved from one situation to another', why: 'El texto lo explica: "you can carry them from one profession to a completely different one".' },
            { q: '<b>narrow down</b> (paragraph 3)', opts: ['reduce a big list to a few good options', 'make something longer', 'cancel a decision'], a: 'reduce a big list to a few good options', why: 'Viene justo después de hablar de una lista larga de opciones.' },
            { q: '<b>afterwards</b> (paragraph 4)', opts: ['after that moment, later', 'before starting', 'at the same time'], a: 'after that moment, later', why: '"A degree opens a door. What you do <b>afterwards</b>…" → lo que haces después de graduarte.' },
          ],
          think: '¿Estás de acuerdo con el texto? Escribe dos frases empezando con <i>I agree that you don\'t have to… because…</i> o <i>I\'m not sure I agree, because in my country you have to…</i>' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Corrige la frase', type: 'fix', eyebrow: 'Error correction', title: 'Reescribe la frase corrigiendo el error', intro: 'Cada frase tiene un error típico con los modales o con el vocabulario de empleo. Corrígela y compara con la solución.', items: [
          { bad: 'You must to bring your ID badge to work.', good: 'You must bring your ID badge to work.', why: '<b>must</b> va siempre con la <b>forma base</b>, sin <i>to</i>: <i>must bring</i>, <i>must arrive</i>, <i>must pass</i>.' },
          { bad: 'Yes, you could email me.', good: 'Yes, you can email me.', why: 'El error estrella de la unidad: <b>could</b> sirve para <b>pedir</b> permiso, nunca para <b>darlo</b>. Usa <b>can</b> o <b>may</b>.' },
          { bad: 'Does he has to give a presentation?', good: 'Does he have to give a presentation?', why: 'Después de <b>does</b> el verbo vuelve a la forma base: <i>does he <b>have</b> to…?</i>' },
          { bad: "He don't have to work on Saturdays.", good: "He doesn't have to work on Saturdays.", why: 'Tercera persona del singular en negativa → <b>doesn\'t</b> have to.' },
          { bad: "You don't have to use your phone in the cockpit. It's forbidden.", good: "You can't use your phone in the cockpit. It's forbidden.", why: '<b>don\'t have to</b> = no hace falta (pero puedes). Si está prohibido, necesitas <b>can\'t</b> o <b>must not</b>.' },
          { bad: 'I applied to a job at a tech company last month.', good: 'I applied for a job at a tech company last month.', why: 'La preposición fija es <b>apply for</b> a job. (<i>Apply to</i> se usa con instituciones: <i>apply to a university</i>.)' },
          { bad: 'I need study more English before the interview.', good: 'I need to study more English before the interview.', why: '<b>need</b> lleva <b>to</b> delante del verbo: <i>need to study</i>. El que no lo lleva es <i>must</i>.' },
          { bad: 'My working hours is 9:00 to 5:00 and the wages is low.', good: 'My working hours are 9:00 to 5:00 and the wages are low.', why: '<b>working hours</b> y <b>wages</b> son plurales → <b>are</b>.' },
          { bad: 'I have a contract full-time with a small company.', good: 'I have a full-time contract with a small company.', why: 'En inglés el adjetivo va <b>delante</b> del sustantivo: <i>a full-time contract</i>, <i>a part-time job</i>.' },
          { bad: 'The manager hired Jason because he was always late.', good: 'The manager fired Jason because he was always late.', why: '<b>hire</b> = contratar; <b>fire</b> = despedir. Suenan parecido, pero significan lo contrario.' },
        ] },
        { label: 'Pide permiso', type: 'soft', eyebrow: 'Asking for permission', title: 'Convierte la orden en una petición educada', explain: 'En el trabajo casi nunca se pide algo con un imperativo. Empieza con <b>Could I…?</b>, <b>May I…?</b> o <b>Can I…?</b> + la forma base del verbo, y añade <i>please</i>. Recuerda: para <b>dar</b> permiso usa <b>can</b> o <b>may</b>, nunca <i>could</i>.', missing: 'Falta empezar con <b>Could I</b> / <b>May I</b> / <b>Can I</b> + verbo en forma base', pattern: /\b(could|may|can)\s+i\b/i, items: [
          { h: '"Open the window."', a: 'Could I open the window, please?' },
          { h: '"I want to leave early today."', a: 'Could I leave a little early today, please?' },
          { h: '"Give me your email address."', a: 'May I have your email address, please?' },
          { h: '"I am taking a photo of the model."', a: 'May I take a photo of the model?' },
          { h: '"I need to use the meeting room at noon."', a: 'Can I use the meeting room at noon, please?' },
          { h: '"I am bringing a friend to the office party."', a: 'Could I bring a friend to the office party?' },
        ] },
        { label: 'Escribe tu résumé', type: 'comment', eyebrow: 'Writing task', title: 'Las secciones Work experience y Education de tu résumé', intro: 'Escribe 70-130 palabras. Usa <b>bullet points</b> y frases incompletas <b>sin sujeto</b> (<i>Served coffee and other hot drinks.</i>), presente para el trabajo actual y pasado para los anteriores, y pon lo más reciente primero. La checklist se marca sola al analizar tu texto.', placeholder: "WORK EXPERIENCE\n- Technical Lead Software Engineer, 2021-present\n- Manage a team of five developers.\n\nEDUCATION\n- Bachelor of Science in Computer Studies, 2016-2020.", min: 70, max: 130, need: 4, checks: [
          { label: 'Uso bullet points (guiones al principio de línea)', re: /(^|\n)\s*[-•*]/ },
          { label: 'Incluyo fechas (años) en mis trabajos o estudios', re: /\b(19|20)\d{2}\b/ },
          { label: 'Describo mi trabajo actual en presente (<i>manage, design, lead, teach…</i>)', re: /\b(manage|design|lead|develop|maintain|teach|build|write|support|review|work)\b/ },
          { label: 'Describo un trabajo anterior en pasado (<i>served, showed, worked…</i>)', re: /\b(served|showed|worked|managed|designed|led|built|wrote|taught|studied|completed|started|\w+ed)\b/ },
          { label: 'Menciono mi degree, certificado o universidad', re: /\b(degree|bachelor|master|certificate|diploma|university|college|campus)\b/ },
          { label: 'Añado skills o intereses (<i>skills, team player, fluent…</i>)', words: ['skill', 'skills', 'team player', 'fluent', 'beginner-level', 'excellent', 'interests', 'computer skills'] },
          { label: 'Uso vocabulario de la unidad (<i>full-time, part-time, internship, contract…</i>)', words: ['full-time', 'part-time', 'internship', 'contract', 'career', 'profession', 'manage', 'hired', 'applied', 'salary', 'working hours'] },
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language', title: 'Confianza y falta de confianza', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Expressing confidence</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I think I can handle that.</li><li>That doesn't bother me.</li><li>That won't be a problem.</li></ul></div>
          <div><h3>Expressing lack of confidence</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>I'm not sure I can handle that.</li><li>I don't think I'm strong enough.</li><li>That concerns me a little.</li></ul></div>
          <div><h3>Animar a alguien</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li>Of course you can!</li><li>You have all the right skills.</li><li>You'll be fine. I know it.</li></ul></div>
          <div class="hint small"><b>The thing is, …</b> sirve para introducir la razón real cuando dices que no o cuando algo te incomoda:<br><i>"No, I don't think so, sorry. <b>The thing is</b>, I'm a little bit scared of horses."</i><br><br><b>handle</b> = poder con algo, manejar una situación. <b>bother</b> = molestar. <b>concern</b> = preocupar (más suave que <i>worry</i>).</div></div>` },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ["A: You look worried! What's up?", "B: My boss wants me to lead a new team. I'm not sure I can handle that!", "A: Of course you can! It won't be a problem. You have all the right skills.", "B: But I'll have to manage ten people. That concerns me a little.", "A: You'll be fine. I know it."],
          ['Nadia: We need someone to lead the new project. Are you interested?', "Diego: I'm not sure I can handle that. I've only been here three months.", 'Nadia: You have all the right skills, and I can help you every week.', 'Diego: OK. I think I can handle that.', 'Nadia: Great. I knew you would say yes.'],
          ['A: Do you want to come horseback riding next weekend?', "B: No, I don't think so, sorry. The thing is, I'm a little bit scared of horses.", 'A: No problem. We could go to the movies instead.', "B: That sounds great. That doesn't bother me at all!", "A: Perfect. I'll buy the tickets tonight."],
        ] },
        { label: 'Respuesta rápida', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices en cada situación?', pool: 6, items: [
          { q: 'Tu jefe te pide dar una presentación ante 200 personas y te da bastante miedo.', opts: ["I'm not sure I can handle that.", "That won't be a problem.", 'I think I can handle that.'], a: "I'm not sure I can handle that.", why: 'Falta de confianza → <i>I\'m not sure I can handle that.</i>' },
          { q: 'Te ofrecen un proyecto difícil, pero te sientes preparado.', opts: ['I think I can handle that.', "I don't think I'm strong enough.", 'That concerns me a little.'], a: 'I think I can handle that.', why: 'Confianza → <i>I think I can handle that.</i>' },
          { q: 'Vas a decir que no a una invitación y quieres dar tu razón real.', opts: ['The thing is, I have to work that day.', "That won't be a problem.", 'Of course you can!'], a: 'The thing is, I have to work that day.', why: '<b>The thing is, …</b> introduce la razón de fondo de un "no".' },
          { q: 'Un compañero teme no poder gestionar a diez personas. Anímalo.', opts: ["Of course you can! It won't be a problem.", 'That concerns me a little.', "I'm not sure I can handle that."], a: "Of course you can! It won't be a problem.", why: 'Para animar: <i>Of course you can! You have all the right skills.</i>' },
          { q: 'Te piden trabajar un sábado al mes y sinceramente te da igual.', opts: ["That doesn't bother me.", 'That concerns me a little.', "I don't think I'm strong enough."], a: "That doesn't bother me.", why: '<i>That doesn\'t bother me</i> = no me molesta, no es problema.' },
          { q: 'El trabajo incluye levantar cajas muy pesadas y no te ves capaz físicamente.', opts: ["I don't think I'm strong enough.", "That won't be a problem.", 'I think I can handle that.'], a: "I don't think I'm strong enough.", why: '<i>Strong enough</i> = lo bastante fuerte. Expresa falta de confianza concreta.' },
          { q: 'El nuevo horario te preocupa un poco, pero no lo rechazas del todo.', opts: ['That concerns me a little.', "That doesn't bother me.", 'You have all the right skills.'], a: 'That concerns me a little.', why: '<i>Concern</i> es más suave que <i>worry</i>: preocupación moderada.' },
          { q: 'Tu jefa te pregunta si puedes aprender una tecnología nueva en un mes. Te ves capaz.', opts: ["That won't be a problem.", "I'm not sure I can handle that.", 'The thing is, I am scared.'], a: "That won't be a problem.", why: '<i>That won\'t be a problem</i> = confianza tranquila, sin presumir.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'Tu jefa te ofrece liderar un equipo', intro: 'Patricia, tu jefa en el banco, te propone liderar el equipo de la migración. Expresa confianza y dudas con las frases de la unidad, pregunta por las normas con <i>have to</i> y <i>can\'t</i>, y pide permiso con <i>Could I…?</i>. Si suenas seco o confundes "no hace falta" con "está prohibido", la escena se tuerce.', scenes: [
          { t: 'La propuesta de tu jefa', you: 'Aldo, desarrollador senior del banco', partner: 'Patricia', role: 'tu jefa; te ofrece liderar un equipo nuevo de doce personas', goal: 'Acepta el reto mostrando confianza, pregunta por las obligaciones con Do I have to…?, pide permiso para teletrabajar y da tu razón real con The thing is, …', start: 'a', nodes: {
            a: { say: "Aldo, do you have a minute? We're starting the core banking migration next month, and I'd like you to lead the new team. Twelve people.", opts: [
              { t: "Twelve people… I think I can handle that. But could I ask a few questions first?", ok: 2, why: "Confianza con la frase de la unidad, <b>I think I can handle that</b>, y pides permiso para preguntar con <b>Could I…?</b>. Seguro sin presumir.", next: 'b' },
              { t: "Wow, thank you. That won't be a problem, but I have some questions.", ok: 1, why: "Correcta: <b>That won't be a problem</b> expresa confianza tranquila. Pedir permiso para preguntar (<i>Could I ask…?</i>) suena algo más natural con una jefa.", next: 'b' },
              { t: "Twelve people? I don't think I'm strong enough.", ok: 0, why: "<b>I don't think I'm strong enough</b> habla de fuerza (física o emocional), no de capacidad para liderar; aquí desconcierta. Para dudas de capacidad: <b>I'm not sure I can handle that</b>.", next: 'a2' },
            ] },
            a2: { say: "Strong enough? It's a software team, Aldo, not a gym. Are you saying no?", opts: [
              { t: "No, sorry, that came out wrong. I'm not sure I can handle twelve people yet, but I'd like to try.", ok: 2, why: "Reparas el malentendido y usas la frase correcta para la duda: <b>I'm not sure I can handle that</b>, seguida de disposición.", next: 'b' },
              { t: "Sorry, I mean the size of the team concerns me a little.", ok: 1, why: "Correcta: <b>That concerns me a little</b> es la preocupación moderada de la unidad. Añadir que quieres intentarlo cerraría mejor.", next: 'b' },
              { t: "No, I say I am not sure if I can to handle it.", ok: 0, why: "<b>can</b> nunca lleva <i>to</i> (<i>I can handle it</i>), y para aclarar lo que acabas de decir se usa <b>I mean…</b> o <b>I meant…</b>, no <i>I say</i>.", next: 'b' },
            ] },
            b: { say: "Of course. Ask me anything.", opts: [
              { t: "Do I have to be in the office every day? The thing is, I'm finishing my thesis this semester.", ok: 2, why: "Pregunta de obligación con <b>Do I have to…?</b> y la razón real introducida con <b>The thing is, …</b>, tal como lo enseña la unidad.", next: 'c' },
              { t: "What are the working hours for the team? Do we need to be here at nine?", ok: 1, why: "Correcta: <b>Do we need to…?</b> y el vocabulario <b>working hours</b>. Solo falta contarle tu situación para que pueda ayudarte.", next: 'c' },
              { t: "I must to be in the office every day?", ok: 0, why: "Dos fallos: <b>must</b> nunca lleva <i>to</i>, y una pregunta de obligación se hace con <b>Do I have to…?</b> (con <i>must</i> casi no se pregunta).", next: 'b2' },
            ] },
            b2: { say: "Sorry, I didn't catch that. What do you want to know exactly?", opts: [
              { t: "Sorry. Do I have to be in the office every day?", ok: 2, why: "Reformulas con la estructura correcta: <b>Do I have to</b> + forma base.", next: 'c' },
              { t: "Does the team have to work from the office?", ok: 1, why: "Correcta: <b>Does … have to</b> + forma base. Preguntar por ti mismo iría más al grano.", next: 'c' },
              { t: "Does the team has to work in the office?", ok: 0, why: "Después de <b>does</b> el verbo vuelve a la forma base: <i>Does the team <b>have</b> to…?</i>", next: 'c' },
            ] },
            c: { say: "Not every day, no. But the team must be here on Mondays and Thursdays. And everybody has to wear the ID badge, even on the migration floor.", opts: [
              { t: "That doesn't bother me. Mondays and Thursdays are fine. Could I work from home on Fridays, then?", ok: 2, why: "<b>That doesn't bother me</b> acepta la norma sin drama, y pides permiso con <b>Could I…?</b>, la fórmula de la unidad.", next: 'd' },
              { t: "OK, that's fine. May I work from home on Fridays?", ok: 1, why: "Correcta: <b>May I…?</b> es la forma más formal de pedir permiso; con tu jefa funciona, aunque <i>Could I…?</i> suena más natural en una charla así.", next: 'd' },
              { t: "OK. On Fridays I work from home.", ok: 0, why: "No pides permiso, lo anuncias. Con tu jefa se pide: <b>Could I work from home on Fridays?</b>", next: 'c2' },
            ] },
            c2: { say: "Excuse me? Is that a question or a decision?", opts: [
              { t: "Sorry, it's a question. Could I work from home on Fridays, please?", ok: 2, why: "Rectificas y pides permiso con <b>Could I…?</b> + <i>please</i>. Tono recuperado.", next: 'd' },
              { t: "A question, sorry. Can I work from home on Fridays?", ok: 1, why: "Correcta: <b>Can I…?</b> es la forma más informal de pedir permiso; vale, pero <i>Could I…?</i> queda mejor con una jefa.", next: 'd' },
              { t: "A decision. I need it for my thesis.", ok: 0, why: "Imponer una condición a quien te está ofreciendo un puesto rompe la conversación. Primero se pide (<b>Could I…?</b>) y luego se explica con <b>The thing is, …</b>", next: 'fail' },
            ] },
            d: { say: "Yes, you can, as long as you're online for the stand-up. But remember: you can't share client data outside the bank's network. Not even from home.", opts: [
              { t: "Understood. That won't be a problem. I never take client data out of the network anyway.", ok: 2, why: "Fíjate en que Patricia da permiso con <b>you can</b> (nunca <i>you could</i>). Tú respondes a la prohibición con <b>That won't be a problem</b>: confianza y respeto por la norma.", next: 'e' },
              { t: "Of course. I know that's not allowed.", ok: 1, why: "Correcta y clara: <i>not allowed</i> = prohibido. Una frase de confianza de la unidad la haría más tranquilizadora.", next: 'e' },
              { t: "Don't worry, I don't have to share it.", ok: 0, why: "La trampa número dos de la unidad: <b>don't have to</b> = no hace falta (pero podrías). Aquí está <b>prohibido</b>: <b>can't</b> o <b>must not</b>.", next: 'd2' },
            ] },
            d2: { say: "It's not that you don't have to. You must not. There's a difference, and Compliance will ask you about it.", opts: [
              { t: "You're right, sorry. We must not share client data, and I'll make sure the team knows.", ok: 2, why: "Corriges con el modal de prohibición, <b>must not</b>, y lo extiendes al equipo. Justo lo que una jefa quiere oír.", next: 'e' },
              { t: "Right. It's forbidden, I understand.", ok: 1, why: "Correcta: <i>forbidden</i> = prohibido. Repetir la norma con <b>must not</b> dejaría claro que la has entendido.", next: 'e' },
              { t: "Yes, yes. It's the same thing.", ok: 0, why: "No es lo mismo, y decirlo así suena a que no escuchas. <b>Don't have to</b> (opcional) y <b>must not</b> (prohibido) son contrarios en una norma de datos.", next: 'meh' },
            ] },
            e: { say: "Good. One more thing: there's a two-day leadership course next month. It's on a Saturday and Sunday. Is that OK for you?", opts: [
              { t: "A weekend… that concerns me a little. The thing is, my wife and I run a small food business on Saturdays. Could I take the course on weekdays instead?", ok: 2, why: "Las tres piezas de la unidad en orden: preocupación moderada (<b>That concerns me a little</b>), razón real (<b>The thing is, …</b>) y petición con <b>Could I…?</b> más una alternativa.", next: 'win' },
              { t: "I'm not sure I can handle a weekend course. We have our food business on Saturdays. Is there another date?", ok: 1, why: "Correcta: <b>I'm not sure I can handle that</b> y una alternativa. Para un tema de agenda, <i>That concerns me a little</i> suena más ajustado que una duda de capacidad.", next: 'win' },
              { t: "No. The weekend is not possible for me.", ok: 0, why: "Demasiado seco con tu jefa: ni razón ni alternativa. Suaviza con <b>The thing is, …</b> y pide otra opción con <b>Could I…?</b>", next: 'meh' },
            ] },
            win: { say: "Of course you can. I'll move you to the weekday session. Welcome aboard, team lead.", end: true, outcome: 'win', note: 'Mostraste confianza (<b>I think I can handle that</b>, <b>That won\'t be a problem</b>), preguntaste por las obligaciones con <b>Do I have to…?</b>, pediste permiso con <b>Could I…?</b> y diste tu razón real con <b>The thing is, …</b>. Fíjate en cómo Patricia da permiso: <b>you can</b>, nunca <i>you could</i>.' },
            meh: { say: "Hmm. OK. Let's talk about the details again on Monday.", end: true, outcome: 'meh', note: 'Tienes el puesto, pero el cierre fue flojo: o confundiste <b>don\'t have to</b> (opcional) con <b>must not</b> (prohibido), o dijiste que no sin razón ni alternativa. Con tu jefa: <b>That concerns me a little. The thing is, …</b> + <b>Could I…?</b>' },
            fail: { say: "A decision? Aldo, I'm offering you a team, not a schedule. Let's talk another day.", end: true, outcome: 'fail', note: 'Imponer condiciones a quien te ofrece un puesto cierra la puerta. El orden que enseña la unidad: pide permiso (<b>Could I work from home on Fridays?</b>), explica con <b>The thing is, …</b> y acepta la respuesta (<i>Yes, you can</i> / <i>No, you can\'t</i>).' },
          } },
        ] },
      ] },
    ],
  };
})();
