class Cart {
    constructor() {
        this.carts = [];
        this.products = [];
        this.currentUser = { id: 2, name: 'John Doe' }; // Simulamos un usuario logueado
        this.init();
    }

    init() {
        this.fetchCarts();
        this.fetchProducts();
        this.setupEventListeners();
        this.updateWelcomeMessage();
    }

    setupEventListeners() {
        document.getElementById('logoutButton').addEventListener('click', this.logout.bind(this));
        document.getElementById('updateCart').addEventListener('click', this.updateCart.bind(this));
        document.getElementById('confirmCart').addEventListener('click', this.confirmCart.bind(this));
        document.getElementById('continueShopping').addEventListener('click', this.continueShopping.bind(this));
    }

    updateWelcomeMessage() {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Bienvenido, ${this.currentUser.name}`;
    }

    fetchCarts() {
        fetch(`https://fakestoreapi.com/carts/user/${this.currentUser.id}`)
            .then(res => res.json())
            .then(carts => {
                this.carts = carts;
                this.renderCarts();
            })
            .catch(error => console.error('Error fetching carts:', error));
    }

    fetchProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(products => {
                this.products = products;
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    renderCarts() {
        const cartTableBody = document.getElementById('cartTableBody');
        cartTableBody.innerHTML = '';

        this.carts.forEach(cart => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cart.id}</td>
                <td>${new Date(cart.date).toLocaleDateString()}</td>
                <td><a href="#" onclick="cartApp.viewCart(${cart.id})">Ver</a></td>
            `;
            cartTableBody.appendChild(row);
        });
    }

    viewCart(cartId) {
        const cart = this.carts.find(c => c.id === cartId);
        if (!cart) return;

        document.getElementById('cartList').style.display = 'none';
        const cartDetails = document.getElementById('cartDetails');
        cartDetails.classList.add('active');

        document.getElementById('cartDate').value = new Date(cart.date).toLocaleDateString();
        document.getElementById('cartNumber').value = cart.id;
        document.getElementById('cartCustomer').value = this.currentUser.name;

        this.renderCartProducts(cart);
    }

    renderCartProducts(cart) {
        const productTableBody = document.getElementById('productTableBody');
        productTableBody.innerHTML = '';
        let total = 0;

        cart.products.forEach(item => {
            const product = this.products.find(p => p.id === item.productId);
            if (!product) return;

            const subtotal = product.price * item.quantity;
            total += subtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.title}</td>
                <td>${item.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
            `;
            productTableBody.appendChild(row);
        });

        document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    }

    updateCart() {
        alert('Funcionalidad de actualización del carrito en desarrollo');
    }

    confirmCart() {
        alert('Pedido confirmado');
        this.continueShopping();
    }

    continueShopping() {
        window.location.href = '../html/store.html';
    }

    logout() {
        window.location.href = '../html/login.html';
    }
}

const cartApp = new Cart();