import React,{useState} from 'react'
import MessageService from '../../../services/broadcast.service'
import PageHeader from '../../header/PageHeader';

const swal = require('sweetalert2');

export default function BroadCastMessage(){


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [target,setTarget] = useState('AC');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('sms');
  
  const sendMessage = async() => {
      try{
        setLoading(true)
        let response;
        switch(type) {
          case 'email':
            response = await MessageService.sendEmails({
              message: message,
              title: title,
              target: target
            })
            break;
          default:
            response = await MessageService.sendMessage({
              "target":target,
              "message": message
            });
            break;
        }
        if(response.success){
          setLoading(false)
         return swal.fire(
            {
                html : "<div>Broadcast message has been successfully sent</div>"
            }
          )
        }else{
          setLoading(false)
          return swal.fire(
            {
                html : "<div>Couldn't send message</div>"
            }
          )
        }

      }catch(err:any){
        const error = err.message;
        setLoading(false)
        swal.fire(
          {
              html : "<div>" + error + "</div>"
          }
        )
      }
  }

return (
    <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
           <PageHeader title="Broadcast Message"/>

          <div className="flex flex-row sm:flex-col justify-center sm:mx-auto w-1/3">
             <div className="px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Select Broadcast Type
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="target" onChange={(e:any)=>setType(e.target.value)}  value={type}>
                    <option value="sms">Sms</option>
                    <option value="email">Email</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <div style={{ marginTop: '20px' }} />
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Select group
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="target" onChange={(e:any)=>setTarget(e.target.value)}  value={target}>
                    <option value="AC">Active customers</option>
                    <option value="IC">Inactive customers</option>
                    <option value="AM">Active merchants</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '20px' }} />
              {
                type === 'email' && 
                <div>
                  {/* <label className="block mt-4 text-sm text-left">Email</label> */}
                  <input
                    className="w-full px-4 py-2 text-sm border border border-solid border-gray-300 rounded focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue- placeholder:text-gray-200"
                    placeholder="Enter Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              }
            <div className="mb-4  w-full">
              <textarea
                className="
                  mt-5
                  form-control
                  block
                  w-full
                  h-96
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="exampleFormControlTextarea1"
                rows={3}
                placeholder="Your message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
              ></textarea>
            </div>
            
          </div>
          <button 
              className ="uppercase rounded-md bg-red-800 text-white font-sans tracking-widest w-1/2 leading-tight px-12 py-4 mt-4 focus:shadow-lg focus:bg-red-900"
              onClick={()=> sendMessage()}>{loading ? "sending message..." : 'Send message to users'}
          </button>
      </div>

)
}