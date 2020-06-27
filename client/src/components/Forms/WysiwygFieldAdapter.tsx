import React, { useState } from "react";
import MUIRichTextEditor from "mui-rte";
import { Editor, EditorState } from "draft-js";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import { MuiThemeProvider, Theme, createMuiTheme } from "@material-ui/core";

// https://github.com/niuware/mui-rte/tree/master/examples

const defaultTheme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {},
      container: {
        display: "flex",
        flexDirection: "column-reverse",
      },
      editor: {
        padding: "20px",
        height: "200px",
        maxHeight: "200px",
        overflow: "auto",
      },
      toolbar: {
        borderTop: "1px solid gray",
      },
      placeHolder: {
        paddingLeft: 20,
        width: "inherit",
        position: "absolute",
        top: "20px",
      },
      anchorLink: {
        textDecoration: "underline",
      },
    },
  },
});

interface IValue {
  checked: boolean;
  name: string;
  onBlur: () => void;
  onChange: (value: any) => void;
  onFocus: () => void;
  type: string;
  value: string;
}

function WysiwygFieldAdapter({ input, meta, ...rest }: { input: IValue; meta: any }) {
  const [value, setValue] = useState("");
  return (
    <>
      <MuiThemeProvider theme={defaultTheme}>
        <MUIRichTextEditor
          {...rest}
          controls={["bold", "italic", "underline", "quote", "clear", "link"]}
          defaultValue=""
          label="Start typing..."
          onSave={(data: string) => {
            input.onChange(data);
          }}
          onChange={(state: EditorState) => {
            const data = JSON.stringify(convertToRaw(state.getCurrentContent()));
            input.onChange(data);
          }}
        />
      </MuiThemeProvider>
    </>
  );
}

export default WysiwygFieldAdapter;
