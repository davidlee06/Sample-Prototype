const db = require("./db_connection");
const fs = require("fs");

const drop_stuff_table_sql = fs.readFileSync(__dirname + "/queries/init/drop_stuff_table.sql", { encoding: "UTF-8" })
const create_stuff_table_sql = fs.readFileSync(__dirname + "/queries/init/create_stuff_table.sql", { encoding: "UTF-8" })
const insert_stuff_table_sql = fs.readFileSync(__dirname + "/queries/init/insert_stuff_table.sql", { encoding: "UTF-8" })
const read_stuff_table_sql = fs.readFileSync(__dirname + "/queries/init/read_stuff_table.sql", { encoding: "UTF-8" })

db.execute(drop_stuff_table_sql);
db.execute(create_stuff_table_sql);

db.execute(insert_stuff_table_sql, ['Labs', '2', 'Labs can range in subjects from Chemistry to CS!']);
db.execute(insert_stuff_table_sql, ['Readings', '3', 'Readings will inform you!']);
db.execute(insert_stuff_table_sql, ['Projects', '1', 'Projects can have application based skills or even up to oral skills!']);
db.execute(insert_stuff_table_sql, ['Essay', '54321', 'Write your thoughts!']);


db.execute(read_stuff_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'stuff' initialized with:")
        console.log(results);
    }
);

db.end();