import moment from "moment";

export const formatDate=(date:any)=>moment(date).format('DD/MM/YYYY')
export const formatTime=(time:any)=>moment(time).format('HH:mm A')