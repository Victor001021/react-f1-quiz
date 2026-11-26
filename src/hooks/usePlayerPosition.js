import { useQuery } from "@tanstack/react-query";
import { getPlayerPosition } from "../services/apiRanking";

export function usePlayerPosition(id) {
  const { data, isPending, error } = useQuery({
    queryKey: ["playerPosition", id],
    queryFn: () => getPlayerPosition(id),
    enabled: !!id,
  });

  return { data, isPending, error };
}
