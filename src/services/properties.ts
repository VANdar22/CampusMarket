import { supabase } from "@/lib/supabase";

export async function getProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}