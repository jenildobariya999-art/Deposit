document.addEventListener("DOMContentLoaded", function() {
    // Page ko bilkul plain white aur basic font me set karna
    document.body.style = "margin: 8px; font-family: monospace; font-size: 13px; background: white; color: black; word-wrap: break-word;";
    
    const urlParams = new URLSearchParams(window.location.search);
    const utrId = urlParams.get('details');
    
    // Agar URL me details parameter nahi hai
    if (!utrId || utrId.trim() === '') {
        document.body.innerText = JSON.stringify({"success":false,"error":"Invalid format"});
        return;
    }
    
    const gasUrl = `https://script.google.com/macros/s/AKfycbx-mJyjZLjFLhjSzp-2F8Hz3ThNDtZ75xbujAtqL2aApNVlktLHO6fMp772lNOtJKPN/exec?utr=${utrId}`;
    
    // Data fetch karna
    fetch(gasUrl)
        .then(response => response.json())
        .then(data => {
            // Raw JSON format me ek single line me print karna
            document.body.innerText = JSON.stringify(data);
        })
        .catch(error => {
            // Error aane par raw JSON me error print karna
            document.body.innerText = JSON.stringify({"success":false,"error":error.message});
        });
});
