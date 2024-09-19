const dbOptions = {
    host: 'localhost',
    port: 3050,
    database: 'C:\\bancos de dados\\estoque\\ESTOQUE.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: undefined, // default
    pageSize: 4096, // default when creating database
};

export {
    dbOptions
}
