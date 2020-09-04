import * as FinanceMapper from '../../../data/mappers/FinanceMapper';
import {fetchLoanData} from '../../../data/mappers/GroupMapper';

async function getCurrencyStats() {
   const result = await FinanceMapper.fetchFinanceData('totalBalance', '$currency');

   const currencyStats = result
      .map((element) => {
         return {
            name: element._id,
            count: element.totalAmount,
         };
      })
      .sort((a, b) => a.count - b.count);

   return currencyStats;
}

async function calculateBoxBalanceStats() {
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

async function calculateShareStats() {
   const result = await FinanceMapper.fetchFinanceData('totalShares', '$_id');

   let shareTotal = 0;
   let groupWithMostShares = {
      groupName: '',
      count: '',
   };

   const sharesPerGroup = result.map((element) => {
      shareTotal += element.totalAmount;
      if (element.totalAmount > groupWithMostShares.count) {
         groupWithMostShares = {
            name: element._id,
            count: element.totalAmount,
         };
      }
      return {
         name: element._id.toString().substring(0, 5),
         count: element.totalAmount,
      };
   });

   sharesPerGroup.sort((ele1, ele2) => ele1.count - ele2.count);

   const shareStats = {
      shareTotal: shareTotal,
      mostShares: groupWithMostShares,
      shareStats: sharesPerGroup.slice(0, 10),
   };

   return shareStats;
}

async function calculateEtbLoanStats() {
   const result = await fetchLoanData();
   let totalETB = 0;

   const etbGroups = result
      .filter(
         (element) => element.currency === 'ETB' && element.members.length > 6 && element.shares[0].totalShares > 0
      )
      .map((element) => {
         totalETB += element.shares[0].totalShares;
         return {
            name: element._id.toString().substring(0, 5),
            count: element.shares[0].totalShares * element.amountPerShare,
         };
      });

   etbGroups.sort((ele1, ele2) => ele1.count - ele2.count);

   const etbStats = {
      etbOnLoan: totalETB,
      groupEtbLoan: etbGroups,
   };

   return etbStats;
}

module.exports = {
   getCurrencyStats,
   calculateShareStats,
   calculateEtbLoanStats,
   calculateBoxBalanceStats,
};
