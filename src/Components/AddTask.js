// Created a form UI while clicking the add task button. And we will be storing the data from the form to the firebase
// collection using addDoc method. ONceits stored we need to store it in state variable to access it(it done in useEffect() in taskManager.js)
import { useState } from "react";
import "../CSS/addTask.css";
import Modal from "./Modal";
import {db} from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
function AddTask({onClose, open}){
    const  [title, setTitle]= useState("");
    const [description, setDescription]=useState("");
    //As we rae using await, we make the function as async function.
    const handleSubmit = async (e) =>{
        e.preventDefault();
        // create operation for db is done here. Created a collection of d  ocumnet for firebase.
        // Whenever, we add a task in the form, that will be stores as a colllection in DB here.Then need to
        // pass this collection to display in UI.
        try{
            await addDoc(collection(db, 'tasks'), {
                title: title,
                description: description,
                completed: false,
                created: Timestamp.now()
            })
        }catch(error){
            alert(error);
        }
        onClose();
    }
    return(
        // This way of getting the props from parent and sending it to the sub child is called props drill.
        <Modal modalLable="Add Task" onClose={onClose} open={open}>
            <form className="addTask" name="addTask" onSubmit={handleSubmit}>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value.toUpperCase())} value={title} placeholder="Enter task title"/>
                <textarea placeholder= "Enter the description" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                <button type="submit">Done</button>
            </form>
        </Modal>
    )
}

export default AddTask;