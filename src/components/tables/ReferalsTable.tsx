import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReportService from '../../services/reports.service';
import  {reportSelector, setReferals} from '../../state/report.state' 
import moment from "moment"


 function ReferalsTable() {
    
    const dispatch = useDispatch()
   
   // const [loading, setLoading] = useState(true)

    useEffect(()=>{
            const response =  ReportService.getReferals().then(res=> res.data)
            //response.then(res=> console.log(res))

            response.then(data=> {
                    let referals= data.map((d:any) => d)
                     dispatch(setReferals(referals))
            })
    },[dispatch])

  const {referals} = useSelector(reportSelector)
  console.log(referals)
  
 
  //console.log(Object.entries(transactions))
   const allReferals = referals.map((r:any)=>(
            <tr>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
            <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                    {r.customerId.fullname}
                </p>
            </div>
        </div>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{r.customerId.phone}</p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {r.agent_name}
        </p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden
                className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
            <span className="relative">{r.customerId.referal_code}</span>
        </span>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {moment(r.createdAt).format('YYYY/MM/DD')}
        </p>
    </td>
</tr>
        ))
   
  
  return(
  <>
  {allReferals}
  </>
  )
  }

export default ReferalsTable;