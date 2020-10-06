import {ChartData, TodayData} from '../store/datamodels/General';
import {ChartjsData, ChartjsLastMonthData, ChartjsPieData} from '../store/datamodels/Chartjs';
import {convertNumberToMonth} from '../util/Date';
import {TeamData, TeamDataProp} from '../store/datamodels/Team';
import {TeamDTO, Name} from './requests';
import {IntervalDTO, LastMonthDTO, LastYearDTO, ServerDTO} from './requests/DTOs';

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
         name: month + '\'' + year,
         value: aggregate ? (total += element.count) : element.count,
      };
   });
   return lastYear;
};

export const getTotalNumberInPeriod = (data: IntervalDTO[]): number => {
   let result = 0;

   data.forEach((element: IntervalDTO) => (result += element.count));

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

export const mapChartjsLastMonthData = (DTO: LastMonthDTO[]): ChartjsLastMonthData => {
   const chartData: ChartjsLastMonthData = {
      aggregateData: [],
      aggregateDataWeek: [],
      lastMonth: {
         labels: [],
         data: [],
         counter: 0,
      },
      lastWeek: {
         labels: [],
         data: [],
         counter: 0,
      },
   };

   chartData.lastMonth.labels = DTO.map(
      (element: LastMonthDTO) => element.day.day + '\'' + element.day.month
   );
   chartData.lastMonth.data = DTO.map((element: LastMonthDTO) => {
      const counter = (chartData.lastMonth.counter += element.count);
      chartData.aggregateData.push(counter);

      return element.count;
   });

   const {
      lastMonth: {labels},
   } = chartData;

   chartData.lastWeek.labels = labels.slice(labels.length - 7);

   chartData.lastWeek.data = DTO.slice(DTO.length - 7).map((element: LastMonthDTO) => {
      const counter = (chartData.lastWeek.counter += element.count);
      chartData.aggregateDataWeek?.push(counter);

      return element.count;
   });

   return chartData;
};

export const mapChartjsLastYearData = (data: LastYearDTO[]): ChartjsData => {
   const lastYear: ChartjsData = {
      labels: [],
      data: [],
      counter: 0,
      aggregateData: [],
   };

   lastYear.labels = data.map((element: LastYearDTO) => {
      return convertNumberToMonth(element.month) + '\'' + element.year.toString().substring(2);
   });

   lastYear.data = data.map((element: LastYearDTO) => {
      const counter = (lastYear.counter += element.count);
      lastYear.aggregateData?.push(counter);

      return element.count;
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
         members: element.members.map((member: Name) => ({
            name: member.firstName + ' ' + member.lastName,
         })) as unknown,
      };
   });

   // @ts-ignore
   return TeamsData as TeamData[];
};
