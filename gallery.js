const imageGrid = document.getElementById('image-grid');

// TODO: Load images from a data source (e.g., localStorage or a server)
const images = JSON.parse(localStorage.getItem('generatedImages')) || [];

images.forEach(imageUrl => {
    const img = document.createElement('img');
    img.src = imageUrl;
    imageGrid.appendChild(img);
});