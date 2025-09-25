import React from 'react';
import PostCart from './PostCart';
import AllPostHeader from './ui/AllPostHeader';
import dbConnect from '@/lib/dbConnect';

export const metadata = {
  title: "All Posts",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};


const AllPostPage = async () => {
    const postsdata = await dbConnect("collectionPosts").find().toArray();
         
    // console.log(postJsonData);
    return (
        <section className='max-w-11/12 mx-auto'>
            <div>
                <AllPostHeader/>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                {postsdata.map(postData => (<PostCart key={postData._id} postData={postData} />))}
            </div>

        </section>
    );
};

export default AllPostPage;