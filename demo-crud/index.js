const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./configurations/db-conf.js');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database


});
//ver todos los estudiantes
app.get("/Mostrar_Estudiante", (req, res) => {
    console.log("get lista estudiantes");
mysqlConnection.query('select  estudiante.carnet, estudiante.status, estudiante.id, estudiante.fecha_ingreso, persona.nombre, persona.apellido,  persona.fecha_nacimiento, persona.Direccion from estudiante join persona  on persona.id = estudiante.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar solo un estudiante
app.get("/Mostrar1_estudiante/:id", (req, res) => {
    console.log("get estudiante");
    mysqlConnection.query('Select * from estudiante where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar Estudiandiantes
app.put("/Actualizar_Estudiante/:id", (req, res) => {
    console.log("update estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estudiante set id_persona = ?, fecha_ingreso = ?, carnet = ?, statu = ? where id = ?',
        [est.id_persona, est.fecha_ingreso, est.carnet, est.status, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Estudiante
app.delete("/Eliminar_Estudiante/:id", (req, res) => {
    console.log("update estudiante ");
    mysqlConnection.query('delete from estudiante where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


//Crear una Persona
app.post("/Crear_Persona", (req, res) => {
    console.log("Crear Personas ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into persona (nombre, apellido, fecha_nacimiento, Direccion) values (?,?,?,?)',[est.Nombre, est.Apellido, est.fecha_nacimiento, est.Direccion], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Mostrar  personas
app.get("/Mostrar_Personas", (req, res) => {
    console.log("get lista Personas");
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar una persona
app.get("/Ver1_persona/:id", (req, res) => {
    console.log("get Persona");
    mysqlConnection.query('Select * from persona where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar persona
app.put("/Actualizar_Persona/:id", (req, res) => {
    console.log("update persona ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update persona set nombre = ?, apellido = ?, fecha_nacimiento = ?, Direccion = ? where id = ?',
        [est.Nombre, est.Apellido, est.fecha_nacimiento, est.Direccion, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Persona
app.delete("/Eliminar_Persona/:id", (req, res) => {
    console.log("update persona ");
    mysqlConnection.query('delete from persona where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Crear Maestro
app.post("/Crear_Maestro", (req, res) => {
    console.log("crear Maestro ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into docente (id_persona, fecha_ingreso) values (?,?)',
        [est.id_persona, est.fecha_ingreso], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Leer todos los maestro
app.get("/Ver_Maestro", (req, res) => {
    console.log("get lista maestro");
    mysqlConnection.query('Select * from docente', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar a un maestro
app.get("/Ver1_Maestro/:id", (req, res) => {
    console.log("get maestro");
    mysqlConnection.query('Select * from docente where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar a un maestro
app.put("/Actualizar_Maestro/:id", (req, res) => {
    console.log("update maestro ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update docente set id_persona = ?, fecha_ingreso = ? where id = ?',
        [est.id_persona, est.fecha_ingreso, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar maestro
app.delete("/Eliminar_Maestro/:id", (req, res) => {
    console.log("update maestro ");
    mysqlConnection.query('delete from docente where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Crear Estudiante
app.post("/Crear_Estudiante", (req, res) => {
    console.log("crear estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into estudiante (id_persona, fecha_ingreso, carnet, status) values (?,?,?,?)',
        [est.id_persona, est.fecha_ingreso, est.carnet, est.status], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});











app.listen(process.env.PORT ||3000);