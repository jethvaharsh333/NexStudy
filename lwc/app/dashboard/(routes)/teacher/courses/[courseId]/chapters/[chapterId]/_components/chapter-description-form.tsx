"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";


interface ChapterDescriptionFormsProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    description: z.string().min(1),
});

export const ChapterDescriptionForms = ({initialData, courseId, chapterId}:ChapterDescriptionFormsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(initialData.description);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            const { data } = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            setDescription(data.description);

            toast.success("Chapter updated");
            toggleEdit();
            // router.refresh();
        }
        catch(error){
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Description
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit description
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div className={cn(
                    "text-sm mt-2",
                    !description && "text-slate-500 italic"
                )}>
                    {!description && "No description"}
                    {description && (
                        <Preview value={description} />
                    )}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-4 mt-4"
                    >
                        <FormField 
                         control={form.control} 
                         name="description" 
                         render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Editor  {...field} />
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