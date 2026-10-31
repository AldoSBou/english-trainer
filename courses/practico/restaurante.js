/* ===========================================================
   practico/restaurante.js — Inglés práctico · Restaurante y comida
   Situación real, desde los dos lados: como cliente (reservar, pedir,
   alergias, quejas, la cuenta, para llevar) y como anfitrión que recibe
   clientes extranjeros en un negocio de comida peruana.
   Estructura: sections[] → activities[] → { type, ...datos }
   =========================================================== */
(() => {
  /* ---------- Vocabulario por momento: [cat, w, def ES, ejemplo, pregunta, say?] ---------- */
  const V = [
    /* Reservar y llegar */
    ['Reservar y llegar', 'book a table / make a reservation', 'reservar mesa (book es más británico; make a reservation, más americano)', "I'd like to book a table for two for Saturday at eight.", '¿Sueles reservar o llegas sin avisar?', 'book a table, make a reservation'],
    ['Reservar y llegar', 'party of four', 'grupo de cuatro: así cuentan a los comensales en EE. UU. (How many in your party?)', 'Hi, party of four, under the name Suárez.', '¿Cuántos son normalmente cuando salen a comer?'],
    ['Reservar y llegar', 'walk-in', 'cliente que llega sin reserva', "Sorry, we don't take walk-ins on Friday nights.", '¿Tu negocio acepta walk-ins o solo pedidos?'],
    ['Reservar y llegar', 'waiting list / wait time', 'lista de espera / tiempo de espera', "There's a twenty-minute wait. Can I put you on the waiting list?", '¿Cuánto esperarías por una mesa antes de irte?', 'waiting list, wait time'],
    ['Reservar y llegar', 'inside or outside / on the patio', 'dentro o fuera / en la terraza', 'Would you like to sit inside or out on the patio?', '¿Prefieres mesa dentro o fuera?', 'inside or outside, on the patio'],
    /* El menú */
    ['El menú', 'starter / appetizer', 'entrada (starter en el Reino Unido, appetizer en EE. UU.)', "For a starter, I'll have the causa.", '¿Cuál es la entrada estrella de tu carta?', 'starter, appetizer'],
    ['El menú', 'main course / entrée', 'plato principal. Ojo: en EE. UU. entrée es el principal, no la entrada', 'The entrées come with rice and salad.', '¿Qué pides de plato principal cuando no conoces el sitio?', 'main course, entrée'],
    ['El menú', 'side (dish)', 'guarnición, acompañamiento', 'Can I get fries as a side instead of rice?', '¿Qué guarnición va con el lomo saltado?', 'side dish'],
    ['El menú', "today's special", 'plato del día, especial de hoy', "Today's special is grilled fish with quinoa.", '¿Tienes plato del día en tu negocio?'],
    ['El menú', 'dessert', 'postre. Se pronuncia di-ZERT, con fuerza en la segunda sílaba; DE-sert es desierto', 'Would you like to see the dessert menu?', '¿Cuál es tu postre peruano favorito?'],
    ['El menú', 'rare / medium rare / medium / well done', 'puntos de la carne: casi cruda / jugosa / a punto / bien cocida', 'How would you like your steak? Medium rare, please.', '¿Cómo pides la carne?', 'rare, medium rare, medium, well done'],
    ['El menú', 'grilled / fried / steamed / baked', 'a la parrilla / frito / al vapor / al horno', 'Is the fish grilled or fried?', '¿Cómo preparan el pescado en tu casa?', 'grilled, fried, steamed, baked'],
    ['El menú', 'spicy / mild / hot', 'picante / suave / muy picante', "Is the ají de gallina very spicy? No, it's mild, with a little kick.", '¿Qué plato peruano le darías a alguien que no soporta el picante?', 'spicy, mild, hot'],
    /* Pedir y modificar */
    ['Pedir y modificar', "I'll have… / Could I get…", 'las dos formas más naturales de pedir un plato', "I'll have the lomo saltado, and could I get the sauce on the side?", '¿Cómo pides tú normalmente: "quiero" o "me das"?', "I'll have, could I get"],
    ['Pedir y modificar', 'on the side', 'aparte (la salsa, el aliño)', 'Dressing on the side, please.', '¿Qué pides siempre aparte?'],
    ['Pedir y modificar', 'without / hold the…', 'sin… (hold the onions es informal y muy americano)', 'A burger without onions, please. / A burger, hold the onions.', '¿Qué ingrediente quitas siempre?', 'without, hold the'],
    ['Pedir y modificar', 'instead of', 'en lugar de', 'Could I have salad instead of fries?', '¿Qué cambiarías en un plato típico?'],
    ['Pedir y modificar', 'tap water', 'agua del grifo (gratis en muchos países)', 'Could we have a jug of tap water for the table?', '¿Pedirías agua del grifo en Lima?'],
    /* Alergias e intolerancias */
    ['Alergias', 'allergic to', 'alérgico a (nunca "allergic of")', "I'm allergic to peanuts. Does this dish contain any nuts?", '¿Alguien de tu familia es alérgico a algo?'],
    ['Alergias', 'contain', 'contener, llevar', 'The sauce contains dairy and gluten.', '¿Qué contiene el ají de gallina que pueda ser problema?'],
    ['Alergias', 'gluten-free / dairy-free / nut-free', 'sin gluten / sin lácteos / sin frutos secos', 'Do you have any gluten-free options?', '¿Qué platos de tu carta son gluten-free?', 'gluten-free, dairy-free, nut-free'],
    ['Alergias', 'vegetarian / vegan', 'vegetariano / vegano (sin ningún producto animal)', "I'm vegan, so no eggs, cheese or fish, please.", '¿Qué le ofrecerías a un cliente vegano?', 'vegetarian, vegan'],
    ['Alergias', 'lactose intolerant', 'intolerante a la lactosa', 'My wife is lactose intolerant. Is there milk in the sauce?', '¿Conoces a alguien intolerante a la lactosa?'],
    ['Alergias', 'cross-contamination', 'contaminación cruzada (mismo aceite, misma tabla)', "We fry everything in the same oil, so there's a risk of cross-contamination.", '¿Cómo evitas la contaminación cruzada en tu cocina?'],
    /* Durante la comida */
    ['Durante la comida', 'How is everything?', '¿Todo bien? (el camarero, a mitad de la comida)', 'How is everything so far? Can I get you anything else?', '¿Pasas por las mesas a preguntar?'],
    ['Durante la comida', 'overcooked / undercooked', 'demasiado hecho / poco hecho', 'Sorry, this steak is overcooked. I asked for medium rare.', '¿Alguna vez devolviste un plato?', 'overcooked, undercooked'],
    ['Durante la comida', "This isn't what I ordered.", 'esto no es lo que pedí', "Excuse me, this isn't what I ordered. I asked for the fish.", '¿Cómo reaccionas si te traen otro plato?'],
    ['Durante la comida', 'lukewarm', 'tibio (ni frío ni caliente)', 'The soup is lukewarm. Could you heat it up, please?', '¿Qué plato no soportas tibio?'],
    ['Durante la comida', 'refill', 'relleno de la bebida (en EE. UU. las gaseosas suelen ser free refills)', 'Could I get a refill on my coffee?', '¿Ofreces refill de chicha morada?'],
    /* La cuenta */
    ['La cuenta', 'check / bill', 'la cuenta (check en EE. UU., bill en el Reino Unido). Nunca "account", que es cuenta bancaria', 'Could we have the check, please?', '¿Cómo pides la cuenta en español sin palabras?', 'check, bill'],
    ['La cuenta', 'split the bill / separate checks', 'dividir la cuenta / cuentas separadas', 'Can we split the bill? Separate checks, please.', '¿Dividen la cuenta por igual o cada uno lo suyo?', 'split the bill, separate checks'],
    ['La cuenta', 'tip / gratuity', 'propina (gratuity es la palabra formal del recibo)', 'In the US, a tip of eighteen to twenty percent is expected.', '¿Cuánto dejas de propina en Lima?', 'tip, gratuity'],
    ['La cuenta', 'service charge / service included', 'cargo por servicio / servicio incluido', 'Is service included, or should we leave a tip?', '¿Tu negocio cobra servicio?', 'service charge, service included'],
    ['La cuenta', 'receipt', 'recibo, comprobante. La p es muda: ri-SIIT', "Could I have a receipt, please? It's for work.", '¿Pides recibo siempre?'],
    ['La cuenta', 'overcharged / charged twice', 'cobrado de más / cobrado dos veces', "I think we've been overcharged; we only had two drinks.", '¿Revisas la cuenta antes de pagar?', 'overcharged, charged twice'],
    ['La cuenta', 'pay by card / contactless', 'pagar con tarjeta / sin contacto', 'Do you take cards? Can I pay contactless?', '¿Qué medios de pago aceptas?', 'pay by card, contactless'],
    /* Para llevar */
    ['Para llevar', 'to go / takeaway', 'para llevar (to go en EE. UU., takeaway en el Reino Unido)', 'Two ceviches to go, please.', '¿Qué plato tuyo viaja bien para llevar?', 'to go, takeaway'],
    ['Para llevar', 'box this up / a box for the leftovers', 'empacar lo que sobró / una caja para las sobras', "Could you box this up for me? I can't finish it.", '¿Te da vergüenza pedir que te empaquen lo que sobró?', 'box this up, a box for the leftovers'],
    ['Para llevar', 'delivery or pick-up', 'a domicilio o para recoger', 'Is this order for delivery or pick-up?', '¿Haces delivery?'],
    /* Como anfitrión */
    ['Como anfitrión', 'Right this way.', 'por aquí, síganme (al llevar a la mesa)', 'Table for two? Right this way.', '¿Qué dices al llevar a un cliente a la mesa?'],
    ['Como anfitrión', "It's served with… / It comes with…", 'se sirve con… / viene con… (para describir un plato)', 'Lomo saltado comes with rice and fries.', '¿Con qué se sirve la causa?', "it's served with, it comes with"],
    ['Como anfitrión', "It's made with… / made from…", 'está hecho con… (ingredientes) / hecho de… (materia que se transforma)', 'Chicha morada is made from purple corn. Causa is made with mashed potato and lime.', '¿De qué está hecho el pisco?', "it's made with, made from"],
    ['Como anfitrión', 'Just a heads-up: …', 'un aviso: … (para advertir del picante, de la espera)', 'Just a heads-up: the rocoto sauce is really hot.', '¿De qué avisas a un cliente extranjero?', 'just a heads-up'],
    ['Como anfitrión', 'on the house', 'invita la casa', 'Sorry about the wait. The desserts are on the house.', '¿Cuándo invitarías algo?'],
    ['Como anfitrión', 'ring (you) up', 'cobrar en caja', "I'll ring you up at the counter whenever you're ready.", '¿Cobras en mesa o en caja?', 'ring you up'],
  ];
  const card = t => ({ cat: t[0], w: t[1], def: t[2], ex: t[3], ask: t[4], ...(t[5] ? { say: t[5] } : {}) });

  window.UNIT_DATA['practico/restaurante'] = {
    source: 'Inglés práctico · Restaurante y comida',
    description: 'Reservar, entender el menú, pedir a tu gusto, avisar de una alergia, quejarte con educación, pagar y dividir la cuenta; y del otro lado del mostrador: recibir a un cliente extranjero, explicarle un <i>lomo saltado</i> o un <i>ceviche</i>, avisar del picante y recomendar.',
    cando: [
      'Reservar, llegar y pedir mesa (<i>a table for two, party of four, inside or outside</i>)',
      "Entender un menú y pedir un plato a mi gusto con <i>I'll have… / Could I get… on the side / instead of</i>",
      "Avisar de una alergia o intolerancia y preguntar qué contiene un plato (<i>I'm allergic to… / Does it contain…?</i>)",
      "Quejarme con educación de algo que llegó mal (<i>I'm sorry, but this isn't what I ordered</i>)",
      'Pedir la cuenta, dividirla, entender la propina y pedir un recibo o la comida para llevar',
      "Recibir a un cliente extranjero, explicarle un plato peruano (<i>it's made with… / it's served with…</i>), avisar del picante y recomendar con comparativos",
    ],
    map: [
      ['Reservar y llegar', '<i>a table for two · party of four · walk-in · waiting list · inside or on the patio · Right this way</i>', 'Flashcards, colocaciones y la escena 1 del role-play'],
      ['Entender el menú', '<i>starters, mains, sides, today\'s special · rare / medium rare / well done · grilled, fried, steamed · spicy, mild</i>', 'Flashcards, emparejar, dictado y lectura'],
      ['Pedir, modificar y avisar de una alergia', '<i>I\'ll have… · Could I get… · on the side · without · instead of · allergic to · contains · gluten-free</i>', 'Gramática (pedir, <i>some / any</i>, <i>would like</i>), corrige errores, pide con educación, escena 1'],
      ['Durante la comida y la cuenta', '<i>How is everything? · overcooked · not what I ordered · check, please · split the bill · tip · service included · receipt · to go</i>', 'Diálogo con preguntas, ordena el diálogo, ¿qué dices?, escena 2'],
      ['Como anfitrión', '<i>It\'s served with… · it\'s made from… · Just a heads-up: it\'s hot · I\'d recommend… · milder than · on the house · ring you up</i>', 'Pasiva corta y comparativos para recomendar, reto "lomo saltado", respuesta a una reseña, escena 3'],
    ],

    sections: [
      { id: 'home', label: 'Inicio', render: 'overview', activities: [] },

      /* ================= VOCABULARY ================= */
      { id: 'vocab', label: 'Vocabulary', activities: [
        { label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: 'Agrupadas por momento: reservar, el menú, pedir, alergias, durante la comida, la cuenta, para llevar y tu lado como anfitrión. Reverso: significado, una frase real y una pregunta para ti. Pulsa 🔊 para oírla.',
          cards: V.map(card) },
        { label: 'Palabra ↔ Definición', type: 'match', eyebrow: 'Del menú a la cuenta', title: 'Empareja la expresión con su definición', intro: 'Toca una expresión y luego su definición en inglés. Son las palabras que más confunden a un hispanohablante en un restaurante.',
          pairs: [
            ['party of four', 'a group of four people eating together'],
            ['walk-in', 'a customer who arrives without a reservation'],
            ['appetizer', 'a small dish you eat before the main course'],
            ['entrée (US)', 'the main course, not the starter'],
            ['side', 'something small served with the main dish, like fries or salad'],
            ['medium rare', 'cooked a little, still pink and juicy inside'],
            ['mild', 'not spicy'],
            ['on the side', 'served separately, not on the food'],
            ['lukewarm', 'only slightly warm, not hot enough'],
            ['check (US)', 'the piece of paper that says how much you have to pay'],
            ['gratuity', 'the formal word for a tip'],
            ['receipt', 'the paper that proves you have paid'],
            ['to go', 'to take away and eat somewhere else'],
            ['on the house', 'free, paid for by the restaurant'],
          ], round: 7 },
        { label: 'Colocaciones', type: 'mcq', eyebrow: 'Collocations', title: 'Completa con la palabra que va', intro: 'Las palabras van en parejas fijas: <i>medium rare, on the side, split the bill, to go…</i>. Si dudas, di la frase en voz alta: la que suena a restaurante suele ser la buena.', pool: 10, items: [
          { blank: 1, q: '"How would you like your steak?" "___, please."', opts: ['Medium rare', 'Middle rare', 'Half done', 'Medium cooked'], a: 'Medium rare', why: 'Los puntos son <b>rare / medium rare / medium / well done</b>. Nada de <i>middle</i> ni <i>half</i>.' },
          { blank: 1, q: 'Could I get the dressing ___?', opts: ['on the side', 'at the side', 'by side', 'apart'], a: 'on the side', why: '<b>On the side</b> = aparte. <i>Apart</i> es un calco de "aparte" que no se usa así.' },
          { blank: 1, q: 'Can we ___ the bill? There are three of us.', opts: ['split', 'divide', 'cut', 'break'], a: 'split', why: '<b>Split the bill</b> (o <i>separate checks</i> en EE. UU.). <i>Divide</i> se entiende, pero no es la colocación.' },
          { blank: 1, q: 'Two lomo saltados ___, please.', opts: ['to go', 'for go', 'to take', 'for carrying'], a: 'to go', why: '<b>To go</b> (EE. UU.) / <b>takeaway</b> (Reino Unido) = para llevar.' },
          { blank: 1, q: 'Hi, ___ of three, under Suárez.', opts: ['party', 'group', 'team', 'crowd'], a: 'party', why: 'En EE. UU. el grupo de comensales es la <b>party</b>: <i>How many in your party?</i>' },
          { blank: 1, q: 'Is ___ included, or should we leave a tip?', opts: ['service', 'the waiter', 'attention', 'propina'], a: 'service', why: '<b>Service included</b> / <b>service charge</b>. Si no está incluido, la propina va aparte.' },
          { blank: 1, q: "Could you ___ this up for me? I can't finish it.", opts: ['box', 'bag', 'close', 'save'], a: 'box', why: '<b>Box it up</b> = ponerlo en una caja para llevar. También <i>Can I get a box for this?</i>' },
          { blank: 1, q: "I'm ___ to shellfish, so no shrimp, please.", opts: ['allergic', 'allergy', 'alergic', 'intolerant'], a: 'allergic', why: '<b>allergic to</b> (adjetivo). <i>Allergy</i> es el sustantivo (<i>I have a shellfish allergy</i>). <i>Intolerant</i> es otra cosa: no te sienta bien, pero no es una reacción alérgica.' },
          { blank: 1, q: 'Could I have salad ___ fries?', opts: ['instead of', 'in place', 'rather', 'in change of'], a: 'instead of', why: '<b>instead of</b> + sustantivo = en lugar de. <i>In change of</i> es un calco.' },
          { blank: 1, q: 'Sorry about the wait. The drinks are ___ the house.', opts: ['on', 'by', 'from', 'of'], a: 'on', why: '<b>On the house</b> = invita la casa.' },
          { blank: 1, q: 'Could we have the ___, please? (en Nueva York)', opts: ['check', 'account', 'count', 'ticket'], a: 'check', why: 'En EE. UU., <b>check</b>; en el Reino Unido, <b>bill</b>. <i>Account</i> es la cuenta del banco.' },
          { blank: 1, q: 'Can I get a ___ on my coffee?', opts: ['refill', 'recharge', 'repeat', 'reload'], a: 'refill', why: '<b>Refill</b> = volver a llenar la bebida. <i>Recharge</i> es para el celular.' },
        ] },
      ] },

      /* ================= GRAMMAR ================= */
      { id: 'grammar', label: 'Grammar', activities: [
        { label: 'Notas', type: 'notes', eyebrow: 'La gramática que la mesa te pide', title: 'Pedir, cantidades, would like y describir un plato', html: `
          <h3>1 · Pedir sin sonar brusco</h3>
          <p style="margin:8px 0 14px"><i>I want</i> es gramaticalmente correcto, pero en un restaurante suena a orden. Las fórmulas naturales son estas, de más informal a más formal:</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Fórmula</th><th>Ejemplo</th><th>Nota</th></tr></thead><tbody>
            <tr><td><b>I'll have</b> + plato</td><td>I'll have the ceviche to start.</td><td>La más común al pedir. Es <i>I will</i>, pero siempre contraído.</td></tr>
            <tr><td><b>Could I get</b> + plato / cambio</td><td>Could I get the sauce on the side?</td><td>Perfecta para pedir cambios y extras.</td></tr>
            <tr><td><b>Can I have</b> + plato</td><td>Can I have a Coke, please?</td><td>Informal y muy frecuente.</td></tr>
            <tr><td><b>I'd like</b> + plato</td><td>I'd like the steak, medium rare.</td><td>Un punto más formal. <i>I'd</i> = <i>I would</i>.</td></tr>
            <tr><td><b>We'll share</b> + plato</td><td>We'll share an order of causa.</td><td>Para compartir.</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:22px">2 · Contables e incontables en la mesa</h3>
          <p style="margin:8px 0 14px"><i>Water, rice, bread, soup, wine, salt, sauce</i> son incontables: no llevan <i>a</i> ni plural. Si quieres una unidad, nombra el envase: <b>a bottle of</b> water, <b>a glass of</b> wine, <b>a bowl of</b> soup, <b>a piece of</b> bread. <i>Fries, vegetables, nuts, drinks</i> son contables.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Palabra</th><th>Con qué va</th><th>Ejemplo</th></tr></thead><tbody>
            <tr><td><b>some</b></td><td>afirmativas y <b>ofertas / peticiones</b> (contable o no)</td><td>Could we have <b>some</b> water? · Would you like <b>some</b> wine?</td></tr>
            <tr><td><b>any</b></td><td>preguntas y negativas</td><td>Do you have <b>any</b> gluten-free options? · I don't want <b>any</b> onions.</td></tr>
            <tr><td><b>a little</b></td><td>incontable (un poco)</td><td>Just <b>a little</b> ají, please.</td></tr>
            <tr><td><b>a few</b></td><td>contable (unos cuantos)</td><td>We need <b>a few</b> more minutes.</td></tr>
            <tr><td><b>How much / How many</b></td><td>incontable / contable</td><td><b>How much</b> is it altogether? · <b>How many</b> are in your party?</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:22px">3 · <i>Would you like</i> ≠ <i>Do you like</i></h3>
          <p style="margin:8px 0 14px"><b>Would you like…?</b> = ¿quieres / le apetece…? (ofrecer, ahora). <b>Do you like…?</b> = ¿te gusta…? (en general). Como camarero preguntas <i>Would you like to see the dessert menu?</i>; como curioso, <i>Do you like spicy food?</i> Respuesta a la oferta: <i>Yes, please</i> / <i>No, thanks</i>, nunca <s>Yes, I like</s>.</p>
          <h3 style="margin-top:22px">4 · Describir un plato: pasiva corta</h3>
          <p style="margin:8px 0 14px">Para explicar qué es un plato no hace falta decir quién lo hace: <b>be</b> + participio.</p>
          <div class="scroll-x"><table class="table"><thead><tr><th>Patrón</th><th>Ejemplo con un plato peruano</th></tr></thead><tbody>
            <tr><td><b>It's made with</b> + ingredientes</td><td>Causa <b>is made with</b> mashed yellow potato, lime and ají.</td></tr>
            <tr><td><b>It's made from</b> + materia que se transforma</td><td>Chicha morada <b>is made from</b> purple corn.</td></tr>
            <tr><td><b>It's served with / cold / hot</b></td><td>Ceviche <b>is served</b> cold <b>with</b> sweet potato and corn.</td></tr>
            <tr><td><b>It's marinated / cooked / fried / topped in / with</b></td><td>The fish <b>is marinated in</b> lime juice. The beef <b>is stir-fried with</b> onions and tomatoes.</td></tr>
            <tr><td><b>It comes with</b> (activa, misma idea)</td><td>Lomo saltado <b>comes with</b> rice and fries.</td></tr>
          </tbody></table></div>
          <h3 style="margin-top:22px">5 · Recomendar con comparativos y superlativos</h3>
          <p style="margin:8px 0 8px">Cortos: <b>-er / the -est</b> (<i>milder, spicier, the freshest</i>). Largos: <b>more / the most</b> (<i>more filling, the most popular</i>). Irregulares: <i>good → better → the best</i>, <i>bad → worse → the worst</i>. Igualdad: <b>as … as</b>; menos: <b>less … than</b>.</p>
          <ul class="small" style="padding-left:18px;margin:0 0 12px"><li>The ají de gallina is <b>milder than</b> the rocoto relleno.</li><li>Lomo saltado is <b>our most popular</b> dish.</li><li>The ceviche is <b>fresher</b> at lunchtime <b>than</b> at night.</li><li>It's <b>not as spicy as</b> it looks.</li><li>If you want something <b>lighter</b>, try the causa.</li></ul>
          <div class="hint small"><b>Falsos amigos de la mesa:</b> <s>rich</s> → <b>delicious / tasty</b> (<i>rich</i> = pesado, con mucha grasa o muy intenso) · <s>the account</s> → <b>the check / the bill</b> · <s>the total</s> → <b>How much is it altogether?</b> · <s>a water</s> → <b>some water / a bottle of water</b> · <s>allergic of</s> → <b>allergic to</b> · <s>we are four persons</s> → <b>there are four of us</b> / <b>a table for four</b> · <s>I am agree</s> → <b>I agree</b>.</div>` },
        { label: 'Pedir y describir', type: 'mcq', eyebrow: 'Grammar in use', title: 'Elige la forma correcta', intro: 'Pedir con naturalidad, <i>some / any / a little / a few</i>, <i>would like</i> frente a <i>like</i>, pasiva corta y comparativos para recomendar.', pool: 10, items: [
          { blank: 1, q: '___ the ceviche to start, please.', opts: ["I'll have", 'I want', 'I will want', 'I am wanting'], a: "I'll have", why: '<b>I\'ll have</b> es la fórmula natural para pedir. <i>I want</i> suena a orden; <i>I am wanting</i> no existe en este uso.' },
          { blank: 1, q: 'Would you like ___ wine with that?', opts: ['some', 'a', 'any', 'little'], a: 'some', why: 'En <b>ofertas</b> se usa <b>some</b> aunque sea pregunta. <i>Wine</i> es incontable: nunca <i>a wine</i> (salvo "un tipo de vino").' },
          { blank: 1, q: 'Do you have ___ gluten-free options?', opts: ['any', 'some', 'a', 'a little'], a: 'any', why: 'Pregunta real (no oferta) → <b>any</b>.' },
          { blank: 1, q: 'Could we have ___ water for the table?', opts: ['some', 'a', 'an', 'few'], a: 'some', why: '<i>Water</i> es incontable → <b>some water</b> o <i>a bottle / a jug of water</i>.' },
          { blank: 1, q: '___ you like fish, or should I recommend something else?', opts: ['Do', 'Would', 'Are', 'Will'], a: 'Do', why: 'Pregunta por el gusto en general → <b>Do you like</b>. <i>Would you like</i> sería ofrecerle pescado ahora.' },
          { blank: 1, q: '___ you like to see the dessert menu?', opts: ['Would', 'Do', 'Are', 'Did'], a: 'Would', why: 'Oferta → <b>Would you like</b>. Se responde <i>Yes, please</i> / <i>No, thanks</i>.' },
          { blank: 1, q: 'Ceviche ___ with raw fish marinated in lime juice.', opts: ['is made', 'is making', 'makes', 'made'], a: 'is made', why: 'Describes el plato, no quién lo hace → pasiva: <b>is made with</b>.' },
          { blank: 1, q: 'The lomo saltado ___ with rice and fries.', opts: ['comes', 'is coming', 'come', 'is come'], a: 'comes', why: '<b>It comes with</b> = viene con. Presente simple, tercera persona.' },
          { blank: 1, q: 'The ají de gallina is ___ than the rocoto relleno.', opts: ['milder', 'more mild', 'mildest', 'more milder'], a: 'milder', why: 'Adjetivo corto → <b>-er than</b>. Nunca <i>more</i> + <i>-er</i>.' },
          { blank: 1, q: "It's ___ popular dish on the menu.", opts: ['the most', 'most', 'the more', 'more'], a: 'the most', why: 'Superlativo de adjetivo largo: <b>the most</b> popular.' },
          { blank: 1, q: "There's only ___ ají in it, don't worry.", opts: ['a little', 'a few', 'few', 'many'], a: 'a little', why: '<i>Ají</i> como ingrediente es incontable → <b>a little</b>.' },
          { blank: 1, q: 'We need ___ more minutes to decide, please.', opts: ['a few', 'a little', 'little', 'much'], a: 'a few', why: '<i>Minutes</i> es contable → <b>a few</b>.' },
          { blank: 1, q: 'How ___ is it altogether?', opts: ['much', 'many', 'cost', 'price'], a: 'much', why: 'Precio → <b>How much is it?</b> Y "el total" se dice <i>altogether</i> o <i>in total</i>.' },
          { blank: 1, q: 'The fish ___ in lime juice for just a few minutes.', opts: ['is marinated', 'marinates', 'is marinating', 'marinated'], a: 'is marinated', why: 'El pescado recibe la acción → pasiva: <b>is marinated in</b>.' },
          { blank: 1, q: 'The portions here are ___ than in most places, so one main is enough for two.', opts: ['bigger', 'more big', 'the biggest', 'as big'], a: 'bigger', why: 'Comparación con <i>than</i> → <b>bigger than</b>.' },
        ] },
        { label: 'Corrige las frases', type: 'fix', eyebrow: 'Errores típicos de hispanohablante', title: 'Reescribe la frase corrigiendo el error', intro: 'Calcos del español que se oyen en cualquier restaurante. Corrige y compara con la solución; en el porqué tienes alternativas igual de válidas.', items: [
          { bad: 'I want a water.', good: 'Could I have some water, please?', why: '<i>Water</i> es incontable (<b>some water</b> / <i>a bottle of water</i>) e <i>I want</i> suena brusco: <b>Could I have…?</b> o <i>I\'ll have…</i>.' },
          { bad: 'How much is it the total?', good: 'How much is it altogether?', why: 'En inglés no se repite el sujeto (<s>is it the total</s>). "El total": <b>altogether</b> o <i>in total</i>.' },
          { bad: 'I am allergic of nuts.', good: 'I am allergic to nuts.', why: '<b>allergic to</b>, siempre. También <i>I have a nut allergy</i>.' },
          { bad: 'The lomo saltado is very rich.', good: 'The lomo saltado is delicious.', why: '<i>Rich</i> = pesado, con mucha grasa o sabor muy intenso (<i>a rich sauce</i>). "Rico" es <b>delicious</b> o <i>tasty</i>.' },
          { bad: 'Can you bring me the account, please?', good: 'Can you bring me the check, please?', why: '<i>Account</i> es la cuenta del banco. En la mesa: <b>the check</b> (EE. UU.) o <i>the bill</i> (Reino Unido).' },
          { bad: 'We are four persons.', good: 'There are four of us.', why: '<i>Persons</i> es lenguaje jurídico. Al llegar: <b>There are four of us</b>, <i>a table for four</i> o <i>party of four</i>.' },
          { bad: 'This dish have nuts?', good: 'Does this dish have nuts?', why: 'Pregunta con auxiliar: <b>Does</b> this dish <b>have</b>…? Más preciso aún: <i>Does this dish contain nuts?</i>' },
          { bad: 'The soup is cold, change it please.', good: 'The soup is cold. Could you heat it up, please?', why: '<i>Change it</i> es una orden. Queja educada: problema + <b>Could you…, please?</b> (<i>heat it up</i>, <i>bring another one</i>).' },
        ] },
        { label: 'Pide con educación', type: 'soft', eyebrow: 'Softening requests', title: 'Convierte la orden en una petición', explain: 'En inglés, el imperativo en un restaurante (<i>Bring me…, Change this…</i>) suena agresivo aunque añadas <i>please</i>. Reescribe cada petición con <b>Could I / we…?</b>, <b>Could you…?</b>, <b>I\'d like…</b> o <b>Would you mind…?</b>. Si hay un problema, nómbralo primero con <i>I\'m sorry, but…</i>.', missing: 'Falta una fórmula suave: <i>Could I / we / you… · I\'d like… · Would you mind…</i>', pattern: /\b(could (i|we|you)|i['’]d like|would you mind)\b/, items: [
          { h: '"Bring me the menu." (pide con <i>Could we…?</i>)', a: 'Could we have the menu, please?' },
          { h: '"I want the lomo saltado without onions." (pide con <i>I\'d like…</i>)', a: "I'd like the lomo saltado without onions, please." },
          { h: '"Change this, it\'s cold." (nombra el problema y pide con <i>Could you…?</i>)', a: "I'm sorry, but this is cold. Could you heat it up, please?" },
          { h: '"Separate bills." (pide con <i>Could we…?</i>)', a: 'Could we have separate checks, please?' },
          { h: '"Put the sauce apart." (pide con <i>Could I…?</i> y la colocación correcta)', a: 'Could I get the sauce on the side, please?' },
          { h: 'Como anfitrión: "Wait five minutes." (pide con <i>Would you mind…?</i> y da un motivo)', a: 'Would you mind waiting five minutes? Your table is almost ready.' },
        ] },
      ] },

      /* ================= LISTENING ================= */
      { id: 'listen', label: 'Listening', activities: [
        { label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Frases reales de camareros y clientes. Repite las veces que quieras y baja la velocidad si hace falta. Ojo con las contracciones (<i>I\'ll, isn\'t, there\'s</i>) y con <i>receipt</i> (la p no suena).',
          sentences: ['Hi, do you have a reservation?', "There's a fifteen-minute wait for a table outside.", 'Are you ready to order, or do you need a few more minutes?', "I'll have the ceviche to start and the lomo saltado as a main.", 'How would you like your steak cooked?', 'Could I get the dressing on the side, please?', "Does the sauce contain any nuts? I'm allergic to peanuts.", "I'm sorry, but this isn't what I ordered.", 'Could we have the check, please? And can we split it?', 'Is service included, or should we leave a tip?', 'Could you box this up for me, please?', 'Just a heads-up: the rocoto sauce is really hot.'] },
        { label: 'Diálogo', type: 'dialog', eyebrow: 'Listening in a restaurant', title: 'Escucha el diálogo y responde', intro: 'Aldo y su esposa cenan en Miami durante un viaje de trabajo. Escúchalo entero antes de responder: hay una reserva, una intolerancia, un cambio en el plato y un aviso del camarero.',
          lines: [['Waiter', 'Good evening! Do you have a reservation?'], ['Aldo', 'Yes, a table for two under Suárez, at seven thirty.'], ['Waiter', "Perfect. Would you like to sit inside or out on the patio? It's a bit windy tonight."], ['Aldo', 'Inside, please. A table by the window, if possible.'], ['Waiter', "Right this way. Here are the menus. Today's special is blackened grouper with mashed potatoes. Can I get you something to drink while you look?"], ['Aldo', 'Just tap water for the table, thanks. Actually, one question: my wife is lactose intolerant. Does the special contain any dairy?'], ['Waiter', "The fish doesn't, but the mashed potatoes are made with butter and cream. I can swap them for rice or grilled vegetables instead."], ['Aldo', "Grilled vegetables would be great. And I'll have the ribeye, medium rare, with the sauce on the side."], ['Waiter', 'Medium rare, sauce on the side. Anything to start? The crab cakes are our most popular appetizer.'], ['Aldo', "Let's share one order of crab cakes, then."], ['Waiter', 'Great choice. Just a heads-up: the kitchen is a little behind tonight, so the mains might take about twenty-five minutes.'], ['Aldo', "No problem, we're not in a hurry. Thanks for letting us know."]],
          questions: [
            { q: 'Where do they decide to sit?', opts: ['Inside, by the window', 'Out on the patio', 'At the bar'], a: 'Inside, by the window', why: '"Inside, please. A table by the window, if possible." El camarero había avisado de que hacía viento fuera.' },
            { q: 'Why does Aldo ask about dairy?', opts: ['His wife is lactose intolerant', 'He is vegan', 'He is allergic to nuts'], a: 'His wife is lactose intolerant', why: '"My wife is lactose intolerant. Does the special contain any dairy?" <i>Dairy</i> = lácteos.' },
            { q: 'What does the waiter offer instead of the mashed potatoes?', opts: ['Rice or grilled vegetables', 'French fries', 'A green salad'], a: 'Rice or grilled vegetables', why: '"I can swap them for rice or grilled vegetables instead." <i>Swap</i> = cambiar una cosa por otra.' },
            { q: 'What does "Just a heads-up" introduce?', opts: ['A warning that the food might take longer', 'A free dessert', 'The check'], a: 'A warning that the food might take longer', why: '<b>Just a heads-up</b> = un aviso: "the kitchen is a little behind tonight, so the mains might take about twenty-five minutes".' },
          ] },
      ] },

      /* ================= SPEAKING ================= */
      { id: 'speak', label: 'Speaking', activities: [
        { label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: [
          { t: 'Booking and arriving', task: 'Llamas a un restaurante para reservar para cuatro el sábado a las ocho (pide mesa dentro) y después llegas y te presentas al host. Usa make a reservation, party of four, under the name, inside, by the window.', model: "Hi, I'd like to make a reservation for Saturday at eight, please. It's a party of four, under the name Suárez. Could we have a table inside, by the window if possible? One of us doesn't like sitting on the patio when it's windy. Great, thank you. And is there parking nearby? Perfect. See you on Saturday. … Good evening! We have a reservation at eight, party of four, under Suárez. Oh, it's running ten minutes late? No problem, we can wait at the bar. Could you let us know when the table is ready? Thanks.", tags: ['reservation', 'party of four', 'under the name', 'inside', 'by the window', 'table', 'wait'] },
          { t: 'Ordering with an allergy', task: 'Pide una cena completa para ti: entrada, principal con dos cambios (algo aparte, algo en lugar de otra cosa) y bebida. Eres alérgico al maní: avísalo y pregunta qué contiene la salsa. Usa I\'ll have, Could I get, on the side, instead of, allergic to, contain.', model: "Hi, yes, I think we're ready. To start, I'll have the crab cakes. For the main, I'd like the grilled chicken, but could I get the sauce on the side? And could I have sweet potato fries instead of regular fries? One important thing: I'm allergic to peanuts. Does the sauce or the dressing contain any nuts? Could you check with the kitchen, please? It's a serious allergy. Thank you. And to drink, just sparkling water for me. Oh, and we're not in a hurry, so no rush with the mains.", tags: ["i'll have", 'could i get', 'on the side', 'instead of', 'allergic to', 'contain', 'check with the kitchen'] },
          { t: 'Explaining lomo saltado to a tourist', task: 'Un turista en tu negocio pregunta "What\'s lomo saltado?". Explícalo en 60-90 palabras: qué es, de qué está hecho, cómo se cocina, con qué se sirve, si pica, y recomiéndalo con un comparativo. Usa it\'s made with, it\'s stir-fried, it comes with, it\'s not spicy, our most popular.', model: "Lomo saltado is probably our most popular dish, and a great one to start with. It's made with strips of beef that are stir-fried over very high heat with red onions, tomatoes, soy sauce and a little vinegar. That's the Chinese influence on Peruvian food. It comes with rice and fries, and the fries soak up the sauce, which is the best part. It isn't spicy at all, so it's milder than most of our dishes. If you want a little heat, I can bring some ají on the side. Just a heads-up: the portion is big.", tags: ['made with', 'stir-fried', 'comes with', 'rice and fries', 'not spicy', 'milder', 'most popular', 'on the side'] },
          { t: 'Something went wrong', task: 'Tu plato llegó frío y además te cobraron una bebida de más. Quéjate con educación, pide la solución, luego pide la cuenta, divídela entre dos y pregunta por la propina. Usa I\'m sorry, but, lukewarm, could you, overcharged, split, service included.', model: "Excuse me, I'm sorry, but my lomo saltado is lukewarm; the fries are almost cold. Could you heat it up or bring a fresh one, please? Thank you, I appreciate it. … Could we have the check, please? And could you split it two ways? Oh, one thing: I think we've been overcharged. There are three beers on here, but we only had two. Could you check that? No problem, these things happen. And is service included, or is the tip separate? OK, we'll add eighteen percent on the card. Could I also get a receipt, please?", tags: ["i'm sorry, but", 'lukewarm', 'could you', 'check', 'split', 'overcharged', 'service included', 'receipt'] },
        ] },
        { label: 'Pronunciación', type: 'stress', eyebrow: 'Pronunciación · habla conectada', title: '"Cud-ai-get", "ail-hav" y la p muda de receipt', intro: 'En la mesa nadie dice las palabras separadas: <i>Could I</i> suena "cudai", <i>I\'ll have</i> "ail-hav", <i>Would you</i> "wu-ju". Escucha, fíjate en la pista y repite imitando el ritmo, no letra por letra.',
          pairs: [
            ['Could I get → "cud-ai-get" (la d enlaza con la I)', 'Could I get the dressing on the side?'],
            ["I'll have → \"ail-hav\" (nunca \"I will have\")", "I'll have the ceviche to start."],
            ['Would you like → "wu-ju-laik"', 'Would you like to see the dessert menu?'],
            ['medium rare → "MI-dium RER" (la r final suena en EE. UU.)', 'Medium rare, please.'],
            ['receipt → "ri-SIIT" (la p es muda)', 'Could I have a receipt, please?'],
            ['dessert → "di-ZERT" (desert, el desierto, es "DE-sert")', 'The dessert menu, please. Not the desert!'],
            ['allergic to → "a-LER-yik-tu" (una sola unidad)', "I'm allergic to peanuts."],
            ['check, please → "chek-pliiz" (la k casi se pierde)', 'Could we have the check, please?'],
            ['comes with → "kamz-with" (la s suena z)', 'It comes with rice and fries.'],
            ['vegetables → tres sílabas: "VEJ-ta-buls"', 'Grilled vegetables instead of fries, please.'],
          ] },
      ] },

      /* ================= READING ================= */
      { id: 'read', label: 'Reading', activities: [
        { type: 'reading', eyebrow: 'Reading · una reseña y la respuesta del dueño', title: 'Three stars: great food, slow service', intro: 'Una reseña de un restaurante peruano fuera del Perú y la respuesta del dueño. Lee una vez para la idea general y otra fijándote en cómo se describe la comida y cómo se queja el cliente sin ser grosero. Las palabras en negrita se preguntan después.',
          paragraphs: [
            "We went to Costa Verde Kitchen on a Friday night with a party of five. We had booked a table online, but when we arrived the place was <b>packed</b> and the hostess couldn't find our reservation. To be fair, she apologized, put us at the top of the waiting list, and we got a table on the patio after twenty minutes.",
            "The menu is short, which I like: four starters, six mains and two desserts. The ceviche was the best I've had outside Peru: fresh, well seasoned and served with sweet potato and corn, exactly as it should be. My wife, who is allergic to peanuts, asked about the sauces, and our server checked with the kitchen before answering, which we really appreciated. The lomo saltado, however, was a little <b>bland</b>, and the fries were lukewarm.",
            "The real problem was the end of the meal. We waited almost fifteen minutes for the check, and when it came, we had been charged for two desserts instead of one. Our server was clearly <b>rushed</b> and seemed annoyed when we pointed it out. Service is not included, so we still left fifteen percent, but the experience didn't quite match the food.",
            "<i>Response from the owner:</i> Thank you for your honest review, and I'm sorry about the reservation and the mistake on your check. Friday was our busiest night since we opened, and that is not an excuse: it's something we are fixing with a new booking system and an extra server on weekends. The dessert charge has been <b>waived</b> and refunded to your card. We'd love to have you back; the next pisco sours are on the house.",
          ],
          main: [
            { q: 'The reviewer explains a problem with the reservation and how the staff handled it.', opts: ['1', '2', '3', '4'], a: '1', why: 'Párrafo 1: <i>the hostess couldn\'t find our reservation… she apologized, put us at the top of the waiting list</i>.' },
            { q: 'The reviewer describes the dishes and praises how the staff dealt with an allergy.', opts: ['1', '2', '3', '4'], a: '2', why: 'Párrafo 2: el ceviche, el lomo saltado y <i>our server checked with the kitchen before answering</i>.' },
            { q: 'The owner explains what the restaurant is doing to avoid the problems.', opts: ['1', '2', '3', '4'], a: '4', why: 'Párrafo 4: <i>a new booking system and an extra server on weekends</i>.' },
          ],
          infer: [
            { q: '<b>packed</b> (paragraph 1)', opts: ['very full of people', 'closed for a private event', 'badly decorated'], a: 'very full of people', why: 'Un viernes por la noche, con lista de espera: el local estaba <i>lleno</i>.' },
            { q: '<b>bland</b> (paragraph 2)', opts: ['without much flavor', 'too spicy', 'too expensive'], a: 'without much flavor', why: 'Se contrasta con el ceviche <i>well seasoned</i>: al lomo le faltaba sabor.' },
            { q: '<b>rushed</b> (paragraph 3)', opts: ['in a hurry, with too much to do', 'very friendly', 'new in the job'], a: 'in a hurry, with too much to do', why: 'Noche llena, quince minutos para la cuenta, se molesta al corregir: iba <i>apurado</i>.' },
            { q: '<b>waived</b> (paragraph 4)', opts: ['canceled, so you do not have to pay it', 'doubled', 'printed on the receipt'], a: 'canceled, so you do not have to pay it', why: '<i>Waive a charge</i> = anular un cobro. Luego lo <i>refunded</i> (devolvieron) a la tarjeta.' },
          ],
          think: 'Si esta reseña fuera de tu negocio, ¿qué tres cosas cambiarías primero? Escribe la respuesta del dueño con tus palabras: una disculpa concreta (<i>I\'m sorry about…</i>), una medida (<i>we are fixing this by…</i>) y una invitación a volver (<i>we\'d love to have you back</i>).' },
      ] },

      /* ================= WRITING ================= */
      { id: 'write', label: 'Writing', activities: [
        { label: 'Reseña o respuesta', type: 'comment', eyebrow: 'Writing task', title: 'Una reseña equilibrada o la respuesta del dueño', intro: 'Elige: (A) una reseña equilibrada de un restaurante al que fuiste (lo bueno, lo malo y si lo recomiendas), o (B) la respuesta del dueño a una reseña negativa de tu negocio (agradece, pide disculpas por algo concreto, explica qué cambias e invita a volver). Escribe 80-130 palabras. La checklist se marca sola al analizar el texto.', placeholder: 'We went to … on a Saturday night. The ceviche was … / Thank you for your review. I\'m sorry about … We are fixing this by …', min: 80, max: 130, need: 4, checks: [
          { label: 'Agradezco o pido disculpas de forma concreta (<i>thank you for your review / I\'m sorry about… / we apologize for…</i>), o abro la reseña situándola (<i>we went to… on…</i>)', re: /\b(thank you for your (review|feedback|comments?)|thanks for your (review|feedback)|(i'm|we're|i am|we are) sorry (about|for|that)|(i|we) apologi[sz]e|we (went|had dinner|had lunch) (to|at)\b)/ },
          { label: 'Nombro la comida con vocabulario de la unidad (<i>starter, main, dessert, portion, side, ceviche, lomo saltado, medium rare, spicy, mild…</i>), al menos dos veces', re: /\b(starters?|appetizers?|mains?|main course|entr[ée]es?|desserts?|portions?|sides?|ceviche|lomo saltado|causa|ají de gallina|steak|medium rare|well done|spicy|mild|grilled|fried|homemade|dressing|sauce)\b[\s\S]*\b(starters?|appetizers?|mains?|main course|entr[ée]es?|desserts?|portions?|sides?|ceviche|lomo saltado|causa|ají de gallina|steak|medium rare|well done|spicy|mild|grilled|fried|homemade|dressing|sauce)\b/ },
          { label: 'Describo un problema o una queja con precisión (<i>overcooked, lukewarm, bland, slow, overcharged, wasn\'t what we ordered, waited… for the check</i>)', re: /\b(overcooked|undercooked|lukewarm|cold|bland|slow|rushed|overcharged|charged (for|twice)|mistake|wrong (order|dish)|wasn't what (i|we) ordered|waited .{0,25}(for|minutes)|took (too long|ages|forever))\b/ },
          { label: 'Uso una pasiva corta para describir un plato o una acción (<i>is made with, is served with, was cooked, has been refunded…</i>)', re: /\b(is|are|was|were|has been|have been|be)\s+(made|served|cooked|marinated|topped|filled|stir-fried|fried|grilled|charged|refunded|waived|seasoned|prepared)\b/ },
          { label: 'Comparo o recomiendo con un comparativo o superlativo (<i>better than, the best, milder than, the most popular, not as… as</i>)', re: /\b(better than|worse than|the (best|worst|most|freshest|spiciest|mildest|biggest|cheapest)|\w+er than|more \w+ than|less \w+ than|not as \w+ as)\b/ },
          { label: 'Cierro con una recomendación o una invitación a volver (<i>I\'d recommend…, worth a visit, we\'d love to have you back, on the house, give it another try</i>)', re: /\b(i('d| would) (definitely |highly )?recommend|(well )?worth (a visit|trying|it)|we'd love to have you back|come back|on the house|next time|another (try|chance)|see you (soon|again))\b/ },
        ] },
        { label: 'Ordena el diálogo', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Toca las líneas en el orden correcto', dialogs: [
          ['Host: Good evening, Costa Verde Kitchen. How can I help you?', "Aldo: Hi, I'd like to make a reservation for Saturday at eight, please. Party of four.", 'Host: Let me check… Eight is full, but I have seven thirty or eight thirty. Inside or on the patio?', 'Aldo: Eight thirty, inside, please. Under the name Suárez.', "Host: Perfect, Mr. Suárez. Eight thirty, party of four, inside. We'll hold the table for fifteen minutes.", "Aldo: Great, thank you. We'll be on time."],
          ["Waiter: Here you go, the steak, well done. Enjoy!", "Aldo: Excuse me, I'm sorry, but I asked for medium rare, not well done.", "Waiter: Oh, you're right, I'm so sorry. I'll take it back and bring a fresh one right away.", "Aldo: Thank you. And could I get some more bread while I wait?", 'Waiter: Of course. And the drinks are on the house tonight, sorry again about that.'],
          ['Aldo: Could we have the check, please? Separate checks, if possible.', 'Waiter: Sure. Was everything OK with your meal?', "Aldo: Everything was great, thanks. Oh, one thing: there are three desserts here, but we only had two.", "Waiter: Let me see… You're right, that's a mistake. I'll take it off.", 'Aldo: Thanks. And is service included, or should we leave a tip?', "Waiter: It's not included. There's a line for the tip on the receipt.", "Aldo: Got it. We'll add eighteen percent on the card. Could I have a copy of the receipt, please?"],
        ] },
      ] },

      /* ================= SOCIAL ENGLISH ================= */
      { id: 'social', label: 'Social English', activities: [
        { label: 'Frases', type: 'notes', eyebrow: 'Functional language · por momento y por rol', title: 'Lo que se dice en cada momento, de los dos lados', html: `<div class="grid2" style="margin-top:12px">
          <div><h3>Reservar y llegar</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I'd like to make a reservation for</b> four <b>for</b> Saturday <b>at</b> eight.</li><li><b>Party of four, under</b> Suárez.</li><li><b>Do you have a table for two?</b> / <b>How long is the wait?</b></li><li><b>Could we have a table</b> by the window / inside?</li><li>Anfitrión: <b>Do you have a reservation?</b> · <b>How many in your party?</b> · <b>Right this way.</b> · <b>There's a twenty-minute wait; can I put you on the list?</b></li></ul></div>
          <div><h3>Pedir y modificar</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>Could we have a few more minutes?</b></li><li><b>I'll have</b> the ceviche <b>to start</b> and the lomo saltado <b>as a main</b>.</li><li><b>Could I get</b> the sauce <b>on the side</b> / salad <b>instead of</b> fries / it <b>without</b> onions?</li><li><b>What do you recommend?</b> / <b>What's in the</b> causa?</li><li>Anfitrión: <b>Are you ready to order?</b> · <b>Can I start you off with something to drink?</b> · <b>How would you like your steak?</b> · <b>Anything else?</b></li></ul></div>
          <div><h3>Alergias</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I'm allergic to</b> peanuts / shellfish. <b>It's a serious allergy.</b></li><li><b>Does this contain</b> any nuts / dairy / gluten?</li><li><b>Do you have any</b> gluten-free / vegan <b>options?</b></li><li>Anfitrión: <b>Thanks for letting me know; I'll tell the kitchen.</b> · <b>It's made with…, so I'd avoid it.</b> · <b>We cook everything in the same oil.</b></li></ul></div>
          <div><h3>Durante la comida</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>Excuse me, I'm sorry, but</b> this is lukewarm / overcooked / <b>this isn't what I ordered</b>.</li><li><b>Could you heat it up / bring a fresh one, please?</b></li><li><b>Could we get some more</b> bread / napkins?</li><li>Anfitrión: <b>How is everything?</b> · <b>I'm so sorry, that's my mistake. I'll fix it right away.</b> · <b>Just a heads-up:</b> the ají is really hot.</li></ul></div>
          <div><h3>La cuenta y para llevar</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>Could we have the check, please?</b> / <b>Can we split it?</b> / <b>Separate checks, please.</b></li><li><b>Is service included?</b> / <b>I think we've been overcharged.</b></li><li><b>Do you take cards?</b> / <b>Could I have a receipt?</b></li><li><b>Could you box this up?</b> / Two ceviches <b>to go</b>, please.</li><li>Anfitrión: <b>I'll ring you up at the counter.</b> · <b>Here's your receipt.</b> · <b>Thank you for coming!</b></li></ul></div>
          <div><h3>Recomendar y describir (anfitrión)</h3><ul class="small" style="padding-left:18px;margin:6px 0"><li><b>I'd recommend</b> the lomo saltado; <b>it's our most popular dish</b>.</li><li><b>It's made with</b> beef, onions and tomatoes, and <b>it comes with</b> rice and fries.</li><li><b>Ceviche is</b> raw fish <b>marinated in</b> lime juice, <b>served cold with</b> sweet potato and corn.</li><li><b>It's milder than</b> it looks. / <b>It's not spicy at all.</b> / <b>It has a little kick.</b></li><li><b>Sorry about the wait. The dessert is on the house.</b></li></ul></div>
          <div class="hint small"><b>Ojo con el registro:</b> una queja empieza con <b>Excuse me, I'm sorry, but…</b> y termina con <b>Could you…, please?</b>; nunca con <s>Change it</s> ni <s>This is bad</s>. Al agradecer una disculpa: <b>No worries, these things happen</b> (no <s>It doesn't matter</s>, que suena a "me da igual"). "De nada": <b>You're welcome</b> / <b>No problem</b> (no <s>Nothing</s>). "Igualmente": <b>You too!</b> (no <s>Equally</s>). <b>On the house</b> = gratis, invita la casa: se responde <i>That's very kind of you</i>, no se pregunta cuánto cuesta.</div></div>` },
        { label: '¿Qué dices?', type: 'mcq', eyebrow: 'Respuesta rápida', title: '¿Qué dices en cada situación?', intro: 'Diez momentos reales, de los dos lados del mostrador. Elige la frase natural y con el registro adecuado.', items: [
          { q: 'Llegas a un restaurante en Chicago con tu esposa y tus suegros. El host pregunta "How many?"', opts: ['Party of four, please.', 'We are four persons.', 'Four peoples.'], a: 'Party of four, please.', why: '<b>Party of four</b> o <i>A table for four, please</i>. <s>Four persons</s> suena a documento legal; <s>peoples</s> no existe en este sentido.' },
          { q: 'El camarero pregunta si están listos y todavía no han mirado la carta.', opts: ['Could we have a few more minutes, please?', 'Wait, we are reading.', 'Not yet. Come later.'], a: 'Could we have a few more minutes, please?', why: 'Petición suave con <b>Could we have…?</b>; <i>a few</i> porque <i>minutes</i> es contable.' },
          { q: 'Quieres el lomo saltado pero sin cebolla.', opts: ["I'll have the lomo saltado without onions, please.", 'I want the lomo saltado but no onion inside.', 'Lomo saltado, take out the onion.'], a: "I'll have the lomo saltado without onions, please.", why: '<b>I\'ll have… without…</b>. Las otras dos son comprensibles pero suenan a orden.' },
          { q: 'Eres alérgico al maní y no sabes qué lleva la salsa.', opts: ["I'm allergic to peanuts. Does the sauce contain any nuts?", 'I have allergy of peanuts. The sauce has?', 'Peanuts are bad for me. No sauce.'], a: "I'm allergic to peanuts. Does the sauce contain any nuts?", why: '<b>allergic to</b> + <b>Does it contain…?</b> Di la alergia y pregunta: no des por hecho.' },
          { q: 'Te traen el pescado, pero pediste el pollo.', opts: ["Excuse me, I'm sorry, but this isn't what I ordered. I asked for the chicken.", 'No, no. This is wrong. The chicken!', "This isn't mine. Take it."], a: "Excuse me, I'm sorry, but this isn't what I ordered. I asked for the chicken.", why: 'Queja educada: <b>Excuse me, I\'m sorry, but…</b> + qué pediste. Sin gritos ni imperativos.' },
          { q: 'Terminaron y quieren pagar cada uno lo suyo (en EE. UU.).', opts: ['Could we have separate checks, please?', 'The account, divided, please.', 'Everybody pays his part.'], a: 'Could we have separate checks, please?', why: '<b>Separate checks</b> (EE. UU.) o <i>Can we split the bill?</i>. <s>Account</s> es la cuenta del banco.' },
          { q: 'Sobró medio plato y quieres llevártelo.', opts: ['Could you box this up for me, please?', 'Can you put this in a bag for the dog?', 'I take this to my house.'], a: 'Could you box this up for me, please?', why: '<b>Box this up</b> o <i>Can I get a box for this?</i>. <i>Doggy bag</i> existe, pero ya suena anticuado.' },
          { q: 'Eres el anfitrión: una pareja entra y pregunta por una mesa para dos.', opts: ['Of course. Right this way.', 'Yes. Sit there.', 'Two? OK, go.'], a: 'Of course. Right this way.', why: '<b>Right this way</b> = por aquí, síganme. Las otras son órdenes secas.' },
          { q: 'Eres el anfitrión: un cliente pregunta si el ají de gallina pica mucho.', opts: ["It's mild; it has a little kick, but it's not hot. I can bring extra ají on the side if you like.", "It's very rich, you will like it.", "Yes, no, more or less. Don't worry."], a: "It's mild; it has a little kick, but it's not hot. I can bring extra ají on the side if you like.", why: 'Responde con precisión (<b>mild / a little kick / not hot</b>) y ofrece la opción. <s>Rich</s> no significa rico, y "más o menos" no ayuda a decidir.' },
          { q: 'Eres el anfitrión: un cliente esperó veinte minutos por su plato por un error de la cocina.', opts: ["I'm so sorry about the wait. That was our mistake. The dessert is on the house tonight.", 'Sorry, the kitchen is slow. It happens.', 'It was not my fault, it was the cook.'], a: "I'm so sorry about the wait. That was our mistake. The dessert is on the house tonight.", why: 'Disculpa concreta (<b>I\'m so sorry about the wait</b>), asumes el error y compensas (<b>on the house</b>). Nunca eches la culpa a otro delante del cliente.' },
        ] },
        { label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: 'En la mesa y detrás del mostrador', intro: 'Tres escenas. En las dos primeras eres el cliente: pides con una alergia y te traen el plato equivocado; luego pagas en EE. UU. con un cargo de más y la duda de la propina. En la tercera eres el anfitrión: una pareja extranjera entra en tu negocio sin haber probado nunca comida peruana. Elige la réplica, lee por qué, dila en voz alta y la conversación sigue por donde elegiste.', scenes: [
          { t: 'Pedir con una alergia', you: 'Aldo, cliente en un bistró de Austin', partner: 'Server', role: 'camarera amable pero con muchas mesas', goal: 'Pide bebida y plato con naturalidad, avisa de tu alergia al maní con <b>I\'m allergic to…</b>, pide un cambio con <b>on the side / instead of</b> y, cuando el plato llegue mal, quéjate con <b>I\'m sorry, but…</b> sin perder la calma.', start: 'a', nodes: {
            a: { say: "Hi there, welcome! Can I start you off with something to drink?", opts: [
              { t: "Hi! Just some still water for now, please. And could we have a few more minutes with the menu?", ok: 2, why: "Saludas, pides con <b>some still water</b> (incontable) y ganas tiempo con <b>Could we have a few more minutes?</b>. Natural y completo.", next: 'b' },
              { t: "A water, please.", ok: 1, why: "Te entienden, pero <i>water</i> es incontable: <b>some water</b> o <b>a bottle of water</b>. Y un <i>Hi</i> antes suaviza.", next: 'b' },
              { t: "No. Bring the menu.", ok: 0, why: "<i>No</i> seco más un imperativo: suena a orden. Pide con <b>Could we have the menu, please?</b>", next: 'a2' },
            ] },
            a2: { say: "...Sure. Here's the menu. I'll be back in a minute.", opts: [
              { t: "Sorry, that sounded rude. Could we get some water while we look? Thank you.", ok: 2, why: "Reparas el tono (<b>that sounded rude</b>) y pides bien: <b>Could we get some water…?</b>", next: 'b' },
              { t: "Thanks. Some water, please.", ok: 1, why: "Correcta y breve. Reconocer el tono anterior habría ayudado más.", next: 'b' },
              { t: "Fast, please. We are hungry.", ok: 0, why: "Insistir con órdenes (<i>fast, please</i>) después de un mal comienzo. Si tienes hambre, en inglés se bromea: <i>We're starving!</i>, nunca se apura al camarero así.", next: 'fail' },
            ] },
            b: { say: "Of course. So, are you ready to order?", opts: [
              { t: "Yes. I'll have the chicken salad, but I'm allergic to peanuts. Does the dressing contain any nuts?", ok: 2, why: "Pides con <b>I'll have</b>, avisas con <b>I'm allergic to peanuts</b> y preguntas con <b>Does it contain…?</b>. Exactamente el orden correcto.", next: 'c' },
              { t: "The chicken salad, please. No peanuts, I have allergy.", ok: 1, why: "Se entiende, pero <s>I have allergy</s> está incompleto: <b>I'm allergic to peanuts</b> o <i>I have a peanut allergy</i>. Y conviene preguntar qué lleva.", next: 'c' },
              { t: "I want the chicken salad. I am allergic of peanuts.", ok: 0, why: "<s>I want</s> suena a orden y <s>allergic of</s> es el calco clásico: siempre <b>allergic to</b>.", next: 'b2' },
            ] },
            b2: { say: "Sorry, allergic to what? Peanuts?", opts: [
              { t: "Yes, peanuts. It's a serious allergy, so could you check with the kitchen, please?", ok: 2, why: "Confirmas, dejas clara la gravedad (<b>a serious allergy</b>) y pides que lo comprueben: <b>Could you check with the kitchen?</b>", next: 'c' },
              { t: "Yes, peanuts. Please no peanuts.", ok: 1, why: "Claro, aunque <i>Please no peanuts</i> es telegráfico. Mejor: <b>Could you make sure there are no peanuts?</b>", next: 'c' },
              { t: "Peanuts, yes. But it's OK, just a little bit is fine.", ok: 0, why: "Con una alergia nunca se minimiza: el camarero no puede servirte con seguridad si dices que <i>un poquito está bien</i>.", next: 'fail' },
            ] },
            c: { say: "Good thing you asked: the house dressing has peanuts. I can bring it with a lemon vinaigrette instead. Would that work? And would you like the dressing on the side?", opts: [
              { t: "That works, thank you. On the side, please. And could I get sweet potato fries instead of regular fries?", ok: 2, why: "Aceptas la alternativa, confirmas <b>on the side</b> y añades otro cambio con <b>Could I get… instead of…?</b>", next: 'd' },
              { t: "OK, yes. On the side.", ok: 1, why: "Correcta. Un <i>thank you</i> y pedir ya los otros cambios te ahorra otro viaje del camarero.", next: 'd' },
              { t: "Yes. And the fries apart.", ok: 0, why: "<s>Apart</s> es calco de \"aparte\": en la mesa se dice <b>on the side</b>. Y <i>fries apart</i> no se entiende qué quieres.", next: 'd' },
            ] },
            d: { say: "Here you go: the chicken salad with our house peanut dressing. Enjoy!", opts: [
              { t: "Sorry, I think there's been a mix-up. I asked for the lemon vinaigrette because of my peanut allergy. Could you take this back, please?", ok: 2, why: "Queja perfecta: <b>I think there's been a mix-up</b>, recuerdas el motivo y pides la solución con <b>Could you…, please?</b>", next: 'e' },
              { t: "Excuse me, this isn't what I ordered. I asked for no peanuts.", ok: 1, why: "Correcta y firme con <b>this isn't what I ordered</b>. Recordar que es por alergia hace que reaccionen más rápido.", next: 'e' },
              { t: "No, no, no. This is wrong. Take it.", ok: 0, why: "Tienes razón, pero el tono (<i>take it</i>) convierte un error en un conflicto. Empieza por <b>Sorry, I think there's been a mix-up</b>.", next: 'd2' },
            ] },
            d2: { say: "I'm sorry? What's wrong with it?", opts: [
              { t: "Sorry, I should explain: I'm allergic to peanuts and this has the peanut dressing. Could you change it, please?", ok: 2, why: "Bajas el tono, explicas (<b>I'm allergic to peanuts</b>) y pides el cambio con educación.", next: 'e' },
              { t: "It has peanuts. I said no peanuts, remember?", ok: 1, why: "Correcta en contenido; <i>remember?</i> suena algo acusador. <b>Could you change it, please?</b> cierra mejor.", next: 'e' },
              { t: "I said it already! Call the manager.", ok: 0, why: "Escalar sin dar la explicación una segunda vez. Primero <b>I'm allergic to peanuts</b>; el manager es el último recurso.", next: 'fail' },
            ] },
            e: { say: "Oh no, I'm so sorry. That's my mistake. I'll bring a fresh one with the vinaigrette right away, and I'll let the manager know.", opts: [
              { t: "No worries, these things happen. Thanks for sorting it out so quickly.", ok: 2, why: "Aceptas la disculpa con la fórmula natural: <b>No worries, these things happen</b>. Y agradeces la solución.", next: 'f' },
              { t: "OK, thank you.", ok: 1, why: "Correcta y neutra. <b>No worries</b> o <b>Don't worry about it</b> rebajan la tensión del todo.", next: 'f' },
              { t: "It doesn't matter.", ok: 0, why: "Calco de \"no importa\": en inglés <s>It doesn't matter</s> suena a \"me da igual lo que hagas\". Di <b>No worries</b> o <b>Don't worry about it</b>.", next: 'f' },
            ] },
            f: { say: "Here's the new salad, no peanuts anywhere near it. Again, sorry about that. Dessert is on the house tonight.", opts: [
              { t: "That's very kind of you, thank you. Everything looks great now.", ok: 2, why: "<b>On the house</b> = invita la casa. Se agradece con <b>That's very kind of you</b>.", next: 'win' },
              { t: "Thanks a lot.", ok: 1, why: "Correcta e informal. Funciona.", next: 'win' },
              { t: "On the house? How much does that cost?", ok: 0, why: "<b>On the house</b> significa gratis, invita la casa. Preguntar el precio muestra que no entendiste.", next: 'meh' },
            ] },
            win: { say: "Enjoy, and thanks for being so patient!", end: true, outcome: 'win', note: 'Pediste con <b>I\'ll have</b>, avisaste con <b>I\'m allergic to peanuts</b> y <b>Does it contain…?</b>, modificaste con <b>on the side / instead of</b> y te quejaste con <b>I think there\'s been a mix-up… Could you take this back, please?</b> Así se consigue que un error se arregle en dos minutos.' },
            meh: { say: "Oh, no, no: on the house means it's free! Our treat.", end: true, outcome: 'meh', note: 'Todo bien hasta el final: <b>on the house</b> = gratis, invita la casa. Se responde <b>That\'s very kind of you</b>. Lo demás, impecable: alergia clara, cambios con <b>on the side / instead of</b>, queja educada.' },
            fail: { say: "I'm going to get my manager. One moment.", end: true, outcome: 'fail', note: 'La conversación se torció por el tono o por restarle importancia a la alergia. Recuerda: pide con <b>Could I / Could we…?</b>, avisa con <b>I\'m allergic to…</b> sin minimizarlo, y quéjate con <b>I\'m sorry, but…</b> + <b>Could you…, please?</b>' },
          } },
          { t: 'La cuenta en EE. UU.', you: 'Aldo, terminando de cenar en Nueva York con un colega', partner: 'Server', role: 'camarero rápido, buen humor', goal: 'Pide la cuenta con la palabra correcta (<b>check</b>), pide cuentas separadas, señala un cargo equivocado sin acusar, pregunta por la propina (<b>Is service included?</b>) y pide el recibo.', start: 'a', nodes: {
            a: { say: "How was everything tonight? Can I get you anything else?", opts: [
              { t: "Everything was great, thanks. Could we have the check, please?", ok: 2, why: "Respondes a la pregunta y pides con <b>Could we have the check, please?</b>: la palabra de EE. UU.", next: 'b' },
              { t: "Good, thanks. The bill, please.", ok: 1, why: "<i>Bill</i> es británico: en EE. UU. te entienden, pero lo natural es <b>the check</b>. Y mejor con <i>Could we have…?</i>", next: 'b' },
              { t: "Yes. The account, please.", ok: 0, why: "<s>Account</s> es la cuenta del banco. En la mesa: <b>the check</b> (EE. UU.) o <i>the bill</i> (Reino Unido).", next: 'a2' },
            ] },
            a2: { say: "The... account? Oh, you mean the check! Sure.", opts: [
              { t: "Yes, sorry, the check. And could you split it two ways, please?", ok: 2, why: "Corriges con naturalidad y aprovechas para pedir la división: <b>split it two ways</b>.", next: 'b' },
              { t: "Yes, the check.", ok: 1, why: "Correcta. Pedir ya la división ahorra una vuelta.", next: 'b' },
              { t: "Account, check, same thing. Hurry, please.", ok: 0, why: "No es lo mismo, y <i>hurry</i> a un camarero es de muy mal gusto. Si tienes prisa: <b>We're in a bit of a hurry, sorry.</b>", next: 'fail' },
            ] },
            b: { say: "Here you go. Would you like it all on one card, or separate checks?", opts: [
              { t: "Separate checks, please. Oh, and I think there's a mistake: we were charged for three desserts, but we only had two.", ok: 2, why: "<b>Separate checks</b> y la queja sin acusar: <b>I think there's a mistake… we were charged for…</b>", next: 'c' },
              { t: "Separate, please. And this is wrong: we had two desserts, not three.", ok: 1, why: "Correcta y clara. <i>This is wrong</i> es algo seco; <b>I think there's a mistake</b> abre mejor.", next: 'c' },
              { t: "Separate. And why you charge me three desserts?", ok: 0, why: "Falta el auxiliar (<b>why did you charge…?</b>) y la pregunta directa suena a acusación. Mejor: <b>I think we've been overcharged.</b>", next: 'b2' },
            ] },
            b2: { say: "Let me see... three desserts, yes, that's what the kitchen sent out.", opts: [
              { t: "I understand, but we only ordered two: the cheesecake and the brownie. Could you check again, please?", ok: 2, why: "Firme y educado: <b>I understand, but…</b> + los datos + <b>Could you check again, please?</b>", next: 'c' },
              { t: "No, two desserts. Look: cheesecake, brownie. Two.", ok: 1, why: "Tienes razón y lo demuestras, pero en modo telegrama. Una frase completa suena menos agresiva.", next: 'c' },
              { t: "This is a robbery. I'm not paying this.", ok: 0, why: "Un error de un postre no es un robo. Acusar cierra la conversación; <b>Could you check again?</b> la resuelve.", next: 'fail' },
            ] },
            c: { say: "You're right, I'm so sorry. The third one was for another table. I'll take it off right away.", opts: [
              { t: "No problem, thanks for fixing it. By the way, is service included, or is the tip separate?", ok: 2, why: "Aceptas la disculpa y preguntas lo que todo extranjero debe preguntar en EE. UU.: <b>Is service included?</b>", next: 'd' },
              { t: "OK, thank you. Is the tip included?", ok: 1, why: "Correcta. <b>Is service included?</b> o <i>Is gratuity added?</i> son las formas más habituales.", next: 'd' },
              { t: "OK. And the tip is obligatory here?", ok: 0, why: "<i>Obligatory</i> suena a protesta. En EE. UU. la propina no es ley, pero se espera: pregunta <b>Is service included?</b>", next: 'd' },
            ] },
            d: { say: "Service isn't included, no. Most people leave eighteen to twenty percent, but it's up to you. There's a line on the receipt for the tip.", opts: [
              { t: "Got it, thank you. We'll add twenty percent on the card. Could I also get a copy of the receipt?", ok: 2, why: "Entiendes la costumbre, decides (<b>We'll add twenty percent on the card</b>) y pides el recibo: <b>a copy of the receipt</b>.", next: 'e' },
              { t: "OK. Twenty percent on the card, please.", ok: 1, why: "Correcta. Si necesitas justificar el gasto, pide también el <b>receipt</b>.", next: 'e' },
              { t: "Twenty percent? In Peru we leave ten. I'll leave ten.", ok: 0, why: "Puedes dejar lo que quieras, pero discutir la costumbre local con el camarero es incómodo para los dos. En EE. UU. la propina es parte de su sueldo.", next: 'd2' },
            ] },
            d2: { say: "That's... fine, of course. It's your call.", opts: [
              { t: "Sorry, I didn't mean to sound cheap. We'll do eighteen percent; you took good care of us.", ok: 2, why: "Reparas el comentario (<b>I didn't mean to sound cheap</b>) y reconoces el servicio.", next: 'e' },
              { t: "Fine, eighteen percent.", ok: 1, why: "Resuelve, aunque sin suavizar el comentario anterior.", next: 'e' },
              { t: "Why? The service was slow and the dessert was wrong.", ok: 0, why: "El error ya se corrigió con una disculpa. Reabrirlo para justificar la propina termina mal siempre.", next: 'fail' },
            ] },
            e: { say: "Here's your copy. Thank you so much, and have a great night!", opts: [
              { t: "Thank you, you too! Everything was delicious.", ok: 2, why: "<b>You too!</b> es el \"igualmente\" natural, y cierras con un elogio.", next: 'win' },
              { t: "Thanks, bye!", ok: 1, why: "Correcta y breve.", next: 'win' },
              { t: "Thank you. Equally!", ok: 0, why: "<s>Equally</s> es calco de \"igualmente\" y no se usa así. Di <b>You too!</b>", next: 'meh' },
            ] },
            win: { say: "Aw, thank you! Come back and see us.", end: true, outcome: 'win', note: 'Pediste <b>the check</b>, no <i>the account</i>; señalaste el cargo con <b>I think there\'s a mistake, we were charged for…</b>; preguntaste <b>Is service included?</b> y pediste <b>a copy of the receipt</b>. En EE. UU., 18-20 % es lo normal si el servicio fue bueno.' },
            meh: { say: "Ha, 'you too' is what we say. Have a good one!", end: true, outcome: 'meh', note: 'Casi perfecto. Solo el cierre: \"igualmente\" es <b>You too!</b>, nunca <s>Equally</s>. Recuerda también la secuencia: <b>check → mistake → service included? → receipt</b>.' },
            fail: { say: "I'll have the manager come over. Excuse me.", end: true, outcome: 'fail', note: 'Un cargo equivocado se arregla con <b>I think there\'s a mistake… Could you check again, please?</b>, no con acusaciones ni discutiendo la propina. Y la palabra es <b>check</b>, no <i>account</i>.' },
          } },
          { t: 'Una pareja extranjera en tu negocio', you: 'Aldo, atendiendo en su negocio de comida peruana', partner: 'Emma', role: 'turista curiosa; viene con Tom, que es alérgico a los mariscos', goal: 'Recíbelos con <b>Right this way</b>, recomienda con <b>I\'d recommend… / our most popular</b>, explica el lomo saltado y el ceviche con <b>it\'s made with / it\'s served with</b>, avisa del picante con <b>Just a heads-up</b> y toma en serio la alergia.', start: 'a', nodes: {
            a: { say: "Hi! Is this a Peruvian place? We've never tried Peruvian food. Do you have a table for two?", opts: [
              { t: "Welcome! Yes, it is, and you're in good hands. Right this way. Inside or by the window?", ok: 2, why: "Bienvenida cálida, <b>Right this way</b> y les das a elegir la mesa. Así recibe un buen anfitrión.", next: 'b' },
              { t: "Yes, Peruvian. Table for two, follow me.", ok: 1, why: "Correcta y funcional. <i>Follow me</i> es un poco seco: <b>Right this way</b> suena más amable.", next: 'b' },
              { t: "Yes. Sit.", ok: 0, why: "<i>Sit</i> a secas es lo que se le dice a un perro. <b>Please, take a seat</b> o <b>Right this way</b>.", next: 'a2' },
            ] },
            a2: { who: 'Tom', say: "Um... anywhere?", opts: [
              { t: "Sorry, yes! Please take a seat wherever you like. Here are the menus, and everything is homemade.", ok: 2, why: "Reparas la sequedad con <b>Please take a seat wherever you like</b> y vendes tu casa: <b>everything is homemade</b>.", next: 'b' },
              { t: "Yes, anywhere is fine.", ok: 1, why: "Correcta. Un <i>please</i> y los menús en la mano habrían rematado la bienvenida.", next: 'b' },
              { t: "Yes, I said sit.", ok: 0, why: "Repetir la orden en vez de suavizarla. Un cliente nuevo decide en los primeros veinte segundos.", next: 'fail' },
            ] },
            b: { say: "Thanks. So, what do you recommend? We like trying new things, but we're not great with very spicy food.", opts: [
              { t: "Then I'd recommend the lomo saltado: it's stir-fried beef with onions, tomatoes and fries, and it's not spicy at all. It's our most popular dish.", ok: 2, why: "<b>I'd recommend</b> + descripción con ingredientes + <b>not spicy at all</b> + <b>our most popular dish</b>. Respondes justo a lo que preguntaron.", next: 'c' },
              { t: "The lomo saltado is very good. It's beef with fries and rice.", ok: 1, why: "Bien, pero no respondes a la preocupación del picante. Añade <b>and it's not spicy</b>.", next: 'c' },
              { t: "Everything is very rich. Try the rocoto relleno, it's not so hot.", ok: 0, why: "<s>Rich</s> no significa rico (es pesado o graso), y recomendar un rocoto a quien no quiere picante es buscarse un problema.", next: 'b2' },
            ] },
            b2: { who: 'Tom', say: "Rich? Like, heavy? And rocoto is a pepper, right? How hot are we talking?", opts: [
              { t: "Sorry, I meant delicious! And you're right, rocoto is a hot pepper; it's milder than it looks, but still spicy. If you want something safe, the lomo saltado is the one.", ok: 2, why: "Corriges el falso amigo (<b>I meant delicious</b>), eres honesto con el picante (<b>milder than it looks, but still spicy</b>) y rediriges.", next: 'c' },
              { t: "I mean tasty, not heavy. The rocoto is spicy, yes. The lomo saltado is better for you.", ok: 1, why: "Corriges y rediriges. <i>Better for you</i> suena a dieta; mejor <b>a safer choice</b>.", next: 'c' },
              { t: "No, no, rich means good. The rocoto is fine, trust me.", ok: 0, why: "Insistes en el error y empujas el picante a quien dijo que no lo quería. <i>Trust me</i> no sustituye a la información.", next: 'fail' },
            ] },
            c: { say: "Lomo saltado sounds perfect. And what's ceviche? Is it cooked?", opts: [
              { t: "Great question. Ceviche is fresh raw fish marinated in lime juice; the acid cures it. It's served cold with sweet potato and corn. Just a heads-up: it has a little ají, but it's mild.", ok: 2, why: "Explicación completa con pasiva corta (<b>marinated in, served cold with</b>) y el aviso del picante con <b>Just a heads-up</b>.", next: 'd' },
              { t: "It's raw fish with lime, onion and ají. It's cold. Very fresh.", ok: 1, why: "Correcta y clara. Falta la respuesta a su duda (<i>Is it cooked?</i>): <b>the lime juice cures it</b>.", next: 'd' },
              { t: "It's fish. Not cooked, but it's OK, don't worry.", ok: 0, why: "<i>Not cooked, don't worry</i> asusta más de lo que tranquiliza. Explica el cómo: <b>marinated in lime juice</b>.", next: 'c2' },
            ] },
            c2: { who: 'Tom', say: "Raw fish? Hmm, and it's OK how? Is it safe?", opts: [
              { t: "Totally. The lime juice cures the fish, like sushi but with citrus. We get the fish fresh every morning. If you'd rather, try a half portion to share.", ok: 2, why: "Comparas con algo que conocen (<b>like sushi</b>), das la garantía (<b>fresh every morning</b>) y ofreces una salida (<b>a half portion to share</b>).", next: 'd' },
              { t: "Yes, it's safe. The lime cooks it. Everybody eats it in Peru.", ok: 1, why: "Tranquiliza y explica. <i>Everybody eats it</i> es menos convincente que <b>we get it fresh every morning</b>.", next: 'd' },
              { t: "Yes, yes, no problem. You want or not?", ok: 0, why: "<i>You want or not?</i> es brusco y sin auxiliar (<b>Would you like to try it?</b>). Y <i>no problem</i> no responde a la pregunta.", next: 'd' },
            ] },
            d: { say: "OK, one lomo saltado and a ceviche to share. Oh, Tom is allergic to shellfish; is that a problem with the ceviche?", opts: [
              { t: "Thanks for telling me. Our classic ceviche is fish only, no shellfish, but we prepare the mixed one in the same kitchen, so I'll ask the chef to be extra careful.", ok: 2, why: "Agradeces el aviso, respondes con precisión (<b>fish only, no shellfish</b>) y eres honesto con la contaminación cruzada.", next: 'e' },
              { t: "No problem, the classic ceviche has no shellfish, only fish.", ok: 1, why: "Correcta. Mencionar que avisarás a la cocina da más confianza.", next: 'e' },
              { t: "Shellfish? The ceviche has fish, not shells. Don't worry.", ok: 0, why: "<b>Shellfish</b> son los mariscos (camarones, cangrejo, conchas), no \"pescado con concha\". Si no entiendes una palabra de alergia, pregunta.", next: 'd2' },
            ] },
            d2: { who: 'Tom', say: "Shellfish means shrimp, crab, that kind of thing. Is there any of that in it?", opts: [
              { t: "Ah, got it, sorry: no, the classic ceviche has no shrimp or crab, just fish. And I'll tell the kitchen about your allergy.", ok: 2, why: "Reconoces el malentendido, respondes con los datos y avisas a la cocina. <b>Shellfish</b> = mariscos.", next: 'e' },
              { t: "No shrimp, no crab. Only fish. OK.", ok: 1, why: "Correcta en contenido; el <i>OK</i> final suena a \"tema cerrado\". Añade <b>I'll let the kitchen know</b>.", next: 'e' },
              { t: "I think no. Maybe a little. It's fine.", ok: 0, why: "Con una alergia nunca se adivina. Si no estás seguro: <b>Let me check with the kitchen.</b>", next: 'fail' },
            ] },
            e: { say: "Perfect. And to drink? Something typical?", opts: [
              { t: "Try a chicha morada: it's a sweet drink made from purple corn, no alcohol. Or a pisco sour if you'd like a cocktail.", ok: 2, why: "Describes con <b>made from</b>, aclaras lo importante (<b>no alcohol</b>) y ofreces alternativa.", next: 'f' },
              { t: "Chicha morada. It's purple corn juice, very typical.", ok: 1, why: "Correcta. Decir si lleva alcohol y ofrecer una segunda opción ayuda a decidir.", next: 'f' },
              { t: "Inca Kola. It's like a yellow Coca-Cola, very rich.", ok: 0, why: "Otra vez <s>rich</s>. Y la comparación con Coca-Cola no explica el sabor: <b>a sweet, bubblegum-flavored soda</b> sería más útil.", next: 'f' },
            ] },
            f: { who: 'Tom', say: "That was fantastic, honestly. Could we get the check? And do you take cards?", opts: [
              { t: "Of course! I'll ring you up at the counter; we take cards and contactless. Thank you so much for coming, and tell your friends!", ok: 2, why: "<b>I'll ring you up at the counter</b>, confirmas el pago y cierras como anfitrión: <b>Thank you for coming</b>.", next: 'win' },
              { t: "Yes, cards are OK. One moment, I'll bring the check.", ok: 1, why: "Correcta. Una despedida cálida convierte a un turista en una reseña de cinco estrellas.", next: 'win' },
              { t: "Only cash, sorry. The ATM is far.", ok: 0, why: "Si solo aceptas efectivo, se avisa al principio, no al final. Y la frase para cobrar es <b>I'll ring you up</b>.", next: 'meh' },
            ] },
            win: { say: "We will! Thank you, this was the best meal of our trip.", end: true, outcome: 'win', note: 'Recibiste con <b>Right this way</b>, recomendaste con <b>I\'d recommend… our most popular dish</b>, explicaste con <b>it\'s made with / marinated in / served cold with</b>, avisaste con <b>Just a heads-up</b> y tomaste en serio la alergia (<b>shellfish</b> = mariscos). Esa pareja vuelve.' },
            meh: { say: "Oh... we don't have cash on us. Hmm, let me see what I can do.", end: true, outcome: 'meh', note: 'La comida y la explicación estuvieron perfectas; el final no. Si solo aceptas efectivo, dilo al recibirlos (<b>Just a heads-up: we\'re cash only</b>). Lo ideal: <b>We take cards and contactless; I\'ll ring you up at the counter.</b>' },
            fail: { say: "You know what, we'll try the pizza place next door. Thanks anyway.", end: true, outcome: 'fail', note: 'Se fueron por el tono o por no tomar en serio lo que te dijeron (nada de picante, alergia a los mariscos). Un anfitrión escucha primero: <b>Thanks for telling me</b>, explica con <b>it\'s made with…</b> y, si no sabe, <b>Let me check with the kitchen</b>.' },
          } },
        ] },
      ] },
    ],
  };
})();
