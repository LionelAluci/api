document.addEventListener('DOMContentLoaded', () => {
  const apixd = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League';
  const teamsContainer = document.getElementById('teamsContainer');
  const searchInput = document.getElementById('searchInput');

  let teams = [];

  fetch(apixd)
    .then(res => res.json())
    .then(data => {
      teams = data.teams;
    });

  window.buscar = function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = teams.filter(team =>
      team.strTeam.toLowerCase().includes(searchTerm)
    );
    displayTeams(filtered);
  };

  function displayTeams(teamsList) {
    teamsContainer.innerHTML = '';
    teamsList.forEach(team => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';
  console.dir (team)
      col.innerHTML = `
        <div class="card h-100 team-card">
          <img src="${team.strBadge}" class="card-img-top p-4" alt="${team.strTeam} logo">
          <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <p><strong>Formed:</strong> ${team.intFormedYear}</p>
            <p><strong>Stadium:</strong> ${team.strStadium}</p>
            <p><strong>Location:</strong> ${team.strStadiumLocation}</p>
            <p class="card-text">${team.strDescriptionEN?.slice(0, 150)}...</p>
          </div>
        </div>
      `;

      teamsContainer.appendChild(col);
    });
  }
});
