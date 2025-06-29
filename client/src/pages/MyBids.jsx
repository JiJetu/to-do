import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { bidStatus } from "../constand";
import toast from "react-hot-toast";

const MyBids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);

  const getTasks = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/my-bids/${user?.email}`
    );

    setBids(data);
  };

  useEffect(() => {
    getTasks();
  }, [user]);

  const handleStatus = async (id, status) => {
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}/bid/${id}`,
        { status }
      );

      toast.success(`Task is completed successfully`);
      getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong", error?.message);
    }
  };

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
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {bids.map((bid) => (
                    <tr key={bid._id}>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {bid.taskTitle}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(bid.dateline).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        ${bid.price}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <span className="px-3 py-1 text-xs rounded-full text-white bg-blue-500">
                          {bid.category}
                        </span>
                      </td>

                      <td
                        title={bid?.comment}
                        className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                      >
                        {bid?.comment.substring(0, 18)}...
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {bid.status === bidStatus.In_Process && (
                          <div className="flex items-center gap-x-6">
                            <button
                              disabled={bid.status !== bidStatus.In_Process}
                              onClick={() =>
                                handleStatus(bid._id, bidStatus.Completed)
                              }
                              className="text-gray-500 transition-colors duration-200 hover:text-red-500"
                            >
                              🛒
                            </button>
                          </div>
                        )}
                        {bid.status === bidStatus.Completed && (
                          <div className="flex items-center gap-x-6">
                            <button
                              disabled={bid.status !== bidStatus.Pending}
                              className="text-gray-500 transition-colors duration-200 hover:text-red-500"
                            >
                              completed
                            </button>
                          </div>
                        )}
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
