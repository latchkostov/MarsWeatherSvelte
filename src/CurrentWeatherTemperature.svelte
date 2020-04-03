<script>
    export let maxTemp;
    export let minTemp;
</script>

<div class="temp">
    <div>
        <h2 class="section-title">Temperature</h2>
        <p class="reading">
            High: {maxTemp}
        </p>
        <p class="reading">
            Low: {minTemp}
        </p>
    </div>
</div>

<style type="text/scss">
    @import './styles/variables.scss';
    @import './styles/shared.scss';
    
    .temp {
        display: flex;
        justify-content: center;
        text-align: center;
        width: min-content;
    }
</style>