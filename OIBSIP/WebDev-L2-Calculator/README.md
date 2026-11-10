# Vanilla JS Calculator

A clean, responsive web-based calculator built using pure HTML, CSS, and vanilla JavaScript. Designed with clean UI styling and efficient event handling through DOM event delegation.

---

## Features

- **Standard Arithmetic Operations:** Addition (`+`), Subtraction (`−`), Multiplication (`×`), and Division (`÷`).
- **Interactive Display:** Real-time display showing current input, selected operator, and active expressions.
- **Smart Validation:**
  - Prevents multiple consecutive decimal points within a single number.
  - Safe handling for division by zero with user feedback.
- **Backspace & Clear Controls:**
  - `DEL` button to slice off the last typed character.
  - `C` button to reset the calculator state completely.
- **Event Delegation Architecture:** A single parent event listener handles all button interactions dynamically using HTML5 `data-*` attributes.

---

## File Structure

```text
├── index.html        # Main HTML layout for calculator UI
├── style.css         # Styling for layout, grid buttons, and colors
└── script.js        # Core calculator logic and event management
```

---

## Setup & Execution

1. Clone or download the repository to your local computer.
2. Ensure `index.html`, `style.css`, and `script.js` are in the same folder directory.
3. Open `index.html` in any standard web browser (Chrome, Firefox, Edge, Safari). No additional dependencies or npm installations required.

---

## Key Code Concepts

### 1. HTML `data-*` Attributes & JavaScript `dataset`
Instead of using inline `onclick` attributes or individual element target selectors, each button defines custom attributes:
```html
<button data-num="7">7</button>
<button data-operator="÷">÷</button>
<button data-action="clear">C</button>
```

In JavaScript, these attributes are retrieved dynamically through `btn.dataset`:
- `btn.dataset.num`
- `btn.dataset.operator`
- `btn.dataset.action`

### 2. Event Delegation (`e.target`)
Rather than assigning separate click event handlers to every button, a single event listener is attached to the parent `#button-container`:

```javascript
document.getElementById('button-container').addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.tagName !== 'BUTTON') return;

    if (btn.dataset.num !== undefined) {
        appendNumber(btn.dataset.num);
    } else if (btn.dataset.operator !== undefined) {
        appendOperation(btn.dataset.operator);
    }
    // ...
});
```
