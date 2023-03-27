const postsList = document.querySelector('#posts-list');
const postDetails = document.querySelector('#post-details');

// Função para buscar a lista de posts da API
async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    // Preenche a lista de posts na página
    postsList.innerHTML = '';
    posts.forEach(post => {
      const postItem = document.createElement('li');
      postItem.textContent = post.title;
      postItem.addEventListener('click', () => showPostDetails(post.id));
      postsList.appendChild(postItem);
    });
  } catch (error) {
    console.error(error);
  }
}

// Função para buscar os detalhes de um post e seus comentários da API
async function fetchPostDetails(postId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await response.json();

    const authorResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const author = await authorResponse.json();

    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const comments = await commentsResponse.json();

    // Preenche a seção de detalhes do post na página
    postDetails.innerHTML = `<div class="post-completo">
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><br><em class="aut">${author.name}</em></p></div>
      <h3>Comentários</h3>
    `;
    comments.forEach(comment => {
      const commentItem = document.createElement('div');
      commentItem.innerHTML = `<div class="comentTotal">
      <img src="img/user1.png" alt="avatar" class="avatar">
          <em class="avatEmail">${comment.email}</em>
        <p><h4 class="coment">${comment.name}</h4></p>
        <p>${comment.body}</p>
        <div>        
        <div class="like-container">
          <button class="like-button">\u2661</button>
          <span class="like-count">0</span>
        </div></div></div>
      `;
      const likeButton = commentItem.querySelector('.like-button');
      const likeCount = commentItem.querySelector('.like-count');
      let likeCountValue = 0;
      likeButton.addEventListener('click', () => {
        likeCountValue++;
        likeCount.textContent = likeCountValue;
        likeButton.textContent = `\u2661`;
      });
      postDetails.appendChild(commentItem);
    });
  } catch (error) {
    console.error(error);
  }
}

// Função para exibir os detalhes de um post e seus comentários na página
function showPostDetails(postId) {
  // Exibe a seção de detalhes do post
  postDetails.classList.remove('hidden');
  // Busca os detalhes do post e seus comentários da API e preenche a seção correspondente na página
  fetchPostDetails(postId);
}

// Chama a função fetchPosts() para buscar e preencher a lista de posts na página
fetchPosts();
