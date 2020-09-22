export async function actionRunner<T>(
   actionFunction: Function,
   input?: any,
   validateFunction?: Function
): Promise<T> {
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
