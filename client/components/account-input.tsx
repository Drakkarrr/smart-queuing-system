import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

const profileFormSchema = z.object({
  AccountNumber: z
    .string()
    .min(9, {
      message: "Account Number must be 9 characters.",
    })
    .max(9, {
      message: "Account Number must not be longer than 9 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  bio: "This is a test.",
  urls: [
    { value: "https://github.com" },
    { value: "http://github.com/drakkarrr" },
  ],
};

export function AccountInput({
  onInputValidChange,
  onInputChange,
}: {
  onInputValidChange: (valid: boolean) => void;
  onInputChange?: (value: ProfileFormValues['AccountNumber']) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    // lifting the state up
    onInputChange?.(newValue);

    const isValid = newValue.length === 9;
    setIsInputValid(isValid);
    onInputValidChange(isValid);

    if (isValid) {
      localStorage.setItem("accountNumber", newValue);
    }
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[420px] m-auto text-left"
      >
        <FormField
          control={form.control}
          name="AccountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Account Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Account Number"
                  {...field}
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormDescription>
                Please enter your 9-digit account number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
