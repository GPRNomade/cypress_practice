const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configurar el evento para después de tomar la captura de pantalla
      on('after:screenshot', (details) => {
        if (details.specName && details.path) {
          const { specName, path } = details;
          console.log(`Captura de pantalla guardada en: ${path}`);
        }
      });
    },
    screenshotOnRunFailure: true, // Asegúrate de que esto esté habilitado
  },
});
