import styled from "styled-components";

export const ContainerMainModal = styled.div<{ open: boolean}>`
  position: absolute;
  z-index: 999;
  display: ${props => props.open ? 'flex' : 'none'};
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: transparent;
`

export const ContentModal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: max-content;
  margin-top: 2rem;
  width: 37%;
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .2);

  @media only screen and (max-width: 1024px) {
    & {
      width: 60%;
    }
  }

  @media only screen and (max-width: 667px) {
    & {
      width: 100%;
    }
  }

  header {
    height: 120px;
    width: 100%;
    display: flex;
    background: var(--gray-6);
    padding: 0 .5rem;
    padding-top: 1.5rem;
    color: var(--gray-2) !important;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;

    .icon_back {
      cursor: pointer;
    }

    strong {
      flex: 1;
      text-align: center;
    }
  }

  .container_form {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 90px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 100%;
    background: var(--white);
    padding: 1.2rem .7rem;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .2);

    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .content_input_label {
        display: flex;
        flex-direction: column;
        gap: 5px;

        label {
          font-size: 1rem;
          font-weight: bold;
        }
      }

      input, textarea {
        padding: .6rem;
        border-radius: 6px;
        border: 1px solid var(--gray-6);
        resize: none;
        outline: none;
        font-size: 1.1rem;
        color: var(--gray-4);
        background: transparent;
      }

      .container_date_time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .content_input_label {
          width: 48%;
        }
      }
    }
  }
`

export const ContentIsDiet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;

  button {
    cursor: pointer;
    padding: .6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    border: none;
    gap: 8px;
    width: 49%;
    border-radius: 6px;
    border: 1px solid;
    color: var(--gray-1);
    border-color: var(--gray-7);
    background-color: var(--gray-7);

    &.is_diet {
      border-color: var(--green-dark);
      background-color: var(--green-mid);
    }

    &.not_is_diet {
      border-color: var(--red-dark);
      background-color: var(--red-mid);
    }
  }
`