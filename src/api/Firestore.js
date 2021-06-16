import * as React from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'

export const POST_REFERENCE = firestore().collection('Posts')

export const LIKE_POST = async (id, email) => {

    const topicChild = POST_REFERENCE.doc(id)
    const topicUserLikeRef = await topicChild.collection('Likes').doc(email).get()
    const isUserLiked = await (await topicChild.get()).data()

    const userEmailExist = isUserLiked.likeUser.indexOf(email)

    if (userEmailExist == -1) {
        onPostLike(id, email, 'like')
    } else {
        onPostLike(id, email, 'unlike')
    }

    /*
    if (topicUserLikeRef.exists) {
        console.log('do unlike')
        return topicChild
            .collection('Likes')
            .doc(email)
            .delete()
            .then(() => onPostLike(id, email, 'unlike'))
    } else {
        console.log('do like')
        return topicChild
            .collection('Likes')
            .doc(email)
            .set({ like: true })
            .then(() => onPostLike(id, email, 'like'))
    }*/
}

function onPostLike(postId, email, type) {
    // Create a reference to the post
    console.log('do : ' + email);
    const postReference = POST_REFERENCE.doc(postId);

    return firestore().runTransaction(async transaction => {
        // Get post data first
        const postSnapshot = await transaction.get(postReference);

        if (!postSnapshot.exists) {
            throw 'Post does not exist!';
        }

        function deleteUser() {
            const getIndex = postSnapshot.data().likeUser.indexOf(email)
            const resd = postSnapshot.data().likeUser.splice(0, getIndex)

            return resd
        }

        transaction.update(postReference, {
            likeCounts: type == 'like' ? postSnapshot.data().likeCounts + 1 : postSnapshot.data().likeCounts - 1,
            likeUser: type == 'like' ? [...postSnapshot.data().likeUser, email] : deleteUser()
        });
    });
}

function onPostComment(postId) {
    // Create a reference to the post
    const postReference = POST_REFERENCE.doc(postId);

    return firestore().runTransaction(async transaction => {
        // Get post data first
        const postSnapshot = await transaction.get(postReference);

        if (!postSnapshot.exists) {
            throw 'Post does not exist!';
        }
        transaction.update(postReference, {
            commentCounts: postSnapshot.data().commentCounts + 1,
        });
    });
}

export const COMMENT_POST = (id, user, comment) => {
    const topicChild = POST_REFERENCE.doc(id).collection('Comments')
    return topicChild.add({ ...comment, ...user }).then(() => onPostComment(id)).catch((err) => console.log(err))
}