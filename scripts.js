let systemCount = 1
const validate = new ValidateInputs()
const changeForm = new FormEditing()

function systemInfoSend(e) {
    e.preventDefault()
    const sysName = e.target.getAttribute('system')
    const deskInput = document.querySelector(`#desktopNumber${sysName}`).value.trim()
    const apiCheck = document.querySelectorAll(`[name="apiAvaible${sysName}"]`)
    const enterCheck = document.querySelectorAll(`[name="enter${sysName}"]`)
    const habCheck = document.querySelectorAll(`[name="testHabitat${sysName}"]`)
    if ((deskInput && deskInput.length < 4) 
        && (apiCheck[0].checked || apiCheck[1].checked) 
        && (enterCheck[0].checked || enterCheck[1].checked) 
        && (habCheck[0].checked || habCheck[1].checked)){
        changeForm.hideById(`info${sysName}Invalid`)
        let ind = false
        const sysObj = {
            name: sysName.split('-').join(' '),
            desktopNumber: deskInput,
            apiAvaible: apiCheck[0].checked,
            enter: enterCheck[0].checked,
            testHabitat: habCheck[0].checked
        }
        allData.usedSystems.forEach((e, index) => {
            if (e.name == sysName.split('-').join(' ')) {
                ind = index
            }
        })
        if (ind >= 0) {
            allData.usedSystems[ind] = sysObj
        } else {
            allData.usedSystems.push(sysObj)
        }
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock()
    } else {
        changeForm.showById(`info${sysName}Invalid`)
    }
}

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

document.querySelector('#prev').addEventListener('click', e => {
    e.preventDefault()
    changeForm.goToPrevFormBlock()
})

document.querySelector('#customerDataNext').addEventListener('click', e => {
    e.preventDefault()
    if (validate.firstForm()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock()
    }
})

document.querySelector('#processInfoNext').addEventListener('click', e => {
    e.preventDefault()
    validate.secondForm()
    if (validate.secondForm()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock()
    }
})

document.querySelector('#processSetNext').addEventListener('click', e => {
    e.preventDefault()
    if (validate.customInput('percentageOfBusExt', 2)) {
        document.querySelectorAll(`.rule-checkBox`).forEach(e => {
            allData.charOfProcess[e.value] = e.checked
        })
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock()
    }
})

document.querySelector('#countEntrProcessNext').addEventListener('click', e => {
    e.preventDefault()
    if (validate.employeeOrDifficult()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock()
    }
})

document.querySelector('#dataInProcessNext').addEventListener('click', e => {
    e.preventDefault()
    if (validate.processData()) {
        localStorage.setItem('savedEnteredData', JSON.stringify(allData))
        changeForm.goToNextFormBlock()
    }
})

document.querySelector('#addInfoForSystems').addEventListener('click', e => {
    e.preventDefault()
    let nameMass = false
    nameMass = validate.systemsInfo()
    if (nameMass) {
        nameMass.forEach(e => {
            changeForm.createTabForSystem(e, function addToAllData(n) {
                allData.usedSystems.push({name: e})
                document.querySelector(`#infoSend${n.split(' ').join('-')}`).addEventListener('click', systemInfoSend)  
            })
        })
        changeForm.goToNextFormBlock()
    } else if (validate.getEnteredSystems()) {
        changeForm.goToNextFormBlock()
    } else changeForm.showById('someNameMissed')
})

document.querySelector('#sendData').addEventListener('click', e => {
    e.preventDefault()
    const restElem = document.querySelector('#restrictions')
    const commentsElem = document.querySelector('#comments')
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
            allData[mainKey].forEach((e) => {
                changeForm.createTabForSystem(e.name, function enterLocalData (eName) {
                    if (e.desktopNumber) {
                        changeForm.enterSavedInfoAboutSystem(e)
                    }
                    document.querySelector(`#infoSend${eName.split(' ').join('-')}`).addEventListener('click', systemInfoSend)
                })
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