import Slider from '../models/SliderModel.js';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

export const getSlider = async(req, res) => {
    try {
        const response = await Slider.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const getSLiderTable = async(req, res)=>{
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);

    const offset = (page - 1) * limit;

    try {
        const result = await Slider.findAndCountAll({
            limit:limit,
            offset:offset,
            where:{
                is_delete:false
            },
            order:[['sequence', 'ASC']]
        });
    
        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }

    
}

export const getSLiderById = async(req, res)=>{
    
    try {
        const result = await Slider.findOne({
            where:{
                uuid:req.params.uuid
            }
        });

        return res.status(200).json({
            data:result,
            msg:"success"
        })
    }   catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const createSlider = async(req, res) => {
    const {sequence, name} = req.body;

    try {
        const file = req.files.file;
        const ext = path.extname(file.name);
        const fileName = crypto.randomUUID()+ext;
        const fileLink = `/slider/${fileName}`;
        const allowed_type = ['.png','.jpg','.jpeg'];

        //filter file type
        if(!allowed_type.includes(ext.toLowerCase())) return res.status(422).json({msg: "type file not allowed"});
    
        file.mv(`./public/slider/${fileName}`, async(err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });

        await Slider.create({
            name,
            fileName,
            fileLink,
            sequence,
        });

        return res.status(201).json({msg: "file uploaded"});

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const deleteSLider = async(req, res)=>{

    try {
        const result = await Slider.findOne({
            where:{
                uuid:req.params.uuid
            }
        });
    
        if(!result){
            return res.status(401).json({
                data:result,
                msg:"not found"
            })
        }

        fs.unlinkSync(`./public/${result.fileLink}`);
    
        await result.destroy();
    
        return res.status(200).json({
            data:result,
            msg:"success"
        })
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
    
}