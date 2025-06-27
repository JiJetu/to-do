import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MyBids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);

  const getTasks = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/bid/${user?.email}`
    );

    setBids(data);
  };

  useEffect(() => {
    getTasks();
  }, [user]);

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          My Posted Bids
        </h2>

        <span className="px-3 py-1 text-xs text-white bg-purple-600 rounded-full">
          {bids.length} Bids
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                      Title
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Deadline
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Reward
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Category
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Description
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Edit
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {bids.map((task) => (
                    <tr key={task._id}>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {task.taskTitle}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(task.dateline).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        ${task.reward}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <span className="px-3 py-1 text-xs rounded-full text-white bg-blue-500">
                          {task.category}
                        </span>
                      </td>

                      <td
                        title={task.description}
                        className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                      >
                        {task.description.substring(0, 18)}...
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            // onClick={() => handleDelete(task._id)}
                            className="text-gray-500 transition-colors duration-200 hover:text-red-500"
                          >
                            🗑
                          </button>

                          <Link
                            to={`/update/${task._id}`}
                            className="text-gray-500 transition-colors duration-200 hover:text-yellow-500"
                          >
                            ✏️
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBids;
