const PRODUCTION : boolean = process.env.NODE_ENV === 'production'
const url: string = PRODUCTION ?
    'http://3.15.51.144/peoplepay'
    :
    'http://localhost:3500/peoplepay';


export const BASE_URL = url;