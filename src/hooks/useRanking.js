import { useMutation } from "@tanstack/react-query";
import { setRanking } from "../services/apiRanking";

export function useRanking() {
  const { mutate: setPlayerRanking, isPending } = useMutation({
    mutationFn: setRanking,
    onSuccess: (data) => {
      console.log("ID:", data.id);

      localStorage.setItem("rankingId", data.id);
    },
  });

  return { setPlayerRanking, isPending };
}
