async function actionRunner(actionFunction, input, validateFunction) {
    try {
        if (validateFunction) {
            await validateFunction(input);
        }
        return await actionFunction(input);
    } catch (error) {
        console.log(error);
        
        return error;
    }
}

module.exports = actionRunner;
