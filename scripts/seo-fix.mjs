import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const meta = {
  ru: {
    index: ['Ice Fishing Live — правила игры Evolution, бонусы, RTP и демо', 'Ice Fishing Live от Evolution: правила колеса из 53 секторов, ставки Leaf 1 и Leaf 2, бонусы Lil’ Blues, Big Oranges, Huge Reds, множители и RTP.'],
    'ice-fishing-slot': ['Слот Ice Fishing — RTP, правила, символы и выплаты', 'Разбор слота Ice Fishing: RTP, игровое поле, символы, линии выплат, бонусы, волатильность и максимальный выигрыш.'],
    'promo-code': ['Промокод Ice Fishing — как активировать бонус', 'Инструкция по промокоду Ice Fishing: где вводить код, как проверить условия бонуса и на что обратить внимание перед активацией.'],
    faq: ['Ice Fishing FAQ — частые вопросы о слоте', 'Ответы на частые вопросы об Ice Fishing: демо-режим, RTP, ставки, бонусные функции, правила и особенности игрового автомата.'],
    blog: ['Блог Ice Fishing — стратегии и полезные гайды', 'Статьи об Ice Fishing: стратегии управления банкроллом, игровые механики, разбор ошибок и рекомендации для внимательной игры.'],
    'blog-ice-fishing-strategy': ['Стратегия Ice Fishing — как управлять банкроллом', 'Практический гайд по стратегии Ice Fishing: размер ставки, управление игровым банком, лимиты сессии и типичные ошибки новичков.'],
    about: ['Ice Fishing Live — о проекте и редакции', 'Информация о проекте Ice Fishing Live: редакционная политика, структура материалов, принципы подготовки обзоров слота и контакты редакции.'],
    contacts: ['Ice Fishing Live — контакты редакции', 'Контакты редакции Ice Fishing Live: вопросы по материалам, предложения, замечания и информация для обратной связи.'],
    policy: ['Ice Fishing Live — политика конфиденциальности', 'Политика конфиденциальности и условия использования сайта Ice Fishing Live: обработка данных, правила работы с материалами и ответственность.']
  },
  en: {
    index: ['Ice Fishing — slot review, rules and bonuses', 'Ice Fishing slot guide covering mechanics, RTP, bonus features, rules, FAQ and practical information for a responsible gaming approach.'],
    'ice-fishing-slot': ['Ice Fishing Slot — RTP, symbols, payouts and rules', 'Detailed Ice Fishing slot review: RTP, reels, symbols, paylines, bonus features, volatility and maximum win information.'],
    'promo-code': ['Ice Fishing Promo Code — bonus activation guide', 'Ice Fishing promo code guide: where to enter a code, how to check bonus terms and what to verify before activation.'],
    faq: ['Ice Fishing FAQ — common slot questions', 'Answers to common Ice Fishing questions about demo play, RTP, bet size, bonus features, rules and slot mechanics.'],
    blog: ['Ice Fishing Blog — strategies and useful guides', 'Ice Fishing articles covering bankroll strategy, game mechanics, common mistakes and practical tips for more disciplined play.'],
    'blog-ice-fishing-strategy': ['Ice Fishing Strategy — bankroll management guide', 'Practical Ice Fishing strategy guide covering bet sizing, bankroll management, session limits and common beginner mistakes.'],
    about: ['Ice Fishing Live — about the project', 'About Ice Fishing Live: editorial policy, content structure, review principles and information about the project team.'],
    contacts: ['Ice Fishing Live — editorial contacts', 'Contact the Ice Fishing Live editorial team for questions, feedback, content suggestions and other project-related matters.'],
    policy: ['Ice Fishing Live — privacy policy and terms', 'Ice Fishing Live privacy policy and site terms covering data handling, content use, user responsibilities and general website rules.']
  },
  kz: {
    index: ['Ice Fishing — слот шолуы, ережелер және бонустар', 'Ice Fishing слоты туралы толық шолу: механика, RTP, бонустар, ережелер, жиі қойылатын сұрақтар және жауапты ойынға арналған ақпарат.'],
    'ice-fishing-slot': ['Ice Fishing слоты — RTP, белгілер және төлемдер', 'Ice Fishing слотының егжей-тегжейлі шолуы: RTP, барабандар, белгілер, төлем сызықтары, бонустар және максималды ұтыс.'],
    'promo-code': ['Ice Fishing промокоды — бонусты іске қосу', 'Ice Fishing промокодын пайдалану нұсқаулығы: кодты қайда енгізу, бонус шарттарын қалай тексеру және іске қоспас бұрын нені білу керек.'],
    faq: ['Ice Fishing FAQ — слот туралы жиі қойылатын сұрақтар', 'Ice Fishing туралы жиі қойылатын сұрақтарға жауаптар: демо режимі, RTP, ставка, бонустар, ережелер және слот механикасы.'],
    blog: ['Ice Fishing блогы — стратегиялар мен пайдалы нұсқаулықтар', 'Ice Fishing туралы мақалалар: банкроллды басқару, ойын механикасы, жиі кездесетін қателер және жауапты ойынға арналған кеңестер.'],
    'blog-ice-fishing-strategy': ['Ice Fishing стратегиясы — банкроллды басқару', 'Ice Fishing стратегиясы бойынша практикалық нұсқаулық: ставка көлемі, банкроллды басқару, сессия лимиттері және бастаушылардың қателері.'],
    about: ['Ice Fishing Live — жоба туралы', 'Ice Fishing Live жобасы туралы: редакциялық саясат, материалдардың құрылымы, шолуларды дайындау қағидалары және жоба туралы ақпарат.'],
    contacts: ['Ice Fishing Live — редакция байланыстары', 'Ice Fishing Live редакциясымен байланысу: сұрақтар, ұсыныстар, ескертулер және материалдарға қатысты кері байланыс.'],
    policy: ['Ice Fishing Live — құпиялылық саясаты', 'Ice Fishing Live сайтының құпиялылық саясаты мен пайдалану шарттары: деректерді өңдеу, материалдарды пайдалану және пайдаланушы жауапкершілігі.']
  },
  uz: {
    index: ['Ice Fishing — slot sharhi, qoidalar va bonuslar', 'Ice Fishing sloti haqida batafsil qo‘llanma: mexanika, RTP, bonus funksiyalari, qoidalar, FAQ va mas’uliyatli o‘yin bo‘yicha ma’lumotlar.'],
    'ice-fishing-slot': ['Ice Fishing sloti — RTP, belgilar, to‘lovlar va qoidalar', 'Ice Fishing slotining batafsil sharhi: RTP, g‘altaklar, belgilar, to‘lov liniyalari, bonuslar, volatillik va maksimal yutuq.'],
    'promo-code': ['Ice Fishing promo kodi — bonusni faollashtirish', 'Ice Fishing promo kodidan foydalanish bo‘yicha qo‘llanma: kodni qayerga kiritish, bonus shartlarini tekshirish va faollashtirishdan oldin nimalarga e’tibor berish.'],
    faq: ['Ice Fishing FAQ — slot haqida ko‘p beriladigan savollar', 'Ice Fishing haqida ko‘p beriladigan savollarga javoblar: demo rejimi, RTP, stavka, bonuslar, qoidalar va slot mexanikasi.'],
    blog: ['Ice Fishing blogi — strategiyalar va foydali qo‘llanmalar', 'Ice Fishing maqolalari: bankroll boshqaruvi, o‘yin mexanikasi, keng tarqalgan xatolar va mas’uliyatli o‘yin bo‘yicha amaliy tavsiyalar.'],
    'blog-ice-fishing-strategy': ['Ice Fishing strategiyasi — bankroll boshqaruvi', 'Ice Fishing strategiyasi bo‘yicha amaliy qo‘llanma: stavka hajmi, bankroll boshqaruvi, sessiya limitlari va yangi o‘yinchilarning xatolari.'],
    about: ['Ice Fishing Live — loyiha haqida', 'Ice Fishing Live loyihasi haqida: tahririy siyosat, materiallar tuzilishi, sharhlarni tayyorlash tamoyillari va loyiha ma’lumotlari.'],
    contacts: ['Ice Fishing Live — tahririyat kontaktlari', 'Ice Fishing Live tahririyati bilan aloqa: savollar, takliflar, izohlar va materiallar bo‘yicha fikr-mulohazalar.'],
    policy: ['Ice Fishing Live — maxfiylik siyosati', 'Ice Fishing Live maxfiylik siyosati va sayt shartlari: ma’lumotlarni qayta ishlash, materiallardan foydalanish va foydalanuvchi mas’uliyati.']
  }
};

function languageFor(file) {
  const rel = path.relative(root, file).replaceAll(path.sep, '/');
  if (rel.startsWith('ru/')) return 'ru';
  if (rel.startsWith('en/')) return 'en';
  if (rel.startsWith('kz/')) return 'kz';
  if (rel.startsWith('uz/')) return 'uz';
  return null;
}

function slugFor(file) {
  const base = path.basename(file, '.html');
  return base === 'index' ? 'index' : base;
}

function updateHtml(file) {
  const lang = languageFor(file);
  if (!lang || !meta[lang]) return false;
  const slug = slugFor(file);
  const data = meta[lang][slug];
  if (!data) return false;

  let html = fs.readFileSync(file, 'utf8');
  const [title, description] = data;
  const nextTitle = `<title>${title}</title>`;
  const nextDescription = `<meta name="description" content="${description}">`;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, nextTitle);
  if (/<meta\s+[^>]*name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+[^>]*name=["']description["'][^>]*>/i, nextDescription);
  } else {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `${nextTitle}\n    ${nextDescription}`);
  }

  // Keep social previews aligned with the page metadata.
  html = html.replace(/<meta\s+[^>]*property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta\s+[^>]*property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${description}">`);
  html = html.replace(/<meta\s+[^>]*name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${title}">`);
  html = html.replace(/<meta\s+[^>]*name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${description}">`);

  fs.writeFileSync(file, html);
  return true;
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walk(root);
const changed = files.filter(updateHtml);
console.log(`SEO metadata updated: ${changed.length} localized HTML pages.`);
