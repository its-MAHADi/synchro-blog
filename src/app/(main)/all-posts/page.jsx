import React from 'react'
import AllPosts from '../components/AllPosts/AllPosts'
import PostField from '../components/PostField/PostField'

export default function page() {
  return (
    <div className='mt-10 space-y-10'>
        <PostField/>
        <AllPosts/>
        </div>
  )
}
