const BASE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const patchCatalog = [
  { id: 'ucl', name: 'Patch Ligue des Champions', price: 2.5 },
  { id: 'league', name: 'Patch championnat', price: 2.5 },
  { id: 'winners', name: 'Badge vainqueur', price: 2.5 },
  { id: 'respect', name: 'Patch Respect UEFA', price: 2.5 },
];

const flockingOptions = [
  { id: 'none', name: 'Sans flocage', price: 0 },
  { id: 'official', name: 'Flocage joueur officiel', price: 5 },
  { id: 'custom', name: 'Flocage personnalise', price: 5 },
];

const productBlueprints = [
  {
    reference: 'PSG-DOM-2425',
    name: 'Maillot PSG Domicile 2024/2025',
    club: 'Paris Saint-Germain',
    championship: 'Ligue 1',
    country: 'France',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 94.99,
    discountPercentage: 15,
    styleTag: 'Nouveau drop',
    stockBase: 9,
    pitchLine: 'les soirs europeens au Parc',
    officialPlayers: [
      { name: 'Dembele', number: 10 },
      { name: 'Hakimi', number: 2 },
      { name: 'Vitinha', number: 17 },
    ],
    patchIds: ['league', 'ucl', 'respect'],
    colorways: [
      { id: 'bleu-nuit', name: 'Bleu nuit', primary: '#10235c', secondary: '#e13639', accent: '#f8f6ef' },
      { id: 'blanc-heritage', name: 'Blanc heritage', primary: '#f7f4ea', secondary: '#10235c', accent: '#e13639' },
    ],
  },
  {
    reference: 'OM-EXT-2425',
    name: 'Maillot OM Exterieur 2024/2025',
    club: 'Olympique de Marseille',
    championship: 'Ligue 1',
    country: 'France',
    continent: 'Europe',
    gender: 'Homme',
    type: 'Maillot exterieur',
    season: '2024/2025',
    price: 89.99,
    discountPercentage: 10,
    styleTag: 'Promo fan',
    stockBase: 8,
    pitchLine: 'les deplacements mediterraneens',
    officialPlayers: [
      { name: 'Aubameyang', number: 10 },
      { name: 'Clauss', number: 7 },
      { name: 'Harit', number: 11 },
    ],
    patchIds: ['league', 'ucl'],
    colorways: [
      { id: 'bleu-profond', name: 'Bleu profond', primary: '#07244b', secondary: '#12a3ff', accent: '#ffffff' },
      { id: 'sable-calcaire', name: 'Sable calcaire', primary: '#ddd5c0', secondary: '#07244b', accent: '#12a3ff' },
    ],
  },
  {
    reference: 'OL-DOM-2425',
    name: 'Maillot Lyon Domicile 2024/2025',
    club: 'Olympique Lyonnais',
    championship: 'Ligue 1',
    country: 'France',
    continent: 'Europe',
    gender: 'Homme',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 84.99,
    discountPercentage: 0,
    styleTag: 'Classique club',
    stockBase: 7,
    pitchLine: 'les grands matchs au Groupama Stadium',
    officialPlayers: [
      { name: 'Lacazette', number: 10 },
      { name: 'Cherki', number: 18 },
      { name: 'Tagliafico', number: 3 },
    ],
    patchIds: ['league'],
    colorways: [
      { id: 'blanc-royal', name: 'Blanc royal', primary: '#fbf8ef', secondary: '#d21934', accent: '#1b57d1' },
      { id: 'marine-collector', name: 'Marine collector', primary: '#183063', secondary: '#fbf8ef', accent: '#d21934' },
    ],
  },
  {
    reference: 'ARS-DOM-2425',
    name: 'Maillot Arsenal Domicile 2024/2025',
    club: 'Arsenal',
    championship: 'Premier League',
    country: 'Angleterre',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 96.99,
    discountPercentage: 5,
    styleTag: 'Best seller',
    stockBase: 10,
    pitchLine: 'les affiches du nord de Londres',
    officialPlayers: [
      { name: 'Saka', number: 7 },
      { name: 'Odegaard', number: 8 },
      { name: 'Rice', number: 41 },
    ],
    patchIds: ['league', 'ucl', 'respect'],
    colorways: [
      { id: 'rouge-canon', name: 'Rouge canon', primary: '#be1126', secondary: '#f7f2e8', accent: '#d8b44c' },
      { id: 'bleu-heritage', name: 'Bleu heritage', primary: '#15264d', secondary: '#be1126', accent: '#f7f2e8' },
    ],
  },
  {
    reference: 'LIV-EXT-2425',
    name: 'Maillot Liverpool Exterieur 2024/2025',
    club: 'Liverpool',
    championship: 'Premier League',
    country: 'Angleterre',
    continent: 'Europe',
    gender: 'Femme',
    type: 'Maillot exterieur',
    season: '2024/2025',
    price: 91.99,
    discountPercentage: 12,
    styleTag: 'Edition away',
    stockBase: 7,
    pitchLine: 'les nuits europeennes a Anfield',
    officialPlayers: [
      { name: 'Salah', number: 11 },
      { name: 'Van Dijk', number: 4 },
      { name: 'Szoboszlai', number: 8 },
    ],
    patchIds: ['league', 'ucl', 'winners'],
    colorways: [
      { id: 'ivoire-vintage', name: 'Ivoire vintage', primary: '#f6f0df', secondary: '#7a0018', accent: '#0b7a63' },
      { id: 'vert-seafoam', name: 'Vert seafoam', primary: '#9ad7c4', secondary: '#7a0018', accent: '#f6f0df' },
    ],
  },
  {
    reference: 'MCI-DOM-2425',
    name: 'Maillot Manchester City Domicile 2024/2025',
    club: 'Manchester City',
    championship: 'Premier League',
    country: 'Angleterre',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 95.99,
    discountPercentage: 0,
    styleTag: 'Treble spirit',
    stockBase: 11,
    pitchLine: 'les grands rendez-vous de l Etihad',
    officialPlayers: [
      { name: 'Haaland', number: 9 },
      { name: 'De Bruyne', number: 17 },
      { name: 'Foden', number: 47 },
    ],
    patchIds: ['league', 'ucl', 'winners'],
    colorways: [
      { id: 'bleu-ciel', name: 'Bleu ciel', primary: '#84c8f5', secondary: '#ffffff', accent: '#243a5a' },
      { id: 'marine-gold', name: 'Marine gold', primary: '#243a5a', secondary: '#d4b353', accent: '#84c8f5' },
    ],
  },
  {
    reference: 'MUN-THI-2425',
    name: 'Maillot Manchester United Third 2024/2025',
    club: 'Manchester United',
    championship: 'Premier League',
    country: 'Angleterre',
    continent: 'Europe',
    gender: 'Homme',
    type: 'Maillot third',
    season: '2024/2025',
    price: 92.5,
    discountPercentage: 18,
    styleTag: 'Drop third',
    stockBase: 6,
    pitchLine: 'les soirs de coupe a Old Trafford',
    officialPlayers: [
      { name: 'Fernandes', number: 8 },
      { name: 'Rashford', number: 10 },
      { name: 'Mainoo', number: 37 },
    ],
    patchIds: ['league', 'ucl'],
    colorways: [
      { id: 'vert-lime', name: 'Vert lime', primary: '#bce01f', secondary: '#141414', accent: '#ffffff' },
      { id: 'noir-retro', name: 'Noir retro', primary: '#111111', secondary: '#bce01f', accent: '#d91f26' },
    ],
  },
  {
    reference: 'CHE-THI-2425',
    name: 'Maillot Chelsea Third 2024/2025',
    club: 'Chelsea',
    championship: 'Premier League',
    country: 'Angleterre',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot third',
    season: '2024/2025',
    price: 88.99,
    discountPercentage: 8,
    styleTag: 'Streetwear pitch',
    stockBase: 6,
    pitchLine: 'les matchs sous les projecteurs de Stamford Bridge',
    officialPlayers: [
      { name: 'Palmer', number: 20 },
      { name: 'James', number: 24 },
      { name: 'Enzo', number: 8 },
    ],
    patchIds: ['league'],
    colorways: [
      { id: 'menthe-urbaine', name: 'Menthe urbaine', primary: '#a8e8d3', secondary: '#10253c', accent: '#f7f3e8' },
      { id: 'bleu-rush', name: 'Bleu rush', primary: '#10253c', secondary: '#a8e8d3', accent: '#f7f3e8' },
    ],
  },
  {
    reference: 'RMA-DOM-2425',
    name: 'Maillot Real Madrid Domicile 2024/2025',
    club: 'Real Madrid',
    championship: 'La Liga',
    country: 'Espagne',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 99.99,
    discountPercentage: 0,
    styleTag: 'Galactique',
    stockBase: 11,
    pitchLine: 'les classiques du Bernabeu',
    officialPlayers: [
      { name: 'Bellingham', number: 5 },
      { name: 'Vinicius Jr', number: 7 },
      { name: 'Valverde', number: 15 },
    ],
    patchIds: ['league', 'ucl', 'winners'],
    colorways: [
      { id: 'blanc-or', name: 'Blanc or', primary: '#fbf8ef', secondary: '#d3b24e', accent: '#172a57' },
      { id: 'violet-royal', name: 'Violet royal', primary: '#6b53b4', secondary: '#fbf8ef', accent: '#d3b24e' },
    ],
  },
  {
    reference: 'BAR-EXT-2425',
    name: 'Maillot FC Barcelone Exterieur 2024/2025',
    club: 'FC Barcelone',
    championship: 'La Liga',
    country: 'Espagne',
    continent: 'Europe',
    gender: 'Homme',
    type: 'Maillot exterieur',
    season: '2024/2025',
    price: 94.5,
    discountPercentage: 10,
    styleTag: 'Away iconique',
    stockBase: 8,
    pitchLine: 'les soirs de remontada en Catalogne',
    officialPlayers: [
      { name: 'Pedri', number: 8 },
      { name: 'Yamal', number: 27 },
      { name: 'Lewandowski', number: 9 },
    ],
    patchIds: ['league', 'ucl'],
    colorways: [
      { id: 'ivoire-culer', name: 'Ivoire culer', primary: '#f4eddf', secondary: '#74213a', accent: '#1c3faa' },
      { id: 'marine-senyera', name: 'Marine senyera', primary: '#1a2b6c', secondary: '#f3b316', accent: '#a6122d' },
    ],
  },
  {
    reference: 'ATM-DOM-2425',
    name: 'Maillot Atletico Madrid Domicile 2024/2025',
    club: 'Atletico Madrid',
    championship: 'La Liga',
    country: 'Espagne',
    continent: 'Europe',
    gender: 'Homme',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 87.99,
    discountPercentage: 0,
    styleTag: 'Rayures de combat',
    stockBase: 7,
    pitchLine: 'les derbys sous tension au Metropolitano',
    officialPlayers: [
      { name: 'Griezmann', number: 7 },
      { name: 'Koke', number: 6 },
      { name: 'Llorente', number: 14 },
    ],
    patchIds: ['league', 'ucl'],
    colorways: [
      { id: 'rouge-colchonero', name: 'Rouge colchonero', primary: '#c91f2a', secondary: '#f7f4ea', accent: '#183b80' },
      { id: 'bleu-nuit', name: 'Bleu nuit', primary: '#183b80', secondary: '#f7f4ea', accent: '#c91f2a' },
    ],
  },
  {
    reference: 'JUV-DOM-2425',
    name: 'Maillot Juventus Domicile 2024/2025',
    club: 'Juventus',
    championship: 'Serie A',
    country: 'Italie',
    continent: 'Europe',
    gender: 'Homme',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 91.99,
    discountPercentage: 6,
    styleTag: 'Bianconero',
    stockBase: 8,
    pitchLine: 'les affiches de Turin',
    officialPlayers: [
      { name: 'Chiesa', number: 7 },
      { name: 'Vlahovic', number: 9 },
      { name: 'Locatelli', number: 5 },
    ],
    patchIds: ['league'],
    colorways: [
      { id: 'noir-blanc', name: 'Noir blanc', primary: '#111111', secondary: '#f7f4ea', accent: '#d9a62b' },
      { id: 'charbon-gold', name: 'Charbon gold', primary: '#1b1b1b', secondary: '#d9a62b', accent: '#f7f4ea' },
    ],
  },
  {
    reference: 'INT-EXT-2425',
    name: 'Maillot Inter Milan Exterieur 2024/2025',
    club: 'Inter Milan',
    championship: 'Serie A',
    country: 'Italie',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot exterieur',
    season: '2024/2025',
    price: 89.5,
    discountPercentage: 14,
    styleTag: 'Diagonal cut',
    stockBase: 7,
    pitchLine: 'les grandes nuits a San Siro',
    officialPlayers: [
      { name: 'Lautaro', number: 10 },
      { name: 'Barella', number: 23 },
      { name: 'Bastoni', number: 95 },
    ],
    patchIds: ['league', 'ucl'],
    colorways: [
      { id: 'blanc-nerazzurro', name: 'Blanc nerazzurro', primary: '#f7f3ea', secondary: '#1244aa', accent: '#0e0e0e' },
      { id: 'bleu-petrole', name: 'Bleu petrole', primary: '#1244aa', secondary: '#0e0e0e', accent: '#f7f3ea' },
    ],
  },
  {
    reference: 'ACM-DOM-2425',
    name: 'Maillot AC Milan Domicile 2024/2025',
    club: 'AC Milan',
    championship: 'Serie A',
    country: 'Italie',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 88.99,
    discountPercentage: 9,
    styleTag: 'Rossonero',
    stockBase: 7,
    pitchLine: 'les soirs en rouge et noir a San Siro',
    officialPlayers: [
      { name: 'Leao', number: 10 },
      { name: 'Pulisic', number: 11 },
      { name: 'Theo Hernandez', number: 19 },
    ],
    patchIds: ['league', 'ucl'],
    colorways: [
      { id: 'rouge-noir', name: 'Rouge noir', primary: '#8c101a', secondary: '#111111', accent: '#f7f3ea' },
      { id: 'blanc-collector', name: 'Blanc collector', primary: '#f7f3ea', secondary: '#8c101a', accent: '#111111' },
    ],
  },
  {
    reference: 'BAY-DOM-2425',
    name: 'Maillot Bayern Munich Domicile 2024/2025',
    club: 'Bayern Munich',
    championship: 'Bundesliga',
    country: 'Allemagne',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 93.99,
    discountPercentage: 0,
    styleTag: 'Mia san mia',
    stockBase: 10,
    pitchLine: 'les chocs du sommet a Munich',
    officialPlayers: [
      { name: 'Musiala', number: 42 },
      { name: 'Kane', number: 9 },
      { name: 'Kimmich', number: 6 },
    ],
    patchIds: ['league', 'ucl', 'winners'],
    colorways: [
      { id: 'rouge-baviere', name: 'Rouge Baviere', primary: '#c1162c', secondary: '#f7f3ea', accent: '#14213d' },
      { id: 'cream-gold', name: 'Cream gold', primary: '#f5ead4', secondary: '#c1162c', accent: '#14213d' },
    ],
  },
  {
    reference: 'BVB-DOM-2425',
    name: 'Maillot Dortmund Domicile 2024/2025',
    club: 'Borussia Dortmund',
    championship: 'Bundesliga',
    country: 'Allemagne',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2024/2025',
    price: 86.99,
    discountPercentage: 11,
    styleTag: 'Mur jaune',
    stockBase: 8,
    pitchLine: 'les moments de furia au Signal Iduna Park',
    officialPlayers: [
      { name: 'Brandt', number: 10 },
      { name: 'Adeyemi', number: 27 },
      { name: 'Schlotterbeck', number: 4 },
    ],
    patchIds: ['league', 'ucl'],
    colorways: [
      { id: 'jaune-noir', name: 'Jaune noir', primary: '#f1cf18', secondary: '#101010', accent: '#f7f3ea' },
      { id: 'charbon-yellow', name: 'Charbon yellow', primary: '#101010', secondary: '#f1cf18', accent: '#f7f3ea' },
    ],
  },
  {
    reference: 'FRA-DOM-2026',
    name: 'Maillot Equipe de France Domicile 2026',
    club: 'Equipe de France',
    championship: 'Selections nationales',
    country: 'France',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2026',
    price: 92.99,
    discountPercentage: 5,
    styleTag: 'Bleu national',
    stockBase: 9,
    pitchLine: 'les grands rendez-vous internationaux',
    officialPlayers: [
      { name: 'Mbappe', number: 10 },
      { name: 'Griezmann', number: 7 },
      { name: 'Camavinga', number: 6 },
    ],
    patchIds: ['winners', 'respect'],
    colorways: [
      { id: 'bleu-france', name: 'Bleu France', primary: '#133c8b', secondary: '#d41a2b', accent: '#f7f3ea' },
      { id: 'blanc-marbre', name: 'Blanc marbre', primary: '#f7f3ea', secondary: '#133c8b', accent: '#d41a2b' },
    ],
  },
  {
    reference: 'ARG-DOM-2026',
    name: 'Maillot Argentine Domicile 2026',
    club: 'Argentine',
    championship: 'Selections nationales',
    country: 'Argentine',
    continent: 'Amerique du Sud',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2026',
    price: 97.5,
    discountPercentage: 0,
    styleTag: 'Trois etoiles',
    stockBase: 10,
    pitchLine: 'les nuits blanches et ciel albiceleste',
    officialPlayers: [
      { name: 'Messi', number: 10 },
      { name: 'Alvarez', number: 9 },
      { name: 'De Paul', number: 7 },
    ],
    patchIds: ['winners', 'respect'],
    colorways: [
      { id: 'ciel-blanc', name: 'Ciel blanc', primary: '#87d3ef', secondary: '#f7f3ea', accent: '#c9a33d' },
      { id: 'midnight-gold', name: 'Midnight gold', primary: '#18314d', secondary: '#c9a33d', accent: '#87d3ef' },
    ],
  },
  {
    reference: 'BRA-DOM-2026',
    name: 'Maillot Bresil Domicile 2026',
    club: 'Bresil',
    championship: 'Selections nationales',
    country: 'Bresil',
    continent: 'Amerique du Sud',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2026',
    price: 95.5,
    discountPercentage: 7,
    styleTag: 'Joga bonito',
    stockBase: 10,
    pitchLine: 'le football solaire des grandes competitions',
    officialPlayers: [
      { name: 'Vinicius Jr', number: 7 },
      { name: 'Rodrygo', number: 10 },
      { name: 'Marquinhos', number: 4 },
    ],
    patchIds: ['winners', 'respect'],
    colorways: [
      { id: 'jaune-verde', name: 'Jaune verde', primary: '#efc81f', secondary: '#0a6c45', accent: '#1244aa' },
      { id: 'bleu-royal', name: 'Bleu royal', primary: '#1244aa', secondary: '#efc81f', accent: '#0a6c45' },
    ],
  },
  {
    reference: 'ITA-DOM-2026',
    name: 'Maillot Italie Domicile 2026',
    club: 'Italie',
    championship: 'Selections nationales',
    country: 'Italie',
    continent: 'Europe',
    gender: 'Mixte',
    type: 'Maillot domicile',
    season: '2026',
    price: 89.99,
    discountPercentage: 13,
    styleTag: 'Azzurro',
    stockBase: 8,
    pitchLine: 'les rendez-vous historiques de la Nazionale',
    officialPlayers: [
      { name: 'Barella', number: 18 },
      { name: 'Donnarumma', number: 1 },
      { name: 'Chiesa', number: 14 },
    ],
    patchIds: ['winners', 'respect'],
    colorways: [
      { id: 'azzurro', name: 'Azzurro', primary: '#225ed8', secondary: '#f7f3ea', accent: '#14305c' },
      { id: 'blanc-tricolore', name: 'Blanc tricolore', primary: '#f7f3ea', secondary: '#225ed8', accent: '#d22a2f' },
    ],
  },
];

const clone = (value) => JSON.parse(JSON.stringify(value));

const escapeText = (text) => encodeURIComponent(text).replace(/%20/g, ' ');

const getClubInitials = (club) =>
  club
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 3)
    .join('');

const createKitImage = ({ club, label, primary, secondary, accent, view }) => {
  const initials = getClubInitials(club);
  const viewKey = view.toLowerCase();
  const isBack = viewKey.includes('dos');
  const isDetail = viewKey.includes('detail');
  const shirtFill = isBack ? secondary : primary;
  const shirtAccent = isBack ? primary : secondary;
  const sponsorText = isDetail ? 'AUTHENTIC DETAIL' : 'LEGEND STORE';
  const shirtNumber = String((club.length % 9) + 1).repeat(2).slice(0, 2);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 860" role="img" aria-label="${club} ${view}">
      <defs>
        <linearGradient id="night" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#050505"/>
          <stop offset="100%" stop-color="#151518"/>
        </linearGradient>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="${secondary}"/>
        </linearGradient>
        <linearGradient id="shirt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${shirtFill}"/>
          <stop offset="100%" stop-color="${shirtAccent}"/>
        </linearGradient>
        <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.24"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <pattern id="mesh" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 9h18M9 0v18" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
        </pattern>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="26" stdDeviation="24" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10"/>
        </filter>
        <clipPath id="shirtClip">
          <path d="M271 174h178l74 60-34 96-48-24v286c0 54-42 98-94 98h-24c-52 0-94-44-94-98V306l-48 24-34-96z"/>
        </clipPath>
      </defs>
      <rect width="720" height="860" rx="36" fill="url(#night)"/>
      <rect width="720" height="860" rx="36" fill="url(#mesh)"/>
      <path d="M-40 256L276 0" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity="0.56"/>
      <path d="M454 0L760 248" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity="0.46"/>
      <path d="M562 860L760 622" stroke="${secondary}" stroke-width="10" stroke-linecap="round" opacity="0.44"/>
      <circle cx="122" cy="174" r="86" fill="${accent}" opacity="0.12" filter="url(#softGlow)"/>
      <circle cx="594" cy="700" r="118" fill="${secondary}" opacity="0.14" filter="url(#softGlow)"/>
      <rect x="86" y="84" width="548" height="692" rx="34" fill="#101013" stroke="#2d2d32" stroke-width="2"/>
      <rect x="86" y="84" width="548" height="692" rx="34" fill="url(#mesh)" opacity="0.26"/>
      <path d="M321 130c12-20 25-30 39-30 14 0 27 10 39 30" fill="none" stroke="#d9c37f" stroke-width="8" stroke-linecap="round"/>
      <path d="M281 166h158" stroke="#5d4630" stroke-width="12" stroke-linecap="round"/>
      <g filter="url(#shadow)" transform="${isDetail ? 'translate(0 44) scale(1.05)' : 'translate(0 0)'}">
        <path d="M271 174h178l74 60-34 96-48-24v286c0 54-42 98-94 98h-24c-52 0-94-44-94-98V306l-48 24-34-96z" fill="url(#shirt)" stroke="${accent}" stroke-opacity="0.42" stroke-width="5"/>
        <path d="M318 178h84l18 26h-120z" fill="${accent}" opacity="0.84"/>
        <path d="M253 250h70l20 56-48 24-42-24z" fill="${shirtAccent}" opacity="0.72"/>
        <path d="M467 250h-70l-20 56 48 24 42-24z" fill="${shirtAccent}" opacity="0.72"/>
        <rect x="270" y="218" width="180" height="418" rx="34" fill="url(#mesh)" clip-path="url(#shirtClip)" opacity="0.26"/>
        <path d="M280 280c72 18 144 18 216 0" stroke="${accent}" stroke-width="10" stroke-opacity="0.22"/>
        <path d="M282 356c76-28 150-28 222 0" stroke="${secondary}" stroke-width="18" stroke-opacity="0.2"/>
        <path d="M288 452c68 20 136 20 204 0" stroke="${accent}" stroke-width="12" stroke-opacity="0.16"/>
        <path d="M270 174h178l74 60-34 96-48-24v286c0 54-42 98-94 98h-24c-52 0-94-44-94-98V306l-48 24-34-96z" fill="url(#shine)" opacity="0.56"/>
        ${isBack ? `
          <text x="360" y="326" fill="#f7f1e7" font-size="36" font-family="Arial, Helvetica, sans-serif" text-anchor="middle" letter-spacing="4">${initials}</text>
          <text x="360" y="506" fill="#f7f1e7" font-size="136" font-family="Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle">${shirtNumber}</text>
        ` : isDetail ? `
          <circle cx="312" cy="352" r="34" fill="${accent}" opacity="0.88"/>
          <rect x="352" y="324" width="116" height="52" rx="12" fill="#f7f1e7" opacity="0.94"/>
          <text x="410" y="358" fill="#101013" font-size="20" font-family="Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle">${initials}</text>
          <path d="M274 434h176" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity="0.76"/>
          <path d="M274 468h176" stroke="#f7f1e7" stroke-width="6" stroke-linecap="round" opacity="0.72"/>
        ` : `
          <circle cx="310" cy="320" r="28" fill="${accent}" opacity="0.88"/>
          <text x="310" y="327" fill="#101013" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle">${initials}</text>
          <rect x="340" y="296" width="140" height="50" rx="12" fill="#f7f1e7" opacity="0.92"/>
          <text x="410" y="328" fill="#101013" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle">${sponsorText}</text>
        `}
      </g>
      <text x="118" y="136" fill="${accent}" font-size="26" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="3">MAILLOTS DE LEGENDE</text>
      <text x="118" y="724" fill="#f7f1e7" font-size="30" font-family="Arial, Helvetica, sans-serif" font-weight="700">${club}</text>
      <text x="118" y="762" fill="${accent}" font-size="20" font-family="Arial, Helvetica, sans-serif">${label}</text>
      <text x="542" y="762" fill="#f7f1e7" font-size="20" font-family="Arial, Helvetica, sans-serif" text-anchor="end">${view}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${escapeText(svg)}`;
};

const createImageSet = (club, colorway) => [
  {
    alt: `${club} ${colorway.name} vue face`,
    url: createKitImage({
      club,
      label: colorway.name,
      primary: colorway.primary,
      secondary: colorway.secondary,
      accent: colorway.accent,
      view: 'Vue face',
    }),
  },
  {
    alt: `${club} ${colorway.name} vue dos`,
    url: createKitImage({
      club,
      label: colorway.name,
      primary: colorway.secondary,
      secondary: colorway.primary,
      accent: colorway.accent,
      view: 'Vue dos',
    }),
  },
  {
    alt: `${club} ${colorway.name} detail textile`,
    url: createKitImage({
      club,
      label: colorway.name,
      primary: colorway.primary,
      secondary: colorway.accent,
      accent: colorway.secondary,
      view: 'Detail textile',
    }),
  },
];

const buildDescription = (product) => {
  const firstColor = product.colorways[0].name.toLowerCase();

  return `Concu pour les supporters de ${product.club}, ce ${product.type.toLowerCase()} ${product.season} melange matiere respirante, coupe confortable et details visuels inspires par ${product.pitchLine}. Son coloris ${firstColor} donne une vraie presence en vitrine, tandis que les options de flocage joueur, personnalisation libre et patchs d epaule permettent de composer une piece plus personnelle sans perdre l esprit maillot de collection.`;
};

const createStockBySize = (baseSeed, colorIndex, stockBase) =>
  BASE_SIZES.reduce((stockMap, size, sizeIndex) => {
    const raw = stockBase + ((baseSeed + colorIndex + sizeIndex) % 5) + (sizeIndex < 2 ? 3 : 1);
    stockMap[size] = Math.max(2, raw);
    return stockMap;
  }, {});

const getTotalStock = (colorways) =>
  colorways.reduce(
    (sum, colorway) =>
      sum +
      Object.values(colorway.stockBySize).reduce((colorTotal, quantity) => colorTotal + quantity, 0),
    0
  );

const createCatalog = () =>
  productBlueprints.map((blueprint, productIndex) => {
    const colorways = blueprint.colorways.map((colorway, colorIndex) => ({
      ...colorway,
      images: createImageSet(blueprint.club, colorway),
      stockBySize: createStockBySize(productIndex + 3, colorIndex + 1, blueprint.stockBase),
    }));

    const availablePatches = patchCatalog.filter((patch) => blueprint.patchIds.includes(patch.id));
    const description = buildDescription(blueprint);

    return {
      id: productIndex + 1,
      reference: blueprint.reference,
      name: blueprint.name,
      slug: blueprint.reference.toLowerCase(),
      club: blueprint.club,
      championship: blueprint.championship,
      country: blueprint.country,
      continent: blueprint.continent,
      gender: blueprint.gender,
      type: blueprint.type,
      season: blueprint.season,
      price: blueprint.price,
      discountPercentage: blueprint.discountPercentage,
      currency: 'EUR',
      description,
      sizes: clone(BASE_SIZES),
      colorways,
      officialPlayers: clone(blueprint.officialPlayers),
      availablePatches,
      styleTag: blueprint.styleTag,
      totalStock: getTotalStock(colorways),
      similarKey: `${blueprint.continent}-${blueprint.championship}`,
    };
  });

module.exports = {
  BASE_SIZES,
  clone,
  createCatalog,
  flockingOptions,
  patchCatalog,
  productBlueprints,
};
