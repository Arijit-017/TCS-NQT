import QuestionCard from "./QuestionCard";

export default function DaySection({day,questions,solved,toggle}){

 return(

 <div className="mb-6">

   <h2 className="text-lg font-bold mb-2">
     Day {day}
   </h2>

   <div className="space-y-2">

     {questions.map(q=>(
       <QuestionCard
         key={q.id}
         q={q}
         solved={solved.includes(q.id)}
         toggle={toggle}
       />
     ))}

   </div>

 </div>

 )
}