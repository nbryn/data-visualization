import {ChartData, TodayData} from '../store/datamodels/General';
import {ChartjsData, ChartjsLastMonthData, ChartjsPieData} from '../store/datamodels/Chartjs';
import {convertNumberToMonth} from '../util/Date';
import {TeamData, TeamDataProp} from '../store/datamodels/Team';
import {TeamDTO, Name} from '../services/requests';
import {IntervalDTO, LastMonthDTO, LastYearDTO, ServerDTO} from './requests/DTO';

export const mapDataForToday = (data: LastMonthDTO[]): TodayData => {
   const temp: ChartData[] = mapLastMonthData(data);

   const todayCount: number = temp[temp.length - 1].value;
   const todayDate: string = temp[temp.length - 1].name;

   const result = {
      todayCount,
      todayDate,
   };

   return result;
};

export const mapGeneralChartData = (data: ServerDTO[]): ChartData[] => {
   const result = data.map((element: ServerDTO) => {
      return {
         name: element.name,
         value: element.count,
      };
   });

   return result;
};

export const mapLastMonthData = (data: LastMonthDTO[]): ChartData[] => {
   const lastMonthData = data.map((element: LastMonthDTO) => {
      return {
         name: element.day.day + '/' + element.day.month,
         value: element.count,
      };
   });

   return lastMonthData;
};

export const mapLastYearData = (data: LastYearDTO[], aggregate: boolean): ChartData[] => {
   let total = 0;
   let month, year: string;
   const lastYear = data.map((element: LastYearDTO) => {
      year = element.year.toString().substring(2);
      month = convertNumberToMonth(element.month);

      return {
         name: month + "'" + year,
         value: aggregate ? (total += element.count) : element.count,
      };
   });
   return lastYear;
};

export const getTotalNumberInPeriod = (data: IntervalDTO[]): number => {
   let result = 0;

   data.map((element: IntervalDTO) => (result += element.count));

   return result;
};

export const mapChartjsPieChartData = (data: ServerDTO[]): ChartjsPieData => {
   const pieChartData: any = {
      labels: [],
      data: [],
   };

   data.forEach((element: ServerDTO) => {
      pieChartData.labels.push(element.name);
      pieChartData.data.push(element.count);
   });

   return pieChartData;
};

export const mapChartjsLastMonthData = (data: LastMonthDTO[], aggregate: boolean): ChartjsLastMonthData => {
   const lastMonth: ChartjsLastMonthData = {
      labels: [],
      data: [],
      counter: 0,
      lastWeek: {
         labels: [],
         data: [],
         counter: 0,
      },
   };

   lastMonth.labels = data.map((element: LastMonthDTO) => element.day.day + "'" + element.day.month);
   lastMonth.data = data.map((element: LastMonthDTO) => {
      const counter = (lastMonth.counter += element.count);
      if (aggregate) return counter;
      else return element.count;
   });

   lastMonth.lastWeek.labels = lastMonth.labels.slice(lastMonth.labels.length - 7);

   const lastWeek: LastMonthDTO[] = data.slice(data.length - 7);

   lastMonth.lastWeek.data = lastWeek.map((element: LastMonthDTO) => {
      const counter = (lastMonth.lastWeek.counter += element.count);
      if (aggregate) return counter;
      else return element.count;
   });

   return lastMonth;
};

export const mapChartjsLastYearData = (data: LastYearDTO[], aggregate: boolean): ChartjsData => {
   const lastYear: ChartjsData = {
      labels: [],
      data: [],
      counter: 0,
   };

   lastYear.labels = data.map((element: LastYearDTO) => {
      return convertNumberToMonth(element.month) + "'" + element.year.toString().substring(2);
   });

   lastYear.data = data.map((element: LastYearDTO) => {
      const counter = (lastYear.counter += element.count);
      if (aggregate) return counter;
      else return element.count;
   });

   return lastYear;
};

export const mapTeamSearchData = (data: TeamDTO): TeamDataProp => {
   const TeamData = Object.keys(data).map((info: string) => {
      if (info === 'owner') {
         return data[info].firstName + ' ' + data.owner.lastName;
      } else if (info === 'admin') {
         return data[info].firstName + ' ' + data.admin.lastName;
      } else if (info === 'members') {
         return data[info].map((member: Name) => {
            return {
               name: member.firstName + ' ' + member.lastName,
            };
         });
      } else {
         return data[info];
      }
   });

   // @ts-ignore
   return TeamData;
};

export const mapOrgTeamData = (data: TeamDTO[]): TeamData[] => {
   let id = 0;
   const TeamsData = data.map((element: TeamDTO) => {
      return {
         id: id++,
         ...element,
         admin: element.admin.firstName + ' ' + element.admin.lastName,
         owner: element.owner.firstName + ' ' + element.owner.lastName,
         members: element.members.map((member: Name) => {
            return {
               name: member.firstName + ' ' + member.lastName,
            };
         }) as unknown,
      };
   });

   // @ts-ignore
   return TeamsData as TeamData[];
};
