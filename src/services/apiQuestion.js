import supabase from "./supabase";

export async function getQuestions() {
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*");

  if (error) throw new Error("Questions could not be loaded");

  return questions;
}
