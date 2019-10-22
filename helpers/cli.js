const { getRepositories } = require("../lib/repositories"),
  vorpal = require("vorpal")(),
  chalk = vorpal.chalk,
  pkg = require("../package.json"),
  os = require("os");

const repositories = {
  questions: [
    {
      type: "input",
      name: "language",
      message: "what language do you want? ",
      default: "javascript"
    },
    {
      type: "input",
      name: "quantity",
      message: "How many good-first-issue do you want for each repository? ",
      validate: value => {
        var valid = !isNaN(parseInt(value, 10));
        return valid || "Please enter a number";
      },
      filter: Number
    }
  ],
  response(repos) {
    return repos
      .map(repo => {
        return `
                ${chalk.white.bgRed(repo.full_name)}
                by ${repo.owner.login}

                ${repo.description}

                👉  ${repo.html_url}`;
      })
      .join("\n");
  }
};

exports.manageRepositories = function(args, cb) {
  this.prompt(repositories.questions, result => {
    getRepositories({
      lang: result.language,
      ofsQuantity: result.quantity
    })
      .then(data => {
        this.log(repositories.response(data));
      })
      .catch(this.log)
      .finally(cb);
  });
};

exports.asciiLogo = () => {
  return `
                                                                 
@@@@@@@   @@@  @@@@@@@    @@@@@@   @@@  @@@  @@@  @@@   @@@@@@   
@@@@@@@@  @@@  @@@@@@@@  @@@@@@@@  @@@@ @@@  @@@  @@@  @@@@@@@@  
@@!  @@@  @@!  @@!  @@@  @@!  @@@  @@!@!@@@  @@!  @@@  @@!  @@@  
!@!  @!@  !@!  !@!  @!@  !@!  @!@  !@!!@!@!  !@!  @!@  !@!  @!@  
@!@@!@!   !!@  @!@!!@!   @!@!@!@!  @!@ !!@!  @!@!@!@!  @!@!@!@!  
!!@!!!    !!!  !!@!@!    !!!@!!!!  !@!  !!!  !!!@!!!!  !!!@!!!!  
!!:       !!:  !!: :!!   !!:  !!!  !!:  !!!  !!:  !!!  !!:  !!!  
:!:       :!:  :!:  !:!  :!:  !:!  :!:  !:!  :!:  !:!  :!:  !:!  
 ::        ::  ::   :::  ::   :::   ::   ::  ::   :::  ::   :::  
 :        :     :   : :   :   : :  ::    :    :   : :   :   : :  
                                                                 
---------------------------------------------------------------
- Arch: ${os.platform()} - ${os.arch()}
- ${pkg.name} Version: ${pkg.version}
---------------------------------------------------------------
`;
};
