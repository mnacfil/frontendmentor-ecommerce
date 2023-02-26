const mainImg = document.querySelector('.main-img');
const productImages = [...document.querySelectorAll('.product-img')];
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
const addBtn = document.querySelector('.add-btn');
const minusBtn = document.querySelector('.minus-btn');
const cartBtn = document.querySelector('.cart-btn');
const deleteBtn = document.querySelector('.delete-btn');
const closeBtn = document.querySelector('.close-btn');
const menuBtn = document.querySelector('.menu-btn');
const lightBoxCloseBtn = document.querySelector('.lightbox-close-btn');
const lightboxNextBtn = document.querySelector('.lightbox-next-btn');
const lightboxPrevBtn = document.querySelector('.lightbox-prev-btn');
const amount = document.querySelector('.amount');
const cartAmount = document.querySelector('.cart-amount');
const cartModalNode = document.querySelector('.cart-modal');
const cartPrice = document.querySelector('.cart-price');
const cartItems = document.querySelector('.items');
const cartTotalPrice = document.querySelector('.total-price');
const productPrice = document.querySelector('.product-price');
const emptyCart = document.querySelector('.cart-empty');
const cartContent = document.querySelector('.cart-content');
const sidebarNode = document.querySelector('.sidebar');
const bodyCoverNode = document.querySelector('.body-cover');
const lightBoxNode = document.querySelector('.lightbox');
const lightBoxImages = [...document.querySelectorAll('.products-container.lightbox .spotlight')];
const lightBoxThumbnailImages = [...document.querySelectorAll('.products-container.lightbox .images div')];
let currentIndex = 0;

const checkIndex = (index) => {;
    const imagesLength = lightBoxImages.length;
    if(index > imagesLength - 1) return 0;
    if(index < 0) return imagesLength - 1;
    return index;
}

const displayImage = (type, index, view) => {

    if(type === 'next') {
        currentIndex++;
    }
    if(type === 'previous') {
        currentIndex--;
    }
    if(type === 'navigate') {
        currentIndex = index;
    }
    currentIndex = checkIndex(currentIndex);
    // for mobile view
    if(view === 'mobile') {
        productImages.forEach((productImg, index) => {
            const parent = productImg.parentElement;
            if(!(currentIndex === index)) {
                parent.classList.remove('active');
            } else {
                parent.classList.add('active');
            }
        });
        return;
    }
        productImages.forEach(sameProductImg => {
        sameProductImg.parentElement.classList.remove('active-img');
    })
    // set the active img on thumnail
    lightBoxThumbnailImages.forEach((thumbnailImg, index) => {
        if(!(currentIndex === index)) {
            thumbnailImg.classList.remove('active-img');
        } else {
            thumbnailImg.classList.add('active-img');
        }
    })
    // set the main img correspond to active img
    lightBoxImages.forEach((spotlightImg, index) => {
        if(!(currentIndex === index)) {
            spotlightImg.classList.remove('main-spotlight');
        } else {
            spotlightImg.classList.add('main-spotlight');
        }
    });
}

const addAmount = () => {
    const currentAmount = Number(amount.textContent);
    amount.textContent = currentAmount + 1;
    setCartToLocalStorage();
}
const minusAmount = () => {
    const currentAmount = Number(amount.textContent);
    if(currentAmount === 0) return;
    amount.textContent = currentAmount - 1;
    setCartToLocalStorage();
    // display empty state if cart has no item
    if(Number(amount.textContent) === 0) {
        cartAmount.textContent = 0;
        displayEmptyCart();
        removeCartfromLocalStorage();
        return;
    }
}

const updateCart = () => {
    const {value, items, price, totalPrice} = getCartFromLocalStorage();
    cartAmount.textContent = value || 0;
    cartItems.textContent = items;
    cartPrice.textContent = price;
    cartTotalPrice.textContent = totalPrice;
    setupCart();
}

const addToCart = () => {
    updateCart();
    // set back to 0
    amount.textContent = 0;
}

const toggleCartModal = () => {
    cartModalNode.classList.toggle('show-cart-modal');
}

const closeCartModal = (e) => {
    if(!e.target.parentElement.classList.contains('cart-btn')) {
        cartModalNode.classList.remove('show-cart-modal');
    }
}

const openSidebar = () => {
    bodyCoverNode.classList.add('show-body-cover');
    sidebarNode.classList.add('show-sidebar');
}
const closeSidebar = () => {
    bodyCoverNode.classList.remove('show-body-cover');
    sidebarNode.classList.remove('show-sidebar');
}

const removeCartProduct = () => {
    removeCartfromLocalStorage();
    setupCart();
    amount.textContent = 0;
    cartAmount.textContent = 0;
}

const setCartToLocalStorage = () => {
    const cart = {
        value: amount.textContent,
        items: amount.textContent,
        price: productPrice.textContent,
        totalPrice: `$${Number(amount.textContent) * Number(productPrice.textContent.slice(1))}`
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

const getCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) return {};
    return cart;
}

const removeCartfromLocalStorage = () => {
    localStorage.removeItem('cart');
}

const isCartEmpty = () => {
    const cart = getCartFromLocalStorage();
    if(Object.keys(cart).length === 0) return true;
    return false;
}

const setupCart = () => {
    if(isCartEmpty()) {
        displayEmptyCart();
    } else {
        displayCartContent();
    }
}

const displayEmptyCart = () => {
    cartContent.classList.remove('show-cart-modal-content');
    emptyCart.classList.add('show-cart-empty');
}

const displayCartContent = () => {
    emptyCart.classList.remove('show-cart-empty');
    cartContent.classList.add('show-cart-modal-content');
}

const showLightbox = () => {
    bodyCoverNode.classList.add('show-body-cover');
    lightBoxNode.classList.add('show-lightbox');
}

const closelightbox = () => {
    lightBoxNode.classList.remove('show-lightbox');
    bodyCoverNode.classList.remove('show-body-cover');
    setActiveImg();
}

const setActiveImg = () => {
    productImages.forEach((productImg, index) => {
    if(currentIndex === index) {
        productImg.parentElement.classList.add('active-img');
    } else {
        productImg.parentElement.classList.remove('active-img');
    }
    });
}

productImages.forEach((productImg, index) => {
    let imgSrc = productImg.src.replace('-thumbnail', '');
    // once the app load dispay the active img correspond to main img
    if(mainImg.src === imgSrc) {
        productImg.parentElement.classList.add('active-img');
    } else {
        productImg.parentElement.classList.remove('active-img');
    }
    productImg.addEventListener('click', () => {
        mainImg.src = imgSrc;
        productImages.forEach(sameProductImg => {
            if(mainImg.src === sameProductImg.src.replace('-thumbnail', '')) {
                sameProductImg.parentElement.classList.add('active-img');
            } else{
                sameProductImg.parentElement.classList.remove('active-img');
            }
        })
    })
})

// when user click the image, it will navigate to that aside from clicking next/prev btn
lightBoxThumbnailImages.forEach((thumbnailImg, index) => {
    thumbnailImg.addEventListener('click', () => {
        displayImage('navigate', index);
    })
})

nextBtn.addEventListener('click', () => {
    console.log("hello");
    displayImage('next', null, 'mobile');
});
previousBtn.addEventListener('click', () => {
    displayImage('previous', null, 'mobile');
});

lightboxNextBtn.addEventListener('click', () => {
    displayImage('next');
});
lightboxPrevBtn.addEventListener('click', () => {
    displayImage('previous');
});

window.addEventListener('keyup', (e) => {
    if(e.key === 'Escape') {
        closelightbox();
    }
})

addBtn.addEventListener('click', addAmount);
minusBtn.addEventListener('click', minusAmount);
addToCartBtn.addEventListener('click', addToCart);
cartBtn.addEventListener('click', toggleCartModal);
deleteBtn.addEventListener('click', removeCartProduct);
menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
window.addEventListener('click', closeCartModal);
mainImg.addEventListener('click', showLightbox);
lightBoxCloseBtn.addEventListener('click', closelightbox);

updateCart();
setupCart()