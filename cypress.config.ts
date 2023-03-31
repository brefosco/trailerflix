import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    base_url: "http://localhost:5173/",
    username: "brefosco",
    password: "UB!khhr@rU6gPW9",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
