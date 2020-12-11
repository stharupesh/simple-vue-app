import auth from '@/core/auth'

export default (to, from, next) => {
    if (!auth.isLoggedIn()) {
        next({name: 'user.login'});
        return false;
    }
}