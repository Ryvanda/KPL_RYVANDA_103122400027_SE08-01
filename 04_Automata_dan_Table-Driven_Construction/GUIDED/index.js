const modeDivElement = document.getElementById("mode-div");

class modeState {
  #state;
  constructor() {
    this.#state = "light";
  }

  #toggleMode(oldState, newState) {
    const html = document.documentElement;
    const textarea = document.getElementById("editor-kecil");

    html.classList.remove(`${oldState}-mode`);
    textarea.classList.remove(`form-${oldState}-mode`);

    html.classList.add(`${newState}-mode`);
    textarea.classList.add(`form-${newState}-mode`);
  }

  get() {
    return this.#state;
  }

  set(newState) {
    if (newState === this.#state) {
      return;
    }

    const oldState = this.#state;
    this.#state = newState;

    this.#toggleMode(oldState, newState);
  }
}

const mode = new modeState();

modeDivElement.addEventListener("click", (event) => {
  const btnElement = event.target.closest("button");
  if (!btnElement) {
    return;
  }
  mode.set(btnElement.value);
});

const textareaElement = document.getElementById("editor-kecil");
const spanLetterElement = document.getElementById("hf");
const spanUpperElement = document.getElementById("hb");
const spanLowerElement = document.getElementById("hk");
const buttonUpperElement = document.getElementById("huruf-besar");
const buttonLowerElement = document.getElementById("huruf-kecil");

const buttonLightElement = document.getElementById("tombol-terang");
const buttonDarkElement = document.getElementById("tombol-gelap");

textareaElement.addEventListener("input", (event) => {
  const str = event.target.value;

  let hfCounter = 0;
  let hbCounter = 0;

  const rxUpper = / [A-Z]/;
  const rxWhites = /[^a-zA-Z]/;
  for (const c of str) {
    if (rxWhites.test(c)) {
      continue;
    }
    if (rxUpper.test(c)) {
      hbCounter += 1;
    }
    hfCounter += 1;
  }
  spanLetterElement.textContent = hfCounter;
  spanUpperElement.textContent = hbCounter;
  spanLowerElement.textContent = hfCounter - hbCounter;
});

buttonUpperElement.addEventListener("click", (event) => {
  const editorText = textareaElement.value;
  textareaElement.value = editorText.toUpperCase();
});

buttonLowerElement.addEventListener("click", (event) => {
  const editorText = textareaElement.value;
  textareaElement.value = editorText.toLowerCase();
});
