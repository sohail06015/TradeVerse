
import { ArrowLeftIcon, FilterIcon, Verified } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ListingCard from '../components/ListingCard'
import FilterSidebar from '../components/FilterSidebar'

const MarketPlace = () => {

const [searchparams] = useSearchParams()
const search = searchparams.get("search")

const navigate= useNavigate()
const [showFilterPhone, setShowFilterPhone] = useState(false)
const [filters, setFilters ] = useState({
  platform: null,
  maxPrice: 100000,
  minFollowers: 0,
  niche: null,
  verified: false,
  monetized: false,

})

const {listings }= useSelector(state=> state.listing)

const filterListings = listings.filter((listing) => {

   if(filters.platform && filters.platform.length > 0){
      if(!filters.platform.includes(listing.platform)) return false
   }

   if(filters.maxPrice){
      if(listing.price > filters.maxPrice) return false
   }

   if(filters.minFollowers){
      if(listing.followers_count < filters.minFollowers) return false
   }

   if(filters.niche && filters.niche.length > 0){
      if(!filters.niche.includes(listing.niche)) return false
   }

   if(filters.verified && listing.verified !== filters.verified) return false

   if(filters.monetized && listing.monetized !== filters.monetized) return false

    if(search){
      const trimed= search.trim();
      if(
        !listing.title.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.username.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.description.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.platform.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.niche.toLowerCase().includes(trimed.toLowerCase()) 
      )
      return false
    }

   return true
})

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
       <div className='flex items-center justify-between text-slate-500' >
          <button onClick={()=> {navigate('/'); scrollTo(0,0) } }
          className='flex items-center gap-2 py-5' >
           
            <ArrowLeftIcon  className='size-4' />
           Back To Home  
           </button>
          <button  onClick={()=> setShowFilterPhone(true) } className='flex sm:hidden
            items-center gap-2 py-5' >
          <FilterIcon    className='size-4' />
          Filters</button>
       </div>

       <div className=' relative flex items-start justify-between gap-8 pb-8'>

     <FilterSidebar setFilters={setFilters}  filters={filters} setShowFilterPhone={setShowFilterPhone} 
      showFilterPhone={showFilterPhone}
     />

       <div className='flex-1 grid xl:grid-cols-2 gap-4' >
        {filterListings.sort((a,b)=> a.featured ? -1 : b.featured ? 1 : 0 ).
          map((listings,index) => (
            <ListingCard  listing={listings}  key={index} />
          ))  }
       </div>

       </div>

            {/* footer */}

      <div
        className="bg-white border-t border-gray-200 p-4 text-center
      mt-28"
      >
        <p className="text-sm text-gray-500">
          © 2026 <span className="text-indigo-600"> TradeVarse.</span> All
          rights reserved.
        </p>
      </div>
    
    </div>
  )
}

export default MarketPlace
