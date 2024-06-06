import { parseCookies, setCookie } from 'nookies';


// Helper function to retrieve the user from cookies
export const getCurrentUser = () => {
    const cookies = parseCookies();
    return JSON.parse(cookies.user);
};
