import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useRef} from 'react';
import React from 'react';
import './Home.scss'
function HomePage() {
  const groups = [
    {id: 1, title: 'Group 1', backgroundColor: 'red'},
  ];
  const notes = [
    {id:1, title: 'Note 1', backgroundColor: 'blue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?'},
    {id:2, title: 'Note 2', backgroundColor: 'blue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?'}
  ];

  const textareaRef = useRef(null);

  function adjustTextareaHeight() {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function NoteComponent(props) {
    return (
        <div className='Note'>
            <h2>{props.title}</h2>
            <textarea ref={textareaRef} onChange={adjustTextareaHeight}>{props.content}</textarea>
            {/* <input value={props.content} /> */}
        </div>
    )
  }

  function GroupComponent(props) {
    return (
      <div className="NoteGroup" style={{}}>
        <input value={props.title} />
        {notes.map(note => (
            <NoteComponent key={note.id} backgroundColor={note.backgroundColor} title={note.title} content={note.content} />
        ))}
      </div>
    );
  }

  return (
    <div className="NoteGroups">
      {groups.map(group => (
        <GroupComponent key={group.id} backgroundColor={group.backgroundColor} title={group.title} />
      ))}
    </div>
  );
}

export default HomePage;