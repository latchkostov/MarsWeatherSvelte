<script>
    import { onMount } from 'svelte';
    export let windDirection;
    export let windSpeed;
    let currentWindDirectionArrow;

    onMount(() => {
        currentWindDirectionArrow.style.setProperty('--direction',
            `${windDirection}deg`
        );
    })

    
</script>

<div class="wind">
    <div class="wind__title_and_reading">
        <h2 class="section-title">Wind</h2>
        <p class="reading">
            <span>{windSpeed}</span>
            <span data-speed-unit></span>
        </p>
    </div>
    <div class="wind__direction">
        <p class="sr-only" data-wind-direction-text></p>
        <div class="wind__arrow" bind:this={currentWindDirectionArrow}></div>
    </div>
</div>

<style type="text/scss">
    @import './styles/variables.scss';
    @import './styles/shared.scss';

    .wind {
        grid-column: 5 / 6;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        text-align: center;
        width: min-content;

        &__direction {
            --size: 6rem;
            width: var(--size);
            height: var(--size);
            border-radius: 50%;
            background-color: rgba(255,255,255,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__title_and_reading {
            padding-left: 2.0rem;
        }

        &__arrow {
            --size: 1rem;
            --direction: 45deg;
            height: calc(var(--size) * 3);
            width: var(--size);
            background-color: $clr-accent-dark;
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            transform: translateY(-50%) rotate(var(--direction));
            transform-origin: bottom center;
            transition: transform 350ms ease-in;
        }
    }
</style>