document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('http://localhost:8000/scores');
    const scores = await response.json();

    console.log(scores);

    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    scores.sort((a, b) => b.score - a.score);

    const topScores = scores.slice(0, 5); // Get top 5 scores

    topScores.forEach(score => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.username}: ${score.score}`;
        leaderboardList.appendChild(listItem);
    });
});