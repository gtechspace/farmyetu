const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch');
//require('dotenv').config()

const app = express()
app.use(cors());
const PORT = 5000

app.use(express.json())

const consumerKey ="NHDpZUxhNRDd_WKgMIEIrJ2mB50a";
const consumerSecret ="pyPOVGZlTW1fmElJY9vW0PJOh4ka";
const BASE_URL = "https://uat.buni.kcbgroup.com";
//const BASE_URL = "https://uat.buni.kcbgroup.com"; 

// Generate access token
async function getAccessToken() {
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  try{
  const response = await fetch(`${BASE_URL}/token?grant_type=client_credentials`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  
  const data = await response.json();
  return data.access_token;
} catch(error){
    console.log('Token generation error', error)
}
}

// STK Push endpoint
app.post('/api/stkpush', async (req, res) => {
  try {
    const token = await getAccessToken();
    const messageId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    const requestBody = {
      phoneNumber: req.body.phoneNumber,
      amount: req.body.amount,
      //invoiceNumber: "1168077192",
      invoiceNumber: "1133152465", // Your KCB account
      sharedShortCode: true,
      orgShortCode: "522522",
      orgPassKey: "",
      callbackUrl: "https://tn3dur-ip-196-250-215-187.tunnelmole.net/callback",
      transactionDescription: "Payment for Order"
    };
    
    const response = await fetch(`${BASE_URL}/mm/api/request/1.0.0/stkpush`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'messageId': messageId,
        'operation': 'STKPush',
        'routeCode': '207'
      },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();

        if (!response.ok) {
      console.error('❌ STK Push failed:', data);
      return res.status(response.status).json({ 
        success: false,
        error: 'STK Push request failed',
        details: data 
      });
    }

    // Check response code
    if (data.ResponseCode === "0" || data.response?.ResponseCode === "0") {
      console.log('✅ STK Push sent successfully');
      return res.json({ 
        success: true,
        message: 'Payment request sent to phone',
        data: data 
      });
    } else {
      console.error('❌ STK Push rejected:', data);
      return res.status(400).json({ 
        success: false,
        error: data.ResponseDescription || data.CustomerMessage || 'Request failed',
        details: data 
      });
    }
    //res.json(data);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'STK Push failed', details: error.message });
  }
});

// Callback endpoint to receive payment confirmation
app.post('/callback', (req, res) => {
  console.log('Payment callback received:', req.body);
  
  // Store payment info in your database here
  // Update order status, etc.
  
  res.json({ success: true, message: 'Callback received' });
});

// Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'KCB Payment API Server',
    status: 'running',
    endpoints: {
      stkpush: 'POST /api/stkpush',
      callback: 'POST /callback'
    }
  });
});

app.listen(PORT, () => {
    console.log(`Serverrunning on http://localhost:${PORT}`);
})