class ValidateInputsBeta {
  constructor() {
    this.mailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  showError(id, msg) {
    document.querySelector(`#${id}`).classList.add("border", "border-danger");
    document.querySelector(`#${id}Invalid`).style.display = "block";
    msg ? (document.querySelector(`#${id}Invalid`).innerText = msg) : "";
    return false;
  }

  hideError(elem) {
    document.querySelector(`#${elem.id}Invalid`).style.display = "none";
    elem.className = "form-control";
    allData[elem.name][elem.id] = elem.value;
    return true;
  }

  checkForOnlySpaces(elem) {
    elem.value = elem.value.trim();
  }

  checkInput(id, option) {
    const elem = document.querySelector(`#${id}`);
    this.checkForOnlySpaces(elem);

    if (!elem.value) {
      return this.showError(id, `Данное поле необходимо к заполнению`);
    }

    if (!option) {
      return this.hideError(elem);
    }

    if (!["phone", "email", "length", "number"].includes(option.type)) {
      return this.showError(
        id,
        `Что-то пошло не так, обновите страницу или обратитесь к администратору`
      );
    }

    switch (option.type) {
      case "phone": {
        if (elem.value.length != 18) {
          return this.showError(id, "Введен некорректный номер телефона");
        }
        return this.hideError(elem);
      }

      case "email": {
        if (!this.mailRegExp.test(String(elem.value).toLowerCase())) {
          return this.showError(
            id,
            `Введен некорректный email. Пример: test@test.com`
          );
        }
        return this.hideError(elem);
      }

      case "number": {
        if (
          !option.condition ||
          !option.condition.maxNum ||
          !option.condition.minNum
        ) {
          return this.showError(
            id,
            `Произошла ошибка, обновите страницу или обратитесь к администратору`
          );
        }

        const elemValue = parseFloat(elem.value.replace(",", "."));

        if (
          elemValue > option.condition.maxNum ||
          elemValue < option.condition.minNum ||
          isNaN(elemValue)
        ) {
          const msg = isNaN(elemValue)
            ? "Введено не число"
            : `Число должно быть в промежутке от ${
                option.condition.minNum
              } до ${option.condition.maxNum}`;
          return this.showError(id, msg);
        }

        // if (
        //   (option.condition.fractional || option.condition.fractional === 0) &&
        //   `${elemValue}`.split(".").length == 2
        // ) {
        //   if (
        //     `${elemValue}`.split(".")[1].length > option.condition.fractional
        //   ) {
        //     return this.showError(
        //       id,
        //       `Допустимое количество знаков после запятой: ${
        //         option.condition.fractional
        //       }`
        //     );
        //   }
        // }

        if (typeof option.condition.fractional !== "undefined") {
          const [, residue] = elemValue.toString().split(".");
          if (
            typeof residue !== "undefined" &&
            residue.length > option.condition.fractional
          ) {
            return this.showError(
              id,
              `Допустимое количество знаков после запятой: ${
                option.condition.fractional
              }`
            );
          }
        }

        return this.hideError(elem);
      }

      case "length": {
        if (!option.condition || !option.condition.size) {
          return this.showError(
            id,
            `Произошла ошибка, обновите страницу или обратитесь к администратору`
          );
        }

        if (elem.value.length > option.condition.size) {
          return this.showError(
            id,
            `Допустимое количество символов: ${option.condition.size}`
          );
        }

        return this.hideError(elem);
      }
    }
  }

  getEnteredSystems() {
    const namesMass = [];
    const uniqueNames = {};
    const regForSysName = /^[A-Za-z0-9А-Яа-яЁё ]+$/;
    for (
      let i = 1;
      i < document.querySelector("#systemsNames").childElementCount + 1;
      i++
    ) {
      const elem = document.querySelector(`#systemName${i}`);
      this.checkForOnlySpaces(elem);
      regForSysName.test(elem.value) ? "" : (elem.value = "");
      if (!elem.value || elem.value.length > 25) {
        return false;
      }
      namesMass.push(elem.value.toLowerCase().trim());
    }
    namesMass.forEach(e => {
      uniqueNames[e] = true;
    });
    return Object.keys(uniqueNames);
  }

  getExistSystems() {
    const existSystems = [];
    if (allData.usedSystems) {
      allData.usedSystems.forEach(e => {
        existSystems.push(e.name);
      });
    }
    return existSystems;
  }
}
