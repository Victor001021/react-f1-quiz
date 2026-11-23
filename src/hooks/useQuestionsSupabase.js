import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../services/apiQuestion";

export function useQuestionsSupabase() {
  const { data, isPending } = useQuery({
    queryFn: getQuestions,
    queryKey: ["questions"],
  });

  return { data, isPending };
}
