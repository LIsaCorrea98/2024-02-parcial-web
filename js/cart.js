class Cart {
    constructor() {
        this.carts = JSON.parse(localStorage.getItem('carts')) || [];
        this.currentUser = null;
        this.init();
    }

    init() {
        this.fetchUser();
        this.setupEventListeners();
        this.renderCarts();
    }

    setupEventListeners() {
        document.getElementById('logoutButton').addEventListener('click', this.logout.bind(this));
        document.getElementById('updateCart').addEventListener('click', this.updateCart.bind(this));
        document.getElementById('confirmCart').addEventListener('click', this.confirmCart.bind(this));
        document.getElementById('continueShopping').addEventListener('click', this.continueShopping.bind(this));
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

    renderCarts() {
        const cartTableBody = document.getElementById('cartTableBody');
        cartTableBody.innerHTML = '';

        if (this.carts.length === 0) {
            cartTableBody.innerHTML = '<tr><td colspan="3">No hay pedidos</td></tr>';
            return;
        }

        this.carts.forEach((cart, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${new Date(cart.date).toLocaleDateString()}</td>
                <td><span class="action-link" onclick="cartApp.viewCart(${index})">Ver</span></td>
            `;
            cartTableBody.appendChild(row);
        });
    }

    viewCart(index) {
        const cart = this.carts[index];
        const cartDetails = document.getElementById('cartDetails');
        cartDetails.style.display = 'block';

        document.getElementById('cartDate').value = new Date(cart.date).toLocaleDateString();
        document.getElementById('cartNumber').value = index + 1;
        document.getElementById('cartCustomer').value = this.currentUser ? this.currentUser.name : 'Cliente';

        const productTableBody = document.getElementById('productTableBody');
        productTableBody.innerHTML = '';

        cart.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.title}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>$${(product.price * product.quantity).toFixed(2)}</td>
            `;
            productTableBody.appendChild(row);
        });

        document.getElementById('cartTotal').textContent = `$${cart.total.toFixed(2)}`;
    }

    updateCart() {
        alert('Funcionalidad de actualización del carrito en desarrollo');
    }

    confirmCart() {
        alert('Pedido confirmado');
        document.getElementById('cartDetails').style.display = 'none';
    }

    continueShopping() {
        window.location.href = '../html/store.html';
    }

    logout() {
        window.location.href = '../html/login.html';
    }
}

const cartApp = new Cart();