const express = require('express');
const Categoria = require('../models/categoria');
const app = express();
const _ = require('underscore');
const { has } = require('underscore');

app.get('/categoria', (req, res)=>{

    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Categoria.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email')
    .exec((err ,categorias)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Ocurrio un error al.. ya la cagaste pues'
            })
        }

        res.json({ 
            ok: true,
            msg: 'Aqui esta pinche prro',
            conteo: categorias.length,
            categorias
        })
    })
})

app.post('/categoria', (req, res)=>{

    let cat = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.body.usuario

    })
    cat.save((err, catDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Vete, por que ya la cagaste',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Categoria insertada con exito',
            catDB
        })
    })
    
})

app.put('/categoria/:id', (req, res)=>{
    let id = req.params.id
    let body = _.pick(req.body, ['descripcion', 'usuario'])

    Categoria.findByIdAndUpdate(id, body, 
        {new:true, runValidators:true, context:'query'},(err,catDB)=>{
            if (err){
                return res.status(400).json({
                    ok:false,
                    msg: 'Algo paso mal',
                    err
                })
            }

        res.json({
            ok: true,
            msg: 'Se actualizo puta',
            catDB
        })
    })
})


app.delete('/categoria/:id', (req, res)=>{
    let id = req.params.id

    Categoria.findOneAndRemove(id, {context:'query'}, (err, catDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Ocuarrio un error... Cual es? quien sabe',
                err
            })
        }
        res.json({
            ok: true,
            msg: 'Si se elimino',
            catDB
        })
    })
})
module.exports = app