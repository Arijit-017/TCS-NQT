export default function QuestionCard({ q, solved, toggle }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 
      ${solved ? "bg-green-50 border-green-400" : "bg-white border-gray-200"}
      hover:shadow-md`}
    >
      {/* Big Checkbox */}
      <input
        type="checkbox"
        checked={solved}
        onChange={() => toggle(q.id)}
        className="w-6 h-6 accent-green-500 cursor-pointer"
      />

      {/* Question Title */}
      <a
        href={q.link}
        target="_blank"
        rel="noreferrer"
        className={`flex-1 font-medium text-lg transition-colors
        ${solved ? "text-green-700 line-through" : "text-blue-600 hover:text-blue-800"}
        `}
      >
        {q.title}
      </a>

      {/* Status Badge */}
      <span
        className={`text-sm px-3 py-1 rounded-full font-semibold
        ${solved ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}
        `}
      >
        {solved ? "Solved" : "Pending"}
      </span>
    </div>
  );
}