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
      // registra o plugin, mas sem consolidar relatórios
      require("cypress-mochawesome-reporter/plugin")(on);
      on('after:run', () => {
        // desativa merge automático que causava erro
        return;
      });
    },
  },
});
