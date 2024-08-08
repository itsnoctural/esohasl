/**
 
@from https://github.com/date-fns/date-fns/tree/main
 
Copyright (c) 2021 Sasha Koss and Lesha Koss https://kossnocorp.mit-license.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const daysInYear = 365.2425;

const secondsInMinute = 60;
const secondsInHour = secondsInMinute * 60;
const secondsInDay = secondsInHour * 24;
const secondsInWeek = secondsInDay * 7;
const secondsInMonth = secondsInWeek * 4;
const secondsInYear = secondsInDay * daysInYear;

function startOfDay(date: Date) {
  const _date = date;
  _date.setHours(0, 0, 0, 0);
  return _date;
}

function startOfWeek(date: Date) {
  const weekStartsOn = 0;

  const _date = date;
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

function getTimezoneOffsetInMilliseconds(date: Date): number {
  const utcDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(date.getFullYear());
  return +date - +utcDate;
}

function differenceInDays(dateLeft: Date, dateRight: Date) {
  const startOfDayLeft = startOfDay(dateLeft);
  const startOfDayRight = startOfDay(dateRight);

  const timestampLeft =
    +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  const timestampRight =
    +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);

  return Math.round((timestampLeft - timestampRight) / (secondsInDay * 1000));
}

function differenceInWeeks(dateLeft: Date, dateRight: Date) {
  const startOfWeekLeft = startOfWeek(dateLeft);
  const startOfWeekRight = startOfWeek(dateRight);

  const timestampLeft =
    +startOfWeekLeft - getTimezoneOffsetInMilliseconds(startOfWeekLeft);
  const timestampRight =
    +startOfWeekRight - getTimezoneOffsetInMilliseconds(startOfWeekRight);

  return Math.round((timestampLeft - timestampRight) / (secondsInWeek * 1000));
}

function differenceInMonths(dateLeft: Date, dateRight: Date) {
  const yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  const monthDiff = dateLeft.getMonth() - dateRight.getMonth();

  return yearDiff * 12 + monthDiff;
}

function differenceInYears(dateLeft: Date, dateRight: Date) {
  return dateLeft.getFullYear() - dateRight.getFullYear();
}

export function intlFormatFromNow(date: Date) {
  const _date = new Date(date);
  const dateNow = new Date();

  let value = 0;
  let unit: Intl.RelativeTimeFormatUnit = "second";

  const diffInSeconds = (+_date - +dateNow) / 1000;
  const absoluteDiffInSeconds = Math.abs(diffInSeconds);

  if (absoluteDiffInSeconds < secondsInMinute) {
    value = Math.trunc(diffInSeconds);
    unit = "second";
  } else if (absoluteDiffInSeconds < secondsInHour) {
    value = Math.trunc(diffInSeconds / secondsInMinute);
    unit = "minute";
  } else if (
    absoluteDiffInSeconds < secondsInDay &&
    Math.abs(differenceInDays(date, dateNow)) < 1
  ) {
    value = Math.trunc(diffInSeconds / secondsInHour);
    unit = "hour";
  } else if (absoluteDiffInSeconds < secondsInWeek) {
    const diff = differenceInDays(_date, dateNow);
    if (Math.abs(diff) < 7) {
      value = diff;
      unit = "day";
    }
  } else if (absoluteDiffInSeconds < secondsInMonth) {
    value = differenceInWeeks(_date, dateNow);
    unit = "week";
  } else if (absoluteDiffInSeconds < secondsInYear) {
    value = differenceInMonths(_date, dateNow);
    unit = "month";
  } else {
    value = differenceInYears(_date, dateNow);
    unit = "year";
  }

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  return rtf.format(value, unit);
}
