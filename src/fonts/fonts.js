import { createGlobalStyle } from 'styled-components'
import AppleSDGothicNeoBold from "./AppleSDGothicNeoBold.woff2"


export default createGlobalStyle `
    @font-face{
        font-family: 'AppleSDGothicNeoBold';
        src: local('AppleSDGothicNeoBold').
        url(${AppleSDGothicNeoBold} format('woff2'));
        font-weight: 300;
        font-style: normal;
    }
`