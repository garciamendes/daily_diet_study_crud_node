// Third party
import styled from 'styled-components'

export const ContainerLoader = styled.span`
  width: 26px;
  height: 26px;
  border: 2px solid var(--red-dark);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`