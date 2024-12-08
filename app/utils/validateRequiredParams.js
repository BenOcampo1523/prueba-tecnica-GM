/**
 * Validate required params
 * @param {Object} params - The params to validate
 * @param {Array} requiredParams - The required params
 * @returns {String|Boolean} - The missing param or false if all required params are present.
 */
const validateRequiredParams = (params, requiredParams) => {

    if (requiredParams.length === 0) return false;

    for (const param of requiredParams) {
        if (!params[param]) {
            return `El campo ${param} es requerido.`;
        }
    }

    return false;
};

module.exports = validateRequiredParams;