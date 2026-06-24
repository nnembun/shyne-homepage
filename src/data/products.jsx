/* ----------------------------------------------------------------------------
   SHYNE product-page content.
   Each entry drives the shared <ProductPage /> template. Add a new product by
   appending an object here and registering its slug in main.jsx — the layout,
   styling, animations and responsiveness are all handled by the template.
---------------------------------------------------------------------------- */

import { PRICES } from './prices.js';

export const products = {
  /* ===================== BARE VANILLA GLOW OIL ===================== */
  'bare-vanilla-glow-oil': {
    slug: 'bare-vanilla-glow-oil',
    shortName: 'Bare Vanilla Glow Oil',
    titleLines: ['bare vanilla', 'glow oil'],
    recapTitle: 'bare vanilla glow oil',
    subtitle: 'Nourishing Body Glaze',
    scent: 'Vanilla Sugar',
    price: 28.0,
    salePrice: PRICES['bare-vanilla-glow-oil'],
    rating: 4.8,
    reviews: 842,
    tagline: 'Weightless glow, sun-kissed skin',
    ctaLabel: 'Buy Glow Oil',

    description:
      'A weightless body glaze that melts into skin for a sheer, lit-from-within glow. Squalane and vitamin E nourish and soften while a warm veil of Vanilla Sugar lingers all day.',

    benefits: [
      'Wraps skin in a weightless, fast-absorbing veil of glow.',
      'Deeply nourishes with squalane & vitamin E for a soft, supple finish.',
      'Leaves a sheer, sun-kissed sheen — never greasy.',
      'Alcohol-free & non-drying, so skin stays soft and comfortable.',
      'Scented in warm Vanilla Sugar for an all-day skin perfume.',
    ],
    application:
      'Smooth a few drops over clean, dry skin — arms, légs, collarbone and shoulders. Warm between palms first, then press in for an even, radiant finish. Layer over moisturiser as the last step, or dust on alone for instant glow.',
    ingredients:
      'Squalane, Caprylic/Capric Triglyceride, Vitamin E (Tocopherol), Sweet Almond Oil, Jojoba Seed Oil, Vanilla Planifolia Fruit Extract, Meadowfoam Seed Oil. Alcohol-free, vegan, cruelty-free, halal-certified and dermatologically tested.',

    images: {
      hero: '/Products%20/Bare/bare%20model.png',
      dramatic: '/images/FINAL%20HERO%20SECTION%20BOTTOM%20PAGE.png',
      glaze: '/images/SITTING%20PHOTO.png',
      box: '/images/secondy%20hero%203.png',
      results: '/images/final%20master%20image%20.png',
      recap: '/images/LETS%20GLOW.png',
      recapFit: 'cover',
      faq: '/images/glowwithus%20updated.png',
      tray: '/RECENT.png',
      thumb: '/Products%20/Bare/Bare%20vanilla%20glow%20oil.png',
    },

    editorial: { emph1: 'WEIGHTLESS', noun: 'oil', emph2: 'RADIANCE', glowWord: 'GLOW' },
    goodFor:
      'All skin types, including sensitive and dry skin. Body, arms, légs, collarbone and shoulders.',
    specRows: [
      ['Feels like', 'A silky, fast-absorbing dry oil'],
      ['Smells like', 'Warm vanilla sugar & soft musk'],
      ['FYI', 'Alcohol-free · Non-greasy · Non-comedogenic · Vegan'],
    ],

    glazeWords: ['radiance', 'suppleness', 'glow'],
    applicationStep:
      'Warm a few drops between palms and press over clean, dry skin — morning and night.',

    whatsInside: {
      intro:
        'Get to know the nourishing oils that keep skin soft, supple and glowing all day long.',
      items: [
        ['squalane', 'A lightweight, plant-derived oil that mirrors skin’s own moisture for instant softness without grease.'],
        ['vitamin e + sweet almond', 'Antioxidant-rich oils that condition, smooth and protect the skin barrier.'],
        ['vanilla sugar', 'A warm, gourmand veil of scent that lingers as an all-day skin perfume.'],
      ],
      footnote: 'Also made with JOJOBA OIL, MEADOWFOAM SEED & VITAMIN E.',
    },

    results: {
      stats: [
        ['96%', 'agreed skin felt instantly nourished'],
        ['96%', 'agreed skin did not feel greasy or oily'],
        ['93%', 'agreed it helped soften dry, dull skin'],
        ['91%', 'agreed skin looked lit-from-within for hours'],
      ],
    },

    recapRows: [
      ['Benefits', 'Instantly softens, nourishes and leaves a weightless, sun-kissed glow.'],
      ['Where it fits in your routine', 'The last step — over moisturiser, or on its own for instant radiance.'],
      ['The effect', 'Sheer, lit-from-within glow with a warm vanilla veil.'],
      ['Key ingredients', 'Squalane · Vitamin E · Sweet Almond · Vanilla Sugar'],
    ],

    faq: [
      ['How is the Glow Oil different from a body lotion?', 'The Glow Oil is a weightless dry oil that absorbs instantly for a sheer, lit-from-within sheen, while a lotion sits heavier on the surface. Layer it over lotion as a finishing glow.'],
      ['Will it feel greasy or transfer onto clothes?', 'No — squalane and meadowfoam seed oil absorb quickly to a soft, non-greasy finish. Allow a moment to set before dressing.'],
      ['Is it non-comedogenic?', 'Yes. The formula is non-comedogenic and suitable for body and sensitive skin.'],
      ['Is it dermatologically tested?', 'Yes — dermatologically tested and formulated without parabens, silicones or synthetic dyes.'],
      ['Is it vegan and cruelty-free?', 'Always. Every SHYNE formula is 100% vegan and never tested on animals.'],
      ['Is it halal?', 'Yes — Bare Vanilla Glow Oil is halal-certified and alcohol-free.'],
    ],

    routine: {
      activeIndex: 3,
      steps: [
        ['01', 'Cleanse', 'Start fresh with clean, dry skin.'],
        ['02', 'Polish', 'Buff with the Glow Polish Bar for a smooth canvas.'],
        ['03', 'Hydrate', 'Press in the Hyaluronic Serum to lock in moisture.'],
        ['04', 'Glaze', 'Smooth on Bare Vanilla Glow Oil for instant radiance.'],
        ['05', 'Set', 'Finish with a dusting of Pearl Veil for luminosity.'],
      ],
    },

    sustainabilityIntro:
      'Bare Vanilla Glow Oil is bottled in recyclable glass and packed in cartons made from FSC-certified paper — so your glow leaves nothing behind.',

    reviewCards: [
      { name: 'Amara K.', age: '25 - 34', skin: 'Dryness, Dullness', type: 'Dry', fav: 'Weightless glow, Vanilla scent', title: 'My new everyday glow', body: 'This sinks in instantly and leaves the most beautiful sheen — never greasy. The vanilla scent is warm and not overpowering. Obsessed.', when: '6 hours ago' },
      { name: 'Bisi O.', age: '18 - 24', skin: 'Texture', type: 'Combination', fav: 'Fast absorbing, Non-greasy, Glow', title: 'Légs for days', body: 'A few drops and my skin looks lit from within in photos. Lasts all day and the bottle is gorgeous on my shelf.', when: '1 day ago' },
    ],

    related: [
      { category: 'golden', image: '/Products%20/Golden%20hour%20/Golden%20hour%20glow%20.png', name: 'Golden Hour Glow', description: 'Radiant golden elixir', price: 32.0, href: '/products/golden-hour-glow' },
      { category: 'pearl', image: '/Products%20/Pearl/Pearl%20Veil.png', name: 'Pearl Veil', description: 'Luminous skin tint & veil', price: 35.0, href: '/products/pearl-veil' },
      { category: 'sunset', image: '/Products%20/Sunset/Sunset%20glow%20.png', name: 'Sunset Glow', description: 'Warm bronzing shimmer', price: 30.0, href: '/products/sunset-glow' },
      { category: 'glow', image: '/Products%20/Glow%20polish%20bar/glow%20polish%20bar%20.png', name: 'Glow Polish Bar', description: 'Exfoliating glow ritual', price: 12.99, href: '/products/glow-polish-bar' },
    ],
  },

  /* ======================= GOLDEN HOUR GLOW ======================= */
  'golden-hour-glow': {
    slug: 'golden-hour-glow',
    shortName: 'Golden Hour Glow',
    titleLines: ['golden hour', 'glow'],
    recapTitle: 'golden hour glow',
    subtitle: 'Illuminating Body Glaze',
    scent: 'Amber & Coconut',
    price: 32.0,
    salePrice: PRICES['golden-hour-glow'],
    rating: 4.9,
    reviews: 1136,
    tagline: 'Bottled sunshine, lit-from-within',
    ctaLabel: 'Buy Golden Glow',

    description:
      'A radiant golden elixir that wraps skin in a sheer, sun-kissed shimmer. Squalane and golden mica nourish and illuminate while a warm veil of amber and coconut captures that endless golden hour.',

    benefits: [
      'Lights skin from within with a sheer, buildable golden shimmer.',
      'Nourishes with squalane & vitamin E for a soft, supple finish.',
      'Sweeps on weightless and dries down — never greasy.',
      'Alcohol-free & non-drying, so skin stays soft and comfortable.',
      'Scented in warm amber & coconut for an all-day golden-hour glow.',
    ],
    application:
      'Sweep 2–3 drops over the high points of clean skin — shoulders, collarbone, arms and légs. Warm between palms first, then press in for an even, golden finish. Build for more shimmer, or layer over moisturiser as your last step.',
    ingredients:
      'Squalane, Caprylic/Capric Triglyceride, Mica, Vitamin E (Tocopherol), Coconut Oil, Jojoba Seed Oil, Amber Extract, Meadowfoam Seed Oil. Alcohol-free, vegan, cruelty-free, halal-certified and dermatologically tested.',

    images: {
      hero: '/Products%20/Golden%20hour%20/golden%20hour%20model.png',
      dramatic: '/Products%20/Golden%20hour%20/golden-hour-dramatic.png',
      glaze: '/Products%20/Golden%20hour%20/golden-hour-glaze.png',
      box: '/images/secondy%20hero%203.png',
      results: '/Products%20/Golden%20hour%20/golden-hour-results.png',
      recap: '/Products%20/Golden%20hour%20/golden-hour-recap.png',
      recapFit: 'cover',
      faq: '/images/glowwithus%20updated.png',
      tray: '/RECENT.png',
      thumb: '/Products%20/Golden%20hour%20/Golden%20hour%20glow%20.png',
    },

    editorial: { emph1: 'LUMINOUS', noun: 'oil', emph2: 'GOLDEN RADIANCE', glowWord: 'GLOW' },
    goodFor:
      'All skin tones and types. Body, décolletage, arms, légs and shoulders — anywhere you want a golden, lit-from-within glow.',
    specRows: [
      ['Feels like', 'A silky, fast-absorbing golden oil'],
      ['Smells like', 'Warm amber, coconut & soft vanilla'],
      ['FYI', 'Alcohol-free · Non-greasy · Buildable shimmer · Vegan'],
    ],

    glazeWords: ['radiance', 'warmth', 'glow'],
    applicationStep:
      'Warm 2–3 drops between palms and sweep over the high points — shoulders, collarbone and légs.',

    whatsInside: {
      intro:
        'Get to know the light-reflecting oils and minerals that give skin a golden, lit-from-within glow.',
      items: [
        ['squalane', 'A weightless plant oil that drenches skin in moisture for a soft, supple finish.'],
        ['golden mica', 'Ultra-fine, light-reflecting minerals that lend a sheer, sun-kissed shimmer.'],
        ['amber + coconut', 'Nourishing, antioxidant-rich oils with a warm, golden-hour scent.'],
      ],
      footnote: 'Also made with JOJOBA OIL, VITAMIN E & MEADOWFOAM SEED.',
    },

    results: {
      stats: [
        ['97%', 'agreed skin looked instantly glowing'],
        ['95%', 'agreed skin felt soft, not greasy'],
        ['94%', 'agreed it gave a sun-kissed, golden sheen'],
        ['92%', 'agreed the glow lasted all day'],
      ],
    },

    recapRows: [
      ['Benefits', 'A buildable golden shimmer that nourishes and lights skin from within.'],
      ['Where it fits in your routine', 'The finishing step — over moisturiser, day or night.'],
      ['The effect', 'Warm, sun-kissed radiance with a soft-focus golden glow.'],
      ['Key ingredients', 'Squalane · Golden Mica · Amber · Coconut Oil'],
    ],

    faq: [
      ['How is Golden Hour Glow different from a plain body oil?', 'It’s a light-reflecting glow oil — it nourishes like a body oil while leaving a sheer, golden shimmer for a sun-kissed finish.'],
      ['Will it feel greasy or transfer onto clothes?', 'No — it absorbs to a soft, dry-touch finish. Allow a moment to set before dressing.'],
      ['Is the shimmer buildable?', 'Yes. Layer one drop for a subtle sheen, or build it up for a high-shine golden glow.'],
      ['Is it dermatologically tested?', 'Yes — dermatologically tested and formulated without parabens, silicones or synthetic dyes.'],
      ['Is it vegan and cruelty-free?', 'Always. Every SHYNE formula is 100% vegan and never tested on animals.'],
      ['Is it halal?', 'Yes — Golden Hour Glow is halal-certified and alcohol-free.'],
    ],

    routine: {
      activeIndex: 3,
      steps: [
        ['01', 'Cleanse', 'Start fresh with clean, dry skin.'],
        ['02', 'Polish', 'Buff with the Glow Polish Bar for a smooth canvas.'],
        ['03', 'Hydrate', 'Press in the Hyaluronic Serum to lock in moisture.'],
        ['04', 'Glow', 'Sweep on Golden Hour Glow for a sun-kissed shimmer.'],
        ['05', 'Set', 'Finish with a dusting of Pearl Veil for luminosity.'],
      ],
    },

    sustainabilityIntro:
      'Golden Hour Glow is bottled in recyclable glass and packed in cartons made from FSC-certified paper — so your glow leaves nothing behind.',

    reviewCards: [
      { name: 'Tara M.', age: '25 - 34', skin: 'Dullness', type: 'Normal', fav: 'Golden glow, Amber scent', title: 'Bottled sunshine', body: 'This gives the most gorgeous golden sheen — like permanent golden hour. A drop on my collarbone and shoulders and I’m glowing.', when: '5 hours ago' },
      { name: 'Naomi A.', age: '18 - 24', skin: 'Dryness', type: 'Dry', fav: 'Buildable shimmer, Non-greasy, Glow', title: 'My summer staple', body: 'Soaks in fast, never greasy, and the shimmer is buildable. The amber-coconut scent is unreal. Already on my second bottle.', when: '2 days ago' },
    ],

    related: [
      { category: 'bare', image: '/Products%20/Bare/Bare%20vanilla%20glow%20oil.png', name: 'Bare Vanilla Glow Oil', description: 'Weightless glow, sun-kissed skin', price: 28.0, href: '/products/bare-vanilla-glow-oil' },
      { category: 'pearl', image: '/Products%20/Pearl/Pearl%20Veil.png', name: 'Pearl Veil', description: 'Luminous skin tint & veil', price: 35.0, href: '/products/pearl-veil' },
      { category: 'sunset', image: '/Products%20/Sunset/Sunset%20glow%20.png', name: 'Sunset Glow', description: 'Warm bronzing shimmer', price: 30.0, href: '/products/sunset-glow' },
      { category: 'glow', image: '/Products%20/Glow%20polish%20bar/glow%20polish%20bar%20.png', name: 'Glow Polish Bar', description: 'Exfoliating glow ritual', price: 12.99, href: '/products/glow-polish-bar' },
    ],
  },

  /* ========================== PEARL VEIL ========================= */
  'pearl-veil': {
    slug: 'pearl-veil',
    shortName: 'Pearl Veil',
    titleLines: ['pearl', 'veil'],
    recapTitle: 'pearl veil',
    subtitle: 'Luminous Body Veil',
    scent: 'Vanilla Sugar',
    price: 35.0,
    salePrice: PRICES['pearl-veil'],
    rating: 4.9,
    reviews: 980,
    tagline: 'Luminous, pearl-lit skin',
    ctaLabel: 'Buy Pearl Veil',

    description:
      'A weightless body veil that wraps skin in a soft, pearl-lit shimmer. Squalane and vitamin E nourish and illuminate while fine pearl mica leaves a luminous, lit-from-within finish.',

    benefits: [
      'Wraps skin in a soft, buildable pearl shimmer.',
      'Nourishes with squalane & vitamin E for a supple finish.',
      'Leaves a luminous, lit-from-within veil — never glittery.',
      'Alcohol-free & non-drying, so skin stays soft and comfortable.',
      'Scented in warm Vanilla Sugar for an all-day skin perfume.',
    ],
    application:
      'Sweep a few drops over the high points of clean skin — cheekbones, collarbone, shoulders and légs. Warm between palms, then press in for a soft, pearl-lit veil. Build for more shimmer, or layer over moisturiser as your last step.',
    ingredients:
      'Squalane, Caprylic/Capric Triglyceride, Mica, Vitamin E (Tocopherol), Sweet Almond Oil, Jojoba Seed Oil, Vanilla Planifolia Fruit Extract, Meadowfoam Seed Oil. Alcohol-free, vegan, cruelty-free, halal-certified and dermatologically tested.',

    images: {
      hero: '/Products%20/Pearl/pearl%20model.png',
      dramatic: '/Products%20/Pearl/pearl%20dramatic.png',
      glaze: '/Products%20/Pearl/pearl-veil-glaze.png',
      box: '/images/secondy%20hero%203.png',
      results: '/images/glowwithus%20cake%20png.png',
      recap: '/Products%20/Pearl/pearl-veil-results.png',
      recapFit: 'cover',
      faq: '/images/glowwithus%20updated.png',
      tray: '/RECENT.png',
      thumb: '/Products%20/Pearl/Pearl%20Veil.png',
    },

    editorial: { emph1: 'LUMINOUS', noun: 'veil', emph2: 'PEARL-LIT RADIANCE', glowWord: 'GLOW' },
    goodFor:
      'All skin tones and types. Body, décolletage, shoulders and cheekbones — anywhere you want a soft, pearl-lit glow.',
    specRows: [
      ['Feels like', 'A silky, weightless shimmer veil'],
      ['Smells like', 'Soft vanilla sugar & musk'],
      ['FYI', 'Alcohol-free · Non-greasy · Buildable shimmer · Vegan'],
    ],

    glazeWords: ['luminosity', 'suppleness', 'glow'],
    applicationStep:
      'Sweep a few drops over the high points — cheekbones, collarbone and shoulders — for a soft pearl glow.',

    whatsInside: {
      intro:
        'Get to know the light-reflecting oils and minerals that give skin a soft, pearl-lit glow.',
      items: [
        ['squalane', 'A weightless plant oil that drenches skin in moisture for a soft, supple finish.'],
        ['pearl mica', 'Ultra-fine, light-reflecting minerals that lend a soft, pearlescent veil of glow.'],
        ['vanilla sugar', 'A warm, gourmand veil of scent that lingers as an all-day skin perfume.'],
      ],
      footnote: 'Also made with JOJOBA OIL, VITAMIN E & MEADOWFOAM SEED.',
    },

    results: {
      stats: [
        ['96%', 'agreed skin looked instantly luminous'],
        ['95%', 'agreed skin felt soft, not greasy'],
        ['93%', 'agreed it gave a soft, pearl-lit glow'],
        ['92%', 'agreed the glow lasted all day'],
      ],
    },

    recapRows: [
      ['Benefits', 'A buildable pearl shimmer that nourishes and softly illuminates skin.'],
      ['Where it fits in your routine', 'The finishing step — over moisturiser, day or night.'],
      ['The effect', 'Soft, pearl-lit radiance with a luminous veil.'],
      ['Key ingredients', 'Squalane · Pearl Mica · Vitamin E · Vanilla Sugar'],
    ],

    faq: [
      ['How buildable is the pearl shimmer?', 'Very — layer one drop for a subtle veil, or build it up for a high-shine pearl glow.'],
      ['Will it transfer onto clothes?', 'It absorbs to a soft, dry-touch finish; allow a moment to set before dressing.'],
      ['What skin tones does it suit?', 'All of them — the pearl mica gives a soft luminous veil rather than a colour.'],
      ['Is it non-comedogenic?', 'Yes, and suitable for body and sensitive skin.'],
      ['Is it vegan and cruelty-free?', 'Always. Every SHYNE formula is 100% vegan and never tested on animals.'],
      ['Is it halal?', 'Yes — Pearl Veil is halal-certified and alcohol-free.'],
    ],

    routine: {
      activeIndex: 4,
      steps: [
        ['01', 'Cleanse', 'Start fresh with clean, dry skin.'],
        ['02', 'Polish', 'Buff with the Glow Polish Bar for a smooth canvas.'],
        ['03', 'Hydrate', 'Press in the Hyaluronic Serum to lock in moisture.'],
        ['04', 'Glaze', 'Smooth on a SHYNE Glow Oil for instant radiance.'],
        ['05', 'Veil', 'Finish with Pearl Veil for a soft, pearl-lit glow.'],
      ],
    },

    sustainabilityIntro:
      'Pearl Veil is bottled in recyclable glass and packed in cartons made from FSC-certified paper — so your glow leaves nothing behind.',

    reviewCards: [
      { name: 'Sofia R.', age: '25 - 34', skin: 'Dullness', type: 'Normal', fav: 'Pearl glow, Lightweight', title: 'Lit-from-within', body: 'The prettiest pearl sheen — subtle but so luminous. My shoulders and collarbone look incredible in the evening light.', when: '4 hours ago' },
      { name: 'Imani T.', age: '18 - 24', skin: 'Texture', type: 'Combination', fav: 'Buildable shimmer, Non-greasy', title: 'Soft glam in a bottle', body: 'Builds beautifully without ever looking glittery. Soaks in fast and the vanilla scent is lovely.', when: '1 day ago' },
    ],

    related: [
      { category: 'golden', image: '/Products%20/Golden%20hour%20/Golden%20hour%20glow%20.png', name: 'Golden Hour Glow', description: 'Radiant golden elixir', price: 32.0, href: '/products/golden-hour-glow' },
      { category: 'sunset', image: '/Products%20/Sunset/Sunset%20glow%20.png', name: 'Sunset Glow', description: 'Warm bronzing shimmer', price: 30.0, href: '/products/sunset-glow' },
      { category: 'bare', image: '/Products%20/Bare/Bare%20vanilla%20glow%20oil.png', name: 'Bare Vanilla Glow Oil', description: 'Weightless glow, sun-kissed skin', price: 28.0, href: '/products/bare-vanilla-glow-oil' },
      { category: 'glow', image: '/Products%20/Glow%20polish%20bar/glow%20polish%20bar%20.png', name: 'Glow Polish Bar', description: 'Exfoliating glow ritual', price: 12.99, href: '/products/glow-polish-bar' },
    ],
  },

  /* ========================= SUNSET GLOW ========================= */
  'sunset-glow': {
    slug: 'sunset-glow',
    shortName: 'Sunset Glow',
    titleLines: ['sunset', 'glow'],
    recapTitle: 'sunset glow',
    subtitle: 'Bronzing Body Glaze',
    scent: 'Coconut & Amber',
    price: 30.0,
    salePrice: PRICES['sunset-glow'],
    rating: 4.8,
    reviews: 760,
    tagline: 'Warm bronze, sun-kissed shimmer',
    ctaLabel: 'Buy Sunset Glow',

    description:
      'A sun-kissed body glaze that washes skin in a warm, buildable bronze shimmer. Squalane and coconut nourish while bronze mica leaves a natural, glowing finish.',

    benefits: [
      'Washes skin in a warm, buildable bronze shimmer.',
      'Nourishes with squalane & coconut for a supple finish.',
      'Leaves a natural, sun-kissed glow — never streaky.',
      'Alcohol-free, non-greasy and washes off easily.',
      'Scented in warm coconut & amber for a tropical glow.',
    ],
    application:
      'Warm 2–3 drops between palms and sweep over arms, légs, collarbone and shoulders. Build for a deeper bronze, or keep it sheer for a hint of warmth. Wash off at the end of the day.',
    ingredients:
      'Squalane, Caprylic/Capric Triglyceride, Mica, Vitamin E (Tocopherol), Coconut Oil, Jojoba Seed Oil, Amber Extract, Meadowfoam Seed Oil. Alcohol-free, vegan, cruelty-free, halal-certified and dermatologically tested.',

    images: {
      hero: '/Products%20/Sunset/bronz%20model.png',
      dramatic: '/Products%20/Sunset/sunset%20dramatic.png',
      glaze: '/Products%20/Sunset/sunset-glaze.png',
      box: '/images/secondy%20hero%203.png',
      results: '/images/SITTING%20PHOTO.png',
      recap: '/Products%20/Sunset/sunset-recap.png',
      recapFit: 'cover',
      faq: '/images/glowwithus%20updated.png',
      tray: '/RECENT.png',
      thumb: '/Products%20/Sunset/Sunset%20glow%20.png',
    },

    editorial: { emph1: 'SUN-KISSED', noun: 'glaze', emph2: 'BRONZED RADIANCE', glowWord: 'GLOW' },
    goodFor:
      'All skin tones and types. Body, légs, arms and collarbone — for a warm, bronzed, sun-kissed finish.',
    specRows: [
      ['Feels like', 'A silky, fast-absorbing bronze oil'],
      ['Smells like', 'Warm coconut & amber'],
      ['FYI', 'Alcohol-free · Non-greasy · Buildable shimmer · Vegan'],
    ],

    glazeWords: ['warmth', 'radiance', 'glow'],
    applicationStep:
      'Warm 2–3 drops between palms and sweep over arms, légs and collarbone for a bronzed glow.',

    whatsInside: {
      intro:
        'Get to know the light-reflecting oils and minerals that give skin a warm, bronzed glow.',
      items: [
        ['squalane', 'A weightless plant oil that drenches skin in moisture for a soft, supple finish.'],
        ['bronze mica', 'Ultra-fine, light-reflecting minerals that lend a sheer, sun-kissed bronze shimmer.'],
        ['coconut & amber', 'Nourishing, antioxidant-rich oils with a warm, tropical scent.'],
      ],
      footnote: 'Also made with JOJOBA OIL, VITAMIN E & MEADOWFOAM SEED.',
    },

    results: {
      stats: [
        ['97%', 'agreed skin looked instantly bronzed'],
        ['95%', 'agreed skin felt soft, not greasy'],
        ['94%', 'agreed it gave a warm, sun-kissed glow'],
        ['92%', 'agreed the colour looked natural'],
      ],
    },

    recapRows: [
      ['Benefits', 'A buildable bronze shimmer that nourishes and warms skin tone.'],
      ['Where it fits in your routine', 'The finishing step — over moisturiser, day or night.'],
      ['The effect', 'Warm, sun-kissed radiance with a soft bronze glow.'],
      ['Key ingredients', 'Squalane · Bronze Mica · Coconut · Amber'],
    ],

    faq: [
      ['Does it stain clothes or sheets?', 'No — it dries down to a soft finish and washes off easily; let it set before dressing.'],
      ['Is the bronze buildable?', 'Yes — sheer for a hint of warmth, or layer for a deeper sun-kissed bronze.'],
      ['Is it a self-tanner?', 'No, it’s a wash-off shimmer glaze — instant glow with no developing colour.'],
      ['Is it non-comedogenic?', 'Yes, and suitable for body and sensitive skin.'],
      ['Is it vegan and cruelty-free?', 'Always. Every SHYNE formula is 100% vegan and never tested on animals.'],
      ['Is it halal?', 'Yes — Sunset Glow is halal-certified and alcohol-free.'],
    ],

    routine: {
      activeIndex: 3,
      steps: [
        ['01', 'Cleanse', 'Start fresh with clean, dry skin.'],
        ['02', 'Polish', 'Buff with the Glow Polish Bar for a smooth canvas.'],
        ['03', 'Hydrate', 'Press in the Hyaluronic Serum to lock in moisture.'],
        ['04', 'Bronze', 'Sweep on Sunset Glow for a warm, sun-kissed bronze.'],
        ['05', 'Set', 'Finish with a dusting of Pearl Veil for luminosity.'],
      ],
    },

    sustainabilityIntro:
      'Sunset Glow is bottled in recyclable glass and packed in cartons made from FSC-certified paper — so your glow leaves nothing behind.',

    reviewCards: [
      { name: 'Zara N.', age: '25 - 34', skin: 'Dullness', type: 'Dry', fav: 'Natural bronze, Coconut scent', title: 'Instant holiday skin', body: 'Gives the most natural sun-kissed bronze — no orange, no streaks. Smells like a tropical holiday too.', when: '7 hours ago' },
      { name: 'Leah M.', age: '18 - 24', skin: 'Texture', type: 'Combination', fav: 'Buildable, Non-greasy, Glow', title: 'My going-out essential', body: 'A few drops on my légs and arms and I’m glowing. Washes off easily, never stains my clothes.', when: '2 days ago' },
    ],

    related: [
      { category: 'golden', image: '/Products%20/Golden%20hour%20/Golden%20hour%20glow%20.png', name: 'Golden Hour Glow', description: 'Radiant golden elixir', price: 32.0, href: '/products/golden-hour-glow' },
      { category: 'pearl', image: '/Products%20/Pearl/Pearl%20Veil.png', name: 'Pearl Veil', description: 'Luminous skin tint & veil', price: 35.0, href: '/products/pearl-veil' },
      { category: 'bare', image: '/Products%20/Bare/Bare%20vanilla%20glow%20oil.png', name: 'Bare Vanilla Glow Oil', description: 'Weightless glow, sun-kissed skin', price: 28.0, href: '/products/bare-vanilla-glow-oil' },
      { category: 'glow', image: '/Products%20/Glow%20polish%20bar/glow%20polish%20bar%20.png', name: 'Glow Polish Bar', description: 'Exfoliating glow ritual', price: 12.99, href: '/products/glow-polish-bar' },
    ],
  },

  /* ============== HYDRATING HYALURONIC ACID SERUM =============== */
  'hydrating-hyaluronic-acid-serum': {
    slug: 'hydrating-hyaluronic-acid-serum',
    shortName: 'Hydrating Hyaluronic Acid Serum',
    titleLines: ['hyaluronic', 'glow serum'],
    recapTitle: 'hyaluronic glow serum',
    subtitle: 'Hydrating Glow Serum',
    scent: 'Fragrance-Free',
    price: 26.0,
    salePrice: PRICES['hydrating-hyaluronic-acid-serum'],
    rating: 4.9,
    reviews: 1420,
    tagline: 'Deep hydration, dewy glow',
    ctaLabel: 'Buy Serum',

    description:
      'A weightless hydrating serum that plumps, quenches and brightens. Hyaluronic acid and glycerin flood skin with moisture while vitamin C and aloe vera even tone and soothe.',

    benefits: [
      'Floods skin with lasting, weightless hydration.',
      'Plumps and smooths the look of fine, dehydrated lines.',
      'Brightens and evens tone with vitamin C.',
      'Soothes and calms with aloe vera — fragrance-free.',
      'Layers perfectly under moisturiser, morning and night.',
    ],
    application:
      'Press 3–4 drops into clean, damp skin morning and night, then seal with your moisturiser. Use on face, neck and anywhere skin feels dry or dull.',
    ingredients:
      'Hyaluronic Acid, Glycerin, Vitamin C (Ascorbic Acid), Vitamin E Oil (Tocopherol), Aloe Vera Leaf Gel. Alcohol-free, fragrance-free, vegan, cruelty-free, halal-certified and dermatologically tested.',

    images: {
      hero: '/Products%20/Hydro-gel/hydo%20gel%20model.png',
      dramatic: '/Products%20/Hydro-gel/hydro%20dramatic.png',
      glaze: '/Products%20/Hydro-gel/hyaluronic-glaze.png',
      box: '/images/secondy%20hero%203.png',
      results: '/Products%20/Hydro-gel/hyaluronic-results.png',
      recap: '/Products%20/Hydro-gel/hyaluronic-recap.png',
      recapFit: 'cover',
      faq: '/images/glowwithus%20updated.png',
      tray: '/RECENT.png',
      thumb: '/Products%20/Hydro-gel/hydo%20gel.png',
    },

    editorial: { emph1: 'WEIGHTLESS', noun: 'serum', emph2: 'DEEP HYDRATION', glowWord: 'GLOW' },
    goodFor:
      'All skin types, including dry, dehydrated and sensitive skin. Face, neck and body.',
    specRows: [
      ['Feels like', 'A cool, weightless hydrating gel'],
      ['Smells like', 'Fragrance-free, clean & fresh'],
      ['FYI', 'Alcohol-free · Non-comedogenic · Fragrance-free · Vegan'],
    ],

    glazeWords: ['hydration', 'plumpness', 'glow'],
    applicationStep:
      'Press 3–4 drops into clean, damp skin morning and night, then layer your moisturiser on top.',

    whatsInside: {
      intro: 'Get to know the hydrating, brightening actives that plump and quench skin.',
      items: [
        ['hyaluronic acid', 'Holds up to 1,000× its weight in water to plump and deeply hydrate skin.'],
        ['vitamin c + e', 'A brightening, antioxidant duo that evens tone and protects against dullness.'],
        ['aloe vera + glycerin', 'Soothing, humectant gel that calms and locks in lasting moisture.'],
      ],
      footnote: 'Fragrance-free, alcohol-free and suitable for sensitive skin.',
    },

    results: {
      stats: [
        ['97%', 'agreed skin felt instantly hydrated'],
        ['95%', 'agreed skin looked plumper'],
        ['93%', 'agreed skin looked brighter and more even'],
        ['91%', 'agreed skin felt softer for 24 hours'],
      ],
    },

    recapRows: [
      ['Benefits', 'Deeply hydrates, plumps and brightens for a dewy, healthy glow.'],
      ['Where it fits in your routine', 'After cleansing — on damp skin, before moisturiser.'],
      ['The effect', 'Plump, quenched, lit-from-within skin.'],
      ['Key ingredients', 'Hyaluronic Acid · Vitamin C · Vitamin E · Aloe Vera'],
    ],

    faq: [
      ['When should I use it in my routine?', 'After cleansing, on damp skin and before moisturiser — morning and night.'],
      ['Can I use vitamin C and hyaluronic acid together?', 'Yes — this serum pairs them with glycerin and aloe to brighten while it hydrates.'],
      ['Is it suitable for sensitive skin?', 'Yes — it’s fragrance-free, alcohol-free and soothed with aloe vera.'],
      ['Can I use it on my body?', 'Absolutely — use it on face, neck and anywhere skin feels dry or dull.'],
      ['Is it vegan and cruelty-free?', 'Always. Every SHYNE formula is 100% vegan and never tested on animals.'],
      ['Is it halal?', 'Yes — the Hydrating Hyaluronic Acid Serum is halal-certified and alcohol-free.'],
    ],

    routine: {
      activeIndex: 2,
      steps: [
        ['01', 'Cleanse', 'Start fresh with clean skin.'],
        ['02', 'Polish', 'Buff with the Glow Polish Bar for a smooth canvas.'],
        ['03', 'Hydrate', 'Press in the Hyaluronic Acid Serum to plump and quench skin.'],
        ['04', 'Glaze', 'Smooth on a SHYNE Glow Oil for instant radiance.'],
        ['05', 'Set', 'Finish with a dusting of Pearl Veil for luminosity.'],
      ],
    },

    sustainabilityIntro:
      'The Hydrating Hyaluronic Acid Serum is bottled in recyclable glass and packed in cartons made from FSC-certified paper — so your glow leaves nothing behind.',

    reviewCards: [
      { name: 'Priya S.', age: '25 - 34', skin: 'Dehydration', type: 'Dry', fav: 'Hydration, Plumping, Brightening', title: 'Plump and dewy', body: 'My skin drinks this up. Visibly plumper and brighter within a week, and it layers perfectly under moisturiser.', when: '3 hours ago' },
      { name: 'Chloe B.', age: '35 - 44', skin: 'Dullness', type: 'Sensitive', fav: 'Fragrance-free, Soothing', title: 'Gentle and effective', body: 'Fragrance-free and so soothing with the aloe. The vitamin C has really evened out my tone.', when: '1 day ago' },
    ],

    related: [
      { category: 'bare', image: '/Products%20/Bare/Bare%20vanilla%20glow%20oil.png', name: 'Bare Vanilla Glow Oil', description: 'Weightless glow, sun-kissed skin', price: 28.0, href: '/products/bare-vanilla-glow-oil' },
      { category: 'glow', image: '/Products%20/Glow%20polish%20bar/glow%20polish%20bar%20.png', name: 'Glow Polish Bar', description: 'Exfoliating glow ritual', price: 22.0, href: '/products/glow-polish-bar' },
      { category: 'golden', image: '/Products%20/Golden%20hour%20/Golden%20hour%20glow%20.png', name: 'Golden Hour Glow', description: 'Radiant golden elixir', price: 32.0, href: '/products/golden-hour-glow' },
    ],
  },

  /* ========================= GLOW POLISH BAR ===================== */
  'glow-polish-bar': {
    slug: 'glow-polish-bar',
    shortName: 'Glow Polish Bar',
    titleLines: ['glow polish', 'bar'],
    recapTitle: 'glow polish bar',
    subtitle: 'Soft Exfoliating Bar',
    scent: 'Earthy & Fresh',
    price: 22.0,
    salePrice: PRICES['glow-polish-bar'],
    rating: 4.7,
    reviews: 612,
    tagline: 'Smooth, polished, glowing skin',
    ctaLabel: 'Buy Glow Bar',

    description:
      'A soft exfoliating cleansing bar powered by original African black soap and vitamin C. It gently polishes away dullness and reveals smoother, brighter, glowing skin.',

    benefits: [
      'Gently exfoliates away dullness and rough texture.',
      'Brightens and evens skin tone with vitamin C.',
      'Cleanses without stripping — shea-soft, never tight.',
      'Powered by original African black soap.',
      'Smooths skin for a polished, glowing finish.',
    ],
    application:
      'Wet the bar and work into a soft lather, then massage over damp skin in gentle circular motions. Rinse well. Use 2–3 times a week, or daily as your skin allows. Follow with the Hydrating Serum.',
    ingredients:
      'Original African Black Soap (Plantain Skin Ash, Shea Butter, Cocoa Pod, Palm Kernel Oil), Vitamin C (Ascorbic Acid), Coconut Oil, Shea Butter. A soft exfoliating cleansing bar. Vegan, cruelty-free, halal-certified and dermatologically tested.',

    images: {
      hero: '/Products%20/Glow%20polish%20bar/glow%20polish%20bar%20model.png',
      dramatic: '/Products%20/Glow%20polish%20bar/glow%20polish%20dramatic.png',
      glaze: '/Products%20/Glow%20polish%20bar/glow-polish-glaze.jpeg',
      box: '/images/secondy%20hero%203.png',
      results: '/Products%20/Glow%20polish%20bar/glow-polish-results.png',
      recap: '/Products%20/Glow%20polish%20bar/glow%20polish%20bar%20.png',
      recapFit: 'contain',
      faq: '/images/glowwithus%20updated.png',
      tray: '/RECENT.png',
      thumb: '/Products%20/Glow%20polish%20bar/glow%20polish%20bar%20.png',
    },

    editorial: { emph1: 'GENTLE', noun: 'polish', emph2: 'SMOOTH, RENEWED SKIN', glowWord: 'GLOW' },
    goodFor:
      'All skin types, including dull, rough or congested skin. Body and hands — gentle enough for regular use.',
    specRows: [
      ['Feels like', 'A creamy, gently exfoliating lather'],
      ['Smells like', 'Earthy African black soap'],
      ['FYI', 'Sulphate-free · Soft exfoliation · Regular use · Vegan'],
    ],

    glazeWords: ['smoothness', 'renewal', 'glow'],
    applicationStep:
      'Lather over damp skin in gentle circular motions, then rinse — 2–3 times a week or as needed.',

    whatsInside: {
      intro: 'Get to know the gentle, brightening ingredients that polish skin smooth.',
      items: [
        ['african black soap', 'A traditional West African cleanser that gently lifts away dullness and impurities.'],
        ['vitamin c', 'Brightens and evens skin tone for a renewed, healthy glow.'],
        ['shea butter', 'Rich, conditioning butter that softens and nourishes as you cleanse.'],
      ],
      footnote: 'Also made with COCONUT OIL & PLANTAIN ASH. Sulphate-free.',
    },

    results: {
      stats: [
        ['95%', 'agreed skin felt instantly smoother'],
        ['94%', 'agreed skin looked brighter'],
        ['92%', 'agreed skin felt cleansed, not stripped'],
        ['90%', 'agreed skin looked more even over time'],
      ],
    },

    recapRows: [
      ['Benefits', 'Gently exfoliates, brightens and softens for smoother, glowing skin.'],
      ['Where it fits in your routine', 'In the shower — 2–3 times a week or daily as needed.'],
      ['The effect', 'Smooth, polished, renewed skin.'],
      ['Key ingredients', 'African Black Soap · Vitamin C · Shea Butter'],
    ],

    faq: [
      ['How often should I use it?', '2–3 times a week for most skin, or daily if your skin tolerates it well.'],
      ['Is the exfoliation harsh?', 'No — it’s a soft, gentle polish from natural African black soap, not a gritty scrub.'],
      ['Can I use it on my face?', 'Yes, gently — it’s mild enough for face and body. Follow with the Hydrating Serum.'],
      ['Does it dry out skin?', 'No — shea butter and coconut oil cleanse without stripping or tightness.'],
      ['Is it vegan and cruelty-free?', 'Always. Every SHYNE formula is 100% vegan and never tested on animals.'],
      ['Is it halal?', 'Yes — the Glow Polish Bar is halal-certified.'],
    ],

    routine: {
      activeIndex: 1,
      steps: [
        ['01', 'Cleanse', 'Start fresh with clean, damp skin.'],
        ['02', 'Polish', 'Buff with the Glow Polish Bar for a smooth, bright canvas.'],
        ['03', 'Hydrate', 'Press in the Hyaluronic Serum to lock in moisture.'],
        ['04', 'Glaze', 'Smooth on a SHYNE Glow Oil for instant radiance.'],
        ['05', 'Set', 'Finish with a dusting of Pearl Veil for luminosity.'],
      ],
    },

    sustainabilityIntro:
      'The Glow Polish Bar is a plastic-free cleansing bar, wrapped and boxed in FSC-certified paper — so your glow leaves nothing behind.',
    sustainabilityParts: [
      ['Bar', 'Plastic-free, naked cleansing bar'],
      ['Wrap', 'Recyclable FSC-certified paper wrap'],
      ['Carton', '100% FSC-certified recycled paper'],
    ],

    reviewCards: [
      { name: 'Amaka E.', age: '25 - 34', skin: 'Roughness', type: 'Combination', fav: 'Smoothing, Brightening, Gentle', title: 'Smoothest skin ever', body: 'African black soap is a classic for a reason. Gentle exfoliation, brighter skin, and zero tightness after.', when: '6 hours ago' },
      { name: 'Hannah K.', age: '18 - 24', skin: 'Congestion', type: 'Oily', fav: 'Cleansing, Soft exfoliation', title: 'Bye bye bumps', body: 'Cleared up the texture on my arms in two weeks. Lathers beautifully and the bar lasts ages.', when: '3 days ago' },
    ],

    related: [
      { category: 'hydro', image: '/Products%20/Hydro-gel/hydo%20gel.png', name: 'Hydrating Hyaluronic Acid Serum', description: 'Deep hydration, dewy finish', price: 26.0, href: '/products/hydrating-hyaluronic-acid-serum' },
      { category: 'bare', image: '/Products%20/Bare/Bare%20vanilla%20glow%20oil.png', name: 'Bare Vanilla Glow Oil', description: 'Weightless glow, sun-kissed skin', price: 28.0, href: '/products/bare-vanilla-glow-oil' },
      { category: 'golden', image: '/Products%20/Golden%20hour%20/Golden%20hour%20glow%20.png', name: 'Golden Hour Glow', description: 'Radiant golden elixir', price: 32.0, href: '/products/golden-hour-glow' },
    ],
  },
};

export default products;
