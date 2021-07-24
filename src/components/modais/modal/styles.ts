import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  outline: none;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 668px) {
    width: 90%;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 47px;
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: #dedede;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  font-family: Open Sans;
  font-size: 15px;
  font-weight: 500;
  color: #343434;

  @media (max-width: 320px) {
    font-size: 13px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 47px);
  padding: 50px 50px 10px 50px;

  @media (max-width: 668px) {
    padding: 20px 20px 10px 20px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-height: 500px;
  padding-right: 50px;
  overflow: auto;

  @media (max-width: 375px) {
    max-height: 400px;
  }

  @media (max-width: 320px) {
    max-height: 350px;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #9d9d9d;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background: #0878d3;
    border-radius: 20px;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  padding: 30px 10px 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 320px) {
    gap: 10px;
  }
`;
