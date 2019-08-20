class validateFullForm extends ValidateInputs {
  constructor() {
    super();
  }

  customerInfoBlock() {
    const validName = this.checkInput("customerName", { length: 64 });
    const validMail = this.checkInput("customerEmail", { type: "email" });
    const validUnit = this.checkInput("customerUnit", { length: 32 });
    const validPhone = this.checkInput("customerPhone", { type: "phone" });
    if (validName && validMail && validUnit && validPhone) {
      return true;
    } else return false;
  }

  processInfoBlock() {
    const validName = this.checkInput("processName", { length: 32 });
    const validAsIs = this.checkInput("shortAsIsExample");
    const validToBe = this.checkInput("shortToBeExample");
    if (validName && validAsIs && validToBe) {
      return true;
    } else return false;
  }

  employeeAndDifficultBlock() {
    const workersElem = document.querySelector("#numberOfEmployee");
    const difElem = document.querySelector("#howHardIsIt");
    let validEmployee, validHard;
    workersElem.value = workersElem.value.trim();
    difElem.value = difElem.value.trim();
    workersElem.value
      ? (validEmployee = this.checkInput(workersElem.id, {
          number: { maxNum: 9999, minNum: 1 }
        }))
      : "";
    difElem.value
      ? (validHard = this.checkInput(difElem.id, {
          number: { maxNum: 9999, minNum: 1 }
        }))
      : "";
    if (validEmployee || validHard) {
      validHard ? (allData.countEntrProcess.howHardIsIt = difElem.value) : "";
      validEmployee
        ? (allData.countEntrProcess.numberOfEmployee = workersElem.value)
        : "";
      document.querySelector("#countrEtrProcessInvalid").style.display = "none";
      return true;
    } else {
      document.querySelector("#countrEtrProcessInvalid").style.display =
        "block";
      return false;
    }
  }

  processDataBlock() {
    const allDataCheckElems = document.querySelectorAll(
      'input[name="dataInProcess"]'
    );
    const unStrDataPercentElem = document.querySelector("#unStrDataPercent");
    const unStrDataBool = unStrDataPercentElem.value
      ? this.checkInput("unStrDataPercent", {
          number: { maxNum: 100, minNum: 0.01 }
        })
      : `Doesn't exist`;
    allData.dataInProcess.standartData = allDataCheckElems[0].checked;
    allData.dataInProcess.unStandartStructData = allDataCheckElems[1].checked;
    if (
      typeof unStrDataBool == "string" &&
      (allDataCheckElems[0].checked || allDataCheckElems[1].checked)
    ) {
      return true;
    } else if (unStrDataBool) {
      return true;
    } else {
      return false;
    }
  }

  systemsBlock() {
    const enteredSys = this.getEnteredSystems(),
      existSys = this.getExistSystems();
    if (enteredSys) {
      const newSys = enteredSys.filter(e => {
        let exist = false;
        existSys.forEach(elem => {
          if (e == elem) {
            exist = true;
          }
        });
        if (!exist) {
          return e;
        }
      });
      const deletedSys = existSys.filter(e => {
        let exist = false;
        enteredSys.forEach(elem => {
          if (e == elem) {
            exist = true;
          }
        });
        if (!exist) {
          return e;
        }
      });
      if (deletedSys) {
        deletedSys.forEach(e => {
          document
            .querySelector(`li[system="${e.split(" ").join("-")}"]`)
            .remove();
          document
            .querySelector(`div[system="${e.split(" ").join("-")}"]`)
            .remove();
          allData.usedSystems.forEach((f, index) => {
            if (f.name == e) {
              allData.usedSystems.splice(index, 1);
            }
          });
        });
      }
      return newSys;
    }
  }
}
