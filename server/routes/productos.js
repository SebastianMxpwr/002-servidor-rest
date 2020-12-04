const express = require('express');
const Productos = require('../models/productos')
const app = express()
const _ = require('underscore')


app.get('/productos', function(req, res){

    let desde = req.query.desde || 0
    let hasta = req.query.hasta || 5

    Productos.find({Disponibilidad: true})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email')
    .exec((err, productos)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Oscurrio un error... osea la cagaste',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Lista de prouctos',
            conteo: productos.length,
            productos
        })
    })
})


app.post('/productos', (req, res)=>{

    let prod = new Productos({
        Nombre: req.body.Nombre,
        PrecioUni: req.body.PrecioUni,
        Categoria: req.body.Categoria,
        Usuario: req.body.Usuario

    })
    prod.save((err, proBD)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Oscurrio un problema',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            proBD
        })
    })
    
})

app.put('/productos/:id', (req, res)=>{
    let id = req.params.id
    let body = _.pick(req.body, ['Nombre', 'PrecioUni', 'Categoria', 'Usuario'])

    Productos.findByIdAndUpdate(id, body, 
        {new:true, runValidators:true, context:'query'},(err,proBD)=>{
            if (err){
                return res.status(400).json({
                    ok:false,
                    msg: 'Algo esta mal, pinche menso',
                    err
                })
            }

        res.json({
            ok: true,
            msg: 'Se actualizo',
            proBD
        })
    })
})


app.delete('/productos/:id', (req, res)=>{
    let id = req.params.id

//     Productos.findOneAndRemove(id, {context:'query'}, (err, proBD)=>{
//         if(err){
//             return res.status(400).json({
//                 ok:false,
//                 msg: 'Ocuarrio un error... Cual es? quien sabe',
//                 err
//             })
//         }
//         res.json({
//             ok: true,
//             msg: 'Si se elimino',
//             proBD
//         })
//     })

Productos.findByIdAndUpdate(id,{Disponibilidad: false},
    { new: true , runValidators: true, context: 'query'}, (err ,proBD) =>{
        if(err){
            return res.status(400).json({
            ok: false,
            msg: 'Algo hiciste mal...Pinche pendejo',
            err
            })
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminao con exito',
            proBD
            })
    })
})


module.exports = app