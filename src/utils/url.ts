const production : boolean = process.env.NODE_ENV === 'production'
const url: string = production ?
    'https://peoplepay.com.gh/peoplepay'
    :
    'http://3.15.51.144/peoplepay'
    //'http://3.135.217.52/peoplepay';

//peoplepay

export const BASE_URL = url;