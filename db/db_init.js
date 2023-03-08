const db = require("./db_connection");
const fs = require("fs");

const drop_stuff_table_sql = fs.readFileSync(__dirname + "/queries/init/drop_stuff_table.sql", { encoding: "UTF-8" })
const create_stuff_table_sql = fs.readFileSync(__dirname + "/queries/init/create_stuff_table.sql", { encoding: "UTF-8" })
const insert_stuff_table_sql = fs.readFileSync(__dirname + "/queries/init/insert_stuff_table.sql", { encoding: "UTF-8" })
const read_stuff_table_sql = fs.readFileSync(__dirname + "/queries/init/read_stuff_table.sql", { encoding: "UTF-8" })

db.execute(drop_stuff_table_sql);
db.execute(create_stuff_table_sql);

db.execute(insert_stuff_table_sql, ['Widgets', '5', 'Widgets are cool! You can do ... so many... different things... with them...']);
db.execute(insert_stuff_table_sql, ['Gizmos', '100', null]);
db.execute(insert_stuff_table_sql, ['Thingamajig', '12345', 'Not to be confused with a Thingamabob']);
db.execute(insert_stuff_table_sql, ['Thingamabob', '54321', 'Not to be confused with a Thingamajig']);


db.execute(read_stuff_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'stuff' initialized with:")
        console.log(results);
    }
);

db.end();