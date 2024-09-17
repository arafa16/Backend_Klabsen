import {Sequelize} from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Slider = db.define('slider', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    name: {
        type: Sequelize.STRING
    },
    fileName: {
        type: Sequelize.STRING
    },
    fileLink: {
        type: Sequelize.STRING
    },
    sequence: {
        type: Sequelize.INTEGER
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    },
    is_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
});

export default Slider;