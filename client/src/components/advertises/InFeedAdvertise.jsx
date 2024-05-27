import { useEffect } from "react";

const InFeedAdvertise = ({
  className = "adsbygoogle",
  client = "ca-pub-8658385917169302",
  slot = "1562420452",
  format = "fluid",
  layoutKey = "-fp+68-11-df+sd",
}) => {
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
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          padding: "16px",
        }}
      >
        광고 표시 영역
      </div>
    );
  //production인 경우 구글 광고 표시
  return (
    <ins
      className={className}
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        display: "block",
        textAlign: "center",
      }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout-key={layoutKey}
    />
  );
};

export default InFeedAdvertise;
