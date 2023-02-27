import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  bottom: 20vh;
  right: 1rem;
  z-index: 40;
  padding: 4px;
  background-color: green;
  color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  animation: ${fadeOut} 1s ease-in-out;
`;

const StickySuccessAlert = ({ apiStatus }) => {
  const [Alert, setAlert] = useState(false);

  useEffect(() => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 900);
  }, [apiStatus]);

  return Alert && <AlertContainer>Thành công !</AlertContainer>;
};

export default StickySuccessAlert;
