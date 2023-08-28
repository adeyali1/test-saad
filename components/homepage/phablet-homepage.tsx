import { NextPage } from "next";

interface Props {
   nodes: any;
};
const PhabletHomepage: NextPage<Props> = ({ nodes }) => {
   return (
      <div className='fixed top-10'>
         <h1 className='text-2xl'>You Cant use this app on mobile phone</h1>
         {/* {nodes.map((node, index) => (
            <div key={index}>{node.text}</div>
         ))} */}
      </div>
   );
};

export default PhabletHomepage;
