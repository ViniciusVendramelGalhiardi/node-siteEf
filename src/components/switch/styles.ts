import styled from "styled-components";

interface props {
  checked?: boolean;
}

export const Container = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Content = styled.label`
  width: 60px;
  height: 35px;
  position: relative;
  display: inline-block;

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 34px;
    background-color: #dedede;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    width: 23px;
    height: 23px;
    position: absolute;
    left: 6px;
    bottom: 6px;
    border-radius: 50%;
    background-color: #5a5a5a;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    content: "";
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    background-color: #0878d3;
  }
`;

export const Label = styled.div<props>`
  flex: 1;
  color: ${({ checked }) => (checked ? "#0878d3" : "#797979")};
  font-family: Open Sans;
  font-weight: 400;
  font-size: 15px;

  -webkit-transition: 0.4s;
  transition: 0.4s;
`;
