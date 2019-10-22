const vorpal = require("vorpal")(),
  chalk = vorpal.chalk,
  { manageRepositories, asciiLogo } = require("./helpers/cli");

console.log(chalk.red(asciiLogo()));

vorpal
  .command("repositories", "Get open-first-issue labeled github repositories")
  .action(function(args, cb) {
    manageRepositories.apply(this, [args, cb]);
  });

vorpal.delimiter(chalk.white.bgRed("piranha$")).show();
