require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())


app.get('/', function(req, res){
    res.send('<h1>Bienvenido a mi servidor rest (localhost)</h1>');
})

app.get('/usuario', function(req, res){
    res.jsond({ 
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

mongoose.connect('mongodb://localhost:27017/cafeteria',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err,res) => {
  
  if(err) throw err;
  console.log('Base de datos Online');
});

app.listen(process.env.PORT, () => {
    console.log('El servidor esta en linea por el puerto ', process.env.PORT)
});