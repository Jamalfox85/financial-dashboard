import http from "../http-common";

class MainDataService {
	getAll() {
		return http.get("/users");
	}
	get(id) {
		return http.get(`/users/${id}`);
	}
	create(data) {
		return http.post("/users", data);
	}
	update(id, data) {
		return http.put(`/users/${id}`, data);
	}
	delete(id) {
		return http.delete(`/users/${id}`);
	}
	deleteAll() {
		return http.delete("/users");
	}
	findByLastName(lastName) {
		return http.get(`/users?LastName=${lastName}`);
	}
}

export default new MainDataService();
