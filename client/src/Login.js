import React from 'react'

const client_id = '16b80bb6a6604b0392a49028ddce5b60';
const redirect_uri = 'http://localhost:3000/';
const scope = 'user-read-private%20user-read-email%20user-read-recently-played%20user-top-read%20playlist-read-private'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`

export default function Login() {
  return (
    <div>
      
    </div>
  )
}
