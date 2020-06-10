import React, { useState, useRef, useCallback } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';

// Hmm, not sure about this. This feel more like a plugin to build an editor on top of
// rather than being a rich text editor itself.
const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Strikethrough', style: 'STRIKETHROUGH' },
];

/**
 * Toolbar button that controls the rich text capabilities
 */
const StyleButton = ({ onToggle, active, ariaLabel, label, style }) => {
  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span
      className={className}
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
      aria-label={ariaLabel}
    >
      {label}
    </span>
  );
};

function InlineStyleControls({ editorState, onToggle }) {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  function handleFocus() {
    if (editor.current) {
      editor.current.focus();
    }
  }

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    },
    [editorState, setEditorState]
  );

  const mapKeyToEditorCommand = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 9: // TAB
          const newEditorState = RichUtils.onTab(
            e,
            editorState,
            4 /* maxDepth */
          );
          if (newEditorState !== editorState) {
            setEditorState(newEditorState);
          }
          return null;
        default:
          return getDefaultKeyBinding(e);
      }
    },
    [editorState, setEditorState]
  );

  return (
    <div className="RichEditor-root">
      <InlineStyleControls
        editorState={editorState}
        onToggle={(inlineStyle) => {
          const newState = RichUtils.toggleInlineStyle(
            editorState,
            inlineStyle
          );
          setEditorState(newState);
        }}
      />
      <div className="RichEditor-editor" onClick={handleFocus}>
        <Editor
          ref={editor}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={(editorState) => setEditorState(editorState)}
        />
      </div>
    </div>
  );
};

const DraftJsPage = () => (
  <div>
    <RichTextEditor />
  </div>
);

export default DraftJsPage;
