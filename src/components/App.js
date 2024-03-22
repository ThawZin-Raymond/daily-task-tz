import React from "react";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./TodoList";
import Footer from "./Footer"; // Make sure to import the Footer component
import "../styles/style.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <PomodoroTimer />
          </div>
          <div>
            <TodoList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
