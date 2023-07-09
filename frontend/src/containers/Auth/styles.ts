// Third party
import styled, { css, keyframes } from 'styled-components'

const styleInput = css`
  border-radius: 15px;
  font-size: 1.2rem;
  border: 1px solid var(--gray-5);
`

export const ContainerMain = styled.div`
  display: flex;
  height: 100%;

  .content-main {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    align-items: center;

    .register-to {
      position: absolute;
      cursor: pointer;
      left: -100px;
      top: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      font-size: 1.1rem;
      padding: .6rem 1.3rem;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      border: none;
      background: var(--red-dark);
      color: var(--white);

      &:hover {
        left: 0;
        transition: all .24s ease-in-out;
      }

      &:not(:hover) {
        left: -100px;
        transition: all .24s ease-in-out;
      }

      &.register:not(:hover) {
        left: -70px;
        transition: all .24s ease-in-out;
      }
    }

    .container-warning {
      .warning {
        position: absolute;
        cursor: pointer;
        right: 2rem;
        top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        width: 60px;
        border: none;
        border-radius: 50px;
        background: var(--red-dark);
        color: var(--white);

        &::after {
          content: '';
          width: 30px;
          height: 30px;
          border-radius: 100%;
          border: 6px solid var(--red-dark);
          position: absolute;
          z-index: -1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ring 1.5s infinite;
        }

        &:hover::after, &:focus::after {
          animation: none;
          display: none;
        }

        @keyframes ring {
          0% {
            width: 30px;
            height: 30px;
            opacity: 1;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
      }

      .text-warning-active {
        opacity: 1 !important;
        transition: .24s !important;
        z-index: 3 !important;
      }

      .text-warning {
        position: fixed;
        cursor: pointer;
        left: 50%;
        transform: translate(-50%, -50%);
        bottom: 3px !important;
        display: flex;
        opacity: 0;
        z-index: 0;
        justify-content: center;
        align-items: center;
        width: 40%;
        height: max-content;
        padding: .7rem;
        border-radius: 6px;
        font-size: 1.1rem;
        color: var(--white);
        background: var(--red-dark);

        @media only screen and (max-width: 1324px) {
          & {
            width: 62%;
          }
        }

        @media only screen and (max-width: 901px) {
          & {
            width: 69%;
          }
        }

        @media only screen and (max-width: 700px) {
          & {
            width: 93%;
          }
        }

        @media only screen and (max-width: 480px) {
          & {
            width: 95%;
          }
        }

        @media only screen and (max-width: 480px) {
          & {
            width: 95%;
          }
        }

        @media only screen and (max-width: 320px) {
          & {
            width: 95%;
            bottom: -100px !important;
          }
        }

        span {
          font-weight: 600;
          font-size: 1.3 !important;
        }
      }
    }

    & > form {
      display: flex;
      flex-direction: column;
      width: 45%;
      gap: 20px;
      padding: 1.3rem 1.4rem;
      padding-bottom: 1rem;
      height: 70%;
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
      box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.3);

      @media only screen and (max-width: 1325px) {
        & {
          width: 65%;
        }
      }

      @media only screen and (max-width: 900px) {
        & {
          width: 75%;
        }
      }

      @media only screen and (max-width: 700px) {
        & {
          width: 100%;
        }
      }

      > input {
        ${styleInput}
        padding: .9rem;
      }

      .password {
        display: flex;
        align-items: center;
        padding-right: .6rem;
        gap: 10px;
        ${styleInput}

        > input {
          width: 95%;
          height: 100%;
          padding: 1rem;
          font-size: 1.2rem;
          background: transparent;
          border: none;
        }

        .icon-show-password {
          cursor: pointer;
        }
      }

      > button {
        cursor: pointer;
        padding: .9rem 1.3rem;
        border: none;
        font-size: 1.2rem;
        border-radius: 15px;
        background: var(--red-dark);
        color: var(--white);
        transition: all .24s;

        &:hover {
          opacity: .9;
        }
      }
    }
  }
`