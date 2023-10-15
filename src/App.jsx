import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
      let mask = "abcdefghijklmnopqrstuvwxyz";
      let pass = "";

      if(numberAllowed) mask += "1234567890";

      if(charAllowed) mask += "!@#$%^&*";
      
      mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for(let i=0; i<length; i++){
          let idx = Math.floor(Math.random() * (mask.length + 1));
          pass += mask.charAt(idx);
      }

      setPassword(pass);

  }, [ length, numberAllowed, charAllowed, setPassword ]);

  const copyToClipboard = useCallback(() => {
    // it selects the current password ref value
    passwordRef.current?.select();
    // it copies the password to user's clipboard
    window.navigator.clipboard.writeText(password);
  }, [ password ])
  
  useEffect(() => {
      passwordGenerator()
  }, [ length, numberAllowed, charAllowed, passwordGenerator ]);

  return (
      <div className='w-full flex flex-col h-auto max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password'  ref={passwordRef} readOnly />
          <button onClick={copyToClipboard} className='outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
          {/* features class */}
        <div className='mb-4'>
          <div className='flex text-sm gap-x-2'>
            <div className='flex item-center gap-x-1'>
              <input type="range" min={6} max={50} className='cursor-pointer' value={length} onChange={(e) => setLength(e.target.value)}/>
              <label>Length : {length}</label>
            </div>
            <div className='flex text-sm gap-x-2'>
              <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => setNumberAllowed((prev) => !prev)} />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex text-sm gap-x-2'>
              <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={() => setCharAllowed((prev) => !prev)} />
              <label htmlFor='chaInput'>Characters</label>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App;
