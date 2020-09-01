export async function actionRunner(actionFunction: any, input?: any, validateFunction?: Function) {
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

