const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('medicamentName')
        .exists()
        .notEmpty()
        .isLength({ min: 2, max: 60 }),
    check('concentration')
        .exists()
        .notEmpty()
        .isAlphanumeric()
        .isLength({ min: 2, max: 10 }),
    check('quantity')
        .exists()
        .notEmpty()
        .isInt(),
    check('price')
        .exists()
        .notEmpty()
        .isFloat(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateCreate }