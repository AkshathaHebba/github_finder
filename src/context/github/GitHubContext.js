//This is a global context / global state
import { createContext,useReducer } from 'react' //using github reducer instead of usestate
import githubReducer from "./GitHubReducer";

const GitHubContext = createContext() //same as class Name

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHIB_TOKEN

export const GithubProvider = ({children}) =>{
    // const [users,setUsers] = useState([])
    // const [loading, setloading] = useState(true)
    const initialState = {
        //default values
        users:[],
        user: {},
        loading: false,
        repos: [],
    }
  const [state, dispatch] = useReducer(githubReducer,initialState)
 //githubReducer - is the reducer reducing
    // dispatch - dispatch an action to our reducer

    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
            header: {
                Authorization: `token ${GITHUB_TOKEN}`
            },
        })
        //destructure from the object that is returned and get only items
        const {items} = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items, //it is basically the data we are adding/modifying/ etc
        })
        // setUsers(data)
        // setloading(false)
        //dispatch method taken an action object
    }
//Single User
    const getUser = async (login) => {
        setLoading();
        //EndPoint
        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            header: {
                Authorization: `token ${GITHUB_TOKEN}`
            },
        })
        if(response.status === 404){
            window.location = '/notfound'
        }else{
            //destructure from the object that is returned and get only items
            const data = await response.json()
            dispatch({
                type: 'GET_USER',
                payload: data, //it is basically the data we are adding/modifying/ etc
            })
        }
    }
//Get user Repos
    const getUserRepos = async (login) => {
        setLoading();
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
            header: {
                Authorization: `token ${GITHUB_TOKEN}`
            },
        })
        //destructure from the object that is returned and get only items
        const data = await response.json()
        dispatch({
            type: 'GET_REPOS',
            payload: data, //it is basically the data we are adding/modifying/ etc
        })
        // setUsers(data)
        // setloading(false)
        //dispatch method taken an action object
    }

    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})
    const setLoading = () => dispatch({
        type: 'SET_LOADING',
    })
  return <GitHubContext.Provider value={{
          users: state.users, //from reducer's state above
          user: state.user,
          repos: state.repos, //accessing this in the component User.jsx
          loading: state.loading,
          searchUsers,
          clearUsers,
          getUser,
          getUserRepos,
      }}>
      {children}
  </GitHubContext.Provider>
}

export default GitHubContext