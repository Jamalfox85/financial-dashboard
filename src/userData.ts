import { supabase } from "./supabase";

export let sessionDetails: any = {};
supabase.auth.getSession().then(({ data }) => {
  sessionDetails = data.session;
});
supabase.auth.onAuthStateChange((_, _session) => {
  sessionDetails = _session;
});
