import http from "../http-common";

class IncomesDataService {
  getAll() {
    return http.get(`/incomes`);
  }
  create(data) {
    return http.post("/incomes", data);
  }
  update(id, data) {
    return http.put(`/incomes/${id}`, data);
  }
  delete(id) {
    return http.delete(`/incomes/${id}`);
  }
  // findByLastName(lastName) {
  // 	return http.get(`/users?LastName=${lastName}`);
  // }
}

export default new IncomesDataService();
