const test = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]+$/
// /^[A-Za-z0-9А-Яа-яЁё ]+$/


class FormEditing {
    hideById(id) {
        document.querySelector(`#${id}`).style.display = 'none'
    }

    showById(id) {
        document.querySelector(`#${id}`).style.display = 'block'
    }

    goToNextFormBlock() {
        const curElemLi = document.querySelector('[class="nav-link active"]')
        const curElemDiv = document.querySelector('[class="tab-pane fade show active"]')
        curElemLi.className = 'nav-link disabled'
        curElemDiv.className = 'tab-pane fade'
        curElemLi.parentElement.nextElementSibling.children[0].className = 'nav-link active'
        curElemDiv.nextElementSibling.classList.add('show', 'active')
    }

    goToPrevFormBlock() {
        const curElemLi = document.querySelector('[class="nav-link active"]')
        const curElemDiv = document.querySelector('[class="tab-pane fade show active"]')
        if (curElemDiv.id != 'pills-contact') {
            curElemLi.className = 'nav-link disabled'
            curElemDiv.className = 'tab-pane fade'            
            curElemLi.previousElementSibling ? curElemLi.previousSibling.parentElement.previousElementSibling.children[0].className = 'nav-link active' : curElemLi.parentElement.previousElementSibling.children[0].className = 'nav-link active'
            curElemDiv.previousElementSibling.classList.add('show', 'active')    
        } 
    }

    addSystem() {
        const elem = document.querySelector('#systemsNames')
        const newSystem = document.createElement('div')
        newSystem.className = 'systemsNames-block'
        if (elem.childElementCount == 0) {
            newSystem.innerHTML =
                `
                    <label for="systemName${elem.childElementCount + 1}" class="mt-3">Наименование системы ${elem.childElementCount + 1}</label>
                    <small id="systemName1Help" class="form-text text-muted">
                                Например:
                                <br />
                                - ORACLE, SAP, 1С
                                <br />
                                - Интернет-ресурс
                                <br />
                                - Внутренняя разработка
                                <br />
                                <br />
                                Разрешены только буквы, цифры и пробелы
                            </small>
                    <input class="form-control" type="text" id="systemName${elem.childElementCount + 1}">  
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
        if (elem.childElementCount > 0) {
            elem.removeChild(elem.lastChild)
        }
    }

    createDivForSystem(sysName) {
        const mainDiv = document.createElement('div')
        Object.assign(mainDiv, {
            style: {
                display: 'block',
            },
            id: `${sysName}Info`,
            className: 'form-group'
        })
        mainDiv.innerHTML = 
            `
                <small id="info${sysName}Invalid" class="form-text text-danger" style="display: none">Отметьте
                все поля</small>

                <h1 id="info${sysName}-name" class="display-4">${sysName.split('-').join(' ')}</h1>

                <label for="DesktopNumber${sysName}">Количество экранов</label>
                <small id="DesktopNumber${sysName}Help" class="form-text text-muted">Ориентировочное количество
                    рабочих экранов (не более 999)</small>
                <input type="text" class="form-control" id="desktopNumber${sysName}">        

                <fieldset class="form-group mt-2">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 pt-0">Возможно ли взаимодействие через API?
                        </legend>
                        <div class="col-sm-10">
                            <div class="form-check mt-1">
                                <input class="form-check-input radio-systemInfo" type="radio" name="apiAvaible${sysName}"
                                    id="apiAvaible${sysName}">
                                <label class="form-check-label" for="apiAvaible${sysName}">
                                    Да
                                </label>
                            </div>
                            <div class="form-check mt-3">
                                <input class="form-check-input radio-systemInfo" type="radio" name="apiAvaible${sysName}"
                                    id="apiNotAvaible${sysName}">
                                <label class="form-check-label" for="apiNotAvaible${sysName}">
                                    Нет
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 pt-0">Доступ к системе</legend>
                        <div class="col-sm-10">
                            <div class="form-check mt-1">
                                <input class="form-check-input radio-info${sysName}" type="radio" name="enter${sysName}"
                                    id="enterStraight${sysName}">
                                <label class="form-check-label" for="enterStraight${sysName}">
                                    Прямой
                                </label>
                            </div>
                            <div class="form-check mt-3">
                                <input class="form-check-input radio-info${sysName}" type="radio" name="enter${sysName}"
                                    id="remote${sysName}">
                                <label class="form-check-label" for="remote${sysName}">
                                    Удаленный через VDI / Citrix
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 pt-0">Тестовая среда</legend>
                        <div class="col-sm-10">
                            <div class="form-check mt-1">
                                <input class="form-check-input radio-info${sysName}" type="radio" name="testHabitat${sysName}"
                                    id="testAvaible${sysName}">
                                <label class="form-check-label" for="testAvaible${sysName}">
                                    Доступна
                                </label>
                            </div>
                            <div class="form-check mt-3">
                                <input class="form-check-input radio-systemInfo" type="radio" name="testHabitat${sysName}"
                                    id="testNotAvaible${sysName}">
                                <label class="form-check-label" for="testNotAvaible${sysName}">
                                    Не доступна
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <button class="btn btn-info float-right" id="infoSend${sysName}" system="${sysName}" type="button">Дальше >>></button>
            `
        return mainDiv
    }

    createLiForSystem(sysName) {
        let liElem = document.createElement('li')
        liElem.className = 'nav-item ml-3'
        liElem.setAttribute('system', sysName)
        let liSubElem = document.querySelector('[class="nav-link disabled"]').cloneNode()
        Object.assign(liSubElem, {
            id: `pills-${sysName}-tab`,
            href: `pills-${sysName}`,
            innerText: sysName.split('-').join(' ')
        })
        liSubElem.setAttribute('aria-controls', `pills-${sysName}`)
        liElem.appendChild(liSubElem)
        return liElem
    }

    createTabForSystem(eName, cb) {
        const sysName = eName.split(' ').join('-')
        const ulElem = document.querySelector('#pills-tab')
        ulElem.insertBefore(this.createLiForSystem(sysName), ulElem.children[ulElem.childElementCount - 1])
        const tabContent = document.querySelector('.tab-content')
        const mainDivElem = document.querySelector('#pills-allInfo').cloneNode()
        mainDivElem.id = `pills-${sysName}`
        mainDivElem.setAttribute('aria-labelledby', `pills-${sysName}-tab`)
        mainDivElem.setAttribute('system', sysName)
        mainDivElem.appendChild(this.createDivForSystem(sysName))
        tabContent.insertBefore(mainDivElem, tabContent.children[tabContent.childElementCount - 1])
        cb(eName)
    }

    enterSavedInfoAboutSystem(system) {
        const savedVal = Object.keys(system).filter(e => e != 'name' ? e : '')
        savedVal.forEach(e => {
            if (e == 'desktopNumber') {
                document.querySelector(`#${e}${system.name.split(' ').join('-')}`).value = system[e]
            } else {
                const inputsElem = document.querySelectorAll(`input[name='${e}${system.name.split(' ').join('-')}']`)
                system[e] ? inputsElem[0].checked = true : inputsElem[1].checked = true
            }
        })
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

    checkForLength(value, length) {
        if (value.length > length) {
            return false
        } else return true
    }

    checkForOnlySpaces(elem) {
        elem.value = elem.value.trim()
    }

    customInput(id, length) {
        let elem = document.querySelector(`#${id}`)
        this.checkForOnlySpaces(elem)
        if (length) {
            console.log(length)
            if (this.checkForLength(elem.value, length)) {
                this.customInput(id)
            } else return this.showError(id)
        }
        if (elem.value) {
            allData[elem.name][id] = elem.value
            return this.hideError(id)
        } else return this.showError(id)
    }

    checkInput(id, options) {
        const elem = document.querySelector(`#${id}`)
        elem.value = elem.value.trim()
        if (elem.value) {
            if (options && typeof options == "object" && Object.keys(options).length > 0) {
                Object.keys(options).forEach(key => {
                    if (key == 'type') {
                        if (options[key] == 'phone'){
                            return this.checkInput(id, {length: 18})
                        } else if (options[key] == 'number') {
                            const numReg = /^[0-9 \.]+$/
                            if (numReg.test(elem.value)) {
                                delete options[key]
                                return this.checkInput(id, options)
                            } else {
                                return this.showError(id)
                            }
                        } else if (options[key] == 'email') {
                            const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            if (mailReg.test(String(elem.value).toLowerCase())) {
                                delete options[key]
                                return this.checkInput(id, options)
                            } else return this.showError(id)
                        }
                    } else if (key == 'length') {
                        if (elem.value.length > options[key]) {
                            return this.showError(id)
                        } else {
                            delete options[key]
                            return this.checkInput(id, options)
                        } 
                    } else return this.showError(id)
                })
            } else {
                allData[elem.name][id] = elem.value
                return this.hideError(id)
            }
        } else {
            return this.showError(id)
        }
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
        let validName = this.checkInput('customerName', {length: 32})
        let validMail = this.checkInput('customerEmail', {type: 'email'})
        let validUnit = this.customInput('customerUnit', 32)
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
        let unStrDataBool = unStrDataPercentElem.value ? this.customInput('unStrDataPercent', 2) : `Doesn't exist`
        allData.dataInProcess.standartData = allDataCheckElems[0].checked
        allData.dataInProcess.unStandartStructData = allDataCheckElems[1].checked
        if (typeof unStrDataBool == 'string' && (allDataCheckElems[0].checked || allDataCheckElems[1].checked)) {
            return true
        } else if (unStrDataBool) {
            return true
        } else {
            return false
        }
    }

    getEnteredSystems() {
        const namesMass = []
        const uniqueNames = {}
        const regForSysName = /^[A-Za-z0-9А-Яа-яЁё ]+$/
        for (let i = 1; i < document.querySelector('#systemsNames').childElementCount + 1; i++) {
            const elem   = document.querySelector(`#systemName${i}`)
            this.checkForOnlySpaces(elem)
            regForSysName.test(elem.value) ? '' : elem.value = ''
            if (!elem.value || elem.value.length > 25) {
                return false
            }
            namesMass.push(elem.value.toLowerCase().trim())
        }
        namesMass.forEach(e => {
            uniqueNames[e] = true
        })
        return Object.keys(uniqueNames)
    }

    getExistSystems() {
        const existSystems = []
        if (allData.usedSystems) {
            allData.usedSystems.forEach(e => {
                existSystems.push(e.name)
            })
        }
        return existSystems
    }

    systemsInfo() {
        const enteredSys = this.getEnteredSystems(),
            existSys = this.getExistSystems()
        if (enteredSys) {
            const newSys = enteredSys.filter(e => {
                let exist = false
                existSys.forEach(elem => {
                    if (e == elem) {
                        exist = true
                    }
                })
                if (!exist) {
                    return e
                }
            })
            const deletedSys = existSys.filter(e => {
                let exist = false
                enteredSys.forEach(elem => {
                    if (e == elem) {
                        exist = true
                    }
                })
                if (!exist) {
                    return e
                }
            })
            if (deletedSys) {
                deletedSys.forEach(e => {
                    document.querySelector(`li[system="${e.split(' ').join('-')}"]`).remove()
                    document.querySelector(`div[system="${e.split(' ').join('-')}"]`).remove()
                    allData.usedSystems.forEach((f, index) => {
                        if (f.name == e) {
                            allData.usedSystems.splice(index,1)
                        }
                    })
                })
            }
            return newSys
        }
        
    }
}