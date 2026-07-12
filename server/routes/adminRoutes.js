import express from "express";
import {changeCredential, changeListingStatus, getAllListings, getAllTransactions, getAllUnchangedListings,
     getAllUnverifiedListing,
     getAllWithdrawRequests,
     getCredential, getDashboard, isAdmin, markCredentialVerified,
     markWithdrawalAsPaid} from "../controllers/adminController.js"
import { protectAdmin } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.get('/isAdmin' , protectAdmin, isAdmin  )
adminRouter.get('/dashboard' , protectAdmin, getDashboard )
adminRouter.get('/all-listings' , protectAdmin, getAllListings  )
adminRouter.put('/change-status/:listingId' , protectAdmin, changeListingStatus  )
adminRouter.get('/unverified-listings' , protectAdmin, getAllUnverifiedListing )
adminRouter.get('/credential/:listingId' , protectAdmin, getCredential  )
adminRouter.put('/verify-credential/:listingId' , protectAdmin, markCredentialVerified  )
adminRouter.get('/unchanged-listings' , protectAdmin, getAllUnchangedListings  )
adminRouter.put('/change-credential/:listingId' , protectAdmin, changeCredential )
adminRouter.get('/transactions' , protectAdmin, getAllTransactions )
adminRouter.get('/withdraw-requests' , protectAdmin, getAllWithdrawRequests )
adminRouter.put('/withdrawal-mark/:id' , protectAdmin, markWithdrawalAsPaid )

export default adminRouter;