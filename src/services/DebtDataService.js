import http from "../http-common";

class DebtDataService {
  getAll() {
    return http.get(`/debts`);
  }
  create(data) {
    return http.post("/debts", data);
  }
  update(id, data) {
    return http.put(`/debts/${id}`, data);
  }
  delete(id) {
    return http.delete(`/debts/${id}`);
  }
  getCategories() {
    return http.get("/debts/categories");
  }
  // findByLastName(lastName) {
  // 	return http.get(`/users?LastName=${lastName}`);
  // }
}

export default new DebtDataService();
