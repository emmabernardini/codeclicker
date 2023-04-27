// Challenge management: generate the challenge in dom, test it, and manage the success/failure of the challenge
challenge = {
  info: 0,
  success: "",
  nbCorrectAnswers: 0,
  terminal: document.getElementById("challenge_terminal"),
  init() {
    challenge.insertDataInModal();
    challenge.listenSubmit();
  },
  insertDataInModal() {
    //precode
    challenge.info.precode = challenge.info.precode.split(" BREAK ");
    challenge.info.precode = challenge.info.precode.join("\n");

    document.querySelector("#code-editor").textContent = challenge.info.precode;
    codeMirrorSetup.editor.setValue(challenge.info.precode);

    //Set time out is mandatory
    setTimeout(function () {
      codeMirrorSetup.editor.refresh();
    }, 1);

    //title
    document.getElementById("challenge_title").textContent =
      challenge.info.title;

    //descr
    document.getElementById("challenge_descr").textContent =
      challenge.info.description;

    //instruction
    document.getElementById("challenge_instruction").textContent =
      challenge.info.instruction;

    //keys
    document.getElementById("challenge_keys").textContent = "";
    for (key of challenge.info.keyword) {
      let div = document.createElement("div");

      div.textContent = key;
      div.classList.add("modal__challenge-code-key");
      document.getElementById("challenge_keys").appendChild(div);
    }

    challenge.terminal.textContent = "";
    // Initialise la config des touches et tout
    codeMirrorSetup.init();
  },

  listenSubmit() {
    document
      .getElementById("submit_challenge")
      .addEventListener("click", challenge.interpretFunction);
  },

  interpretFunction() {
    challenge.nbCorrectAnswers = 0;
    //Clear terminal if not empty
    challenge.terminal.textContent = "";

    const code = codeMirrorSetup.editor.getValue();
    const matches = code.match(/\((.*)\)/);
    const parameter = matches ? matches[1] : null;
    // const matches2 = code.match(/\{[\s]*(.*)[\s]*\}/);
    const function_content = code.substring(
      code.indexOf("{") + 1,
      code.lastIndexOf("}")
    );

    for (let i = 0; i < 3; i++) {
      try {
        const func = new Function(parameter, function_content);
        const result = func(...challenge.info.test[i].input);
        challenge.checkAnswer(result, i);
      } catch (e) {
        const result = "";
        challenge.success = false;
        challenge.renderDataInTerminal(result, i, e);
      }
    }
  },
  async checkAnswer(result, i) {
    if (
      result == challenge.info.test[i].output ||
      JSON.stringify(result) == JSON.stringify(challenge.info.test[i].output)
    ) {
      challenge.success = true;
      challenge.nbCorrectAnswers++;
      challenge.renderDataInTerminal(result, i);
      if (challenge.nbCorrectAnswers === 3) {
        click.score = Number(click.score) + Number(click.challengeGain);
        document.getElementById("exp").textContent = click.score;
        await successChallenge.handleSuccessChallenge();
        document
          .getElementById("submit_challenge")
          .removeEventListener("click", challenge.interpretFunction);

        utils.handleChallengeGain();
      }
    } else {
      challenge.success = false;
      challenge.renderDataInTerminal(result, i);
    }
  },
  renderDataInTerminal(result, i, e) {
    //Line of the state of the test
    if (challenge.nbCorrectAnswers === 3) {
      let lineSuccess = document.createElement("div");
      lineSuccess.textContent = `😊🎉 Bravo, vous avez réussi le challenge et gagné ${utils.convertToReadable(
        click.challengeGain
      )} ExP`;
      lineSuccess.style.color = "yellow";
      challenge.terminal.insertAdjacentElement("afterbegin", lineSuccess);
      utils.successChallengeAnimation();
    }

    let lineState = document.createElement("div");
    if (challenge.success) {
      lineState.textContent = `✔️ Test ${i + 1} réussi:`;
      lineState.style.color = "green";
    } else {
      lineState.textContent = `❌ Test ${i + 1} échoué:`;
      lineState.style.color = "red";
    }
    challenge.terminal.appendChild(lineState);

    //Line of the input
    lineInput = document.createElement("div");
    lineInput.textContent = `Input: ${challenge.info.test[i].input.toString()}`;
    challenge.terminal.appendChild(lineInput);

    //Line of the client
    lineOutput = document.createElement("div");
    lineOutput.textContent = `Output: 
    ${challenge.info.test[i].output}`;
    challenge.terminal.appendChild(lineOutput);

    //Line of the client input
    lineOutputClient = document.createElement("div");
    if (!e) {
      lineOutputClient.textContent = `Your Output: 
      ${result}`;
      challenge.terminal.appendChild(lineOutputClient);
    } else {
      lineOutputClient.textContent = `Your Output: 
      ${e}`;
      challenge.terminal.appendChild(lineOutputClient);
    }
  },
};
