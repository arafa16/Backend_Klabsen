import Atasan from "../models/AtasanModal.js";
import InOut from "../models/InOutModal.js";
import Pelanggaran from "../models/PelanggaranModal.js";
import StatusInout from "../models/StatusInoutModal.js";
import TipeAbsen from "../models/TipeAbsenModal.js";
import Users from "../models/UserModel.js";

export const getInOut = async(req, res) => {
    try {
        const response = await InOut.findAll({
            attributes:['uuid','tanggalMulai','tanggalSelesai','isActive'],
            include:[{
                model:Users,
                attributes:['uuid','name','absenId','isActive'],
                include:{
                    model:Atasan,
                    attributes:['uuid'],
                    include:{
                        model:Users,
                        attributes:['uuid','name']
                    }
                }
            },{
                model:TipeAbsen,
                attributes:['uuid','name']
            },{
                model:Pelanggaran,
                attributes:['uuid','name']
            },{
                model:StatusInout,
                attributes:['uuid','name']
            }]
        });
        
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const getInOutById = async(req, res) => {
    try {
        const response = await InOut.findOne({
            where:{
                uuid:req.params.id
            },
            attributes:['uuid','tanggalMulai','tanggalSelesai','isActive'],
            include:[{
                model:Users,
                attributes:['uuid','name','absenId'],
                include:{
                    model:Atasan,
                    attributes:['uuid'],
                    include:{
                        model:Users,
                        attributes:['uuid','name']
                    }
                }
            },{
                model:TipeAbsen,
                attributes:['uuid','name']
            },{
                model:Pelanggaran,
                attributes:['uuid','name']
            },{
                model:StatusInout,
                attributes:['uuid','name']
            }]
        });
        
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const getInOutByUser = async(req, res) => {
    try {
        const user = await Users.findOne({
            where:{
                uuid:req.params.id
            }
        });

        const response = await InOut.findAll({
            where:{
                userId:user.id
            },
            attributes:['uuid','tanggalMulai','tanggalSelesai','isActive'],
            include:[
                {
                    model:TipeAbsen,
                    attributes:['uuid','name']
                },
                {
                    model:Pelanggaran,
                    attributes:['uuid','name']
                },
                {
                    model:StatusInout,
                    attributes:['uuid','name']
                }
            ]
        });
        
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const createInOut = async(req, res) => {
    const {userId, tanggalMulai, tanggalSelesai, tipeAbsenId, pelanggaranId, statusInoutId} = req.body;

    const user = await Users.findOne({
        where:{
            uuid:userId
        }
    });

    const tipeAbsen = await TipeAbsen.findOne({
        where:{
            uuid:tipeAbsenId
        }
    });

    const pelanggaran = await Pelanggaran.findOne({
        where:{
            uuid:pelanggaranId
        }
    });

    const statusInout = await StatusInout.findOne({
        where:{
            uuid:statusInoutId
        }
    })

    try {
        await InOut.create({
            userId:user && user.id,
            tanggalMulai:tanggalMulai,
            tanggalSelesai:tanggalSelesai,
            tipeAbsenId:tipeAbsen && tipeAbsen.id,
            pelanggaranId:pelanggaran && pelanggaran.id,
            statusInoutId:statusInout && statusInout.id
        });

        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

// update absen
export const updateInOut = async(req, res) => {
    const {userId, tanggalMulai, tanggalSelesai, tipeAbsenId, pelanggaranId, statusInoutId} = req.body;

    const response = await InOut.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!response) return res.status(404).json({msg: "not found"});

    const user = await Users.findOne({
        where:{
            uuid:userId
        }
    });

    const tipeAbsen = await TipeAbsen.findOne({
        where:{
            uuid:tipeAbsenId
        }
    });

    const pelanggaran = await Pelanggaran.findOne({
        where:{
            uuid:pelanggaranId
        }
    });

    const statusInout = await StatusInout.findOne({
        where:{
            uuid:statusInoutId
        }
    })

    try {
        response.update({
            userId:user && user.id,
            tanggalMulai:tanggalMulai,
            tanggalSelesai:tanggalSelesai,
            tipeAbsenId:tipeAbsen && tipeAbsen.id,
            pelanggaranId:pelanggaran && pelanggaran.id,
            statusInoutId:statusInout && statusInout.id
        });

        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

// delete absen
export const deleteInOut = async(req, res) => {
    const response = await InOut.findOne({
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