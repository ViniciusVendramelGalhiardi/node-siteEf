import styled from "styled-components";

interface props {
  flex?: number;
}

export const Container = styled.div`
  width: 351px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  outline: none;
  overflow: scroll;

  @media (max-width: 378px) {
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
  padding: 40px 30px;
  display: flex;
  gap: 20px;

  @media (max-width: 344px) {
    padding: 20px 10px;
  }
`;

export const Column = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Row = styled.div<props>`
  display: flex;
  gap: 20px;
`;

export const Label = styled.div`
  display: flex;
  font-family: Open Sans;
  font-size: 13px;
  font-weight: 300;
  color: #797979;
`;

export const Required = styled.div<props>`
  color: red;
`;

export const ButtonContainer = styled.div<props>`
  width: 100%;
  padding: 10px 10px 40px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
