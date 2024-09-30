class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        const username = this.usernameInput.value;
        const password = this.passwordInput.value;
        
        // Aquí puedes agregar la lógica de verificación
        // Por ahora, solo mostraremos un mensaje de alerta
        if (username === 'usuario' && password === 'contraseña') {
            alert('Inicio de sesión exitoso');
        } else {
            alert('Error: Usuario o contraseña incorrectos');
        }
    }
}

// Inicializar el formulario cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});