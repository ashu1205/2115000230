const express = require('express')
const app = express();
const PORT = 9876
const windowSize=10
let token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzgzNjM3LCJpYXQiOjE3MjA3ODMzMzcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjI3NDJmMTMxLTMyNDItNGFlYS1iNmZmLWUwNDRjYjgxNmRmMCIsInN1YiI6ImFzaHV0b3NoLmNoYWhhcl9jczIxQGdsYS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImFmZm9yZE1lZGljYWwiLCJjbGllbnRJRCI6IjI3NDJmMTMxLTMyNDItNGFlYS1iNmZmLWUwNDRjYjgxNmRmMCIsImNsaWVudFNlY3JldCI6IllpWUxRQldVSFpjZ3d5Y0EiLCJvd25lck5hbWUiOiJBc2h1dG9zaCBDaGFoYXIiLCJvd25lckVtYWlsIjoiYXNodXRvc2guY2hhaGFyX2NzMjFAZ2xhLmFjLmluIiwicm9sbE5vIjoiMjExNTAwMDIzMCJ9.wYWLaMNYgocgK6ueQ0AjXxPOOuHCDmnU0v4FV2GGvOw"

app.get('/numbers/:type', async (req, res) => {
    try {
        const type = req.params.type;
        console.log(type);
        let id = ""
        if (type == "e") {
            id = "even"
        }
        else if (type == "p") {
            id = "primes"
        }
        else if (type == "f") {
            id = "fibo"
        }
        else {
            id = "rand"
        }
        const URL = `http://20.244.56.144/test/${id}`
        console.log(URL);
        let resp = await fetch(URL, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
        });

        if(!resp.ok){
            return res.status(500).json({
                message:"error in fetching numbers",
                error:resp.statusText
            })
        }

        let data = await resp.json()
        console.log(data);
        // console.log(data);
        let numbers=[]
        numbers.push(data.numbers)
        let prevNumbers=[]
        let currNumbers=[]
        prevNumbers=currNumbers;
        currNumbers=numbers.slice(0,windowSize)

        const sum=currNumbers.reduce((acc,num)=> acc+num)
        const avg=sum/windowSize

        res.json({
            "numbers": numbers,
            "windowPrevState":prevNumbers,
            "windowCurrState":currNumbers,
            "avg":avg
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error:error
        })
    }
})
app.listen(PORT, (req, res) => {
    console.log(`server started at ${"http://localhost:9876"}`);

})