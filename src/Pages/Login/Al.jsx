// ////////////////////////////////////////////////////////////
// //TO DO: Scrolling check
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useRef, useEffect } from 'react';

// const MyComponent = () => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const element = elementRef.current;
//     const isVisible = element.offsetTop > window.pageYOffset &&
//       element.offsetTop + element.offsetHeight < window.pageYOffset + window.innerHeight;

//     console.log(isVisible);
//   }, []);

//   return <div ref={elementRef}>Hello, World!</div>;
// };
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useRef, useEffect } from 'react';

// const MyComponent = () => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const element = elementRef.current;
//     const handleScroll = () => {
//       const isVisible = element.offsetTop > window.pageYOffset &&
//         element.offsetTop + element.offsetHeight < window.pageYOffset + window.innerHeight;

//       console.log(isVisible);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return <div ref={elementRef}>Hello, World!</div>;
// };
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useRef, useEffect } from 'react';

// const MyComponent = () => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const element = elementRef.current;
//     const isVisible = element.offsetTop > window.pageYOffset &&
//       element.offsetTop + element.offsetHeight < window.pageYOffset + window.innerHeight;

//     console.log(isVisible);
//   }, [window.pageYOffset]);

//   return <div ref={elementRef}>Hello, World!</div>;
// };

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const ResizableDiv = () => {
//     const [width, setWidth] = useState(200);
//     const [height, setHeight] = useState(200);
  
//     const handleResize = (event) => {
//       setWidth(event.clientX);
//       setHeight(event.clientY);
//     };
  
//     return (
//       <div
//         style={{
//           width: `${width}px`,
//           height: `${height}px`,
//           resize: 'both',
//           overflow: 'auto',
//         }}
//         onMouseMove={handleResize}
//       >
//         Resizable div
//       </div>
//     );
//   };
  

//   import React from 'react';

// function MyComponent(props) {
//   const items = [
//     {id: 1, backgroundColor: 'red', title: 'Item 1', content: 'Content for item 1'},
//     {id: 2, backgroundColor: 'blue', title: 'Item 2', content: 'Content for item 2'},
//     {id: 3, backgroundColor: 'green', title: 'Item 3', content: 'Content for item 3'}
//   ];

//   return (
//     <div>
//       {items.map(item => (
//         <MyItem key={item.id} backgroundColor={item.backgroundColor} title={item.title} content={item.content} />
//       ))}
//     </div>
//   );
// }

// function MyItem(props) {
//   return (
//     <div style={{backgroundColor: props.backgroundColor}}>
//       <h2>{props.title}</h2>
//       <p>{props.content}</p>
//     </div>
//   );
// }

// export default MyComponent;
