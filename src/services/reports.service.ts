import Utils from "../utils/AuthToken";
import { BASE_URL } from "../utils/url";

const summaryReport = (startDate: string, endDate: string) =>
  fetch(
    `${BASE_URL}/transactions/report/get?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: Utils.AuthToken(),
      },
    }
  ).then((res) => res.json());

const getTransactions = () =>
  fetch(`${BASE_URL}/transactions/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
    },
  }).then((res) => res.json());

const getWallets = () =>
  fetch(`${BASE_URL}/accounts/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const getReferals = () =>
  fetch(`${BASE_URL}/referals/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
    },
  }).then((res) => res.json());

const getAgents = () =>
  fetch(`${BASE_URL}/referals/agents/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
    },
  }).then((res) => res.json());

const dateFilter = (startDate: string, endDate: string) =>
  fetch(
    `${BASE_URL}/transactions/date/filter?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: Utils.AuthToken(),
      },
    }
  ).then((res) => res.json());

const dateFilterCusMerc = (startDate: string, endDate: string, type: string) =>
  fetch(
    `${BASE_URL}/transactions/type/filter?startDate=${startDate}&endDate=${endDate}&type=${type}`,
    {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: Utils.AuthToken(),
      },
    }
  ).then((res) => res.json());

const getWalletTransactions = (id: string) =>
  fetch(`${BASE_URL}/transactions/get/customer/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const WalletTransactionsFilter = (
  startDate: string,
  endDate: string,
  id: string
) =>
  fetch(
    `${BASE_URL}/transactions/byadmin/users?id=${id}&start=${startDate}&end=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: Utils.AuthToken(),
      },
    }
  ).then((res) => res.json());

const ReportService = {
  summaryReport,
  getTransactions,
  getWallets,
  getReferals,
  getAgents,
  dateFilter,
  dateFilterCusMerc,
  getWalletTransactions,
  WalletTransactionsFilter,
};
export default ReportService;
