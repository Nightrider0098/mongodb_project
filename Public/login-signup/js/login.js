if(document.domain=="localhost")
{
document.getElementById("link-to-signup").setAttribute("href",`http://${document.domain}:5400/signup`);
document.getElementById("register-form").setAttribute("action",`https://${document.domain}:5400/mongoose/login`);
}
else
{
    document.getElementById("link-to-signup").setAttribute("href",`http://${document.domain}/signup`);
    document.getElementById("register-form").setAttribute("action",`https://${document.domain}/mongoose/login`);
    

}