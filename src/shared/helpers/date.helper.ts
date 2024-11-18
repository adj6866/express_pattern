import moment from 'moment';

export class DateHelper {
  /**
   * Returns the current date in the format 'YYYY-MM-DD HH:mm:ss' if the parameter
   * is null, otherwise it formats the given date in the same format.
   * @param date The date to format, or null to get the current date.
   * @returns The formatted date as a string.
   */
  static formatDefault(date: Date | null = null): string {
    if (date === null) {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }

    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }
}
