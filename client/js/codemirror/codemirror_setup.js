const codeMirrorSetup = {
  buttonInit() {
    codeMirrorSetup.setDirectionKeys();
    codeMirrorSetup.setFunctionnalKeys();
  },
  init() {
    codeMirrorSetup.setCursor();
    codeMirrorSetup.setKeyword();
  },
  editor: CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "javascript",
    theme: "darcula",
    lineNumbers: true,
    autoRefresh: true,
  }),
  setCursor() {
    const doc = codeMirrorSetup.editor.getDoc();
    const lastLine = doc.lastLine();
    doc.setCursor({ line: lastLine - 1, ch: 0 });
  },
  setDirectionKeys() {
    const directions = document.querySelectorAll("[direction]");
    for (let i = 0; i < directions.length; i++) {
      directions[i].addEventListener("click", () => {
        codeMirrorSetup.editor.focus();
        let cursor = codeMirrorSetup.editor.getCursor();
        if (directions[i].hasAttribute("up")) {
          codeMirrorSetup.editor.setCursor({
            line: cursor.line - 1,
            ch: cursor.ch,
          });
        }
        if (directions[i].hasAttribute("down")) {
          codeMirrorSetup.editor.setCursor({
            line: cursor.line + 1,
            ch: cursor.ch,
          });
        }
        if (directions[i].hasAttribute("up")) {
          codeMirrorSetup.editor.setCursor({
            line: cursor.line - 1,
            ch: cursor.ch,
          });
        }
        if (directions[i].hasAttribute("left")) {
          codeMirrorSetup.editor.setCursor({
            line: cursor.line,
            ch: cursor.ch - 1,
          });
        }
        if (directions[i].hasAttribute("right")) {
          codeMirrorSetup.editor.setCursor({
            line: cursor.line,
            ch: cursor.ch + 1,
          });
        }
      });
    }
  },
  setKeyword() {
    const keys = document.querySelectorAll(".modal__challenge-code-key");
    //manage the adding inside the code editor
    for (let i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", () => {
        codeMirrorSetup.editor.focus();
        let cursor = codeMirrorSetup.editor.getCursor();

        if (keys[i].textContent == "return") {
          codeMirrorSetup.editor
            .getDoc()
            .replaceRange(
              `${keys[i].textContent} `,
              { line: cursor.line, ch: cursor.ch },
              { line: cursor.line, ch: cursor.ch }
            );
          cursor = codeMirrorSetup.editor.getCursor();
          codeMirrorSetup.editor.setCursor({
            line: cursor.line,
            ch: cursor.ch + 1,
          });
        } else {
          codeMirrorSetup.editor
            .getDoc()
            .replaceRange(
              `${keys[i].textContent}`,
              { line: cursor.line, ch: cursor.ch },
              { line: cursor.line, ch: cursor.ch }
            );
        }
      });
    }
  },
  setFunctionnalKeys() {
    //Backspace
    const delete_ch = document.querySelector("[delete]");
    delete_ch.addEventListener("click", () => {
      codeMirrorSetup.editor.focus();
      cursor = codeMirrorSetup.editor.getCursor();
      codeMirrorSetup.editor.replaceRange(
        "",
        { line: cursor.line, ch: cursor.ch - 1 },
        { line: cursor.line, ch: cursor.ch }
      );
    });

    //Breakline
    const breakline = document.querySelector("[break]");
    breakline.addEventListener("click", () => {
      codeMirrorSetup.editor.focus();
      codeMirrorSetup.editor.replaceRange(
        "\n",
        codeMirrorSetup.editor.getCursor()
      );
    });

    //Space
    const space = document.querySelector("[space]");
    space.addEventListener("click", () => {
      codeMirrorSetup.editor.focus();
      codeMirrorSetup.editor.replaceRange(
        " ",
        codeMirrorSetup.editor.getCursor()
      );
    });

    //Reset
    const reset = document.querySelector("[reset]");
    reset.addEventListener("click", () => {
      codeMirrorSetup.editor.focus();
      codeMirrorSetup.editor.setValue(challenge.info.precode);
      codeMirrorSetup.setCursor();
    });
  },
};

document.addEventListener("DOMContentLoaded", codeMirrorSetup.buttonInit);
