import { useState, useEffect,useCallback } from 'react'
import { useRef } from 'react';
import React from 'react';
import './HomeB.scss'
import axios from 'axios'
import Cookies from 'universal-cookie';


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
        let homeorigin = "http://localhost/cgapi"
        homeorigin = window.location.origin
        axios.post(homeorigin+"/get/getnotes.php")
        .then(response => {
            console.log(response.data);
            if (response.data == false) {
                alert("Incorrect");
            }
            else {
                setNotes(response.data[0].notes); 
                setGroups(response.data[0].groups);
                setNotesLoaded(true); ////////-----------////////-----------////////-----------////////-----------////////-----------
            }
            
        });
    }, []);

    if (notesLoaded == false) {return;} //Para blank lang muna
   
    /////////////////////////////////// PARTIALS ////////////////////////////////////////////////////////////
    //Main-------------------------------------------------------------------------------------------------------
    function MainComponent(props) {
        const [GroupVals, setGroupVals] = useState({
        });

        let counter = 0;
        function updateCounterHandler() {
            counter++;
            return counter
          };
        return (
            <div className="AllNotes">
            {groups.map(group => (
                <NoteGroupComponent key={group.id} id={group.id} backgroundColor={group.backgroundColor} 
                    title={group.title} notes={props.notes} updateCounter={updateCounterHandler}
                    GroupVals={GroupVals} setGroupVals={setGroupVals}
                    />
                ))}    
            </div>
        )
    }
    //Note Group--------------------------------------------------------------------------------------------------------
    function NoteGroupComponent(props) {
        const timerRef = useRef(null);
        function ONCHANGE_GroupTitle(e) {
            const { name, value } = e.target;

            clearTimeout(timerRef.current); //Clear then start
            timerRef.current = setTimeout(() => {
                callAPI(value); ////////-----------////////-----------////////-----------////////
            }, 3000);
        }
        const Group_title_input = useRef(null);
        function callAPI(updatedValue) {
            console.log(Group_title_input.current.value)
            // console.log(updatedValues)
            // const cookies = new Cookies();
            // const tokenSaved = cookies.get('TokenSaved');
            // // // Include the token in the request headers
            // const cleanedToken = tokenSaved.trim();
            // // const config = {
            // //     headers: {
            // //         'Authorization': `Bearer ${cleanedToken}`,
            // //         'Content-Type': 'application/json',
            // //     },
            // // };
            // axios.post("http://localhost/cgapi/get/updateanote.php",{
            //     token: cleanedToken,
            //     id: updatedValues.id, // KAHIT hindi na-specify yung id sa mga elements, pwede pa rin ito. Ang lahat ng functions sa component ay nadedefine ulit on each iteration ng mapping
            //     title: updatedValues.title,
            //     backgroundColor: updatedValues.backgroundColor,
            //     content: updatedValues.content,
            // }
            // ).
            // then(response => {
            //     console.log(response.data);
            //     if (response.data == false) {
            //         alert("Incorrect");
            //     }
            //     else {
            //         alert("Success");
            //     }
            // });
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

        function AddNoteFunction() {
            const cookies = new Cookies();
            const tokenSaved = cookies.get('TokenSaved');
            const cleanedToken = tokenSaved.trim();

            axios.post("http://localhost/cgapi/get/addanote.php",{ ////////-----------////////-----------////////-----------////////-----------////////-----------
                token: cleanedToken,
                group_id: props.id
            }
            ).
            then(response => {
                console.log(response.data);
                if (response.data == false) {
                    alert("Incorrect");
                }
                else {
                    // Here will be the functions that adds new notecomponent to the div
                    const newNote = response.data;
                    // setNotes([...notes, newNote]);
                    setShouldExecuteEffect(true); ////////-----------////////-----------////////-----------////////-----------////////-----------33333333333
                    setNotesToBeDisplayedOnTheGroup([...NotesToBeDisplayedOnTheGroup, newNote])
                }
            });
        }

        const scrollableNotesRef = useRef(null);
        const [NotesToBeDisplayedOnTheGroup, setNotesToBeDisplayedOnTheGroup] = useState(props.notes.filter((note) => note.group == props.id))
        const [shouldExecuteEffect, setShouldExecuteEffect] = useState(false);

        useEffect(() => {
            if (shouldExecuteEffect) {
                scrollableNotesRef.current.scrollTop = scrollableNotesRef.current.scrollHeight;
            }
        }, [NotesToBeDisplayedOnTheGroup])

        const [button_div_ref_opac, set_button_div_ref_opac] = useState(0); 
        useEffect(() => {
            set_button_div_ref_opac(1) ////////-----------////////-----------////////-----------////////-----------////////-----------
        }, []);
        
        return (
            <>
                <div className="NoteGroup" style={{backgroundColor: props.backgroundColor}}>
                    <input ref={Group_title_input} className='GroupTitle' name="title" 
                    onChange={ONCHANGE_GroupTitle} defaultValue={props.title} />
                    <div className='Scrollable-Notes' ref={scrollableNotesRef}>
                        {NotesToBeDisplayedOnTheGroup
                            .map(note => (
                                <NoteComponent
                                    key={props.updateCounter()} id={note.id} 
                                    backgroundColor={note.backgroundColor} title={note.title} 
                                    content={note.content} />
                        ))}
                    </div>
                    <button className='button-div' style={{opacity: button_div_ref_opac}} onClick={AddNoteFunction}>
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
            const { name, value } = e.target; ////////-----------////////-----------////////-----------////////-----------///////////--------
            setnotevals(notevals => ({ ...notevals, [name]: value })); 

            clearTimeout(timerRef.current); //Clear then start
            timerRef.current = setTimeout(() => {
                callAPI({ ...notevals, [name]: value }); ////////-----------////////-----------////////-----------////////
            }, 3000);
        }
        function CHANGED_Note(e) {
            const { name, value } = e.target;
            setnotevals(notevals => ({ ...notevals, [name]: value }));

            clearTimeout(timerRef.current); //Clear then start
            timerRef.current = setTimeout(() => {
                callAPI({ ...notevals, [name]: value });
            }, 3000);
        }
        function CHANGED_NoteColor(e) {
            const { name, value } = e.target;
            // divRef.current.style.backgroundColor = value;
            setNoteColor(value)
            setnotevals(notevals => ({ ...notevals, [name]: value }));

            clearTimeout(timerRef.current); //Clear then start
            timerRef.current = setTimeout(() => {
                callAPI({ ...notevals, [name]: value });
            }, 3000);
        }

        function callAPI(updatedValues) {
            console.log(updatedValues)
            const cookies = new Cookies();
            const tokenSaved = cookies.get('TokenSaved');
            // // Include the token in the request headers
            const cleanedToken = tokenSaved.trim();
            // const config = {
            //     headers: {
            //         'Authorization': `Bearer ${cleanedToken}`,
            //         'Content-Type': 'application/json',
            //     },
            // };
            axios.post("http://localhost/cgapi/get/updateanote.php",{
                token: cleanedToken,
                id: updatedValues.id, // KAHIT hindi na-specify yung id sa mga elements, pwede pa rin ito. Ang lahat ng functions sa component ay nadedefine ulit on each iteration ng mapping
                title: updatedValues.title,
                backgroundColor: updatedValues.backgroundColor,
                content: updatedValues.content,
            }
            ).
            then(response => {
                console.log(response.data);
                if (response.data == false) {
                    alert("Incorrect");
                }
                else {
                    alert("Success");
                }
            });
        }

        // Variables Used To Reference DOM Elements//
        const divRef = useRef(null);
        const taRef = useRef(null);
        const ColorRef = useRef(null);
        const DeleteRef = useRef(null);
        const NoteTitleRef = useRef(null);
        const [NoteColor, setNoteColor] = useState(props.backgroundColor)

        function DeleteFunction(id) {
            const cookies = new Cookies();
            const tokenSaved = cookies.get('TokenSaved');
            const cleanedToken = tokenSaved.trim();
            
            axios.post("http://localhost/cgapi/get/deleteanote.php",{
                token: cleanedToken,
                note_id: id
            }
            ).
            then(response => {
                console.log(response.data);
                if (response.data == false) {
                    alert("Incorrect");
                }
                else {
                    divRef.current.innerHTML = "";
                    divRef.current.style = {};
                    divRef.current.classList.remove('Note');
                }
            });
        }
         
        return (
            <div ref={divRef} style={{opacity: 0, backgroundColor: NoteColor}} className='Note' ////////-----------////////-----------////////-----------////////
                 onMouseEnter={()=>{ColorRef.current.style.visibility = "visible"; DeleteRef.current.style.visibility = "visible";}}
                 onMouseLeave={()=>{ColorRef.current.style.visibility = "hidden";  DeleteRef.current.style.visibility = "hidden";}}>
                <div>
                    <input ref={NoteTitleRef} name="title" className='title' defaultValue={props.title} 
                        onChange={e=>CHANGED_NoteTitle(e)} />
                    <span className='span1' ref={ColorRef} style={{visibility: "hidden"}}>
                        <input name="backgroundColor" className='color' type="color" id="color-picker" defaultValue={props.backgroundColor} 
                            onChange={e=>CHANGED_NoteColor(e)}/>
                    </span>
                    <span className='span2' ref={DeleteRef} style={{visibility: "hidden"}}
                        onClick={()=>{DeleteFunction(props.id)}}>
                    </span>             
                </div>
                <textarea ref={taRef} name="content" spellCheck="false" defaultValue={props.content} 
                // onChange={()=> {taHeight = taRef.scrollHeight + 'px';}} //YOU CAN'T DO THIS, USEREFS AND STATES ARE CONST
                 onChange={e=>CHANGED_Note(e) + CHANGED_TextArea(e)}
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