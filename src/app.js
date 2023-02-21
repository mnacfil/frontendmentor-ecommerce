const productImages = [...document.querySelectorAll('.product-img')];
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

const checkIndex = (index) => {
    const imagesLength = productImages.length;
    if(index > imagesLength - 1) return 0;
    if(index < 0) return imagesLength - 1;
    return index;
}

const displayImage = (type) => {
    if(type === 'next') {
        currentIndex++;
    }
    if(type === 'previous') {
        currentIndex--;
    }
    currentIndex = checkIndex(currentIndex);
    productImages.forEach((image, index) => {
        const parent = image.parentElement;
        if(!(currentIndex === index)) {
            parent.classList.remove('active');
        } else {
            parent.classList.add('active');
        }
    })
}

nextBtn.addEventListener('click', () => {
    displayImage('next');
});
previousBtn.addEventListener('click', () => {
    displayImage('previous');
});