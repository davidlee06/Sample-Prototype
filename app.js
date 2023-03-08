//set up the server
const express = require( "express" );
const app = express();
const port = 8080;
const logger = require("morgan");

app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

app.get( "/stuff", ( req, res ) => {
    res.sendFile( __dirname + "/views/stuff.html" );
} );

app.get( "/stuff/item", ( req, res ) => {
    res.sendFile( __dirname + "/views/item.html" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );