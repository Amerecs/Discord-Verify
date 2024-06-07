const { createCanvas } = require('canvas');

async function x(numbers) {
    const canvas = createCanvas(200,100);
const ctx = canvas.getContext('2d'); 
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,200,100);
    ctx.fillStyle = 'black';
    ctx.font = '40px Arial'
    ctx.fillText(numbers,15,85);
 return await canvas.toBuffer('image/png');
}
module.exports = x;