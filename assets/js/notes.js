var like_button = document.getElementById('like_button');
console.log(like_button);
console.log("hello world");
var current_url = window.location.href;
var note_id = current_url.substring(current_url.indexOf("view/")+5);
like_button.addEventListener('click', async () => {
    console.log("like button is pressed");
    var response = await fetch(`/notes/like/${note_id}`, {
        method: "PUT", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
    });
    console.log(response.json()); 
});

window.onload = async () => {
    var response = await fetch(`/notes/view/${note_id}`, {
        method: "PUT", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
    });
    console.log(response.json()); 
}