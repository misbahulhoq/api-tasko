import type { Config } from "jest";
import { createDefaultPreset } from "ts-jest";

const config: Config = {
  // [...]
  ...createDefaultPreset(),
  testMatch: ["**/*.test.ts"],
};

export default config;
