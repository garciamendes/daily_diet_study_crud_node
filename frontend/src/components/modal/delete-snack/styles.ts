// Third party
import styled from 'styled-components'

export interface IButtonStyledProps {
  isOutlined: boolean
}

export const ContainerMainModal = styled.div<{ open: boolean}>`
  position: absolute;
  z-index: 999;
  display: ${props => props.open ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: transparent;
`

export const ContentModal = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: max-content;
  width: 37%;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .2);

  .container_delete {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    background: var(--white);
    padding: 1.2rem .7rem;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .2);

    & > strong {
      font-size: 1.3rem;
    }

    .container-actions {
      display: flex;
      gap: 2rem;
      margin-top: 5rem;
      width: 70%;
    }
  }
`


export const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;
  padding: 1rem 0;
  font-size: 1rem;
  border: none;
  border-radius: 7px;
  color: var(--white);
  background: var(--gray-2);
`