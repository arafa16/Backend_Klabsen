import {Sequelize} from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Privilege = db.define('privilege', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    dashboard:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    editUserSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    absen:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    kalendarSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    pengajuanKoreksiSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    approvalKoreksiSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    absenModal:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    wfhModal:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    shiftModal:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    slipGaji:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    pendapatanSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    pendapatanLainSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    pendapatanAdminSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    admin:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    userSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    eventSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    koreksiAdminSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    perhitunganNilaiSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    etiket:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    pengajuanKendalaSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    perbaikanKendalaSub:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    setting:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
});

export default Privilege