import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  const getTask = async () => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/tasks`);

      setTasks(data);
    } catch (error) {}
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="py-5 dark:bg-black container mx-auto">
      <h1 className="text-5xl text-center dark:text-white">
        All{" "}
        <span className="bg-gradient-to-r from-red-600 via-blue-500 to-purple-600 text-transparent bg-clip-text bg-300% animate-gradient">
          ToDos
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 md:mt-8">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Task;
