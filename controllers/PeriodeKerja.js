import PeriodeKerja from "../models/PeriodeKerjaModal.js";
import Status from "../models/StatusModel.js";


export const getPeriode = async(req, res) => {
    try {
        const response = await PeriodeKerja.findAll({
            include:{
                model:Status,
                attributes:['uuid','name']
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const getPeriodeTable = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);

    const offset = (page - 1) * limit;

    try {
        const response = await PeriodeKerja.findAndCountAll({
            limit:limit,
            offset:offset,
            include:{
                model:Status,
                attributes:['uuid','name']
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const getPeriodeById = async(req, res) => {
    try {
        const response = await PeriodeKerja.findOne({
            where:{
                uuid:req.params.id
            },
            include:{
                model:Status,
                attributes:['uuid','name']
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const createPeriode = async(req, res) => {
    const {nameBulan, tanggalMulai, tanggalSelesai, jumlahHari, statusId, isActive} = req.body;

    const status = await Status.findOne({
        where:{
            uuid:statusId
        }
    });

    try {
        await PeriodeKerja.create({
            nameBulan:nameBulan,
            tanggalMulai:tanggalMulai,
            tanggalSelesai:tanggalSelesai,
            jumlahHari:jumlahHari,
            statusId:status && status.id,
            isActive:isActive
        });

        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const updatePeriode = async(req, res) => {
    const {nameBulan, tanggalMulai, tanggalSelesai, jumlahHari, statusId, isActive} = req.body;

    const response = await PeriodeKerja.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!response) return res.status(404).json({msg: "not found"});

    const status = await Status.findOne({
        where:{
            uuid:statusId
        }
    });

    try {
        response.update({
            nameBulan:nameBulan,
            tanggalMulai:tanggalMulai,
            tanggalSelesai:tanggalSelesai,
            jumlahHari:jumlahHari,
            statusId:status && status.id,
            isActive:isActive
        });

        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const deletePeriode = async(req, res) => {
    const response = await PeriodeKerja.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!response) return res.status(404).json({msg: "not found"});

    try {
        response.destroy();

        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}