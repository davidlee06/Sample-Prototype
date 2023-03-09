//set up the server
const express = require( "express" );
const app = express();
const port = 8080;
const logger = require("morgan");
const db = require('./db/db_connection');

app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

const read_stuff_all_sql = `
    SELECT 
        id, item, quantity
    FROM
        stuff
`
app.get( "/stuff", ( req, res ) => {
    db.execute(read_stuff_all_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.send(results);
    });
});

app.get( "/stuff/item", ( req, res ) => {
    res.sendFile( __dirname + "/views/item.html" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );