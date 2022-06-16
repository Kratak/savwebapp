const isEven = (n: number) => {
    return n % 2 === 0;
};

const isOdd = (n: number) => {
    return Math.abs(n % 2) === 1;
};

export const calculationsHelpers = {
    isEven,
    isOdd,
};
