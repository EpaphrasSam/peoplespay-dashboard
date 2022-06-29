import React,{useState} from 'react'
import MessageService from '../../../services/broadcast.service'

const swal = require('sweetalert2');

export default function BroadCastMessage(){


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('') 
  
  const sendMessage = async() => {
      try{
        setLoading(true)
        const response = await MessageService.sendMessage({
          "message": message
        });

        if(response.success){
          setLoading(false)
         return swal.fire(
            {
                html : "<div>Broadcast message has been successfully sent to users</div>"
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
    <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
           <div>
            <h2 className="text-2xl font-semibold leading-tight text-red-800">BroadCast Message</h2>
          </div>

          <div className="flex justify-center">
            <div className="mb-4  w-1/2">
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
              onClick={()=> sendMessage()}>{loading ? "sending message..." : 'Send message to users'}</button>
      </div>

)
}