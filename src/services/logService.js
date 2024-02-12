function init() {
  // Raven.config(
  //   "https://4a6f74506418fd2030ce7d0987496980@o4506723194634240.ingest.sentry.io/4506723205447680",
  //   {
  //     release: "1-0-0",
  //     environment: "development-test",
  //   }
  // ).install();
}

function log(error) {
  // Raven.captureException(error);
  console.error(error);
}
const logger = {
  init,
  log,
};

export default logger;
