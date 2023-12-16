import express from "express";
import { buscarIdSolicitud, crearSolicitud, buscarSolicitudes, 
    actualizarsolicitud, eliminarSolicitud} from "../controladores/solicitudesController.js";
const routerSolicitudes = express.Router();

routerSolicitudes.post("/crearSolicitud",(req,res)=>{
    crearSolicitud(req,res);
});

routerSolicitudes.get("/buscarIdSolicitud/:id",(req,res)=>{
    buscarIdSolicitud(req,res);
});

routerSolicitudes.get("/buscarSolicitudes",(req,res)=>{
    buscarSolicitudes(req,res);
});

routerSolicitudes.put("/actualizarSolicitud/:id",(req,res)=>{
    actualizarsolicitud(req,res);
});

routerSolicitudes.delete("/eliminarSolicitud/:id",(req,res)=>{
    eliminarSolicitud(req,res);
});

export{routerSolicitudes}