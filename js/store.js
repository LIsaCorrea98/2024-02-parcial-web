class Store {
    constructor() {
        this.products = [];
        this.categories = [];
        this.cart = [];
        this.activeCategories = new Set();
        this.init();
    }

    init() {
        this.fetchCategories();
        this.fetchProducts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('searchForm').addEventListener('submit', this.handleSearch.bind(this));
        document.getElementById('cartButton').addEventListener('click', this.viewCart.bind(this));
        document.getElementById('logoutButton').addEventListener('click', this.logout.bind(this));
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
        const categoryTags = document.getElementById('categoryTags');
        this.categories.forEach(category => {
            const tag = document.createElement('span');
            tag.className = 'category-tag';
            tag.textContent = category;
            tag.addEventListener('click', () => this.toggleCategory(category));
            categoryTags.appendChild(tag);
        });
    }

    toggleCategory(category) {
        const tag = document.querySelector(`.category-tag:contains('${category}')`);
        if (this.activeCategories.has(category)) {
            this.activeCategories.delete(category);
            tag.classList.remove('active');
        } else {
            this.activeCategories.add(category);
            tag.classList.add('active');
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
            this.cart.push(product);
            alert(`${product.title} added to cart!`);
        }
    }


    logout() {
        window.location.href = '../html/login.html';
    }

    viewCart() {
        window.location.href = '../html/cart.html';
    }

}

const store = new Store();

