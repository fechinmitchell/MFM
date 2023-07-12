// List of blocked websites
const blockedSites = ["www.instagram.com", "www.facebook.com"];

// Check if the current website is in the blocked list
if(blockedSites.some(site => window.location.href.includes(site))) {
    document.body.innerHTML = '<img src="chrome-extension://[ekljjdgmojbfoegefijeooecpgmbdapa]/images/blocked.jpg" style="width:100vw;height:100vh;object-fit:cover;">';
}
