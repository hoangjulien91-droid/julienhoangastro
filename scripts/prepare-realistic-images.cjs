const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function main() {
  const imagesDir = path.resolve('public/images');
  const projectsDir = path.resolve('public/images/projects');
  
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  // 1. Profile Portrait: Julien Hoang
  // Source: /Users/ikerketa/Desktop/ikerketa/ADMINISTRATIF ENTREPRISE/julien-hoang-detective-victimologue.jpg (1341x1394)
  const portraitSource = '/Users/ikerketa/Desktop/ikerketa/ADMINISTRATIF ENTREPRISE/julien-hoang-detective-victimologue.jpg';
  const portraitDestWebp = path.join(imagesDir, 'julien-hoang-detective-prive.webp');
  const portraitDestJpg = path.join(imagesDir, 'profil.jpg');

  // Crop to square centered on face & shoulders (offsetting slightly down from top)
  await sharp(portraitSource)
    .extract({ left: 70, top: 20, width: 1200, height: 1200 })
    .resize(800, 800, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(portraitDestWebp);
  console.log('Generated:', portraitDestWebp);

  await sharp(portraitSource)
    .extract({ left: 70, top: 20, width: 1200, height: 1200 })
    .resize(800, 800, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(portraitDestJpg);
  console.log('Generated:', portraitDestJpg);

  // 2. Project 1: Ikerketa (Cabinet d'enquêtes privées au Pays Basque)
  // Source: Basque coast & Biarritz lighthouse sunset
  const ikerketaSource = '/Users/ikerketa/Desktop/SITE INTERNET/photo_2_2025-12-08_01-08-54.jpg';
  const ikerketaDest = path.join(projectsDir, 'ikerketa.webp');
  await sharp(ikerketaSource)
    .extract({ left: 0, top: 100, width: 1280, height: 720 }) // 16:9 crop centering lighthouse and ocean waves
    .resize(800, 450, { fit: 'cover' })
    .webp({ quality: 88 })
    .toFile(ikerketaDest);
  console.log('Generated:', ikerketaDest);

  // 3. Project 2: Détective Conseil (Conseil national en stratégie de preuve)
  // Source: Palais de Justice / Tribunal de Bayonne
  const dcSource = '/Users/ikerketa/web/IKERKETA/src/assets/images/portfolio/enquete_bw.webp';
  const dcDest = path.join(projectsDir, 'detective-conseil.webp');
  await sharp(dcSource)
    .resize(800, 450, { fit: 'cover' })
    .webp({ quality: 88 })
    .toFile(dcDest);
  console.log('Generated:', dcDest);

  // 4. Project 3: Livre "Une preuve peut tout changer"
  // Let's create an elegant, realistic book presentation card
  const bookDest = path.join(projectsDir, 'livre-une-preuve-peut-tout-changer.webp');
  
  // Render an SVG book mockup on a dark luxury background and composite
  const svgBookCard = Buffer.from(`
    <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="50%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0b1120"/>
        </linearGradient>
        <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309" stop-opacity="0"/>
          <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#b45309" stop-opacity="0"/>
        </linearGradient>
        <filter id="bookShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="12" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
        <linearGradient id="coverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1e24"/>
          <stop offset="100%" stop-color="#0e0e12"/>
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="800" height="450" fill="url(#bgGrad)"/>
      <circle cx="400" cy="225" r="300" fill="#f59e0b" fill-opacity="0.03"/>

      <!-- Ambient grid lines -->
      <line x1="0" y1="440" x2="800" y2="440" stroke="url(#goldLine)" stroke-width="1.5"/>

      <!-- Book Realistic 3D Mockup Container -->
      <g transform="translate(290, 45)" filter="url(#bookShadow)">
        <!-- Book Spine simulated -->
        <rect x="-8" y="0" width="12" height="360" rx="3" fill="#2d2d38"/>
        <!-- Book Front Cover -->
        <rect x="0" y="0" width="230" height="360" rx="4" fill="url(#coverGrad)" stroke="#374151" stroke-width="1"/>
        <line x1="12" y1="0" x2="12" y2="360" stroke="#000000" stroke-opacity="0.4" stroke-width="1.5"/>
        
        <!-- Book Cover Inner Accent -->
        <rect x="18" y="18" width="194" height="324" fill="none" stroke="#d97706" stroke-opacity="0.3" stroke-width="1"/>
        
        <!-- Book Badge -->
        <rect x="45" y="42" width="140" height="20" rx="10" fill="#d97706" fill-opacity="0.15"/>
        <text x="115" y="55" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="9" font-weight="700" letter-spacing="1.5" text-anchor="middle">OUVRAGE &amp; MÉTHODE</text>

        <!-- Book Title -->
        <text x="115" y="115" fill="#ffffff" font-family="Georgia, serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="0.5">UNE PREUVE</text>
        <text x="115" y="142" fill="#ffffff" font-family="Georgia, serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="0.5">PEUT TOUT</text>
        <text x="115" y="169" fill="#d97706" font-family="Georgia, serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="0.5">CHANGER</text>

        <line x1="85" y1="190" x2="145" y2="190" stroke="#f59e0b" stroke-width="1.5"/>

        <!-- Subtitle -->
        <text x="115" y="222" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Enquêter, se protéger</text>
        <text x="115" y="238" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">et se reconstruire</text>

        <!-- Author -->
        <text x="115" y="300" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12" font-weight="600" text-anchor="middle" letter-spacing="0.5">Julien Hoang</text>
        <text x="115" y="318" fill="#64748b" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">Détective Privé Agréé CNAPS</text>
      </g>
    </svg>
  `);

  await sharp(svgBookCard)
    .webp({ quality: 90 })
    .toFile(bookDest);
  console.log('Generated:', bookDest);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
