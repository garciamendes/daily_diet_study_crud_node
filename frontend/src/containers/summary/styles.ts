import styled from "styled-components";

export const ContainerMainHome = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .by-page-detail {
    height: 190px !important;
    border-radius: 0px !important;

    .by-page-detail-icon {
      left: 10px !important;
      top: 20%;
    }
  }

  .container_main {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 150px;
    height: calc(100% - 150px);
    width: 45%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
    background: var(--white);

    @media only screen and (max-width: 1024px) {
      & {
        width: 85%;
      }
    }

    @media only screen and (max-width: 667px) {
      & {
        width: 100%;
      }
    }

    .info_detail_summary {
      margin-top: 1rem;
      color: var(--gray-1) !important;
      padding: 1rem !important;

      > strong {
        height: max-content !important;
        font-size: 2.4rem;
      }

      &.diet {
        background: var(--green-mid) !important;
        width: 48% !important;
      }

      &.no_diet {
        background: var(--red-mid) !important;
        width: 48% !important;
      }
    }

    .content_snacks_diet_and_not_diet {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
`