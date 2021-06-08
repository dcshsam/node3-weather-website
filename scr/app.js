

const path = require('path')
const express = require('express')
const hbs = require('hbs')

// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')


const { error } = require('console')

const app = express()
//Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Hnalde bar engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDir))

app.get('',(req,res) =>{
res.render('index',{
    title:'Weather App',
    name: 'Sandeep Rawat'
    
})
})

app.get('/about',(req,res) =>{
  res.render('about',{
      title: 'About ',
      name : 'Sandeep Rawat'
  }) 
})

app.get('/help',(req,res) =>{
  res.render('help',{
      title:'Help ',
      name:'Sandeep Rawat',
      message:'This is a Help section of this webpage'
  })
})




app.get('/weather',(req,res) =>{

  if(!req.query.address){
    return res.send({ error:'You must provide Address field value'})
  }
   
    geocode(req.query.address, (error, { latitude, longitute, location }) =>{
        
      if (error){
           return res.send({ error })
         }
         
          
         forecast(latitude,longitute,(error,forecastData) =>{
             
          if(error){
                return res.send({ error })
              }
              
              res.send({
                   forecast : forecastData,
                   location : location,
                   address:req.query.address
              })
         })
    
        })





})

//
// app.get('/weather',(req,res)=>{

//    if (!req.query.address){
//      return res.send({
//        error:'Kindly provide the address details like city '
//      })
//    }else{
 

// geocode(req.query.address, (error, {latitude,longitute,location} ) =>{
//   if (error)
//         {
//           return  res.send({ error })
//         }
//     })

      

    
//     forecast(latitude,longitute,(error,forecastData) =>{
//     if (error)
//     {
//       return  res.send({
//         error:error
//       })
//     }
//     res.send({
//       location: location,
//       forecast: forecastData,
//       address: req.query.address
  
//   }) 
// })


//    }
//  })



     






app.get('/products',(req,res)=>{
    
     if (!req.query.search){
       return res.send({
          error:'You must provide the search tearm'
       })
     }



    console.log(req.query.search)
    res.send({
      product: []
      
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404 Help',
    name: 'Sandeep Rawat',
    errorMessage:'Help is not found'
  })
})

app.get('*',(req,res)=>{
   res.render('404', {
       title: '404',
       name: 'Sandeep Rawat',
       errorMessage: 'Page Not Found'   
   })
})

app.listen(3000, ()=>{
       console.log('Server is UP in port 3000')
})