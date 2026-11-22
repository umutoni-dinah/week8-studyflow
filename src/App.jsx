import { Link, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import SiteLayout from "./layouts/SiteLayout.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { initialTasks } from "./data/initialTasks.js";
import TasksPage from "./pages/TasksPage.jsx";
import FocusPage from "./pages/FocusPage.jsx";
import SettingsPage from './pages/SettingsPage.jsx'

function TasksPlaceholder() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Tasks</h1>
      <p className="mt-2 text-slate-600">We’ll build task management next.</p>
    </section>
  );
}

function FocusPlaceholder() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Focus</h1>
      <p className="mt-2 text-slate-600">We’ll build the focus timer soon.</p>
    </section>
  );
}

function SettingsPlaceholder() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-slate-600">We’ll build your preferences soon.</p>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link className="mt-4 inline-block text-blue-700 underline" to="/">
        Return to Dashboard
      </Link>
    </section>
  );
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage("studyflow-tasks", initialTasks);

  function addTask(taskDetails) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { ...taskDetails, id: crypto.randomUUID(), completed: false },
    ]);
  }

  function updateTask(updatedTask) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<DashboardPage tasks={tasks} />} />
        <Route
          path="/tasks"
          element={
            <TasksPage
              tasks={tasks}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
            />
          }
        />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
