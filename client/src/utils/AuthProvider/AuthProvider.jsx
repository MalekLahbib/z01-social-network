import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [authPseudo, setPseudo] = useState("")
    const [authId, setAuthId] = useState("")
    const [sexe, setSexe] = useState("")
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [bornDate, setBornDate] = useState("")
    const [aboutme, setAboutme] = useState("")
    const [photoProfile, setPhotoProfile] = useState("")
    const [statusProfil, setStatusProfil] = useState("")

    const updateUserData = (data) => {
        setUsernameOrEmail(data.email)
        setPseudo(data.pseudo)
        setAuthId(data.id)
        setLastname(data.lastname)
        setSexe(data.sexe)
        setFirstname(data.firstname)
        setBornDate(data.BornDate)
        setAboutme(data.aboutme)
        setPhotoProfile(data.photoProfile)
        setStatusProfil(data.statusProfil)
    }

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, setIsLoggedIn, 
            usernameOrEmail, setUsernameOrEmail,
            authPseudo, setPseudo,
            authId, setAuthId,
            sexe, setSexe,
            lastname, setLastname,
            firstname, setFirstname,
            bornDate, setBornDate,
            aboutme, setAboutme,
            photoProfile, setPhotoProfile,
            statusProfil, setStatusProfil,
            updateUserData,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool,
    authPseudo: PropTypes.string,
    authId: PropTypes.number,
    usernameOrEmail: PropTypes.string,
    sexe: PropTypes.string,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    bornDate: PropTypes.string,
    aboutme: PropTypes.string,
    photoProfile: PropTypes.string,
    statusProfil: PropTypes.string,
    updateUserData: PropTypes.func,
}