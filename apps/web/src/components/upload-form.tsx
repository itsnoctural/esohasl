"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const optionalText = (schema: z.ZodString) =>
  z
    .union([z.string(), z.undefined()])
    .refine((val) => !val || schema.safeParse(val).success);

const formSchema = z.object({
  title: z.string().min(6).max(85),
  game: optionalText(
    z
      .string()
      .regex(
        /^(https?:\/\/)?(www\.)?roblox\.com\/games\/\d+\/?([a-zA-Z0-9-]+)?$/,
      ),
  ),
  thumbnail: z.instanceof(File).refine((file) => file.size < 1e7, {
    message: "Your thumbnail must be less than 10MB.",
  }),
  description: z.string().max(1000).optional(),
  script: z.string().max(2500),
});

export function UploadForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      script: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body: z.infer<typeof formSchema> = {
      title: values.title,
      script: values.script,
      thumbnail: values.thumbnail,
    };

    if (values.game) body.game = values.game; // TODO: are there a better way to exclude undefined fields from request?
    if (values.description) body.description = values.description;

    const { data } = await api.v1.scripts.index.post(body, {
      fetch: { credentials: "include" },
    });

    router.push(`/script/${data?.id}`);
  }

  return (
    <main className="mx-auto my-8 max-w-screen-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Pet Simulator 99 Script" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="game"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="roblox.com/games/8737899170/Pet-Simulator-99"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="Thumbnail"
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/avif"
                    onChange={(event) => onChange(event.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="it's the best script in the world..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="script"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Script</FormLabel>
                <FormControl>
                  <Textarea placeholder='print("esohasl.net")' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
