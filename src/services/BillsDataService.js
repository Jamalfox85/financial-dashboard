import http from "../http-common";

class BillsDataService {
	getAll() {
		return http.get(`/bills`);
	}
	create(data) {
		return http.post("/bills", data);
	}
	update(id, data) {
		return http.put(`/bills/${id}`, data);
	}
	delete(id) {
		return http.delete(`/bills/${id}`);
	}
	// findByLastName(lastName) {
	// 	return http.get(`/users?LastName=${lastName}`);
	// }
}

export default new BillsDataService();
