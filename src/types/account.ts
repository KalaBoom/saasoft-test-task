import { TypeAccountEnum } from "@/enum/typeAccountEnum"

interface AccountWithoutMark {
    id: number,
    type: TypeAccountEnum,
    login: string,
    password: string | null
}

export interface Account extends AccountWithoutMark {
    mark: string
}

interface SaveMark {
    text: string;
}
export interface SavedAccount extends AccountWithoutMark {
    mark: Array<SaveMark>,
}