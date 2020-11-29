import moment from 'moment';

export default {
    toDate(dateStr: string) {
        return moment(dateStr).format('YYYY-MM-DD');
    },
    compareTo(dateIn: Date, dateOut: Date) {
        return moment(dateIn).isSameOrAfter(dateOut);
    },
    addTenDays(date: Date) {
        return moment(date).add(10, 'days');
    }
}
