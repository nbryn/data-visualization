import * as FinanceMapper from '../../../data/mappers/FinanceMapper';

export async function calculateBoxBalanceStats() {
   const boxBalanceStats = await FinanceMapper.fetchBoxBalanceData();

   let totalBalance = 0;
   let highest = 0;

   boxBalanceStats.forEach((element) => {
      if (element.count > 0) {
         if (element.count > highest) {
            highest = element.count;
         }
         totalBalance += element.count;
      }
   });

   return {
      totalBoxBalance: totalBalance,
      groupWithMost: highest,
   };
}
