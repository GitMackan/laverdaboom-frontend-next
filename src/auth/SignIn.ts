import { supabase } from "@/utils/supabase"

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error)
  } else {
    console.log("Logged in:", data)
  }
}