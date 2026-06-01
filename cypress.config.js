const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: false,   
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true
  },
  e2e: {
    baseUrl: "https://front.serverest.dev",
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
