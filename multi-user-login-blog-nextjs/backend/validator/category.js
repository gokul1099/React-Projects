const { check } = require('express-validator/check');
exports.categoryCreateValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),

]