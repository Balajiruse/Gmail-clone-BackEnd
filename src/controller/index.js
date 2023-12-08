import fs from'fs'

const path='src/asset'
const ReadWriteFile= async(req,res)=>{

    try {
        let date=new Date().toLocaleString()
        let day=+new Date()
        fs.writeFileSync(`${path}/${day}.txt`,date,'utf-8')

        let cont=fs.readFileSync(`${path}/${day}.txt`,'utf-8')

        res.status(200).send({
            status:200,
            message:"working Good",
            dateTime:cont
        })
        
    } catch (error) {
        res.status(500).send({error})
        
    }

}

export default {ReadWriteFile}
