const getInitials = name => {
    if (name) {
        const names = name.split(" ");
        if (names.length === 1)
            return names[0][0];
        else if (names.length === 2) {
            return `${names[0][0]}${names[1][0]}`;
        }
    } else {
        return "A";
    }
};


export const UTILS = { getInitials };
