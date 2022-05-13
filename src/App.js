import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
   const [name, setName] = useState('');
   const [list, setList] = useState([]);
   //  What to do when is editing
   const [isediting, setEditing] = useState(false);
   // checking if the person is in edit mode
   const [editID, setEditID] = useState(null);
   //  inside useState is object
   const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

   //  after submitting
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('hello');
   };
   return (
      <section className="section-center">
         <form className="grocery-form" onSubmit={handleSubmit}>
            {/* check alert {show} if true= diplay alert */}
            {alert.show && <Alert />}
            {/* Input section */}
            <h3>Item List</h3>
            <div className="form-control">
               {/* Value = {name} so when they inter it goes into useState */}
               <input
                  type="text"
                  className="grocery"
                  placeholder="e.g. Eggs"
                  value={name}
                  onChange={(e) => {
                     setName(e.target.value);
                  }}
               />
               <button type="submit" className="submit-btn">
                  {/* CHange Button Text When Is Editing */}
                  {isediting ? 'Edit' : 'Submit'}
               </button>
            </div>
         </form>
         <div className="grocery-container">
            <List />
            <button className="clear-btn">Clear item</button>
         </div>
      </section>
   );
}

export default App;
