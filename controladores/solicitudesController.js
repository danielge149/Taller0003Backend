import {mascotas} from "../modelos/mascotasModelo.js";
import {solicitudes} from "../modelos/solicitudesModelo.js";

const crearSolicitud = (req, res) => {
    // Verificar si el idMascota está presente y no es nulo
    if (!req.body.idMascota || !req.body.nombreSolicitante || !req.body.correoSolicitante) {
        return res.status(400).json({
            mensaje: "idMascota, nombreSolicitante y correoSolicitante son campos requeridos y no pueden ser nulos."
        });
    }

    // Verificar si la mascota con el idMascota existe y está disponible
    mascotas.findByPk(req.body.idMascota)
        .then((mascota) => {
            if (!mascota) {
                return res.status(404).json({
                    mensaje: "La mascota con el idMascota proporcionado no existe."
                });
            }

            if (!mascota.disponible) {
                return res.status(400).json({
                    mensaje: "La mascota no está disponible para adopción."
                });
            }

            // Crear un objeto dataset con los campos relevantes
            const dataset = {
                id_Solicitud: req.body.id_Solicitud,
                idMascota: req.body.idMascota,
                nombreSolicitante: req.body.nombreSolicitante,
                correoSolicitante: req.body.correoSolicitante,
            };

            // Utilizar Sequelize para crear el recurso
            solicitudes.create(dataset)
                .then((resultado) => {
                    res.status(200).json({
                        mensaje: "Registro creado correctamente",
                        resultado: resultado
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        mensaje: `Error al crear el registro: ${err.message}`
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar la mascota: ${err.message}`
            });
        });
};


const buscarIdSolicitud = (req, res) => {
    const id = req.params.id;

    // Validar si el id es nulo o indefinido
    if (id == null) {
        res.status(203).json({
            mensaje: `El id no puede estar vacío`
        });
        return;
    }

    // Validar si el id es un número válido
    if (isNaN(id)) {
        res.status(203).json({
            mensaje: `El id debe ser un número válido`
        });
        return;
    }

    solicitudes.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                // Si el resultado existe, devolverlo
                res.status(200).json(resultado);
            } else {
                // Si el resultado no existe, devolver un mensaje de error
                res.status(404).json({
                    mensaje: `Registro no encontrado`
                });
            }
        })
        .catch((err) => {
            // Si ocurre un error durante la búsqueda, devolver un mensaje de error
            res.status(500).json({
                mensaje: `Error al buscar el registro ::: ${err}`
            });
        });
}

const buscarSolicitudes = (req, res)=>{
    
    solicitudes.findAll().then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `No se encontraron Registros ::: ${err}`
        });
    });

};




const actualizarsolicitud = (req, res) => {
    const id_Solicitud = req.params.id;
    // Verificar si el registro existe antes de intentar actualizar
    solicitudes.findByPk(id_Solicitud)
        .then((registroExistente) => {
            if (!registroExistente) {
                return res.status(404).json({
                    mensaje: "Registro no encontrado"
                });
            }

            // El registro existe, ahora procedemos con la actualización
            if (!req.body.idMascota && !req.body.nombreSolicitante && !req.body.correoSolicitante && !req.body.estadoSolicitud) {
                return res.status(400).json({
                    mensaje: "No se encontraron datos para actualizar"
                });
            }

            const idMascota = req.body.idMascota || registroExistente.idMascota;
            const nombreSolicitante = req.body.nombreSolicitante || registroExistente.nombreSolicitante;
            const correoSolicitante = req.body.correoSolicitante || registroExistente.correoSolicitante;
            const estadoSolicitud = req.body.estadoSolicitud || registroExistente.estadoSolicitud;

            solicitudes.update({ idMascota, nombreSolicitante, correoSolicitante, estadoSolicitud }, { where: { id_Solicitud } })
                .then(() => {
                    res.status(200).json({
                        mensaje: "Registro actualizado correctamente"
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        mensaje: `Error al actualizar registro ::: ${err}`
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al verificar la existencia del registro ::: ${err}`
        });
    });
};


const eliminarSolicitud=(req,res)=>{
    const id_Solicitud= req.params.id;
    if(id_Solicitud == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }
    solicitudes.destroy({ where: { id_Solicitud }})
        .then((resultado)=>{
            res.status(200).json({
                mensaje: `Registro Eliminado`
            });
        })
        .catch((err)=>{
            res.status(500).json({
                mensaje: `Error al eliminar Registro ::: ${err}`
            });
        })
    

};
export{crearSolicitud, buscarIdSolicitud, buscarSolicitudes,actualizarsolicitud, eliminarSolicitud}