import { useState } from "react";
import QuestionCard from "./QuestionCard";

export default function DaySection({ day, questions, solved, toggle }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border rounded-xl bg-white shadow-sm">

      {/* Day Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50"
      >
        <h2 className="text-lg font-bold">
          Day {day}
        </h2>

        {/* Arrow Icon */}
        <span
          className={`text-xl transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {/* Questions Dropdown */}
      {open && (
        <div className="p-4 border-t space-y-3">
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              q={q}
              solved={solved.includes(q.id)}
              toggle={toggle}
            />
          ))}
        </div>
      )}

    </div>
  );
}