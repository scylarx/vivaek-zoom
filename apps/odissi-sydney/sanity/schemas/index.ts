import { charityProgramSchema } from "./charity-program";
import { classSchema } from "./class";
import { galleryItemSchema } from "./gallery-item";
import { locationSchema } from "./location";
import { personSchema } from "./person";
import { siteSettingsSchema } from "./site-settings";
import { testimonialSchema } from "./testimonial";

export const schemas = [
  classSchema,
  locationSchema,
  personSchema,
  testimonialSchema,
  galleryItemSchema,
  charityProgramSchema,
  siteSettingsSchema,
];
