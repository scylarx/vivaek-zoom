import type { SchemaTypeDefinition } from "sanity";

import { artistSchema } from "./artist";
import { eventSchema } from "./event";
import { manifestoSchema } from "./manifesto";
import { siteSettingsSchema } from "./site-settings";
import { trackSchema } from "./track";

export const schemaTypes: SchemaTypeDefinition[] = [
  eventSchema,
  artistSchema,
  trackSchema,
  manifestoSchema,
  siteSettingsSchema,
];
