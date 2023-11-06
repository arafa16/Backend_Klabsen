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
// import path from 'path';
// import fs from 'fs';

export const getUsers = async(req, res) => {
    try {
        const response = await Users.findAll({
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
                    model:Users,
                    as: 'atasan',
                    attributes:['uuid','name']
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

    const offset = (page - 1) * limit;

    try {
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
                },
                {
                    model:Users,
                    as: 'atasan',
                    attributes:['uuid','name']
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
            jamOperasionalId,
            groupId,
            password,
            quote,
            statusId
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
            jamOperasionalId:jamOperasionalId,
            groupId:groupId,
            quote:quote,
            statusId:statusId
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
        jamOperasionalId,
        groupId,
        password,
        quote,
        statusId
    } = req.body;

    const hasPassword = await argon.hash(password);

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
            jamOperasionalId:jamOperasionalId,
            groupId:groupId,
            password:hasPassword,
            quote:quote,
            statusId:statusId
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