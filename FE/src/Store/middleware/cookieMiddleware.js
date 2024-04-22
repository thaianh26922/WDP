import Cookies from 'js-cookie';
const cookieMiddleware = () => (next) => (action) => {

    const result = next(action);

    if (action.meta?.cookie) {
        const { key, value, options } = action.meta.cookie;
        Cookies.set(key, value, options);
    }

    return result;

};

export default cookieMiddleware;

