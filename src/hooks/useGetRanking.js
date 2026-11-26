import { useQuery } from "@tanstack/react-query";
import { getRanking } from "../services/apiRanking";

export function useGetRanking() {
  const { data: ranking, isPending } = useQuery({
    queryFn: getRanking,
    queryKey: ["ranking"],
  });

  return { ranking, isPending };
}
