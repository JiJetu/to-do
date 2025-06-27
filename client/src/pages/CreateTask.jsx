import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const from = e.target;
    const taskTitle = from.task_title.value;
    const email = from.email.value;
    const dateline = startDate;
    if (startDate < new Date()) return toast.error("Select right date");
    const category = from.category.value;
    const location = from.location.value;
    const reward = parseFloat(from.reward.value);
    const description = from.description.value;

    const taskData = {
      taskTitle,
      description,
      dateline,
      location,
      category,
      reward,
      postedBy: {
        name: user?.displayName,
        email,
        photo: user?.photoURL,
      },
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/task`, taskData);

      from.reset();
      setStartDate(new Date());
      toast.success("Task created successfully");
      navigate("/my-tasks");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12 dark:bg-black">
      <section className="p-2 md:p-6 mx-auto bg-white  rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Post a Task
        </h2>

        <form onSubmit={handleCreateTask}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="task_title">
                Task Title
              </label>
              <input
                id="task_title"
                name="task_title"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700  bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              <DatePicker
                className="border p-2 rounder w-full"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="border p-2 rounded-md"
              >
                <option value="Delivery">Delivery</option>
                <option value="Errands">Errands</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Pet Care">Pet Care</option>
                <option value="Tech Support">Tech Support</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Tutoring">Tutoring</option>
                <option value="Home Repair">Home Repair</option>
                <option value="Gardening">Gardening</option>
                <option value="Event Help">Event Help</option>
                <option value="Marketing">Marketing</option>
                <option value="Remote Jobs">Remote Jobs</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="reward">
                Reward
              </label>
              <input
                id="reward"
                name="reward"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateTask;
