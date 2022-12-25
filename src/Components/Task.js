// 

import { useState } from "react";
import "../CSS/task.css";
import EditTask from "./EditTask";
import TaskItem from "./TaskItem";
import {db} from "../firebase/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

function Task({id, title, description, completed}){

    const [checked, setChecked] = useState(completed);
    const [open, setOpen] = useState({ edit: false, view: false});

    const handleDelete = async() => {
        const taskDocRef = doc(db, "tasks", id);
        try{
            await deleteDoc(taskDocRef);
        }catch(error){ 
            alert(error);
        }
    };
    const handleChange= async()=>{
        const taskDocRef = doc(db, "tasks", id);
        try{
            // we are going to update the completed propery value. thus when we clicking on check box the competed property changed to false.
            await updateDoc(taskDocRef, {completed: checked});
        }catch(error){
            alert(error);
        }
    }
    const handleClose =() => {
        setOpen({edit: false, view: false})
    };
    return(
        // If the checked variable is false, the className is only task, if its true the className is 
        //task task--borderColor, thus the styles in task-borderColor class is applied. 
        <div className={`task ${checked && "task--borderColor"}`}>
            <div>
                <input id={`checkbox-${id}`} className="checkbox-custom" name="checkbox" checked={checked} 
                    onChange={handleChange} type="checkbox"/>
                <label htmlFor={`checkbox-${id}`} className="checkbox-custom-label" onClick={()=> setChecked(!checked)}></label>
            </div> 
            <div className="task__body">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="task__buttons">
                <div className="task__deleteNedit">
                    <button className="task__editButton"
                    onClick={()=> setOpen({
                        ...open, edit: true
                    })}>Edit</button>
                    <button className="task__deleteButton"
                    onClick={handleDelete}>Delete</button>
                </div>
                <button
                onClick={()=> setOpen({
                    ...open, view: true
                })}>View</button>
            </div>  
            </div>
            {/* On Clicking view button, taskItem component renders and clicking on edit button, editTask component renders.*/}
            {open.view && (<TaskItem onClose={handleClose} title={title} description={description} open={open.view}/>)}
            {open.edit && (<EditTask onClose={handleClose} toEditTitle={title} toEditDescription={description} open={open.edit} id={id}/>)}
        </div>
    )
}

export default Task;