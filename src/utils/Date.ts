import moment from "moment";

export const formatDate=(date:any)=>moment(date&&date).format('DD/MMM/YYYY')
export const formatTime=(time:any)=>moment(time).format('HH:mm A')
export const formatCurrency=(value:any)=>value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")