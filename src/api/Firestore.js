import * as React from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import moment from 'moment'

export const POST_REFERENCE = firestore().collection('Posts')
export const REPORT_REFERENCE = firestore().collection('Report')
export const REPORT_COMMENT_REFERENCE = firestore().collection('ReportComment')
export const USER_REFERENCE = firestore().collection('Users')
export const IMAGE_REFERENCE = firestore().collection('Image')
export const BANNER_REFERENCE = firestore().collection('Image').doc('banner')

export const LIKE_POST = async (id, email) => {

    const topicChild = POST_REFERENCE.doc(id)
    const isUserLiked = await (await topicChild.get()).data()

    const userEmailExist = isUserLiked.likeUser.indexOf(email)

    if (userEmailExist == -1) {
        onPostLike(id, email, 'like')
    } else {
        onPostLike(id, email, 'unlike')
    }
}

export const LIKE_COMMENT = async (id, email, commentId) => {

    const topicChild = POST_REFERENCE.doc(id).collection('Comments').doc(commentId)
    const isUserLiked = await (await topicChild.get()).data()

    const userEmailExist = isUserLiked.likeUser.indexOf(email)

    if (userEmailExist == -1) {
        onCommentLike(id, email, 'like', commentId)
    } else {
        onCommentLike(id, email, 'unlike', commentId)
    }
}

function onCommentLike(postId, email, type, commentId) {
    // Create a reference to the post
    console.log('do : ' + email);
    const postReference = POST_REFERENCE.doc(postId).collection('Comments').doc(commentId);

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

export const DISLIKE_COMMENT = async (id, email, commentId) => {

    const topicChild = POST_REFERENCE.doc(id).collection('Comments').doc(commentId)
    const isUserLiked = await (await topicChild.get()).data()

    const userEmailExist = isUserLiked.dislikeUser.indexOf(email)

    if (userEmailExist == -1) {
        onCommentDisLike(id, email, 'like', commentId)
    } else {
        onCommentDisLike(id, email, 'unlike', commentId)
    }
}

function onCommentDisLike(postId, email, type, commentId) {
    // Create a reference to the post
    console.log('do : ' + email);
    const postReference = POST_REFERENCE.doc(postId).collection('Comments').doc(commentId);

    return firestore().runTransaction(async transaction => {
        // Get post data first
        const postSnapshot = await transaction.get(postReference);

        if (!postSnapshot.exists) {
            throw 'Post does not exist!';
        }

        function deleteUser() {
            const getIndex = postSnapshot.data().dislikeUser.indexOf(email)
            const resd = postSnapshot.data().dislikeUser.splice(0, getIndex)

            return resd
        }

        transaction.update(postReference, {
            dislikeCounts: type == 'like' ? postSnapshot.data().dislikeCounts + 1 : postSnapshot.data().dislikeCounts - 1,
            dislikeUser: type == 'like' ? [...postSnapshot.data().dislikeUser, email] : deleteUser()
        });
    });
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

export const DISLIKE_POST = async (id, email) => {

    const topicChild = POST_REFERENCE.doc(id)
    const isUserDisliked = await (await topicChild.get()).data()

    const userEmailExist = isUserDisliked.dislikeUser.indexOf(email)

    if (userEmailExist == -1) {
        onPostDislike(id, email, 'dislike')
    } else {
        onPostDislike(id, email, 'undislike')
    }
}

function onPostDislike(postId, email, type) {
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
            const getIndex = postSnapshot.data().dislikeUser.indexOf(email)
            const resd = postSnapshot.data().dislikeUser.splice(0, getIndex)

            return resd
        }

        transaction.update(postReference, {
            dislikeCounts: type == 'dislike' ? postSnapshot.data().dislikeCounts + 1 : postSnapshot.data().likeCounts - 1,
            dislikeUser: type == 'dislike' ? [...postSnapshot.data().dislikeUser, email] : deleteUser()
        });
    });
}


export function onPostReported(postId, email) {
    // Create a reference to the post
    console.log('do report : ' + postId);
    const postReference = POST_REFERENCE.doc(postId);

    return firestore().runTransaction(async transaction => {
        // Get post data first
        const postSnapshot = await transaction.get(postReference);

        if (!postSnapshot.exists) {
            throw 'Post does not exist!';
        }

        transaction.update(postReference, {
            reportCounts: postSnapshot.data().reportCounts + 1,
        });
    });
}

export function onCommentReported(postId, commentId) {
    // Create a reference to the post
    console.log('do report : ' + postId);
    const postReference = POST_REFERENCE.doc(postId).collection('Comments').doc(commentId);

    return firestore().runTransaction(async transaction => {
        // Get post data first
        const postSnapshot = await transaction.get(postReference);

        if (!postSnapshot.exists) {
            throw 'Post does not exist!';
        }

        transaction.update(postReference, {
            reportCounts: postSnapshot.data().reportCounts + 1,
        });
    });
}

function onCommentDelete(postId, commentId) {
    // Create a reference to the post
    const postReference = POST_REFERENCE.doc(postId);

    POST_REFERENCE
        .doc(postId).collection('Comments').doc(commentId).delete().then(() => onCommentDelete(id)).catch((err) => console.log(err))

    return firestore().runTransaction(async transaction => {
        // Get post data first
        const postSnapshot = await transaction.get(postReference);

        if (!postSnapshot.exists) {
            throw 'Post does not exist!';
        }
        transaction.update(postReference, {
            commentCounts: postSnapshot.data().commentCounts - 1,
        });

        console.log('comments deleted...')
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

export const COMMENT_POST = (id, user, comment, addCount = true) => {
    const topicChild = POST_REFERENCE.doc(id).collection('Comments')
    return topicChild.add({ ...comment, ...user }).then(() => addCount ? onPostComment(id) : null).catch((err) => console.log(err))
}

export const REPLY_COMMENT = (postId, commentId, comment, user) => {
    const topicChild = POST_REFERENCE.doc(postId).collection('Comments').doc(commentId).collection('Reply')
    return topicChild.add({ ...comment, ...user }).then(() => onPostComment(id)).catch((err) => console.log(err))
}

export const REPORT_POST = async (id, email, topic) => {
    const userPath = await REPORT_REFERENCE.doc(id).collection('ReportBy').doc(email).get()

    if (userPath.exists) {
        return REPORT_REFERENCE.doc(id).set(topic).then(() => console.log('Report Sukses')).catch((err) => console.log('Report Failed : ' + err))
    } else {
        return REPORT_REFERENCE.doc(id).collection('ReportBy').doc(email).set({ reportAt: moment().format() })
            .then(() => {
                REPORT_REFERENCE.doc(id).set(topic).then(() => console.log('Report Sukses')).catch((err) => console.log('Report Failed : ' + err))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const REPORT_COMMENT = async (id, email, topic) => {
    const userPath = await REPORT_COMMENT_REFERENCE.doc(id).collection('ReportBy').doc(email).get()

    if (userPath.exists) {
        return REPORT_COMMENT_REFERENCE.doc(id).set(topic).then(() => console.log('Report Sukses')).catch((err) => console.log('Report Failed : ' + err))
    } else {
        return REPORT_COMMENT_REFERENCE.doc(id).collection('ReportBy').doc(email).set({ reportAt: moment().format() })
            .then(() => {
                REPORT_COMMENT_REFERENCE.doc(id).set(topic).then(() => console.log('Report Sukses')).catch((err) => console.log('Report Failed : ' + err))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const DELETE_POST = async (id) => {
    return POST_REFERENCE
        .doc(id)
        .delete()
}

export const DELETE_COMMENT = async (id, commentId, isReply) => {
    return POST_REFERENCE
        .doc(id).collection('Comments').doc(commentId).delete().then(() => isReply ? null : onCommentDelete(id, commentId)).catch((err) => console.log(err))
}

export async function updatePostProfileImage(email, profilePic, name) {
    // Get all users
    const usersQuerySnapshot = await POST_REFERENCE.where('creatorEmail', '==', email).get()

    console.log('User Post : ' + email)

    // Create a new batch instance
    const batch = firestore().batch();

    usersQuerySnapshot.forEach(documentSnapshot => {
        batch.update(documentSnapshot.ref, {
            creatorProfilePic: profilePic,
            creatorName: name
        })
    });

    return batch.commit();
}

export const GET_IMAGE_BANNER = async () => {
    const banner = await IMAGE_REFERENCE.doc('banner').get()
    return banner.data()
}

export async function deleteQueryBatch(id) {
    console.log('START CLEAN DELETE!!!')
    const snapshot = await POST_REFERENCE.doc(id).collection('Comments').get()

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        DELETE_POST(id)
        return;
    }

    // Delete documents in a batch
    const batch = firestore().batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit().then(() => {
        setTimeout(() => {
            deleteQueryBatch(id)
        }, 1000)
    })
        .catch((err) => {
            console.log(err)
        })
}