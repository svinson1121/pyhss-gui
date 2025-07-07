import http from "../http-common";

class EirApi {
  getAll() {
    return http.get("/eir/list");
  }

  getHistory() {
    return http.get("/eir/eir_histroy/list");
  }

  get(id: number) {
    return http.get(`/eir/${id}`);
  }

  create(data: object) {
    return http.put("/eir/", data);
  }

  update(id: number, data: object) {
    return http.patch(`/eir/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/eir/${id}`);
  }
}

export default new EirApi();
