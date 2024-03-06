import { supabase } from '../lib/supbase';

export const User = async () => {
   const { data: { user } } = await supabase.auth.getUser();

   const { data, error, status } = await supabase
   .from('profiles')
   .select(`username, website`)
   .eq('id', user.id)
   .single()

   if (error && status !== 406) {
      throw error
   }

   const profileData = {
      username: data.username,
      website: data.website,
      id: user.id
   }

   return profileData;
}