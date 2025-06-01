// "use client";

import { db } from "@/lib/db";

const Taskpage = () => {
    async function create(formData: FormData){
        "use server";
        // console.log("ia m logged");
        const title = formData.get("title") as string;

        await db.board.create(
            {
                data: {
                    title
                }
            }
        )
    }

    // console.log("I am logged in browser");
    return (
        <div>
            <form action={create}>
                <input id="title" name="title" placeholder="Enter a borad" className="border-black border p-1" required />
            </form>
        </div>
    );
}

export default Taskpage;