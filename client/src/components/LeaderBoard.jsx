import fetcher from "../utils/fetcher";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import LeaderBoardContents from "./LeaderBoardContents";

export default function LeaderBoard({ daynight }) {
  const [prev, prevInView] = useInView(); // 무한 스크롤용 ref - 이전
  const [next, nextInView] = useInView(); // 무한 스크롤용 ref - 이후
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false); // 서버 에러
  /**
   * 이전 방향 무한스크롤을 잠시 deprecated.
   */

  const getItems = useCallback(async () => {
    if (page <= 1) {
      setPage(1); // page 0이하로 내려가는거 막음
    }
    setLoading(true);
    fetcher
      .load(page)
      .then((data) => {
        setError(false);
        setItems([...items, ...data]);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [page]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  // useEffect(() => {
  //   if (prevInView && !loading) {
  //     setPage((prevState) => prevState - 1);
  //   }
  // }, [prevInView]);

  useEffect(() => {
    if (nextInView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [nextInView]);

  return error ? (
    <ul className="sidebarsection-rank">
      <li
        className="sidebarsection-rank-items"
        style={{ fontSize: "14px", display: "flex", justifyContent: "center" }}
      >
        서버 연결이 원활하지
        <br />
        않습니다. 인터넷 연결
        <br />
        상태를 확인해 주세요.
      </li>
    </ul>
  ) : (
    <ul className="sidebarsection-rank">
      {items.map((s, i) => {
        // if (i === 2) {
        //   return (
        //     <li key={s._id} ref={prev}>
        //       <LeaderBoardContents s={s} />
        //     </li>
        //   );
        if (i === items.length - 1) {
          return (
            <li key={s._id} ref={next}>
              <LeaderBoardContents s={s} />
            </li>
          );
        }
        return (
          <li key={s._id}>
            <LeaderBoardContents s={s} />
          </li>
        );
      })}
      {loading && (
        <li>
          <ul>
            {[...Array(loading && items.length == 0 ? 14 : 3)].map(
              (_, index) => (
                <li key={index} className="sidebarsection-rank-items">
                  <img
                    src={
                      daynight % 2
                        ? "/img/skeleton-bright.png"
                        : "/img/skeleton-dark.png"
                    }
                    style={{
                      transition: "all 3s",
                    }}
                  />
                </li>
              )
            )}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              objectFit: "cover",
              height: "25px",
            }}
          >
            {" "}
            <img alt="loading..." src={"img/loading.gif"} />
          </div>
        </li>
      )}
    </ul>
  );
}
