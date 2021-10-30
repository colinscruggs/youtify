import React from 'react'
import { useState, useEffect } from "react"
import useAuth from './hooks/useAuth'
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: '16b80bb6a6604b0392a49028ddce5b60'
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  return (
    <div>
      <p>Dashboard</p>
      <p>{accessToken}</p>
    </div>
  )
}
