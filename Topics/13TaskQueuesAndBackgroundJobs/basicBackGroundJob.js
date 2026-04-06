import express from 'express'

const app = express()

app.use(express.json())

const createOrder = (order) => {
    return new Promise((resolve)=> {
        setTimeout(() => {
            resolve({id : Date.now(), ...order})
        }, 200);
    })
}

const generateInvoice = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Order ${id} placed succesfully.`)
        }, 2000);
    })
}

app.post('/order', async(req, res) => {
    const {id , product_name, product_price} = req.body

    if(!id || !product_name || !product_price){
        throw new Error("All fields are required.")
    }

    const complete_order = {id , product_name, product_price}
    const order = await createOrder(complete_order)
    generateInvoice(id)

    res.json({
        success : true,
        message : "order succesful",
        data : order
    })
})

app.listen(3000, () => {
    console.log(`App listening on 3000`)
})