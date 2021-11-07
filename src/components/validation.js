function registerValidation( email, password, repeatPassword, firstName, lastName, address, city, zip ) {
    let validEmail = /\S+@\S+\.\S+/.test(email)
    let validPassword = password.length < 6 ? false : true
    let validRepeatPassword = repeatPassword === password ? true : false
    let validFirstName = firstName.length > 0 ? true : false
    let validLastName = lastName.length > 0 ? true : false
    let validAddress = address.length > 0 ? true : false
    let validCity = city.length > 0 ? true : false
    let validZip = zip.length > 0 ? true : false

    return [ validEmail, validPassword, validRepeatPassword, validFirstName, validLastName, validAddress, validCity, validZip ]
}

function loginValidation(email, password) {
    let validEmail = /\S+@\S+\.\S+/.test(email)
    let validPassword = password.length > 0 ? true : false

    return [ validEmail, validPassword]
}

export { registerValidation, loginValidation }