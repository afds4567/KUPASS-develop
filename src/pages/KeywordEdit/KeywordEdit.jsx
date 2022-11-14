import axios from 'axios';
import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { deletUserKeywords, setUserKeywords } from '../../api';
import { queryclient } from '../../lib/react-query';
import { storage } from '../../utils';
import { CloseIcon, Keyword, KeywordList, KeywordTitle, Post, PostTop, Wrapper } from './components/TagsInputStyled';

export default function KeywordEdit() {
  const tmp = storage.getKeyowrds()
  console.log(tmp)
  const { data: keywords, } = useQuery(["keywords"],() => axios.get(`https://konkukstudy.site/api/user/${storage.getName()}/keywords`), {
    initialData: '',
    //staleTime: Infinity,
    refetchOnMount:'always',
    refetchOnWindowFocus: 'always',
  });
  
  
  const {
    data: { title},
  } = useQuery(["title"], {
    initialData: "",
    staleTime: Infinity,
  });
  const removeTags = (keyword) => {
    deletUserKeywords(storage.getName(),keyword)
  };
  const addKeywords = async (event) => {
    if (event.target.value !== "") {
      const a = await setUserKeywords(storage.getName(), event.target.value)
      //queryClient.invalidateQueries('keywords')
      //props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
      console.log(a)
    }
  }

  const { mutate } = useMutation(addKeywords, {
    onSuccess: (data,variables,context) => {
      queryclient.invalidateQueries(['keywords'])
      console.log(data,variables,context)
   },
  });
  const { mutate:removefn } = useMutation(removeTags, {
    onSuccess: (data,variables,context) => {
      queryclient.invalidateQueries(['keywords'])
      console.log(data,variables,context)
   },
  });
  console.log(keywords)
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
            {title}
          </p>
          </div>
          </PostTop>
          <Wrapper>
        {keywords&& <KeywordList>
          {!keywords?.data?.keywords ? keywords?.map((keyword, index) => (
            <Keyword key={index}>
              <KeywordTitle>{keyword}</KeywordTitle>
              <CloseIcon
                onClick={() => removefn(keyword)}
              >
                x
              </CloseIcon>
            </Keyword>
          )) : keywords?.data?.keywords.map((keyword, index) => (
            <Keyword key={index}>
              <KeywordTitle>{keyword}</KeywordTitle>
              <CloseIcon
                onClick={() => { removefn(keyword) }}
              >
                x
              </CloseIcon>
            </Keyword>
          ))}
        </KeywordList>}
        <input
          type="text"
          onKeyUp={event => event.key === "Enter" ? mutate(event) : null}
          placeholder="새로운 관심 키워드를 등록하려면 Enter를 누르세요"
        />
      </Wrapper>
          
        
      
      </Post>
    );
}


