// Elements 
const form = document.querySelector('form') as HTMLFormElement;
//to add an event listener for form submission

const calculationOf = document.querySelectorAll('input[name="calculationOf"]') as NodeListOf<HTMLInputElement>;
//to add event listeners for changing the label text when selection changes

const taxRateInputs = document.querySelectorAll('input[name="taxRate"]') as NodeListOf<HTMLInputElement>;
//radio inputs for selecting tax rate (19% or 7%)

const amountInput = document.getElementById('amount') as HTMLInputElement;
//Input field for entering the amount to be calculated, used in calculateTax() to get the amount entered by the user

const amountLabel = document.querySelector('label[for="amount"]') as HTMLLabelElement;
//used in updateAmountLabel() to change its text based on selected calculation type

const taxAmountSpan = document.getElementById('taxAmount') as HTMLSpanElement;
//used in calculateTax() to update and show the calculated tax amount

const totalAmountSpan = document.getElementById('totalAmount') as HTMLSpanElement;
//used in calculateTax() to update and show the final amount after tax calculation

// Function to update the amount label
function updateAmountLabel() {
    const selectedCalculation = document.querySelector('input[name="calculationOf"]:checked') as HTMLInputElement;
    if (selectedCalculation.id === 'bruttoZuNetto') {
        amountLabel.textContent = 'Bruttobetrag (Preis inklusive Mehrwertsteuer) in Euro*';
    } else {
        amountLabel.textContent = 'Nettobetrag (Preis ohne Mehrwertsteuer) in Euro*';
    }
}

// Function to calculate tax and update results
function calculateTax(event: Event) {
    event.preventDefault();

    const selectedCalculation = document.querySelector('input[name="calculationOf"]:checked') as HTMLInputElement;
    const selectedTaxRate = document.querySelector('input[name="taxRate"]:checked') as HTMLInputElement;
    const amount = Number(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Bitte geben Sie einen gültigen Betrag ein.');
        return;
    }

    const taxRate = selectedTaxRate.value === '19' ? 0.19 : 0.07;
    let netAmount: number, taxAmount: number, grossAmount: number;

    if (selectedCalculation.id === 'nettoZuBrutto') {
        netAmount = amount;
        taxAmount = netAmount * taxRate;
        grossAmount = netAmount + taxAmount;
    } else {
        grossAmount = amount;
        netAmount = grossAmount / (1 + taxRate);
        taxAmount = grossAmount - netAmount;
}

    taxAmountSpan.textContent = `€${taxAmount.toFixed(2)}`;
    totalAmountSpan.textContent = `€${grossAmount.toFixed(2)}`;
}

// Add event listeners
calculationOf.forEach(input => {
    input.addEventListener('change', updateAmountLabel);
});

form.addEventListener('submit', calculateTax);

// Initial label update
updateAmountLabel();


/* 
grosse schwirigkeiten den richtigen Rechenweg zu coden - 
7% funktioniert nicht komplett und ich denke mein formel dafur ist auch falsch 

viele variablen musste ich mit hilfe von internet erstellen wegen allen HTML Element, SpanElement etc blabla 

von HTML seite sinf <form>, <input> und <label> relativ ein schwaches punkt von mir - dort werde ich auch mehr uben mussen :(

allgemein musste ich viel online nachschlagen um den aufbau dieser funktion zu verstehen bzw mir fehlt das verstandniss wie ich es aufbauen soll, wie sieht eine klare struktur bzw. aufbau-plan im kopf bevor ich anfange zu coden

! kleine Bitte
es wurde mir beim review sehr helfen wenn man mir eben sagt wie ich mich fur so ein projekt vorbereiten soll, welche sachen sollten mir klar sein bevor ich mit dem schreiben anfange (und eventuell wie sollte eine korrekte losung aussehen)

nichtsdestotrotz ist grosster teil dieses projekts fur mich verstandlich gewesen
*/