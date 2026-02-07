const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validDate: {
                notEmpty: true,
                len: [1, 100]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        event_date:{
            type:DataTypes.DATE,
            allowNull: false
        },
        category:{
            type: DataTypes.STRING(50),
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'event'
    }
);

module.exports = Event;