import React, { useEffect } from 'react';

const Alert = ({ msg, type, removeAlert }) => {
   useEffect(() => {
      const timeout = setTimeout(() => {
         // false will be turn back on
         removeAlert();
      }, 3000);
      return () => clearTimeout(timeout);
   }, []);
   return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
