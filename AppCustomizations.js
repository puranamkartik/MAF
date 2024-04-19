// Custom Application Logic

 class AppCustomizations {
   applicationInitialized(app) {
     this.app = app;
   }
   onDatasourceInitialized(datasource){
     if(datasource.name==="transportticket"){
       console.log("*****datasource from AppCustomization******")
     console.log(datasource.name)
     console.log("*****datasource from AppCustomization******")

     }
    
   }
   
   onAfterLoadData(Datasource, Item, Query){
      if(Datasource.name==="transportticket"){

        console.log("########## AppCustomization ###########")
        
        console.log(`datasourcename======${Datasource.name}`)

        console.log("########## AppCustomization ###########")
        Item.map((item)=>{console.log(item.assetnum)})
        console.log(`Query======${JSON.stringify(Query)}`)
      }
    } 

 }

 export default AppCustomizations;
 