import Utils from "../utils/AuthToken";
import { BASE_URL } from "../utils/url";

const getAdverts = () =>
  fetch(`${BASE_URL}/adverts/get/all`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const addAdverts = (data: any) =>
  fetch(`${BASE_URL}/adverts/new`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const updateAdverts = (data: any) =>
  fetch(`${BASE_URL}/adverts/update`, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const deleteAdverts = (id: string) =>
  fetch(`${BASE_URL}/adverts/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const advertService = {
  getAdverts,
  addAdverts,
  updateAdverts,
  deleteAdverts,
};

export default advertService;
