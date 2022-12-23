import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useRef } from 'react';
import React from 'react';
import './Home.scss'

function HomePage() {
    ///////////////////////////////////// ITEMS //////////////////////////////////////////////////////////////
    const groups = [
        { id: 1, title: 'Group 1', backgroundColor: 'rgb(190,190,250)' },
        { id: 2, title: 'Group 2', backgroundColor: 'rgb(190,250,190)' },
        { id: 2, title: 'Group 3', backgroundColor: 'rgb(250,190,190)' },
    ];
    const notes = [
        { id: 1, group: 'Group 1', title: 'Note 1', backgroundColor: 'blue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?' },
        { id: 2, group: 'Group 1', title: 'Note 2', backgroundColor: 'blue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?' },
        { id: 3, group: 'Group 2', title: 'Note 1A', backgroundColor: 'blue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?' },
        { id: 4, group: 'Group 3', title: 'Note 1B', backgroundColor: 'blue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?' },
    ];

    /////////////////////////////////// PARTIALS ////////////////////////////////////////////////////////////
    //-------------------------------------------------------------------------------------------------------
    function MainComponent() {
        return (
            <div className="AllNotes">
            {groups.map(group => (
                <NoteGroupComponent key={group.id} backgroundColor={group.backgroundColor} title={group.title} />
                ))}
            </div>
        )
    }
    //--------------------------------------------------------------------------------------------------------
    function NoteGroupComponent(props) {
        return (
            <div className="NoteGroup" style={{backgroundColor: props.backgroundColor}}>
                <input value={props.title} />
                {notes.filter((note) => note.group == props.title)
                    .map(note => (
                        <NoteComponent key={note.id} backgroundColor={note.backgroundColor} title={note.title} content={note.content} />
                ))}
            </div>
        );
    }

    //--------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const textareaElements = document.querySelectorAll('textarea');
        textareaElements.forEach((textarea) => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    }, []);

    function adjustTextareaHeight(e) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    function NoteComponent(props) {
        return (
            <div className='Note'>
                <h2>{props.title}</h2>
                <textarea onChange={adjustTextareaHeight}>{props.content}</textarea>
            </div>
        )
    }

    //////////////////////////////////////// MAIN RETURN ////////////////////////////////////////////////////////
    return (
        <MainComponent />
    );
}

export default HomePage;