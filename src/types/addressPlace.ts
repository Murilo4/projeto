export type FormRegisterAddressValues = {
    addressName: string
    postal: string
    street: string
    city: string
    state: string
    number: string
    neighborhood: string
  }

  export type FormRegisterAddressErrors = {
    addressName: string[]
    postal: string[]
    street: string[]
    city: string[]
    state: string[]
    number: string[]
    neighborhood: string[]
  }

    export type InputName = keyof FormRegisterAddressValues