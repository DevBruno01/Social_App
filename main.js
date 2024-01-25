/**
* ! Get Id
**/

let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts")
let data = [];

/**
* ! EventListener for the form
**/

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    console.log("Button Clicked");
    formValidation();
});

/**
* ! Data Validation
**/

let formValidation = () =>{
    if(input.value === ""){
        msg.innerHTML = "Post cannot be blank";
        console.log("failure");
    }
    else{
        msg.innerHTML = "";
        console.log("success");
        acceptData();
    }
};

/**
* ! Data accept and create post
**/

let acceptData = () =>{
    data.push(
        {
            'Text':input.value
        }
    );

    localStorage.setItem("data", JSON.stringify(data))
    console.log(data);
    createPost();
};

let createPost = () =>{
    input.value = "";
    msg.value = "";
    posts.innerHTML = "";
    data.map((x,y) =>{
        return (posts.innerHTML += 
            `<div id="${y}">
            <p>${x.Text}</p>
            <span class="options">
                <i onClick="editPost(this)" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deletePost(this)" class="fa-solid fa-trash"></i>
            </span>
        </div>`)
    });
};

/**
* ! Option for delete or edit post
**/

let deletePost = (e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
};

let editPost = (e) =>{
  input.value = e.parentElement.previousElementSibling.innerHTML;
  deletePost(e)
};

/**
* ! Local Storage to initialize the social app if has any post
**/

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createPost();
})();
