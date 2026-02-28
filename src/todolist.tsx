import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";
import GlareHover from "./GlareHover";
import GlassSurface from "./GlassSurface";
import LightRays from "./LightRays";

type Task = {
  id: number;
  text: string;
};

type TaskRowProps = {
  task: Task;
  isFirst: boolean;
  isLast: boolean;
  onDelete: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
};

const TaskRow = memo(function TaskRow({
  task,
  isFirst,
  isLast,
  onDelete,
  onMoveUp,
  onMoveDown,
}: TaskRowProps) {
  return (
    <li className="item">
      <SplitText
        text={task.text}
        className="item_text"
        delay={22}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 18 }}
        to={{ opacity: 1, y: 0 }}
        textAlign="left"
        tag="span"
      />

      <div className="item_actions">
        <button type="button" className="btn" onClick={() => onDelete(task.id)}>
          <GlareHover
            width="100%"
            height="100%"
            background="transparent"
            borderRadius="8px"
            borderColor="transparent"
            glareColor="#ffffff"
            glareOpacity={0.4}
            glareAngle={-30}
            glareSize={280}
            transitionDuration={1000}
            className="btn_glare"
          >
            Delete
          </GlareHover>
        </button>
        <button type="button" className="btn" onClick={() => onMoveUp(task.id)} disabled={isFirst}>
          <GlareHover
            width="100%"
            height="100%"
            background="transparent"
            borderRadius="8px"
            borderColor="transparent"
            glareColor="#ffffff"
            glareOpacity={0.4}
            glareAngle={-30}
            glareSize={280}
            transitionDuration={1000}
            className="btn_glare"
          >
            Up
          </GlareHover>
        </button>
        <button type="button" className="btn" onClick={() => onMoveDown(task.id)} disabled={isLast}>
          <GlareHover
            width="100%"
            height="100%"
            background="transparent"
            borderRadius="8px"
            borderColor="transparent"
            glareColor="#ffffff"
            glareOpacity={0.4}
            glareAngle={-30}
            glareSize={280}
            transitionDuration={1000}
            className="btn_glare"
          >
            Down
          </GlareHover>
        </button>
      </div>
    </li>
  );
});

function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [followMouse, setFollowMouse] = useState(false);
  const nextIdRef = useRef(1);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFollowMouse(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  }, []);

  const addTask = useCallback(() => {
    const value = newTask.trim();
    if (!value) return;

    setTasks((prev) => [...prev, { id: nextIdRef.current++, text: value }]);
    setNewTask("");
  }, [newTask]);

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const moveTaskUp = useCallback((id: number) => {
    setTasks((prev) => {
      const index = prev.findIndex((task) => task.id === id);
      if (index <= 0) return prev;

      const updated = [...prev];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      return updated;
    });
  }, []);

  const moveTaskDown = useCallback((id: number) => {
    setTasks((prev) => {
      const index = prev.findIndex((task) => task.id === id);
      if (index < 0 || index >= prev.length - 1) return prev;

      const updated = [...prev];
      [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
      return updated;
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addTask();
    },
    [addTask]
  );

  return (
    <div className="page">
      <div className="rays_layer" aria-hidden="true">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.55}
          lightSpread={0.42}
          rayLength={2.2}
          followMouse={followMouse}
          mouseInfluence={0.06}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={0.85}
          saturation={1}
        />
      </div>
      <main className="board">
        <header className="board_header">
          <h1 className="title" aria-label="Task List">
            <span className="title_first">T△SK</span>
            <span className="title_second">LIST</span>
          </h1>
        </header>

        <GlassSurface
          className="list_wrap list_wrap_glass"
          width={1151}
          height={642}
          borderRadius={16}
          borderWidth={0.05}
          brightness={48}
          opacity={0.9}
          blur={9}
          displace={0.08}
          backgroundOpacity={0.1}
          saturation={1.06}
          distortionScale={-120}
          redOffset={0}
          greenOffset={5}
          blueOffset={10}
          mixBlendMode="screen"
        >
          <section className="list_inner">
            <form className="composer" onSubmit={handleSubmit}>
              <input
                className="composer_input"
                type="text"
                placeholder="Type task and press Enter"
                value={newTask}
                onChange={handleInputChange}
              />
            </form>

            <ol className="list">
              {tasks.length === 0 ? (
                <li className="empty">List of task shown here</li>
              ) : (
                tasks.map((task, index) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    isFirst={index === 0}
                    isLast={index === tasks.length - 1}
                    onDelete={deleteTask}
                    onMoveUp={moveTaskUp}
                    onMoveDown={moveTaskDown}
                  />
                ))
              )}
            </ol>
          </section>
        </GlassSurface>
      </main>
    </div>
  );
}

export default ToDoList;
