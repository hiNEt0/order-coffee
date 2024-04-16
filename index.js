let beverage = document.querySelector(".beverage")
beverage.querySelector('textarea[name="user-input"]')
    .addEventListener('input', function() {
        beverage.querySelector('.user-output').innerHTML = highlightKeywords(this.value);
    });


let count = 1;
document.querySelector(".add-button").addEventListener("click", () => {
    count++;
    let forms = document.querySelectorAll(".beverage");
    let newForm = forms[forms.length - 1].cloneNode(true);
    newForm.querySelector("h4").innerHTML = `Напиток №${count}`;

    let userInput = newForm.querySelector('textarea[name="user-input"]');
    let userOutput = newForm.querySelector('.user-output');
    userInput.addEventListener('input', function() {
        userOutput.innerHTML = highlightKeywords(this.value);
    });

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

function highlightKeywords(text) {
    const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
    const regex = new RegExp(keywords.join('|'), 'gi');
    return text.replace(regex, match => `<b>${match}</b>`);
}

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
            createTable(modalContent);
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


function createTable(element) {

    const table = document.createElement('table');
    const header = document.createElement('tr');
    table.appendChild(header);
    for (const headText of ["Напиток", "Молоко", "Дополнительно"]) {
        const headerEl = document.createElement('th');
        headerEl.textContent = headText;
        header.appendChild(headerEl);
    }
    
    for (const fieldset of document.querySelectorAll('.beverage')) {
        const row = document.createElement('tr');
        
        const dropdown = fieldset.querySelector('select');
        const dropdownTd = document.createElement('td');
        dropdownTd.textContent = dropdown.selectedOptions[0].value;
        row.appendChild(dropdownTd);

        const radio = fieldset.querySelector('input[type="radio"]:checked');
        const radioTd = document.createElement('td');
        radioTd.textContent = radio.value;
        row.appendChild(radioTd);

        const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]:checked');
        const boxesTd = document.createElement('td');
        boxesTd.textContent = [...checkboxes].map(el => el.value).join(', ');
        row.appendChild(boxesTd);

        table.appendChild(row);
    }    
    
    element.appendChild(table);
}