import UserResults from "../components/Users/UserResults";
import UserSearch from "../components/Users/UserSearch";
function Home(){
    return(
        <>
            {/*Search goes here*/}
            <UserSearch />
            <UserResults/>
        </>
    )
}
export default Home