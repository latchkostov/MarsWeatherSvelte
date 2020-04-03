<script>
	import CurrentWeatherCard from './CurrentWeatherCard.svelte';
	import LastDaysWeather from './LastDaysWeather.svelte';
	const API_KEY = 'AVBHY28pVRatkjVD6sGNG6TbcOv4LBPi1S3EOWoj';
	const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
	let selectedSolIndex;
	let sols;
	let isMetric = true;

	let isLastDaysShowing = false;

	const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
	window.addEventListener('resize', appHeight);
	appHeight();

	getWeather().then(data => {
    	selectedSolIndex = data.length - 1;
		sols = data;
	});

	function getWeather() {
		return fetch(API_URL)
			.then(res => res.json())
			.then(data => {
				const {
					sol_keys,
					validity_checks,
					...solData
				} = data;
			
				return Object.entries(solData).map(([sol, data]) => {
					return {
						sol: sol,
						maxTemp: data.AT.mx,
						minTemp: data.AT.mn,
						windSpeed: data.HWS.av,
						windDirectionInDegress: data.WD.most_common ? data.WD.most_common.compass_degrees : 0,
						windDirectionCardinal: data.WD.most_common ? data.WD.most_common.compass_point : 0,
						date: new Date(data.First_UTC)
					}
				});
		});
	}

	function handleUnitChange(event) {
		isMetric = event.detail.isMetric;
	}

	function showMoreInfoForSol(event) {
		const sol = event.detail.sol;
		const index = sols.findIndex(s => s.sol === sol.sol);
		if (index > -1) {
			selectedSolIndex = index;
		}
	}

	function showingPreviousWeather(event) {
		isLastDaysShowing = event.detail.value;
	}

</script>

<main class="page-wrapper">
	{#if sols}
		<div class="current-weather-container"
			class:zIdx100="{!isLastDaysShowing}"
			class:zIdx0="{isLastDaysShowing}"
		>
			<CurrentWeatherCard sol={sols[selectedSolIndex]} on:unitChanged={handleUnitChange} />
		</div>
		<div class="last-days-weather-container">
			<LastDaysWeather sols={sols} isMetric={isMetric} on:showMoreInfoForSol={showMoreInfoForSol}
			on:showingPreviousWeather={showingPreviousWeather}/>
		</div>
	{/if}
</main>


<style type="text/scss">
	.page-wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100vw;

		.current-weather-container {
			flex: 0 0 auto;
			max-width: 1200px;
			max-height: 50%;
		}

		.last-days-weather-container {
			position: fixed;
			left: 0;
			bottom: 0;
			//max-height: 10%;
		}

		.zIdx0 {
			z-index: 0;
		}

		.zIdx100 {
			z-index: 100;
		}
	}
</style>