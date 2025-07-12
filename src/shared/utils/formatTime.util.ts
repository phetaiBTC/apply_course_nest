import * as dayjs from 'dayjs';

export const formatTimeUtil = (valuse: Date) => {
    // return dayjs(valuse).format('DD-MM-YYYY HH:mm');
    return dayjs(valuse).format('DD-MM-YYYY');
}