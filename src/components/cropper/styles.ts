import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  max-height: 600px;
  width: 100%;
  height: 100%;

  padding: 20px;

  background: #fff;

  border-radius: 5px;

  div {
    height: 100%;
    img {
      max-height: 500px;
    }
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  outline: none;

  .footer {
    display: flex;
    justify-content: space-between;
    width: 250px;
    margin-top: 20px;
  }

  .input-image-class {
    display: none;
  }
`;

export const CropButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
`;
