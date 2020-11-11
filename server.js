const config = require('config');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require("multer");
// const auth = require("./middleware/auth");

const app = express();

const SELECT_ALL_COINS_QUERY = 'SELECT * FROM coins';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Raf05Zul',
    database: 'mydb'
});

app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
app.post('/register', (req, res) => {
    const { username, name, password, id } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    pool.query('SELECT username FROM admin WHERE username = ?', [username], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                res.status(400).send('User already registered');
            } else {
                pool.query(`INSERT INTO admin (id, name, password, username) VALUES(?,?,?,?)`, [id, name, hashedPassword, username], (err, data) => {
                    if (!err) {
                        const token = jwt.sign({ id: id, name: name, username: username }, config.get('jwtPrivateKey'));
                        res
                            .header('x-auth-token', token)
                            .header("access-control-expose-headers", "x-auth-token")
                            .send({ id, name, hashedPassword, username });
                    } else {
                        res.status(500).send();
                    }
                });
            }
        } else {
            res.status(500).send();
        }
    });
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(password);

    pool.query('SELECT id, password, username, name FROM admin WHERE username = ?', [username], (err, data) => {
        if (!err) {
            if (data.length === 0) {
                console.log(data);
                res.status(400).send('Invalid username or password.');
            } else {
                if (bcrypt.compareSync(password, data[0].password)) {
                    const { id, name, username } = data[0];
                    const token = jwt.sign({ id: id, name: name, username: username }, config.get('jwtPrivateKey'));
                    console.log(token);
                    res.send(token);
                } else {
                    res.status(400).send('Invalid username or password.');
                }
            }
        } else {
            res.status(500).send();
            console.log(err);
        }
    });
});
app.post('/coin', (req, res) => {
    const { id, quality, name, country, shortText, text, weight, composition, price, year, type } = req.body;
    pool.query('SELECT name FROM coins WHERE name = ?', [name], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                res.status(400).send('Coin already registered');
            } else {
                pool.query(`INSERT INTO coins (id, quality, name, country, shorttext, text, weight, composition, price, year, coins_type) VALUES(?,?,?,?,?,?,?,?,?,?,?)`, [id, quality, name, country, shortText, text, weight, composition, price, year, type], (err, data) => {
                    if (!err) {
                        res.send("Success");
                    } else {
                        console.log(err);
                        res.status(500).send();
                    }
                });
            }
        } else {
            res.status(500).send();
        }
    });
});
const upload = multer({ dest: "uploads" });
app.post("/upload", upload.single("filedata"), function (req, res, next) {
    let filedata = req.file;
    console.log(filedata);
    if (!filedata)
        res.send("Error while downloading file");
    else
        res.send("File downloaded");
});

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// определение фильтра
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
}
app.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata"));

app.post("/upload", function (req, res, next) {
    let filedata = req.file;
    if (!filedata)
        res.send("Error while download file");
});

app.get('/list', (req, res) => {
    pool.query(SELECT_ALL_COINS_QUERY, (err, data) => {
        if (err) {
            res.status(500);
        } else {
            data = data.map(obj => {
                return {
                    ...obj,
                    avers_image: `http://localhost:3000/uploads/${obj.avers_image}`,
                    revers_image: `http://localhost:3000/uploads/${obj.revers_image}`
                }
            })
            res.json(data);
            console.log(data);
        }
    });
});
app.get('/filter', (req, res) => {
    pool.query(`SELECT country FROM coins GROUP BY country `, (err, data) => {
        if (!err) {
            let countryData = data;
            pool.query(`SELECT composition FROM coins GROUP BY composition`, (err, data) => {
                if (!err) {
                    let compositionData = data;
                    pool.query(`SELECT quality FROM coins GROUP BY quality`, (err, data) => {
                        if (!err) {
                            let qualityData = data;
                            res.json([countryData, compositionData, qualityData]);
                        } else {
                            res.status(500).send();
                        }
                    });
                } else {
                    res.status(500).send();
                }
            });
        } else {
            res.status(500).send();
        }
    });
})
app.get('/list/:coins_type', (req, res) => {
    const sql = 'SELECT_ALL_COINS_QUERY WHERE coins_type = ?';
    console.log(req.params.coins_type);
    console.log(sql);
    pool.query(sql, [req.params.coins_type], (err, data) => {
        if (err) {
            res.status(500).json();
        } else if (!data.length) {
            res.status(404).send();
        } else {
            res.json(data);
        }
    });
});
// app.get('/list/:id', (req, res) => {
//     const sql = 'SELECT_ALL_COINS_QUERY WHERE id = ?';
//     console.log(req.params.id);
//     console.log(sql);
//     pool.query(sql, [req.params.id], (err, data) => {
//         if (err) {
//             res.status(500).json();
//         } else if (!data.length) {
//             res.status(404).send();
//         } else {
//             res.json(data);
//         }
//     });
// });
// app.use(express.static(path.resolve(__dirname, '/dist')));
// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, '/dist/index.html'));
//     // res.end();
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(history());



