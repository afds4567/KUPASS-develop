export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem("token")),
  setToken: (token) =>
    window.localStorage.setItem("token", JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem("token"),
  setName: (name) =>
    window.localStorage.setItem("name", JSON.stringify(name)),
  getName: () => JSON.parse(window.localStorage.getItem("name")),
  getKeyowrds: () => JSON.parse(window.localStorage.getItem("keywords")),
  setKeywords:(keyword)=>window.localStorage.setItem("keyword",JSON.stringify(keyword))
  
};
