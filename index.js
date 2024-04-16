let count = 1;
document.querySelector(".add-button").addEventListener("click", () => {
    count++;
    let forms = document.querySelectorAll(".beverage");
    let newForm = forms[forms.length - 1].cloneNode(true);
    newForm.querySelector("h4").innerHTML = `Напиток №${count}`;
    for (let radio of newForm.querySelectorAll("input[type=radio]")) {
        radio.name = "milk" + count;
    }

    let removeButton = newForm.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
        if(count > 1){
            newForm.remove();
            count--;
        }

    });
    forms[forms.length - 1].after(newForm);
});

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const overlay = document.querySelector(".modal-overlay");

function declineDrink(n) {
    if (n % 10 === 1 && n % 100 !== 11) {
        return "напиток";
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return "напитка";
    } else {
        return "напитков";
    }
}

document.querySelector(".submit-button")
    .addEventListener('click',
        (e) => {
            e.preventDefault();
            modalContent.textContent = `Заказ принят! Вы заказали ${count} ${declineDrink(count)}.`;
            modal.style.display = 'block';
            overlay.style.display = 'block';
        }
    );

document.querySelector(".close-btn")
    .addEventListener('click',
        (e) => {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
    );