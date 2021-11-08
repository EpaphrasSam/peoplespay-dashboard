import React from 'react'

import MerchantTransactionsTable from '../../tables/MerchantTransactionsTable'
import MerchantTransationDetailsTable from '../../tables/MerchantTransationDetailsTable';
import SearchForm from '../../forms/SearchForm';

export default function MerchantTransaction() {
    return (
     <div className="relative md:pt-28 pb-10  w-full mb-12">
          <div>
                <SearchForm />
        </div>
            <div className='flex flex-wrap'>
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                 <MerchantTransactionsTable />
                </div>
            <div className="w-full xl:w-4/12 px-4">
                 <MerchantTransationDetailsTable />
             </div>
         </div>
     </div>
    )  
}