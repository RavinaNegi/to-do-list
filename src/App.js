import React from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import "./index.css"; // Ensure styling is applied

import Auth from "./components/Auth";
import Weather from "./components/Weather";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Provider store={store}>
      <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <h1 className="text-2xl text-center font-extrabold text-gray-800 mb-6">
          📝 To-Do List
        </h1>
        <Auth />
        {isAuthenticated && (
          <>
            <div className="mb-4">
              <Weather />
            </div>
            <TaskInput />
            <TaskList />
          </>
        )}
      </div>
    </Provider>
  );
};

export default App;
