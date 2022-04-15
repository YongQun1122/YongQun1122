import { css } from "@emotion/react";

export const emotionCustomScrollbar = css`
  ::-webkit-scrollbar {
    width: 13px;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px !important;
    background-color: #c4c4c4b0;
    border: 3px solid transparent;
    &:hover {
      background-color: #c4c4c4;
    }
  }
`;
