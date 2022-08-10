class ApiAuth {
  constructor(options) {
    this._url = options.url;
  }

  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  _ringingServer(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          new Error(
            `Ошибка 
            ${res.status} 
          : ${res.statusText}`
          )
        );
  }

  register({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then((res) => this._ringingServer(res))
  }

  autorise({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then((res) => this._ringingServer(res))
  }

  getEmail(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => this._ringingServer(res))
  }
}

const apiAuth = new ApiAuth({
  url: "https://auth.nomoreparties.co",
});

export default apiAuth;
