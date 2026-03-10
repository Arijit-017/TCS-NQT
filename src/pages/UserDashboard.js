import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { getUserData, updateSolvedProblems } from "../services/userService";
import { listenQuestionsRealtime } from "../services/questionService";
import DaySection from "../components/DaySection";
import Header from "../components/Header";

export default function UserDashboard() {

  const [questions, setQuestions] = useState([]);
  const [solved, setSolved] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUser = async () => {

      if (!auth.currentUser) return;

      const data = await getUserData(auth.currentUser.uid);

      setUserData(data);
      setSolved(data?.solvedProblems || []);
      setLoading(false);

    };

    loadUser();

  }, []);

  useEffect(() => {

    const unsub = listenQuestionsRealtime((data) => {
      setQuestions(data);
    });

    return () => unsub();

  }, []);

  const toggle = async (id) => {

    if (!auth.currentUser) return;

    let updated;

    if (solved.includes(id)) {
      updated = solved.filter((x) => x !== id);
    } else {
      updated = [...solved, id];
    }

    setSolved(updated);

    try {
      await updateSolvedProblems(auth.currentUser.uid, updated);
    } catch (err) {
      console.error("Error updating solved problems:", err);
    }

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (

    <div className="bg-gray-100 min-h-screen">

      <Header name={userData?.name} />

      <div className="max-w-4xl mx-auto p-6">

        <h2 className="text-xl font-bold mb-2">
          Welcome {userData?.name}
        </h2>

        <h3 className="text-lg font-semibold mb-6">
          Solved {solved.length} / {questions.length}
        </h3>

        {Array.from({ length: 30 }, (_, i) => {

          const day = i + 1;

          const dayQ = questions.filter((q) => Number(q.day) === day);

          if (dayQ.length === 0) return null;

          return (
            <DaySection
              key={day}
              day={day}
              questions={dayQ}
              solved={solved}
              toggle={toggle}
            />
          );

        })}

      </div>

    </div>

  );
}