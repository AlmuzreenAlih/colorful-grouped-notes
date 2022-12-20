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

