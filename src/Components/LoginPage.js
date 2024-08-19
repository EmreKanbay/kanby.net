let ejs = require('ejs');
 
const component = `<form id="jfuuRGyj-login-form">

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

document.querySelector("#jfuuRGyj-login-form").addEventListener("submit", async (e)=> {
    
    e.preventDefault();
 
    // const controller = new AbortController();

    // const resource = new Request()
    
    
    const formData = new FormData()
    formData.append("login_name", document.querySelector("#jfuuRGyj-login-input-username").value)
    formData.append("login_password", document.querySelector("#jfuuRGyj-login-input-password").value)
 try {
    const response = await fetch("/admin/login", { 
        body: formData,
        method: "POST",
        //redirect:"follow",
        // headers:{"Conaasde":"asdf"},
        // cache: "no-store",
        // credentials: "omit",
        // keepalive:"false",
        // mode:"no-cors",
        // priority:"auto",
        // referrer:"about:client",
        // signal:controller.signal,
        // referrerPolicy:"no-referrer",
        // integrity:""

    })

    if(response.redirected){window.location.replace(response.url)}
    if(response.ok){
     console.log(response.status + " " + response.statusText)
    }else{throw new Error("Status is not OK")}

 } catch (error) {
     console.log(error)
 
 }






})
 

</script>`



module.exports = ejs.render(component , {description: "İ am a footer"})
