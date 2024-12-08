let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let result = document.getElementById("result");
let btn = document.getElementById("search-btn");
let sound = document.getElementById("sound");

btn.addEventListener("click", () => {
    let inputField = document.getElementById("search-input");
    let input = inputField.value;
    fetch(`${url}${input}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0 && data[0].phonetics.length > 0 && data[0].phonetics[0].audio) {
                result.innerHTML = `
                    <div class="result">
                        <div class="word">
                            <h3>${input}</h3>
                            <button onclick="playSound()">
                                <ion-icon name="mic"></ion-icon>
                            </button>
                        </div>
                        <p>${data[0].meanings[0].definitions[0].definition}</p>
                    </div>
                `;
                sound.setAttribute("src", data[0].phonetics[0].audio);
            } else {
                result.innerHTML = `<p>Sorry, no pronunciation found.</p>`;
                sound.setAttribute("src", "");
            }
            // تفريغ الحقل النصي بعد البحث
            inputField.value = "";
        })
        .catch(error => {
            console.error('Error:', error);
            result.innerHTML = `<p>Sorry, an error occurred.</p>`;
            inputField.value = ""; // تفريغ الحقل النصي في حالة حدوث خطأ
        });
});

function playSound() {
    if (sound.src) {
        sound.play();
    } else {
        console.log("No sound available.");
    }
}
