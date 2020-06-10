import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEPage = () => {
  const [editorValue, setEditorValue] = useState('');
  return (
    <div>
      <Editor
        apiKey="e1pzclij7vg117gyu5li199tmzbmxfqwu7bfa5fq1gl413wx"
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help',
          ],
          toolbar:
            'bold italic underline strikethrough link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
        }}
        onEditorChange={setEditorValue}
      />
      <pre>{editorValue}</pre>
    </div>
  );
};

export default TinyMCEPage;
