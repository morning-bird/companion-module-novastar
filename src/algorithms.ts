export const Ciphers = {
    AUTO: 0,
    AES256: 1,
    AES192: 2,
    AES128: 3,
}

export const createAlgorithmsObjectForSSH2 = (config: any) => {
    let regex = undefined

    switch (config.preferedCipher) {
        case Ciphers.AUTO:
            return undefined;
        case Ciphers.AES256:
            regex = new RegExp(/aes256/);
            break;
        case Ciphers.AES192:
            regex = new RegExp(/aes192/);
            break;
        case Ciphers.AES128:
            regex = new RegExp(/aes128/);
            break;
        default:
            break;
    }

    return {
        cipher: {
            prepend: regex,
        },
    };
}
