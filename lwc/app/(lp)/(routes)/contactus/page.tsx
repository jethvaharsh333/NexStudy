"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50),
  email: z.string().email(
    { message: "Invalid email address or provide email" }
  ),
  subject: z.string().min(2, {
    message: "Provide subject"
  }).max(50),
  messageuser: z.string().min(2, {
    message: "Provide message"
  }).max(200),
})

const ContactUs = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      messageuser: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      // console.log(values);
      await axios.post("/api/contactus", values);
      // console.log(values);
      toast.success("Submitted");
    }
    catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="max-w-5xl mx-auto bg-slate-950 text-white rounded-md p-6 mt-4 mb-5 transition ease-in duration-1000 delay-800">
      <div>
        <p className="text-xl">MESSAGE US</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 md:gap-y-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >Name</FormLabel>
                      <FormControl>
                        <Input disabled={isSubmitting} className="text-slate-900" placeholder="Enter your name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >Email</FormLabel>
                      <FormControl>
                        <Input disabled={isSubmitting} className="text-slate-900" placeholder="Enter your email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Subject</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} className="text-slate-900" placeholder="Enter subject" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="messageuser"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter message" className="resize-none text-slate-900" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-center mt-5">
                <Button type="submit" className="px-5 bg-amber-400  font-semibold text-sm text-slate-900 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white" disabled={!isValid || isSubmitting}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs;