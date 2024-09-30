class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.errorMessage = document.getElementById('errorMessage');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        const username = this.usernameInput.value;
        const password = this.passwordInput.value;
        
        if (username === 'mor_2314' && password === '83r5^_') {
            window.location.href = '../html/store.html'; // Redirige a la página de la tienda
        } else {
            this.showError('Credenciales inválidas. Por favor, intente de nuevo.');
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});