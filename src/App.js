import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
   let list = localStorage.getItem('list');
   if (list) {
      return JSON.parse(localStorage.getItem('list'));
   } else {
      return [];
   }
};

function App() {
   const [name, setName] = useState('');
   const [list, setList] = useState(getLocalStorage());
   //  What to do when is editing
   const [isEditing, setEditing] = useState(false);
   // checking if the person is in edit mode
   const [editID, setEditID] = useState(null);
   //  inside useState is object
   const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

   //  after submitting
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('hello');
      // check if name is empty or not
      if (!name) {
         // name is empty display alert
         showAlert(true, 'danger', 'please enter a name');
      } else if (name && isEditing) {
         setList(
            list.map((item) => {
               if (item.id === editID) {
                  return { ...item, title: name };
               }
               return item;
            })
         );
         setName('');
         setEditID(null);
         setEditing(false);
         showAlert(true, 'success', 'item changed');
         //deal while is editing
      } else {
         // show alert add to item + setID
         showAlert(true, 'success', 'Item added successfully');
         // title:name = name that they entered in the value below
         const newItem = { id: new Date().getTime().toString(), title: name };
         setList([...list, newItem]);
         setName('');
      }
   };

   const showAlert = (show = false, type = '', msg = '') => {
      setAlert({ show, type, msg });
   };
   //  for clearing llist
   const clearList = () => {
      showAlert(true, 'danger', 'empty list ');

      setList([]);
   };
   const removeItem = (id) => {
      showAlert(true, 'danger', 'item removed');
      // return item that didn't match the currrent id
      setList(list.filter((item) => item.id !== id));
   };
   const editItem = (id) => {
      const specificItem = list.find((item) => item.id === id);
      setEditing(true);
      setEditID(id);
      //specificItem.title = the item they selected .title is the item inside the object, pass in setName which goes inside the input to edit the item
      setName(specificItem.title);
   };

   useEffect(() => {
      localStorage.setItem('list', JSON.stringify(list));
   }, [list]);

   return (
      <section className="section-center">
         <form className="grocery-form" onSubmit={handleSubmit}>
            {/* check alert {show} if true= diplay alert */}
            {alert.show && (
               <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            {/* Input section */}
            <h3>Trader Codes</h3>
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
                  {isEditing ? 'Edit' : 'Submit'}
               </button>
            </div>
         </form>
         {/* Only show container if list is not empty */}
         {list.length > 0 && (
            <div className="grocery-container">
               <List items={list} removeItem={removeItem} editItem={editItem} />
               <button className="clear-btn" onClick={clearList}>
                  Clear item
               </button>
            </div>
         )}
      </section>
   );
}

export default App;
