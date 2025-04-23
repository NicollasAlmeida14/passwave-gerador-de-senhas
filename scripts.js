const generatePasswordButton = document.querySelector('button')
const copyIncon = document.querySelector('#copy-password')

const getPasswordElements = () => {
    const uppercase = document.querySelector('#uppercase').checked
    const lowercase = document.querySelector('#lowercase').checked
    const number = document.querySelector('#number').checked
    const specialCharacter = document.querySelector('#special-character').checked

    let characterTypes = []

    if (uppercase) {
        characterTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }

    if (lowercase) {
        characterTypes.push('abcdefghijklmnopqrstuvwxyz')
    }

    if (number) {
        characterTypes.push('0123456789')
    }

    if (specialCharacter) {
        characterTypes.push('!@#$%&*?')
    }

    return characterTypes
}

const getRandomCharacter = (characterTypes) => {
    const randomIndex = Math.floor(Math.random() * characterTypes.length)

    return characterTypes[randomIndex][Math.floor(Math.random() * characterTypes[randomIndex].length)];
}

const getPasswordSize = () => {
    const selectPasswordSize = document.querySelector('#password-size').value

    return selectPasswordSize
}


const generateRandomPassword = (size, characterTypes) => {
    let generatedPassword = ''

    while (generatedPassword.length < size) {
        generatedPassword += getRandomCharacter(characterTypes)
    }

    return generatedPassword
}

const showPassword = () => {
    const size = getPasswordSize()
    const passwordElements = getPasswordElements()

    const showPasswordInput = document.querySelector('#show-password-input')
    const containerInput = document.querySelector('#input-container')

    if (!passwordElements.length) {
        message('Selecione pelo menos UM caractere para que possamos gerar a sua senha!', '#cd2626')
        return;
    } else {
        showPasswordInput.value = generateRandomPassword(size, passwordElements)
        containerInput.classList.remove('hidden')
    }
}

const copyPassword = () => {
    navigator.clipboard.writeText(document.querySelector('#show-password-input').value)
    message('Senha copiada com sucesso!', ' #84cc16')
}

const message = (text, background) => {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: background
        }
    }).showToast()
}

generatePasswordButton.addEventListener('click', showPassword)
copyIncon.addEventListener('click', copyPassword)