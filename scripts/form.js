function validateForm() {
    let errorMessage = ""

    let emailInput = document.getElementById("email");
    if (!validateEmail(emailInput.value)) {
        errorMessage += "- O e-mail informado é inválido;\n";
    }

    let passwordInput = document.getElementById("password");
    let passwordError = validatePassword(passwordInput.value);
    if (passwordError.length != 0) {
        errorMessage += passwordError;
    }

    let confirmPwdInput = document.getElementById("confirm-pwd");
    if (passwordInput.value != confirmPwdInput.value) {
        errorMessage += "- As senhas informadas não são iguais;\n";
    }

    let hasSiteInput = document.getElementById("has-site");
    if (hasSiteInput.checked) {
        let urlInput = document.getElementById("site");

        if (urlInput.value.length == 0) {
            errorMessage += "- Informe o site da sua empresa;\n";
        } else if (!validateURL(urlInput.value)) {
            errorMessage += "- O site informado não é válido;\n";
        }        
    }

    if (errorMessage.length != 0) {
        alert(errorMessage);
        return false;
    }

    return true;
}

function validateEmail(email) {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(emailRegex);
}

function validatePassword(password) {
    let errorMessage = ""

    if (password.length < 6) {
        errorMessage += "- A senha deve conter no mínimo 6 caracteres;\n"
    } else if (password.length > 10) {
        errorMessage += "- A senha deve conter no máximo 10 caracteres;\n"
    }

    let hasUpper = false
    let hasLower = false
    let hasNumber = false
    for (const character of password) {
        if (character.toUpperCase() === character.toLowerCase()) {
            if (!hasNumber && !isNaN(character)) {
                hasNumber = true;
            }

            continue;
        }

        if (!hasUpper && character === character.toUpperCase()) {
            hasUpper = true;
        }

        if (!hasLower && character === character.toLowerCase()) {
            hasLower = true;
        }
    }

    if (!hasUpper) {
        errorMessage += "- A senha deve conter pelo menos uma letra minúscula;\n"
    }

    if (!hasLower) {
        errorMessage += "- A senha deve conter pelo menos uma letra minúscula;\n"
    }

    if (!hasNumber) {
        errorMessage += "- A senha deve conter pelo menos um número;\n"
    }

    return errorMessage
}

function validateURL(url) {
    // https://gist.github.com/dperini/729294 - Copyright (c) 2010-2018 Diego Perini
    let urlRegex = new RegExp(
        "^" +
          // protocol identifier (optional)
          // short syntax // still required
          "(?:(?:(?:https?|ftp):)?\\/\\/)" +
          // user:pass BasicAuth (optional)
          "(?:\\S+(?::\\S*)?@)?" +
          "(?:" +
            // IP address exclusion
            // private & local networks
            "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
            "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broadcast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
          "|" +
            // host & domain names, may end with dot
            // can be replaced by a shortest alternative
            // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
            "(?:" +
              "(?:" +
                "[a-z0-9\\u00a1-\\uffff]" +
                "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
              ")?" +
              "[a-z0-9\\u00a1-\\uffff]\\." +
            ")+" +
            // TLD identifier name, may end with dot
            "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
          ")" +
          // port number (optional)
          "(?::\\d{2,5})?" +
          // resource path (optional)
          "(?:[/?#]\\S*)?" +
        "$", "i"
      );

    return url.match(urlRegex);
}

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const button = document.querySelector('button[type="submit"]');
    const success = document.querySelector('.success');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(form);
        
        const ajax = new XMLHttpRequest();
        ajax.open("POST", "https://app.rdstation.com.br/signup");
        ajax.setRequestHeader("Accept", "application/json");
        ajax.onreadystatechange = () => {
            if (ajax.readyState !== XMLHttpRequest.DONE) return;
            form.reset();
            form.style.display = "none";
            success.style.display = "block";
        };

        ajax.send(data);
    });
});