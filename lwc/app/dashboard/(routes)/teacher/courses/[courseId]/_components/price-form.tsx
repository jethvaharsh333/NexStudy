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
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";

const formSchema = z.object({
    price: z.coerce.number().positive("Price must be a positive number"),
});

interface PriceFormProps {
    initialData: Course;
    courseId: string;
    onChange: (value: string) => void;
}

export const PriceForm = ({initialData, courseId, onChange}:PriceFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [price, setPrice] = useState(initialData.price);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined,
        } ,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            const { data } = await axios.patch(`/api/courses/${courseId}`, values);
            setPrice(data.price);
            toast.success("Course updated");
            toggleEdit();
            onChange(data.price)
        }
        catch(error){
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course price
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit price
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !price && "text-slate-500 italic"
                )}>
                    {price ? formatPrice(price) : "No price"}
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
                         name="price" 
                         render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input disabled={isSubmitting} type="number" step="0.01" placeholder="Set a price for your course" {...field} />
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
 
