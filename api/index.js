export default async function handler(req, res) {
    // API headers set karna taaki pure JSON format mile
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // URL se ?details= parameter uthana
    const utrId = req.query.details;

    // Agar URL mein UTR id nahi hai
    if (!utrId || utrId.trim() === '') {
        return res.status(400).send(JSON.stringify({ "success": false, "error": "Invalid format" }));
    }

    // Aapka Google Apps Script URL
    const gasUrl = `https://script.google.com/macros/s/AKfycbx-mJyjZLjFLhjSzp-2F8Hz3ThNDtZ75xbujAtqL2aApNVlktLHO6fMp772lNOtJKPN/exec?utr=${utrId}`;

    try {
        // GAS se data fetch karna
        const response = await fetch(gasUrl);
        const data = await response.json();
        
        // Data aate hi browser ko pure JSON format mein bhej dena
        return res.status(200).send(JSON.stringify(data));
    } catch (error) {
        return res.status(500).send(JSON.stringify({ "success": false, "error": error.message }));
    }
}
