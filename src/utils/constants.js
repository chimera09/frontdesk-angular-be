module.exports = {
    PORT: 9000,
    DATABASE: {
        COLLECTIONS:{
            USERS: 'users',
            ENTRIES: 'entries'
        },
        URL: 'mongodb://frontdesk-db:27017/usersdb'
    },
    ORIGIN: 'http://localhost',
    SALT_ROUNDS: 10,
    MESSAGES: {
        USER_NOT_FOUND: 'User not found',
        AUTH_SUCCESS: 'Authentication was successful',
        INCORRECT_PASS : 'Incorrect Password'
    },
    CODES: {
        ACCESS: 200,
        FORBIDDEN : 403
    }
}