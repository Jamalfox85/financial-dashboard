import { supabase } from "./supabase";

export let sessionDetails: any = {};
supabase.auth.getSession().then(({ data }) => {
  sessionDetails = data.session;
});
