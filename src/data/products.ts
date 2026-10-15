import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1:- DASHAIN - आयो ! Collection (Image 1)
  {
    id: 'mori-ishani-blue',
    name: 'Ishani Set ( Royal Blue )',
    nepaliName: 'ईशानी सेट ( रोयल ब्लू )',
    price: 4950,
    originalPrice: 6500,
    discountPercent: 24,
    gender: 'women',
    category: 'Festive Suits',
    isBestSeller: true,
    isDashainSpecial: true,
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1583391733975-088dd9fa7182?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1583391733975-088dd9fa7182?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Signature royal cobalt blue pure chiffon layered peplum kurti with flared palazzo pants and matching dupatta.',
    details: [
      'Pure lightweight micro-chiffon with premium soft mulmul lining',
      'Front slit button placket with double layered asymmetrical peplum silhouette',
      'High-waist flowy palazzo bottoms with elasticated back',
      'Includes matching royal blue chiffon dupatta'
    ],
    materials: 'Micro-Chiffon with 100% Breathable Cotton Voile Inner',
    sizeAndFit: 'Regular fit. Model is 5\'7" wearing size S.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Royal Blue', hex: '#1d4ed8' },
      { name: 'Midnight Navy', hex: '#1e3a8a' }
    ],
    tags: ['Dashain Reloaded', 'Ishani Set', 'Royal Blue', 'Festive Edit'],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Pooja Thapa',
        rating: 5,
        date: '3 days ago',
        comment: 'Color is so royal and photography was identical to the picture. Perfect for Dashain family gathering!',
        verified: true,
        location: 'Kathmandu'
      }
    ]
  },
  {
    id: 'mori-ishani-wine',
    name: 'Ishani Set ( Wine )',
    nepaliName: 'ईशानी सेट ( वाइन रातो )',
    price: 4950,
    originalPrice: 6500,
    discountPercent: 24,
    gender: 'women',
    category: 'Festive Suits',
    isBestSeller: true,
    isDashainSpecial: true,
    inStock: true,
    stockCount: 14,
    rating: 5.0,
    reviewCount: 168,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Festive wine deep crimson red layered suit with flowy palazzo and dupatta, crafted specifically for Dashain Tika rituals.',
    details: [
      'Deep wine red pure georgette fabric that drapes effortlessly',
      'Button placket with front vent and sheer georgette sleeves',
      'Flared wide-leg palazzo pants with comfortable waistband',
      'Breathable inner lining prevents transparency and gives all-day ease'
    ],
    materials: 'Pure Georgette with Cotton Voile Lining',
    sizeAndFit: 'Flattering relaxed fit. Model is 5\'7" wearing size S.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Wine Red', hex: '#991b1b' },
      { name: 'Crimson', hex: '#b91c1c' }
    ],
    tags: ['Dashain Reloaded', 'Ishani Set', 'Wine Red', 'Tika Special'],
    reviews: [
      {
        id: 'rev-2',
        userName: 'Smarika Gurung',
        rating: 5,
        date: '1 week ago',
        comment: 'The wine red hue matches Nepal Dashain tika perfectly. Super comfy!',
        verified: true,
        location: 'Lalitpur'
      }
    ]
  },
  {
    id: 'mori-saanvi-pink',
    name: 'Saanvi ( Baby Pink )',
    nepaliName: 'सान्भी ( बेबी पिङ्क )',
    price: 4250,
    originalPrice: 5800,
    discountPercent: 27,
    gender: 'women',
    category: 'Anarkali',
    isBestSeller: true,
    isDashainSpecial: true,
    inStock: true,
    stockCount: 11,
    rating: 4.8,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Sleeveless baby pink square neck festive frock anarkali with delicate silver border and flowy dupatta.',
    details: [
      'Contemporary square neckline with sleeveless cut',
      'Floor-skimming flared flare with silver gota border',
      'Includes sheer pink chiffon dupatta with beaded tassels',
      'Ultra-soft breathable cotton-silk blend'
    ],
    materials: 'Chanderi Silk & Mulmul Lining',
    sizeAndFit: 'A-line silhouette. Model is 5\'8" wearing size S.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Baby Pink', hex: '#f472b6' },
      { name: 'Soft Rose', hex: '#fbcfe8' }
    ],
    tags: ['Dashain Reloaded', 'Saanvi', 'Baby Pink', 'Youth Favorite'],
    reviews: []
  },
  {
    id: 'mori-ved-white',
    name: 'VED – (WHITE)',
    nepaliName: 'वेद - सेतो पुरुष कुर्ता',
    price: 3650,
    originalPrice: 4800,
    discountPercent: 24,
    gender: 'men',
    category: 'Kurtas',
    isBestSeller: true,
    isDashainSpecial: true,
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1621786030684-4c64829cff04?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Classic pristine white pure cotton chikankari embroidered long kurta with mandarin band collar.',
    details: [
      '100% Combed Khadi Cotton with intricate tone-on-tone embroidery',
      'Mandarin collar with neat hidden placket',
      'Comes with tailored white cotton pyjama trousers',
      'Crisp, pre-washed, and breathable fabric'
    ],
    materials: '100% Pure Khadi Cotton',
    sizeAndFit: 'Straight tailored fit. Model is 5\'11" wearing size L.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure White', hex: '#fafafa' },
      { name: 'Ivory Cream', hex: '#fef3c7' }
    ],
    tags: ['Dashain Reloaded', 'VED Collection', 'White Kurta', 'Men Traditional'],
    reviews: []
  },

  // 2:- !Sale Collection (Image 2)
  {
    id: 'mori-sale-enaya',
    name: 'Enaya ( Halter Top )',
    nepaliName: 'इनाया ( हाल्टर टप )',
    price: 1850,
    originalPrice: 2470,
    discountPercent: 25,
    gender: 'women',
    category: 'Tops',
    isBestSeller: false,
    isDashainSpecial: false,
    inStock: true,
    stockCount: 12,
    rating: 4.7,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Charming floral printed halter neck top with flattering side slits, pairs effortlessly with high-waist denim.',
    details: [
      'Vibrant hand-block inspired floral print on pure cotton',
      'Adjustable neck tie cord for custom fit',
      'Subtle A-line flare at waistline'
    ],
    materials: '100% Breathable Soft Cotton',
    sizeAndFit: 'True to size. Model is 5\'6" wearing size S.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Floral Coral', hex: '#fb7185' }],
    tags: ['Sale', '25% OFF', 'Halter Top', 'Enaya'],
    reviews: []
  },
  {
    id: 'mori-sale-rina',
    name: 'Rina ( Halter Neck Kurti )',
    nepaliName: 'रिना ( हाल्टर नेक कुर्ती )',
    price: 1490,
    originalPrice: 2980,
    discountPercent: 50,
    gender: 'women',
    category: 'Kurtas',
    isBestSeller: true,
    isDashainSpecial: false,
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Deep royal indigo blue batik patterned halter neck short kurti with bold side vents and comfortable cut.',
    details: [
      'Hand-printed Indigo batik motifs on mulmul',
      'Side slits for effortless pairing with white linen trousers',
      'Deep V halter neckline with secure clasp'
    ],
    materials: 'Pure Hand-dyed Cotton Batik',
    sizeAndFit: 'Regular fit. Model is 5\'5" wearing size M.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Indigo Batik Blue', hex: '#1e3a8a' }],
    tags: ['Mega Sale', '50% OFF', 'Rina', 'Kurti'],
    reviews: []
  },
  {
    id: 'mori-sale-kaylie',
    name: 'Kaylie (Long Black)',
    nepaliName: 'केली ( लामो कालो कुर्ती )',
    price: 2650,
    originalPrice: 3530,
    discountPercent: 25,
    gender: 'women',
    category: 'Dresses',
    isBestSeller: false,
    isDashainSpecial: false,
    inStock: true,
    stockCount: 14,
    rating: 4.8,
    reviewCount: 45,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Sleeveless calf-length ethnic dress featuring monochrome paisley prints and straight clean side vents.',
    details: [
      'Calf-length straight cut dress',
      'Classic black & white paisley ornamental print',
      'Square neckline with wide shoulder straps'
    ],
    materials: 'Smooth Organic Cotton Crepe',
    sizeAndFit: 'Tailored regular cut. Model is 5\'7" wearing size S.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black Paisley', hex: '#18181b' }],
    tags: ['Sale', '25% OFF', 'Kaylie', 'Ethnic Dress'],
    reviews: []
  },
  {
    id: 'mori-sale-dripti',
    name: 'Dripti ( Black Floral )',
    nepaliName: 'दृप्ती ( कालो फ्लोरल )',
    price: 2450,
    originalPrice: 3260,
    discountPercent: 25,
    gender: 'women',
    category: 'Kurtas',
    isBestSeller: false,
    isDashainSpecial: false,
    inStock: true,
    stockCount: 10,
    rating: 4.7,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Long sleeve V-neck floral kurti tunic in deep black with contrast botanical vines and side vents.',
    details: [
      'Full length sleeves with subtle flared cuff',
      'Soft V-neckline with delicate piped trim',
      'Looks graceful with white palazzo or cigarette trousers'
    ],
    materials: 'Breathable Cambric Cotton',
    sizeAndFit: 'Regular fit. Model is 5\'6" wearing size S.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black Floral', hex: '#27272a' }],
    tags: ['Sale', '25% OFF', 'Dripti', 'Full Sleeve'],
    reviews: []
  },

  // 3:- BEST सेलर Collection (Image 3)
  {
    id: 'mori-best-mandala-mustard',
    name: 'Mandala ( Mustard Floral )',
    nepaliName: 'मण्डला ( मस्टर्ड फ्लोरल )',
    price: 2190,
    originalPrice: 2800,
    discountPercent: 22,
    gender: 'women',
    category: 'Tops',
    isBestSeller: true,
    isDashainSpecial: false,
    inStock: true,
    stockCount: 6,
    rating: 4.9,
    reviewCount: 108,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Festive mustard yellow floral halter top with pink botanical blossoms and tie-up neck closure.',
    details: [
      'Rich mustard ochre base with hand-painted pink flower motifs',
      'Halter silhouette that pairs seamlessly with white trousers',
      'Soft cotton lining for non-sheer comfort'
    ],
    materials: '100% Fine Mul Cotton',
    sizeAndFit: 'Slim tailored fit. Model is 5\'6" wearing size S.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Mustard Yellow', hex: '#ca8a04' }],
    tags: ['BEST सेलर', 'Mandala', 'Mustard', 'Hot Pick'],
    reviews: []
  },
  {
    id: 'mori-best-mandala-black',
    name: 'Mandala ( Black V-Line )',
    nepaliName: 'मण्डला ( ब्ल्याक भी-लाइन )',
    price: 2390,
    originalPrice: 3100,
    discountPercent: 23,
    gender: 'women',
    category: 'Kurtas',
    isBestSeller: true,
    isDashainSpecial: false,
    inStock: true,
    stockCount: 7,
    rating: 4.8,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Black monochrome paisley print tunic kurti with clean V-neck and bell sleeves, perfect for everyday festive outings.',
    details: [
      'V-neckline that flatters effortlessly',
      'Three-quarter bell sleeves with finished hems',
      'Lightweight and easy to pack for festive travel'
    ],
    materials: 'Super combed cotton',
    sizeAndFit: 'Regular fit. Model is 5\'7" wearing size S.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black V-Line', hex: '#18181b' }],
    tags: ['BEST सेलर', 'Mandala', 'Black V-Line'],
    reviews: []
  },
  {
    id: 'mori-best-maichang',
    name: 'Maichang White Floral',
    nepaliName: 'मैचाङ सेतो फ्लोरल चोली',
    price: 3490,
    originalPrice: 4500,
    discountPercent: 22,
    gender: 'women',
    category: 'Fusion Wear',
    isBestSeller: true,
    isDashainSpecial: true,
    inStock: true,
    stockCount: 5,
    rating: 5.0,
    reviewCount: 84,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Traditional Nepali wrap jacket cholo with side tie closures, artistic blue brushstroke motifs, and high mandarin collar.',
    details: [
      'Authentic Himalayan wrap design with fabric tie fastenings',
      'Soft grey and indigo mountain brushstroke pattern',
      'Structured mandarin collar for regal posture'
    ],
    materials: 'Handwoven Raw Cotton Canvas',
    sizeAndFit: 'Custom adjustable wrap fit. Model is 5\'6" wearing size S.',
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'White Indigo', hex: '#f8fafc' }],
    tags: ['BEST सेलर', 'Maichang', 'Heritage Wrap', 'Sold Out Fast'],
    reviews: []
  },
  {
    id: 'mori-best-aana',
    name: 'Aana (Shirt Kurti)',
    nepaliName: 'आना ( शर्ट कुर्ती )',
    price: 2490,
    originalPrice: 3200,
    discountPercent: 22,
    gender: 'women',
    category: 'Kurtas',
    isBestSeller: true,
    isDashainSpecial: false,
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 68,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'Contemporary sage olive green collared shirt kurti with white collar inlay and side slits.',
    details: [
      'Modern open shirt collar with contrast white inner facing',
      'Elbow sleeves and convenient side slits',
      'Earth-toned floral vine print'
    ],
    materials: 'Organic Cotton Linen',
    sizeAndFit: 'Smart casual relaxed fit. Model is 5\'7" wearing size S.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Sage Olive', hex: '#4d7c0f' }],
    tags: ['BEST सेलर', 'Aana', 'Shirt Kurti'],
    reviews: []
  },

  // 4:- CATEGORIES Specific Models (Image 4 Left: Women, Right: Men)
  {
    id: 'mori-cat-women-red',
    name: 'SD Infininov Crimson Festive Set (Women)',
    price: 4950,
    originalPrice: 6800,
    discountPercent: 27,
    gender: 'women',
    category: 'Festive Suits',
    isBestSeller: true,
    isDashainSpecial: true,
    inStock: true,
    stockCount: 12,
    rating: 5.0,
    reviewCount: 198,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'The signature crimson red buttoned kurti with flowy dupatta featured on the left of our categories section.',
    details: [
      'Pure festive crimson red georgette with soft inner lining',
      'Subtle front button vent placket and long flowy dupatta',
      'Matching flared palazzo pants'
    ],
    materials: 'Pure Georgette & Breathable Cotton Lining',
    sizeAndFit: 'Regular fit. Model is 5\'7" wearing size S.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Crimson Red', hex: '#b91c1c' }],
    tags: ['Women Category', 'Left Model', 'Dashain Signature'],
    reviews: []
  },
  {
    id: 'mori-cat-men-red',
    name: 'SD Infininov Crimson Embroidered Kurta Surwal (Men)',
    price: 3850,
    originalPrice: 5200,
    discountPercent: 26,
    gender: 'men',
    category: 'Kurtas',
    isBestSeller: true,
    isDashainSpecial: true,
    inStock: true,
    stockCount: 16,
    rating: 4.9,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1621786030684-4c64829cff04?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=900&q=85'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1621786030684-4c64829cff04?auto=format&fit=crop&w=600&q=85',
    shortDescription: 'The signature men’s red embroidered festive kurta featured on the right of our categories section.',
    details: [
      '100% fine cotton with all-over geometric floral tonal threadwork',
      'Mandarin collar with neat button placket',
      'Side pockets and classic straight cut'
    ],
    materials: '100% Khadi Cotton',
    sizeAndFit: 'Classic regular cut. Model is 5\'11" wearing size L.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Festive Red', hex: '#dc2626' }],
    tags: ['Men Category', 'Right Model', 'Dashain Special'],
    reviews: []
  }
];

export const NEPAL_REGIONS = [
  {
    province: 'Bagmati Province (बागमती प्रदेश)',
    cities: [
      {
        name: 'Kathmandu',
        areas: ['New Road', 'Durbar Marg', 'Thamel', 'Baneshwor', 'Baluwatar', 'Koteshwor', 'Maharajgunj', 'Chabahil', 'Kalanki', 'Putalisadak', 'Lazimpat']
      },
      {
        name: 'Lalitpur',
        areas: ['Patan Durbar', 'Jhamsikhel', 'Pulchowk', 'Kupondole', 'Sanepa', 'Jawalakhel', 'Satdobato', 'Kumaripati']
      },
      {
        name: 'Bhaktapur',
        areas: ['Suryabinayak', 'Durbar Square Area', 'Sallaghari', 'Thimi', 'Lokanthali', 'Kamalbinayak']
      },
      {
        name: 'Chitwan',
        areas: ['Bharatpur', 'Narayangarh', 'Ratnanagar', 'Sauraha', 'Gaindakot']
      },
      {
        name: 'Hetauda',
        areas: ['Hetauda Bazar', 'Basamadi', 'Chaugada', 'Sanopokhara']
      }
    ]
  },
  {
    province: 'Gandaki Province (गण्डकी प्रदेश)',
    cities: [
      {
        name: 'Pokhara',
        areas: ['Lakeside', 'New Road Pokhara', 'Chipledhunga', 'Mahendrapool', 'Birauta', 'Bagar', 'Prithvi Chowk']
      }
    ]
  },
  {
    province: 'Koshi Province (कोशी प्रदेश)',
    cities: [
      {
        name: 'Dharan',
        areas: ['Bhanu Chowk', 'Chhata Chowk', 'Putali Line', 'Bijayapur']
      },
      {
        name: 'Biratnagar',
        areas: ['Traffic Chowk', 'Main Road', 'Roadcess Chowk', 'Tintolia']
      }
    ]
  },
  {
    province: 'Lumbini Province (लुम्बिनी प्रदेश)',
    cities: [
      {
        name: 'Butwal',
        areas: ['Traffic Chowk', 'Golpark', 'Amarpath', 'Milanchowk', 'Kalikanagar']
      },
      {
        name: 'Nepalgunj',
        areas: ['Tribhuvan Chowk', 'Dhamboji', 'Surkhet Road', 'Bateshwar']
      }
    ]
  }
];
