import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 24px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    width: 100px;

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
  }

  h1 {
    font-size: 24px;
  }
`;
