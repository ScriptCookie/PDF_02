import {Routes , Route} from 'react-router-dom';
import ManagerLogin from './Components/ManagetLogin';
import ManagerSignUp from './Components/ManagerSignUp';
import Managermainpage from './Components/Managermainpage';
import Createsubject from './Components/Createsubject';
import { useEffect, useState } from 'react';

function App(props) {
        
          // fetch('http://localhost:9000/managerdata')
          // .then(res => res.json())
          // .then(res => {
          //   console.log('res', res[1])
          // })
          // console.log('lis', lis);

  return(
    <div id='App'>
      <Routes>
        <Route path='*' element={<ManagerLogin/>}></Route>
        <Route path='/managersignup' element={<ManagerSignUp/>}></Route>
        {/* <Route path='/manager' element={<Managermainpage/>}></Route> */}
        {/* <Route path='6317f561f7a7bc5ad84742b8' element={<Managermainpage/>}></Route>
        <Route path='63181e5eb377b8aed7cf36f6' element={<Managermainpage/>}></Route> */}
        <Route path='/createsubject' element={<Createsubject/>}></Route>
      </Routes>
      {/* <NavLink to='/createsubject'>{<Createsubject/>}</NavLink> */}
      <p>{props.init}</p>
    </div>
  );
}

export default App;
