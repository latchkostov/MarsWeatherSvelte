<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    import CurrentWeatherDate from './CurrentWeatherDate.svelte';
    import CurrentWeatherTemperature from './CurrentWeatherTemperature.svelte';
    import CurrentWeatherWind from './CurrentWeatherWind.svelte';
    import CurrentWeatherUnitToggle from './CurrentWeatherUnitToggle.svelte';
    import { getTempUnitSymbol, getSpeedUnitSymbol, getConvertedTemperature } from './utils.js';
    export let sol;

    let tempUnitSymbol;
    let speedUnitSymbol;
    let isMetric = true;

    tempUnitSymbol = getTempUnitSymbol(isMetric);
    speedUnitSymbol = getSpeedUnitSymbol(isMetric);

    let currentSolMinTemp = Math.round(sol.minTemp);
    let currentSolMaxTemp = Math.round(sol.maxTemp);
    let currentSolWindSpeed = Math.round(sol.windSpeed);
    let currentSolWindDirectionDegrees = sol.windDirectionInDegress;
    let lastWindDirectionInDegrees = currentSolWindDirectionDegrees;

    function handleUnitChange(event) {
        isMetric = event.detail.isMetric;
        dispatch('unitChanged', {
            isMetric: isMetric
        });
        tempUnitSymbol = getTempUnitSymbol(isMetric);
        speedUnitSymbol = getSpeedUnitSymbol(isMetric);
        currentSolMinTemp = getConvertedTemperature(sol.minTemp, isMetric);
        currentSolMaxTemp = getConvertedTemperature(sol.maxTemp, isMetric);
        currentSolWindSpeed = getConvertedSpeed(sol.windSpeed, isMetric);
    }

    function getConvertedSpeed(speed) {
        return isMetric ? Math.round(speed) : Math.round(speed / 1.609);
    }

    $: {
        if (lastWindDirectionInDegrees !== sol.windDirectionInDegress) {
            currentSolWindDirectionDegrees = sol.windDirectionInDegress;
            lastWindDirectionInDegrees = currentSolWindDirectionDegrees;
        }
    }

</script>

<style type="text/scss">
    @import './styles/variables.scss';

    a {
        color: $clr-accent;
        &:hover {
            color: $clr-accent-dark;
        }
    }

    .mars-current-weather {
        display: grid;
        margin: 6rem auto;
        min-width: min-content;
        max-width: min-content;
        background-color: rgba(0,0,0,0.7);
        padding: 3rem;
        grid-template-columns: min-content 1px min-content 1px min-content;
        grid-template-rows: auto;
        grid-gap: 3em;

        .divider {
            height: 100%;
            width: 1px;
            background-color: $clr-accent-dark;
        }

        .main-title {
            grid-column: 1 / -1;
        }

        .date-container {
            grid-column: 1 / 2;
        }

        .divider-one {
            grid-column: 2 / 3;;
        }

        .temperature-container {
            grid-column: 3 / 4;
        }

        .divider-two {
            grid-column: 4 / 5;
        }

        .wind-speed-container {
            grid-column: 5 / 6;
        }

        .info {
        grid-column: span 4;
            color: $clr-light;
            p {
                margin: 0;
                &:first-child {
                    margin-bottom: 16px;
                }
            }
        }

        .unit-toggle-container {
            grid-column: 5 / 6;
            place-self: end;
        }
    }

    @media screen and (max-width: 680px) {
        .mars-current-weather {
            grid-template-columns: 100px 1px 100px;
            
            .divider-one, .divider-two, .info {
                display: none;
            }

            .main-title {
                text-align: center;
            }

            .date-container {
                grid-column: 1 / 4;
                place-self: center;
            }

            .temperature-container {
                grid-column: 1 / 4;
                place-self: center;
            }

            .wind-speed-container {
                grid-column: 1 / 4;
                place-self: center;
            }

            .unit-toggle-container {
                grid-column: 1 / 4;
                place-self: center;
                z-index: 101;
            }
        }
    }
</style>

<div class="mars-current-weather">
    <h1 class="main-title">Latest Weather at Elysium Plantitia</h1>
    <div class="date-container">
        <CurrentWeatherDate date={sol.date} solNum={sol.sol} />
    </div>
    <div class="divider divider-one"></div>
    <div class="temperature-container">
        <CurrentWeatherTemperature maxTemp="{currentSolMaxTemp} {tempUnitSymbol}" minTemp="{currentSolMinTemp} {tempUnitSymbol}" />
    </div>
    <div class="divider divider-two"></div>
    <div class="wind-speed-container">
        <CurrentWeatherWind windSpeed="{currentSolWindSpeed} {speedUnitSymbol}" windDirection="{currentSolWindDirectionDegrees}" />
    </div>
    <div class="info">
        <p>
            InSight is taking daily weather measurements (temperature, wind, pressure)
            on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars' equator.
        </p>
        <p>
            This is only part of InSight's mission. 
            <a href="https://mars.nasa.gov/insight/mission/overview/">Find out more about InSight.</a>
        </p>
    </div>
    <div class="unit-toggle-container">
        <CurrentWeatherUnitToggle on:unitChanged={handleUnitChange} />
    </div>
</div>