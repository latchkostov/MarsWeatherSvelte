<script>
    import { displayDate } from './utils.js';
    export let solNum;
    export let date; 
</script>

<div class="date">
    <h2 class="section-title section-title--date">
        Sol {solNum}
    </h2>
    <p class="date__day">{displayDate(date)}</p>
</div>

<style type="text/scss">
    @import './styles/variables.scss';
    @import './styles/shared.scss';

    .section-title {
        &--date {
            font-size: $fs-xl;
        }
    }

    .date {
        grid-column: 1 / 2;
        display: flex;
        flex-direction: column;
        text-align: center;

        &__day {
            font-size: $fs-h2;
            color: $clr-gray;
            margin: 0;
            font-weight: $fw-light;
        }
    }
</style>