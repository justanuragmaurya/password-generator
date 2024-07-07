import { useCallback, useEffect, useState ,useRef } from 'react'
import Navbar from './components/Navbar'


function App() {
  const [password, setPass] = useState("");
  const [len, setLen] = useState(8)
  const [useNum, setNum] = useState(false);
  const [useChar, setChar] = useState(false);

  const passGen = useCallback(() => {
    let pass = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv"
    if (useNum) { string += "1234567890" }
    if (useChar) { string += "!@#$%^&*()" }

    for (let i = 0; i < len; i++) {
      pass += string.charAt(Math.floor((Math.random() * string.length) + 1))
    }

    setPass(pass)


  }, [len, useNum, useChar, setPass])

  //useRef hook
  const passRef = useRef(null); 

  const copyToClip= useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(()=>{passGen()},[len,useNum,useChar])

  return (
    <>
      <Navbar />
      <div className="w-full m-w-md mx-auto shadow-lg rounded-xl px-4 my-8 text-orange-500 bg-slate-100">
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passRef}
          />
          <button onClick={()=>copyToClip()} className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type="range"
              max={15}
              min={8}
              value={len}
              className='cursor-pointer'
              onChange={(e) => { setLen(e.target.value)}} />
              <label> Length: {len} </label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={useNum}
              id="NumberInput"
              onChange={() => {
                setNum((prev) => (!prev))
              }}
            />
            <label htmlFor="NumberInput">Use Number</label>
          </div> 
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={useNum}
              id="CharInput"
              onChange={() => {
                setChar((prev) => (!prev))
              }}
            />
            <label htmlFor="CharInput">Use Charecters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
