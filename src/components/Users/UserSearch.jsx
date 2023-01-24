import {useState, useContext} from 'react'
import GitHubContext from "../../context/github/GitHubContext";
import AlertContext from '../../context/alert/AlertContext'
function UserSearch(){
    const [text,setText] = useState('')
    const {users,searchUsers,clearUsers} = useContext(GitHubContext)
    const {setAlert} = useContext(AlertContext)
    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(text === ''){
            setAlert('Please Enter Something','error')
        }else{
            //Search something
            await searchUsers(text);
            setText('')
        }
    }
    return(
     <div className='grid gird-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
         <div>
             <form onSubmit={handleSubmit}>
                 <div className='form-control'>
                     <div className='relative'>
                         <input
                         type='text'
                         className='w-full pr-40 bg-gray-200 inout input-lg text-black'
                         placeholder ='Search'
                         onChange={handleChange}
                         value={text}/>
                         <button type='submit' className='absolute top=0 right-0 rounded-l-none w-36 btn btn-lg'> GO </button>
                     </div>
                 </div>
             </form>
         </div>
         {/*Something different*/}
         {users.length > 0 && (
             <div>
                 <button  className='btn btn-ghost btn-lg' onClick={clearUsers}>CLEAR</button>
             </div>
         )}
     </div>
    )
}
export default UserSearch