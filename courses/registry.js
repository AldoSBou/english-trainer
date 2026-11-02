/* ===========================================================
   registry.js — ciclos (niveles) y sus unidades.
   available:true  → tiene datos cargados (courses/<curso>/<unidad>.js)
   available:false → se muestra como "Próximamente".

   Para activar una unidad:
     1) crea courses/<cursoId>/<unidadId>.js
     2) pon available:true aquí (en el curso y en la unidad)
     3) añade el <script> en index.html
   =========================================================== */
window.UNIT_DATA = window.UNIT_DATA || {};   // clave: "cursoId/unidadId"

window.COURSES = [
  { id: 'ingles0', number: 0, title: 'Inglés 0', subtitle: 'Starter', available: false, units: [] },
  { id: 'ingles1', number: 1, title: 'Inglés 1', subtitle: 'Elemental', available: false, units: [] },
  { id: 'ingles2', number: 2, title: 'Inglés 2', subtitle: 'Pre-intermedio', available: false, units: [] },
  {
    id: 'ingles3', number: 3, title: 'Inglés 3', subtitle: 'Pre-intermedio alto · WeTalk Level 3', available: true,
    units: [
      { id: 'unit1', number: 1, title: 'Getting to know people', subtitle: 'Preguntas de información e indirectas', available: true, xpGoal: 600 },
      { id: 'unit2', number: 2, title: 'So much stuff', subtitle: 'Present perfect: ever, never, for, since, already, yet', available: true, xpGoal: 600 },
      { id: 'unit3', number: 3, title: 'Getting around', subtitle: 'Artículos y modales de consejo', available: true, xpGoal: 600 },
      { id: 'unit4', number: 4, title: 'How surprising!', subtitle: 'Reacciones -ed/-ing y futuros', available: true, xpGoal: 600 },
      { id: 'unit5', number: 5, title: 'And then…', subtitle: 'Past simple y past continuous', available: true, xpGoal: 600 },
      { id: 'unit6', number: 6, title: 'Impact', subtitle: 'Cuantificadores y condicionales reales', available: true, xpGoal: 600 },
      { id: 'unit7', number: 7, title: 'Entertain us', subtitle: 'used to y comparaciones (not) as… as', available: true, xpGoal: 600 },
      { id: 'unit8', number: 8, title: 'Getting there', subtitle: 'Present perfect continuous', available: true, xpGoal: 600 },
      { id: 'unit9', number: 9, title: 'Study and work', subtitle: 'Modales de necesidad, permiso y prohibición', available: true, xpGoal: 600 },
      { id: 'unit10', number: 10, title: 'Materials & production', subtitle: 'Pasiva de presente y de pasado', available: true, xpGoal: 600 },
    ],
  },
  {
    id: 'ingles4', number: 4, title: 'Inglés 4', subtitle: 'Intermedio · Evolve', available: true, current: true,
    units: [
      { id: 'unit1', number: 1, title: 'Accomplishments & qualities', subtitle: 'Simple vs continuous · introductions', available: true, xpGoal: 600 },
      { id: 'unit2', number: 2, title: 'Trends & food', subtitle: 'Condicionales reales y time clauses', available: true, xpGoal: 600 },
      { id: 'unit3', number: 3, title: "What's it worth?", subtitle: 'too / enough y comparaciones modificadas', available: true, xpGoal: 600 },
      { id: 'unit4', number: 4, title: 'Famous faces', subtitle: 'Especulación (must/might/can\'t) y relative clauses', available: true, xpGoal: 600 },
      { id: 'unit5', number: 5, title: 'Stories & broken plans', subtitle: 'Past perfect · was going to / supposed to', available: true, xpGoal: 600 },
      { id: 'unit6', number: 6, title: 'Good works', subtitle: 'Pasiva con modales · ofrecer y aceptar ayuda', available: true, xpGoal: 600 },
      { id: 'unit7', number: 7, title: 'Spread the word', subtitle: 'Reported speech · comunicación y redes', available: true, xpGoal: 600 },
      { id: 'unit8', number: 8, title: 'Work & wishes', subtitle: 'Condicionales irreales · I wish · trabajo', available: true, xpGoal: 600 },
      { id: 'unit9', number: 9, title: 'Rules & places', subtitle: 'Permiso, prohibición y obligación · generalizar', available: true, xpGoal: 600 },
      { id: 'unit10', number: 10, title: 'Discoveries & mistakes', subtitle: 'Tercer condicional · modales de pasado · contar historias', available: true, xpGoal: 600 },
      { id: 'unit11', number: 11, title: 'College & science', subtitle: 'forget / remember / stop · help / let / make · alternativas', available: true, xpGoal: 600 },
      { id: 'unit12', number: 12, title: 'Senses & memories', subtitle: 'Énfasis con What I… · one / so · recordar experiencias', available: true, xpGoal: 600 },
    ],
  },
  { id: 'ingles5', number: 5, title: 'Inglés 5', subtitle: 'Intermedio alto', available: false, units: [] },
  {
    id: 'practico', number: 'P', title: 'Inglés práctico', subtitle: 'Viajes, restaurante, trabajo, salud, teléfono y trámites', available: true, practical: true,
    units: [
      { id: 'aeropuerto', number: 1, title: 'Aeropuerto y vuelo', subtitle: 'Check-in, seguridad, migración, conexiones y equipaje', available: true, xpGoal: 500 },
      { id: 'hotel', number: 2, title: 'Hotel y transporte', subtitle: 'Reserva, problemas en la habitación, taxi y direcciones', available: true, xpGoal: 500 },
      { id: 'restaurante', number: 3, title: 'Restaurante y comida', subtitle: 'Pedir, alergias, la cuenta; y atender a un cliente extranjero', available: true, xpGoal: 500 },
      { id: 'reuniones', number: 4, title: 'Reuniones y stand-ups', subtitle: 'Reportar, pedir aclaraciones, discrepar y cerrar acuerdos', available: true, xpGoal: 500 },
      { id: 'entrevistas', number: 5, title: 'Entrevistas y networking', subtitle: 'Tell me about yourself, STAR, salario y contactos', available: true, xpGoal: 500 },
      { id: 'escrito', number: 6, title: 'Inglés escrito de trabajo', subtitle: 'Correos, Slack, revisiones de PR e incidentes', available: true, xpGoal: 500 },
      { id: 'salud', number: 7, title: 'Compras, farmacia y salud', subtitle: 'Devoluciones, síntomas, dosis y urgencias', available: true, xpGoal: 500 },
      { id: 'telefono', number: 8, title: 'Teléfono y videollamadas', subtitle: 'Llamar, deletrear, dejar mensajes y salvar una videollamada', available: true, xpGoal: 500 },
      { id: 'smalltalk', number: 9, title: 'Small talk y socializar', subtitle: 'Romper el hielo, reaccionar, cambiar de tema y despedirse', available: true, xpGoal: 500 },
      { id: 'tramites', number: 10, title: 'Banco y trámites', subtitle: 'Cuentas, cargos, transferencias, consulado y formularios', available: true, xpGoal: 500 },
    ],
  },
  // Mis temas: unidades generadas con IA desde la propia app (js/topics.js rellena `units` al arrancar con lo guardado en et-topics)
  { id: 'mistemas', number: 'M', title: 'Mis temas', subtitle: 'Unidades generadas con IA sobre lo que tú elijas', available: true, custom: true, units: [] },
];
