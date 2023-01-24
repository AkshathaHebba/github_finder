import spinner from './assets/loading.gif'
function Spinner(){
    return(
        <div className='w-100 mt-20'>
            <img src={spinner} alt='Loading...' className='text-center mx-auto' width={100}/>
        </div>
    )
}
export default Spinner