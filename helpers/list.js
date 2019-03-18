const _ = require('lodash');
const models = require('../models');

module.exports = {
    getProductsFromDepartment: async (listId) => {
        try {
            const query = await models.sequelize.query(`
            SELECT 
                d.id AS departmentId, 
                d.name AS departmentName, 
                p.id, 
                p.name, 
                p.quantity as weight, 
                p.brand, 
                p.nutrition_grade, 
                p.image_url, 
                lp.quantity
            FROM list_products lp 
            JOIN departments d 
            ON lp.departmentId = d.id 
            JOIN products p 
            ON lp.productId = p.id 
            WHERE lp.listId = ${listId}`, { type: models.sequelize.QueryTypes.SELECT });

            return _.groupBy(query, (data) => data.departmentName);
        }
        catch (e) {
            throw new Error(e.message);
        }

    }
};