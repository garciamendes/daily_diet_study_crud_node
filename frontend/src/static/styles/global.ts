// Third party
import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
  :root {
    --red-dark: #BF3B44;
    --red-mid: #F3BABD;
    --red-light: #F4E6E7;
    --orange-dark: #ff7700;
    --orange-mid: #ff973c;
    --orange-light: #ffb778;
    --yellow-dark: #ffe900;
    --yellow-mid: #ffee3e;
    --yellow-light: #FAF7D1;
    --blue-dark: #1700ff;
    --blue-mid: #402eff;
    --blue-light: #6487f8;
    --green-dark: #639339;
    --green-mid: #CBE4B4;
    --green-light: #E5F0DB;
    --gray-1: #1B1D1E;
    --gray-2: #333638;
    --gray-4: #5C6265;
    --gray-5: #B9BBBC;
    --gray-6: #DDDEDF;
    --gray-7: #EFF0F0;
    --white: #FFFFFF;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    position: relative;
    height: 100%;
    font-family: 'Nunito Sans', sans-serif;

    input {
      outline: none;
    }
  }

  .flex-full-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .margin-top-1-rem {
    margin-top: 1rem !important;
  }

  .cursor-pointer {
    cursor: pointer !important;
  }
`;