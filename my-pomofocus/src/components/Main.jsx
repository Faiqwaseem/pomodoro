import React, { useState, useEffect, useRef } from 'react'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
const Main = () => {
    const [modes, setModes] = useState(0);
    const [session, setSession] = useState("WORK SESSION");
    const [timeLeft, setTimeLeft] = useState(modes * 60);
    const [modalAddTask, setModalAddTask] = useState(false)
    const [isRunning, setIsRunning] = useState(null);
    const [taskName, setTaskName] = useState("")
    const [isActive, setIsActive] = useState("")
    const [task, setTask] = useState(() => {
        const saved = localStorage.getItem("task");
        return saved ? JSON.parse(saved) : [];
    });




    const audioRef = useRef(new Audio('/ding.mp3'));
    audioRef.current.volume = 1;
    useEffect(() => {
        setTimeLeft(modes * 60)
        const savedLocal = localStorage.setItem('task', JSON.stringify(task));
        console.log(savedLocal)
    }, [modes, task])

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        setIsRunning(false);
                        alert("Time's up!");
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);


    useEffect(() => {

        if (timeLeft <= 0 && isActive === 'pomo' && isRunning) {
            setIsRunning(false);
            shortBreak()
            audioRef.current.play();

        } else if (timeLeft <= 0 && isActive === 'shortBreak' && isRunning) {
            setIsRunning(false);
            pomo()
            audioRef.current.play();
        }

    }, [timeLeft, isRunning, isActive]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    console.log(timeLeft)
    function pomo() {
        setModes(1)
        setSession("WORK SESSION")
        setIsActive('pomo')

    }

    function shortBreak() {
        setModes(1)
        setSession("BREAK SESSION")
        setIsActive('shortBreak')
    }


    function longBreak() {
        setModes(30)
        setSession("LONG BREAK SESSION")
        setIsActive('longBreak')
    }
 const handleSaveTask = () => {
        if (!taskName) {
            return;
        }
        else if (taskName.trim() !== "") {
            const newTask = {
                id: Date.now(),
                name: taskName,
                complete: false
            }
            const newtasks = [...task, newTask]
            setTask(newtasks)
            setTaskName("")
            setModalAddTask(false)
        }


    }

     

    const handleDelete = (index) => {
        const newtasks = [...task];
        newtasks.splice(index, 1);
         setTask(newtasks)
    }



    function handleStart() {

        if (timeLeft > 0) setIsRunning(true);
    }
    function handleReset() {

        setIsRunning(false);
        setTimeLeft(modes * 60)

    }


   


    return (

        <main className="container" role="main">
            {/* Left: Timer + Controls */}
            <section className="card timer-card" aria-labelledby="timer-heading">
                <h2
                    id="timer-heading"
                    style={{
                        margin: 0,
                        fontSize: "16px",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: ".6px",
                    }}
                >
                    Timer
                </h2>

                <div className="modes" role="tablist" aria-label="Timer modes">
                    <button onClick={pomo} className={`tab ${isActive === 'pomo' ? 'active' : ""}`}>
                        Pomodoro
                    </button>
                    <button onClick={shortBreak} className={`tab ${isActive === 'shortBreak' ? 'active' : ""}`}>
                        Short Break
                    </button>
                    <button onClick={longBreak} className={`tab ${isActive === 'longBreak' ? 'active' : ""}`}>
                        Long Break
                    </button>
                </div>

                <div
                    className="dial"
                    aria-live="polite"
                    aria-label="Time remaining 25 minutes"
                >
                    <div style={{ textAlign: "center" }}>
                        <div className="time">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                        <div className="sub">{session}</div>
                    </div>
                </div>

                <div className="taskbar">


                    <div className="controls">
                        <button onClick={handleStart} className="btn" aria-label="Start timer">
                            Start
                        </button>
                        <button onClick={handleReset} className="btn alt" aria-label="Reset timer">
                            Reset
                        </button>
                    </div>
                </div>
            </section>

            {/* Right: Tasks */}
            <aside className="card tasks" aria-labelledby="tasks-heading">


                <h3 id="tasks-heading">Tasks</h3>
                {modalAddTask ?


                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Add New Task</h3>

                            <div
                                className="input"
                                role="group"
                                aria-label="What are you working on?"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M5 12h14M5 6h14M5 18h14"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="What are you working on?"
                                    aria-label="Task name"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                />
                            </div>

                            <div className="modal-actions">
                                <button className="btn"
                                    onClick={handleSaveTask}
                                >

                                    Save
                                </button>
                                <button
                                    className="btn alt"
                                    onClick={() => setModalAddTask(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                    :
                    <div className="add" role="button" tabIndex={0} aria-label="Add a task"
                        onClick={() => setModalAddTask(true)}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 5v14M5 12h14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span>
                            <b>Add Task</b> — quick capture
                        </span>
                    </div>

                }

                {task.length == 0 ? <p className="no-task">No tasks added yet.</p>
                    :

                    task.slice(0, 3).map((task, index) => (<article className="task">
                        <div className="task-row" >

                            <input type="checkbox" id={task.id} />
                            <label className="task-title" htmlFor="t1">
                                {task.name}
                            </label>

                            <span className="task-meta">2/4  <span className='delete'><MdDeleteForever onClick={() => handleDelete(index)} /></span></span>

                        </div>
                        <div>

                        </div>
                    </article>
                    ))
                }

                <div className="stats" aria-label="Today stats">
                    <div className="stat">
                        <div className="v">03</div>
                        <div className="k">Pomodoros</div>
                    </div>
                    <div className="stat">
                        <div className="v">01:15</div>
                        <div className="k">Focus Time</div>
                    </div>
                    <div className="stat">
                        <div className="v">2</div>
                        <div className="k">Tasks Done</div>
                    </div>
                </div>
            </aside>
        </main >

    )
}

export default Main