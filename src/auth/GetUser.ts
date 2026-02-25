import { supabase } from "@/utils/supabase"

const getUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data.user
}