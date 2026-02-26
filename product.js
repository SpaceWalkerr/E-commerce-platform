// Product Page JavaScript

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id')) || 1;

// Sample product images (in a real app, these would come from an API)
const productImages = [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800'
];

// Sample reviews
const sampleReviews = [
    {
        name: 'Priya Sharma',
        avatar: 'PS',
        date: '2 weeks ago',
        rating: 5,
        title: 'Absolutely love it!',
        text: 'This product exceeded my expectations. The quality is amazing and it fits perfectly. Will definitely buy more from LUXE Store!',
        helpful: 24
    },
    {
        name: 'Rahul Kumar',
        avatar: 'RK',
        date: '1 month ago',
        rating: 4,
        title: 'Great quality for the price',
        text: 'Very good product. The material feels premium and the stitching is neat. Only reason for 4 stars is that the color was slightly different from the photos.',
        helpful: 18
    },
    {
        name: 'Ananya Singh',
        avatar: 'AS',
        date: '1 month ago',
        rating: 5,
        title: 'Perfect fit!',
        text: 'I was worried about ordering clothes online but LUXE got my size perfect. The delivery was also quick. Highly recommended!',
        helpful: 31
    }
];

let currentImageIndex = 0;
let selectedColor = 'Black';
let selectedSize = 'M';
let quantity = 1;

// Initialize product page
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
    initGallery();
    initOptions();
    initQuantity();
    initTabs();
    initModals();
    initActions();
    loadReviews();
    loadRelatedProducts();
    loadRecentlyViewed();
    initSearch();
});

// Load product data
function loadProduct() {
    const product = products.find(p => p.id === productId) || products[0];
    
    // Update page title
    document.title = `${product.name} - LUXE Store`;
    
    // Update breadcrumb
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-breadcrumb').textContent = product.name;
    
    // Update product info
    document.getElementById('product-brand').textContent = 'LUXE';
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('current-price').textContent = formatPrice(product.price);
    
    if (product.originalPrice) {
        document.getElementById('original-price').textContent = formatPrice(product.originalPrice);
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        document.getElementById('discount-badge').textContent = `-${discount}%`;
    } else {
        document.getElementById('original-price').style.display = 'none';
        document.getElementById('discount-badge').style.display = 'none';
    }
    
    document.getElementById('product-description').textContent = product.description || 'Experience luxury with this premium product from LUXE Store. Crafted with attention to detail and the finest materials.';
    document.getElementById('full-description').textContent = product.description || 'Experience luxury like never before with this premium product. Crafted with the finest materials and attention to detail, this piece is designed to elevate your style and provide unmatched comfort. Perfect for both casual and formal occasions, this versatile piece will become a staple in your wardrobe.';
    document.getElementById('product-sku').textContent = `LUXE-${String(product.id).padStart(3, '0')}`;
    
    // Update badges
    const badgesContainer = document.getElementById('product-badges');
    badgesContainer.innerHTML = '';
    if (product.originalPrice) {
        badgesContainer.innerHTML += '<span class="badge badge-sale">Sale</span>';
    }
    if (product.isNew) {
        badgesContainer.innerHTML += '<span class="badge badge-new">New</span>';
    }
    if (product.isHot) {
        badgesContainer.innerHTML += '<span class="badge badge-hot">Hot</span>';
    }
    
    // Update main image
    document.getElementById('main-image').src = product.image;
    
    // Track recently viewed
    trackRecentlyViewed(product);
}

// Initialize gallery
function initGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbsContainer = document.getElementById('gallery-thumbs');
    const product = products.find(p => p.id === productId) || products[0];
    
    // Create gallery images array
    const allImages = [product.image, ...productImages.slice(1)];
    
    // Create thumbnails
    thumbsContainer.innerHTML = allImages.map((img, index) => `
        <div class="thumb-item ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${img}" alt="Product thumbnail ${index + 1}">
        </div>
    `).join('');
    
    // Thumbnail click handler
    thumbsContainer.querySelectorAll('.thumb-item').forEach(thumb => {
        thumb.addEventListener('click', () => {
            currentImageIndex = parseInt(thumb.dataset.index);
            updateGallery(allImages);
        });
    });
    
    // Navigation buttons
    document.getElementById('gallery-prev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        updateGallery(allImages);
    });
    
    document.getElementById('gallery-next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        updateGallery(allImages);
    });
    
    // Initialize zoom (desktop only)
    if (window.innerWidth > 1024) {
        initZoom(allImages);
    }
}

function updateGallery(images) {
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.thumb-item');
    
    mainImage.src = images[currentImageIndex];
    
    thumbs.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function initZoom(images) {
    const container = document.getElementById('zoom-container');
    const lens = document.getElementById('zoom-lens');
    const result = document.getElementById('zoom-result');
    const mainImage = document.getElementById('main-image');
    
    container.addEventListener('mouseenter', () => {
        lens.style.display = 'block';
        result.style.display = 'block';
        result.style.backgroundImage = `url(${images[currentImageIndex]})`;
    });
    
    container.addEventListener('mouseleave', () => {
        lens.style.display = 'none';
        result.style.display = 'none';
    });
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position lens
        let lensX = x - lens.offsetWidth / 2;
        let lensY = y - lens.offsetHeight / 2;
        
        // Boundaries
        lensX = Math.max(0, Math.min(lensX, container.offsetWidth - lens.offsetWidth));
        lensY = Math.max(0, Math.min(lensY, container.offsetHeight - lens.offsetHeight));
        
        lens.style.left = lensX + 'px';
        lens.style.top = lensY + 'px';
        
        // Calculate zoom
        const zoomX = (lensX / (container.offsetWidth - lens.offsetWidth)) * 100;
        const zoomY = (lensY / (container.offsetHeight - lens.offsetHeight)) * 100;
        
        result.style.backgroundPosition = `${zoomX}% ${zoomY}%`;
        result.style.backgroundSize = `${container.offsetWidth * 2}px ${container.offsetHeight * 2}px`;
    });
}

// Initialize options
function initOptions() {
    // Color options
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedColor = btn.dataset.color;
            document.getElementById('selected-color').textContent = selectedColor;
        });
    });
    
    // Size options
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = btn.dataset.size;
            document.getElementById('selected-size').textContent = selectedSize;
        });
    });
}

// Initialize quantity
function initQuantity() {
    const input = document.getElementById('qty-input');
    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            input.value = quantity;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        if (quantity < 10) {
            quantity++;
            input.value = quantity;
        }
    });
    
    input.addEventListener('change', () => {
        let val = parseInt(input.value);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 10) val = 10;
        quantity = val;
        input.value = quantity;
    });
}

// Initialize tabs
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Rating count click scrolls to reviews
    document.querySelector('.rating-count').addEventListener('click', () => {
        document.querySelector('[data-tab="reviews"]').click();
        document.querySelector('.product-tabs').scrollIntoView({ behavior: 'smooth' });
    });
}

// Initialize modals
function initModals() {
    // Size guide modal
    const sizeGuideBtn = document.getElementById('size-guide-btn');
    const sizeGuideModal = document.getElementById('size-guide-modal');
    const sizeGuideClose = document.getElementById('size-guide-close');
    
    sizeGuideBtn.addEventListener('click', () => {
        sizeGuideModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    sizeGuideClose.addEventListener('click', () => {
        sizeGuideModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Review modal
    const writeReviewBtn = document.getElementById('write-review-btn');
    const reviewModal = document.getElementById('review-modal');
    const reviewClose = document.getElementById('review-close');
    
    writeReviewBtn.addEventListener('click', () => {
        reviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    reviewClose.addEventListener('click', () => {
        reviewModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modals on overlay click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Rating select in review form
    const ratingStars = document.querySelectorAll('#rating-select i');
    let selectedRating = 0;
    
    ratingStars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            updateRatingDisplay(rating);
        });
        
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            updateRatingDisplay(selectedRating);
            ratingStars.forEach((s, i) => {
                s.classList.toggle('active', i < selectedRating);
            });
        });
    });
    
    document.getElementById('rating-select').addEventListener('mouseleave', () => {
        updateRatingDisplay(selectedRating);
    });
    
    function updateRatingDisplay(rating) {
        ratingStars.forEach((star, index) => {
            star.className = index < rating ? 'fas fa-star' : 'far fa-star';
        });
    }
    
    // Review form submission
    document.getElementById('review-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('success', 'Review Submitted', 'Thank you for your review!');
        reviewModal.classList.remove('active');
        document.body.style.overflow = '';
        e.target.reset();
        selectedRating = 0;
        updateRatingDisplay(0);
    });
}

// Initialize actions
function initActions() {
    const product = products.find(p => p.id === productId) || products[0];
    
    // Add to cart
    document.getElementById('add-to-cart').addEventListener('click', () => {
        const cartItem = {
            ...product,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity
        };
        
        addToCart(cartItem);
        showToast('success', 'Added to Cart', `${product.name} has been added to your cart.`);
    });
    
    // Add to wishlist
    const wishlistBtn = document.getElementById('add-to-wishlist');
    const wishlist = JSON.parse(localStorage.getItem('luxeWishlist')) || [];
    
    if (wishlist.some(item => item.id === product.id)) {
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    
    wishlistBtn.addEventListener('click', () => {
        toggleWishlist(product);
        wishlistBtn.classList.toggle('active');
        
        if (wishlistBtn.classList.contains('active')) {
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            showToast('success', 'Added to Wishlist', `${product.name} has been added to your wishlist.`);
        } else {
            wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
            showToast('info', 'Removed from Wishlist', `${product.name} has been removed from your wishlist.`);
        }
    });
    
    // Buy now
    document.getElementById('buy-now').addEventListener('click', () => {
        const cartItem = {
            ...product,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity
        };
        
        addToCart(cartItem);
        window.location.href = 'checkout.html';
    });
}

// Wishlist functions
function toggleWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('luxeWishlist')) || [];
    const index = wishlist.findIndex(item => item.id === product.id);
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(product);
    }
    
    localStorage.setItem('luxeWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('luxeWishlist')) || [];
    const countElement = document.getElementById('wishlist-count');
    if (countElement) {
        countElement.textContent = wishlist.length;
    }
}

// Load reviews
function loadReviews() {
    const reviewsList = document.getElementById('reviews-list');
    
    reviewsList.innerHTML = sampleReviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.avatar}</div>
                    <div>
                        <div class="reviewer-name">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                    ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                </div>
            </div>
            <h4 class="review-title">${review.title}</h4>
            <p class="review-text">${review.text}</p>
            <div class="review-helpful">
                <span>Was this helpful?</span>
                <button class="helpful-btn">
                    <i class="far fa-thumbs-up"></i>
                    Yes (${review.helpful})
                </button>
                <button class="helpful-btn">
                    <i class="far fa-thumbs-down"></i>
                    No
                </button>
            </div>
        </div>
    `).join('');
}

// Load related products
function loadRelatedProducts() {
    const container = document.getElementById('related-products');
    const currentProduct = products.find(p => p.id === productId) || products[0];
    
    // Get products from same category, excluding current product
    let related = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
    
    // If not enough, add random products
    if (related.length < 4) {
        const others = products.filter(p => p.id !== currentProduct.id && !related.includes(p));
        related = [...related, ...others.slice(0, 4 - related.length)];
    }
    
    container.innerHTML = related.slice(0, 4).map(product => createProductCard(product)).join('');
    initProductCards(container);
}

// Load recently viewed products
function loadRecentlyViewed() {
    const container = document.getElementById('recently-viewed');
    const recentlyViewed = JSON.parse(localStorage.getItem('luxeRecentlyViewed')) || [];
    
    // Filter out current product and get last 4
    const filtered = recentlyViewed.filter(p => p.id !== productId).slice(0, 4);
    
    if (filtered.length === 0) {
        container.closest('.recently-viewed').style.display = 'none';
        return;
    }
    
    container.innerHTML = filtered.map(product => createProductCard(product)).join('');
    initProductCards(container);
}

// Track recently viewed
function trackRecentlyViewed(product) {
    let recentlyViewed = JSON.parse(localStorage.getItem('luxeRecentlyViewed')) || [];
    
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(p => p.id !== product.id);
    
    // Add to beginning
    recentlyViewed.unshift(product);
    
    // Keep only last 10
    recentlyViewed = recentlyViewed.slice(0, 10);
    
    localStorage.setItem('luxeRecentlyViewed', JSON.stringify(recentlyViewed));
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="product-actions-overlay">
                    <button class="action-btn quick-view" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn wishlist-toggle" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-details">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating}</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <button class="btn btn-primary add-to-cart-quick">Add to Cart</button>
            </div>
        </div>
    `;
}

// Initialize product card interactions
function initProductCards(container) {
    container.querySelectorAll('.add-to-cart-quick').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToCart(product);
                showToast('success', 'Added to Cart', `${product.name} has been added to your cart.`);
            }
        });
    });
    
    container.querySelectorAll('.wishlist-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                toggleWishlist(product);
                btn.classList.toggle('active');
                
                if (btn.classList.contains('active')) {
                    btn.innerHTML = '<i class="fas fa-heart"></i>';
                    showToast('success', 'Added to Wishlist', `${product.name} added to wishlist.`);
                } else {
                    btn.innerHTML = '<i class="far fa-heart"></i>';
                    showToast('info', 'Removed', `${product.name} removed from wishlist.`);
                }
            }
        });
    });
}

// Initialize search
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('search-suggestions');
    
    if (!searchToggle) return;
    
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
    
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            suggestions.innerHTML = '';
            return;
        }
        
        const matches = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        ).slice(0, 5);
        
        suggestions.innerHTML = matches.map(product => `
            <div class="suggestion-item" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">${formatPrice(product.price)}</div>
                </div>
            </div>
        `).join('');
    });
    
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    });
}

// Toast notification function
function showToast(type, title, message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const icons = {
        success: 'fa-check',
        error: 'fa-times',
        info: 'fa-info'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icons[type]}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// Update wishlist count on load
updateWishlistCount();
