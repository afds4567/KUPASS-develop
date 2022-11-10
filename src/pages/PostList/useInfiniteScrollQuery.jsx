import { useInfiniteQuery } from "react-query"
import axios from "axios";
import { storage } from "../../utils";

export const useInfiniteScrollQuery = (props) => {
  const getPageBoard = async ({ pageParam = 0 }) => {
    axios.defaults.headers.common.Authorization = `Bearer ${storage.getToken()}`;
    let params = { page: pageParam, category: props.category, publisher: props.filter }
    if (props.keyword) params = { page: pageParam, category: props.category, publisher: props.filter, keyword:props.keyword}
    const res = await axios.get("/api/search/article", {
      params
    })
    return {
      // 실제 데이터
      board_page: res.data.articles,
      // 반환 값에 현재 페이지를 넘겨주자
      current_page: pageParam,
      // 페이지가 마지막인지 알려주는 서버에서 넘겨준 true/false 값
      isLast: res.data.last,
    };
  }
  const {
    data: getBoard,
    fetchNextPage: getNextPage,
    isSuccess: getBoardIsSuccess,
    hasNextPage: getNextPageIsPossible,
  } = useInfiniteQuery([props.category,props.filter,props.keyword], getPageBoard, {
    getNextPageParam: (lastPage, pages) => {
      // lastPage와 pages는 콜백함수에서 리턴한 값을 의미한다!!
      // lastPage: 직전에 반환된 리턴값, pages: 여태 받아온 전체 페이지
      if (!lastPage.isLast) return lastPage.current_page + 1;
      // 마지막 페이지면 undefined가 리턴되어서 hasNextPage는 false가 됨!
      return undefined;
    },
  });

  return { getBoard, getNextPage, getBoardIsSuccess, getNextPageIsPossible };
}
