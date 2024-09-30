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
        
        // Verificación con las credenciales proporcionadas
        if (username === 'mor_2314' && password === '83r5^_') {
            alert('Inicio de sesión exitoso');
            // Aquí puedes redirigir al usuario a la página principal o realizar otras acciones
        } else {
            this.showError('Credenciales inválidas. Por favor, intente de nuevo.');
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }
}

// Inicializar el formulario cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});