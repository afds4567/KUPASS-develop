import React, { useEffect, useRef } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import {
  Card,
  CardBody,
  Content,
  CreatedAt,
  Tag,
  TagContainer,
  TagContent,
  Thumbnail,
  ThumbnailContainer,
  Title,
  Publisher,
  News,
  Cat,
} from "./PostCardStyled";

export default function PostCard({ onClick,post, isLastItem, onFetchMoreFeeds }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;
  const bigNewsMatch = useMatch("/news/:newsId");
  const onCardClicked = (newsId) => {
      
    navigate(`/news/${newsId}`);
    console.log(bigNewsMatch)
    };
  const handleTagsStyle = () => {
    const tags = document.querySelectorAll(".tag_list");

    tags.forEach((tag) => {
      const tagChildren = tag.childNodes;
      let tagWidth = 0;
      tagChildren.forEach((child) => {
        if (tagWidth + child.offsetWidth > 250) {
          child.style.display = "auto";
        }
        tagWidth += child.offsetWidth + 8;
      });
    });
  };

  useEffect(() => {
    handleTagsStyle();
  });
  useEffect(() => {
    isLastItem && isIntersecting && onFetchMoreFeeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastItem, isIntersecting]);
  return (
    <Card
      ref={ref}
      onClick={onClick}
    >
      {post.image_url && (
        <ThumbnailContainer>
          <Thumbnail src={post.image_url} />
        </ThumbnailContainer>
      )}
      <CardBody thumbnail={post.image_url}>
        <News>{post.publisher}</News>
        <Cat cat={post.category}>{post.category}</Cat>
        <Title>{post.title}</Title>
        <CreatedAt>{post.createDate}</CreatedAt>
        <Content thumbnail={post.image_url}>
          <p>{post.summary}</p>
        </Content>
        <TagContainer>
          <TagContent style={{"position":"absolute", "top":"14rem"}} className="tag_list">
            {post.keywords.map((key) => (
              <Tag key={key}>{key}</Tag>
            ))}
          </TagContent>
        </TagContainer>
      </CardBody>
    </Card>
  );
}
