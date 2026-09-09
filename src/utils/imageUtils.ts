import { PosterOptions } from '../types';

export const MAX_FILE_SIZE_MB = 15;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Format non supporté. Veuillez sélectionner une image JPG, PNG ou WebP.'
    };
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    return {
      valid: false,
      error: `L'image est trop volumineuse (${fileSizeMB.toFixed(1)} Mo). La taille maximale est de ${MAX_FILE_SIZE_MB} Mo.`
    };
  }

  return { valid: true };
}

export function compressAndReadFile(file: File, maxDim = 1200, quality = 0.9): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Impossible de lire l\'image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function drawCowrieShell(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, rotationDeg = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotationDeg * Math.PI) / 180);

  // Outer shell oval
  ctx.beginPath();
  ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2);
  const shellGrad = ctx.createLinearGradient(-width / 2, -height / 2, width / 2, height / 2);
  shellGrad.addColorStop(0, '#fef9ee');
  shellGrad.addColorStop(0.5, '#e8dcbe');
  shellGrad.addColorStop(1, '#bba37d');
  ctx.fillStyle = shellGrad;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  ctx.fill();
  ctx.shadowColor = 'transparent';

  // Shell border
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#9a815a';
  ctx.stroke();

  // Center opening (slotted slit)
  ctx.beginPath();
  ctx.ellipse(0, 0, width * 0.12, height * 0.36, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#422c19';
  ctx.fill();

  // Serrated teeth around the slit
  ctx.strokeStyle = '#fef9ee';
  ctx.lineWidth = 2;
  const teethCount = 5;
  for (let i = -teethCount; i <= teethCount; i++) {
    const toothY = (i / teethCount) * (height * 0.3);
    // Left tooth
    ctx.beginPath();
    ctx.moveTo(-width * 0.18, toothY);
    ctx.lineTo(-width * 0.05, toothY);
    ctx.stroke();
    // Right tooth
    ctx.beginPath();
    ctx.moveTo(width * 0.05, toothY);
    ctx.lineTo(width * 0.18, toothY);
    ctx.stroke();
  }

  ctx.restore();
}

export async function generateFecawaPoster(options: PosterOptions): Promise<string> {
  const canvas = document.createElement('canvas');
  const size = 1200;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // 1. Right & Main Background: Pure high-contrast clean white like the original poster
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // 2. Far Left Column: Deep dark brown patterned border
  const leftColWidth = 270;
  ctx.fillStyle = '#1b120c';
  ctx.fillRect(0, 0, leftColWidth, size);

  // Subtle vertical pattern on left column (FECAWA watermark repetitions)
  ctx.save();
  ctx.font = '800 24px Syne, sans-serif';
  ctx.fillStyle = 'rgba(217, 119, 6, 0.18)';
  ctx.textAlign = 'center';
  for (let y = 80; y < size; y += 140) {
    ctx.beginPath();
    ctx.arc(leftColWidth / 2, y, 40, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillText('FECAWA', leftColWidth / 2, y + 60);
  }
  ctx.restore();

  // 3. Draw Participant Photo in rounded curved card
  try {
    const participantImg = await loadImage(options.photoUrl);
    ctx.save();

    // Card dimensions & position
    const cardX = 75;
    const cardY = 190;
    const cardW = 460;
    const cardH = 780;
    const cardRadius = 70;

    // Outer shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 12;

    // Draw card path
    ctx.beginPath();
    ctx.moveTo(cardX + cardRadius, cardY);
    ctx.lineTo(cardX + cardW - cardRadius, cardY);
    ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardRadius, cardRadius);
    ctx.lineTo(cardX + cardW, cardY + cardH - 120);
    ctx.arcTo(cardX + cardW, cardY + cardH, cardX + cardW - 120, cardY + cardH, 120);
    ctx.lineTo(cardX + cardRadius, cardY + cardH);
    ctx.arcTo(cardX, cardY + cardH, cardX, cardY + cardH - cardRadius, cardRadius);
    ctx.lineTo(cardX, cardY + cardRadius);
    ctx.arcTo(cardX, cardY, cardX + cardRadius, cardY, cardRadius);
    ctx.closePath();

    // Thick white border
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // Clip for photo inside (with 8px white margin)
    ctx.save();
    const margin = 8;
    ctx.beginPath();
    const innerR = cardRadius - margin;
    ctx.moveTo(cardX + margin + innerR, cardY + margin);
    ctx.lineTo(cardX + cardW - margin - innerR, cardY + margin);
    ctx.arcTo(cardX + cardW - margin, cardY + margin, cardX + cardW - margin, cardY + margin + innerR, innerR);
    ctx.lineTo(cardX + cardW - margin, cardY + cardH - 120 - margin);
    ctx.arcTo(cardX + cardW - margin, cardY + cardH - margin, cardX + cardW - 120 - margin, cardY + cardH - margin, 110);
    ctx.lineTo(cardX + margin + innerR, cardY + cardH - margin);
    ctx.arcTo(cardX + margin, cardY + cardH - margin, cardX + margin, cardY + cardH - margin - innerR, innerR);
    ctx.lineTo(cardX + margin, cardY + margin + innerR);
    ctx.arcTo(cardX + margin, cardY + margin, cardX + margin + innerR, cardY + margin, innerR);
    ctx.closePath();
    ctx.clip();

    // Calculate crop / zoom / pan
    const zoom = options.zoom || 1;
    const offsetX = options.offsetX || 0;
    const offsetY = options.offsetY || 0;

    const imgAspect = participantImg.width / participantImg.height;
    const cardAspect = cardW / cardH;
    let renderW: number;
    let renderH: number;

    if (imgAspect > cardAspect) {
      renderH = cardH * zoom;
      renderW = renderH * imgAspect;
    } else {
      renderW = cardW * zoom;
      renderH = renderW / imgAspect;
    }

    const drawX = cardX + (cardW - renderW) / 2 + offsetX;
    const drawY = cardY + (cardH - renderH) / 2 + offsetY;

    ctx.drawImage(participantImg, drawX, drawY, renderW, renderH);
    ctx.restore(); // end clip

    // Draw white curved footer badge on the card for "j'y serai"
    ctx.beginPath();
    ctx.moveTo(cardX, cardY + cardH - 110);
    ctx.lineTo(cardX + 230, cardY + cardH - 110);
    ctx.arcTo(cardX + 270, cardY + cardH - 110, cardX + 270, cardY + cardH, 40);
    ctx.lineTo(cardX + 270, cardY + cardH);
    ctx.lineTo(cardX + cardRadius, cardY + cardH);
    ctx.arcTo(cardX, cardY + cardH, cardX, cardY + cardH - cardRadius, cardRadius);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // "j'y serai" script text inside the white badge
    ctx.font = '700 52px "Dancing Script", cursive';
    ctx.fillStyle = '#1c140d';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("j'y serai", cardX + 130, cardY + cardH - 45);

    // If participant name provided, draw elegant tag under or on the photo
    if (options.name && options.name.trim()) {
      const cleanName = options.name.trim();
      ctx.save();
      ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
      const nameMetrics = ctx.measureText(cleanName);
      const nameBoxW = Math.min(nameMetrics.width + 36, cardW - 40);
      const nameBoxH = 38;
      const nameBoxX = cardX + cardW - nameBoxW - 16;
      const nameBoxY = cardY + 24;

      ctx.fillStyle = 'rgba(20, 14, 10, 0.85)';
      ctx.beginPath();
      ctx.roundRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH, 19);
      ctx.fill();

      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(cleanName, nameBoxX + nameBoxW / 2, nameBoxY + nameBoxH / 2, nameBoxW - 16);
      ctx.restore();
    }

    ctx.restore();
  } catch (err) {
    console.warn('Could not render participant photo on poster:', err);
  }

  // 4. Right Column Elements: Center X is 880
  const rightCenterX = 880;

  // A. Official Logo (Complete logo with seal, FECAWA typography and cowries)
  try {
    const logoImg = await loadImage('/fecawa-official-logo.jpg');
    const logoWidth = 560;
    const logoHeight = 560;
    const logoX = rightCenterX - logoWidth / 2;
    const logoY = 80;

    ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
  } catch (err) {
    console.warn('Could not load official logo on poster canvas:', err);
  }

  // B. Dates and Location
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Date
  ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#19110b';
  ctx.fillText('Du 19 au 21 Novembre 2026', rightCenterX, 760);

  // Location
  ctx.font = '900 42px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#19110b';
  ctx.fillText('à Natitingou', rightCenterX, 820);
  ctx.restore();

  // C. Slogan: « La culture nous rassemble »
  ctx.save();
  ctx.font = '700 52px "Dancing Script", cursive';
  ctx.fillStyle = '#1b120c';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('La culture nous rassemble', rightCenterX, 920);
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.95);
}
