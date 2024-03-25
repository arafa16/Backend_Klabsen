import {Sequelize} from 'sequelize';
import db from '../config/Database.js';
import TipeAbsen from './TipeAbsenModal.js';

const {DataTypes} = Sequelize;

const JamOperasional = db.define('jam_operasional', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    jamMasuk:{
        type: DataTypes.TIME,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    jamPulang:{
        type: DataTypes.TIME,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull:true
    },
    code:{
        type: DataTypes.STRING,
        allowNull:true
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
});

export default JamOperasional;