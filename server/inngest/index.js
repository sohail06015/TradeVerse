import { Inngest } from "inngest";
import { prisma } from "../src/db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "profile-marketplace" });

// Create an empty array where we'll export future Inngest functions

//  inngest function to save our user data  to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
   const {data}=event

//    check if user already preent or not
     const user = await prisma.user.findFirst({
        where : {id: data.id  }
     })

    if(user){
        //  update user data if it exsits
        await prisma.user.update({
            where: {id: data.id},
            data:{
                email: data?.email_addresses[0]?.email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
            }
        })
        return;


    }
    await prisma.user.create({
        data: {
            id:data.id,
            email: data?.email_addresses[0]?.email_address,
            name: data?.first_name + " " + data?.last_name,
            image: data?.image_url,
        }
    })
 

  },
);

// inngest function to delete user from database

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
   const {data}=event

   const listings = await prisma.listing.findMany({
      where: {ownerId: data.id}
   })

    const chats = await prisma.chat.findMany({
      where: {OR :  [{ownerUserId: data.id}, {chatUserId:data.id}]}
   })

   const transactions = await prisma.transactions.findMany({
      where: {ownerUserId: data.id}
   })

   if(listings.length === 0 && chats.length === 0 && transactions.length === 0 ){
      await prisma.user.delete({where :{id: data.id} })
   }else{
    await prisma.listing.updateMany( {
        where : {ownerId: data.id },
        data: {status: "inactive" }
    } )
   }
 

  },
);



// inngest function to update user from database

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk", triggers: [{ event: "clerk/user.updated" }] },
  async ({ event }) => {
   const {data}=event

     
    await prisma.update({
        where: {id:data.id},
        data: {
            id:data.id,
            email: data?.email_addresses[0]?.email_address,
            name: data?.first_name + " " + data?.last_name,
            image: data?.image_url,
        }
    })
 

  },
);





// create an empty array where we all export future inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];