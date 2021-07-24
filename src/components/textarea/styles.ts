import styled from "styled-components";

interface props {
  maxWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  padding?: string;
  error?: boolean;
}

export const Container = styled.textarea<props>`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  min-width: 100%;
  max-height: ${({ maxHeight }) => maxHeight};
  min-height: ${({ minHeight }) => minHeight};
  padding: ${({ padding }) => padding};
  background-color: #f7f7f7;
  border: none;
  outline: none;
  resize: none;

  font-family: Open Sans;
  font-weight: 400;
  font-size: 15px;
  color: #797979;
  text-align: justify;

  border-bottom: ${({ error }) => (error ? "2px solid red" : "none")};

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
