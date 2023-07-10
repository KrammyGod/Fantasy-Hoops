"use client"

import { useState, useEffect } from "react"
import { API } from "../../config"
import React from "react"

export default function PlayerStats({ params }: {
    params: { pid: string } 
}) {    
    const [firstName, setFirstName] = useState([])
    const [lastName, setLastName] = useState([])
    const [playerStats, setPlayerStats] = useState<{assists: number, points: number, games: number, season: number, abbrev: string, tname: string}[]>([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`${API}/playerstats/${params.pid}`)
          .then(response => response.json())
          .then(data => {
            setPlayerStats(data.stats)
            setFirstName(data.player.firstname)
            setLastName(data.player.lastname)
          })
          .catch(error => setError(error))
    }, [params.pid])

    return (
        <div>
            <table className="table table-bordered table-sm m-4">
                <thead>
                    <tr>
                        <th colSpan={6}>{params.pid} {firstName} {lastName}</th>
                    </tr>
                    <tr>
                        <th>Assists</th>
                        <th>Points</th>
                        <th>Games</th>
                        <th>Season</th>
                        <th>Abbrev</th>
                        <th>Team Name</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.assists}</td>
                                <td>{stat.points}</td>
                                <td>{stat.games}</td>
                                <td>{stat.season}</td>
                                <td>{stat.abbrev}</td>
                                <td>{stat.tname}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
