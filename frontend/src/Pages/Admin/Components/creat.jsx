import React, {useState, useRef, useContext} from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Editor } from "primereact/editor";
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';



import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeflex/primeflex.css';
import {ProductContext} from "../../../Context/contextProduct";
import axios from "axios";



const persoOptions = [
    { name: 'avant', code: 'NY' },
    { name: 'arrière', code: 'RM' },
    { name: 'les deux', code: 'LDN' },
];
export default function Creat() {
    // modal button "new"
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');


    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };

    // modal description

    const [titre, setTitre] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(1500);
    const [description, setDescription] = useState('');
    const [checked, setChecked] = useState(false);
    const [personnalisation, setPersonnalisation] = useState(null);


    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            setImage(base64Image);
        };
        reader.readAsDataURL(selectedImage);
    };

    const { createProduit } = useContext(ProductContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', titre);
        formData.append('image', image);
        formData.append('prix', parseFloat(price));
        formData.append('description', description);


        try {

            const token = localStorage.getItem('token');

            // Ajouter le token dans les en-têtes de la requête
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type' : 'application/json',

                }
            };
            const response = await axios.post('/api/produits', formData, config);
            console.log(response.data); // Afficher la réponse du serveur après la création du produit

            await createProduit(response.data);
            // Réinitialiser les champs du formulaire après la création réussie
            setTitre('');
            setImage(null);
            setPrice(0);
            setDescription('');
            setVisible(false);
        } catch (error) {
            console.error(error);
            // Gérer les erreurs lors de la création du produit
        }
    };

    const footerContent = (
        <div>
            <Button label="Annuler" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );

    return(
        <div className="card">
            <div className="flex flex-wrap justify-content-center gap-2 mb-2">
                <Button label="New" icon="pi pi-arrow-right" onClick={() => show('left')} className="p-button-help" style={{ minWidth: '10rem' }} />
            </div>

            <Dialog header="Ajouter un nouveau produit" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} />
                </label>
                <div className="card flex justify-content-center">
                    <span className="p-float-label">
                        <InputText id="username" value={titre} onChange={(e) => setTitre(e.target.value)} />
                        <label htmlFor="username">Titre</label>
                    </span>
                </div>
                <div className="flex-auto">
                    <label htmlFor="currency-germany" className="font-bold block mb-2">Prix</label>
                    <InputNumber inputId="currency-germany" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="EUR" locale="de-DE" />
                </div>
                <div className="card">
                    <label className="font-bold block mb-2">Description</label>
                    <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '320px' }} />
                </div>
                <div className="card flex justify-content-center">
                    <label className="font-bold block mb-2">Personnalisation:</label>
                    <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                </div>
                { checked &&
                    <div className="card flex justify-content-center">
                        <Dropdown value={personnalisation} onChange={(e) => setPersonnalisation(e.value)}
                                  options={persoOptions} optionLabel="name"
                                  placeholder="Selectionner le type de personnalisation" className="w-full md:w-14rem" />
                    </div>
                }
            </Dialog>
        </div>
    )
}