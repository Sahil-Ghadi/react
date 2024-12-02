import React,{useEffect,useState} from 'react'
import { Container,Postcard } from '../components'
import appwriteService from "../appwrite/config"

const Home = () => {
    const [posts,setPosts] = useState([])
    useEffect(() => {
      appwriteService.getPosts().then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
      })
    }, [third])
    
    if(posts.length === 0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold
                             hover:text-gray-500'>Login to read posts</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=> (
                        <div key={post.$id} className='p-2 w-1/4'>
                            {/* <Postcard post={post}/> */}
                            <Postcard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home