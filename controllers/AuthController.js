const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ correo: req.body.correo });
        if (existingUser) {
            return res.status(400).json({
                message: "El correo ya está registrado"
            });
        }

        const hashedPass = await bcrypt.hash(req.body.contrasenia, 10);

        let user = new User({
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            correo: req.body.correo,
            contrasenia: hashedPass
        });

        const newUser = await user.save();
        res.status(200).json({
            message: "Usuario registrado",
            user: newUser
        });

    } catch (err) {
        res.status(500).json({ 
            message: "Ha ocurrido un error",
            error: err
        });
    }
};

const login = (req, res, next)=>{
    var emailUser = req.body.correo;
    var contraseniaUser = req.body.contrasenia;
    User.findOne({$or: [{correo:emailUser},{telefono:emailUser}]})
    .then(user=>{
        if(user){
            bcrypt.hash(contraseniaUser, user.contrasenia, function(err,result){
                if(err){
                    res.status(500).json({ message: "Ha ocurrido un error"+err });
                }
                if(result==user.contrasenia){
                    let nombre =user.nombres;
                    let apellido =user.apellidos;
                    let id =user._id;
                    let usuario = {nombre,apellido,id}
                    let token = jwt.sign({nombres:user.nombres},"verySecretValue",{expiresIn: "1h"})
                    res.status(200).json({
                        message: "Inicio de sesión exitoso!!",
                        token,
                        usuario,
                        status:true
                    })
                }else{
                    res.status(400).json({ message: "Contraseña incorrecto!!",status:false});
                }
            })
        }
        else{
            res.status(400).json({
                message: "Usuario incrorrecto!!"
            })
        }
    })
}
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'verySecretValue', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token no válido' });
            }
            req.user = user;
            console.log(user);
            next();
        });
    } else {
        res.status(401).json({ message: 'Autorización requerida' });
    }
};
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        res.status(200).json({
            message: "Usuario eliminado",
            user
        });
    } catch (err) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            error: err
        });
    }
};
module.exports = {
    register,login,deleteUser,authenticateJWT
}