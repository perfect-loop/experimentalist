import React, { useState } from "react";
import MUIRichTextEditor from "mui-rte";
import { Editor, EditorState } from "draft-js";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";

// https://github.com/niuware/mui-rte/tree/master/examples

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
      <MUIRichTextEditor
        {...rest}
        controls={["bold", "italic", "underline", "quote", "clear", "save"]}
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
      ,
    </>
  );
}

export default WysiwygFieldAdapter;
