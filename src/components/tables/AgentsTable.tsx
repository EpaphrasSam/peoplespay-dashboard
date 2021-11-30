import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReportService from '../../services/reports.service';
import  {reportSelector, setAgents} from '../../state/report.state' 
import moment from "moment"


 function AgentsTable() {
    
    const dispatch = useDispatch()
   
   // const [loading, setLoading] = useState(true)

    useEffect(()=>{
            const response =  ReportService.getAgents().then(res=> res.data)
            //response.then(res=> console.log(res))

            response.then(data=> {
                    let referals= data.map((d:any) => d)
                     dispatch(setAgents(referals))
            })
    },[dispatch])

  const {agents} = useSelector(reportSelector)
  console.log(agents)
  
 
  //console.log(Object.entries(transactions))
   const allAgents = agents.map((a:any)=>(
            <tr>
    <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
            <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                    {a.name}
                </p>
            </div>
        </div>
    </td>
    <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{a.phone}</p>
    </td>
    <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {a.code}
        </p>
    </td>
    <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {moment(a.createdAt).format('YYYY/MM/DD')}
        </p>
    </td>
    <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
        <span
            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden
                className="absolute inset-0 bg-red-300 opacity-50 rounded-md"></span>
            <i className='fas fa-trash text-red-800 px-4' />
        </span>
    </td>
</tr>
        ))
   
  
  return(
  <>
  {allAgents}
  </>
  )
  }

export default AgentsTable;