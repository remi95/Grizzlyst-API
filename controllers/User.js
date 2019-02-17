const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /users:
 *    get:
 *      description: This should return all users
 */
router.get('/', async (req, res) => {
    try {
        res.json(await models.user.findAll());
    }
    catch (e) {
        res.json({message: e.error});
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await models.user.findByPk(req.params.id));
    }
    catch (e) {
        res.json({message: e.error});
    }
});

router.get('/:id/invitations', async (req, res) => {
    try {
        const invitations = await models.invitation.findAll({
            where: { email: req.current_user.email }
        });
        return res.json(invitations);
    }
    catch (e) {
        res.json({message: e.error});
    }
});



module.exports = router;