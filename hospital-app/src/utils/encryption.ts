import CryptoJS from 'crypto-js'

const SECRET_KEY: string = "hospital_care_secret_key"

export const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

export const decrypData = (data: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    } catch (error) {
        console.log("Error desencriptando los datos", error)
    }
}