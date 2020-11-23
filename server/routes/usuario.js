const express = require('express');
const app = express();



app.get('/usuario', function(req, res){
    res.json({ 
        ok:200,
        mensaje: 'Otra madre' 
    });
})

app.post('/usuario', function(req, res ){
    let nombre = req.body.nombre;
    let body = req.body;
    
    if(nombre === undefined){
        res.status(400).json({
            ok: 400,
            mensaje: 'pon el nombre...inutil'
        });
    }else{
    res.json({
        ok: 200,
        mensaje: 'Usuario insertado',
        body:body

    })
} 
})

app.put('/usuario/:id/:nombre', function(req, res){
    let id = req.params.id;
    let nombre = req.params.nombre;

    res.json({
        ok: 200,
        mensaje: 'Usario actualizado con exito',
        id: id,
        nombre:nombre
    })
})

app.delete('/usuario/:id', function(req, res){
    let id = req.params.id;

    res.json({
        ok: 200,
        mensaje: 'usario se borro',
        id:id
    })

})


module.exports = app;