class FormEditing {
    hideById(id) {
        document.querySelector(`#${id}`).style.display = 'none'
    }

    showById(id) {
        document.querySelector(`#${id}`).style.display = 'block'
    }

    goToNextFormBlock(current, next) {
        document.querySelector(`#${current}-tab`).className = "nav-link"
        document.querySelector(`#${next}-tab`).className = 'nav-link active'
        document.querySelector(`#${current}`).className = 'tab-pane fade'
        document.querySelector(`#${next}`).classList.add('show', 'active')
    }

    addSystem() {
        const elem = document.querySelector('#systemsNames')
        const newSystem = document.createElement('div')
        newSystem.className = 'systemsNames-block'
        if (elem.childElementCount == 0) {
            newSystem.innerHTML =
                `
                    <label for="systemName${elem.childElementCount + 1}" class="mt-3">Наименование системы ${elem.childElementCount + 1}</label>
                    <input class="form-control" type="text" id="systemName${elem.childElementCount + 1}">
                    <small id="systemName1Help" class="form-text text-muted">
                        Например:
                        <br />
                        - ORACLE, SAP, 1С
                        <br />
                        - Интернет-ресурс
                        <br />
                        - Внутренняя разработка
                    </small>    
                `
        } else {
            newSystem.innerHTML =
                `
                    <label for="systemName${elem.childElementCount + 1}" class="mt-3">Наименование системы ${elem.childElementCount + 1}</label>
                    <input class="form-control" type="text" id="systemName${elem.childElementCount + 1}">
                `
        }
        elem.appendChild(newSystem)
        if (allData.usedSystems[elem.childElementCount - 1]) {
            document.querySelector(`#systemName${elem.childElementCount}`).value = allData.usedSystems[elem.childElementCount - 1].name
        }
    }

    removeLastSystem() {
        const elem = document.querySelector('#systemsNames')
        elem.removeChild(elem.lastChild)
    }
}

class ValidateInputs {
    showError(id) {
        document.querySelector(`#${id}`).classList.add('border', 'border-danger')
        document.querySelector(`#${id}Invalid`).style.display = 'block'
        return false
    }

    hideError(id) {
        document.querySelector(`#${id}Invalid`).style.display = 'none'
        document.querySelector(`#${id}`).className = 'form-control'
        return true
    }

    checkForOnlySpaces(elem) {
        const regOnlySpaces = /^[\s]+$/

        regOnlySpaces.test(elem.value) ? elem.value = '' : ''
    }

    customInput(id) {
        let elem = document.querySelector(`#${id}`)
        this.checkForOnlySpaces(elem)
        if (elem.value) {
            allData[elem.name][id] = elem.value
            return this.hideError(id)
        } else return this.showError(id)
    }

    customerMail() {
        let elem = document.querySelector('#customerEmail')
        this.checkForOnlySpaces(elem)
        if (elem.value) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(String(elem.value).toLowerCase())) {
                allData.customerContactData.customerEmail = elem.value
                return this.hideError('customerEmail')
            } else {
                return this.showError('customerEmail')
            }
        } else {
            return this.showError('customerEmail')
        }
    }

    customerPhone() {
        let elem = document.querySelector('#customerPhone')
        if (elem.value.length == 18) {
            allData.customerContactData.customerPhone = elem.value
            return this.hideError('customerPhone')
        } else {
            return this.showError('customerPhone')
        }
    }

    firstForm() {
        let validName = this.customInput('customerName')
        let validMail = this.customerMail()
        let validUnit = this.customInput('customerUnit')
        let validPhone = this.customerPhone()
        if (validName && validMail && validUnit && validPhone) {
            return true
        } else {
            return false
        }
    }

    processShort() {
        this.checkForOnlySpaces('processShort')
        if (document.querySelector('#processShort').value) {
            allData.processInfo.processShort = document.querySelector('#processShort').value
            return this.hideError('processShort')
        } else return this.showError('processShort')
    }

    secondForm() {
        let validName = this.customInput('processName')
        let validAsIs = this.customInput('shortAsIsExample')
        let validToBe = this.customInput('shortToBeExample')
        if (validName && validAsIs && validToBe) {
            return true
        } else return false
    }

    employeeOrDifficult() {
        let workersElem = document.querySelector('#numberOfEmployee')
        let difElem = document.querySelector('#howHardIsIt')
        this.checkForOnlySpaces(workersElem)
        this.checkForOnlySpaces(difElem)
        if (difElem.value || workersElem.value) {
            difElem.value ? allData.countEntrProcess.howHardIsIt = difElem.value : ''
            workersElem.value ? allData.countEntrProcess.numberOfEmployee = workersElem.value : ''
            document.querySelector('#countrEtrProcessInvalid').style.display = 'none'
            return true
        } else {
            document.querySelector('#countrEtrProcessInvalid').style.display = 'block'
            return false
        }
    }

    processData() {
        let allDataCheckElems = document.querySelectorAll('input[name="dataInProcess"]')
        let unStrDataPercentElem = document.querySelector('#unStrDataPercent')
        unStrDataPercentElem.value ? this.checkForOnlySpaces(unStrDataPercentElem) : ''
        
        if (allDataCheckElems[0].checked || allDataCheckElems[1].checked ||  unStrDataPercentElem.value) {
            document.querySelector('#dataInProcessInvalid').style.display = 'none'
            allDataCheckElems[0].checked ? allData.dataInProcess.standartData = true : allData.dataInProcess.standartData = false
            allDataCheckElems[1].checked ? allData.dataInProcess.unStandartStructData = true : allData.dataInProcess.unStandartStructData = false
            unStrDataPercentElem.value ? allData.dataInProcess.unStrDataPercent = unStrDataPercentElem.value : ''

            return true
        } else {
            document.querySelector('#dataInProcessInvalid').style.display = 'block'
            return false
        }
    }
}