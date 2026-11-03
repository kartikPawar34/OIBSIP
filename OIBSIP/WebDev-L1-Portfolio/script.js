const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('imageCounter');

let currentNumber = 1;
const totalImages = 6;

function updateImage() {
    sliderImage.src = `images/${currentNumber}.jpg`;
}

nextBtn.addEventListener('click', () => {
    currentNumber++;
    if (currentNumber > totalImages) {
        currentNumber = 1;
    }
    updateImage();
});

prevBtn.addEventListener('click', () => {
    currentNumber--;
    if (currentNumber < 1) {
        currentNumber = totalImages;
    }
    updateImage();
});