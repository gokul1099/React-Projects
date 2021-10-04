const { check } = require('express-validator/check');
exports.tagCreateValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),

]