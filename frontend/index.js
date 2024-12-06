const createBlogForm = document.getElementById("create-blog-form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");
const blogList = document.getElementById("blogs-list");

createBlogForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const blogDetails = {
      title: title.value,
      author: author.value,
      content: content.value,
    };
    console.log(blogDetails);
    const response = await axios.post(
      "http://localhost:3000/create-blog",
      blogDetails
    );

    displayBlog(response.data);
    createBlogForm.reset();
  } catch (err) {
    console.log(err);
  }
});

function displayBlog(blogDetails) {
  const blogItem = document.createElement("div");
  blogItem.setAttribute("id", `blog-${blogDetails.id}`);
  blogItem.setAttribute("class", `blog-item`);
  blogItem.innerHTML = `
  
    <h2 class="blog-title">${blogDetails.title}</h2>
    <div class="blog-details">
    <p>Author: ${blogDetails.author}</p>
    <p>${blogDetails.content}</p>

    <hr/>
    
    <div class="comment-box">
    <h2>Comments</h2>
    <input class="commentInput" type= "text" />
    <button class="commentBtn" >Send</button>
    <ul class="commentList"></ul>
    </div>
    </div>

    `;
  blogList.appendChild(blogItem);

  const blogTitle = blogItem.querySelector(".blog-title");
  const blogDetailsDiv = blogItem.querySelector(".blog-details");

  blogTitle.addEventListener("click", () => {
    const isVisible = blogDetailsDiv.style.display === "block";
    blogDetailsDiv.style.display = isVisible ? "none" : "block";
  });

  const commentBtn = blogItem.querySelector(".commentBtn");
  const commentInput = blogItem.querySelector(".commentInput");

  commentBtn.addEventListener("click", async () => {
    try {
      // console.log("cmnt btn clicked");
      if (commentInput.value === "") {
        return;
      }
      const commentInputJson = {
        text: commentInput.value,
      };
      const response = await axios.post(
        `http://localhost:3000/blogs/${blogItem.id.split("-")[1]}/comment`,
        commentInputJson
      );

      displayComments(response.data, blogDetails.id);
      commentInput.value = "";
    } catch (err) {
      console.log(err);
    }
  });
}

function displayComments(commentJson, blogId) {
  const blogItem = document.getElementById(`blog-${blogId}`);
  console.log(blogItem);
  const commentList = blogItem.querySelector(".commentList");

  const commentItem = document.createElement("li");
  commentItem.setAttribute("id", `comment-${commentJson.id}`);
  commentItem.innerHTML = `<p>${commentJson.text}</p>`;

  const dltBtn = document.createElement("button");
  dltBtn.textContent = "Delete";
  commentItem.appendChild(dltBtn);

  commentList.appendChild(commentItem);

  dltBtn.addEventListener("click", async (e) => {
    try {
      const commentId = commentItem.id.split("-")[1];
      await deleteCommentFromApi(commentId);
      commentList.removeChild(e.target.parentElement);
    } catch (err) {
      console.log(err);
    }
  });

  function deleteCommentFromApi(commentId) {
    return axios.delete(`http://localhost:3000/blogs/comments/${commentId}`);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const blogs = await axios.get("http://localhost:3000/blogs");
    for (let i = 0; i < blogs.data.length; i++) {
      displayBlog(blogs.data[i]);
      const comments = await axios.get(
        `http://localhost:3000/blogs/${blogs.data[i].id}/comments`
      );
      for (let j = 0; j < comments.data.length; j++) {
        console.log(
          "this is blog id in loader function: ",
          comments.data[j].blogId
        );
        displayComments(comments.data[j], comments.data[j].blogId);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
