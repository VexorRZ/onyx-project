import styled from "styled-components";

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Videocam,
  Image,
} from "@mui/icons-material";

export const Container = styled.div`
  display: flex;
  gap: 5px;
  button {
    background: transparent;
    border: 1px solid #526173;
    color: #526173;
    border-radius: 50%;
    height: 31px;
    width: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border: #101318;
      color: #101318;
      background: #526173;
      cursor: pointer;
    }
  }
`;

export const StyledBold = styled(FormatBold)`
  color: brown;
  width: 18px !important;
  height: 18px !important ;
`;
export const StyledItalic = styled(FormatItalic)`
  color: tomato;
  width: 18px !important;
  height: 18px !important ;
`;

export const StyledUnderlined = styled(FormatUnderlined)`
  color: darkcyan;
  width: 18px !important;
  height: 18px !important ;
`;

export const StyledFormatListBulleted = styled(FormatListBulleted)`
  color: blueviolet;
  width: 18px !important;
  height: 18px !important ;
`;

export const StyledFormatListNumbered = styled(FormatListNumbered)`
  color: darkmagenta;
  width: 18px !important;
  height: 18px !important ;
`;

export const StyledImage = styled(Image)`
  color: mediumseagreen;
  width: 18px !important;
  height: 18px !important ;
`;

export const StyledVideo = styled(Videocam)`
  color: greenyellow;
  width: 18px !important;
  height: 18px !important ;
`;
