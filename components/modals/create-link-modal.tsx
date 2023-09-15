import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { DatePicker } from "../date-picker";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import axios, { AxiosError } from "axios";
import { HelpCircle, Link2, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import BasicTooltip from "../ui/basic-tooltip";
import { Link } from "@prisma/client";

interface CreateLinkModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  longLink?: string;
  createdLink?: any | undefined;
  setCreatedLink?: (createdLink: any | undefined) => void;
}

const formSchema = z.object({
  shortValue: z.string().min(4, {
    message: "Short value require at least 4 characters",
  }),
  longLink: z.string().url({
    message: "Enter valid link",
  }),
  password: z.string().optional(),
  expiresAt: z.date().optional(),
});

const CreateLinkModal = ({
  isOpen,
  setIsOpen,
  longLink,
  createdLink,
  setCreatedLink,
}: CreateLinkModalProps) => {
  const { toast } = useToast();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longLink: "",
      password: undefined,
      expiresAt: undefined,
    },
  });

  if (longLink) {
    form.setValue("longLink", longLink);
  }

  const isLoading = form.formState.isSubmitting;

  async function formSubmit(values: z.infer<typeof formSchema>) {
    try {
      const link = await axios.post("/api/link", values);
      setIsOpen(false);
      if (setCreatedLink) {
        setCreatedLink(link);
      }
      form.reset();
      toast({
        title: "Link created",
        description: "Your link is succesfully created and active",
      });
      console.log(link);
    } catch (e: any) {
      console.log(e.code);
      if (e.response!.status === 400) {
        toast({
          title: "Short value is already taken",
          description: "Use another value or generate one",
          variant: "destructive",
        });
        form.setError("shortValue", {
          message: "Short value is already taken",
        });
      }
    }
  }

  const setRandomShortValue = () => {
    const alphabet: string =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString: string = "";

    for (let i: number = 0; i < 8; i++) {
      const randomIndex: number = Math.floor(Math.random() * alphabet.length);
      randomString += alphabet.charAt(randomIndex);
    }

    form.setValue("shortValue", randomString);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        form.reset();
        setIsOpen(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create short link</DialogTitle>
          <DialogDescription>
            If you want, you can password protect your link or set an expiration
            date.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="shortValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Short value (required){" "}
                    <BasicTooltip text="Used to replace long URL addresses with more compact ones, making it easier to share and improving the aesthetics of the links.">
                      <HelpCircle className="w-4 h-4 ml-2" />
                    </BasicTooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter short value..."
                        {...field}
                        disabled={isLoading}
                      />
                      <Button
                        className="flex-shrink-0"
                        variant="secondary"
                        size="icon"
                        disabled={isLoading}
                        onClick={setRandomShortValue}
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </FormControl>
                  {form.getValues("shortValue")?.length >= 4 &&
                    !form.formState.errors.shortValue && (
                      <FormDescription className="flex items-center">
                        <Link2 className="h-4 w-4 mr-2" />
                        <p>
                          <span>{origin}/l/</span>
                          {form.getValues("shortValue")}
                        </p>
                      </FormDescription>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long link (required)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter long link..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration date</FormLabel>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
            </div>
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
          <Button onClick={form.handleSubmit(formSubmit)} disabled={isLoading}>
            Create link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLinkModal;
function generateShortValue() {
  throw new Error("Function not implemented.");
}
