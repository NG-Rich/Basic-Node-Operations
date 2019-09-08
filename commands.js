const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      process.stdout.write('Incorrect command entered.');
  }
};

const commandLibrary = {
  "echo": (userInput) => {
    done(userInput);
  },
  "cat": (fullPath) => {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  "head": (fullPath) => {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var text = data.toString('utf8');
      var slicedText = text.split('\n').slice(0,5).join('\n');
      var headText = Buffer.from(slicedText, 'utf8');
      done(headText);
    });
  },
  "tail": (fullPath) => {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var text = data.toString('utf8');
      var slicedText = text.split('\n').slice(-5).join('\n');
      var tailText = Buffer.from(slicedText, 'utf8');
      done (tailText);
    })
  }

};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
