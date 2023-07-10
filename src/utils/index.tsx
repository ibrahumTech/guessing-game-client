import moment from 'moment';
import {IMetricChartDataPoint} from "@/components/chart/types";



export function isEmptyValue(value: any | IMetricChartDataPoint) {
  return (
    typeof value === 'undefined' ||
    typeof value === undefined ||
    value === null ||
    value === '' ||
    value.length === 0 ||
    value === 'undefined' ||
    value === undefined ||
    (typeof value === 'number' && isNaN(value))
  );
}

/*check only Object*/
export function isEmptyObject(obj: any) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}



export const getTime = (time: number | string, format?: string) => {
  if (typeof time === 'string') {
    return moment(time)
      .local()
      .format(format ? format : 'llll');
  } else {
    const date = new Date();
    date.setTime(time * 1000);
    return moment(date)
      .local()
      .format(format ? format : 'llll');
  }
};
