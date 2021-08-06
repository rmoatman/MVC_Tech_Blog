const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {

}

Blog.init(

  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    date: {
        type: DataTypes.DATEONLY,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },

    comment: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
    },
    
    commentUser: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    username_id: {
        type: DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id',
        }
    },

  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
