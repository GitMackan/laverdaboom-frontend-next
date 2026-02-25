import { supabase } from "@/utils/supabase"

const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error(error)
  } else {
    console.log("User created:", data)
  }
}