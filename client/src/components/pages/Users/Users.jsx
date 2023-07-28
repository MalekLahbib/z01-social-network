/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant User : Affiche la liste des utilisateurs inscrits
  Page Users : Route http://localhost:3000/users
*/

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Loader } from '../../../utils/Atom.jsx'
import Popup from '../../Popup/Popup.jsx'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../../utils/style/Colors.js'
import Profile from '../../Profile/Profile.jsx'
import Icone from '../../Icone/Icone.jsx'
import IcnAddFriend from '../../../assets/icn/icn-addfriend.png'
import IcnSupFriend from '../../../assets/icn/icn-supfriend.jpg'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' // https://tanstack.com/query/latest/docs/react/overview
import { makeRequest } from '../../../utils/Axios/Axios.js'
//import axios from "axios"

const queryClient = new QueryClient()

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1px;
  border: solid 1px;
  border-radius: 10px;
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
`
const StyledLink = styled.div`
  text-decoration: none;  
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  border-radius: 10px;        
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
  margin: 10px;
  transition: 200ms;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;    
    box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
  }
`

const Users = () => {
  const { theme } = useContext(ThemeContext)

  const { authPseudo, followed } = useContext(AuthContext)
  //const followerId = (follower||[]).map(follow => follow.id) 
  const followedId = (followed||[]).map(follow => follow.id) 
  //console.log("authPseudo:", authPseudo, "followerId:", followerId, "followedId:", followedId);

  const navigate = useNavigate()
  const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

  // Redirection vers la page "/user/userid"
  const handleUserClick = (userid) => {
    navigate(`/user/${userid}`)
  }

  // Demande d'ajout de follower
  const handleAddFollowerClick = async (userid) => {
    // Requete de demande d'ajout follower vers app-social-network
    try{
      const response = await makeRequest.post(`/addfollower/${userid}`)
      const responseData = response.data
      console.log("addfollower:", responseData.datas)
      setFetchError(false)
    }
    catch (err) {
        setNotification(err.message + " : " + err.response.data.error)
        setFetchError(true)
    }
    finally {
    }
  }

  // demande de suppression de follower
  const handleSupFollowerClick = async (userid) => {
    // Requete de demande d'ajout follower vers app-social-network
    try{
      try{
        const response = await makeRequest.post(`/supfollower/${userid}`)
        const responseData = response.data
        console.log("supfollower:", responseData.datas)
        setFetchError(false)
      }
      catch (err) {
          setNotification(err.message + " : " + err.response.data.error)
          setFetchError(true)
      }
      finally {
      }
    }
    catch (err) {
        setNotification(err.message + " : " + err.response.data.error)
        setFetchError(true)
    }
    finally {
    }
  }

  const UsersList = () => { 
    const { data: dataUsers, isLoading: isLoadingUsers, error: errorUsers } = useQuery(['dataUsers'], () =>
      makeRequest.get(`/users`).then((res) => {
        return res.data
      })
    )
    //console.log("dataUsers:", dataUsers);
    
    return (
      <>
        {isLoadingUsers ? (
        <Loader id="loader" />
        ) : (
        <>
          {errorUsers && (
            <Popup texte="Le chargement de la liste des utilisateurs est erroné !" type='error' />
          )}
          {dataUsers && (
            dataUsers.datas.map((user, index) => (
              authPseudo !== user.pseudo ? 
                <StyledLink                 
                  key={`${user.pseudo}-${index}`} 
                  id={`user-link-${user.pseudo}`}
                  onClick={() => handleUserClick(user.id)}
                >
                  <>
                    <Profile 
                      {...user} 
                    />
                    { authPseudo && 
                      <>
                        { followed && followedId.includes(user.id) ?
                            <Icone 
                              alt="Ne plus suivre"
                              image={IcnSupFriend}
                              disabled={false}
                              onClick={() => handleSupFollowerClick(user.id)}
                            />
                          : <Icone 
                              alt="Suivre"
                              image={IcnAddFriend}
                              disabled={false}
                              onClick={() => handleAddFollowerClick(user.id)}
                              
                            />
                        }
                      </>
                    }
                  </>
                </StyledLink>
              : null
            ))
          )}
        </>
        )}
      </>
    )
  }

  return (
    <ListContainer theme={theme}>
      {/* list users */}
      <QueryClientProvider client={queryClient}>
        <UsersList />
      </QueryClientProvider>

      {fetchError && notification && (
        <Popup texte={notification} type='error' />
      )}
    </ListContainer>
  )
}

export default Users