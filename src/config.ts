// console.log(process.env);
// console.log(process.env.NODE_ENV);
// console.log('hello world');


const config = {
    // BASE URLS
    URL: process.env.URL,
    API: process.env.API,

    CURRENCY_SYMBOL: process.env.CURRENCY_SYMBOL || "₹",
}
export default config;