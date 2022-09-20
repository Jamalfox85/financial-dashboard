import http from "../http-common";

class SavingsDataService {
	getAll() {
		return http.get(`/savings`);
	}
	create(data) {
		return http.post("/savings", data);
	}
	update(id, data) {
		return http.put(`/savings/${id}`, data);
	}
	delete(id) {
		return http.delete(`/savings/${id}`);
	}
	// findByLastName(lastName) {
	// 	return http.get(`/users?LastName=${lastName}`);
	// }
}

export default new SavingsDataService();
