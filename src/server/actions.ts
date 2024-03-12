"use server";

import { revalidatePath } from "next/cache";

/**
 * A server action used in a client component must be
 * defined in its own file with the "use server" marking.
 * revalidatePath() must be used in a server action.
 */
export async function revalidatePathServerAction(path: string) {
  revalidatePath(path);
}
