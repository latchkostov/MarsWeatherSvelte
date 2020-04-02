<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let sols;
    export let isMetric;
    import { getTempUnitSymbol, getSpeedUnitSymbol, displayDate, getConvertedTemperature } from './utils.js';
    let showWeather = false;

    function togglePreviousWeather() {
        showWeather = !showWeather;
    }

    function showMoreInfoForSol(sol) {
        dispatch('showMoreInfoForSol', {
            sol: sol
        });
    }
</script>

<div class="previous-weather" class:show-weather="{showWeather}">
    <button class="show-previous-weather" on:click={togglePreviousWeather}>
        <span class="show-previous-weather--arrow">&#8593;</span>
        <span class="sr-only">Show previous weather</span>
    </button>
    <div class="lastDaysContainer">
        <h2 class="main-title main-title-previous-days">Last 7 sols</h2>
        <div class="previous-days">
            {#each sols as sol}
                <div class="previous-day">
                    <h3 class="previous-day__sol">
                        Sol {sol.sol}
                    </h3>
                    <p class="previous-day__date">{displayDate(sol.date)}</p>
                    <p class="previous-day__temp">
                        High:
                        <span>{getConvertedTemperature(sol.maxTemp, isMetric)}</span>
                        <span>{getTempUnitSymbol(isMetric)}</span>
                    </p>
                    <p class="previous-day__temp">
                        Low:
                        <span>{getConvertedTemperature(sol.minTemp, isMetric)}</span>
                        <span>{getTempUnitSymbol(isMetric)}</span>
                    </p>
                    <button class="previous-day__more-info" on:click={showMoreInfoForSol(sol)}>more info</button>
                </div>
            {/each}
        </div>
    </div>
</div>

<style type="text/scss">
    @import './styles/variables.scss';
    @import './styles/shared.scss';

    .previous-weather {
        background-color: $clr-light;
        color: $clr-gray;
        align-self: center;
        justify-self: flex-end;
        width: 100vw;
        transform: translateY(calc(78% - 3rem));
        transition: transform 350ms ease;
        padding: 1rem 2rem 2rem 2rem;

        .main-title-previous-days {
            text-align: center;
        }

        .show-previous-weather {
            background-color: $clr-light;
            position: absolute;
            left: 50%;
            width: 10rem;
            transform: translate(-50%, calc(-95% - 1rem));
            text-align: center;
            font-family: inherit;
            font-size: $fs-h2;
            color: $clr-gray;
            line-height: 1;
            clip-path: polygon(50% 0, 0 100%, 100% 100%);
            cursor: pointer;
            border: 0;
        
            .show-previous-weather--arrow {
                transform: rotate(0) translateY(-6px);
                transition: transform 250ms ease;
            }
        
            &:hover,
            &:focus {
                color: $clr-dark;
            }
        }
        
        &.show-weather {
            transform: translatey(0);
        
            .show-previous-weather--arrow {
                display: block;
                transform: rotate(180deg) translateY(-6px);
            }
        
            .main-title-previous-days,
            .previous-day {
                animation: slideUpIn 750ms forwards;
            }
        
            .main-title-previous-days {
                text-align: left;
            }
        
            .previous-day:nth-child(1) {
                animation-delay: 100ms;
            }
            .previous-day:nth-child(2) {
                animation-delay: 150ms;
            }
            .previous-day:nth-child(3) {
                animation-delay: 200ms;
            }
            .previous-day:nth-child(4) {
                animation-delay: 250ms;
            }
            .previous-day:nth-child(5) {
                animation-delay: 300ms;
            }
            .previous-day:nth-child(6) {
                animation-delay: 350ms;
            }
            .previous-day:nth-child(7) {
                animation-delay: 400ms;
            }
        }

        .lastDaysContainer {
            max-width: 900px;
            margin: 0 auto;

            .previous-days {
                display: flex;
                color: $clr-dark;
                justify-content: space-between;
        
                .previous-day {
                    opacity: 0;
                    transition: opacity 350ms linear;
                
                    & > * {
                        margin: 0;
                    }
                
                    &__more-info {
                        border: 0;
                        border-radius: 100vmax;
                        background-color: $clr-dark;
                        color: $clr-light;
                        text-transform: uppercase;
                        padding: .3em 1em;
                        margin-top: 1rem;
                        cursor: pointer;
                
                        &:hover {
                            background-color: $clr-gray;
                        }
                    }
                }
            }
        }
    }

    @keyframes slideUpIn {
        0% {
            opacity: 0;
            transform: translateY(50%);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>