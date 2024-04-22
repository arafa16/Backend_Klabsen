import Users from "../models/UsersModel.js";
import Bank from "../models/BankModal.js";
import Gander from "../models/GanderModal.js";
import GolonganDarah from "../models/GolonganDarahModel.js";
import Group from "../models/GroupModal.js";
import Jabatan from "../models/JabatanModal.js";
import JamOperasional from "../models/JamOperasionalModal.js";
import ContactEmergency from "../models/ContactEmergencyModal.js";
import Pendidikan from "../models/PendidikanModal.js";
import Penempatan from "../models/PenempatanModel.js";
import Status from "../models/StatusModel.js";
import StatusPerkawinan from "../models/StatusPerkawinanModal.js";

import argon from 'argon2';
import Privilege from "../models/PrivilegeModal.js";
import path from 'path';
import fs from 'fs';
import xlsx from 'xlsx';
import JamOperasionalGroup from "../models/JamOperasionalGroupModal.js";

export const getUsers = async(req, res) => {
    try {
        const response = await Users.findAndCountAll({
            include:[
                {
                    model:Gander,
                    attributes:['uuid','name']
                },
                {
                    model:Pendidikan,
                    attributes:['uuid','name']
                },
                {
                    model:Penempatan,
                    attributes:['uuid','name']
                },
                {
                    model:Jabatan,
                    attributes:['uuid','name']
                },
                {
                    model:StatusPerkawinan,
                    attributes:['uuid','name']
                },
                {
                    model:ContactEmergency,
                    attributes:['uuid','name']
                },
                {
                    model:Bank,
                    attributes:['uuid','name']
                },
                {
                    model:GolonganDarah,
                    attributes:['uuid','name']
                },
                {
                    model:JamOperasionalGroup,
                    attributes:['uuid','name','keterangan','code','isActive']
                },
                {
                    model:Group,
                    attributes:['uuid','name']
                },
                {
                    model:Users,
                    as: 'atasan',
                    attributes:['uuid','name']
                },
                {
                    model:Status,
                    attributes:['uuid','name','code']
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export const getUsersTable = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const statusCode = parseInt(req.params.statusCode);

    const offset = (page - 1) * limit;

    try {
        if(statusCode !== 0){
            const response = await Users.findAndCountAll({
                limit:limit,
                offset:offset,
                include:[
                    {
                        model:Gander,
                        attributes:['uuid','name']
                    },
                    {
                        model:Pendidikan,
                        attributes:['uuid','name']
                    },
                    {
                        model:Penempatan,
                        attributes:['uuid','name']
                    },
                    {
                        model:Jabatan,
                        attributes:['uuid','name']
                    },
                    {
                        model:StatusPerkawinan,
                        attributes:['uuid','name']
                    },
                    {
                        model:ContactEmergency,
                        attributes:['uuid','name']
                    },
                    {
                        model:Bank,
                        attributes:['uuid','name']
                    },
                    {
                        model:GolonganDarah,
                        attributes:['uuid','name']
                    },
                    {
                        model:JamOperasionalGroup,
                        attributes:['uuid','name','keterangan','code','isActive']
                    },
                    {
                        model:Group,
                        attributes:['uuid','name']
                    },
                    {
                        model:Status,
                        where:{
                            code:statusCode
                        },
                        attributes:['uuid','name','code']
                    }
                ]
            });

            res.status(200).json(response);
        }
        else{
            const response = await Users.findAndCountAll({
                limit:limit,
                offset:offset,
                include:[
                    {
                        model:Gander,
                        attributes:['uuid','name']
                    },
                    {
                        model:Pendidikan,
                        attributes:['uuid','name']
                    },
                    {
                        model:Penempatan,
                        attributes:['uuid','name']
                    },
                    {
                        model:Jabatan,
                        attributes:['uuid','name']
                    },
                    {
                        model:StatusPerkawinan,
                        attributes:['uuid','name']
                    },
                    {
                        model:ContactEmergency,
                        attributes:['uuid','name']
                    },
                    {
                        model:Bank,
                        attributes:['uuid','name']
                    },
                    {
                        model:GolonganDarah,
                        attributes:['uuid','name']
                    },
                    {
                        model:JamOperasional,
                        attributes:['uuid','name','jamMasuk','jamPulang','keterangan']
                    },
                    {
                        model:Group,
                        attributes:['uuid','name']
                    },
                    {
                        model:Status,
                        attributes:['uuid','name']
                    }
                ]
            });
    
            res.status(200).json(response);
        }
        
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            where:{
                uuid:req.params.id
            },
            include:[
                {
                    model:Gander,
                    attributes:['uuid','name']
                },
                {
                    model:Pendidikan,
                    attributes:['uuid','name']
                },
                {
                    model:Penempatan,
                    attributes:['uuid','name']
                },
                {
                    model:Jabatan,
                    attributes:['uuid','name']
                },
                {
                    model:StatusPerkawinan,
                    attributes:['uuid','name']
                },
                {
                    model:ContactEmergency,
                    attributes:['uuid','name']
                },
                {
                    model:Bank,
                    attributes:['uuid','name']
                },
                {
                    model:GolonganDarah,
                    attributes:['uuid','name']
                },
                {
                    model:JamOperasionalGroup,
                    attributes:['uuid','name','keterangan','code','isActive']
                },
                {
                    model:Group,
                    attributes:['uuid','name']
                },
                {
                    model:Status,
                    attributes:['id','uuid','name']
                },
                {
                    model:Users,
                    as: 'atasan',
                    attributes:['uuid','name']
                },
                {
                    model:Privilege
                }
            ]
        });

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

export const createUser = async(req, res) => {
    const { nik,
            absenId, 
            name, 
            ganderId, 
            email,
            extention,
            nomorHp,
            penempatanId,
            jabatanId,
            atasanId,
            nomorKtp,
            alamatKtp,
            alamatDomisili,
            tempatLahir,
            tanggalLahir,
            nomorNpwp,
            statusPerkawinanId,
            jumlahAnak,
            namaIbu,
            pendidikanId,
            namaSekolah,
            jurusanSekolah,
            tahunLulus,
            ipk,
            nomorBpjsKesehatan,
            nomorBpjsKetenagakerjaan,
            contactEmergencyId,
            emergencyNumber,
            emergencyAddress,
            nomorSim,
            golonganDarahId,
            bankId,
            nomorRekening,
            jamOperasionalGroupId,
            groupId,
            password,
            quote,
            statusId,
            isActive
        } = req.body;
    
    const hasPassword = await argon.hash(password);

    try {
        await Users.create({
            nik:nik,
            absenId:absenId,
            name:name, 
            ganderId:ganderId, 
            email:email,
            password:hasPassword,
            extention:extention,
            nomorHp:nomorHp,
            penempatanId:penempatanId,
            jabatanId:jabatanId,
            atasanId:atasanId,
            nomorKtp:nomorKtp,
            alamatKtp:alamatKtp,
            alamatDomisili:alamatDomisili,
            tempatLahir:tempatLahir,
            tanggalLahir:tanggalLahir,
            nomorNpwp:nomorNpwp,
            statusPerkawinanId:statusPerkawinanId,
            jumlahAnak:jumlahAnak,
            namaIbu:namaIbu,
            pendidikanId:pendidikanId,
            namaSekolah:namaSekolah,
            jurusanSekolah:jurusanSekolah,
            tahunLulus:tahunLulus,
            ipk:ipk,
            nomorBpjsKesehatan:nomorBpjsKesehatan,
            nomorBpjsKetenagakerjaan:nomorBpjsKetenagakerjaan,
            contactEmergencyId:contactEmergencyId,
            emergencyNumber:emergencyNumber,
            emergencyAddress:emergencyAddress,
            nomorSim:nomorSim,
            golonganDarahId:golonganDarahId,
            bankId:bankId,
            nomorRekening:nomorRekening,
            jamOperasionalGroupId:jamOperasionalGroupId,
            groupId:groupId,
            quote:quote,
            statusId:statusId,
            isActive:isActive
        });

        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const updateUser = async(req, res) => {
    const findUser = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findUser) return res.status(404).json({msg: "not found"});

    const { 
        nik,
        absenId, 
        name, 
        ganderId, 
        email,
        extention,
        nomorHp,
        penempatanId,
        jabatanId,
        atasanId,
        nomorKtp,
        alamatKtp,
        alamatDomisili,
        tempatLahir,
        tanggalLahir,
        nomorNpwp,
        statusPerkawinanId,
        jumlahAnak,
        namaIbu,
        pendidikanId,
        namaSekolah,
        jurusanSekolah,
        tahunLulus,
        ipk,
        nomorBpjsKesehatan,
        nomorBpjsKetenagaKerja,
        kontakEmergencyId,
        nomorEmergency,
        alamatEmergency,
        nomorSim,
        golonganDarahId,
        bankId,
        nomorRekening,
        jamOperasionalGroupId,
        groupId,
        quote,
        statusId,
        isActive,
    } = req.body;

    try {
        findUser.update({
            nik:nik,
            absenId:absenId,
            name:name, 
            ganderId:ganderId, 
            email:email,
            extention:extention,
            nomorHp:nomorHp,
            penempatanId:penempatanId,
            jabatanId:jabatanId,
            atasanId:atasanId,
            nomorKtp:nomorKtp,
            alamatKtp:alamatKtp,
            alamatDomisili:alamatDomisili,
            tempatLahir:tempatLahir,
            tanggalLahir:tanggalLahir,
            nomorNpwp:nomorNpwp,
            statusPerkawinanId:statusPerkawinanId,
            jumlahAnak:jumlahAnak,
            namaIbu:namaIbu,
            pendidikanId:pendidikanId,
            namaSekolah:namaSekolah,
            jurusanSekolah:jurusanSekolah,
            tahunLulus:tahunLulus,
            ipk:ipk,
            nomorBpjsKesehatan:nomorBpjsKesehatan,
            nomorBpjsKetenagaKerja:nomorBpjsKetenagaKerja,
            kontakEmergencyId:kontakEmergencyId,
            nomorEmergency:nomorEmergency,
            alamatEmergency:alamatEmergency,
            nomorSim:nomorSim,
            golonganDarahId:golonganDarahId,
            bankId:bankId,
            nomorRekening:nomorRekening,
            jamOperasionalGroupId:jamOperasionalGroupId,
            groupId:groupId,
            quote:quote,
            statusId:statusId,
            isActive:isActive
        });

        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const changePassword = async(req, res) => {
    const findUser = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findUser) return res.status(404).json({msg: "not found"});

    const { password } = req.body;

    const hasPassword = await argon.hash(password);

    try {
        findUser.update({
            password:hasPassword
        });

        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) => {
    const response = await Users.findOne({
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

export const importUsers = async(req, res) => {
    if(req.files === null) return res.status(401).json({msg: "No file Upload"});
    
    const {file} = req.files;
    const ext = path.extname(file.name);
    const fileName = file.md5+ext;
    const filePath = `./public/importFile/${fileName}`;

    file.mv(filePath, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        
        let workbook = xlsx.readFile(`./public/importFile/${fileName}`);
        let sheetNames = workbook.SheetNames[0];
        let data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames]);

        console.log(data);
        
        try {
            for(let i = 0; i < data.length; i++){

                const findGander = await Gander.findOne({
                    where:{
                        name:data[i].gander
                    },
                    attributes:['id','name']
                });

                const findPenempatan = await Penempatan.findOne({
                    where:{
                        name:data[i].penempatan
                    },
                    attributes:['id','name']
                });

                const findJabatan = await Jabatan.findOne({
                    where:{
                        name:data[i].jabatan
                    },
                    attributes:['id','name']
                });

                const findAtasan = await Users.findOne({
                    where:{
                        name:data[i].atasan
                    },
                    attributes:['id','name']
                })

                const findStatusPerkawinan = await StatusPerkawinan.findOne({
                    where:{
                        name:data[i].statusPerkawinan
                    },
                    attributes:['id','name']
                })

                const findPendidikan = await Pendidikan.findOne({
                    where:{
                        name:data[i].pendidikan
                    },
                    attributes:['id','name']
                })

                const findContactEmergency = await ContactEmergency.findOne({
                    where:{
                        name:data[i].contactEmergency
                    },
                    attributes:['id','name']
                })

                const findGolonganDarah = await GolonganDarah.findOne({
                    where:{
                        name:data[i].golonganDarah
                    },
                    attributes:['id','name']
                })

                const findBank = await Bank.findOne({
                    where:{
                        name:data[i].bank
                    },
                    attributes:['id','name']
                })

                const findJamOperasionalGroup = await JamOperasionalGroup.findOne({
                    where:{
                        name:data[i].jamOperasionalGroup
                    },
                    attributes:['id','name']
                })

                const findGroup = await Group.findOne({
                    where:{
                        name:data[i].group
                    },
                    attributes:['id','name']
                })

                const findStatus = await Status.findOne({
                    where:{
                        name:data[i].status
                    },
                    attributes:['id','name']
                })

                const hasPassword = await argon.hash(data[i].password);

                const createUser = await Users.create({
                    nik:data[i].nik,
                    absenId:data[i].absenId,
                    name:data[i].name, 
                    ganderId:findGander && findGander.id, 
                    email:data[i].email,
                    password:hasPassword,
                    extention:data[i].extention,
                    nomorHp:data[i].nomorHp,
                    penempatanId:findPenempatan && findPenempatan.id,
                    jabatanId:findJabatan && findJabatan.id,
                    atasanId:findAtasan && findAtasan.id,
                    nomorKtp:data[i].nomorKtp,
                    alamatKtp:data[i].alamatKtp,
                    alamatDomisili:data[i].alamatDomisili,
                    tempatLahir:data[i].tempatLahir,
                    tanggalLahir:data[i].tanggalLahir,
                    nomorNpwp:data[i].nomorNpwp,
                    statusPerkawinanId:findStatusPerkawinan && findStatusPerkawinan.id,
                    jumlahAnak:data[i].jumlahAnak,
                    namaIbu:data[i].namaIbu,
                    pendidikanId:findPendidikan && findPendidikan.id,
                    namaSekolah:data[i].namaSekolah,
                    jurusanSekolah:data[i].jurusanSekolah,
                    tahunLulus:data[i].tahunLulus,
                    ipk:data[i].ipk,
                    nomorBpjsKesehatan:data[i].nomorBpjsKesehatan,
                    nomorBpjsKetenagakerjaan:data[i].nomorBpjsKetenagakerjaan,
                    contactEmergencyId:findContactEmergency && findContactEmergency.id,
                    emergencyNumber:data[i].emergencyNumber,
                    emergencyAddress:data[i].emergencyAddress,
                    nomorSim:data[i].nomorSim,
                    golonganDarahId:findGolonganDarah && findGolonganDarah.id,
                    bankId:findBank && findBank.id,
                    nomorRekening:data[i].nomorRekening,
                    jamOperasionalGroupId:findJamOperasionalGroup && findJamOperasionalGroup.id,
                    groupId:findGroup && findGroup.id,
                    quote:data[i].quote,
                    statusId:findStatus && findStatus.id,
                    isActive:data[i].isActive
                });

                console.log(createUser, 'data user');
            }
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }

        fs.unlinkSync(filePath);
        
        return res.status(201).json({msg: "success"});
    });
}