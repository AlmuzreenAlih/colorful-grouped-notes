import { useState, useEffect,useCallback } from 'react'
import { useRef } from 'react';
import React from 'react';
import './HomeB.scss'
import axios from 'axios'


function HomePage() {
    ///////////////////////////////////// ITEMS //////////////////////////////////////////////////////////////
    const [notes,setNotes] = useState(null);
    const [notesLoaded, setNotesLoaded] = useState(false);
    const [groups, setGroups] = useState(null)
    
    function IsThisVisible(elem,pare) {
        return (
            ((elem.current.offsetTop > pare.scrollTop && 
                elem.current.offsetTop < pare.scrollTop + pare.offsetHeight) ||
                     (elem.current.offsetTop + elem.current.offsetHeight > pare.scrollTop && 
                elem.current.offsetTop + elem.current.offsetHeight < pare.scrollTop + pare.offsetHeight))
        )
    }

    useEffect(() => {
        fetch('http://localhost/cgapi/get/getnotes.php')
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data[0].notes)
            setNotes(data[0].notes);
            setGroups(data[0].groups);

            setNotesLoaded(true);
            console.log(notes);
            
        })
    }, []);

    if (notesLoaded == false) {return;} //Para blank lang muna
   
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
    function NoteGroupComponent(props) {
        function ONCHANGE_GroupTitle(e) {

        }
        // const button_div_ref = useRef(null); 
        // const [scrolledTop, setScrolledTop] = useState(0);
        // function HANDLE_Scroll() {
        //     setScrolledTop(divRef.current.parentNode.scrollTop);
        // }
        // useEffect(() => {
        //     var mainWindow = button_div_ref.current.parentNode

        //     setTimeout(() => {
        //         if (IsThisVisible(button_div_ref,mainWindow) == true) {
        //             button_div_ref.current.style.opacity = 1;
        //         }
        //     }, [scrolledTop]);

        //     mainWindow.addEventListener('scroll', HANDLE_Scroll);
        //     return () => mainWindow.removeEventListener('scroll', HANDLE_Scroll);
        // }, []);

        const button_div_ref = useRef(null); 
        const [button_div_ref_opac, set_button_div_ref_opac] = useState(0); 
        useEffect(() => {
            set_button_div_ref_opac(1)
        }, []);

        return (
            <>
                <div className="NoteGroup" style={{backgroundColor: props.backgroundColor}}>
                    <input className='GroupTitle' onChange={ONCHANGE_GroupTitle} value={props.title} />
                    <div className='Scrollable-Notes'>
                        {props.notes.filter((note) => note.group == props.title)
                            .map(note => (
                                <NoteComponent key={note.id} id={note.id} backgroundColor={note.backgroundColor} title={note.title} content={note.content} />
                        ))}
                    </div>
                    <button ref={button_div_ref} className='button-div' style={{opacity: button_div_ref_opac}}>
                        Add New Note +
                    </button>
                    
                </div>
            </>
        );
    }
    //Note --------------------------------------------------------------------------------------------------------  
    function NoteComponent(props) {
        ////////////////////////////////// Text area Resizing //
        const [taHeight, setTaHeight] = useState(0)
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);
        function HANDLE_Resize() {
            setWindowWidth(window.innerWidth);
        }
        useEffect(() => {
            taRef.current.style.height = 'auto';
            taRef.current.style.height = taRef.current.scrollHeight + 'px';

            window.addEventListener('resize', HANDLE_Resize);
            return () => window.removeEventListener('resize', HANDLE_Resize);
        }, [windowWidth]);

        function CHANGED_TextArea(e){
            setTaHeight(taRef.current.scrollHeight + 'px');
        }

        ///////////////////////////////////// Scrolling //
        const [scrolledTop, setScrolledTop] = useState(0);
        function HANDLE_Scroll() {
            setScrolledTop(divRef.current.parentNode.scrollTop);
        }

        useEffect(() => {
            var mainWindow2 = divRef.current.parentNode
            setTimeout(() => {
                var isVisible = ((taRef.current.offsetTop > mainWindow2.scrollTop && 
                            taRef.current.offsetTop < mainWindow2.scrollTop + mainWindow2.offsetHeight) ||
                                 (taRef.current.offsetTop + taRef.current.offsetHeight > mainWindow2.scrollTop && 
                            taRef.current.offsetTop + taRef.current.offsetHeight < mainWindow2.scrollTop + mainWindow2.offsetHeight))
                
                if (isVisible == true) {
                    divRef.current.style.opacity = 1;
                }
            }, 100);

            mainWindow2.addEventListener('scroll', HANDLE_Scroll);
            return () => mainWindow2.removeEventListener('scroll', HANDLE_Scroll);
        }, [scrolledTop, taHeight]);
        
        ///////////////////// FOR UPDATING IF USER WANT TO CHANGE HIS NOTES/ NOTES' Title
        const [notevals, setnotevals] = useState({
            id: props.id,
            title: props.title,
            backgroundColor: props.backgroundColor,
            content: props.content,
        });

        const timerRef = useRef(null);
        function CHANGED_NoteTitle(e) {
            const { name, value } = e.target;
            setnotevals(prevNotevals => ({ ...prevNotevals, [name]: value }));

            clearTimeout(timerRef.current); //Clear then start
            timerRef.current = setTimeout(() => {
                callAPI({ ...notevals, [name]: value });
            }, 3000);
        }
        function CHANGED_Note(e) {
            const { name, value } = e.target;
            setnotevals(prevNotevals => ({ ...prevNotevals, [name]: value }));

            clearTimeout(timerRef.current); //Clear then start
            timerRef.current = setTimeout(() => {
                callAPI({ ...notevals, [name]: value });
            }, 3000);
        }


        function callAPI(updatedValues) {
            console.log(updatedValues)

            axios.post("http://localhost/cgapi/get/updateanote.php",{
                id: updatedValues.id,
                title: updatedValues.title,
                backgroundColor: updatedValues.backgroundColor,
                content: updatedValues.content,
            }
            ).
            then(response => {
                if (response.data == false) {
                    alert("Incorrect");
                }
                else {
                    alert(response.data);
                    const cookies = new Cookies();
                    cookies.set('TokenSaved', response.data, { path: '/' });
                    window.location.replace('/');
                }
            });

            console.log("first")
        }

        // Variables Used To Reference DOM Elements//
        const divRef = useRef(null);
        const taRef = useRef(null);
        const ColorRef = useRef(null);
        const DeleteRef = useRef(null);
        const NoteTitleRef = useRef(null);
        const [NoteIdTobeChanged, setNoteIdTobeChanged] = useState(-1)

        return (
            <div ref={divRef} style={{opacity: 0, backgroundColor: props.backgroundColor}} className='Note'
                 onMouseEnter={()=>{ColorRef.current.style.visibility = "visible"; DeleteRef.current.style.visibility = "visible";}}
                 onMouseLeave={()=>{ColorRef.current.style.visibility = "hidden"; DeleteRef.current.style.visibility = "hidden";}}>
                <div>
                    <input ref={NoteTitleRef} name="title" className='title' defaultValue={props.title} 
                     onChange={e=> CHANGED_NoteTitle(e)} />
                    <span ref={ColorRef} style={{visibility: "hidden"}}>
                        <input className='color' type="color" id="color-picker" defaultValue={props.backgroundColor} />
                    </span>
                    <span ref={DeleteRef} style={{visibility: "hidden"}} className='span2'></span>             
                </div>
                <textarea data-noteid={props.id} ref={taRef} name="content" spellCheck="false" defaultValue={props.content} 
                // onChange={()=> {taHeight = taRef.scrollHeight + 'px';}} //YOU CAN'T DO THIS, USEREFS AND STATES ARE CONST
                 onChange={e=> CHANGED_Note(e) + CHANGED_TextArea(e)}
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