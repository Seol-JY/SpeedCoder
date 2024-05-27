import { useEffect } from "react";

const InFeedAdvertise = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production")
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log("Advertise is pushed");
      } catch (e) {
        console.error("AdvertiseError", e);
      }
  }, []);

  //production이 아닌 경우 대체 컴포넌트 표시
  if (process.env.NODE_ENV !== "production")
    return (
      <div
        style={{
          background: "#8aff8a",
          color: "black",
          display: "inline-block",
          width: "140px",
          height: "500px",
        }}
      >
        광고 표시 영역
      </div>
    );
  //production인 경우 구글 광고 표시
  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "inline-block",
        width: "140px",
        height: "500px",
      }}
      data-ad-client="ca-pub-8658385917169302"
      data-ad-slot="5603304488"
    ></ins>
  );
};

export default InFeedAdvertise;
