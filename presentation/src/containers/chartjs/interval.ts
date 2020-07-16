type Interval = {
  name: string;
  period: number;
};

const WEEK: Interval = { name: "week", period: 7 };
const MONTH: Interval = { name: "month", period: 30 };
const YEAR: Interval = { name: "year", period: 365 };
const ALL: Interval = { name: "all", period: 1200 };

export function resolveInterval(interval: string): string {
  const date: Date = new Date();
  switch (interval) {
    case WEEK.name:
      date.setDate(date.getDate() - WEEK.period);
      break;
    case MONTH.name:
      date.setDate(date.getDate() - MONTH.period);
      break;
    case YEAR.name:
      date.setDate(date.getDate() - YEAR.period);
      break;
    case ALL.name:
      date.setDate(date.getDate() - ALL.period);
      break;
    default:
      date.setDate(date.getDate() - 1200);
  }
  return date.toISOString().substring(0, 10);
}
