'use strict';

module.exports = {
    method: 'GET',
    path: '/evaluate/{expression}',
    options: {
        cors: {
            origin: 'ignore'
        },
        handler: (request, h) => {

            const { expressionService } = request.services();
            const { expression } = request.params;
            const value = expressionService.evaluate(expression);

            return { expression, value };
        }
    }
};
