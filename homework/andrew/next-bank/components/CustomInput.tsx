import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { authFormSchema } from "@/lib/utils";
import { z } from "zod";

interface CustomInputProps {
  form: UseFormReturn<z.infer<ReturnType<typeof authFormSchema>>>;
  name: keyof z.infer<ReturnType<typeof authFormSchema>>;
  placeholder: string;
  label: string;
}

export default function CustomInput({
  form,
  name,
  placeholder,
  label,
}: CustomInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                id={name}
                type={name === "password" ? "password" : "text"}
                placeholder={placeholder}
                className="input-class"
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
}
