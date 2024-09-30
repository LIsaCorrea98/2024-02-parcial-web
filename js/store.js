class Store {
    constructor() {
        this.products = [];
        this.categories = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.activeCategories = new Set();
        this.currentUser = null;
        this.init();
    }

    init() {
        this.fetchUser();
        this.fetchCategories();
        this.fetchProducts();
        this.setupEventListeners();
        this.updateCartCount();
    }

    setupEventListeners() {
        document.getElementById('searchForm').addEventListener('submit', this.handleSearch.bind(this));
        document.getElementById('cartButton').addEventListener('click', this.viewCart.bind(this));
        document.getElementById('logoutButton').addEventListener('click', this.logout.bind(this));
    }

    fetchUser() {
        // Simulamos un usuario logueado con ID 2
        fetch('https://fakestoreapi.com/users/2')
            .then(res => res.json())
            .then(user => {
                this.currentUser = user;
                this.updateUserInfo();
            })
            .catch(error => console.error('Error fetching user:', error));
    }

    updateUserInfo() {
        const userInfo = document.getElementById('userInfo');
        if (userInfo && this.currentUser) {
            userInfo.textContent = `Bienvenido, ${this.currentUser.username}`;
        }
    }

    fetchCategories() {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(categories => {
                this.categories = categories;
                this.renderCategories();
            })
            .catch(error => console.error('Error fetching categories:', error));
    }

    renderCategories() {
        const categoryContainer = document.getElementById('categoryContainer');
        categoryContainer.innerHTML = '';
        this.categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.className = 'category-button';
            button.addEventListener('click', () => this.filterByCategory(category));
            categoryContainer.appendChild(button);
        });
    }

    filterByCategory(category) {
        if (this.activeCategories.has(category)) {
            this.activeCategories.delete(category);
        } else {
            this.activeCategories.add(category);
        }
        this.filterProducts();
    }

    fetchProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(products => {
                this.products = products;
                this.renderProducts();
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    renderProducts(filteredProducts = null) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        const productsToRender = filteredProducts || this.products;

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}">
                <div class="price-add">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button onclick="store.addToCart(${product.id})">Add</button>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    handleSearch(e) {
        e.preventDefault();
        this.filterProducts();
    }

    filterProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        let filteredProducts = this.products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );

        if (this.activeCategories.size > 0) {
            filteredProducts = filteredProducts.filter(product => 
                this.activeCategories.has(product.category)
            );
        }

        this.renderProducts(filteredProducts);
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            this.updateCart();
            alert(`${product.title} added to cart!`);
        }
    }

    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    viewCart() {
        window.location.href = '../html/cart.html';
    }

    logout() {
        localStorage.removeItem('cart');
        window.location.href = '../html/login.html';
    }
}

const store = new Store();