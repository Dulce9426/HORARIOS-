// Script para generar iconos PWA usando Node.js y canvas
// Ejecutar con: node generate-icons.js

const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function drawIcon(ctx, size) {
    // Fondo beige estilo ukiyo-e
    ctx.fillStyle = '#f5f1e8';
    ctx.fillRect(0, 0, size, size);
    
    // Borde marrón
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = size * 0.02;
    ctx.strokeRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8);
    
    // Texto 時計 (reloj en japonés)
    ctx.fillStyle = '#2c1810';
    ctx.font = `bold ${size * 0.25}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('時計', size / 2, size / 2);
}

sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    drawIcon(ctx, size);
    
    const buffer = canvas.toBuffer('image/png');
    const filename = `icon-${size}x${size}.png`;
    
    fs.writeFileSync(filename, buffer);
    console.log(`✓ Generado: ${filename}`);
});

console.log('\n¡Todos los iconos han sido generados exitosamente!');

