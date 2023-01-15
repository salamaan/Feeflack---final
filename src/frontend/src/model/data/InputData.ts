import {InputState} from "../../hook/useInput";

export interface InputData {
    label: string;
    type: string;
    state: InputState;
    errorMessages: string[];
}