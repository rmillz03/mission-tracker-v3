const db = require('../config/db');

class Crew {
    constructor(first, last, rank, nickname, position, raven, rogue) 
    {
        this.firstName = first;
        this.lastName = last;
        this.rank = rank;
        this.callSign = nickname;
        this.raven = raven;
        this.rogue = rogue;

        //console.log("Position: " + position);

        if (position == "pilot")
        {
            this.pilot = 1;
            this.crewChief = 0;
        }
        else
        {
            this.pilot = 0;
            this.crewChief = 1;
        }
        
    }

    save()
    {
        let sql = `
            INSERT INTO aircrew
            (
                firstName,
                lastName,
                rank,
                callSign,
                pilot,
                crewChief,
                raven,
                rogue
            ) VALUES
            (
                '${this.firstName}',
                '${this.lastName}',
                '${this.rank}',
                '${this.callSign}',
                '${this.pilot}',
                '${this.crewChief}',
                '${this.raven}',
                '${this.rogue}'
            )
        `;

        return db.execute(sql);
    }

    static findAll() 
    {
        let sql = `SELECT * FROM aircrew WHERE crewID != '1';`;

        return db.execute(sql);
    }

    static findOne(id) 
    {
        let sql = `SELECT * FROM aircrew WHERE crewID = '${id}';`;

        return db.execute(sql);
    }

    static findCrew(crewType)
    {
        let sql = `SELECT * FROM aircrew WHERE ${crewType}='1';`;

        console.log('FindCrew: ' + sql);

        return db.execute(sql);
    }

    static getLast()
    {
        let sql = `SELECT * FROM aircrew ORDER BY crewID DESC LIMIT 1;`;

        return db.execute(sql);
    }
}

module.exports = Crew;