import { useState } from 'react';

export const useStore = (defState = {}) => {
    const [state, setState] = useState(defState);

    return {
        get: () => state,
        set: (newState = {}) => setState(newState),
        update: (key, val) => {
            setState(v => ({ ...v, [key]: val }));
        },
        reset: () => {
            setState(defState);
        }
    };
};