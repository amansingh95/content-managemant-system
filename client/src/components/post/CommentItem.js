import React, { useState ,Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";

const CommentItem =({
    postId,
    comment:{_id, text, name, avatar, user, date},
    auth
})=> 
        <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              class="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">
           {text}
          </p>
           <p class="post-date">
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          <button type="button" class="btn btn-light">
            <i class="fas fa-thumbs-up"></i>
            <span>4</span>
          </button>
          <button type="button" class="btn btn-light">
            <i class="fas fa-thumbs-down"></i>
          </button>
          <a href="post.html" class="btn btn-primary">
            Discussion <span class='comment-count'>2</span>
          </a>
          <button      
          type="button"
          class="btn btn-danger"
        >
          <i class="fas fa-times"></i>
        </button>
        </div>
      </div>
    
CommentItem.propTypes ={
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps =state => ({
    auth: state.auth
});
export default connect(mapStateToProps,{})(CommentItem);