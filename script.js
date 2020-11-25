class Calculator{
  constructor(previousFunctionTextElement, presentFunctionTextElement) {
    this.previousFunctionTextElement = previousFunctionTextElement
    this.presentFunctionTextElement = presentFunctionTextElement
    this.clear()
  }
  clear(){
    this.presentFunction = ''
    this.previousFunction = ''
    this.operation = undefined
  }
  delete(){
    this.presentFunction = this.presentFunction.toString().slice(0,-1)

     
  }
  appendNumber(number){
    if(number === '.' && this.presentFunction.includes('.')) return
    this.presentFunction = this.presentFunction.toString() + number.toString()
  }
  chooseOperation(operation){
    if(this.presentFunction === '') return
    if(this.previousFunction !== ''){
      this.compute()
    }
    this.operation = operation
    this.previousFunction = this.presentFunction
    this.presentFunction = ''
  }
  compute(computation){
    this.computation = computation
    const prev = parseFloat(this.previousFunction)
    const pres = parseFloat(this.presentFunction)
    if(isNaN(prev) || isNaN(pres)) return
    switch (this.operation){
      case '+':
        computation = prev + pres
        break
      case '-':
        computation = prev - pres
        break
      case '*':
        computation = prev * pres
        break
      case '÷':
        computation = prev / pres
        break
      default:
        return
    }
    this.presentFunction = computation
    this.operation = undefined
    this.previousFunction = ''
  }
  updateDisplay(){
    this.presentFunctionTextElement.innerText = this.presentFunction
    this.previousFunctionTextElement.innerText = this.previousFunction

  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-function]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equal-to]')
const clearButton = document.querySelector('[data-clear-all]')
const previousFunctionTextElement = document.querySelector('[data-previous-function]')
const presentFunctionTextElement = document.querySelector('[data-current-function]')

const calculator = new Calculator(previousFunctionTextElement, presentFunctionTextElement)
numberButtons.forEach( button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
operationButtons.forEach( button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
equalsButton.addEventListener('click', function() {
  calculator.compute()
  calculator.updateDisplay()
})
clearButton.addEventListener('click', function() {
  calculator.clear()
  calculator.updateDisplay()
})
deleteButton.addEventListener('click', function() {
  calculator.delete()
  calculator.updateDisplay()
})