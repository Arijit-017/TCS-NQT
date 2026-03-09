import { useState, useEffect } from "react";
import { addQuestion } from "../services/questionService";
import { getAllUsers } from "../services/userService";
import Header from "../components/Header";
import { auth } from "../firebase/firebase";

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [day, setDay] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  const add = async () => {
    await addQuestion(title, link, day);

    setTitle("");
    setLink("");
    setDay("");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={auth.currentUser} />

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-bold mb-3">Add Question</h3>

          <div className="flex gap-2">
            <input
              placeholder="Day"
              className="border p-2"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />

            <input
              placeholder="Title"
              className="border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Link"
              className="border p-2 flex-1"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <button
              onClick={add}
              className="bg-indigo-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-3">Users</h3>

          <div className="space-y-3">
            {users.map((u) => {
              const solvedCount = u.solvedProblems?.length || 0;

              return (
                <div
                  key={u.id}
                  className="flex justify-between items-center border p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {u.name || "No Name"}
                    </p>

                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>

                  <div className="text-sm font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    {solvedCount} Solved
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
