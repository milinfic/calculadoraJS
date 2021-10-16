class CalcController {

    constructor() {
        this._operation = [];
        this._displayCalcEl = document.querySelector("#display");
        this.initButtonsEvents();
    }

    /****************************************************************************************************** */
    //ESTE EVENTO IRÁ PEGAR O VALOR DAS TECLAS SELECIONADAS E ENVIARÁ PARA O MÉTODO execBtn()
    /****************************************************************************************************** */

    initButtonsEvents() {
        let buttons = document.querySelectorAll(".row > button");
        buttons.forEach(btn => {
            btn.addEventListener('click', e => {
                let textBtn = btn.textContent;
                this.execBtn(textBtn);
            });
        });
    }

    /****************************************************************************************************** */
    //ESTE EVENTO IRÁ PEGAR O VALOR DAS TECLAS SELECIONADAS
    /****************************************************************************************************** */

    execBtn(value) {
        switch (value) {
            case '0':
                this.addNumber(parseInt(value));
                break;
            case '1':
                this.addNumber(parseInt(value));
                break;
            case '2':
                this.addNumber(parseInt(value));
                break;
            case '3':
                this.addNumber(parseInt(value));
                break;
            case '4':
                this.addNumber(parseInt(value));
                break;
            case '5':
                this.addNumber(parseInt(value));
                break;
            case '6':
                this.addNumber(parseInt(value));
                break;
            case '7':
                this.addNumber(parseInt(value));
                break;
            case '8':
                this.addNumber(parseInt(value));
                break;
            case '9':
                this.addNumber(parseInt(value));
                break;
            case '+':
                this.addOperator(value);
                break;
            case '-':
                this.addOperator(value);
                break;
            case 'X':
                this.addOperator("*");
                break;
            case '÷':
                this.addOperator("/");
                break;
            case 'C':
                this.clearAll();
                break;
            case 'CE':
                this.clearEntry();
                break;
            case '±':
                this.changeSign();
                break;
            case '=':
                this.equal();
                break;
            case '←':
                this.backSpace();
                break;
            case '¹/x':
                this.ratinalFuncion();
                break;
            case 'x²':
                this.squared();
                break;
            case '√':
                this.squareNumber(value);
                break;
            case '%':
                this.porcent();
                break;
            case ',':
                this.addDote();
                break;

            default:
                this.setError();
        }
    }

    /****************************************************************************************************** */
    //ESSE METODO FICARÁ RESPONSÁVEL PELA CAPITAÇÃO DO VALOR NUMERICO E DO VALOR DE OPERAÇÃO
    /****************************************************************************************************** */

    addNumber(value) {
        if (isNaN(this.getLastOperator())) {
            this.pushOperation(value);
        } else {
            let newValue = this.getLastOperator().toString() + value.toString();
            this.setLastOperation(newValue);
        }
        console.log(this._operation);
        this.setLastNumberToDisplay();
    }

    addOperator(value) {
        (isNaN(this.getLastOperator())) ? this.setLastOperation(value) : this.pushOperation(value);
        console.log(this._operation);
        this.setLastNumberToDisplay();
    }

    getLastOperator() {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    pushOperation(value) {
        (this._operation.length > 2) ? this.calc(value) : this._operation.push(value);
    }

    /****************************************************************************************************** */
    //ESSE METODO IRÁ VERIFICAR OS VALORES QUE TEM NO ARRAY E EFETUAR O CALCULO
    /****************************************************************************************************** */
    calc(value) {
        let result = eval(this._operation.join(""));
        result = this.formatResult(result);
        this._operation = [result];
        if (value != null) this._operation.push(value);
    }


    formatResult(result){
        const formatNumber = result.toString().split("");
        if (formatNumber.length >10) result = result.toPrecision(4);
        return result;
    }

    /****************************************************************************************************** */
    //ESSE METODO IRÁ MOSTRAR O VALOR NO DISPLAY
    /****************************************************************************************************** */

    setLastNumberToDisplay() {
        let lastNumber;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!isNaN(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }



    /****************************************************************************************************** */
    //ESSE METODO IRÁ DIVIR 1 PELO ÚLTIMO NÚMERO DA LISTA
    /****************************************************************************************************** */

    changeSign() {
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!isNaN(this._operation[i])) {
                this._operation[i] *= -1;
                break;
            }
        }
        this.setLastNumberToDisplay();
    }

    /****************************************************************************************************** */
    //ESSE METODO IRÁ EFETUAR A CONTA APENAS SE POSSUIR TRÊS ITENS NA LISTA (NÚMERO, OPERADOR, NÚMERO)
    /****************************************************************************************************** */

    equal() {
        if (this._operation.length > 2) this.calc(null);
        this.setLastNumberToDisplay();
    }

    /****************************************************************************************************** */
    //ESSE METODO TEM COMO FUNÇÃO TIRAR O ULTIMO VALOR NUMERO QUE FOI DIGITADO, CASO NÃO TENHA NENHUM, NÃO
    //ENTRARÁ NA FUNÇÃO
    /****************************************************************************************************** */

    backSpace() {
        if (!isNaN(this.getLastOperator())) {
            let wildcard = "";
            const eliminatesOneNumber = this._operation[this._operation.length - 1].toString().split("");
            for (let i = 0; i < eliminatesOneNumber.length - 1; i++) {
                wildcard += parseFloat(eliminatesOneNumber[i]);
            }
            this._operation[this._operation.length - 1] = wildcard
        }
        this.setLastNumberToDisplay();
    }

    /****************************************************************************************************** */
    //ESSE METODO TEM COMO FUNÇÃO DIVIDIR 1 PELO VALOR DO ULTIMO NÚMERO DA LISTA, CASO NÃO EXISTIR, NÃO ENTRARÁ
    //NA FUNCÃO
    /****************************************************************************************************** */

    ratinalFuncion() {
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!isNaN(this._operation[i])) {
                this._operation[i] = 1 / this._operation[i];
                this._operation[i] = this._operation[i].toExponential(4);
                break;
            }
        }
        this.setLastNumberToDisplay();
    }

    /****************************************************************************************************** */
    //ESSE METODO ELEVA O NÚMERO AO QUADRADO
    /****************************************************************************************************** */

    squared() {
        let i = this.returnNumber();
        if (this.returnNumber() > -1) this._operation[i] = Math.pow(this._operation[i], 2);
        this.setLastNumberToDisplay();
    }

    /****************************************************************************************************** */
    //ESSE METODO RETORNA A RAIZ QUADRADA DO NÚMERO
    /****************************************************************************************************** */

    squareNumber() {
        let i = this.returnNumber();
        if (this.returnNumber() > -1) this._operation[i] = Math.sqrt(this._operation[i]);
        this.setLastNumberToDisplay();
    }

    /****************************************************************************************************** */
    //ESSE METODO RETORNA A PORCENTAGEM DE UM NÚMERO
    /****************************************************************************************************** */

    porcent() {
        if (this._operation.length > 2) {
            let result = eval(this._operation.join("")) / 100;
            this._operation = [result];
        }
        this.setLastNumberToDisplay();
    }


    returnNumber() {
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!isNaN(this._operation[i])) {
                return i;
            }
        }
    }

    /****************************************************************************************************** */
    //METODO IRÁ ADICIONAR UM PONTO
    /****************************************************************************************************** */

    addDote() {
        let lastOperation = this.getLastOperator();
        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (isNaN(lastOperation) || !lastOperation) {
            this.setLastOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();
    }


    /****************************************************************************************************** */
    //METODO CLEAR E CLEARENTRY, O CLEAR IRÁ LIMPAR A LISTA COMPLETA E O ENTRY APENAS A ENTRADA
    /****************************************************************************************************** */

    clearAll() {
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError() {
        this._displayCalcEl.innerHTML = "ERROR";
    }


    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        if (value.toString().length > 10) {
            this.setError();
            return false;
        }
        this._displayCalcEl.innerHTML = value;
    }

}