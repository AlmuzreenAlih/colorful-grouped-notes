import { useState, useEffect,inputRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useRef } from 'react';
import React from 'react';
import './Home.scss'

function HomePage() {
    ///////////////////////////////////// ITEMS //////////////////////////////////////////////////////////////
    var groups = [
        { id: 1, title: 'Group 1', backgroundColor: 'rgb(190,190,250)' },
        { id: 2, title: 'Group 2', backgroundColor: 'rgb(190,250,190)' },
        { id: 3, title: 'Group 3', backgroundColor: 'rgb(250,190,190)' },
    ];
    var notes = [
        { id: 1, group: 'Group 1', title: 'Note 1', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?' },
        { id: 2, group: 'Group 1', title: 'Note 2', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.' },
        { id: 3, group: 'Group 1', title: 'Note 1A', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet cLorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.o ipsum quibusdam quisquam officiis omnis rem! Ab?' },
        { id: 4, group: 'Group 1', title: 'Note 1B', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. SuLorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.rem! Ab?' },
        { id: 1, group: 'Group 2', title: 'Note 1', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Susciem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorpit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?' },
        { id: 2, group: 'Group 2', title: 'Note 2', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.' },
        { id: 3, group: 'Group 3', title: 'Note 1A', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLoremfffffffffffffhfghgggggggggggggggg ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.o ipsum quibusdam quisquam officiis omnis rem! Ab?' },
        { id: 4, group: 'Group 3', title: 'Note 1B', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet consectem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLoretur adipisicing elit. SuLorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.rem! Ab?' },
        { id: 4, group: 'Group 3', title: 'Note 1B', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet consectem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLoretur adipisicing elit. SuLorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.rem! Ab?' },
        { id: 4, group: 'Group 3', title: 'Note 1B', backgroundColor: '#e23423', content: 'Lorem ipsum dolor sit amet consectem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLoretur adipisicing elit. SuLorem ipsudfhfghgfhgfgm dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.rem! Ab?' },
    ];

    /////////////////////////////////// PARTIALS ////////////////////////////////////////////////////////////
    //Main-------------------------------------------------------------------------------------------------------
    function MainComponent() {
        return (
            <div className="AllNotes">
            {groups.map(group => (
                <NoteGroupComponent key={group.id} backgroundColor={group.backgroundColor} title={group.title} />
                ))}
                
            </div>
        )
    }
    //Note Group--------------------------------------------------------------------------------------------------------
    function GroupTitleChange(e) {

    }
    function NoteGroupComponent(props) {
        return (
            <div className="NoteGroup" style={{backgroundColor: props.backgroundColor}}>
                <input onChange={GroupTitleChange} value={props.title} />
                {notes.filter((note) => note.group == props.title)
                    .map(note => (
                        <NoteComponent key={note.id} backgroundColor={note.backgroundColor} title={note.title} content={note.content} />
                ))}
            </div>
        );
    }
    //Note --------------------------------------------------------------------------------------------------------  
    function NoteComponent(props) {
        const [scrolledTop, setScrolledTop] = useState(0); ////////////////////////////SCROLLING
        const divRef = useRef(null);
        const [taHeight, setTaHeight] = useState(0) ///////////////////////////////TEXTAREA
        const taRef = useRef(null);

        function HANDLE_Scroll() {///////////////////// kgjsflkdjglfkd test mo muna handler, clg
            // console.log(window.pageYOffset)
            setScrolledTop(divRef.current.parentNode.scrollTop);
        }

        useEffect(() => {   
            var mainWindow = divRef.current.parentNode
            setTimeout(() => {
                //innerheight = offsetheight, pageyoffset = scrolltop
                var isVisible = ((taRef.current.offsetTop > mainWindow.scrollTop && taRef.current.offsetTop < mainWindow.scrollTop + mainWindow.offsetHeight) ||
                            (taRef.current.offsetTop + taRef.current.offsetHeight > mainWindow.scrollTop && taRef.current.offsetTop + taRef.current.offsetHeight < mainWindow.scrollTop + mainWindow.offsetHeight))
                
                if (isVisible == true) {
                    console.log("first")
                    divRef.current.style.opacity = 1;
                } else {
                    // console.log(taRef.current.offsetTop, ">", mainWindow.scrollTop,"&&", taRef.current.offsetTop, "<" ,mainWindow.scrollTop ,"+", mainWindow.offsetHeight);
                    // var xxx = Array.prototype.indexOf.call(divRef.current.parentNode.children, divRef.current)+1
                    // if (xxx != divRef.current.parentNode.children.length) {if (divRef.current.parentNode.children[xxx].style.opacity != 1) {divRef.current.style.opacity = 0;}} 
                    // else{divRef.current.style.opacity = 0;}
                }
            }, 100);

            mainWindow.addEventListener('scroll', HANDLE_Scroll);
            return () => mainWindow.removeEventListener('scroll', HANDLE_Scroll);
        }, [scrolledTop, taHeight]);

        useEffect(() => {/////////////////////////////////////////////////.........setup
            setTaHeight(taRef.current.scrollHeight + 'px') 
        }, [])
        
        function adjustTextareaHeight(e) {///////////////////////////////..........onChange textarea content
            setTaHeight(e.target.scrollHeight + 'px')
        }
    
        return (
            <div ref={divRef} style={{opacity: 0, backgroundColor: props.backgroundColor}} className='Note'>
                <div>
                    <input className='title' defaultValue={props.title} />
                    <div>
                        <input className='color' type="color" id="color-picker" defaultValue={props.backgroundColor} />
                    </div>
                </div>
                
                <textarea ref={taRef} spellCheck="false" onChange={adjustTextareaHeight} defaultValue={props.content} 
                style={{height: taHeight}} />
            </div>
        )
    }

    
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth); //////////On Resize
    // function handleResize() {
    //     setWindowWidth(window.innerWidth);
    // }
    // useEffect(() => {
    //     const textareaElements = document.querySelectorAll('textarea');
    //     textareaElements.forEach((textarea) => {
    //         textarea.style.height = textarea.scrollHeight + 'px';
    //     });
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, [windowWidth,scrolledTop]); //For some reason, pwede window.innerWidth dito
   

    //////////////////////////////////////// MAIN RETURN ////////////////////////////////////////////////////////
    return (
        <MainComponent />
        
    );
}



export default HomePage;