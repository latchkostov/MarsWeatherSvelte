<script>
    import { createEventDispatcher } from 'svelte';
    
    let metricRadio;
    let imperialRadio;
    const dispatch = createEventDispatcher();

    function onButtonClick() {
        let isCurrentlyMetric = metricRadio.checked;
        metricRadio.checked = !isCurrentlyMetric;
        imperialRadio.checked = isCurrentlyMetric;
        dispatch('unitChanged', {
            isMetric: !isCurrentlyMetric
        });
    }

    function onRadioChange() {
        let isCurrentlyMetric = metricRadio.checked;
        dispatch('unitChanged', {
            isMetric: isCurrentlyMetric
        });
    }

</script>

<div class="unit">
    <label for="cel">°C</label>
    <input type="radio" name="unit" id="cel" bind:this={metricRadio} on:change={onRadioChange} checked>
    <button class="unit__toggle" on:click={onButtonClick}></button>
    <label for="fah">°F</label>
    <input type="radio" name="unit" id="fah" bind:this={imperialRadio} on:change={onRadioChange}>
</div>

<style type="text/scss">
    @import './styles/variables.scss';
    @import './styles/shared.scss';
    
    .unit {
        color: $clr-light;
        opacity: .7;
        display: flex;
        transition: opacity 275ms linear;

        &:hover {
            opacity: 1;
        }

        input {
            @include screenreader;
        }

        &__toggle {
            cursor: pointer;
            width: 4em;
            border: 2px solid $clr-light;
            background: transparent;
            padding: 0;
            border-radius: 100vmax;
            margin: 0 0.5em;

            &::after {
                content: '';
                display: block;
                background-color: $clr-light;
                border-radius: 50%;
                height: 1em;
                width: 1em;
                margin: 3px;
                margin-left: auto;
            }
        }

        input[type="radio"]:checked ~ .unit__toggle::after {
            margin-left: 3px;
        }
    }
</style>