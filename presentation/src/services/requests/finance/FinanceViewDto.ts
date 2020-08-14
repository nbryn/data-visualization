import {LastMonthDto, LastYearDto, ServerDto} from '../Dto';

export type FinanceViewDto = {
    numberOfCurrencies?: number;
    currencyStats: ServerDto[];
    loanTotal: number;
    loansLastMonth: LastMonthDto[];
    loansLastYear: LastYearDto[];
    shareTotal: number;
    mostShares: string;
    mostSharesData: ServerDto[];
    shareStats: ServerDto[];
    etbOnLoan: number;
    groupEtbLoan: ServerDto[];
};
