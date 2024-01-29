const stream = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: stream.createReadStream("anakonda.txt"),
  output: process.stdout,
  terminal: false,
});

let variables = {};

const check = (line) => {
  const token = line.split(" ");
  if (token[0] === "int") {
    const key = token[1];
    let value = undefined;

    if (token.length >= 4 && token[2] === "=") {
      value = token[3];
    }

    if (variables.hasOwnProperty(token[0])) {
      variables[token[0]][key] = value;
    } else {
      variables[token[0]] = { [key]: value };
    }
  }

  if (token.length >= 5 && token[2] == "=" && token[4] == "+") {
    if (
      variables[token[0]][token[3]] == undefined ||
      variables[token[0]][token[5]] == undefined
    ) {
      variables[token[0]][token[1]] == NaN;
    }
    const operand1 = variables[token[0]][token[3]];
    const operand2 = variables[token[0]][token[5]];
    variables[token[0]][token[1]] = Number(operand1) + Number(operand2);
  }

  if (token.length >= 5 && token[2] == "=" && token[4] == "-") {
    const operand1 = variables[token[0]][token[3]];
    const operand2 = variables[token[0]][token[5]];
    variables[token[0]][token[1]] = Number(operand1) - Number(operand2);
  }

  if (token.length >= 5 && token[2] == "=" && token[4] == "*") {
    const operand1 = variables[token[0]][token[3]];
    const operand2 = variables[token[0]][token[5]];
    variables[token[0]][token[1]] = Number(operand1) * Number(operand2);
  }

  if (token.length >= 5 && token[2] == "=" && token[4] == "/") {
    const operand1 = variables[token[0]][token[3]];
    const operand2 = variables[token[0]][token[5]];
    variables[token[0]][token[1]] = Number(operand1) / Number(operand2);
  }

  if (token.length >= 4 && token[1] == "=") {
    if (token[3] == "+") {
      const operand1 = variables["int"][token[2]];
      const operand2 = variables["int"][token[4]];
      variables["int"][token[0]] = Number(operand1) + Number(operand2);
    } else if (token[3] == "-") {
      const operand1 = variables["int"][token[2]];
      const operand2 = variables["int"][token[4]];
      variables["int"][token[0]] = Number(operand1) - Number(operand2);
    } else if (token[3] == "*") {
      const operand1 = variables["int"][token[2]];
      const operand2 = variables["int"][token[4]];
      variables["int"][token[0]] = Number(operand1) * Number(operand2);
    } else if (token[4] == "/") {
      const operand1 = variables["int"][token[2]];
      const operand2 = variables["int"][token[4]];
      if (operand2 == "0" || operand2 == 0) {
        variables["int"][token[0]] = Infinity;
      }
      variables["int"][token[0]] = Number(operand1) / Number(operand2);
    }
  }

  if (token[0] == "tpel") {
    for (let i = 1; i < token.length; ++i) {
      if (variables["int"].hasOwnProperty(token[i])) {
        console.log(variables["int"][token[i]]);
      }
    }

    if (token.length >= 2) {
      let sum = 0;
      for (let i = 0; i < token.length; ++i) {
        if (i % 2 == 0 && token[i] == "+") {
          for (let j = 1; j < token.length; ++j) {
            if (i % 2 != 0) {
              sum += token[i];
            }
          }
        }
      }
    }
  }
};

rl.on("line", (line) => {
  check(line);
});

rl.on("close", () => {
  console.log(variables);
});
