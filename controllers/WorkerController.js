const { response } = require("express");
const workerModel = require("../models/Worker");

const trabajadores =  ((req, res)=>{
    workerModel.find()
    .then(Trabajador =>{
        res.status(200).json({
            Trabajador,
            status:true
        })
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener los trabajadores",status:false });
    })
});
const trabajadorID =  ((req, res)=>{
    let trabajador_ID = req.params.trabajador_ID;
    workerModel.findById(trabajador_ID)
    .then(Trabajador =>{
        if (Trabajador) {
            res.status(200).json({Trabajador});
        } else {
            res.status(404).json({ message: "Trabajador no encontrado",status:false });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener el trabaador por su identificador",status:false });
    })
});
const addTrabajador =  ((req, res)=>{
    let trabajador = new workerModel({
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        correo: req.body.correo,
        edad: req.body.edad
    });
    trabajador.save()
    .then(trabajador =>{
        res.status(200).json({ message: "Trabajador registrado",trabajador,status:true })
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo guardar el trabajador",status:false });
    })
});
const updateTrabajador =  (async(req, res)=>{
    let trabajador_ID = req.body.trabajador_ID;

    let updatetrabajador = {
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        correo: req.body.correo,
        edad: req.body.edad
    };
    try {
        let trabajador = await workerModel.findById(trabajador_ID);
        if (!trabajador) {
            return res.status(404).json({ message: "Trabajador no encontrado",status:false });
        }
        Object.assign(trabajador, updatetrabajador);

        trabajador = await trabajador.save();
        return res.status(200).json({ message: "Trabajador actualizado con éxito", trabajador,status:true });
        
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el trabajador: " + error,status:false });
    }
});
const destroyTrabajador=(req,res,next)=>{
    let trabajador_ID = req.params.id;
    workerModel.findByIdAndDelete(trabajador_ID)
    .then(response =>{
        if (response) {
            res.status(200).json({ message: "Trabajador eliminado",status:true });
        } else {
            res.status(404).json({ message: "Trabajador no encontrado",status:false });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo realizar la eliminación del trabajador "+err,status:false });
    })
};
module.exports = {
    trabajadores,trabajadorID,updateTrabajador,addTrabajador,destroyTrabajador
}