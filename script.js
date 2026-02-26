/* =============================================
   LUXE Store - Main JavaScript
   ============================================= */

// ==================== Product Data ====================
const products = [
    {
        id: 1,
        name: 'Classic Oxford Shirt',
        category: 'men',
        price: 1499,
        oldPrice: 2499,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        badge: 'sale',
        tag: 'bestseller',
        rating: 4.5,
        description: 'A timeless classic oxford shirt crafted from premium cotton. Perfect for any occasion.'
    },
    {
        id: 2,
        name: 'Elegant Summer Dress',
        category: 'women',
        price: 2499,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
        badge: 'new',
        tag: 'new',
        rating: 5,
        description: 'Flowing summer dress with elegant details. Made from lightweight, breathable fabric.'
    },
    {
        id: 3,
        name: 'Premium Leather Watch',
        category: 'accessories',
        price: 4999,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
        badge: 'new',
        tag: 'new',
        rating: 4.8,
        description: 'Sophisticated timepiece with genuine leather strap and Swiss movement.'
    },
    {
        id: 4,
        name: 'Urban Sneakers',
        category: 'shoes',
        price: 3499,
        oldPrice: 4999,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        badge: 'sale',
        tag: 'sale',
        rating: 4.7,
        description: 'Contemporary urban sneakers combining style and comfort. Perfect for everyday wear.'
    },
    {
        id: 5,
        name: 'Slim Fit Blazer',
        category: 'men',
        price: 5999,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
        badge: null,
        tag: 'bestseller',
        rating: 4.6,
        description: 'Modern slim fit blazer tailored for the contemporary gentleman.'
    },
    {
        id: 6,
        name: 'Designer Handbag',
        category: 'accessories',
        price: 6999,
        oldPrice: 8999,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
        badge: 'sale',
        tag: 'sale',
        rating: 4.9,
        description: 'Luxurious designer handbag crafted from premium Italian leather.'
    },
    {
        id: 7,
        name: 'Bohemian Maxi Skirt',
        category: 'women',
        price: 1999,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
        badge: 'new',
        tag: 'new',
        rating: 4.4,
        description: 'Flowing bohemian maxi skirt with beautiful patterns and comfortable fit.'
    },
    {
        id: 8,
        name: 'Classic Loafers',
        category: 'shoes',
        price: 3999,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500',
        badge: null,
        tag: 'bestseller',
        rating: 4.5,
        description: 'Timeless classic loafers handcrafted from premium leather.'
    },
    {
        id: 9,
        name: 'Cashmere Sweater',
        category: 'women',
        price: 2999,
        oldPrice: 3999,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
        badge: 'sale',
        tag: 'sale',
        rating: 4.8,
        description: 'Luxuriously soft cashmere sweater for ultimate comfort and style.'
    },
    {
        id: 10,
        name: 'Aviator Sunglasses',
        category: 'accessories',
        price: 1299,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        badge: 'new',
        tag: 'new',
        rating: 4.6,
        description: 'Classic aviator sunglasses with polarized lenses and metal frame.'
    },
    {
        id: 11,
        name: 'Denim Jacket',
        category: 'men',
        price: 2499,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
        badge: null,
        tag: 'bestseller',
        rating: 4.7,
        description: 'Versatile denim jacket with a modern fit. A wardrobe essential.'
    },
    {
        id: 12,
        name: 'Running Shoes Pro',
        category: 'shoes',
        price: 4499,
        oldPrice: 5999,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
        badge: 'sale',
        tag: 'sale',
        rating: 4.9,
        description: 'Professional running shoes with advanced cushioning technology.'
    }
];

// ==================== Cart State ====================
let cart = JSON.parse(localStorage.getItem('luxeCart')) || [];

// ==================== Utility Functions ====================
function formatPrice(price) {
    return '₹' + price.toFixed(0);
}

function saveCart() {
    localStorage.setItem('luxeCart', JSON.stringify(cart));
    updateCartUI();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== Preloader ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    }
});

// ==================== Header Scroll Effect ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== Mobile Navigation ====================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ==================== Search Modal ====================
const searchBtn = document.querySelector('.search-btn');
const searchModal = document.getElementById('search-modal');
const searchClose = document.getElementById('search-close');

if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        searchModal.querySelector('input').focus();
    });
    
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });
    }
    
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });
}

// ==================== Hero Slider ====================
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    startAutoSlide();
}

// ==================== Product Rendering ====================
function renderProductCard(product) {
    const badgeHTML = product.badge 
        ? `<span class="product-badge badge-${product.badge}">${product.badge}</span>` 
        : '';
    
    const oldPriceHTML = product.oldPrice 
        ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` 
        : '';
    
    const stars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 !== 0;
    let starsHTML = '';
    for (let i = 0; i < stars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalf) starsHTML += '<i class="fas fa-star-half-alt"></i>';
    
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-tag="${product.tag}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badges">
                    ${badgeHTML}
                </div>
                <div class="product-actions">
                    <button class="action-btn wishlist-btn" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn quick-view-btn" title="Quick View" data-id="${product.id}">
                        <i class="far fa-eye"></i>
                    </button>
                </div>
                <button class="product-add-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i>
                    Add to Cart
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${oldPriceHTML}
                </div>
                <div class="product-rating">
                    ${starsHTML}
                </div>
            </div>
        </div>
    `;
}

// Render products on homepage
const productsGrid = document.getElementById('products-grid');
if (productsGrid) {
    const featuredProducts = products.slice(0, 8);
    productsGrid.innerHTML = featuredProducts.map(renderProductCard).join('');
}

// Render products on shop page
const shopProductsGrid = document.getElementById('shop-products-grid');
if (shopProductsGrid) {
    shopProductsGrid.innerHTML = products.map(renderProductCard).join('');
}

// Render related products on cart page
const relatedProducts = document.getElementById('related-products');
if (relatedProducts) {
    const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
    relatedProducts.innerHTML = randomProducts.map(renderProductCard).join('');
}

// ==================== Product Filter ====================
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            if (filter === 'all' || card.dataset.tag === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==================== Cart Functionality ====================
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');

function openCart() {
    if (cartSidebar) cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (cartBtn) cartBtn.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    showNotification(`${product.name} added to cart!`);
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = totalItems;
    });
    
    // Update cart sidebar
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                    <a href="shop.html" class="btn btn-primary">Shop Now</a>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">${formatPrice(item.price)}</p>
                        <div class="cart-item-quantity">
                            <button class="qty-btn decrease-qty" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn increase-qty" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    // Update subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
    
    // Update cart page
    updateCartPage();
}

// Event delegation for cart actions
document.addEventListener('click', (e) => {
    // Add to cart
    if (e.target.closest('.product-add-cart')) {
        const productId = parseInt(e.target.closest('.product-add-cart').dataset.id);
        addToCart(productId);
    }
    
    // Quick add to cart from product card
    if (e.target.closest('.add-to-cart-btn')) {
        const modal = document.getElementById('quick-view-modal');
        if (modal) {
            const productId = parseInt(modal.dataset.currentProduct);
            const quantity = parseInt(modal.querySelector('.quantity-selector input').value) || 1;
            addToCart(productId, quantity);
            closeQuickView();
        }
    }
    
    // Decrease quantity
    if (e.target.closest('.decrease-qty')) {
        const productId = parseInt(e.target.closest('.decrease-qty').dataset.id);
        updateQuantity(productId, -1);
    }
    
    // Increase quantity
    if (e.target.closest('.increase-qty')) {
        const productId = parseInt(e.target.closest('.increase-qty').dataset.id);
        updateQuantity(productId, 1);
    }
    
    // Remove from cart
    if (e.target.closest('.cart-item-remove')) {
        const productId = parseInt(e.target.closest('.cart-item-remove').dataset.id);
        removeFromCart(productId);
    }
    
    // Quick view
    if (e.target.closest('.quick-view-btn')) {
        const productId = parseInt(e.target.closest('.quick-view-btn').dataset.id);
        openQuickView(productId);
    }
    
    // Wishlist
    if (e.target.closest('.wishlist-btn')) {
        e.target.closest('.wishlist-btn').querySelector('i').classList.toggle('fas');
        e.target.closest('.wishlist-btn').querySelector('i').classList.toggle('far');
        showNotification('Item added to wishlist!');
    }
});

// Initialize cart UI
updateCartUI();

// ==================== Cart Page Functionality ====================
function updateCartPage() {
    const cartTableBody = document.getElementById('cart-table-body');
    const cartEmptyPage = document.getElementById('cart-empty-page');
    const cartLayout = document.querySelector('.cart-layout');
    
    if (!cartTableBody) return;
    
    if (cart.length === 0) {
        if (cartLayout) cartLayout.style.display = 'none';
        if (cartEmptyPage) cartEmptyPage.style.display = 'block';
        return;
    }
    
    if (cartLayout) cartLayout.style.display = 'grid';
    if (cartEmptyPage) cartEmptyPage.style.display = 'none';
    
    cartTableBody.innerHTML = cart.map(item => `
        <div class="cart-table-item" data-id="${item.id}">
            <div class="item-product">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Size: M | Color: Black</p>
                </div>
            </div>
            <div class="item-price" data-label="Price: ">${formatPrice(item.price)}</div>
            <div class="item-quantity" data-label="Qty: ">
                <button class="qty-btn decrease-qty" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
                <button class="qty-btn increase-qty" data-id="${item.id}">+</button>
            </div>
            <div class="item-total" data-label="Total: ">${formatPrice(item.price * item.quantity)}</div>
            <button class="item-remove cart-item-remove" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    // Update summary
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTax = document.getElementById('summary-tax');
    const summaryTotal = document.getElementById('summary-total');
    
    if (summarySubtotal) summarySubtotal.textContent = formatPrice(subtotal);
    if (summaryTax) summaryTax.textContent = formatPrice(tax);
    if (summaryTotal) summaryTotal.textContent = formatPrice(total);
}

// Clear cart button
const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCart();
            showNotification('Cart cleared!');
        }
    });
}

// ==================== Quick View Modal ====================
const quickViewModal = document.getElementById('quick-view-modal');
const quickViewOverlay = document.getElementById('quick-view-overlay');
const quickViewClose = document.getElementById('quick-view-close');

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !quickViewModal) return;
    
    quickViewModal.dataset.currentProduct = productId;
    
    document.getElementById('quick-view-image').src = product.image;
    document.getElementById('quick-view-category').textContent = product.category;
    document.getElementById('quick-view-name').textContent = product.name;
    document.getElementById('quick-view-price').textContent = formatPrice(product.price);
    document.getElementById('quick-view-description').textContent = product.description;
    
    quickViewModal.classList.add('active');
    quickViewOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    if (quickViewModal) quickViewModal.classList.remove('active');
    if (quickViewOverlay) quickViewOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (quickViewClose) quickViewClose.addEventListener('click', closeQuickView);
if (quickViewOverlay) quickViewOverlay.addEventListener('click', closeQuickView);

// Quantity selector in quick view
document.addEventListener('click', (e) => {
    if (e.target.closest('.quantity-selector .minus')) {
        const input = e.target.closest('.quantity-selector').querySelector('input');
        if (input.value > 1) input.value = parseInt(input.value) - 1;
    }
    if (e.target.closest('.quantity-selector .plus')) {
        const input = e.target.closest('.quantity-selector').querySelector('input');
        if (input.value < 10) input.value = parseInt(input.value) + 1;
    }
});

// ==================== Shop Sidebar Filter ====================
const filterToggle = document.getElementById('filter-toggle');
const shopSidebar = document.getElementById('shop-sidebar');
const sidebarClose = document.getElementById('sidebar-close');

if (filterToggle && shopSidebar) {
    filterToggle.addEventListener('click', () => {
        shopSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            shopSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// View toggle (grid/list)
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const view = btn.dataset.view;
        const grid = document.getElementById('shop-products-grid');
        if (grid) {
            grid.classList.toggle('list-view', view === 'list');
        }
    });
});

// Price slider
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');
if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', () => {
        priceValue.textContent = '$' + priceSlider.value;
    });
}

// Size buttons
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Color buttons
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ==================== FAQ Accordion ====================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ==================== Auth Tabs ====================
const authTabs = document.querySelectorAll('.auth-tab');
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const tabId = tab.dataset.tab;
        document.querySelectorAll('.auth-form-wrapper').forEach(form => {
            form.classList.toggle('active', form.id === `${tabId}-form`);
        });
    });
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const icon = btn.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
});

// Password strength indicator
const regPassword = document.getElementById('reg-password');
const strengthBar = document.querySelector('.strength-bar');
if (regPassword && strengthBar) {
    regPassword.addEventListener('input', () => {
        const value = regPassword.value;
        let strength = 0;
        
        if (value.length >= 8) strength += 25;
        if (/[a-z]/.test(value)) strength += 25;
        if (/[A-Z]/.test(value)) strength += 25;
        if (/[0-9]/.test(value) || /[^a-zA-Z0-9]/.test(value)) strength += 25;
        
        strengthBar.style.width = strength + '%';
        
        if (strength <= 25) strengthBar.style.background = '#e94560';
        else if (strength <= 50) strengthBar.style.background = '#ffa502';
        else if (strength <= 75) strengthBar.style.background = '#c9a227';
        else strengthBar.style.background = '#38a169';
    });
}

// ==================== Contact Form ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully! We will get back to you soon.');
        contactForm.reset();
    });
}

// ==================== Newsletter Form ====================
document.querySelectorAll('.promo-form, .cta-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you for subscribing!');
        form.reset();
    });
});

// ==================== Back to Top ====================
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== Stats Counter Animation ====================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for stats animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// ==================== Notification Styles ====================
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        background: var(--bg-primary);
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 5000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success i {
        color: #38a169;
    }
    
    .notification.error i {
        color: #e94560;
    }
    
    .notification span {
        font-size: 0.875rem;
        color: var(--text-primary);
    }
`;
document.head.appendChild(notificationStyles);

// ==================== Smooth Scroll for Anchor Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('LUXE Store - All systems operational! 🛍️');
