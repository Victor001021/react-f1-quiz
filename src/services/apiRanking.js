import supabase from "./supabase";

export async function setRanking(newPlayer) {
  const { data, error } = await supabase
    .from("ranking")
    .insert(newPlayer)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getRanking() {
  const { data: ranking, error } = await supabase
    .from("ranking")
    .select("*")
    .order("points", { ascending: false });

  if (error) throw new Error(error.message);

  return ranking;
}

export async function getPlayerPosition(id) {
  // Busca o jogador
  const { data: player, error } = await supabase
    .from("ranking")
    .select("id, playerName, points, created_at")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  // Busca jogadores com pontuação maior
  const { count: higherPoints, error: errorPoints } = await supabase
    .from("ranking")
    .select("*", { count: "exact", head: true })
    .gt("points", player.points);

  if (errorPoints) throw new Error(errorPoints.message);

  // Busca jogadores com mesma pontuação cadastrados antes
  const { count: earlierPlayers, error: errorDate } = await supabase
    .from("ranking")
    .select("*", { count: "exact", head: true })
    .eq("points", player.points)
    .lt("created_at", player.created_at);

  if (errorDate) throw new Error(errorDate.message);

  return {
    ...player,
    position: higherPoints + earlierPlayers + 1,
  };
}
