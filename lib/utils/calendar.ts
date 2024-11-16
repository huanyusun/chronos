import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import lunar from "dayjs-plugin-lunar";
import "dayjs/locale/zh-cn";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(lunar);
dayjs.locale("zh-cn");

export const getMonthDays = (date: Date) => {
  const start = dayjs(date).startOf("month").startOf("week");
  const end = dayjs(date).endOf("month").endOf("week");
  const days = [];

  let current = start;
  while (current.isBefore(end) || current.isSame(end, "day")) {
    days.push(current);
    current = current.add(1, "day");
  }

  return days;
};

export const getLunarDate = (date: Date) => {
  const d = dayjs(date);
  return {
    year: d.year(),
    month: d.month() + 1,
    day: d.date(),
    // @ts-ignore - lunar plugin types are not available
    lunar: d.lunar().format("MMDD"),
  };
};