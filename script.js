document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const profilesContainer = document.getElementById('profilesContainer');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(registrationForm);
            const user = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
            };
            localStorage.setItem(user.email, JSON.stringify(user));
            alert('Registration successful');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const email = formData.get('email');
            const password = formData.get('password');
            const storedUser = localStorage.getItem(email);
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.password === password) {
                    alert('Login successful');
                } else {
                    alert('Incorrect password');
                }
            } else {
                alert('User not found');
            }
        });
    }

    if (profilesContainer) {
        Object.keys(localStorage).forEach((key) => {
            const user = JSON.parse(localStorage.getItem(key));
            const profileDiv = document.createElement('div');
            profileDiv.className = 'profile';
            profileDiv.innerHTML = `
                <h3>${user.username}</h3>
                <p>Email: ${user.email}</p>
            `;
            profilesContainer.appendChild(profileDiv);
        });
    }
});
