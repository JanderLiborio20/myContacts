import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    padding: 0 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
    outline: 0;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }
`;
