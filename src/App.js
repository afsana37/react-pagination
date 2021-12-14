import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Posts from './components/Posts'
import Pagination from './components/Pagination'

const App = () => {
  const [posts, setPosts] = useState([])
  //declared a list variable named posts with the initial value of an empty list.
  //setPosts is to update the value of posts.
  const [loading, setLoading] = useState(false)
  //loading value initialised as false. 
  const [currentPage, setCurrentPage] = useState(1) //first page
  const [postsPerPage] = useState(10)//10 posts per page


  useEffect(() => {
    const fetchPosts = async() => {
      setLoading(true)
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }
    fetchPosts()

  },[])
  
  //Get current Posts
  const indexofLastPost = currentPage * postsPerPage
  const indexofFirstPost = indexofLastPost - postsPerPage
  const currentPosts = posts.slice(indexofFirstPost, indexofLastPost)

  //Change Page
  const paginate = pageNumber => setCurrentPage(pageNumber)
  return(
    <div className='container mt-5'>
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loadingg={loading} />
      <Pagination 
        postsPerPage={postsPerPage} 
        totalPosts={posts.length}
        paginate={paginate}
        
      />
    </div>
  )
}

export default App
