enum Month {
    JANUARY = "January",
    FEBRUARY = "February",
    MARCH = "March",
    APRIL = "April",
    MAY = "May",
    JUNE = "June",
    JULY = "July",
    AUGUST = "August",
    SEPTEMBER = "September",
    OCTOBER = "October",
    NOVEMBER = "November",
    DECEMBER = "December"
}

const MONTHS = new Map([
    ["1", Month.JANUARY],
    ["2", Month.FEBRUARY],
    ["3", Month.MARCH],
    ["4", Month.APRIL],
    ["5", Month.MAY],
    ["6", Month.JUNE],
    ["7", Month.JULY],
    ["8", Month.AUGUST],
    ["9", Month.SEPTEMBER],
    ["10", Month.OCTOBER],
    ["11", Month.NOVEMBER],
    ["12", Month.DECEMBER]
]);

export class DateService {

    public static formatDate(date: string): string {
        return date.includes("T")
            ? this.formatLocalDateTime(date)
            : this.formatLocalDate(date);
    }

    private static formatLocalDate(localDate: string): string {
        const date = localDate.split('-');

        const year = date[0];
        const month = date[1];
        const day = date[2];

        // example: 6 September 2019
        return day + " " + MONTHS.get(month) + " " + year;
    }

    private static formatLocalDateTime(localDateTime: string): string {
        const date = localDateTime.split('T');
        const localDate = date[0];
        const time = date[1].split(':');

        const hours = time[0];
        const minutes = time[1];

        // example: 6 September 2019, 17:35
        return this.formatLocalDate(localDate) + ", " + hours + ":" + minutes;
    }
}