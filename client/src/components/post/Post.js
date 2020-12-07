import React, { useState ,Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { Link } from "react-router-dom";
import { post } from "request";

 const Post = ({ getPost, post: { posts, loading}, match})=>{
     useEffect(()=>{
         getPost(match.params.id);
     }, [getPost]);

     return  posts === null ? (<Spinner />):(
         <Fragment>
             <Link to='/posts' className='btn'>Back To Posts</Link>
             <PostItem post={posts} showActions={false} />
             <CommentForm postId={posts._id} />
             <div className='comments'>
               
                 {posts.comments.map(comment=>(
                     <CommentItem key={comment._id} comment={comment} postId={posts._id} />
                 ))}
             </div>
         </Fragment>
     );
 };

 Post.propTypes={
     getPost: PropTypes.func.isRequired,
     post: PropTypes.object.isRequired
 };

 const mapStateToProps =state =>({
     post: state.post
 });
  export default connect(
      mapStateToProps,
      {getPost}
  )(Post);