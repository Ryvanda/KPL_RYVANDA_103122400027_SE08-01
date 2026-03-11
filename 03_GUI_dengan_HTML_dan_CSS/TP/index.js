const editorElement = document.getElementById("editor-kecil");
const charCountElement = document.getElementById("hf");
const charLowerElement = document.getElementById("hk");
const charUpperElement = document.getElementById("hb");
const btnBesar = document.getElementById("huruf-besar");
const btnKecil = document.getElementById("huruf-kecil");
const btnParagraf = document.getElementById("huruf-paragraf");

btnBesar.addEventListener("click", () => {
  const text = editorElement.value;
  editorElement.value = text.toUpperCase();
});

btnKecil.addEventListener("click", () => {
  const text = editorElement.value;
  editorElement.value = text.toLowerCase();
});

btnParagraf.addEventListener("click", () => {
  const text = editorElement.value;
  const sentences = text.split(". ");
  const formattedText = sentences
    .map((sentence) => {
      if (sentence.length > 0) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      return sentence;
    })
    .join(". ");
  editorElement.value = formattedText;
});

editorElement.addEventListener("input", (event) => {
  const textLength = event.target.value.length;
  const text = event.target.value;
  const lowerCaseCount = (text.match(/[a-z]/g) || []).length;
  const upperCaseCount = (text.match(/[A-Z]/g) || []).length;
  charLowerElement.textContent = lowerCaseCount;
  charUpperElement.textContent = upperCaseCount;
  charCountElement.textContent = textLength;
});