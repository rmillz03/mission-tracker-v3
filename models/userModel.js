const db = require('../config/db');

class User {

    constructor(first_name, last_name, email, pwd, admin) 
    {
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = pwd;
        this.admin = admin;
    }

    async save() 
    {
        let sql = `
            INSERT INTO users
            (
                firstName,
                lastName,
                email,
                password,
                admin
            )
            VALUES
            (
                '${this.firstName}',
                '${this.lastName}',
                '${this.email}',
                '${this.password}',
                '${this.admin}'
            )
        `;

        return db.execute(sql);
    }

    static findAll() 
    {
        let sql = `SELECT * FROM users;`;

        return db.execute(sql);
    }

    static findOne(id) 
    {
        let sql = `SELECT * FROM users WHERE email = '${id}';`;

        //console.log('findOne: ' + sql);         //debugging

        return db.execute(sql);
    }
}

module.exports = User;