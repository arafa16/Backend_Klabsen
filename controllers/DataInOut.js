import InOut from "../models/InOutModal.js";
import path from 'path';
import xlsx from 'xlsx';
import date from 'date-and-time';
import Users from "../models/UsersModel.js";
import TipeAbsen from "../models/TipeAbsenModal.js";
import { where } from "sequelize";

export const importInOut = async(req, res) => {
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

        const dataSubmit = [];

        try {
            for(let i = 0; i < data.length; i++){
                const tanggalMulai = date.format(new Date(data[i].tanggalMulai), 'YYYY-MM-DD HH:mm:ss');
                const tanggalSelesai = date.format(new Date(data[i].tanggalSelesai), 'YYYY-MM-DD HH:mm:ss');

                const user = await Users.findOne({
                    where:{
                        absenId:data[i].absenId
                    },
                    attributes:['id']
                });

                const tipeAbsen = await TipeAbsen.findOne({
                    where:{
                        code:data[i].tipeAbsenId
                    }
                })

                const response = await InOut.create({
                    userId:user.id,
                    tanggalMulai:tanggalMulai,
                    tanggalSelesai:tanggalSelesai,
                    tipeAbsenId:tipeAbsen.id,
                    pelanggaranId:data[i].pelanggaranId,
                    statusInoutId:data[i].tatusInoutId
                });

                dataSubmit.push(response);
            }

            return res.status(200).json({msg : "success"});
        } catch (error) {
            return res.status(500).json({msg : error});
        }
    })
}