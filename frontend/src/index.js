import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {UserProvider} from "./Context/context";
import {ProductProvider} from "./Context/contextProduct";
import {PanierProvider} from "./Context/contextPanier";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
       <ProductProvider>
           <PanierProvider>
               <App />
           </PanierProvider>
       </ProductProvider>
    </UserProvider>
);


