const postInput = document.getElementById('postInput');
const mediaInput = document.getElementById('mediaInput');
const postButton = document.getElementById('postButton');
const postsContainer = document.getElementById('posts');

let posts = [];

postButton.addEventListener('click', () => {
    const postText = postInput.value.trim();
    const mediaFile = mediaInput.files[0];

    if (postText || mediaFile) {
        const post = {
            id: Date.now(),
            text: postText,
            media: mediaFile ? URL.createObjectURL(mediaFile) : null,
            likes: 0,
            comments: [],
        };
        posts.push(post);
        postInput.value = '';
        mediaInput.value = '';
        renderPosts();
    }
});

function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        
        postDiv.innerHTML = `
            <p>${post.text}</p>
            ${post.media ? post.media.endsWith('.mp4') ? 
                `<video controls class="media"><source src="${post.media}" type="video/mp4">Your browser does not support the video tag.</video>` :
                `<img src="${post.media}" class="media" alt="Post media"/>` : ''}
            <span class="like" onclick="likePost(${post.id})">❤️ ${post.likes}</span>
            <div class="comment-input">
                <input type="text" placeholder="Add a comment" id="commentInput-${post.id}">
                <button onclick="addComment(${post.id})">Comment</button>
            </div>
            <div id="comments-${post.id}"></div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    post.likes++;
    renderPosts();
}

function addComment(postId) {
    const commentInput = document.getElementById(`commentInput-${postId}`);
    const commentText = commentInput.value.trim();
    if (commentText) {
        const post = posts.find(p => p.id === postId);
        post.comments.push(commentText);
        commentInput.value = '';
        renderComments(postId);
    }
}

function renderComments(postId) {
    const post = posts.find(p => p.id === postId);
    const commentsDiv = document.getElementById(`comments-${postId}`);
    commentsDiv.innerHTML = post.comments.map(comment => `<div class="comment">${comment}</div>`).join('');
}
