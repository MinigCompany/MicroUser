const mongoose = require("mongoose");
const schema = mongoose.Schema;

const WorkerSchema = new schema({
    cedula:{
        type: String
    },
    nombres:{
        type: String
    },
    apellidos:{
        type: String
    },
    telefono:{
        type: String
    },
    correo:{
        type: String
    },
    edad:{
        type: Number
    }
},{timestamps:true})

const worker = mongoose.model('Trabajadores', WorkerSchema);
module.exports = worker;