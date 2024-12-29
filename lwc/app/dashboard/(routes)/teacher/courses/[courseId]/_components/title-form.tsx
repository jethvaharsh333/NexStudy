"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    })
});

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

const TitleForm = ({initialData, courseId}:TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialData.title);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            const { data } = await axios.patch(`/api/courses/${courseId}`, values);
            setTitle(data.title);
            toast.success("Course updated");
            toggleEdit();
        }
        catch(error){
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Title
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit title
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {title}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form 
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-4 mt-4"
                    >
                        <FormField 
                         control={form.control} 
                         name="title" 
                         render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="e.g. 'Advanced web development'" {...field} />
                                </FormControl>
                            </FormItem>
                         )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}
 
export default TitleForm;