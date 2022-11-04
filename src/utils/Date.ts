import moment from "moment";
const {FormatMoney} = require('format-money-js')

const fm=new FormatMoney({
    decimals:2
});

export const formatDate=(date:any)=>moment(date&&date).format('DD/MMM/YYYY')
export const formatTime=(time:any)=>moment(time).format('HH:mm A')
export const formatCurrency= (value:any)=>fm.from(value,{symbol:'GH¢ '})
export const csvCurrency= (value:any)=>fm.from(value);
export const formatNumber=(value:any)=>value.toLocaleString('en-US')
