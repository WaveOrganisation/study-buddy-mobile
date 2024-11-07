import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";
import type from "ajv/lib/vocabularies/jtd/type";

const tamaguiConfig = createTamagui({
  ...config,
});

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
