let ejs = require('ejs');
 
 module.exports = ejs.render(


`<form id="jfuuRGyj-login-form">

    <div>
    <label for="">Username / Email</label>
    <input id="jfuuRGyj-login-input-username" type="text">
    <label for="">Password</label>
    <input id="jfuuRGyj-login-input-password" type="text"> <br>
</div>



<input type="submit" value="submit">


</form>

<style>

    #jfuuRGyj-login-form{
        background-color: red;
        padding: 1rem;
        }
</style>

<script>

document.querySelector("#jfuuRGyj-login-form").addEventListener("submit",  (e)=> {
    
    e.preventDefault();
 
    // const controller = new AbortController();

    // const resource = new Request()
    
    
    const formData = new FormData()
    formData.append("login_name", document.querySelector("#jfuuRGyj-login-input-username").value)
    formData.append("login_password", document.querySelector("#jfuuRGyj-login-input-password").value)
 
    fetch("/admin/login", { 
        body: formData,
        method: "POST",
        // headers:{"Conaasde":"asdf"},
        // cache: "no-store",
        // credentials: "omit",
        // keepalive:"false",
        // mode:"no-cors",
        // priority:"auto",
        // redirect:"follow",
        // referrer:"about:client",
        // signal:controller.signal,
        // referrerPolicy:"no-referrer",
        // integrity:""

    }).then(async (e) => {console.log(await e.text())})






})
 

</script>`, {description: "İ am a footer"})
