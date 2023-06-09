---------- R10: Saboor ----------
-- FILTER PLAYERS BY ONE OR MORE STATS --
SELECT 
    pid AS id, 
    (firstName || ' ' || lastName) AS name,
    games, points, assists, rebounds, season
FROM Player 
NATURAL JOIN PlayerStats 
WHERE 
    (rebounds >= 500 OR 500 IS NULL) AND
    (assists >= NULL OR NULL IS NULL) AND
    (points >= 1000 OR 1000 IS NULL) AND
    (games >= 75 OR 75 IS NULL) AND
    (season = NULL OR NULL IS NULL)
ORDER BY name ASC, season DESC
LIMIT 10
OFFSET 0 * 10;

-- FILTER TEAMS BY ONE OR MORE STATS --
SELECT 
    abbrev AS id, 
    tname AS name, 
    wins, losses, season
FROM Team 
NATURAL JOIN TeamStats
WHERE 
    (wins >= 10 OR 10 IS NULL) AND
    (losses >= 50 OR 50 IS NULL) AND
    (season = NULL OR NULL IS NULL)
ORDER BY name ASC, season DESC
LIMIT 10
OFFSET 0 * 10;
