module.exports = {
    PORT: 9000,
    DATABASE: {
        COLLECTIONS:{
            USERS: 'users',
            ENTRIES: 'entries'
        },
        URL: 'mongodb://angfrontdesk-db:27017/usersdb'
    },
    ORIGIN: 'http://localhost:4200',
    SALT_ROUNDS: 10,
    MESSAGES: {
        USER_NOT_FOUND: "Utilizatorul nu a fost gasit",
        AUTH_SUCCESS: "Autentificare cu succes",
        INCORRECT_PASS : "Parola incorecta"
    },
    CODES: {
        ACCESS: 200,
        FORBIDDEN : 403
    },
    EXP_TIME: '2h',
    SECRET: 'secret'
}