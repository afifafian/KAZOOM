class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        this.authenticated = true;
        console.log(this.authenticated);
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        console.log(this.authenticated);
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
