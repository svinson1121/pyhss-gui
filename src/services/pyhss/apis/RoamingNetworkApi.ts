import http from "../http-common";

class RoamingNetworkApi {
  getAll() {
    return http.get("/roaming/network/list");
  }

  get(id: number) {
    return http.get(`/roaming/network/${id}`);
  }

  create(data: object) {
    return http.put(`/roaming/network/`, data);
  }

  update(id: number, data: object) {
    return http.patch(`/roaming/network/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/roaming/network/${id}`);
  }
}

export default new RoamingNetworkApi();
