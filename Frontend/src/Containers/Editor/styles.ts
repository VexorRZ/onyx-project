import styled from "styled-components";

type Editor = {
  alignItems: string;
  width: string;
};
export const Container = styled.div<Editor>`
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems};
  width: ${(props) => props.width};

  .contentEditor {
    border: white;
    color: black;
    background: white;
    min-height: 80px;
    height: 100%;
    border-radius: 6px;
    width: 100%;
    .tiptap {
      padding: 8px;
      min-height: 100px;
      height: 100%;
      border-radius: 6px;

      p {
        margin: 0;
      }
    }
  }

  .menuBar {
    &:hover {
      cursor: pointer;
    }
  }
`;
