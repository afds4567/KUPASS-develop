import axios from "axios";
import { storage } from "./utils";
axios.defaults.baseURL = "https://konkukstudy.site";
const client = axios.create({ baseUrl: "https://konkukstudy.site" });
const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${storage.getToken()}`;
  client.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
  console.log(storage.getToken());
  const onSuccess = (response) => response;
  const onError = (error) => {
    // optionaly catch errors and add some additional logging here
    console.log("api.js onError실행문", error);
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};

export async function register({ nickname, password, passwordCheck }) {
  const data = { nickname, password, passwordCheck };
  const response = await axios.post("/api/signup", data);
  return response;
}

const getUserKeywords = (nickname) =>
  request({
    url: `/api/user/${nickname}/keywords`,
    // url: `/locations?id=${nickname}`,
    data: { nickname },
  });
export async function signin({ nickname, password }) {
  const data = { nickname, password };
  try {
    console.log("SUCCESS SIGNIN");
    const response = await axios.post("api/authenticate", data);
    console.log(response);
    const { token } = response.data;
    storage.setToken(token);
    console.log(token);
    const result = await getUserKeywords(nickname);
    console.log(result);
    axios.defaults.headers.common.Authorization = `Bearer ${storage.getToken()}`;
    return result.data.keywords;
  } catch (e) {
    window.alert(e);
  }
}

const getNewsFeeds = (pageParams, filter) => {
  request({
      url: `/api/search/article?publisher=${filter}&page=${pageParams}`,
      data: { filter },
    });
}

export async function feedsApi({ pageParams, filter }){
  const res = await getNewsFeeds(pageParams, filter);
  const { content } = res.data;
  const { last } = res.data;
  return { posts:content, nextPage: pageParams + 1, isLast:last}
  }
