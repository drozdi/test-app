import { useState } from "react";
const validation = (value, rules = []) => {
    return rules.map(rule => rule(value)).filter(v => v !== true);
}
export const useInput = (defValue, rules = []) => {
    const [value, setValue] = useState(defValue);
    const [dirty, setDirty] = useState(false);
    const [errors, setErrors] = useState(validation(value, rules));

    return {
        value,
        dirty,
        errors,
        onBlur: (e) => {
            setDirty(true);
        },
        onChange: ({ target }) => {
            setValue(target.value);
            setErrors(validation(target.value, rules))
        }
    }
}