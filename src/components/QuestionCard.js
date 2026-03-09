export default function QuestionCard({q,solved,toggle}){

 return(

 <div className="flex justify-between items-center border p-3 rounded bg-white shadow">

   <a
     href={q.link}
     target="_blank"
     rel="noreferrer"
     className="text-blue-600 font-medium"
   >
     {q.title}
   </a>

   <input
     type="checkbox"
     checked={solved}
     onChange={()=>toggle(q.id)}
   />

 </div>

 )
}