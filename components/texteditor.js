import {Editor, EditorState, RichUtils,convertFromRaw,convertToRaw} from 'draft-js';
import { useState } from 'react';

export default function TextEditor({setBlogContent,blogContent}){
    const emptyContentState = convertFromRaw({entityMap: {},blocks: [ {text: '',key: 'foo', type: 'unstyled',entityRanges: [],},],});
    const [editorState,setEditorState] = useState(EditorState.createWithContent(emptyContentState))
    const onChange = (value) =>{
        setEditorState(value);
        setBlogContent({...blogContent, article: convertToRaw(editorState.getCurrentContent())});
    }

  const handleKeyCommand = (command, editorState)=> {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
    }
    const toggleBlockType = (style)=> {onChange(RichUtils.toggleInlineStyle(editorState, style));}
    const toggleInlineStyle = (style)=> {onChange(RichUtils.toggleInlineStyle(editorState, style));}
    return (
    <div>
        <BlockStyleControls editorState={editorState} toggleBlockType={toggleBlockType}/>
        <InlineStyleControls editorState={editorState} toggleInlineStyle={toggleInlineStyle}/>
        <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        />
      </div>
    );
      
  }
  
  const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
  ];
  var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
  ];

const BlockStyleControls = ({editorState,toggleBlockType}) =>{
    return(
      <div>
        {BLOCK_TYPES.map(block=>
          <div className='text-style' key={block.label} onClick={()=>toggleBlockType(block.style)}></div>
        )}
      </div>
    )
  }
const InlineStyleControls = ({editorState,toggleInlineStyle}) =>{
    return(
      <div>
        {INLINE_STYLES.map(inline=>
          <div className='text-style' key={inline.label} onClick={ () => toggleInlineStyle(inline.style)} >{inline.label}</div>
        )}
      </div>
    )
  }