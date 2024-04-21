// Custom Application Logic
import {Device, log} from '@maximo/maximo-js-api';
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

     wospecdialogc(page){
       console.log(page)

     this.app.showDialog("woSpecificationDrawer");


    }

    async savethissd(event){
      console.log(event.page)
      console.log(event.app)
      console.log(event.ds)
      
      let wospecnew= event.app.findDatasource("wospecdummyload")//event.app.findDatasource("woSpecification")
      let exwospec=event.ds
      console.log(exwospec.items.length)
      
      let wonum=event.page.params.wonum
      let site=event.page.params.siteid

      console.log(wonum)
      console.log(site)

      await wospecnew.initializeQbe()
      wospecnew.setQBE("wonum","=",wonum)
      wospecnew.setQBE("siteid","=",site)

      await wospecnew.searchQBE()

      await wospecnew.load()

      console.log(wospecnew.items.length)
      var listofobj=[]
      if (exwospec.items.length>0){

          exwospec.items.forEach((e1)=>{

            wospecnew.items.forEach((e2)=>{

            if (e1.workorderspecid === e2.workorderspecid && e1.assetattrid === e2.assetattrid){
              var singobj={}

              e2.alnvalue=e1.alnvalue
              e2.numvalue=e1.numvalue
              singobj['assetattrid']=e2.assetattrid
              singobj['alnvalue']=e1.alnvalue
              singobj['numvalue']=e1.numvalue
              listofobj.push(singobj)
              console.log(e2.assetattrid)
              console.log(e2.alnvalue)
              console.log(e2.numvalue)
            }

            })
          })


      }
      wospecnew.save()
      event.page.findDialog("woSpecificationDrawer").closeDialog()
      console.log(listofobj)
      event.page.state.holdingwospec=listofobj
      console.log(event.page.state.holdingwospec)
      console.log(`JSON======${JSON.stringify(event.page.state.holdingwospec)}`)
      console.log("DONE")



    }



 }

 export default AppCustomizations;
 