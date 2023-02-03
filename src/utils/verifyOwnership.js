/**
 * This function is used to verify if the user is authorized to execute an action on a user object.
 * @param {Object} executer - The user object who is trying execute the action.
 * @param {String} targetId - The id of the user object that the action is being executed on.
 * @throws {Error} - If the user is not authorized to execute the action.
 * @returns {Boolean || Error} - If the user is authorized to execute the action.
 */
module.exports = (executer, targetId) => {
    if (
        (executer.id !== targetId && executer.role === 'admin') ||
        executer.id === targetId
    )
        return true
    else throw new Error('You are not authorized to use this action')
}
