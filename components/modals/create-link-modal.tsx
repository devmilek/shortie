"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
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
import axios from "axios";
import { HelpCircle, Loader2, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import BasicTooltip from "../ui/basic-tooltip";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateLinkModal } from "@/hooks/use-create-link-modal";

const formSchema = z.object({
  shortValue: z
    .string()
    .min(4, {
      message: "Short value require at least 4 characters",
    })
    .regex(/^[a-zA-Z0-9\-_]+$/, {
      message: 'Short value can only contain letters, numbers, "-" and "_"',
    }),
  destination: z.string().url({
    message: "Enter valid link",
  }),
  password: z.string().optional(),
  expiresAt: z.date().optional(),
});

const CreateLinkModal = () => {
  const { isOpen, onClose, data } = useCreateLinkModal();
  const origin = useOrigin();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shortValue: "",
      destination: "",
      password: "",
      expiresAt: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("shortValue", data.shortValue);
      form.setValue("destination", data.destination);
      if (data.expiresAt) {
        form.setValue("expiresAt", data.expiresAt);
      }
    } else {
      form.setValue("expiresAt", undefined);
    }
  }, [data, form]);

  const isLoading = form.formState.isSubmitting;

  async function formSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (data) {
        await axios.patch(`/api/link/${data.id}`, values);
      } else {
        await axios.post("/api/link", values);
      }
      onClose();
      form.reset();
      toast.success("Link created", {
        description: "Your link is succesfully created and active",
      });
      router.refresh();
    } catch (e: any) {
      console.log(e.code);
      if (e.response!.status === 400) {
        toast.error("Short value is already taken", {
          description: "Use another value or generate one",
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
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogContent className="min-w-0">
        <DialogHeader>
          <DialogTitle>
            {data ? "Edit short link" : "Create short link"}
          </DialogTitle>
          <DialogDescription>
            If you want, you can password protect your link or set an expiration
            date.
            {/* {JSON.stringify(data)} */}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(formSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="shortValue"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center">
                    Short value*
                    <BasicTooltip text="Used to replace long URL addresses with more compact ones, making it easier to share and improving the aesthetics of the links.">
                      <HelpCircle className="w-4 h-4 ml-2" />
                    </BasicTooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input
                        readOnly
                        value={origin + "/"}
                        disabled
                        className="w-min"
                      />
                      <Input
                        autoComplete="off"
                        placeholder="Enter short value..."
                        {...field}
                        disabled={isLoading}
                      />
                      <Button
                        className="flex-shrink-0"
                        variant="secondary"
                        size="icon"
                        disabled={isLoading}
                        onClick={(e) => {
                          e.preventDefault();
                          setRandomShortValue();
                        }}
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination*</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Enter long link..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Optional
                </span>
              </div>
            </div>
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
                        autoComplete="off"
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
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(formSubmit)} disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}{" "}
            {data ? "Edit link" : "Create link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLinkModal;
