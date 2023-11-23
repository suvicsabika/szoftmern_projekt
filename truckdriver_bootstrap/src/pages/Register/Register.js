import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { MyNavbarMain } from '../../components'

export default function Register() {

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8,24}$/;
  
  return (
    <div>
      <MyNavbarMain />
      Register
    </div>
  )
}
