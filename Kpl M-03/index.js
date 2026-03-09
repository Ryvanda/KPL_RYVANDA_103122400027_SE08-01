const editor = document.getElementById("editor-kecil")

const hf = document.getElementById("hf")
const hb = document.getElementById("hb")
const hk = document.getElementById("hk")

const btnBesar = document.getElementById("huruf-besar")
const btnKecil = document.getElementById("huruf-kecil")
const btnParagraf = document.getElementById("huruf-paragraf")

editor.addEventListener("input", () => {

let text = editor.value

hf.textContent = text.length

let upper = 0
let lower = 0

for(let char of text){

if(char >= "A" && char <= "Z"){
upper++
}

if(char >= "a" && char <= "z"){
lower++
}

}

hb.textContent = upper
hk.textContent = lower

})


btnBesar.addEventListener("click", () => {
editor.value = editor.value.toUpperCase()
})

btnKecil.addEventListener("click", () => {
editor.value = editor.value.toLowerCase()
})

btnParagraf.addEventListener("click", () => {

let text = editor.value.toLowerCase()

editor.value = text.charAt(0).toUpperCase() + text.slice(1)

})