const production: boolean = process.env.NODE_ENV === "production";
const url: string = production
  ? "https://peoplepay.com.gh/peoplepay"
  : // "https://peoplepay.com.gh/peoplepay";
    "http://test.peoplepay.com.gh:9000/peoplepay";
export const BASE_URL = url;
