async function actionRunner(actionFunction: Function, input: any, validateFunction?: Function) {
    try {
        if (validateFunction) {
            await validateFunction(input);
        }
        return await actionFunction(input);
    } catch (error) {
        console.log(error);
    }
}

module.exports = actionRunner;
