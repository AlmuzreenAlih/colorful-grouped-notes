import { useState, useEffect,inputRef,useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useRef } from 'react';
import React from 'react';
import './Home.scss'
import axios from 'axios'


function HomePage() {
    ///////////////////////////////////// ITEMS //////////////////////////////////////////////////////////////
    const [notes,setNotes] = useState([
        { id: 1, group: 'Group 1', title: 'Note 1', backgroundColor: '#87CEEB', content: 'original' }]);
    const [notesLoaded, setNotesLoaded] = useState(false);
  // Fetch data from the API in the component's lifecycle method
    // useEffect(() => {
    //     async function fetchData() {
    //         const apiUrl = 'http://localhost/cgapi/get/getnotes.php';
    //         const response = await fetch(apiUrl);
    //         const data1 = await response.json();
    //         setTimeout(() => {
    //             setNotes(data1);
    //             setNotesLoaded(true);
    //             console.log(data1);
    //             console.log(notes);

    //             console.log("did some backlog");
    //           }, 1000);
    //     }
    //     fetchData()
    //     .catch(console.error);
    // }, []);

    // if (notesLoaded == false) {  return;}
    // console.log(notes);
    var groups = [
        { id: 1, title: 'Group 1', backgroundColor: 'rgb(190,190,250)' },
        { id: 2, title: 'Group 2', backgroundColor: 'rgb(190,250,190)' },
        { id: 3, title: 'Group 3', backgroundColor: 'rgb(250,190,190)' },
    ];
    // var notes = [
    //     { id: 1, group: 'Group 1', title: 'Note 1', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?' },
    //     { id: 2, group: 'Group 1', title: 'Note 2', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.' },
    //     { id: 3, group: 'Group 1', title: 'Note 1A', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet cLorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.o ipsum quibusdam quisquam officiis omnis rem! Ab?' },
    //     { id: 4, group: 'Group 1', title: 'Note 1B', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. SuLorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.rem! Ab?' },
    //     { id: 1, group: 'Group 2', title: 'Note 1', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Susciem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorpit sed quidem minima magnam laudantium ad qui alias vel voluptates iste, quod reprehenderit architecto ipsum quibusdam quisquam officiis omnis rem! Ab?' },
    //     { id: 2, group: 'Group 2', title: 'Note 2', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.' },
    //     { id: 3, group: 'Group 3', title: 'Note 1A', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLoremfffffffffffffhfghgggggggggggggggg ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.o ipsum quibusdam quisquam officiis omnis rem! Ab?' },
    //     { id: 4, group: 'Group 3', title: 'Note 1B', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet consectem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLoretur adipisicing elit. SuLorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.rem! Ab?' },
    //     { id: 5, group: 'Group 3', title: 'Note 1B', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet consectem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLoretur adipisicing elit. SuLorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.rem! Ab?' },
    //     { id: 6, group: 'Group 3', title: 'Note 1B', backgroundColor: '#87CEEB', content: 'Lorem ipsum dolor sit amet consectem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLorem ipsum dolor sit amet cLoretur adipisicing elit. SuLorem ipsudfhfghgfhgfgm dolor sit amet consectetur adipisicing elit. Nostrum fugit illo non cum vitae sed dicta dolores? Maxime a explicabo facilis, reiciendis odit doloribus voluptatem.rem! Ab?' },
    // ];
    /////////////////////////////////// PARTIALS ////////////////////////////////////////////////////////////
    //Main-------------------------------------------------------------------------------------------------------
    function MainComponent(props) {
        return (
            <div className="AllNotes">
            {groups.map(group => (
                <NoteGroupComponent key={group.id} backgroundColor={group.backgroundColor} title={group.title} notes={props.notes}/>
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
                {props.notes.filter((note) => note.group == props.title)
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
        const [taHeight, setTaHeight] = useState(0) //////////////////////////////////TEXTAREA
        const taRef = useRef(null);

        function HANDLE_Scroll() {///////////////////// kgjsflkdjglfkd test mo muna handler, clg
            // console.log(window.pageYOffset)
            setScrolledTop(divRef.current.parentNode.scrollTop);
        }

        useEffect(() => {///////////////////////////////////////////////..........scrolling
            var mainWindow = divRef.current.parentNode
            setTimeout(() => {
                //innerheight = offsetheight, pageyoffset = scrolltop
                var isVisible = ((taRef.current.offsetTop > mainWindow.scrollTop && 
                            taRef.current.offsetTop < mainWindow.scrollTop + mainWindow.offsetHeight) ||
                                 (taRef.current.offsetTop + taRef.current.offsetHeight > mainWindow.scrollTop && 
                            taRef.current.offsetTop + taRef.current.offsetHeight < mainWindow.scrollTop + mainWindow.offsetHeight))
                
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

        // useEffect(() => {/////////////////////////////////////////////////.........Text Area setup
        //     setTaHeight(taRef.current.scrollHeight + 'px') 
        // }, [])

        const [windowWidth, setWindowWidth] = useState(window.innerWidth);///......Text area On Resize
        function HANDLE_Resize() {
            setWindowWidth(window.innerWidth);
        }
        useEffect(() => {
            taRef.current.style.height = 'auto';
            taRef.current.style.height = taRef.current.scrollHeight + 'px';

            // setTaHeight(taRef.current.scrollHeight + 'px')
            window.addEventListener('resize', HANDLE_Resize);
            return () => window.removeEventListener('resize', HANDLE_Resize);
        }, [windowWidth]); //For some reason, pwede window.innerWidth dito
        
        function adjustTextareaHeight(e) {///////////////////////////////////......Text area onChange content
            setTaHeight(e.target.scrollHeight + 'px')
        }

        const [MouseHovered, setMouseHovered] = useState(false);
        const [MouseLeaved, setMouseLeaved] = useState(false);
        const ColorRef = useRef(null);
        const DeleteRef = useRef(null);
        function HANDLE_MouseHovered() {
            console.log("in");
            setMouseHovered(true);
        }
        function HANDLE_MouseLeaved() {
            console.log("out")
            setMouseLeaved(true);
        }
        useEffect(() => {
          if (MouseHovered) {
            ColorRef.current.style.visibility = "visible";
            DeleteRef.current.style.visibility = "visible";
            setMouseHovered(false);
          }

          if (MouseLeaved) {
            ColorRef.current.style.visibility = "hidden";
            DeleteRef.current.style.visibility = "hidden";
            setMouseLeaved(false);
          }
          
          divRef.current.addEventListener('mouseenter', HANDLE_MouseHovered);
          divRef.current.addEventListener('mouseleave', HANDLE_MouseLeaved);
          return () => {
            divRef.current.removeEventListener('mouseenter', HANDLE_MouseHovered);
            divRef.current.removeEventListener('mouseleave', HANDLE_MouseLeaved);
          }
        }, [MouseHovered,MouseLeaved]) //Kahit wala pang nasa loob, basa nag add-remove ka, maeexecute yung handlers, kaya write clg on handlers
        
    
        return (
            <div ref={divRef} style={{opacity: 0, backgroundColor: props.backgroundColor}} className='Note'>
                <div>
                    <input className='title' defaultValue={props.title} />
                    <span ref={ColorRef} style={{visibility: "hidden"}}>
                        <input className='color' type="color" id="color-picker" defaultValue={props.backgroundColor} />
                    </span>
                    <span ref={DeleteRef} style={{visibility: "hidden"}} className='span2'></span>
                    
                </div>
                
                <textarea ref={taRef} spellCheck="false" onChange={adjustTextareaHeight} defaultValue={props.content} 
                style={{height: taHeight}} />
            </div>
        )
    }
   

    //////////////////////////////////////// MAIN RETURN ////////////////////////////////////////////////////////
    return (
        <MainComponent notes={notes}/>
    );
}



export default HomePage;