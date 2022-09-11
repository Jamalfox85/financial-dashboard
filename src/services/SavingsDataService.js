import http from "../http-common";

class SavingsDataService {
	getAll() {
		return http.get(`/savings`);
	}
	// get(id) {
	// 	return http.get(`/users/${id}`);
	// }
	create(data) {
		return http.post("/savings", data);
	}
	// update(id, data) {
	// 	return http.put(`/users/${id}`, data);
	// }
	// delete(id) {
	// 	return http.delete(`/users/${id}`);
	// }
	// deleteAll() {
	// 	return http.delete("/users");
	// }
	// findByLastName(lastName) {
	// 	return http.get(`/users?LastName=${lastName}`);
	// }
}

export default new SavingsDataService();
