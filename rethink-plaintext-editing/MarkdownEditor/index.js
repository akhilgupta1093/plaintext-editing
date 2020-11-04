import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [textValue, setTextValue] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    (async () => {
      setTextValue(await file.text());
    })();
  }, [file]);

  const handleTyping = (e) => {
    setTextValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEditing(!editing)
    write(file, textValue)
  }

  const handleEdit = () => {
    setEditing(!editing)
  }

  if (editing) {
    var display = (<textarea className={css.textarea} onChange={handleTyping}>
      {textValue}
    </textarea>)
    var buttonval = "Preview"
  } else {
    var display = (<ReactMarkdown className={css.preview}>
      {textValue}
    </ReactMarkdown>)
    var buttonval = "Edit"
  }
  return (
    <div className={css.editor}>
      <h3 className={css.header}>{file.name}</h3>
      <form>
        {display}
      </form>
      <input
        className={css.submit}
        type="submit"
        value={buttonval}
        onClick={handleEdit}/>
      {editing && <input
        className={css.submit}
        type="submit"
        value="Submit"
        onClick={handleSubmit}/>}
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
