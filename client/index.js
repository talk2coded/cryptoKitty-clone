// initialize web3 library
var web3 = new Web3(Web3.givenProvider);

var instance; //our contract instance
var user; // user
var contractAddress = "0xBeB14f96978c2Fb38f8bAb5ba5AeE0bC5C5Fa2EE"; //contract address



window.onload = function(){
    // metamask enable function
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        user = accounts[0];

        console.log("instance", instance);
        
        instance.events.Birth().on('data', function(event){
            console.log("event" , event);
            let owner = event.returnValues.owner;
            let kittenId = event.returnValues.kittenId;
            let mumId = event.returnValues.mumId;
            let dadId = event.returnValues.dadId;
            let genes = event.returnValues.genes;
            $("#kittyCreation").css("display", "block");
                  $("#kittyCreation").text("Kitty Id: " + kittenId 
                                      + " Owner: " + owner 
                                      + " Mum Id: " + mumId 
                                      + " Dad Id: " + dadId 
                                      + " Genes: " + genes );

        })
        .on('error', console.error);
        
        
    })
};

function createKitty(){
    var dnaStr = getDna();
    instance.methods.createKittyGen0(dnaStr).send({}, function(error, txHash){
        if(error)
        console.log(err);

        else{
            console.log(txHash);
            

        }
    })

}

// function createKitty() {
//     var dnaStr = getDna();
//     let res;
//     try {
//       res = instance.methods.createKittyGen0(dnaStr).send();
//     } catch (err) {
//       console.log(err);
//     }
//   }
  
  
  // async function checkOffer(id) {
  
  //   let res;
  //   try {
  
  //     res = await instance.methods.getOffer(id).call();
  //     var price = res['price'];
  //     var seller = res['seller'];
  //     var onsale = false
  //     //If price more than 0 means that cat is for sale
  //     if (price > 0) {
  //       onsale = true
  //     }
  //     //Also might check that belong to someone
  //     price = Web3.utils.fromWei(price, 'ether');
  //     var offer = { seller: seller, price: price, onsale: onsale }
  //     return offer
  
  //   } catch (err) {
  //     console.log(err);
  //     return
  //   }
  
  // }
  
  // Get all the kitties from address
  // async function kittyByOwner(address) {
  
  //   let res;
  //   try {
  //     res = await instance.methods.tokensOfOwner(address).call();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  //Gen 0 cats for sale
  // async function contractCatalog() {
  //   var arrayId = await instance.methods.getAllTokenOnSale().call();
  //   for (i = 0; i < arrayId.length; i++) {
  //     if(arrayId[i] != "0"){
  //       appendKitty(arrayId[i])
  //     }    
  //   }
  // }
  
  //Get kittues of a current address
  // async function myKitties() {
  //   var arrayId = await instance.methods.tokensOfOwner(user).call();
  //   for (i = 0; i < arrayId.length; i++) {
  //     appendKitty(arrayId[i])
  //   }
  // }
  
  //Get kittues for breeding that are not selected
  // async function breedKitties(gender) {
  //   var arrayId = await instance.methods.tokensOfOwner(user).call();
  //   for (i = 0; i < arrayId.length; i++) {
  //     appendBreed(arrayId[i], gender)
  //   }
  // }
  
  // Checks that the user address is same as the cat owner address
  //This is use for checking if user can sell this cat
  // async function catOwnership(id) {
  
  //   var address = await instance.methods.ownerOf(id).call()
  
  //   if (address.toLowerCase() == user.toLowerCase()) {      
  //     return true
  //   }  
  //   return false
  
  // }
  
  
  
  //Appending cats to breed selection
  // async function appendBreed(id, gender) {
  //   var kitty = await instance.methods.getKitty(id).call()
  //   breedAppend(kitty[0], id, kitty['generation'], gender)
  // }
  
  //Appending cats to breed selection
  // async function breed(dadId, mumId) {
  //   try {
  //     await instance.methods.Breeding(dadId, mumId).send()
  //   } catch (err) {
  //     log(err)
  //   }
  // }
  
  //Appending cats for catalog
  // async function appendKitty(id) {
  //   var kitty = await instance.methods.getKitty(id).call()
  //   appendCat(kitty[0], id, kitty['generation'])
  // }
  
  
  // async function singleKitty() {
  //   var id = get_variables().catId
  //   var kitty = await instance.methods.getKitty(id).call()
  //   singleCat(kitty[0], id, kitty['generation'])
  // }
  
  // async function deleteOffer(id) {
  //   try {
  //     await instance.methods.removeOffer(id).send();    
  //   } catch (err) {
  //     console.log(err);
  //   }
  
  // }
  
  // async function sellCat(id) {  
  //   var price = $('#catPrice').val()
  //   var amount = web3.utils.toWei(price, "ether")
  //   try {
  //     await instance.methods.setOffer(amount,id).send();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  // async function buyKitten(id, price) {
  //   var amount = web3.utils.toWei(price, "ether")
  //   try {
  //     await instance.methods.buyKitty(id).send({ value: amount });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  // async function totalCats() {
  //   var cats = await instance.methods.totalSupply().call();
  // }


