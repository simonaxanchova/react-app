import axios from "axios";

export const UsersRepository = {
  getAll: (page, limit) => {
    return axios({
      url: `https://dummyapi.io/data/v1/user`,
      method: "GET",
      headers: {
        "app-id": "6178096b6a06564376d08579",
      },
      params: {
        page: page,
        limit: limit,
      },
    });
  },

  get: (id) => {
    return axios({
      url: `https://dummyapi.io/data/v1/user/${id}`,
      method: "GET",
      headers: {
        "app-id": "6178096b6a06564376d08579",
      },
    });
  },

  create: (user) => {
    return axios({
      url: `https://dummyapi.io/data/v1/user/create`,
      method: "POST",
      headers: {
        "app-id": "6178096b6a06564376d08579",
      },
      data: user,
    });
  },

  deleteUser: (id) => {
    return axios({
      url: `https://dummyapi.io/data/v1/user/${id}`,
      method: "DELETE",
      headers: {
        "app-id": "6178096b6a06564376d08579",
      },
    });
  },

  updateUser: (user) => {
    return axios({
      url: `https://dummyapi.io/data/v1/user/${user.id}`,
      method: "PUT",
      headers: {
        "app-id": "6178096b6a06564376d08579",
      },
      data: user,
    });
  },
};
