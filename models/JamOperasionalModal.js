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
    tipeAbsenId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
});

TipeAbsen.hasMany(JamOperasional);
JamOperasional.belongsTo(TipeAbsen, {foreignKey: 'tipeAbsenId'});

export default JamOperasional;