const http = require('http');

const request = (options, postData = null) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let parsed = data;
                try { parsed = JSON.parse(data); } catch(e) {}
                resolve({ statusCode: res.statusCode, headers: res.headers, data: parsed });
            });
        });

        req.on('error', (e) => reject(e));

        if (postData) {
            req.write(JSON.stringify(postData));
        }
        req.end();
    });
};

const runTests = async () => {
    console.log("Waiting 10 seconds for server to boot with memory db...");
    await new Promise(r => setTimeout(r, 10000));

    console.log("--- 1. Testing Registration ---");
    const regOptions = {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/auth/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    
    let email = 'testuser_' + Date.now() + '@example.com';
    let regData = { name: 'Test User', email: email, password: 'password123' };
    
    let res = await request(regOptions, regData);
    console.log("Register statusCode:", res.statusCode);
    if (!res.data.token) {
        console.error("No token returned on registration.");
    }
    
    console.log("--- 2. Testing Missing Fields Registration ---");
    let missingData = { name: 'Test User' }; // missing email and password
    let resMissing = await request(regOptions, missingData);
    console.log("Missing Fields Register statusCode:", resMissing.statusCode);
    console.log("Missing Fields Register data:", resMissing.data);
    
    console.log("--- 3. Testing Duplicate Registration ---");
    let resDup = await request(regOptions, regData);
    console.log("Duplicate Register statusCode:", resDup.statusCode);
    console.log("Duplicate Register data:", resDup.data);

    console.log("--- 4. Testing Login ---");
    const loginOptions = {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    let loginData = { email: email, password: 'password123' };
    let resLogin = await request(loginOptions, loginData);
    console.log("Login statusCode:", resLogin.statusCode);
    
    let token = resLogin.data.token;
    if (!token) {
        console.error("Login failed to return token.");
    }

    console.log("--- 5. Testing Invalid Login ---");
    let invalidLoginData = { email: email, password: 'wrongpassword' };
    let resInvalidLogin = await request(loginOptions, invalidLoginData);
    console.log("Invalid Login statusCode:", resInvalidLogin.statusCode);
    console.log("Invalid Login data:", resInvalidLogin.data);

    console.log("--- 6. Testing Profile Route ---");
    const profileOptions = {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/auth/profile',
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };
    let resProfile = await request(profileOptions);
    console.log("Profile statusCode:", resProfile.statusCode);
    console.log("Profile data:", resProfile.data);
    
    console.log("Tests finished.");
};

runTests().catch(console.error);
