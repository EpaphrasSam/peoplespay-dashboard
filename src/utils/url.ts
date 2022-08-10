const production : boolean = process.env.NODE_ENV === 'production'
const url: string = production ?
    'https://peoplepay.com.gh/peoplepay'
    :
    'http://3.15.51.144/peoplepay'
    //'http://18.191.65.42:9000/peoplepay'

export const BASE_URL = url;