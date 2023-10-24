import Users from "../models/UsersModel.js";

export const getAtasans = async(req, res) => {
    try {
        const response = await Users.findAll({
            where:{
                atasanId:1
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}