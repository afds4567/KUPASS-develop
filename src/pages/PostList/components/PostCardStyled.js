import styled, { css } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  width: 18rem;
  height: 20rem;
  margin: 1rem;
  background-color: white;
  transition: transform 300ms ease-in-out;
  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 1px 1px 10px -5px black;
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 8rem;
`;

export const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  margin: auto;
`;

export const CardBody = styled.div`
  height: 10rem;
  ${(props) =>
    props.thumbnail ||
    css`
      margin-bottom: 9rem;
    `}
`;
export const News = styled.span`
  display: inline-block;
  border-radius: 3px;
  padding: .2em .5em .3em;
  border-radius: 2px;
  background: #a4c34a;
  color: white;
  font-weight: 600;
  margin: .25em .1em
`;
export const Cat = styled.span`
  display: inline-block;
  border-radius: 3px;
  padding: .2em .5em .3em;
  border-radius: 2px;
  background: ${props => 
  props.cat == "정치" ? "orange"
    : props.cat == "경제" ? "blue"
      : props.cat == '사회' ? "red"
        :props.cat == "생활문화" ? "teal"
        :props.cat == "IT과학" ? "brown" : "purple"
  };
  color: white;
  font-weight: 600;
  margin: .25em .1em
`;
export const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin: 1rem;
  letter-spacing: -0.5px;
`;

export const CreatedAt = styled.div`
  font-size: 0.5rem;
  margin: 0.5rem 1rem;
  color: #adadad;
  right:0;
`;

export const Publisher = styled.div`
  font-size: 0.5rem;
  margin: 0.5rem 1rem;
  color: #adadad;
  letter-spacing: -0.5px;
`;

export const Content = styled.div`
  font-size: 0.75rem;
  margin: 0 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
  text-overflow: ellipsis;

  ${(props) =>
    props.thumbnail
      ? css`
          -webkit-line-clamp: 3;
          height: 3rem;
        `
      : css`
          -webkit-line-clamp: 6;
          max-height: 10rem;
        `}
`;

export const TagContent = styled.div`
  display: flex;
  margin-left: 0.5rem;
  margin-top: 1rem;
  flex-flow: wrap;
  flex-wrap: warp;
`;

export const TagContainer = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Tag = styled.div`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  margin-top:0.5rem;
  border-radius: 1rem;
  color: white;
  background-color: grey;
  padding: 0.3rem 0.5rem;
`;
