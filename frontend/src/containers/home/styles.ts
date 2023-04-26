// Third party
import styled from 'styled-components'

export interface IStatistic {
  bgColor?: string,
  iconColor?: string
  textColor?: string
}

export const ContainerMainHome = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  .content_main {
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 100%;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 80px;

      img {
        height: 35%;
      }

      .content_logout_avatar {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;
        width: 15%;

        span {
          cursor: pointer;
        }
      }
    }

    .add_more_snack {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 1.3rem 0;
      gap: 3px;
    }
  }

`

export const Avatar = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  border: 2px solid var(--gray-5);
  border-radius: 50px;
  font-weight: bold;
  user-select: none;
`

export const StatisticInfo = styled.div<IStatistic>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 12px;
  background: ${props => props.bgColor ?? 'var(--gray-7)'};
  color: ${props => props.textColor ?? 'var(--gray-7)'};

  .icon-nav-summary {
    cursor: pointer;
    position: absolute;
    right: 7px;
    top: 7px;
    color: ${props => props.iconColor ?? 'var(--gray-7)'};
  }
`

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: .7rem 0;
  border: none;
  border-radius: 10px;
  color: var(--white);
  background: var(--gray-2);
`

export const ContainerInfoListSnack = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  scrollbar-width: none;

  .content_snack_by_date {
    display: flex;
    flex-direction: column;
    width: 100%;

    .title_date {
      font-size: 1.2rem;
    }

  }

  &::-webkit-scrollbar {
    width: 0;
  }
`

export const ContentSnack = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  padding: .8rem .6rem;
  border: 1px solid var(--gray-6);
  border-radius: 6px;
  margin: .4rem 0;
  transition: .24s;

  .hours {
    position: relative;
    padding-right: .7rem;

    &:after {
      position: absolute;
      content: '';
      right: 0;
      width: .12rem;
      height: 100%;
      background: var(--gray-6);
      border-radius: 30px;
    }
  }

  .content_name_snack_and_label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .title_snack {
      margin-left: .7rem;
    }
  }

`

export const LabelColorSnack = styled.span<Omit<IStatistic, 'iconColor' | 'textColor'>>`
  height: 15px;
  width: 15px;
  border-radius: 50px;
  border: none;
  background: ${props => props.bgColor};
`