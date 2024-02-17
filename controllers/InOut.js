import InOut from "../models/InOutModal.js";
import Pelanggaran from "../models/PelanggaranModal.js";
import StatusInout from "../models/StatusInoutModal.js";
import TipeAbsen from "../models/TipeAbsenModal.js";
import Users from "../models/UsersModel.js";
import { FingerprintSolution } from "fingerprint-solution";
import date from 'date-and-time';
import Koreksi from "../models/KoreksiModal.js";
import StatusKoreksi from "../models/StatusKoreksiModal.js";
import { Op } from "sequelize";
import JamOperasional from "../models/JamOperasionalModal.js";

export const getInOut = async(req, res) => {
    try {
        const response = await InOut.findAll({
            attributes:['uuid','tanggalMulai','tanggalSelesai','isActive'],
            include:[{
                model:Users,
                attributes:['uuid','name','absenId','isActive'],
                // include:{
                //     model:Atasan,
                //     attributes:['uuid'],
                //     include:{
                //         model:Users,
                //         attributes:['uuid','name']
                //     }
                // }
            },{
                model:TipeAbsen,
                attributes:['uuid','name','code']
            },{
                model:Pelanggaran,
                attributes:['uuid','name','code']
            },{
                model:StatusInout,
                attributes:['uuid','name','code']
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
                // include:{
                //     model:Atasan,
                //     attributes:['uuid'],
                //     include:{
                //         model:Users,
                //         attributes:['uuid','name']
                //     }
                // }
            },{
                model:TipeAbsen,
                attributes:['uuid','name']
            },{
                model:Pelanggaran,
                attributes:['uuid','name']
            },{
                model:StatusInout,
                attributes:['uuid','name']
            },{
                model:Koreksi,
                include:StatusKoreksi
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
                    attributes:['uuid','name','code']
                },
                {
                    model:Pelanggaran,
                    attributes:['uuid','name','code']
                },
                {
                    model:StatusInout,
                    attributes:['uuid','name','code']
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

// get data finger mesin

export const getDataFinger = async(req, res) => {
    const dataZonk = [];
    const dataBelumAbsen = [];
    const dataBelumAbsenMasuk = [];
    const dataBelumAbsenPulang = [];
    const dataSudahAbsen = [];

    try {
        const datas = await FingerprintSolution.download('202.152.5.198:8070', []);
        const dateNow = new Date();
        dateNow.setDate(dateNow.getDate() - 14);
        const min = date.format(dateNow, 'YYYY-MM-DD HH:mm:ss');

        const absenMasuk = datas.filter(
            data=>
            data.status == 0 &&
            data.time > min
            );

        const absenPulang = datas.filter(
            data=>
            data.status == 1 &&
            data.time > min
            );

        //submit absen masuk
        await Promise.all(absenMasuk.map(async (data)=>{
            const findUser = await Users.findOne({
                where:{
                    absenId:data.pin
                }
            });

            if(findUser === null){
                console.log(data.pin, 'id user tidak di temukan di sistem');
                dataZonk.push(data.pin);
            }
            else{
                const findTipeAbsen = await TipeAbsen.findOne({
                    where:{
                        code:data.status
                    }
                })
    
                const findInOut = await InOut.findOne({
                    where:{
                        userId:findUser.id,
                        tipeAbsenId:findTipeAbsen.id,
                        tanggalMulai:data.time
                    }
                })
    
                if(findInOut === null){
                    
                    const timeFind = new Date(data.time);
                    const timeFormat = date.format(timeFind, 'HH:mm:ss');
                    const dateTimeFormat = date.format(timeFind, 'YYYY-MM-DD HH:mm:ss');

                    const findJamOperasionals = await JamOperasional.findOne({
                        where:{
                            jamMasuk:{ [Op.gte]: timeFormat }
                        }
                    })

                    const findJamOperasionalsTerakhir = await JamOperasional.findAll({
                        limit:1,
                        where:{
                            tipeAbsenId:1,
                        },
                        order: [ [ 'createdAt', 'DESC' ]]
                    });

                    if(findJamOperasionals !== null){
                        const uploadAbsen = await InOut.create({
                            userId:findUser.id,
                            tipeAbsenId:findTipeAbsen.id,
                            tanggalMulai:data.time,
                            tanggalSelesai:data.time,
                            pelanggaranId:1,
                            statusInoutId:1,
                            jamOperasionalId:findJamOperasionals.id,
                        });
                    }
                    else{
                        if(timeFormat > findJamOperasionalsTerakhir[0].jamMasuk){
                            const uploadAbsen = await InOut.create({
                                userId:findUser.id,
                                tipeAbsenId:findTipeAbsen.id,
                                tanggalMulai:data.time,
                                tanggalSelesai:data.time,
                                pelanggaranId:2,
                                statusInoutId:1,
                                jamOperasionalId:findJamOperasionalsTerakhir[0].id
                            });
                        }
                        else{
                            const uploadAbsen = await InOut.create({
                                userId:findUser.id,
                                tipeAbsenId:findTipeAbsen.id,
                                tanggalMulai:data.time,
                                tanggalSelesai:data.time,
                                pelanggaranId:1,
                                statusInoutId:1,
                                jamOperasionalId:findJamOperasionalsTerakhir[0].id
                            });
                        }
                    }

                    dataBelumAbsenMasuk.push(data, timeFormat, dateTimeFormat, findJamOperasionals, findJamOperasionalsTerakhir[0].id);

                    
                }
                else{
                    dataSudahAbsen.push(findInOut);
                }
            }
        }));

        //submit absen pulang
        await Promise.all(absenPulang.map(async (data)=>{
            const findUser = await Users.findOne({
                where:{
                    absenId:data.pin
                }
            });

            const findTipeAbsen = await TipeAbsen.findOne({
                where:{
                    code:data.status
                }
            })

            if(findUser === null){
                console.log(data.pin, 'id user tidak di temukan di sistem');
                dataZonk.push(data.pin);
            }
            else{
                const dateFind = new Date(data.time);
                const timeFormat = date.format(dateFind, 'HH:mm:ss');
                const dateFormat = date.format(dateFind, 'YYYY-MM-DD');

                const findIn = await InOut.findOne({
                    where:{
                        tanggalMulai:{
                            [Op.and]: {
                                [Op.gte]: dateFormat + ' 00:00:00',
                                [Op.lte]: dateFormat + ' 23:59:59',
                                }
                        }
                    }
                })

                const findInOut = await InOut.findOne({
                    where:{
                        userId:findUser.id,
                        tipeAbsenId:findTipeAbsen.id,
                        tanggalMulai:data.time
                    }
                })

                const findJamOperasionalsTerakhir = await JamOperasional.findAll({
                    limit:1,
                    where:{
                        tipeAbsenId:1,
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                });

                if(findInOut !== null){
                    console.log('sudah absen');
                }
                else{
                    dataBelumAbsenPulang.push(data, dateFormat, findIn);

                    if(findIn === null){
                        
                        //mencari id tipe absen code 9 (tipe tidak absen masuk)
                        const tipeTidakAbsen = await TipeAbsen.findOne({
                            where:{
                                code:9
                            }
                        })

                        //tidak absen masuk -> upload absen type 9 (tidak absen masuk)
                        await InOut.create({
                            userId:findUser.id,
                            tipeAbsenId:tipeTidakAbsen.id,
                            tanggalMulai:dateFormat + ' 00:00:00',
                            tanggalSelesai:dateFormat + ' 00:00:00',
                            pelanggaranId:2,
                            statusInoutId:1,
                            jamOperasionalId:findJamOperasionalsTerakhir[0].id
                        });
                        
                        //tidak ditemukan absen masuk -> upload absen pulang
                        await InOut.create({
                            userId:findUser.id,
                            tipeAbsenId:findTipeAbsen.id,
                            tanggalMulai:data.time,
                            tanggalSelesai:data.time,
                            pelanggaranId:1,
                            statusInoutId:1,
                            jamOperasionalId:findJamOperasionalsTerakhir[0].id
                        });
                    }
                    else{
                        //absen masuk ditemukan -> upload absen pulang 
                        await InOut.create({
                            userId:findUser.id,
                            tipeAbsenId:findTipeAbsen.id,
                            tanggalMulai:data.time,
                            tanggalSelesai:data.time,
                            pelanggaranId:1,
                            statusInoutId:1,
                            jamOperasionalId:findIn.jamOperasionalId
                        });
                    }
                }

            }
        }));

        res.status(200).json({msg: "success", dataZonk, dataBelumAbsen, dataBelumAbsenMasuk, dataBelumAbsenPulang, dataSudahAbsen});
    } catch (error) {
        return res.status(500).json({msg : error});
    }
}