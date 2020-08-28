'use strict';

const Schmervice = require('schmervice');
const MathJS = require('mathjs');
const Boom = require('@hapi/boom');

const getError = (char) => (char ? `Invalid expression. Syntax error at char ${char}.` : 'Invalid expression.');

module.exports = class ExpressionService extends Schmervice.Service {
    evaluate(expression) {

        try {
            const result = MathJS.evaluate(expression);
            return MathJS.format(result, { precision: 14, lowerExp: -40, upperExp: 40, notation: 'auto' });
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                throw Boom.badData(getError(error.char));
            }
            else {
                throw Boom.badData(getError());
            }
        }
    }
};
