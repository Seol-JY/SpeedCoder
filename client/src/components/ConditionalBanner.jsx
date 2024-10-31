import React, { useState, useRef, useEffect } from 'react';

const MovingBanner = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const containerRef = useRef(null);

  const texts = ["제 10회 BoB 오픈 정보보안 컨퍼런스", "BISC 2024"];
  const repeatedTexts = [...Array(12)].flatMap(() => texts);

  useEffect(() => {
    let animationFrame;
    let speed = 1;

    const animate = () => {
      if (!isDragging && autoScrollEnabled && containerRef.current) {
        setScrollLeft(prev => {
          const newPosition = prev + speed;
          if (newPosition > containerRef.current.scrollWidth / 2) {
            return 0;
          }
          return newPosition;
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isDragging, autoScrollEnabled]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoScrollEnabled(false);
    setStartX(e.pageX - scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoScrollEnabled(true), 1000);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - startX;
    setScrollLeft(x);
  };

  return (
    <div 
      className="w-full overflow-hidden fixed top-0 left-0 z-50" 
      style={{ 
        backgroundColor: 'rgb(87, 81, 254)',
        height: '30px' // 배너 높이 고정
      }}
    >
      <div
        ref={containerRef}
        className="flex items-center h-full relative cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          transform: `translateX(-${scrollLeft}px)`,
        }}
      >
        {repeatedTexts.map((text, index) => (
          <p
            key={index}
            className="text-white text-sm font-bold whitespace-nowrap mx-4"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

const ConditionalBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const eventParam = queryParams.get('event');
    setShowBanner(eventParam?.toLowerCase() === 'bisc');
  }, []);

  return showBanner ? <MovingBanner /> : null;
};

export default ConditionalBanner;
