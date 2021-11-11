const db = require('../config/db');

class Qual {
    constructor(pilotID, PC, PI, UH60A, UH60AP,
                UH60L, UH72A, CH53E, FA18A) 
    {
        this.pilot_key = pilotID;
        this.PC = PC;
        this.PI = PI;
        this.UH60A = UH60A;
        this.UH60AP = UH60AP;
        this.UH60L = UH60L;
        this.UH72A = UH72A;
        this.CH53E = CH53E;
        this.FA18A = FA18A;
    }

    save()
    {
        let sql = `
            INSERT INTO quals
            (
                pilot_key,
                PC,
                PI,
                UH60A,
                UH60AP,
                UH60L,
                UH72A,
                CH53E,
                FA18A
            ) VALUES
            (
                '${this.pilot_key}',
                '${this.PC}',
                '${this.PI}',
                '${this.UH60A}',
                '${this.UH60AP}',
                '${this.UH60L}',
                '${this.UH72A}',
                '${this.CH53E}',
                '${this.FA18A}'
            )
        `;

        return db.execute(sql);
    }

    static findAll() 
    {
        //let sql = `SELECT * FROM quals;`;
        let sql = `
            SELECT aircrew.firstName, aircrew.lastName, aircrew.rank,
                   aircrew.pilot, aircrew.crewChief,
                   quals.PC, quals.PI, quals.UH60A, quals.UH60AP, 
                   quals.UH60L, quals.UH72A, quals.CH53E, quals.FA18A 
            FROM quals
            INNER JOIN aircrew ON quals.pilot_key=aircrew.crewID;
        `;

        return db.execute(sql);
    }

    static findOne(id) 
    {
        let sql = `SELECT * FROM quals WHERE pilot_key = '${id}';`;

        return db.execute(sql);
    }

    static findQual(qualType)
    {
        let sql = `SELECT * FROM quals WHERE ${qualType}='1';`;

        //console.log('FindQual: ' + sql);

        return db.execute(sql);
    }
}

module.exports = Qual;