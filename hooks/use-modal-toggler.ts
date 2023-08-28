import { useState } from 'react'

type Toggle = [
   onOff: boolean,
   toggle: (state?: boolean | null | undefined) => void
]
const useModalToggler = (state?: boolean | null | undefined): Toggle => {
   const [onOff, setToggler] = useState<boolean>(!!state ?? false);

   function toggle(state?: boolean | null | undefined) {
      if (state !== undefined && state !== null)
         setToggler(state);
      else
         setToggler(!onOff);
   }

   return [
      onOff,
      toggle
   ];
}

export default useModalToggler;
