import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "react-minimal-side-navigation";
import { Icon } from "semantic-ui-react";

//import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "../../styles/sidebar.css";
import { storage } from "../../utils";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { queryclient } from "../../lib/react-query";
const Bar = styled.div`
  position: sticky;
  top: 10rem;
  margin-top: 10rem;
  width: 10.5rem;
  height: 100%;
`;

export default function DesktopSideBar() {
  const navigate = useNavigate();
  const setArr = [];
  const { data: keywords } = useQuery("keywords", {
    initialData: " ",
    staleTime: Infinity,
  });

  useEffect(() => {
    const { token } = storage.getToken() || null;
    if (keywords) {
      console.log(keywords);
      keywords.forEach((keyword) => {
        const curObj = {};
        console.log(keyword);
        curObj.title = keyword;
        curObj.itemId = `/tags/${keyword}`;
        setArr.push(curObj);
      });
    }
  }, []);

  return (
    <>
      <Bar>
        <Navigation
          onSelect={({ itemId }) => {
            if (typeof itemId === "object") {
              queryclient.setQueryData("title", {
                item: `${itemId.item}`,
                title: `${itemId.title}`,
                isTag: false,
              });
              navigate(`/home?menu=${itemId.title}`);
            }
            if (typeof itemId === "string") {
              queryclient.setQueryData("title", {
                item: `${itemId.slice(6)}`,
                title: `${itemId.slice(6)}`,
                isTag: true,
              });
              if (itemId.length >= 6)
                navigate(`/search?keyword=${itemId.slice(6)}`);
            }
          }}
          items={[
            {
              title: "피드",
              itemId: { item: "main", title: "피드" },
              elemBefore: () => (
                <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              ),
            },

            {
              title: "관심태그",
              itemId: "/tags",
              elemBefore: () => (
                <Icon name="tags" style={{ fontSize: "1.2rem" }} />
              ),
              subNav: keywords ? setArr : null,
              //[
              // {
              //   title: "Projects",
              //   itemId: "/management/projects",
              //   // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
              //   elemBefore: () => <Icon name="cloud-snow" />,
              // },
              // {
              //   title: "Members",
              //   itemId: "/management/members",
              //   elemBefore: () => <Icon name="coffee" />,
              // },
              //],
            },
            {
              title: "키워드추가",
              itemId: { item: "addKeyword", title: "키워드추가" },
              elemBefore: () => (
                <Icon name="bookmark" style={{ fontSize: "1.2rem" }} />
              ),
            },
            // {
            //   title: "읽은 목록",
            //   itemId: { item: "study", title: "읽은 목록" },
            //   elemBefore: () => (
            //     <Icon name="eye" style={{ fontSize: "1.2rem" }} />
            //   ),
            // },
          ]}
        />
      </Bar>
    </>
  );
}
