import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {
    addPostActionCreator,
    PostType,
    UpdateNewPostActionCreator
} from '../../../redux/state';
import { ProfileActionsType } from '../../../redux/profileReducer';

type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: ProfileActionsType) => void
}

function MyPosts(props: MyPostsPropsType) {

    let postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount} />)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    let addPost = () => {
        if (newPostElement.current) {
            props.dispatch(addPostActionCreator(props.newPostText))
        }
    }

    let onNewPostChange = () => {
        if (newPostElement.current) {
            let newText = newPostElement.current.value
            props.dispatch(UpdateNewPostActionCreator(newText))
        }
    }

    return (
        <div>
            My posts
            <div className={s.postsBlock}>
                <div>
                    <textarea onChange={onNewPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <button onClick={addPost}>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;