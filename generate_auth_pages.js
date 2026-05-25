const fs = require('fs');

try {
    const content = fs.readFileSync('error.html', 'utf8');

    const startMarker = '<!-- Error Page Start-->';
    const endMarker = '<!-- Footer Section Start-->';

    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);

    if (startIdx === -1 || endIdx === -1) {
        console.log("Markers not found");
        process.exit(1);
    }

    const header = content.substring(0, startIdx);
    let footer = endMarker + content.substring(endIdx + endMarker.length);
    
    // Inject auth script before closing body
    footer = footer.replace('</body>', '    <script src="js/auth.js"></script>\n</body>');

    // Login HTML
    const loginContent = `<!-- Login Page Start-->
    <div class="login-page section-padding" style="padding: 100px 0;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8">
                    <div class="form-wrapper" style="box-shadow: 0 5px 20px rgba(0,0,0,0.05); padding: 40px; border-radius: 10px; background: #fff;">
                        <h2 class="text-center mb-4">Login to Your Account</h2>
                        <form id="loginForm">
                            <div id="loginError" class="alert alert-danger" style="display: none;"></div>
                            <div class="form-group mb-3">
                                <label for="email" class="mb-2">Email Address</label>
                                <input type="email" class="form-control" id="email" required placeholder="Enter your email" style="height: 50px;">
                            </div>
                            <div class="form-group mb-4">
                                <label for="password" class="mb-2">Password</label>
                                <input type="password" class="form-control" id="password" required placeholder="Enter your password" style="height: 50px;">
                            </div>
                            <button type="submit" class="primary-btn1 black-bg w-100 border-0" style="height: 50px; justify-content: center; width: 100%;">
                                <span>Login Now</span>
                            </button>
                            <p class="text-center mt-4 mb-0">Don't have an account? <a href="register.html" style="color: var(--primary-color1);">Register here</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('loginForm');
            const loginError = document.getElementById('loginError');

            if (loginForm) {
                loginForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    loginError.style.display = 'none';
                    const email = document.getElementById('email').value;
                    const password = document.getElementById('password').value;
                    
                    const btn = loginForm.querySelector('button[type="submit"]');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<span>Loading...</span>';
                    btn.disabled = true;

                    const res = await login(email, password);
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;

                    if (res.success) {
                        window.location.href = 'index.html';
                    } else {
                        loginError.textContent = res.error;
                        loginError.style.display = 'block';
                    }
                });
            }
        });
    </script>\n    `;

    // Register HTML
    const registerContent = `<!-- Register Page Start-->
    <div class="register-page section-padding" style="padding: 100px 0;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8">
                    <div class="form-wrapper" style="box-shadow: 0 5px 20px rgba(0,0,0,0.05); padding: 40px; border-radius: 10px; background: #fff;">
                        <h2 class="text-center mb-4">Create an Account</h2>
                        <form id="registerForm">
                            <div id="registerError" class="alert alert-danger" style="display: none;"></div>
                            <div class="form-group mb-3">
                                <label for="regName" class="mb-2">Full Name</label>
                                <input type="text" class="form-control" id="regName" required placeholder="Enter your full name" style="height: 50px;">
                            </div>
                            <div class="form-group mb-3">
                                <label for="regEmail" class="mb-2">Email Address</label>
                                <input type="email" class="form-control" id="regEmail" required placeholder="Enter your email" style="height: 50px;">
                            </div>
                            <div class="form-group mb-3">
                                <label for="regPassword" class="mb-2">Password</label>
                                <input type="password" class="form-control" id="regPassword" required placeholder="Create a password" style="height: 50px;">
                            </div>
                            <div class="form-group mb-4">
                                <label for="regConfirmPassword" class="mb-2">Confirm Password</label>
                                <input type="password" class="form-control" id="regConfirmPassword" required placeholder="Confirm your password" style="height: 50px;">
                            </div>
                            <button type="submit" class="primary-btn1 black-bg w-100 border-0" style="height: 50px; justify-content: center; width: 100%;">
                                <span>Register Now</span>
                            </button>
                            <p class="text-center mt-4 mb-0">Already have an account? <a href="login.html" style="color: var(--primary-color1);">Login here</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const registerForm = document.getElementById('registerForm');
            const registerError = document.getElementById('registerError');

            if (registerForm) {
                registerForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    registerError.style.display = 'none';
                    
                    const name = document.getElementById('regName').value;
                    const email = document.getElementById('regEmail').value;
                    const password = document.getElementById('regPassword').value;
                    const confirmPassword = document.getElementById('regConfirmPassword').value;

                    if (password !== confirmPassword) {
                        registerError.textContent = 'Passwords do not match.';
                        registerError.style.display = 'block';
                        return;
                    }
                    
                    const btn = registerForm.querySelector('button[type="submit"]');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<span>Loading...</span>';
                    btn.disabled = true;

                    const res = await register(name, email, password);
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;

                    if (res.success) {
                        window.location.href = 'login.html';
                    } else {
                        registerError.textContent = res.error;
                        registerError.style.display = 'block';
                    }
                });
            }
        });
    </script>\n    `;

    fs.writeFileSync('login.html', header + loginContent + footer, 'utf8');
    fs.writeFileSync('register.html', header + registerContent + footer, 'utf8');

    console.log("login.html and register.html created successfully.");
} catch (e) {
    console.error("Error:", e);
}
