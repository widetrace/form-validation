const noSpaces              = /^[\s]+$/

function hideById (id) {
    document.querySelector(`#${id}`).style.display = 'none'
}

function nextForm(current, next) {
    document.querySelector(`#${current}-tab`).className = "nav-link"
    document.querySelector(`#${next}-tab`).className = 'nav-link active'

    document.querySelector(`#${current}`).className = 'tab-pane fade'
    document.querySelector(`#${next}`).classList.add('show', 'active')
}

function addSystem() {

    const elem              = document.querySelector('#systemsNames')

    const newSystem         = document.createElement('div')
    newSystem.className     = 'systemsNames-block'
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
        newSystem.innerHTML     = 
            `
                <label for="systemName${elem.childElementCount + 1}" class="mt-3">Наименование системы ${elem.childElementCount + 1}</label>
                <input class="form-control" type="text" id="systemName${elem.childElementCount + 1}">
            `
    }
    

    elem.appendChild(newSystem)

    if (allData.usedSystems[elem.childElementCount-1]) {
        document.querySelector(`#systemName${elem.childElementCount}`).value = allData.usedSystems[elem.childElementCount-1].name
    }

}

function delSystem() {

    const elem              = document.querySelector('#systemsNames')

    elem.removeChild(elem.lastChild)
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
        if (document.querySelector('#customerEmail').value){
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
    
        if (document.querySelector('#customerUnit').value){
            allData.customerContactData.unit = document.querySelector('#customerUnit').value
            return this.hideError('customerUnit')
        } else {
            return this.showError('customerUnit')
        }
    }

    firstForm() {
        let validName   = this.customerName()
        let validMail   = this.customerMail()
        let validUnit   = this.customerUnit()
        let validPhone  = this.customerPhone()

        if (validName && validMail && validUnit && validPhone){ 
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

        if (document.querySelector('#howHardIsIt').value || document.querySelector('#numberOfWorkers').value){
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

        if (document.querySelector('#dataCheck1').checked || document.querySelector('#dataCheck2').checked || (document.querySelector('#dataCheck3').checked && document.querySelector('#unStrDataPercent').value)){
            document.querySelector('#dataInProcessInvalid').style.display = 'none'

            for (let i = 1; i < 4; i++) {
                if (document.querySelector(`#dataCheck${i}`).checked){
                    switch (i) {
                        case 1: 
                            allData.dataInProcess.standartData                      = true
                            break
                        case 2: 
                            allData.dataInProcess.unStandartStructData              = true
                            break
                        case 3: 
                            allData.dataInProcess.unStandartUnStructData.checked    = true
                            allData.dataInProcess.unStandartUnStructData.percent    = document.querySelector('#unStrDataPercent').value
                            break
    
                    }
                } else {
                    switch (i) {
                        case 1: 
                            allData.dataInProcess.standartData                  = false
                            break
                        case 2: 
                            allData.dataInProcess.unStandartStructData          = false
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

const validate = new ValidateInputs()

document.querySelector('#addSystem').addEventListener('click', e => {
    e.preventDefault()

    addSystem()
})

document.querySelector('#delSystem').addEventListener('click', e => {
    e.preventDefault()

    delSystem()
})

document.querySelector('#dataCheck3').addEventListener('change', function(e) {
    if (this.checked) {
        document.querySelector('.unStrPercent').style.display = 'block'
    } else document.querySelector('.unStrPercent').style.display = 'none'
})

document.querySelector('#customerDataNext').addEventListener('click', e => {
    e.preventDefault()

    if (validate.firstForm()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        nextForm('pills-contact', 'pills-allInfo')
    }

})

document.querySelector('#processInfoNext').addEventListener('click', e => {
    e.preventDefault()

    validate.secondForm()

    if (validate.secondForm()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))

        nextForm('pills-allInfo', 'pills-processSet')
    }
})

document.querySelector('#processSetNext').addEventListener('click', e => {
    e.preventDefault()

    if (validate.percentOfBusExt()){
        for (let i = 1; i < 8; i++) {
            if (document.querySelector(`#rulesCheck${i}`).checked){
                switch (i) {
                    case 1: 
                        allData.charOfProcess.algorythm         = true
                        break
                    case 2: 
                        allData.charOfProcess.rules             = true
                        break
                    case 3: 
                        allData.charOfProcess.order             = true
                        break
                    case 4: 
                        allData.charOfProcess.editing           = true
                        break
                    case 5: 
                        allData.charOfProcess.understandbl      = true
                        break
                    case 6: 
                        allData.charOfProcess.handOperations    = true
                        break
                    case 7: 
                        allData.charOfProcess.muchRepeat        = true
                        break
                }
            } else {
                switch (i) {
                    case 1: 
                        allData.charOfProcess.algorythm         = false
                        break
                    case 2: 
                        allData.charOfProcess.rules             = false
                        break
                    case 3: 
                        allData.charOfProcess.order             = false
                        break
                    case 4: 
                        allData.charOfProcess.editing           = false
                        break
                    case 5: 
                        allData.charOfProcess.understandbl      = false
                        break
                    case 6: 
                        allData.charOfProcess.handOperations    = false
                        break
                    case 7: 
                        allData.charOfProcess.muchRepeat        = false
                        break
                }
            }
        }

        localStorage.setItem('savedEnteredData', JSON.stringify(allData))

        nextForm('pills-processSet', 'pills-countEntrProcess')
    } else {
        document.querySelector('#percentageOfBusExt').classList.add('border', 'border-danger')

        document.querySelector('#percentageOfBusExtInvalid').style.display = 'block'
    }
})

document.querySelector('#countEntrProcessNext').addEventListener('click', e => {
    e.preventDefault()

    if(validate.employeeOrDifficult()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        nextForm('pills-countEntrProcess', 'pills-dataInProcess')
    }
})

document.querySelector('#dataInProcessNext').addEventListener('click', e => {
    e.preventDefault() 

    noSpaces.test(document.querySelector('#unStrDataPercent').value) ? document.querySelector('#unStrDataPercent').value = '' : ''

    if (validate.processData()) {

        localStorage.setItem('savedEnteredData', JSON.stringify(allData))

        nextForm('pills-dataInProcess', 'pills-usedSystems')
    }
})


document.querySelector('#addInfoForSystems').addEventListener('click', e => {
    e.preventDefault()
 
    let errorStatus = false

    for (let i = 1; i < document.querySelector('#systemsNames').childElementCount + 1; i++) {

        noSpaces.test(document.querySelector(`#systemName${i}`).value) ? document.querySelector(`#systemName${i}`).value = '' : ''

        if (!document.querySelector(`#systemName${i}`).value) {
            document.querySelector('#someNameMissed').style.display = 'block'
            errorStatus = true
            break
        } 
    }

    if (!errorStatus) {
        hideById('systemsNames')
        hideById('systemsButtons')
        hideById('systemsAddInfo')

        allData.usedSystems.splice(0, allData.usedSystems.length)

        document.querySelector('#systemInfo-name').innerHTML = document.querySelector(`#systemName1`).value
        
        document.querySelector("#systemsInfo").style.display = 'block'

        if (document.querySelector('#systemsNames').childElementCount > 1) {
            document.querySelector('#nextSystem').style.display = 'block'

        } else {
            document.querySelector('#nextSystem').style.display = 'block'
            document.querySelector('#nextSystem').innerHTML = 'Next >>>'

        }

    }

})

let systemCount = 1

document.querySelector('#nextSystem').addEventListener('click', e => {
    e.preventDefault()

    noSpaces.test(document.querySelector(`#desktopNumber`).value) ? document.querySelector(`#desktopNumber`).value = '' : ''

    if (
        (document.querySelector('#apiAvaible1').checked || document.querySelector('#apiAvaible2').checked) 
        && 
        (document.querySelector('#systemEnter1').checked || document.querySelector('#systemEnter2').checked)
        &&
        (document.querySelector('#testHabitat1').checked || document.querySelector('#testHabitat2').checked)
        &&
        document.querySelector('#desktopNumber').value
    ) {
        hideById('systemInfoInvalid')

        let systemObj = {
            name:           document.querySelector('#systemInfo-name').innerHTML,
            desktopNumber:  document.querySelector('#desktopNumber').value,
            apiAvaible:     document.querySelector('#apiAvaible1').checked ? true : false,
            systemEnter:    document.querySelector('#systemEnter1').checked ? 'Straight' : 'VDI / Citrix',
            testHabitat:    document.querySelector('#testHabitat1').checked ? 'Avaible' : 'Not avaible'
        }
        allData.usedSystems.push(systemObj)

        if (systemCount == document.querySelector('#systemsNames').childElementCount) {
            localStorage.setItem('savedEnteredData', JSON.stringify(allData))
            nextForm('pills-usedSystems', 'pills-extraInfo')
        } else { 
            systemCount += 1

            if (systemCount == document.querySelector('#systemsNames').childElementCount) {
                document.querySelector('#nextSystem').innerHTML = 'Next >>>'
            }

            document.querySelector('#apiAvaible1').checked ? document.querySelector('#apiAvaible1').checked = false : document.querySelector('#apiAvaible2').checked = false
            document.querySelector('#systemEnter1').checked ? document.querySelector('#systemEnter1').checked = false : document.querySelector('#systemEnter2').checked = false
            document.querySelector('#testHabitat1').checked ? document.querySelector('#testHabitat1').checked = false : document.querySelector('#testHabitat2').checked = false

            document.querySelector('#desktopNumber').value = ''

            document.querySelector('#systemInfo-name').innerHTML = document.querySelector(`#systemName${systemCount}`).value
        }

        document.querySelector('#apiAvaible1').checked ? document.querySelector('#apiAvaible1').checked = false : document.querySelector('#apiAvaible2').checked = false
        document.querySelector('#systemEnter1').checked ? document.querySelector('#systemEnter1').checked = false : document.querySelector('#systemEnter2').checked = false
        document.querySelector('#testHabitat1').checked ? document.querySelector('#testHabitat1').checked = false : document.querySelector('#testHabitat2').checked = false

    } else document.querySelector('#systemInfoInvalid').style.display = 'block'
    
})

document.querySelector('#sendData').addEventListener('click', e => {
    e.preventDefault() 

    noSpaces.test(document.querySelector(`#restrictions`).value) ? document.querySelector(`#restrictions`).value = '' : ''
    noSpaces.test(document.querySelector(`#attentionComments`).value) ? document.querySelector(`#attentionComments`).value = '' : ''
    
    document.querySelector('#restrictions').value ? allData.extraInfo.restrictions = document.querySelector('#restrictions').value : console.log('no data in restr')

    document.querySelector('#attentionComments').value ? allData.extraInfo.comments = document.querySelector('#attentionComments').value : console.log('no comments')

    localStorage.setItem('savedEnteredData', JSON.stringify(allData))

})

const allData = localStorage.getItem('savedEnteredData') ? JSON.parse(localStorage.getItem('savedEnteredData')) : {customerContactData: {},processInfo: {},charOfProcess: {},countEntrProcess: {},dataInProcess: {unStandartUnStructData: {},},usedSystems: [],extraInfo: {},}

if (localStorage.getItem('savedEnteredData')) {

    allData.customerContactData.name    ? document.querySelector('#customerName').value     = allData.customerContactData.name : ''
    allData.customerContactData.email   ? document.querySelector('#customerEmail').value    = allData.customerContactData.email : ''
    allData.customerContactData.phone   ? document.querySelector('#customerPhone').value    = allData.customerContactData.phone : ''
    allData.customerContactData.unit    ? document.querySelector('#customerUnit').value     = allData.customerContactData.unit : ''

    allData.processInfo.processName ? document.querySelector('#processName').value = allData.processInfo.processName : ''
    allData.processInfo.asIs ? document.querySelector('#shortAsIsExample').value = allData.processInfo.asIs : ''
    allData.processInfo.toBe ? document.querySelector('#shortToBeExample').value = allData.processInfo.toBe : ''

    allData.charOfProcess.percentageOfBusExt ? document.querySelector('#percentageOfBusExt').value = allData.charOfProcess.percentageOfBusExt : ''
    allData.charOfProcess.algorythm ? document.querySelector('#rulesCheck1').checked = true : ''
    allData.charOfProcess.rules ? document.querySelector('#rulesCheck2').checked = true : ''
    allData.charOfProcess.order ? document.querySelector('#rulesCheck3').checked = true : ''
    allData.charOfProcess.editing ? document.querySelector('#rulesCheck4').checked = true : ''
    allData.charOfProcess.understandbl ? document.querySelector('#rulesCheck5').checked = true : ''
    allData.charOfProcess.handOperations ? document.querySelector('#rulesCheck6').checked = true : ''
    allData.charOfProcess.muchRepeat ? document.querySelector('#rulesCheck7').checked = true : ''

    allData.countEntrProcess.howHardIsIt ? document.querySelector('#howHardIsIt').value = allData.countEntrProcess.howHardIsIt : ''
    allData.countEntrProcess.numberOfEmployee ? document.querySelector('#numberOfWorkers').value = allData.countEntrProcess.numberOfEmployee : ''

    allData.dataInProcess.standartData ? document.querySelector('#dataCheck1').checked = true : ''
    allData.dataInProcess.unStandartStructData ? document.querySelector('#dataCheck2').checked = true : ''
    allData.dataInProcess.unStandartUnStructData.checked ? document.querySelector('#dataCheck3').checked = true : ''
    allData.dataInProcess.unStandartUnStructData.percent ? document.querySelector('#unStrDataPercent').value = allData.dataInProcess.unStandartUnStructData.percent : ''
    allData.dataInProcess.unStandartUnStructData.percent ? document.querySelector('.unStrPercent').style.display = 'block' : ''

    allData.extraInfo.restrictions ? document.querySelector('#restrictions').value = allData.extraInfo.restrictions : ''
    allData.extraInfo.comments ? document.querySelector('#attentionComments').value = allData.extraInfo.comments : ''

    if (allData.usedSystems.length > 1) {
        allData.usedSystems.forEach((item, i) => {
            if (i+1 == 1) {
                document.querySelector('#systemName1').value = item.name
            } else {
                addSystem() 
                document.querySelector(`#systemName${i+1}`).value = item.name
            }
        }) 
    } else {
        allData.usedSystems[0] ? document.querySelector('#systemName1').value = allData.usedSystems[0].name : ''
    }
} 