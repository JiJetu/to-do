import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { _id, taskTitle, description, location, reward, category, dateline } =
    task || {};

  return (
    <Link
      to={`/task/${_id}`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800 ">
          Deadline: {new Date(dateline).toLocaleDateString()}
        </span>
        <span className="px-3 py-1 text-[8px] text-white uppercase bg-purple-600 rounded-full ">
          {category}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
          {taskTitle}
        </h1>

        <p title={description} className="mt-2 text-sm text-gray-600 ">
          {description.substring(0, 70)}...
        </p>
        <div className="flex justify-between items-center">
          <p className="mt-2 text-sm font-bold text-gray-600 ">
            Reward: ${reward}
          </p>
          <p className="mt-2 text-sm text-gray-600 ">Location: ${location}</p>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
