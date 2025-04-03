export type FormRegisterAddressValues = {
    addressName: string
    cep: string
    street: string
    city: string
    state: string
    number: string
    neighborhood: string
  }

  export type FormRegisterAddressErrors = {
    addressName: string[]
    cep: string[]
    street: string[]
    city: string[]
    state: string[]
    number: string[]
    neighborhood: string[]
  }

    export type InputName = keyof FormRegisterAddressValues