const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "products",
    password: "products",
    database: "bandymas",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//Read Node
app.get('/products', (req, res) => {
    const sql = `
        SELECT *
        FROM products
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//Create Node
app.post('/products', (req, res) => {
    const sql = `
        INSERT INTO products
        (product, quantity, price, in_stock, last_order)
        VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [
        req.body.product,
        req.body.quantity,
        req.body.price,
        req.body.in_stock,
        req.body.last_order
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//Update Node
app.put('/products/:id', (req, res) => {
    const sql = `
        UPDATE products
        SET product = ?, quantity = ?, price = ?, in_stock = ?, last_order = ?
        WHERE id = ?
    `;
    con.query(sql, [
        req.body.product,
        req.body.quantity,
        req.body.price,
        req.body.in_stock,
        req.body.last_order,
        req.params.id
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//Delete Node
app.delete('/products/:id', (req, res) => {
    const sql = `
        DELETE FROM products
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})
// ----------------------------------------------------------------

// Randa visus skirtingus th
app.get('/products-product', (req, res) => {
    const sql = `
    SELECT DISTINCT product
    FROM products
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// Rodo tam tikro th rezultatus
app.get('/products-filter/:t', (req, res) => {
    const sql = `
    SELECT *
    FROM products
    WHERE product = ?
    `;
    console.log(req.query.s);
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// Paieska pagal th
app.get('/products-product', (req, res) => {
    const sql = `
    SELECT *
    FROM products
    WHERE product like ?
    `;
    console.log(req.query.s);
    con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//----------------------------------------------------------------------------------------

// Bendra statistika
app.get('/stats', (req, res) => {
    const sql = `
  SELECT COUNT(id) as count, SUM(price) as price, AVG(price) as average
  FROM products
  `;
    // console.log(req.query.s);
    con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// Grupine statistika
app.get('/group-stats', (req, res) => {
    const sql = `
  SELECT COUNT(id) as count, product
  FROM products
  GROUP BY product
  ORDER BY product desc
  `;
    // console.log(req.query.s);
    con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
