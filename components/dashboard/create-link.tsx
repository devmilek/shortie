"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DatePicker } from "../date-picker";
import axios from "axios";
import { Link } from "@prisma/client";
import { Separator } from "../ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
import { Link2 } from "lucide-react";
import { useToast } from "../ui/use-toast";

const longLinkSchema = z.object({
  longLink: z.string().url({
    message: "Enter valid link",
  }),
});

const additionalFieldsSchema = z.object({
  longLink: z.string().url({
    message: "Enter valid link",
  }),
  password: z.string().optional(),
  expiresAt: z.date().optional(),
});

const CreateLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createdLink, setCreatedLink] = useState<any>();

  const origin = useOrigin();
  const { toast } = useToast();

  const longLinkForm = useForm<z.infer<typeof longLinkSchema>>({
    resolver: zodResolver(longLinkSchema),
    defaultValues: {
      longLink: "",
    },
  });

  const additionalFieldsForm = useForm<z.infer<typeof additionalFieldsSchema>>({
    resolver: zodResolver(additionalFieldsSchema),
    defaultValues: {
      longLink: "",
      password: undefined,
      expiresAt: undefined,
    },
  });

  function longLinkFormSubmit(values: z.infer<typeof longLinkSchema>) {
    additionalFieldsForm.setValue("longLink", values.longLink);
    setIsOpen(true);
  }

  async function additionalFieldsFormSubmit(
    values: z.infer<typeof additionalFieldsSchema>
  ) {
    try {
      const link = await axios.post("/api/link", values);
      setIsOpen(false);
      setCreatedLink(link);
      longLinkForm.reset();
      additionalFieldsForm.reset();
      toast({
        title: "Link created",
        description: "Your link is succesfully created and active",
        action: <Button variant="outline">Copy link</Button>,
      });
      console.log(link);
    } catch (e) {
      console.log(e);
    }
  }

  const isLoading = additionalFieldsForm.formState.isSubmitting;

  return (
    <div>
      <h2 className="text-xl font-bold">Create new link</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Create, short and manage your links
      </p>
      <Form {...longLinkForm}>
        <form
          onSubmit={longLinkForm.handleSubmit(longLinkFormSubmit)}
          className="flex space-x-2 mt-7 w-full"
        >
          <FormField
            control={longLinkForm.control}
            name="longLink"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter a long link..." {...field} />
                    <Button type="submit" className="whitespace-nowrap">
                      Create link
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          additionalFieldsForm.reset();
          setIsOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete the details</DialogTitle>
            <DialogDescription>
              If you want, you can password protect your link or set an
              expiration date.
            </DialogDescription>
          </DialogHeader>
          <Form {...additionalFieldsForm}>
            <form
              onSubmit={additionalFieldsForm.handleSubmit(
                additionalFieldsFormSubmit
              )}
              className="space-y-4"
            >
              <FormField
                control={additionalFieldsForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password..."
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={additionalFieldsForm.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration date (optional)</FormLabel>
                    <FormControl>
                      <DatePicker
                        className="w-full"
                        date={field.value}
                        setDate={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      After this time the link will not work
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={additionalFieldsForm.handleSubmit(
                additionalFieldsFormSubmit
              )}
              disabled={isLoading}
            >
              Create link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {createdLink && (
        <>
          <Separator className="my-8" />
          <div className="p-6 bg-white rounded-xl border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Your link</h2>
              <Button variant="secondary">Copy</Button>
            </div>
            <div className="bg-gradient-to-tr text-center flex flex-col justify-center items-center from-blue-600 to-blue-900 p-7 rounded-lg text-white">
              <h6 className="text-xs font-medium text-white/70">Link by:</h6>
              <h3 className="text-lg font-bold">
                {createdLink.data.profile.name}
              </h3>
              <p className="text-xs text-white/40 mt-3 line-clamp-1">
                {createdLink.data.longLink}
              </p>
            </div>
            <div className="py-2 px-3 flex bg-white border rounded-lg">
              <Link2 className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm font-medium text-foreground/70 line-clamp-1">
                <span className="text-primary">{origin}/l/</span>
                {createdLink.data.uuid}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateLink;
