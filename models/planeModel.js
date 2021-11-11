const db = require('../config/db');

class Plane {
    constructor(tail, type, role) 
    {
        this.tailNum = tail;
        this.model = type;
        this.roleName = role;
    }

    save()
    {
        let sql = `
            INSERT INTO aircraft
            (
                tailNum,
                model,
                roleName
            ) VALUES
            (
                '${this.tailNum}',
                '${this.model}',
                '${this.roleName}'
            )
        `;

        return db.execute(sql);
    }

    static findAll() 
    {
        let sql = `SELECT * FROM aircraft;`;

        return db.execute(sql);
    }

    static findOne(id) 
    {
        let sql = `SELECT * FROM aircraft WHERE tailNum = '${id}';`;

        return db.execute(sql);
    }
}

module.exports = Plane;