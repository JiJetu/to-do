import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import axios from "axios";

const TaskDetails = () => {
  const navigate = useNavigate();
  const task = useLoaderData();
  const { user } = useAuth();
  const {
    _id,
    taskTitle,
    description,
    dateline,
    reward,
    category,
    postedBy,
    bidCount,
    location,
  } = task || {};

  const [startDate, setStartDate] = useState(new Date(dateline));

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (user?.email === postedBy?.email)
      return toast.error("You cannot bid on your own task!");

    const form = e.target;
    const price = parseFloat(form.price.value);
    const comment = form.comment.value;

    if (price < reward) {
      return toast.error("Offer should be equal to or higher than the reward!");
    }

    const bidData = {
      taskId: _id,
      taskTitle,
      category,
      comment,
      price,
      deadline: startDate,
      bidRequestEmail: user?.email,
      buyer_email: postedBy?.email,
      buyer: postedBy,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bid`, bidData);
      toast.success("Bid placed successfully!");
      form.reset();
      navigate("/my-bids");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place bid");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-6 items-start min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto p-4">
      {/* Task Details */}
      <div className="flex-1 px-4 py-6 bg-white dark:bg-gray-900 rounded-md shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-light text-gray-700 dark:text-gray-200">
            Deadline: {new Date(dateline).toLocaleDateString()}
          </span>
          <span className="px-4 py-1 text-xs uppercase bg-purple-200 text-purple-800 rounded-full">
            {category}
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          {taskTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4 break-all">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 mb-3">
            <img
              src={postedBy?.photo}
              alt="Buyer"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <p className="text-sm text-gray-800 dark:text-gray-100">
                Name: {postedBy?.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Email: {postedBy?.email}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-100">
            Number of Bid:{" "}
            <span className="text-purple-600 dark:text-purple-400 font-bold">
              {bidCount > 0 ? bidCount : 0}
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="mt-2 font-bold text-gray-700 dark:text-gray-100">
            Reward:{" "}
            <span className="text-purple-600 dark:text-purple-400">
              ${reward}
            </span>
          </p>
          <p className="mt-2 font-bold text-gray-700 dark:text-gray-100">
            Location:{" "}
            <span className="text-purple-600 dark:text-purple-400">
              ${location}
            </span>
          </p>
        </div>
      </div>

      {/* Place a Bid */}
      {user?.email !== postedBy?.email && (
        <div className="flex-1 bg-white dark:bg-gray-900 px-6 py-5 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Place a Bid
          </h2>
          <form onSubmit={handleBidSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  min={reward}
                  required
                  className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  disabled
                  className="w-full mt-1 p-2 border rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Comment
                </label>
                <textarea
                  name="comment"
                  rows="3"
                  className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                ></textarea>
              </div>
              <div className="col-span-2 space-x-4">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Your Deadline
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
              >
                Submit Bid
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
