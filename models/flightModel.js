const db = require('../config/db');

class Mission {
    constructor(body) 
    {
        this.PC_key = body.PC;
 
        if (body.pilot2 === undefined) { this.pilot2_key = 1 }
        else { this.pilot2_key = body.pilot2; }

        if (body.chief1 === undefined) { this.crew1 = 1 }
        else { this.crew1 = body.crew1; }

        if (body.chief2 === undefined) { this.crew2 = 1 }
        else { this.crew2 = body.crew2; }

        if (body.chief3 === undefined) { this.crew3 = 1 }
        else { this.crew3 = body.crew3; }
        
        this.ETD = body.ETD;
        this.ETA = body.ETA;
        this.type = body.type;
        this.route = body.route;
        this.tailNum = body.tailNum;
        this.julian = body.julianDate;
        this.pax_key = body.pax;
        this.cargo = body.cargo;

        this.ETE = body.ETA - body.ETD;
    }

    save()
    {
        let sql = `
            INSERT INTO missions
            (
                PC_key,
                pilot2_key,
                crew1,
                crew2,
                crew3,
                ETD,
                ETA,
                ETE,
                type,
                route,
                tailNum,
                julian,
                pax_key,
                cargo
            ) VALUES
            (
                '${this.PC_key}',
                '${this.pilot2_key}',
                '${this.crew1}',
                '${this.crew2}',
                '${this.crew3}',
                '${this.ETD}',
                '${this.ETA}',
                '${this.ETE}',
                '${this.type}',
                '${this.route}',
                '${this.tailNum}',
                '${this.julian}',
                '${this.pax_key}',
                '${this.cargo}'
            )
        `;

        return db.execute(sql);
    }

    static findAll() 
    {
        //let sql = `SELECT * FROM missions;`;
        let sql = `
            SELECT *
            FROM missions
            INNER JOIN aircrew ON missions.PC=aircrew.crewID
            INNER JOIN aircrew ON missions.PI=aircrew.crewID
            INNER JOIN aircrew ON missions.pilot2=aircrew.crewID
            INNER JOIN aircrew ON missions.crew1=aircrew.crewID
            INNER JOIN aircrew ON missions,crew2=aircrew.crewID
            INNER JOIN aircrew ON missions.crew3=aircrew.crewID
            INNER JOIN plane ON missions.tailNum=aircraft.tailNum;
        `;

        return db.execute(sql);
    }

    static findOne(id) 
    {
        let sql = `SELECT * FROM missions WHERE missionID = '${id}';`;

        return db.execute(sql);
    }
}

module.exports = Mission;