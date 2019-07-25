let systemCount = 1
const validate = new ValidateInputs()
const changeForm = new FormEditing()

document.querySelector('#test').style.display = 'none'

document.querySelector('#addSystem').addEventListener('click', e => {
    e.preventDefault()
    changeForm.addSystem()
})

document.querySelector('#delSystem').addEventListener('click', e => {
    e.preventDefault()
    changeForm.removeLastSystem()
})

document.querySelector('#dataCheck').addEventListener('change', e => {
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
    if (validate.customInput('percentageOfBusExt')) {
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
        let elem = document.querySelector(`#systemName${i}`)
        validate.checkForOnlySpaces(elem)
        if (!document.querySelector(`#systemName${i}`).value) {
            changeForm.showById('someNameMissed')
            errorStatus = true
            break
        }
    }
    if (!errorStatus) {
        let massiveToHide = ['systemsNames','systemsButtons','systemsAddInfo','someNameMissed'].forEach(e => changeForm.hideById(e)),
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
            apiAvaible: document.querySelector('#apiAvaible1').checked,
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
    let restElem = document.querySelector('#restrictions')
    let commentsElem = document.querySelector('#comments')
    validate.checkForOnlySpaces(restElem)
    validate.checkForOnlySpaces(commentsElem)
    restElem.value ? allData.extraInfo.restrictions = restElem.value : console.log('no data in restr')
    commentsElem.value ? allData.extraInfo.comments = commentsElem.value : console.log('no comments')
    localStorage.setItem('savedEnteredData', JSON.stringify(allData))
})

const allData = localStorage.getItem('savedEnteredData') ? JSON.parse(localStorage.getItem('savedEnteredData')) : {
    customerContactData: {},
    processInfo: {},
    charOfProcess: {},
    countEntrProcess: {},
    dataInProcess: {},
    usedSystems: [],
    extraInfo: {},
}

if (localStorage.getItem('savedEnteredData')) {
    Object.keys(allData).forEach(mainKey => {
        if (mainKey != 'usedSystems') {
            Object.keys(allData[mainKey]).forEach(subKey => {
                let elem = document.querySelector(`#${subKey}`)
                if (elem.type == 'text' || elem.type == 'textarea') {
                    elem.value = allData[mainKey][subKey]
                    if (subKey == 'unStrDataPercent' && allData[mainKey][subKey]) {
                        document.querySelector('#dataCheck').checked = true
                        document.querySelector('.unStrPercent').style.display = 'block'
                    }
                } else if (elem.type == 'checkbox') {
                    elem.checked = allData[mainKey][subKey]
                } else console.log('smthng goes wrong')
            })
        } else {
            allData[mainKey].forEach(e => {
                let ulElem = document.querySelector('#pills-tab')
                let liElem = document.createElement('li')
                liElem.className = 'nav-item ml-3'
                let liSubElem = document.querySelector('#pills-usedSystems-tab').cloneNode()
                Object.assign(liSubElem, {id: `pills-${e.name.replace(/\s/g, '')}-tab`, href: `pills-${e.name.replace(/\s/g, '')}`, innerText: e.name})
                liSubElem.setAttribute('aria-controls', `pills-${e.name.replace(/\s/g, '')}`)
                liElem.appendChild(liSubElem)
                ulElem.insertBefore(liElem, ulElem.children[ulElem.childElementCount - 1])
                
            })
        }
    })
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


// const testArr = {
//     name: 'test',
//     des: 'uno',
// }

// Object.assign(testArr, {name: 'uno'})

// console.log(testArr)



// console.log(document.querySelector('#systemsNames').children[0].children[1].value)
// console.log(document.querySelector('#pills-tab').lastChild)
// const testElem = document.createElement('li')
// const subTestElem = document.querySelector('#pills-usedSystems-tab').cloneNode()
// Object.assign(subTestElem, {id: 'pills-UsedSystemsInfo-tab', href: '#pills-usedSystemsInfo', innerText: document.querySelector('#systemsNames').children[0].children[1].value})
// subTestElem.setAttribute('aria-controls', 'pills-usedSystemsInfo')
// testElem.className = 'nav-item ml-3'
// testElem.appendChild(subTestElem)

// document.querySelector('#pills-tab').insertBefore(testElem, document.querySelector('#pills-tab').children[document.querySelector('#pills-tab').childElementCount - 1])


