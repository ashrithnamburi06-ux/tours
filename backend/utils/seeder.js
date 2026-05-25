// backend/utils/seeder.js
// Client-side seeder trigger that hits the running backend seed endpoint.
const http = require('http');

console.log('Sending database seeding request to the running backend at http://localhost:5000/api/destinations/seed ...');

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/destinations/seed',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (res.statusCode === 201 && response.success) {
        console.log('\n==================================================');
        console.log(' SUCCESS: ' + response.message);
        console.log('==================================================\n');
        process.exit(0);
      } else {
        console.error('ERROR: Seeding failed with status code ' + res.statusCode, response);
        process.exit(1);
      }
    } catch (e) {
      console.error('ERROR: Unable to parse response from server:', data);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('\nERROR: Could not connect to the backend server.');
  console.error('Please verify that the backend server is running on http://localhost:5000 first by starting it with `npm run dev` in the backend folder.\n');
  process.exit(1);
});

req.end();
