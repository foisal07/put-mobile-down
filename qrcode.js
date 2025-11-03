const qrcodeContainer = document.getElementById('qrcode');

// Generate a QR code that points to the app entry page
const appUrl = new URL('app.html', window.location.href).href;

new QRCode(qrcodeContainer, {
    text: appUrl,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

const gridContainer = document.getElementById('container');
const qrOverlay = gridContainer?.querySelector('.qr-item');
const baseTiles = gridContainer
    ? Array.from(gridContainer.querySelectorAll('img.bg-tile')).filter(tile => !tile.dataset.clone)
    : [];

const fillTileGrid = () => {
    if (!gridContainer || !qrOverlay || baseTiles.length === 0) {
        return;
    }

    const viewportHeight = window.innerHeight;
    const maxBatches = 20;
    let batches = 0;

    while (gridContainer.scrollHeight < viewportHeight && batches < maxBatches) {
        baseTiles.forEach(tile => {
            const clone = tile.cloneNode(true);
            clone.dataset.clone = 'true';
            gridContainer.insertBefore(clone, qrOverlay);
        });
        batches += 1;
    }
};

if (gridContainer && qrOverlay && baseTiles.length) {
    const runFill = () => {
        fillTileGrid();
        window.removeEventListener('load', runFill);
    };

    fillTileGrid();

    if (!baseTiles.every(tile => tile.complete)) {
        window.addEventListener('load', runFill);
    }

    window.addEventListener('resize', fillTileGrid);
}
