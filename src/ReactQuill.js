import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Btn = (props) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (e) => {
    setIsActive((prev) => !prev);
  };
  return <button {...props} onClick={handleClick} aria-pressed={isActive} />;
};
const CustomToolbar = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <Btn className="ql-bold" aria-label="Bold" />
        <Btn className="ql-italic" aria-label="Italics" />
        <Btn className="ql-underline" aria-label="Underline" />
        <Btn className="ql-strike" aria-label="Strikethrough" />
      </span>
      <span className="ql-formats">
        <Btn
          className="ql-list"
          value="ordered"
          aria-label="Ordered/Numbered List"
        />
        <Btn className="ql-list" value="bullet" aria-label="Bullet Point" />
      </span>
    </div>
  );
};
const Editor = (props) => {
  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill {...props} modules={Editor.modules}></ReactQuill>
    </div>
  );
};
const ReactQuillPage = () => {
  const [controlledValue, setControlledValue] = useState('');
  return (
    <div
      style={{
        width: '50%',
      }}
    >
      <Editor value={controlledValue} onChange={setControlledValue} />
    </div>
  );
};

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: {
    container: '#toolbar',
    // handlers: {
    //   insertStar: insertStar,
    // },
  },
};

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

export default ReactQuillPage;
