var send_otp_button = document.getElementById("send_otp_button");
var mobile_number = document.getElementById("mobile_number");
send_otp_button.addEventListener('click', function(e) {
    if (mobile_number.value!="") {
        e.preventDefault();
        fetch(`/users/sendotp/${mobile_number.value}`)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
});