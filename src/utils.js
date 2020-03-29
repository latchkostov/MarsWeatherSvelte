export function displayDate(date) {
    return date.toLocaleDateString(
        undefined,
        { day: 'numeric', month: 'long'}
    );
}

export function getTempUnitSymbol(isMetric) {
    return isMetric ? '° C' : '° F';
}

export function getSpeedUnitSymbol(isMetric) {
    return isMetric ? 'KPH' : 'MPH';
}

export function getConvertedTemperature(tempInCelcius, toMetric) {
    return toMetric ? Math.round(tempInCelcius) : Math.round((tempInCelcius * (9/5)) + 32);
}