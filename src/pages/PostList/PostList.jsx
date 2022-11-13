import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import PostCard from "./components/PostCard";
import axios from "axios";
import { useInfiniteQuery, useQueries, useQuery, useQueryClient } from "react-query";
import { Navigate, useLocation, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { storage } from "../../utils";
import NEWS_LIST from "../../NEWS_LIST.json"
import { List, Icon, Label, Modal, Tab } from "semantic-ui-react";
import { Cat, Content, News, Title } from "./components/PostCardStyled";
import { useInView } from 'react-intersection-observer';
import { queryclient } from "../../lib/react-query";
import { useInfiniteScrollQuery } from "./useInfiniteScrollQuery";
const Post = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: auto;
  margin-bottom: 1rem;
  @media only screen and (max-width: 768px) {
    margin-top: 2rem;
    margin-left: 0;
    width: 100%;
  }
`;

const PostTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  margin-bottom: 2rem;
  width: 100%;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #c5cbd4;
    transform: translateY(1rem);
  }
  @media only screen and (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;
const Select = styled.select`
  height: auto;
  font-size: 1rem;
  padding: 0rem 0.6rem;
`;
const PostCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  ${(props) =>
    props.listEmpty
      ? css`
          height: 80vh;
        `
      : css`
          height: 80vh;
        `}
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;
const PostNone = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 2rem;
  letter-spacing: -0.6px;
  margin-top: 10rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
  }
`;

export default function PostList() {
  const location = useLocation();
  const [serachParams, _] = useSearchParams();
  const keyword = serachParams.get("keyword");
  const PUBLISHER = NEWS_LIST.data;
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('')
  const [article, setArticle] = useState("");
  const panes = [
    {
      menuItem: '전체',
      render: () => { setCategory(""); }
    },
    {
      menuItem: '정치',
      render: () => { setCategory("정치") }
    },
    {
      menuItem: '경제',
      render: () => { setCategory("경제"); }
    },
    {
      menuItem: '사회',
      render: () => { setCategory("사회"); }
    },
    {
      menuItem: '생활문화',
      render: () => { setCategory("생활문화"); }
    },
    {
      menuItem: '세계',
      render: () => { setCategory("세계"); }
    },
    {
      menuItem: 'IT과학',
      render: () => { setCategory("IT과학"); }
    },
    {
      menuItem: '오피니언',
      render: () => { setCategory("오피니언"); }
    },
  ]
  const onCardClicked = (newsId) => {
    const a = getBoard?.pages?.map((pag, i) => {
      if (pag.board_page.find((feed) => feed.articleId === Number(newsId))) {
        setArticle(pag.board_page.find((feed) => feed.articleId === Number(newsId)))
      }
    });
  }

  const { data: keywords } = useQuery("keywords", {
    initialData: "",
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  
  
  const {
    data: { title, item, isTag },
  } = useQuery("title", {
    initialData: "",
    staleTime: Infinity,
  });

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const { getBoard, getNextPage, getBoardIsSuccess, getNextPageIsPossible,isLoading } = useInfiniteScrollQuery({ category, filter,keyword });
  const [ref, isView] = useInView();
   useEffect(() => {
    // 맨 마지막 요소를 보고있고 더이상 페이지가 존재하면
    // 다음 페이지 데이터를 가져옴
    if (isView && getNextPageIsPossible) {
      getNextPage();
    }
   }, [isView, getBoard, category, filter]);

  return (
    <Post>
      <PostTop>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <p style={{ fontSize: "2rem", color: "grey",marginLeft:"0.5rem"}}>
            {/* {title ? (searchMatch ? keyword : title) : title} */}
            {keyword?keyword : title}
          </p>
          <Select onChange={handleFilter} value={filter}>
            <option value="" selected disabled hidden>신문사를 설정하세요</option>
            <option className="option" value="">전체</option>
            {PUBLISHER.map((pub, idx) => (
              <option className="option" value={pub}>{pub}</option>
            ))}
            
          </Select>
        </div>
      </PostTop>
      <Tab onClick={() => {  window.scrollTo(0, 0); }} menu={{ secondary: true, pointing: true }} style={{marginLeft:"1rem"}} panes={panes} />
      <PostCards style={{ overflow: "auto" }} listEmpty={getBoard?.pages[0]?.board_page?.length === 0} >
        {
          getBoardIsSuccess && getBoard.pages && getBoard?.length !== 0
            ? getBoard.pages.map((page_data, page_num) => {
              const board_page = page_data.board_page;
              return board_page.map((feed, idx) => {
                if (
                  // 마지막 요소에 ref 달아주기
                  getBoard.pages.length - 1 === page_num &&
                  board_page.length - 1 === idx
                ) {
                  return (
                    <div ref={ref} key={feed.articleId}>
                      <Modal
                      
                      closeIcon
                      style={{ "margin-top": "10rem", "height": "55vh", "overflow": "auto" }}
                      centered={false}
                      open={open}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      trigger={
                        <PostCard
                          onClick={() => onCardClicked(feed.articleId)}
                          key={("postcard", idx)}
                          
                          post={feed}
                        />
                      }
                    >
                      <Modal.Content>
                        <News style={{ "margin-left": "1rem" }}>{article.publisher}</News>
                        <Cat cat={article?.category}>{article?.category}</Cat>
                        <Title style={{ "font-size": "2rem" }}>
                          {article?.title}
                        </Title>
                        <Content><a href={article?.source} target="_blank">원문 기사 보기</a></Content>
                        <Content style={{ "font-size": "1rem", "line-height": "1.5rem", "margin-bottom": "2rem", "margin-top": "2rem" }}>
                          {article?.summary}
                        </Content>
                        <div style={{ "margin-left": "1rem" }}>
                          {article?.keywords?.map((key, idx) => <Label>{key}</Label>)}
                        </div>
                      </Modal.Content>
                    </Modal></div>
)
                } else {
                  return (
                    <Modal
                      key={feed?.articleId}
                      closeIcon
                      style={{ "margin-top": "10rem", "height": "55vh", "overflow": "auto" }}
                      centered={false}
                      open={open}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      trigger={
                        <PostCard
                          onClick={() => onCardClicked(feed.articleId)}
                          key={("postcard", idx)}
                         
                          post={feed}
                        />
                      }
                    >
                      <Modal.Content>
                        <News style={{ "margin-left": "1rem" }}>{article?.publisher}</News>
                        <Cat cat={article?.category}>{article?.category}</Cat>
                        <Title style={{ "font-size": "2rem" }}>
                          {article?.title}
                        </Title>
                        <Content><a href={article?.source} target="_blank">원문 기사 보기</a></Content>
                        <Content style={{ "font-size": "1rem", "line-height": "1.5rem", "margin-bottom": "2rem", "margin-top": "2rem" }}>
                          {article?.summary}
                        </Content>
                        <div style={{ "margin-left": "1rem" }}>
                          {article?.keywords?.map((key, idx) => <Label>{key}</Label>)}
                        </div>
                      </Modal.Content>
                    </Modal>
                  )
                }
              }
              )
            })
         :  isLoading? <PostNone>Loading...</PostNone> :(
          <PostNone>Contents 없음</PostNone>
            )}
        {(getBoard?.pages[0]?.board_page?.length===0) && <PostNone>Contents 없음</PostNone>}
      </PostCards>
    </Post>
  );
}
