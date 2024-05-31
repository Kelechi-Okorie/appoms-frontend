import { parseCookies, setCookie } from 'nookies';


// Helper function to retrieve authorization token from cookies
export const getToken = () => {
    const cookies = parseCookies();
    return cookies.token;
};