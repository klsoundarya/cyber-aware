// script.js

// Create the form container
const form = document.createElement('form');
form.id = 'blog-form';

// --- Name Label ---
const nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'author-name');
nameLabel.textContent = 'Name:';
form.appendChild(nameLabel);

// --- Name Input ---
const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'name';
nameInput.name = 'name';
nameInput.placeholder = 'Please write your name';
nameInput.required = true;
nameInput.classList.add('input-details');
form.appendChild(nameInput);

// --- Topic Label ---
const topicLabel = document.createElement('label');
topicLabel.setAttribute('for', 'topic');
topicLabel.textContent = 'Title Name:';
form.appendChild(topicLabel);

// --- Topic Input ---
const topicInput = document.createElement('input');
topicInput.type = 'text';
topicInput.id = 'topic';
topicInput.name = 'topic';
topicInput.placeholder = 'Enter blog title';
topicInput.required = true;
topicInput.classList.add('input-details');
form.appendChild(topicInput);

// --- Description Label ---
const descLabel = document.createElement('label');
descLabel.setAttribute('for', 'description');
descLabel.textContent = 'Description:';
form.appendChild(descLabel);

// --- Description Textarea ---
const descTextarea = document.createElement('textarea');
descTextarea.id = 'description';
descTextarea.name = 'description';
descTextarea.placeholder = 'Write a short description...';
descTextarea.rows = 5;
descTextarea.required = true;
descTextarea.classList.add('input-details');
form.appendChild(descTextarea);

// --- Submit Button ---
const submitBtn = document.createElement('button');
submitBtn.type = 'submit';
submitBtn.className = 'submit-btn';
submitBtn.textContent = 'Publish Post';
form.appendChild(submitBtn);

// Append form to page
document.getElementById('blog-submission').appendChild(form);

// --- Handle Form Submission ---
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const author = nameInput.value.trim();
    const title = topicInput.value.trim();
    const description = descTextarea.value.trim();

    if (author && title && description) {
        // Create post object
        const post = {
            author,
            title,
            description,
        };

        // Get existing posts from localStorage
        const posts = localStorage.getItem('blogPosts') ? JSON.parse(localStorage.getItem('blogPosts')) : [];

        // Add new post at the beginning
        posts.unshift(post);

        // Save back to localStorage
        localStorage.setItem('blogPosts', JSON.stringify(posts));

        // Redirect to blog.html to show posts
        window.location.href = 'blog.html';
    }
});

if (window.location.pathname.endsWith('blog.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const postsContainer = document.getElementById('posts-container');
        if (!postsContainer) return;

        const posts = localStorage.getItem('blogPosts')
            ? JSON.parse(localStorage.getItem('blogPosts'))
            : [];

        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>No posts yet.</p>';
        } else {
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <p><strong>By:</strong> ${post.author}</p>
                    <hr>
                `;
                postsContainer.appendChild(postDiv);
            });
        }
    });
}
