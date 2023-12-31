/* eslint-disable operator-linebreak */
import styled, { css, keyframes } from "styled-components";

const mensageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);

  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const mensageOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);

  }
  to {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const containerVariant = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div`
  padding: 16px 32px;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${mensageIn} 0.3s;

  ${({ $isLeaving }) =>
    $isLeaving &&
    css`
      animation: ${mensageOut} 0.3s forwards;
    `}

  ${({ type }) => containerVariant[type] || containerVariant.default};

  cursor: pointer;

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }
`;
