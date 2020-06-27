import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MUIRichTextEditor from 'mui-rte'
import { Editor, EditorState } from 'draft-js';
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'

// https://github.com/niuware/mui-rte/tree/master/examples

function WysiwygFieldAdapter({ input, meta, ...rest }: { input: any; meta: any }) {
  const [value, setValue] = useState('');
  const sampleMarkup = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />Other text<br /><br /><a href="http://myurl.com">Some link</a>';
  const contentHTML = convertFromHTML(sampleMarkup)
  const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)
  const content = JSON.stringify(convertToRaw(state))

  return (
    <>
      {/* <ReactQuill {...input} {...rest} theme="snow" value={value} onChange={(v) => {
        setValue(v);
        input.onChange(value);
      }} /> */}
      <MUIRichTextEditor
      controls={["bold", "italic", "underline", "quote", "clear"]}
        defaultValue={content} 
        label="Start typing..."
        onSave ={(data: any) => {
          const text = data;
          console.log(text)
          input.onChange(text);
        }} />,
    </>
  );
}

export default WysiwygFieldAdapter;
