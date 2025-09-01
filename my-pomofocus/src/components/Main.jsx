import React, { useState, useEffect } from 'react'


const Main = () => {
    const [modes, setModes] = useState(25);
    const [session, setSession] = useState("WORK SESSION");
    const [timeLeft, setTimeLeft] = useState(modes * 60);
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        setTimeLeft(modes * 60)
    }, [modes])

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

        if (timeLeft <= 0 && isRunning) {
            setIsRunning(false);

        }
    }, [timeLeft, isRunning]);



    function pomo() {
        setModes(1)
        setSession("WORK SESSION")
        setIsRunning(false);
    }

    function ShortBreak() {
        setModes(1)
        setSession("BREAK SESSION")
        setIsRunning(false)
    }


    function longBreak() {
        setModes(30)
        setSession("LONG BREAK SESSION")
        setIsRunning(false);
    }





    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    console.log("minutes", minutes, "seconds", seconds)




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
                    <button onClick={pomo} className="tab active" role="tab" aria-selected="true">
                        Pomodoro
                    </button>
                    <button onClick={ShortBreak} className="tab" role="tab" aria-selected="false">
                        Short Break
                    </button>
                    <button onClick={longBreak} className="tab" role="tab" aria-selected="false">
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
                    <div className="input" role="group" aria-label="What are you working on?">
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
                            placeholder="What are you working on? (UI only)"
                            aria-label="Task name"
                        />
                    </div>

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

                <div className="add" role="button" tabIndex={0} aria-label="Add a task">
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

                <article className="task">
                    <div className="task-row">
                        <input type="checkbox" id="t1" />
                        <label className="task-title" htmlFor="t1">
                            Design landing header
                        </label>
                        <span className="task-meta">2/4</span>
                    </div>
                    <div className="progress" aria-hidden="true">
                        <span></span>
                    </div>
                </article>

                <article className="task">
                    <div className="task-row">
                        <input type="checkbox" id="t2" />
                        <label className="task-title" htmlFor="t2">
                            Write copy for features
                        </label>
                        <span className="task-meta">1/4</span>
                    </div>
                    <div className="progress" aria-hidden="true">
                        <span style={{ width: "25%" }}></span>
                    </div>
                </article>

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
        </main>

    )
}

export default Main