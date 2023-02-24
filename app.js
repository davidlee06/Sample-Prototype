//set up the server
const express = require( "express" );
const app = express();
const logger = require("morgan");
const port = 8080;
const env = require("dotenv");
env.config();
// express set up with ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// define middleware that logs all incoming requests
app.use(logger("dev"));
// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));
// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render("index");
} );

// define a route for the labs page
app.get( "/labs", ( req, res ) => {
    res.render("labs");
} );

// define a route for the projects page
app.get( "/projects", ( req, res ) => {
    res.render("projects");
} );

// define a route for the readings page
app.get( "/readings", ( req, res ) => {
    res.render("readings");
} );

// define a route for the list page
app.get( "/list", ( req, res ) => {
    res.render("list");
} );

// define a route for item DELETE
const delete_item_sql = `
    DELETE 
    FROM
        stuff
    WHERE
        id = ?
`
app.get("/stuff/item/:id/delete", ( req, res ) => {
    db.execute(delete_item_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/stuff");
        }
    });
})

const create_item_sql = `
    INSERT INTO stuff
        (item, quantity)
    VALUES
        (?, ?)
`
app.post("/stuff", ( req, res ) => {
    db.execute(create_item_sql, [req.body.name, req.body.quantity], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (id) of the newly inserted element.
            res.redirect(`/stuff/item/${results.insertId}`);
        }
    });
})



// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );