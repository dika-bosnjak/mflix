import http from "../http-common";

class MovieDataService {
  getAll(page = 0) {return http.get(`movies?page=${page}`)}

  get(id) {return http.get(`movies/${id}`)}

  find(query, by = "name", page = 0) { return http.get(`movies?${by}=${query}&page=${page}`)} 

  createComment(data) { return http.post("movies/comment", data)}

  updateComment(data) { return http.put("movies/comment", data)}

  deleteComment(id, email) {console.log(email); return http.delete(`movies/comment?id=${id}`, {data:{email: email}})}

  getGenres() {return http.get(`movies/genres`)}

  getLanguages() {return http.get(`movies/languages`)}

}

export default new MovieDataService();