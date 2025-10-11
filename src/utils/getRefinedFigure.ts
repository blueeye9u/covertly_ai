export const getRefinedFigure = (figure: number) => {
    if (figure >= 1000000000000000) {
        return Math.round(figure / 1000000000000000) + "Q";
    } else if (figure >= 1000000000000) {
        return Math.round(figure / 1000000000000) + "T";
    } else if (figure >= 1000000000) {
        return Math.round(figure / 1000000000) + "B";
    } else if (figure >= 1000000) {
        return Math.round(figure / 1000000) + "M";
    } else if (figure >= 1000) {
        return Math.round(figure / 1000) + "K";
    } else {
        return figure.toLocaleString();
    }
};
  