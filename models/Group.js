module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adminId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Group.associate = (models) => {
        models.group.belongsToMany(models.user, { through: 'user_group' });
        models.group.belongsToMany(models.department, { through: 'favorite_department' });
        models.group.belongsToMany(models.product, { through: 'favorite_product' });
    };

    return Group;
};