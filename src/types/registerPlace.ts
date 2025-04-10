export type FormRegisterPlaceValues = {
    placeName: string
    description: string
    type: string
    city: string
    state: string
    workStart: string
    workStop: string
    locationX: string
    locationY: string
    about: string
    categories: string
    photo: string
    enterprese: string
  }

  export type FormRegisterPlaceErrors = {
    placeName: string[]
    description: string[]
    type: string[]
    city: string[]
    state: string[]
    workStart: string[]
    workStop: string[]
    locationX: string[]
    locationY: string[]
    about: string[]
    categories: string[]
    photo: string[]
    enterprese: string[]
  }

    export type InputName = keyof FormRegisterPlaceValues