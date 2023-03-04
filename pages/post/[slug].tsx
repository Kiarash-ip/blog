import React from 'react'
import {getPosts, getPostDetails} from "../../services"
import { useRouter } from 'next/router'
import { Post, PostProps } from '../../types/interfaces'
import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader} from "../../components"
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const PostDetails:NextPage<PostProps> = ({post}) => {
  const router = useRouter()


  if(router.isFallback) {
    return <Loader />
  }

  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={post}/>
                <Author author={post.author}/>
                <CommentsForm slug={post.slug}/>
                <Comments slug={post.slug}/>
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8'>
                    <PostWidget slug={post.slug} categories={post.categories!.map(category => category.slug)}/>
                    <Categories />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails

export const getStaticProps:GetStaticProps = async ({params}) => {
    const data = await getPostDetails(params!.slug)

    return {
      props: {
        post: data
      }
    }
  }


  export const getStaticPaths:GetStaticPaths = async () => {
    const posts: Post[] = await getPosts();

    return {
        paths: posts.map(({slug}) => ({params: {slug}})),
        fallback: true
    }
  }