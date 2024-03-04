/* NPM pre-install script that checks wheter necessary system dependencies are installed. */

const childProcess = require("child_process");

// Check Node version
try {
  childProcess.execSync("npx check-node-version --node \">=$(cat .nvmrc)\"");
} catch {
  console.error(
    "Please make sure that your installed Node version matches the one specified in .nvmrc"
  );
  process.exit(1);
}
