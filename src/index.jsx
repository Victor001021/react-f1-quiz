import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuestionProvider } from "./context/QuestionsContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuestionProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QuestionProvider>
    </QueryClientProvider>
  </StrictMode>,
);
