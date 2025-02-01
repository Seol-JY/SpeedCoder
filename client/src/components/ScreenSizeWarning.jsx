import React, { useState, useEffect } from "react";

const ScreenSizeWarning = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 모바일 또는 태블릿 기기인지 확인하는 함수
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth < 768 ||
        window.innerHeight < 470 ||
        isMobileDevice()
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로드 시에도 체크

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="screen-size-warning">
      <div className="warning-content">
        <div className="warning-icon">🖥️</div>
        <h2>Please Check Your Screen Size</h2>
        <p className="english-text">
          This application is optimized for desktop environments. Please use a
          computer or enlarge your screen.
        </p>
        <p className="korean-text">
          이 애플리케이션은 데스크톱 환경에 최적화되어 있습니다. 컴퓨터를
          사용하거나 화면을 확대해주세요.
        </p>
      </div>
    </div>
  );
};

export default ScreenSizeWarning;
