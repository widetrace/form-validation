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

    checkForOnlySpaces(id) {
        const regOnlySpaces = /^[\s]+$/

        regOnlySpaces.test(document.querySelector(`#${id}`).value) ? document.querySelector(`#${id}`).value = '' : ''
    }

    customerName() {
        this.checkForOnlySpaces('customerName')
        if (document.querySelector('#customerName').value) {
            allData.customerContactData.name = document.querySelector('#customerName').value

            return this.hideError('customerName')
        } else {
            return this.showError('customerName')
        }
    }

    customerMail() {
        this.checkForOnlySpaces('customerEmail')
        if (document.querySelector('#customerEmail').value) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(String(document.querySelector('#customerEmail').value).toLowerCase())) {
                allData.customerContactData.email = document.querySelector('#customerEmail').value
                return this.hideError('customerEmail')
            } else {
                return this.showError('customerEmail')
            }
        } else {
            return this.showError('customerEmail')
        }
    }

    customerPhone() {
        if (document.querySelector('#customerPhone').value) {
            if (document.querySelector('#customerPhone').value.length == 18) {
                allData.customerContactData.phone = document.querySelector('#customerPhone').value
                return this.hideError('customerPhone')
            } else {
                return this.showError('customerPhone')
            }
        } else {
            return this.showError('customerPhone')
        }
    }

    customerUnit() {
        this.checkForOnlySpaces('customerUnit')
        if (document.querySelector('#customerUnit').value) {
            allData.customerContactData.unit = document.querySelector('#customerUnit').value
            return this.hideError('customerUnit')
        } else {
            return this.showError('customerUnit')
        }
    }

    firstForm() {
        let validName = this.customerName()
        let validMail = this.customerMail()
        let validUnit = this.customerUnit()
        let validPhone = this.customerPhone()
        if (validName && validMail && validUnit && validPhone) {
            return true
        } else {
            return false
        }
    }

    processName() {
        this.checkForOnlySpaces('processName')
        if (document.querySelector('#processName').value) {
            allData.processInfo.processName = document.querySelector('#processName').value
            return this.hideError('processName')
        } else {
            return this.showError('processName')
        }
    }

    processShort() {
        this.checkForOnlySpaces('processShort')
        if (document.querySelector('#processShort').value) {
            allData.processInfo.shortInfo = document.querySelector('#processShort').value
            return this.hideError('processShort')
        } else return this.showError('processShort')
    }

    asIsExample() {
        this.checkForOnlySpaces('shortAsIsExample')
        if (document.querySelector('#shortAsIsExample').value) {
            allData.processInfo.asIs = document.querySelector('#shortAsIsExample').value
            return this.hideError('shortAsIsExample')
        } else return this.showError('shortAsIsExample')
    }

    toBeExample() {
        this.checkForOnlySpaces('shortToBeExample')
        if (document.querySelector('#shortToBeExample').value) {
            allData.processInfo.toBe = document.querySelector('#shortToBeExample').value
            return this.hideError('shortToBeExample')
        } else return this.showError('shortToBeExample')
    }

    secondForm() {
        let validName = this.processName()
        let validAsIs = this.asIsExample()
        let validToBe = this.toBeExample()
        if (validName && validAsIs && validToBe) {
            return true
        } else return false
    }

    percentOfBusExt() {
        this.checkForOnlySpaces('percentageOfBusExt')

        if (document.querySelector('#percentageOfBusExt').value) {
            allData.charOfProcess.percentageOfBusExt = document.querySelector('#percentageOfBusExt').value
            return this.hideError('percentageOfBusExt')
        } else return this.showError('percentageOfBusExt')
    }

    employeeOrDifficult() {
        this.checkForOnlySpaces('numberOfWorkers')
        this.checkForOnlySpaces('howHardIsIt')
        if (document.querySelector('#howHardIsIt').value || document.querySelector('#numberOfWorkers').value) {
            document.querySelector('#howHardIsIt').value ? allData.countEntrProcess.howHardIsIt = document.querySelector('#howHardIsIt').value : ''
            document.querySelector('#numberOfWorkers').value ? allData.countEntrProcess.numberOfEmployee = document.querySelector('#numberOfWorkers').value : ''
            document.querySelector('#countrEtrProcessInvalid').style.display = 'none'
            return true
        } else {
            document.querySelector('#countrEtrProcessInvalid').style.display = 'block'
            return false
        }
    }

    processData() {
        this.checkForOnlySpaces('unStrDataPercent')
        if (document.querySelector('#dataCheck1').checked || document.querySelector('#dataCheck2').checked || (document.querySelector('#dataCheck3').checked && document.querySelector('#unStrDataPercent').value)) {
            document.querySelector('#dataInProcessInvalid').style.display = 'none'
            for (let i = 1; i < 4; i++) {
                if (document.querySelector(`#dataCheck${i}`).checked) {
                    switch (i) {
                        case 1:
                            allData.dataInProcess.standartData = true
                            break
                        case 2:
                            allData.dataInProcess.unStandartStructData = true
                            break
                        case 3:
                            allData.dataInProcess.unStandartUnStructData.checked = true
                            allData.dataInProcess.unStandartUnStructData.percent = document.querySelector('#unStrDataPercent').value
                            break
                    }
                } else {
                    switch (i) {
                        case 1:
                            allData.dataInProcess.standartData = false
                            break
                        case 2:
                            allData.dataInProcess.unStandartStructData = false
                            break
                        case 3:
                            allData.dataInProcess.unStandartUnStructData.checked = false
                            break
                    }
                }
            }
            return true
        } else {
            document.querySelector('#dataInProcessInvalid').style.display = 'block'
            return false
        }
    }
}