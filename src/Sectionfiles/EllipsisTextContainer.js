import React, { useState, useEffect, useRef } from 'react';
import "../Css/Main.css" // Import your stylesheet with the provided CSS



const EllipsisTextContainer = ({ text, link,maxWidth, maxHeight }) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    
    if (textContainer.scrollHeight > textContainer.clientHeight) {
      setIsOverflowed(true);
    } else {
      setIsOverflowed(false);
    }
  }, [text]);

  return (
    <div
      className={`text-container ${isOverflowed ? 'overflowed' : ''}`}
      ref={textContainerRef}
      style={{ maxWidth, maxHeight, overflow: 'hidden' }}
    >
        
      {text}
      
      {link && isOverflowed && (
        <a href={link} className="read-more-link">
          ..See More
        </a>
      )}
    </div>
  );
};

export default EllipsisTextContainer;