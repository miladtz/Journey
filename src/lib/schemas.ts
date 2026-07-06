import { z } from "zod";

export const productImageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().default(""),
  colorName: z.string().nullable().optional(),
  colorHex: z.string().nullable().optional(),
});

export const productSpecSchema = z.object({
  labelEn: z.string().min(1),
  labelFa: z.string().min(1),
  valueEn: z.string().min(1),
  valueFa: z.string().min(1),
});

export const productInputSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  nameEn: z.string().min(1),
  nameFa: z.string().min(1),
  taglineEn: z.string().min(1),
  taglineFa: z.string().min(1),
  descriptionEn: z.string().min(1),
  descriptionFa: z.string().min(1),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().nullable().optional(),
  category: z.string().min(1),
  stock: z.number().int().min(0),
  featured: z.boolean().default(false),
  images: z.array(productImageSchema).default([]),
  specs: z.array(productSpecSchema).default([]),
});

export type ProductInput = z.infer<typeof productInputSchema>;
