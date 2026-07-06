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

export const categoryInputSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  nameEn: z.string().min(1),
  nameFa: z.string().min(1),
  descEn: z.string().default(""),
  descFa: z.string().default(""),
  icon: z.string().min(1).default("Package"),
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;

export const clientRegisterSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  password: z.string().min(8),
  address: z.string().default(""),
  city: z.string().default(""),
  postalCode: z.string().default(""),
  country: z.string().default(""),
});

export type ClientRegisterInput = z.infer<typeof clientRegisterSchema>;

export const orderShippingSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

export type OrderShippingInput = z.infer<typeof orderShippingSchema>;
