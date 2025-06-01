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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";

const formSchema = z.object({
    description: z.string().min(1, {
        message: "description is required"
    })
});

interface DescriptionFormProps {
    initialData: Course;
    courseId: string;
    onChange: (value: string) => void;
}

const DescriptionForm = ({initialData, courseId, onChange}:DescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(initialData.description);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        } ,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            const { data } = await axios.patch(`/api/courses/${courseId}`, values);
            setDescription(data.description);
            toast.success("Course updated");
            toggleEdit();
            onChange(data.description);
            window.dispatchEvent(new Event('courseUpdated'));
        }
        catch(error){
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Description
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
                <p className={cn(
                    "text-sm mt-2",
                    !description && "text-slate-500 italic"
                )}>
                    {description || "No description"}
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
                         name="description" 
                         render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea disabled={isSubmitting} placeholder="e.g. 'This course is about...'" {...field} />
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
 
export default DescriptionForm;