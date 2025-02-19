document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
document.getElementById('exportButton').addEventListener('click', exportImage);

const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let image = new Image();
let brushColor = '#ffffff';

document.getElementById('brushColor').addEventListener('input', (e) => {
    brushColor = e.target.value;
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

let isDrawing = false;

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        image.src = e.target.result;
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        }
    }
    reader.readAsDataURL(file);
}

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function exportImage() {
    const text = document.getElementById('translatedText').value;
    const textSize = document.getElementById('textSize').value;
    ctx.drawImage(image, 0, 0);
    ctx.font = `${textSize}px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillText(text, 10, canvas.height - 10);
    const link = document.createElement('a');
    link.download = 'translated-image.png';
    link.href = canvas.toDataURL();
    link.click();
}
