import React from 'react';
import PostCart from './PostCart';
import AllPostHeader from './ui/AllPostHeader';




const AllPostPage = () => {
    const postJsonData = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            title: "Photography, the best hobby to have",
            description: "Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum.",
            author_name: "Paris Washington",
            author_image: "https://randomuser.me/api/portraits/women/44.jpg",
            publish_date: "June 28, 2018",
            read_time: "2 min read"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
            title: "Why coding is the language of the future",
            description: "Learn how programming is shaping the digital world and why it is considered one of the most valuable skills.",
            author_name: "Michael Brown",
            author_image: "https://randomuser.me/api/portraits/men/32.jpg",
            publish_date: "January 12, 2021",
            read_time: "5 min read"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            title: "The ultimate guide to remote work productivity",
            description: "Discover practical tips and tools that will help you stay productive and focused while working remotely.",
            author_name: "Sophia Lee",
            author_image: "https://randomuser.me/api/portraits/women/68.jpg",
            publish_date: "August 5, 2022",
            read_time: "4 min read"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            title: "Mastering teamwork in the digital era",
            description: "Collaboration has changed drastically. Learn modern teamwork strategies for hybrid and remote teams.",
            author_name: "Daniel Carter",
            author_image: "https://randomuser.me/api/portraits/men/15.jpg",
            publish_date: "March 3, 2020",
            read_time: "3 min read"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=Mnwx",
            title: "Healthy lifestyle tips for busy people",
            description: "Balancing work, family, and health can be hard. Here are proven habits for maintaining a healthy lifestyle.",
            author_name: "Emily Johnson",
            author_image: "https://randomuser.me/api/portraits/women/22.jpg",
            publish_date: "October 9, 2019",
            read_time: "6 min read"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
            title: "The rise of AI in everyday life",
            description: "Artificial Intelligence is no longer futuristic. It’s already part of our homes, offices, and daily routines.",
            author_name: "Liam Anderson",
            author_image: "https://randomuser.me/api/portraits/men/48.jpg",
            publish_date: "April 18, 2021",
            read_time: "7 min read"
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            title: "Top 10 travel destinations for 2023",
            description: "Looking for travel inspiration? These destinations are trending among travelers this year.",
            author_name: "Olivia Martinez",
            author_image: "https://randomuser.me/api/portraits/women/36.jpg",
            publish_date: "December 20, 2022",
            read_time: "5 min read"
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
            title: "Financial freedom: simple steps to start today",
            description: "Building wealth starts with small changes. Learn how to save, invest, and grow your money wisely.",
            author_name: "James Miller",
            author_image: "https://randomuser.me/api/portraits/men/62.jpg",
            publish_date: "July 14, 2020",
            read_time: "8 min read"
        },
        {
            id: 9,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            title: "How to build confidence and self-esteem",
            description: "Confidence is a skill you can practice. Learn practical exercises to boost your self-esteem.",
            author_name: "Isabella Moore",
            author_image: "https://randomuser.me/api/portraits/women/50.jpg",
            publish_date: "May 23, 2019",
            read_time: "3 min read"
        },
        {
            id: 10,
            image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixid=Mnwx",
            title: "Minimalism: living with less but better",
            description: "Minimalism is not about sacrifice but about intentional living. Discover how less can truly be more.",
            author_name: "Ethan Wilson",
            author_image: "https://randomuser.me/api/portraits/men/75.jpg",
            publish_date: "November 11, 2021",
            read_time: "4 min read"
        },
        {
            id: 11,
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=Mnwx",
            title: "Cooking hacks for quick and tasty meals",
            description: "Learn simple cooking techniques that save time in the kitchen without sacrificing flavor.",
            author_name: "Sophia Walker",
            author_image: "https://randomuser.me/api/portraits/women/11.jpg",
            publish_date: "February 7, 2022",
            read_time: "6 min read"
        },
        {
            id: 12,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=Mnwx",
            title: "The importance of lifelong learning",
            description: "Education doesn’t stop at school. Discover why lifelong learning is the key to success in today’s world.",
            author_name: "Benjamin Davis",
            author_image: "https://randomuser.me/api/portraits/men/20.jpg",
            publish_date: "September 1, 2023",
            read_time: "5 min read"
        }
    ];

    // console.log(postJsonData);
    return (
        <section className='max-w-screen-xl mx-auto px-4'>
            <div>
                <AllPostHeader/>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                {postJsonData.map(postData => (<PostCart key={postData.id} postData={postData} />))}
            </div>

        </section>
    );
};

export default AllPostPage;