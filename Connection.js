const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user: 'root',
        database: 'techshop',
        password: 'MySQL123'
    },
    migrations:{
        tableName:"knex_migrations"
    }
});
var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var server = app.listen(3010, "127.0.0.1", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

});
const bookshelf = require('bookshelf')(knex);

// Defining models
const User = bookshelf.model('User', {
    tableName: 'Users'
});
const Products = bookshelf.model('Products', {
    tableName: 'Products'
});
const Sales = bookshelf.model('Sales', {
    tableName: 'Sales'
});

app.get("/", async (req, res) => {
    res.send("1) Type /TechShop/users/(a specific id), 2) Type /number for the total purchase, 3) Type /average for the average price");
});
app.get("/TechShop/:para/", async (req, res) => {
    if([req.params.para].toString() === "users") {
        var users = await new User().fetchAll();
        res.json(users);
    } else if([req.params.para].toString() === "prod") {
        var prod = await new Products().fetchAll();
        res.json(prod);
    } else if([req.params.para].toString() === "sales") {
        var sales = await new Sales().fetchAll();
        res.json(sales);
    } else {
        res.json("Type users for users, prod for products or sale for sales");
    }
});

app.get("/TechShop/users/:id", async (req, res) => {
    var user = await User.where("User_ID", [req.params.id]).fetch();
res.json(user);
});
app.get("/average", async (req,res) => {
    knex.raw('select avg(Price) as \'Mesatarja\' from Products').then(function (rows) {
        res.json(rows);
    });
});
app.get('/number', function (req, res) {
    knex.raw('select User_ID, count(User_ID) as \'Numri i blerjeve\' from sales group by User_ID').then(function (rows) {
        res.json(rows);
    });
});
app.get('/innerJoin', function (req, res) {
    knex.raw('select u.User_ID,count(*) as \'Numri i blerjeve\' from Users u inner join sales s on u.User_ID = s.User_ID group by User_ID').then(function (rows) {
        res.json(rows);
    })
});
app.get('/total',function (req,res) {
    knex.raw('select u.FirstName,p.ProductName,sum(p.Price) as \'Total price\' from users u inner join sales s on s.User_ID = u.User_ID inner join Products p on p.Prod_ID = s.Prod_ID group by u.FirstName').then(function (rows) {
        res.json(rows);
    })
});
