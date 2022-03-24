import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Text = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottom || 20}px;
  border-radius: 4px;
  background: #ddd;
  color: #191919;
  padding: 6px 10px;
  opacity: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: opacity 0.2s;
  width: 250px;
  font-size: 12px;
  pointer-events: none;
  z-index: 11;
  font-weight: 500;
  @media screen and (max-width: 600px) {
    width: 200px;
    font-size: 11px;
    left: -120px;
  }
`;

const Trigger = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 5px;
  @media print {
    margin-left: 0;
  }
  :hover {
    .text {
      opacity: 1;
    }
  }
`;

const TriggerInner = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  display: flex;
`;

const Tooltip = (props) => {
  let ref1 = useRef(),
    ref2 = useRef(),
    [textStyle, setTextStyle] = useState({});

  let handleDropdownPosition = () => {
    const screenPadding = 60;
    if (!ref1 || !ref2 || !ref1.current || !ref2.current) return;

    const placeholderRect = ref1.current.getBoundingClientRect();
    const dropdownRect = ref2.current.getBoundingClientRect();

    const dropdownRightX = dropdownRect.x + dropdownRect.width;
    const placeholderRightX = placeholderRect.x + placeholderRect.width;
    if (dropdownRect.x < 0) {
      let style = {};
      style.left = "0";
      style.right = "auto";
      style.transform = `translateX(${-placeholderRect.x + screenPadding}px)`;
      setTextStyle(style);
    } else if (dropdownRightX > window.innerWidth - 60) {
      let style = {};
      style.left = "auto";
      style.right = "0";
      style.transform = `translateX(${
        window.innerWidth - placeholderRightX - screenPadding
      }px)`;
      setTextStyle(style);
    }
  };

  window.addEventListener("resize", handleDropdownPosition);

  useEffect(handleDropdownPosition);

  return (
    <Trigger ref={ref1}>
      <Text className="text" bottom={props.bottom} style={textStyle} ref={ref2}>
        {props.children}
      </Text>
      {props.customTooltip ? (
        <props.customTooltip />
      ) : (
        <TriggerInner>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path
              fill="rgba(255,255,255,0.6)"
              d="M12 19.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5a1 1 0 0 1-2 0v-1.41a1 1 0 0 1 .55-.9L14 10.5C14.64 10.08 15 9.53 15 9c0-1.03-1.3-2-3-2-1.35 0-2.49.62-2.87 1.43a1 1 0 0 1-1.8-.86C8.05 6.01 9.92 5 12 5c2.7 0 5 1.72 5 4 0 1.3-.76 2.46-2.05 3.24L13 13.2V14z"
            />
          </svg>
        </TriggerInner>
      )}
    </Trigger>
  );
};

export default Tooltip;
