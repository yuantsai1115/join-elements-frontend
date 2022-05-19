export let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000/';
    console.log(`DEBUG MODE using API endpoint: ${baseUrl}`);
}
