import Sequelize from "sequelize";
import {db} from "../database/conexion.js";

const mascotas = db.define("mascotas",{
    id_mascota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    disponible: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

export {mascotas}