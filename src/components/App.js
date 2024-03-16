import React from "react";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./TodoList";
import "../styles/style.css";

const App = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <PomodoroTimer />
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
};

export default App;

// const App = () => {
//   return (
//     <div className="h-screen bg-gray-100">
//       <div className="grid grid-cols-2 h-screen">
//         <div className="flex flex-col h-full bg-white">
//           <PomodoroTimer />
//         </div>
//         <div className="flex flex-col h-full bg-white">
//           <TodoList />
//         </div>
//       </div>
//     </div>
//   );
// };
