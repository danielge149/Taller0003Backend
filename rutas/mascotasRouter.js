import express from "express";
import {crearMascota,buscarIdMascotas,buscarMascotas,actualizarMascota, eliminarMascota,
     buscarMascotasDiponibles, buscarGatos, buscarPerros} from "../controladores/mascotasController.js";
const routerMascotas = express.Router();

routerMascotas.get("/",(req,res)=>{
    res.send("Bienvenido a Mascotas");
});

routerMascotas.post("/crearMascota",(req,res)=>{
    crearMascota(req,res);
});

routerMascotas.get("/buscarMascota/:id",(req,res)=>{
    buscarIdMascotas(req,res);
});

routerMascotas.get("/buscarMascota",(req,res)=>{
    buscarMascotas(req,res);
});

routerMascotas.get("/buscarPerros",(req,res)=>{
    buscarPerros(req,res);
});

routerMascotas.get("/buscarGatos",(req,res)=>{
    buscarGatos(req,res);
});

routerMascotas.get("/buscarMascotasDiponibles",(req,res)=>{
    buscarMascotasDiponibles(req,res);
});


routerMascotas.put("/actualizarMascota/:id",(req,res)=>{
    actualizarMascota(req,res);
});

routerMascotas.delete("/eliminarMascota/:id",(req,res)=>{
    eliminarMascota(req,res);
});

export {routerMascotas}
