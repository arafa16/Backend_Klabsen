import JamOperasional from "../models/JamOperasionalModal.js";
import TipeAbsen from "../models/TipeAbsenModal.js";

export const getJamOperasionals = async(req, res) => {
    try {
        const response = await JamOperasional.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const getJamOperasionalsTable = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);

    const offset = (page - 1) * limit;

    try {
        const response = await JamOperasional.findAndCountAll({
            limit:limit,
            offset:offset,
            include:{
                model:TipeAbsen
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const getJamOperasionalById = async(req, res) => {
    try {
        const response = await JamOperasional.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const createJamOperasional = async(req, res) => {
    const {name, jamMasuk, jamPulang, code, keterangan, tipeAbsenId, isActive} = req.body;
    try {
        await JamOperasional.create({
            name:name,
            jamMasuk:jamMasuk,
            jamPulang:jamPulang,
            keterangan:keterangan,
            code:code,
            tipeAbsenId:tipeAbsenId,
            isActive:isActive
        });

        res.status(201).json({msg: "create jam operasional success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const updateJamOperasional = async(req, res) => {
    const {name, jamMasuk, jamPulang, code, keterangan, tipeAbsenId, isActive} = req.body;

    const response = await JamOperasional.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!response) return res.status(404).json({msg: "not found"});

    try {
        response.update({
            name:name,
            jamMasuk:jamMasuk,
            jamPulang:jamPulang,
            keterangan:keterangan,
            code:code,
            tipeAbsenId:tipeAbsenId,
            isActive:isActive
        });

        res.status(201).json({msg: "update jam operasional success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const deleteJamOperasional = async(req, res) => {
    const response = await JamOperasional.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!response) return res.status(404).json({msg: "not found"});

    try {
        response.destroy();

        res.status(201).json({msg: "delete jam operasional success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}