const express = require('express');
const app = express();
const alert = require('alert-node');
const pgp = require('pg-promise')(/*options*/);
const fs = require('fs');

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const cn = {
    host: conf.host,
    port: conf.port,
    database: conf.database,
    user: conf.user,
    password: conf.password
};

const db = pgp(cn);

//read list
app.get("/api/list", (req, res) => {
    db.result("SELECT * FROM VIEW_RESERVATION")
        .then(data => {
            res.send({ data: data })
        })
        .catch(error => {
            alert('Errorが発生しました。ERROR : ' + error.routine);
            res.send('error');
        })
})

//read entire list
app.get("/api/entirelist", (req, res) => {
    db.result("SELECT * FROM VIEW_ENTIRE_RESERVATION")
        .then(data => {
            res.send({ data: data })
        })
        .catch(error => {
            alert('Errorが発生しました。ERROR : ' + error.routine);
            res.send('error');
        })
})

//read place list
app.get("/api/placeList", async (req, res) => {
    await db.result("SELECT placename as place FROM reservation_place")
        .then(data => {
            res.send({ data: data })
        })
        .catch(error => {
            alert('Errorが発生しました。ERROR : ' + error.routine);
            res.send('error');
        })
})

//insert
app.get("/api/insert", async (req, res) => {
    const place = req.query.place;
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    const userName = req.query.userName;
    await db.one("SELECT COUNT(*) FROM VIEW_RESERVATION WHERE place LIKE $1 AND endtime >= $2 AND starttime <= $3", [place, startTime, endTime])
        .then(data => {
            if (data.count == 0) {
                db.oneOrNone("INSERT INTO reservation_table(place, starttime, endtime, username) VALUES($1, $2, $3, $4)", [place, startTime, endTime, userName])
                    .then(() => {
                        res.send('insert Success')
                    })
                    .catch(error => {
                        alert('Errorが発生しました。ERROR : ' + error.routine);
                        res.send('error');
                    })
            }
            else {
                res.send('Time Already Reservated')
            }
        })
})

//update
app.get("/api/update", async (req, res) => {
    const place = req.query.place;
    const startTime = req.query.starttime;
    const endTime = req.query.endtime;
    const userName = req.query.username;
    const brdNo = req.query.brdno;
    await db.one("SELECT COUNT(*) FROM VIEW_RESERVATION WHERE place LIKE $1 AND endtime >= $2 AND starttime <= $3 AND brdno != $4", [place, startTime, endTime, brdNo])
        .then(data => {
            if (data.count == 0) {
                db.oneOrNone("UPDATE reservation_table SET place = $1, starttime = $2, endtime = $3, username = $4 WHERE brdno = $5", [place, startTime, endTime, userName, brdNo])
                    .then(() => {
                        res.send('update Success')
                    })
                    .catch(error => {
                        alert('Errorが発生しました。ERROR : ' + error.routine);
                        res.send('error');
                    })
            }
            else {
                res.send('Time Already Reservated')
            }
        })
})

//delete
app.get("/api/delete", async (req, res) => {
    await db.oneOrNone("DELETE FROM reservation_table WHERE brdno = $1", req.query.brdno)
        .then(() => {
            res.send('delete Success')
        })
        .catch(error => {
            alert('Errorが発生しました。ERROR : ' + error.routine);
            res.send('error');
        })
})