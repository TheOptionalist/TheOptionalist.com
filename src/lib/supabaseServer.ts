import "server-only";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          program: string | null;
          course: string | null;
          created_at: string;
        };
      };
    };
  };
};

export function createSupabaseServerClient() {
  return createServerComponentClient<Database>({ cookies });
}
