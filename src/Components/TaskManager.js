import "../CSS/taskManager.css";
import { useState, useEffect } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import {db} from "../firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function TaskManager(){

    const [openAddModel, setOpenAddModel] = useState(false);
    const [tasks,setTasks] = useState([]);
    // After storing the data in db, we need to store it in our state variable to access it. 
    // We use useEffect to do this process,as it triggers imediately our component renders.
    useEffect(() => {
        // query method is used to get the access of the collection.second parameter is query restrictions(how to return the value).
        const taskColRef = query(collection(db, 'tasks'), orderBy("created","desc"));
        // onSnapShot() is used to get all the documents stored in the collection.
        onSnapshot(taskColRef, (snapshot) =>{
            console.log(snapshot.docs);
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });
    }, []);
    console.log(tasks);
    return(
        <div className="taskManager">
            <header>Task Manager Component</header>
            <div className="taskManager__container">
                {/* while clicking this button, the openAddModal state variable changed top true and the form opens.*/}
                <button onClick={()=> {setOpenAddModel(true)}}>Add task +</button>
                <div className="taskManager__tasks">
                    {tasks.map((task)=> (
                        <Task 
                        key={task.id}
                        id={task.id}
                        title={task.data.title}
                        description={task.data.description}
                        completed={task.data.completed}/>
                    ))}
                </div>
            </div>
             {/* When the openAddModel is true AddTask Component will rendered. This is conditional rendering. */}
            {openAddModel && (<AddTask onClose={()=> setOpenAddModel(false)} open={openAddModel}/>)}
        </div>
    );
}

export default TaskManager;