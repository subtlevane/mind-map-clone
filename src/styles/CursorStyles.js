import { createGlobalStyle } from 'styled-components';

const CursorStyles = createGlobalStyle`
  .custom-cursor {
    position: absolute;
    z-index: 9999;
    width: 10px;
    height: 10px;
    border: 2px solid black;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: all 0.1s ease;
    transition-property: width, height, border;
    will-change: width, height, transform, border;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  /* More specific styles (if required) */
`;

export default CursorStyles;
