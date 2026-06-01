const { defineConfig } = require("cypress");

function getDateFileName() {
  const now = new Date();
  const dia = String(now.getDate()).padStart(2, '0');
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  const ano = now.getFullYear();
  const hora = String(now.getHours()).padStart(2, '0');
  const minuto = String(now.getMinutes()).padStart(2, '0');
  return `${dia}_${mes}_${ano}-${hora}_${minuto}`;
}

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    reportFilename: getDateFileName()
  },
  e2e: {
    baseUrl: "https://front.serverest.dev",
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    allowCypressEnv: false
  }
});
