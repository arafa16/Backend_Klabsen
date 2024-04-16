import { where } from "sequelize";
import MesinAbsen from "../models/MesinAbsenModal.js";

export const getMesinAbsen = async(req, res) => {
    try {
        const response = await MesinAbsen.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

export const getMesinAbsenTable = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);

    const offset = (page - 1) * limit;
    
    try {
        const response = await MesinAbsen.findAndCountAll({
            limit:limit,
            offset:offset,
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

export const getMesinAbsenById = async(req, res) => {
    try {
        const response = await MesinAbsen.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

export const createMesinAbsen = async(req, res) => {
    const {name, ipMesin} = req.body;

    try {
        await MesinAbsen.create({
            name:name,
            ipMesin:ipMesin
        });

        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const updateMesinAbsen = async(req, res) => {
    const {name, ipMesin} = req.body;

    const findMesin = await MesinAbsen.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findMesin) return res.status(404).json({msg: "tidak ada mesin"});

    try {
        await findMesin.update({
            name:name,
            ipMesin:ipMesin
        });

        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const deleteMesinAbsen = async(req, res) => {

    const findMesin = await MesinAbsen.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findMesin) return res.status(404).json({msg: "tidak ada mesin"});

    try {
        await findMesin.destroy();

        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}