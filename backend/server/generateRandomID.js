const generateRandomID = (length) => {
    if (length <= 34) {
        return Math.random().toString(36).substring(2, 2 + length);
    }
    else {
        return Math.random().toString(36).substring(2, 36);
    }
};
export default generateRandomID;
//# sourceMappingURL=generateRandomID.js.map