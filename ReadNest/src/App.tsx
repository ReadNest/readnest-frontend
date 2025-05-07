import { toast, Toaster } from "sonner";
import "./App.css";

function App() {
  return (
    <>
      <div className="text-2xl font-semibold text-gray-600 p-4">
        Hello from Tailwind + TypeScript!
      </div>
      <Toaster position="top-right" duration={4000} />
    </>
  );
}

export default App;
