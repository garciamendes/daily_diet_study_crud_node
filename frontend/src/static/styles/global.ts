// Third party
import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
  :root {
    --red-dark: #BF3B44;
    --red-mid: #F3BABD;
    --red-light: #F4E6E7;
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
    height: 100%;
    font-family: 'Nunito Sans', sans-serif;

    input {
      outline: none;
    }
  }
`;