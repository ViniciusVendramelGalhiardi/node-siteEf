import styled from "styled-components";

interface props {
  width?: string;
  error?: boolean;
}

export const Container = styled.div<props>`
  position: relative;
  display: flex;

  input {
    width: ${({ width }) => (width ? width : "250px")};
    height: 40px;
    padding: 15px;
    padding-bottom: 10px;
    border: 0;
    border-bottom: ${({ error }) =>
      error ? "2px solid red" : "2px solid #dedede"};
    background-color: #f7f7f7;
    outline: none;
    transition: all 0.2s ease-out;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    -webkit-appearance: none;

    font-family: Open Sans;
    font-weight: 400;
    font-size: 15px;
    color: #797979;
  }

  input:focus,
  input:not(:placeholder-shown) {
    border-bottom: ${({ error }) =>
      error ? "2px solid red" : "2px solid #0878d3"};
    padding-right: 30px;
  }

  input::placeholder {
    color: transparent;
  }

  label {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 10px;
    transition: all 0.2s ease-out;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;

    margin-left: 10px;
    font-family: Open Sans;
    font-weight: 400;
    font-size: 15px;
    color: #797979;

    max-width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    margin-top: -10px;
    margin-bottom: 10px;
    padding: 0px 5px;
    font-family: Open Sans;
    font-weight: 400;
    font-size: 13px;
    color: #fff;
    background-color: ${({ error }) => (error ? "red" : "#0878d3")};
  }
`;

export const Required = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  color: red;
  padding: 0px 10px;

  font-family: Open Sans;
  font-weight: 400;
  font-size: 14px;
  color: #ff3939;
`;
