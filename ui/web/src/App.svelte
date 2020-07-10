<script>
  import TeamworkProvider from "@how-much-do-i-make/provider-teamwork";

  const twp = new TeamworkProvider("TEAMWORKPROVIDER_TOKEN");
  let weekDataPromise = twp.getWeekData();
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

{#await weekDataPromise}
  Loading...
{:then weekData}
  <main>
    <small>
      <b>This week</b>
    </small>
    <p>Teamwork</p>
    <h1>{weekData.seconds * (TEAMWORK_PER_HOUR_PAYMENT / 60 / 60)} TEAMWORK_CURRENCY</h1>
    <h3>{weekData.seconds} seconds</h3>
  </main>
{/await}
