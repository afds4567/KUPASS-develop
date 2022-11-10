import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "react-minimal-side-navigation";
import { Icon } from "semantic-ui-react";
import "../../styles/sidebar.css";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { queryclient } from "../../lib/react-query";
import { storage } from "../../utils";
import axios from "axios";
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
  const { data: keywords } = useQuery(["keywords"],() => axios.get(`https://konkukstudy.site/api/user/${storage.getName()}/keywords`), {
    initialData: " ",
    staleTime: Infinity,
  });

  useEffect(() => {
    const tmp = {};
    tmp.title = "Edit";
    tmp.itemId = { item: "addKeyword", title: "키워드편집" };
    setArr.push(tmp);
    console.log("update")
    if (!keywords?.data?.keywords) {
      keywords?.forEach((keyword) => {
        const curObj = {};
        curObj.title = keyword;
        curObj.itemId = `/tags/${keyword}`;
        setArr.push(curObj);
      });
    }
     else if (keywords?.data?.keywords) {
      console.log(keywords)
      keywords?.data?.keywords.forEach((key) => {
        const curObj = {};
        curObj.title = key;
        curObj.itemId = `/tags/${key}`;
        setArr.push(curObj);
      })
    }
     
  }, [keywords]);
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
              if(itemId.item=='addKeyword') navigate(`/menu/키워드편집`)
              else navigate(`/home?menu=${itemId.title}`);
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
                <Icon name="th large" style={{ fontSize: "1.5rem" }} />
              ),
            },
            {
              title: "키워드",
              itemId: "/tags",
              elemBefore: () => (
                <Icon name="tags" style={{ fontSize: "1.5rem" }} />
              ),
              subNav:setArr
            },
          ]}
        />
      </Bar>
    </>
  );
}
