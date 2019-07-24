let systemCount = 1

const validate = new ValidateInputs()
const changeForm = new FormEditing()

document.querySelector('#addSystem').addEventListener('click', e => {
    e.preventDefault()
    changeForm.addSystem()
})

document.querySelector('#delSystem').addEventListener('click', e => {
    e.preventDefault()
    changeForm.removeLastSystem()
})

document.querySelector('#dataCheck3').addEventListener('change', e => {
    e.target.checked ? document.querySelector('.unStrPercent').style.display = 'block' : document.querySelector('.unStrPercent').style.display = 'none'
})

document.querySelector('#customerDataNext').addEventListener('click', e => {
    e.preventDefault()

    if (validate.firstForm()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock('pills-contact', 'pills-allInfo')
    }

})

document.querySelector('#processInfoNext').addEventListener('click', e => {
    e.preventDefault()

    validate.secondForm()

    if (validate.secondForm()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))

        changeForm.goToNextFormBlock('pills-allInfo', 'pills-processSet')
    }
})

document.querySelector('#processSetNext').addEventListener('click', e => {
    e.preventDefault()
    if (validate.percentOfBusExt()) {
        document.querySelectorAll(`.rule-checkBox`).forEach(e => {
            allData.charOfProcess[e.value] = e.checked
        })
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock('pills-processSet', 'pills-countEntrProcess')
    }
})

document.querySelector('#countEntrProcessNext').addEventListener('click', e => {
    e.preventDefault()

    if (validate.employeeOrDifficult()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock('pills-countEntrProcess', 'pills-dataInProcess')
    }
})

document.querySelector('#dataInProcessNext').addEventListener('click', e => {
    e.preventDefault()
    if (validate.processData()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock('pills-dataInProcess', 'pills-usedSystems')
    }
})

document.querySelector('#addInfoForSystems').addEventListener('click', e => {
    e.preventDefault()
    let errorStatus = false
    for (let i = 1; i < document.querySelector('#systemsNames').childElementCount + 1; i++) {
        validate.checkForOnlySpaces(`systemName${i}`)
        if (!document.querySelector(`#systemName${i}`).value) {
            changeForm.showById('someNameMissed')
            errorStatus = true
            break
        }
    }
    if (!errorStatus) {
        let massiveToHide = ['systemsNames','systemsButtons','systemsAddInfo','someNameMissed'].forEach(e => changeForm.hideById(e))
            massiveToShow = ['systemsInfo', 'nextSystem'].forEach(e => changeForm.showById(e))
        allData.usedSystems.splice(0, allData.usedSystems.length)
        document.querySelector('#systemInfo-name').innerHTML = document.querySelector(`#systemName1`).value
        document.querySelector('#systemsNames').childElementCount > 1 ? '' : document.querySelector('#nextSystem').innerHTML = 'Дальше >>>'
    }
})

document.querySelector('#nextSystem').addEventListener('click', e => {
    e.preventDefault()
    validate.checkForOnlySpaces('desktopNumber')
    if (
        (document.querySelector('#apiAvaible1').checked || document.querySelector('#apiAvaible2').checked) &&
        (document.querySelector('#systemEnter1').checked || document.querySelector('#systemEnter2').checked) &&
        (document.querySelector('#testHabitat1').checked || document.querySelector('#testHabitat2').checked) &&
        document.querySelector('#desktopNumber').value
    ) {
        changeForm.hideById('systemInfoInvalid')
        let systemObj = {
            name: document.querySelector('#systemInfo-name').innerHTML,
            desktopNumber: document.querySelector('#desktopNumber').value,
            apiAvaible: document.querySelector('#apiAvaible1').checked ? true : false,
            systemEnter: document.querySelector('#systemEnter1').checked ? 'Straight' : 'VDI / Citrix',
            testHabitat: document.querySelector('#testHabitat1').checked ? 'Avaible' : 'Not avaible'
        }
        allData.usedSystems.push(systemObj)
        if (systemCount == document.querySelector('#systemsNames').childElementCount) {
            localStorage.setItem('savedEnteredData', JSON.stringify(allData))
            changeForm.goToNextFormBlock('pills-usedSystems', 'pills-extraInfo')
        } else {
            systemCount += 1
            if (systemCount == document.querySelector('#systemsNames').childElementCount) {
                document.querySelector('#nextSystem').innerHTML = 'Next >>>'
            }
            document.querySelectorAll('.radio-systemInfo').forEach(e => e.checked = false)
            document.querySelector('#desktopNumber').value = ''
            document.querySelector('#systemInfo-name').innerHTML = document.querySelector(`#systemName${systemCount}`).value
        }
        document.querySelector('#pills-usedSystems-tab').className = 'nav-link disabled'
    } else changeForm.showById('systemInfoInvalid')
})

document.querySelector('#sendData').addEventListener('click', e => {
    e.preventDefault()
    validate.checkForOnlySpaces('restrictions')
    validate.checkForOnlySpaces('attentionComments')
    document.querySelector('#restrictions').value ? allData.extraInfo.restrictions = document.querySelector('#restrictions').value : console.log('no data in restr')
    document.querySelector('#attentionComments').value ? allData.extraInfo.comments = document.querySelector('#attentionComments').value : console.log('no comments')
    localStorage.setItem('savedEnteredData', JSON.stringify(allData))
})

const allData = localStorage.getItem('savedEnteredData') ? JSON.parse(localStorage.getItem('savedEnteredData')) : {
    customerContactData: {},
    processInfo: {},
    charOfProcess: {},
    countEntrProcess: {},
    dataInProcess: {
        unStandartUnStructData: {},
    },
    usedSystems: [],
    extraInfo: {},
}

if (localStorage.getItem('savedEnteredData')) {
    allData.customerContactData.name ? document.querySelector('#customerName').value = allData.customerContactData.name : ''
    allData.customerContactData.email ? document.querySelector('#customerEmail').value = allData.customerContactData.email : ''
    allData.customerContactData.phone ? document.querySelector('#customerPhone').value = allData.customerContactData.phone : ''
    allData.customerContactData.unit ? document.querySelector('#customerUnit').value = allData.customerContactData.unit : ''
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
            if (i + 1 == 1) {
                document.querySelector('#systemName1').value = item.name
            } else {
                changeForm.addSystem()
                document.querySelector(`#systemName${i+1}`).value = item.name
            }
        })
    } else {
        allData.usedSystems[0] ? document.querySelector('#systemName1').value = allData.usedSystems[0].name : ''
    }
}